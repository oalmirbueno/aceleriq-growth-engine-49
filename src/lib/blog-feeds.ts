// Niche-only feeds for Aceleriq.
// Google News RSS = real-time, gratuito, sem API key. A query define o nicho.
// Cada item já vem com fonte original (Exame, Olhar Digital, MIT, etc.).

export type FeedCategory =
  | "comercial"
  | "ia_automacao"
  | "marketing"
  | "trafego"
  | "locais"
  | "processos";

export interface FeedSource {
  id: string;
  name: string;
  url: string;
  category: FeedCategory;
  lang: "pt" | "en";
}

const gnews = (q: string, lang: "pt" | "en" = "pt") =>
  lang === "pt"
    ? `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=pt-BR&gl=BR&ceid=BR:pt-419`
    : `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-US&gl=US&ceid=US:en`;

export const FEEDS: FeedSource[] = [
  // IA e Automação
  { id: "gn-ia-automacao", name: "Google News", category: "ia_automacao", lang: "pt",
    url: gnews('"IA generativa" OR "ChatGPT" OR "agentes de IA" OR "n8n" OR "automação" when:14d') },

  // Marketing e Conteúdo
  { id: "gn-marketing", name: "Google News", category: "marketing", lang: "pt",
    url: gnews('"marketing de conteúdo" OR "estratégia de marketing" OR "branding" when:14d') },

  // Tráfego pago
  { id: "gn-trafego", name: "Google News", category: "trafego", lang: "pt",
    url: gnews('"tráfego pago" OR "Google Ads" OR "Meta Ads" when:14d') },

  // Comercial e CRM
  { id: "gn-comercial", name: "Google News", category: "comercial", lang: "pt",
    url: gnews('"CRM" OR "pipeline de vendas" OR "vendas B2B" OR "estruturação comercial" when:14d') },

  // Negócios Locais
  { id: "gn-locais", name: "Google News", category: "locais", lang: "pt",
    url: gnews('"marketing para negócios locais" OR "Google Meu Negócio" when:14d') },

  // Processos e Operação
  { id: "gn-processos", name: "Google News", category: "processos", lang: "pt",
    url: gnews('"processos de negócio" OR "eficiência operacional" OR "gestão por dados" when:14d') },
];

export const CATEGORIES: { id: FeedCategory; label: string }[] = [
  { id: "comercial", label: "Comercial e CRM" },
  { id: "ia_automacao", label: "Automação e IA" },
  { id: "marketing", label: "Marketing e Conteúdo" },
  { id: "trafego", label: "Tráfego Pago" },
  { id: "locais", label: "Negócios Locais" },
  { id: "processos", label: "Processos e Operação" },
];

// Whitelist: ao menos um termo precisa aparecer no título ou excerpt.
export const RELEVANCE_KEYWORDS: string[] = [
  "marketing", "marketing digital", "agência", "agencia",
  "inteligência artificial", "inteligencia artificial", "ia ", " ia,", " ai ",
  "ia generativa", "chatgpt", "openai", "gemini", "claude", "llm", "modelo de linguagem",
  "automação", "automacao", "automation", "workflow", "n8n", "make", "zapier",
  "tráfego", "trafego", "google ads", "meta ads", "facebook ads", "instagram ads",
  "performance", "lead", "leads", "funil", "conversão", "conversao",
  "crm", "vendas", "sales", "pipeline", "rd station", "hubspot", "pipedrive",
  "growth", "saas", "b2b", "receita",
  "seo", "branding", "site", "landing page", "e-commerce", "ecommerce",
  "whatsapp business", "atendimento",
];

// Blacklist: descarta lixo de consumo / fofoca / política / esporte etc.
export const BLOCKLIST_KEYWORDS: string[] = [
  "electrolux", "geladeira", "fogão", "fogao", "micro-ondas", "lava-louças", "lava-roupas",
  "celular", "smartphone (review", "iphone barato", "samsung galaxy a",
  "novela", "bbb", "big brother", "famoso", "celebridade", "fofoca",
  "presidente", "lula", "bolsonaro", "eleições", "eleicoes", "ministro",
  "futebol", "flamengo", "corinthians", "neymar", "copa do mundo",
  "receita federal" /* desambigua de "receita previsível" via whitelist */,
  "horóscopo", "horoscopo", "loteria", "mega-sena",
];
