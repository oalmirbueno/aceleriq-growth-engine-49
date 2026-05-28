import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout, buildServiceHead } from "@/components/site/ServicePageLayout";
import { PortfolioShowcase } from "@/components/site/PortfolioShowcase";

const URL = "https://aceleriq.com.br/agencia-de-marketing-digital-curitiba";
const TITLE = "Marketing de Crescimento conectado ao Comercial | Aceleriq";
const DESCRIPTION =
  "Marketing de crescimento focado em lucro, não em curtidas. Unimos sites, tráfego, automação, IA, CRM e consultoria estratégica conectadas ao seu comercial.";

const FAQS = [
  { q: "A Aceleriq é uma agência de marketing digital completa?", a: "Sim. Operamos as frentes de uma agência completa, sites, tráfego pago, social, conteúdo, automação, CRM, dados, integradas em um sistema de crescimento, não em entregas avulsas." },
  { q: "Vocês atendem fora de Curitiba?", a: "Sim. Sede em Curitiba/PR, atendimento 100% remoto para o Brasil inteiro." },
  { q: "Qual o investimento médio?", a: "Programas mensais a partir de faixas compatíveis com empresas que faturam R$ 100k/mês ou mais. O escopo é desenhado a partir do Diagnóstico Gratuito." },
  { q: "Em quanto tempo aparece resultado?", a: "Entregas táticas (campanhas, automações, site) em 2-4 semanas. Resultado estrutural, previsibilidade comercial e redução de CAC, entre 60 e 120 dias." },
  { q: "Aceleriq é o mesmo que Acelerai?", a: "Não. Aceleriq (com Q no final) é uma agência independente sediada em Curitiba/PR, sem qualquer vínculo com a Acelerai." },
];

export const Route = createFileRoute("/agencia-de-marketing-digital-curitiba")({
  head: () => buildServiceHead({
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    faqs: FAQS,
    serviceName: "Agência de Marketing Digital",
  }),
  component: Page,
});

function Page() {
  return (
    <ServicePageLayout
      variant="agencia"
      eyebrow="Curitiba · PR · Atendimento nacional"
      h1={<>Agência de <span className="text-primary neon-text-glow">Marketing Digital</span> em Curitiba</>}
      intro="A Aceleriq é a agência de marketing digital de Curitiba para empresas que cansaram de receber relatório bonito sem impacto em receita. Unimos sites, tráfego, automação, IA, CRM e consultoria estratégica no mesmo sistema."
      benefits={[
        { title: "Time multidisciplinar", desc: "Estratégia, mídia, copy, design, dev, dados e IA atuando juntos no mesmo planejamento." },
        { title: "Lido por receita", desc: "Toda campanha conectada ao CRM. Você acompanha pipeline, CAC e LTV, não só cliques." },
        { title: "Diagnóstico Gratuito", desc: "Antes de qualquer proposta, mapeamos sua maturidade e entregamos plano de ação." },
        { title: "Método Acelera", desc: "Framework próprio (A.C.E.L.E.R.A) que estrutura marketing, vendas e operação em conjunto." },
        { title: "Sem terceirização cega", desc: "Time sênior de Curitiba, comunicação direta. Sem repasse para subagência." },
        { title: "Stack moderno", desc: "GA4, GTM, Meta CAPI, RD/HubSpot, n8n, OpenAI, Supabase. Sem amarras de plataforma." },
      ]}
      deliverables={[
        "Diagnóstico estratégico inicial",
        "Plano de marketing e vendas trimestral",
        "Gestão de mídia (Meta, Google, LinkedIn)",
        "Criação de conteúdo orgânico e ads",
        "Site institucional ou landing pages otimizadas",
        "Implantação e governança de CRM",
        "Automações de marketing e comercial",
        "Dashboards de receita e CAC",
        "Reuniões semanais de performance",
        "SLA de atendimento e ritual de aprovação",
      ]}
      process={[
        { step: "01", title: "Diagnóstico", desc: "Levantamos maturidade comercial, dados, ferramentas e oportunidades." },
        { step: "02", title: "Estratégia", desc: "Plano integrado com metas, alavancas e cronograma de execução." },
        { step: "03", title: "Implantação", desc: "Site, tráfego, CRM, automações e dashboards no ar em 30-60 dias." },
        { step: "04", title: "Operação", desc: "Gestão semanal, otimizações contínuas e reporte executivo mensal." },
      ]}
      faqs={FAQS}
      whatsappMessage="Olá! Quero conversar sobre os serviços da agência Aceleriq."
      extraSection={
        <PortfolioShowcase
          eyebrow="[ 03b ] · Cases da agência"
          title="Marcas que crescem com a Aceleriq"
          intro="Sites, e-commerces e plataformas em produção, desenvolvidos, otimizados e operados pela agência."
        />
      }
    />
  );
}
