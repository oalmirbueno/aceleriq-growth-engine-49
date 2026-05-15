// Wrapper compartilhado para a URL Inspection API do Google Search Console
// (via Lovable Connector Gateway). Reusado pelo checker manual e pelo cron.

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";
const GSC_PROPERTY = "https://aceleriq.com.br/";

export interface GoogleIndexResult {
  available: boolean;
  verdict?: string;
  coverageState?: string;
  lastCrawlTime?: string | null;
  pageFetchState?: string;
  indexingState?: string;
  googleCanonical?: string | null;
  userCanonical?: string | null;
  robotsTxtState?: string;
  inspectionUrl?: string | null;
  error?: string;
}

export async function inspectGoogleUrl(url: string): Promise<GoogleIndexResult> {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const gscKey = process.env.GOOGLE_SEARCH_CONSOLE_API_KEY;
  if (!lovableKey || !gscKey) {
    return { available: false, error: "Conector GSC não configurado." };
  }
  try {
    const res = await fetch(`${GATEWAY}/v1/urlInspection/index:inspect`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": gscKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inspectionUrl: url,
        siteUrl: GSC_PROPERTY,
        languageCode: "pt-BR",
      }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { available: false, error: `GSC ${res.status}: ${text.slice(0, 200)}` };
    }
    const json = (await res.json()) as {
      inspectionResult?: {
        indexStatusResult?: {
          verdict?: string;
          coverageState?: string;
          lastCrawlTime?: string;
          pageFetchState?: string;
          indexingState?: string;
          googleCanonical?: string;
          userCanonical?: string;
          robotsTxtState?: string;
        };
        inspectionResultLink?: string;
      };
    };
    const r = json.inspectionResult?.indexStatusResult ?? {};
    return {
      available: true,
      verdict: r.verdict,
      coverageState: r.coverageState,
      lastCrawlTime: r.lastCrawlTime ?? null,
      pageFetchState: r.pageFetchState,
      indexingState: r.indexingState,
      googleCanonical: r.googleCanonical ?? null,
      userCanonical: r.userCanonical ?? null,
      robotsTxtState: r.robotsTxtState,
      inspectionUrl: json.inspectionResult?.inspectionResultLink ?? null,
    };
  } catch (err) {
    return { available: false, error: err instanceof Error ? err.message : String(err) };
  }
}
