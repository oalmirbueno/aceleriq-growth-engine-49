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

const HOME_TITLE =
  "Marketing Digital, Sites e Tráfego em Curitiba · Aceleriq";
const HOME_DESCRIPTION =
  "Agência de marketing digital em Curitiba: sites, tráfego, automação, IA, CRM e consultoria. Diagnóstico gratuito + Método Acelera.";

const FAQS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { q: "O que a Aceleriq faz?", a: "A Aceleriq é uma agência de marketing digital e engenharia de crescimento em Curitiba. Atuamos em criação de sites, tráfego pago (Google, Meta, LinkedIn), automação de marketing e vendas, IA, CRM, desenvolvimento de sistemas e aplicativos, dados/dashboards e consultoria estratégica via Método Acelera." },
    { q: "A Aceleriq é uma agência de marketing digital?", a: "Sim. A Aceleriq é uma agência de marketing digital completa, com a diferença de que entrega o serviço de agência (sites, tráfego, social, automação) integrado a um sistema de crescimento, CRM, processo comercial, dados e consultoria, usando o Método Acelera." },
    { q: "Aceleriq é o mesmo que Acelerai?", a: "Não. Aceleriq (com 'Q' no final) e Acelerai são empresas diferentes, sem qualquer relação. A Aceleriq é uma agência de marketing digital e engenharia de crescimento sediada em Curitiba/PR, com foco em sites, tráfego, automação, IA, CRM e consultoria via Método Acelera." },
    { q: "Qual a diferença entre Aceleriq e Acelerai?", a: "Aceleriq é uma agência de marketing digital independente, sediada em Curitiba/PR, especializada em criação de sites, tráfego pago, automação, IA, CRM e consultoria de crescimento. Não temos vínculo com a Acelerai. Quem busca uma agência boutique, com diagnóstico gratuito e método próprio (Método Acelera) para estruturar marketing, vendas e operação, está no lugar certo." },
    { q: "A Aceleriq cria sites?", a: "Sim. Criamos sites institucionais, landing pages e plataformas sob medida, otimizados para SEO, performance e conversão, integrados a CRM, automações e tráfego pago." },
    { q: "A Aceleriq faz gestão de tráfego pago?", a: "Sim. Gerimos campanhas em Google Ads, Meta Ads e LinkedIn Ads orientadas a pipeline e receita, integradas ao CRM para que o investimento seja lido por vendas reais, não só por cliques." },
    { q: "Quanto custa trabalhar com a Aceleriq?", a: "O investimento varia conforme o estágio da empresa e o escopo (site, tráfego, automação, IA, CRM, consultoria). Operamos com programas mensais a partir de faixas compatíveis com empresas que faturam R$ 100 mil/mês ou mais." },
    { q: "Em quanto tempo eu vejo resultado?", a: "Resultados táticos (campanhas, automações, site no ar) aparecem em 2 a 4 semanas. Resultado estrutural, previsibilidade comercial, redução de CAC e processo rodando, se consolida entre 60 e 120 dias." },
    { q: "Vocês atendem qualquer segmento?", a: "Atuamos com SaaS, e-commerce, educação, infoprodutos, serviços B2B e indústrias com vendas consultivas. O critério é maturidade: produto validado e faturamento mensal a partir de R$ 100k." },
    { q: "Existe contrato de fidelidade?", a: "Trabalhamos com ciclos mínimos de 6 meses. Após o ciclo inicial, a relação segue mensal, sem multa, enquanto fizer sentido para os dois lados." },
    { q: "Qual a diferença para uma agência tradicional?", a: "Agência tradicional entrega peças isoladas. A Aceleriq entrega um sistema integrado: site, tráfego, automação, CRM, processo comercial, dashboards e IA orientados a receita, com diagnóstico gratuito e Método Acelera." },
    { q: "Como funciona o Diagnóstico Gratuito?", a: "Você responde 12 perguntas estratégicas em ~5 minutos e recebe seu Score de Maturidade (0-100), classificação de estágio e 3 recomendações personalizadas, base do plano de estruturação." },
    { q: "A Aceleriq atende fora de Curitiba?", a: "Sim. A sede é em Curitiba/PR, mas atendemos empresas em todo o Brasil de forma 100% remota." },
  ].map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
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
    links: [{ rel: "canonical", href: "https://aceleriq.com.br" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(FAQS_JSONLD),
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
        <Pains />
        <About />
        <Method />
        <Areas />
        <FitFor />
        <DiagnosticoCTA onDiagnostico={openDiagnostico} />
        <Results />
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
