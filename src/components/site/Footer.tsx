import { Instagram, Mail, MessageCircle } from "lucide-react";
import {
  EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP_DISPLAY,
  whatsappLink,
  DEFAULT_WHATSAPP_MESSAGE,
} from "@/lib/contact";

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="container-aceleriq grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2.5">
            <img 
              src="/logo.png" 
              alt="Aceleriq" 
              className="h-8 w-auto object-contain brightness-0 invert" 
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="hidden flex items-center gap-1.5">
              <div className="h-6 w-1 bg-primary rounded-full shadow-[0_0_12px_hsl(145,100%,50%,0.5)]" />
              <span className="text-[20px] font-bold tracking-[-0.03em] text-foreground">
                aceleriq<span className="text-primary">.</span>
              </span>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            Engenharia de crescimento para empresas que querem escalar com
            estratégia, processo, dados e inteligência artificial.
          </p>
          <p className="label-eyebrow mt-6">Curitiba · Brasil · Operando 24/7</p>
        </div>

        <div className="md:col-span-3">
          <h4 className="label-eyebrow">Navegação</h4>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li><a href="#metodo" className="hover:text-foreground">Método ACELERA</a></li>
            <li><a href="#areas" className="hover:text-foreground">Áreas de atuação</a></li>
            <li><a href="#resultados" className="hover:text-foreground">Resultados</a></li>
            <li><a href="#faq" className="hover:text-foreground">FAQ</a></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="label-eyebrow">Contato direto</h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a
                href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground"
              >
                <MessageCircle className="h-4 w-4 text-primary" />
                <span className="text-mono">{WHATSAPP_DISPLAY}</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground"
              >
                <Mail className="h-4 w-4 text-primary" />
                {EMAIL}
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground"
              >
                <Instagram className="h-4 w-4 text-primary" />
                {INSTAGRAM_HANDLE}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="container-aceleriq flex flex-col items-center justify-between gap-2 py-6 text-[11px] uppercase tracking-[0.18em] text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} Aceleriq</span>
          <span className="text-mono">v1.0 · Estratégia · Dados · IA</span>
        </div>
      </div>
    </footer>
  );
}
