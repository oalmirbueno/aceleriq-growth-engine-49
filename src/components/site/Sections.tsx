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
import aiEngineerImg from "@/assets/ai-engineer.jpg";
import { Editable } from "@/components/editor/LayoutEditor";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/site/Reveal";

// ─────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────
export function Hero({ onDiagnostico }: { onDiagnostico: () => void }) {
  return (
    <section id="top" className="relative lg:min-h-screen flex items-center justify-center pt-24 pb-12 md:pt-28 md:pb-16 lg:pb-20 overflow-hidden bg-grid-tech">
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
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase py-1 border-b border-primary text-primary">
              Status do Sistema: Operacional // Escala de Engenharia: Global
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center w-full">
            <div>
              <Editable id="hero-headline">
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "circOut" }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] flex flex-col"
                >
                  <span className="text-stroke">Protocolo</span>
                  <span className="text-primary text-glow italic">de Engenharia</span>
                  <span className="text-white">de Crescimento</span>
                </motion.h1>
              </Editable>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 md:mt-12 max-w-lg"
              >
                <p className="text-lg text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-6">
                  Abandonamos o "marketing de esperança". Instalamos sistemas de engenharia de dados e IA que garantem escala previsível e ROI matemático.
                </p>
                
                <div className="mt-7 flex flex-wrap gap-6">
                  <button onClick={onDiagnostico} className="btn-tech">
                    Iniciar Diagnóstico
                  </button>
                  <a href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)} className="group flex items-center gap-3 font-mono text-xs tracking-widest hover:text-primary transition-colors">
                    <span className="h-px w-8 bg-white/20 group-hover:w-12 group-hover:bg-primary transition-all" />
                    FALAR COM ENGENHEIRO
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Visual Industrial - Foto AI Engineer + cards flutuantes ao redor */}
            <Editable id="hero-photo" className="w-full max-w-md mx-auto lg:max-w-lg lg:ml-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "circOut" }}
                className="relative w-full aspect-[4/5]"
              >
                {/* Glow ambiente */}
                <div className="absolute -inset-8 bg-primary/10 blur-3xl rounded-full pointer-events-none" />

                {/* Moldura técnica */}
                <div className="absolute -inset-2 border border-primary/20 pointer-events-none" />
                <div className="absolute -top-3 -left-3 w-8 h-8 border-l-2 border-t-2 border-primary" />
                <div className="absolute -bottom-3 -right-3 w-8 h-8 border-r-2 border-b-2 border-primary" />

                {/* Foto */}
                <div className="relative w-full h-full overflow-hidden border border-white/10 shadow-2xl shadow-primary/10">
                  <img
                    src={aiEngineerImg}
                    alt="AI Engineer Aceleriq operando protocolo neural"
                    className="w-full h-full object-cover select-none"
                    loading="eager"
                    decoding="sync"
                    draggable={false}
                    style={{
                      imageRendering: "auto",
                      filter: "contrast(1.08) saturate(1.15) brightness(1.02)",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "translateZ(0)",
                    }}
                  />
                  {/* Vinheta sutil sem matar a nitidez */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/25 via-transparent to-transparent" />
                  {/* Linha verde no canto inferior */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

                  {/* Identificador discreto sobre a foto */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <Brain className="h-4 w-4 text-primary" />
                    <span className="text-xs font-bold text-white">Engenheiro Líder</span>
                  </div>
                </div>

                {/* ───────── Cards flutuantes FORA da foto ───────── */}

                {/* TOP-LEFT: Operador Ao Vivo */}
                <div className="absolute -top-4 -left-4 md:-top-6 md:-left-10 float-a z-20">
                  <div className="bg-black/85 backdrop-blur-md border border-primary/40 px-3 py-2 shadow-[0_0_30px_rgba(20,255,0,0.2)] flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase">Operador Ao Vivo</span>
                  </div>
                </div>

                {/* TOP-RIGHT: NÓ_04 */}
                <div className="absolute -top-3 -right-3 md:-top-5 md:-right-8 float-b z-20">
                  <div className="bg-black/85 backdrop-blur-md border border-white/15 px-3 py-2">
                    <span className="font-mono text-[10px] text-white/80 tracking-tight">NÓ_04 // SEGURO</span>
                  </div>
                </div>

                {/* RIGHT-MIDDLE: ROI Mensal grande */}
                <div className="absolute top-1/3 -right-6 md:-right-14 float-c z-20">
                  <div className="bg-black/90 backdrop-blur-md border border-primary/40 p-4 shadow-[0_0_40px_rgba(20,255,0,0.25)]">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl md:text-4xl font-mono font-bold text-primary leading-none">+</span>
                      <CountUp to={245} duration={1800} className="text-3xl md:text-4xl font-mono font-bold text-primary leading-none" />
                      <span className="text-2xl md:text-3xl font-mono font-bold text-primary leading-none">%</span>
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-white/60 mt-1 block">ROI Mensal</span>
                  </div>
                </div>

                {/* BOTTOM-LEFT: Precisão */}
                <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-12 float-b z-20">
                  <div className="bg-black/85 backdrop-blur-md border border-primary/30 px-3 py-2.5 min-w-[110px]">
                    <span className="text-[8px] uppercase tracking-widest text-white/50 font-mono block">Precisão</span>
                    <CountUp to={98.2} decimals={1} duration={1600} suffix="%" className="text-lg font-mono text-primary font-bold" />
                  </div>
                </div>

                {/* BOTTOM-CENTER: Automação */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 float-a z-20 hidden md:block">
                  <div className="bg-black/85 backdrop-blur-md border border-white/15 px-3 py-2.5 min-w-[110px]">
                    <span className="text-[8px] uppercase tracking-widest text-white/50 font-mono block">Automação</span>
                    <CountUp to={88} duration={1500} suffix="%" className="text-lg font-mono text-primary font-bold" />
                  </div>
                </div>

                {/* BOTTOM-RIGHT: Leads */}
                <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-10 float-c z-20">
                  <div className="bg-black/85 backdrop-blur-md border border-primary/30 px-3 py-2.5 min-w-[110px]">
                    <span className="text-[8px] uppercase tracking-widest text-white/50 font-mono block">Leads</span>
                    <CountUp to={3.2} decimals={1} duration={1400} suffix="x" className="text-lg font-mono text-primary font-bold" />
                  </div>
                </div>
              </motion.div>
            </Editable>
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
  { icon: Target, title: "Leads ruins, propostas frias", desc: "Volume sobe, qualidade desce. CAC alto, ciclo longo, conversão baixa." },
];

export function Pains() {
  return (
    <section className="relative surface-emerald noise-overlay py-12 md:py-20 bg-grid-ambient overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="orb-glow orb-emerald top-[-120px] left-[-100px] h-[380px] w-[380px]" />
      <div className="orb-glow orb-blue bottom-[-120px] right-[-80px] h-[300px] w-[300px] opacity-20" />
      
      <div className="container-aceleriq relative z-10">
        <SectionHeader
          eyebrow="Sintomas comuns"
          title="Você reconhece algum destes problemas?"
          description="São os gargalos que travam empresas entre R$ 100k e R$ 5M/mês. Todos têm solução com a engenharia certa."
        />

        <div className="mt-5 md:mt-6 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
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
                <span className="text-mono text-[11px] text-muted-foreground">
                  0{i + 1}
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
    <section className="relative surface-midnight noise-overlay py-12 md:py-20 overflow-hidden bg-grid-ambient">
      <div className="orb-glow orb-blue top-[-100px] right-[-100px] h-[420px] w-[420px]" />
      <div className="orb-glow orb-emerald bottom-[-80px] left-[-60px] h-[280px] w-[280px] opacity-25" />
      <div className="container-aceleriq relative z-10">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6"
          >
            <span className="label-eyebrow">[ 02 ] · O que é a Aceleriq</span>
            <h2 className="mt-3 font-display text-3xl font-medium leading-[1.08] tracking-[-0.03em] md:text-5xl">
              Não é agência. É a engenharia de crescimento do seu negócio.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
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

            <div className="divider-neon mt-5" />

            <dl className="mt-5 grid grid-cols-3 gap-6">
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
    <section
      id="metodo"
      className="relative surface-graphite noise-overlay py-12 md:py-20 overflow-hidden bg-grid-ambient"
    >
      {/* Brilho ambiente verde, achatado e sutil — sem bolha redonda */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[150px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-primary/[0.035] blur-[90px]" />

      <div className="container-aceleriq relative">
        {/* Cabeçalho descendo de cima — efeito "saindo de baixo da seção anterior" */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeader
            eyebrow="[ 03 ] · Método A.C.E.L.E.R.A"
            title="Sete etapas. Uma linha do tempo."
            description="Do diagnóstico à escala, com método de engenharia — não com palpite criativo."
          />
        </motion.div>

        {/* ───────── Timeline horizontal (desktop) ───────── */}
        <div className="mt-6 hidden lg:block">
          <div className="relative">
            {/* Trilho base — gradiente suave */}
            <div className="absolute left-[7%] right-[7%] top-[44px] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            {/* Trilho ativo — animado, com brilho elegante */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
              className="absolute left-[7%] right-[7%] top-[43px] h-[2px] bg-gradient-to-r from-primary/0 via-primary to-primary/0"
            >
              <div className="absolute inset-0 blur-[6px] bg-gradient-to-r from-primary/0 via-primary/80 to-primary/0" />
            </motion.div>

            {/* Pulso percorrendo o trilho */}
            <motion.div
              initial={{ left: "7%", opacity: 0 }}
              whileInView={{ left: "93%", opacity: [0, 1, 1, 0] }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 2.2, ease: "easeInOut", times: [0, 0.1, 0.9, 1] }}
              className="absolute top-[40px] h-[8px] w-[8px] rounded-full bg-primary shadow-[0_0_20px_oklch(85%_0.2_145/0.9)]"
            />

            <div className="relative grid grid-cols-7">
              {METHOD.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.7,
                    delay: 0.3 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex flex-col items-center px-2"
                >
                  {/* Número discreto */}
                  <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground transition-colors group-hover:text-primary/80">
                    0{i + 1}
                  </span>

                  {/* Nó da timeline — design refinado em camadas */}
                  <div className="relative mt-3 flex h-[64px] w-[64px] items-center justify-center">
                    {/* Halo externo pulsante */}
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5 + i * 0.18 }}
                      className="absolute inset-0 rounded-full bg-primary/[0.08] blur-md transition-all duration-500 group-hover:bg-primary/20 group-hover:blur-lg"
                    />

                    {/* Anel externo */}
                    <div className="absolute inset-1 rounded-full border border-white/10 transition-colors group-hover:border-primary/40" />

                    {/* Disco principal — gradiente sofisticado */}
                    <div className="relative flex h-[48px] w-[48px] items-center justify-center rounded-full border border-primary/30 bg-gradient-to-br from-[oklch(16%_0.02_145)] to-[oklch(10%_0_0)] shadow-[0_0_0_5px_oklch(10%_0_0),inset_0_1px_0_oklch(100%_0_0/0.06)] transition-all duration-500 group-hover:border-primary/70 group-hover:shadow-[0_0_0_5px_oklch(10%_0_0),0_0_28px_oklch(85%_0.2_145/0.45),inset_0_1px_0_oklch(100%_0_0/0.1)]">
                      <span className="font-display text-xl font-bold text-primary text-glow">
                        {step.letter}
                      </span>
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <h3 className="mt-6 text-center font-display text-[13px] font-medium uppercase tracking-[0.16em] text-foreground transition-colors group-hover:text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 max-w-[150px] text-center text-[12px] leading-relaxed text-muted-foreground">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ───────── Timeline vertical (mobile/tablet) ───────── */}
        <div className="mt-6 lg:hidden">
          <div className="relative pl-8">
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" />
            <ol className="space-y-5">
              {METHOD.map((step, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <div className="absolute -left-8 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-gradient-to-br from-[oklch(16%_0.02_145)] to-[oklch(10%_0_0)] shadow-[0_0_0_4px_oklch(10%_0_0),0_0_18px_oklch(85%_0.2_145/0.25)]">
                    <span className="font-display text-lg font-bold text-primary text-glow">
                      {step.letter}
                    </span>
                  </div>
                  <div className="ml-6">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
                        0{i + 1}
                      </span>
                      <h3 className="font-display text-sm font-medium uppercase tracking-[0.14em]">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                      {step.desc}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
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
      className="relative surface-emerald noise-overlay py-12 md:py-20 overflow-hidden bg-grid-ambient"
    >
      {/* Glow ambiente verde achatado e sutil */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[140px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-primary/[0.03] blur-[90px]" />
      

      <div className="container-aceleriq relative z-10">
        <SectionHeader
          eyebrow="[ 04 ] · Áreas de atuação"
          title="Tudo que sustenta o crescimento de uma empresa moderna."
          description="As 8 dimensões que separam empresas que crescem por sorte de empresas que crescem por engenharia."
        />

        <div className="mt-5 md:mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  0{i + 1}
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
    <section className="relative surface-midnight noise-overlay py-12 md:py-20 overflow-hidden bg-grid-ambient">
      {/* Glow ambiente verde mais presente */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[280px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-primary/[0.06] blur-[100px]" />
      <div className="pointer-events-none absolute top-0 left-1/2 h-[1px] w-[60%] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container-aceleriq relative z-10">
        <SectionHeader
          eyebrow="· 05 · Para quem é"
          title="É parceria séria. Vale a pena saber se serve para você."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mt-5 md:mt-6 overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.04] via-card/40 to-card/20 shadow-[0_0_60px_-15px_oklch(85%_0.2_145/0.25),0_30px_80px_-30px_oklch(0%_0_0/0.6)]"
        >
          {/* Cabeçalho da tabela */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative flex items-center gap-3 border-b border-primary/20 bg-primary/[0.12] p-5 md:border-b-0 md:border-r">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-background shadow-[0_0_25px_oklch(85%_0.2_145/0.8)]">
                <Check className="h-4 w-4" strokeWidth={3} />
              </span>
              <div>
                <h3 className="font-display text-base font-semibold uppercase tracking-[0.14em] text-primary">
                  É para você
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/70">
                  Match — vamos crescer juntos
                </p>
              </div>
            </div>
            <div className="relative flex items-center gap-3 bg-white/[0.03] p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-muted-foreground">
                <X className="h-4 w-4" strokeWidth={3} />
              </span>
              <div>
                <h3 className="font-display text-base font-semibold uppercase tracking-[0.14em] text-foreground/85">
                  Não é para você
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Melhor procurar outro parceiro
                </p>
              </div>
            </div>
          </div>

          {/* Linhas da tabela */}
          <div className="grid grid-cols-1 divide-y divide-white/[0.06] md:grid-cols-2 md:divide-y-0">
            <ul className="md:border-r md:border-white/10">
              {FIT_YES.map((t, i) => (
                <motion.li
                  key={t}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.1 + i * 0.05 }}
                  className="group flex items-start gap-4 border-b border-white/[0.06] p-4 transition-colors hover:bg-primary/[0.04] last:border-b-0"
                >
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary transition-all group-hover:scale-110 group-hover:bg-primary/25">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-[14px] leading-relaxed text-foreground/90">
                    {t}
                  </span>
                </motion.li>
              ))}
            </ul>
            <ul>
              {FIT_NO.map((t, i) => (
                <motion.li
                  key={t}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.1 + i * 0.05 }}
                  className="group flex items-start gap-4 border-b border-white/[0.06] p-4 transition-colors hover:bg-white/[0.03] last:border-b-0"
                >
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-muted-foreground transition-all group-hover:scale-110">
                    <X className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-[14px] leading-relaxed text-muted-foreground">
                    {t}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// DIAGNÓSTICO CTA
// ─────────────────────────────────────────────────────────────
export function DiagnosticoCTA({ onDiagnostico }: { onDiagnostico: () => void }) {
  return (
    <section id="diagnostico" className="relative surface-emerald noise-overlay py-12 md:py-20 bg-grid-ambient overflow-hidden">
      <div className="orb-glow orb-emerald top-[-100px] right-[-80px] h-[360px] w-[360px]" />
      <div className="container-aceleriq relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card/40"
        >
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-primary/[0.07] blur-3xl" />
          <div className="absolute inset-0 dot-grid opacity-40" />

          <div className="relative grid gap-5 p-5 md:p-6 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <span className="label-eyebrow flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
                [ 06 ] · Diagnóstico inteligente
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
    <section id="resultados" className="relative surface-amethyst noise-overlay py-12 md:py-20 bg-grid-ambient overflow-hidden">
      <div className="orb-glow orb-violet top-1/3 right-[-120px] h-[400px] w-[400px]" />
      <div className="orb-glow orb-emerald bottom-[-100px] left-[-80px] h-[320px] w-[320px] opacity-25" />
      <div className="container-aceleriq relative z-10">
        <SectionHeader
          eyebrow="[ 07 ] · Resultados"
          title="Quando a engenharia entra, o resultado aparece."
          description="Indicadores médios e mini-cases reais de empresas que estruturaram seu sistema de crescimento com a Aceleriq."
        />

        <div className="mt-5 md:mt-6 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-background p-5"
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
              className="hairline rounded-2xl bg-card/40 p-5 card-hover"
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
  // Duplica para criar loop infinito visual
  const loop = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section className="relative surface-warm noise-overlay py-12 md:py-20 bg-grid-ambient overflow-hidden">
      <div className="orb-glow orb-amber top-1/4 left-[-100px] h-[420px] w-[420px]" />
      <div className="orb-glow orb-emerald bottom-[-80px] right-1/4 h-[300px] w-[300px] opacity-25" />
      <div className="container-aceleriq relative z-10">
        <SectionHeader
          eyebrow="[ 08 ] · Depoimentos"
          title="O que dizem os fundadores que aceleraram conosco."
        />
      </div>

      {/* Dois carrosséis em direções opostas para impacto visual */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 md:mt-10 space-y-4 relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        {/* Linha 1 — esquerda */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-4 w-max"
            animate={{ x: ["0%", "-33.333%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {loop.map((t, i) => (
              <TestimonialCard key={`a-${i}`} t={t} />
            ))}
          </motion.div>
        </div>

        {/* Linha 2 — direita (offset alternado) */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-4 w-max"
            animate={{ x: ["-33.333%", "0%"] }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          >
            {loop.slice().reverse().map((t, i) => (
              <TestimonialCard key={`b-${i}`} t={t} />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function TestimonialCard({ t }: { t: { quote: string; name: string; role: string } }) {
  return (
    <figure className="hairline relative rounded-2xl bg-card/80 p-6 w-[360px] flex-shrink-0 transition-all hover:border-primary/40 hover:bg-card">
      <Quote className="h-5 w-5 text-primary/60" />
      <blockquote className="mt-3 text-[14px] leading-relaxed text-foreground/90">
        "{t.quote}"
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-5">
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
    </figure>
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
    <section className="relative surface-graphite noise-overlay py-12 md:py-20 bg-grid-ambient">
      <div className="container-aceleriq">
        <SectionHeader
          eyebrow="[ 09 ] · Comparativo"
          title="Agência comum vs. Aceleriq"
          description="A diferença entre contratar entregáveis e contratar um sistema de crescimento."
        />

        <div className="mt-5 md:mt-6 relative overflow-hidden rounded-2xl border border-border">
          {/* Coluna Aceleriq destacada com glow vertical */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-[41.66%] bg-gradient-to-b from-primary/[0.04] via-primary/[0.06] to-primary/[0.04]" />
          <div className="pointer-events-none absolute right-[41.66%] top-0 bottom-0 w-px bg-primary/30" />

          <div className="relative grid grid-cols-[1fr_1.4fr_1.4fr] border-b border-border bg-card/60 backdrop-blur">
            <div className="px-5 py-4 text-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Dimensão
            </div>
            <div className="px-5 py-4 text-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Agência comum
            </div>
            <div className="px-5 py-4 text-mono text-[11px] uppercase tracking-[0.18em] text-primary flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_currentColor]" />
              Aceleriq
            </div>
          </div>
          {COMPARE.map(([dim, agency, us], i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid grid-cols-[1fr_1.4fr_1.4fr] border-b border-border last:border-b-0 text-sm transition-colors hover:bg-card/30"
            >
              <div className="px-5 py-4 font-medium text-foreground/95">{dim}</div>
              <div className="px-5 py-4 text-muted-foreground line-through decoration-white/10">{agency}</div>
              <div className="flex items-start gap-2 px-5 py-4 text-foreground font-medium">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                {us}
              </div>
            </motion.div>
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
    <section className="relative surface-midnight noise-overlay py-12 md:py-20 bg-grid-ambient overflow-hidden">
      <div className="orb-glow orb-blue top-1/3 left-[-100px] h-[360px] w-[360px]" />
      <div className="orb-glow orb-violet bottom-[-80px] right-[-60px] h-[280px] w-[280px] opacity-30" />

      <div className="container-aceleriq relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card/40 p-5 md:p-6"
        >
          <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-primary/[0.06] blur-3xl" />
          <div className="absolute inset-0 dot-grid opacity-40" />

          <div className="relative grid gap-5 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <span className="label-eyebrow flex items-center gap-2">
                <Rocket className="h-3.5 w-3.5 text-primary" />
                [ 10 ] · Janela de mercado
              </span>
              <h2 className="mt-3 font-display text-3xl font-medium leading-[1.08] tracking-[-0.03em] md:text-5xl">
                Por que agora? A janela é{" "}
                <span className="text-primary neon-text-glow">curta</span>.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
                Empresas que estruturarem dados, processo e IA nos próximos
                12-18 meses vão competir num patamar diferente. Quem ficar
                no modelo antigo de marketing vai ver margem, CAC e
                produtividade trabalharem contra.
              </p>
            </div>
            <div className="grid gap-2.5">
              {[
                { k: "Custo de aquisição", num: 27, suffix: "% a.a.", prefix: "+" },
                { k: "Empresas com IA aplicada", num: 2.4, suffix: "x", prefix: "Crescem ", decimals: 1 },
                { k: "Tempo médio de implantação", num: 120, suffix: " dias", prefix: "60 — " },
              ].map((s, i) => (
                <motion.div
                  key={s.k}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                  className="group flex items-center justify-between rounded-xl border border-border bg-background/50 px-5 py-4 transition-all hover:border-primary/40 hover:bg-background/80"
                >
                  <span className="text-[13px] text-muted-foreground">{s.k}</span>
                  <span className="text-mono text-[14px] font-semibold text-primary flex items-baseline">
                    <span className="text-foreground/70">{s.prefix}</span>
                    <CountUp to={s.num} decimals={s.decimals ?? 0} duration={1500} />
                    <span>{s.suffix}</span>
                  </span>
                </motion.div>
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
    <section className="relative surface-graphite noise-overlay py-12 md:py-20 bg-grid-ambient overflow-hidden">
      {/* Glow lateral animado */}
      <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-[400px] w-[300px] bg-primary/[0.04] blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[300px] w-[250px] bg-accent/[0.04] blur-[120px] rounded-full" />

      <div id="faq" className="container-aceleriq relative scroll-mt-20">
        <SectionHeader
          eyebrow="[ 11 ] · Perguntas frequentes"
          title="Dúvidas comuns antes de acelerar."
          description="Não achou sua resposta? Fale com a gente no WhatsApp."
        />

        <div className="mx-auto mt-6 md:mt-8 max-w-3xl" style={{ perspective: "1200px" }}>
          <Accordion type="single" collapsible className="space-y-2.5">
            {FAQS.map((f, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <AccordionItem
                  value={`item-${i}`}
                  className="overflow-hidden rounded-xl border border-border bg-card/40 px-5 transition-all data-[state=open]:border-primary/40 data-[state=open]:bg-card/70 data-[state=open]:shadow-[0_10px_40px_-15px_oklch(85%_0.2_145/0.3)]"
                >
                  <AccordionTrigger className="py-4 text-left text-[15px] font-medium hover:no-underline">
                    <span className="flex items-center gap-3">
                      <HelpCircle className="h-4 w-4 flex-shrink-0 text-primary" />
                      {f.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pl-7 text-[14px] leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
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
    <section className="relative surface-emerald noise-overlay py-12 md:py-20 bg-grid-ambient overflow-hidden">
      <div className="orb-glow orb-emerald top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] opacity-30" />
      <div className="container-aceleriq relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card/40 p-6 text-center md:p-8"
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
            <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
              Comece pelo Diagnóstico de Maturidade. Em 5 minutos você sabe
              exatamente em que estágio está e o que precisa destravar.
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
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

            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-muted-foreground">
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
    <Reveal className="mx-auto max-w-2xl text-center">
      <div>
        <span className="label-eyebrow">{eyebrow}</span>
        <h2 className="mt-3 font-display text-3xl font-medium leading-[1.1] tracking-[-0.03em] md:text-[44px]">
          {title}
        </h2>
        {description && (
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}

