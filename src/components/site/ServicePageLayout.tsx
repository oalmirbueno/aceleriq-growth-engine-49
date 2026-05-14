import { useState, type ReactNode } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { DiagnosticoModal } from "@/components/site/DiagnosticoModal";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/ui/CountUp";
import { whatsappLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/contact";

export type ServiceFAQ = { q: string; a: string };

export type ServicePageProps = {
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
  "Engenharia de Crescimento",
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
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-hidden">
      <Header onDiagnostico={open} />

      <main className="relative">
        {/* HERO — editorial, asymmetric */}
        <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden">
          {/* Soft ambient blooms */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 right-[-10%] w-[800px] h-[800px] rounded-full opacity-[0.16] blur-3xl"
            style={{
              background: "radial-gradient(circle, oklch(85% 0.2 145 / 0.7) 0%, transparent 60%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-[-20%] left-[-15%] w-[700px] h-[700px] rounded-full opacity-[0.10] blur-3xl"
            style={{
              background: "radial-gradient(circle, oklch(60% 0.2 250 / 0.6) 0%, transparent 60%)",
            }}
          />

          <div className="relative px-6 lg:px-20">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 mb-10 text-[12px] tracking-[0.18em] uppercase text-muted-foreground/80"
            >
              <span className="w-10 h-px bg-primary" />
              <span className="text-primary font-mono">{props.eyebrow}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-display text-[3rem] sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[12rem] leading-[0.86] uppercase tracking-[-0.05em] max-w-[18ch]"
            >
              {props.h1}
            </motion.h1>

            <div className="mt-16 grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-6 lg:col-start-1 text-lg md:text-xl text-foreground/75 font-light leading-[1.55] max-w-2xl"
              >
                {props.intro}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-5 lg:col-start-8 flex flex-col items-start gap-5"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    onClick={open}
                    className="group h-14 rounded-none bg-primary px-8 text-[12px] font-bold uppercase tracking-[0.18em] text-primary-foreground hover:-translate-y-0.5 transition-all hover:shadow-[0_12px_40px_oklch(85%_0.2_145/0.45)]"
                  >
                    Diagnóstico Gratuito
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-3 h-14 px-2 text-[12px] font-bold uppercase tracking-[0.18em] text-foreground/80 hover:text-primary transition-colors"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full bg-primary opacity-60" />
                      <span className="relative inline-flex h-2 w-2 bg-primary" />
                    </span>
                    WhatsApp
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
                <div className="text-[13px] text-muted-foreground/70 leading-relaxed max-w-sm">
                  Resposta em até 1 dia útil. Sem formulário longo, sem pitch genérico.
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* MARQUEE — light, editorial */}
        <section className="border-y border-border/60 overflow-hidden">
          <div className="flex gap-16 py-6 animate-[marquee_45s_linear_infinite] whitespace-nowrap font-display text-2xl md:text-3xl uppercase tracking-[-0.02em] text-foreground/40">
            {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((t, i) => (
              <span key={i} className="flex items-center gap-16 shrink-0">
                <span>{t}</span>
                <span className="text-primary text-base">✦</span>
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

        {/* METRICS — large editorial numbers, no boxes */}
        <section className="px-6 lg:px-20 py-24 md:py-32">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {[
              { val: 312, suffix: "%", label: "lift médio em conversão", note: "vs. baseline do cliente" },
              { val: 14, suffix: " dias", label: "go-live para landing pages", note: "do briefing ao deploy" },
              { val: 96, suffix: "+", label: "Lighthouse performance", note: "Core Web Vitals verdes" },
              { val: 40, suffix: "+", label: "operações em produção", note: "verticais B2B e B2C" },
            ].map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group"
              >
                <div className="font-display text-6xl md:text-7xl lg:text-8xl text-foreground tracking-[-0.05em] leading-none">
                  <CountUp to={m.val} suffix={m.suffix} className="bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-transparent" />
                </div>
                <div className="mt-5 pt-5 border-t border-border/60 group-hover:border-primary/60 transition-colors">
                  <div className="text-[14px] text-foreground/90 leading-snug">{m.label}</div>
                  <div className="mt-1 text-[12px] text-muted-foreground/60">{m.note}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* WHY — manifesto + flowing benefit rows */}
        <section className="px-6 lg:px-20 py-24 md:py-32 border-t border-border/60">
          <div className="grid lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-2 font-mono text-[11px] text-primary uppercase tracking-[0.2em] lg:pt-3">
              01 / Por que
            </div>
            <h2 className="lg:col-span-10 font-display text-4xl md:text-6xl lg:text-7xl uppercase leading-[0.95] tracking-[-0.045em] max-w-[20ch]">
              Resultado lido por <em className="italic font-light text-primary">receita</em>, não por entregável avulso.
            </h2>
          </div>

          <div className="border-t border-border/60">
            {props.benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="group grid lg:grid-cols-12 gap-6 lg:gap-12 py-8 md:py-10 border-b border-border/60 hover:border-primary/40 transition-colors"
              >
                <div className="lg:col-span-2 font-mono text-[11px] text-muted-foreground/60 uppercase tracking-widest pt-2">
                  /{String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="lg:col-span-5 font-display text-2xl md:text-3xl lg:text-4xl uppercase tracking-[-0.03em] leading-[1.05] group-hover:text-primary transition-colors">
                  {b.title}
                </h3>
                <p className="lg:col-span-5 text-[15px] md:text-base text-muted-foreground leading-[1.65] max-w-xl lg:pt-2">
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* DELIVERABLES — flowing inline list with separators */}
        <section className="relative px-6 lg:px-20 py-24 md:py-32 overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.08] blur-3xl -translate-y-1/2"
            style={{
              background: "radial-gradient(circle, oklch(85% 0.2 145) 0%, transparent 60%)",
            }}
          />
          <div className="relative grid lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-2 font-mono text-[11px] text-primary uppercase tracking-[0.2em] lg:pt-3">
              02 / Escopo
            </div>
            <div className="lg:col-span-7">
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl uppercase leading-[0.95] tracking-[-0.045em]">
                Tudo que entra <em className="italic font-light text-primary">no programa</em>.
              </h2>
            </div>
            <p className="lg:col-span-3 text-[14px] text-muted-foreground leading-relaxed lg:pt-3">
              Sem letra miúda. Customizamos a profundidade conforme o estágio e o objetivo da sua
              empresa.
            </p>
          </div>

          <div className="relative flex flex-wrap gap-x-3 gap-y-4 items-baseline">
            {props.deliverables.map((d, i) => (
              <motion.div
                key={d}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
                className="group inline-flex items-baseline gap-3"
              >
                {i > 0 && <span className="text-primary/40 text-xl mr-1">/</span>}
                <span className="font-display text-2xl md:text-4xl lg:text-5xl uppercase tracking-[-0.03em] leading-[1.05] text-foreground/80 hover:text-primary transition-colors cursor-default">
                  {d}
                </span>
                <sup className="font-mono text-[10px] text-muted-foreground/40 tracking-widest">
                  {String(i + 1).padStart(2, "0")}
                </sup>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROCESS — large numbered editorial steps */}
        <section className="px-6 lg:px-20 py-24 md:py-32 border-t border-border/60">
          <div className="grid lg:grid-cols-12 gap-12 mb-20 items-end">
            <div className="lg:col-span-2 font-mono text-[11px] text-primary uppercase tracking-[0.2em] lg:pb-3">
              03 / Método
            </div>
            <h2 className="lg:col-span-7 font-display text-4xl md:text-6xl lg:text-7xl uppercase leading-[0.95] tracking-[-0.045em]">
              Quatro etapas, <em className="italic font-light text-primary">zero zona cinzenta</em>.
            </h2>
            <p className="lg:col-span-3 text-[14px] text-muted-foreground leading-relaxed">
              Gates claros entre estratégia, execução e mensuração.
            </p>
          </div>

          <div className="border-t border-border/60">
            {props.process.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="group grid lg:grid-cols-12 gap-6 lg:gap-12 items-start py-10 md:py-14 border-b border-border/60 hover:bg-card/20 transition-colors px-2 -mx-2"
              >
                <div className="lg:col-span-3 font-display text-7xl md:text-8xl lg:text-9xl text-primary/15 group-hover:text-primary transition-colors leading-none tracking-[-0.05em]">
                  {p.step}
                </div>
                <div className="lg:col-span-5">
                  <div className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-widest mb-3">
                    fase 0{i + 1}
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase tracking-[-0.04em] leading-[0.95]">
                    {p.title}
                  </h3>
                </div>
                <p className="lg:col-span-4 text-[15px] md:text-base text-muted-foreground leading-[1.65] lg:pt-2">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {props.extraSection}

        {/* FAQ — editorial split */}
        <section className="px-6 lg:px-20 py-24 md:py-32 border-t border-border/60">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4">
              <div className="font-mono text-primary text-[11px] uppercase tracking-[0.2em] mb-6">
                04 / FAQ
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase leading-[0.95] tracking-[-0.045em]">
                Dúvidas<br />
                <em className="italic font-light text-primary">comuns</em>.
              </h2>
              <p className="mt-8 text-[14px] text-muted-foreground leading-relaxed max-w-sm">
                Respostas diretas. Fora desta lista? Chame no WhatsApp — respondemos em horas, não dias.
              </p>
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="group mt-6 inline-flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.2em] text-primary hover:gap-4 transition-all"
              >
                <MessageCircle className="h-4 w-4" />
                Falar agora
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
            <div className="lg:col-span-8 border-t border-border/60">
              {props.faqs.map((f, i) => (
                <details key={f.q} className="group border-b border-border/60 open:bg-card/10 transition-colors">
                  <summary className="flex justify-between items-baseline gap-6 py-7 cursor-pointer list-none hover:text-primary transition-colors">
                    <div className="flex items-baseline gap-6">
                      <span className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-widest shrink-0">
                        0{i + 1}
                      </span>
                      <span className="font-display text-lg md:text-2xl uppercase tracking-[-0.025em] leading-[1.15]">
                        {f.q}
                      </span>
                    </div>
                    <span className="text-primary font-mono text-2xl group-open:rotate-45 transition-transform shrink-0 leading-none">
                      +
                    </span>
                  </summary>
                  <div className="pb-7 pl-[52px] pr-12 text-muted-foreground text-[15px] leading-[1.7] max-w-3xl">
                    {f.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA — editorial closer */}
        <section className="relative px-6 lg:px-20 py-32 md:py-44 overflow-hidden border-t border-border/60">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 50% 50%, oklch(85% 0.2 145 / 0.12) 0%, transparent 60%)",
            }}
          />

          <div className="relative max-w-6xl mx-auto text-center">
            <div className="font-mono text-primary text-[11px] uppercase tracking-[0.25em] mb-8">
              05 / Próximo passo
            </div>
            <h2 className="font-display text-5xl md:text-7xl lg:text-9xl uppercase leading-[0.86] tracking-[-0.05em] mb-10">
              Quer o diagnóstico do seu <em className="italic font-light text-primary">cenário?</em>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-14 font-light max-w-2xl mx-auto leading-[1.55]">
              5 minutos. Score de Maturidade, classificação de estágio e 3 recomendações
              personalizadas — sem custo.
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <Button
                onClick={open}
                className="group h-14 rounded-none bg-primary px-10 text-[12px] font-bold uppercase tracking-[0.2em] text-primary-foreground hover:-translate-y-0.5 transition-all hover:shadow-[0_15px_50px_oklch(85%_0.2_145/0.5)]"
              >
                Fazer Diagnóstico Gratuito
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.2em] text-foreground/80 hover:text-primary transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-primary" />
                WhatsApp da Aceleriq
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>

            <Link
              to="/"
              className="inline-block mt-20 font-mono text-[10px] text-muted-foreground/50 uppercase tracking-[0.3em] hover:text-primary transition-colors"
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
    provider: {
      "@type": "Organization",
      name: "Aceleriq",
      url: "https://aceleriq.com.br",
    },
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
