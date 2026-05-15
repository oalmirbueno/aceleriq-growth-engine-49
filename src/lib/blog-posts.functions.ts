import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import type { AdminBlogPost, BlogPostStatus } from "./blog-posts-types";
import { runSeoChecklist, slugify } from "./seo-checklist";
import { submitSitemapToGsc } from "./sitemap-submit.server";

// ─── Auth ────────────────────────────────────────────
function checkPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) throw new Error("ADMIN_PASSWORD não configurado no servidor.");
  if (password !== expected) throw new Error("Senha incorreta.");
}

const VALID_CATEGORIES = ["ia", "automacao", "trafego", "marketing", "vendas", "crescimento"] as const;
const VALID_STATUSES: BlogPostStatus[] = ["draft", "in_review", "approved", "published"];

const upsertSchema = z.object({
  id: z.string().uuid().nullable().optional(),
  slug: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/, "Slug inválido"),
  title: z.string().min(3).max(200),
  excerpt: z.string().max(500).default(""),
  content: z.string().max(50_000).default(""),
  cover_image: z.string().max(800).nullable().optional(),
  category: z.enum(VALID_CATEGORIES),
  status: z.enum(["draft", "in_review", "approved", "published"]),
  seo_title: z.string().max(120).nullable().optional(),
  seo_description: z.string().max(300).nullable().optional(),
  focus_keyword: z.string().max(80).nullable().optional(),
  author: z.string().max(120).default("Equipe Aceleriq"),
});

type RawRow = Record<string, unknown>;

function mapRow(r: RawRow): AdminBlogPost {
  return {
    id: r.id as string,
    slug: r.slug as string,
    title: r.title as string,
    excerpt: (r.excerpt as string) ?? "",
    content: (r.content as string) ?? "",
    cover_image: (r.cover_image as string) ?? null,
    category: (r.category as AdminBlogPost["category"]) ?? "crescimento",
    status: r.status as BlogPostStatus,
    seo_title: (r.seo_title as string) ?? null,
    seo_description: (r.seo_description as string) ?? null,
    focus_keyword: (r.focus_keyword as string) ?? null,
    review_notes: (r.review_notes as AdminBlogPost["review_notes"]) ?? {},
    author: (r.author as string) ?? "Equipe Aceleriq",
    published_at: (r.published_at as string) ?? null,
    created_at: r.created_at as string,
    updated_at: r.updated_at as string,
  };
}

// ─── List ────────────────────────────────────────────
export const listBlogPosts = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string; status?: BlogPostStatus | "all" }) =>
    z
      .object({
        password: z.string().min(1),
        status: z.enum(["draft", "in_review", "approved", "published", "all"]).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data }): Promise<AdminBlogPost[]> => {
    checkPassword(data.password);
    let q = supabaseAdmin
      .from("blog_posts")
      .select("*")
      .order("updated_at", { ascending: false });
    if (data.status && data.status !== "all") q = q.eq("status", data.status);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return (rows ?? []).map((r) => mapRow(r as RawRow));
  });

// ─── Get one ─────────────────────────────────────────
export const getBlogPost = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string; id: string }) =>
    z.object({ password: z.string().min(1), id: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data }): Promise<AdminBlogPost | null> => {
    checkPassword(data.password);
    const { data: row, error } = await supabaseAdmin
      .from("blog_posts")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return row ? mapRow(row as RawRow) : null;
  });

// ─── Save (create or update) ─────────────────────────
export const saveBlogPost = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ password: z.string().min(1), post: upsertSchema }).parse(input),
  )
  .handler(async ({ data }): Promise<AdminBlogPost> => {
    checkPassword(data.password);
    const p = data.post;

    // Garante slug válido
    const slug = p.slug || slugify(p.title);

    // Roda checklist e guarda como review_notes
    const report = runSeoChecklist({
      title: p.title,
      slug,
      excerpt: p.excerpt,
      content: p.content,
      cover_image: p.cover_image ?? null,
      seo_title: p.seo_title ?? null,
      seo_description: p.seo_description ?? null,
      focus_keyword: p.focus_keyword ?? null,
    });

    // Bloqueia "published" sem score >= 80
    if (p.status === "published" && !report.canPublish) {
      throw new Error(
        `Não é possível publicar: checklist SEO em ${report.score}% (mínimo 80%). Revise os itens pendentes.`,
      );
    }

    const payload = {
      slug,
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      cover_image: p.cover_image ?? null,
      category: p.category,
      status: p.status,
      seo_title: p.seo_title ?? null,
      seo_description: p.seo_description ?? null,
      focus_keyword: p.focus_keyword ?? null,
      author: p.author,
      review_notes: JSON.parse(JSON.stringify(report)) as never,
    };

    if (p.id) {
      const { data: row, error } = await supabaseAdmin
        .from("blog_posts")
        .update(payload)
        .eq("id", p.id)
        .select("*")
        .single();
      if (error) throw new Error(error.message);
      const updated = mapRow(row as RawRow);
      if (updated.status === "published") {
        submitSitemapToGsc().catch((e) =>
          console.error("[saveBlogPost] sitemap resubmit failed:", e),
        );
      }
      return updated;
    }

    const { data: row, error } = await supabaseAdmin
      .from("blog_posts")
      .insert(payload)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    const saved = mapRow(row as RawRow);
    if (saved.status === "published") {
      // fire-and-forget: reenvio do sitemap ao GSC após publicação
      submitSitemapToGsc().catch((e) =>
        console.error("[saveBlogPost] sitemap resubmit failed:", e),
      );
    }
    return saved;
  });

// ─── Resubmit sitemap manualmente (admin) ────────────
export const resubmitSitemap = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string }) =>
    z.object({ password: z.string().min(1) }).parse(input),
  )
  .handler(async ({ data }) => {
    checkPassword(data.password);
    return submitSitemapToGsc();
  });

// ─── Delete ──────────────────────────────────────────
export const deleteBlogPost = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string; id: string }) =>
    z.object({ password: z.string().min(1), id: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data }) => {
    checkPassword(data.password);
    const { error } = await supabaseAdmin.from("blog_posts").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

// ─── Quick stats for dashboard ───────────────────────
export const getBlogPostStats = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string }) =>
    z.object({ password: z.string().min(1) }).parse(input),
  )
  .handler(async ({ data }) => {
    checkPassword(data.password);
    const { data: rows, error } = await supabaseAdmin
      .from("blog_posts")
      .select("status, published_at, created_at");
    if (error) throw new Error(error.message);
    const list = rows ?? [];
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString();
    return {
      total: list.length,
      drafts: list.filter((r) => r.status === "draft").length,
      inReview: list.filter((r) => r.status === "in_review").length,
      published: list.filter((r) => r.status === "published").length,
      publishedThisMonth: list.filter(
        (r) => r.status === "published" && r.published_at && r.published_at >= monthStart,
      ).length,
      publishedPrevMonth: list.filter(
        (r) =>
          r.status === "published" &&
          r.published_at &&
          r.published_at >= prevMonthStart &&
          r.published_at < monthStart,
      ).length,
    };
  });

// ─── Public-facing: posts publicados (sem senha) para o blog feed ──────
export const fetchPublishedAdminPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<AdminBlogPost[]> => {
    const { data: rows, error } = await supabaseAdmin
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });
    if (error) {
      console.error("[fetchPublishedAdminPosts]", error.message);
      return [];
    }
    return (rows ?? []).map((r) => mapRow(r as RawRow));
  },
);
