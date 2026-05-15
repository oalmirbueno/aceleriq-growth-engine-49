// Helper server-only para reenviar o sitemap.xml ao Google Search Console.
// Usa o connector gateway do Lovable (Google Search Console).
//
// É chamado em dois pontos:
//   1) Após publicar / atualizar um post no admin (saveBlogPost).
//   2) Por um endpoint público /api/public/hooks/resubmit-sitemap, acionado
//      por pg_cron diariamente como fallback (caso o build pipeline não
//      consiga acionar manualmente após cada deploy).

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";

const PROPERTIES = [
  "https://aceleriq.com.br/",
  "sc-domain:aceleriq.com.br",
];

const SITEMAP_URL = "https://aceleriq.com.br/sitemap.xml";

export interface SitemapSubmitResult {
  property: string;
  ok: boolean;
  status: number;
  error?: string;
}

export async function submitSitemapToGsc(): Promise<{
  submittedAt: string;
  results: SitemapSubmitResult[];
}> {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const gscKey = process.env.GOOGLE_SEARCH_CONSOLE_API_KEY;

  if (!lovableKey || !gscKey) {
    throw new Error("Conector Google Search Console não configurado.");
  }

  const headers = {
    Authorization: `Bearer ${lovableKey}`,
    "X-Connection-Api-Key": gscKey,
  };

  const encodedSitemap = encodeURIComponent(SITEMAP_URL);

  const results = await Promise.all(
    PROPERTIES.map(async (prop): Promise<SitemapSubmitResult> => {
      const url = `${GATEWAY}/webmasters/v3/sites/${encodeURIComponent(prop)}/sitemaps/${encodedSitemap}`;
      try {
        const res = await fetch(url, { method: "PUT", headers });
        if (!res.ok && res.status !== 204) {
          const body = await res.text().catch(() => "");
          return {
            property: prop,
            ok: false,
            status: res.status,
            error: body.slice(0, 300),
          };
        }
        return { property: prop, ok: true, status: res.status };
      } catch (err) {
        return {
          property: prop,
          ok: false,
          status: 0,
          error: err instanceof Error ? err.message : String(err),
        };
      }
    }),
  );

  return {
    submittedAt: new Date().toISOString(),
    results,
  };
}
