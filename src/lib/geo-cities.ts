export type GeoCity = {
  slug: string;
  city: string;
  uf: string;
  region: string;
  eyebrow: string;
  h1Lead: string;
  intro: string;
  humanTitle: string;
  humanBody: string;
  faqLocal: { q: string; a: string };
};

export const GEO_CITIES: GeoCity[] = [
  {
    slug: "agencia-de-marketing-digital-sao-paulo",
    city: "São Paulo",
    uf: "SP",
    region: "Grande São Paulo · Interior · ABC",
    eyebrow: "São Paulo · SP · Atendimento nacional",
    h1Lead: "Agência de marketing digital em São Paulo, conectada ao",
    intro: "Atendemos empresas em São Paulo capital, Grande SP, ABC e interior com marketing de crescimento integrado ao comercial. Tráfego pago, sites, automação e CRM operados por um time único, com ritual semanal e reporte executivo.",
    humanTitle: "Time dedicado para operar o marketing de empresas paulistas",
    humanBody: "Reuniões semanais no fuso de São Paulo, integração com seu comercial e mídia paga otimizada para o mercado mais competitivo do Brasil. Você fala com quem executa.",
    faqLocal: {
      q: "A Aceleriq atende empresas em São Paulo presencialmente?",
      a: "Sim. Sede operacional em Curitiba/PR, com atendimento 100% remoto para São Paulo capital, Grande SP, ABC e interior. Reuniões presenciais sob demanda para contratos de maior porte.",
    },
  },
  {
    slug: "agencia-de-marketing-digital-rio-de-janeiro",
    city: "Rio de Janeiro",
    uf: "RJ",
    region: "Zona Sul · Zona Oeste · Baixada · Niterói",
    eyebrow: "Rio de Janeiro · RJ · Atendimento nacional",
    h1Lead: "Agência de marketing digital no Rio de Janeiro, conectada ao",
    intro: "Operamos marketing e vendas para empresas cariocas e fluminenses com foco em receita. Zona Sul, Barra, Niterói e interior, com estratégia, tráfego pago e automação amarrados ao seu CRM.",
    humanTitle: "Marketing de performance para empresas cariocas",
    humanBody: "Sabemos como comunicar para o público do Rio: estética forte, mensagem direta, oferta clara. Mídia paga, conteúdo e funil de vendas desenhados para a realidade fluminense.",
    faqLocal: {
      q: "A Aceleriq atende empresas no Rio de Janeiro?",
      a: "Sim. Atendemos empresas no Rio de Janeiro capital, região metropolitana e interior de forma 100% remota, com ritual semanal e reporte executivo mensal.",
    },
  },
  {
    slug: "agencia-de-marketing-digital-belo-horizonte",
    city: "Belo Horizonte",
    uf: "MG",
    region: "Região Metropolitana · Contagem · Nova Lima",
    eyebrow: "Belo Horizonte · MG · Atendimento nacional",
    h1Lead: "Agência de marketing digital em Belo Horizonte, conectada ao",
    intro: "Marketing de crescimento para empresas mineiras que querem escalar sem perder o pé no chão. BH, Contagem, Nova Lima e interior de Minas com tráfego, CRM e automação integrados ao comercial.",
    humanTitle: "Operação séria para o jeito mineiro de fazer negócio",
    humanBody: "Relacionamento longo, decisão baseada em números e execução consistente. Reuniões semanais, dashboards claros e o comercial da sua empresa alimentado com leads qualificados.",
    faqLocal: {
      q: "A Aceleriq atende empresas em Belo Horizonte e interior de Minas?",
      a: "Sim. Atendemos BH, região metropolitana e interior de Minas Gerais de forma remota, com contratos mensais recorrentes e ritual semanal de performance.",
    },
  },
  {
    slug: "agencia-de-marketing-digital-porto-alegre",
    city: "Porto Alegre",
    uf: "RS",
    region: "Grande POA · Serra · Vale dos Sinos",
    eyebrow: "Porto Alegre · RS · Atendimento nacional",
    h1Lead: "Agência de marketing digital em Porto Alegre, conectada ao",
    intro: "Estruturamos marketing e vendas de empresas gaúchas com foco em receita recorrente. POA, Serra Gaúcha, Vale dos Sinos e interior do RS com tráfego pago, automação e CRM operados em conjunto.",
    humanTitle: "Trabalho firme, entrega no prazo, resultado documentado",
    humanBody: "Reunião semanal, relatório mensal, meta trimestral. Sem enrolação, sem métrica de vaidade. Só o que faz o comercial da sua empresa vender mais.",
    faqLocal: {
      q: "A Aceleriq atende empresas no Rio Grande do Sul?",
      a: "Sim. Atendemos Porto Alegre, Grande POA, Serra Gaúcha, Vale dos Sinos e interior do RS remotamente, com ritual semanal e reporte mensal.",
    },
  },
  {
    slug: "agencia-de-marketing-digital-brasilia",
    city: "Brasília",
    uf: "DF",
    region: "Plano Piloto · Águas Claras · Entorno",
    eyebrow: "Brasília · DF · Atendimento nacional",
    h1Lead: "Agência de marketing digital em Brasília, conectada ao",
    intro: "Marketing de performance para empresas do Distrito Federal e entorno. Plano Piloto, Águas Claras, Taguatinga e cidades satélites com estratégia, tráfego pago e automação integrados ao comercial.",
    humanTitle: "Operação estruturada para o mercado do DF",
    humanBody: "Serviços profissionais, saúde, educação e B2B: os principais setores de Brasília precisam de marketing que fala a linguagem do decisor. Entregamos isso, com dado e ritual.",
    faqLocal: {
      q: "A Aceleriq atende empresas em Brasília e entorno?",
      a: "Sim. Atendemos empresas no Distrito Federal e entorno (Goiás) de forma remota, com contratos mensais e ritual semanal de performance.",
    },
  },
  {
    slug: "agencia-de-marketing-digital-florianopolis",
    city: "Florianópolis",
    uf: "SC",
    region: "Grande Floripa · Norte da Ilha · São José",
    eyebrow: "Florianópolis · SC · Atendimento nacional",
    h1Lead: "Agência de marketing digital em Florianópolis, conectada ao",
    intro: "Marketing e vendas para o ecossistema catarinense de tecnologia, turismo e serviços. Floripa, São José, Balneário e interior de SC com tráfego, automação e CRM integrados.",
    humanTitle: "Time que entende o ritmo de crescimento catarinense",
    humanBody: "Startups, SaaS, turismo e indústria: sabemos o que funciona no mercado de SC. Estratégia enxuta, execução rápida, dashboard aberto.",
    faqLocal: {
      q: "A Aceleriq atende empresas em Santa Catarina?",
      a: "Sim. Atendemos Florianópolis, Grande Floripa, Balneário Camboriú, Joinville, Blumenau e interior de SC remotamente.",
    },
  },
];
