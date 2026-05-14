import { useEffect, useRef, useState } from "react";

const VIDEO_URL =
  "/__l5e/assets-v1/f6115db9-15ba-4460-8769-8aba4ed50151/sites-laptop-aceleriq-reveal.mp4";

/**
 * Real MacBook opening hero, scroll-scrubbed.
 * - Pins a tall section and maps scroll progress to video.currentTime
 * - Real footage of a laptop opening (not a CSS cartoon)
 * - When fully open, an interactive panel fades in over the screen area
 */
export function MacBookHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let target = 0;
    let current = 0;

    const compute = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // progress 0 when section top hits viewport top, 1 after we've scrolled (height - vh)
      const total = section.offsetHeight - vh;
      const scrolled = -rect.top;
      const p = Math.min(1, Math.max(0, scrolled / Math.max(1, total)));
      target = reduce ? 1 : p;
      tick();
    };

    const tick = () => {
      // smooth lerp toward target to avoid janky seeks
      current += (target - current) * 0.18;
      if (Math.abs(target - current) < 0.001) current = target;

      const dur = video.duration;
      if (dur && Number.isFinite(dur)) {
        const t = current * dur;
        // only seek if delta is meaningful
        if (Math.abs(video.currentTime - t) > 0.02) {
          try {
            video.currentTime = t;
          } catch {
            /* ignore */
          }
        }
      }
      setProgress(current);

      if (Math.abs(target - current) > 0.001) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };

    const onMeta = () => {
      setReady(true);
      compute();
    };

    video.addEventListener("loadedmetadata", onMeta);
    if (video.readyState >= 1) onMeta();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    compute();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      video.removeEventListener("loadedmetadata", onMeta);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Reveal the interactive panel only when the lid is mostly open
  const panelOpacity = Math.max(0, Math.min(1, (progress - 0.78) / 0.18));
  const panelScale = 0.96 + panelOpacity * 0.04;

  return (
    <div
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "220vh" }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Stage */}
        <div className="relative mx-auto w-full max-w-[1280px] px-4 md:px-6">
          {/* Soft floor glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[58%] h-[55%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-primary/20 blur-3xl"
            style={{ opacity: 0.35 + progress * 0.45 }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 bottom-[6%] h-[12%] w-[70%] -translate-x-1/2 rounded-[100%] bg-foreground/30 blur-2xl"
          />

          <div className="relative mx-auto aspect-[16/10] w-full">
            {/* Real laptop opening video, scroll-scrubbed */}
            <video
              ref={videoRef}
              src={VIDEO_URL}
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              className="absolute inset-0 h-full w-full object-contain"
              style={{
                opacity: ready ? 1 : 0,
                transition: "opacity 600ms ease",
              }}
            />

            {/* Interactive panel that appears once the lid is open */}
            <div
              className="pointer-events-none absolute left-[14%] right-[14%] top-[8%] bottom-[36%] flex items-center justify-center"
              style={{
                opacity: panelOpacity,
                transform: `scale(${panelScale})`,
                transition: "opacity 200ms linear",
              }}
            >
              <div
                className="pointer-events-auto h-full w-full overflow-hidden rounded-[6px] border border-white/10 bg-[#0a0a0a] shadow-[0_30px_120px_-40px_rgba(0,0,0,0.9)]"
                style={{ opacity: panelOpacity }}
              >
                <LiveScreen />
              </div>
            </div>
          </div>

          {/* Scroll hint */}
          <div
            className="pointer-events-none absolute left-1/2 bottom-4 -translate-x-1/2 text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground/70"
            style={{ opacity: Math.max(0, 1 - progress * 2) }}
          >
            role para abrir ↓
          </div>
        </div>
      </div>
    </div>
  );
}

function LiveScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="relative h-full w-full bg-[#0b0b0b] text-white">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#111] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <div className="ml-3 flex-1 truncate rounded-sm bg-black/40 px-2 py-[3px] text-[10px] text-white/60">
          https://aceleriq.com.br
        </div>
      </div>

      <div className="grid h-[calc(100%-30px)] grid-cols-12">
        {/* Left: brand + copy */}
        <div className="col-span-7 flex flex-col justify-between p-[3.5%]">
          <div>
            <div className="font-display text-[clamp(11px,1.3vw,18px)] font-bold">
              ACELER<span className="text-primary">IQ</span>
            </div>
            <h3 className="mt-[6%] max-w-[14ch] font-display text-[clamp(16px,2.6vw,38px)] font-bold uppercase leading-[0.95] tracking-[-0.03em]">
              Pronto para acelerar seu pipeline?
            </h3>
            <p className="mt-[3%] max-w-[34ch] text-[clamp(8px,0.95vw,12px)] leading-[1.55] text-white/60">
              Diagnóstico gratuito. Sites, tráfego e IA conectados ao seu CRM em até 14 dias.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-[3%]">
            {[
              ["LCP", "0.8s"],
              ["SEO", "98"],
              ["Leads", "+41%"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-sm border border-white/10 bg-white/[0.03] px-[8%] py-[10%]">
                <div className="font-mono text-[clamp(6px,0.65vw,9px)] uppercase tracking-[0.18em] text-white/40">
                  {k}
                </div>
                <div className="mt-1 font-display text-[clamp(11px,1.6vw,22px)] font-semibold leading-none">
                  {v}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: working signup form */}
        <div className="col-span-5 flex flex-col justify-center border-l border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-[5%]">
          {sent ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="text-primary text-[clamp(20px,2.5vw,32px)]">✓</div>
              <div className="mt-2 font-display text-[clamp(10px,1.1vw,15px)] uppercase tracking-[0.18em]">
                recebido
              </div>
              <div className="mt-1 text-[clamp(8px,0.85vw,11px)] text-white/60">
                Falamos com você em minutos.
              </div>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!name || !email) return;
                setSent(true);
              }}
              className="flex flex-col gap-[6%]"
            >
              <div className="font-mono text-[clamp(6px,0.7vw,9px)] uppercase tracking-[0.22em] text-primary">
                diagnóstico gratuito
              </div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                className="w-full rounded-sm border border-white/10 bg-black/40 px-3 py-2 text-[clamp(9px,1vw,12px)] outline-none focus:border-primary/60"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="E-mail corporativo"
                className="w-full rounded-sm border border-white/10 bg-black/40 px-3 py-2 text-[clamp(9px,1vw,12px)] outline-none focus:border-primary/60"
              />
              <button
                type="submit"
                className="mt-1 rounded-sm bg-primary px-3 py-2 text-[clamp(8px,0.9vw,11px)] font-bold uppercase tracking-[0.18em] text-primary-foreground hover:brightness-110"
              >
                quero meu diagnóstico →
              </button>
              <div className="text-[clamp(7px,0.7vw,9px)] text-white/40">
                Sem spam. Resposta em até 1 dia útil.
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
