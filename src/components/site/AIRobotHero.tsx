import { motion, useAnimationControls, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import robotImage from "@/assets/ai-robot-3d.png";

const LOGOS = [
  { slug: "huggingface",  label: "Hugging Face", x: "2%",  y: "8%",  size: 40, delay: 0 },
  { slug: "anthropic",    label: "Claude",       x: "88%", y: "14%", size: 38, delay: 0.4 },
  { slug: "n8n",          label: "n8n",          x: "94%", y: "52%", size: 36, delay: 0.8 },
  { slug: "make",         label: "Make",         x: "0%",  y: "56%", size: 34, delay: 1.2 },
  { slug: "googlegemini", label: "Gemini",       x: "84%", y: "78%", size: 38, delay: 1.6 },
  { slug: "whatsapp",     label: "WhatsApp",     x: "4%",  y: "82%", size: 34, delay: 2.0 },
];

export function AIRobotHero() {
  const wrapRef = useRef<HTMLDivElement>(null);

  // Cursor (-1..1) — drives subtle parallax rotation
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 18, mass: 0.8 });
  const sy = useSpring(my, { stiffness: 55, damping: 18, mass: 0.8 });

  const rotateY = useTransform(sx, [-1.2, 1.2], [-9, 9]);
  const rotateX = useTransform(sy, [-1.2, 1.2], [6, -6]);
  const xShift  = useTransform(sx, [-1.2, 1.2], [-6, 6]);

  // Idle "alive" choreography — varied, non-repeating sequence
  const controls = useAnimationControls();

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (Math.max(r.width, 1) / 2);
      const dy = (e.clientY - cy) / (Math.max(r.height, 1) / 2);
      mx.set(Math.max(-1.4, Math.min(1.4, dx)));
      my.set(Math.max(-1.4, Math.min(1.4, dy)));
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  // Loop a random "alive" gesture with breathing baseline
  useEffect(() => {
    let cancelled = false;

    // Distinct micro-gestures — never the same twice in a row
    const gestures: Array<{ y: number[]; rotZ: number[]; scale: number[]; dur: number }> = [
      // soft breath
      { y: [0, -3, 0, -2, 0], rotZ: [0, 0, 0, 0, 0], scale: [1, 1.012, 1, 1.008, 1], dur: 4.2 },
      // gentle lean left + sway
      { y: [0, -2, 0],         rotZ: [0, -1.4, 0],    scale: [1, 1.006, 1],          dur: 3.4 },
      // lean right + subtle bob
      { y: [0, -2, 0],         rotZ: [0, 1.4, 0],     scale: [1, 1.006, 1],          dur: 3.6 },
      // little hop / bounce
      { y: [0, -6, 0, -2, 0],  rotZ: [0, 0.4, -0.4, 0.2, 0], scale: [1, 1.02, 1, 1.005, 1], dur: 2.6 },
      // attentive nod
      { y: [0, 1, 0, -1, 0],   rotZ: [0, 0, 0, 0, 0],  scale: [1, 1, 1, 1, 1],         dur: 2.2 },
    ];

    let lastIdx = -1;
    const pick = () => {
      let i = Math.floor(Math.random() * gestures.length);
      if (i === lastIdx) i = (i + 1) % gestures.length;
      lastIdx = i;
      return gestures[i];
    };

    const run = async () => {
      while (!cancelled) {
        const g = pick();
        await controls.start({
          y: g.y,
          rotateZ: g.rotZ,
          scale: g.scale,
          transition: { duration: g.dur, ease: "easeInOut", times: g.y.map((_, k, arr) => k / (arr.length - 1)) },
        });
        // tiny pause so it doesn't feel mechanical
        await new Promise((r) => setTimeout(r, 350 + Math.random() * 900));
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [controls]);

  return (
    <div
      ref={wrapRef}
      className="relative w-full aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] overflow-visible flex items-end justify-center [perspective:1600px]"
    >
      {/* Floating tech logos */}
      {LOGOS.map((l) => (
        <motion.img
          key={l.slug}
          src={`https://cdn.simpleicons.org/${l.slug}/ffffff`}
          alt={l.label}
          width={l.size}
          height={l.size}
          loading="lazy"
          draggable={false}
          className="absolute z-30 select-none object-contain pointer-events-none"
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

      {/* Ground platform — depth into the scene */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 bottom-[1.5%] z-0 pointer-events-none"
        style={{
          width: "70%",
          height: "32px",
          background:
            "radial-gradient(ellipse at center, oklch(85% 0.22 145 / 0.45) 0%, oklch(85% 0.22 145 / 0.14) 45%, transparent 78%)",
          filter: "blur(8px)",
          transform: "perspective(400px) rotateX(62deg)",
          transformOrigin: "center bottom",
        }}
      />
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 bottom-[0.5%] z-0 pointer-events-none"
        style={{
          width: "48%",
          height: "14px",
          background:
            "radial-gradient(ellipse at center, oklch(0% 0 0 / 0.65) 0%, oklch(0% 0 0 / 0.25) 60%, transparent 92%)",
          filter: "blur(5px)",
          transform: "perspective(400px) rotateX(62deg)",
          transformOrigin: "center bottom",
        }}
      />

      {/* Robot — transparent asset, mouse parallax + lifelike idle loop */}
      <motion.div
        className="relative z-10 flex items-end justify-center h-[112%] w-auto"
        style={{
          rotateX,
          rotateY,
          x: xShift,
          transformOrigin: "50% 100%",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.img
          src={robotImage}
          alt="Robô de IA 3D da Aceleriq"
          loading="eager"
          decoding="async"
          width={1024}
          height={1280}
          className="h-full w-auto max-w-none object-contain object-bottom select-none pointer-events-none"
          style={{
            transformOrigin: "50% 100%",
            filter:
              "brightness(1.06) contrast(1.08) saturate(1.08) drop-shadow(0 0 22px oklch(85% 0.22 145 / 0.16)) drop-shadow(0 10px 18px oklch(0% 0 0 / 0.28))",
          }}
          initial={{ opacity: 1, y: 0 }}
          animate={controls}
          draggable={false}
        />
      </motion.div>
    </div>
  );
}
