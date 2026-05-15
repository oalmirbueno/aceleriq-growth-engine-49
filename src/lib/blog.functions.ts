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

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string | null;
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
      /<meta[^>]+(?:property|name)=["'](?:og:image(?::secure_url)?|twitter:image)["'][^>]*content=["']([^"']+)["']/i;
    const m = html.match(re) || html.match(
      /<meta[^>]+content=["']([^"']+)["'][^>]*(?:property|name)=["'](?:og:image|twitter:image)["']/i,
    );
    if (m) {
      const src = m[1];
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
    const posts: BlogPost[] = items.slice(0, 15).map((it) => {
      const rawTitle = stripHtml(typeof it.title === "string" ? it.title : it.title?.["#text"] ?? "");
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
      const desc = stripHtml(typeof descRaw === "string" ? descRaw : descRaw?.["#text"] ?? "");
      const dateStr = it.pubDate || it.published || it.updated || "";
      const date = dateStr ? new Date(dateStr) : new Date();
      const slug = `${source.id}-${shortHash(link || title)}-${slugify(title)}`.slice(0, 110);
      return {
        slug,
        title: title.slice(0, 200),
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

async function loadAll(): Promise<BlogPost[]> {
  if (cache && Date.now() - cache.at < CACHE_MS) return cache.posts;
  const results = await Promise.all(FEEDS.map(fetchOne));
  const merged = results
    .flat()
    .filter(isRelevant)
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
  const unique = dedupe(merged).slice(0, 60);

  // Para os 24 mais recentes sem imagem, busca og:image em paralelo (com timeout).
  const needsImage = unique.filter((p) => !p.image).slice(0, 24);
  const imgs = await Promise.all(needsImage.map((p) => fetchOgImage(p.link)));
  needsImage.forEach((p, i) => {
    if (imgs[i]) p.image = imgs[i];
  });

  // Locais primeiro (autoridade), depois feed.
  const all = [...buildLocalPosts(), ...unique];
  cache = { at: Date.now(), posts: all };
  return all;
}

export const fetchBlogPosts = createServerFn({ method: "GET" }).handler(async () => {
  const posts = await loadAll();
  return { posts };
});

export const fetchBlogPost = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }) => {
    const posts = await loadAll();
    const post = posts.find((p) => p.slug === data.slug) ?? null;
    const related = post
      ? posts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3)
      : [];
    return { post, related };
  });
