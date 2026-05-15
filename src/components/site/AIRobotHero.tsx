import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
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
  const wrapRef = useRef<HTMLDivElement>(null);

  // Cursor-tracked motion values → "alive" parallax
  const mx = useMotionValue(0); // -1..1
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 80, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 80, damping: 18, mass: 0.6 });

  const rotateY = useTransform(sx, [-1, 1], [-12, 12]); // body twist
  const rotateX = useTransform(sy, [-1, 1], [6, -6]);   // head nod
  const translateX = useTransform(sx, [-1, 1], [-14, 14]);
  const translateY = useTransform(sy, [-1, 1], [-8, 8]);

  // Arm sway driven by horizontal cursor
  const armLeftRot = useTransform(sx, [-1, 1], [10, -22]);
  const armRightRot = useTransform(sx, [-1, 1], [22, -10]);
  // Leg sway (subtle)
  const legShift = useTransform(sx, [-1, 1], [-4, 4]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (r.width / 2);
      const dy = (e.clientY - cy) / (r.height / 2);
      mx.set(Math.max(-1, Math.min(1, dx)));
      my.set(Math.max(-1, Math.min(1, dy)));
    };
    const onLeave = () => { mx.set(0); my.set(0); };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [mx, my]);

  return (
    <div
      ref={wrapRef}
      className="relative w-full aspect-[4/5] lg:aspect-[5/6] lg:h-auto overflow-visible flex items-end justify-center [perspective:1400px]"
    >
      {/* Floating logos (kept airy) */}
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

      {/* Ground platform — anchors the robot, removes the "flying" feeling */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 z-0"
        style={{ bottom: "2%", width: "70%", height: "8%" }}
      >
        <div
          className="absolute inset-0 rounded-[100%] blur-2xl"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(85% 0.22 145 / 0.35), transparent 70%)",
          }}
        />
        <motion.div
          className="absolute inset-x-[10%] bottom-0 h-2 rounded-[100%]"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0% 0 0 / 0.85), transparent 75%)",
          }}
          animate={{ scaleX: [1, 0.94, 1], opacity: [0.85, 0.7, 0.85] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Robot rig — reacts to cursor: head/torso parallax + arm & leg sway */}
      <motion.div
        className="relative z-10 h-full w-full flex items-end justify-center"
        style={{
          rotateY,
          rotateX,
          x: translateX,
          y: translateY,
          transformStyle: "preserve-3d",
          transformOrigin: "50% 95%",
        }}
      >
        {/* Subtle idle breathing (vertical scale, NOT translate — no flying) */}
        <motion.div
          className="relative h-full w-full flex items-end justify-center origin-bottom"
          animate={{ scaleY: [1, 1.008, 1] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Left arm */}
          <motion.div
            aria-hidden
            className="absolute z-20 origin-top"
            style={{
              left: "20%",
              top: "34%",
              width: "9%",
              height: "30%",
              rotate: armLeftRot,
              background:
                "linear-gradient(180deg, oklch(78% 0.02 240) 0%, oklch(55% 0.02 240) 100%)",
              borderRadius: 999,
              boxShadow:
                "inset -2px 0 6px oklch(0% 0 0 / 0.45), 0 8px 18px oklch(0% 0 0 / 0.4)",
            }}
            animate={{ rotateZ: [0, -3, 0, 2, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Right arm */}
          <motion.div
            aria-hidden
            className="absolute z-20 origin-top"
            style={{
              right: "20%",
              top: "34%",
              width: "9%",
              height: "30%",
              rotate: armRightRot,
              background:
                "linear-gradient(180deg, oklch(78% 0.02 240) 0%, oklch(55% 0.02 240) 100%)",
              borderRadius: 999,
              boxShadow:
                "inset 2px 0 6px oklch(0% 0 0 / 0.45), 0 8px 18px oklch(0% 0 0 / 0.4)",
            }}
            animate={{ rotateZ: [0, 3, 0, -2, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          />

          {/* Robot body image — anchored to ground, no vertical float */}
          <motion.img
            src={robotImg}
            alt="Agente de IA 3D · Aceleriq"
            width={1024}
            height={1280}
            loading="eager"
            decoding="async"
            className="relative z-10 h-full w-full max-w-none object-contain"
            style={{
              x: legShift,
              filter:
                "drop-shadow(0 30px 50px oklch(0% 0 0 / 0.55)) drop-shadow(0 0 60px oklch(85% 0.22 145 / 0.28)) drop-shadow(0 0 110px oklch(85% 0.22 145 / 0.16))",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
