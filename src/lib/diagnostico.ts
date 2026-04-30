// Lógica de scoring + classificação + recomendações do Diagnóstico Aceleriq.

export type Faturamento =
  | "ate_100k"
  | "100k_300k"
  | "300k_1m"
  | "1m_5m"
  | "acima_5m";

export type Interesse =
  | "marketing"
  | "vendas"
  | "crm"
  | "ia"
  | "dados"
  | "automacao"
  | "operacao";

export interface CapturaForm {
  nome: string;
  whatsapp: string;
  empresa: string;
  site_instagram: string;
  faturamento_mensal: Faturamento;
  principal_gargalo: string;
  interesse_principal: Interesse;
}

export interface QuizQuestion {
  id: string;
  pergunta: string;
  area: "estrategia" | "marketing" | "vendas" | "operacao" | "ia_dados";
  hintMin: string;
  hintMax: string;
}

export const QUIZ: QuizQuestion[] = [
  {
    id: "estrategia_clara",
    area: "estrategia",
    pergunta: "Você tem um plano estratégico de crescimento documentado para os próximos 12 meses?",
    hintMin: "Não temos",
    hintMax: "Plano vivo e revisado",
  },
  {
    id: "icp_definido",
    area: "estrategia",
    pergunta: "Seu ICP (cliente ideal) e posicionamento estão claros para o time todo?",
    hintMin: "Confuso",
    hintMax: "Cristalino",
  },
  {
    id: "trafego_roi",
    area: "marketing",
    pergunta: "Você consegue ler o ROI de cada canal de aquisição (Meta, Google, orgânico)?",
    hintMin: "Não meço",
    hintMax: "ROI por canal",
  },
  {
    id: "criativos",
    area: "marketing",
    pergunta: "Existe um processo de produção contínua de criativos e conteúdo?",
    hintMin: "Esporádico",
    hintMax: "Esteira semanal",
  },
  {
    id: "processo_comercial",
    area: "vendas",
    pergunta: "Seu time comercial segue um playbook com cadência, scripts e qualificação?",
    hintMin: "Cada um faz como quer",
    hintMax: "Playbook ativo",
  },
  {
    id: "crm_ativo",
    area: "vendas",
    pergunta: "O CRM está estruturado, atualizado e usado pelo time todos os dias?",
    hintMin: "Não usamos",
    hintMax: "Hub da operação",
  },
  {
    id: "previsibilidade",
    area: "vendas",
    pergunta: "Você consegue prever a receita do próximo mês com confiança?",
    hintMin: "Adivinhação",
    hintMax: "Forecast confiável",
  },
  {
    id: "automacao",
    area: "operacao",
    pergunta: "Existem automações entre marketing, CRM, atendimento e operação?",
    hintMin: "Tudo manual",
    hintMax: "Fluxos integrados",
  },
  {
    id: "dados_dashboard",
    area: "ia_dados",
    pergunta: "Você tem dashboards confiáveis (CAC, LTV, conversão, pipeline) para decidir?",
    hintMin: "Planilha solta",
    hintMax: "BI executivo",
  },
  {
    id: "ia_aplicada",
    area: "ia_dados",
    pergunta: "IA já está aplicada em algum ponto da operação (atendimento, qualificação, conteúdo)?",
    hintMin: "Não usamos",
    hintMax: "IA em produção",
  },
  {
    id: "dependencia_dono",
    area: "operacao",
    pergunta: "A operação roda sem depender 100% do sócio/dono na ponta?",
    hintMin: "Tudo passa por mim",
    hintMax: "Roda sozinha",
  },
  {
    id: "ritual_dados",
    area: "operacao",
    pergunta: "Existe um ritual semanal de leitura de dados e ajuste de prioridades?",
    hintMin: "Não temos",
    hintMax: "Ritual fixo",
  },
];

export type QuizAnswers = Record<string, number>; // 1..5

// ─── Scoring ─────────────────────────────────────────
export function calcScore(answers: QuizAnswers): number {
  const total = QUIZ.reduce((acc, q) => acc + (answers[q.id] ?? 0), 0);
  const max = QUIZ.length * 5;
  return Math.round((total / max) * 100);
}

export type Classificacao =
  | "Operação Reativa"
  | "Em Estruturação"
  | "Em Aceleração"
  | "Sistema de Crescimento";

export function classificar(score: number): {
  label: Classificacao;
  resumo: string;
} {
  if (score < 35) {
    return {
      label: "Operação Reativa",
      resumo:
        "Sua operação ainda depende de heroísmo e improviso. O potencial está intacto — falta engenharia.",
    };
  }
  if (score < 60) {
    return {
      label: "Em Estruturação",
      resumo:
        "Você já tem peças no lugar, mas elas não conversam. Falta sistema, dados e ritmo para escalar com previsibilidade.",
    };
  }
  if (score < 80) {
    return {
      label: "Em Aceleração",
      resumo:
        "Sua operação está madura. Agora é hora de instalar IA, automação avançada e abrir novos canais com método.",
    };
  }
  return {
    label: "Sistema de Crescimento",
    resumo:
      "Você opera como sistema. O foco passa a ser otimizar margem, expandir canais e blindar o crescimento.",
  };
}

// ─── Recomendações ───────────────────────────────────
type AreaScores = Record<QuizQuestion["area"], { sum: number; count: number }>;

