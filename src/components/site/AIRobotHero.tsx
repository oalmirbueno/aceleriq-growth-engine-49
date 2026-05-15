import { motion } from "framer-motion";
import robotImg from "@/assets/ai-robot-3d.png";

export function AIRobotHero() {
  return (
    <div className="relative mx-auto w-full max-w-[520px] aspect-[4/5]">
      {/* Ambient green glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 blur-3xl opacity-70"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 55%, oklch(85% 0.22 145 / 0.45), transparent 70%)",
        }}
      />
      {/* Rotating ring */}
      <motion.div
        aria-hidden
        className="absolute inset-6 rounded-full border border-primary/30"
        style={{
          maskImage:
            "conic-gradient(from 0deg, black 0deg, black 80deg, transparent 120deg, black 240deg, black 320deg, transparent 360deg)",
          WebkitMaskImage:
            "conic-gradient(from 0deg, black 0deg, black 80deg, transparent 120deg, black 240deg, black 320deg, transparent 360deg)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-12 rounded-full border border-primary/15"
        animate={{ rotate: -360 }}
        transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating orbiting dots */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_12px_oklch(85%_0.22_145/0.9)]" />
        <span className="absolute right-4 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-primary/80 shadow-[0_0_8px_oklch(85%_0.22_145/0.7)]" />
        <span className="absolute left-3 bottom-1/3 h-1 w-1 rounded-full bg-primary/70" />
      </motion.div>

      {/* Robot image with subtle float + breathe */}
      <motion.div
        className="relative h-full w-full"
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          src={robotImg}
          alt="Agente de IA 3D · Aceleriq"
          width={1024}
          height={1280}
          loading="eager"
          decoding="async"
          className="relative z-10 h-full w-full object-contain drop-shadow-[0_30px_60px_oklch(85%_0.22_145/0.25)]"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            filter:
              "contrast(1.05) saturate(1.05) drop-shadow(0 0 30px oklch(85% 0.22 145 / 0.18))",
          }}
        />
      </motion.div>

      {/* Scanline pulse */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 h-[2px] rounded-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(85% 0.22 145 / 0.85), transparent)",
          boxShadow: "0 0 18px oklch(85% 0.22 145 / 0.6)",
        }}
        initial={{ top: "12%", opacity: 0 }}
        animate={{ top: ["12%", "88%", "12%"], opacity: [0, 1, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* HUD corner brackets */}
      {[
        "top-0 left-0 border-t border-l",
        "top-0 right-0 border-t border-r",
        "bottom-0 left-0 border-b border-l",
        "bottom-0 right-0 border-b border-r",
      ].map((c, i) => (
        <span
          key={i}
          aria-hidden
          className={`absolute h-6 w-6 border-primary/50 ${c}`}
        />
      ))}

      {/* Status chip */}
      <motion.div
        className="absolute bottom-4 left-4 flex items-center gap-2 border border-primary/30 bg-background/70 px-3 py-1.5 backdrop-blur-md font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/80"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
        </span>
        Agent · online
      </motion.div>
    </div>
  );
}
