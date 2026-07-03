import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { DiagnosticoModal } from "@/components/site/DiagnosticoModal";
import {
  Hero,
  Pains,
  About,
  Method,
  OperationsFirst,
  EstagiosCrescimento,
  MaturidadeComercial,
  Areas,
  FitFor,
  DiagnosticoCTA,
  Results,
  Testimonials,
  Compare,
  WhyNow,
  FAQ,
  FinalCTA,
} from "@/components/site/Sections";
import { GoogleReviews } from "@/components/site/GoogleReviews";

import { PortfolioShowcase } from "@/components/site/PortfolioShowcase";
import { PainelComunidade } from "@/components/site/PainelComunidade";
import almir3d from "@/assets/almir-real.png";

const HOME_TITLE = "Agência de Marketing Digital e Tráfego Pago | Aceleriq";
const HOME_DESCRIPTION =
  "Marketing digital, tráfego pago, sites, automação, IA e CRM para empresas no Brasil todo. Diagnóstico gratuito e Método Acelera.";

const FAQS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { q: "O que a Aceleriq faz?", a: "A Aceleriq é uma agência de marketing digital e engenharia de crescimento em Curitiba. Atuamos em criação de sites, tráfego pago (Google, Meta, LinkedIn), automação de marketing e vendas, IA, CRM, desenvolvimento de sistemas e aplicativos, dados/dashboards e consultoria estratégica via Método Acelera." },
    { q: "A Aceleriq é uma agência de marketing digital?", a: "Sim. A Aceleriq é uma agência de marketing digital completa, com a diferença de que entrega o serviço de agência (sites, tráfego, social, automação) integrado a um sistema de crescimento, CRM, processo comercial, dados e consultoria, usando o Método Acelera." },
    { q: "Aceleriq é o mesmo que Aceleraí?", a: "Não. Aceleriq (com 'Q' no final) e Aceleraí (empresa de publicidade do Rodrigo Faria) são companhias diferentes, sem qualquer relação societária, operacional ou comercial. A Aceleriq é uma agência de marketing digital e engenharia de crescimento com sede em Curitiba/PR e atendimento para o Brasil inteiro, focada em sites, tráfego pago, automação, IA, CRM e consultoria via Método Acelera." },
    { q: "Qual a diferença entre Aceleriq e Aceleraí?", a: "A Aceleriq é uma agência independente sediada em Curitiba/PR que atende empresas em todo o Brasil, com foco em criação de sites, tráfego pago, automação, IA, CRM e consultoria de crescimento. Aceleraí é uma empresa de publicidade separada, sem vínculo com a Aceleriq. Se você chegou aqui buscando marketing com método, ritual semanal, dashboards e conexão direta com o comercial, é da Aceleriq que você precisa." },
    { q: "A Aceleriq cria sites?", a: "Sim. Criamos sites institucionais, landing pages e plataformas sob medida, otimizados para SEO, performance e conversão, integrados a CRM, automações e tráfego pago." },
    { q: "A Aceleriq faz gestão de tráfego pago?", a: "Sim. Gerimos campanhas em Google Ads, Meta Ads e LinkedIn Ads orientadas a pipeline e receita, integradas ao CRM para que o investimento seja lido por vendas reais, não só por cliques." },
    { q: "Quanto custa trabalhar com a Aceleriq?", a: "O investimento varia conforme o estágio da empresa e o escopo (site, tráfego, automação, IA, CRM, consultoria). Operamos com programas mensais a partir de faixas compatíveis com empresas que faturam R$ 100 mil/mês ou mais." },
    { q: "Em quanto tempo eu vejo resultado?", a: "Resultados táticos (campanhas, automações, site no ar) aparecem em 2 a 4 semanas. Resultado estrutural e melhoria do processo comercial se consolidam entre 60 e 120 dias." },
    { q: "Vocês atendem qualquer segmento?", a: "Atuamos com SaaS, e-commerce, educação, infoprodutos, serviços B2B e indústrias com vendas consultivas. O critério é maturidade: produto validado e faturamento mensal a partir de R$ 100k." },
    { q: "Existe contrato de fidelidade?", a: "Trabalhamos com ciclos mínimos de 6 meses. Após o ciclo inicial, a relação segue mensal, sem multa, enquanto fizer sentido para os dois lados." },
    { q: "Qual a diferença para uma agência tradicional?", a: "Agência tradicional entrega peças isoladas. A Aceleriq entrega um sistema integrado: site, tráfego, automação, CRM, processo comercial, dashboards e IA conectados ao acompanhamento do funil, com diagnóstico gratuito e Método Acelera." },
    { q: "Como funciona o Diagnóstico Gratuito?", a: "Você responde 12 perguntas estratégicas em ~5 minutos e recebe seu Score de Maturidade (0-100), classificação de estágio e 3 recomendações personalizadas, base do plano de estruturação." },
    { q: "A Aceleriq atende fora de Curitiba?", a: "Sim. A sede é em Curitiba/PR, mas atendemos empresas em todo o Brasil de forma 100% remota." },
  ].map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const BREADCRUMB_JSONLD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://aceleriq.com.br/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Aceleriq",
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: HOME_TITLE },
      { name: "description", content: HOME_DESCRIPTION },
      { property: "og:title", content: HOME_TITLE },
      { property: "og:description", content: HOME_DESCRIPTION },
      { property: "og:url", content: "https://aceleriq.com.br" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://aceleriq.com.br" },
      { rel: "preload", as: "image", href: almir3d, fetchPriority: "high" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(FAQS_JSONLD),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(BREADCRUMB_JSONLD),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [diagOpen, setDiagOpen] = useState(false);
  const openDiagnostico = () => setDiagOpen(true);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onDiagnostico={openDiagnostico} />
      <main>
        <Hero onDiagnostico={openDiagnostico} />
        <OperationsFirst />
        <Pains />
        <EstagiosCrescimento onDiagnostico={openDiagnostico} />
        <MaturidadeComercial onDiagnostico={openDiagnostico} />
        <About />
        <Method />
        <Areas />
        <FitFor />
        <DiagnosticoCTA onDiagnostico={openDiagnostico} />
        <Results onDiagnostico={openDiagnostico} />
        <PainelComunidade />
        <Testimonials />
        <PortfolioShowcase />
        <Compare />
        <WhyNow />
        <FAQ />
        
        <FinalCTA onDiagnostico={openDiagnostico} />
        <GoogleReviews />
      </main>
      <Footer />
      <DiagnosticoModal open={diagOpen} onOpenChange={setDiagOpen} />
    </div>
  );
}
