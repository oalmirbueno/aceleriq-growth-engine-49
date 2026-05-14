import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Floating 3D dashboard cards in perspective. Mix of dark + LIGHT (white) +
 * neon-green panels, each levitating independently. Used for Tráfego.
 */
export function DashboardHero() {
  return (
    <div className="relative mx-auto h-[520px] w-full max-w-[640px] [perspective:1600px]">
      {/* Glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 blur-3xl"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(85% 0.2 145 / 0.25), transparent 70%)" }}
      />

      {/* WHITE card — KPI sheet */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotateY: 25 }}
        animate={{ opacity: 1, y: [0, -10, 0], rotateY: 18 }}
        transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.6 }, rotateY: { duration: 1 } }}
        style={{ transformStyle: "preserve-3d" }}
        className="absolute left-0 top-12 w-[280px] rounded-2xl border border-foreground/10 bg-foreground p-5 text-background shadow-[0_30px_60px_-20px_oklch(0%_0_0/0.7)]"
      >
        <div className="font-mono text-[9px] uppercase tracking-[0.25em] opacity-60">
          campanha · meta ads
        </div>
        <div className="mt-3 font-display text-5xl font-bold tracking-[-0.04em]">
          R$ 84,2k
        </div>
        <div className="mt-1 text-[11px] opacity-70">Receita atribuída · 7d</div>
        <div className="mt-4 flex items-end gap-2">
          {[40, 55, 48, 70, 62, 88, 100].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h * 0.5}px` }}
              transition={{ delay: 0.4 + i * 0.07, duration: 0.6 }}
              className="flex-1 rounded-sm bg-background/85"
            />
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-widest opacity-60">
          <span>seg</span><span>dom</span>
        </div>
      </motion.div>

      {/* GREEN neon card — ROAS */}
      <motion.div
        initial={{ opacity: 0, y: -20, rotate: -3 }}
        animate={{ opacity: 1, y: [0, 12, 0], rotate: -3 }}
        transition={{ y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }, opacity: { duration: 0.6 } }}
        style={{ transformStyle: "preserve-3d", transform: "translateZ(60px)" }}
        className="absolute right-0 top-0 w-[230px] rounded-2xl border border-primary/40 p-5 shadow-[0_30px_60px_-15px_oklch(85%_0.2_145/0.5)]"
      >
        <div
          className="absolute inset-0 -z-10 rounded-2xl"
          style={{
            background: "linear-gradient(160deg, oklch(85% 0.2 145 / 0.95), oklch(75% 0.18 155 / 0.85))",
          }}
        />
        <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-background/70">
          roas
        </div>
        <div className="mt-3 flex items-baseline gap-1">
          <CountTo value={6.8} suffix="x" className="font-display text-6xl font-bold tracking-[-0.04em] text-background" />
        </div>
        <div className="mt-2 text-[11px] text-background/80">vs. baseline 2.1x</div>
        <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-background/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-background">
          ▲ 224%
        </div>
      </motion.div>

      {/* DARK card — funnel */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 6 }}
        animate={{ opacity: 1, y: [0, -8, 0], rotateX: 4 }}
        transition={{ y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }, opacity: { duration: 0.6, delay: 0.2 } }}
        style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
        className="absolute bottom-12 right-6 w-[300px] rounded-2xl border border-border bg-[#0d0d0d] p-5 shadow-[0_30px_60px_-20px_oklch(0%_0_0/0.9)]"
      >
        <div className="flex items-center justify-between">
          <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary">
            funil · q4
          </div>
          <span className="flex h-1.5 w-1.5">
            <span className="absolute h-1.5 w-1.5 animate-ping rounded-full bg-primary opacity-60" />
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
        </div>
        <div className="mt-4 space-y-2">
          {[
            { l: "Impressões", v: "412k", w: "100%" },
            { l: "Clicks", v: "38,2k", w: "70%" },
            { l: "Leads", v: "2.840", w: "42%" },
            { l: "MQL", v: "910", w: "26%" },
            { l: "Won", v: "184", w: "12%" },
          ].map((r, i) => (
            <motion.div
              key={r.l}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="space-y-1"
            >
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-muted-foreground/70 uppercase tracking-widest">{r.l}</span>
                <span className="text-foreground">{r.v}</span>
              </div>
              <div className="relative h-1 w-full overflow-hidden rounded-full bg-foreground/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: r.w }}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.7, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary/60 to-primary"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CPL chip — small floating */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
        transition={{ y: { duration: 4, repeat: Infinity }, opacity: { delay: 0.6 }, scale: { delay: 0.6 } }}
        style={{ transform: "translateZ(80px)" }}
        className="absolute left-16 bottom-0 rounded-xl border border-border bg-card/90 px-4 py-3 backdrop-blur-md shadow-[0_20px_40px_-15px_oklch(0%_0_0/0.8)]"
      >
        <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground/70">CPL médio</div>
        <div className="mt-1 flex items-baseline gap-1.5">
          <span className="font-display text-2xl font-bold tracking-[-0.03em] text-foreground">R$ 12,40</span>
          <span className="font-mono text-[10px] text-primary">▼ 38%</span>
        </div>
      </motion.div>
    </div>
  );
}

function CountTo({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setV(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span className={className}>{v.toFixed(1)}{suffix}</span>;
}
