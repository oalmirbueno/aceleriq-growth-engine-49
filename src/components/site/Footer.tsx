import { Instagram, Mail, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP_DISPLAY,
  whatsappLink,
  DEFAULT_WHATSAPP_MESSAGE,
} from "@/lib/contact";
import logoAceleriq from "@/assets/logo-aceleriq.png";

export function Footer() {
  return (
    <footer className="relative border-t border-primary/15 bg-black/70 text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-transparent to-black" />
      <div className="container-aceleriq relative grid gap-12 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center">
            <img
              src={logoAceleriq}
              alt="Logotipo Aceleriq"
              className="h-20 w-auto md:h-24"
            />
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            Engenharia de crescimento para empresas que querem escalar com
            estratégia, processo, dados e inteligência artificial.
          </p>
          <p className="label-eyebrow mt-6">Curitiba · Brasil · Operando 24/7</p>
        </div>

        <div className="md:col-span-3">
          <h3 className="label-eyebrow">Serviços</h3>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li><Link to="/agencia-de-marketing-digital-curitiba" className="hover:text-foreground">Agência de Marketing</Link></li>
            <li><Link to="/criacao-de-sites" className="hover:text-foreground">Criação de Sites</Link></li>
            <li><Link to="/trafego-pago" className="hover:text-foreground">Tráfego Pago</Link></li>
            <li><Link to="/automacao-e-ia" className="hover:text-foreground">Automação & IA</Link></li>
            <li><Link to="/sobre-a-aceleriq" className="hover:text-foreground">Sobre a Aceleriq</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h3 className="label-eyebrow">Contato direto</h3>
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

      <div className="relative border-t border-primary/10">
        <div className="container-aceleriq flex flex-col items-center justify-between gap-2 py-6 text-[11px] uppercase tracking-[0.18em] text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} Aceleriq</span>
          <span className="text-mono">v1.0 · Estratégia · Dados · IA</span>
        </div>
      </div>
    </footer>
  );
}
