import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
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

const SITE_TITLE = "Aceleriq · Marketing Digital, Tráfego Pago e Automação";
const SITE_DESCRIPTION =
  "Agência de marketing digital no Brasil todo: tráfego pago, sites, automação, IA, CRM e consultoria comercial. Sede em Curitiba. Diagnóstico gratuito.";
const SITE_URL = "https://aceleriq.com.br";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const BR_AREAS_SERVED = [
  { "@type": "Country", name: "Brasil" },
  ...[
    "São Paulo","Rio de Janeiro","Belo Horizonte","Brasília","Curitiba","Porto Alegre",
    "Florianópolis","Salvador","Recife","Fortaleza","Manaus","Belém","Goiânia",
    "Campinas","Vitória","Natal","João Pessoa","Maceió","Cuiabá","Campo Grande",
    "Joinville","Londrina","Maringá","Ribeirão Preto","Sorocaba","Uberlândia",
  ].map((c) => ({ "@type": "City", name: c })),
];

const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Aceleriq",
  alternateName: [
    "Aceleriq Agência",
    "Agência Aceleriq",
    "Aceleriq Marketing",
    "Aceleriq Engenharia de Crescimento",
    "Aceleriq (não é Acelera Aí)",
  ],
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.jpg`,
  email: "contato@aceleriq.com.br",
  telephone: "+55-41-99748-3429",
  description:
    "Agência de marketing digital com atendimento nacional: criação de sites, tráfego pago (Google e Meta Ads), automação, IA, CRM, dashboards e consultoria comercial. Sede em Curitiba/PR.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Curitiba",
    addressRegion: "PR",
    addressCountry: "BR",
  },
  areaServed: BR_AREAS_SERVED,
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
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${SITE_URL}#localbusiness`,
  name: "Aceleriq",
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  email: "contato@aceleriq.com.br",
  telephone: "+55-41-99748-3429",
  priceRange: "$$$",
  description:
    "Agência de marketing digital com atendimento em todo o Brasil: criação de sites, tráfego pago, automação, IA, CRM, sistemas e consultoria de crescimento (Método Acelera). Sede em Curitiba/PR.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Curitiba",
    addressRegion: "PR",
    addressCountry: "BR",
  },
  areaServed: BR_AREAS_SERVED,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços Aceleriq",
    itemListElement: [
      "Criação de sites e landing pages",
      "Gestão de tráfego pago (Google Ads, Meta Ads, LinkedIn Ads)",
      "Automação de marketing e vendas",
      "IA aplicada ao comercial",
      "Implantação e governança de CRM",
      "Consultoria de crescimento (Método Acelera)",
      "Dashboards e dados comerciais",
      "Estruturação comercial e funil de vendas",
    ].map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s },
    })),
  },
  sameAs: ["https://instagram.com/aceleriq", "https://share.google/N6bMgKWg8aRB1t9m9"],
};

const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Aceleriq",
  url: SITE_URL,
  inLanguage: "pt-BR",
  publisher: { "@type": "Organization", name: "Aceleriq" },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
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
          "Aceleriq, agência de marketing digital, agência de marketing digital Brasil, agência de marketing digital Curitiba, agência de marketing digital São Paulo, agência de marketing digital Rio de Janeiro, tráfego pago, gestão de tráfego, gestor de tráfego, Google Ads, Meta Ads, Facebook Ads, Instagram Ads, LinkedIn Ads, automação de marketing, automação comercial, automação WhatsApp, IA para empresas, IA aplicada a vendas, CRM, RD Station, HubSpot, criação de sites, site profissional, site rápido, site otimizado, landing page, funil de vendas, estruturação comercial, consultoria de marketing, consultoria comercial, consultoria de crescimento, engenharia de crescimento, Método Acelera, marketing para empresas, marketing B2B, agência boutique, Aceleriq não é Acelera Aí",
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
      { name: "theme-color", content: "#f3f4f5" },
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
      { rel: "preload", as: "image", href: "/hero-bg.jpg", fetchPriority: "high" },

      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap",
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
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            gcTime: 5 * 60_000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
