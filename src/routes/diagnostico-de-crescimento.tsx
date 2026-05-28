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
  Search,
  Instagram,
  Database,
  Workflow,
  Bot
} from "lucide-react";
import { useState } from "react";
import { whatsappLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/contact";

const DIAGNOSTICO_FAQS = [
  {
    q: "O que é o Diagnóstico de Crescimento?",
    a: "É uma avaliação estratégica que analisa sua presença digital, atendimento, funil, CRM, tráfego e oportunidades para mostrar o que precisa ser ajustado antes de acelerar o investimento em marketing.",
  },
  {
    q: "Quanto tempo leva para fazer?",
    a: "A análise inicial leva cerca de 5 minutos no nosso formulário inteligente. Se houver fit, agendamos uma devolutiva técnica mais profunda.",
  },
  {
    q: "O que eu recebo ao final?",
    a: "Um mapa dos principais gargalos da sua operação, identificação de oportunidades de melhoria imediata e um plano inicial de priorização.",
  },
  {
    q: "Minha empresa ainda é pequena, posso fazer?",
    a: "Sim. O diagnóstico ajuda justamente a entender o que falta para você conseguir escalar com segurança, sem desperdiçar dinheiro em tráfego que não converte.",
  },
];

const TITLE = "Diagnóstico de Crescimento para Empresas | Aceleriq";
const DESCRIPTION = "Descubra onde sua empresa está perdendo vendas no marketing, WhatsApp, CRM, atendimento e comercial.";

export const Route = createFileRoute("/diagnostico-de-crescimento")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://aceleriq.com.br/diagnostico-de-crescimento" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://aceleriq.com.br/diagnostico-de-crescimento" }],
  }),
  component: DiagnosticoCrescimento,
});

const EVALUATED = [
  { icon: Search, label: "Site e presença digital" },
  { icon: Instagram, label: "Instagram e conteúdo" },
  { icon: Target, label: "Google Meu Negócio" },
  { icon: MessageCircle, label: "WhatsApp e atendimento" },
  { icon: Database, label: "CRM e organização comercial" },
  { icon: Workflow, label: "Funil e oferta" },
  { icon: BarChart3, label: "Tráfego pago" },
  { icon: Bot, label: "Automações e IA" },
  { icon: LineChart, label: "Métricas e acompanhamento" },
];

function DiagnosticoCrescimento() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onDiagnostico={() => setOpen(true)} />

      <main>
        {/* HERO */}
        <section className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-12 md:pt-20 md:pb-16 overflow-hidden bg-grid-tech">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />

          <div className="container-aceleriq relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mx-auto max-w-3xl text-center"
            >
              <span className="label-eyebrow">Análise de Maturidade Comercial</span>

              <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight">
                Descubra onde sua empresa está <span className="text-primary italic">perdendo vendas</span>.
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
                Em um diagnóstico estratégico, analisamos sua presença digital, atendimento, funil, CRM, tráfego e oportunidades para mostrar o que precisa ser ajustado antes de acelerar.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  onClick={() => setOpen(true)}
                  className="group h-12 rounded-md bg-primary px-8 text-[14px] font-semibold text-primary-foreground btn-interactive"
                >
                  Solicitar Diagnóstico
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-md border-border bg-transparent px-7 text-[14px] font-medium hover:bg-card"
                >
                  <a
                    href={whatsappLink("Olá, gostaria de saber mais sobre o diagnóstico de crescimento.")}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4 text-primary" />
                    Falar com especialista
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* O QUE AVALIAMOS */}
        <section className="relative py-12 md:py-20 bg-grid-ambient border-t border-white/10">
          <div className="container-aceleriq">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <span className="label-eyebrow">Escopo da Análise</span>
              <h2 className="mt-3 font-display text-3xl font-medium tracking-tight md:text-5xl">
                O que avaliamos na sua operação
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {EVALUATED.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-center gap-4 p-5 rounded-xl border border-white/10 bg-white/[0.03] group hover:border-primary/40 transition-colors"
                >
                  <p.icon className="h-5 w-5 text-primary shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-sm md:text-base text-muted-foreground group-hover:text-foreground transition-colors">{p.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ENTREGÁVEIS */}
        <section className="relative py-12 md:py-20 bg-grid-ambient border-t border-white/10 overflow-hidden">
          <div className="container-aceleriq relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="label-eyebrow">Entregável</span>
                <h2 className="mt-4 font-display text-3xl md:text-5xl font-medium tracking-tight">
                  O que você recebe ao final do diagnóstico
                </h2>
                <div className="mt-8 space-y-4">
                  {[
                    { title: "Mapa de Gargalos", desc: "Identificação clara de onde o lead está 'vazando' no seu funil." },
                    { title: "Oportunidades de Melhoria", desc: "Ações práticas que podem ser feitas agora para aumentar a conversão." },
                    { title: "Plano de Priorização", desc: "O que deve ser feito primeiro: marketing, comercial ou automação?" },
                    { title: "Sugestão de Próximos Passos", desc: "Um desenho da stack e dos processos ideais para o seu momento." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                      <div>
                        <h3 className="font-display text-lg font-medium">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative p-8 rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-sm">
                <div className="absolute -top-6 -right-6 h-12 w-12 bg-primary flex items-center justify-center rounded-full shadow-[0_0_20px_rgba(20,255,0,0.4)]">
                  <ShieldCheck className="h-6 w-6 text-black" />
                </div>
                <h3 className="font-display text-2xl mb-4 italic">Não é uma call genérica.</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  É uma análise profunda para entender se sua empresa precisa de mais marketing, mais processo, mais automação ou uma combinação dos três. 
                  <br /><br />
                  Nosso objetivo é dar clareza técnica e comercial para que você pare de depender do improviso.
                </p>
                <div className="mt-8 pt-8 border-t border-primary/20">
                  <Button onClick={() => setOpen(true)} className="w-full btn-tech">Quero meu diagnóstico</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-12 md:py-20 bg-grid-ambient border-t border-white/10">
          <div className="container-aceleriq">
            <div className="mx-auto max-w-2xl text-center mb-10">
              <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight">
                Dúvidas comuns
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
      </main>

      <Footer />
      <DiagnosticoModal open={open} onOpenChange={setOpen} origem="diagnostico-crescimento" />
    </div>
  );
}
