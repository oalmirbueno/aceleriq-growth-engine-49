import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { fetchPublishedAdminPosts } from "./blog-posts.functions";
import { loadSitemapPosts } from "./blog.functions";

const SITE_URL = "https://aceleriq.com.br";
const GSC_PROPERTY = "https://aceleriq.com.br/";
const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";

function checkPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) throw new Error("ADMIN_PASSWORD não configurado.");
  if (password !== expected) throw new Error("Senha incorreta.");
}

// ─── HTML preview (canonical, title, description, og:image, robots) ──
export interface PagePreview {
  fetched: boolean;
  status?: number;
  title: string | null;
  description: string | null;
  canonical: string | null;
  ogImage: string | null;
  robots: string | null;
  canonicalMatchesUrl: boolean | null;
  error?: string;
}

function pickMeta(html: string, attr: "name" | "property", value: string): string | null {
  const re = new RegExp(
    `<meta[^>]+${attr}=["']${value}["'][^>]*content=["']([^"']*)["']`,
    "i",
  );
  const m1 = html.match(re);
  if (m1?.[1]) return m1[1];
  const re2 = new RegExp(
    `<meta[^>]+content=["']([^"']*)["'][^>]*${attr}=["']${value}["']`,
    "i",
  );
  const m2 = html.match(re2);
  return m2?.[1] ?? null;
}

async function fetchPreview(url: string): Promise<PagePreview> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; AceleriqIndexCheck/1.0; +https://aceleriq.com.br)",
      },
      redirect: "follow",
    });
    const html = await res.text();
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const canonicalMatch = html.match(
      /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i,
    );
    const canonical = canonicalMatch?.[1] ?? null;
    return {
      fetched: true,
      status: res.status,
      title: titleMatch?.[1]?.trim() ?? pickMeta(html, "property", "og:title"),
      description:
        pickMeta(html, "name", "description") ??
        pickMeta(html, "property", "og:description"),
      canonical,
      ogImage: pickMeta(html, "property", "og:image"),
      robots: pickMeta(html, "name", "robots"),
      canonicalMatchesUrl: canonical
        ? canonical.replace(/\/$/, "") === url.replace(/\/$/, "")
        : null,
    };
  } catch (err) {
    return {
      fetched: false,
      title: null,
      description: null,
      canonical: null,
      ogImage: null,
      robots: null,
      canonicalMatchesUrl: null,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

// ─── Google: URL Inspection API via connector gateway ────────────────
export interface GoogleIndexStatus {
  available: boolean;
  verdict?: string; // PASS, PARTIAL, FAIL, NEUTRAL
  coverageState?: string;
  lastCrawlTime?: string | null;
  pageFetchState?: string;
  indexingState?: string;
  googleCanonical?: string | null;
  userCanonical?: string | null;
  robotsTxtState?: string;
  inspectionUrl?: string | null;
  error?: string;
}

async function inspectGoogle(url: string): Promise<GoogleIndexStatus> {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const gscKey = process.env.GOOGLE_SEARCH_CONSOLE_API_KEY;
  if (!lovableKey || !gscKey) {
    return { available: false, error: "Conector GSC não configurado." };
  }
  try {
    const res = await fetch(`${GATEWAY}/v1/urlInspection/index:inspect`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": gscKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inspectionUrl: url,
        siteUrl: GSC_PROPERTY,
        languageCode: "pt-BR",
      }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return {
        available: false,
        error: `GSC ${res.status}: ${text.slice(0, 200)}`,
      };
    }
    const json = (await res.json()) as {
      inspectionResult?: {
        indexStatusResult?: {
          verdict?: string;
          coverageState?: string;
          lastCrawlTime?: string;
          pageFetchState?: string;
          indexingState?: string;
          googleCanonical?: string;
          userCanonical?: string;
          robotsTxtState?: string;
        };
        inspectionResultLink?: string;
      };
    };
    const r = json.inspectionResult?.indexStatusResult ?? {};
    return {
      available: true,
      verdict: r.verdict,
      coverageState: r.coverageState,
      lastCrawlTime: r.lastCrawlTime ?? null,
      pageFetchState: r.pageFetchState,
      indexingState: r.indexingState,
      googleCanonical: r.googleCanonical ?? null,
      userCanonical: r.userCanonical ?? null,
      robotsTxtState: r.robotsTxtState,
      inspectionUrl: json.inspectionResult?.inspectionResultLink ?? null,
    };
  } catch (err) {
    return {
      available: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

// ─── Bing: site:url heurística (sem API key) ─────────────────────────
export interface BingIndexStatus {
  indexed: boolean | null; // null = não foi possível verificar
  resultsCount?: number;
  error?: string;
}

async function inspectBing(url: string): Promise<BingIndexStatus> {
  try {
    const q = encodeURIComponent(`site:${url}`);
    const res = await fetch(`https://www.bing.com/search?q=${q}&setlang=pt-BR`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        "Accept-Language": "pt-BR,pt;q=0.9",
      },
    });
    if (!res.ok) {
      return { indexed: null, error: `Bing ${res.status}` };
    }
    const html = await res.text();
    // Indicador "Não foram encontrados resultados" / "There are no results"
    const noResults =
      /No results found for/i.test(html) ||
      /N[aã]o foram encontrados resultados/i.test(html) ||
      /didn[’']t match any documents/i.test(html);
    if (noResults) return { indexed: false, resultsCount: 0 };
    // Conta âncoras de resultado (links b_algo cite)
    const matches = html.match(/class="b_algo"/g);
    const count = matches?.length ?? 0;
    if (count > 0) return { indexed: true, resultsCount: count };
    // Heurística: se a URL aparece em um <cite>, provavelmente indexada
    if (html.includes(url.replace(/^https?:\/\//, ""))) {
      return { indexed: true, resultsCount: 1 };
    }
    return { indexed: false, resultsCount: 0 };
  } catch (err) {
    return {
      indexed: null,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

// ─── Combined per-URL result ─────────────────────────────────────────
export interface UrlIndexCheck {
  url: string;
  preview: PagePreview;
  google: GoogleIndexStatus;
  bing: BingIndexStatus;
}

async function defaultBlogUrls(limit: number): Promise<string[]> {
  // Combina admin posts (publicados) + posts do feed agregado
  const out = new Set<string>();
  try {
    const admin = await fetchPublishedAdminPosts();
    for (const p of admin) out.add(`${SITE_URL}/blog/${p.slug}`);
  } catch (e) {
    console.error("[indexCheck] adminPosts fail:", e);
  }
  if (out.size < limit) {
    try {
      const feed = await loadSitemapPosts();
      for (const p of feed) {
        out.add(`${SITE_URL}/blog/${p.slug}`);
        if (out.size >= limit) break;
      }
    } catch (e) {
      console.error("[indexCheck] sitemapPosts fail:", e);
    }
  }
  return Array.from(out).slice(0, limit);
}

export const checkUrlsIndexation = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string; urls?: string[] }) =>
    z
      .object({
        password: z.string().min(1),
        urls: z.array(z.string().url()).max(20).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data }): Promise<{ checkedAt: string; results: UrlIndexCheck[] }> => {
    checkPassword(data.password);
    const urls =
      data.urls && data.urls.length > 0 ? data.urls : await defaultBlogUrls(10);
    const results = await Promise.all(
      urls.map(async (url): Promise<UrlIndexCheck> => {
        const [preview, google, bing] = await Promise.all([
          fetchPreview(url),
          inspectGoogle(url),
          inspectBing(url),
        ]);
        return { url, preview, google, bing };
      }),
    );
    return { checkedAt: new Date().toISOString(), results };
  });
