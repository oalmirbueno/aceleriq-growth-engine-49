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
import almirPhoto from "@/assets/almir-real.png";

import { CountUp } from "@/components/ui/CountUp";

// ─────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────
export function Hero({ onDiagnostico }: { onDiagnostico: () => void }) {
  return (
    <section id="top" className="relative min-h-screen flex items-start lg:items-center justify-center pt-24 pb-12 md:pt-20 md:pb-16 lg:pb-20 overflow-hidden bg-grid-tech">
      {/* Apenas o quadriculado, sem linhas */}
      {/* Background Decorativo - Camadas Técnicas */}
      <div className="hero-background" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />
      
      <div className="container-aceleriq relative z-20">
        <div className="flex flex-col items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="self-start mb-6 md:mb-8"
          >
            <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase py-1 border-b border-primary text-primary">
              <span className="hidden sm:inline">Status do Sistema: Operacional // Escala de Engenharia: Global</span>
              <span className="sm:hidden">Sistema Operacional // Escala Global</span>
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center w-full max-w-full">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "circOut" }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] md:leading-[0.9] flex flex-col"
              >
                <span className="text-white">Estruture seu</span>
                <span className="text-primary text-glow italic">comercial, marketing</span>
                <span className="text-white">e operação</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 md:mt-12 max-w-lg"
              >
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-4 md:pl-6">
                  A Aceleriq organiza seu funil, CRM, WhatsApp, tráfego, conteúdo e automações para sua empresa parar de depender do improviso e começar a crescer com mais previsibilidade.
                </p>
                
                <div className="mt-6 md:mt-7 flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 sm:items-center">
                  <button onClick={onDiagnostico} className="btn-tech self-start">
                    Fazer Diagnóstico de Crescimento
                  </button>
                  <a href="#como-funciona" className="group flex items-center gap-3 font-mono text-xs tracking-widest hover:text-primary transition-colors">
                    <span className="h-px w-8 bg-white/20 group-hover:w-12 group-hover:bg-primary transition-all" />
                    VER COMO FUNCIONA
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Visual — Almir 3D em superfície leve, sem moldura técnica */}
            <div className="w-full max-w-[280px] sm:max-w-sm md:max-w-md mx-auto lg:max-w-lg lg:ml-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "circOut" }}
                className="relative w-full aspect-[4/5]"
              >
                {/* Blob verde suave atrás */}
                <div className="absolute inset-0 -z-10 translate-y-8 rounded-[45%] bg-primary/20 blur-3xl pointer-events-none" />

                {/* Superfície clara arredondada */}
                <div className="relative w-full h-full overflow-hidden rounded-[36px] surface-light">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-transparent to-transparent" />
                  <img
                    src={almir3d}
                    alt="Almir Teles, fundador da Aceleriq — ilustração 3D"
                    width={1024}
                    height={1280}
                    className="absolute inset-x-0 bottom-0 w-full h-[105%] object-cover object-top select-none"
                    loading="eager"
                    decoding="sync"
                    fetchPriority="high"
                    draggable={false}
                  />

                  {/* Chip flutuante */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-background/85 px-3 py-1.5 backdrop-blur-md border border-white/10">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/90">
                      Almir · Fundador
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-2 pointer-events-none">
        <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-white/40">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-primary to-transparent animate-pulse" />
      </div>
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
  { icon: Target, title: "Leads ruins, propostas frias", desc: "Volume sobe, qualidade desce. Ciclo longo, conversão baixa e pouca clareza de prioridade." },
];

export function Pains() {
  return (
    <section className="relative py-12 md:py-16 bg-grid-ambient">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="container-aceleriq">
        <SectionHeader
          eyebrow="[ 02 ] · Sintomas comuns"
          title="Você reconhece algum destes problemas?"
          description="São os gargalos que travam empresas entre R$ 100k e R$ 5M/mês. Todos têm solução com a engenharia certa."
        />

        <div className="mt-8 md:mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {PAINS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group relative bg-background p-6 transition-colors hover:bg-card/40"
            >
              <div className="flex items-start justify-between">
                <p.icon className="h-5 w-5 text-primary" />
                <span className="num-tight text-mono text-[11px] text-muted-foreground whitespace-nowrap">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 font-display text-[17px] font-medium tracking-tight">
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
// OPERAÇÃO PRIMEIRO
// ─────────────────────────────────────────────────────────────
const OPERATIONS_BLOCKS = [
  { icon: MessageCircle, title: "Atendimento que não perde lead", desc: "Velocidade e qualidade no primeiro contato." },
  { icon: Target, title: "CRM com pipeline claro", desc: "Visualização total de onde cada venda está travada." },
  { icon: Bot, title: "Follow-up automatizado", desc: "IA e automação para nunca deixar um contato esfriar." },
  { icon: Layers, title: "Oferta e funil organizados", desc: "Páginas e promessas alinhadas ao que o cliente busca." },
  { icon: Megaphone, title: "Tráfego conectado ao comercial", desc: "Mídia paga que traz quem realmente pode comprar." },
  { icon: LineChart, title: "Dados para tomada de decisão", desc: "Dashboards que mostram o lucro, não só o clique." },
];

export function OperationsFirst() {
  return (
    <section className="relative py-12 md:py-20 bg-grid-ambient overflow-hidden">
      <div className="container-aceleriq relative">
        <div className="max-w-3xl">
          <span className="label-eyebrow">[ 01 ] · A lógica da aceleração</span>
          <h2 className="mt-4 font-display text-3xl font-medium leading-[1.1] tracking-[-0.03em] md:text-5xl">
            Antes de anunciar, arrume a operação.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Anunciar sem processo comercial é acelerar um carro sem freio. Antes de colocar dinheiro em tráfego, a Aceleriq organiza atendimento, CRM, follow-up, oferta, métricas e automações. Depois disso, o marketing passa a escalar uma operação que já tem base para converter.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OPERATIONS_BLOCKS.map((block, i) => (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="hairline rounded-xl bg-card/30 p-6 card-hover group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 transition-all group-hover:scale-110">
                <block.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-medium">{block.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{block.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// COMECE POR AQUI
const STAGES = [
  {
    title: "Meu comercial está desorganizado",
    desc: "Você recebe contatos, mas perde oportunidades por falta de CRM, follow-up, scripts ou rotina comercial.",
    icon: Users2,
    cta: "Diagnosticar meu comercial"
  },
  {
    title: "Quero anunciar, mas minha base está fraca",
    desc: "Antes de investir mais em tráfego, organizamos página, oferta, WhatsApp, CRM e atendimento.",
    icon: Target,
    cta: "Preparar minha operação"
  },
  {
    title: "Preciso de site ou landing page",
    desc: "Criamos uma estrutura digital para explicar sua oferta, captar contatos e conectar campanhas ao WhatsApp ou CRM.",
    icon: Layers,
    cta: "Criar minha estrutura digital"
  },
  {
    title: "Quero automatizar meu atendimento",
    desc: "Conectamos WhatsApp, formulários, CRM, tarefas e IA para reduzir atrasos e esquecimentos.",
    icon: Bot,
    cta: "Automatizar atendimento"
  },
  {
    title: "Quero crescer com mais controle",
    desc: "Integramos comercial, marketing, processos, dados e automação para sua empresa operar com mais clareza.",
    icon: Rocket,
    cta: "Fazer diagnóstico"
  },
];

export function EstagiosCrescimento({ onDiagnostico }: { onDiagnostico: () => void }) {
  return (
    <section className="relative py-12 md:py-20 bg-grid-ambient overflow-hidden">
      <div className="container-aceleriq relative">
        <SectionHeader
          eyebrow="[ 03 ] · Ponto de Partida"
          title="Comece por aqui."
          description="Cada empresa trava em um ponto diferente. Escolha o cenário mais parecido com o seu e solicite um diagnóstico para entender o próximo passo."
        />


        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STAGES.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="hairline rounded-xl bg-card/30 p-6 card-hover group flex flex-col h-full"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 transition-all group-hover:scale-110 mb-5">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-medium">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground mb-6 flex-grow">{s.desc}</p>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onDiagnostico}
                className="self-start text-xs font-bold font-mono tracking-widest p-0 h-auto hover:bg-transparent hover:text-primary transition-colors"
              >
                {s.cta} <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


// ─────────────────────────────────────────────────────────────
// MATURIDADE COMERCIAL
// ─────────────────────────────────────────────────────────────
const MATURITY_LEVELS = [
  {
    level: "Base Local",
    desc: "Empresa que já vende mas depende de indicação ou tráfego sem processo. Atendimento manual e sem CRM.",
  },
  {
    level: "Comercial Organizado",
    desc: "Uso de CRM, scripts definidos e leitura básica de métricas. O processo começa a ser independente do dono.",
  },
  {
    level: "Growth Integrado",
    desc: "Marketing e vendas conectados. Automações de follow-up, dashboards comerciais e acompanhamento de pipeline.",
  },
  {
    level: "Engenharia Completa",
    desc: "Operação escalável com agentes de IA, dados em tempo real e automação avançada em toda a jornada.",
  },
];

export function MaturidadeComercial({ onDiagnostico }: { onDiagnostico: () => void }) {
  return (
    <section className="relative py-12 md:py-20 bg-grid-ambient border-t border-white/10 overflow-hidden">
      <div className="container-aceleriq relative">
        <SectionHeader
          eyebrow="[ 04 ] · Evolução"
          title="Níveis de Maturidade Comercial"
          description="O diagnóstico define o melhor caminho para cada nível. Não existe receita pronta, existe engenharia sob medida."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {MATURITY_LEVELS.map((m, i) => (
            <motion.div
              key={m.level}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative p-6 rounded-xl border border-white/10 bg-white/[0.03] group hover:border-primary/40 transition-colors"
            >
              <div className="text-mono text-[10px] text-primary/60 mb-4 tracking-widest uppercase whitespace-nowrap">Nível <span className="num-tight">{String(i + 1).padStart(2, "0")}</span></div>
              <h3 className="font-display text-xl font-medium mb-3 group-hover:text-primary transition-colors">{m.level}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button onClick={onDiagnostico} className="btn-tech">
            Descobrir meu nível de maturidade
          </Button>
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
    <section className="relative py-12 md:py-16 overflow-hidden bg-grid-ambient">
      {/* Glow ambiente verde achatado e sutil */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[140px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-primary/[0.03] blur-[90px]" />
      <div className="container-aceleriq">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6"
          >
            <span className="label-eyebrow">[ 05 ] · O que é a Aceleriq</span>
            <h2 className="mt-3 font-display text-3xl font-medium leading-[1.08] tracking-[-0.03em] md:text-5xl">
              Não é agência. É a engenharia de crescimento do seu negócio.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
              A Aceleriq nasceu para resolver um problema claro: empresas não quebram só por falta de marketing. Muitas travam porque crescem no improviso, sem processo comercial, sem dados, sem automação e sem clareza.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
              Unimos marketing, comercial, tecnologia e IA para criar motores de crescimento organizados. Levantamos a planta da operação, identificamos gargalos, projetamos a solução e instalamos o que precisa funcionar.
            </p>

            <div className="divider-neon mt-5" />

            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                { k: "Base", v: "Processos comerciais" },
                { k: "Aplicação", v: "Automações aplicadas" },
                { k: "Entrega", v: "Projetos digitais" },
                { k: "Rotina", v: "Operação em evolução" },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="label-eyebrow">{s.k}</dt>
                  <dd className="mt-1.5 text-sm font-medium leading-snug text-foreground md:text-base">
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
                className="hairline rounded-xl bg-card/40 p-5 card-hover"
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
  { letter: "A", title: "Analisar", desc: "Mapeamos comercial, marketing, canais, atendimento e gargalos." },
  { letter: "C", title: "Clarear", desc: "Definimos público, oferta, promessa e prioridades reais." },
  { letter: "E", title: "Estruturar", desc: "Organizamos CRM, pipeline, atendimento, scripts e follow-up." },
  { letter: "L", title: "Lançar", desc: "Colocamos site, campanhas, automações e integrações para rodar." },
  { letter: "E", title: "Executar", desc: "Produzimos conteúdo, mídia, otimizações e acompanhamento." },
  { letter: "R", title: "Revisar", desc: "Acompanhamos métricas, conversão, atendimento e oportunidades." },
  { letter: "A", title: "Acelerar", desc: "Escalamos campanhas e processos com base no que provou tração." },
];

export function Method() {
  return (
    <section
      id="metodo"
      className="relative py-12 md:py-16 overflow-hidden bg-grid-ambient"
    >
      {/* Brilho ambiente verde, achatado e sutil, sem bolha redonda */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[150px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-primary/[0.035] blur-[90px]" />

      <div className="container-aceleriq relative">
        <SectionHeader
          eyebrow="[ 06 ] · Método A.C.E.L.E.R.A"
          title="Sete etapas. Uma linha do tempo."
          description="Do diagnóstico à escala, com método de engenharia, não com palpite criativo."
        />

        <div className="relative mt-10">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent lg:left-[7%] lg:right-[7%] lg:top-[44px] lg:bottom-auto lg:h-px lg:w-auto lg:bg-gradient-to-r" />
          <ol className="relative grid gap-8 pl-14 lg:grid-cols-7 lg:gap-0 lg:pl-0">
            {METHOD.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative lg:flex lg:flex-col lg:items-center lg:px-2"
              >
                <div className="absolute -left-14 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-gradient-to-br from-[oklch(16%_0.02_145)] to-[oklch(10%_0_0)] shadow-[0_0_0_4px_oklch(10%_0_0),0_0_18px_oklch(85%_0.2_145/0.25)] lg:static lg:h-[64px] lg:w-[64px] lg:border-0 lg:bg-transparent lg:shadow-none">
                  <div className="hidden absolute inset-0 rounded-full bg-primary/[0.08] blur-md transition-all duration-500 group-hover:bg-primary/20 group-hover:blur-lg lg:block" />
                  <div className="hidden absolute inset-1 rounded-full border border-white/10 transition-colors group-hover:border-primary/40 lg:block" />
                  <div className="relative flex h-full w-full items-center justify-center rounded-full lg:h-[48px] lg:w-[48px] lg:border lg:border-primary/30 lg:bg-gradient-to-br lg:from-[oklch(16%_0.02_145)] lg:to-[oklch(10%_0_0)] lg:shadow-[0_0_0_5px_oklch(10%_0_0),inset_0_1px_0_oklch(100%_0_0/0.06)]">
                    <span className="font-display text-lg font-bold text-primary text-glow lg:text-xl">
                      {step.letter}
                    </span>
                  </div>
                </div>
                <div className="lg:mt-6 lg:text-center">
                  <div className="flex items-baseline gap-3 lg:block">
                    <span className="num-tight font-mono text-[10px] tracking-[0.3em] text-muted-foreground whitespace-nowrap transition-colors group-hover:text-primary/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-sm font-medium uppercase tracking-[0.14em] text-foreground transition-colors group-hover:text-primary lg:mt-3 lg:text-[13px] lg:tracking-[0.16em]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground lg:mx-auto lg:mt-2.5 lg:max-w-[150px] lg:text-center lg:text-[12px]">
                    {step.desc}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
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
    <section
      id="areas"
      className="relative py-12 md:py-16 overflow-hidden bg-grid-ambient"
    >
      {/* Glow ambiente verde achatado e sutil */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[140px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-primary/[0.03] blur-[90px]" />

      <div className="container-aceleriq relative">
        <SectionHeader
          eyebrow="[ 07 ] · Áreas de atuação"
          title="Tudo que sustenta o crescimento de uma empresa moderna."
          description="As 8 dimensões que separam empresas que crescem por sorte de empresas que crescem por engenharia."
        />

        <div className="mt-8 md:mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AREAS.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
              className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-br from-white/[0.035] to-white/[0.01] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_50px_-20px_oklch(85%_0.2_145/0.32)]"
            >
              {/* Glow no hover */}
              <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/0 blur-2xl transition-all duration-500 group-hover:bg-primary/20" />

              {/* Linha superior animada */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:border-primary group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_oklch(85%_0.2_145/0.5)]">
                  <a.icon className="h-5 w-5" />
                </div>
                <span className="num-tight font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="relative mt-4 font-display text-[15px] font-medium tracking-tight transition-colors group-hover:text-primary">
                {a.title}
              </h3>
              <p className="relative mt-2 text-[13px] leading-relaxed text-muted-foreground">
                {a.desc}
              </p>

              {/* Seta canto inferior */}
              <ArrowUpRight className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
// ─────────────────────────────────────────────────────────────
// PARA QUEM É
// ─────────────────────────────────────────────────────────────
const FIT_YES = [
  "Sua empresa quer organizar comercial, marketing ou operação",
  "Você recebe leads, mas sente que perde oportunidades",
  "Quer parar de depender só do dono para vender",
  "Precisa estruturar CRM, WhatsApp, site, tráfego ou automações",
  "Quer crescer com processo, não com improviso",
  "Está disposto a construir base antes de acelerar",
];
const FIT_NO = [
  "Procura milagre em poucos dias",
  "Quer apenas posts sem estratégia",
  "Não quer organizar atendimento, oferta ou processo",
  "Espera resultado sem participar da estruturação",
  "Quer tráfego sem corrigir a base comercial",
];

export function FitFor() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden bg-grid-ambient">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[130px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-primary/[0.025] blur-[90px]" />

      <div className="container-aceleriq relative">
        <SectionHeader
          eyebrow="[ 08 ] · Fit de Parceria"
          title="É parceria séria. Mas cada empresa começa de um ponto."
        />

        <div className="mt-8 md:mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <h3 className="text-lg font-semibold text-primary mb-6 flex items-center gap-2">
              <Check className="h-5 w-5" /> É para você se:
            </h3>
            <ul className="space-y-4">
              {FIT_YES.map((t, i) => (
                <li key={i} className="flex items-start gap-3 text-[14px] text-foreground/80 leading-relaxed">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <h3 className="text-lg font-semibold text-foreground/80 mb-6 flex items-center gap-2">
              <X className="h-5 w-5" /> Não é para você se:
            </h3>
            <ul className="space-y-4">
              {FIT_NO.map((t, i) => (
                <li key={i} className="flex items-start gap-3 text-[14px] text-muted-foreground leading-relaxed">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-muted-foreground/30 flex-shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Nota: Projetos completos de engenharia de crescimento costumam fazer mais sentido para empresas com operação validada. <br />
          Para negócios em estruturação, a entrada pode começar por site, CRM, automação, diagnóstico ou organização comercial.
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// DIAGNÓSTICO CTA
// ─────────────────────────────────────────────────────────────
export function DiagnosticoCTA({ onDiagnostico }: { onDiagnostico: () => void }) {
  return (
    <section id="diagnostico" className="relative py-12 md:py-16 bg-grid-ambient">
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

          <div className="relative grid gap-6 p-6 md:p-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <span className="label-eyebrow flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
                [ 09 ] · Diagnóstico inteligente
              </span>
              <h2 className="mt-3 font-display text-3xl font-medium leading-[1.08] tracking-[-0.03em] md:text-5xl">
                Descubra a maturidade do seu negócio em crescimento e IA.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
                Em até 5 minutos você responde 12 perguntas estratégicas e
                recebe sua classificação, score e 3 recomendações personalizadas
                para destravar o próximo estágio.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  onClick={onDiagnostico}
                  size="lg"
                  className="group h-12 rounded-md bg-primary px-6 text-[14px] font-semibold text-primary-foreground btn-interactive"
                >
                  Fazer Diagnóstico Gratuito
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
                <h3 className="font-display text-[17px] font-medium leading-snug">
                  Qual o nível de maturidade do seu processo comercial?
                </h3>
                <div className="mt-4 grid grid-cols-5 gap-2">
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
// RESULTADOS — foco em fundamentos
// ─────────────────────────────────────────────────────────────
const FOUNDATIONS = [
  {
    title: "Comercial com mais controle",
    desc: "CRM, pipeline, scripts e follow-up para reduzir perda de oportunidades.",
  },
  {
    title: "Marketing com direção",
    desc: "Conteúdo, páginas e campanhas conectadas ao funil de vendas.",
  },
  {
    title: "Atendimento mais organizado",
    desc: "WhatsApp, formulários e automações com menos improviso.",
  },
  {
    title: "Operação mais clara",
    desc: "Tarefas, responsáveis, métricas e decisões documentadas.",
  },
];

export function Results({ onDiagnostico }: { onDiagnostico?: () => void } = {}) {
  return (
    <section id="resultados" className="relative py-12 md:py-16 bg-grid-ambient">
      <div className="container-aceleriq">
        <SectionHeader
          eyebrow="[ 10 ] · Fundamentos"
          title="Resultados começam pela estrutura."
          description="Antes de prometer números, a Aceleriq organiza os fundamentos que permitem medir, vender e melhorar com consistência."
        />

        <div className="mt-8 md:mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FOUNDATIONS.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="hairline rounded-2xl bg-card/40 p-6 card-hover"
            >
              <span className="num-tight text-mono text-[11px] uppercase tracking-[0.18em] text-primary whitespace-nowrap">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-[17px] font-medium tracking-tight">
                {f.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {onDiagnostico && (
          <div className="mt-10 text-center">
            <button onClick={onDiagnostico} className="btn-tech">
              Fazer Diagnóstico de Crescimento
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// PROVAS REAIS (Substitui Testimonials)
// ─────────────────────────────────────────────────────────────
export function Testimonials() {
  return (
    <section className="relative py-12 md:py-16 bg-grid-ambient">
      <div className="container-aceleriq">
        <SectionHeader
          eyebrow="[ 12 ] · Provas Reais"
          title="Provas reais, não promessas bonitas."
          description="A Aceleriq está construindo sua reputação com projetos reais, presença local e avaliações verificadas no Google."
        />

        <div className="mt-8 md:mt-10 grid gap-3 md:grid-cols-4">
          {[
            { title: "Avaliações no Google", text: "A reputação pública da Aceleriq começa com clientes e parceiros que já avaliaram nossa atuação." },
            { title: "Projetos publicados", text: "Sites, landing pages e estruturas digitais que podem ser acessadas, navegadas e verificadas." },
            { title: "Presença local", text: "Participação em eventos, parcerias e relacionamento com empresários da região." },
            { title: "Operação transparente", text: "Processos, automações e sistemas sendo estruturados com clareza, sem inflar números." },
          ].map((card, i) => (
            <div key={i} className="hairline relative rounded-2xl bg-card/40 p-6 transition-all hover:border-primary/40">
              <h3 className="font-display text-[15px] font-medium text-primary mb-3">{card.title}</h3>
              <p className="text-[13px] leading-relaxed text-muted-foreground">{card.text}</p>
            </div>
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
  ["Dados", "Métricas de vaidade", "Dashboards comerciais e operacionais"],
  ["IA & Automação", "Inexistente ou superficial", "Agentes, fluxos e integrações reais"],
  ["Operação", "Externa ao seu negócio", "Integrada aos seus times e ferramentas"],
  ["Resultado", "Cliques, alcance, impressões", "Pipeline, acompanhamento e clareza de decisão"],
  ["Relação", "Fornecedor", "Engenharia parceira de longo prazo"],
];

export function Compare() {
  return (
    <section className="relative py-12 md:py-16 bg-grid-ambient">
      <div className="container-aceleriq">
        <SectionHeader
          eyebrow="[ 14 ] · Comparativo"
          title="Agência comum vs. Aceleriq"
          description="A diferença entre contratar entregáveis e contratar um sistema de crescimento."
        />

        <div aria-label="Comparativo agência comum vs. Aceleriq" className="mt-8 md:mt-10 hidden md:block overflow-hidden rounded-2xl border border-border">
          <div className="grid grid-cols-[1fr_1.4fr_1.4fr] border-b border-border bg-card/40">
            <div className="px-5 py-4 text-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Dimensão</div>
            <div className="px-5 py-4 text-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Agência comum</div>
            <div className="px-5 py-4 text-mono text-[11px] uppercase tracking-[0.18em] text-primary">Aceleriq</div>
          </div>
          {COMPARE.map(([dim, agency, us], i) => (
            <div key={i} className="grid grid-cols-[1fr_1.4fr_1.4fr] border-b border-border last:border-b-0 text-sm transition-colors hover:bg-card/30">
              <div className="px-5 py-5 font-medium text-foreground/95">{dim}</div>
              <div className="px-5 py-5 text-muted-foreground">{agency}</div>
              <div className="flex items-start gap-2 px-5 py-5 text-foreground">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                {us}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-3 md:hidden">
          {COMPARE.map(([dim, agency, us], i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-border bg-card/40">
              <div className="border-b border-border bg-card/60 px-4 py-2.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">{dim}</span>
              </div>
              <div className="grid grid-cols-1 divide-y divide-border">
                <div className="p-4">
                  <span className="text-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Agência comum</span>
                  <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">{agency}</p>
                </div>
                <div className="p-4 bg-primary/[0.04]">
                  <span className="text-mono text-[10px] uppercase tracking-[0.16em] text-primary">Aceleriq</span>
                  <p className="mt-1.5 flex items-start gap-2 text-[13px] text-foreground leading-relaxed">
                    <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
                    {us}
                  </p>
                </div>
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
    <section className="relative py-12 md:py-16 bg-grid-ambient">
      <div className="container-aceleriq">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card/40 p-6 md:p-8"
        >
          <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-primary/[0.06] blur-3xl" />
          <div className="absolute inset-0 dot-grid opacity-40" />

          <div className="relative grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <span className="label-eyebrow flex items-center gap-2">
                <Rocket className="h-3.5 w-3.5 text-primary" />
                [ 15 ] · Por que estruturar agora?
              </span>
              <h2 className="mt-3 font-display text-3xl font-medium leading-[1.08] tracking-[-0.03em] md:text-5xl">
                O custo de vender no improviso está cada vez maior.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
                Empresas que organizam atendimento, CRM, dados, automação e marketing conseguem entender melhor seus gargalos, responder mais rápido e tomar decisões com menos achismo.
              </p>
            </div>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {[
                "Menos perda de lead",
                "Mais clareza no funil",
                "Atendimento mais rápido",
                "Follow-up com rotina",
                "Marketing conectado",
                "Decisões com dados",
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 rounded-xl border border-border bg-background/50 px-5 py-4">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-[13px] text-foreground font-medium">{benefit}</span>
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
    a: "O investimento varia conforme o estágio da empresa e o escopo do programa. Operamos com programas mensais que partem de faixas compatíveis com empresas a partir de R$ 100k/mês de faturamento. No Diagnóstico Gratuito mapeamos sua maturidade e desenhamos o investimento ideal.",
  },
  {
    q: "Em quanto tempo eu vejo resultado?",
    a: "Resultados táticos aparecem em 2 a 4 semanas. Resultado estrutural e melhoria do processo comercial costumam se consolidar entre 60 e 120 dias. Construímos sistema, não milagre.",
  },
  {
    q: "Vocês atendem qualquer segmento?",
    a: "Atuamos com SaaS, e-commerce, educação, infoprodutos, serviços B2B e indústrias. O critério é a maturidade: produto validado e disposição para profissionalizar a operação.",
  },
  {
    q: "Existe contrato de fidelidade?",
    a: "Trabalhamos com ciclos mínimos de 6 meses para construir um sistema real. Após isso, a relação segue mensal, sem multa, enquanto fizer sentido.",
  },
  {
    q: "Qual a diferença real para uma agência?",
    a: "Agência entrega peças isoladas. A Aceleriq entrega um sistema integrado: CRM, processo comercial, dashboards, IA e mídia conectada ao pipeline. O entregável final é uma operação mais clara e acompanhável.",
  },
  {
    q: "Como funciona o Diagnóstico Gratuito?",
    a: "Você responde 12 perguntas estratégicas em ~5 minutos e recebe seu Score de Maturidade, classificação de estágio e 3 recomendações. Sem custo e sem compromisso.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative py-12 md:py-16 bg-grid-ambient">
      <div className="container-aceleriq">
        <SectionHeader
          eyebrow="[ 16 ] · Perguntas frequentes"
          title="Dúvidas comuns antes de acelerar."
          description="Não achou sua resposta? Fale com a gente no WhatsApp."
        />

        <div className="mx-auto mt-8 md:mt-10 max-w-3xl">
          <Accordion type="single" collapsible className="space-y-2.5">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="overflow-hidden rounded-xl border border-border bg-card/40 px-5 transition-colors data-[state=open]:border-primary/30">
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
    <section className="relative py-12 md:py-16 bg-grid-ambient">
      <div className="container-aceleriq">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card/40 p-7 text-center md:p-10"
        >
          <div className="grid-perspective absolute inset-0 opacity-60" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

          <div className="relative">
            <span className="label-eyebrow inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
              [ 17 ] · Próximo passo
            </span>
            <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-medium leading-[1.05] tracking-[-0.03em] md:text-6xl">
              Pare de improvisar. Comece a <span className="text-primary neon-text-glow">escalar com engenharia</span>.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
              Faça o Diagnóstico Gratuito em 5 minutos e descubra exatamente em que estágio sua operação está e os próximos passos para destravar receita.
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button onClick={onDiagnostico} size="lg" className="group h-12 rounded-md bg-primary px-7 text-[14px] font-semibold text-primary-foreground btn-interactive">
                Fazer Diagnóstico Gratuito
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-md border-border bg-transparent px-7 text-[14px] font-medium hover:bg-card">
                <a href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4 text-primary" />
                  Falar com especialista
                </a>
              </Button>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-muted-foreground">
              <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 hover:text-foreground">
                <Mail className="h-3.5 w-3.5 text-primary" />
                {EMAIL}
              </a>
              <span className="text-border">·</span>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-foreground">
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
export function SectionHeader({
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
      <h2 className="mt-3 font-display text-2xl sm:text-3xl font-medium leading-[1.1] tracking-[-0.03em] md:text-[44px]">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-3 max-w-xl text-[14px] sm:text-[15px] leading-relaxed text-muted-foreground md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
