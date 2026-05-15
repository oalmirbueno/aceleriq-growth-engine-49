import { useEffect, useMemo, useRef, useState } from "react";
import { List } from "lucide-react";

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export function slugify(text: string): string {
  const s = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
  return s || "section";
}

/**
 * Garante unicidade de ids num conjunto. Reutilize a mesma instância de `seen`
 * para o TOC e o renderizador para que as âncoras coincidam mesmo com headings
 * repetidos.
 */
export function uniqueId(rawText: string, seen: Map<string, number>): string {
  const base = slugify(rawText);
  const n = (seen.get(base) ?? 0) + 1;
  seen.set(base, n);
  return n > 1 ? `${base}-${n}` : base;
}

export function extractToc(markdown: string): TocItem[] {
  if (!markdown) return [];
  const lines = markdown.split("\n");
  const items: TocItem[] = [];
  const seen = new Map<string, number>();
  let inFence = false;
  let fenceMarker: "```" | "~~~" | null = null;
  for (const rawLine of lines) {
    // Fenced code blocks (``` ou ~~~) — qualquer comprimento >= 3
    const fence = /^(\s{0,3})(`{3,}|~{3,})/.exec(rawLine);
    if (fence) {
      const marker = fence[2].startsWith("`") ? "```" : "~~~";
      if (!inFence) {
        inFence = true;
        fenceMarker = marker;
      } else if (marker === fenceMarker) {
        inFence = false;
        fenceMarker = null;
      }
      continue;
    }
    if (inFence) continue;
    // Indented code blocks (4 espaços ou tab)
    if (/^( {4}|\t)/.test(rawLine)) continue;
    // Ignora headings dentro de blockquotes ou listas
    const line = rawLine;
    const m = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!m) continue;
    const level = m[1].length as 2 | 3;
    // Remove formatação inline (negrito, itálico, code spans, links markdown)
    const text = m[2]
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[*_]/g, "")
      .trim();
    if (!text) continue;
    items.push({ id: uniqueId(text, seen), text, level });
  }
  return items;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const ids = useMemo(() => items.map((i) => i.id), [items]);
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  useEffect(() => {
    if (ids.length === 0) return;
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }
        if (visible.size > 0) {
          // pick first visible heading in document order
          for (const id of ids) {
            if (visible.has(id)) {
              setActiveId(id);
              break;
            }
          }
        }
      },
      { rootMargin: "-96px 0px -65% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
    setActiveId(id);
    setMobileOpen(false);
  };

  if (items.length < 2) return null;

  const activeIndex = items.findIndex((it) => it.id === activeId);

  return (
    <>
      {/* Desktop sticky sidebar */}
      <aside className="hidden xl:block absolute top-0 right-[-280px] w-[240px] h-full pointer-events-none">
        <div className="sticky top-28 pointer-events-auto">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-4">
            Sumário
          </div>
          <nav className="relative">
            {/* Faixa de progresso sutil */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent" />
            
            {/* Indicador de progresso animado */}
            <div
              className="absolute left-0 w-px bg-primary transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{
                top: activeIndex >= 0 
                  ? `${(activeIndex / Math.max(items.length - 1, 1)) * 100}%` 
                  : "0%",
                height: activeIndex >= 0 
                  ? `${(1 / Math.max(items.length, 1)) * 100}%` 
                  : "0%",
                opacity: activeIndex >= 0 ? 1 : 0,
                boxShadow: "0 0 8px var(--primary), 0 0 16px var(--primary)",
              }}
            />

            <ul className="space-y-0.5">
              {items.map((it) => {
                const isActive = activeId === it.id;
                return (
                  <li 
                    key={it.id} 
                    className={it.level === 3 ? "pl-4" : ""}
                  >
                    <a
                      ref={(el) => {
                        if (el) itemRefs.current.set(it.id, el);
                        else itemRefs.current.delete(it.id);
                      }}
                      href={`#${it.id}`}
                      onClick={(e) => handleClick(e, it.id)}
                      className={`
                        group relative block py-1.5 pl-3 text-xs leading-snug
                        transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
                        ${isActive 
                          ? "text-primary translate-x-0.5" 
                          : "text-muted-foreground/70 hover:text-foreground/90 hover:translate-x-0.5"
                        }
                      `}
                    >
                      {/* Fundo sutil no item ativo */}
                      <span 
                        className={`
                          absolute inset-0 -mx-1 rounded-sm
                          transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                          ${isActive 
                            ? "bg-primary/[0.06] opacity-100" 
                            : "bg-transparent opacity-0 group-hover:bg-white/[0.02] group-hover:opacity-100"
                          }
                        `}
                      />
                      
                      {/* Borda esquerda ativa */}
                      <span 
                        className={`
                          absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-3 rounded-full
                          transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
                          ${isActive 
                            ? "bg-primary opacity-100 scale-100" 
                            : "bg-transparent opacity-0 scale-50 group-hover:bg-white/20 group-hover:opacity-60 group-hover:scale-75"
                          }
                        `}
                      />

                      {/* Texto */}
                      <span className="relative z-10">
                        {it.text}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Mobile / tablet: collapsible block above content */}
      <div className="xl:hidden mt-10 border border-white/10 bg-white/[0.02]">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          className="w-full flex items-center justify-between px-5 py-3 text-left"
        >
          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
            <List className="h-3.5 w-3.5" /> Sumário
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {items.length} seções · {mobileOpen ? "fechar" : "abrir"}
          </span>
        </button>
        {mobileOpen && (
          <nav className="px-5 pb-4">
            <ul className="space-y-1 border-l border-white/10">
              {items.map((it) => {
                const isActive = activeId === it.id;
                return (
                  <li key={it.id} className={it.level === 3 ? "pl-4" : ""}>
                    <a
                      href={`#${it.id}`}
                      onClick={(e) => handleClick(e, it.id)}
                      className={`
                        group relative block -ml-px border-l-2 py-1.5 pl-3 text-sm
                        transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
                        ${isActive
                          ? "border-primary text-primary translate-x-0.5"
                          : "border-transparent text-foreground/80 hover:text-primary hover:border-white/30 hover:translate-x-0.5"
                        }
                      `}
                    >
                      {it.text}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </>
  );
}
