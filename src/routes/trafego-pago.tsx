import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout, buildServiceHead } from "@/components/site/ServicePageLayout";
import { TrafegoCalculator } from "@/components/site/TrafegoCalculator";

const URL = "https://aceleriq.com.br/trafego-pago";
const TITLE = "Gestão de Tráfego Pago com Estratégia Comercial | Aceleriq";
const DESCRIPTION =
  "Tráfego pago para escalar operações que já têm base para converter. Planejamos, configuramos e otimizamos campanhas no Meta Ads e Google Ads.";

const FAQS = [
  { q: "Em quais plataformas vocês operam?", a: "Google Ads (Search, PMax, YouTube), Meta Ads (Facebook/Instagram), LinkedIn Ads, TikTok Ads e remarketing programático." },
  { q: "Vocês trabalham com qual investimento mínimo?", a: "Operamos a partir de R$ 10 mil/mês de mídia. Abaixo disso, não conseguimos sustentar a curva de aprendizado dos algoritmos." },
  { q: "Como medem o ROI?", a: "Toda campanha integrada ao CRM via UTM e eventos de conversão. Você acompanha pipeline, custo por lead, oportunidades e receita gerada por canal." },
  { q: "Tem fee de gestão fixo ou percentual?", a: "Trabalhamos com fee fixo mensal proporcional ao escopo. Sem percentual sobre mídia (alinhamos incentivo com o seu resultado, não com o seu gasto)." },
  { q: "Existe contrato de fidelidade?", a: "Ciclo mínimo de 6 meses para sustentar a curva de aprendizado. Após o ciclo, segue mensal sem multa." },
];

export const Route = createFileRoute("/trafego-pago")({
  head: () => buildServiceHead({
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    faqs: FAQS,
    serviceName: "Gestão de Tráfego Pago",
  }),
  component: Page,
});

function Page() {
  return (
    <ServicePageLayout
      variant="trafego"
      eyebrow="Google · Meta · LinkedIn · TikTok"
      h1={<>Tráfego Pago para <span className="text-primary neon-text-glow">escalar</span> operações maduras</>}
      intro="Planejamos, configuramos e otimizamos campanhas no Meta Ads e Google Ads conectadas à sua oferta, página, CRM e atendimento. Tráfego sem processo comercial vira desperdício."
      benefits={[
        { title: "Tráfego sem processo é desperdício", desc: "Antes de aumentar verba, avaliamos se a página, o atendimento e o CRM estão prontos para receber demanda." },
        { title: "Campanhas Locais Assistidas", desc: "Para empresas que estão começando a organizar a aquisição e precisam de leads qualificados no WhatsApp." },
        { title: "Gestão de Mídia e Escala", desc: "Para empresas com verba maior e operação comercial madura que buscam escala nacional." },
        { title: "Meta Ads e Google Ads", desc: "Operamos nos canais onde seu cliente realmente está, com criativos e copy ajustados ao funil." },
        { title: "Leitura por Pipeline e Receita", desc: "Integramos o tracking ao seu CRM para acompanhar o que cada real investido gera em pipeline e oportunidade." },
        { title: "Otimização Contínua", desc: "Testes A/B constantes em criativos, públicos e landing pages para reduzir o custo por contato qualificado." },

      ]}
      deliverables={[
        "Auditoria inicial das contas de mídia",
        "Estratégia de funil (topo/meio/fundo)",
        "Estruturação de campanhas e públicos",
        "Implantação de Meta CAPI e GA4 server-side",
        "Esteira semanal de criativos",
        "Copywriting de anúncios",
        "Landing pages de conversão",
        "Integração CRM + tracking",
        "Dashboard semanal de performance",
        "Reunião semanal de otimização",
      ]}
      process={[
        { step: "01", title: "Auditoria", desc: "Diagnóstico de contas, tracking, criativos, funil e benchmarks." },
        { step: "02", title: "Setup", desc: "Estruturação, tagging, integrações server-side e contas de teste." },
        { step: "03", title: "Aprendizado", desc: "30-60 dias para algoritmo aprender e identificar criativos vencedores." },
        { step: "04", title: "Escala", desc: "Aumento de orçamento controlado, expansão de públicos e novos formatos." },
      ]}
      faqs={FAQS}
      whatsappMessage="Olá! Quero gestão de tráfego pago com a Aceleriq."
      extraSection={<TrafegoCalculator />}
    />
  );
}