function areaScores(answers: QuizAnswers): AreaScores {
  const init: AreaScores = {
    estrategia: { sum: 0, count: 0 },
    marketing: { sum: 0, count: 0 },
    vendas: { sum: 0, count: 0 },
    operacao: { sum: 0, count: 0 },
    ia_dados: { sum: 0, count: 0 },
  };
  for (const q of QUIZ) {
    const v = answers[q.id] ?? 0;
    init[q.area].sum += v;
    init[q.area].count += 1;
  }
  return init;
}

const RECS: Record<QuizQuestion["area"], string> = {
  estrategia:
    "Reconstruir o plano estratégico com ICP, oferta, metas trimestrais e priorização — base de tudo que vem depois.",
  marketing:
    "Instalar leitura de ROI por canal, esteira de criativos e funil de aquisição lido por receita, não por clique.",
  vendas:
    "Estruturar CRM, playbook comercial, cadência e ritual de pipeline para gerar previsibilidade de receita.",
  ia_dados:
    "Construir camada de dados (dashboards CAC/LTV/pipeline) e iniciar IA aplicada em qualificação e atendimento.",
  operacao:
    "Documentar processos, distribuir responsabilidades e criar automações que tirem o dono da operação.",
};

const INTERESSE_REC: Record<Interesse, string> = {
  marketing:
    "Aprofundar a operação de tráfego e conteúdo com leitura de receita, esteira criativa e funil instrumentado.",
  vendas:
    "Estruturar processo comercial completo: CRM, cadência, qualificação, scripts e ritual de pipeline.",
  crm:
    "Reengenharia do CRM como hub da operação — automações, integrações e leitura de funil em tempo real.",
  ia:
    "Implantar IA aplicada (agentes, qualificação, atendimento) integrada ao seu CRM e ao seu funil.",
  dados:
    "Camada de dados e BI executivo: CAC, LTV, conversão por etapa, dashboards de receita semanais.",
  automacao:
    "Mapear gargalos e instalar automações entre marketing, CRM, atendimento e operação (n8n / Make / nativas).",
  operacao:
    "Estruturar pessoas, papéis, rituais e SOPs para que a operação rode sem depender do sócio.",
};

export function recomendar(
  answers: QuizAnswers,
  interesse: Interesse,
): string[] {
  const scores = areaScores(answers);
  // Top 2 áreas mais fracas (menor média)
  const ranked = (Object.keys(scores) as QuizQuestion["area"][])
    .map((k) => ({ area: k, avg: scores[k].sum / Math.max(scores[k].count, 1) }))
    .sort((a, b) => a.avg - b.avg);

  const recs: string[] = [];
  // 1ª recomendação: sempre baseada no interesse declarado
  recs.push(INTERESSE_REC[interesse]);
  // 2ª e 3ª: áreas mais fracas que ainda não foram cobertas
  for (const r of ranked) {
    if (recs.length >= 3) break;
    const text = RECS[r.area];
    if (!recs.includes(text)) recs.push(text);
  }
  return recs.slice(0, 3);
}

// ─── Faturamento helpers ─────────────────────────────
export const FATURAMENTO_OPTIONS: { value: Faturamento; label: string }[] = [
  { value: "ate_100k", label: "Até R$ 100 mil/mês" },
  { value: "100k_300k", label: "R$ 100 mil – R$ 300 mil/mês" },
  { value: "300k_1m", label: "R$ 300 mil – R$ 1 milhão/mês" },
  { value: "1m_5m", label: "R$ 1 milhão – R$ 5 milhões/mês" },
  { value: "acima_5m", label: "Acima de R$ 5 milhões/mês" },
];

export const INTERESSE_OPTIONS: { value: Interesse; label: string }[] = [
  { value: "marketing", label: "Marketing & Tráfego" },
  { value: "vendas", label: "Vendas & Processo Comercial" },
  { value: "crm", label: "CRM & Funil" },
  { value: "ia", label: "Inteligência Artificial" },
  { value: "dados", label: "Dados & Dashboards" },
  { value: "automacao", label: "Automação" },
  { value: "operacao", label: "Estrutura Operacional" },
];

export function formatResumoWhatsapp(args: {
  captura: CapturaForm;
  score: number;
  classificacao: string;
  recomendacoes: string[];
}): string {
  const { captura, score, classificacao, recomendacoes } = args;
  const lines = [
    `Olá! Acabei de finalizar o Diagnóstico de Maturidade da Aceleriq.`,
    ``,
    `*Empresa:* ${captura.empresa}`,
    `*Nome:* ${captura.nome}`,
    `*Faturamento:* ${
      FATURAMENTO_OPTIONS.find((o) => o.value === captura.faturamento_mensal)?.label
    }`,
    `*Interesse principal:* ${
      INTERESSE_OPTIONS.find((o) => o.value === captura.interesse_principal)?.label
    }`,
    ``,
    `*Score:* ${score}/100`,
    `*Classificação:* ${classificacao}`,
    ``,
    `*Recomendações:*`,
    ...recomendacoes.map((r, i) => `${i + 1}. ${r}`),
    ``,
    `Quero entender o próximo passo com o time da Aceleriq.`,
  ];
  return lines.join("\n");
}
