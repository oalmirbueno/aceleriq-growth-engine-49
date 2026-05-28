import { ArrowUpRight, BarChart3, CheckCircle2, FileText, Headphones, LineChart, MessageCircle, Users } from "lucide-react";

const PAINEL_URL = "https://aceleriq.online";

export function PainelComunidade() {
  return (
    <section
      id="painel-comunidade"
      className="relative py-20 md:py-28 lg:py-32 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 bg-grid-tech opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-[28rem] h-[28rem] bg-primary/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -right-32 w-[28rem] h-[28rem] bg-primary/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="container-aceleriq relative z-10">
        <div className="max-w-3xl mb-16 md:mb-20">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase py-1 border-b border-primary text-primary">
            [ 11 ] // Operação ao Vivo
          </span>
          <h2 className="mt-6 text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.05]">
            <span className="text-white">Tudo o que fazemos é</span>
            <br />
            <span className="text-primary text-glow italic">documentado em tempo real.</span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-4 md:pl-6 max-w-2xl">
            Cada campanha, automação, IA, ajuste de funil e número do mês fica registrado no Aceleriq OS, o seu painel exclusivo. E você fala direto com a nossa equipe num grupo de WhatsApp dedicado só para a sua empresa.
          </p>
        </div>

        {/* PAINEL - simplified */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-24">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary">Aceleriq OS · aceleriq.online</span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
              Sua área de comando,
              <br />
              <span className="text-primary text-glow italic">com tudo documentado.</span>
            </h3>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Centralizamos campanhas, automações, IA, CRM, entregas e métricas no <strong className="text-foreground">Aceleriq OS</strong>. Você acompanha em tempo real os mesmos números, fluxos e tarefas que o nosso time está executando, sem precisar pedir relatório.
            </p>
            <ul className="mt-7 space-y-3.5">
              {[
                { icon: LineChart, label: "Indicadores comerciais e operacionais acompanhados" },
                { icon: Users, label: "Funil, tarefas, entregas e automações documentadas" },
                { icon: FileText, label: "Cada entrega, ajuste e decisão registrado com data e responsável" },
                { icon: CheckCircle2, label: "Próximos passos organizados para o cliente acompanhar sem depender de relatório solto" },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 items-center justify-center border border-primary/40 bg-primary/10 shrink-0">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                  </span>
                  <span className="text-sm md:text-base text-foreground/85 leading-relaxed">{label}</span>
                </li>
              ))}
            </ul>

            <a
              href={PAINEL_URL}
              target="_blank"
              rel="noreferrer"
              className="group mt-8 inline-flex items-center gap-3 btn-tech"
            >
              <span>Acessar o Aceleriq OS</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-5">
              <MessageCircle className="h-5 w-5 text-primary" />
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary">Grupo Dedicado · WhatsApp</span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
              Um grupo só seu com
              <br />
              <span className="text-primary text-glow italic">a equipe Aceleriq.</span>
            </h3>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Cada cliente tem um grupo de WhatsApp exclusivo com o time da Aceleriq. Para acompanhamento, dúvidas e suporte direto, sem ticket, sem fila, sem intermediário.
            </p>
            <ul className="mt-7 space-y-3.5">
              {[
                { icon: Headphones, label: "Suporte direto com quem opera a sua conta" },
                { icon: MessageCircle, label: "Dúvidas estratégicas, técnicas e comerciais no mesmo canal" },
                { icon: CheckCircle2, label: "Avisos do que mudou no painel e no funil" },
                { icon: FileText, label: "Tudo registrado e linkado ao Aceleriq OS" },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 items-center justify-center border border-primary/40 bg-primary/10 shrink-0">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                  </span>
                  <span className="text-sm md:text-base text-foreground/85 leading-relaxed">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
