import { useEffect, useMemo, useState } from "react";
import { List } from "lucide-react";

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export function extractToc(markdown: string): TocItem[] {
  if (!markdown) return [];
  const lines = markdown.split("\n");
  const items: TocItem[] = [];
  const seen = new Map<string, number>();
  let inFence = false;
  for (const line of lines) {
    if (/^```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!m) continue;
    const level = m[1].length as 2 | 3;
    const text = m[2].replace(/[*_`]/g, "").trim();
    if (!text) continue;
    let id = slugify(text);
    if (!id) continue;
    const n = (seen.get(id) ?? 0) + 1;
    seen.set(id, n);
    if (n > 1) id = `${id}-${n}`;
    items.push({ id, text, level });
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

  return (
    <>
      {/* Desktop sticky sidebar */}
      <aside className="hidden xl:block absolute top-0 right-[-280px] w-[240px] h-full pointer-events-none">
        <div className="sticky top-28 pointer-events-auto">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-4">
            Sumário
          </div>
          <nav>
            <ul className="space-y-1.5 border-l border-white/10">
              {items.map((it) => {
                const isActive = activeId === it.id;
                return (
                  <li key={it.id} className={it.level === 3 ? "pl-4" : ""}>
                    <a
                      href={`#${it.id}`}
                      onClick={(e) => handleClick(e, it.id)}
                      className={`block -ml-px border-l-2 py-1 pl-3 text-xs leading-snug transition-colors ${
                        isActive
                          ? "border-primary text-primary"
                          : "border-transparent text-muted-foreground hover:text-foreground hover:border-white/30"
                      }`}
                    >
                      {it.text}
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
                      className={`block -ml-px border-l-2 py-1.5 pl-3 text-sm transition-colors ${
                        isActive
                          ? "border-primary text-primary"
                          : "border-transparent text-foreground/80 hover:text-primary"
                      }`}
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
