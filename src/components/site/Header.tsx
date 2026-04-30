import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logoAceleriq from "@/assets/logo-aceleriq.png";

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
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="container-aceleriq flex h-16 items-center justify-between md:h-[68px]">
        <a href="#top" className="group flex items-center">
          <img
            src={logoAceleriq}
            alt="Aceleriq"
            className="h-10 w-auto md:h-12 transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="#top"
            className="text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Entrar em contato
          </a>
          <Button
            onClick={onDiagnostico}
            className="h-9 rounded-md bg-primary px-4 text-[13px] font-semibold text-primary-foreground btn-interactive hover:bg-primary"
          >
            Diagnóstico Gratuito
          </Button>
        </div>

        <button
          type="button"
          aria-label="Abrir menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card text-foreground md:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
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
                className="rounded-md px-3 py-3 text-base font-medium text-muted-foreground hover:bg-card hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <Button
              onClick={() => {
                setOpen(false);
                onDiagnostico();
              }}
              className="mt-2 h-12 w-full rounded-md bg-primary text-base font-semibold text-primary-foreground"
            >
              Diagnóstico Gratuito
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
