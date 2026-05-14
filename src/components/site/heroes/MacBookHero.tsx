import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

const keys = Array.from({ length: 56 }, (_, index) => index);
const bars = [44, 71, 58, 86, 67, 94];

export function MacBookHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 74%", "end 42%"],
  });

  const rawLidAngle = useTransform(scrollYProgress, [0, 0.82], [reduceMotion ? 0 : 88, 0]);
  const rawSceneY = useTransform(scrollYProgress, [0, 0.82, 1], [reduceMotion ? 0 : 28, 0, -18]);
  const rawGlow = useTransform(scrollYProgress, [0, 0.35, 0.9], [0.18, 0.72, 0.44]);
  const lidAngle = useSpring(rawLidAngle, { stiffness: 92, damping: 28, mass: 0.7 });
  const sceneY = useSpring(rawSceneY, { stiffness: 120, damping: 30, mass: 0.8 });

  return (
    <section ref={sectionRef} className="relative mx-auto h-[112vh] min-h-[680px] w-full max-w-[1240px] px-2 md:h-[125vh] md:min-h-[820px] md:px-6">
      <div className="sticky top-[16vh] mx-auto flex h-[62vh] min-h-[430px] w-full items-center justify-center md:top-[12vh] md:h-[72vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: sceneY }}
          className="relative mx-auto aspect-[16/10] w-full max-w-[1080px] [perspective:1800px]"
        >
          <motion.div
            aria-hidden
            style={{ opacity: rawGlow }}
            className="absolute left-1/2 top-[46%] h-[48%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-primary/25 blur-3xl"
          />
          <div aria-hidden className="absolute left-1/2 top-[76%] h-[20%] w-[86%] -translate-x-1/2 rounded-[100%] bg-foreground/15 blur-2xl" />

          <div className="absolute inset-0 [transform:rotateX(7deg)_rotateY(-5deg)] [transform-style:preserve-3d]">
            <div className="absolute bottom-[13%] left-1/2 z-10 h-[19%] w-[92%] -translate-x-1/2 rounded-b-[32px] rounded-t-[12px] border border-foreground/10 bg-gradient-to-b from-foreground/85 via-foreground/62 to-foreground/36 shadow-[0_72px_120px_-58px_oklch(0%_0_0/1)] [transform:rotateX(64deg)] [transform-origin:50%_0%] [transform-style:preserve-3d]">
              <div className="absolute inset-x-[5%] top-[16%] grid grid-cols-14 gap-[0.9%]">
                {keys.map((key) => (
                  <span key={key} className="h-[clamp(3px,0.48vw,7px)] rounded-[2px] bg-background/22 shadow-[inset_0_1px_0_oklch(100%_0_0/0.08)]" />
                ))}
              </div>
              <div className="absolute bottom-[13%] left-1/2 h-[34%] w-[18%] -translate-x-1/2 rounded-[7px] border border-background/20 bg-background/18" />
              <div className="absolute left-1/2 top-0 h-[10%] w-[18%] -translate-x-1/2 rounded-b-full bg-background/24" />
            </div>

            <motion.div
              style={{ rotateX: lidAngle }}
              className="absolute bottom-[25.5%] left-[8%] right-[8%] z-30 aspect-[16/10] origin-bottom rounded-t-[26px] border border-foreground/10 bg-gradient-to-b from-foreground/95 via-foreground/82 to-foreground/58 p-[1.05%] shadow-[0_58px_150px_-72px_oklch(0%_0_0/1)] [backface-visibility:hidden] [transform-style:preserve-3d]"
            >
              <div className="relative h-full overflow-hidden rounded-t-[20px] border border-border/70 bg-background shadow-[inset_0_0_0_1px_oklch(100%_0_0/0.04)]">
                <WebsiteScreen />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-transparent via-foreground/10 to-transparent opacity-45" />
                <div aria-hidden className="absolute inset-0 ring-1 ring-inset ring-foreground/10" />
              </div>
              <div aria-hidden className="absolute bottom-[-2.4%] left-1/2 h-[3.8%] w-[104%] -translate-x-1/2 rounded-b-[12px] bg-foreground/70" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function WebsiteScreen() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,oklch(85%_0.2_145/0.22),transparent_30%),radial-gradient(circle_at_86%_18%,oklch(70%_0.18_255/0.18),transparent_32%)]" />
      <div className="relative flex h-full flex-col p-[3.2%]">
        <div className="flex items-center justify-between border-b border-border/70 pb-[2.1%]">
          <div className="font-display text-[clamp(14px,1.75vw,28px)] font-bold leading-none tracking-normal">
            ACELER<span className="text-primary">IQ</span>
          </div>
          <div className="hidden items-center gap-5 font-mono text-[clamp(7px,0.7vw,10px)] uppercase tracking-[0.16em] text-muted-foreground md:flex">
            <span>Sites</span>
            <span>SEO</span>
            <span>CRM</span>
            <span>Growth</span>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-12 gap-[3.2%] pt-[4%]">
          <div className="col-span-7 flex flex-col justify-between">
            <div>
              <div className="mb-[3%] inline-flex border border-primary/30 px-[2%] py-[1%] font-mono text-[clamp(6px,0.68vw,10px)] uppercase tracking-[0.18em] text-primary">
                site premium ativo
              </div>
              <h2 className="max-w-[9ch] font-display text-[clamp(28px,5vw,72px)] font-bold uppercase leading-[0.88] tracking-normal">
                Presença que vende
              </h2>
              <p className="mt-[4%] max-w-[36ch] text-[clamp(8px,0.9vw,14px)] leading-[1.55] text-muted-foreground">
                Narrativa, prova, SEO e conversão conectados em uma página rápida.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-[3%]">
              {[
                ["Load", "0.8s", "edge"],
                ["SEO", "98", "score"],
                ["Lead", "+41%", "lift"],
              ].map(([label, value, detail]) => (
                <div key={label} className="border border-border/80 bg-foreground/[0.03] p-[8%]">
                  <div className="font-mono text-[clamp(6px,0.65vw,9px)] uppercase tracking-[0.14em] text-muted-foreground">
                    {label}
                  </div>
                  <div className="mt-[8%] font-display text-[clamp(14px,2vw,28px)] font-semibold leading-none tracking-normal">
                    {value}
                  </div>
                  <div className="mt-[8%] text-[clamp(6px,0.72vw,10px)] text-primary">{detail}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-5 grid grid-rows-[1fr_0.72fr] gap-[5%]">
            <div className="relative overflow-hidden border border-primary/25 bg-primary/[0.06] p-[6%]">
              <div aria-hidden className="absolute inset-x-[12%] bottom-[16%] h-[44%] bg-primary/25 blur-2xl" />
              <div className="relative h-full">
                <div className="mb-[7%] font-mono text-[clamp(6px,0.7vw,10px)] uppercase tracking-[0.16em] text-primary">
                  funil em tempo real
                </div>
                <div className="flex h-[72%] items-end gap-[4%]">
                  {bars.map((height, index) => (
                    <div key={index} className="flex-1 bg-gradient-to-t from-primary/30 to-primary" style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>
            </div>

            <div className="border border-border/80 bg-foreground/[0.03] p-[6%]">
              <div className="font-mono text-[clamp(6px,0.7vw,10px)] uppercase tracking-[0.16em] text-muted-foreground">
                stack
              </div>
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
