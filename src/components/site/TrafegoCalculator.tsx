import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Terminal, Target, LineChart, Layers } from "lucide-react";

/**
 * Tráfego — Projeção em formato de console / IDE.
 * Sem cara de "cloud/IA". Estética de código: terminal, syntax highlight,
 * monospace, números crus, certificações reais das plataformas.
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
      {/* ============ CERTIFICAÇÕES / PLATAFORMAS ============ */}
      <section className="relative px-6 lg:px-16 py-16 md:py-20 border-t border-border/60 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 mb-10">
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <PlatformCard name="Google Ads" badge="Partner" code="google" />
          <PlatformCard name="Meta Business" badge="Partner" code="meta" />
          <PlatformCard name="LinkedIn Ads" badge="Marketing" code="linkedin" />
          <PlatformCard name="TikTok Ads" badge="Manager" code="tiktok" />
        </div>
      </section>

      {/* ============ PROJEÇÃO — CONSOLE ============ */}
      <section className="relative px-6 lg:px-16 py-20 md:py-28 border-t border-border/60 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 mb-10">
          <div className="lg:col-span-2 font-mono text-[10px] text-primary uppercase tracking-[0.2em] lg:pt-2">
            ⌖ Projeção
          </div>
          <div className="lg:col-span-10">
            <h2 className="font-display text-2xl md:text-4xl lg:text-5xl uppercase leading-[1.05] tracking-[-0.035em]">
              Quanto sua mídia <em className="italic font-light text-primary">deveria gerar</em>?
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] text-muted-foreground leading-relaxed">
              Modelo executado em tempo real. Mexa nas variáveis abaixo e veja o output recompilar.
              Benchmarks reais de operação Aceleriq.
            </p>
          </div>
        </div>

        {/* Console window */}
        <div className="rounded-md overflow-hidden border border-primary/20 bg-[#070707] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
          {/* Title bar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-black/60">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="font-mono text-[10px] text-muted-foreground/70 tracking-widest uppercase flex items-center gap-2">
              <Terminal className="h-3 w-3" /> aceleriq ~ projection.ts
            </div>
            <div className="font-mono text-[10px] text-primary/70">● live</div>
          </div>

          <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
            {/* INPUT — code editor */}
            <div className="p-6 md:p-8 font-mono text-[13px] leading-[1.9]">
              <CodeLine n={1}><span className="text-muted-foreground/60">// inputs</span></CodeLine>
              <CodeLine n={2}>
                <span className="text-[#c586c0]">const</span>{" "}
                <span className="text-[#9cdcfe]">invest</span>{" "}
                <span className="text-muted-foreground/60">=</span>{" "}
                <span className="text-primary">{fmt(invest)}</span>
                <span className="text-muted-foreground/60">;</span>
              </CodeLine>
              <div className="pl-8 -mt-1 mb-3">
                <RangeInput value={invest} min={5000} max={150000} step={1000} onChange={setInvest} />
              </div>

              <CodeLine n={3}>
                <span className="text-[#c586c0]">const</span>{" "}
                <span className="text-[#9cdcfe]">ticket</span>{" "}
                <span className="text-muted-foreground/60">=</span>{" "}
                <span className="text-primary">{fmt(ticket)}</span>
                <span className="text-muted-foreground/60">;</span>
              </CodeLine>
              <div className="pl-8 -mt-1 mb-3">
                <RangeInput value={ticket} min={300} max={50000} step={100} onChange={setTicket} />
              </div>

              <CodeLine n={4}><span className="text-muted-foreground/60">// constants — benchmarks Aceleriq</span></CodeLine>
              <CodeLine n={5}>
                <span className="text-[#c586c0]">const</span>{" "}
                <span className="text-[#9cdcfe]">cpl</span>{" "}
                <span className="text-muted-foreground/60">=</span>{" "}
                <span className="text-primary">18</span>
                <span className="text-muted-foreground/60">; </span>
                <span className="text-muted-foreground/40">// R$ por lead</span>
              </CodeLine>
              <CodeLine n={6}>
                <span className="text-[#c586c0]">const</span>{" "}
                <span className="text-[#9cdcfe]">convRate</span>{" "}
                <span className="text-muted-foreground/60">=</span>{" "}
                <span className="text-primary">0.12</span>
                <span className="text-muted-foreground/60">; </span>
                <span className="text-muted-foreground/40">// lead → venda</span>
              </CodeLine>
              <CodeLine n={7}>&nbsp;</CodeLine>
              <CodeLine n={8}><span className="text-muted-foreground/60">// model</span></CodeLine>
              <CodeLine n={9}>
                <span className="text-[#9cdcfe]">leads</span>{" "}
                <span className="text-muted-foreground/60">=</span>{" "}
                <span className="text-[#9cdcfe]">invest</span>{" "}
                <span className="text-muted-foreground/60">/</span>{" "}
                <span className="text-[#9cdcfe]">cpl</span>
                <span className="text-muted-foreground/60">;</span>
              </CodeLine>
              <CodeLine n={10}>
                <span className="text-[#9cdcfe]">sales</span>{" "}
                <span className="text-muted-foreground/60">=</span>{" "}
                <span className="text-[#9cdcfe]">leads</span>{" "}
                <span className="text-muted-foreground/60">*</span>{" "}
                <span className="text-[#9cdcfe]">convRate</span>
                <span className="text-muted-foreground/60">;</span>
              </CodeLine>
              <CodeLine n={11}>
                <span className="text-[#9cdcfe]">revenue</span>{" "}
                <span className="text-muted-foreground/60">=</span>{" "}
                <span className="text-[#9cdcfe]">sales</span>{" "}
                <span className="text-muted-foreground/60">*</span>{" "}
                <span className="text-[#9cdcfe]">ticket</span>
                <span className="text-muted-foreground/60">;</span>
              </CodeLine>
            </div>

            {/* OUTPUT — terminal */}
            <div className="p-6 md:p-8 bg-[#050505] font-mono text-[13px] leading-[1.8]">
              <div className="text-muted-foreground/50 mb-3">$ aceleriq run projection.ts</div>

              <OutLine label="leads" value={fmt(leads)} unit="/mês" />
              <OutLine label="sales" value={fmt(sales)} unit="/mês" />
              <OutLine label="cac" value={`R$ ${fmt(cac)}`} unit="" />
              <OutLine label="roas" value={`${roas.toFixed(1)}x`} unit="" highlight />

              <div className="mt-5 pt-5 border-t border-white/5">
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60 mb-2">
                  → revenue.monthly
                </div>
                <motion.div
                  key={revenue}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="font-display text-4xl md:text-5xl font-bold tracking-[-0.04em] text-primary neon-text-glow"
                >
                  R$ {fmt(revenue)}
                </motion.div>
                <div className="mt-1 text-[11px] text-muted-foreground">
                  ≈ R$ {fmt(revenue * 12)} / ano em receita projetada
                </div>
              </div>

              <div className="mt-4 text-[10px] text-muted-foreground/40">
                <span className="text-primary/70">✓</span> compiled in 0.{(invest % 9) + 1}{(ticket % 9)}s · 0 errors
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/55">
          * projeção ilustrativa. Operação real depende de oferta, criativo, funil comercial e tempo de aprendizado de algoritmo.
        </p>
      </section>

      {/* ============ ESTRATÉGIA ============ */}
      <section className="relative px-6 lg:px-16 py-20 md:py-28 border-t border-border/60 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 mb-10">
          <div className="lg:col-span-2 font-mono text-[10px] text-primary uppercase tracking-[0.2em] lg:pt-2">
            ⌖ Estratégia
          </div>
          <div className="lg:col-span-10">
            <h2 className="font-display text-2xl md:text-4xl lg:text-5xl uppercase leading-[1.05] tracking-[-0.035em]">
              Não vendemos clique. <em className="italic font-light text-primary">Vendemos pipeline.</em>
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] text-muted-foreground leading-relaxed">
              Toda mídia é estruturada por estágio de funil, com hipótese de oferta,
              público, criativo e tracking conectado ao CRM.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <StrategyCard
            icon={<Target className="h-4 w-4" />}
            tag="01 / Topo"
            title="Demanda latente"
            items={["Vídeo curto + UGC", "Públicos amplos", "CPM otimizado", "Awareness por região"]}
          />
          <StrategyCard
            icon={<Layers className="h-4 w-4" />}
            tag="02 / Meio"
            title="Consideração"
            items={["Retargeting segmentado", "Cases e prova social", "Lookalikes 1-3%", "Comparativos"]}
          />
          <StrategyCard
            icon={<LineChart className="h-4 w-4" />}
            tag="03 / Fundo"
            title="Conversão"
            items={["Search alta intenção", "PMax com feed limpo", "CAPI + Enhanced Conv.", "Lances por valor"]}
          />
        </div>
      </section>
    </>
  );
}

