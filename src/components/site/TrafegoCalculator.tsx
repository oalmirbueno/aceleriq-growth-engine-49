import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

/**
 * Live ROI calculator. User drags investment & average ticket; sees projected
 * leads, sales, revenue, ROAS in real time. Tactile, colorful, instant.
 */
export function TrafegoCalculator() {
  const [invest, setInvest] = useState(15000);
  const [ticket, setTicket] = useState(2500);

  // Simple model: assume CPL ~ R$ 18, conversion lead→sale 12% (premium agency baseline)
  const cpl = 18;
  const convRate = 0.12;
  const leads = Math.round(invest / cpl);
  const sales = Math.round(leads * convRate);
  const revenue = sales * ticket;
  const roas = revenue / Math.max(invest, 1);
  const cac = sales > 0 ? Math.round(invest / sales) : 0;

  return (
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
            Mexa nos sliders e veja a projeção atualizar ao vivo.
            Modelo baseado em benchmarks reais de operação Aceleriq.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-8 border border-border bg-card/20 p-8">
          <Slider
            label="Investimento mensal em mídia"
            value={invest}
            min={5000}
            max={150000}
            step={1000}
            onChange={setInvest}
            format={(v) => `R$ ${v.toLocaleString("pt-BR")}`}
          />
          <Slider
            label="Ticket médio do cliente"
            value={ticket}
            min={300}
            max={50000}
            step={100}
            onChange={setTicket}
            format={(v) => `R$ ${v.toLocaleString("pt-BR")}`}
          />

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
            <Stat label="CPL projetado" value={`R$ ${cpl}`} sub="benchmark Aceleriq" />
            <Stat label="Conversão lead→venda" value={`${(convRate * 100).toFixed(0)}%`} sub="time comercial padrão" />
          </div>
        </div>

        {/* Output */}
        <div className="relative grid grid-cols-2 gap-3">
          {/* Revenue — light card */}
          <motion.div
            key={revenue}
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            className="col-span-2 bg-foreground p-6 text-background"
          >
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] opacity-60">
              <TrendingUp className="h-3 w-3" />
              Receita projetada / mês
            </div>
            <div className="mt-2 font-display text-5xl md:text-6xl font-bold tracking-[-0.04em]">
              R$ {revenue.toLocaleString("pt-BR")}
            </div>
            <div className="mt-1 text-[12px] opacity-70">
              {sales} vendas a R$ {ticket.toLocaleString("pt-BR")} ticket médio
            </div>
          </motion.div>

          {/* ROAS — green */}
          <motion.div
            key={roas}
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            className="relative overflow-hidden p-6"
          >
            <div className="absolute inset-0 -z-10"
              style={{ background: "linear-gradient(160deg, oklch(85% 0.2 145), oklch(75% 0.18 155))" }}
            />
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-background/70">ROAS</div>
            <div className="mt-2 font-display text-4xl font-bold tracking-[-0.04em] text-background">
              {roas.toFixed(1)}x
            </div>
            <div className="mt-1 text-[11px] text-background/80">retorno sobre mídia</div>
          </motion.div>

          {/* Leads — dark */}
          <Stat label="Leads / mês" value={leads.toLocaleString("pt-BR")} sub="captados" big />
          <Stat label="Vendas / mês" value={sales.toString()} sub={`CAC R$ ${cac.toLocaleString("pt-BR")}`} big />
          <Stat label="Receita / ano" value={`R$ ${(revenue * 12).toLocaleString("pt-BR")}`} sub="se mantiver constância" big />
        </div>
      </div>

      <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/55">
        * projeção ilustrativa. Operação real depende de oferta, criativo, funil comercial e tempo de aprendizado de algoritmo.
      </p>
    </section>
  );
}

function Slider({
  label, value, min, max, step, onChange, format,
}: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; format: (v: number) => string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">
          {label}
        </label>
        <span className="font-display text-2xl font-bold tracking-[-0.03em] text-primary">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-[0_0_18px_oklch(85%_0.2_145/0.8)] [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full"
        style={{
          background: `linear-gradient(to right, oklch(85% 0.2 145) 0%, oklch(85% 0.2 145) ${pct}%, oklch(25% 0 0) ${pct}%, oklch(25% 0 0) 100%)`,
          height: "4px",
          borderRadius: "999px",
        }}
      />
    </div>
  );
}

function Stat({ label, value, sub, big = false }: { label: string; value: string; sub: string; big?: boolean }) {
  return (
    <div className="border border-border bg-[#0d0d0d] p-5">
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">
        {label}
      </div>
      <div className={`mt-2 font-display ${big ? "text-2xl md:text-3xl" : "text-xl"} font-bold tracking-[-0.03em] text-foreground`}>
        {value}
      </div>
      <div className="mt-1 text-[11px] text-muted-foreground">{sub}</div>
    </div>
  );
}
