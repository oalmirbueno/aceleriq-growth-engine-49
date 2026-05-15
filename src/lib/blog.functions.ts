import { createServerFn } from "@tanstack/react-start";
import { XMLParser } from "fast-xml-parser";
import {
  FEEDS,
  RELEVANCE_KEYWORDS,
  BLOCKLIST_KEYWORDS,
  type FeedCategory,
  type FeedSource,
} from "./blog-feeds";
import { LOCAL_POSTS } from "./blog-local-posts";
import { scrapeArticle, translateArticleToPt, translateBatchTitles } from "./blog-enrich.server";
import { fetchPublishedAdminPosts } from "./blog-posts.functions";
import type { AdminBlogPost } from "./blog-posts-types";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string | null;
  /** URL da fonte original. A leitura principal acontece internamente em /blog/$slug. */
  link: string;
  source: string;
  sourceId: string;
  category: FeedCategory;
  lang: "pt" | "en";
  publishedAt: string; // ISO
  /** Quando true, é conteúdo autoral da Aceleriq (renderiza dentro do site). */
  isLocal?: boolean;
  /** Markdown simples — apenas para posts locais. */
  content?: string;
  author?: string;
}

let cache: { at: number; posts: BlogPost[] } | null = null;
const CACHE_MS = 1000 * 60 * 10; // 10 min

