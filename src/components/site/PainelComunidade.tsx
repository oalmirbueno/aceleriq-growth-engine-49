import { ArrowUpRight, BarChart3, Bell, FileText, HeadphonesIcon, LineChart, MessageCircle, Users } from "lucide-react";
import painelImg from "@/assets/painel-aceleriq-online.png";
import comunidadeImg from "@/assets/comunidade-whatsapp-aceleriq.jpg";

const PAINEL_URL = "https://aceleriq.online";

export function PainelComunidade() {
  return (
    <section
      id="painel-comunidade"
      className="relative py-20 md:py-28 lg:py-32 overflow-hidden bg-background"
    >
      {/* ambient grid + glow */}
      <div className="absolute inset-0 bg-grid-tech opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-[28rem] h-[28rem] bg-primary/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -right-32 w-[28rem] h-[28rem] bg-primary/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="container-aceleriq relative z-10">
        {/* header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase py-1 border-b border-primary text-primary">
            03 // Operação ao Vivo
          </span>
          <h2 className="mt-6 text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.05]">
            <span className="text-white">Você opera com a gente.</span>
            <br />
            <span className="text-primary text-glow italic">Em tempo real.</span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-4 md:pl-6 max-w-2xl">
            Quem fecha com a Aceleriq não recebe relatório em PDF no fim do mês. Recebe um painel ao vivo, acompanhamento dedicado e acesso à comunidade onde estratégia, dados e bastidor circulam todos os dias.
          </p>
        </div>

        {/* PAINEL */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-24 md:mb-32">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/15 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute -inset-2 border border-primary/20 pointer-events-none" />
              <div className="absolute -top-3 -left-3 w-8 h-8 border-l-2 border-t-2 border-primary" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-r-2 border-b-2 border-primary" />
              <div className="relative overflow-hidden border border-white/10 shadow-2xl shadow-primary/10">
                <img
                  src={painelImg}
                  alt="Painel ao vivo Aceleriq: ROAS, CAC, pipeline e funil em tempo real"
                  width={1536}
                  height={1024}
                  loading="lazy"
                  className="w-full h-auto select-none"
                />
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-70" />
              </div>
              <div className="absolute -top-4 right-6 bg-black/85 backdrop-blur-md border border-primary/40 px-3 py-1.5 flex items-center gap-2 shadow-[0_0_30px_rgba(20,255,0,0.2)]">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase">Ao Vivo</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-5">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary">Painel do Cliente</span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
              ROAS, CAC e pipeline,
              <br />
              <span className="text-primary text-glow italic">sem precisar pedir.</span>
            </h3>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Centralizamos Google Ads, Meta Ads, CRM, automações e funil em um único painel ao vivo, com os mesmos números que o nosso time olha. Sem planilha, sem mistério, sem espera.
            </p>
            <ul className="mt-7 space-y-3.5">
              {[
                { icon: LineChart, label: "Receita, ROAS, CAC e LTV atualizados em tempo real" },
                { icon: Users, label: "Funil completo: visitante, lead, MQL, SQL e cliente" },
                { icon: Bell, label: "Alertas quando uma métrica sai da meta" },
                { icon: Sparkles, label: "Reuniões semanais de leitura com seu growth manager" },
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

        {/* COMUNIDADE */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <MessageCircle className="h-5 w-5 text-primary" />
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary">Comunidade Aceleriq</span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
              Entre no grupo onde o
              <br />
              <span className="text-primary text-glow italic">jogo acontece.</span>
            </h3>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Acesso ao grupo de WhatsApp da Aceleriq: estudos de caso reais, automações prontas, playbooks de tráfego, IA e vendas, e network direto com empresas que estão escalando agora.
            </p>
            <ul className="mt-7 space-y-3.5">
              {[
                "Playbooks de IA, automação e tráfego liberados toda semana",
                "Cases reais de clientes (com números) antes de virarem público",
                "Pré-lançamentos de ferramentas e templates internos",
                "Network com fundadores, marketers e operadores B2B",
              ].map((label) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 bg-primary shrink-0" />
                  <span className="text-sm md:text-base text-foreground/85 leading-relaxed">{label}</span>
                </li>
              ))}
            </ul>

            <a
              href={COMUNIDADE_URL}
              target="_blank"
              rel="noreferrer"
              className="group mt-8 inline-flex items-center gap-3 btn-tech"
            >
              <span>Entrar na comunidade</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <p className="mt-3 font-mono text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
              aceleriq.online
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/15 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute -inset-2 border border-primary/20 pointer-events-none" />
              <div className="absolute -top-3 -left-3 w-8 h-8 border-l-2 border-t-2 border-primary" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-r-2 border-b-2 border-primary" />
              <div className="relative overflow-hidden border border-white/10 shadow-2xl shadow-primary/10">
                <img
                  src={comunidadeImg}
                  alt="Comunidade Aceleriq no WhatsApp: playbooks, cases e network"
                  width={1536}
                  height={1024}
                  loading="lazy"
                  className="w-full h-auto select-none"
                />
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-70" />
              </div>
              <div className="absolute -top-4 left-6 bg-black/85 backdrop-blur-md border border-primary/40 px-3 py-1.5 flex items-center gap-2 shadow-[0_0_30px_rgba(20,255,0,0.2)]">
                <Users className="h-3.5 w-3.5 text-primary" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase">Membros Ativos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
