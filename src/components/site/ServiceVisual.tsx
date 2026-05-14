import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import heroSites from "@/assets/hero-sites.jpg";
import heroTrafego from "@/assets/hero-trafego.jpg";
import heroIA from "@/assets/hero-ia.jpg";
import heroAgencia from "@/assets/hero-agencia.jpg";

export type ServiceVariant = "sites" | "trafego" | "ia" | "agencia";

const IMAGES: Record<ServiceVariant, string> = {
  sites: heroSites,
  trafego: heroTrafego,
  ia: heroIA,
  agencia: heroAgencia,
};

const LABELS: Record<ServiceVariant, { tag: string; sub: string }> = {
  sites: { tag: "site_engine.live", sub: "// rendering preview" },
  trafego: { tag: "ads_dashboard.live", sub: "// streaming metrics" },
  ia: { tag: "agent_console.live", sub: "// inference active" },
  agencia: { tag: "ops_center.live", sub: "// 24 squads online" },
};

/**
 * Hero visual: cinematic 4K image inside a glass browser frame
 * with an animated overlay specific to the service variant.
 * Drop-in next to the headline (lg:col-span-5 typically).
 */
export function ServiceVisual({ variant }: { variant: ServiceVariant }) {
  const meta = LABELS[variant];
  return (
    <div className="relative">
      {/* Outer glow */}
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, oklch(85% 0.2 145 / 0.25), transparent 65%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 1200 }}
        className="relative overflow-hidden border border-border/60 bg-card/30 shadow-[0_40px_80px_-20px_oklch(0%_0_0/0.8)]"
      >
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-border/60 bg-background/40 px-4 py-2.5 backdrop-blur">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80">
            {meta.tag}
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-primary/80">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping bg-primary opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 bg-primary" />
            </span>
            LIVE
          </div>
        </div>

        {/* Image canvas */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={IMAGES[variant]}
            alt={`Aceleriq ${variant}`}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-tr from-background/60 via-transparent to-background/30" />

          {/* Variant overlay */}
          <VariantOverlay variant={variant} />

          {/* Bottom mono caption */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-background/90 to-transparent px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/70">
            <span>{meta.sub}</span>
            <span className="text-primary">▲ + 312%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function VariantOverlay({ variant }: { variant: ServiceVariant }) {
  if (variant === "sites") return <SitesOverlay />;
  if (variant === "trafego") return <TrafegoOverlay />;
  if (variant === "ia") return <IAOverlay />;
  return <AgenciaOverlay />;
}

/* ----------------- Variant overlays ----------------- */

function SitesOverlay() {
  return (
    <div className="absolute inset-0 flex items-end p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="ml-auto w-[58%] space-y-2 rounded-none border border-primary/30 bg-background/70 p-4 backdrop-blur-md"
      >
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">
          lighthouse / core web vitals
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { l: "PERF", v: "98" },
            { l: "SEO", v: "100" },
            { l: "A11Y", v: "96" },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.12 }}
              className="border border-border/60 bg-background/40 px-2 py-2"
            >
              <div className="font-display text-2xl text-primary leading-none">{s.v}</div>
              <div className="mt-1 font-mono text-[8px] uppercase tracking-widest text-muted-foreground/70">
                {s.l}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function TrafegoOverlay() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1800);
    return () => clearInterval(id);
  }, []);
  const series = [12, 18, 14, 22, 28, 34, 30, 42, 48, 55, 62, 70];
  const max = Math.max(...series);

  return (
    <div className="absolute inset-0 flex items-end justify-end p-6">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="w-[60%] space-y-3 border border-primary/30 bg-background/70 p-4 backdrop-blur-md"
      >
        <div className="flex items-center justify-between">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">
            ROAS · 7d window
          </div>
          <motion.div key={tick} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-display text-base text-primary">
            6.8x
          </motion.div>
        </div>
        <div className="flex h-16 items-end gap-1">
          {series.map((v, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${(v / max) * 100}%` }}
              transition={{ delay: 0.7 + i * 0.04, duration: 0.5 }}
              className="flex-1 bg-gradient-to-t from-primary/40 to-primary"
            />
          ))}
        </div>
        <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-muted-foreground/70">
          <span>CPL R$ 12,40</span>
          <span className="text-primary">▼ -38%</span>
        </div>
      </motion.div>
    </div>
  );
}

function IAOverlay() {
  const messages = [
    { who: "agent", txt: "Lead qualificado · ICP A. Encaminhando." },
    { who: "user", txt: "Quero agendar reunião terça 14h" },
    { who: "agent", txt: "✓ Agendado · CRM atualizado" },
  ];
  return (
    <div className="absolute inset-0 flex items-end p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-[55%] space-y-2 border border-primary/30 bg-background/75 p-4 backdrop-blur-md"
      >
        <div className="flex items-center justify-between">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">
            agent / sdr_v3
          </div>
          <span className="font-mono text-[9px] text-muted-foreground/70">whatsapp · api</span>
        </div>
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: m.who === "user" ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 + i * 0.4 }}
            className={`flex ${m.who === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] border px-3 py-1.5 font-mono text-[10px] leading-snug ${
                m.who === "user"
                  ? "border-foreground/20 bg-foreground/5 text-foreground/80"
                  : "border-primary/40 bg-primary/10 text-primary"
              }`}
            >
              {m.txt}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function AgenciaOverlay() {
  return (
    <div className="absolute inset-0 grid grid-cols-2 gap-3 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="col-start-2 row-start-2 mt-auto space-y-2 border border-primary/30 bg-background/75 p-4 backdrop-blur-md"
      >
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">
          pipeline · q4
        </div>
        {[
          { l: "MQL", v: "248", d: "+22%" },
          { l: "SQL", v: "94", d: "+41%" },
          { l: "Won", v: "31", d: "+58%" },
        ].map((r, i) => (
          <motion.div
            key={r.l}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.12 }}
            className="flex items-center justify-between border-b border-border/60 pb-1.5 font-mono text-[10px] uppercase tracking-widest"
          >
            <span className="text-muted-foreground/70">{r.l}</span>
            <span className="text-foreground">{r.v}</span>
            <span className="text-primary">{r.d}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
