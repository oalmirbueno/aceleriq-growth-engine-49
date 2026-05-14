import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout, buildServiceHead } from "@/components/site/ServicePageLayout";

const URL = "https://aceleriq.com.br/automacao-e-ia";
const TITLE = "Automação e IA para Empresas · Aceleriq";
const DESCRIPTION =
  "Automação de marketing, vendas e operação com IA. Agentes inteligentes, fluxos n8n/Make, integrações e CRM automatizado para escalar sem contratar.";

const FAQS = [
  { q: "Que tipo de automação vocês implementam?", a: "Automação comercial (qualificação, follow-up, agendamento), de marketing (nutrição, segmentação, scoring), operacional (financeiro, atendimento, BI) e agentes de IA customizados." },
  { q: "Quais ferramentas vocês usam?", a: "n8n, Make, Zapier, OpenAI/Anthropic, RAG com vetores (Supabase/Pinecone), CRMs (HubSpot, RD, Pipedrive), WhatsApp Business API, e integrações sob medida." },
  { q: "Preciso ter CRM para automatizar?", a: "Não obrigatoriamente, mas é altamente recomendado. Se você não tem, implantamos no projeto." },
  { q: "Vocês treinam o time depois?", a: "Sim. Documentação, vídeos e sessões de handover ficam inclusos. O cliente pode operar sozinho ou manter governança conosco." },
  { q: "IA generativa funciona pro meu negócio?", a: "Para a maioria dos negócios B2B sim — qualificação, atendimento, geração de conteúdo, análise de dados, suporte. Validamos viabilidade no diagnóstico antes de propor escopo." },
];

export const Route = createFileRoute("/automacao-e-ia")({
  head: () => buildServiceHead({
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    faqs: FAQS,
    serviceName: "Automação e Inteligência Artificial",
  }),
  component: Page,
});

function Page() {
  return (
    <ServicePageLayout
      eyebrow="n8n · OpenAI · CRM · Workflows"
      h1={<>Automação e <span className="text-primary neon-text-glow">IA</span> que escala sem contratar</>}
      intro="Agentes de IA, fluxos automatizados e integrações sob medida para tirar o operacional repetitivo do colo do seu time. A Aceleriq instala automação real — não receita pronta de YouTube."
      benefits={[
        { title: "Agentes de IA reais", desc: "Atendimento, qualificação, SDR e suporte com modelos da OpenAI/Anthropic + RAG da sua base." },
        { title: "Fluxos n8n/Make", desc: "Automações enterprise self-hosted, sem teto de operações ou refém de SaaS caro." },
        { title: "WhatsApp profissional", desc: "Integração via API oficial com chatbot, qualificação automática e handoff humano." },
        { title: "CRM automatizado", desc: "Roteamento, scoring, follow-up e nutrição rodando sozinhos dentro do seu CRM." },
        { title: "Integrações sob medida", desc: "Conectamos qualquer sistema com API. Quando não tem API, escrevemos uma." },
        { title: "Governança de dados", desc: "LGPD, logs, monitoramento, fallback humano. Automação responsável." },
      ]}
      deliverables={[
        "Mapeamento de processos automatizáveis",
        "Diagrama de fluxos (BPMN)",
        "Implantação de n8n/Make",
        "Agentes de IA customizados (RAG)",
        "Integração WhatsApp Business API",
        "Automação de CRM (scoring, roteamento, follow-up)",
        "Conectores e webhooks sob medida",
        "Dashboards de monitoramento",
        "Documentação técnica e handover",
        "Suporte e evolução mensal",
      ]}
      process={[
        { step: "01", title: "Mapeamento", desc: "Auditoria dos processos manuais e identificação de pontos de alta alavancagem." },
        { step: "02", title: "Design", desc: "Diagrama de fluxos, escolha de stack e definição de governança." },
        { step: "03", title: "Construção", desc: "Implementação dos fluxos, agentes, integrações e testes em ambiente controlado." },
        { step: "04", title: "Go-live", desc: "Subida em produção, monitoramento, ajustes finos e treinamento do time." },
      ]}
      faqs={FAQS}
      whatsappMessage="Olá! Quero conversar sobre automação e IA com a Aceleriq."
    />
  );
}
