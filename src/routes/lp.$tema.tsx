import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles, Clock, ShieldCheck, Zap } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { DiagnosticoModal } from "@/components/site/DiagnosticoModal";
import { LP_TEMAS, isLpTemaSlug, type LpTemaSlug } from "@/lib/lp-temas";
import { categoryCover } from "@/lib/blog-covers";

const SITE_URL = "https://aceleriq.com.br";

export const Route = createFileRoute("/lp/$tema")({
  beforeLoad: ({ params }) => {
    if (!isLpTemaSlug(params.tema)) throw notFound();
  },
  head: ({ params }) => {
    const slug = params.tema as LpTemaSlug;
    const tema = LP_TEMAS[slug];
    if (!tema) return {};
    const url = `${SITE_URL}/lp/${slug}`;
    const ogImage = `${SITE_URL}${categoryCover(tema.category)}`;
    return {
      meta: [
        { title: tema.seoTitle },
        { name: "description", content: tema.seoDescription },
        { property: "og:title", content: tema.seoTitle },
        { property: "og:description", content: tema.seoDescription },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: tema.seoTitle },
        { name: "twitter:description", content: tema.seoDescription },
        { name: "twitter:image", content: ogImage },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: LpTemaPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <p className="text-sm font-mono uppercase tracking-[0.25em] text-muted-foreground mb-3">
          404 · tema não encontrado
        </p>
        <Link to="/blog" className="text-primary hover:underline">
          Voltar ao blog
        </Link>
      </div>
    </div>
  ),
});

function LpTemaPage() {
  const { tema: slug } = useParams({ from: "/lp/$tema" });
  const tema = LP_TEMAS[slug as LpTemaSlug];
  const [diagOpen, setDiagOpen] = useState(false);
  const [origem, setOrigem] = useState<string>(`lp:${slug}`);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("origem") || params.get("ref");
    setOrigem(ref ? `lp:${slug}|${ref}` : `lp:${slug}`);
  }, [slug]);

  const cover = useMemo(() => categoryCover(tema.category), [tema.category]);

  return (
    <div className="min-h-screen bg-background">
      <Header onDiagnostico={() => setDiagOpen(true)} />

      {/* HERO */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: `url(${cover})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/90 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.18),transparent_60%)]" />

        <div className="container-aceleriq relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1 mb-6">
              <Sparkles className="h-3 w-3 text-primary" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                {tema.eyebrow}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold tracking-tight text-foreground leading-[1.05]">
              {tema.h1} <span className="text-primary">{tema.highlight}</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
              {tema.subhead}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setDiagOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                {tema.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                to="/blog"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/15 text-foreground text-sm font-medium hover:border-primary/40 transition-colors"
              >
                Ver análises sobre {tema.eyebrow.split("·")[1]?.trim() || "o tema"}
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3 w-3 text-primary" /> 7 minutos
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3 w-3 text-primary" /> 100% gratuito
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Zap className="h-3 w-3 text-primary" /> Resposta em até 48h
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DORES */}
      <section className="py-16 md:py-20 border-t border-white/5">
        <div className="container-aceleriq">
          <h2 className="text-2xl md:text-4xl font-display font-semibold mb-10 max-w-3xl">
            Você se reconhece em algum desses cenários?
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {tema.dores.map((d, i) => (
              <motion.div
                key={d}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="border border-white/10 bg-white/[0.02] p-6"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
                  Sintoma 0{i + 1}
                </div>
                <p className="text-base text-foreground leading-relaxed">{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ENTREGÁVEIS */}
      <section className="py-16 md:py-24 bg-white/[0.015] border-y border-white/5">
        <div className="container-aceleriq grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-4">
              O que você recebe
            </div>
            <h2 className="text-2xl md:text-4xl font-display font-semibold mb-6">
              Diagnóstico Aceleriq aplicado a{" "}
              <span className="text-primary">{tema.eyebrow.split("·")[1]?.trim().toLowerCase()}</span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Em até 48 horas após responder o quiz, um especialista da Aceleriq devolve um diagnóstico
              personalizado, sem template genérico, com plano de ação priorizado por impacto e esforço.
            </p>
          </div>
          <ul className="space-y-4">
            {tema.entregaveis.map((e) => (
              <li key={e} className="flex gap-4 border border-white/10 bg-background p-5">
                <div className="flex-shrink-0 h-8 w-8 border border-primary/30 bg-primary/10 flex items-center justify-center">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm md:text-base text-foreground leading-relaxed pt-1">{e}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PROVAS */}
      <section className="py-16 md:py-24">
        <div className="container-aceleriq">
          <div className="grid gap-6 md:grid-cols-3">
            {tema.provas.map((p) => (
              <div key={p.label} className="border border-white/10 bg-white/[0.02] p-8 text-center">
                <div className="text-4xl md:text-5xl font-display font-semibold text-primary mb-2">
                  {p.kpi}
                </div>
                <p className="text-sm text-muted-foreground">{p.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 md:py-28 border-t border-white/5">
        <div className="container-aceleriq max-w-3xl text-center">
          <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight mb-6">
            Pronto para um plano feito sob medida?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-10">
            7 minutos respondendo. 48 horas para receber. Zero compromisso de contratar.
          </p>
          <button
            type="button"
            onClick={() => setDiagOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            {tema.ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      <Footer />
      <DiagnosticoModal open={diagOpen} onOpenChange={setDiagOpen} origem={origem} />
    </div>
  );
}
