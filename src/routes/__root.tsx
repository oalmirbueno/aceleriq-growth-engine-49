import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { LayoutEditorProvider } from "@/components/editor/LayoutEditor";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}

const SITE_TITLE =
  "Aceleriq — Engenharia de Crescimento com Estratégia, Dados e IA";
const SITE_DESCRIPTION =
  "Aceleriq é a engenharia de crescimento que une estratégia, processo comercial, tráfego, CRM, IA e dados para escalar seu negócio com método. Faça o Diagnóstico de Maturidade gratuito.";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { name: "author", content: "Aceleriq" },
      {
        name: "keywords",
        content:
          "engenharia de crescimento, marketing, IA, automação, CRM, tráfego pago, diagnóstico estratégico, processos comerciais, Aceleriq",
      },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { name: "theme-color", content: "#16182a" },
      { title: "Aceleriq" },
      { property: "og:title", content: "Aceleriq" },
      { name: "twitter:title", content: "Aceleriq" },
      { name: "description", content: "Aceleriq" },
      { property: "og:description", content: "Aceleriq" },
      { name: "twitter:description", content: "Aceleriq" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/cc0a120c-c622-4cfb-a9f6-9d1a033ac63d/id-preview-3a013ab5--f5e56613-d905-400e-a8e2-80206adf0dda.lovable.app-1777520582344.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/cc0a120c-c622-4cfb-a9f6-9d1a033ac63d/id-preview-3a013ab5--f5e56613-d905-400e-a8e2-80206adf0dda.lovable.app-1777520582344.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Toaster />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <LayoutEditorProvider>
      <Outlet />
    </LayoutEditorProvider>
  );
}
