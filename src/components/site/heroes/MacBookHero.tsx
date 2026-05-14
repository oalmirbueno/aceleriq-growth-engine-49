import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import laptopPoster from "@/assets/sites-laptop-aceleriq-real.jpg";
import laptopReveal from "@/assets/sites-laptop-aceleriq-reveal.mp4.asset.json";

type RevealPhase = "closed" | "waking" | "live";

export function MacBookHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastProgressRef = useRef(0);
  const phaseRef = useRef<RevealPhase>("closed");
  const [phase, setPhase] = useState<RevealPhase>("closed");

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.22, 0.72, 1], [0.9, 0.96, 1.08, 1.02], { clamp: true });
  const rotateX = useTransform(scrollYProgress, [0, 0.55], [8, 0], { clamp: true });
  const rotateY = useTransform(scrollYProgress, [0, 0.55], [-10, 0], { clamp: true });
  const y = useTransform(scrollYProgress, [0, 0.72, 1], [28, 0, -34], { clamp: true });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.2, 0.9], [0.15, 0.75, 0.45], { clamp: true });
  const veilOpacity = useTransform(scrollYProgress, [0, 0.5, 0.76], [0.1, 0.18, 0], { clamp: true });
  const statusOpacity = useTransform(scrollYProgress, [0, 0.16, 0.82], [1, 1, 0], { clamp: true });
  const hudOpacity = useTransform(scrollYProgress, [0.62, 0.82], [0, 1], { clamp: true });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    lastProgressRef.current = progress;
    const nextPhase = progress < 0.34 ? "closed" : progress < 0.7 ? "waking" : "live";
    if (phaseRef.current !== nextPhase) {
      phaseRef.current = nextPhase;
      setPhase(nextPhase);
    }

    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const video = videoRef.current;
      if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
      video.currentTime = Math.min(video.duration - 0.04, Math.max(0, lastProgressRef.current * video.duration));
    });
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0.01;
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative h-[230vh]">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="relative mx-auto w-full max-w-[1120px] px-4 [perspective:1800px] md:px-8">
          <motion.div
            aria-hidden
            style={{ opacity: glowOpacity }}
            className="absolute left-1/2 top-1/2 h-[42vw] max-h-[520px] min-h-[260px] w-[86vw] max-w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-primary/25 blur-3xl"
          />

          <motion.div
            style={{ scale, rotateX, rotateY, y, transformStyle: "preserve-3d" }}
            className="relative will-change-transform"
          >
            <div className="relative overflow-hidden rounded-[18px] border border-foreground/10 bg-background shadow-[0_60px_160px_-70px_oklch(0%_0_0/0.95)]">
              <video
                ref={videoRef}
                className="block aspect-[120/68] w-full object-cover"
                src={laptopReveal.url}
                poster={laptopPoster}
                preload="metadata"
                muted
                playsInline
                aria-label="Laptop hiper-realista revelando um painel digital premium"
              />
              <motion.div
                aria-hidden
                style={{ opacity: veilOpacity }}
                className="absolute inset-0 bg-background"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 0%, oklch(100% 0 0 / 0.08) 42%, transparent 58%), radial-gradient(circle at 24% 80%, oklch(85% 0.2 145 / 0.26), transparent 34%)",
                }}
              />
            </div>

            <motion.div
              style={{ opacity: statusOpacity }}
              className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
            >
              <span className="font-display text-3xl font-bold text-foreground md:text-6xl">
                ACELER<span className="text-primary">IQ</span>
              </span>
              <span className="mt-4 h-px w-28 bg-primary" />
              <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.34em] text-muted-foreground">
                abrindo experiência
              </span>
            </motion.div>

            <motion.div
              style={{ opacity: hudOpacity }}
              className="absolute bottom-5 left-5 hidden rounded-sm border border-primary/30 bg-background/70 px-4 py-3 shadow-2xl backdrop-blur-md md:block"
            >
              <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-primary">interface ativa</div>
              <div className="mt-1 font-display text-xl font-semibold text-foreground">Site premium em movimento</div>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ opacity: statusOpacity }}
            className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground"
          >
            {phase === "closed" ? "role para abrir" : phase === "waking" ? "revelando painel" : "experiência ativa"}
          </motion.div>
        </div>
      </div>
    </div>
  );
}