import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * 3D-feeling CSS robot head. Eyes track the cursor, body floats, neon halo.
 * Pure CSS / SVG — no external image, instant load.
 */
export function RobotHero() {
  const ref = useRef<HTMLDivElement>(null);
  const px = useSpring(useMotionValue(0), { stiffness: 120, damping: 14 });
  const py = useSpring(useMotionValue(0), { stiffness: 120, damping: 14 });
  const tilt = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / r.width;
      const dy = (e.clientY - cy) / r.height;
      px.set(Math.max(-1, Math.min(1, dx * 2)) * 8);
      py.set(Math.max(-1, Math.min(1, dy * 2)) * 6);
      tiltY.set(Math.max(-1, Math.min(1, dx * 2)) * 14);
      tilt.set(Math.max(-1, Math.min(1, dy * 2)) * -8);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [px, py, tilt, tiltY]);

  return (
    <div
      ref={ref}
      className="relative mx-auto flex h-[460px] w-full items-center justify-center [perspective:1400px]"
    >
      {/* Halo */}
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-[400px] w-[400px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(85% 0.2 145 / 0.35), transparent 70%)" }}
      />

      {/* Orbiting particles */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute h-1 w-1 rounded-full bg-primary"
          animate={{
            x: [0, Math.cos((i / 5) * Math.PI * 2) * 180, 0],
            y: [0, Math.sin((i / 5) * Math.PI * 2) * 180, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        />
      ))}

      {/* Robot float wrapper */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative"
      >
        <motion.div
          style={{ rotateX: tilt, rotateY: tiltY, transformStyle: "preserve-3d" }}
          className="relative"
        >
          <Robot pupilX={px} pupilY={py} />
        </motion.div>
      </motion.div>

      {/* Floor shadow */}
      <motion.div
        aria-hidden
        animate={{ scaleX: [1, 0.85, 1], opacity: [0.5, 0.35, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 h-3 w-48 rounded-[100%] blur-md"
        style={{ background: "radial-gradient(ellipse, oklch(0% 0 0 / 0.7), transparent 70%)" }}
      />
    </div>
  );
}

function Robot({ pupilX, pupilY }: { pupilX: any; pupilY: any }) {
  return (
    <div className="relative" style={{ transformStyle: "preserve-3d" }}>
      {/* Antenna */}
      <div className="absolute left-1/2 -top-10 -translate-x-1/2">
        <div className="mx-auto h-8 w-px bg-foreground/40" />
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="mx-auto h-3 w-3 -mt-1 rounded-full bg-primary shadow-[0_0_20px_oklch(85%_0.2_145/0.9)]"
        />
      </div>

      {/* Head */}
      <div
        className="relative h-[240px] w-[260px] rounded-[42px] border border-foreground/15"
        style={{
          background:
            "linear-gradient(180deg, #f5f5f5 0%, #e0e0e0 40%, #b8b8b8 100%)",
          boxShadow:
            "inset 0 -20px 40px oklch(0% 0 0 / 0.25), inset 0 20px 30px oklch(100% 0 0 / 0.6), 0 30px 60px -20px oklch(0% 0 0 / 0.7)",
          transform: "translateZ(0)",
        }}
      >
        {/* Visor (eye plate) */}
        <div
          className="absolute left-1/2 top-1/2 flex h-[120px] w-[210px] -translate-x-1/2 -translate-y-1/2 items-center justify-around overflow-hidden rounded-[28px] border border-black/40"
          style={{
            background: "linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)",
            boxShadow: "inset 0 4px 12px oklch(0% 0 0 / 0.9), inset 0 -2px 8px oklch(85% 0.2 145 / 0.15)",
          }}
        >
          {/* Scan line */}
          <motion.div
            aria-hidden
            animate={{ y: [-60, 60, -60] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-x-0 h-px bg-primary/60"
          />
          {/* Left eye */}
          <Eye pupilX={pupilX} pupilY={pupilY} />
          <Eye pupilX={pupilX} pupilY={pupilY} />
        </div>

        {/* Cheek lights */}
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-6 h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_oklch(85%_0.2_145/0.9)]"
        />
        <motion.span
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 right-6 h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_oklch(85%_0.2_145/0.9)]"
        />

        {/* Brand badge */}
        <div className="absolute left-1/2 bottom-3 -translate-x-1/2 font-mono text-[8px] uppercase tracking-[0.3em] text-foreground/40">
          ACELERIQ · v3
        </div>
      </div>

      {/* Neck */}
      <div className="mx-auto -mt-3 h-6 w-16 rounded-b-md border-x border-b border-foreground/15 bg-gradient-to-b from-[#c8c8c8] to-[#888]" />
      {/* Body chest */}
      <div
        className="relative mx-auto -mt-1 h-20 w-44 rounded-2xl border border-foreground/15"
        style={{
          background: "linear-gradient(180deg, #ddd 0%, #aaa 100%)",
          boxShadow:
            "inset 0 -8px 20px oklch(0% 0 0 / 0.2), 0 20px 40px -15px oklch(0% 0 0 / 0.6)",
        }}
      >
        <div className="absolute inset-3 flex items-center justify-center rounded-md bg-black/85">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="font-display text-xs font-bold tracking-[-0.04em] text-primary"
            style={{ textShadow: "0 0 12px oklch(85% 0.2 145 / 0.8)" }}
          >
            IQ
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Eye({ pupilX, pupilY }: { pupilX: any; pupilY: any }) {
  return (
    <div className="relative h-16 w-16 rounded-full border border-primary/30 bg-black"
      style={{ boxShadow: "inset 0 0 20px oklch(85% 0.2 145 / 0.25)" }}
    >
      <motion.div
        style={{ x: pupilX, y: pupilY }}
        className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_18px_oklch(85%_0.2_145/0.9)]"
      >
        <span className="absolute left-1.5 top-1.5 h-2 w-2 rounded-full bg-foreground/90" />
      </motion.div>
    </div>
  );
}
