import { useState, type ReactNode } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { DiagnosticoModal } from "@/components/site/DiagnosticoModal";
import { Button } from "@/components/ui/button";
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

export function ServicePageLayout(props: ServicePageProps) {
  const [diagOpen, setDiagOpen] = useState(false);
  const open = () => setDiagOpen(true);
  const wa = whatsappLink(props.whatsappMessage ?? DEFAULT_WHATSAPP_MESSAGE);

  const [bigDeliverable, ...restDeliverables] = props.deliverables;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-hidden">
      <Header onDiagnostico={open} />

      {/* Global grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(255 255 255) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <main className="relative z-10">
        {/* HERO */}
        <section className="relative min-h-[88vh] flex flex-col justify-center px-6 lg:px-20 pt-32 pb-16 border-b border-border">
          <div className="absolute top-28 left-6 lg:left-20 hidden lg:block font-mono text-[10px] text-muted-foreground/70 leading-relaxed uppercase tracking-widest">
            system_access: granted<br />
            node_status: optimal<br />
            protocol: v3.0_creation
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl"
          >
            <div className="inline-flex items-center gap-3 mb-8 font-mono text-primary text-[11px] tracking-widest uppercase">
              <span className="px-2 py-0.5 border border-primary">Core Services</span>
              <span className="opacity-50">//</span>
              <span>{props.eyebrow}</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-9xl leading-[0.9] uppercase mb-12 tracking-[-0.04em]">
              {props.h1}
            </h1>

            <div className="grid lg:grid-cols-2 gap-10 items-end">
              <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-xl">
                {props.intro}
              </p>
              <div className="flex flex-wrap gap-4 lg:justify-end">
                <Button
                  onClick={open}
                  size="lg"
                  className="group relative h-14 rounded-none bg-primary px-8 text-[13px] font-bold uppercase tracking-tighter text-primary-foreground hover:-translate-y-0.5 transition-transform"
                >
                  Diagnóstico Gratuito
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-background border border-primary" />
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-14 rounded-none border-border bg-transparent px-8 text-[13px] font-bold uppercase tracking-tighter hover:bg-card"
                >
                  <a href={wa} target="_blank" rel="noreferrer" className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-primary animate-pulse" />
                    <MessageCircle className="h-4 w-4 text-primary" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="absolute bottom-8 left-6 lg:left-20 right-6 lg:right-20 flex flex-wrap gap-6 md:gap-12 font-mono text-[10px] uppercase text-muted-foreground/50">
            <div>[ LOC ] 25.4284 S, 49.2733 W</div>
            <div>[ STATUS ] OPERATING_24/7</div>
            <div className="ml-auto hidden md:block">[ V1.0 / ESTRATÉGIA / DADOS / IA ]</div>
          </div>
        </section>

        {/* WHY / BENEFITS — split with stats panel */}
        <section className="border-b border-border grid md:grid-cols-3">
          <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-border">
            <div className="font-mono text-primary mb-6 text-[11px] uppercase tracking-widest">[ 01 / performance ]</div>
            <h2 className="font-display text-3xl md:text-4xl uppercase leading-none tracking-[-0.04em] mb-6">
              Resultado lido por receita, não por entregável avulso.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-[15px]">
              Focamos em métricas de negócio, não em vaidade estética. Cada pixel serve à conversão.
            </p>
          </div>

          <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-border bg-card/30">
            <div className="font-mono text-primary mb-8 text-[11px] uppercase text-right">// stack.benefits</div>
            <div className="flex flex-col gap-5">
              {props.benefits.slice(0, 4).map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="border-b border-border/60 pb-3 last:border-0"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-display text-base uppercase tracking-tight">{b.title}</span>
                    <span className="font-mono text-[10px] text-primary shrink-0">0{i + 1}</span>
                  </div>
                  <p className="mt-1 text-[12.5px] text-muted-foreground leading-relaxed">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="p-8 md:p-12 flex flex-col justify-between">
            <div className="font-mono text-[10px] text-muted-foreground/40 leading-tight uppercase">
              _INIT_ENGINE<br />
              _DEPLOY_PROTOCOL<br />
              _DATA_VIZ_ACTIVE<br />
              _SEARCH_OPTIMIZED<br />
              _CRM_BRIDGE_OK<br />
              _PIXEL_CAPI_LIVE
            </div>
            <div className="mt-8 hairline-top pt-6">
              <div className="font-mono text-[10px] text-muted-foreground/60 uppercase">// avg_lift</div>
              <div className="font-display text-5xl text-primary mt-2">+312%</div>
              <div className="font-mono text-[10px] text-muted-foreground/40 mt-1 uppercase">conversion vs. baseline</div>
            </div>
          </div>
        </section>

        {/* DELIVERABLES — Bento */}
        <section className="px-6 lg:px-20 py-20 md:py-28 border-b border-border">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
            <div>
              <div className="font-mono text-primary text-[11px] uppercase tracking-widest mb-4">[ 02 / deliverables ]</div>
              <h2 className="font-display text-4xl md:text-6xl uppercase leading-none tracking-[-0.04em]">
                Escopo da Aceleriq
              </h2>
            </div>
            <p className="max-w-xs text-muted-foreground/70 font-mono text-[11px] uppercase leading-relaxed">
              Tudo o que entra no programa, sem letra miúda. Customizamos a profundidade conforme o estágio da sua empresa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-fr gap-px bg-border border border-border">
            {/* Big featured */}
            <div className="md:col-span-2 md:row-span-2 bg-background p-8 md:p-10 group hover:bg-primary/5 transition-colors">
              <div className="w-12 h-12 border border-primary flex items-center justify-center mb-12">
                <div className="w-2 h-2 bg-primary" />
              </div>
              <div className="font-mono text-[10px] text-primary uppercase mb-3">// 01_core_deliverable</div>
              <h3 className="font-display text-2xl md:text-3xl uppercase tracking-tight mb-4">{bigDeliverable}</h3>
              <p className="text-muted-foreground text-[14px] leading-relaxed max-w-md">
                Cada entregável é planejado, executado e medido pelo seu impacto em receita — não por checklist de produção.
              </p>
              <div className="mt-10 font-mono text-[10px] text-primary uppercase">→ high_fidelity_output</div>
            </div>

            {restDeliverables.map((d, i) => (
              <motion.div
                key={d}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="bg-background p-6 md:p-7 group hover:bg-card/60 transition-colors flex flex-col justify-between min-h-[160px]"
              >
                <div className="font-mono text-[10px] text-primary uppercase">0{i + 2}</div>
                <h3 className="font-display text-base md:text-lg uppercase tracking-tight mt-6 leading-tight">{d}</h3>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROCESS — Vertical timeline */}
        <section className="px-6 lg:px-20 py-20 md:py-28 border-b border-border">
          <div className="font-mono text-primary text-[11px] uppercase tracking-widest mb-4">[ 03 / execution_flow ]</div>
          <h2 className="font-display text-4xl md:text-6xl uppercase leading-none tracking-[-0.04em] mb-14">
            Processo Aceleriq
          </h2>

          <div className="grid gap-8">
            {props.process.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative pl-12 md:pl-16 border-l border-border py-6"
              >
                <div className={`absolute -left-[7px] top-8 w-3.5 h-3.5 ${i === 0 ? "bg-primary" : "bg-card border border-border group-hover:bg-primary"} transition-colors`} />
                <div className="absolute left-12 md:left-16 -top-1 font-mono text-[10px] text-muted-foreground/50 uppercase tracking-widest">
                  {p.step} // {p.title.split(" ")[0].toLowerCase()}
                </div>
                <h3 className="font-display text-2xl md:text-4xl uppercase tracking-[-0.03em]">{p.title}</h3>
                <p className="max-w-2xl mt-3 text-muted-foreground text-[15px] leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {props.extraSection}

        {/* FAQ */}
        <section className="px-6 lg:px-20 py-20 md:py-28 bg-card/20 border-b border-border">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            <div className="lg:w-1/3">
              <div className="font-mono text-primary text-[11px] uppercase tracking-widest mb-4">[ 04 / technical_faq ]</div>
              <h2 className="font-display text-4xl md:text-5xl uppercase leading-none tracking-[-0.04em]">
                Dúvidas<br />Comuns
              </h2>
              <p className="mt-6 font-mono text-[11px] uppercase text-muted-foreground/60 leading-relaxed">
                // respostas diretas, sem rodeios.<br />
                // alguma dúvida fora desta lista?<br />
                // chame no whatsapp.
              </p>
            </div>
            <div className="lg:w-2/3 space-y-px bg-border border border-border">
              {props.faqs.map((f) => (
                <details
                  key={f.q}
                  className="group bg-background border-b border-border last:border-0 open:bg-card/30"
                >
                  <summary className="flex justify-between items-center gap-6 p-6 md:p-7 cursor-pointer list-none">
                    <span className="font-display text-base md:text-lg uppercase tracking-tight">{f.q}</span>
                    <span className="text-primary font-mono text-2xl group-open:rotate-45 transition-transform shrink-0">
                      +
                    </span>
                  </summary>
                  <div className="px-6 md:px-7 pb-6 md:pb-7 text-muted-foreground text-[14px] leading-relaxed">
                    {f.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative px-6 lg:px-20 py-28 md:py-40 flex flex-col items-center text-center overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.10]"
            style={{
              backgroundImage:
                "radial-gradient(oklch(85% 0.2 145) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

          <div className="relative z-10 max-w-4xl">
            <div className="font-mono text-primary text-[11px] uppercase tracking-widest mb-6">[ 05 / next_step ]</div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl uppercase leading-[0.9] tracking-[-0.04em] mb-8">
              Quer o diagnóstico do seu <span className="text-primary">cenário?</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-10 font-light max-w-2xl mx-auto leading-relaxed">
              5 minutos. Score de Maturidade, classificação de estágio e 3 recomendações personalizadas — sem custo.
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Button
                onClick={open}
                size="lg"
                className="h-14 rounded-none bg-primary px-10 text-[13px] font-bold uppercase tracking-tighter text-primary-foreground hover:shadow-[0_0_40px_oklch(85%_0.2_145/0.35)] transition-shadow"
              >
                Fazer Diagnóstico Gratuito
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 rounded-none border-border bg-transparent px-10 text-[13px] font-bold uppercase tracking-tighter hover:bg-card"
              >
                <a href={wa} target="_blank" rel="noreferrer" className="flex items-center gap-3">
                  <MessageCircle className="h-4 w-4 text-primary" />
                  WhatsApp da Aceleriq
                </a>
              </Button>
            </div>

            <Link
              to="/"
              className="inline-block mt-14 font-mono text-[10px] text-muted-foreground/60 uppercase tracking-[0.3em] hover:text-primary transition-colors"
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

// re-export to avoid unused warning
export { createFileRoute };
