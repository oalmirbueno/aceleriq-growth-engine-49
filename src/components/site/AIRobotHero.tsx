import { motion } from "framer-motion";
import robotImg from "@/assets/ai-robot-3d.png";

const LOGOS = [
  { slug: "huggingface",  label: "Hugging Face", x: "4%",  y: "10%", size: 40, delay: 0 },
  { slug: "anthropic",    label: "Claude",       x: "86%", y: "16%", size: 38, delay: 0.4 },
  { slug: "n8n",          label: "n8n",          x: "92%", y: "58%", size: 36, delay: 0.8 },
  { slug: "make",         label: "Make",         x: "2%",  y: "62%", size: 34, delay: 1.2 },
  { slug: "googlegemini", label: "Gemini",       x: "82%", y: "86%", size: 38, delay: 1.6 },
  { slug: "whatsapp",     label: "WhatsApp",     x: "8%",  y: "88%", size: 34, delay: 2.0 },
];

export function AIRobotHero() {
  return (
    <div className="relative w-full aspect-[4/5] lg:aspect-[5/6] lg:h-auto overflow-visible flex items-center justify-center">
      {/* Floating logos */}
      {LOGOS.map((l) => (
        <motion.img
          key={l.slug}
          src={`https://cdn.simpleicons.org/${l.slug}/ffffff`}
          alt={l.label}
          width={l.size}
          height={l.size}
          loading="lazy"
          draggable={false}
          className="absolute z-20 select-none object-contain"
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

      {/* Robot — centered in its column, properly proportional */}
      <motion.img
        src={robotImg}
        alt="Agente de IA 3D · Aceleriq"
        width={1024}
        height={1280}
        loading="eager"
        decoding="async"
        className="relative z-10 h-full w-full max-w-none object-contain"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: [0, -8, 0] }}
        transition={{
          opacity: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{
          filter:
            "drop-shadow(0 30px 50px oklch(0% 0 0 / 0.55)) drop-shadow(0 0 60px oklch(85% 0.22 145 / 0.28)) drop-shadow(0 0 110px oklch(85% 0.22 145 / 0.16))",
        }}
      />
    </div>
  );
}
