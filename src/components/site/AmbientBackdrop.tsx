import { motion } from "framer-motion";

/**
 * Ambient backdrop — cinza claro dominante (Grafite Suave).
 * Base off-white com um único orb verde muito discreto,
 * grid quase imperceptível. Zero neon, zero scanlines.
 */
export function AmbientBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base clara com gradiente sutil */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(98% 0.003 260), oklch(95% 0.004 260) 70%)," +
            "linear-gradient(180deg, oklch(97% 0.003 260) 0%, oklch(94% 0.004 260) 100%)",
        }}
      />

      {/* Orb verde único, muito discreto */}
      <motion.div
        className="absolute -top-40 right-[8%] h-[720px] w-[720px] rounded-full blur-[180px]"
        style={{
          background:
            "radial-gradient(circle, oklch(62% 0.17 145 / 0.09), transparent 65%)",
        }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid preto quase imperceptível */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(16% 0.005 260 / 0.5) 1px, transparent 1px), linear-gradient(90deg, oklch(16% 0.005 260 / 0.5) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage:
            "radial-gradient(ellipse 90% 75% at 50% 35%, black 0%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 75% at 50% 35%, black 0%, transparent 85%)",
        }}
      />
    </div>
  );
}
