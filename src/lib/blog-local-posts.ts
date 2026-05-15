// Posts próprios da Aceleriq.
// Adicione aqui artigos autorais — eles aparecem no topo do feed,
// abrem internamente em /blog/$slug, e entram no sitemap.xml.
//
// Slug é derivado do title (slugify). Mantenha único.

import type { FeedCategory } from "./blog-feeds";

export interface LocalPost {
  title: string;
  excerpt: string;
  /** URL absoluta de imagem de capa. Pode ser de /src/assets ou externa. */
  image?: string;
  category: FeedCategory;
  publishedAt: string; // ISO
  author?: string;
  /** Conteúdo em markdown simples (parágrafos separados por linha em branco). */
  content: string;
}

export const LOCAL_POSTS: LocalPost[] = [
  {
    title: "O Método A.C.E.L.E.R.A: como a Aceleriq estrutura crescimento previsível com IA",
    excerpt:
      "Estratégia, dados, automação e IA aplicados em sequência. O framework que usamos para transformar marketing em receita previsível.",
    category: "crescimento",
    publishedAt: new Date().toISOString(),
    author: "Equipe Aceleriq",
    content: `O mercado está saturado de promessas em torno de IA, mas pouquíssimas empresas conseguem traduzir essas promessas em receita real. A diferença está no método.

Na Aceleriq, partimos de um princípio simples: tecnologia sem estratégia é custo. Por isso, todo projeto começa pelo diagnóstico do funil de receita do cliente, e só depois entram automações, agentes de IA e tráfego pago.

O framework A.C.E.L.E.R.A organiza essa jornada em sete movimentos: Análise, Construção, Estratégia, Lançamento, Execução, Refinamento e Aceleração. Cada etapa tem entregáveis claros, métricas próprias e um sistema de feedback que conecta marketing, vendas e operação.

O resultado é previsibilidade. Em vez de campanhas isoladas, o cliente passa a operar uma máquina de aquisição que aprende sozinha, melhora a cada ciclo e gera receita de forma composta.`,
  },
];
