import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export type PortfolioItem = {
  slug: string;
  name: string;
  segment: string;
  scope: string[];
  description: string;
  /** Origin used only to build the screenshot URL — never displayed to the user. */
  origin: string;
};

const SHOTS = (origin: string, w: number) =>
  `https://image.thum.io/get/width/${w}/crop/900/noanimate/${origin}`;

export const DEFAULT_PORTFOLIO: PortfolioItem[] = [
  {
    slug: "stopinfo",
    name: "Stop Info",
    segment: "Tecnologia · Varejo",
    scope: ["Site institucional", "SEO técnico", "Performance"],
    description:
      "Reposicionamento digital de uma marca de tecnologia consolidada, com site institucional rápido, otimizado para SEO local e orientado a captação qualificada.",
    origin: "https://stopinfo.com.br",
  },
  {
    slug: "stopinfo-loja",
    name: "Stop Info · Loja",
    segment: "E-commerce",
    scope: ["E-commerce", "Catálogo", "Conversão"],
    description:
      "Loja online integrada à operação física, com arquitetura de catálogo escalável, checkout otimizado e foco em recompra.",
    origin: "https://stopinfo.com.br/loja",
  },
  {
    slug: "jalimpo",
    name: "JáLimpo",
    segment: "Serviços · Limpeza",
    scope: ["Site institucional", "Geração de leads", "Local SEO"],
    description:
      "Site de serviços com foco em conversão local, formulários inteligentes e estrutura preparada para escalar tráfego pago.",
    origin: "https://jalimpo.com.br",
  },
  {
    slug: "camillystresser",
    name: "Camilly Stresser",
    segment: "Marca pessoal",
    scope: ["Branding digital", "Site de autoridade", "Captação"],
    description:
      "Plataforma de autoridade para profissional liberal, traduzindo posicionamento técnico em uma experiência digital premium.",
    origin: "https://camillystresser.com.br",
  },
  {
    slug: "flordesaoroque",
    name: "Pousada Flor de São Roque",
    segment: "Hospedagem · Turismo",
    scope: ["Site institucional", "Reservas", "Storytelling visual"],
    description:
      "Site de hospedagem com narrativa visual imersiva, fotografia em destaque e fluxo direto de contato para reservas.",
    origin: "https://flordesaoroquepousada.lovable.app",
  },
  {
    slug: "deliciasgama",
    name: "Delícias da Gama",
    segment: "Gastronomia",
    scope: ["Cardápio digital", "Pedidos", "Identidade visual"],
    description:
      "Vitrine digital de gastronomia com cardápio organizado, fotografia de produto e fluxo direto para WhatsApp e pedidos.",
    origin: "https://deliciasgama.lovable.app",
  },
  {
    slug: "rotasul",
    name: "Rota Sul Multimarcas",
    segment: "Automotivo",
    scope: ["Catálogo de veículos", "Captação", "Performance"],
    description:
      "Plataforma para revenda automotiva com catálogo dinâmico, fichas técnicas e captação de interesse qualificada.",
    origin: "https://rotasulmultimarcas.lovable.app",
  },
  {
    slug: "cartaoacessosaude",
    name: "Cartão Acesso Saúde",
    segment: "Saúde · Assinatura",
    scope: ["Site de produto", "Adesão online", "Educação de mercado"],
    description:
      "Site de produto para serviço de saúde por assinatura, com explicação clara dos benefícios e fluxo de adesão simplificado.",
    origin: "https://cartaoacessosaude.lovable.app",
  },
  {
    slug: "buenoconstrucao",
    name: "Bueno Construção",
    segment: "Construção Civil",
    scope: ["Site institucional", "Portfólio de obras", "Autoridade"],
    description:
      "Site institucional para construtora, com portfólio visual de obras, prova social e captação para orçamentos.",
    origin: "https://buenoconstrucao.lovable.app",
  },
  {
    slug: "sitebolt",
    name: "SiteBolt",
    segment: "SaaS",
    scope: ["Landing de produto", "Onboarding", "Conversão"],
    description:
      "Landing page de produto SaaS com narrativa orientada a benefício, prova técnica e fluxo direto de ativação.",
    origin: "https://sitebolt.lovable.app",
  },
  {
    slug: "brit",
    name: "Brit",
    segment: "Marca · D2C",
    scope: ["Identidade digital", "Site de marca", "Storytelling"],
    description:
      "Site de marca direta ao consumidor com identidade forte, narrativa de produto e estética premium.",
    origin: "https://brit.lovable.app",
  },
  {
    slug: "level-me",
    name: "Level Me",
    segment: "Lifestyle",
    scope: ["Site de marca", "Captação", "Conteúdo"],
    description:
      "Plataforma de marca lifestyle com foco em performance pessoal, posicionamento aspiracional e captação contínua.",
    origin: "https://level-me.lovable.app",
  },
  {
    slug: "appplaybet",
    name: "PlayBet",
    segment: "App",
    scope: ["Landing de app", "Aquisição", "Mobile-first"],
    description:
      "Landing mobile-first para aplicativo, com foco em aquisição, prova social e CTA otimizado para download.",
    origin: "https://appplaybet.lovable.app",
  },
];

