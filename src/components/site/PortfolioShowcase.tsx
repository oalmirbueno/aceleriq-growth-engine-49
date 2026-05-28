import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, Check, RotateCw, Monitor, Smartphone } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { SectionHeader } from "./Sections";

export type PortfolioItem = {
  slug: string;
  name: string;
  segment: string;
  /** Origin used only to build the iframe/screenshot — never displayed to the user. */
  origin: string;
  accent: string; // gradient fallback
  overview: string;
  challenge: string;
  solution: string;
  highlights: string[];
  stack: string[];
  results: string[];
};

/** Local snapshot baked into /public — instant, never blank. */
const LOCAL_PREVIEW = (slug: string) => `/portfolio-previews/${slug}.jpg`;
/** Live screenshot fallback (only used if the local file ever 404s). */
const REMOTE_THUMB = (origin: string, w: number) =>
  `https://image.thum.io/get/width/${w}/crop/1200/noanimate/${origin}`;

export const DEFAULT_PORTFOLIO: PortfolioItem[] = [
  {
    slug: "stopinfo",
    name: "Stop Info",
    segment: "Tecnologia · Varejo",
    origin: "https://stopinfo.com.br",
    accent: "from-sky-500/30 via-indigo-500/20 to-transparent",
    overview:
      "Reposicionamento digital completo de uma marca de tecnologia consolidada em Curitiba, com site institucional e e-commerce integrados em uma única identidade.",
    challenge:
      "Marca tradicional com presença digital fragmentada, baixa captação online e ausência de funil entre site institucional e loja.",
    solution:
      "Refizemos a arquitetura de marca digital, criamos site institucional rápido e SEO-ready, e estruturamos a loja online com catálogo escalável e checkout otimizado.",
    highlights: [
      "Identidade digital coerente entre institucional e e-commerce",
      "Catálogo dinâmico com filtros por categoria e marca",
      "SEO técnico forte e performance cuidada",
      "Integração com WhatsApp, GA4 e pixels de conversão",
    ],
    stack: ["Next.js", "Tailwind", "Headless commerce", "GA4"],
    results: [
      "Aumento de tráfego orgânico mês a mês",
      "Funil único entre institucional e loja",
      "Operação digital pronta para escalar tráfego pago",
    ],
  },
  {
    slug: "flordesaoroque",
    name: "Pousada Flor de São Roque",
    segment: "Hospedagem · Turismo",
    origin: "https://flordesaoroquepousada.lovable.app",
    accent: "from-emerald-500/30 via-teal-500/20 to-transparent",
    overview:
      "Site de hospedagem com narrativa visual imersiva, traduzindo a experiência da pousada em uma jornada digital sensorial.",
    challenge:
      "Comunicar a atmosfera única do lugar e converter visitantes em reservas diretas, sem depender 100% de OTAs.",
    solution:
      "Storytelling visual com fotografia em destaque, hierarquia editorial e fluxo direto para reserva via WhatsApp.",
    highlights: [
      "Hero cinematográfico com fotografia em destaque",
      "Galeria editorial das acomodações",
      "Fluxo direto de reserva e contato",
      "Layout responsivo otimizado para mobile",
    ],
    stack: ["React", "Tailwind", "Otimização de imagens", "SEO local"],
    results: [
      "Reservas diretas pelo site",
      "Redução da dependência de plataformas terceiras",
      "Identidade digital alinhada à experiência presencial",
    ],
  },
  {
    slug: "camillystresser",
    name: "Camilly Stresser",
    segment: "Marca pessoal",
    origin: "https://camillystresser.com.br",
    accent: "from-rose-500/30 via-pink-500/20 to-transparent",
    overview:
      "Plataforma de autoridade para profissional liberal, traduzindo posicionamento técnico em uma experiência digital premium.",
    challenge:
      "Construir autoridade online em um mercado saturado e capturar leads qualificados sem parecer mais um perfil profissional genérico.",
    solution:
      "Site de marca pessoal com identidade tipográfica forte, prova social estruturada e CTA principal claro para contato direto.",
    highlights: [
      "Identidade visual editorial e premium",
      "Prova social e credenciais em destaque",
      "Captação direta via formulário e WhatsApp",
      "SEO de nome e nicho",
    ],
    stack: ["React", "Tailwind", "Form handling", "SEO on-page"],
    results: [
      "Posicionamento de autoridade na busca pelo nome",
      "Aumento de contatos qualificados",
      "Plataforma escalável para conteúdo futuro",
    ],
  },
  {
    slug: "brit",
    name: "Brit",
    segment: "Marca · D2C",
    origin: "https://brit.lovable.app",
    accent: "from-amber-500/30 via-orange-500/20 to-transparent",
    overview:
      "Site de marca direta ao consumidor com identidade forte, narrativa de produto e estética premium.",
    challenge:
      "Comunicar uma marca emergente com personalidade própria sem cair no padrão genérico de e-commerce template.",
    solution:
      "Design custom com hierarquia editorial, foco em produto e narrativa de marca consistente em cada bloco da página.",
    highlights: [
      "Identidade visual forte e consistente",
      "Storytelling de produto orientado a desejo",
      "Layout custom, sem sensação de template",
      "Performance e responsividade nativas",
    ],
    stack: ["React", "Tailwind", "Motion", "Design system custom"],
    results: [
      "Posicionamento premium de marca",
      "Base preparada para escalar D2C",
      "Diferenciação clara da concorrência",
    ],
  },
  {
    slug: "level-me",
    name: "Level Me",
    segment: "Lifestyle · Performance",
    origin: "https://level-me.lovable.app",
    accent: "from-violet-500/30 via-fuchsia-500/20 to-transparent",
    overview:
      "Plataforma de marca lifestyle com foco em performance pessoal, posicionamento aspiracional e captação contínua.",
    challenge:
      "Traduzir um conceito aspiracional em uma experiência digital coerente, com captação ativa sem agredir o público.",
    solution:
      "Arquitetura de site centrada em narrativa, com seções de prova, método e captação distribuídos ao longo da jornada.",
    highlights: [
      "Hero aspiracional com hierarquia clara",
      "Seções de método e prova bem distribuídas",
      "Captação contínua em pontos estratégicos",
      "Identidade premium consistente",
    ],
    stack: ["React", "Tailwind", "Animações scroll", "SEO"],
    results: [
      "Plataforma de marca consolidada",
      "Captação contínua de novos leads",
      "Posicionamento premium no nicho",
    ],
  },
  {
    slug: "sitebolt",
    name: "SiteBolt",
    segment: "SaaS · Tecnologia",
    origin: "https://sitebolt.lovable.app",
    accent: "from-cyan-500/30 via-blue-500/20 to-transparent",
    overview:
      "Landing page de produto SaaS com narrativa orientada a benefício, prova técnica e fluxo direto de ativação.",
    challenge:
      "Comunicar um produto técnico de forma clara para um público misto (técnico + decisor) e ativar conversões sem fricção.",
    solution:
      "Hero direto ao valor, prova técnica em destaque, seções de feature/benefício separadas e CTA repetido em pontos-chave.",
    highlights: [
      "Hero focado em proposta de valor",
      "Demonstração visual do produto",
      "Pricing e CTA claros",
      "Performance e SEO técnico nativos",
    ],
    stack: ["React", "Tailwind", "Edge deploy", "Analytics"],
    results: [
      "Landing pronta para campanhas pagas",
      "Mensagem clara para público técnico e decisor",
      "Base escalável para novas features",
    ],
  },
  {
    slug: "jalimpo",
    name: "JA Limpo",
    segment: "Serviços · Limpeza",
    origin: "https://jalimpo.com.br",
    accent: "from-lime-500/30 via-emerald-500/20 to-transparent",
    overview:
      "Site institucional de empresa de limpeza com foco em captação local, autoridade de marca e contato direto via WhatsApp.",
    challenge:
      "Diferenciar uma operação de serviço em mercado pulverizado e gerar leads qualificados sem depender de marketplaces.",
    solution:
      "Site claro, com prova social, portfólio de serviços e CTA para WhatsApp em todos os pontos da jornada.",
    highlights: [
      "Hierarquia comercial clara",
      "Portfólio de serviços segmentado",
      "Prova social em destaque",
      "SEO local Curitiba",
    ],
    stack: ["React", "Tailwind", "SEO local", "WhatsApp API"],
    results: ["Aumento de contatos diretos", "Posicionamento local consolidado", "Marca percebida como premium"],
  },
  {
    slug: "deliciasgama",
    name: "Delícias Gama",
    segment: "Food · Confeitaria",
    origin: "https://deliciasgama.lovable.app",
    accent: "from-pink-500/30 via-rose-500/20 to-transparent",
    overview:
      "Site de confeitaria artesanal com vitrine visual, narrativa afetiva e fluxo direto de pedido.",
    challenge:
      "Transformar um perfil de Instagram em uma operação digital com identidade própria e fluxo de pedidos organizado.",
    solution:
      "Vitrine fotográfica, cardápio organizado por categoria e CTA de pedido via WhatsApp em destaque.",
    highlights: ["Vitrine fotográfica afetiva", "Cardápio organizado", "Fluxo direto de pedido", "Mobile-first"],
    stack: ["React", "Tailwind", "Otimização de imagens"],
    results: ["Pedidos diretos pelo site", "Identidade visual consistente", "Profissionalização da marca"],
  },
  {
    slug: "rotasul",
    name: "Rota Sul Multimarcas",
    segment: "Automotivo · Varejo",
    origin: "https://rotasulmultimarcas.lovable.app",
    accent: "from-zinc-500/30 via-slate-500/20 to-transparent",
    overview:
      "Plataforma de loja multimarcas com vitrine de veículos, ficha técnica e captação direta para venda.",
    challenge:
      "Estruturar uma vitrine digital profissional para uma loja de carros que competia com grandes portais.",
    solution:
      "Catálogo dinâmico, fichas detalhadas, fotos em destaque e CTA direto para WhatsApp do vendedor.",
    highlights: ["Catálogo de veículos dinâmico", "Fichas técnicas completas", "Fotos em alta resolução", "CTA direto ao vendedor"],
    stack: ["React", "Tailwind", "Catálogo dinâmico"],
    results: ["Captação independente de portais", "Aumento de leads qualificados", "Profissionalização da marca"],
  },
  {
    slug: "cartaoacessosaude",
    name: "Cartão Acesso Saúde",
    segment: "Saúde · Benefícios",
    origin: "https://cartaoacessosaude.lovable.app",
    accent: "from-teal-500/30 via-cyan-500/20 to-transparent",
    overview:
      "Plataforma de cartão de benefícios em saúde com narrativa institucional e fluxo direto de adesão.",
    challenge:
      "Comunicar um produto sensível (saúde) com clareza, autoridade e fluxo de conversão sem fricção.",
    solution:
      "Site institucional com prova de rede, planos comparáveis e CTA direto de adesão.",
    highlights: ["Comparativo de planos", "Prova de rede credenciada", "CTA de adesão claro", "Mobile-first"],
    stack: ["React", "Tailwind", "SEO técnico"],
    results: ["Adesões diretas pelo site", "Autoridade institucional", "Base escalável para tráfego pago"],
  },
  {
    slug: "buenoconstrucao",
    name: "Bueno Construção",
    segment: "Construção · Materiais",
    origin: "https://buenoconstrucao.lovable.app",
    accent: "from-orange-500/30 via-amber-500/20 to-transparent",
    overview:
      "Site institucional de loja de materiais de construção com vitrine de produtos e atendimento direto.",
    challenge:
      "Levar uma operação tradicional para o digital sem perder a identidade local de relacionamento.",
    solution:
      "Site institucional com catálogo de categorias, prova social local e CTA WhatsApp em destaque.",
    highlights: ["Catálogo por categoria", "Identidade local forte", "WhatsApp integrado", "SEO local"],
    stack: ["React", "Tailwind", "SEO local"],
    results: ["Captação digital ativa", "Modernização de marca tradicional", "Atendimento direto via WhatsApp"],
  },
  {
    slug: "operacaodigital",
    name: "Operação Digital",
    segment: "Sistema · Organização",
    origin: "https://aceleriq.online",
    accent: "from-emerald-500/30 via-cyan-500/20 to-transparent",
    overview:
      "Estrutura operacional para centralizar rotinas, acompanhamento de entregas e documentação de próximos passos.",
    challenge:
      "Reduzir dependência de mensagens soltas e dar mais clareza para acompanhamento de projetos e decisões.",
    solution:
      "Organização de painel, cadência de acompanhamento, documentação de entregas e visão simples de status por frente de trabalho.",
    highlights: ["Rotinas documentadas", "Acompanhamento de entregas", "Visão de próximos passos", "Base para operação contínua"],
    stack: ["Painel operacional", "Documentação", "Automações", "CRM"],
    results: ["Mais clareza operacional", "Menos dependência de relatório solto", "Decisões registradas em um só lugar"],
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
  eyebrow = "[ 13 ] · Portfólio",
  title = "Projetos e estruturas digitais em produção",
  intro = "Uma seleção de sites, landing pages, plataformas e estruturas digitais desenvolvidas ou organizadas pela Aceleriq e seu ecossistema.",
}: Props) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const active = activeSlug ? items.find((i) => i.slug === activeSlug) ?? null : null;

  // Scroll para o topo da seção APENAS na abertura inicial do case.
  const wasActiveRef = useRef(false);
  useEffect(() => {
    const isActive = !!active;
    if (isActive && !wasActiveRef.current && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "auto", block: "start" });
    }
    wasActiveRef.current = isActive;
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
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            description={intro}
          />
        )}

        {active ? (
          <CaseView
            item={active}
            items={items}
            onBack={() => setActiveSlug(null)}
            onSelect={(slug) => setActiveSlug(slug)}
          />
        ) : (
          <div className="mt-10">
            <Carousel opts={{ align: "start", loop: false }} className="w-full">
              <CarouselContent className="-ml-4">
                {items.map((it, idx) => (
                  <CarouselItem
                    key={it.slug}
                    className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <PortfolioCard item={it} eager={idx < 3} onOpen={() => setActiveSlug(it.slug)} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-6 flex items-center justify-end gap-2">
                <CarouselPrevious className="static translate-y-0 h-10 w-10 border-primary/30 bg-card/40 text-primary hover:bg-primary hover:text-primary-foreground" />
                <CarouselNext className="static translate-y-0 h-10 w-10 border-primary/30 bg-card/40 text-primary hover:bg-primary hover:text-primary-foreground" />
              </div>
            </Carousel>
          </div>
        )}
      </div>
    </section>
  );
}

function PortfolioCard({
  item,
  onOpen,
  eager = false,
}: {
  item: PortfolioItem;
  onOpen: () => void;
  eager?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Abrir case ${item.name}`}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-card/40 text-left transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card/60 hover:shadow-[0_20px_60px_-20px_oklch(85%_0.2_145/0.35)] focus:outline-none focus:ring-2 focus:ring-primary/60"
    >
      {/* dark stage avoids the white flash before the image paints */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[oklch(15%_0.01_240)]">
        <img
          src={LOCAL_PREVIEW(item.slug)}
          alt={`Preview do site ${item.name} — ${item.segment}`}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={eager ? "high" : "auto"}
          width={720}
          height={450}
          onError={(e) => {
            const t = e.currentTarget;
            if (!t.dataset.fallback) {
              t.dataset.fallback = "1";
              t.src = REMOTE_THUMB(item.origin, 720);
            }
          }}
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        {/* unified brand tint — kills the multi-color "dirty" feel */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent" />
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-background/80 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-primary backdrop-blur transition group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
          Abrir case
          <ArrowUpRight className="h-3 w-3" />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
          {item.segment}
        </span>
        <h3 className="font-display text-[16px] font-medium leading-tight tracking-tight">
          {item.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-muted-foreground">
          {item.overview}
        </p>
      </div>
    </button>
  );
}

function CaseView({
  item,
  items,
  onBack,
  onSelect,
}: {
  item: PortfolioItem;
  items: PortfolioItem[];
  onBack: () => void;
  onSelect: (slug: string) => void;
}) {
  const [iframeKey, setIframeKey] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  // Fallback agressivo: se o iframe demorar, removemos o overlay rápido.
  // Mobile carrega ainda mais rápido (viewport menor, menos assets).
  useEffect(() => {
    setLoaded(false);
    const t = setTimeout(() => setLoaded(true), device === "mobile" ? 300 : 450);
    return () => clearTimeout(t);
  }, [iframeKey, device]);

  const currentIndex = items.findIndex((i) => i.slug === item.slug);

  return (
    <div className="animate-fade-in">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-card/40 px-4 py-2 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground transition hover:border-white/20 hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Portfólio
        </button>
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:inline">
          [ Case · {String(currentIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")} ]
        </span>
      </div>

      {/* Case meta */}
      <div className="mt-8 flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
            {item.segment}
          </span>
          <h3 className="mt-2 font-display text-4xl font-medium leading-[1.02] tracking-[-0.03em] md:text-6xl">
            {item.name}
          </h3>
        </div>

        <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-card/60 p-1 backdrop-blur">
          <button
            type="button"
            onClick={() => setDevice("desktop")}
            aria-pressed={device === "desktop"}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] transition ${
              device === "desktop"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Monitor className="h-3 w-3" />
            Desktop
          </button>
          <button
            type="button"
            onClick={() => setDevice("mobile")}
            aria-pressed={device === "mobile"}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] transition ${
              device === "mobile"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Smartphone className="h-3 w-3" />
            Mobile
          </button>
        </div>
      </div>

      {/* FULL-WIDTH preview */}
      <div className="relative mt-8">
        {/* Ambient glow */}
        <div
          aria-hidden
          className={`pointer-events-none absolute -inset-12 -z-10 rounded-[40px] bg-gradient-to-br ${item.accent} opacity-60 blur-3xl`}
        />

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-background/60 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-3 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
            </div>
            <div className="ml-2 flex flex-1 items-center justify-center">
              <span className="rounded-md bg-background/60 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                aceleriq · {item.slug}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIframeKey((k) => k + 1)}
              aria-label="Recarregar preview"
              className="rounded-md p-1.5 text-muted-foreground transition hover:bg-white/[0.05] hover:text-foreground"
            >
              <RotateCw className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Stage */}
          <div className="relative bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.04),_transparent_60%)] p-3 sm:p-5">
            <ScaledFrame
              key={`${iframeKey}-${device}`}
              src={item.origin}
              posterSrc={LOCAL_PREVIEW(item.slug)}
              device={device}
              loaded={loaded}
              onLoad={() => setLoaded(true)}
              title={`Preview navegável de ${item.name}`}
            />
          </div>
        </div>
      </div>

      {/* Cases rail — switch project inline */}
      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <span className="label-eyebrow">Outros cases</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {items.length.toString().padStart(2, "0")} projetos · clique para trocar
          </span>
        </div>
        <div
          className="relative -mx-1 overflow-x-auto overflow-y-hidden custom-scroll"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)",
          }}
        >
          <div className="flex gap-3 px-1 pb-3">
            {items.map((it, i) => {
              const isActive = it.slug === item.slug;
              return (
                <button
                  key={it.slug}
                  type="button"
                  onClick={() => onSelect(it.slug)}
                  aria-label={`Abrir case ${it.name}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`group relative flex-shrink-0 overflow-hidden rounded-xl border bg-card/40 text-left transition-all duration-300 ${
                    isActive
                      ? "border-primary/70 ring-2 ring-primary/30 shadow-[0_10px_40px_-12px_oklch(85%_0.2_145_/_0.4)]"
                      : "border-white/[0.08] hover:-translate-y-0.5 hover:border-white/25 hover:bg-card/70"
                  }`}
                  style={{ width: "190px" }}
                >
                  <RailThumb item={it} isActive={isActive} index={i} />
                  <div className="px-3 py-2.5">
                    <p className="truncate font-display text-[12.5px] font-medium leading-tight">
                      {it.name}
                    </p>
                    <p className="truncate font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                      {it.segment}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Conteúdo do case — abaixo do preview, em colunas */}
      <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-7 lg:col-span-2">
          <p className="max-w-3xl text-[15px] leading-relaxed text-muted-foreground md:text-[16px]">
            {item.overview}
          </p>
          <div className="grid gap-7 sm:grid-cols-2">
            <CaseBlock label="Desafio" body={item.challenge} />
            <CaseBlock label="Solução Aceleriq" body={item.solution} />
          </div>

          <div>
            <span className="label-eyebrow">Destaques</span>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {item.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2.5 text-[13px] leading-relaxed text-foreground/90"
                >
                  <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="space-y-7">
          <div>
            <span className="label-eyebrow">Stack & técnicas</span>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="label-eyebrow">Resultados</span>
            <ul className="mt-3 space-y-2">
              {item.results.map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-2.5 text-[13px] leading-relaxed text-foreground/90"
                >
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
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

function RailThumb({
  item,
  isActive,
  index,
}: {
  item: PortfolioItem;
  isActive: boolean;
  index: number;
}) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
      {/* Captura local — instantânea, sem tela escura */}
      <img
        src={LOCAL_PREVIEW(item.slug)}
        alt={`Preview ${item.name}`}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        width={360}
        height={225}
        onError={(e) => {
          const t = e.currentTarget;
          if (!t.dataset.fallback) {
            t.dataset.fallback = "1";
            t.src = REMOTE_THUMB(item.origin, 480);
          }
        }}
        className={`absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 ${
          isActive ? "" : "group-hover:scale-[1.05]"
        }`}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
      <span className="absolute left-2 top-2 rounded-md border border-white/15 bg-background/70 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/85 backdrop-blur">
        {String(index + 1).padStart(2, "0")}
      </span>
      {isActive && (
        <span className="absolute right-2 top-2 rounded-md bg-primary px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-primary-foreground">
          Ativo
        </span>
      )}
    </div>
  );
}

function CaseBlock({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <span className="label-eyebrow">{label}</span>
      <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
        {body}
      </p>
    </div>
  );
}

/**
 * Renders an iframe at a real device viewport (1600 desktop / 390 mobile)
 * scaled with CSS transform to fit the container — embedded site loads its
 * true desktop layout. Poster sits underneath as instant content.
 */
function ScaledFrame({
  src,
  posterSrc,
  device,
  loaded,
  onLoad,
  title,
}: {
  src: string;
  posterSrc: string;
  device: "desktop" | "mobile";
  loaded: boolean;
  onLoad: () => void;
  title: string;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [scale, setScale] = useState(1);
  // Pré-ativa o iframe automaticamente — o site começa a carregar
  // assim que o case abre, sem esperar o usuário clicar no overlay.
  const [activated, setActivated] = useState(true);
  const [blocked, setBlocked] = useState(false);

  // Real device viewport — desktop renders at 1600 wide for true 4K-ready feel
  const FRAME_W = device === "mobile" ? 390 : 1600;
  const FRAME_H = device === "mobile" ? 820 : 1000;

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      if (w > 0) setScale(w / FRAME_W);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [FRAME_W]);

  // Reset on src change — re-ativa para já começar a carregar o novo site.
  useEffect(() => {
    setActivated(true);
    setBlocked(false);
  }, [src]);

  const handleIframeLoad = () => {
    // Detect about:blank (X-Frame-Options blocked) — same-origin returns href,
    // cross-origin success throws SecurityError.
    const f = iframeRef.current;
    try {
      const href = f?.contentWindow?.location?.href;
      if (href === "about:blank" || href === "") {
        setBlocked(true);
        return;
      }
    } catch {
      /* cross-origin = loaded successfully */
    }
    onLoad();
  };

  const stageHeight = FRAME_H * scale;
  const isMobile = device === "mobile";

  return (
    <div
      ref={wrapRef}
      className={`relative mx-auto w-full overflow-hidden bg-background ${
        isMobile
          ? "max-w-[380px] rounded-[32px] border border-white/10 shadow-2xl"
          : "rounded-md border border-white/[0.06]"
      }`}
      style={{ height: stageHeight ? `${stageHeight}px` : undefined }}
    >
      {/* Poster — sempre visível até o iframe carregar (e fica caso bloqueado) */}
      <img
        src={posterSrc}
        alt=""
        aria-hidden
        loading="eager"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />

      {/* Iframe — só monta quando o usuário ativa (lighter / no blank) */}
      {activated && !blocked && (
        <iframe
          ref={iframeRef}
          src={src}
          title={title}
          onLoad={handleIframeLoad}
          loading="eager"
          referrerPolicy="no-referrer"
          className="absolute left-0 top-0 border-0 transition-opacity duration-500"
          style={{
            width: `${FRAME_W}px`,
            height: `${FRAME_H}px`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            opacity: loaded ? 1 : 0,
          }}
        />
      )}

      {/* Overlay CTA — clique para navegar */}
      {(!activated || blocked) && (
        <div className="absolute inset-0 z-10 flex items-end justify-center bg-gradient-to-t from-background/85 via-background/10 to-transparent p-5">
          <button
            type="button"
            onClick={() => {
              setBlocked(false);
              setActivated(true);
            }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-background/80 px-5 py-2.5 text-[11px] font-mono uppercase tracking-[0.2em] text-foreground backdrop-blur-md transition hover:border-primary/60 hover:bg-primary hover:text-primary-foreground"
          >
            {blocked ? "Tentar novamente" : "Navegar no site ao vivo"}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Loader sutil enquanto iframe inicializa */}
      {activated && !loaded && !blocked && (
        <div className="absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-white/15 bg-background/70 px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          Carregando ambiente
        </div>
      )}
    </div>
  );
}