/* ============ Sub-components ============ */

function CodeLine({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 text-foreground/90">
      <span className="select-none text-muted-foreground/30 w-5 text-right tabular-nums">{n}</span>
      <span className="flex-1">{children}</span>
    </div>
  );
}

function RangeInput({
  value, min, max, step, onChange,
}: {
  value: number; min: number; max: number; step: number; onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <input
      type="range"
      min={min} max={max} step={step} value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:rounded-sm [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-[0_0_12px_oklch(85%_0.2_145/0.7)] [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing"
      style={{
        background: `linear-gradient(to right, oklch(85% 0.2 145) 0%, oklch(85% 0.2 145) ${pct}%, oklch(20% 0 0) ${pct}%, oklch(20% 0 0) 100%)`,
        height: "2px",
      }}
    />
  );
}

function OutLine({ label, value, unit, highlight = false }: { label: string; value: string; unit: string; highlight?: boolean }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="text-muted-foreground/50 w-20">{label}</span>
      <span className="text-muted-foreground/30">→</span>
      <span className={`font-bold ${highlight ? "text-primary text-base" : "text-foreground"}`}>
        {value}
      </span>
      {unit && <span className="text-muted-foreground/40 text-[11px]">{unit}</span>}
    </div>
  );
}

function PlatformCard({ name, badge, code }: { name: string; badge: string; code: "google" | "meta" | "linkedin" | "tiktok" }) {
  return (
    <div className="group relative border border-border bg-card/30 hover:bg-card/50 hover:border-primary/30 transition-colors p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <PlatformLogo code={code} />
        <ShieldCheck className="h-4 w-4 text-primary" />
      </div>
      <div>
        <div className="font-display text-base font-bold tracking-tight text-foreground">{name}</div>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70 mt-0.5">
          Certified · {badge}
        </div>
      </div>
      <div className="font-mono text-[10px] text-muted-foreground/50">
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
          <path fill="#fff" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.3 0 .58.04.85.13V9.4a6.34 6.34 0 0 0-5.94 10.46A6.34 6.34 0 0 0 15.7 15.7V8.83a8.16 8.16 0 0 0 4.77 1.52V6.93c-.3 0-.59-.08-.88-.24z"/>
          <path fill="#FF004F" d="M19.59 6.69a4.83 4.83 0 0 1-1.5-1.4 4.83 4.83 0 0 1-1.04-2.85V2h-1.32v13.67A2.89 2.89 0 0 1 10.62 18a2.89 2.89 0 0 1-1.46-.4 2.89 2.89 0 0 0 4.21-2.45V1.48h3.46c0 .29.03.58.08.86a4.83 4.83 0 0 0 2.68 4.35z" opacity=".5"/>
        </svg>
      );
  }
}

function StrategyCard({ icon, tag, title, items }: { icon: React.ReactNode; tag: string; title: string; items: string[] }) {
  return (
    <div className="border border-border bg-card/30 p-6 hover:border-primary/30 hover:bg-card/50 transition-colors">
      <div className="flex items-center gap-2 text-primary mb-4">
        {icon}
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">{tag}</span>
      </div>
      <div className="font-display text-xl font-bold tracking-tight text-foreground mb-4">{title}</div>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it} className="font-mono text-[12px] text-muted-foreground flex gap-2">
            <span className="text-primary/60">→</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
