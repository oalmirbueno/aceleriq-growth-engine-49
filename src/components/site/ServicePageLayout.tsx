import { useState, type ReactNode } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { DiagnosticoModal } from "@/components/site/DiagnosticoModal";
import { AmbientBackdrop } from "@/components/site/AmbientBackdrop";
import { ServiceVisual, type ServiceVariant } from "@/components/site/ServiceVisual";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/ui/CountUp";
import { whatsappLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/contact";

export type ServiceFAQ = { q: string; a: string };

export type ServicePageProps = {
  variant: ServiceVariant;
  eyebrow: string;
  h1: ReactNode;
  intro: string;
  benefits: { title: string; desc: string }[];
  deliverables: string[];
  process: { step: string; title: string; desc: string }[];
  faqs: ServiceFAQ[];
  whatsappMessage?: string;
  extraSection?: ReactNode;
};

const MARQUEE = [
  "Engenharia de crescimento",
  "Funil orientado a receita",
  "Stack moderna",
  "CRM · IA · Dados",
  "Deploy edge",
  "SEO técnico",
  "Experimentação contínua",
];

export function ServicePageLayout(props: ServicePageProps) {
  const [diagOpen, setDiagOpen] = useState(false);
  const open = () => setDiagOpen(true);
  const wa = whatsappLink(props.whatsappMessage ?? DEFAULT_WHATSAPP_MESSAGE);

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-hidden">
      <AmbientBackdrop />
      <Header onDiagnostico={open} />

      <main className="relative z-10">
        {/* HERO */}
        <section className="relative pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden">
          <div className="relative px-6 lg:px-16 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8 text-[11px] tracking-[0.2em] uppercase text-muted-foreground/80"
            >
              <span className="w-8 h-px bg-primary" />
              <span className="text-primary font-mono">{props.eyebrow}</span>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-7">
                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.05 }}
                  className="font-display text-[2.25rem] sm:text-5xl md:text-6xl lg:text-[5rem] leading-[0.95] uppercase tracking-[-0.04em]"
                >
                  {props.h1}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-8 text-[15px] md:text-base text-foreground/75 font-light leading-[1.6] max-w-xl"
                >
                  {props.intro}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.32 }}
                  className="mt-8 flex flex-wrap items-center gap-4"
                >
                  <Button
                    onClick={open}
                    className="group h-12 rounded-none bg-primary px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground hover:-translate-y-0.5 transition-all hover:shadow-[0_8px_30px_oklch(85%_0.2_145/0.4)]"
                  >
                    Diagnóstico Gratuito
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2.5 h-12 px-2 text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/80 hover:text-primary transition-colors"
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full bg-primary opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 bg-primary" />
                    </span>
                    WhatsApp
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-10 flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/55"
                >
                  <span>Curitiba · BR</span>
                  <span className="h-px w-8 bg-border" />
                  <span>Operando 24/7</span>
                  <span className="h-px w-8 bg-border" />
                  <span className="text-primary">v3.0 / online</span>
                </motion.div>
              </div>

              <div className="lg:col-span-5">
                <ServiceVisual variant={props.variant} />
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <section className="border-y border-border/60 overflow-hidden">
          <div className="flex gap-10 py-3.5 animate-[marquee_45s_linear_infinite] whitespace-nowrap text-[12px] uppercase tracking-[0.18em] text-muted-foreground/55">
            {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((t, i) => (
              <span key={i} className="flex items-center gap-10 shrink-0">
                <span>{t}</span>
                <span className="text-primary text-[10px]">✦</span>
              </span>
            ))}
          </div>
          <style>{`
            @keyframes marquee {
              from { transform: translateX(0); }
              to { transform: translateX(-33.333%); }
            }
          `}</style>
        </section>

        {/* METRICS */}
        <section className="px-6 lg:px-16 py-16 md:py-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {[
              { val: 312, suffix: "%", label: "lift médio em conversão", note: "vs. baseline do cliente" },
              { val: 14, suffix: "d", label: "go-live para landing pages", note: "do briefing ao deploy" },
              { val: 96, suffix: "+", label: "Lighthouse performance", note: "Core Web Vitals verdes" },
              { val: 40, suffix: "+", label: "operações em produção", note: "verticais B2B e B2C" },
            ].map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group"
              >
                <div className="font-display text-4xl md:text-5xl tracking-[-0.04em] leading-none">
                  <CountUp
                    to={m.val}
                    suffix={m.suffix}
                    className="bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent"
                  />
                </div>
                <div className="mt-3 pt-3 border-t border-border/60 group-hover:border-primary/60 transition-colors">
                  <div className="text-[13px] text-foreground/90 leading-snug">{m.label}</div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground/60">{m.note}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* WHY / BENEFITS */}
        <section className="px-6 lg:px-16 py-16 md:py-24 border-t border-border/60 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 mb-12">
            <div className="lg:col-span-2 font-mono text-[10px] text-primary uppercase tracking-[0.2em] lg:pt-2">
              01 / Por que
            </div>
            <h2 className="lg:col-span-10 font-display text-2xl md:text-4xl lg:text-5xl uppercase leading-[1.05] tracking-[-0.035em] max-w-[24ch]">
              Resultado lido por <em className="italic font-light text-primary">receita</em>, não por entregável avulso.
            </h2>
          </div>

          <div className="border-t border-border/60">
            {props.benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="group grid lg:grid-cols-12 gap-4 lg:gap-10 py-6 border-b border-border/60 hover:border-primary/40 transition-colors"
              >
                <div className="lg:col-span-2 font-mono text-[10px] text-muted-foreground/60 uppercase tracking-widest pt-1">
                  /{String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="lg:col-span-5 font-display text-base md:text-xl uppercase tracking-[-0.02em] leading-[1.15] group-hover:text-primary transition-colors">
                  {b.title}
                </h3>
                <p className="lg:col-span-5 text-[14px] text-muted-foreground leading-[1.6] max-w-xl">
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* DELIVERABLES — refined two-column list */}
        <section className="relative px-6 lg:px-16 py-16 md:py-24 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 mb-12">
            <div className="lg:col-span-2 font-mono text-[10px] text-primary uppercase tracking-[0.2em] lg:pt-2">
              02 / Escopo
            </div>
            <div className="lg:col-span-7">
              <h2 className="font-display text-2xl md:text-4xl lg:text-5xl uppercase leading-[1.05] tracking-[-0.035em]">
                Tudo que entra <em className="italic font-light text-primary">no programa</em>.
              </h2>
            </div>
            <p className="lg:col-span-3 text-[13px] text-muted-foreground leading-relaxed lg:pt-2">
              Sem letra miúda. Customizamos a profundidade conforme o estágio e o objetivo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 lg:gap-x-20 border-t border-border/60">
            {props.deliverables.map((d, i) => (
              <motion.div
                key={d}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="group flex items-baseline gap-5 py-4 border-b border-border/60 hover:border-primary/50 transition-colors"
              >
                <span className="font-mono text-[10px] text-muted-foreground/50 tracking-widest shrink-0 w-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] md:text-base text-foreground/85 leading-snug group-hover:text-foreground flex-1">
                  {d}
                </span>
                <span className="text-primary/40 text-xs group-hover:text-primary group-hover:translate-x-0.5 transition-all">
                  →
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section className="px-6 lg:px-16 py-16 md:py-24 border-t border-border/60 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 mb-12 items-end">
            <div className="lg:col-span-2 font-mono text-[10px] text-primary uppercase tracking-[0.2em] lg:pb-2">
              03 / Método
            </div>
            <h2 className="lg:col-span-7 font-display text-2xl md:text-4xl lg:text-5xl uppercase leading-[1.05] tracking-[-0.035em]">
              Quatro etapas, <em className="italic font-light text-primary">zero zona cinzenta</em>.
            </h2>
            <p className="lg:col-span-3 text-[13px] text-muted-foreground leading-relaxed">
              Gates claros entre estratégia, execução e mensuração.
            </p>
          </div>

          <div className="border-t border-border/60">
            {props.process.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group grid lg:grid-cols-12 gap-4 lg:gap-10 items-baseline py-7 md:py-9 border-b border-border/60 hover:bg-card/15 transition-colors"
              >
                <div className="lg:col-span-2 font-display text-4xl md:text-5xl text-primary/25 group-hover:text-primary transition-colors leading-none tracking-[-0.04em]">
                  {p.step}
                </div>
                <div className="lg:col-span-4">
                  <div className="font-mono text-[9px] text-muted-foreground/60 uppercase tracking-widest mb-1.5">
                    fase 0{i + 1}
                  </div>
                  <h3 className="font-display text-xl md:text-2xl uppercase tracking-[-0.025em] leading-[1.1]">
                    {p.title}
                  </h3>
                </div>
                <p className="lg:col-span-6 text-[14px] text-muted-foreground leading-[1.6]">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {props.extraSection}

        {/* FAQ */}
        <section className="px-6 lg:px-16 py-16 md:py-24 border-t border-border/60 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="font-mono text-primary text-[10px] uppercase tracking-[0.2em] mb-4">
                04 / FAQ
              </div>
              <h2 className="font-display text-2xl md:text-4xl lg:text-5xl uppercase leading-[1.05] tracking-[-0.035em]">
                Dúvidas <em className="italic font-light text-primary">comuns</em>.
              </h2>
              <p className="mt-5 text-[13px] text-muted-foreground leading-relaxed max-w-xs">
                Respostas diretas. Fora desta lista? Chame no WhatsApp — respondemos em horas.
              </p>
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="group mt-5 inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-primary hover:gap-3.5 transition-all"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Falar agora
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
            <div className="lg:col-span-8 border-t border-border/60">
              {props.faqs.map((f, i) => (
                <details key={f.q} className="group border-b border-border/60 open:bg-card/10 transition-colors">
                  <summary className="flex justify-between items-baseline gap-6 py-5 cursor-pointer list-none hover:text-primary transition-colors">
                    <div className="flex items-baseline gap-5">
                      <span className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-widest shrink-0">
                        0{i + 1}
                      </span>
                      <span className="font-display text-base md:text-lg uppercase tracking-[-0.02em] leading-[1.2]">
                        {f.q}
                      </span>
                    </div>
                    <span className="text-primary font-mono text-xl group-open:rotate-45 transition-transform shrink-0 leading-none">
                      +
                    </span>
                  </summary>
                  <div className="pb-6 pl-[44px] pr-10 text-muted-foreground text-[14px] leading-[1.65] max-w-3xl">
                    {f.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative px-6 lg:px-16 py-24 md:py-32 overflow-hidden border-t border-border/60">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 50% 70% at 50% 50%, oklch(85% 0.2 145 / 0.10) 0%, transparent 60%)",
            }}
          />

          <div className="relative max-w-4xl mx-auto text-center">
            <div className="font-mono text-primary text-[10px] uppercase tracking-[0.25em] mb-6">
              05 / Próximo passo
            </div>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl uppercase leading-[0.95] tracking-[-0.04em] mb-6">
              Quer o diagnóstico do seu <em className="italic font-light text-primary">cenário?</em>
            </h2>
            <p className="text-muted-foreground text-[15px] md:text-base mb-10 font-light max-w-xl mx-auto leading-[1.6]">
              5 minutos. Score de Maturidade, classificação de estágio e 3 recomendações personalizadas — sem custo.
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-5">
              <Button
                onClick={open}
                className="group h-12 rounded-none bg-primary px-8 text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground hover:-translate-y-0.5 transition-all hover:shadow-[0_12px_40px_oklch(85%_0.2_145/0.5)]"
              >
                Fazer Diagnóstico Gratuito
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Button>
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/80 hover:text-primary transition-colors"
              >
                <MessageCircle className="h-3.5 w-3.5 text-primary" />
                WhatsApp da Aceleriq
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>

            <Link
              to="/"
              className="inline-block mt-14 font-mono text-[10px] text-muted-foreground/50 uppercase tracking-[0.3em] hover:text-primary transition-colors"
            >
              ← Voltar para a home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <DiagnosticoModal open={diagOpen} onOpenChange={setDiagOpen} />
    </div>
  );
}

export function buildServiceHead(opts: {
  title: string;
  description: string;
  url: string;
  faqs: ServiceFAQ[];
  serviceName: string;
}) {
  const OG_IMAGE = "https://aceleriq.com.br/og-image.jpg";
  const FAQ_JSONLD = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: opts.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const SERVICE_JSONLD = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.serviceName,
    serviceType: opts.serviceName,
    provider: { "@type": "Organization", name: "Aceleriq", url: "https://aceleriq.com.br" },
    areaServed: { "@type": "Country", name: "Brasil" },
    url: opts.url,
    description: opts.description,
  };
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { property: "og:title", content: opts.title },
      { property: "og:description", content: opts.description },
      { property: "og:url", content: opts.url },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: opts.title },
      { name: "twitter:description", content: opts.description },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: opts.url }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(SERVICE_JSONLD) },
      { type: "application/ld+json", children: JSON.stringify(FAQ_JSONLD) },
    ],
  };
}

export { createFileRoute };
