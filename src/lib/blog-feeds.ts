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
  // IA aplicada a negócios
  { id: "gn-ia-empresas", name: "Google News", category: "ia", lang: "pt",
    url: gnews('"inteligência artificial" (empresas OR negócios OR marketing OR vendas) when:14d') },
  { id: "gn-ia-generativa", name: "Google News", category: "ia", lang: "pt",
    url: gnews('"IA generativa" OR "ChatGPT" OR "agentes de IA" when:14d') },

  // Automação
  { id: "gn-automacao-mkt", name: "Google News", category: "automacao", lang: "pt",
    url: gnews('"automação de marketing" OR "marketing automation" OR "n8n" OR "workflow" when:14d') },
  { id: "gn-automacao-comercial", name: "Google News", category: "automacao", lang: "pt",
    url: gnews('"automação comercial" OR "automação de vendas" OR "WhatsApp Business API" when:14d') },

  // Tráfego pago
  { id: "gn-trafego", name: "Google News", category: "trafego", lang: "pt",
    url: gnews('"tráfego pago" OR "Google Ads" OR "Meta Ads" OR "performance marketing" when:14d') },

  // Marketing digital
  { id: "gn-marketing", name: "Google News", category: "marketing", lang: "pt",
    url: gnews('"marketing digital" OR "agência de marketing" OR "branding" when:14d') },
  { id: "gn-seo", name: "Google News", category: "marketing", lang: "pt",
    url: gnews('"SEO" OR "search engine optimization" OR "Google Search" when:14d') },

  // Vendas / CRM
  { id: "gn-vendas", name: "Google News", category: "vendas", lang: "pt",
    url: gnews('"CRM" OR "pipeline de vendas" OR "vendas B2B" OR "RD Station" OR "HubSpot" when:14d') },

  // Crescimento / growth
  { id: "gn-growth", name: "Google News", category: "crescimento", lang: "pt",
    url: gnews('"growth marketing" OR "growth hacking" OR "receita previsível" when:14d') },

  // EN — referências globais filtradas
  { id: "gn-ai-business-en", name: "Google News", category: "ia", lang: "en",
    url: gnews('"AI" (business OR marketing OR sales OR enterprise) when:7d', "en") },
];

export const CATEGORIES: { id: FeedCategory; label: string }[] = [
  { id: "ia", label: "IA" },
  { id: "automacao", label: "Automação" },
  { id: "trafego", label: "Tráfego Pago" },
  { id: "marketing", label: "Marketing" },
  { id: "vendas", label: "Vendas & CRM" },
  { id: "crescimento", label: "Crescimento" },
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
