import { motion } from "framer-motion";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { DiagnosticoModal } from "@/components/site/DiagnosticoModal";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  Clock,
  HelpCircle,
  LineChart,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { useState } from "react";
import { whatsappLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/contact";

// ─── FAQs com schema FAQPage ──────────────────────────────────
const DIAGNOSTICO_FAQS = [
  {
    q: "O que é o Diagnóstico Aceleriq de Maturidade?",
    a: "É uma avaliação estratégica gratuita que mede em 12 dimensões o estágio da sua operação de marketing, vendas, dados, IA e processos. Ao final você recebe um Score de Maturidade (0-100), classificação de estágio e 3 recomendações personalizadas para destravar crescimento.",
  },
  {
    q: "Quanto tempo leva para fazer o diagnóstico?",
    a: "Cerca de 5 minutos. São 12 perguntas objetivas sobre estratégia, vendas, dados, IA, automação e operação, além de um breve formulário de contato.",
  },
  {
    q: "O diagnóstico é realmente gratuito?",
    a: "Sim. 100% gratuito, sem cartão de crédito, sem compromisso. Você recebe seu score e recomendações na hora. Se houver fit técnico e estratégico, agendamos uma conversa — mas isso é opcional.",
  },
  {
    q: "O que significa o Score de Maturidade?",
    a: "O Score varia de 0 a 100 e indica o quanto sua operação está estruturada para escalar. 0-25: Inicial · 26-50: Estruturação · 51-75: Avançado · 76-100: Otimizado. Cada estágio tem recomendações diferentes.",
  },
  {
    q: "Quem pode fazer o diagnóstico?",
    a: "Empresas que faturam a partir de R$ 100 mil/mês e têm produto/serviço validado. O diagnóstico é voltado a fundadores, sócios, diretores e heads de marketing, vendas ou operações.",
  },
  {
    q: "As recomendações são realmente personalizadas?",
    a: "Sim. O algoritmo considera seu score, estágio, faturamento, principal gargalo e área de interesse para gerar recomendações específicas — não são templates genéricos.",
  },
  {
    q: "E se eu não souber responder alguma pergunta?",
    a: "Sem problema. Responda com base no que você conhece hoje. O diagnóstico identifica lacunas — justamente o que mais trava o crescimento — e mostra como preenchê-las.",
  },
  {
    q: "O que acontece depois do diagnóstico?",
    a: "Você recebe o resultado completo com score, classificação e recomendações. Se houver fit, agendamos uma sessão estratégica de 60-90 minutos para aprofundar e desenhar um plano de engenharia de crescimento.",
  },
];

const FAQS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: DIAGNOSTICO_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const TITLE = "Diagnóstico Gratuito de Maturidade · Aceleriq";
const DESCRIPTION =
  "Avalie em 5 minutos o estágio da sua operação de marketing, vendas, dados e IA. Receba Score de Maturidade, classificação e 3 recomendações personalizadas.";

export const Route = createFileRoute("/diagnostico")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://aceleriq.com.br/diagnostico" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://aceleriq.com.br/diagnostico" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(FAQS_JSONLD),
      },
    ],
  }),
  component: DiagnosticoLanding,
});

const STEPS = [
  {
    icon: Target,
    title: "1. Responda 12 perguntas",
    desc: "Estratégia, vendas, dados, IA, automação e operação. Leva ~5 minutos.",
  },
  {
    icon: BarChart3,
    title: "2. Receba seu Score",
    desc: "Nota de 0 a 100 com classificação de estágio: Inicial, Estruturação, Avançado ou Otimizado.",
  },
  {
    icon: Sparkles,
    title: "3. Ações personalizadas",
    desc: "3 recomendações prioritárias baseadas no seu gargalo real e na sua maturidade atual.",
  },
];

const PILARES = [
  { icon: Brain, label: "Estratégia" },
  { icon: ShieldCheck, label: "Vendas" },
  { icon: LineChart, label: "Dados" },
  { icon: Brain, label: "IA" },
  { icon: Clock, label: "Automação" },
  { icon: CheckCircle2, label: "Operação" },
];

