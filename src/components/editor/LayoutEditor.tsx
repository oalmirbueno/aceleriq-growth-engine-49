import { useEffect, useRef, useState, useCallback, ReactNode, createContext, useContext } from "react";
import { supabase } from "@/integrations/supabase/client";

// ─────────────────────────────────────────────────────────────
// Universal Layout Editor
// - Active via Shift+E or ?edit=1
// - Click ANY element on the page to select it (no wrapper needed)
// - Drag freely (any direction, any distance)
// - Resize from corners
// - Rotate, scale, opacity, z-index, width/height via toolbar
// - Persists to Supabase (cross-device, realtime) + localStorage
// ─────────────────────────────────────────────────────────────

const STORAGE_KEY = "lovable-layout-editor-v3";

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
function getOne(id: string): LayoutTransform { return { ...DEFAULT, ...memoryStore[id] }; }
function getAll(): Store { return memoryStore; }

// ─── Cloud sync ─────────────────────────────────────
const saveTimers: Record<string, ReturnType<typeof setTimeout>> = {};
const lastSavedAt: Record<string, string> = {};

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
    console.warn("[layout-editor] cloud load failed", e);
  }
}

function queueCloudSave(id: string, t: LayoutTransform) {
  if (saveTimers[id]) clearTimeout(saveTimers[id]);
  setSavingState(true);
  saveTimers[id] = setTimeout(async () => {
    try {
      const updatedAt = new Date().toISOString();
      const { error } = await supabase.from("layout_overrides").upsert({
        id, x: t.x, y: t.y, scale: t.scale, rotation: t.rotation,
        opacity: t.opacity, z_index: t.z_index,
        width: t.width ?? null, height: t.height ?? null,
        updated_at: updatedAt,
      });
      if (error) throw error;
      lastSavedAt[id] = updatedAt;
    } catch (e) {
      console.warn("[layout-editor] cloud save failed", e);
    } finally {
      setSavingState(false);
    }
  }, 350);
}

let savingListeners: Array<(s: boolean) => void> = [];
function setSavingState(s: boolean) { savingListeners.forEach((cb) => cb(s)); }
function onSaving(cb: (s: boolean) => void) {
  savingListeners.push(cb);
  return () => { savingListeners = savingListeners.filter((x) => x !== cb); };
}

