import { useEffect, useRef, useState, useCallback, ReactNode, createContext, useContext } from "react";
import { supabase } from "@/integrations/supabase/client";

// ─────────────────────────────────────────────────────────────
// Layout Editor — drag, resize, rotate, opacity, z-index per element
// Persists to Supabase (cross-device) + localStorage (offline cache)
// Activate via ?edit=1 in URL or pressing Shift+E
// ─────────────────────────────────────────────────────────────

const STORAGE_KEY = "lovable-layout-editor-v2";

export type LayoutTransform = {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  opacity: number;
  z_index: number;
  width?: number | null;
  height?: number | null;
};

const DEFAULT: LayoutTransform = {
  x: 0, y: 0, scale: 1, rotation: 0, opacity: 1, z_index: 0, width: null, height: null,
};

type Store = Record<string, LayoutTransform>;

// ─── Local cache ─────────────────────────────────────
function readCache(): Store {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
}
function writeCache(store: Store) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  window.dispatchEvent(new CustomEvent("layout-editor:change"));
}

let memoryStore: Store = readCache();

function getAll(): Store { return memoryStore; }
function getOne(id: string): LayoutTransform { return { ...DEFAULT, ...memoryStore[id] }; }

// ─── Cloud sync ─────────────────────────────────────
let saveTimers: Record<string, NodeJS.Timeout> = {};
let lastSavedAt: Record<string, string> = {};

async function loadFromCloud() {
  try {
    const { data, error } = await supabase.from("layout_overrides").select("*");
    if (error) throw error;
    const next: Store = {};
    (data || []).forEach((row: any) => {
      next[row.id] = {
        x: row.x, y: row.y, scale: row.scale, rotation: row.rotation,
        opacity: row.opacity, z_index: row.z_index,
        width: row.width, height: row.height,
      };
      lastSavedAt[row.id] = row.updated_at;
    });
    memoryStore = { ...readCache(), ...next };
    writeCache(memoryStore);
  } catch (e) {
    console.warn("[layout-editor] cloud load failed, using cache", e);
  }
}

