import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * 3D MacBook centered. Lid opens with Aceleriq logo, then reveals a scrolling
 * site mockup (pure HTML, no images of code) running inside the screen.
 * Tilts subtly with cursor for "alive" feel.
 */
export function MacBookHero() {
  const [opened, setOpened] = useState(false);
  const [phase, setPhase] = useState<"logo" | "site">("logo");
  const ref = useRef<HTMLDivElement>(null);

  const rx = useSpring(useMotionValue(0), { stiffness: 80, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 80, damping: 18 });

  useEffect(() => {
    const t1 = setTimeout(() => setOpened(true), 250);
    const t2 = setTimeout(() => setPhase("site"), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      ry.set(px * 12);
      rx.set(-py * 8);
    };
    const onLeave = () => { rx.set(0); ry.set(0); };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [rx, ry]);

  const lidRotate = useTransform(useMotionValue(opened ? 1 : 0), [0, 1], [-95, 0]);

  return (
    <div
      ref={ref}
      className="relative mx-auto w-full max-w-[820px] [perspective:1800px]"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Floor reflection glow */}
      <div
        aria-hidden
        className="absolute -bottom-10 left-1/2 h-[120px] w-[80%] -translate-x-1/2 rounded-[100%] blur-3xl"
        style={{ background: "radial-gradient(ellipse, oklch(85% 0.2 145 / 0.35), transparent 70%)" }}
      />

      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative"
      >
        {/* LID */}
        <motion.div
          initial={{ rotateX: -95 }}
          animate={{ rotateX: opened ? 0 : -95 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            transformOrigin: "50% 100%",
            transformStyle: "preserve-3d",
          }}
          className="relative aspect-[16/10.4] w-full rounded-t-2xl border border-foreground/15 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] p-2 shadow-[0_30px_80px_-20px_oklch(0%_0_0/0.9)]"
        >
          {/* Bezel */}
          <div className="relative h-full w-full overflow-hidden rounded-lg bg-black ring-1 ring-foreground/10">
            {/* Camera notch */}
            <div className="absolute left-1/2 top-1.5 z-20 h-1 w-16 -translate-x-1/2 rounded-full bg-black">
              <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/30" />
            </div>

            {/* Screen content */}
            <div className="relative h-full w-full overflow-hidden">
              {phase === "logo" ? <BootLogo /> : <SiteMockup />}
            </div>

            {/* Glass reflection */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                background:
                  "linear-gradient(125deg, transparent 30%, oklch(100% 0 0 / 0.08) 45%, transparent 60%)",
              }}
            />
          </div>
        </motion.div>

        {/* BASE / KEYBOARD */}
        <div
          className="relative -mt-px h-[18px] w-full rounded-b-[14px] border-x border-b border-foreground/15"
          style={{
            background:
              "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 30%, #0a0a0a 100%)",
          }}
        >
          {/* Hinge */}
          <div className="absolute inset-x-[8%] top-0 h-[3px] bg-gradient-to-b from-black to-foreground/10" />
          {/* Trackpad notch */}
          <div className="absolute bottom-0 left-1/2 h-1 w-24 -translate-x-1/2 rounded-t-md bg-foreground/5" />
        </div>

        {/* Shadow under base */}
        <div
          aria-hidden
          className="mx-auto h-3 w-[88%] rounded-[100%] blur-md"
          style={{ background: "radial-gradient(ellipse, oklch(0% 0 0 / 0.6), transparent 70%)" }}
        />
      </motion.div>
    </div>
  );
}

/* ----------------- Boot logo screen ----------------- */
function BootLogo() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a]">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <div className="font-display text-3xl md:text-5xl font-bold tracking-[-0.05em] text-foreground">
          ACELER<span className="text-primary">IQ</span>
        </div>
        <div className="absolute -inset-6 -z-10 blur-2xl"
          style={{ background: "radial-gradient(circle, oklch(85% 0.2 145 / 0.45), transparent 65%)" }}
        />
      </motion.div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "120px" }}
        transition={{ delay: 1.2, duration: 0.9 }}
        className="mt-6 h-px bg-primary"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70"
      >
        booting growth engine
      </motion.div>
    </div>
  );
}

/* ----------------- Site mockup running inside the screen ----------------- */
function SiteMockup() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 flex flex-col bg-background"
    >
      {/* Browser bar */}
      <div className="flex items-center gap-2 border-b border-border/60 bg-card/40 px-3 py-1.5">
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
        <span className="h-2 w-2 rounded-full bg-primary/70" />
        <div className="ml-3 flex-1 rounded-sm bg-background/60 px-2 py-0.5 font-mono text-[8px] text-muted-foreground/70">
          aceleriq.com.br
        </div>
      </div>

      {/* Auto-scrolling content */}
      <div className="relative flex-1 overflow-hidden">
        <motion.div
          animate={{ y: ["0%", "-55%", "0%"] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col gap-3 p-4"
        >
          {/* Hero block */}
          <div className="space-y-2">
            <div className="font-mono text-[7px] uppercase tracking-widest text-primary">/ growth engine</div>
            <div className="font-display text-[18px] font-bold leading-[0.9] tracking-[-0.04em]">
              Marcas que <span className="text-primary">crescem</span>
              <br />com sistema.
            </div>
            <div className="flex gap-1.5 pt-1">
              <div className="h-4 w-16 bg-primary" />
              <div className="h-4 w-12 border border-foreground/20" />
            </div>
          </div>

          {/* KPI strip */}
          <div className="grid grid-cols-3 gap-1.5 border-y border-border/60 py-2">
            {[
              { v: "312%", l: "lift" },
              { v: "6.8x", l: "ROAS" },
              { v: "98", l: "perf" },
            ].map((k) => (
              <div key={k.l} className="flex items-baseline gap-1">
                <span className="font-display text-sm font-bold text-primary">{k.v}</span>
                <span className="font-mono text-[7px] uppercase text-muted-foreground/70">{k.l}</span>
              </div>
            ))}
          </div>

          {/* Cards row */}
          <div className="grid grid-cols-3 gap-1.5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[4/5] rounded-sm border border-border/60 bg-card/30 p-1.5">
                <div className="h-3 w-3 bg-primary/70" />
                <div className="mt-1.5 h-1 w-full bg-foreground/15" />
                <div className="mt-1 h-1 w-2/3 bg-foreground/10" />
              </div>
            ))}
          </div>

          {/* Light section */}
          <div className="rounded-sm bg-foreground p-3 text-background">
            <div className="font-mono text-[7px] uppercase tracking-widest opacity-60">/ método</div>
            <div className="mt-1 font-display text-[14px] font-bold leading-tight tracking-[-0.03em]">
              Resultado lido<br />por receita.
            </div>
          </div>

          {/* Chart */}
          <div className="rounded-sm border border-border/60 bg-card/30 p-3">
            <div className="font-mono text-[7px] uppercase tracking-widest text-primary">pipeline / 7d</div>
            <div className="mt-2 flex h-10 items-end gap-1">
              {[18, 28, 22, 36, 44, 38, 56, 64, 58, 72, 80, 92].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="flex-1 bg-gradient-to-t from-primary/30 to-primary"
                />
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-sm border border-primary/40 bg-primary/10 p-2.5 text-center">
            <div className="font-display text-[10px] font-bold uppercase tracking-wider text-primary">
              Diagnóstico Gratuito
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
