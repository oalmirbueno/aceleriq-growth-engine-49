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

const FAQS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { q: "Quanto custa trabalhar com a Aceleriq?", a: "O investimento varia conforme o estágio da empresa e o escopo do programa (estratégia, vendas, dados, IA, mídia). Operamos com programas mensais que partem de faixas compatíveis com empresas a partir de R$ 100k/mês de faturamento." },
    { q: "Em quanto tempo eu vejo resultado?", a: "Resultados táticos aparecem em 2 a 4 semanas. Resultado estrutural — previsibilidade comercial, redução real de CAC e processo rodando sem o fundador — costuma se consolidar entre 60 e 120 dias." },
    { q: "Vocês atendem qualquer segmento?", a: "Atuamos com SaaS, e-commerce, educação, infoprodutos, serviços B2B e indústrias com vendas consultivas. O critério é maturidade: produto validado e faturamento mensal a partir de R$ 100k." },
    { q: "Existe contrato de fidelidade?", a: "Trabalhamos com ciclos mínimos de 6 meses. Após o ciclo inicial, a relação segue mensal, sem multa, enquanto fizer sentido para os dois lados." },
    { q: "Qual a diferença real para uma agência?", a: "Agência entrega peças isoladas. A Aceleriq entrega um sistema integrado: diagnóstico, CRM, processo comercial, dashboards, IA e mídia orientada a pipeline." },
    { q: "Como funciona o Diagnóstico Gratuito?", a: "Você responde 12 perguntas estratégicas em ~5 minutos e recebe seu Score de Maturidade (0-100), classificação de estágio e 3 recomendações personalizadas." },
    { q: "Vocês substituem meu time interno?", a: "Não. Atuamos como engenharia parceira do seu time, estruturando processos, treinando pessoas e implementando ferramentas para que a operação rode com seu time." },
    { q: "Como começa o trabalho depois do diagnóstico?", a: "Agendamos uma sessão estratégica de 60-90 min. Havendo fit, montamos proposta com escopo, cronograma de 90 dias, KPIs e investimento. Onboarding em até 7 dias." },
  ].map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aceleriq · Engenharia de Crescimento" },
      {
        name: "description",
        content:
          "Engenharia de crescimento em Curitiba: estratégia, CRM, tráfego, automação, IA e dados para escalar com previsibilidade.",
      },
      {
        property: "og:title",
        content: "Aceleriq · Engenharia de Crescimento",
      },
      {
        property: "og:description",
        content:
          "Estratégia, CRM, automação, IA, dados e processos comerciais para escalar com previsibilidade.",
      },
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
