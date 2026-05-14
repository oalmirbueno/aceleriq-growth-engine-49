import { motion } from "framer-motion";

/**
 * Multi-widget perspective stack for the Agência page.
 * Mixes white + dark + neon panels in 3D depth.
 */
export function AgenciaHero() {
  return (
    <div className="relative mx-auto h-[520px] w-full max-w-[640px] [perspective:1600px]">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 blur-3xl"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(85% 0.2 145 / 0.22), transparent 70%)" }}
      />

      {/* Big WHITE summary card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: [0, -10, 0] }}
        transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.6 } }}
        style={{ transformStyle: "preserve-3d", transform: "rotateY(14deg)" }}
        className="absolute left-0 top-8 w-[320px] rounded-2xl border border-foreground/10 bg-foreground p-6 text-background shadow-[0_30px_60px_-20px_oklch(0%_0_0/0.7)]"
      >
        <div className="flex items-center justify-between">
          <div className="font-mono text-[9px] uppercase tracking-[0.25em] opacity-60">
            squad · cliente x
          </div>
          <span className="rounded-full bg-primary px-2 py-0.5 font-mono text-[8px] uppercase tracking-widest text-background">
            on fire
          </span>
        </div>
        <div className="mt-4 font-display text-5xl font-bold tracking-[-0.04em]">
          R$ 1,2M
        </div>
        <div className="text-[11px] opacity-70">Receita atribuída no trimestre</div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            { l: "MQL", v: "248", d: "+22%" },
            { l: "SQL", v: "94", d: "+41%" },
            { l: "Won", v: "31", d: "+58%" },
          ].map((k, i) => (
            <motion.div
              key={k.l}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.12 }}
              className="border-t border-background/20 pt-2"
            >
              <div className="font-display text-xl font-bold tracking-[-0.03em]">{k.v}</div>
              <div className="font-mono text-[9px] uppercase opacity-60">{k.l}</div>
              <div className="font-mono text-[9px] text-primary">{k.d}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* GREEN squad card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: [0, 12, 0] }}
        transition={{ y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.4 }, opacity: { duration: 0.6 } }}
        style={{ transformStyle: "preserve-3d", transform: "rotateY(-10deg) translateZ(60px)" }}
        className="absolute right-0 top-0 w-[240px] rounded-2xl p-5 shadow-[0_30px_60px_-15px_oklch(85%_0.2_145/0.5)]"
      >
        <div
          className="absolute inset-0 -z-10 rounded-2xl"
          style={{ background: "linear-gradient(160deg, oklch(85% 0.2 145 / 0.95), oklch(75% 0.18 155 / 0.85))" }}
        />
        <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-background/70">
          time aceleriq · live
        </div>
        <div className="mt-3 space-y-2">
          {[
            { n: "Estratégia", c: "AT" },
            { n: "Mídia paga", c: "RS" },
            { n: "Conteúdo", c: "MV" },
            { n: "Dev / IA", c: "JL" },
          ].map((p) => (
            <div key={p.n} className="flex items-center gap-2 rounded-md bg-background/15 px-2 py-1.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-background font-mono text-[9px] font-bold text-foreground">
                {p.c}
              </div>
              <div className="text-[11px] font-medium text-background">{p.n}</div>
              <span className="ml-auto h-1.5 w-1.5 animate-pulse rounded-full bg-background" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* DARK calendar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: [0, -8, 0] }}
        transition={{ y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }, opacity: { duration: 0.6, delay: 0.2 } }}
        style={{ transform: "translateZ(20px) rotateX(4deg)" }}
        className="absolute bottom-8 right-8 w-[300px] rounded-2xl border border-border bg-[#0d0d0d] p-5 shadow-[0_30px_60px_-20px_oklch(0%_0_0/0.9)]"
      >
        <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary">
          ritmo semanal
        </div>
        <div className="mt-3 grid grid-cols-7 gap-1.5">
          {Array.from({ length: 28 }).map((_, i) => {
            const intensity = [0.1, 0.2, 0.4, 0.7, 1][Math.floor(Math.random() * 5)];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.015 }}
                className="aspect-square rounded-sm"
                style={{ background: `oklch(85% 0.2 145 / ${intensity})` }}
              />
            );
          })}
        </div>
        <div className="mt-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-muted-foreground/70">
          <span>4 semanas</span>
          <span className="text-primary">142 entregas</span>
        </div>
      </motion.div>
    </div>
  );
}
