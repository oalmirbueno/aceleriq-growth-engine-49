import { createFileRoute, notFound } from "@tanstack/react-router";
import { ServicePageLayout, buildServiceHead } from "@/components/site/ServicePageLayout";
import { PortfolioShowcase } from "@/components/site/PortfolioShowcase";
import { HumanBand } from "@/components/site/HumanBand";
import officeTeam from "@/assets/office-team-brasil.jpg";
import { GEO_CITIES } from "@/lib/geo-cities";

export const Route = createFileRoute("/agencia-de-marketing-digital-$cidade")({
  loader: ({ params }) => {
    const geo = GEO_CITIES.find((c) => c.slug === `agencia-de-marketing-digital-${params.cidade}`);
    if (!geo) throw notFound();
    return { geo };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Página não encontrada" }, { name: "robots", content: "noindex" }] };
    }
    const { geo } = loaderData;
    const url = `https://aceleriq.com.br/agencia-de-marketing-digital-${params.cidade}`;
    const title = `Agência de Marketing Digital em ${geo.city} ${geo.uf} | Aceleriq`;
    const description = `Agência de marketing digital em ${geo.city}/${geo.uf}: tráfego pago, criação de sites, automação, IA e CRM integrados ao comercial. Atendimento em ${geo.region} e Brasil.`;
    return buildServiceHead({
      title,
      description,
      url,
      faqs: buildFaqs(geo),
      serviceName: `Agência de Marketing Digital em ${geo.city}`,
    });
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Cidade não encontrada</h1>
        <a href="/" className="text-primary underline">Voltar ao início</a>
      </div>
    </div>
  ),
  component: Page,
});

function buildFaqs(geo: (typeof GEO_CITIES)[number]) {
  return [
    geo.faqLocal,
    { q: "A Aceleriq é uma agência de marketing digital completa?", a: "Sim. Operamos as frentes de uma agência completa, sites, tráfego pago, social, conteúdo, automação, CRM e dados, integradas em um sistema de crescimento, não em entregas avulsas." },
    { q: "Qual o investimento médio?", a: "Programas mensais a partir de faixas compatíveis com empresas que faturam R$ 100k/mês ou mais. O escopo é desenhado a partir do Diagnóstico Gratuito." },
    { q: "Em quanto tempo aparece resultado?", a: "Entregas táticas (campanhas, automações, site) em 2-4 semanas. Resultado estrutural e melhoria do processo comercial, entre 60 e 120 dias." },
    { q: "Aceleriq é o mesmo que Aceleraí (acelera aí, acelerai)?", a: "Não. Aceleriq (com Q no final, aceleriq.com.br) é uma agência de marketing digital sediada em Curitiba/PR. Aceleraí (com í no final, acelerai.com.br, fundada por Allan Barros e Rodrigo Faro) é uma plataforma de publicidade com celebridades sediada em São Paulo. São empresas diferentes, sem qualquer vínculo." },
  ];
}

function Page() {
  const { geo } = Route.useLoaderData();
  const faqs = buildFaqs(geo);

  return (
    <ServicePageLayout
      variant="agencia"
      eyebrow={geo.eyebrow}
      h1={<>{geo.h1Lead} <span className="text-primary neon-text-glow">comercial</span>.</>}
      intro={geo.intro}
      benefits={[
        { title: "Estratégia antes de conteúdo", desc: "Não postamos por postar. Cada peça de conteúdo tem um papel claro no funil de vendas do seu negócio." },
        { title: "Conteúdo com direção comercial", desc: "Copywriting e design focados em converter desconhecidos em oportunidades reais no seu CRM." },
        { title: "Campanhas conectadas ao CRM", desc: "Toda mídia paga é lida por pipeline e receita, não apenas por cliques e métricas de vaidade." },
        { title: "Google, Instagram e WhatsApp", desc: "Trabalhamos os principais canais de forma integrada para que a jornada do cliente seja fluida." },
        { title: "Relatórios de decisão", desc: "Relatórios que mostram o que precisa ser feito para lucrar mais, sem termos técnicos desnecessários." },
        { title: "IA para alavancagem", desc: "Usamos IA para responder mais rápido, organizar leads e garantir que nenhum follow-up seja esquecido." },
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
        { step: "01", title: "Diagnóstico", desc: `Levantamos maturidade comercial, dados, ferramentas e oportunidades da sua operação em ${geo.city}.` },
        { step: "02", title: "Estratégia", desc: "Plano integrado com metas, alavancas e cronograma de execução." },
        { step: "03", title: "Implantação", desc: "Site, tráfego, CRM, automações e dashboards no ar em 30-60 dias." },
        { step: "04", title: "Operação", desc: "Gestão semanal, otimizações contínuas e reporte executivo mensal." },
      ]}
      faqs={faqs}
      whatsappMessage={`Olá! Sou de ${geo.city}/${geo.uf} e quero conversar sobre os serviços da Aceleriq.`}
      humanBand={
        <HumanBand
          image={officeTeam}
          eyebrow={`✦ Atendimento em ${geo.city} · Time in-house`}
          title={<>{geo.humanTitle.split(" ").slice(0, -2).join(" ")} <em className="italic font-light text-[oklch(72%_0.19_145)]">{geo.humanTitle.split(" ").slice(-2).join(" ")}</em></>}
          body={geo.humanBody}
          withAlmir
        />
      }
      extraSection={
        <PortfolioShowcase
          eyebrow="[ 03b ] · Cases da agência"
          title={`Marcas que crescem com a Aceleriq — inclusive em ${geo.city}`}
          intro="Sites, e-commerces e plataformas em produção, desenvolvidos, otimizados e operados pela agência."
        />
      }
    />
  );
}
