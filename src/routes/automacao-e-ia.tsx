import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout, buildServiceHead } from "@/components/site/ServicePageLayout";
import { AutomationSimulator } from "@/components/site/AutomationSimulator";
import { HumanBand } from "@/components/site/HumanBand";
import automacaoHumana from "@/assets/automacao-humana.jpg";

const URL = "https://aceleriq.com.br/automacao-e-ia";
const TITLE = "Automação de Marketing e IA para WhatsApp, CRM e Vendas | Aceleriq";
const DESCRIPTION =
  "Automação de marketing e vendas com IA para empresas no Brasil todo: WhatsApp, CRM, atendimento, qualificação e follow-up. n8n, RD Station, HubSpot e agentes de IA sob medida.";

const FAQS = [
  { q: "Que tipo de automação vocês implementam?", a: "Automação comercial (qualificação, follow-up, agendamento), de marketing (nutrição, segmentação, scoring), operacional (financeiro, atendimento, BI) e agentes de IA customizados." },
  { q: "Quais ferramentas vocês usam?", a: "n8n, Make, Zapier, OpenAI/Anthropic, RAG com vetores (Supabase/Pinecone), CRMs (HubSpot, RD, Pipedrive), WhatsApp Business API, e integrações sob medida." },
  { q: "Preciso ter CRM para automatizar?", a: "Não obrigatoriamente, mas é altamente recomendado. Se você não tem, implantamos no projeto." },
  { q: "Vocês treinam o time depois?", a: "Sim. Documentação, vídeos e sessões de handover ficam inclusos. O cliente pode operar sozinho ou manter governança conosco." },
  { q: "IA generativa funciona pro meu negócio?", a: "Para a maioria dos negócios B2B sim, qualificação, atendimento, geração de conteúdo, análise de dados, suporte. Validamos viabilidade no diagnóstico antes de propor escopo." },
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
      variant="ia"
      eyebrow="n8n · OpenAI · CRM · Workflows"
      h1={<>Automação e <span className="text-primary neon-text-glow">IA</span> para reduzir atraso e acelerar decisões</>}
      intro="Criamos fluxos, agentes, integrações e automações conectadas ao WhatsApp, CRM, formulários, atendimento e rotina comercial da sua empresa. IA não substitui a empresa, ela organiza e apoia processos bem desenhados."
      benefits={[
        { title: "Atendimento Ultra Rápido", desc: "Lead chegou? O sistema responde instantaneamente, qualifica e direciona para o vendedor certo." },
        { title: "CRM sempre Atualizado", desc: "Contatos e oportunidades registrados automaticamente, sem depender da memória do vendedor." },
        { title: "Follow-up que não Falha", desc: "Cadência de mensagens automáticas no WhatsApp e E-mail para manter o lead quente." },
        { title: "Agentes de IA Especialistas", desc: "IA treinada com os dados da sua empresa para tirar dúvidas e agendar reuniões 24/7." },
        { title: "Rotina Clara para a Equipe", desc: "Notificações e tarefas criadas automaticamente para que cada um saiba exatamente o que fazer." },
        { title: "Métricas em Tempo Real", desc: "Acompanhe gargalos e performance sem precisar pedir relatórios manuais para o time." },
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
      humanBand={
        <HumanBand
          image={automacaoHumana}
          eyebrow="✦ Automação com rosto humano"
          title={<>IA que <em className="italic font-light text-[oklch(72%_0.19_145)]">libera</em> o seu time.</>}
          body="Não é robô substituindo pessoa. É automação que responde no WhatsApp em segundos, atualiza o CRM sozinha e devolve o tempo do seu time para vender, atender melhor e pensar estratégia."
          withAlmir
        />
      }
      extraSection={<AutomationSimulator />}
    />
  );
}
