import { useEffect, useRef, useState, useCallback, ReactNode, createContext, useContext } from "react";

// ─────────────────────────────────────────────────────────────
// Layout Editor — temporary tool for visually adjusting elements
// Persists position, size, scale per element ID in localStorage
// Activate via ?edit=1 in URL or pressing Shift+E
// ─────────────────────────────────────────────────────────────

const STORAGE_KEY = "lovable-layout-editor-v1";

export type LayoutTransform = {
  x: number;
  y: number;
  scale: number;
  width?: number | null;
  height?: number | null;
};

const DEFAULT: LayoutTransform = { x: 0, y: 0, scale: 1, width: null, height: null };

type Store = Record<string, LayoutTransform>;

function readStore(): Store {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeStore(store: Store) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  window.dispatchEvent(new CustomEvent("layout-editor:change"));
}

export function useLayoutTransform(id: string): LayoutTransform {
  const [t, setT] = useState<LayoutTransform>(() => ({ ...DEFAULT, ...readStore()[id] }));
  useEffect(() => {
    const update = () => setT({ ...DEFAULT, ...readStore()[id] });
    window.addEventListener("layout-editor:change", update);
    return () => window.removeEventListener("layout-editor:change", update);
  }, [id]);
  return t;
}

function setTransform(id: string, patch: Partial<LayoutTransform>) {
  const store = readStore();
  store[id] = { ...DEFAULT, ...store[id], ...patch };
  writeStore(store);
}

function resetTransform(id: string) {
  const store = readStore();
  delete store[id];
  writeStore(store);
}

function resetAll() {
  writeStore({});
}

// ─── Editor context ─────────────────────────────────────
type EditorCtx = { active: boolean; selected: string | null; setSelected: (id: string | null) => void };
const Ctx = createContext<EditorCtx>({ active: false, selected: null, setSelected: () => {} });

export function useEditor() {
  return useContext(Ctx);
}

export function LayoutEditorProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (new URLSearchParams(window.location.search).get("edit") === "1") {
      setActive(true);
    }
    const handler = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === "E" || e.key === "e")) {
        setActive((a) => !a);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <Ctx.Provider value={{ active, selected, setSelected }}>
      {children}
      {active && <EditorToolbar onClose={() => setActive(false)} />}
    </Ctx.Provider>
  );
}