function queueCloudSave(id: string, t: LayoutTransform) {
  if (saveTimers[id]) clearTimeout(saveTimers[id]);
  setSavingState(true);
  saveTimers[id] = setTimeout(async () => {
    try {
      const { error } = await supabase.from("layout_overrides").upsert({
        id, x: t.x, y: t.y, scale: t.scale, rotation: t.rotation,
        opacity: t.opacity, z_index: t.z_index,
        width: t.width ?? null, height: t.height ?? null,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      setSavingState(false);
    } catch (e) {
      console.warn("[layout-editor] cloud save failed", e);
      setSavingState(false);
    }
  }, 400);
}

let savingListeners: Array<(s: boolean) => void> = [];
function setSavingState(s: boolean) { savingListeners.forEach((cb) => cb(s)); }
function onSaving(cb: (s: boolean) => void) {
  savingListeners.push(cb);
  return () => { savingListeners = savingListeners.filter((x) => x !== cb); };
}

// ─── Realtime ─────────────────────────────────────
function subscribeRealtime() {
  const channel = supabase
    .channel("layout_overrides_sync")
    .on("postgres_changes", { event: "*", schema: "public", table: "layout_overrides" }, (payload: any) => {
      const row = payload.new || payload.old;
      if (!row) return;
      // Skip our own writes
      if (lastSavedAt[row.id] === row.updated_at) return;
      if (payload.eventType === "DELETE") {
        delete memoryStore[row.id];
      } else {
        memoryStore[row.id] = {
          x: row.x, y: row.y, scale: row.scale, rotation: row.rotation,
          opacity: row.opacity, z_index: row.z_index,
          width: row.width, height: row.height,
        };
        lastSavedAt[row.id] = row.updated_at;
      }
      writeCache(memoryStore);
    })
    .subscribe();
  return () => { supabase.removeChannel(channel); };
}

// ─── Public API ─────────────────────────────────────
function setTransform(id: string, patch: Partial<LayoutTransform>) {
  const next = { ...DEFAULT, ...memoryStore[id], ...patch };
  memoryStore = { ...memoryStore, [id]: next };
  writeCache(memoryStore);
  queueCloudSave(id, next);
}

async function resetTransform(id: string) {
  delete memoryStore[id];
  writeCache(memoryStore);
  await supabase.from("layout_overrides").delete().eq("id", id);
}

async function resetAll() {
  memoryStore = {};
  writeCache(memoryStore);
  await supabase.from("layout_overrides").delete().neq("id", "");
}

export function useLayoutTransform(id: string): LayoutTransform {
  const [t, setT] = useState<LayoutTransform>(() => getOne(id));
  useEffect(() => {
    const update = () => setT(getOne(id));
    window.addEventListener("layout-editor:change", update);
    return () => window.removeEventListener("layout-editor:change", update);
  }, [id]);
  return t;
}

// ─── Editor context ─────────────────────────────────────
type EditorCtx = {
  active: boolean;
  selected: string | null;
  setSelected: (id: string | null) => void;
  ids: string[];
  registerId: (id: string) => void;
};
const Ctx = createContext<EditorCtx>({ active: false, selected: null, setSelected: () => {}, ids: [], registerId: () => {} });

export function useEditor() { return useContext(Ctx); }

export function LayoutEditorProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [ids, setIds] = useState<string[]>([]);

  const registerId = useCallback((id: string) => {
    setIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  // Load from cloud + subscribe on mount
  useEffect(() => {
    loadFromCloud();
    const unsub = subscribeRealtime();
    return unsub;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (new URLSearchParams(window.location.search).get("edit") === "1") setActive(true);
    const handler = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === "E" || e.key === "e")) setActive((a) => !a);
      if (!active || !selected) return;
      const t = getOne(selected);
      const step = e.shiftKey ? 10 : 1;
      if (e.key === "ArrowLeft") { e.preventDefault(); setTransform(selected, { x: t.x - step }); }
      if (e.key === "ArrowRight") { e.preventDefault(); setTransform(selected, { x: t.x + step }); }
      if (e.key === "ArrowUp") { e.preventDefault(); setTransform(selected, { y: t.y - step }); }
      if (e.key === "ArrowDown") { e.preventDefault(); setTransform(selected, { y: t.y + step }); }
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, selected]);

  return (
    <Ctx.Provider value={{ active, selected, setSelected, ids, registerId }}>
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
  const { active, selected, setSelected, registerId } = useEditor();
  const t = useLayoutTransform(id);
  const ref = useRef<HTMLDivElement>(null);
  const isSelected = selected === id;

  useEffect(() => { registerId(id); }, [id, registerId]);

  const style: React.CSSProperties = {
    transform: `translate(${t.x}px, ${t.y}px) scale(${t.scale}) rotate(${t.rotation}deg)`,
    transformOrigin: "center center",
    width: t.width ?? undefined,
    height: t.height ?? undefined,
    opacity: t.opacity,
    zIndex: t.z_index || undefined,
    position: "relative",
  };

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (!active) return;
    const target = e.target as HTMLElement;
    if (target.closest("[data-resize-handle]") || target.closest("[data-rotate-handle]")) return;
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
  }, [active, id, t.x, t.y, setSelected]);

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
      let w = startW, h = startH, nx = startPos.x, ny = startPos.y;
      if (corner === "se") { w = startW + dx; h = startH + dy; }
      if (corner === "sw") { w = startW - dx; h = startH + dy; nx = startPos.x + dx; }
      if (corner === "ne") { w = startW + dx; h = startH - dy; ny = startPos.y + dy; }
      if (corner === "nw") { w = startW - dx; h = startH - dy; nx = startPos.x + dx; ny = startPos.y + dy; }
      setTransform(id, { width: Math.max(40, Math.round(w)), height: Math.max(40, Math.round(h)), x: nx, y: ny });
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const startRotate = (e: React.PointerEvent) => {
    if (!active) return;
    e.preventDefault();
    e.stopPropagation();
    setSelected(id);
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const startAngle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
    const startRot = t.rotation;
    const move = (ev: PointerEvent) => {
      const angle = Math.atan2(ev.clientY - cy, ev.clientX - cx) * (180 / Math.PI);
      setTransform(id, { rotation: Math.round(startRot + (angle - startAngle)) });
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  return (
    <div ref={ref} className={className} style={style} onPointerDown={onPointerDown} data-editable-id={id}>
      {children}
      {active && (
        <>
          <div
            className={`pointer-events-none absolute inset-0 border-2 ${isSelected ? "border-primary" : "border-primary/40 border-dashed"}`}
            style={{ zIndex: 9998 }}
          />
          <div
            className="absolute top-0 left-0 -translate-y-full bg-primary text-black text-[10px] font-mono px-2 py-0.5 font-bold pointer-events-none whitespace-nowrap"
            style={{ zIndex: 9999 }}
          >
            {id} · {Math.round(t.x)},{Math.round(t.y)} · ×{t.scale.toFixed(2)} · {t.rotation}°
          </div>
          {resizable && isSelected && (
            <>
              {(["nw", "ne", "sw", "se"] as const).map((c) => (
                <div
                  key={c}
                  data-resize-handle
                  onPointerDown={(e) => startResize(e, c)}
                  className="absolute w-3 h-3 bg-primary border border-black"
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
              {/* Rotate handle */}
              <div
                data-rotate-handle
                onPointerDown={startRotate}
                className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-yellow-400 border border-black rounded-full cursor-grab"
                style={{ top: -28, zIndex: 10000 }}
                title="Rotacionar"
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

// ─── Toolbar ─────────────────────────────────────
function EditorToolbar({ onClose }: { onClose: () => void }) {
  const { selected, setSelected, ids } = useEditor();
  const t = useLayoutTransform(selected || "");
  const [, force] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const u = () => force((n) => n + 1);
    window.addEventListener("layout-editor:change", u);
    const unsub = onSaving(setSaving);
    return () => { window.removeEventListener("layout-editor:change", u); unsub(); };
  }, []);

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(getAll(), null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "layout-overrides.json"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black/95 border border-primary/40 backdrop-blur-md px-4 py-3 font-mono text-xs text-white shadow-2xl max-w-[95vw]"
      style={{ zIndex: 100000 }}
    >
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-primary font-bold">EDITOR</span>
        <span className={`flex items-center gap-1 ${saving ? "text-yellow-400" : "text-green-400"}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${saving ? "bg-yellow-400 animate-pulse" : "bg-green-400"}`} />
          {saving ? "salvando…" : "sincronizado"}
        </span>
        <span className="text-white/40">|</span>
        <select
          value={selected || ""}
          onChange={(e) => setSelected(e.target.value || null)}
          className="bg-black border border-white/20 px-2 py-1 text-white"
        >
          <option value="">— selecionar elemento —</option>
          {ids.map((id) => <option key={id} value={id}>{id}</option>)}
        </select>
        <button onClick={exportJson} className="px-2 py-1 border border-white/20 hover:border-primary hover:text-primary">
          export
        </button>
        <button
          onClick={() => { if (confirm("Resetar TODAS as edições?")) resetAll(); }}
          className="px-2 py-1 border border-white/20 hover:border-red-500 hover:text-red-500"
        >
          reset all
        </button>
        <button
          onClick={() => { setSelected(null); onClose(); }}
          className="px-2 py-1 bg-primary text-black font-bold hover:bg-primary/80"
        >
          sair
        </button>
      </div>

      {selected && (
        <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
          <Slider label="escala" value={t.scale} min={0.2} max={3} step={0.05}
            onChange={(v: number) => setTransform(selected, { scale: v })} />
          <Slider label="rotação" value={t.rotation} min={-180} max={180} step={1}
            onChange={(v: number) => setTransform(selected, { rotation: v })} suffix="°" />
          <Slider label="opacidade" value={t.opacity} min={0} max={1} step={0.05}
            onChange={(v: number) => setTransform(selected, { opacity: v })} />
          <NumInput label="x" value={t.x} onChange={(v: number) => setTransform(selected, { x: v })} />
          <NumInput label="y" value={t.y} onChange={(v: number) => setTransform(selected, { y: v })} />
          <NumInput label="z-index" value={t.z_index} onChange={(v: number) => setTransform(selected, { z_index: v })} />
          <NumInput label="largura" value={t.width ?? 0} onChange={(v: number) => setTransform(selected, { width: v || null })} />
          <NumInput label="altura" value={t.height ?? 0} onChange={(v: number) => setTransform(selected, { height: v || null })} />
          <button
            onClick={() => resetTransform(selected)}
            className="px-2 py-1 border border-white/20 hover:border-primary hover:text-primary self-end"
          >
            reset elemento
          </button>
        </div>
      )}
      <div className="mt-2 text-[10px] text-white/40">
        Atalhos: <b>Shift+E</b> abre/fecha · <b>setas</b> movem · <b>Shift+setas</b> +10px · <b>Esc</b> deseleciona · alça amarela rotaciona
      </div>
    </div>
  );
}

function Slider({ label, value, min, max, step, onChange, suffix = "" }: any) {
  return (
    <label className="flex items-center gap-2">
      <span className="text-white/50 w-16">{label}</span>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))} className="flex-1" />
      <span className="w-12 text-primary text-right">{Number(value).toFixed(step < 1 ? 2 : 0)}{suffix}</span>
    </label>
  );
}

function NumInput({ label, value, onChange }: any) {
  return (
    <label className="flex items-center gap-2">
      <span className="text-white/50 w-16">{label}</span>
      <input type="number" value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="bg-black border border-white/20 px-2 py-1 w-full text-white" />
    </label>
  );
}
