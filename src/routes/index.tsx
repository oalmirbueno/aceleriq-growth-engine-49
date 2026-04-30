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
    <div className="min-h-screen bg-background text-foreground">
      <Header onDiagnostico={openDiagnostico} />
      <main>
        <Hero onDiagnostico={openDiagnostico} />

        {/* Seções 2 e 3 — efeito sticky stack (roleta) */}
        <StickyStack>
          <Pains />
          <About />
        </StickyStack>

        {/* Seção 4 — animações laterais + texto saindo de baixo */}
        <Method />

        {/* Seções 5 e 6 — normais (conteúdo alto não cabe em h-screen) */}
        <Areas />
        <FitFor />

        {/* Seções 7 e 8 — normais (Results tem conteúdo alto, não cabe em h-screen) */}
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
