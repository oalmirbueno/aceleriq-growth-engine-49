import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Brain,
  Workflow,
  Bot,
  Layers,
  Target,
  Database,
  LineChart,
  Settings2,
  MessageCircle,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { DiagnosticoModal } from "@/components/site/DiagnosticoModal";
import { Button } from "@/components/ui/button";
import {
  whatsappLink,
  DEFAULT_WHATSAPP_MESSAGE,
} from "@/lib/contact";

const PAGE_TITLE =
  "Sobre a Aceleriq · Engenharia de Crescimento em Curitiba";
const PAGE_DESCRIPTION =
  "Conheça a Aceleriq, engenharia de crescimento em Curitiba que une estratégia, CRM, tráfego, automação, IA, dados e processos comerciais para empresas que querem escalar com previsibilidade no Brasil.";
const PAGE_URL = "https://aceleriq.com.br/sobre-a-aceleriq";
const OG_IMAGE = "https://aceleriq.com.br/og-image.jpg";

export const Route = createFileRoute("/sobre-a-aceleriq")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESCRIPTION },
      { property: "og:url", content: PAGE_URL },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
  }),
  component: SobreAceleriq,
});

const PILLARS = [
  {
    icon: Brain,
    title: "Estratégia + Dados",
    desc: "Toda decisão da Aceleriq é sustentada por diagnóstico, métricas e leitura de receita.",
  },
  {
    icon: Workflow,
    title: "Processo Comercial",
    desc: "Playbook, cadência, CRM e automação para vender com método, não com sorte.",
  },
  {
    icon: Bot,
    title: "IA & Automação",
    desc: "Agentes, fluxos e integrações que entregam tempo e escala ao seu time.",
  },
  {
    icon: Layers,
    title: "Estrutura Operacional",
    desc: "Sua empresa para de depender de pessoas e passa a depender de sistemas.",
  },
];

const SERVICES = [
  { icon: Target, title: "Engenharia de Crescimento", desc: "Plano integrado de crescimento com metas, alavancas e priorização." },
  { icon: Settings2, title: "CRM e Funil Comercial", desc: "Estruturação completa de CRM, automações e cadência de vendas." },
  { icon: Bot, title: "Automação com IA", desc: "Agentes de IA, fluxos n8n/Make e integrações sob medida." },
  { icon: LineChart, title: "Tráfego Pago orientado a receita", desc: "Meta, Google e LinkedIn lidos por pipeline e receita." },
  { icon: Database, title: "Dados e Dashboards", desc: "BI executivo com CAC, LTV, conversão e visão semanal do negócio." },
  { icon: Workflow, title: "Processos Comerciais", desc: "Playbook, scripts, qualificação e ritual de vendas." },
];

function SobreAceleriq() {
  const [diagOpen, setDiagOpen] = useState(false);
  const openDiagnostico = () => setDiagOpen(true);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onDiagnostico={openDiagnostico} />

      <main>
        {/* HERO da página */}
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
                Curitiba · PR · Brasil · Atuação nacional
              </span>
              <h1 className="mt-4 font-display text-4xl font-medium leading-[1.05] tracking-[-0.03em] md:text-6xl">
                Sobre a <span className="text-primary neon-text-glow">Aceleriq</span>
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                A Aceleriq é uma engenharia de crescimento que une estratégia,
                CRM, tráfego, automação, IA, dados e processos comerciais para
                empresas que querem escalar com previsibilidade.
              </p>
            </motion.div>
          </div>
        </section>

        {/* O QUE É */}
        <section className="relative py-12 md:py-16 bg-grid-ambient">
          <div className="container-aceleriq grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="label-eyebrow">[ 01 ] · O que é a Aceleriq</span>
              <h2 className="mt-3 font-display text-3xl font-medium leading-[1.1] tracking-[-0.03em] md:text-4xl">
                Não é agência tradicional. É a engenharia de crescimento da sua empresa.
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
                <p>
                  A Aceleriq nasceu para resolver o problema central das
                  empresas que cresceram sem método: operações fragmentadas,
                  marketing sem leitura de receita, vendas dependendo de
                  esforço pessoal e zero estrutura de dados para decidir.
                </p>
                <p>
                  Diferente de uma agência tradicional, que entrega peças
                  soltas (criativo, post, anúncio), a Aceleriq entrega um
                  sistema integrado: diagnóstico, estratégia, CRM, processo
                  comercial, automação, IA e dashboards funcionando dentro do
                  seu negócio.
                </p>
                <p>
                  Operamos como engenharia de crescimento: levantamos a planta
                  da operação, identificamos os gargalos, projetamos a solução
                  e instalamos o que precisa funcionar. O entregável final
                  nunca é entregável avulso, é receita previsível.
                </p>
                <p>
                  Com sede em Curitiba, PR, a Aceleriq atende empresas em todo
                  o Brasil que faturam a partir de R$ 100 mil/mês e querem
                  profissionalizar marketing, vendas e operação.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:col-span-5">
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
        </section>

        {/* SERVIÇOS */}
        <section className="relative py-12 md:py-16 bg-grid-ambient">
          <div className="container-aceleriq">
            <div className="max-w-2xl">
              <span className="label-eyebrow">[ 02 ] · O que a Aceleriq faz</span>
              <h2 className="mt-3 font-display text-3xl font-medium leading-[1.1] tracking-[-0.03em] md:text-4xl">
                Frentes de atuação da Aceleriq
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground md:text-base">
                Toda a operação da Aceleriq gira em torno de seis frentes
                integradas, projetadas para empresas que querem escalar com
                previsibilidade.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: i * 0.04 }}
                  className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-br from-white/[0.035] to-white/[0.01] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-[15px] font-medium tracking-tight transition-colors group-hover:text-primary">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-12 md:py-16 bg-grid-ambient">
          <div className="container-aceleriq">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl border border-border bg-card/40 p-8 text-center md:p-12"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

              <h2 className="mx-auto max-w-3xl font-display text-3xl font-medium leading-[1.05] tracking-[-0.03em] md:text-5xl">
                Quer saber em que estágio sua empresa está?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                Faça o Diagnóstico Gratuito da Aceleriq em 5 minutos e receba
                seu Score, classificação e 3 recomendações personalizadas.
              </p>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  onClick={openDiagnostico}
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
                    WhatsApp da Aceleriq
                  </a>
                </Button>
              </div>

              <div className="mt-6">
                <Link
                  to="/"
                  className="text-[12px] font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
                >
                  ← Voltar para a home
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <DiagnosticoModal open={diagOpen} onOpenChange={setDiagOpen} />
    </div>
  );
}
