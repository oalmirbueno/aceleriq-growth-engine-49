import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";

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
  "Aceleriq · Engenharia de Crescimento com Estratégia, Dados e IA";
const SITE_DESCRIPTION =
  "Aceleriq é uma engenharia de crescimento em Curitiba que une estratégia, CRM, tráfego, automação, IA, dados e processos comerciais para empresas que querem escalar com previsibilidade.";
const SITE_URL = "https://aceleriq.com.br";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Aceleriq",
  alternateName: "Aceleriq Engenharia de Crescimento",
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.jpg`,
  email: "aceleriq@gmail.com",
  telephone: "+55-41-99748-3429",
  description:
    "Engenharia de crescimento com estratégia, dados, IA, CRM, automação, tráfego e processos comerciais.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Curitiba",
    addressRegion: "PR",
    addressCountry: "BR",
  },
  sameAs: ["https://instagram.com/aceleriq"],
};

const LOCALBUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}#localbusiness`,
  name: "Aceleriq",
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  email: "aceleriq@gmail.com",
  telephone: "+55-41-99748-3429",
  priceRange: "$$$",
  description:
    "Engenharia de crescimento em Curitiba com estratégia, dados, IA, CRM, automação, tráfego e processos comerciais.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Curitiba",
    addressRegion: "PR",
    addressCountry: "BR",
  },
  areaServed: { "@type": "Country", name: "Brasil" },
  sameAs: ["https://instagram.com/aceleriq"],
};

const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Aceleriq",
  url: SITE_URL,
  inLanguage: "pt-BR",
  publisher: { "@type": "Organization", name: "Aceleriq" },
};

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
          "Aceleriq, engenharia de crescimento, consultoria de crescimento Curitiba, CRM, automação comercial, IA para empresas, tráfego pago, processos comerciais, dados, dashboards",
      },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Aceleriq · Engenharia de Crescimento" },
      { property: "og:site_name", content: "Aceleriq" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "theme-color", content: "#0a0a0a" },
      { title: "Aceleriq I Engenharia de Crescimento com Estratégia, Dados e" },
      { property: "og:title", content: "Aceleriq I Engenharia de Crescimento com Estratégia, Dados e" },
      { name: "twitter:title", content: "Aceleriq I Engenharia de Crescimento com Estratégia, Dados e" },
      { name: "description", content: "Aceleriq é uma engenharia de crescimento em Curitiba que une estratégia, IA, SIstema, Marketing e Comercial que geram Resultados" },
      { property: "og:description", content: "Aceleriq é uma engenharia de crescimento em Curitiba que une estratégia, IA, SIstema, Marketing e Comercial que geram Resultados" },
      { name: "twitter:description", content: "Aceleriq é uma engenharia de crescimento em Curitiba que une estratégia, IA, SIstema, Marketing e Comercial que geram Resultados" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/15134d37-3cd4-40e2-86da-d70be62eae7e/id-preview-cca5ba3e--f5e56613-d905-400e-a8e2-80206adf0dda.lovable.app-1777567728285.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/15134d37-3cd4-40e2-86da-d70be62eae7e/id-preview-cca5ba3e--f5e56613-d905-400e-a8e2-80206adf0dda.lovable.app-1777567728285.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "shortcut icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "canonical", href: SITE_URL },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(ORGANIZATION_JSONLD),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(LOCALBUSINESS_JSONLD),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(WEBSITE_JSONLD),
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
  return <Outlet />;
}
