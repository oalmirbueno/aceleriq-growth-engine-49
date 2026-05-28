import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, TrendingUp, Target, LineChart, Layers, Sparkles } from "lucide-react";

/**
 * Tráfego — Projeção por nicho + certificações + estratégia.
 * Cards alinhados na mesma diagonal, paleta clara dominante,
 * benchmarks reais variando por vertical.
 */

type NicheKey = "servicos" | "ecommerce" | "imobiliario" | "saude" | "educacao" | "b2b";

const NICHES: Record<NicheKey, {
  label: string;
  cpl: number;        // R$ por lead
  convRate: number;   // lead → venda
  ticket: number;     // ticket médio sugerido
  ticketRange: [number, number];
  note: string;
}> = {
  servicos:    { label: "Serviços locais",    cpl: 22, convRate: 0.14, ticket: 1800,  ticketRange: [300, 15000],  note: "Demanda quente, ciclo curto" },
  ecommerce:   { label: "E-commerce",         cpl: 9,  convRate: 0.022,ticket: 280,   ticketRange: [80, 2500],    note: "Volume alto, ticket menor" },
  imobiliario: { label: "Imobiliário / Alto ticket", cpl: 65, convRate: 0.04, ticket: 28000, ticketRange: [5000, 200000], note: "Lead caro, ciclo consultivo" },
  saude:       { label: "Saúde / Estética",   cpl: 28, convRate: 0.18, ticket: 1200,  ticketRange: [200, 12000],  note: "Conversão por agendamento" },
  educacao:    { label: "Educação / Cursos",  cpl: 14, convRate: 0.08, ticket: 1900,  ticketRange: [300, 25000],  note: "Janela de matrícula" },
  b2b:         { label: "B2B / Tecnologia",   cpl: 95, convRate: 0.06, ticket: 18000, ticketRange: [2000, 150000],note: "Ciclo longo, qualificação comercial" },
};

