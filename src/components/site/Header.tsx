import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import logoAceleriq from "@/assets/logo-aceleriq.png";

const NAV = [
  { label: "Sobre", to: "/sobre-a-aceleriq", hash: undefined },
  { label: "Método", to: "/", hash: "metodo" },
  { label: "Áreas", to: "/", hash: "areas" },
  { label: "Resultados", to: "/", hash: "resultados" },
  { label: "FAQ", to: "/", hash: "faq" },
] as const;

export function Header({ onDiagnostico }: { onDiagnostico: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-primary/20 bg-background/80 backdrop-blur-md py-3"
          : "bg-transparent py-6",
      )}
    >
      <div className="container-aceleriq flex items-center justify-between">
        <div className="flex items-center gap-12">
          <a href="#top" className="group flex items-center">
            <img
              src={logoAceleriq}
              alt="Aceleriq"
              className="h-20 w-auto md:h-24 transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                hash={item.hash}
                className="relative text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <div className="flex flex-col items-end">
            <span className="font-mono text-[9px] uppercase tracking-widest text-primary/60">System_Access</span>
            <a
              href="https://aceleriq.online"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              Client Portal
            </a>
          </div>
          
          <button
            onClick={onDiagnostico}
            className="btn-tech text-[11px] px-6 py-2"
          >
            Inaugurate Protocol
          </button>
        </div>

        <button
          type="button"
          aria-label="Abrir menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/5 text-foreground lg:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute inset-x-0 top-full border-t border-white/10 bg-background/95 backdrop-blur-2xl lg:hidden">
          <div className="container-aceleriq flex flex-col gap-1 py-8">
            {NAV.map((item, i) => (
              <Link
                key={item.label}
                to={item.to}
                hash={item.hash}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-white/5 py-4 text-sm font-mono uppercase tracking-widest text-muted-foreground hover:text-primary"
              >
                <span>{item.label}</span>
                <span className="text-[10px] opacity-30">0{i + 1}</span>
              </Link>
            ))}
            <a
              href="https://aceleriq.online"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-white/5 py-4 text-sm font-mono uppercase tracking-widest text-muted-foreground hover:text-primary"
            >
              <span>Client Portal</span>
              <span className="text-[10px] opacity-30">↗</span>
            </a>
            <div className="mt-8">
              <button
                onClick={() => {
                  setOpen(false);
                  onDiagnostico();
                }}
                className="btn-tech w-full py-4 text-xs"
              >
                Initialize Diagnostic
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
