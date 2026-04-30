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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Aceleriq · Engenharia de Crescimento com Estratégia, Dados e IA",
      },
      {
        name: "description",
        content:
          "Aceleriq é uma engenharia de crescimento em Curitiba que une estratégia, CRM, tráfego, automação, IA, dados e processos comerciais para empresas que querem escalar com previsibilidade.",
      },
      {
        property: "og:title",
        content:
          "Aceleriq · Engenharia de Crescimento com Estratégia, Dados e IA",
      },
      {
        property: "og:description",
        content:
          "Estratégia, CRM, automação, IA, dados e processos comerciais para empresas que querem escalar.",
      },
      { property: "og:url", content: "https://aceleriq.com.br" },
      { property: "og:type", content: "website" },
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
      </main>
      <Footer />
      <DiagnosticoModal open={diagOpen} onOpenChange={setDiagOpen} />
    </div>
  );
}
