import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, Check, RotateCw, Monitor, Smartphone } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

const THUMB = (origin: string, w: number) =>
  `https://image.thum.io/get/width/${w}/crop/900/noanimate/${origin}`;

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
      "SEO técnico e Core Web Vitals verde",
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
  title = "Cases recentes da Aceleriq",
  intro = "Selecionamos os projetos que melhor representam nosso padrão: design editorial, performance real e estratégia integrada ao funil. Clique e navegue pelo case dentro do nosso ambiente.",
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
          <div className="mt-10">
            <Carousel opts={{ align: "start", loop: false }} className="w-full">
              <CarouselContent className="-ml-4">
                {items.map((it) => (
                  <CarouselItem
                    key={it.slug}
                    className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <PortfolioCard item={it} onOpen={() => setActiveSlug(it.slug)} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-6 flex items-center justify-end gap-2">
                <CarouselPrevious className="static translate-y-0 h-10 w-10 border-white/10 bg-card/40 hover:bg-card" />
                <CarouselNext className="static translate-y-0 h-10 w-10 border-white/10 bg-card/40 hover:bg-card" />
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
}: {
  item: PortfolioItem;
  onOpen: () => void;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Abrir case ${item.name}`}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-card/40 text-left transition duration-300 hover:-translate-y-0.5 hover:border-white/15 hover:bg-card/60 focus:outline-none focus:ring-2 focus:ring-primary/60"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/10">
        {!imgFailed ? (
          <img
            src={THUMB(item.origin, 720)}
            alt={`Preview do site ${item.name} — ${item.segment}`}
            loading="lazy"
            decoding="async"
            width={720}
            height={450}
            onError={() => setImgFailed(true)}
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div
            className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${item.accent}`}
          >
            <span className="font-display text-2xl font-medium text-foreground/80">
              {item.name}
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-background/70 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-foreground/90 backdrop-blur transition group-hover:bg-primary group-hover:text-primary-foreground">
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

function CaseView({ item, onBack }: { item: PortfolioItem; onBack: () => void }) {
  const [iframeKey, setIframeKey] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  useEffect(() => {
    setLoaded(false);
    const t = setTimeout(() => setLoaded(true), 8000);
    return () => clearTimeout(t);
  }, [iframeKey, item.slug, device]);

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
          [ Case · {String(DEFAULT_PORTFOLIO.findIndex((i) => i.slug === item.slug) + 1).padStart(2, "0")} ]
        </span>
      </div>

      {/* Hero do case */}
      <div className="mt-8 flex flex-col gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
          {item.segment}
        </span>
        <h3 className="font-display text-4xl font-medium leading-[1.02] tracking-[-0.03em] md:text-6xl">
          {item.name}
        </h3>
        <p className="max-w-3xl text-[15px] leading-relaxed text-muted-foreground md:text-[16px]">
          {item.overview}
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        {/* Browser frame */}
        <div className="order-2 lg:order-1 lg:sticky lg:top-24 self-start">
          <div className="relative">
            {/* Ambient glow */}
            <div
              aria-hidden
              className={`pointer-events-none absolute -inset-10 -z-10 rounded-[40px] bg-gradient-to-br ${item.accent} opacity-60 blur-3xl`}
            />

            {/* Device toggle */}
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Preview ao vivo
              </span>
              <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-card/60 p-1 backdrop-blur">
                <button
                  type="button"
                  onClick={() => setDevice("desktop")}
                  aria-label="Visualização desktop"
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
                  aria-label="Visualização mobile"
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

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-background/60 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.8)] backdrop-blur">
              {/* Chrome */}
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
              <div className="relative bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.04),_transparent_60%)] p-4 sm:p-6">
                <ScaledFrame
                  key={`${iframeKey}-${device}-${item.slug}`}
                  src={item.origin}
                  posterSrc={THUMB(item.origin, device === "mobile" ? 600 : 1400)}
                  device={device}
                  loaded={loaded}
                  onLoad={() => setLoaded(true)}
                  title={`Preview navegável de ${item.name}`}
                />
              </div>
            </div>

            <p className="mt-4 text-center text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
              Navegue pelo projeto sem sair daqui
            </p>
          </div>
        </div>

        {/* Conteúdo do case */}
        <aside className="order-1 lg:order-2 space-y-7">
          <CaseBlock label="Desafio" body={item.challenge} />
          <CaseBlock label="Solução Aceleriq" body={item.solution} />

          <div>
            <span className="label-eyebrow">Destaques</span>
            <ul className="mt-3 space-y-2">
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
