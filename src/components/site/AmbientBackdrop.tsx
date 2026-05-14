import { motion } from "framer-motion";

/**
 * Living tech backdrop — depth layers:
 *  1. Animated mesh gradient (drift + hue pulse)
 *  2. Wireframe grid with radial mask
 *  3. Floating neon orbs (parallax)
 *  4. Vertical scanline
 *  5. Diagonal data lines (very faint)
 *  6. Film grain
 */
export function AmbientBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* 0. Deep black-to-green base — sets the darker tone */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 0%, oklch(12% 0.04 145 / 0.9), oklch(6% 0 0) 70%)," +
            "linear-gradient(180deg, oklch(5% 0 0) 0%, oklch(7% 0.02 145) 50%, oklch(4% 0 0) 100%)",
        }}
      />

      {/* 1. Mesh gradient — animated, opaque depth */}
      <div className="absolute inset-0 hue-pulse opacity-70">
        <div
          className="absolute inset-0 mesh-drift"
          style={{
            background:
              "radial-gradient(circle at 18% 22%, oklch(85% 0.2 145 / 0.10), transparent 38%)," +
              "radial-gradient(circle at 82% 18%, oklch(60% 0.22 250 / 0.07), transparent 42%)," +
              "radial-gradient(circle at 50% 90%, oklch(85% 0.2 145 / 0.08), transparent 45%)," +
              "radial-gradient(circle at 92% 75%, oklch(70% 0.18 200 / 0.06), transparent 40%)",
          }}
        />
      </div>

      {/* 2. Wireframe grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(85% 0.2 145 / 0.55) 1px, transparent 1px), linear-gradient(90deg, oklch(85% 0.2 145 / 0.55) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 85% 70% at 50% 35%, black 0%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 70% at 50% 35%, black 0%, transparent 85%)",
        }}
      />

      {/* 3. Floating neon orbs — softened */}
      <motion.div
        className="absolute -top-40 -right-40 h-[720px] w-[720px] rounded-full blur-[160px]"
        style={{ background: "radial-gradient(circle, oklch(85% 0.2 145 / 0.13), transparent 60%)" }}
        animate={{ x: [0, 50, -25, 0], y: [0, -35, 25, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[42vh] -left-48 h-[640px] w-[640px] rounded-full blur-[160px]"
        style={{ background: "radial-gradient(circle, oklch(60% 0.22 250 / 0.09), transparent 60%)" }}
        animate={{ x: [0, 70, 25, 0], y: [0, 45, -35, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[18%] h-[560px] w-[560px] rounded-full blur-[160px]"
        style={{ background: "radial-gradient(circle, oklch(85% 0.2 145 / 0.08), transparent 60%)" }}
        animate={{ x: [0, -50, 35, 0], y: [0, -25, 35, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 4. Vertical scanline (CSS keyframes — cheaper than framer) */}
      <div className="absolute inset-x-0 top-0 h-px scanline-y bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div
        className="absolute inset-x-0 top-0 h-px scanline-y bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
        style={{ animationDelay: "4.5s" }}
      />

      {/* 5. Diagonal data lines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, oklch(85% 0.2 145 / 0.6) 0 1px, transparent 1px 14px)",
        }}
      />

      {/* 6. Film grain */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Top + bottom vignette to add depth */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background/60 to-transparent" />
    </div>
  );
}
