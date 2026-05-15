import { motion } from "framer-motion";
import robotImg from "@/assets/ai-robot-3d.png";

const LOGOS = [
  { slug: "n8n",          label: "n8n",      x: "4%",  y: "10%", size: 44, delay: 0   },
  { slug: "openai",       label: "OpenAI",   x: "86%", y: "8%",  size: 50, delay: 0.4 },
  { slug: "anthropic",    label: "Claude",   x: "92%", y: "40%", size: 40, delay: 0.8 },
  { slug: "make",         label: "Make",     x: "88%", y: "70%", size: 38, delay: 1.2 },
  { slug: "zapier",       label: "Zapier",   x: "2%",  y: "44%", size: 42, delay: 1.6 },
  { slug: "googlegemini", label: "Gemini",   x: "6%",  y: "74%", size: 44, delay: 2.0 },
  { slug: "whatsapp",     label: "WhatsApp", x: "78%", y: "88%", size: 38, delay: 2.4 },
  { slug: "meta",         label: "Meta",     x: "18%", y: "92%", size: 40, delay: 2.8 },
];

export function AIRobotHero() {
  return (
    <div className="relative mx-auto w-full max-w-[560px] aspect-[4/5]">
      {/* Ambient green glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(55% 50% at 50% 50%, oklch(85% 0.22 145 / 0.35), transparent 70%)",
        }}
      />

      {/* Floating logos — subtle drift, no frames */}
      {LOGOS.map((l) => (
        <motion.img
          key={l.slug}
          src={`https://cdn.simpleicons.org/${l.slug}/ffffff`}
          alt={l.label}
          width={l.size}
          height={l.size}
          loading="lazy"
          draggable={false}
          className="absolute select-none object-contain"
          style={{
            left: l.x,
            top: l.y,
            width: l.size,
            height: l.size,
            opacity: 0.85,
            filter:
              "drop-shadow(0 0 10px oklch(85% 0.22 145 / 0.45)) drop-shadow(0 12px 20px oklch(0% 0 0 / 0.5))",
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.85, y: [0, -6, 0] }}
          transition={{
            opacity: { duration: 1.2, delay: l.delay * 0.15 },
            y: { duration: 7 + (l.size % 3), delay: l.delay, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      ))}

      {/* Robot — fluid, no frame, no cutout. Mask fades the bottom into the page. */}
      <motion.img
        src={robotImg}
        alt="Agente de IA 3D · Aceleriq"
        width={1024}
        height={1280}
        loading="eager"
        decoding="async"
        className="relative z-10 h-full w-full object-contain"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: [0, -8, 0] }}
        transition={{
          opacity: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{
          filter:
            "drop-shadow(0 30px 50px oklch(0% 0 0 / 0.55)) drop-shadow(0 0 40px oklch(85% 0.22 145 / 0.22))",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 78%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 78%, transparent 100%)",
        }}
      />

      {/* Soft contact shadow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 bottom-[8%] z-[5] h-8 w-[55%] -translate-x-1/2 blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0% 0 0 / 0.55), transparent 70%)",
        }}
      />
    </div>
  );
}
