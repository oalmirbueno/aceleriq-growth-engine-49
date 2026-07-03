import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/site/ServicePageLayout";
import { 
  LayoutDashboard, 
  Settings, 
  LineChart, 
  Workflow, 
  Bot, 
  ShieldCheck, 
  MessageCircle,
  ClipboardList,
  Database,
  History,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";
import painelImg from "@/assets/painel-aceleriq-online.jpg";

export const Route = createFileRoute("/aceleriq-os")({
  head: () => {
    const TITLE = "Aceleriq OS · Central de Crescimento e Comercial";
    const DESCRIPTION =
      "Acompanhe campanhas, automações, funil, tarefas e métricas em uma central estratégica de crescimento.";
    const URL = "https://aceleriq.com.br/aceleriq-os";
    const OG_IMAGE = "https://aceleriq.com.br/og-image.jpg";
    return {
      meta: [
        { title: TITLE },
        { name: "description", content: DESCRIPTION },
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESCRIPTION },
        { property: "og:url", content: URL },
        { property: "og:type", content: "website" },
        { property: "og:image", content: OG_IMAGE },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: TITLE },
        { name: "twitter:description", content: DESCRIPTION },
        { name: "twitter:image", content: OG_IMAGE },
      ],
      links: [{ rel: "canonical", href: URL }],
    };
  },
  component: AceleriqOS,
});

function AceleriqOS() {
  return (
    <ServicePageLayout
      variant="ia"
      eyebrow="O Sistema Operacional do Crescimento"
      heroAside={null}
      h1={
        <>
          Aceleriq OS: a <span className="text-primary italic">central de crescimento</span> da sua operação.
        </>
      }
      intro="Um ambiente unificado para acompanhar marketing, comercial, automações, campanhas e métricas em tempo real. O Aceleriq OS dá ao empresário o controle total da operação sem precisar entrar em múltiplas ferramentas."
      benefits={[
        {
          title: "Visão 360º da Operação",
          desc: "Tudo o que está sendo executado no marketing e no comercial fica visível em tempo real.",
        },
        {
          title: "Histórico e Decisões",
          desc: "Não perca o contexto. Todas as decisões e mudanças de rota são registradas para consulta futura.",
        },
        {
          title: "Métricas de Verdade",
          desc: "Esqueça relatórios de vaidade. Acompanhe o que realmente impacta o P&L da empresa.",
        },
        {
          title: "Gestão de Ativos",
          desc: "Acesso rápido a todos os seus sites, landing pages, automações e criativos.",
        },
        {
          title: "Transparência Total",
          desc: "Você sabe exatamente o que o time da Aceleriq está fazendo e qual o status de cada entrega.",
        },
      ]}
      deliverables={[
        "Painel de controle centralizado",
        "Gestão de tarefas e sprints",
        "Visualização de funil comercial",
        "Dashboard de indicadores (KPIs)",
        "Repositório de ativos e criativos",
        "Registro de automações ativas",
        "Histórico de decisões estratégicas",
        "Integração com grupo de suporte",
      ]}
      process={[
        {
          step: "01",
          title: "Instalação",
          desc: "Configuramos seu espaço exclusivo dentro do Aceleriq OS.",
        },
        {
          step: "02",
          title: "Integração de Dados",
          desc: "Conectamos suas fontes de marketing e vendas à central.",
        },
        {
          step: "03",
          title: "Mapeamento de Funil",
          desc: "Desenhamos seu processo comercial dentro da plataforma.",
        },
        {
          step: "04",
          title: "Automação de Reports",
          desc: "Configuramos a atualização automática dos principais indicadores.",
        },
        {
          step: "05",
          title: "Treinamento de Uso",
          desc: "Ensinamos seu time a usar o OS para tomar decisões rápidas.",
        },
        {
          step: "06",
          title: "Iteração Contínua",
          desc: "Evoluímos a ferramenta conforme sua operação amadurece.",
        },
      ]}
      faqs={[
        {
          q: "Eu preciso pagar uma licença extra pelo Aceleriq OS?",
          a: "Não. O Aceleriq OS é um benefício exclusivo incluso nos nossos programas de engenharia de crescimento.",
        },
        {
          q: "Meus dados estão seguros?",
          a: "Sim. Utilizamos infraestrutura de ponta com criptografia e acessos controlados para garantir que só as pessoas autorizadas vejam seus dados.",
        },
        {
          q: "O OS substitui o meu CRM?",
          a: "Não. O Aceleriq OS se integra ao seu CRM para consolidar os dados e dar uma visão gerencial mais clara do crescimento como um todo.",
        },
      ]}
      extraSection={
        <section className="px-6 lg:px-16 py-16 md:py-24 border-t border-border/60 max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 mb-12">
            <div className="lg:col-span-2 font-mono text-[10px] text-primary uppercase tracking-[0.2em] lg:pt-2">
              03 / Diferencial
            </div>
            <div className="lg:col-span-10">
              <h2 className="font-display text-2xl md:text-4xl lg:text-5xl uppercase leading-[1.05] tracking-[-0.035em]">
                Você não contrata apenas uma agência. Você ganha uma <em className="italic font-light text-primary">central estratégica</em>.
              </h2>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Zap, title: "Velocidade", desc: "Decisões baseadas em dados vivos." },
              { icon: History, title: "Contexto", desc: "Histórico completo da sua jornada." },
              { icon: Database, title: "Clareza", desc: "Tudo centralizado, sem dispersão." },
              { icon: ShieldCheck, title: "Controle", desc: "Sua operação na palma da mão." }
            ].map((item, i) => (
              <div key={i} className="group relative overflow-hidden p-6 rounded-xl border border-border bg-card/20 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/[0.04] hover:shadow-[0_20px_50px_-20px_oklch(85%_0.2_145/0.35)]">
                <div className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-primary/0 blur-2xl transition-all duration-500 group-hover:bg-primary/20" />
                <div className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary mb-4 transition-all duration-300 group-hover:scale-110 group-hover:border-primary group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_oklch(85%_0.2_145/0.5)]">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="relative font-display text-lg mb-2 transition-colors group-hover:text-primary">{item.title}</h3>
                <p className="relative text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      }
    />
  );
}
