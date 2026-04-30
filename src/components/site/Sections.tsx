import { motion } from "framer-motion";
import {
  ArrowRight,
  MessageCircle,
  Sparkles,
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
  CheckCircle2,
  XCircle,
  Quote,
  Star,
  ShieldCheck,
  Zap,
  Brain,
  Rocket,
  ChevronDown,
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
    <section id="top" className="relative overflow-hidden pt-28 md:pt-36">
      <div className="absolute inset-0 -z-10 bg-gradient-hero" />
      <div className="absolute inset-0 -z-10 grid-bg opacity-60" />

      <div className="container-aceleriq relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
            </span>
            Engenharia de Crescimento · Estratégia · Dados · IA
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Engenharia de crescimento para empresas que querem{" "}
            <span className="text-gradient">escalar com método</span>, dados e IA.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            A Aceleriq não é uma agência. Somos um time de engenharia que une
            estratégia, marketing, processos comerciais, CRM, automação e
            inteligência artificial para destravar o próximo estágio do seu negócio.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              onClick={onDiagnostico}
              size="lg"
              className="h-14 rounded-full bg-gradient-cta px-7 text-base font-semibold text-lime-foreground shadow-glow-lime hover:opacity-95"
            >
              Fazer Diagnóstico Gratuito
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 rounded-full border-border bg-surface/60 px-7 text-base font-semibold backdrop-blur hover:bg-surface"
            >
              <a
                href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="h-4 w-4 text-lime" />
                Falar no WhatsApp
              </a>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Sem compromisso
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-violet" />
              Resultado em até 30 minutos
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Brain className="h-4 w-4 text-lime" />
              Baseado em dados e IA
            </span>
          </div>
        </motion.div>

        {/* Visual dashboard mock */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-card p-2 shadow-elegant">
            <div className="rounded-xl border border-border/40 bg-background/60 p-4 md:p-6">
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  {
                    icon: TrendingUp,
                    label: "Crescimento previsível",
                    value: "+184%",
                    sub: "ROI médio em 90 dias",
                    color: "text-lime",
                  },
                  {
                    icon: Bot,
                    label: "IA em operação",
                    value: "24/7",
                    sub: "Automações ativas",
                    color: "text-primary",
                  },
                  {
                    icon: Target,
                    label: "Leads qualificados",
                    value: "3.2x",
                    sub: "Mais conversão comercial",
                    color: "text-violet",
                  },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="rounded-lg border border-border/50 bg-surface/60 p-4"
                  >
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <m.icon className={`h-4 w-4 ${m.color}`} />
                      {m.label}
                    </div>
                    <div className="mt-2 font-display text-2xl font-bold md:text-3xl">
                      {m.value}
                    </div>
                    <div className="text-xs text-muted-foreground">{m.sub}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-lg border border-border/50 bg-surface/40 p-4">
                <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    Maturidade em Crescimento e IA
                  </span>
                  <span>Diagnóstico Aceleriq</span>
                </div>
                <div className="flex h-24 items-end gap-1.5">
                  {[
                    35, 42, 48, 40, 55, 62, 58, 68, 74, 70, 82, 88, 84, 92, 95,
                    90,
                  ].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-gradient-to-t from-primary/60 to-violet/80"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute -inset-x-10 -bottom-10 h-40 bg-gradient-to-t from-background to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// DORES
// ─────────────────────────────────────────────────────────────
const PAINS = [
  {
    icon: Megaphone,
    title: "Marketing sem ROI",
    desc: "Você investe em tráfego, mas não consegue medir o que realmente gera receita.",
  },
  {
    icon: Users2,
    title: "Time comercial sem método",
    desc: "Vendedores apagando incêndio, sem playbook, sem cadência, dependendo de talento.",
  },
  {
    icon: Workflow,
    title: "Ferramentas desconectadas",
    desc: "CRM, planilhas, WhatsApp, e-mail e automações que não conversam entre si.",
  },
  {
    icon: Database,
    title: "Decisão sem dados",
    desc: "Você sente o pulso do negócio, mas não tem dashboards confiáveis para guiar escolhas.",
  },
  {
    icon: AlertTriangle,
    title: "Tudo depende do dono",
    desc: "Sem o sócio na operação, a empresa para. Não existe processo, existe heroísmo.",
  },
  {
    icon: Target,
    title: "Leads ruins, propostas frias",
    desc: "Volume de leads sobe, mas qualidade desce. CAC alto, ciclo longo, conversão baixa.",
  },
];

export function Pains() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-aceleriq">
        <SectionHeader
          eyebrow="Sintomas comuns"
          title="Você reconhece algum destes problemas?"
          description="Esses são os gargalos que travam empresas entre R$ 100k e R$ 5M/mês. A boa notícia: todos têm solução com a engenharia certa."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PAINS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-card p-6 transition-all hover:border-primary/40 hover:shadow-glow-primary"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-2 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{p.title}</h3>
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
  {
    icon: Brain,
    title: "Estratégia + Dados",
    desc: "Toda decisão sustentada em diagnóstico, métricas e modelagem.",
  },
  {
    icon: Workflow,
    title: "Processo Comercial",
    desc: "Playbook, cadência, CRM e automação para o time vender com método.",
  },
  {
    icon: Bot,
    title: "IA & Automação",
    desc: "Agentes, fluxos e integrações que entregam tempo e escala ao time.",
  },
  {
    icon: Layers,
    title: "Estrutura Operacional",
    desc: "Sua empresa para de depender de pessoas e passa a depender de sistemas.",
  },
];

export function About() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-aceleriq">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              O que é a Aceleriq
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-5xl">
              Não é uma agência. É a{" "}
              <span className="text-gradient">engenharia de crescimento</span>{" "}
              do seu negócio.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              Agências entregam peças soltas: criativo, post, anúncio. A
              Aceleriq entrega <span className="text-foreground">um sistema</span>{" "}
              de crescimento — diagnóstico, estratégia, execução, dados e IA
              integrados ao seu negócio para gerar resultado previsível.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              Trabalhamos como uma engenharia: levantamos a planta da sua
              operação, identificamos os gargalos, projetamos a solução e
              instalamos o que precisa funcionar.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-border/60 bg-gradient-card p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow-primary">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.desc}</p>
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
    <section id="metodo" className="relative py-24 md:py-32">
      <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
      <div className="container-aceleriq">
        <SectionHeader
          eyebrow="Método A.C.E.L.E.R.A"
          title="O sistema que transforma intenção em crescimento"
          description="Sete etapas que conduzem seu negócio do diagnóstico à escala — com método de engenharia, não com palpite criativo."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {METHOD.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-card p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow-primary"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-5xl font-bold text-gradient">
                  {step.letter}
                </span>
                <span className="rounded-full border border-border bg-surface/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Etapa {i + 1}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">
                {step.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
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
  { icon: Megaphone, title: "Tráfego pago", desc: "Meta, Google e LinkedIn com leitura por receita, não por clique." },
  { icon: Settings2, title: "CRM & funil de vendas", desc: "Estruturação do CRM, automações e cadência comercial." },
  { icon: Bot, title: "IA & automação", desc: "Agentes de IA, fluxos n8n/Make e integrações sob medida." },
  { icon: Workflow, title: "Processos comerciais", desc: "Playbook, scripts, qualificação e ritual de vendas." },
  { icon: LineChart, title: "Dados & dashboards", desc: "Métricas, BI e visão executiva semanal do negócio." },
  { icon: Building2, title: "Estruturação operacional", desc: "Pessoas, papéis, rituais e SOPs para escalar com saúde." },
];

export function Areas() {
  return (
    <section id="areas" className="py-24 md:py-32">
      <div className="container-aceleriq">
        <SectionHeader
          eyebrow="Áreas de atuação"
          title="Tudo que sustenta o crescimento de uma empresa moderna"
          description="A Aceleriq atua nas 8 dimensões que separam empresas que crescem por sorte de empresas que crescem por engenharia."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AREAS.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-card p-6 transition-all hover:border-violet/40"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-2 text-violet transition-all group-hover:scale-110 group-hover:bg-gradient-primary group-hover:text-primary-foreground">
                  <a.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-base font-semibold">
                  {a.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{a.desc}</p>
              </div>
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
  "Tem produto/serviço validado e quer escalar",
  "Quer profissionalizar marketing, vendas e operação",
  "Acredita em método, dados e IA, não em achismo",
  "Está pronto para construir um sistema, não comprar mágica",
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
    <section className="py-24 md:py-32">
      <div className="container-aceleriq">
        <SectionHeader
          eyebrow="Para quem é"
          title="A Aceleriq é parceria séria — vale a pena saber se serve para você."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-lime/30 bg-gradient-card p-7 shadow-elegant">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-lime" />
              <h3 className="font-display text-lg font-semibold">
                É para você se…
              </h3>
            </div>
            <ul className="mt-5 space-y-3">
              {FIT_YES.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-lime" />
                  <span className="text-foreground/90">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border/60 bg-gradient-card p-7">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-destructive" />
              <h3 className="font-display text-lg font-semibold">
                Não é para você se…
              </h3>
            </div>
            <ul className="mt-5 space-y-3">
              {FIT_NO.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm">
                  <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
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
// DIAGNÓSTICO CTA (placeholder de seção do Typeform)
// ─────────────────────────────────────────────────────────────
export function DiagnosticoCTA({ onDiagnostico }: { onDiagnostico: () => void }) {
  return (
    <section id="diagnostico" className="relative py-24 md:py-32">
      <div className="container-aceleriq">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-card p-8 shadow-elegant md:p-14"
        >
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-violet/30 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Diagnóstico inteligente
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-5xl">
                Descubra a{" "}
                <span className="text-gradient">maturidade</span> do seu
                negócio em crescimento e IA.
              </h2>
              <p className="mt-5 text-base text-muted-foreground md:text-lg">
                Em até 5 minutos você responde 12 perguntas estratégicas e
                recebe sua classificação, score e 3 recomendações personalizadas
                para destravar o próximo estágio.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  onClick={onDiagnostico}
                  size="lg"
                  className="h-14 rounded-full bg-gradient-cta px-7 text-base font-semibold text-lime-foreground shadow-glow-lime hover:opacity-95"
                >
                  Começar Diagnóstico
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-14 rounded-full border-border bg-surface/60 px-7 text-base font-semibold backdrop-blur"
                >
                  <a
                    href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="h-4 w-4 text-lime" />
                    Falar com especialista
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl border border-border/60 bg-background/60 p-6 backdrop-blur">
                <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Pergunta 3 de 12</span>
                  <span>25%</span>
                </div>
                <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-surface">
                  <div className="h-full w-1/4 rounded-full bg-gradient-primary" />
                </div>
                <h4 className="font-display text-lg font-semibold">
                  Qual o nível de maturidade do seu processo comercial?
                </h4>
                <div className="mt-5 grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      className="aspect-square rounded-xl border border-border bg-surface text-base font-semibold transition-all hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
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
// RESULTADOS / PROVA SOCIAL
// ─────────────────────────────────────────────────────────────
const METRICS = [
  { value: "+184%", label: "ROI médio em 90 dias" },
  { value: "3.2x", label: "Aumento de leads qualificados" },
  { value: "-42%", label: "Redução de CAC" },
  { value: "97%", label: "Clientes que renovam o programa" },
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
    result: "ROAS de 1.8 para 4.6 com automação e IA",
  },
  {
    segment: "Educação",
    challenge: "Funil quebrado e dependência do dono",
    result: "Operação 100% sistemizada e CAC -38%",
  },
];

export function Results() {
  return (
    <section id="resultados" className="py-24 md:py-32">
      <div className="container-aceleriq">
        <SectionHeader
          eyebrow="Resultados"
          title="Quando a engenharia entra, o resultado aparece."
          description="Indicadores médios e mini-cases reais de empresas que estruturaram seu sistema de crescimento com a Aceleriq."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl border border-border/60 bg-gradient-card p-6 text-center"
            >
              <div className="font-display text-4xl font-bold text-gradient md:text-5xl">
                {m.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{m.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {CASES.map((c, i) => (
            <motion.div
              key={c.segment}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-border/60 bg-gradient-card p-6"
            >
              <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
                {c.segment}
              </span>
              <p className="mt-4 text-sm text-muted-foreground">
                <span className="block text-xs uppercase tracking-wider text-foreground/60">
                  Desafio
                </span>
                {c.challenge}
              </p>
              <p className="mt-3 text-base font-semibold text-foreground">
                <span className="block text-xs uppercase tracking-wider text-lime">
                  Resultado
                </span>
                {c.result}
              </p>
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
      "A Aceleriq foi a primeira empresa que olhou para o nosso negócio como engenharia. Em 90 dias tínhamos previsibilidade que nunca tínhamos visto.",
  },
  {
    name: "Camila R.",
    role: "Sócia · Educação",
    quote:
      "Saímos de uma operação caótica para um sistema que roda sem mim na ponta. CAC caiu 38% e meu time finalmente tem método.",
  },
  {
    name: "Diego S.",
    role: "Diretor · E-commerce",
    quote:
      "Não é agência, é parceria de crescimento. ROAS, CRM, IA — tudo integrado. Nunca mais consegui voltar para o modelo anterior.",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-aceleriq">
        <SectionHeader
          eyebrow="Depoimentos"
          title="O que dizem os fundadores que aceleraram conosco"
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative rounded-2xl border border-border/60 bg-gradient-card p-7"
            >
              <Quote className="h-7 w-7 text-primary/50" />
              <blockquote className="mt-4 text-sm leading-relaxed text-foreground/90">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-sm font-bold text-primary-foreground">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
                <div className="ml-auto flex gap-0.5 text-lime">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="h-3.5 w-3.5 fill-current" />
                  ))}
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
const COMPARE = [
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
    <section className="py-24 md:py-32">
      <div className="container-aceleriq">
        <SectionHeader
          eyebrow="Comparativo"
          title="Agência comum vs. Aceleriq"
          description="A diferença entre contratar entregáveis e contratar um sistema de crescimento."
        />

        <div className="mt-14 overflow-hidden rounded-2xl border border-border/60 bg-gradient-card">
          <div className="grid grid-cols-3 border-b border-border/60 bg-surface/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <div className="px-5 py-4">Dimensão</div>
            <div className="px-5 py-4">Agência comum</div>
            <div className="px-5 py-4 text-primary">Aceleriq</div>
          </div>
          {COMPARE.map(([dim, agency, us], i) => (
            <div
              key={i}
              className="grid grid-cols-3 border-b border-border/40 last:border-b-0 text-sm"
            >
              <div className="px-5 py-4 font-semibold text-foreground/90">{dim}</div>
              <div className="px-5 py-4 text-muted-foreground">{agency}</div>
              <div className="flex items-start gap-2 px-5 py-4 text-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-lime" />
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
    <section className="py-24 md:py-32">
      <div className="container-aceleriq">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-violet/30 bg-gradient-card p-8 md:p-14"
        >
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet/30 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-violet/40 bg-violet/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet">
                <Rocket className="h-3.5 w-3.5" />
                Janela de mercado
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-5xl">
                Por que agora? Porque a IA mudou o jogo — e a janela é{" "}
                <span className="text-gradient">curta</span>.
              </h2>
              <p className="mt-5 text-base text-muted-foreground md:text-lg">
                As empresas que estruturarem dados, processo e IA nos próximos
                12-18 meses vão competir num patamar diferente. As que ficarem
                no modelo antigo de marketing vão ver margem, CAC e
                produtividade trabalharem contra elas.
              </p>
            </div>
            <div className="grid gap-3">
              {[
                { k: "Custo de aquisição subindo", v: "+27% ano após ano" },
                { k: "Empresas com IA aplicada", v: "Crescem 2,4x mais" },
                { k: "Tempo médio para estruturar sistema", v: "60 a 120 dias" },
              ].map((s) => (
                <div
                  key={s.k}
                  className="flex items-center justify-between rounded-xl border border-border/60 bg-background/40 p-4"
                >
                  <span className="text-sm text-muted-foreground">{s.k}</span>
                  <span className="font-display text-base font-semibold text-foreground">
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
    a: "Atuamos com SaaS, e-commerce, educação, serviços profissionais, indústria e infoprodutos. Trabalhamos melhor com empresas que faturam a partir de R$ 100k/mês.",
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
    a: "Você responde 12 perguntas estratégicas (cerca de 5 minutos), recebe um score de maturidade, sua classificação de estágio e 3 recomendações personalizadas. Sem custo, sem compromisso.",
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
    <section id="faq" className="py-24 md:py-32">
      <div className="container-aceleriq">
        <SectionHeader
          eyebrow="Perguntas frequentes"
          title="Dúvidas comuns antes de acelerar"
          description="Não achou sua resposta? Fale com a gente no WhatsApp."
        />

        <div className="mx-auto mt-14 max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="overflow-hidden rounded-2xl border border-border/60 bg-gradient-card px-5 data-[state=open]:border-primary/40"
              >
                <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline">
                  <span className="flex items-center gap-3">
                    <HelpCircle className="h-4 w-4 flex-shrink-0 text-primary" />
                    {f.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
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
    <section className="py-24 md:py-32">
      <div className="container-aceleriq">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-primary p-10 text-center shadow-elegant md:p-16"
        >
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative">
            <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight text-primary-foreground md:text-5xl">
              Pronto para acelerar com método, dados e IA?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-primary-foreground/80 md:text-lg">
              Comece pelo Diagnóstico de Maturidade. Em 5 minutos você sabe
              exatamente em que estágio está e o que precisa destravar.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                onClick={onDiagnostico}
                size="lg"
                className="h-14 rounded-full bg-gradient-cta px-8 text-base font-semibold text-lime-foreground shadow-glow-lime hover:opacity-95"
              >
                Fazer Diagnóstico Gratuito
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 rounded-full border-primary-foreground/30 bg-background/10 px-8 text-base font-semibold text-primary-foreground backdrop-blur hover:bg-background/20"
              >
                <a
                  href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp {WHATSAPP_DISPLAY}
                </a>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-primary-foreground/80">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 hover:text-primary-foreground"
              >
                <Mail className="h-4 w-4" />
                {EMAIL}
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary-foreground"
              >
                <Instagram className="h-4 w-4" />
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
    <div className="mx-auto max-w-3xl text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        {eyebrow}
      </span>
      <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

// keep unused import warnings silent (icons referenced via const arrays)
void ChevronDown;