function subscribeRealtime() {
  const channel = supabase
    .channel("layout_overrides_sync")
    .on("postgres_changes", { event: "*", schema: "public", table: "layout_overrides" }, (payload: any) => {
      const row = payload.new || payload.old;
      if (!row) return;
      if (lastSavedAt[row.id] === row.updated_at) return;
      if (payload.eventType === "DELETE") delete memoryStore[row.id];
      else {
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

// ─── Selector generator (stable path for any element) ─────────
function selectorFor(el: HTMLElement): string {
  // 1. If element has a stable id, use it
  if (el.dataset.editId) return `id:${el.dataset.editId}`;
  if (el.id) return `#${el.id}`;
  // 2. Otherwise build a structural path (tag + nth-of-type)
  const path: string[] = [];
  let node: HTMLElement | null = el;
  let depth = 0;
  while (node && node !== document.body && depth < 10) {
    const parent: HTMLElement | null = node.parentElement;
    if (!parent) break;
    const same = Array.from(parent.children).filter((c) => c.tagName === node!.tagName);
    const idx = same.indexOf(node);
    let seg = node.tagName.toLowerCase();
    if (same.length > 1) seg += `:nth-of-type(${idx + 1})`;
    path.unshift(seg);
    node = parent;
    depth++;
  }
  return `path:${path.join(">")}`;
}

function findElement(selector: string): HTMLElement | null {
  if (selector.startsWith("id:")) {
    return document.querySelector(`[data-edit-id="${selector.slice(3)}"]`) as HTMLElement | null;
  }
  if (selector.startsWith("#")) return document.getElementById(selector.slice(1));
  if (selector.startsWith("path:")) {
    try { return document.body.querySelector(selector.slice(5)) as HTMLElement | null; } catch { return null; }
  }
  return null;
}

// ─── Apply transforms to all matched elements ─────────
// NOTE: overrides são salvos em desktop e quebram o layout responsivo
// em mobile/tablet. Aplicamos apenas em viewports ≥ 1024px.
function applyAll() {
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
  Object.entries(memoryStore).forEach(([sel, t]) => {
    const el = findElement(sel);
    if (!el) return;
    if (!isDesktop) {
      // Limpa qualquer override aplicado antes (ao redimensionar do desktop p/ mobile)
      el.style.transform = "";
      el.style.opacity = "";
      el.style.width = "";
      el.style.height = "";
      el.style.zIndex = "";
      return;
    }
    el.style.transform = `translate(${t.x}px, ${t.y}px) scale(${t.scale}) rotate(${t.rotation}deg)`;
    el.style.transformOrigin = "center center";
    el.style.opacity = String(t.opacity);
    if (t.z_index) el.style.zIndex = String(t.z_index);
    if (t.width) el.style.width = `${t.width}px`;
    if (t.height) el.style.height = `${t.height}px`;
  });
}

// ─── Editor context ─────────────────────────────────────
type EditorCtx = { active: boolean; selected: string | null; setSelected: (s: string | null) => void };
const Ctx = createContext<EditorCtx>({ active: false, selected: null, setSelected: () => {} });
export function useEditor() { return useContext(Ctx); }

export function LayoutEditorProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  // Cloud load + realtime
  useEffect(() => {
    loadFromCloud().then(() => applyAll());
    const unsub = subscribeRealtime();
    const reapply = () => applyAll();
    window.addEventListener("layout-editor:change", reapply);
    window.addEventListener("resize", reapply);
    // Re-apply after route changes / DOM mutations
    const obs = new MutationObserver(() => applyAll());
    obs.observe(document.body, { childList: true, subtree: true });
    return () => { unsub(); window.removeEventListener("layout-editor:change", reapply); window.removeEventListener("resize", reapply); obs.disconnect(); };
  }, []);

  // Toggle key
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (new URLSearchParams(window.location.search).get("edit") === "1") setActive(true);
    const handler = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === "E" || e.key === "e")) {
        e.preventDefault();
        setActive((a) => !a);
      }
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
    <Ctx.Provider value={{ active, selected, setSelected }}>
      {children}
      {active && <UniversalEditor selected={selected} setSelected={setSelected} />}
      {active && <EditorToolbar selected={selected} setSelected={setSelected} onClose={() => setActive(false)} />}
    </Ctx.Provider>
  );
}

