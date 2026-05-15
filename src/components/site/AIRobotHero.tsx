import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import robotVideo from "@/assets/ai-robot-alive.mp4.asset.json";

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

  // Cursor (-1..1) drives video scrubbing + subtle body twist
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 65, damping: 20, mass: 0.7 });
  const sy = useSpring(my, { stiffness: 65, damping: 20, mass: 0.7 });

  const rotateY = useTransform(sx, [-1, 1], [-6, 6]);
  const xShift  = useTransform(sx, [-1, 1], [-4, 4]);

  // Scroll velocity → head tilt (look up when scrolling up, down when scrolling down)
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

  // Scroll-direction tilt with decay
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

  // Scrub the video frame from cursor position (X dominant, Y biases toward end)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    let raf = 0;
    let current = 0;
    const tick = () => {
      const dur = v.duration;
      if (dur && isFinite(dur)) {
        // cursor X (-1..1) → 0..1, plus a touch of Y so vertical motion advances the frame
        const xn = (mx.get() + 1) / 2;
        const yn = (my.get() + 1) / 2;
        const target = Math.max(0, Math.min(1, xn * 0.75 + yn * 0.25)) * (dur - 0.05);
        current += (target - current) * 0.14;
        try { v.currentTime = current; } catch { /* noop */ }
      }
      raf = requestAnimationFrame(tick);
    };
    const start = () => { tick(); };
    if (v.readyState >= 1) start();
    else v.addEventListener("loadedmetadata", start, { once: true });
    return () => cancelAnimationFrame(raf);
  }, [mx, my]);

  return (
    <div
      ref={wrapRef}
      className="relative w-full aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] overflow-visible flex items-end justify-center [perspective:1600px]"
    >
      {/* Floating tech logos around the robot */}
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

      {/* Ground platform — sits under the feet, ambient with the marquee band below */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 bottom-[2%] z-0 pointer-events-none"
        style={{
          width: "62%",
          height: "26px",
          background:
            "radial-gradient(ellipse at center, oklch(85% 0.22 145 / 0.55) 0%, oklch(85% 0.22 145 / 0.18) 45%, transparent 75%)",
          filter: "blur(6px)",
        }}
      />
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 bottom-[1%] z-0 pointer-events-none"
        style={{
          width: "44%",
          height: "10px",
          background:
            "radial-gradient(ellipse at center, oklch(0% 0 0 / 0.7) 0%, oklch(0% 0 0 / 0.3) 60%, transparent 90%)",
          filter: "blur(4px)",
        }}
      />

      {/* Robot — video frame is scrubbed by the cursor (no auto loop) */}
      <motion.video
        ref={videoRef}
        src={robotVideo.url}
        muted
        playsInline
        preload="auto"
        width={1024}
        height={1280}
        className="relative z-10 h-[118%] w-auto max-w-none object-contain object-bottom select-none pointer-events-none"
        style={{
          rotateX,
          rotateY,
          x: xShift,
          transformOrigin: "50% 100%",
          transformStyle: "preserve-3d",
          // Soft radial mask hides the rectangular video bg into the hero
          WebkitMaskImage:
            "radial-gradient(ellipse 62% 90% at 50% 52%, #000 58%, rgba(0,0,0,0.6) 78%, transparent 94%)",
          maskImage:
            "radial-gradient(ellipse 62% 90% at 50% 52%, #000 58%, rgba(0,0,0,0.6) 78%, transparent 94%)",
          mixBlendMode: "lighten",
          filter:
            "drop-shadow(0 30px 50px oklch(0% 0 0 / 0.55)) drop-shadow(0 0 60px oklch(85% 0.22 145 / 0.28)) drop-shadow(0 0 110px oklch(85% 0.22 145 / 0.16))",
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        draggable={false}
      />
    </div>
  );
}