export function TrafegoCalculator() {
  const [niche, setNiche] = useState<NicheKey>("servicos");
  const [invest, setInvest] = useState(15000);
  const cfg = NICHES[niche];
  const [ticket, setTicket] = useState(cfg.ticket);

  // ao trocar nicho, sugere ticket do nicho
  useMemo(() => { setTicket(cfg.ticket); }, [niche]); // eslint-disable-line

  const leads = Math.round(invest / cfg.cpl);
  const sales = Math.max(1, Math.round(leads * cfg.convRate));
  const revenue = sales * ticket;
  const returnIndex = revenue / Math.max(invest, 1);
  const acquisitionCost = sales > 0 ? Math.round(invest / sales) : 0;

  const fmt = (v: number) => v.toLocaleString("pt-BR");

  return (
    <>
      {/* ============ PLATAFORMAS QUE OPERAMOS ============ */}
      <section className="relative px-6 lg:px-16 py-20 md:py-28 max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-2 font-mono text-[10px] text-primary uppercase tracking-[0.2em] lg:pt-2">
            ⌖ Plataformas
          </div>
          <div className="lg:col-span-10">
            <h2 className="font-display text-2xl md:text-4xl uppercase leading-[1.05] tracking-[-0.035em]">
              Plataformas que <em className="italic font-light text-primary">operamos</em>
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] text-muted-foreground leading-relaxed">
              A Aceleriq estrutura campanhas e integrações nas principais plataformas de mídia,
              sempre conectando tráfego, página, CRM e atendimento.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 items-stretch">
          <PlatformCard name="Google Ads" code="google" />
          <PlatformCard name="Meta Ads" code="meta" />
          <PlatformCard name="LinkedIn Ads" code="linkedin" />
          <PlatformCard name="TikTok Ads" code="tiktok" />
          <PlatformCard name="Google Analytics" code="ga" />
          <PlatformCard name="Meta Pixel / CAPI" code="capi" />
        </div>
      </section>

      {/* ============ SIMULAÇÃO ============ */}
      <section className="relative px-6 lg:px-16 py-20 md:py-28 max-w-[1600px] mx-auto">
        <div
          aria-hidden
          className="absolute inset-x-0 top-12 bottom-12 -z-10 bg-[oklch(96%_0.02_145)]"
          style={{ clipPath: "polygon(0 4%, 100% 0, 100% 96%, 0 100%)" }}
        />

        <div className="grid lg:grid-cols-12 gap-8 mb-10">
          <div className="lg:col-span-2 font-mono text-[10px] text-primary uppercase tracking-[0.2em] lg:pt-2">
            ⌖ Simulação
          </div>
          <div className="lg:col-span-10">
            <h2 className="font-display text-2xl md:text-4xl lg:text-5xl uppercase leading-[1.05] tracking-[-0.035em] text-[oklch(15%_0_0)]">
              Simulação de cenário <em className="italic font-light text-[oklch(45%_0.18_145)]">para planejamento</em>.
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] text-[oklch(35%_0_0)] leading-relaxed">
              Use esta estimativa para visualizar volume de contatos, esforço comercial e necessidade
              de estrutura. O resultado real depende de oferta, atendimento, página, verba, CRM e
              qualidade do follow-up.
            </p>
          </div>

        </div>

        {/* Seletor de nicho */}
        <div className="mb-6 flex flex-wrap gap-2">
          {(Object.keys(NICHES) as NicheKey[]).map((k) => {
            const active = niche === k;
            return (
              <button
                key={k}
                onClick={() => setNiche(k)}
                className={`px-4 py-2 text-[12px] font-mono uppercase tracking-[0.15em] rounded-full border transition-all ${
                  active
                    ? "bg-[oklch(15%_0_0)] text-white border-transparent shadow-[0_8px_24px_-10px_rgba(0,0,0,0.4)]"
                    : "bg-white/70 text-[oklch(30%_0_0)] border-black/10 hover:border-[oklch(45%_0.18_145)] hover:text-[oklch(15%_0_0)]"
                }`}
              >
                {NICHES[k].label}
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-5 gap-5 items-stretch">
          {/* Controles */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <ControlCard
              label="Investimento mensal"
              value={`R$ ${fmt(invest)}`}
              hint="mídia bruta"
              min={5000} max={150000} step={1000}
              raw={invest} onChange={setInvest}
            />
            <ControlCard
              label="Ticket médio"
              value={`R$ ${fmt(ticket)}`}
              hint={`sugerido: R$ ${fmt(cfg.ticket)}`}
              min={cfg.ticketRange[0]} max={cfg.ticketRange[1]}
              step={Math.max(50, Math.round(cfg.ticketRange[1] / 200))}
              raw={ticket} onChange={setTicket}
            />

            {/* Referências aproximadas */}
            <div className="bg-white border border-black/8 p-6 relative shadow-[0_15px_40px_-25px_rgba(0,0,0,0.2)] flex-1"
                 style={{ clipPath: "polygon(0 4%, 100% 0, 100% 96%, 0 100%)" }}>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[oklch(45%_0_0)] mb-3 font-mono">
                Referências de planejamento · {cfg.label}
              </div>
              <div className="space-y-2 text-sm">
                <BenchRow k="Custo por contato estimado" v={`R$ ${cfg.cpl}`} />
                <BenchRow k="Contato → conversão" v={`${(cfg.convRate * 100).toFixed(1)}%`} />
                <BenchRow k="Janela típica" v="30 dias" />
              </div>
              <div className="mt-4 pt-4 border-t border-black/8 text-[11px] text-[oklch(50%_0_0)] italic">
                {cfg.note}
              </div>
            </div>
          </div>

          {/* Output */}
          <div
            className="lg:col-span-3 relative bg-white p-8 md:p-10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)] border border-black/5"
            style={{ clipPath: "polygon(0 3%, 100% 0, 100% 97%, 0 100%)" }}
          >
            <div className="flex items-start justify-between mb-8 gap-4">

              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-[oklch(45%_0.18_145)] font-mono mb-2">
                  → Cenário de oportunidades · mensal
                </div>
                <motion.div
                  key={leads}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="font-display text-5xl md:text-6xl font-bold tracking-[-0.045em] text-[oklch(15%_0_0)] leading-none"
                >
                  {fmt(leads)} <span className="text-2xl md:text-3xl font-light text-[oklch(40%_0_0)]">contatos potenciais</span>
                </motion.div>
                <div className="mt-3 text-sm text-[oklch(40%_0_0)] max-w-md leading-relaxed">
                  A simulação mostra volume potencial de demanda, não previsão de receita.
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-black/8 border border-black/10 overflow-hidden">
              <MetricCell label="Investimento estimado" value={`R$ ${fmt(invest)}`} unit="mensal" />
              <MetricCell label="Custo por contato estimado" value={`R$ ${cfg.cpl}`} unit="referência" />
              <MetricCell label="Volume potencial de contatos" value={fmt(leads)} unit="/mês" />
              <MetricCell label="Potenciais oportunidades comerciais" value={fmt(sales)} unit="/mês" />
            </div>

            <div className="mt-6 bg-[oklch(97%_0_0)] border border-black/8 p-5">
              <div className="text-[10px] uppercase tracking-[0.25em] text-[oklch(45%_0_0)] font-mono mb-2">
                Estrutura recomendada para atendimento
              </div>
              <div className="text-[14px] text-[oklch(25%_0_0)] leading-relaxed">
                Para sustentar esse volume com qualidade, sua operação precisa de
                CRM ativo, time ou agente respondendo em poucos minutos, scripts de qualificação
                e rotina de follow-up. Sem essa base, o investimento em mídia perde retorno.
              </div>
            </div>

            <div className="mt-8">
              <div className="text-[10px] uppercase tracking-[0.25em] text-[oklch(45%_0_0)] font-mono mb-3">
                funil estimado
              </div>
              <FunnelBar pct={100} label="Investimento" sub={`R$ ${fmt(invest)}`} tone="dark" />
              <FunnelBar pct={75} label="Contatos" sub={`${fmt(leads)} estimados`} tone="mid" />
              <FunnelBar pct={50} label="Oportunidades" sub={`${fmt(Math.round(leads * 0.4))} qualificadas`} tone="mid" />
              <FunnelBar pct={28} label="Conversões potenciais" sub={`${fmt(sales)} estimadas`} tone="green" />
            </div>

              <FunnelBar pct={28} label="Conversões" sub={`${fmt(sales)} potenciais`} tone="green" />
            </div>

            <div className="mt-6 rounded-md border border-[oklch(85%_0.05_60)] bg-[oklch(97%_0.03_85)] p-4 text-[12px] text-[oklch(35%_0.05_60)] leading-relaxed">
              <strong className="font-semibold">Aviso:</strong> esta simulação não garante resultado.
              Ela serve para orientar planejamento inicial e priorização estratégica. Os números são
              referências aproximadas e variam conforme oferta, criativo, atendimento, página, CRM e
              maturidade da operação.
            </div>
          </div>
        </div>
      </section>


      {/* ============ ESTRATÉGIA ============ */}
      <section className="relative px-6 lg:px-16 py-20 md:py-28 max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-2 font-mono text-[10px] text-primary uppercase tracking-[0.2em] lg:pt-2">
            ⌖ Estratégia
          </div>
          <div className="lg:col-span-10">
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.04em] uppercase">
              Não vendemos clique.
              <br />
              <span className="inline-flex items-center gap-3">
                <Sparkles className="h-7 w-7 md:h-10 md:w-10 text-primary" />
                <em className="italic font-light text-primary neon-text-glow">Vendemos pipeline.</em>
              </span>
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] text-muted-foreground leading-relaxed">
              Toda mídia é estruturada por estágio de funil, com hipótese de oferta,
              público, criativo e tracking conectado ao CRM.
            </p>
          </div>
        </div>

        {/* Cards alinhados, mesma diagonal */}
        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          <StrategyCard
            icon={<Target className="h-5 w-5" />}
            tag="01 / Topo"
            title="Demanda latente"
            items={["Vídeo curto + UGC", "Públicos amplos", "CPM otimizado", "Awareness por região"]}
            accent="dark"
          />
          <StrategyCard
            icon={<Layers className="h-5 w-5" />}
            tag="02 / Meio"
            title="Consideração"
            items={["Retargeting segmentado", "Cases e prova social", "Lookalikes 1-3%", "Comparativos"]}
            accent="light"
          />
          <StrategyCard
            icon={<LineChart className="h-5 w-5" />}
            tag="03 / Fundo"
            title="Conversão"
            items={["Search alta intenção", "PMax com feed limpo", "CAPI + Enhanced Conv.", "Lances por valor"]}
            accent="green"
          />
        </div>
      </section>
    </>
  );
}

/* ============ Sub-components ============ */

function ControlCard({
  label, value, hint, min, max, step, raw, onChange,
}: {
  label: string; value: string; hint: string;
  min: number; max: number; step: number;
  raw: number; onChange: (v: number) => void;
}) {
  const pct = ((raw - min) / (max - min)) * 100;
  return (
    <div className="bg-white border border-black/8 p-6 relative shadow-[0_10px_30px_-15px_rgba(0,0,0,0.15)]"
         style={{ clipPath: "polygon(0 4%, 100% 0, 100% 96%, 0 100%)" }}>
      <div className="flex items-baseline justify-between mb-1">
        <div className="text-[10px] uppercase tracking-[0.25em] text-[oklch(45%_0_0)] font-mono">{label}</div>
        <div className="text-[10px] text-[oklch(55%_0_0)]">{hint}</div>
      </div>
      <div className="font-display text-3xl font-bold tracking-tight text-[oklch(15%_0_0)] mb-4">
        {value}
      </div>
      <input
        type="range"
        min={min} max={max} step={step} value={raw}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[oklch(15%_0_0)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[oklch(85%_0.2_145)] [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_oklch(85%_0.2_145/0.18)] [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
        style={{
          background: `linear-gradient(to right, oklch(15% 0 0) 0%, oklch(45% 0.18 145) ${pct}%, oklch(90% 0 0) ${pct}%, oklch(90% 0 0) 100%)`,
          height: "4px",
          borderRadius: "999px",
        }}
      />
    </div>
  );
}

function BenchRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between items-baseline border-b border-black/8 pb-1.5">
      <span className="text-[oklch(45%_0_0)]">{k}</span>
      <span className="font-mono text-[oklch(35%_0.15_145)] font-semibold">{v}</span>
    </div>
  );
}

function MetricCell({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="bg-white p-5">
      <div className="text-[10px] uppercase tracking-[0.25em] text-[oklch(50%_0_0)] font-mono mb-1.5">
        {label}
      </div>
      <div className="font-display text-2xl md:text-3xl font-bold tracking-tight text-[oklch(15%_0_0)] leading-none">
        {value}
      </div>
      {unit && <div className="text-[11px] text-[oklch(55%_0_0)] mt-1">{unit}</div>}
    </div>
  );
}

function FunnelBar({ pct, label, sub, tone }: { pct: number; label: string; sub: string; tone: "dark" | "mid" | "green" }) {
  const fill =
    tone === "green" ? "oklch(60% 0.2 145)"
    : tone === "mid" ? "oklch(35% 0 0)"
    : "oklch(15% 0 0)";
  return (
    <div className="mb-2">
      <div className="flex justify-between items-baseline text-[12px] mb-1">
        <span className="text-[oklch(20%_0_0)] font-medium">{label}</span>
        <span className="text-[oklch(50%_0_0)] font-mono text-[11px]">{sub}</span>
      </div>
      <div className="h-2 bg-[oklch(94%_0_0)] overflow-hidden rounded-full">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: fill }}
        />
      </div>
    </div>
  );
}

