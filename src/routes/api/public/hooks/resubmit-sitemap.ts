import { createFileRoute } from "@tanstack/react-router";
import { submitSitemapToGsc } from "@/lib/sitemap-submit.server";
import { notifyIndexNow, pingSitemap } from "@/lib/indexnow.server";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// Endpoint público para revalidar buscadores após deploys / cron diário.
// Dispara três frentes em paralelo:
//   1) Reenvio do sitemap.xml ao Google Search Console (via connector)
//   2) IndexNow (Bing/Yandex/Seznam/Naver) — URLs recentes do blog
//   3) Ping clássico de sitemap (Google + Bing) como fallback
//
// Acionado por pg_cron (header `apikey: <anon key>`) ou manualmente.

const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnYXpyY2ZhaGt4eHd2d3plY2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1MDQxNjAsImV4cCI6MjA5MzA4MDE2MH0._kqx9ts0P-_r_eXy0Lr4vwIjC8qDlSlgqrz69jqJbis";

const SITE_ORIGIN = "https://aceleriq.com.br";

function authorize(request: Request): boolean {
  const apikey = request.headers.get("apikey");
  if (apikey && apikey === ANON_KEY) return true;
  const auth = request.headers.get("authorization");
  if (auth && auth.replace(/^Bearer\s+/i, "") === ANON_KEY) return true;
  return false;
}

async function recentPostUrls(limit = 50): Promise<string[]> {
  try {
    const { data } = await supabaseAdmin
      .from("blog_posts")
      .select("slug, published_at")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(limit);
    const urls: string[] = [
      `${SITE_ORIGIN}/`,
      `${SITE_ORIGIN}/blog`,
      `${SITE_ORIGIN}/sitemap.xml`,
    ];
    for (const row of (data ?? []) as { slug: string }[]) {
      urls.push(`${SITE_ORIGIN}/blog/${row.slug}`);
    }
    return urls;
  } catch {
    return [`${SITE_ORIGIN}/`, `${SITE_ORIGIN}/blog`, `${SITE_ORIGIN}/sitemap.xml`];
  }
}

async function handle(request: Request) {
  if (!authorize(request)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const startedAt = new Date().toISOString();

  const urls = await recentPostUrls();

  const [gsc, indexnow, ping] = await Promise.allSettled([
    submitSitemapToGsc(),
    notifyIndexNow(urls),
    pingSitemap(),
  ]);

  const result = {
    startedAt,
    finishedAt: new Date().toISOString(),
    urlsNotified: urls.length,
    gsc: gsc.status === "fulfilled" ? gsc.value : { error: String(gsc.reason) },
    indexnow:
      indexnow.status === "fulfilled" ? indexnow.value : { error: String(indexnow.reason) },
    sitemapPing:
      ping.status === "fulfilled" ? ping.value : { error: String(ping.reason) },
  };

  const allOk =
    gsc.status === "fulfilled" &&
    indexnow.status === "fulfilled" &&
    ping.status === "fulfilled";

  return new Response(JSON.stringify(result, null, 2), {
    status: allOk ? 200 : 207,
    headers: { "Content-Type": "application/json" },
  });
}

export const Route = createFileRoute("/api/public/hooks/resubmit-sitemap")({
  server: {
    handlers: {
      GET: ({ request }) => handle(request),
      POST: ({ request }) => handle(request),
    },
  },
});