type Props = {
  items?: PortfolioItem[];
  eyebrow?: string;
  title?: string;
  intro?: string;
};

export function PortfolioShowcase({
  items = DEFAULT_PORTFOLIO,
  eyebrow = "[ · ] · Portfólio",
  title = "Sites e plataformas que a Aceleriq construiu",
  intro = "Cada projeto é construído como ativo comercial: design premium, SEO técnico, performance real e integração ao funil.",
}: Props) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const active = activeSlug ? items.find((i) => i.slug === activeSlug) ?? null : null;

  useEffect(() => {
    if (active && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [active]);

  const ITEMLIST_JSONLD = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Portfólio Aceleriq",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: it.name,
        about: it.segment,
        creator: { "@type": "Organization", name: "Aceleriq" },
      },
    })),
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-grid-ambient scroll-mt-24"
    >
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ITEMLIST_JSONLD) }}
      />
      <div className="container-aceleriq">
        {!active && (
          <div className="max-w-2xl animate-fade-in">
            <span className="label-eyebrow">{eyebrow}</span>
            <h2 className="mt-3 font-display text-3xl font-medium leading-[1.05] tracking-[-0.03em] md:text-5xl">
              {title}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              {intro}
            </p>
          </div>
        )}

        {active ? (
          <CaseView item={active} onBack={() => setActiveSlug(null)} />
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((it) => (
              <PortfolioCard
                key={it.slug}
                item={it}
                onOpen={() => setActiveSlug(it.slug)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function PortfolioCard({
  item,
  onOpen,
}: {
  item: PortfolioItem;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Abrir case ${item.name}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-card/40 text-left transition duration-300 hover:-translate-y-0.5 hover:border-white/15 hover:bg-card/60 focus:outline-none focus:ring-2 focus:ring-primary/60"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/10">
        <img
          src={SHOTS(item.origin, 600)}
          alt={`Preview do site ${item.name} — ${item.segment}`}
          loading="lazy"
          decoding="async"
          width={600}
          height={375}
          className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        <span className="absolute right-2.5 top-2.5 inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-background/70 text-foreground/90 backdrop-blur transition group-hover:bg-primary group-hover:text-primary-foreground">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
          {item.segment}
        </span>
        <h3 className="font-display text-[15px] font-medium leading-tight tracking-tight">
          {item.name}
        </h3>
      </div>
    </button>
  );
}

function CaseView({ item, onBack }: { item: PortfolioItem; onBack: () => void }) {
  return (
    <div className="animate-fade-in">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-[12px] font-mono uppercase tracking-[0.2em] text-muted-foreground transition hover:text-primary"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Voltar ao portfólio
      </button>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="order-2 overflow-hidden rounded-2xl border border-white/10 bg-background/40 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)] lg:order-1">
          <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
            <span className="ml-3 truncate text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
              Projeto Aceleriq · {item.name}
            </span>
          </div>
          <img
            src={SHOTS(item.origin, 1400)}
            alt={`Captura completa do site ${item.name}`}
            loading="eager"
            decoding="async"
            className="block w-full"
          />
        </div>

        <aside className="order-1 lg:order-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
            {item.segment}
          </span>
          <h3 className="mt-2 font-display text-3xl font-medium leading-[1.05] tracking-[-0.03em] md:text-4xl">
            {item.name}
          </h3>
          <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">
            {item.description}
          </p>

          <div className="mt-7">
            <span className="label-eyebrow">Escopo entregue</span>
            <ul className="mt-3 space-y-2">
              {item.scope.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-2.5 text-[13px] text-foreground/90"
                >
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-7 rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <p className="text-[12px] leading-relaxed text-muted-foreground">
              Projeto desenvolvido pela{" "}
              <strong className="text-foreground">Aceleriq</strong> — agência de
              marketing digital, sites e crescimento em Curitiba.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
