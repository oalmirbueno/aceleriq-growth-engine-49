// Geração automática de posts originais (1 por semana) com foco em SEO.
// Fluxo:
//   1. Pega a próxima pauta `pending` da fila (ou recusa se não houver).
//   2. Marca como `generating`.
//   3. Chama Lovable AI Gateway (Gemini 2.5 Pro) com schema JSON estrito.
//   4. Garante slug único e roda o checklist de SEO existente.
//   5. Insere `blog_posts` como `published`.
//   6. Notifica GSC + IndexNow + ping de sitemap em fire-and-forget.
//
// Usado pelo cron semanal e pelo botão "Gerar agora" do admin.

import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { runSeoChecklist, slugify } from "./seo-checklist";
import { submitSitemapToGsc } from "./sitemap-submit.server";
import { notifyPostPublished, pingSitemap } from "./indexnow.server";

const AI_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "google/gemini-2.5-pro";

const VALID_CATEGORIES = [
  "ia",
  "automacao",
  "trafego",
  "marketing",
  "vendas",
  "crescimento",
] as const;
type Category = (typeof VALID_CATEGORIES)[number];

interface QueueRow {
  id: string;
  title: string;
  focus_keyword: string;
  category: string;
  angle: string;
  attempts: number;
}

interface GeneratedPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  seo_title: string;
  seo_description: string;
  focus_keyword: string;
  category: Category;
}

export interface WeeklyPostResult {
  ok: boolean;
  reason?: string;
  topic_id?: string;
  post_id?: string;
  slug?: string;
  title?: string;
  seo_score?: number;
  generated_at: string;
}

// ─── 1. Próxima pauta ────────────────────────────────────────
async function pickNextTopic(): Promise<QueueRow | null> {
  const { data, error } = await supabaseAdmin
    .from("blog_topic_queue")
    .select("id, title, focus_keyword, category, angle, attempts")
    .eq("status", "pending")
    .order("priority", { ascending: true })
    .order("created_at", { ascending: true })
    .limit(1);

  if (error) throw new Error(`queue read failed: ${error.message}`);
  if (!data || data.length === 0) return null;
  return data[0] as QueueRow;
}

async function setTopicStatus(
  id: string,
  patch: Partial<{
    status: "pending" | "generating" | "published" | "skipped" | "failed";
    last_error: string | null;
    generated_post_id: string | null;
    attempts: number;
  }>,
) {
  const { error } = await supabaseAdmin
    .from("blog_topic_queue")
    .update(patch)
    .eq("id", id);
  if (error) console.error("[weekly-post] queue update failed:", error.message);
}

// ─── 2. Slug único ───────────────────────────────────────────
async function ensureUniqueSlug(base: string): Promise<string> {
  const root = slugify(base).slice(0, 80) || `post-${Date.now()}`;
  for (let i = 0; i < 8; i++) {
    const candidate = i === 0 ? root : `${root}-${i + 1}`;
    const { data, error } = await supabaseAdmin
      .from("blog_posts")
      .select("id")
      .eq("slug", candidate)
      .maybeSingle();
    if (error && error.code !== "PGRST116") throw new Error(error.message);
    if (!data) return candidate;
  }
  return `${root}-${Date.now().toString(36)}`;
}

// ─── 3. Chamada à AI Gateway ─────────────────────────────────
const SYSTEM_PROMPT = `Você é editor-chefe da Aceleriq, agência brasileira de IA, automação e marketing de performance baseada em Curitiba.

Sua tarefa: produzir UM artigo original em PT-BR para o blog da Aceleriq, com foco editorial e SEO técnico de altíssimo nível.

REGRAS DE ESTILO (obrigatórias):
- Tom profissional, direto, denso. Zero clichê de marketing ("transforme sua empresa", "no mundo digital de hoje", etc.).
- Nunca use traços (—) ou hífens longos para separar orações. Use vírgulas, ponto-e-vírgulas ou frases curtas.
- Sem emojis. Sem aspas decorativas.
- Frases curtas. Parágrafos de 2-4 linhas.
- Nada de listas de "5 dicas" genéricas. Quando usar lista, justifique cada item com contexto prático brasileiro.
- Cite contexto Brasil/Curitiba/PME quando relevante.

REGRAS DE SEO (obrigatórias):
- A palavra-chave foco aparece naturalmente em: H1 (title), primeiros 100 caracteres do conteúdo, pelo menos 1 H2 e na meta description.
- Densidade da keyword: 0,5% a 1,5%. Não force.
- Inclua 4-6 H2 em ## e 0-3 H3 em ###. Estrutura escaneável.
- Conteúdo entre 1100 e 1700 palavras.
- excerpt: 150-200 caracteres, intrigante, sem clickbait.
- seo_title: 50-60 caracteres, contém a keyword, contém "Aceleriq" só se couber natural.
- seo_description: 140-160 caracteres, contém a keyword, fecha com call-to-action sutil.
- slug: kebab-case, 3-6 palavras, contém a keyword raiz.

REGRAS DE FATO:
- Não invente estatísticas com números específicos. Se citar um fato/estudo, use linguagem como "estudos da McKinsey indicam" sem cravar percentuais inventados.
- Não invente cases de clientes Aceleriq.
- Pode citar players reais do mercado (Google, OpenAI, RD Station, etc.) sem inventar declarações.

SAÍDA: APENAS um JSON válido, sem markdown ao redor, com este shape exato:
{
  "title": string,
  "slug": string,
  "excerpt": string,
  "content": string (markdown puro com ## e ###, sem H1 — o título já é H1),
  "seo_title": string,
  "seo_description": string,
  "focus_keyword": string,
  "category": "ia" | "automacao" | "trafego" | "marketing" | "vendas" | "crescimento"
}`;

