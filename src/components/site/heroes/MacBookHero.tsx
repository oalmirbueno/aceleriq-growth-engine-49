import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

type RevealPhase = "closed" | "opening" | "live";

const navItems = ["Home", "SEO", "Ads", "CRM"];
const cards = [
  { label: "Leads", value: "847", detail: "+38%" },
  { label: "ROAS", value: "6.8x", detail: "+2.1x" },
  { label: "SEO", value: "98", detail: "CWV" },
];

export function MacBookHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<RevealPhase>("closed");
  const [phase, setPhase] = useState<RevealPhase>("closed");

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.25 });
  const lidRotate = useTransform(smooth, [0, 0.56, 1], [-74, -8, -2], { clamp: true });
  const laptopScale = useTransform(smooth, [0, 0.32, 0.78, 1], [0.86, 1, 1.08, 1.02], { clamp: true });
  const laptopY = useTransform(smooth, [0, 0.65, 1], [34, 0, -24], { clamp: true });
  const laptopRotateX = useTransform(smooth, [0, 0.5, 1], [12, 3, 0], { clamp: true });
  const panelOpacity = useTransform(smooth, [0.16, 0.4, 0.62], [0, 0.32, 1], { clamp: true });
  const screenGlow = useTransform(smooth, [0.05, 0.42, 1], [0.08, 0.7, 0.95], { clamp: true });
  const dashboardY = useTransform(smooth, [0.24, 0.72, 1], [34, 0, -12], { clamp: true });
  const reflectionX = useTransform(smooth, [0.12, 0.82], ["-40%", "120%"], { clamp: true });
  const stageOpacity = useTransform(smooth, [0, 0.88, 1], [1, 1, 0.72], { clamp: true });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const nextPhase = progress < 0.26 ? "closed" : progress < 0.62 ? "opening" : "live";
    if (phaseRef.current !== nextPhase) {
      phaseRef.current = nextPhase;
      setPhase(nextPhase);
    }
  });

  return (
    <div ref={wrapRef} className="relative h-[220vh]">
      <div className="sticky top-24 flex h-[calc(100vh-6rem)] w-full items-start justify-center overflow-hidden md:top-28 md:h-[calc(100vh-7rem)]">
        <motion.div style={{ opacity: stageOpacity }} className="relative mx-auto w-full max-w-[1180px] px-4 md:px-8">
          <motion.div
            aria-hidden
            style={{ opacity: screenGlow }}
            className="absolute left-1/2 top-[34%] h-[44vw] max-h-[560px] min-h-[260px] w-[86vw] max-w-[1120px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-primary/25 blur-3xl"
          />

          <div className="relative -mt-10 [perspective:2100px] md:-mt-16">
            <motion.div
              style={{ scale: laptopScale, y: laptopY, rotateX: laptopRotateX, transformStyle: "preserve-3d" }}
              className="relative mx-auto aspect-[16/10] w-full max-w-[1060px] will-change-transform"
            >
              <motion.div
                className="absolute left-[6%] right-[6%] top-[6%] z-20 aspect-[16/10] origin-bottom overflow-hidden rounded-t-[22px] border border-foreground/10 bg-gradient-to-b from-foreground/95 via-foreground/90 to-foreground/70 p-[1.1%] shadow-[0_42px_110px_-55px_oklch(0%_0_0/0.95)] will-change-transform [backface-visibility:hidden]"
                style={{ rotateX: lidRotate, transformStyle: "preserve-3d" }}
              >
                <div className="relative h-full overflow-hidden rounded-t-[16px] bg-background">
                  <motion.div aria-hidden style={{ opacity: screenGlow }} className="absolute inset-0 bg-primary/10" />
                  <motion.div
                    style={{ opacity: panelOpacity, y: dashboardY }}
                    className="relative h-full overflow-hidden bg-background"
                  >
                    <SiteFrame />
                  </motion.div>
                  <motion.div
                    aria-hidden
                    style={{ x: reflectionX }}
                    className="absolute inset-y-0 z-30 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-foreground/16 to-transparent"
                  />
                  <div aria-hidden className="absolute inset-0 rounded-t-[16px] ring-1 ring-inset ring-foreground/10" />
                </div>
              </motion.div>

              <div className="absolute bottom-[12%] left-1/2 z-10 h-[7.5%] w-[78%] -translate-x-1/2 rounded-b-[24px] rounded-t-[8px] border border-foreground/10 bg-gradient-to-b from-foreground/90 via-foreground/75 to-foreground/45 shadow-[0_70px_130px_-55px_oklch(0%_0_0/1)]" />
              <div className="absolute bottom-[15.4%] left-1/2 z-30 h-[1.2%] w-[16%] -translate-x-1/2 rounded-b-full bg-background/25" />
              <div className="absolute bottom-[10.8%] left-1/2 z-0 h-[18%] w-[88%] -translate-x-1/2 rounded-[100%] bg-primary/15 blur-2xl" />

              <motion.div
                style={{ opacity: useTransform(smooth, [0, 0.36, 0.58], [1, 0.55, 0], { clamp: true }) }}
                className="absolute left-1/2 top-[36%] z-40 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
              >
                <span className="font-display text-3xl font-bold text-foreground md:text-6xl">
                  ACELER<span className="text-primary">IQ</span>
                </span>
                <span className="mt-4 h-px w-28 bg-primary" />
                <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.34em] text-muted-foreground">
                  laptop abrindo no scroll
                </span>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            style={{ opacity: useTransform(smooth, [0, 0.74, 0.9], [1, 1, 0], { clamp: true }) }}
            className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground"
          >
            {phase === "closed" ? "role para abrir" : phase === "opening" ? "revelando painel" : "experiência ativa"}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function SiteFrame() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,oklch(85%_0.2_145/0.22),transparent_28%),radial-gradient(circle_at_86%_18%,oklch(60%_0.2_250/0.18),transparent_26%)]" />
      <div className="relative flex h-full flex-col p-[3.2%]">
        <div className="flex items-center justify-between border-b border-border/70 pb-[2%]">
          <div className="font-display text-[clamp(14px,1.7vw,28px)] font-bold leading-none">
            ACELER<span className="text-primary">IQ</span>
          </div>
          <div className="hidden items-center gap-5 font-mono text-[clamp(7px,0.7vw,11px)] uppercase tracking-[0.18em] text-muted-foreground md:flex">
            {navItems.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-12 gap-[3%] pt-[4%]">
          <div className="col-span-7 flex flex-col justify-between">
            <div>
              <div className="mb-[3%] inline-flex border border-primary/30 px-[2%] py-[1%] font-mono text-[clamp(6px,0.68vw,10px)] uppercase tracking-[0.22em] text-primary">
                site premium ativo
              </div>
              <h2 className="max-w-[9ch] font-display text-[clamp(28px,5.2vw,76px)] font-bold uppercase leading-[0.84] tracking-normal">
                Crescimento digital real
              </h2>
              <p className="mt-[4%] max-w-[35ch] text-[clamp(8px,0.9vw,14px)] leading-[1.55] text-muted-foreground">
                Página com narrativa, prova, velocidade e conversão conectada ao CRM.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-[3%]">
              {cards.map((card) => (
                <div key={card.label} className="border border-border/80 bg-foreground/[0.03] p-[8%]">
                  <div className="font-mono text-[clamp(6px,0.65vw,9px)] uppercase tracking-[0.18em] text-muted-foreground">{card.label}</div>
                  <div className="mt-[8%] font-display text-[clamp(14px,2vw,28px)] font-semibold leading-none">{card.value}</div>
                  <div className="mt-[8%] text-[clamp(6px,0.72vw,10px)] text-primary">{card.detail}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-5 grid grid-rows-[1fr_0.72fr] gap-[5%]">
            <div className="relative overflow-hidden border border-primary/25 bg-primary/[0.06] p-[6%]">
              <div className="absolute inset-x-[12%] bottom-[16%] h-[44%] bg-primary/25 blur-2xl" />
              <div className="relative h-full">
                <div className="mb-[7%] font-mono text-[clamp(6px,0.7vw,10px)] uppercase tracking-[0.2em] text-primary">funil em tempo real</div>
                <div className="flex h-[72%] items-end gap-[4%]">
                  {[42, 62, 54, 82, 72, 92].map((height, index) => (
                    <div key={index} className="flex-1 bg-gradient-to-t from-primary/30 to-primary" style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>
            </div>
            <div className="border border-border/80 bg-foreground/[0.03] p-[6%]">
              <div className="font-mono text-[clamp(6px,0.7vw,10px)] uppercase tracking-[0.2em] text-muted-foreground">status</div>
              <div className="mt-[5%] space-y-[4%]">
                {["Core Web Vitals", "SEO técnico", "CRM integrado"].map((item, index) => (
                  <div key={item} className="flex items-center gap-[4%]">
                    <span className="h-[0.55vw] max-h-2 min-h-1 w-[0.55vw] min-w-1 max-w-2 bg-primary" />
                    <span className="text-[clamp(8px,0.9vw,13px)] text-foreground/80">{item}</span>
                    <span className="ml-auto font-mono text-[clamp(6px,0.7vw,10px)] text-primary">0{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}