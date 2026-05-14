import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, TrendingUp, Target, LineChart, Layers, Sparkles } from "lucide-react";

/**
 * Tráfego — Projeção visual moderna + certificações + estratégia
 * Sem cara de terminal/IA. Cards com cortes diagonais, fundos alternados
 * (branco/preto), tipografia editorial, números grandes, interação fluida.
 */
export function TrafegoCalculator() {
  const [invest, setInvest] = useState(15000);
  const [ticket, setTicket] = useState(2500);

  const cpl = 18;
  const convRate = 0.12;
  const leads = Math.round(invest / cpl);
  const sales = Math.round(leads * convRate);
  const revenue = sales * ticket;
  const roas = revenue / Math.max(invest, 1);
  const cac = sales > 0 ? Math.round(invest / sales) : 0;

  const fmt = (v: number) => v.toLocaleString("pt-BR");

  return (
    <>
      {/* ============ CERTIFICAÇÕES ============ */}
      <section className="relative px-6 lg:px-16 py-20 md:py-28 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-2 font-mono text-[10px] text-primary uppercase tracking-[0.2em] lg:pt-2">
            ⌖ Certificações
          </div>
          <div className="lg:col-span-10">
            <h2 className="font-display text-2xl md:text-4xl uppercase leading-[1.05] tracking-[-0.035em]">
              Agência <em className="italic font-light text-primary">credenciada</em> nas plataformas que importam
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] text-muted-foreground leading-relaxed">
              Acesso direto a suporte estratégico, betas de produto e benchmarks por vertical.
              Sem intermediário, sem revenda.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5" style={{ transform: "rotate(-1deg)" }}>
          <PlatformCard name="Google Ads" badge="Partner" code="google" variant="light" />
          <PlatformCard name="Meta Business" badge="Partner" code="meta" variant="dark" />
          <PlatformCard name="LinkedIn Ads" badge="Marketing" code="linkedin" variant="dark" />
          <PlatformCard name="TikTok Ads" badge="Manager" code="tiktok" variant="light" />
        </div>
      </section>

      {/* ============ PROJEÇÃO — visual moderno ============ */}
      <section className="relative px-6 lg:px-16 py-20 md:py-28 max-w-7xl mx-auto">
        {/* faixa diagonal de fundo */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-12 bottom-12 -z-10 bg-[oklch(96%_0.02_145)]"
          style={{ clipPath: "polygon(0 4%, 100% 0, 100% 96%, 0 100%)" }}
        />

        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-2 font-mono text-[10px] text-primary uppercase tracking-[0.2em] lg:pt-2">
            ⌖ Projeção
          </div>
          <div className="lg:col-span-10">
            <h2 className="font-display text-2xl md:text-4xl lg:text-5xl uppercase leading-[1.05] tracking-[-0.035em] text-[oklch(15%_0_0)]">
              Quanto sua mídia <em className="italic font-light text-[oklch(45%_0.18_145)]">deveria gerar</em>?
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] text-[oklch(35%_0_0)] leading-relaxed">
              Mexa nas variáveis e veja a projeção em tempo real. Benchmarks reais de operação Aceleriq.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-5">
          {/* Coluna esquerda — controles */}
          <div className="lg:col-span-2 space-y-4">
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
              hint="receita por venda"
              min={300} max={50000} step={100}
              raw={ticket} onChange={setTicket}
            />

            <div className="bg-[oklch(15%_0_0)] text-white p-6 relative overflow-hidden rounded-[20px]"
                 style={{ clipPath: "polygon(0 0, 100% 3%, 100% 100%, 0 97%)" }}>
              <div className="text-[10px] uppercase tracking-[0.25em] text-white/50 mb-2 font-mono">
                benchmarks aplicados
              </div>
              <div className="space-y-1.5 text-sm">
                <BenchRow k="CPL médio" v="R$ 18" />
                <BenchRow k="Lead → venda" v="12%" />
                <BenchRow k="Janela" v="30 dias" />
              </div>
            </div>
          </div>

          {/* Coluna direita — output visual */}
          <div className="lg:col-span-3 relative bg-white p-8 md:p-10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)] border border-black/5">
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-[oklch(45%_0.18_145)] font-mono mb-2">
                  → receita projetada · mensal
                </div>
                <motion.div
                  key={revenue}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="font-display text-5xl md:text-7xl font-bold tracking-[-0.045em] text-[oklch(15%_0_0)] leading-none"
                >
                  R$ {fmt(revenue)}
                </motion.div>
                <div className="mt-2 text-sm text-[oklch(40%_0_0)]">
                  ≈ <span className="font-semibold text-[oklch(20%_0_0)]">R$ {fmt(revenue * 12)}</span> / ano
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[oklch(95%_0.05_145)] border border-[oklch(85%_0.18_145)/0.4]">
                <TrendingUp className="h-3.5 w-3.5 text-[oklch(45%_0.18_145)]" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-[oklch(35%_0.15_145)]">
                  {roas.toFixed(1)}x ROAS
                </span>
              </div>
            </div>

            {/* Métricas em grade */}
            <div className="grid grid-cols-3 gap-px bg-black/8 border-t border-b border-black/10 -mx-8 md:-mx-10 px-0">
              <MetricCell label="Leads" value={fmt(leads)} unit="/mês" />
              <MetricCell label="Vendas" value={fmt(sales)} unit="/mês" />
              <MetricCell label="CAC" value={`R$ ${fmt(cac)}`} unit="" />
            </div>

            {/* Barra de funil */}
            <div className="mt-8">
              <div className="text-[10px] uppercase tracking-[0.25em] text-[oklch(45%_0_0)] font-mono mb-3">
                funil
              </div>
              <FunnelBar pct={100} label="Investimento" sub={`R$ ${fmt(invest)}`} tone="dark" />
              <FunnelBar pct={75} label="Leads" sub={`${fmt(leads)} contatos`} tone="mid" />
              <FunnelBar pct={50} label="Oportunidades" sub={`${fmt(Math.round(leads * 0.4))} qualificadas`} tone="mid" />
              <FunnelBar pct={28} label="Vendas" sub={`${fmt(sales)} fechadas`} tone="green" />
            </div>

            <p className="mt-6 text-[11px] text-[oklch(50%_0_0)]">
              * Projeção ilustrativa. Resultado real depende de oferta, criativo, funil comercial e maturidade do algoritmo.
            </p>
          </div>
        </div>
      </section>

      {/* ============ ESTRATÉGIA ============ */}
      <section className="relative px-6 lg:px-16 py-20 md:py-28 max-w-7xl mx-auto">
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

        <div className="grid md:grid-cols-3 gap-5">
          <StrategyCard
            icon={<Target className="h-5 w-5" />}
            tag="01 / Topo"
            title="Demanda latente"
            items={["Vídeo curto + UGC", "Públicos amplos", "CPM otimizado", "Awareness por região"]}
            tilt={-1}
            variant="dark"
          />
          <StrategyCard
            icon={<Layers className="h-5 w-5" />}
            tag="02 / Meio"
            title="Consideração"
            items={["Retargeting segmentado", "Cases e prova social", "Lookalikes 1-3%", "Comparativos"]}
            tilt={0.6}
            variant="light"
          />
          <StrategyCard
            icon={<LineChart className="h-5 w-5" />}
            tag="03 / Fundo"
            title="Conversão"
            items={["Search alta intenção", "PMax com feed limpo", "CAPI + Enhanced Conv.", "Lances por valor"]}
            tilt={-0.4}
            variant="green"
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
    <div className="bg-white border border-black/8 p-6 relative overflow-hidden shadow-[0_10px_30px_-15px_rgba(0,0,0,0.15)]"
         style={{ clipPath: "polygon(0 0, 100% 2%, 100% 98%, 0 100%)" }}>
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
    <div className="flex justify-between items-baseline border-b border-white/8 pb-1.5">
      <span className="text-white/60">{k}</span>
      <span className="font-mono text-primary">{v}</span>
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
      <div className="h-2 bg-[oklch(94%_0_0)] overflow-hidden"
           style={{ clipPath: "polygon(0 0, 100% 0, 99% 100%, 0 100%)" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full"
          style={{ background: fill }}
        />
      </div>
    </div>
  );
}

function PlatformCard({
  name, badge, code, tilt, variant,
}: {
  name: string; badge: string;
  code: "google" | "meta" | "linkedin" | "tiktok";
  tilt: number;
  variant: "light" | "dark";
}) {
  const isDark = variant === "dark";
  return (
    <div
      className={`group relative p-6 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1 ${
        isDark
          ? "bg-[oklch(12%_0_0)] text-white border border-white/8 hover:border-primary/40"
          : "bg-white text-[oklch(15%_0_0)] border border-black/8 hover:border-primary/40 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.2)]"
      }`}
      style={{
        transform: `rotate(${tilt}deg)`,
        clipPath: "polygon(0 0, 100% 4%, 100% 100%, 0 96%)",
      }}
    >
      <div className="flex items-center justify-between">
        <PlatformLogo code={code} />
        <ShieldCheck className={`h-4 w-4 ${isDark ? "text-primary" : "text-[oklch(45%_0.18_145)]"}`} />
      </div>
      <div>
        <div className="font-display text-base font-bold tracking-tight">{name}</div>
        <div className={`font-mono text-[10px] uppercase tracking-[0.2em] mt-0.5 ${isDark ? "text-white/50" : "text-[oklch(50%_0_0)]"}`}>
          Certified · {badge}
        </div>
      </div>
      <div className={`font-mono text-[10px] ${isDark ? "text-white/35" : "text-[oklch(60%_0_0)]"}`}>
        ID: AQ-{code.toUpperCase().slice(0, 3)}-{(code.length * 4721).toString().slice(0, 4)}
      </div>
    </div>
  );
}

function PlatformLogo({ code }: { code: "google" | "meta" | "linkedin" | "tiktok" }) {
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
          <path fill="currentColor" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.3 0 .58.04.85.13V9.4a6.34 6.34 0 0 0-5.94 10.46A6.34 6.34 0 0 0 15.7 15.7V8.83a8.16 8.16 0 0 0 4.77 1.52V6.93c-.3 0-.59-.08-.88-.24z"/>
        </svg>
      );
  }
}