function DiagnosticoLanding() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onDiagnostico={() => setOpen(true)} />

      <main>
        {/* ─── HERO ───────────────────────────────────── */}
        <section className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-12 md:pt-20 md:pb-16 overflow-hidden bg-grid-tech">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />

          <div className="container-aceleriq relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mx-auto max-w-3xl text-center"
            >
              <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase py-1 border-b border-primary text-primary">
                Diagnóstico Aceleriq de Maturidade
              </span>

              <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight">
                Descubra o estágio da sua{" "}
                <span className="text-primary neon-text-glow italic">
                  operação
                </span>{" "}
                em 5 minutos.
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
                12 perguntas estratégicas. Score de Maturidade (0-100).
                Classificação de estágio. 3 recomendações personalizadas para
                destravar receita previsível.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  onClick={() => setOpen(true)}
                  className="group h-12 rounded-md bg-primary px-8 text-[14px] font-semibold text-primary-foreground btn-interactive"
                >
                  Iniciar Diagnóstico Gratuito
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-md border-border bg-transparent px-7 text-[14px] font-medium hover:bg-card"
                >
                  <a
                    href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4 text-primary" />
                    Falar com especialista
                  </a>
                </Button>
              </div>

              {/* Pilares avaliados */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                {PILARES.map((p) => (
                  <div
                    key={p.label}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5"
                  >
                    <p.icon className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs text-muted-foreground">{p.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── COMO FUNCIONA ────────────────────────────── */}
        <section className="relative py-12 md:py-20 bg-grid-ambient border-t border-white/10">
          <div className="container-aceleriq">
            <div className="mx-auto max-w-2xl text-center mb-10">
              <span className="label-eyebrow">Como funciona</span>
              <h2 className="mt-3 font-display text-3xl font-medium tracking-tight md:text-5xl">
                Três passos. Nenhum custo.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="hairline rounded-2xl bg-card/40 p-6 md:p-8"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 mb-5">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-medium">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {s.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ ────────────────────────────────────── */}
        <section id="faq" className="relative py-12 md:py-20 bg-grid-ambient border-t border-white/10">
          <div className="container-aceleriq">
            <div className="mx-auto max-w-2xl text-center mb-10">
              <span className="label-eyebrow">Perguntas frequentes</span>
              <h2 className="mt-3 font-display text-3xl font-medium tracking-tight md:text-5xl">
                Dúvidas antes de começar.
              </h2>
            </div>

            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="space-y-2.5">
                {DIAGNOSTICO_FAQS.map((f, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="overflow-hidden rounded-xl border border-border bg-card/40 px-5 transition-colors data-[state=open]:border-primary/30"
                  >
                    <AccordionTrigger className="py-5 text-left text-[15px] font-medium hover:no-underline">
                      <span className="flex items-center gap-3">
                        <HelpCircle className="h-4 w-4 flex-shrink-0 text-primary" />
                        {f.q}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 pl-7 text-[14px] leading-relaxed text-muted-foreground">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* ─── CTA FINAL ────────────────────────────────── */}
        <section className="relative py-12 md:py-20 bg-grid-ambient border-t border-white/10">
          <div className="container-aceleriq">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl border border-border bg-card/40 p-8 md:p-12 text-center"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

              <span className="label-eyebrow inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
                Próximo passo
              </span>

              <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-medium leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
                Pare de adivinhar.{" "}
                <span className="text-primary neon-text-glow">Meça sua maturidade.</span>
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
                Em 5 minutos você terá clareza sobre o que está travando o
                crescimento e o que fazer em sequência. Gratuito. Sem compromisso.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  onClick={() => setOpen(true)}
                  className="group h-12 rounded-md bg-primary px-8 text-[14px] font-semibold text-primary-foreground btn-interactive"
                >
                  Fazer Diagnóstico Gratuito
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-md border-border bg-transparent px-7 text-[14px] font-medium hover:bg-card"
                >
                  <Link to="/">
                    ← Voltar ao site
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <DiagnosticoModal open={open} onOpenChange={setOpen} origem="lp:diagnostico" />
    </div>
  );
}
