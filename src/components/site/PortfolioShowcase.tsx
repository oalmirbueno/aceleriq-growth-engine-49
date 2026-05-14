import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

export type PortfolioItem = {
  slug: string;
  name: string;
  segment: string;
  scope: string[];
  description: string;
  /** Origin used only to build the screenshot URL — never displayed to the user. */
  origin: string;
};

const SHOTS = (origin: string, w = 1200) =>
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
    segment: "Serviços · Limpeza Profissional",
    scope: ["Site institucional", "Geração de leads", "Local SEO"],
    description:
      "Site de serviços com foco em conversão local, formulários inteligentes e estrutura preparada para escalar tráfego pago.",
    origin: "https://jalimpo.com.br",
  },
  {
    slug: "camillystresser",
    name: "Camilly Stresser",
    segment: "Profissional Liberal · Marca pessoal",
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
    segment: "Gastronomia · Delivery",
    scope: ["Cardápio digital", "Pedidos", "Identidade visual"],
    description:
      "Vitrine digital de gastronomia com cardápio organizado, fotografia de produto e fluxo direto para WhatsApp e pedidos.",
    origin: "https://deliciasgama.lovable.app",
  },
  {
    slug: "rotasul",
    name: "Rota Sul Multimarcas",
    segment: "Automotivo · Revenda",
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
    segment: "SaaS · Tecnologia",
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
    segment: "Lifestyle · Performance pessoal",
    scope: ["Site de marca", "Captação", "Conteúdo"],
    description:
      "Plataforma de marca lifestyle com foco em performance pessoal, posicionamento aspiracional e captação contínua.",
    origin: "https://level-me.lovable.app",
  },
  {
    slug: "appplaybet",
    name: "PlayBet",
    segment: "App · Entretenimento",
    scope: ["Landing de app", "Aquisição", "Mobile-first"],
    description:
      "Landing mobile-first para aplicativo, com foco em aquisição, prova social e CTA otimizado para download.",
    origin: "https://appplaybet.lovable.app",
  },
];

export function PortfolioShowcase({
  items = DEFAULT_PORTFOLIO,
  eyebrow = "[ · ] · Portfólio",
  title = "Sites e plataformas que a Aceleriq construiu",
  intro = "Cada projeto é construído como ativo comercial: design premium, SEO técnico, performance real e integração ao funil. Alguns dos cases recentes da agência.",
}: {
  items?: PortfolioItem[];
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  const [active, setActive] = useState<PortfolioItem | null>(null);

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
    <section className="relative py-16 md:py-24 bg-grid-ambient">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ITEMLIST_JSONLD) }}
      />
      <div className="container-aceleriq">
        <div className="max-w-2xl">
          <span className="label-eyebrow">{eyebrow}</span>
          <h2 className="mt-3 font-display text-3xl font-medium leading-[1.05] tracking-[-0.03em] md:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            {intro}
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.button
              key={it.slug}
              type="button"
              onClick={() => setActive(it)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: Math.min(i, 6) * 0.04 }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-card/40 text-left card-hover focus:outline-none focus:ring-2 focus:ring-primary/60"
              aria-label={`Abrir case ${it.name}`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/20">
                <img
                  src={SHOTS(it.origin, 800)}
                  alt={`Preview do site ${it.name} — ${it.segment}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
                <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-background/70 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-foreground/90 backdrop-blur">
                  Ver case
                  <ArrowUpRight className="h-3 w-3" />
                </div>
              </div>
              <div className="p-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                  {it.segment}
                </span>
                <h3 className="mt-2 font-display text-[17px] font-medium tracking-tight">
                  {it.name}
                </h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {it.scope.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {active && <CaseModal item={active} onClose={() => setActive(null)} />}
    </section>
  );
}

function CaseModal({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Case ${item.name}`}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/85 backdrop-blur-md" />
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative z-10 flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/95 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              {item.segment}
            </span>
            <h3 className="mt-1 font-display text-2xl font-medium tracking-tight md:text-3xl">
              {item.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="rounded-full border border-white/10 bg-background/60 p-2 text-muted-foreground transition hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid flex-1 gap-0 overflow-hidden md:grid-cols-[1.6fr_1fr]">
          <div className="relative overflow-y-auto bg-black/30 p-4 md:p-6">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-background shadow-xl">
              <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                <span className="ml-3 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                  Projeto Aceleriq · {item.name}
                </span>
              </div>
              <img
                src={SHOTS(item.origin, 1600)}
                alt={`Captura completa do site ${item.name}`}
                loading="eager"
                decoding="async"
                className="block w-full"
              />
            </div>
          </div>
          <div className="overflow-y-auto border-t border-white/10 bg-card/60 p-6 md:border-l md:border-t-0">
            <span className="label-eyebrow">Sobre o projeto</span>
            <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
              {item.description}
            </p>
            <div className="mt-6">
              <span className="label-eyebrow">Escopo entregue</span>
              <ul className="mt-3 space-y-2">
                {item.scope.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-2 text-[13px] text-foreground/90"
                  >
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-primary" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <p className="text-[12px] leading-relaxed text-muted-foreground">
                Projeto desenvolvido pela <strong className="text-foreground">Aceleriq</strong> —
                agência de marketing digital, sites e crescimento em Curitiba.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
