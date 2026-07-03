import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout, buildServiceHead } from "@/components/site/ServicePageLayout";
import { PortfolioShowcase } from "@/components/site/PortfolioShowcase";
import { HumanBand } from "@/components/site/HumanBand";
import officeTeam from "@/assets/office-team-brasil.jpg";

const URL = "https://aceleriq.com.br/agencia-de-marketing-digital-curitiba";
const TITLE = "Marketing de Crescimento conectado ao Comercial | Aceleriq";
const DESCRIPTION =
  "Marketing de crescimento focado em lucro, não em curtidas. Unimos sites, tráfego, automação, IA, CRM e consultoria estratégica conectadas ao seu comercial.";

const FAQS = [
  { q: "A Aceleriq é uma agência de marketing digital completa?", a: "Sim. Operamos as frentes de uma agência completa, sites, tráfego pago, social, conteúdo, automação, CRM, dados, integradas em um sistema de crescimento, não em entregas avulsas." },
  { q: "Vocês atendem fora de Curitiba?", a: "Sim. Sede em Curitiba/PR, atendimento 100% remoto para o Brasil inteiro." },
  { q: "Qual o investimento médio?", a: "Programas mensais a partir de faixas compatíveis com empresas que faturam R$ 100k/mês ou mais. O escopo é desenhado a partir do Diagnóstico Gratuito." },
  { q: "Em quanto tempo aparece resultado?", a: "Entregas táticas (campanhas, automações, site) em 2-4 semanas. Resultado estrutural e melhoria do processo comercial, entre 60 e 120 dias." },
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
      h1={<>Marketing estratégico conectado ao <span className="text-primary neon-text-glow">comercial</span>.</>}
      intro="Não fazemos apenas posts ou anúncios isolados. A Aceleriq estrutura sua presença digital, conteúdo e tráfego integrados ao seu CRM e ao seu processo de vendas, garantindo que cada real investido trabalhe para o seu lucro."
      benefits={[
        { title: "Estratégia antes de conteúdo", desc: "Não postamos por postar. Cada peça de conteúdo tem um papel claro no funil de vendas do seu negócio." },
        { title: "Conteúdo com direção comercial", desc: "Copywriting e design focados em converter desconhecidos em oportunidades reais no seu CRM." },
        { title: "Campanhas conectadas ao CRM", desc: "Toda mídia paga é lida por pipeline e receita, não apenas por cliques e métricas de vaidade." },
        { title: "Google, Instagram e WhatsApp", desc: "Trabalhamos os principais canais de forma integrada para que a jornada do cliente seja fluida." },
        { title: "Relatórios de decisão", desc: "Relatórios que mostram o que precisa ser feito para lucrar mais, sem termos técnicos desnecessários." },
        { title: "IA para alavancagem", desc: "Usamos inteligência artificial para responder mais rápido, organizar leads e garantir que nenhum follow-up seja esquecido." },
      ]}
      deliverables={[
        "Diagnóstico estratégico inicial",
        "Plano de marketing e vendas trimestral",
        "Gestão de mídia (Meta, Google, LinkedIn)",
        "Criação de conteúdo orgânico e ads",
        "Site institucional ou landing pages otimizadas",
        "Implantação e governança de CRM",
        "Automações de marketing e comercial",
        "Dashboards comerciais e operacionais",
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
      humanBand={
        <HumanBand
          image={officeTeam}
          eyebrow="✦ Sede em Curitiba · Time in-house"
          title={<>Uma agência que <em className="italic font-light text-[oklch(72%_0.19_145)]">opera junto</em>, não terceiriza.</>}
          body="Estratégia, mídia, conteúdo, CRM e dados no mesmo time, na mesma sala, no mesmo ritual semanal. Você fala com quem executa — nada de camadas de gerente entre você e o resultado."
          withAlmir
        />
      }
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
