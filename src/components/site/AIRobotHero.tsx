import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import robotImg from "@/assets/ai-robot-3d.png";

const LOGOS = [
  { slug: "n8n",          label: "n8n",      x: "2%",  y: "6%",  size: 54, depth: -120, delay: 0,   drift: 14 },
  { slug: "openai",       label: "OpenAI",   x: "84%", y: "4%",  size: 60, depth:   60, delay: 0.5, drift: 18 },
  { slug: "anthropic",    label: "Claude",   x: "92%", y: "34%", size: 48, depth: -80,  delay: 1.0, drift: 12 },
  { slug: "make",         label: "Make",     x: "90%", y: "66%", size: 46, depth:  40,  delay: 1.5, drift: 16 },
  { slug: "zapier",       label: "Zapier",   x: "0%",  y: "40%", size: 50, depth:  80,  delay: 2.0, drift: 14 },
  { slug: "googlegemini", label: "Gemini",   x: "4%",  y: "70%", size: 52, depth: -60,  delay: 2.5, drift: 18 },
  { slug: "whatsapp",     label: "WhatsApp", x: "72%", y: "84%", size: 44, depth: -40,  delay: 3.0, drift: 12 },
  { slug: "meta",         label: "Meta",     x: "16%", y: "88%", size: 46, depth:  100, delay: 3.5, drift: 16 },
];

export function AIRobotHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth scroll-driven values
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 22, mass: 0.4 });
  const rotateY = useTransform(smooth, [0, 0.5, 1], [-18, 0, 18]);
  const rotateX = useTransform(smooth, [0, 0.5, 1], [4, 0, -4]);
  const eyeGlow = useTransform(smooth, [0, 0.4, 0.55, 1], [0, 0.2, 1, 1]);
  const eyeScale = useTransform(smooth, [0, 0.5, 1], [0.8, 1, 1.3]);

  return (
    <div
      ref={ref}
      className="relative mx-auto w-full max-w-[560px] aspect-[4/5]"
      style={{ perspective: "1200px" }}
    >
      {/* Floating 3D tech logos — no frames, just glowing icons drifting in space */}
      <div className="absolute inset-0 -z-[1]" style={{ transformStyle: "preserve-3d" }}>
        {LOGOS.map((l) => {
          const tilt = l.depth > 0 ? 12 : -12;
          return (
            <motion.div
              key={l.slug}
              className="absolute"
              style={{
                left: l.x,
                top: l.y,
                width: l.size,
                height: l.size,
                transformStyle: "preserve-3d",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: l.delay * 0.2 }}
            >
              <motion.div
                className="h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                animate={{
                  y: [0, -l.drift, 0, l.drift * 0.6, 0],
                  x: [0, l.drift * 0.4, 0, -l.drift * 0.4, 0],
                  rotateY: [tilt, -tilt, tilt],
                  rotateX: [-tilt * 0.4, tilt * 0.4, -tilt * 0.4],
                  rotateZ: [-2, 2, -2],
                }}
                transition={{
                  duration: 9 + (l.size % 4),
                  delay: l.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img
                  src={`https://cdn.simpleicons.org/${l.slug}/ffffff`}
                  alt={l.label}
                  width={l.size}
                  height={l.size}
                  loading="lazy"
                  className="h-full w-full object-contain select-none"
                  style={{
                    transform: `translateZ(${l.depth}px)`,
                    opacity: 0.92,
                    filter: [
                      "drop-shadow(0 0 8px oklch(85% 0.22 145 / 0.55))",
                      "drop-shadow(0 0 22px oklch(85% 0.22 145 / 0.35))",
                      "drop-shadow(0 18px 28px oklch(0% 0 0 / 0.55))",
                    ].join(" "),
                  }}
                  draggable={false}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Ambient green glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 blur-3xl opacity-70"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 55%, oklch(85% 0.22 145 / 0.45), transparent 70%)",
        }}
      />

      {/* Rotating rings */}
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

      {/* Orbiting dots */}
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

      {/* Robot 3D wrapper, rotates on scroll */}
      <motion.div
        className="relative h-full w-full"
        style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      >
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

          {/* Eye glows — positioned over the robot's eyes, intensify on scroll */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute z-20 rounded-full bg-primary"
            style={{
              left: "41.5%",
              top: "33.5%",
              width: "1.6%",
              height: "1%",
              opacity: eyeGlow,
              scale: eyeScale,
              boxShadow:
                "0 0 14px oklch(85% 0.22 145 / 0.95), 0 0 28px oklch(85% 0.22 145 / 0.7), 0 0 60px oklch(85% 0.22 145 / 0.45)",
            }}
          />
          <motion.span
            aria-hidden
            className="pointer-events-none absolute z-20 rounded-full bg-primary"
            style={{
              left: "55%",
              top: "33.5%",
              width: "1.6%",
              height: "1%",
              opacity: eyeGlow,
              scale: eyeScale,
              boxShadow:
                "0 0 14px oklch(85% 0.22 145 / 0.95), 0 0 28px oklch(85% 0.22 145 / 0.7), 0 0 60px oklch(85% 0.22 145 / 0.45)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Bottom fade — hides the neckline cutout into the background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[28%]"
        style={{
          background:
            "linear-gradient(to top, var(--background) 0%, color-mix(in oklab, var(--background) 90%, transparent) 30%, color-mix(in oklab, var(--background) 50%, transparent) 65%, transparent 100%)",
        }}
      />
      {/* Soft contact shadow ellipse */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 bottom-[6%] z-[11] h-10 w-[60%] -translate-x-1/2 blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(85% 0.22 145 / 0.35), transparent 70%)",
        }}
      />

      {/* Scanline pulse */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 z-[15] h-[2px] rounded-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(85% 0.22 145 / 0.85), transparent)",
          boxShadow: "0 0 18px oklch(85% 0.22 145 / 0.6)",
        }}
        initial={{ top: "12%", opacity: 0 }}
        animate={{ top: ["12%", "78%", "12%"], opacity: [0, 1, 0] }}
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
          className={`absolute z-20 h-6 w-6 border-primary/50 ${c}`}
        />
      ))}

      {/* Status chip */}
      <motion.div
        className="absolute bottom-4 left-4 z-30 flex items-center gap-2 border border-primary/30 bg-background/70 px-3 py-1.5 backdrop-blur-md font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/80"
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
