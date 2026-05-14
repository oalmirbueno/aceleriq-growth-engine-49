import { useState, type ReactNode } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, MessageCircle, Plus } from "lucide-react";
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

const MARQUEE_TOKENS = [
  "ENGENHARIA DE CRESCIMENTO",
  "FUNIL ORIENTADO A RECEITA",
  "STACK MODERNA",
  "CRM + IA + DADOS",
  "DEPLOY EDGE",
  "SEO TÉCNICO",
  "EXPERIMENTAÇÃO CONTÍNUA",
  "MEDIA EFFICIENT",
];

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
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(255 255 255) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <main className="relative z-10">
        {/* HERO — split with terminal panel */}
        <section className="relative pt-32 pb-20 border-b border-border overflow-hidden">
          {/* Ambient radial */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-[0.18]"
            style={{
              background:
                "radial-gradient(circle, oklch(85% 0.2 145 / 0.6) 0%, transparent 60%)",
            }}
          />

          <div className="relative px-6 lg:px-20 grid lg:grid-cols-12 gap-12 items-end">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-8"
            >
              <div className="inline-flex items-center gap-3 mb-8 font-mono text-primary text-[11px] tracking-widest uppercase">
                <span className="px-2 py-1 border border-primary/70 bg-primary/5">Core Service</span>
                <span className="opacity-40">//</span>
                <span className="text-foreground/70">{props.eyebrow}</span>
              </div>

              <h1 className="font-display text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[7.5rem] leading-[0.88] uppercase mb-10 tracking-[-0.045em]">
                {props.h1}
              </h1>

              <div className="grid lg:grid-cols-12 gap-8 items-end">
                <p className="lg:col-span-7 text-base md:text-lg text-muted-foreground font-light leading-relaxed">
                  {props.intro}
                </p>
                <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
                  <Button
                    onClick={open}
                    size="lg"
                    className="group relative h-14 rounded-none bg-primary px-7 text-[12px] font-bold uppercase tracking-[0.15em] text-primary-foreground hover:-translate-y-0.5 transition-all hover:shadow-[0_8px_30px_oklch(85%_0.2_145/0.4)]"
                  >
                    Diagnóstico Gratuito
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    <span className="absolute -top-px -right-px w-2 h-2 bg-background border border-primary" />
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-14 rounded-none border-border bg-card/30 backdrop-blur px-7 text-[12px] font-bold uppercase tracking-[0.15em] hover:bg-card hover:border-primary/50"
                  >
                    <a href={wa} target="_blank" rel="noreferrer" className="flex items-center gap-3">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full bg-primary opacity-60" />
                        <span className="relative inline-flex h-2 w-2 bg-primary" />
                      </span>
                      <MessageCircle className="h-4 w-4 text-primary" />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Right: Terminal panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-4 hidden lg:block"
            >
              <div className="border border-border bg-card/40 backdrop-blur-sm">
                <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card/60">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-primary/70" />
                    <span className="w-2 h-2 bg-foreground/20" />
                    <span className="w-2 h-2 bg-foreground/20" />
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-widest">
                    aceleriq://protocol
                  </span>
                </div>
                <div className="p-5 font-mono text-[11px] leading-loose">
                  <div className="text-muted-foreground/50">$ system.boot</div>
                  <div className="text-primary">→ access_granted</div>
                  <div className="text-muted-foreground/50 mt-2">$ load.modules</div>
                  <div className="text-foreground/80">
                    [<span className="text-primary">✓</span>] strategy_engine
                    <br />
                    [<span className="text-primary">✓</span>] data_pipeline
                    <br />
                    [<span className="text-primary">✓</span>] ai_layer
                    <br />
                    [<span className="text-primary">✓</span>] crm_bridge
                  </div>
                  <div className="text-muted-foreground/50 mt-2">$ status</div>
                  <div className="flex items-center gap-2 text-primary">
                    <span className="w-1.5 h-1.5 bg-primary animate-pulse" />
                    operating · 24/7
                  </div>
                  <div className="mt-4 pt-4 border-t border-border/60 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-muted-foreground/50 uppercase text-[9px] tracking-widest">avg_lift</div>
                      <div className="font-display text-2xl text-primary mt-1">+312%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground/50 uppercase text-[9px] tracking-widest">deploy_time</div>
                      <div className="font-display text-2xl">14<span className="text-primary">d</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex justify-between font-mono text-[9px] uppercase text-muted-foreground/40 tracking-widest">
                <span>[ NODE_01 ]</span>
                <span>v3.0.1</span>
              </div>
            </motion.div>
          </div>

          {/* Hero footer meta */}
          <div className="relative mt-20 px-6 lg:px-20 flex flex-wrap gap-6 md:gap-12 font-mono text-[10px] uppercase text-muted-foreground/40 tracking-widest">
            <div>[ LOC ] 25.4284 S · 49.2733 W</div>
            <div>[ STATUS ] OPERATING_24/7</div>
            <div className="ml-auto hidden md:block">[ V3.0 / ESTRATÉGIA · DADOS · IA ]</div>
          </div>
        </section>

        {/* MARQUEE STRIP */}
        <section className="border-b border-border bg-card/20 overflow-hidden">
          <div className="flex gap-12 py-5 animate-[marquee_40s_linear_infinite] whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.25em] text-muted-foreground/60">
            {[...MARQUEE_TOKENS, ...MARQUEE_TOKENS, ...MARQUEE_TOKENS].map((t, i) => (
              <span key={i} className="flex items-center gap-12">
                <span>{t}</span>
                <span className="text-primary">◆</span>
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

        {/* METRICS BAND */}
        <section className="border-b border-border grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {[
            { val: 312, suffix: "%", label: "lift médio em conversão" },
            { val: 14, suffix: "d", label: "tempo médio para go-live" },
            { val: 96, suffix: "+", label: "lighthouse performance" },
            { val: 24, suffix: "/7", label: "monitoramento ativo" },
          ].map((m, i) => (
            <div key={i} className="p-6 md:p-10 group hover:bg-card/30 transition-colors">
              <div className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-widest mb-3">
                0{i + 1} / metric
              </div>
              <div className="font-display text-4xl md:text-6xl text-primary tracking-[-0.04em] leading-none">
                <CountUp to={m.val} suffix={m.suffix} />
              </div>
              <div className="mt-3 text-[12px] text-muted-foreground/80 leading-snug">{m.label}</div>
            </div>
          ))}
        </section>

        {/* WHY / BENEFITS — premium cards grid */}
        <section className="px-6 lg:px-20 py-24 md:py-32 border-b border-border">
          <div className="grid lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-5">
              <div className="font-mono text-primary text-[11px] uppercase tracking-widest mb-4">
                [ 01 / why_aceleriq ]
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase leading-[0.92] tracking-[-0.04em]">
                Resultado lido por <span className="text-primary">receita</span>, não por entregável avulso.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 self-end">
              <p className="text-muted-foreground text-[15px] leading-relaxed">
                Cada decisão é planejada por engenharia de crescimento. Sem vaidade estética, sem
                checklist de produção — apenas o que move o KPI que importa para o seu estágio.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {props.benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative bg-background p-8 hover:bg-card/40 transition-colors min-h-[220px] flex flex-col justify-between"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-10 h-10 border border-primary/60 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors">
                    <Plus className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-widest">
                    /0{i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-xl md:text-2xl uppercase tracking-[-0.02em] mb-3 leading-tight">
                    {b.title}
                  </h3>
                  <p className="text-[13.5px] text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
                <div className="absolute bottom-0 left-0 h-px bg-primary w-0 group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* DELIVERABLES — Bento with featured visual tile */}
        <section className="px-6 lg:px-20 py-24 md:py-32 border-b border-border bg-card/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="max-w-2xl">
              <div className="font-mono text-primary text-[11px] uppercase tracking-widest mb-4">
                [ 02 / deliverables ]
              </div>
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl uppercase leading-[0.9] tracking-[-0.04em]">
                Escopo da <span className="text-primary">Aceleriq</span>
              </h2>
            </div>
            <p className="max-w-xs text-muted-foreground/80 text-[13px] leading-relaxed">
              Tudo o que entra no programa, sem letra miúda. Customizamos a profundidade conforme o
              estágio e o objetivo da sua empresa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[180px] gap-px bg-border border border-border">
            {/* Big featured tile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="md:col-span-2 md:row-span-2 relative bg-background p-8 md:p-10 group overflow-hidden flex flex-col justify-between"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity"
                style={{
                  backgroundImage:
                    "radial-gradient(oklch(85% 0.2 145) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full opacity-[0.12]"
                style={{
                  background: "radial-gradient(circle, oklch(85% 0.2 145) 0%, transparent 60%)",
                }}
              />

              <div className="relative">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 border border-primary flex items-center justify-center bg-primary/5">
                    <div className="w-2.5 h-2.5 bg-primary animate-pulse" />
                  </div>
                  <span className="font-mono text-[10px] text-primary uppercase tracking-widest">
                    // 01_core_deliverable
                  </span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase tracking-[-0.03em] leading-[0.95] mb-5 max-w-md">
                  {bigDeliverable}
                </h3>
                <p className="text-muted-foreground text-[14px] leading-relaxed max-w-md">
                  Cada entregável é planejado, executado e medido pelo seu impacto em receita —
                  não por checklist de produção.
                </p>
              </div>

              <div className="relative flex items-center justify-between mt-8">
                <span className="font-mono text-[10px] text-primary uppercase tracking-widest flex items-center gap-2">
                  <span className="w-6 h-px bg-primary" />
                  high_fidelity_output
                </span>
                <ArrowUpRight className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform" />
              </div>
            </motion.div>

            {restDeliverables.map((d, i) => (
              <motion.div
                key={d}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="group relative bg-background p-6 hover:bg-primary/5 transition-colors flex flex-col justify-between overflow-hidden"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-widest">
                    0{i + 2}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="font-display text-base md:text-[17px] uppercase tracking-tight leading-tight">
                  {d}
                </h3>
                <div className="absolute bottom-0 left-0 h-px bg-primary w-0 group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROCESS — Horizontal cards on desktop, vertical on mobile */}
        <section className="px-6 lg:px-20 py-24 md:py-32 border-b border-border">
          <div className="grid lg:grid-cols-12 gap-12 mb-16 items-end">
            <div className="lg:col-span-7">
              <div className="font-mono text-primary text-[11px] uppercase tracking-widest mb-4">
                [ 03 / execution_flow ]
              </div>
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl uppercase leading-[0.9] tracking-[-0.04em]">
                Processo <span className="text-primary">Aceleriq</span>
              </h2>
            </div>
            <p className="lg:col-span-4 lg:col-start-9 text-muted-foreground text-[14px] leading-relaxed">
              Quatro etapas com gates claros — sem zonas cinzentas entre estratégia, execução e
              mensuração.
            </p>
          </div>

          {/* Progress line */}
          <div className="hidden lg:block relative mb-10">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-border" />
            <div className="relative flex justify-between">
              {props.process.map((p, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`w-3 h-3 rotate-45 ${i === 0 ? "bg-primary" : "bg-card border border-border"}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-px bg-border border border-border">
            {props.process.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group relative bg-background p-7 md:p-8 min-h-[280px] flex flex-col hover:bg-card/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="font-display text-5xl md:text-6xl text-primary leading-none tracking-[-0.05em]">
                    {p.step}
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-widest">
                    phase_0{i + 1}
                  </div>
                </div>
                <h3 className="font-display text-2xl md:text-3xl uppercase tracking-[-0.03em] leading-tight mb-4">
                  {p.title}
                </h3>
                <p className="text-[13.5px] text-muted-foreground leading-relaxed flex-1">
                  {p.desc}
                </p>
                <div className="mt-6 pt-6 border-t border-border/60 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50 group-hover:text-primary transition-colors">
                  → {p.title.split(" ")[0].toLowerCase()}_complete
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {props.extraSection}

        {/* FAQ */}
        <section className="px-6 lg:px-20 py-24 md:py-32 bg-card/20 border-b border-border">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4">
              <div className="font-mono text-primary text-[11px] uppercase tracking-widest mb-4">
                [ 04 / technical_faq ]
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase leading-[0.9] tracking-[-0.04em]">
                Dúvidas<br />
                <span className="text-primary">Comuns</span>
              </h2>
              <div className="mt-8 border-l-2 border-primary/60 pl-4 font-mono text-[11px] uppercase text-muted-foreground/70 leading-relaxed">
                respostas diretas, sem rodeios.<br />
                fora desta lista? chame no whatsapp.
              </div>
              <Button
                asChild
                variant="outline"
                className="mt-6 h-12 rounded-none border-border bg-transparent px-6 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-card hover:border-primary/50"
              >
                <a href={wa} target="_blank" rel="noreferrer" className="flex items-center gap-3">
                  <MessageCircle className="h-4 w-4 text-primary" />
                  Falar agora
                </a>
              </Button>
            </div>
            <div className="lg:col-span-8 space-y-px bg-border border border-border">
              {props.faqs.map((f, i) => (
                <details
                  key={f.q}
                  className="group bg-background open:bg-card/30 transition-colors"
                >
                  <summary className="flex justify-between items-center gap-6 p-6 md:p-7 cursor-pointer list-none hover:bg-card/20 transition-colors">
                    <div className="flex items-center gap-5">
                      <span className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-widest">
                        0{i + 1}
                      </span>
                      <span className="font-display text-base md:text-lg uppercase tracking-[-0.01em]">
                        {f.q}
                      </span>
                    </div>
                    <span className="text-primary font-mono text-2xl group-open:rotate-45 transition-transform shrink-0 leading-none">
                      +
                    </span>
                  </summary>
                  <div className="px-6 md:px-7 pb-6 md:pb-7 pl-[68px] md:pl-[76px] text-muted-foreground text-[14px] leading-relaxed max-w-3xl">
                    {f.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative px-6 lg:px-20 py-28 md:py-40 flex flex-col items-center text-center overflow-hidden border-b border-border">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.10]"
            style={{
              backgroundImage:
                "radial-gradient(oklch(85% 0.2 145) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, oklch(85% 0.2 145 / 0.12) 0%, transparent 55%)",
            }}
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

          <div className="relative z-10 max-w-4xl">
            <div className="font-mono text-primary text-[11px] uppercase tracking-widest mb-6 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-primary/60" />
              [ 05 / next_step ]
              <span className="w-8 h-px bg-primary/60" />
            </div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-8xl uppercase leading-[0.88] tracking-[-0.045em] mb-8">
              Quer o diagnóstico do seu <span className="text-primary">cenário?</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-12 font-light max-w-2xl mx-auto leading-relaxed">
              5 minutos. Score de Maturidade, classificação de estágio e 3 recomendações
              personalizadas — sem custo.
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Button
                onClick={open}
                size="lg"
                className="h-14 rounded-none bg-primary px-10 text-[12px] font-bold uppercase tracking-[0.2em] text-primary-foreground hover:shadow-[0_0_50px_oklch(85%_0.2_145/0.5)] transition-shadow"
              >
                Fazer Diagnóstico Gratuito
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 rounded-none border-border bg-card/30 backdrop-blur px-10 text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-card hover:border-primary/50"
              >
                <a href={wa} target="_blank" rel="noreferrer" className="flex items-center gap-3">
                  <MessageCircle className="h-4 w-4 text-primary" />
                  WhatsApp da Aceleriq
                </a>
              </Button>
            </div>

            <Link
              to="/"
              className="inline-block mt-16 font-mono text-[10px] text-muted-foreground/60 uppercase tracking-[0.3em] hover:text-primary transition-colors"
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
