import { Instagram, Mail, MessageCircle, Sparkles } from "lucide-react";
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
    <footer className="border-t border-border/60 bg-surface/40">
      <div className="container-aceleriq grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-glow-primary">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="font-display text-lg font-bold">Aceleriq</span>
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            Engenharia de crescimento para empresas que querem escalar com
            estratégia, processo, dados e inteligência artificial.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
            Navegação
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href="#metodo" className="hover:text-foreground">Método ACELERA</a></li>
            <li><a href="#areas" className="hover:text-foreground">Áreas de atuação</a></li>
            <li><a href="#resultados" className="hover:text-foreground">Resultados</a></li>
            <li><a href="#faq" className="hover:text-foreground">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
            Contato
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <MessageCircle className="h-4 w-4 text-lime" />
                {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
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
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <Instagram className="h-4 w-4 text-violet" />
                {INSTAGRAM_HANDLE}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="container-aceleriq flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} Aceleriq. Todos os direitos reservados.</span>
          <span>Engenharia de Crescimento · Estratégia · Dados · IA</span>
        </div>
      </div>
    </footer>
  );
}
