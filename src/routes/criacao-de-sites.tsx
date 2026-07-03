import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout, buildServiceHead } from "@/components/site/ServicePageLayout";
import { PortfolioShowcase } from "@/components/site/PortfolioShowcase";

const URL = "https://aceleriq.com.br/criacao-de-sites";
const TITLE = "Criação de Sites Profissionais e Rápidos | Aceleriq";
const DESCRIPTION =
  "Criação de sites profissionais e landing pages para empresas no Brasil. Sites rápidos, com SEO, integrados a CRM, WhatsApp e Google Ads.";

const FAQS = [
  { q: "Que tipo de site a Aceleriq cria?", a: "Sites institucionais, landing pages de captura, sites de produto/SaaS e plataformas sob medida, todos com foco em conversão e integração ao CRM." },
  { q: "Os sites são otimizados para SEO?", a: "Sim. Entregamos com performance cuidada, schema.org, sitemap, meta tags, imagens otimizadas e estrutura semântica." },
  { q: "Vocês integram com CRM e ferramentas?", a: "Sim. Integramos a HubSpot, RD Station, Pipedrive, Meta CAPI, Google Ads, GA4, n8n e webhooks personalizados." },
  { q: "Qual o prazo de entrega?", a: "Landing pages em 5-10 dias úteis. Sites institucionais entre 3 e 6 semanas, dependendo do escopo." },
  { q: "Vocês fazem manutenção depois?", a: "Sim. Oferecemos contrato mensal de evolução contínua: ajustes, novas páginas, A/B test e melhorias de performance." },
];

export const Route = createFileRoute("/criacao-de-sites")({
  head: () => buildServiceHead({
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    faqs: FAQS,
    serviceName: "Criação de Sites",
  }),
  component: Page,
});

function Page() {
  return (
    <ServicePageLayout
      variant="sites"
      eyebrow="Sites · Landing pages · Plataformas"
      h1={<>Sites e Landing Pages feitos para <span className="text-primary neon-text-glow">vender</span></>}
      intro="Criamos sites e landing pages como ativos comerciais, não como vitrines bonitas. Páginas rápidas, responsivas e estratégicas para apresentar sua oferta, captar leads e integrar com WhatsApp, CRM e campanhas."
      benefits={[
        { title: "Landing Pages de Alta Conversão", desc: "Páginas focadas em um único objetivo: transformar visitantes em leads qualificados." },
        { title: "Sites Institucionais Estratégicos", desc: "Sua empresa apresentada com autoridade, clareza e design premium que gera confiança." },
        { title: "Páginas para Tráfego Pago", desc: "Estruturas otimizadas para receber campanhas de Google Ads e Meta Ads com menor custo por lead." },
        { title: "Integração Nativa com WhatsApp", desc: "Botões e fluxos que facilitam o contato direto do cliente com seu time comercial." },
        { title: "CRM e Automação Conectados", desc: "Leads entram direto no seu pipeline comercial, sem perda de dados ou tempo." },
        { title: "Velocidade e SEO Técnico", desc: "Sites que carregam instantaneamente e são encontrados pelo Google de forma orgânica." },
      ]}
      deliverables={[
        "Wireframe e arquitetura de informação orientada a conversão",
        "Design de UI premium com IA generativa avançada",
        "Desenvolvimento responsivo (desktop, tablet, mobile)",
        "Otimização SEO on-page",
        "Integração com GA4 e Meta Pixel/CAPI",
        "Integração com CRM e e-mail",
        "Painel CMS (quando aplicável)",
        "Hospedagem edge e domínio",
        "Treinamento de uso",
        "Suporte pós-entrega",
      ]}
      process={[
        { step: "01", title: "Briefing", desc: "Mapeamento de objetivo, público, persona e funil de conversão." },
        { step: "02", title: "Design", desc: "Wireframe + protótipo navegável + identidade visual no Figma." },
        { step: "03", title: "Desenvolvimento", desc: "Code, integrações, SEO técnico, testes em múltiplos devices." },
        { step: "04", title: "Go-live", desc: "Deploy, configuração de tracking, treinamento e otimização contínua." },
      ]}
      faqs={FAQS}
      whatsappMessage="Olá! Quero criar um site com a Aceleriq."
      extraSection={
        <PortfolioShowcase
          eyebrow="[ 03b ] · Cases"
          title="Sites recentes entregues pela Aceleriq"
          intro="Projetos reais em produção, institucionais, e-commerce, landing pages, plataformas de marca e apps. Clique para ver o case completo."
        />
      }
    />
  );
}
