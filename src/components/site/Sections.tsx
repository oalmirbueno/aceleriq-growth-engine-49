import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  TrendingUp,
  Target,
  AlertTriangle,
  Users2,
  Database,
  Workflow,
  Bot,
  LineChart,
  Settings2,
  Megaphone,
  Search,
  Layers,
  Check,
  X,
  Quote,
  ShieldCheck,
  Brain,
  Rocket,
  Building2,
  Mail,
  Instagram,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP_DISPLAY,
  whatsappLink,
  DEFAULT_WHATSAPP_MESSAGE,
} from "@/lib/contact";

// ─────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────
export function Hero({ onDiagnostico }: { onDiagnostico: () => void }) {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 md:pt-32"
    >
      <div className="hero-bg absolute inset-0 -z-20" />
      <div className="hero-vignette absolute inset-0 -z-10" />

      <div className="container-aceleriq relative w-full">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Coluna esquerda — headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/[0.06] px-3.5 py-1.5 text-[11px] font-medium text-primary backdrop-blur-md"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <span className="text-mono uppercase tracking-[0.2em]">
                Engenharia de Crescimento
              </span>
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 font-display text-[48px] font-medium leading-[0.94] tracking-[-0.05em] md:text-[80px] lg:text-[116px]"
            >
              Transforme sua <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                operação em lucro
              </span>
              <span className="text-primary">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mx-auto mt-7 max-w-2xl text-[16px] leading-relaxed text-muted-foreground md:text-[19px]"
            >
              Aceleriq não é uma agência de marketing. É a engenharia que une
              estratégia, processo comercial, CRM, dados e inteligência
              artificial num único sistema operando dentro do seu negócio.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Button
                onClick={onDiagnostico}
                size="lg"
                className="group h-12 rounded-md bg-primary px-6 text-[14px] font-semibold text-primary-foreground btn-interactive hover:bg-primary"
              >
                Fazer Diagnóstico Gratuito
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-md border-border bg-background/40 px-6 text-[14px] font-medium backdrop-blur hover:bg-card"
              >
                <a
                  href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle className="h-4 w-4 text-primary" />
                  Falar no WhatsApp
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground"
            >
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                Sem compromisso
              </span>
              <span className="text-border">/</span>
              <span>Resultado em 5 minutos</span>
              <span className="text-border">/</span>
              <span>Baseado em dados</span>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Fade inferior para a próxima seção */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// DORES
// ─────────────────────────────────────────────────────────────
const PAINS = [
  { icon: Megaphone, title: "Marketing sem ROI", desc: "Investimento em tráfego sem leitura clara do que gera receita." },
  { icon: Users2, title: "Time comercial sem método", desc: "Vendedores apagando incêndio, sem playbook nem cadência." },
  { icon: Workflow, title: "Ferramentas desconectadas", desc: "CRM, planilhas, WhatsApp e automações que não conversam." },
  { icon: Database, title: "Decisão sem dados", desc: "Você sente o pulso do negócio, mas não tem dashboards confiáveis." },
  { icon: AlertTriangle, title: "Tudo depende do dono", desc: "Sem o sócio na operação, a empresa para. Existe heroísmo, não processo." },
  { icon: Target, title: "Leads ruins, propostas frias", desc: "Volume sobe, qualidade desce. CAC alto, ciclo longo, conversão baixa." },
];

export function Pains() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="container-aceleriq">
        <SectionHeader
          eyebrow="Sintomas comuns"
          title="Você reconhece algum destes problemas?"
          description="São os gargalos que travam empresas entre R$ 100k e R$ 5M/mês. Todos têm solução com a engenharia certa."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {PAINS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group relative bg-background p-7 transition-colors hover:bg-card/40"
            >
              <div className="flex items-start justify-between">
                <p.icon className="h-5 w-5 text-primary" />
                <span className="text-mono text-[11px] text-muted-foreground">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-6 font-display text-[17px] font-medium tracking-tight">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SOBRE / PILARES
// ─────────────────────────────────────────────────────────────
const PILLARS = [
  { icon: Brain, title: "Estratégia + Dados", desc: "Toda decisão sustentada em diagnóstico e métricas, nunca em achismo." },
  { icon: Workflow, title: "Processo Comercial", desc: "Playbook, cadência, CRM e automação para vender com método." },
  { icon: Bot, title: "IA & Automação", desc: "Agentes, fluxos e integrações que entregam tempo e escala ao time." },
  { icon: Layers, title: "Estrutura Operacional", desc: "Sua empresa para de depender de pessoas e passa a depender de sistemas." },
];

export function About() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="container-aceleriq">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6"
          >
            <span className="label-eyebrow">[ 02 ] · O que é a Aceleriq</span>
            <h2 className="mt-4 font-display text-3xl font-medium leading-[1.08] tracking-[-0.03em] md:text-5xl">
              Não é agência. É a engenharia de crescimento do seu negócio.
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground md:text-base">
              Agências entregam peças soltas — criativo, post, anúncio. A
              Aceleriq entrega <span className="text-foreground">um sistema</span>:
              diagnóstico, estratégia, execução, dados e IA integrados ao seu
              negócio para gerar resultado previsível.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
              Trabalhamos como engenharia: levantamos a planta da operação,
              identificamos os gargalos, projetamos a solução e instalamos o
              que precisa funcionar.
            </p>

            <div className="divider-neon mt-10" />

            <dl className="mt-8 grid grid-cols-3 gap-6">
              {[
                { k: "Empresas", v: "+50" },
                { k: "Setores", v: "8" },
                { k: "Anos", v: "5" },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="label-eyebrow">{s.k}</dt>
                  <dd className="mt-1.5 text-mono text-2xl font-semibold tracking-tight">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-6">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="hairline rounded-xl bg-card/40 p-6 card-hover"
              >
                <p.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-5 font-display text-[15px] font-medium">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// MÉTODO ACELERA
// ─────────────────────────────────────────────────────────────
const METHOD = [
  { letter: "A", title: "Análise", desc: "Diagnóstico 360º da operação, dados, time e funil." },
  { letter: "C", title: "Clareza", desc: "Posicionamento, oferta, ICP e narrativa que vendem." },
  { letter: "E", title: "Estratégia", desc: "Plano de crescimento com prioridades, metas e KPIs." },
  { letter: "L", title: "Lançamento", desc: "Construção de funil, criativos, CRM e automações." },
  { letter: "E", title: "Execução", desc: "Tráfego, conteúdo, vendas e operação rodando com ritmo." },
  { letter: "R", title: "Resultado", desc: "Dashboards, leitura semanal e otimização baseada em dados." },
  { letter: "A", title: "Aceleração", desc: "Escala com IA, automação avançada e novos canais." },
];

export function Method() {
  return (
    <section id="metodo" className="relative py-28 md:py-36">
      <div className="absolute inset-0 -z-10 dot-grid opacity-50" />
      <div className="container-aceleriq">
        <SectionHeader
          eyebrow="[ 03 ] · Método A.C.E.L.E.R.A"
          title="Sete etapas. Um sistema."
          description="Do diagnóstico à escala, com método de engenharia — não com palpite criativo."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {METHOD.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group relative bg-background p-7 transition-colors hover:bg-card/40"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display text-[64px] font-medium leading-none tracking-tighter text-primary neon-text-glow">
                  {step.letter}
                </span>
                <span className="text-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  · 0{i + 1}
                </span>
              </div>
              <h3 className="mt-5 font-display text-[15px] font-medium uppercase tracking-[0.1em]">
                {step.title}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// ÁREAS DE ATUAÇÃO
// ─────────────────────────────────────────────────────────────
const AREAS = [
  { icon: Search, title: "Diagnóstico estratégico", desc: "Mapeamento completo da operação, funil e gargalos." },
  { icon: Target, title: "Estratégia de crescimento", desc: "Plano de jogo com metas, alavancas e priorização." },
  { icon: Megaphone, title: "Tráfego pago", desc: "Meta, Google e LinkedIn lidos por receita, não por clique." },
  { icon: Settings2, title: "CRM & funil de vendas", desc: "Estruturação de CRM, automações e cadência comercial." },
  { icon: Bot, title: "IA & automação", desc: "Agentes de IA, fluxos n8n/Make e integrações sob medida." },
  { icon: Workflow, title: "Processos comerciais", desc: "Playbook, scripts, qualificação e ritual de vendas." },
  { icon: LineChart, title: "Dados & dashboards", desc: "Métricas, BI e visão executiva semanal do negócio." },
  { icon: Building2, title: "Estruturação operacional", desc: "Pessoas, papéis, rituais e SOPs para escalar com saúde." },
];

export function Areas() {
  return (
    <section id="areas" className="py-28 md:py-36">
      <div className="container-aceleriq">
        <SectionHeader
          eyebrow="[ 04 ] · Áreas de atuação"
          title="Tudo que sustenta o crescimento de uma empresa moderna."
          description="As 8 dimensões que separam empresas que crescem por sorte de empresas que crescem por engenharia."
        />

        <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {AREAS.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="hairline rounded-xl bg-card/40 p-6 card-hover"
            >
              <div className="flex items-start justify-between">
                <a.icon className="h-5 w-5 text-primary" />
                <span className="text-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-6 font-display text-[15px] font-medium tracking-tight">
                {a.title}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                {a.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// PARA QUEM É
// ─────────────────────────────────────────────────────────────
const FIT_YES = [
  "Faturamento mensal a partir de R$ 100 mil",
  "Produto/serviço validado e pronto para escalar",
  "Quer profissionalizar marketing, vendas e operação",
  "Acredita em método, dados e IA — não em achismo",
  "Pronto para construir um sistema, não comprar mágica",
];
const FIT_NO = [
  "Procurando solução milagrosa de curto prazo",
  "Não quer investir em estratégia, só em mídia",
  "Não está aberto a estruturar processos internos",
  "Espera resultado em 7 dias sem fundação",
  "Não quer envolver o time comercial e operacional",
];

export function FitFor() {
  return (
    <section className="py-28 md:py-36">
      <div className="container-aceleriq">
        <SectionHeader
          eyebrow="[ 05 ] · Para quem é"
          title="É parceria séria. Vale a pena saber se serve para você."
        />

        <div className="mt-16 grid gap-3 md:grid-cols-2">
          <div className="hairline rounded-2xl bg-card/40 p-7 md:p-9">
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Check className="h-3.5 w-3.5" />
              </span>
              <h3 className="font-display text-[15px] font-medium uppercase tracking-[0.12em]">
                É para você se…
              </h3>
            </div>
            <ul className="mt-7 space-y-4">
              {FIT_YES.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[14px] leading-relaxed">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                  <span className="text-foreground/90">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hairline rounded-2xl bg-card/40 p-7 md:p-9">
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <X className="h-3.5 w-3.5" />
              </span>
              <h3 className="font-display text-[15px] font-medium uppercase tracking-[0.12em]">
                Não é para você se…
              </h3>
            </div>
            <ul className="mt-7 space-y-4">
              {FIT_NO.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[14px] leading-relaxed">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground/60" />
                  <span className="text-muted-foreground">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// DIAGNÓSTICO CTA
// ─────────────────────────────────────────────────────────────
export function DiagnosticoCTA({ onDiagnostico }: { onDiagnostico: () => void }) {
  return (
    <section id="diagnostico" className="relative py-28 md:py-36">
      <div className="container-aceleriq">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card/40"
        >
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-primary/[0.07] blur-3xl" />
          <div className="absolute inset-0 dot-grid opacity-40" />

          <div className="relative grid gap-12 p-8 md:p-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <span className="label-eyebrow flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
                [ 06 ] · Diagnóstico inteligente
              </span>
              <h2 className="mt-4 font-display text-3xl font-medium leading-[1.08] tracking-[-0.03em] md:text-5xl">
                Descubra a maturidade do seu negócio em crescimento e IA.
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground md:text-base">
                Em até 5 minutos você responde 12 perguntas estratégicas e
                recebe sua classificação, score e 3 recomendações personalizadas
                para destravar o próximo estágio.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  onClick={onDiagnostico}
                  size="lg"
                  className="group h-12 rounded-md bg-primary px-6 text-[14px] font-semibold text-primary-foreground btn-interactive"
                >
                  Começar Diagnóstico
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-md border-border bg-transparent px-6 text-[14px] font-medium hover:bg-card"
                >
                  <a
                    href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="h-4 w-4 text-primary" />
                    Falar com especialista
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-xl border border-border bg-background/80 p-6 backdrop-blur">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    pergunta · 03 / 12
                  </span>
                  <span className="text-mono text-[11px] text-primary">25%</span>
                </div>
                <div className="mb-7 h-[3px] overflow-hidden rounded-full bg-secondary">
                  <div className="h-full w-1/4 rounded-full bg-primary" />
                </div>
                <h4 className="font-display text-[17px] font-medium leading-snug">
                  Qual o nível de maturidade do seu processo comercial?
                </h4>
                <div className="mt-6 grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      className="aspect-square rounded-lg border border-border bg-background text-mono text-base font-semibold transition-all hover:border-primary/60 hover:bg-primary/[0.08] hover:text-primary"
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <div className="mt-2.5 flex justify-between text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  <span>Inexistente</span>
                  <span>Excelente</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// RESULTADOS
// ─────────────────────────────────────────────────────────────
const METRICS = [
  { value: "+184%", label: "ROI médio · 90 dias" },
  { value: "3.2x", label: "Leads qualificados" },
  { value: "-42%", label: "Redução de CAC" },
  { value: "97%", label: "Renovação de programa" },
];

const CASES = [
  {
    segment: "SaaS B2B",
    challenge: "Time comercial sem método e CRM zerado",
    result: "+220% em pipeline qualificado em 4 meses",
  },
  {
    segment: "E-commerce",
    challenge: "Tráfego sem retorno e operação manual",
    result: "ROAS de 1.8 → 4.6 com automação e IA",
  },
  {
    segment: "Educação",
    challenge: "Funil quebrado e dependência do dono",
    result: "Operação 100% sistemizada e CAC -38%",
  },
];

export function Results() {
  return (
    <section id="resultados" className="py-28 md:py-36">
      <div className="container-aceleriq">
        <SectionHeader
          eyebrow="[ 07 ] · Resultados"
          title="Quando a engenharia entra, o resultado aparece."
          description="Indicadores médios e mini-cases reais de empresas que estruturaram seu sistema de crescimento com a Aceleriq."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-background p-7"
            >
              <span className="label-eyebrow">{m.label}</span>
              <div className="mt-3 text-mono text-[40px] font-semibold leading-none tracking-tight text-primary md:text-[44px]">
                {m.value}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {CASES.map((c, i) => (
            <motion.div
              key={c.segment}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="hairline rounded-2xl bg-card/40 p-7 card-hover"
            >
              <span className="text-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                {c.segment}
              </span>
              <div className="mt-5">
                <span className="label-eyebrow">Desafio</span>
                <p className="mt-1.5 text-[14px] text-muted-foreground">
                  {c.challenge}
                </p>
              </div>
              <div className="divider-neon my-5" />
              <div>
                <span className="label-eyebrow">Resultado</span>
                <p className="mt-1.5 text-[15px] font-medium text-foreground">
                  {c.result}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// DEPOIMENTOS
// ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Rafael M.",
    role: "CEO · SaaS B2B",
    quote:
      "Foi a primeira empresa que olhou para o nosso negócio como engenharia. Em 90 dias tínhamos previsibilidade que nunca tínhamos visto.",
  },
  {
    name: "Camila R.",
    role: "Sócia · Educação",
    quote:
      "Saímos do caos para um sistema que roda sem mim na ponta. CAC caiu 38% e o time finalmente tem método.",
  },
  {
    name: "Diego S.",
    role: "Diretor · E-commerce",
    quote:
      "Não é agência, é parceria de crescimento. ROAS, CRM, IA — tudo integrado. Não consigo voltar para o modelo anterior.",
  },
];

export function Testimonials() {
  return (
    <section className="py-28 md:py-36">
      <div className="container-aceleriq">
        <SectionHeader
          eyebrow="[ 08 ] · Depoimentos"
          title="O que dizem os fundadores que aceleraram conosco."
        />

        <div className="mt-16 grid gap-3 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="hairline relative rounded-2xl bg-card/40 p-7 card-hover"
            >
              <Quote className="h-5 w-5 text-primary/60" />
              <blockquote className="mt-5 text-[14px] leading-relaxed text-foreground/90">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3 border-t border-border pt-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-mono text-sm font-semibold text-primary">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-[14px] font-medium">{t.name}</div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {t.role}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPARATIVO
// ─────────────────────────────────────────────────────────────
const COMPARE: [string, string, string][] = [
  ["Foco", "Entregar peças (criativo, post, ad)", "Construir sistema de crescimento"],
  ["Estratégia", "Reativa, baseada em pedidos", "Diagnóstico, plano e priorização"],
  ["Vendas", "Não envolve o comercial", "Estrutura CRM, processo e cadência"],
  ["Dados", "Métricas de vaidade", "Dashboards de receita e LTV"],
  ["IA & Automação", "Inexistente ou superficial", "Agentes, fluxos e integrações reais"],
  ["Operação", "Externa ao seu negócio", "Integrada aos seus times e ferramentas"],
  ["Resultado", "Cliques, alcance, impressões", "Pipeline, receita e previsibilidade"],
  ["Relação", "Fornecedor", "Engenharia parceira de longo prazo"],
];

export function Compare() {
  return (
    <section className="py-28 md:py-36">
      <div className="container-aceleriq">
        <SectionHeader
          eyebrow="[ 09 ] · Comparativo"
          title="Agência comum vs. Aceleriq"
          description="A diferença entre contratar entregáveis e contratar um sistema de crescimento."
        />

        <div className="mt-16 overflow-hidden rounded-2xl border border-border">
          <div className="grid grid-cols-[1fr_1.4fr_1.4fr] border-b border-border bg-card/40">
            <div className="px-5 py-4 text-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Dimensão
            </div>
            <div className="px-5 py-4 text-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Agência comum
            </div>
            <div className="px-5 py-4 text-mono text-[11px] uppercase tracking-[0.18em] text-primary">
              Aceleriq
            </div>
          </div>
          {COMPARE.map(([dim, agency, us], i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_1.4fr_1.4fr] border-b border-border last:border-b-0 text-sm transition-colors hover:bg-card/30"
            >
              <div className="px-5 py-5 font-medium text-foreground/95">{dim}</div>
              <div className="px-5 py-5 text-muted-foreground">{agency}</div>
              <div className="flex items-start gap-2 px-5 py-5 text-foreground">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                {us}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// POR QUE AGORA
// ─────────────────────────────────────────────────────────────
export function WhyNow() {
  return (
    <section className="py-28 md:py-36">
      <div className="container-aceleriq">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card/40 p-8 md:p-14"
        >
          <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-primary/[0.06] blur-3xl" />
          <div className="absolute inset-0 dot-grid opacity-40" />

          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <span className="label-eyebrow flex items-center gap-2">
                <Rocket className="h-3.5 w-3.5 text-primary" />
                [ 10 ] · Janela de mercado
              </span>
              <h2 className="mt-4 font-display text-3xl font-medium leading-[1.08] tracking-[-0.03em] md:text-5xl">
                Por que agora? A janela é{" "}
                <span className="text-primary neon-text-glow">curta</span>.
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground md:text-base">
                Empresas que estruturarem dados, processo e IA nos próximos
                12-18 meses vão competir num patamar diferente. Quem ficar
                no modelo antigo de marketing vai ver margem, CAC e
                produtividade trabalharem contra.
              </p>
            </div>
            <div className="grid gap-2.5">
              {[
                { k: "Custo de aquisição", v: "+27% a.a." },
                { k: "Empresas com IA aplicada", v: "Crescem 2.4x" },
                { k: "Tempo médio de implantação", v: "60 — 120 dias" },
              ].map((s) => (
                <div
                  key={s.k}
                  className="flex items-center justify-between rounded-xl border border-border bg-background/50 px-5 py-4"
                >
                  <span className="text-[13px] text-muted-foreground">{s.k}</span>
                  <span className="text-mono text-[14px] font-semibold text-foreground">
                    {s.v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "Quanto custa trabalhar com a Aceleriq?",
    a: "Depende do estágio e do escopo. Trabalhamos com programas mensais de engenharia de crescimento. No diagnóstico estratégico definimos juntos o investimento que faz sentido para o seu momento.",
  },
  {
    q: "Em quanto tempo eu vejo resultado?",
    a: "Ajustes táticos aparecem nas primeiras semanas. Resultado estrutural — previsibilidade, CAC, processo comercial — costuma se consolidar entre 60 e 120 dias.",
  },
  {
    q: "Vocês atendem qualquer segmento?",
    a: "Atuamos com SaaS, e-commerce, educação, serviços profissionais, indústria e infoprodutos. Trabalhamos melhor com empresas a partir de R$ 100k/mês.",
  },
  {
    q: "Existe contrato de fidelidade?",
    a: "Trabalhamos com ciclos mínimos para garantir entrega — geralmente 6 meses — porque construir um sistema de crescimento não é trabalho de 30 dias.",
  },
  {
    q: "Qual a diferença real para uma agência?",
    a: "Agência entrega peças. A Aceleriq entrega um sistema integrado de estratégia, vendas, dados e IA conectado ao seu negócio. Resultado é receita, não relatório de impressões.",
  },
  {
    q: "Como funciona o Diagnóstico Gratuito?",
    a: "Você responde 12 perguntas estratégicas (~5 minutos), recebe um score de maturidade, sua classificação de estágio e 3 recomendações personalizadas. Sem custo, sem compromisso.",
  },
  {
    q: "Vocês substituem meu time interno?",
    a: "Não. Atuamos como engenharia parceira do seu time. Estruturamos, treinamos e aceleramos — para que sua operação rode sem depender de heróis.",
  },
  {
    q: "Como começa o trabalho depois do diagnóstico?",
    a: "Depois do diagnóstico, agendamos uma sessão estratégica para entender o seu negócio em profundidade. Se houver fit, montamos uma proposta com escopo, cronograma e investimento.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-28 md:py-36">
      <div className="container-aceleriq">
        <SectionHeader
          eyebrow="[ 11 ] · Perguntas frequentes"
          title="Dúvidas comuns antes de acelerar."
          description="Não achou sua resposta? Fale com a gente no WhatsApp."
        />

        <div className="mx-auto mt-16 max-w-3xl">
          <Accordion type="single" collapsible className="space-y-2.5">
            {FAQS.map((f, i) => (
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
  );
}

// ─────────────────────────────────────────────────────────────
// CTA FINAL
// ─────────────────────────────────────────────────────────────
export function FinalCTA({ onDiagnostico }: { onDiagnostico: () => void }) {
  return (
    <section className="py-28 md:py-36">
      <div className="container-aceleriq">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card/40 p-10 text-center md:p-16"
        >
          <div className="grid-perspective absolute inset-0 opacity-60" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

          <div className="relative">
            <span className="label-eyebrow inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
              [ 12 ] · Próximo passo
            </span>
            <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-medium leading-[1.05] tracking-[-0.03em] md:text-6xl">
              Pronto para acelerar com{" "}
              <span className="text-primary neon-text-glow">método, dados e IA</span>?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
              Comece pelo Diagnóstico de Maturidade. Em 5 minutos você sabe
              exatamente em que estágio está e o que precisa destravar.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                onClick={onDiagnostico}
                size="lg"
                className="group h-12 rounded-md bg-primary px-7 text-[14px] font-semibold text-primary-foreground btn-interactive"
              >
                Fazer Diagnóstico Gratuito
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
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
                  <MessageCircle className="h-4 w-4 text-primary" />
                  WhatsApp · {WHATSAPP_DISPLAY}
                </a>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-muted-foreground">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 hover:text-foreground"
              >
                <Mail className="h-3.5 w-3.5 text-primary" />
                {EMAIL}
              </a>
              <span className="text-border">·</span>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-foreground"
              >
                <Instagram className="h-3.5 w-3.5 text-primary" />
                {INSTAGRAM_HANDLE}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Helper
// ─────────────────────────────────────────────────────────────
function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="label-eyebrow">{eyebrow}</span>
      <h2 className="mt-4 font-display text-3xl font-medium leading-[1.1] tracking-[-0.03em] md:text-[44px]">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
