import { motion } from "framer-motion";

/**
 * Ambient backdrop — grafite suave.
 * Superfície escura mas leve, com um único orb verde discreto,
 * grid quase imperceptível e ruído mínimo. Sem scanlines agressivas.
 */
export function AmbientBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base grafite suave */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(20% 0.01 260 / 0.9), oklch(14% 0.005 260) 70%)," +
            "linear-gradient(180deg, oklch(15% 0.005 260) 0%, oklch(13% 0.005 260) 100%)",
        }}
      />

      {/* Orb verde único e discreto */}
      <motion.div
        className="absolute -top-40 right-[10%] h-[720px] w-[720px] rounded-full blur-[180px]"
        style={{
          background:
            "radial-gradient(circle, oklch(72% 0.19 145 / 0.07), transparent 65%)",
        }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid quase imperceptível */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(96% 0.003 260 / 0.5) 1px, transparent 1px), linear-gradient(90deg, oklch(96% 0.003 260 / 0.5) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage:
            "radial-gradient(ellipse 90% 75% at 50% 35%, black 0%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 75% at 50% 35%, black 0%, transparent 85%)",
        }}
      />

      {/* Grain sutil */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Vinheta superior + inferior */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background/60 to-transparent" />
    </div>
  );
}
