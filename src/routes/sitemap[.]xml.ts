import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { loadSitemapPosts } from "@/lib/blog.functions";
import { LP_TEMA_SLUGS } from "@/lib/lp-temas";

const BASE_URL = "https://aceleriq.com.br";
const TODAY = new Date().toISOString().slice(0, 10);

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

function safeLastmod(iso: string | undefined): string {
  if (!iso) return TODAY;
  const d = new Date(iso);
  if (isNaN(d.getTime()) || d.getTime() < Date.parse("2000-01-01")) return TODAY;
  return d.toISOString().slice(0, 10);
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticEntries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0", lastmod: TODAY },
          { path: "/sobre-a-aceleriq", changefreq: "monthly", priority: "0.8", lastmod: TODAY },
          { path: "/agencia-de-marketing-digital-curitiba", changefreq: "monthly", priority: "0.9", lastmod: TODAY },
          { path: "/criacao-de-sites", changefreq: "monthly", priority: "0.9", lastmod: TODAY },
          { path: "/trafego-pago", changefreq: "monthly", priority: "0.9", lastmod: TODAY },
          { path: "/automacao-e-ia", changefreq: "monthly", priority: "0.9", lastmod: TODAY },
          { path: "/blog", changefreq: "daily", priority: "0.8", lastmod: TODAY },
          ...LP_TEMA_SLUGS.map((slug) => ({
            path: `/lp/${slug}`,
            changefreq: "weekly" as const,
            priority: "0.85",
            lastmod: TODAY,
          })),
        ];

        // Limite duro de 8s para garantir que o sitemap sempre é entregue.
        const blogPosts = await Promise.race([
          loadSitemapPosts(),
          new Promise<{ slug: string; publishedAt: string }[]>((resolve) =>
            setTimeout(() => resolve([]), 8000),
          ),
        ]);

        const blogEntries: SitemapEntry[] = blogPosts.map((p) => ({
          path: `/blog/${p.slug}`,
          lastmod: safeLastmod(p.publishedAt),
          changefreq: "weekly",
          priority: "0.7",
        }));

        const entries = [...staticEntries, ...blogEntries];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "X-Content-Type-Options": "nosniff",
            "Cache-Control": "public, max-age=1800, s-maxage=1800",
          },
        });
      },
    },
  },
});
