import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import robotVideo from "@/assets/ai-robot-alive-v2.mp4.asset.json";

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

  // Cursor (-1..1)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 65, damping: 20, mass: 0.7 });

  const rotateY = useTransform(sx, [-1, 1], [-6, 6]);
  const xShift  = useTransform(sx, [-1, 1], [-4, 4]);

  // Scroll velocity → head tilt
  const scrollTilt = useMotionValue(0);
  const sTilt = useSpring(scrollTilt, { stiffness: 90, damping: 22, mass: 0.8 });
  const rotateX = useTransform(sTilt, [-1, 1], [10, -10]);

  // Pointer tracking
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (Math.max(r.width, 1) / 2);
      const dy = (e.clientY - cy) / (Math.max(r.height, 1) / 2);
      mx.set(Math.max(-1.2, Math.min(1.2, dx)));
      my.set(Math.max(-1.2, Math.min(1.2, dy)));
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  // Scroll tilt with decay
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      const curr = window.scrollY;
      const dy = curr - last;
      last = curr;
      const next = Math.max(-1, Math.min(1, scrollTilt.get() + dy / 80));
      scrollTilt.set(next);
    };
    const decay = () => {
      scrollTilt.set(scrollTilt.get() * 0.92);
      raf = requestAnimationFrame(decay);
    };
    decay();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [scrollTilt]);

  // Hybrid playback: ambient looped playback + cursor adds offset (more variety, never freezes)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.loop = true;
    v.muted = true;
    v.playbackRate = 0.85;
    v.play().catch(() => {});

    let raf = 0;
    let baseT = 0;
    let lastReal = performance.now();

    const tick = (now: number) => {
      const dur = v.duration;
      if (dur && isFinite(dur)) {
        const dt = (now - lastReal) / 1000;
        lastReal = now;
        // Ambient time advances on its own → continuous variety
        baseT = (baseT + dt * v.playbackRate) % dur;
        // Cursor adds a small offset so the robot reacts to mouse without freezing the loop
        const offset = mx.get() * 0.6 + my.get() * 0.3;
        const target = ((baseT + offset) % dur + dur) % dur;
        try { v.currentTime = target; } catch { /* noop */ }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mx, my]);

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

      <video
        ref={videoRef}
        src={robotVideo.url}
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
        className="sr-only"
      />

      {/* Robot — transparent canvas output, no moving black rectangle */}
      <motion.canvas
        ref={canvasRef}
        width={1024}
        height={1280}
        className="relative z-10 h-[120%] w-auto max-w-none object-contain object-bottom select-none pointer-events-none"
        style={{
          rotateX,
          rotateY,
          x: xShift,
          transformOrigin: "50% 100%",
          transformStyle: "preserve-3d",
          filter:
            "drop-shadow(0 0 28px oklch(85% 0.22 145 / 0.16)) drop-shadow(0 14px 24px oklch(0% 0 0 / 0.28))",
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        draggable={false}
      />
    </div>
  );
}