function stripHtml(s: string): string {
  return s
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeHtmlEntities(s: string): string {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&#34;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function normalizeText(s: string): string {
  return s.replace(/[—–]/g, ",").replace(/\s+/g, " ").trim();
}

function extractImage(item: any): string | null {
  const media = item["media:content"] || item["media:thumbnail"];
  if (media) {
    const m = Array.isArray(media) ? media[0] : media;
    if (m?.["@_url"]) return m["@_url"];
  }
  if (item.enclosure) {
    const e = Array.isArray(item.enclosure) ? item.enclosure[0] : item.enclosure;
    if (e?.["@_url"] && (e["@_type"]?.startsWith("image") || /\.(jpg|jpeg|png|webp|gif)/i.test(e["@_url"])))
      return e["@_url"];
  }
  const html = item["content:encoded"] || item.description || "";
  const m = typeof html === "string" ? html.match(/<img[^>]+src=["']([^"']+)["']/i) : null;
  if (m) return m[1];
  return null;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

function shortHash(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = (h * 33) ^ s.charCodeAt(i);
  return (h >>> 0).toString(36);
}

async function fetchOgImage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; AceleriqBot/1.0; +https://aceleriq.com.br)",
        Accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const html = await res.text();
    // og:image / twitter:image
    const re =
      /<meta[^>]+(?:property|name|itemprop)=["'](?:og:image(?::secure_url)?|twitter:image|image)["'][^>]*content=["']([^"']+)["']/i;
    const m = html.match(re) || html.match(
      /<meta[^>]+content=["']([^"']+)["'][^>]*(?:property|name|itemprop)=["'](?:og:image(?::secure_url)?|twitter:image|image)["']/i,
    );
    if (m) {
      const src = decodeHtmlEntities(m[1]);
      // Resolve relative
      try {
        const abs = new URL(src, res.url).toString();
        if (/^https?:\/\//i.test(abs)) return abs;
      } catch {}
    }
    return null;
  } catch {
    return null;
  }
}

function isGoogleNewsUrl(url: string): boolean {
  try {
    return new URL(url).hostname.endsWith("news.google.com");
  } catch {
    return false;
  }
}

async function resolveGoogleNewsUrl(url: string): Promise<string> {
  if (!isGoogleNewsUrl(url)) return url;

  try {
    const page = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; AceleriqBot/1.0; +https://aceleriq.com.br)",
        Accept: "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(5000),
    });
    if (!page.ok) return url;

    const html = await page.text();
    const payloadMatch = html.match(/<c-wiz[^>]+data-p=["']([^"']+)["']/i);
    if (!payloadMatch) return url;

    const payload = JSON.parse(decodeHtmlEntities(payloadMatch[1]).replace("%.@.", '["garturlreq",'));
    const fReq = JSON.stringify([
      [["Fbv4je", JSON.stringify([...payload.slice(0, -6), ...payload.slice(-2)]), null, "generic"]],
    ]);

    const res = await fetch("https://news.google.com/_/DotsSplashUi/data/batchexecute", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "User-Agent":
          "Mozilla/5.0 (compatible; AceleriqBot/1.0; +https://aceleriq.com.br)",
      },
      body: new URLSearchParams({ "f.req": fReq }).toString(),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return url;

    const text = await res.text();
    const parsed = JSON.parse(text.replace(/^\)\]\}'\s*/, ""));
    const inner = parsed?.[0]?.[2] ? JSON.parse(parsed[0][2]) : null;
    const resolved = typeof inner?.[1] === "string" ? inner[1] : null;
    if (resolved && /^https?:\/\//i.test(resolved)) return resolved;
  } catch {
    return url;
  }

  return url;
}

async function fetchOne(source: FeedSource): Promise<BlogPost[]> {
  try {
    const res = await fetch(source.url, {
      headers: {
        "User-Agent": "AceleriqBot/1.0 (+https://aceleriq.com.br)",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      trimValues: true,
    });
    const json: any = parser.parse(xml);
    const channel = json?.rss?.channel ?? json?.feed;
    if (!channel) return [];
    const items: any[] = Array.isArray(channel.item)
      ? channel.item
      : channel.item
        ? [channel.item]
        : Array.isArray(channel.entry)
          ? channel.entry
          : channel.entry
            ? [channel.entry]
            : [];
    const posts: BlogPost[] = items.slice(0, 35).map((it) => {
      const rawTitle = normalizeText(stripHtml(typeof it.title === "string" ? it.title : it.title?.["#text"] ?? ""));
      let title = rawTitle;
      let publisher = source.name;
      const dashSplit = rawTitle.match(/^(.*?)\s+-\s+([^-]{2,40})$/);
      if (dashSplit) {
        title = dashSplit[1].trim();
        publisher = dashSplit[2].trim();
      }
      const srcTag = it.source;
      if (srcTag) {
        const s = typeof srcTag === "string" ? srcTag : srcTag?.["#text"];
        if (s && typeof s === "string" && s.length > 1 && s.length < 60) publisher = s.trim();
      }
      const link =
        typeof it.link === "string"
          ? it.link
          : Array.isArray(it.link)
            ? it.link[0]?.["@_href"] || it.link[0]
            : it.link?.["@_href"] || it.link?.["#text"] || "";
      const descRaw = it.description || it.summary || it["content:encoded"] || "";
      const desc = normalizeText(stripHtml(typeof descRaw === "string" ? descRaw : descRaw?.["#text"] ?? ""));
      const dateStr = it.pubDate || it.published || it.updated || "";
      const date = dateStr ? new Date(dateStr) : new Date();
      const slug = `${source.id}-${shortHash(link || title)}-${slugify(title)}`.slice(0, 110);
      return {
        slug,
        title: normalizeText(title).slice(0, 200),
        excerpt: desc.slice(0, 320),
        image: extractImage(it),
        link,
        source: publisher,
        sourceId: source.id,
        category: source.category,
        lang: source.lang,
        publishedAt: isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString(),
      };
    });
    return posts.filter((p) => p.title && p.link);
  } catch {
    return [];
  }
}

function isRelevant(p: BlogPost): boolean {
  const hay = `${p.title} ${p.excerpt}`.toLowerCase();
  if (BLOCKLIST_KEYWORDS.some((k) => hay.includes(k))) return false;
  return RELEVANCE_KEYWORDS.some((k) => hay.includes(k));
}

function dedupe(posts: BlogPost[]): BlogPost[] {
  const seen = new Set<string>();
  const out: BlogPost[] = [];
  for (const p of posts) {
    const key = p.title.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 60);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(p);
  }
  return out;
}

function buildLocalPosts(): BlogPost[] {
  return LOCAL_POSTS.map((p) => {
    const slug = `aceleriq-${slugify(p.title)}`.slice(0, 110);
    return {
      slug,
      title: p.title,
      excerpt: p.excerpt,
      image: p.image ?? null,
      link: `https://aceleriq.com.br/blog/${slug}`,
      source: "Aceleriq",
      sourceId: "aceleriq-local",
      category: p.category,
      lang: "pt" as const,
      publishedAt: p.publishedAt,
      isLocal: true,
      content: p.content,
      author: p.author,
    };
  });
}

function adminPostToBlogPost(p: AdminBlogPost): BlogPost {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.seo_description || p.excerpt,
    image: p.cover_image,
    link: `https://aceleriq.com.br/blog/${p.slug}`,
    source: "Aceleriq",
    sourceId: "aceleriq-admin",
    category: p.category,
    lang: "pt",
    publishedAt: p.published_at || p.updated_at,
    isLocal: true,
    content: p.content,
    author: p.author,
  };
}

async function loadAdminPosts(): Promise<BlogPost[]> {
  try {
    const rows = await fetchPublishedAdminPosts();
    return rows.map(adminPostToBlogPost);
  } catch (e) {
    console.error("[loadAdminPosts]", e);
    return [];
  }
}

async function loadAll(): Promise<BlogPost[]> {
  if (cache && Date.now() - cache.at < CACHE_MS) return cache.posts;
  const results = await Promise.all(FEEDS.map(fetchOne));
  const merged = results
    .flat()
    .filter(isRelevant)
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
  const unique = dedupe(merged).slice(0, 100);

  // Resolve URLs do Google News para a fonte real e usa og:image/twitter:image da matéria original.
  const hydrated = unique.slice(0, 50);
  const resolved = await Promise.all(hydrated.map((p) => resolveGoogleNewsUrl(p.link)));
  hydrated.forEach((p, i) => {
    p.link = resolved[i];
  });
  const needsImage = hydrated.slice(0, 36);
  const imgs = await Promise.all(needsImage.map((p) => fetchOgImage(p.link)));
  needsImage.forEach((p, i) => {
    if (imgs[i]) p.image = imgs[i];
  });

  // Traduz títulos/resumos de posts em inglês para PT-BR (lote único, best-effort).
  const enItems = unique
    .filter((p) => p.lang === "en")
    .slice(0, 20)
    .map((p) => ({ id: p.slug, title: p.title, excerpt: p.excerpt }));
  if (enItems.length) {
    const map = await translateBatchTitles(enItems);
    if (map) {
      for (const p of unique) {
        const t = map[p.slug];
        if (t?.title) p.title = t.title;
        if (t?.excerpt) p.excerpt = t.excerpt;
        if (t) p.lang = "pt";
      }
    }
  }

  // Locais primeiro (autoridade), depois feed.
  const all = [...buildLocalPosts(), ...unique];
  cache = { at: Date.now(), posts: all };
  return all;
}

// Cache por slug do conteúdo completo já traduzido (1h).
const articleCache = new Map<string, { at: number; markdown: string; title: string }>();
const ARTICLE_TTL = 1000 * 60 * 60;

async function hydrateFullContent(post: BlogPost): Promise<BlogPost> {
  if (post.isLocal || post.content) return post;
  const cached = articleCache.get(post.slug);
  if (cached && Date.now() - cached.at < ARTICLE_TTL) {
    return { ...post, content: cached.markdown, title: cached.title || post.title };
  }
  const scraped = await scrapeArticle(post.link);
  if (!scraped) return post;
  const translated = await translateArticleToPt({
    title: post.title,
    markdown: scraped.markdown,
    source: post.source,
  });
  if (!translated) return post;
  articleCache.set(post.slug, { at: Date.now(), markdown: translated.markdown, title: translated.title });
  return { ...post, content: translated.markdown, title: translated.title || post.title };
}

export const fetchBlogPosts = createServerFn({ method: "GET" }).handler(async () => {
  const posts = await loadAll();
  return { posts };
});

/**
 * Versão enxuta para o sitemap — apenas slug + publishedAt.
 * Sem tradução, scraping ou og:image (essas etapas pesadas estouravam o tempo
 * do worker e o sitemap acabava saindo só com os posts locais).
 */
export async function loadSitemapPosts(): Promise<{ slug: string; publishedAt: string }[]> {
  try {
    const results = await Promise.all(FEEDS.map(fetchOne));
    const merged = results.flat().filter(isRelevant);
    const unique = dedupe(merged).slice(0, 100);
    const local = buildLocalPosts();
    return [...local, ...unique].map((p) => ({ slug: p.slug, publishedAt: p.publishedAt }));
  } catch {
    return buildLocalPosts().map((p) => ({ slug: p.slug, publishedAt: p.publishedAt }));
  }
}

export const fetchBlogPost = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }) => {
    const posts = await loadAll();
    const found = posts.find((p) => p.slug === data.slug) ?? null;
    const post = found ? await hydrateFullContent(found) : null;
    const related = post
      ? posts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3)
      : [];
    return { post, related };
  });
