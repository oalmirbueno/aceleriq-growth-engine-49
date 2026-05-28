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
  head: () => ({
    meta: [
      { title: "Aceleriq OS | Central de Crescimento, Marketing e Comercial" },
      { 
        name: "description", 
        content: "Acompanhe campanhas, automações, funil, tarefas e métricas em uma central estratégica de crescimento." 
      },
    ],
  }),
  component: AceleriqOS,
});

function AceleriqOS() {
  return (
    <ServicePageLayout
      variant="ia"
      eyebrow="O Sistema Operacional do Crescimento"
      heroAside={
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="relative group mt-8 lg:mt-0"
        >
          {/* Decorative glows */}
          <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity" />
          
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl">
            <img
              src={painelImg}
              alt="Painel Aceleriq OS"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              width={1600}
              height={900}
            />
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-white/5 pointer-events-none" />
          </div>
          
          {/* Floating badge */}
          <div className="absolute -bottom-4 -right-4 bg-primary px-4 py-2 rounded-lg shadow-lg border border-primary/20 backdrop-blur-md">
            <span className="text-[10px] font-mono font-bold text-black uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
              Portal Ativo
            </span>
          </div>
        </motion.div>
      }
      h1={
        <>
          Aceleriq OS: a <span className="text-primary italic">central de crescimento</span> da sua operação.
        </>
      }
      intro="Um ambiente unificado para acompanhar marketing, comercial, automações, campanhas, tarefas, métricas e decisões estratégicas em um só lugar."
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
              <div key={i} className="p-6 rounded-xl border border-border bg-card/20 hover:border-primary/40 transition-colors">
                <item.icon className="h-6 w-6 text-primary mb-4" />
                <h3 className="font-display text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      }
    />
  );
}
