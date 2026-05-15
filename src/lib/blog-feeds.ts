// Curated free RSS sources — no API keys required.
// We fetch headlines, excerpt, image and link to the original source.
// Original article remains canonical at the source (best practice for syndicated content).

export type FeedCategory =
  | "ia"
  | "automacao"
  | "crescimento"
  | "marketing"
  | "vendas"
  | "negocios";

export interface FeedSource {
  id: string;
  name: string;
  url: string;
  category: FeedCategory;
  lang: "pt" | "en";
}

export const FEEDS: FeedSource[] = [
  // PT-BR
  { id: "olhardigital", name: "Olhar Digital", url: "https://olhardigital.com.br/feed/", category: "ia", lang: "pt" },
  { id: "exame-tecnologia", name: "Exame · Tecnologia", url: "https://exame.com/feed/tecnologia/", category: "negocios", lang: "pt" },
  { id: "exame-negocios", name: "Exame · Negócios", url: "https://exame.com/feed/negocios/", category: "negocios", lang: "pt" },
  { id: "tecmundo", name: "TecMundo", url: "https://www.tecmundo.com.br/rss", category: "ia", lang: "pt" },
  // EN
  { id: "techcrunch-ai", name: "TechCrunch · AI", url: "https://techcrunch.com/category/artificial-intelligence/feed/", category: "ia", lang: "en" },
  { id: "mit-tr-ai", name: "MIT Technology Review", url: "https://www.technologyreview.com/topic/artificial-intelligence/feed", category: "ia", lang: "en" },
  { id: "venturebeat-ai", name: "VentureBeat · AI", url: "https://venturebeat.com/category/ai/feed/", category: "ia", lang: "en" },
  { id: "hbr", name: "Harvard Business Review", url: "https://hbr.org/feed", category: "crescimento", lang: "en" },
];

export const CATEGORIES: { id: FeedCategory; label: string }[] = [
  { id: "ia", label: "IA" },
  { id: "automacao", label: "Automação" },
  { id: "crescimento", label: "Crescimento" },
  { id: "marketing", label: "Marketing" },
  { id: "vendas", label: "Vendas" },
  { id: "negocios", label: "Negócios" },
];