type PlatformCode = "google" | "meta" | "linkedin" | "tiktok" | "ga" | "capi";


function PlatformCard({
  name, code,
}: {
  name: string;
  code: PlatformCode;
}) {
  return (
    <div
      className="group relative bg-white text-[oklch(15%_0_0)] border border-black/8 p-5 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-[oklch(45%_0.18_145)/0.5] shadow-[0_15px_40px_-20px_rgba(0,0,0,0.18)] h-full"
      style={{ clipPath: "polygon(0 6%, 100% 0, 100% 94%, 0 100%)" }}
    >
      <div className="flex items-center justify-between">
        <PlatformLogo code={code} />
        <ShieldCheck className="h-4 w-4 text-[oklch(45%_0.18_145)]/70" />
      </div>
      <div className="mt-auto">
        <div className="font-display text-sm md:text-base font-bold tracking-tight leading-tight">{name}</div>
        <div className="font-mono text-[9px] uppercase tracking-[0.18em] mt-1 text-[oklch(50%_0_0)]">
          Plataforma operada
        </div>
      </div>
    </div>
  );
}

function PlatformLogo({ code }: { code: PlatformCode }) {
  switch (code) {
    case "google":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09A6.97 6.97 0 0 1 5.47 12c0-.73.13-1.43.36-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 4.93l3.66-2.84z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
        </svg>
      );
    case "meta":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7">
          <path fill="#0866FF" d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95 0-5.52-4.48-10-10-10z"/>
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7">
          <path fill="#0A66C2" d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.34 17.34H5.67V9.67h2.67v7.67zM7 8.5a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1zm11.34 8.84h-2.67v-3.73c0-.89-.02-2.03-1.24-2.03-1.24 0-1.43.97-1.43 1.97v3.79h-2.67V9.67h2.56v1.05h.04c.36-.67 1.22-1.38 2.51-1.38 2.69 0 3.18 1.77 3.18 4.07v3.93z"/>
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7">
          <path fill="#111111" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.3 0 .58.04.85.13V9.4a6.34 6.34 0 0 0-5.94 10.46A6.34 6.34 0 0 0 15.7 15.7V8.83a8.16 8.16 0 0 0 4.77 1.52V6.93c-.3 0-.59-.08-.88-.24z"/>
        </svg>
      );
    case "ga":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7">
          <path fill="#F9AB00" d="M19.5 2A2.5 2.5 0 0 0 17 4.5v15a2.5 2.5 0 0 0 5 0v-15A2.5 2.5 0 0 0 19.5 2z"/>
          <path fill="#E37400" d="M12 9.5a2.5 2.5 0 0 0-2.5 2.5v7.5a2.5 2.5 0 0 0 5 0V12A2.5 2.5 0 0 0 12 9.5zM4.5 17a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"/>
        </svg>
      );
    case "capi":
      return (
        <svg viewBox="0 0 24 24" className="h-7 w-7">
          <path fill="#0866FF" d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-6l-4 4v-4H5a2 2 0 0 1-2-2V5z"/>
          <circle cx="8" cy="9.5" r="1.2" fill="#fff"/>
          <circle cx="12" cy="9.5" r="1.2" fill="#fff"/>
          <circle cx="16" cy="9.5" r="1.2" fill="#fff"/>
        </svg>
      );
  }
}


