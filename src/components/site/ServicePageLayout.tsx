import { useState, type ReactNode } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Check, MessageCircle, MapPin } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onDiagnostico={open} />
      <main>
        {/* HERO */}
        <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 bg-grid-ambient overflow-hidden">
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-[200px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-primary/[0.04] blur-[100px]" />
          <div className="container-aceleriq relative">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <span className="label-eyebrow inline-flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                {props.eyebrow}
              </span>
              <h1 className="mt-4 font-display text-4xl font-medium leading-[1.05] tracking-[-0.03em] md:text-6xl">
                {props.h1}
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                {props.intro}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button onClick={open} size="lg" className="group h-12 rounded-md bg-primary px-7 text-[14px] font-semibold text-primary-foreground btn-interactive">
                  Diagnóstico Gratuito
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 rounded-md border-border bg-transparent px-7 text-[14px] font-medium hover:bg-card">
                  <a href={wa} target="_blank" rel="noreferrer">
                    <MessageCircle className="h-4 w-4 text-primary" />
                    Falar no WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="relative py-12 md:py-16 bg-grid-ambient">
          <div className="container-aceleriq">
            <span className="label-eyebrow">[ 01 ] · Por que com a Aceleriq</span>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-medium leading-[1.1] tracking-[-0.03em] md:text-4xl">
              Resultado lido por receita, não por entregável avulso.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {props.benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="hairline rounded-xl bg-card/40 p-5 card-hover"
                >
                  <h3 className="font-display text-[15px] font-medium tracking-tight">{b.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* DELIVERABLES */}
        <section className="relative py-12 md:py-16 bg-grid-ambient">
          <div className="container-aceleriq grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="label-eyebrow">[ 02 ] · O que está incluso</span>
              <h2 className="mt-3 font-display text-3xl font-medium leading-[1.1] tracking-[-0.03em] md:text-4xl">
                Escopo da Aceleriq
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                Tudo o que entra no programa, sem letra miúda. Customizamos a profundidade conforme o estágio da sua empresa.
              </p>
            </div>
            <ul className="lg:col-span-7 grid gap-3 sm:grid-cols-2">
              {props.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span className="text-[13px] leading-relaxed text-muted-foreground">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* PROCESS */}
        <section className="relative py-12 md:py-16 bg-grid-ambient">
          <div className="container-aceleriq">
            <span className="label-eyebrow">[ 03 ] · Como funciona</span>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-medium leading-[1.1] tracking-[-0.03em] md:text-4xl">
              Processo Aceleriq
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {props.process.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="rounded-xl border border-white/[0.08] bg-card/40 p-5"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">{p.step}</span>
                  <h3 className="mt-3 font-display text-[15px] font-medium">{p.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-12 md:py-16 bg-grid-ambient">
          <div className="container-aceleriq max-w-3xl">
            <span className="label-eyebrow">[ 04 ] · Perguntas frequentes</span>
            <h2 className="mt-3 font-display text-3xl font-medium leading-[1.1] tracking-[-0.03em] md:text-4xl">
              FAQ
            </h2>
            <div className="mt-8 space-y-3">
              {props.faqs.map((f) => (
                <details key={f.q} className="group rounded-xl border border-white/[0.08] bg-card/40 p-5">
                  <summary className="cursor-pointer list-none font-display text-[15px] font-medium tracking-tight text-foreground">
                    {f.q}
                  </summary>
                  <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-12 md:py-16 bg-grid-ambient">
          <div className="container-aceleriq">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card/40 p-8 text-center md:p-12">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
              <h2 className="mx-auto max-w-3xl font-display text-3xl font-medium leading-[1.05] tracking-[-0.03em] md:text-5xl">
                Quer o diagnóstico do seu cenário?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                5 minutos. Score de Maturidade, classificação de estágio e 3 recomendações personalizadas — sem custo.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button onClick={open} size="lg" className="group h-12 rounded-md bg-primary px-7 text-[14px] font-semibold text-primary-foreground btn-interactive">
                  Fazer Diagnóstico Gratuito
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 rounded-md border-border bg-transparent px-7 text-[14px] font-medium hover:bg-card">
                  <a href={wa} target="_blank" rel="noreferrer">
                    <MessageCircle className="h-4 w-4 text-primary" />
                    WhatsApp da Aceleriq
                  </a>
                </Button>
              </div>
              <div className="mt-6">
                <Link to="/" className="text-[12px] font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-primary">
                  ← Voltar para a home
                </Link>
              </div>
            </div>
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
