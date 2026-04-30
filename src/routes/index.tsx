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
import { StickyStack } from "@/components/site/StickyStack";
import { InstrumentBar } from "@/components/site/Ornaments";

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

        {/* Sticky stack final — Compare (09) sobreposto pelo FAQ (11). WhyNow (10) fica no fluxo normal. */}
        <StickyStack>
          <Compare />
          <FAQ />
        </StickyStack>

        <WhyNow />
        <FinalCTA onDiagnostico={openDiagnostico} />
      </main>
      <Footer />
      <DiagnosticoModal open={diagOpen} onOpenChange={setDiagOpen} />
    </div>
  );
}
