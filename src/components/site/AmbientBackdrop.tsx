import { motion } from "framer-motion";

/**
 * Living backdrop: parallax neon orbs + animated grid lines + noise.
 * Position absolute / pointer-events-none. Mount once near the top of a page.
 */
export function AmbientBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(85% 0.2 145 / 0.5) 1px, transparent 1px), linear-gradient(90deg, oklch(85% 0.2 145 / 0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 0%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 0%, transparent 80%)",
        }}
      />

      {/* Floating neon orbs */}
      <motion.div
        className="absolute -top-40 -right-40 h-[700px] w-[700px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, oklch(85% 0.2 145 / 0.18), transparent 60%)" }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[40vh] -left-40 h-[600px] w-[600px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, oklch(60% 0.2 250 / 0.12), transparent 60%)" }}
        animate={{ x: [0, 60, 20, 0], y: [0, 40, -30, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, oklch(85% 0.2 145 / 0.10), transparent 60%)" }}
        animate={{ x: [0, -40, 30, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle scan line */}
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        animate={{ y: ["0vh", "100vh"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}