// ─── Editable wrapper ─────────────────────────────────────
export function Editable({
  id,
  children,
  className = "",
  resizable = true,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  resizable?: boolean;
}) {
  const { active, selected, setSelected } = useEditor();
  const t = useLayoutTransform(id);
  const ref = useRef<HTMLDivElement>(null);
  const isSelected = selected === id;

  const style: React.CSSProperties = {
    transform: `translate(${t.x}px, ${t.y}px) scale(${t.scale})`,
    transformOrigin: "top left",
    width: t.width ?? undefined,
    height: t.height ?? undefined,
    position: "relative",
  };

  // Drag
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!active) return;
      const target = e.target as HTMLElement;
      if (target.closest("[data-resize-handle]")) return;
      e.preventDefault();
      e.stopPropagation();
      setSelected(id);
      const startX = e.clientX;
      const startY = e.clientY;
      const start = { x: t.x, y: t.y };
      const move = (ev: PointerEvent) => {
        setTransform(id, { x: start.x + (ev.clientX - startX), y: start.y + (ev.clientY - startY) });
      };
      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    },
    [active, id, t.x, t.y, setSelected]
  );

  const startResize = (e: React.PointerEvent, corner: "se" | "sw" | "ne" | "nw") => {
    if (!active) return;
    e.preventDefault();
    e.stopPropagation();
    setSelected(id);
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const startW = rect.width / t.scale;
    const startH = rect.height / t.scale;
    const startX = e.clientX;
    const startY = e.clientY;
    const startPos = { x: t.x, y: t.y };

    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      let w = startW;
      let h = startH;
      let nx = startPos.x;
      let ny = startPos.y;
      if (corner === "se") { w = startW + dx; h = startH + dy; }
      if (corner === "sw") { w = startW - dx; h = startH + dy; nx = startPos.x + dx; }
      if (corner === "ne") { w = startW + dx; h = startH - dy; ny = startPos.y + dy; }
      if (corner === "nw") { w = startW - dx; h = startH - dy; nx = startPos.x + dx; ny = startPos.y + dy; }
      setTransform(id, {
        width: Math.max(40, Math.round(w)),
        height: Math.max(40, Math.round(h)),
        x: nx,
        y: ny,
      });
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      onPointerDown={onPointerDown}
      data-editable-id={id}
    >
      {children}
      {active && (
        <>
          <div
            className={`pointer-events-none absolute inset-0 border-2 ${
              isSelected ? "border-primary" : "border-primary/40 border-dashed"
            }`}
            style={{ zIndex: 9998 }}
          />
          <div
            className="absolute top-0 left-0 -translate-y-full bg-primary text-black text-[10px] font-mono px-2 py-0.5 font-bold pointer-events-none"
            style={{ zIndex: 9999 }}
          >
            {id} · {Math.round(t.x)},{Math.round(t.y)} · ×{t.scale.toFixed(2)}
          </div>
          {resizable && isSelected && (
            <>
              {(["nw", "ne", "sw", "se"] as const).map((c) => (
                <div
                  key={c}
                  data-resize-handle
                  onPointerDown={(e) => startResize(e, c)}
                  className="absolute w-3 h-3 bg-primary border border-black cursor-nwse-resize"
                  style={{
                    zIndex: 10000,
                    top: c.startsWith("n") ? -6 : "auto",
                    bottom: c.startsWith("s") ? -6 : "auto",
                    left: c.endsWith("w") ? -6 : "auto",
                    right: c.endsWith("e") ? -6 : "auto",
                    cursor: c === "ne" || c === "sw" ? "nesw-resize" : "nwse-resize",
                  }}
                />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}

// ─── Toolbar ─────────────────────────────────────
function EditorToolbar({ onClose }: { onClose: () => void }) {
  const { selected, setSelected } = useEditor();
  const t = useLayoutTransform(selected || "");
  const [, force] = useState(0);
  useEffect(() => {
    const u = () => force((n) => n + 1);
    window.addEventListener("layout-editor:change", u);
    return () => window.removeEventListener("layout-editor:change", u);
  }, []);

  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black/95 border border-primary/40 backdrop-blur-md px-4 py-3 flex items-center gap-3 font-mono text-xs text-white shadow-2xl"
      style={{ zIndex: 100000 }}
    >
      <span className="text-primary font-bold">EDITOR</span>
      <span className="text-white/40">|</span>
      {selected ? (
        <>
          <span className="text-white/70">{selected}</span>
          <label className="flex items-center gap-1">
            <span className="text-white/50">escala</span>
            <input
              type="range"
              min={0.3}
              max={2}
              step={0.05}
              value={t.scale}
              onChange={(e) => setTransform(selected, { scale: parseFloat(e.target.value) })}
              className="w-24"
            />
            <span className="w-10 text-primary">{t.scale.toFixed(2)}</span>
          </label>
          <button
            onClick={() => resetTransform(selected)}
            className="px-2 py-1 border border-white/20 hover:border-primary hover:text-primary"
          >
            reset
          </button>
        </>
      ) : (
        <span className="text-white/40">clique em um elemento</span>
      )}
      <span className="text-white/40">|</span>
      <button
        onClick={() => {
          if (confirm("Resetar todas as edições?")) resetAll();
        }}
        className="px-2 py-1 border border-white/20 hover:border-red-500 hover:text-red-500"
      >
        reset all
      </button>
      <button
        onClick={() => {
          setSelected(null);
          onClose();
        }}
        className="px-2 py-1 bg-primary text-black font-bold hover:bg-primary/80"
      >
        sair
      </button>
    </div>
  );
}
