import { createFileRoute } from "@tanstack/react-router";

// Endpoint público acionado por pg_cron diariamente para manter o cache do
// /blog e do /sitemap.xml quente (evita TTFB alto na primeira visita do dia
// após qualquer invalidação ou cold start no edge).
//
// Estratégia: GET com `Cache-Control: no-cache` força o handler a recomputar,
// e o cabeçalho de resposta downstream popula a CDN para os próximos hits.

const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnYXpyY2ZhaGt4eHd2d3plY2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1MDQxNjAsImV4cCI6MjA5MzA4MDE2MH0._kqx9ts0P-_r_eXy0Lr4vwIjC8qDlSlgqrz69jqJbis";

const SITE_ORIGIN = "https://aceleriq.com.br";

const TARGETS = [
  `${SITE_ORIGIN}/sitemap.xml`,
  `${SITE_ORIGIN}/blog`,
  `${SITE_ORIGIN}/blog?page=2`,
  `${SITE_ORIGIN}/`,
];

interface WarmResult {
  url: string;
  ok: boolean;
  status: number;
  ms: number;
  bytes?: number;
  cache?: string | null;
  age?: string | null;
  error?: string;
}

function authorize(request: Request): boolean {
  const apikey = request.headers.get("apikey");
  if (apikey && apikey === ANON_KEY) return true;
  const auth = request.headers.get("authorization");
  if (auth && auth.replace(/^Bearer\s+/i, "") === ANON_KEY) return true;
  return false;
}

async function warmOne(url: string): Promise<WarmResult> {
  const t0 = Date.now();
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        // User-Agent declarado para isolar tráfego nos analytics
        "User-Agent": "AceleriqCacheWarmer/1.0 (+https://aceleriq.com.br)",
        // Pede revalidação para recomputar e aquecer downstream
        "Cache-Control": "no-cache",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });
    const buf = await res.arrayBuffer();
    return {
      url,
      ok: res.ok,
      status: res.status,
      ms: Date.now() - t0,
      bytes: buf.byteLength,
      cache: res.headers.get("cf-cache-status") ?? res.headers.get("x-cache"),
      age: res.headers.get("age"),
    };
  } catch (err) {
    return {
      url,
      ok: false,
      status: 0,
      ms: Date.now() - t0,
      error: err instanceof Error ? err.message : String(err),
    };
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
  const results = await Promise.all(TARGETS.map(warmOne));
  const allOk = results.every((r) => r.ok);

  return new Response(
    JSON.stringify(
      {
        startedAt,
        finishedAt: new Date().toISOString(),
        targets: results.length,
        results,
      },
      null,
      2,
    ),
    {
      status: allOk ? 200 : 207,
      headers: { "Content-Type": "application/json" },
    },
  );
}

export const Route = createFileRoute("/api/public/hooks/warm-cache")({
  server: {
    handlers: {
      GET: ({ request }) => handle(request),
      POST: ({ request }) => handle(request),
    },
  },
});
