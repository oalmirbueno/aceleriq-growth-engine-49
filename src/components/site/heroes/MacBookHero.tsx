import { useEffect, useRef, useState } from "react";
import laptopBase from "@/assets/aceleriq-laptop-base-transparent.webp";
import laptopLid from "@/assets/aceleriq-laptop-lid-transparent.webp";

export function MacBookHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(0.12);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let current = reduceMotion ? 1 : 0.12;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const raw = (vh * 0.72 - rect.top) / (vh * 0.95);
      const target = reduceMotion ? 1 : Math.min(1, Math.max(0.12, raw));
      current += (target - current) * 0.14;
      if (Math.abs(target - current) < 0.002) current = target;
      setOpen(current);
      raf = Math.abs(target - current) > 0.002 ? requestAnimationFrame(update) : 0;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const lidAngle = -76 + open * 76;
  const screenOpacity = Math.max(0, Math.min(1, (open - 0.5) / 0.32));

  return (
    <section ref={sectionRef} className="relative mx-auto mt-2 h-[520px] w-full max-w-[1180px] md:h-[600px]">
      <div className="absolute inset-0 flex items-start justify-center overflow-visible px-3 md:px-8">
        <div
          className="relative w-full max-w-[1050px]"
          style={{
            perspective: "1900px",
            transform: `translateY(${(1 - open) * 10}px) scale(${0.84 + open * 0.08})`,
          }}
        >
          <div
            className="relative mx-auto aspect-[16/9] w-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              aria-hidden
              className="absolute left-1/2 top-[72%] h-[18%] w-[76%] -translate-x-1/2 rounded-[100%] bg-foreground/25 blur-3xl"
              style={{ opacity: 0.32 + open * 0.28 }}
            />

            <div
              className="absolute left-[7.5%] right-[7.5%] top-[-4%] z-10 aspect-[3/2] origin-bottom"
              style={{
                transform: `rotateX(${lidAngle}deg) translateZ(-6px)`,
                transformStyle: "preserve-3d",
                transition: "transform 90ms linear",
              }}
            >
              <div className="absolute left-[12.8%] right-[12.8%] top-[12.8%] bottom-[13.2%] z-20 overflow-hidden rounded-[8px] bg-background">
                <AceleriqScreen opacity={screenOpacity} />
              </div>
              <img
                src={laptopLid}
                alt="Tela realista de notebook abrindo com o site da Aceleriq"
                width={1536}
                height={1024}
                className="relative z-10 h-full w-full object-contain drop-shadow-[0_42px_80px_rgba(0,0,0,0.65)]"
                draggable={false}
              />
            </div>

            <img
              src={laptopBase}
              alt="Base realista de notebook premium"
              width={1536}
              height={864}
              className="absolute inset-x-0 bottom-[8%] z-20 mx-auto w-full object-contain drop-shadow-[0_55px_85px_rgba(0,0,0,0.72)]"
              draggable={false}
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function AceleriqScreen({ opacity }: { opacity: number }) {
  return (
    <div className="h-full w-full bg-background text-foreground" style={{ opacity }}>
      <div className="flex h-[8%] items-center gap-[1.3%] border-b border-border/70 bg-foreground/[0.035] px-[2.2%]">
        <span className="h-[34%] aspect-square rounded-full bg-primary/85" />
        <span className="h-[34%] aspect-square rounded-full bg-foreground/22" />
        <span className="h-[34%] aspect-square rounded-full bg-foreground/14" />
        <div className="ml-[1.5%] flex h-[48%] flex-1 items-center rounded-sm border border-border/70 bg-background/80 px-[2%] font-mono text-[clamp(5px,0.5vw,9px)] uppercase tracking-[0.18em] text-muted-foreground/80">
          aceleriq.com.br
        </div>
      </div>

      <div className="relative h-[92%] overflow-hidden bg-grid-tech">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,oklch(85%_0.2_145/0.16),transparent_36%),linear-gradient(to_bottom,transparent,oklch(10%_0_0)_86%)]" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-[7%] text-center">
          <div className="font-display text-[clamp(7px,0.8vw,13px)] font-bold uppercase tracking-[0.38em] text-primary">
            Aceleriq
          </div>
          <div className="mt-[3%] max-w-[13ch] font-display text-[clamp(22px,4.6vw,70px)] font-bold uppercase leading-[0.86] tracking-[-0.04em]">
            Sites que vendem
          </div>
          <div className="mt-[3%] max-w-[40ch] text-[clamp(7px,0.75vw,12px)] leading-[1.55] text-foreground/70">
            Performance, SEO, CRM e conversão em uma experiência digital feita para receita.
          </div>
          <div className="mt-[4%] grid w-full max-w-[58%] grid-cols-3 gap-[3%]">
            {[
              ["LCP", "0.8s"],
              ["SEO", "98"],
              ["Leads", "+41%"],
            ].map(([label, value]) => (
              <div key={label} className="border border-border/80 bg-foreground/[0.035] px-[9%] py-[8%] text-left">
                <div className="font-mono text-[clamp(4px,0.42vw,7px)] uppercase tracking-[0.2em] text-muted-foreground/70">
                  {label}
                </div>
                <div className="mt-[5%] font-display text-[clamp(9px,1.15vw,18px)] font-bold leading-none text-primary">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}