function StrategyCard({
  icon, tag, title, items, accent,
}: {
  icon: React.ReactNode; tag: string; title: string; items: string[];
  accent: "light" | "dark" | "green";
}) {
  // todos com fundo claro dominante; o "accent" só muda a barrinha lateral e ícones
  const accentColor =
    accent === "green" ? "oklch(60% 0.2 145)"
    : accent === "dark" ? "oklch(15% 0 0)"
    : "oklch(45% 0.18 145)";

  return (
    <div
      className="relative bg-white text-[oklch(15%_0_0)] p-7 md:p-8 transition-all duration-300 hover:-translate-y-1 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.22)] border border-black/8 h-full overflow-hidden"
      style={{ clipPath: "polygon(0 5%, 100% 0, 100% 95%, 0 100%)" }}
    >
      <div className="absolute left-0 top-[5%] bottom-[5%] w-[3px]" style={{ background: accentColor }} />
      <div className="flex items-center gap-2 mb-5" style={{ color: accentColor }}>
        {icon}
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">{tag}</span>
      </div>
      <div className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-5 leading-tight">{title}</div>
      <ul className="space-y-2.5">
        {items.map((it) => (
          <li key={it} className="text-[13px] flex gap-2.5 leading-snug text-[oklch(40%_0_0)]">
            <span style={{ color: accentColor }}>→</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
