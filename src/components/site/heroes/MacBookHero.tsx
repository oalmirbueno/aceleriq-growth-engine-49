import { useEffect, useRef } from "react";

const keys = Array.from({ length: 64 }, (_, index) => index);
const chartBars = [38, 62, 46, 78, 58, 92, 74];
const floatingCards = [
  { label: "LCP", value: "0.8s", className: "left-[4%] top-[22%]" },
  { label: "SEO", value: "98", className: "right-[3%] top-[30%]" },
  { label: "Leads", value: "+41%", className: "bottom-[22%] left-[10%]" },
];

export function MacBookHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const start = viewport * 0.88;
      const end = viewport * 0.24;
      const raw = (start - rect.top) / (start - end);
      const progress = reduceMotion ? 1 : Math.min(1, Math.max(0, raw));
      const eased =
        progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      stage.style.setProperty("--open", eased.toFixed(4));
      stage.style.setProperty("--lift", `${(1 - eased) * 24}px`);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto mt-0 h-[92vh] min-h-[610px] w-full max-w-[1320px] px-2 pb-10 pt-0 md:h-[104vh] md:min-h-[760px] md:px-6 md:pb-14"
    >
      <div
        ref={stageRef}
        className="notebook-stage sticky top-[102px] mx-auto flex h-[calc(100vh-112px)] min-h-[500px] w-full items-start justify-center pt-8 md:top-[92px] md:h-[calc(100vh-102px)] md:min-h-[620px] md:pt-10 [--lift:24px] [--open:0]"
      >
        <div
          aria-hidden
          className="absolute left-1/2 top-[52%] h-[58%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-primary/25 opacity-[calc(0.2+var(--open)*0.55)] blur-3xl"
        />
        <div
          aria-hidden
          className="absolute left-1/2 top-[78%] h-[18%] w-[78%] -translate-x-1/2 rounded-[100%] bg-foreground/15 blur-2xl"
        />

        {floatingCards.map((card, index) => (
          <div
            key={card.label}
            aria-hidden
            className={`pointer-events-none absolute z-30 hidden border border-primary/25 bg-background/75 px-4 py-3 text-left shadow-[0_22px_70px_-42px_oklch(0%_0_0/1)] backdrop-blur-xl md:block ${card.className}`}
            style={{
              opacity: `calc(var(--open) * ${index === 1 ? 0.78 : 0.62})`,
              transform: `translate3d(0, calc((1 - var(--open)) * ${index === 1 ? 34 : 46}px), 0)`,
            }}
          >
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
              {card.label}
            </div>
            <div className="mt-1 font-display text-2xl font-semibold leading-none tracking-normal text-foreground">
              {card.value}
            </div>
          </div>
        ))}

        <div className="relative mx-auto aspect-[16/9.8] w-full max-w-[1160px] [perspective:2100px]">
          <div className="absolute inset-0 [transform:translateY(var(--lift))_rotateX(7deg)_rotateY(-5deg)] [transform-style:preserve-3d]">
            <div className="absolute bottom-[12.5%] left-1/2 z-30 h-[18%] w-[93%] -translate-x-1/2 rounded-b-[36px] rounded-t-[12px] border border-foreground/10 bg-gradient-to-b from-foreground/90 via-foreground/64 to-foreground/38 shadow-[0_96px_150px_-70px_oklch(0%_0_0/1)] [transform:rotateX(63deg)] [transform-origin:50%_0%] [transform-style:preserve-3d]">
              <div className="absolute inset-x-[4.6%] top-[14%] grid grid-cols-[repeat(16,minmax(0,1fr))] gap-[0.75%]">
                {keys.map((key) => (
                  <span
                    key={key}
                    className="h-[clamp(3px,0.46vw,7px)] rounded-[2px] bg-background/24 shadow-[inset_0_1px_0_oklch(100%_0_0/0.1)]"
                  />
                ))}
              </div>
              <div className="absolute bottom-[12%] left-1/2 h-[34%] w-[20%] -translate-x-1/2 rounded-[7px] border border-background/25 bg-background/18 shadow-[inset_0_1px_0_oklch(100%_0_0/0.08)]" />
              <div className="absolute left-1/2 top-[-4%] h-[14%] w-[17%] -translate-x-1/2 rounded-b-full bg-background/22" />
              <div className="absolute -bottom-[9%] left-1/2 h-[20%] w-[108%] -translate-x-1/2 rounded-[100%] bg-primary/20 blur-2xl" />
            </div>

            <div className="absolute bottom-[26%] left-[6.5%] right-[6.5%] z-20 aspect-[16/9.9] origin-bottom rounded-t-[30px] border border-foreground/10 bg-gradient-to-b from-foreground/96 via-foreground/80 to-foreground/52 p-[1.05%] shadow-[0_65px_170px_-76px_oklch(0%_0_0/1)] [backface-visibility:hidden] [transform:rotateX(calc(-84deg+var(--open)*84deg))] [transform-style:preserve-3d]">
              <div className="relative h-full overflow-hidden rounded-t-[21px] border border-border/70 bg-background shadow-[inset_0_0_0_1px_oklch(100%_0_0/0.05)]">
                <WebsiteScreen />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-foreground/10 to-transparent opacity-45"
                />
                <div
                  aria-hidden
                  className="absolute left-1/2 top-[1.5%] h-[1.7%] w-[7%] -translate-x-1/2 rounded-full bg-background/40"
                />
              </div>
              <div
                aria-hidden
                className="absolute bottom-[-2.4%] left-1/2 h-[3.6%] w-[104%] -translate-x-1/2 rounded-b-[12px] bg-foreground/70"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WebsiteScreen() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,oklch(85%_0.2_145/0.24),transparent_30%),radial-gradient(circle_at_86%_18%,oklch(70%_0.18_255/0.18),transparent_32%)]" />
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
              <div
                aria-hidden
                className="absolute inset-x-[12%] bottom-[16%] h-[44%] bg-primary/25 blur-2xl"
              />
              <div className="relative h-full">
                <div className="mb-[7%] font-mono text-[clamp(6px,0.7vw,10px)] uppercase tracking-[0.16em] text-primary">
                  funil em tempo real
                </div>
                <div className="flex h-[72%] items-end gap-[4%]">
                  {chartBars.map((height, index) => (
                    <div
                      key={index}
                      className="flex-1 bg-gradient-to-t from-primary/30 to-primary"
                      style={{ height: `${height}%` }}
                    />
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
                    <span className="ml-auto font-mono text-[clamp(6px,0.7vw,10px)] text-primary">
                      0{index + 1}
                    </span>
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