function StrategyCard({
  icon, tag, title, items, tilt, variant,
}: {
  icon: React.ReactNode; tag: string; title: string; items: string[];
  tilt: number;
  variant: "light" | "dark" | "green";
}) {
  const styles =
    variant === "green"
      ? "bg-[oklch(85%_0.2_145)] text-[oklch(12%_0_0)]"
      : variant === "light"
      ? "bg-white text-[oklch(15%_0_0)] shadow-[0_20px_50px_-25px_rgba(0,0,0,0.25)]"
      : "bg-[oklch(12%_0_0)] text-white border border-white/8";

  const iconColor = variant === "green" ? "text-[oklch(20%_0_0)]" : variant === "light" ? "text-[oklch(45%_0.18_145)]" : "text-primary";
  const muted = variant === "green" ? "text-[oklch(25%_0_0)]" : variant === "light" ? "text-[oklch(45%_0_0)]" : "text-white/65";

  return (
    <div
      className={`relative p-7 md:p-8 transition-all duration-300 hover:-translate-y-1 ${styles}`}
      style={{
        transform: `rotate(${tilt}deg)`,
        clipPath: "polygon(0 0, 100% 3%, 100% 100%, 0 97%)",
      }}
    >
      <div className={`flex items-center gap-2 mb-5 ${iconColor}`}>
        {icon}
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">{tag}</span>
      </div>
      <div className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-5 leading-tight">{title}</div>
      <ul className="space-y-2.5">
        {items.map((it) => (
          <li key={it} className={`text-[13px] flex gap-2.5 leading-snug ${muted}`}>
            <span className={iconColor}>→</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
