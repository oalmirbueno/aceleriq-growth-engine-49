import { motion } from "framer-motion";

const metrics = [
  { label: "Leads", value: "847", detail: "+38%" },
  { label: "ROAS", value: "6.8x", detail: "+2.1x" },
  { label: "SEO", value: "98", detail: "CWV" },
];

const bars = [42, 64, 52, 78, 70, 92];

export function MacBookHero() {
  return (
    <div className="relative mx-auto w-full max-w-[1120px] px-2 py-4 md:px-6 md:py-8">
      <div aria-hidden className="absolute left-1/2 top-1/2 h-[52%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-primary/20 blur-3xl" />
      <div aria-hidden className="absolute left-1/2 top-[58%] h-[18%] w-[72%] -translate-x-1/2 rounded-[100%] bg-foreground/10 blur-2xl" />

      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto [perspective:1600px]"
      >
        <div className="relative mx-auto aspect-[16/10] w-full max-w-[980px] [transform:rotateX(5deg)_rotateY(-4deg)] [transform-style:preserve-3d]">
          <div className="absolute left-[6%] right-[6%] top-[2%] z-20 aspect-[16/10] rounded-t-[24px] border border-foreground/10 bg-gradient-to-b from-foreground/95 via-foreground/80 to-foreground/55 p-[1.15%] shadow-[0_52px_130px_-70px_oklch(0%_0_0/1)]">
            <div className="relative h-full overflow-hidden rounded-t-[18px] border border-border/70 bg-background">
              <DashboardScreen />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-transparent via-foreground/10 to-transparent opacity-60" />
              <div aria-hidden className="absolute inset-0 ring-1 ring-inset ring-foreground/10" />
            </div>
          </div>

          <div className="absolute bottom-[12.5%] left-1/2 z-30 h-[7.5%] w-[82%] -translate-x-1/2 rounded-b-[28px] rounded-t-[8px] border border-foreground/10 bg-gradient-to-b from-foreground/90 via-foreground/70 to-foreground/35 shadow-[0_66px_120px_-54px_oklch(0%_0_0/1)]" />
          <div className="absolute bottom-[15.7%] left-1/2 z-40 h-[1.1%] w-[14%] -translate-x-1/2 rounded-b-full bg-background/30" />
          <div className="absolute bottom-[9%] left-1/2 z-0 h-[18%] w-[90%] -translate-x-1/2 rounded-[100%] bg-primary/14 blur-2xl" />
        </div>
      </motion.div>
    </div>
  );
}

function DashboardScreen() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,oklch(85%_0.2_145/0.24),transparent_28%),radial-gradient(circle_at_82%_18%,oklch(60%_0.2_250/0.2),transparent_30%)]" />
      <div className="relative flex h-full flex-col p-[3%]">
        <div className="flex items-center justify-between border-b border-border/70 pb-[2%]">
          <div className="font-display text-[clamp(14px,1.7vw,27px)] font-bold leading-none tracking-normal">
            ACELER<span className="text-primary">IQ</span>
          </div>
          <div className="hidden items-center gap-5 font-mono text-[clamp(7px,0.7vw,10px)] uppercase tracking-[0.18em] text-muted-foreground md:flex">
            <span>Home</span>
            <span>SEO</span>
            <span>Ads</span>
            <span>CRM</span>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-12 gap-[3%] pt-[4%]">
          <div className="col-span-7 flex flex-col justify-between">
            <div>
              <div className="mb-[3%] inline-flex border border-primary/30 px-[2%] py-[1%] font-mono text-[clamp(6px,0.68vw,10px)] uppercase tracking-[0.2em] text-primary">
                site premium ativo
              </div>
              <h2 className="max-w-[9ch] font-display text-[clamp(27px,5vw,72px)] font-bold uppercase leading-[0.88] tracking-normal">
                Crescimento digital real
              </h2>
              <p className="mt-[4%] max-w-[35ch] text-[clamp(8px,0.9vw,14px)] leading-[1.55] text-muted-foreground">
                Página com narrativa, prova, velocidade e conversão conectada ao CRM.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-[3%]">
              {metrics.map((metric) => (
                <div key={metric.label} className="border border-border/80 bg-foreground/[0.03] p-[8%]">
                  <div className="font-mono text-[clamp(6px,0.65vw,9px)] uppercase tracking-[0.16em] text-muted-foreground">{metric.label}</div>
                  <div className="mt-[8%] font-display text-[clamp(14px,2vw,28px)] font-semibold leading-none tracking-normal">{metric.value}</div>
                  <div className="mt-[8%] text-[clamp(6px,0.72vw,10px)] text-primary">{metric.detail}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-5 grid grid-rows-[1fr_0.72fr] gap-[5%]">
            <div className="relative overflow-hidden border border-primary/25 bg-primary/[0.06] p-[6%]">
              <div aria-hidden className="absolute inset-x-[12%] bottom-[16%] h-[44%] bg-primary/25 blur-2xl" />
              <div className="relative h-full">
                <div className="mb-[7%] font-mono text-[clamp(6px,0.7vw,10px)] uppercase tracking-[0.18em] text-primary">funil em tempo real</div>
                <div className="flex h-[72%] items-end gap-[4%]">
                  {bars.map((height, index) => (
                    <div key={index} className="flex-1 bg-gradient-to-t from-primary/30 to-primary" style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>
            </div>

            <div className="border border-border/80 bg-foreground/[0.03] p-[6%]">
              <div className="font-mono text-[clamp(6px,0.7vw,10px)] uppercase tracking-[0.18em] text-muted-foreground">status</div>
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