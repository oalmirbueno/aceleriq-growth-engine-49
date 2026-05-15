// Server-only helpers: scrape full article via Firecrawl + translate to PT-BR via Lovable AI.
import Firecrawl from "@mendable/firecrawl-js";

const AI_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "google/gemini-2.5-flash";

let _fc: Firecrawl | null = null;
function fc(): Firecrawl | null {
  const key = process.env.FIRECRAWL_API_KEY;
  if (!key) return null;
  if (!_fc) _fc = new Firecrawl({ apiKey: key });
  return _fc;
}

export interface ScrapedArticle {
  markdown: string;
  title?: string;
  description?: string;
  image?: string;
}

export async function scrapeArticle(url: string): Promise<ScrapedArticle | null> {
  const client = fc();
  if (!client) return null;
  try {
    const res: any = await Promise.race([
      client.scrape(url, {
        formats: ["markdown"],
        onlyMainContent: true,
        timeout: 15000,
      }),
      new Promise((_, rej) => setTimeout(() => rej(new Error("firecrawl-timeout")), 18000)),
    ]);
    const markdown = res?.markdown ?? res?.data?.markdown ?? "";
    const meta = res?.metadata ?? res?.data?.metadata ?? {};
    if (!markdown || markdown.length < 200) return null;
    return {
      markdown: markdown.slice(0, 18000),
      title: meta.title,
      description: meta.description ?? meta.ogDescription,
      image: meta.ogImage ?? meta.image,
    };
  } catch {
    return null;
  }
}

async function aiChat(system: string, user: string, jsonMode = false): Promise<string | null> {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch(AI_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        ...(jsonMode ? { response_format: { type: "json_object" } } : {}),
      }),
      signal: AbortSignal.timeout(25000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.choices?.[0]?.message?.content ?? null;
  } catch {
    return null;
  }
}

export async function translateArticleToPt(args: {
  title: string;
  markdown: string;
  source: string;
}): Promise<{ title: string; markdown: string } | null> {
  const sys =
    "Você é um editor sênior de conteúdo da Aceleriq, agência brasileira de IA, automação e marketing de performance. Traduza e adapte conteúdos para o português do Brasil em tom profissional, direto, sem clichês e sem traços/travessões (use vírgulas). Mantenha estrutura em Markdown (títulos ##, listas, negrito). Não invente fatos. Não inclua avisos do tradutor. Não inclua a fonte ou créditos no corpo, eles serão exibidos separadamente.";
  const user = `Traduza para português brasileiro o artigo abaixo, mantendo a formatação Markdown. Remova qualquer cabeçalho repetido com o título, navegação, banners de cookies, calls-to-action do site original e blocos de \"leia mais\". Devolva APENAS um JSON com as chaves \"title\" (string) e \"markdown\" (string).\n\nTítulo original: ${args.title}\nFonte: ${args.source}\n\n--- CONTEÚDO ---\n${args.markdown}`;
  const out = await aiChat(sys, user, true);
  if (!out) return null;
  try {
    const parsed = JSON.parse(out);
    if (parsed?.title && parsed?.markdown) {
      return { title: String(parsed.title).trim(), markdown: String(parsed.markdown).trim() };
    }
  } catch {}
  return null;
}

export async function translateBatchTitles(
  items: { id: string; title: string; excerpt: string }[],
): Promise<Record<string, { title: string; excerpt: string }> | null> {
  if (!items.length) return {};
  const sys =
    "Você traduz manchetes e resumos de notícias para português brasileiro com tom editorial profissional. Sem traços/travessões (use vírgulas). Sem aspas decorativas. Sem inventar.";
  const user = `Traduza os itens a seguir para PT-BR. Devolva APENAS um JSON: { "items": [ { "id": string, "title": string, "excerpt": string } ] }.\n\n${JSON.stringify(items)}`;
  const out = await aiChat(sys, user, true);
  if (!out) return null;
  try {
    const parsed = JSON.parse(out);
    const map: Record<string, { title: string; excerpt: string }> = {};
    for (const it of parsed?.items ?? []) {
      if (it?.id) map[it.id] = { title: String(it.title ?? ""), excerpt: String(it.excerpt ?? "") };
    }
    return map;
  } catch {
    return null;
  }
}
