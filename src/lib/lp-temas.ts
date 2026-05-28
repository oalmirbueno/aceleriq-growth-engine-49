import type { FeedCategory } from "@/lib/blog-feeds";

export type LpTemaSlug =
  | "ia_automacao"
  | "trafego"
  | "marketing"
  | "comercial"
  | "locais"
  | "processos";

export interface LpTema {
  slug: LpTemaSlug;
  /** Mapeia para a categoria do blog (mesma string). */
  category: FeedCategory;
  eyebrow: string;
  h1: string;
  highlight: string;
  subhead: string;
  /** Dores que essa LP combate — bullets curtos. */
  dores: string[];
  /** O que o lead recebe no Diagnóstico, contextualizado ao tema. */
  entregaveis: string[];
  /** 3 provas / números / casos. */
  provas: { kpi: string; label: string }[];
  /** CTA principal. */
  ctaLabel: string;
  /** SEO title / description. */
  seoTitle: string;
  seoDescription: string;
}

export const LP_TEMAS: Record<LpTemaSlug, LpTema> = {
  ia_automacao: {
    slug: "ia_automacao",
    category: "ia_automacao",
    eyebrow: "Diagnóstico Aceleriq · IA e Automação",
    h1: "Automação e IA que",
    highlight: "organiza e acelera",
    subhead:
      "Mapeamos onde a IA generativa e as automações podem reduzir atrasos e organizar o atendimento no seu negócio em 30 dias.",
    dores: [
      "Lead chega pelo WhatsApp e demora para ser atendido",
      "Time comercial perdendo tempo com tarefas manuais e repetitivas",
      "CRM desatualizado por falta de automação entre ferramentas",
    ],
    entregaveis: [
      "Diagnóstico de fluxos que podem ser automatizados agora",
      "Sugestão de agentes de IA para qualificação e suporte",
      "Roadmap de implantação de n8n, Make e integradores",
    ],
    provas: [
      { kpi: "↓ 70%", label: "tempo de resposta a novos leads" },
      { kpi: "24/7", label: "atendimento e qualificação ativa" },
      { kpi: "100%", label: "dos leads registrados no CRM" },
    ],
    ctaLabel: "Quero meu mapa de automação",
    seoTitle: "Automação e IA para empresas — Diagnóstico Aceleriq",
    seoDescription:
      "Descubra como a IA e a automação podem organizar seu atendimento e acelerar suas vendas. Diagnóstico gratuito da Aceleriq.",
  },
  trafego: {
    slug: "trafego",
    category: "trafego",
    eyebrow: "Diagnóstico Aceleriq · Tráfego pago",
    h1: "Tráfego pago que",
    highlight: "escala com base",
    subhead:
      "Aumente seu investimento em Google e Meta Ads com a segurança de uma operação pronta para converter os leads.",
    dores: [
      "Investimento em anúncios sem leitura clara de retorno real",
      "Muitos cliques e leads, mas poucas vendas fechadas",
      "Sensação de que está jogando dinheiro fora em tráfego",
    ],
    entregaveis: [
      "Auditoria de contas Meta Ads e Google Ads",
      "Diagnóstico de funil: clique até a venda no CRM",
      "Plano de aceleração de mídia para escala saudável",
    ],
    provas: [
      { kpi: "+ 40%", label: "eficiência em conversão de leads" },
      { kpi: "Real", label: "leitura de ROI integrada ao CRM" },
      { kpi: "Data", label: "decisões baseadas em lucro, não clique" },
    ],
    ctaLabel: "Quero escalar meu tráfego",
    seoTitle: "Gestão de Tráfego Pago Estratégico — Aceleriq",
    seoDescription:
      "Escalamos seu tráfego pago conectando anúncios ao seu processo comercial. Auditoria gratuita da Aceleriq.",
  },
  marketing: {
    slug: "marketing",
    category: "marketing",
    eyebrow: "Diagnóstico Aceleriq · Marketing",
    h1: "Marketing conectado ao",
    highlight: "comercial e vendas",
    subhead:
      "Pare de postar por postar. Crie uma estratégia de conteúdo e campanhas focadas em gerar oportunidades reais.",
    dores: [
      "Marketing entrega muito conteúdo que não vira venda",
      "Site desatualizado ou que não capta leads de qualidade",
      "Falta de integração entre o que é postado e o que é vendido",
    ],
    entregaveis: [
      "Diagnóstico de presença digital e posicionamento",
      "Plano de conteúdo orientado a conversão e funil",
      "Estratégia de captura e integração com CRM",
    ],
    provas: [
      { kpi: "+ 3x", label: "mais leads qualificados via site" },
      { kpi: "Zero", label: "posts sem objetivo comercial" },
      { kpi: "100%", label: "foco em autoridade e lucro" },
    ],
    ctaLabel: "Quero marketing com resultado",
    seoTitle: "Marketing de Crescimento e Conteúdo — Aceleriq",
    seoDescription:
      "Marketing digital estratégico focado em gerar negócios, não apenas curtidas. Diagnóstico gratuito.",
  },
  comercial: {
    slug: "comercial",
    category: "comercial",
    eyebrow: "Diagnóstico Aceleriq · Comercial",
    h1: "Vendas com processo e",
    highlight: "previsibilidade real",
    subhead:
      "Organizamos seu CRM, scripts, follow-up e rotina para você ter controle total sobre seu pipeline de vendas.",
    dores: [
      "Perda de leads por falta de acompanhamento (follow-up)",
      "Vendedores sem processo claro, cada um faz de um jeito",
      "Dono da empresa centralizando todas as vendas importantes",
    ],
    entregaveis: [
      "Auditoria de processo comercial e uso de CRM",
      "Desenho de etapas de funil e cadência de contato",
      "Sugestão de scripts e treinamento para o time",
    ],
    provas: [
      { kpi: "+ 50%", label: "organização do pipeline de vendas" },
      { kpi: "Zero", label: "leads esquecidos no WhatsApp" },
      { kpi: "Método", label: "independência do dono na operação" },
    ],
    ctaLabel: "Quero organizar meu comercial",
    seoTitle: "Estruturação Comercial e CRM — Aceleriq",
    seoDescription:
      "Pare de vender no improviso. Estruturamos seu comercial para crescer com previsibilidade. Diagnóstico Aceleriq.",
  },
  locais: {
    slug: "locais",
    category: "locais",
    eyebrow: "Diagnóstico Aceleriq · Negócios Locais",
    h1: "Dominância local com",
    highlight: "Google e WhatsApp",
    subhead:
      "Coloque sua empresa no mapa e transforme buscas locais em clientes chamando no seu WhatsApp todos os dias.",
    dores: [
      "Sua empresa não aparece quando buscam pelo seu serviço",
      "Concorrentes com perfil no Google melhor que o seu",
      "Dificuldade em atrair clientes da sua própria região",
    ],
    entregaveis: [
      "Otimização de Google Meu Negócio (GMN)",
      "Estratégia de anúncios locais para WhatsApp",
      "Configuração de automação básica de atendimento",
    ],
    provas: [
      { kpi: "Top 3", label: "no Google para buscas locais" },
      { kpi: "+ 80%", label: "mais chamadas no WhatsApp local" },
      { kpi: "Fácil", label: "gestão de reputação e avaliações" },
    ],
    ctaLabel: "Quero dominar minha região",
    seoTitle: "Marketing para Negócios Locais — Aceleriq",
    seoDescription:
      "Atraia mais clientes da sua cidade com Google Meu Negócio e anúncios locais. Diagnóstico gratuito.",
  },
  processos: {
    slug: "processos",
    category: "processos",
    eyebrow: "Diagnóstico Aceleriq · Processos",
    h1: "Operação estruturada para",
    highlight: "escalar sem caos",
    subhead:
      "Arrumamos a casa, documentamos processos e instalamos a cultura de dados para sua empresa parar de apagar incêndios.",
    dores: [
      "Empresa cresce mas a bagunça interna aumenta junto",
      "Falta de clareza sobre quem faz o que na operação",
      "Decisões tomadas no 'feeling' sem dados confiáveis",
    ],
    entregaveis: [
      "Mapeamento de processos e gargalos operacionais",
      "Sugestão de rituais de gestão e dashboards de BI",
      "Plano de descentralização e profissionalização",
    ],
    provas: [
      { kpi: "Claro", label: "visão semanal de todos os números" },
      { kpi: "Escala", label: "preparação para crescimento acelerado" },
      { kpi: "Saúde", label: "menos estresse operacional para os sócios" },
    ],
    ctaLabel: "Quero arrumar minha operação",
    seoTitle: "Eficiência Operacional e Processos — Aceleriq",
    seoDescription:
      "Estruture sua operação para crescer com saúde e dados. Diagnóstico operacional gratuito da Aceleriq.",
  },
};

export const LP_TEMA_SLUGS: LpTemaSlug[] = Object.keys(LP_TEMAS) as LpTemaSlug[];

export function isLpTemaSlug(s: string): s is LpTemaSlug {
  return (LP_TEMA_SLUGS as string[]).includes(s);
}

/** Mapeia categoria de post → tema da LP correspondente. */
export function temaForCategory(category: FeedCategory): LpTemaSlug {
  return category;
}
