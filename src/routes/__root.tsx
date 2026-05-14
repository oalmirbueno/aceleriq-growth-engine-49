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
  "Aceleriq · Agência de Marketing Digital, Sites, Tráfego e Automação em Curitiba";
const SITE_DESCRIPTION =
  "Agência de marketing digital em Curitiba: criação de sites, tráfego pago, automação, IA, CRM, sistemas e consultoria de crescimento. Diagnóstico gratuito + Método Acelera.";
const SITE_URL = "https://aceleriq.com.br";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Aceleriq",
  alternateName: ["Aceleriq Engenharia de Crescimento", "Agência Aceleriq", "Aceleriq Marketing"],
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.jpg`,
  email: "contato@aceleriq.com.br",
  telephone: "+55-41-99748-3429",
  description:
    "Agência de marketing digital e engenharia de crescimento em Curitiba: criação de sites, tráfego pago, automação, IA, CRM, sistemas, dados e consultoria.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Curitiba",
    addressRegion: "PR",
    addressCountry: "BR",
  },
  sameAs: ["https://instagram.com/aceleriq", "https://share.google/N6bMgKWg8aRB1t9m9"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "5",
    bestRating: "5",
    worstRating: "1",
  },
};

const LOCALBUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}#localbusiness`,
  name: "Aceleriq",
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  email: "contato@aceleriq.com.br",
  telephone: "+55-41-99748-3429",
  priceRange: "$$$",
  description:
    "Agência de marketing digital em Curitiba com criação de sites, tráfego pago, automação, IA, CRM, sistemas e consultoria de crescimento (Método Acelera).",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Curitiba",
    addressRegion: "PR",
    addressCountry: "BR",
  },
  areaServed: { "@type": "Country", name: "Brasil" },
  sameAs: ["https://instagram.com/aceleriq", "https://share.google/N6bMgKWg8aRB1t9m9"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "5",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "Ricardo Almeida" },
      reviewBody:
        "A Aceleriq estruturou todo o nosso comercial do zero. Em 90 dias o CRM estava rodando, automações ativas e o time finalmente vendendo com previsibilidade.",
    },
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "Mariana Costa" },
      reviewBody:
        "Profissionais extremamente técnicos e estratégicos. Implementaram IA nos nossos fluxos e o impacto em produtividade foi imediato.",
    },
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "Felipe Andrade" },
      reviewBody:
        "Tráfego pago + CRM integrado mudou nosso jogo. Saímos do achismo para decisões baseadas em dados reais.",
    },
  ],
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
          "Aceleriq, agência de marketing digital Curitiba, criação de sites Curitiba, tráfego pago, gestão de tráfego, automação de marketing, automação comercial, IA para empresas, CRM, desenvolvimento de sistemas, aplicativos, consultoria de marketing, consultoria de crescimento, engenharia de crescimento, Método Acelera, marketing para empresas",
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
      { name: "google-site-verification", content: "1mBlyoiFOwpc1VMRgb385i1KzpeNFStyr8aqIkHU5-0" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/icon-192.png" },
      { rel: "icon", type: "image/png", sizes: "512x512", href: "/icon-512.png" },
      { rel: "shortcut icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preload", as: "image", href: "/hero-bg.jpg", fetchPriority: "high" } as any,
      
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
