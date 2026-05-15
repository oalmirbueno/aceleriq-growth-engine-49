import { createFileRoute } from "@tanstack/react-router";
import { submitSitemapToGsc } from "@/lib/sitemap-submit.server";

// Endpoint público para reenviar o sitemap ao Google Search Console.
// Acionado por pg_cron (header `apikey: <anon key>`) ou manualmente após deploys.

const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnYXpyY2ZhaGt4eHd2d3plY2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1MDQxNjAsImV4cCI6MjA5MzA4MDE2MH0._kqx9ts0P-_r_eXy0Lr4vwIjC8qDlSlgqrz69jqJbis";

function authorize(request: Request): boolean {
  const apikey = request.headers.get("apikey");
  if (apikey && apikey === ANON_KEY) return true;
  const auth = request.headers.get("authorization");
  if (auth && auth.replace(/^Bearer\s+/i, "") === ANON_KEY) return true;
  return false;
}

async function handle(request: Request) {
  if (!authorize(request)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const result = await submitSitemapToGsc();
    const allOk = result.results.every((r) => r.ok);
    return new Response(JSON.stringify(result, null, 2), {
      status: allOk ? 200 : 207,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const Route = createFileRoute("/api/public/hooks/resubmit-sitemap")({
  server: {
    handlers: {
      GET: ({ request }) => handle(request),
      POST: ({ request }) => handle(request),
    },
  },
});
