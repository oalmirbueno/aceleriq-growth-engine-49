import { useEffect, useState } from "react";
import robotImage from "@/assets/ai-robot-3d.png";

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

  useEffect(() => {
    setTransform(loadTransform());
  }, []);

  return (
    <div className="relative w-full aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] overflow-visible flex items-end justify-center">
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

      {/* Robot — fixed transform from saved settings */}
      <div
        className="relative z-10 flex items-end justify-center h-[112%] w-auto"
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          transformOrigin: "50% 100%",
          willChange: "transform",
        }}
      >
        <img
          src={robotImage}
          alt="Robô de IA 3D da Aceleriq"
          loading="eager"
          decoding="async"
          width={1024}
          height={1280}
          className="h-full w-auto max-w-none object-contain object-bottom select-none pointer-events-none"
          style={{
            transformOrigin: "50% 100%",
            filter:
              "brightness(1.06) contrast(1.08) saturate(1.08) drop-shadow(0 0 22px oklch(85% 0.22 145 / 0.16)) drop-shadow(0 10px 18px oklch(0% 0 0 / 0.28))",
          }}
          draggable={false}
        />
      </div>
    </div>
  );
}