function buildUserPrompt(t: QueueRow): string {
  return [
    `Pauta: ${t.title}`,
    `Palavra-chave foco: ${t.focus_keyword}`,
    `Categoria sugerida: ${t.category}`,
    t.angle ? `Ângulo editorial: ${t.angle}` : "",
    "",
    "Produza o artigo seguindo TODAS as regras. Devolva apenas o JSON.",
  ]
    .filter(Boolean)
    .join("\n");
}

async function callAi(topic: QueueRow): Promise<GeneratedPost> {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("LOVABLE_API_KEY ausente");

  const res = await fetch(AI_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(topic) },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    }),
    signal: AbortSignal.timeout(90_000),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`AI gateway ${res.status}: ${body.slice(0, 300)}`);
  }

  const data = await res.json();
  const raw: string = data?.choices?.[0]?.message?.content ?? "";
  if (!raw) throw new Error("AI gateway: resposta vazia");

  let parsed: Partial<GeneratedPost>;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error(`AI gateway: JSON inválido — ${raw.slice(0, 200)}`);
  }

  const required: (keyof GeneratedPost)[] = [
    "title",
    "slug",
    "excerpt",
    "content",
    "seo_title",
    "seo_description",
    "focus_keyword",
    "category",
  ];
  for (const k of required) {
    if (!parsed[k] || typeof parsed[k] !== "string") {
      throw new Error(`AI gateway: campo obrigatório ausente — ${k}`);
    }
  }

  const category = (
    VALID_CATEGORIES.includes(parsed.category as Category)
      ? parsed.category
      : (topic.category as Category)
  ) as Category;

  return {
    title: parsed.title!.trim().slice(0, 200),
    slug: slugify(parsed.slug!).slice(0, 120),
    excerpt: parsed.excerpt!.trim().slice(0, 500),
    content: parsed.content!.trim().slice(0, 50_000),
    seo_title: parsed.seo_title!.trim().slice(0, 120),
    seo_description: parsed.seo_description!.trim().slice(0, 300),
    focus_keyword: parsed.focus_keyword!.trim().slice(0, 80),
    category,
  };
}

// ─── 4. Pipeline ─────────────────────────────────────────────
export async function generateAndPublishWeeklyPost(opts?: {
  topicId?: string;
}): Promise<WeeklyPostResult> {
  const generated_at = new Date().toISOString();

  let topic: QueueRow | null;
  if (opts?.topicId) {
    const { data, error } = await supabaseAdmin
      .from("blog_topic_queue")
      .select("id, title, focus_keyword, category, angle, attempts")
      .eq("id", opts.topicId)
      .single();
    if (error) throw new Error(error.message);
    topic = data as QueueRow;
  } else {
    topic = await pickNextTopic();
  }

  if (!topic) {
    return {
      ok: false,
      reason: "Nenhuma pauta pendente na fila.",
      generated_at,
    };
  }

  await setTopicStatus(topic.id, {
    status: "generating",
    attempts: (topic.attempts ?? 0) + 1,
    last_error: null,
  });

  try {
    const draft = await callAi(topic);
    const slug = await ensureUniqueSlug(draft.slug);

    const report = runSeoChecklist({
      title: draft.title,
      slug,
      excerpt: draft.excerpt,
      content: draft.content,
      cover_image: null,
      seo_title: draft.seo_title,
      seo_description: draft.seo_description,
      focus_keyword: draft.focus_keyword,
    });

    const { data: row, error } = await supabaseAdmin
      .from("blog_posts")
      .insert({
        slug,
        title: draft.title,
        excerpt: draft.excerpt,
        content: draft.content,
        cover_image: null,
        category: draft.category,
        status: "published",
        seo_title: draft.seo_title,
        seo_description: draft.seo_description,
        focus_keyword: draft.focus_keyword,
        author: "Equipe Aceleriq",
        review_notes: JSON.parse(JSON.stringify(report)) as never,
      })
      .select("id, slug")
      .single();
    if (error) throw new Error(`insert blog_posts: ${error.message}`);

    const post = row as { id: string; slug: string };

    await setTopicStatus(topic.id, {
      status: "published",
      generated_post_id: post.id,
    });

    // Fire-and-forget: notifica buscadores
    submitSitemapToGsc().catch((e) =>
      console.error("[weekly-post] GSC failed:", e),
    );
    notifyPostPublished(post.slug).catch((e) =>
      console.error("[weekly-post] IndexNow failed:", e),
    );
    pingSitemap().catch((e) =>
      console.error("[weekly-post] sitemap ping failed:", e),
    );

    return {
      ok: true,
      topic_id: topic.id,
      post_id: post.id,
      slug: post.slug,
      title: draft.title,
      seo_score: report.score,
      generated_at,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await setTopicStatus(topic.id, {
      status: "failed",
      last_error: msg.slice(0, 1000),
    });
    return {
      ok: false,
      reason: msg,
      topic_id: topic.id,
      generated_at,
    };
  }
}
