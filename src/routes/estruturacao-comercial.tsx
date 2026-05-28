import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/site/ServicePageLayout";
import { 
  Users2, 
  MessageCircle, 
  Workflow, 
  Target, 
  LineChart, 
  Bot, 
  ShieldCheck, 
  Building2,
  Clock,
  LayoutDashboard,
  ClipboardList
} from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/estruturacao-comercial")({
  head: () => ({
    meta: [
      { title: "Estruturação Comercial com CRM, WhatsApp e IA | Aceleriq" },
      { 
        name: "description", 
        content: "Organize funil, atendimento, CRM, follow-up e rotina comercial antes de escalar marketing e tráfego pago." 
      },
    ],
  }),
  component: EstruturacaoComercial,
});

function EstruturacaoComercial() {
  return (
    <ServicePageLayout
      variant="agencia"
      eyebrow="Engenharia de Vendas"
      h1={
        <>
          Estruturação comercial <span className="text-primary italic">sem improviso</span>.
        </>
      }
      intro="Organizamos funil, CRM, WhatsApp, atendimento, scripts, follow-up e rotina comercial para sua empresa ter mais controle sobre oportunidades e vendas."
      benefits={[
        {
          title: "Leads sem acompanhamento",
          desc: "Resolvemos a perda de oportunidades por falta de velocidade ou esquecimento no contato inicial.",
        },
        {
          title: "WhatsApp desorganizado",
          desc: "Centralizamos e organizamos as conversas para que o histórico não se perca e o atendimento seja profissional.",
        },
        {
          title: "Follow-up manual e falho",
          desc: "Substituímos o 'esqueci de ligar' por cadências automáticas e lembretes precisos no CRM.",
        },
        {
          title: "Propostas sem controle",
          desc: "Monitoramos o envio e o status de cada proposta para que nenhum fechamento fique pelo caminho.",
        },
        {
          title: "Dono centralizando tudo",
          desc: "Criamos processos para que a operação comercial rode com o time, liberando o sócio da linha de frente.",
        },
      ]}
      deliverables={[
        "Configuração completa de CRM e Pipeline",
        "Mapeamento de etapas do funil de vendas",
        "Criação de scripts de atendimento e vendas",
        "Desenho de cadência de follow-up",
        "Automações de integração WhatsApp/CRM",
        "Dashboard de indicadores comerciais",
        "Definição de rotina e rituais de gestão",
        "Treinamento do time comercial",
      ]}
      process={[
        {
          step: "01",
          title: "Diagnóstico Comercial",
          desc: "Analisamos como os leads chegam e onde estão sendo perdidos hoje.",
        },
        {
          step: "02",
          title: "Mapeamento e Gargalos",
          desc: "Identificamos os pontos cegos no atendimento e na gestão de contatos.",
        },
        {
          step: "03",
          title: "Configuração de CRM",
          desc: "Instalamos e parametrizamos o CRM com as etapas reais do seu negócio.",
        },
        {
          step: "04",
          title: "Scripts e Cadências",
          desc: "Escrevemos o que falar e quando falar para aumentar a conversão.",
        },
        {
          step: "05",
          title: "Automação e IA",
          desc: "Conectamos ferramentas para que o trabalho manual seja minimizado.",
        },
        {
          step: "06",
          title: "Treinamento",
          desc: "Entregamos o processo rodando e treinamos quem vai operar no dia a dia.",
        },
      ]}
      faqs={[
        {
          q: "Vocês vendem o software de CRM?",
          a: "Não. Nós somos a engenharia que implementa. Recomendamos e configuramos as melhores ferramentas do mercado (como RD Station, Pipedrive, HubSpot ou Kommo) conforme sua necessidade.",
        },
        {
          q: "Minha empresa é pequena, isso serve para mim?",
          a: "Sim. Se você recebe leads e precisa vender, você precisa de um processo. A estruturação comercial é o que permite que uma empresa pequena cresça com organização.",
        },
        {
          q: "Em quanto tempo o processo fica pronto?",
          a: "Um projeto de estruturação comercial padrão leva entre 30 e 45 dias para estar 100% implementado e treinado.",
        },
      ]}
      extraSection={
        <section className="px-6 lg:px-16 py-16 md:py-24 border-t border-border/60 max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 mb-12">
            <div className="lg:col-span-2 font-mono text-[10px] text-primary uppercase tracking-[0.2em] lg:pt-2">
              03 / Para quem é
            </div>
            <div className="lg:col-span-10">
              <h2 className="font-display text-2xl md:text-4xl lg:text-5xl uppercase leading-[1.05] tracking-[-0.035em]">
                Ideal para empresas que querem <em className="italic font-light text-primary">profissionalizar</em>.
              </h2>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Empresas que recebem leads, mas não acompanham direito",
              "Negócios que querem vender mais sem depender só do dono",
              "Times comerciais sem processo ou scripts claros",
              "Empresas locais que querem profissionalizar o atendimento",
              "Negócios que querem anunciar, mas ainda não têm base comercial",
              "Gestores que sentem que o comercial é uma 'caixa preta'"
            ].map((text, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-xl border border-border bg-card/20">
                <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground leading-relaxed">{text}</span>
              </div>
            ))}
          </div>
        </section>
      }
    />
  );
}