// ─── Universal click-to-select + drag overlay ─────────
function UniversalEditor({ selected, setSelected }: { selected: string | null; setSelected: (s: string | null) => void }) {
  const [hoverEl, setHoverEl] = useState<HTMLElement | null>(null);
  const [, force] = useState(0);
  const draggingRef = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (draggingRef.current) return;
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      if (!el) return setHoverEl(null);
      // Skip toolbar/overlays
      if (el.closest("[data-editor-ui]")) return setHoverEl(null);
      setHoverEl(el);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Re-render on store change to refresh handle positions
  useEffect(() => {
    const u = () => force((n) => n + 1);
    window.addEventListener("layout-editor:change", u);
    window.addEventListener("scroll", u, true);
    window.addEventListener("resize", u);
    return () => { window.removeEventListener("layout-editor:change", u); window.removeEventListener("scroll", u, true); window.removeEventListener("resize", u); };
  }, []);

  // Click handler — select
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-editor-ui]")) return;
      e.preventDefault();
      e.stopPropagation();
      const el = target as HTMLElement;
      const sel = selectorFor(el);
      el.dataset.editSel = sel;
      setSelected(sel);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [setSelected]);

  // Drag the selected element from anywhere on it
  useEffect(() => {
    if (!selected) return;
    const el = findElement(selected);
    if (!el) return;
    const onDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-editor-ui]")) return;
      if (!el.contains(target)) return;
      e.preventDefault();
      draggingRef.current = true;
      const t = getOne(selected);
      const startX = e.clientX, startY = e.clientY;
      const start = { x: t.x, y: t.y };
      const move = (ev: PointerEvent) => {
        setTransform(selected, { x: start.x + (ev.clientX - startX), y: start.y + (ev.clientY - startY) });
      };
      const up = () => {
        draggingRef.current = false;
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    };
    document.addEventListener("pointerdown", onDown, true);
    return () => document.removeEventListener("pointerdown", onDown, true);
  }, [selected]);

  const selEl = selected ? findElement(selected) : null;
  const selRect = selEl?.getBoundingClientRect();
  const hoverRect = hoverEl && hoverEl !== selEl ? hoverEl.getBoundingClientRect() : null;

  // Resize handles
  const startResize = (e: React.PointerEvent, corner: "se" | "sw" | "ne" | "nw") => {
    if (!selected || !selEl) return;
    e.preventDefault(); e.stopPropagation();
    const t = getOne(selected);
    const rect = selEl.getBoundingClientRect();
    const startW = rect.width / t.scale;
    const startH = rect.height / t.scale;
    const startX = e.clientX, startY = e.clientY;
    const startPos = { x: t.x, y: t.y };
    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      let w = startW, h = startH, nx = startPos.x, ny = startPos.y;
      if (corner === "se") { w = startW + dx; h = startH + dy; }
      if (corner === "sw") { w = startW - dx; h = startH + dy; nx = startPos.x + dx; }
      if (corner === "ne") { w = startW + dx; h = startH - dy; ny = startPos.y + dy; }
      if (corner === "nw") { w = startW - dx; h = startH - dy; nx = startPos.x + dx; ny = startPos.y + dy; }
      setTransform(selected, { width: Math.max(20, Math.round(w)), height: Math.max(20, Math.round(h)), x: nx, y: ny });
    };
    const up = () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const startRotate = (e: React.PointerEvent) => {
    if (!selected || !selEl) return;
    e.preventDefault(); e.stopPropagation();
    const t = getOne(selected);
    const rect = selEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const startAngle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
    const startRot = t.rotation;
    const move = (ev: PointerEvent) => {
      const a = Math.atan2(ev.clientY - cy, ev.clientX - cx) * (180 / Math.PI);
      setTransform(selected, { rotation: Math.round(startRot + (a - startAngle)) });
    };
    const up = () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  return (
    <div data-editor-ui className="fixed inset-0 pointer-events-none" style={{ zIndex: 99999 }}>
      {/* Hover outline */}
      {hoverRect && (
        <div
          className="absolute border border-primary/60 pointer-events-none"
          style={{ left: hoverRect.left, top: hoverRect.top, width: hoverRect.width, height: hoverRect.height }}
        >
          <div className="absolute -top-5 left-0 bg-primary/80 text-black text-[10px] font-mono px-1.5 leading-4 whitespace-nowrap">
            {hoverEl?.tagName.toLowerCase()}{hoverEl?.className && typeof hoverEl.className === "string" ? `.${hoverEl.className.split(" ")[0]}` : ""}
          </div>
        </div>
      )}
      {/* Selected outline + handles */}
      {selRect && (
        <>
          <div
            className="absolute border-2 border-primary pointer-events-none"
            style={{ left: selRect.left, top: selRect.top, width: selRect.width, height: selRect.height, boxShadow: "0 0 0 1px rgba(0,0,0,0.4)" }}
          />
          <div
            className="absolute bg-primary text-black text-[10px] font-mono px-2 py-0.5 font-bold whitespace-nowrap pointer-events-none"
            style={{ left: selRect.left, top: selRect.top - 18 }}
          >
            {selected}
          </div>
          {/* Resize handles */}
          {(["nw", "ne", "sw", "se"] as const).map((c) => {
            const x = c.endsWith("w") ? selRect.left - 5 : selRect.right - 5;
            const y = c.startsWith("n") ? selRect.top - 5 : selRect.bottom - 5;
            return (
              <div
                key={c}
                onPointerDown={(e) => startResize(e, c)}
                className="absolute w-2.5 h-2.5 bg-primary border border-black pointer-events-auto"
                style={{ left: x, top: y, cursor: c === "ne" || c === "sw" ? "nesw-resize" : "nwse-resize" }}
              />
            );
          })}
          {/* Rotate handle */}
          <div
            onPointerDown={startRotate}
            className="absolute w-3 h-3 bg-yellow-400 border border-black rounded-full pointer-events-auto cursor-grab"
            style={{ left: selRect.left + selRect.width / 2 - 6, top: selRect.top - 26 }}
            title="Rotacionar"
          />
        </>
      )}
    </div>
  );
}

