// IndexNow + ping de sitemap. Notifica buscadores (Bing, Yandex, Seznam,
// Naver — Google ainda não suporta IndexNow oficialmente, mas mantemos o
// ping clássico do sitemap para o Google Search abaixo).
//
// A chave abaixo é hospedada em `/<INDEXNOW_KEY>.txt` no mesmo domínio para
// provar a propriedade. Não há nada secreto nessa string — o protocolo
// IndexNow exige apenas que ela seja única e estável.

export const INDEXNOW_KEY = "a7f3c91e8b2d4506e1ad9f72c8b3e5d1";

const SITE_HOST = "aceleriq.com.br";
const SITE_ORIGIN = `https://${SITE_HOST}`;
const SITEMAP_URL = `${SITE_ORIGIN}/sitemap.xml`;

export interface IndexNowResult {
  endpoint: string;
  ok: boolean;
  status: number;
  error?: string;
}

/**
 * Notifica o IndexNow API com uma lista de URLs absolutas. Suporta múltiplos
 * endpoints (Bing/Yandex) — mandar para um já replica para os parceiros, mas
 * por robustez disparamos para os dois.
 */
export async function notifyIndexNow(urls: string[]): Promise<IndexNowResult[]> {
  const cleaned = Array.from(
    new Set(
      urls
        .map((u) => u.trim())
        .filter((u) => u.startsWith(SITE_ORIGIN))
        .slice(0, 10_000),
    ),
  );
  if (cleaned.length === 0) return [];

  const payload = {
    host: SITE_HOST,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_ORIGIN}/${INDEXNOW_KEY}.txt`,
    urlList: cleaned,
  };

  const endpoints = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
  ];

  return Promise.all(
    endpoints.map(async (endpoint): Promise<IndexNowResult> => {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify(payload),
        });
        // 200 = aceito, 202 = aceito em fila, ambos são sucesso
        const ok = res.status === 200 || res.status === 202;
        return {
          endpoint,
          ok,
          status: res.status,
          error: ok ? undefined : (await res.text().catch(() => "")).slice(0, 200),
        };
      } catch (err) {
        return {
          endpoint,
          ok: false,
          status: 0,
          error: err instanceof Error ? err.message : String(err),
        };
      }
    }),
  );
}

/**
 * Ping clássico do sitemap para Google e Bing. Útil como fallback (Google
 * descontinuou o ping em 2023, mas Bing/Yandex continuam respeitando).
 */
export async function pingSitemap(): Promise<IndexNowResult[]> {
  const encoded = encodeURIComponent(SITEMAP_URL);
  const endpoints = [
    `https://www.google.com/ping?sitemap=${encoded}`,
    `https://www.bing.com/ping?sitemap=${encoded}`,
  ];
  return Promise.all(
    endpoints.map(async (endpoint): Promise<IndexNowResult> => {
      try {
        const res = await fetch(endpoint, { method: "GET" });
        return { endpoint, ok: res.ok, status: res.status };
      } catch (err) {
        return {
          endpoint,
          ok: false,
          status: 0,
          error: err instanceof Error ? err.message : String(err),
        };
      }
    }),
  );
}

/**
 * Atalho usado após publicar um post: notifica IndexNow para a URL do post +
 * páginas de listagem que provavelmente mudaram (home, /blog, sitemap).
 */
export async function notifyPostPublished(slug: string): Promise<IndexNowResult[]> {
  const urls = [
    `${SITE_ORIGIN}/blog/${slug}`,
    `${SITE_ORIGIN}/blog`,
    `${SITE_ORIGIN}/`,
    SITEMAP_URL,
  ];
  return notifyIndexNow(urls);
}
