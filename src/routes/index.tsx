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
import { StickyStack } from "@/components/site/StickyStack";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Aceleriq — Engenharia de Crescimento com Estratégia, Dados e IA",
      },
      {
        name: "description",
        content:
          "Aceleriq é a engenharia de crescimento que une estratégia, processo comercial, tráfego, CRM, IA e dados. Faça o Diagnóstico de Maturidade gratuito.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [diagOpen, setDiagOpen] = useState(false);
  const openDiagnostico = () => setDiagOpen(true);

  return (
    <div className="min-h-screen bg-background text-foreground relative z-10">
      <Header onDiagnostico={openDiagnostico} />
      <main>
        <Hero onDiagnostico={openDiagnostico} />

        {/* Sticky stack global — todas as seções (exceto Hero) entram sobrepondo a anterior.
            Seções com conteúdo alto (Areas, Results, FAQ) ficam fora do stack para não cortar conteúdo. */}
        <StickyStack>
          <Pains />
          <About />
          <Method />
          <FitFor />
          <DiagnosticoCTA onDiagnostico={openDiagnostico} />
          <Testimonials />
          <Compare />
          <WhyNow />
          <FinalCTA onDiagnostico={openDiagnostico} />
        </StickyStack>

        {/* Seções altas — fluxo normal (não cabem em 100vh) */}
        <Areas />
        <Results />
        <FAQ />
      </main>
      <Footer />
      <DiagnosticoModal open={diagOpen} onOpenChange={setDiagOpen} />
    </div>
  );
}
