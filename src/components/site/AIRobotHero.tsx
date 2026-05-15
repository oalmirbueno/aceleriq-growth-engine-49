import { useEffect, useRef, useState } from "react";
import robotImage from "@/assets/ai-robot-3d.png";

const LOGOS = [
  { slug: "huggingface",  label: "Hugging Face", x: "2%",  y: "8%",  size: 40, delay: 0 },
  { slug: "anthropic",    label: "Claude",       x: "88%", y: "14%", size: 38, delay: 0.4 },
  { slug: "n8n",          label: "n8n",          x: "94%", y: "52%", size: 36, delay: 0.8 },
  { slug: "make",         label: "Make",         x: "0%",  y: "56%", size: 34, delay: 1.2 },
  { slug: "googlegemini", label: "Gemini",       x: "84%", y: "78%", size: 38, delay: 1.6 },
  { slug: "whatsapp",     label: "WhatsApp",     x: "4%",  y: "82%", size: 34, delay: 2.0 },
];

const STORAGE_KEY = "aceleriq.robot.transform.v1";

type Transform = { x: number; y: number; scale: number };
const DEFAULT_TRANSFORM: Transform = { x: 0, y: 0, scale: 1 };

function loadTransform(): Transform {
  if (typeof window === "undefined") return DEFAULT_TRANSFORM;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_TRANSFORM;
    const parsed = JSON.parse(raw);
    return {
      x: Number(parsed.x) || 0,
      y: Number(parsed.y) || 0,
      scale: Number(parsed.scale) || 1,
    };
  } catch {
    return DEFAULT_TRANSFORM;
  }
}

export function AIRobotHero() {
  const [transform, setTransform] = useState<Transform>(DEFAULT_TRANSFORM);
  const [editing, setEditing] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef<{ px: number; py: number; tx: number; ty: number } | null>(null);

  useEffect(() => {
    setTransform(loadTransform());
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => {
      if (!dragStart.current) return;
      const dx = e.clientX - dragStart.current.px;
      const dy = e.clientY - dragStart.current.py;
      setTransform((t) => ({ ...t, x: dragStart.current!.tx + dx, y: dragStart.current!.ty + dy }));
    };
    const onUp = () => {
      setDragging(false);
      dragStart.current = null;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragging]);

  const save = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(transform));
    } catch {}
    setEditing(false);
  };

  const reset = () => {
    setTransform(DEFAULT_TRANSFORM);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

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

      {/* Robot — static, position/scale controlled by editor (persisted) */}
      <div
        className="relative z-10 flex items-end justify-center h-[112%] w-auto"
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          transformOrigin: "50% 100%",
          cursor: editing ? (dragging ? "grabbing" : "grab") : "default",
          willChange: "transform",
        }}
        onPointerDown={(e) => {
          if (!editing) return;
          e.preventDefault();
          dragStart.current = { px: e.clientX, py: e.clientY, tx: transform.x, ty: transform.y };
          setDragging(true);
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
            outline: editing ? "1px dashed oklch(85% 0.22 145 / 0.6)" : "none",
            outlineOffset: 8,
          }}
          draggable={false}
        />
      </div>

      {/* Editor toggle */}
      {!editing && (
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="absolute top-2 right-2 z-40 px-3 py-1.5 text-xs rounded-md bg-black/60 hover:bg-black/80 text-white border border-white/15 backdrop-blur"
        >
          Editar robô
        </button>
      )}

      {/* Editor panel */}
      {editing && (
        <div className="absolute top-2 right-2 z-40 w-64 rounded-lg bg-black/85 border border-white/15 backdrop-blur p-3 text-white text-xs space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="font-semibold tracking-wide">Editor do robô</span>
            <span className="text-[10px] opacity-60">arraste o robô</span>
          </div>

          <label className="block space-y-1">
            <div className="flex justify-between"><span>Tamanho</span><span className="opacity-70">{transform.scale.toFixed(2)}×</span></div>
            <input
              type="range" min={0.4} max={2.5} step={0.01}
              value={transform.scale}
              onChange={(e) => setTransform((t) => ({ ...t, scale: parseFloat(e.target.value) }))}
              className="w-full"
            />
          </label>

          <label className="block space-y-1">
            <div className="flex justify-between"><span>Horizontal</span><span className="opacity-70">{Math.round(transform.x)}px</span></div>
            <input
              type="range" min={-300} max={300} step={1}
              value={transform.x}
              onChange={(e) => setTransform((t) => ({ ...t, x: parseFloat(e.target.value) }))}
              className="w-full"
            />
          </label>

          <label className="block space-y-1">
            <div className="flex justify-between"><span>Vertical</span><span className="opacity-70">{Math.round(transform.y)}px</span></div>
            <input
              type="range" min={-300} max={300} step={1}
              value={transform.y}
              onChange={(e) => setTransform((t) => ({ ...t, y: parseFloat(e.target.value) }))}
              className="w-full"
            />
          </label>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={save}
              className="flex-1 px-2 py-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 font-medium"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={() => { setTransform(loadTransform()); setEditing(false); }}
              className="px-2 py-1.5 rounded-md bg-white/10 hover:bg-white/20"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={reset}
              className="px-2 py-1.5 rounded-md bg-white/5 hover:bg-white/15"
              title="Resetar"
            >
              ↺
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
