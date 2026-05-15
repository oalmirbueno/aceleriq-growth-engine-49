import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import robotVideoAsset from "@/assets/ai-robot-alive-v4.mp4.asset.json";

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
  const videoRef = useRef<HTMLVideoElement>(null);

  // Cursor (-1..1) — drives gentle head/body orientation, no jitter
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 22, mass: 1 });
  const sy = useSpring(my, { stiffness: 40, damping: 22, mass: 1 });

  // Subtle "look at the cursor" — small angles only
  const rotateY = useTransform(sx, [-1, 1], [-7, 7]);
  const rotateX = useTransform(sy, [-1, 1], [5, -5]);
  const xShift  = useTransform(sx, [-1, 1], [-4, 4]);
  const yShift  = useTransform(sy, [-1, 1], [-3, 3]);

  // Track global cursor so the robot follows the mouse anywhere on the page
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      const dx = (e.clientX / w) * 2 - 1; // -1..1
      const dy = (e.clientY / h) * 2 - 1;
      mx.set(Math.max(-1, Math.min(1, dx)));
      my.set(Math.max(-1, Math.min(1, dy)));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  // Make sure the video autoplays smoothly on all browsers
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = 0.95;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
  }, []);

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
            "radial-gradient(ellipse at center, oklch(0% 0 0 / 0.7) 0%, oklch(0% 0 0 / 0.28) 60%, transparent 92%)",
          filter: "blur(5px)",
          transform: "perspective(400px) rotateX(62deg)",
          transformOrigin: "center bottom",
        }}
      />

      {/* Robot — Seedance video, black bg removed via screen blend, follows cursor */}
      <motion.div
        className="relative z-10 flex items-end justify-center h-[108%] w-auto"
        style={{
          rotateX,
          rotateY,
          x: xShift,
          y: yShift,
          transformOrigin: "50% 100%",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <video
          ref={videoRef}
          src={robotVideoAsset.url}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-auto max-w-none object-contain object-bottom select-none pointer-events-none"
          style={{
            mixBlendMode: "screen",
            transformOrigin: "50% 100%",
            filter:
              "brightness(1.04) contrast(1.1) saturate(1.06) drop-shadow(0 0 22px oklch(85% 0.22 145 / 0.18))",
          }}
        />
      </motion.div>
    </div>
  );
}