// ─── Toolbar ─────────────────────────────────────
function EditorToolbar({ selected, setSelected, onClose }: { selected: string | null; setSelected: (s: string | null) => void; onClose: () => void }) {
  const t = useLayoutTransform(selected || "");
  const [saving, setSaving] = useState(false);
  useEffect(() => onSaving(setSaving), []);

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(getAll(), null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "layout-overrides.json"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      data-editor-ui
      className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black/95 border border-primary/40 backdrop-blur-md px-4 py-3 font-mono text-xs text-white shadow-2xl max-w-[95vw]"
      style={{ zIndex: 100000 }}
    >
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-primary font-bold">EDITOR LIVRE</span>
        <span className={`flex items-center gap-1 ${saving ? "text-yellow-400" : "text-green-400"}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${saving ? "bg-yellow-400 animate-pulse" : "bg-green-400"}`} />
          {saving ? "salvando…" : "sincronizado"}
        </span>
        <span className="text-white/40">|</span>
        <span className="text-white/70 truncate max-w-[300px]">
          {selected || "clique em qualquer elemento da página"}
        </span>
        <button onClick={exportJson} className="px-2 py-1 border border-white/20 hover:border-primary hover:text-primary">export</button>
        <button
          onClick={() => { if (confirm("Resetar TODAS as edições?")) resetAll(); }}
          className="px-2 py-1 border border-white/20 hover:border-red-500 hover:text-red-500"
        >reset all</button>
        <button onClick={() => { setSelected(null); onClose(); }} className="px-2 py-1 bg-primary text-black font-bold hover:bg-primary/80">sair</button>
      </div>

      {selected && (
        <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
          <Slider label="escala" value={t.scale} min={0.1} max={5} step={0.05} onChange={(v: number) => setTransform(selected, { scale: v })} />
          <Slider label="rotação" value={t.rotation} min={-180} max={180} step={1} onChange={(v: number) => setTransform(selected, { rotation: v })} suffix="°" />
          <Slider label="opacidade" value={t.opacity} min={0} max={1} step={0.05} onChange={(v: number) => setTransform(selected, { opacity: v })} />
          <NumInput label="x" value={t.x} onChange={(v: number) => setTransform(selected, { x: v })} />
          <NumInput label="y" value={t.y} onChange={(v: number) => setTransform(selected, { y: v })} />
          <NumInput label="z-index" value={t.z_index} onChange={(v: number) => setTransform(selected, { z_index: v })} />
          <NumInput label="largura" value={t.width ?? 0} onChange={(v: number) => setTransform(selected, { width: v || null })} />
          <NumInput label="altura" value={t.height ?? 0} onChange={(v: number) => setTransform(selected, { height: v || null })} />
          <button onClick={() => resetTransform(selected)} className="px-2 py-1 border border-white/20 hover:border-primary hover:text-primary self-end">reset elemento</button>
        </div>
      )}
      <div className="mt-2 text-[10px] text-white/40">
        <b>Shift+E</b> abre/fecha · clique em qualquer elemento · arraste livre · setas movem · <b>Shift+setas</b> +10px · alça amarela rotaciona · cantos redimensionam
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

// ─── Backwards-compat: Editable still works but is now optional ─
export function Editable({ id, children, className = "" }: { id: string; children: ReactNode; className?: string; resizable?: boolean }) {
  return <div data-edit-id={id} className={className}>{children}</div>;
}
