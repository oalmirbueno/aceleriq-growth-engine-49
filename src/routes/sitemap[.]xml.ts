import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { fetchBlogPosts } from "@/lib/blog.functions";

const BASE_URL = "https://aceleriq.com.br";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticEntries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/sobre-a-aceleriq", changefreq: "monthly", priority: "0.8" },
          { path: "/agencia-de-marketing-digital-curitiba", changefreq: "monthly", priority: "0.9" },
          { path: "/criacao-de-sites", changefreq: "monthly", priority: "0.9" },
          { path: "/trafego-pago", changefreq: "monthly", priority: "0.9" },
          { path: "/automacao-e-ia", changefreq: "monthly", priority: "0.9" },
          { path: "/blog", changefreq: "daily", priority: "0.8" },
        ];

        let blogEntries: SitemapEntry[] = [];
        try {
          const { posts } = await fetchBlogPosts();
          blogEntries = posts.map((p) => ({
            path: `/blog/${p.slug}`,
            lastmod: p.publishedAt,
            changefreq: "weekly",
            priority: "0.7",
          }));
        } catch {
          // If feeds fail, still return static sitemap so Google has something.
          blogEntries = [];
        }

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
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=1800",
          },
        });
      },
    },
  },
});
