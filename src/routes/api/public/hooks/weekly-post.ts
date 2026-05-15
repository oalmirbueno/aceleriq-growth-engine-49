import { createFileRoute } from "@tanstack/react-router";
import { generateAndPublishWeeklyPost } from "@/lib/blog-generator.server";

// Endpoint público acionado pelo pg_cron semanal (terça-feira, 09:00 UTC).
// Gera e publica 1 post da fila `blog_topic_queue`. Idempotente: se não há
// pauta pendente, retorna 200 com `ok:false` e `reason` explicativo.

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
    const result = await generateAndPublishWeeklyPost();
    return new Response(JSON.stringify(result, null, 2), {
      status: 200,
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

export const Route = createFileRoute("/api/public/hooks/weekly-post")({
  server: {
    handlers: {
      GET: ({ request }) => handle(request),
      POST: ({ request }) => handle(request),
    },
  },
});
