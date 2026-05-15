import { motion } from "framer-motion";
import robotImg from "@/assets/ai-robot-3d.png";

const LOGOS = [
  { slug: "huggingface",  label: "Hugging Face", x: "6%",  y: "14%", size: 46, delay: 0 },
  { slug: "anthropic",    label: "Claude",       x: "84%", y: "10%", size: 42, delay: 0.4 },
  { slug: "n8n",          label: "n8n",          x: "90%", y: "46%", size: 40, delay: 0.8 },
  { slug: "make",         label: "Make",         x: "4%",  y: "50%", size: 38, delay: 1.2 },
  { slug: "googlegemini", label: "Gemini",       x: "82%", y: "78%", size: 42, delay: 1.6 },
  { slug: "whatsapp",     label: "WhatsApp",     x: "10%", y: "82%", size: 38, delay: 2.0 },
];

export function AIRobotHero() {
  return (
    <div
      className="relative mx-auto w-full max-w-[680px] aspect-[3/4] overflow-visible"
      style={{ marginBottom: "-22%" }}
    >
      {/* Ambient green glow — blends with page background */}
      <div
        aria-hidden
        className="absolute -inset-10 -z-10 blur-3xl opacity-70"
        style={{
          background:
            "radial-gradient(55% 55% at 50% 45%, oklch(85% 0.22 145 / 0.32), transparent 72%)",
        }}
      />

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

      {/* Tech light pulse behind the robot */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-[5] blur-2xl"
        style={{
          background:
            "radial-gradient(40% 45% at 50% 48%, oklch(85% 0.22 145 / 0.45), transparent 70%)",
        }}
        animate={{ opacity: [0.55, 0.85, 0.55], scale: [1, 1.04, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Robot — scaled up, overflows downward toward the marquee */}
      <motion.img
        src={robotImg}
        alt="Agente de IA 3D · Aceleriq"
        width={1024}
        height={1280}
        loading="eager"
        decoding="async"
        className="relative z-10 h-[118%] w-full object-contain"
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

      {/* Soft horizontal scan behind the figure */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-[10%] z-[6] h-[40%] top-[30%] blur-3xl mix-blend-screen"
        style={{
          background:
            "linear-gradient(180deg, transparent, oklch(85% 0.22 145 / 0.18), transparent)",
        }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bottom fade — subtle blend so arms/legs are not clipped */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[-20%] bottom-[-5%] z-[15] h-[14%]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, color-mix(in oklab, var(--background) 70%, transparent) 60%, var(--background) 100%)",
        }}
      />
    </div>
  );
}
