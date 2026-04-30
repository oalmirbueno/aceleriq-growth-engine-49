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
  BrandStrip,
} from "@/components/site/Sections";

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

        {/* Sticky stack — apenas seções compactas (cabem em 100vh) */}
        <StickyStack>
          <Pains />
          <About />
        </StickyStack>

        {/* Seções de conteúdo alto — fluxo normal */}
        <Method />
        <Areas />
        <FitFor />

        {/* Painel de instrumentos skeumórfico — ambienta entre seções */}
        <InstrumentBar />

        <DiagnosticoCTA onDiagnostico={openDiagnostico} />
        <Results />

        {/* Faixa marquee — entre Resultados e Depoimentos (zona segura, sem sticky) */}
        <BrandStrip />

        <Testimonials />

        {/* Seção 09 — Comparativo no fluxo normal (estática) */}
        <Compare />

        {/* Seção 10 — Por que agora, no fluxo normal */}
        <WhyNow />

        {/* Sticky stack — FAQ (11) com efeito de sobreposição sobre Final CTA */}
        <StickyStack>
          <FAQ />
          <FinalCTA onDiagnostico={openDiagnostico} />
        </StickyStack>
      </main>
      <Footer />
      <DiagnosticoModal open={diagOpen} onOpenChange={setDiagOpen} />
    </div>
  );
}
