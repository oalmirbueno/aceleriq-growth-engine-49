import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout, buildServiceHead } from "@/components/site/ServicePageLayout";
import { TrafegoCalculator } from "@/components/site/TrafegoCalculator";

const URL = "https://aceleriq.com.br/trafego-pago";
const TITLE = "Gestão de Tráfego Pago em Curitiba · Aceleriq";
const DESCRIPTION =
  "Gestão de tráfego pago em Google Ads, Meta Ads e LinkedIn Ads orientada a pipeline e receita. Aceleriq integra mídia, CRM e dados para escalar com previsibilidade.";

const FAQS = [
  { q: "Em quais plataformas vocês operam?", a: "Google Ads (Search, PMax, YouTube), Meta Ads (Facebook/Instagram), LinkedIn Ads, TikTok Ads e remarketing programático." },
  { q: "Vocês trabalham com qual investimento mínimo?", a: "Operamos a partir de R$ 10 mil/mês de mídia. Abaixo disso, não conseguimos sustentar a curva de aprendizado dos algoritmos." },
  { q: "Como medem o ROI?", a: "Toda campanha integrada ao CRM via UTM + Meta CAPI + Google Enhanced Conversions. Você acompanha CPL, CAC, LTV e ROAS reais." },
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
      h1={<>Gestão de <span className="text-primary neon-text-glow">Tráfego Pago</span> orientada a receita</>}
      intro="Tráfego pago lido por pipeline, não por clique. Integramos Meta CAPI, Google Enhanced Conversions e CRM para você decidir investimento com base em CAC e LTV reais, não em métricas de vaidade."
      benefits={[
        { title: "Lido por receita", desc: "CRM + tracking server-side. Você vê quanto cada campanha gerou em vendas, não só leads." },
        { title: "Estratégia + execução", desc: "Mídia conversa com copy, criativo, landing e nutrição. Zero ilha." },
        { title: "Criativos em ritmo", desc: "Esteira de criativos semanais para alimentar o algoritmo e cortar fadiga." },
        { title: "Tracking blindado", desc: "Meta CAPI, Google Enhanced Conversions, GA4 server-side, GTM bem implementado." },
        { title: "Reporte executivo", desc: "Dashboard semanal com CPL, CAC, ROAS, pipeline e leitura por estágio do funil." },
        { title: "Sem letra miúda", desc: "Fee fixo. Sem percentual sobre mídia. Sem amarra de plataforma." },
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
