import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Método", href: "#metodo" },
  { label: "Áreas", href: "#areas" },
  { label: "Resultados", href: "#resultados" },
  { label: "FAQ", href: "#faq" },
];

export function Header({ onDiagnostico }: { onDiagnostico: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/70 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="container-aceleriq flex h-16 items-center justify-between md:h-20">
        <a href="#top" className="flex items-center gap-2">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-glow-primary">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Aceleriq
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            onClick={onDiagnostico}
            className="h-10 rounded-full bg-gradient-cta px-5 font-semibold text-lime-foreground shadow-glow-lime hover:opacity-95"
          >
            Diagnóstico Gratuito
          </Button>
        </div>

        <button
          type="button"
          aria-label="Abrir menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-foreground md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-xl md:hidden">
          <div className="container-aceleriq flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-muted-foreground hover:bg-surface hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <Button
              onClick={() => {
                setOpen(false);
                onDiagnostico();
              }}
              className="mt-2 h-12 w-full rounded-full bg-gradient-cta font-semibold text-lime-foreground shadow-glow-lime"
            >
              Diagnóstico Gratuito
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
