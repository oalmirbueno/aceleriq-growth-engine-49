import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import { useAdmin } from "@/components/admin/AdminShell";
import { getBlogPost, saveBlogPost } from "@/lib/blog-posts.functions";
import { runSeoChecklist, slugify } from "@/lib/seo-checklist";
import {
  ALL_STATUSES,
  STATUS_LABEL,
  type BlogPostStatus,
} from "@/lib/blog-posts-types";
import { CATEGORIES, type FeedCategory } from "@/lib/blog-feeds";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Check, X, Save, Eye } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const Route = createFileRoute("/admin/posts/$id")({
  component: PostEditor,
});

interface FormState {
  id: string | null;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: FeedCategory;
  status: BlogPostStatus;
  seo_title: string;
  seo_description: string;
  focus_keyword: string;
  author: string;
}

const EMPTY: FormState = {
  id: null,
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  cover_image: "",
  category: "ia",
  status: "draft",
  seo_title: "",
  seo_description: "",
  focus_keyword: "",
  author: "Equipe Aceleriq",
};

function PostEditor() {
  const { id } = Route.useParams();
  const isNew = id === "novo";
  const { password } = useAdmin();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const get = useServerFn(getBlogPost);
  const save = useServerFn(saveBlogPost);

  const [form, setForm] = useState<FormState>(EMPTY);
  const [slugTouched, setSlugTouched] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const loadQuery = useQuery({
    queryKey: ["admin-post", id],
    queryFn: () => get({ data: { password, id } }),
    enabled: !isNew,
  });

  useEffect(() => {
    if (!isNew && loadQuery.data) {
      setForm({
        id: loadQuery.data.id,
        slug: loadQuery.data.slug,
        title: loadQuery.data.title,
        excerpt: loadQuery.data.excerpt,
        content: loadQuery.data.content,
        cover_image: loadQuery.data.cover_image ?? "",
        category: loadQuery.data.category,
        status: loadQuery.data.status,
        seo_title: loadQuery.data.seo_title ?? "",
        seo_description: loadQuery.data.seo_description ?? "",
        focus_keyword: loadQuery.data.focus_keyword ?? "",
        author: loadQuery.data.author,
      });
      setSlugTouched(true);
    }
  }, [isNew, loadQuery.data]);

  // Auto-slug a partir do título quando ainda não foi tocado
  useEffect(() => {
    if (!slugTouched && form.title) {
      setForm((f) => ({ ...f, slug: slugify(f.title) }));
    }
  }, [form.title, slugTouched]);

  const report = useMemo(
    () =>
      runSeoChecklist({
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        content: form.content,
        cover_image: form.cover_image || null,
        seo_title: form.seo_title || null,
        seo_description: form.seo_description || null,
        focus_keyword: form.focus_keyword || null,
      }),
    [form],
  );

  const saveMut = useMutation({
    mutationFn: (status: BlogPostStatus) =>
      save({
        data: {
          password,
          post: {
            id: form.id,
            slug: form.slug || slugify(form.title),
            title: form.title,
            excerpt: form.excerpt,
            content: form.content,
            cover_image: form.cover_image || null,
            category: form.category,
            status,
            seo_title: form.seo_title || null,
            seo_description: form.seo_description || null,
            focus_keyword: form.focus_keyword || null,
            author: form.author,
          },
        },
      }),
    onSuccess: (saved) => {
      toast.success(
        saved.status === "published" ? "Post publicado." : "Salvo com sucesso.",
      );
      qc.invalidateQueries({ queryKey: ["admin-posts"] });
      qc.invalidateQueries({ queryKey: ["admin-blog-stats"] });
      if (isNew) navigate({ to: "/admin/posts/$id", params: { id: saved.id } });
      else setForm((f) => ({ ...f, id: saved.id, status: saved.status }));
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Erro ao salvar"),
  });

  if (!isNew && loadQuery.isLoading) {
    return <div className="px-6 py-10 text-sm text-muted-foreground">Carregando…</div>;
  }
  if (!isNew && !loadQuery.data && !loadQuery.isLoading) {
    return (
      <div className="px-6 py-10">
        <p className="text-sm text-muted-foreground mb-4">Post não encontrado.</p>
        <Link to="/admin/posts" className="text-sm text-primary">
          ← Voltar
        </Link>
      </div>
    );
  }

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="px-6 md:px-10 py-10 max-w-6xl">
      <Link
        to="/admin/posts"
        className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-3 w-3" /> Posts
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-2">
            {isNew ? "Novo post" : "Editor"}
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-semibold">
            {form.title || "Sem título"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowPreview((s) => !s)} className="gap-2">
            <Eye className="h-4 w-4" /> {showPreview ? "Editar" : "Preview"}
          </Button>
          <Button
            variant="outline"
            onClick={() => saveMut.mutate(form.status === "published" ? "approved" : form.status)}
            disabled={saveMut.isPending || !form.title}
            className="gap-2"
          >
            <Save className="h-4 w-4" /> Salvar
          </Button>
          <Button
            onClick={() => saveMut.mutate("published")}
            disabled={saveMut.isPending || !report.canPublish || !form.title}
            className="gap-2"
            title={!report.canPublish ? `Checklist em ${report.score}% (mínimo 80%)` : undefined}
          >
            Publicar ({report.score}%)
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        {/* Coluna principal */}
        <div className="space-y-5 min-w-0">
          {showPreview ? (
            <article className="prose prose-invert max-w-none border border-white/10 bg-white/[0.02] p-6">
              <h1>{form.title}</h1>
              {form.excerpt && (
                <p className="text-muted-foreground italic">{form.excerpt}</p>
              )}
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{form.content}</ReactMarkdown>
            </article>
          ) : (
            <>
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Título
                </Label>
                <Input
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  placeholder="Título do artigo"
                  className="mt-1.5 text-lg"
                />
              </div>

              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Resumo / Excerpt
                </Label>
                <Textarea
                  value={form.excerpt}
                  onChange={(e) => update("excerpt", e.target.value)}
                  placeholder="Resumo curto exibido no card do blog (1–2 linhas)."
                  rows={2}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Conteúdo (Markdown)
                </Label>
                <Textarea
                  value={form.content}
                  onChange={(e) => update("content", e.target.value)}
                  placeholder={"## Subtítulo\n\nUse markdown — H2, H3, listas, **negrito**, [links](https://...)."}
                  rows={20}
                  className="mt-1.5 font-mono text-sm"
                />
                <p className="text-[11px] text-muted-foreground mt-1">
                  {form.content.split(/\s+/).filter(Boolean).length} palavras
                </p>
              </div>
            </>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* SEO */}
          <section className="border border-white/10 bg-white/[0.02] p-4">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-3">
              SEO
            </h3>
            <div className="space-y-3">
              <div>
                <Label className="text-[11px] text-muted-foreground">Slug</Label>
                <Input
                  value={form.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    update("slug", slugify(e.target.value));
                  }}
                  placeholder="meu-artigo"
                  className="mt-1 font-mono text-xs"
                />
                <p className="text-[10px] text-muted-foreground mt-1 truncate">
                  aceleriq.com.br/blog/{form.slug || "…"}
                </p>
              </div>
              <div>
                <Label className="text-[11px] text-muted-foreground">
                  Focus keyword
                </Label>
                <Input
                  value={form.focus_keyword}
                  onChange={(e) => update("focus_keyword", e.target.value)}
                  placeholder="ex: agência de IA Curitiba"
                  className="mt-1 text-xs"
                />
              </div>
              <div>
                <Label className="text-[11px] text-muted-foreground">
                  SEO title <span className="text-muted-foreground/60">({form.seo_title.length}/60)</span>
                </Label>
                <Input
                  value={form.seo_title}
                  onChange={(e) => update("seo_title", e.target.value)}
                  placeholder={form.title.slice(0, 60)}
                  className="mt-1 text-xs"
                />
              </div>
              <div>
                <Label className="text-[11px] text-muted-foreground">
                  Meta description <span className="text-muted-foreground/60">({form.seo_description.length}/160)</span>
                </Label>
                <Textarea
                  value={form.seo_description}
                  onChange={(e) => update("seo_description", e.target.value)}
                  rows={3}
                  placeholder="Resumo de 120–160 caracteres exibido no Google."
                  className="mt-1 text-xs"
                />
              </div>
            </div>
          </section>

          {/* Checklist */}
          <section className="border border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                Checklist
              </h3>
              <span
                className={`font-mono text-xs ${
                  report.score >= 80
                    ? "text-emerald-400"
                    : report.score >= 50
                      ? "text-yellow-400"
                      : "text-red-400"
                }`}
              >
                {report.score}% ({report.passes}/{report.total})
              </span>
            </div>
            <ul className="space-y-1.5">
              {report.items.map((it) => (
                <li key={it.id} className="flex gap-2 text-[11px] leading-snug">
                  {it.pass ? (
                    <Check className="h-3 w-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <X className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                  )}
                  <span className={it.pass ? "text-muted-foreground" : "text-foreground"}>
                    {it.label}
                    <span className="text-muted-foreground/70"> · {it.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
            {!report.canPublish && (
              <p className="text-[10px] text-yellow-300 mt-3">
                Mínimo 80% para publicar. Salve como rascunho enquanto resolve os itens pendentes.
              </p>
            )}
          </section>

          {/* Meta */}
          <section className="border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
              Publicação
            </h3>
            <div>
              <Label className="text-[11px] text-muted-foreground">Status</Label>
              <Select value={form.status} onValueChange={(v) => update("status", v as BlogPostStatus)}>
                <SelectTrigger className="mt-1 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ALL_STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {STATUS_LABEL[s]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-[11px] text-muted-foreground">Categoria</Label>
              <Select value={form.category} onValueChange={(v) => update("category", v as FeedCategory)}>
                <SelectTrigger className="mt-1 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-[11px] text-muted-foreground">Imagem de capa (URL)</Label>
              <Input
                value={form.cover_image}
                onChange={(e) => update("cover_image", e.target.value)}
                placeholder="https://…"
                className="mt-1 text-xs"
              />
            </div>
            <div>
              <Label className="text-[11px] text-muted-foreground">Autor</Label>
              <Input
                value={form.author}
                onChange={(e) => update("author", e.target.value)}
                className="mt-1 text-xs"
              />
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
