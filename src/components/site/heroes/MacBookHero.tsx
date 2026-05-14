import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

/**
 * Scroll-driven MacBook reveal (Apple AirPods style).
 * As the user scrolls through the hero section, the lid opens frame-by-frame
 * and the screen transitions: black → Aceleriq logo → live site mockup.
 */
export function MacBookHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the tall outer wrapper.
  // Sticky inner stays pinned while we animate.
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  // Lid opens from -100° (closed) to 0° (fully open) over the first 55%
  const lidRotate = useTransform(scrollYProgress, [0, 0.55], [-100, 0], { clamp: true });

  // Subtle base lift + scale
  const baseScale = useTransform(scrollYProgress, [0, 0.55], [0.92, 1], { clamp: true });
  const baseY = useTransform(scrollYProgress, [0, 0.55], [40, 0], { clamp: true });

  // Screen content phases driven by progress
  const [phase, setPhase] = useState<"black" | "logo" | "site">("black");
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.45) setPhase("black");
    else if (v < 0.78) setPhase("logo");
    else setPhase("site");
  });

  // Logo fade
  const logoOpacity = useTransform(scrollYProgress, [0.45, 0.55, 0.78, 0.85], [0, 1, 1, 0]);
  const siteOpacity = useTransform(scrollYProgress, [0.78, 0.88], [0, 1]);
  const screenGlow = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  return (
    <div ref={wrapRef} className="relative" style={{ height: "260vh" }}>
      <div
        ref={stickyRef}
        className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden"
      >
        <div className="relative mx-auto w-full max-w-[920px] px-6 [perspective:2200px]">
          {/* Floor glow that grows with progress */}
          <motion.div
            aria-hidden
            style={{ opacity: screenGlow }}
            className="absolute inset-x-0 -bottom-12 mx-auto h-[160px] w-[80%] rounded-[100%] blur-3xl"
          >
            <div
              className="h-full w-full"
              style={{ background: "radial-gradient(ellipse, oklch(85% 0.2 145 / 0.45), transparent 70%)" }}
            />
          </motion.div>

          <motion.div
            style={{ scale: baseScale, y: baseY, transformStyle: "preserve-3d" }}
            className="relative"
          >
            {/* LID — rotates around its bottom edge (the hinge) */}
            <motion.div
              style={{
                rotateX: lidRotate,
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
                  {/* Black base layer */}
                  <div className="absolute inset-0 bg-[#050505]" />

                  {/* Logo layer */}
                  <motion.div
                    style={{ opacity: logoOpacity }}
                    className="absolute inset-0"
                  >
                    <BootLogo active={phase === "logo"} />
                  </motion.div>

                  {/* Site layer */}
                  <motion.div
                    style={{ opacity: siteOpacity }}
                    className="absolute inset-0"
                  >
                    {phase === "site" && <SiteMockup />}
                  </motion.div>
                </div>

                {/* Glass reflection sweep */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-25"
                  style={{
                    background:
                      "linear-gradient(125deg, transparent 30%, oklch(100% 0 0 / 0.12) 45%, transparent 60%)",
                  }}
                />
              </div>

              {/* Apple-ish logo on lid back (visible while closed) */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <motion.div
                  style={{
                    opacity: useTransform(scrollYProgress, [0, 0.3, 0.45], [1, 1, 0]),
                  }}
                  className="font-display text-2xl font-bold tracking-[-0.05em] text-foreground/0"
                />
              </div>
            </motion.div>

            {/* BASE / KEYBOARD */}
            <div
              className="relative -mt-px h-[20px] w-full rounded-b-[14px] border-x border-b border-foreground/15"
              style={{
                background:
                  "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 30%, #0a0a0a 100%)",
              }}
            >
              <div className="absolute inset-x-[8%] top-0 h-[3px] bg-gradient-to-b from-black to-foreground/10" />
              <div className="absolute bottom-0 left-1/2 h-1 w-24 -translate-x-1/2 rounded-t-md bg-foreground/5" />
            </div>

            {/* Shadow under base */}
            <div
              aria-hidden
              className="mx-auto h-3 w-[88%] rounded-[100%] blur-md"
              style={{ background: "radial-gradient(ellipse, oklch(0% 0 0 / 0.6), transparent 70%)" }}
            />
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0, 0.1, 0.4], [1, 1, 0]) }}
            className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60"
          >
            ↓ role para abrir
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ----------------- Boot logo screen ----------------- */
function BootLogo({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a]">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={active ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <div className="font-display text-3xl md:text-5xl font-bold tracking-[-0.05em] text-foreground">
          ACELER<span className="text-primary">IQ</span>
        </div>
        <div
          className="absolute -inset-6 -z-10 blur-2xl"
          style={{ background: "radial-gradient(circle, oklch(85% 0.2 145 / 0.45), transparent 65%)" }}
        />
      </motion.div>
      <motion.div
        initial={{ width: 0 }}
        animate={active ? { width: "120px" } : { width: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-6 h-px bg-primary"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.4 }}
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
      transition={{ duration: 0.5 }}
      className="absolute inset-0 flex flex-col bg-background"
    >
      <div className="flex items-center gap-2 border-b border-border/60 bg-card/40 px-3 py-1.5">
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
        <span className="h-2 w-2 rounded-full bg-primary/70" />
        <div className="ml-3 flex-1 rounded-sm bg-background/60 px-2 py-0.5 font-mono text-[8px] text-muted-foreground/70">
          aceleriq.com.br
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <motion.div
          animate={{ y: ["0%", "-55%", "0%"] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col gap-3 p-4"
        >
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

          <div className="grid grid-cols-3 gap-1.5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[4/5] rounded-sm border border-border/60 bg-card/30 p-1.5">
                <div className="h-3 w-3 bg-primary/70" />
                <div className="mt-1.5 h-1 w-full bg-foreground/15" />
                <div className="mt-1 h-1 w-2/3 bg-foreground/10" />
              </div>
            ))}
          </div>

          <div className="rounded-sm bg-foreground p-3 text-background">
            <div className="font-mono text-[7px] uppercase tracking-widest opacity-60">/ método</div>
            <div className="mt-1 font-display text-[14px] font-bold leading-tight tracking-[-0.03em]">
              Resultado lido<br />por receita.
            </div>
          </div>

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
