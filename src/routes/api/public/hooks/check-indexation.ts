import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { inspectGoogleUrl } from "@/lib/gsc-inspect.server";

// Endpoint público acionado por pg_cron diariamente.
// Inspeciona no Google Search Console todas as URLs publicadas nos últimos
// 60 dias, persiste o status na tabela `indexation_status` e levanta
// `alert_active = true` quando a URL já tem mais de ALERT_AFTER_HOURS
// publicada e o Google ainda não a indexou.

const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnYXpyY2ZhaGt4eHd2d3plY2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1MDQxNjAsImV4cCI6MjA5MzA4MDE2MH0._kqx9ts0P-_r_eXy0Lr4vwIjC8qDlSlgqrz69jqJbis";

const SITE_ORIGIN = "https://aceleriq.com.br";
const LOOKBACK_DAYS = 60;
const ALERT_AFTER_HOURS = 96; // 4 dias sem indexar => alerta
const MAX_URLS = 30; // teto de chamadas/dia para a GSC API
const STATIC_URLS = [`${SITE_ORIGIN}/`, `${SITE_ORIGIN}/blog`];

function authorize(request: Request): boolean {
  const apikey = request.headers.get("apikey");
  if (apikey && apikey === ANON_KEY) return true;
  const auth = request.headers.get("authorization");
  if (auth && auth.replace(/^Bearer\s+/i, "") === ANON_KEY) return true;
  return false;
}

interface PostRow {
  slug: string;
  published_at: string | null;
}

async function collectUrls(): Promise<{ url: string; published_at: string | null; source: string }[]> {
  const since = new Date(Date.now() - LOOKBACK_DAYS * 86400000).toISOString();
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("slug, published_at")
    .eq("status", "published")
    .gte("published_at", since)
    .order("published_at", { ascending: false })
    .limit(MAX_URLS);
  if (error) throw new Error(`blog_posts: ${error.message}`);

  const posts = (data ?? []) as PostRow[];
  const urls = posts.map((p) => ({
    url: `${SITE_ORIGIN}/blog/${p.slug}`,
    published_at: p.published_at,
    source: "blog_post",
  }));
  for (const u of STATIC_URLS) {
    urls.push({ url: u, published_at: null, source: "static" });
  }
  return urls;
}

async function inspectAndPersist(target: { url: string; published_at: string | null; source: string }) {
  const { url, published_at, source } = target;
  const { data: prev } = await supabaseAdmin
    .from("indexation_status")
    .select("alert_active, alert_since, consecutive_failures")
    .eq("url", url)
    .maybeSingle();

  const result = await inspectGoogleUrl(url);
  const now = new Date();
  const isIndexed = result.available && result.verdict === "PASS";

  // Critério de alerta: URL conhecida há mais de ALERT_AFTER_HOURS e ainda
  // não está indexada (verdict != PASS) OU API indisponível por 3+ checagens.
  let shouldAlert = false;
  if (result.available && !isIndexed && published_at) {
    const ageHours = (now.getTime() - new Date(published_at).getTime()) / 3_600_000;
    if (ageHours >= ALERT_AFTER_HOURS) shouldAlert = true;
  }
  const consecutiveFailures = result.available ? 0 : (prev?.consecutive_failures ?? 0) + 1;
  if (consecutiveFailures >= 3) shouldAlert = true;

  const wasAlerted = prev?.alert_active === true;
  const alertSince = shouldAlert
    ? wasAlerted && prev?.alert_since
      ? prev.alert_since
      : now.toISOString()
    : null;

  const row = {
    url,
    source,
    published_at,
    last_checked_at: now.toISOString(),
    verdict: result.verdict ?? null,
    coverage_state: result.coverageState ?? null,
    indexing_state: result.indexingState ?? null,
    page_fetch_state: result.pageFetchState ?? null,
    robots_txt_state: result.robotsTxtState ?? null,
    last_crawl_time: result.lastCrawlTime ?? null,
    google_canonical: result.googleCanonical ?? null,
    user_canonical: result.userCanonical ?? null,
    inspection_url: result.inspectionUrl ?? null,
    alert_active: shouldAlert,
    alert_since: alertSince,
    consecutive_failures: consecutiveFailures,
    last_error: result.error ?? null,
  };

  const { error } = await supabaseAdmin.from("indexation_status").upsert(row, { onConflict: "url" });
  if (error) throw new Error(`upsert ${url}: ${error.message}`);

  return {
    url,
    indexed: isIndexed,
    verdict: result.verdict,
    available: result.available,
    alert: shouldAlert,
    newlyAlerted: shouldAlert && !wasAlerted,
  };
}

async function handle(request: Request): Promise<Response> {
  if (!authorize(request)) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const startedAt = Date.now();
  try {
    const targets = await collectUrls();
    if (targets.length === 0) {
      return Response.json({ ok: true, checked: 0, message: "Nenhuma URL recente." });
    }

    // Sequencial para não estourar rate limits da GSC API.
    const results: Awaited<ReturnType<typeof inspectAndPersist>>[] = [];
    for (const t of targets) {
      try {
        results.push(await inspectAndPersist(t));
      } catch (err) {
        console.error("[check-indexation]", t.url, err);
        results.push({
          url: t.url,
          indexed: false,
          verdict: undefined,
          available: false,
          alert: false,
          newlyAlerted: false,
        });
      }
    }

    const summary = {
      ok: true,
      checked: results.length,
      indexed: results.filter((r) => r.indexed).length,
      alerts: results.filter((r) => r.alert).length,
      newAlerts: results.filter((r) => r.newlyAlerted).length,
      ms: Date.now() - startedAt,
    };
    return Response.json(summary);
  } catch (err) {
    console.error("[check-indexation] fatal", err);
    return new Response(
      JSON.stringify({ ok: false, error: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

export const Route = createFileRoute("/api/public/hooks/check-indexation")({
  server: {
    handlers: {
      GET: ({ request }) => handle(request),
      POST: ({ request }) => handle(request),
    },
  },
});
