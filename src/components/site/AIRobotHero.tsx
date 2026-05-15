import { useEffect, useRef, useState } from "react";
import robotVideoAsset from "@/assets/ai-robot-alive-v5.mp4.asset.json";

const LOGOS = [
  { slug: "huggingface",  label: "Hugging Face", x: "2%",  y: "8%",  size: 40 },
  { slug: "anthropic",    label: "Claude",       x: "88%", y: "14%", size: 38 },
  { slug: "n8n",          label: "n8n",          x: "94%", y: "52%", size: 36 },
  { slug: "make",         label: "Make",         x: "0%",  y: "56%", size: 34 },
  { slug: "googlegemini", label: "Gemini",       x: "84%", y: "78%", size: 38 },
  { slug: "whatsapp",     label: "WhatsApp",     x: "4%",  y: "82%", size: 34 },
];

const STORAGE_KEY = "aceleriq.robot.transform.v1";
type Transform = { x: number; y: number; scale: number };
const DEFAULT_TRANSFORM: Transform = { x: 0, y: 0, scale: 1 };

function loadTransform(): Transform {
  if (typeof window === "undefined") return DEFAULT_TRANSFORM;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_TRANSFORM;
    const p = JSON.parse(raw);
    return {
      x: Number(p.x) || 0,
      y: Number(p.y) || 0,
      scale: Number(p.scale) || 1,
    };
  } catch {
    return DEFAULT_TRANSFORM;
  }
}

export function AIRobotHero() {
  const [transform, setTransform] = useState<Transform>(DEFAULT_TRANSFORM);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const robotRef = useRef<HTMLDivElement | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    setTransform(loadTransform());
  }, []);

  // Subtle mouse-follow CSS layer on top of the video
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // -1..1 normalized, then scaled
      target.current.x = ((e.clientX / w) - 0.5) * 2;
      target.current.y = ((e.clientY / h) - 0.5) * 2;
      if (raf.current == null) loop();
    };
    const loop = () => {
      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;
      current.current.x += dx * 0.08;
      current.current.y += dy * 0.08;
      const tx = current.current.x * 8; // px
      const ty = current.current.y * 5;
      const rx = -current.current.y * 4; // deg
      const ry = current.current.x * 6;
      if (robotRef.current) {
        robotRef.current.style.setProperty("--mx", `${tx}px`);
        robotRef.current.style.setProperty("--my", `${ty}px`);
        robotRef.current.style.setProperty("--rx", `${rx}deg`);
        robotRef.current.style.setProperty("--ry", `${ry}deg`);
      }
      if (Math.abs(dx) + Math.abs(dy) > 0.001) {
        raf.current = requestAnimationFrame(loop);
      } else {
        raf.current = null;
      }
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf.current != null) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative w-full aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] overflow-visible flex items-end justify-center"
      style={{ perspective: "900px" }}
    >
      {LOGOS.map((l) => (
        <img
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
        />
      ))}

      {/* Ground platform */}
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
            "radial-gradient(ellipse at center, oklch(0% 0 0 / 0.7) 0%, oklch(0% 0 0 / 0.28) 60%, transparent 92%)",
          filter: "blur(5px)",
          transform: "perspective(400px) rotateX(62deg)",
          transformOrigin: "center bottom",
        }}
      />

      {/* Robot — saved transform + subtle mouse-follow tilt. Video uses screen blend so the black bg disappears on the dark site. */}
      <div
        ref={robotRef}
        className="relative z-10 flex items-end justify-center h-[112%] w-auto"
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          transformOrigin: "50% 100%",
          willChange: "transform",
        }}
      >
        <div
          className="h-full w-auto"
          style={{
            transform:
              "translate3d(var(--mx,0px), var(--my,0px), 0) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
            transformStyle: "preserve-3d",
            transition: "transform 120ms linear",
            willChange: "transform",
          }}
        >
          <video
            src={robotVideoAsset.url}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="h-full w-auto max-w-none object-contain object-bottom select-none pointer-events-none"
            style={{
              mixBlendMode: "lighten",
              filter:
                "brightness(1.08) contrast(1.10) saturate(1.10) drop-shadow(0 0 22px oklch(85% 0.22 145 / 0.16)) drop-shadow(0 10px 18px oklch(0% 0 0 / 0.28))",
            }}
          />
        </div>
      </div>
    </div>
  );
}
