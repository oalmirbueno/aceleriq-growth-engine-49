import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout, buildServiceHead } from "@/components/site/ServicePageLayout";
import { PortfolioShowcase } from "@/components/site/PortfolioShowcase";

const URL = "https://aceleriq.com.br/criacao-de-sites";
const TITLE = "Criação de Sites em Curitiba · Aceleriq";
const DESCRIPTION =
  "Criação de sites institucionais, landing pages e plataformas em Curitiba. SEO, performance e conversão, integrados a CRM e tráfego pago.";

const FAQS = [
  { q: "Que tipo de site a Aceleriq cria?", a: "Sites institucionais, landing pages de captura, sites de produto/SaaS e plataformas sob medida, todos com foco em conversão e integração ao CRM." },
  { q: "Os sites são otimizados para SEO?", a: "Sim. Entregamos com performance Lighthouse, schema.org, sitemap, meta tags, imagens otimizadas e estrutura semântica." },
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
      h1={<>Criação de <span className="text-primary neon-text-glow">Sites</span> que vendem</>}
      intro="Sites e landing pages projetados como ativo comercial, não como folder online. Integrados ao CRM, otimizados para SEO e construídos para converter o tráfego que você paga ou ganha."
      benefits={[
        { title: "Performance real", desc: "Lighthouse 90+, Core Web Vitals verdes, carregamento sub-segundo." },
        { title: "SEO técnico nativo", desc: "Schema.org, sitemap, meta tags, semântica, conteúdo otimizado por palavra-chave." },
        { title: "Foco em conversão", desc: "Arquitetura de funil, CTAs estratégicos, copy orientada a objeção." },
        { title: "CRM integrado", desc: "Leads entram direto no CRM com fonte, UTM e qualificação inicial." },
        { title: "Design premium", desc: "Identidade visual coerente com a marca, sem template engessado." },
        { title: "Stack moderna", desc: "React/Next/TanStack, Tailwind, deploy edge, hospedagem incluída." },
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
