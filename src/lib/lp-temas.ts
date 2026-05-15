import type { FeedCategory } from "@/lib/blog-feeds";

export type LpTemaSlug =
  | "ia"
  | "automacao"
  | "trafego"
  | "marketing"
  | "vendas"
  | "crescimento";

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
  ia: {
    slug: "ia",
    category: "ia",
    eyebrow: "Diagnóstico Aceleriq · IA aplicada",
    h1: "Inteligência Artificial que",
    highlight: "vende, atende e qualifica",
    subhead:
      "Mapeamos onde a IA generativa e os agentes podem destravar receita no seu negócio em 30 dias — sem trocar o time, sem reescrever o stack.",
    dores: [
      "Time gastando horas em tarefas que IA já resolve em segundos",
      "Leads esfriando entre o clique no anúncio e a primeira resposta",
      "Conhecimento da empresa preso em PDF, planilha e cabeça de gente",
    ],
    entregaveis: [
      "Diagnóstico de processos com maior ROI para automatizar com IA",
      "Sugestão de agentes (atendimento, qualificação, copy, ops)",
      "Roadmap de 30/60/90 dias com prioridade por impacto x esforço",
    ],
    provas: [
      { kpi: "↓ 73%", label: "tempo médio de resposta a lead" },
      { kpi: "+ 2.4x", label: "qualificação por SDR humano + agente" },
      { kpi: "30 dias", label: "do diagnóstico ao primeiro agente em produção" },
    ],
    ctaLabel: "Quero meu mapa de IA gratuito",
    seoTitle: "IA para empresas — Diagnóstico Aceleriq gratuito",
    seoDescription:
      "Descubra em 7 minutos onde a Inteligência Artificial pode gerar receita no seu negócio. Diagnóstico gratuito da Aceleriq, especializado em IA aplicada a marketing, vendas e operações.",
  },
  automacao: {
    slug: "automacao",
    category: "automacao",
    eyebrow: "Diagnóstico Aceleriq · Automação",
    h1: "Automação que tira",
    highlight: "trabalho repetitivo do seu time",
    subhead:
      "Identificamos os fluxos que mais sangram tempo e receita — WhatsApp, CRM, marketing, ops — e mostramos o que automatizar primeiro com n8n, Make e IA.",
    dores: [
      "Lead chega pelo WhatsApp e morre antes do SDR responder",
      "CRM desatualizado porque ninguém quer preencher campo manual",
      "Cada campanha exige 3 pessoas para subir, acompanhar e relatar",
    ],
    entregaveis: [
      "Mapa dos 5 fluxos prioritários para automatizar no seu negócio",
      "Estimativa de horas/mês recuperadas por automação",
      "Stack recomendado (n8n, Make, WhatsApp API, RD, HubSpot, etc.)",
    ],
    provas: [
      { kpi: "+ 60h/mês", label: "recuperadas por equipe comercial média" },
      { kpi: "< 60s", label: "primeira resposta automática a lead novo" },
      { kpi: "100%", label: "dos leads no CRM sem digitação manual" },
    ],
    ctaLabel: "Quero meu mapa de automações",
    seoTitle: "Automação de marketing e vendas — Diagnóstico Aceleriq",
    seoDescription:
      "Mapeamos os fluxos que mais consomem tempo no seu time comercial e de marketing e mostramos o que automatizar primeiro. Diagnóstico gratuito da Aceleriq.",
  },
  trafego: {
    slug: "trafego",
    category: "trafego",
    eyebrow: "Diagnóstico Aceleriq · Tráfego pago",
    h1: "Tráfego pago que",
    highlight: "paga a própria conta",
    subhead:
      "Auditoria gratuita das suas contas Google Ads e Meta Ads + plano de mídia para escalar CAC saudável nos próximos 90 dias.",
    dores: [
      "Custo por lead subindo todo mês sem explicação clara",
      "Campanhas no automático, sem hipótese de criativo nem oferta",
      "Não sabe quanto cada canal realmente trouxe de receita fechada",
    ],
    entregaveis: [
      "Auditoria das contas Meta Ads e Google Ads (estrutura, criativos, lances)",
      "Diagnóstico de funil: clique → lead → reunião → fechamento",
      "Plano de mídia 90 dias com meta de CAC e LTV alvo",
    ],
    provas: [
      { kpi: "↓ 38%", label: "CPA médio após reestruturação" },
      { kpi: "+ 2.1x", label: "ROAS em contas com auditoria + criativo novo" },
      { kpi: "7 dias", label: "para entregar o plano de mídia" },
    ],
    ctaLabel: "Quero auditoria de tráfego gratuita",
    seoTitle: "Auditoria de tráfego pago gratuita — Aceleriq",
    seoDescription:
      "Auditoria gratuita das suas campanhas Google Ads e Meta Ads + plano de mídia para escalar com CAC saudável. Diagnóstico Aceleriq, sem compromisso.",
  },
  marketing: {
    slug: "marketing",
    category: "marketing",
    eyebrow: "Diagnóstico Aceleriq · Marketing digital",
    h1: "Marketing digital com",
    highlight: "previsibilidade de receita",
    subhead:
      "Diagnóstico do seu funil de marketing — site, SEO, conteúdo, mídia paga e CRM — com plano de ação focado em receita, não em vaidade.",
    dores: [
      "Marketing produz muito, mas vendas não vê impacto no pipeline",
      "Site recebe tráfego mas converte menos de 1% em lead qualificado",
      "Decisões tomadas no achismo porque os dados estão espalhados",
    ],
    entregaveis: [
      "Diagnóstico de site, SEO técnico, conteúdo e mídia paga",
      "Mapa de jornada do lead: do primeiro toque ao fechamento",
      "Plano de marketing previsível com KPIs de receita atrelados",
    ],
    provas: [
      { kpi: "+ 3.5x", label: "leads qualificados em 90 dias" },
      { kpi: "↓ 41%", label: "CAC após integrar mkt + vendas" },
      { kpi: "Top 3", label: "Google em palavras-chave de receita" },
    ],
    ctaLabel: "Quero diagnóstico do meu marketing",
    seoTitle: "Diagnóstico de marketing digital gratuito — Aceleriq",
    seoDescription:
      "Diagnóstico estratégico do seu marketing digital com foco em receita: site, SEO, conteúdo, mídia paga e CRM. Plano de ação gratuito da Aceleriq.",
  },
  vendas: {
    slug: "vendas",
    category: "vendas",
    eyebrow: "Diagnóstico Aceleriq · Vendas e CRM",
    h1: "Vendas com pipeline",
    highlight: "previsível e CRM vivo",
    subhead:
      "Diagnóstico do seu processo comercial — qualificação, cadência, CRM e handoff com marketing — para destravar receita parada no funil.",
    dores: [
      "Pipeline cheio, mas a previsão do mês nunca bate",
      "SDR e closer trabalhando no instinto, sem playbook nem cadência",
      "Marketing entrega lead, vendas reclama de qualidade — ninguém ganha",
    ],
    entregaveis: [
      "Diagnóstico de funil comercial (volume, conversão, ciclo)",
      "Avaliação do CRM atual (RD, HubSpot, Pipedrive, Sales Hub)",
      "Plano de SLA marketing↔vendas e cadência de SDR",
    ],
    provas: [
      { kpi: "+ 47%", label: "taxa lead → reunião realizada" },
      { kpi: "↓ 22%", label: "ciclo de venda médio" },
      { kpi: "100%", label: "dos deals com etapa, motivo e próxima ação" },
    ],
    ctaLabel: "Quero diagnóstico comercial",
    seoTitle: "Diagnóstico comercial e CRM gratuito — Aceleriq",
    seoDescription:
      "Diagnóstico do seu processo comercial e CRM com plano para destravar receita parada no pipeline. Gratuito, entregue em até 7 dias pela Aceleriq.",
  },
  crescimento: {
    slug: "crescimento",
    category: "crescimento",
    eyebrow: "Diagnóstico Aceleriq · Crescimento",
    h1: "Crescimento com método,",
    highlight: "não com sorte",
    subhead:
      "Diagnóstico estratégico de crescimento — receita, canais, CAC, LTV e oferta — com plano de 90 dias para escalar com unit economics saudável.",
    dores: [
      "Cresceu por inércia e agora não sabe qual canal puxar",
      "Receita previsível só existe na planilha do CFO, não na operação",
      "Cada nova iniciativa começa do zero, sem aprendizado acumulado",
    ],
    entregaveis: [
      "Análise de canais por contribuição real de receita",
      "Diagnóstico de unit economics: CAC, LTV, payback, margem",
      "Plano de crescimento 90 dias com hipóteses priorizadas",
    ],
    provas: [
      { kpi: "+ 2.8x", label: "receita previsível em 12 meses" },
      { kpi: "< 6 meses", label: "payback de CAC alvo" },
      { kpi: "1 plano", label: "consolidando marketing, vendas e produto" },
    ],
    ctaLabel: "Quero plano de crescimento",
    seoTitle: "Plano de crescimento previsível — Diagnóstico Aceleriq",
    seoDescription:
      "Diagnóstico estratégico de crescimento com análise de CAC, LTV, canais e oferta. Plano gratuito de 90 dias para escalar com unit economics saudável.",
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
