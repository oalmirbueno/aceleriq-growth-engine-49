import { useState, type ReactNode } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { DiagnosticoModal } from "@/components/site/DiagnosticoModal";
import { AmbientBackdrop } from "@/components/site/AmbientBackdrop";
import type { ServiceVariant } from "@/components/site/ServiceVisual";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/ui/CountUp";
import { whatsappLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/contact";

export type ServiceFAQ = { q: string; a: string };

export type ServicePrinciple = {
  eyebrow: string;
  title: ReactNode;
  body: string;
  stats: { v: string; l: string }[];
};

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
  principle?: ServicePrinciple;
  heroAside?: ReactNode;
};

const DEFAULT_PRINCIPLES: Record<ServiceVariant, ServicePrinciple> = {
  sites: {
    eyebrow: "✦ Princípio · Sites",
    title: (
      <>
        Site é <span className="bg-primary text-foreground px-2">ativo de receita</span>,
        <br />
        não cartão de visita.
      </>
    ),
    body: "Cada bloco é desenhado para vender: hierarquia clara, performance brutal, SEO técnico nativo e CRM conectado. O site não termina no deploy, ele começa lá, alimentando tráfego, dados e funil em loop contínuo.",
    stats: [
      { v: "Performance", l: "real em produção" },
      { v: "SEO técnico", l: "nativo na entrega" },
      { v: "CRM", l: "conectado ao funil" },
    ],
  },
  trafego: {
    eyebrow: "✦ Princípio · Tráfego",
    title: (
      <>
        Mídia paga é <span className="bg-primary text-foreground px-2">distribuição</span>,
        <br />
        não loteria de clique.
      </>
    ),
    body: "Tráfego sem CRM e sem rastreio sério é aposta. A Aceleriq conecta Meta, Google e LinkedIn ao seu pipeline real e organiza o investimento por oportunidade, não por métrica de vaidade.",
    stats: [
      { v: "CRM", l: "como fonte da verdade" },
      { v: "Tracking", l: "server-side" },
      { v: "Pipeline", l: "como leitura final" },
    ],
  },
  ia: {
    eyebrow: "✦ Princípio · Automação & IA",
    title: (
      <>
        IA é <span className="bg-primary text-foreground px-2">alavanca</span>,
        <br />
        não enfeite de pitch.
      </>
    ),
    body: "Automação real tira tarefa repetitiva do colo do time e devolve foco em receita. Agentes de IA com base própria, fluxos n8n self-hosted e governança LGPD: tecnologia que opera, não que apenas demonstra.",
    stats: [
      { v: "Operação", l: "contínua" },
      { v: "RAG", l: "sobre sua base" },
      { v: "LGPD", l: "compliance nativo" },
    ],
  },
  agencia: {
    eyebrow: "✦ Princípio · Agência",
    title: (
      <>
        A gente <span className="bg-primary text-foreground px-2">vende sistema</span>,
        <br />
        não relatório bonito.
      </>
    ),
    body: "Cada peça do programa conversa com a próxima. Site alimenta tráfego. Tráfego alimenta CRM. CRM alimenta IA. IA devolve receita pra dentro do P&L. Sem ilha, sem entregável solto.",
    stats: [
      { v: "Sistema", l: "integrado de ponta a ponta" },
      { v: "Fonte única", l: "da verdade" },
      { v: "Melhoria", l: "contínua" },
    ],
  },
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
  const principle = props.principle ?? DEFAULT_PRINCIPLES[props.variant];

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-hidden">
      <AmbientBackdrop />
      <Header onDiagnostico={open} />

      <main className="relative z-10">
        {/* HERO */}
        <section className="relative pt-24 pb-14 md:pt-32 md:pb-20">
          <div className="relative px-6 lg:px-16 max-w-[1600px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`flex items-center gap-3 mb-6 md:mb-8 text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-muted-foreground/80 ${props.heroAside ? "justify-start" : "justify-center"}`}
            >
              <span className="h-px w-7 md:w-8 bg-primary" />
              <span className="text-primary font-mono">{props.eyebrow}</span>
              <span className="h-px w-7 md:w-8 bg-primary" />
            </motion.div>

            {props.heroAside ? (
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                <div className="lg:col-span-6 text-left">
                  <motion.h1
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.05 }}
                    className="font-display text-[2.05rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[0.98] uppercase tracking-[-0.035em]"
                  >
                    {props.h1}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-6 max-w-xl text-[15px] md:text-[15px] text-foreground/70 font-light leading-[1.7]"
                  >
                    {props.intro}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.32 }}
                    className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center"
                  >
                    <Button
                      onClick={open}
                      className="group h-12 w-full sm:w-auto rounded-none bg-primary px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground hover:-translate-y-0.5 transition-all hover:shadow-[0_8px_30px_oklch(85%_0.2_145/0.4)]"
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
                </div>
                <div className="relative lg:col-span-6 z-20">{props.heroAside}</div>
              </div>
            ) : (
              <div className="mx-auto max-w-5xl text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.05 }}
                  className="mx-auto max-w-[20ch] font-display text-[2.25rem] sm:text-5xl md:text-6xl lg:text-[4.75rem] leading-[1] uppercase tracking-[-0.035em]"
                >
                  {props.h1}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mx-auto mt-7 max-w-xl text-[14px] md:text-[15px] text-foreground/70 font-light leading-[1.65]"
                >
                  {props.intro}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.32 }}
                  className="mt-9 flex flex-wrap items-center justify-center gap-4"
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
              </div>
            )}
          </div>
        </section>

        {/* MARQUEE */}
        <section className="relative border-y border-primary/15 overflow-hidden bg-black">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-primary/[0.04] to-black" />
          <div className="relative flex gap-10 py-3.5 animate-[marquee_45s_linear_infinite] whitespace-nowrap text-[12px] uppercase tracking-[0.18em] text-muted-foreground/60">
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

        <section className="px-6 lg:px-16 py-16 md:py-20 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
            {[
              {
                label: "Estratégia antes da execução",
                note: "Diagnóstico e prioridade",
              },
              {
                label: "Implantação sob medida",
                note: "Processos e automações",
              },
              {
                label: "Operação acompanhada",
                note: "Indicadores documentados",
              },
              {
                label: "Melhoria contínua",
                note: "Ajustes guiados por dados",
              },
            ].map((m) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4 }}
                className="group"
              >
                <div className="h-px w-10 bg-primary mb-5 group-hover:w-16 transition-all" />
                <div className="pt-1">
                  <div className="text-[14px] md:text-[15px] text-foreground/90 leading-snug font-medium">{m.label}</div>
                  <div className="mt-1.5 text-[11px] text-muted-foreground/60">{m.note}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>


        {/* WHY / BENEFITS */}
        <section className="px-6 lg:px-16 py-16 md:py-24 border-t border-border/60 max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 mb-12">
            <div className="lg:col-span-2 font-mono text-[10px] text-primary uppercase tracking-[0.2em] lg:pt-2">
              01 / Por que
            </div>
            <h2 className="lg:col-span-10 font-display text-2xl md:text-4xl lg:text-5xl uppercase leading-[1.05] tracking-[-0.035em] max-w-[24ch]">
              Resultado lido por <em className="italic font-light text-primary">processo</em>, não
              por entregável avulso.
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
                  <span className="num-tight">/{String(i + 1).padStart(2, "0")}</span>
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

        {/* DELIVERABLES, refined two-column list */}
        <section className="relative px-6 lg:px-16 py-16 md:py-24 max-w-[1600px] mx-auto">
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
                <span className="num-tight font-mono text-[10px] text-muted-foreground/50 tracking-widest shrink-0 w-6">
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

        {/* MANIFESTO, light section to break the all-black rhythm */}
        <section className="relative bg-foreground text-background overflow-hidden border-y border-foreground/15">
          <div
            className="absolute -right-32 -top-32 h-96 w-96 rounded-full"
            style={{
              background: "radial-gradient(circle, oklch(85% 0.2 145 / 0.4), transparent 70%)",
            }}
          />
          <div className="relative max-w-[1600px] mx-auto px-6 lg:px-16 py-20 md:py-28 grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-2 font-mono text-[10px] uppercase tracking-[0.25em] opacity-60">
              {principle.eyebrow}
            </div>
            <div className="lg:col-span-7">
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl uppercase leading-[0.95] tracking-[-0.045em]">
                {principle.title}
              </h2>
              <p className="mt-6 max-w-xl text-[15px] md:text-base leading-[1.65] opacity-75">
                {principle.body}
              </p>
            </div>
            <div className="lg:col-span-3 flex flex-col gap-4">
              {principle.stats.map((s) => (
                <div
                  key={s.l}
                  className="flex flex-col gap-1 border-b border-background/15 pb-3"
                >
                  <span className="font-display text-lg font-semibold tracking-[-0.02em] text-primary">
                    {s.v}
                  </span>
                  <span className="text-[12px] uppercase tracking-widest opacity-70">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="px-6 lg:px-16 py-16 md:py-24 border-t border-border/60 max-w-[1600px] mx-auto">
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
                  <div className="font-mono text-[9px] text-muted-foreground/60 uppercase tracking-widest mb-1.5 whitespace-nowrap">
                    fase <span className="num-tight">{String(i + 1).padStart(2, "0")}</span>
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
        <section className="px-6 lg:px-16 py-16 md:py-24 border-t border-border/60 max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="font-mono text-primary text-[10px] uppercase tracking-[0.2em] mb-4">
                04 / FAQ
              </div>
              <h2 className="font-display text-2xl md:text-4xl lg:text-5xl uppercase leading-[1.05] tracking-[-0.035em]">
                Dúvidas <em className="italic font-light text-primary">comuns</em>.
              </h2>
              <p className="mt-5 text-[13px] text-muted-foreground leading-relaxed max-w-xs">
                Respostas diretas. Fora desta lista? Chame no WhatsApp, respondemos em horas.
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
                <details
                  key={f.q}
                  className="group border-b border-border/60 open:bg-card/10 transition-colors"
                >
                  <summary className="flex items-start justify-between gap-4 py-5 cursor-pointer list-none hover:text-primary transition-colors">
                    <div className="flex items-start gap-4">
                      <span className="num-tight font-mono text-[10px] text-muted-foreground/50 uppercase tracking-widest shrink-0 pt-1 whitespace-nowrap">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-base md:text-lg uppercase tracking-[-0.02em] leading-[1.2]">
                        {f.q}
                      </span>
                    </div>
                    <span className="pt-0.5 text-primary font-mono text-xl group-open:rotate-45 transition-transform shrink-0 leading-none">
                      +
                    </span>
                  </summary>
                  <div className="pb-6 pl-0 md:pl-[44px] pr-2 md:pr-10 text-muted-foreground text-[14px] leading-[1.65] max-w-3xl">
                    {f.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative px-6 lg:px-16 pt-20 pb-16 md:pt-24 md:pb-20 overflow-hidden border-t border-border/60">
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
              5 minutos. Score de Maturidade, classificação de estágio e 3 recomendações
              personalizadas, sem custo.
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-5">
              <Button
                onClick={open}
                className="group h-12 w-full sm:w-auto rounded-none bg-primary px-8 text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground hover:-translate-y-0.5 transition-all hover:shadow-[0_12px_40px_oklch(85%_0.2_145/0.5)]"
              >
                Fazer Diagnóstico Gratuito
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Button>
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/80 hover:text-primary transition-colors"
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
      <div className="relative z-10">
        <Footer />
      </div>
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
      logo: "https://aceleriq.com.br/icon-512.png",
    },
    areaServed: { "@type": "Country", name: "Brasil" },
    url: opts.url,
    description: opts.description,
    offers: {
      "@type": "Offer",
      url: opts.url,
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "BRL",
        description: "Sob consulta · diagnóstico gratuito",
      },
    },
  };
  const BREADCRUMB_JSONLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://aceleriq.com.br" },
      { "@type": "ListItem", position: 2, name: opts.serviceName, item: opts.url },
    ],
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
      { type: "application/ld+json", children: JSON.stringify(BREADCRUMB_JSONLD) },
    ],
  };
}

export { createFileRoute };
