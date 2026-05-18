import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Clock, Rss, Search, Sparkles } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { DiagnosticoModal } from "@/components/site/DiagnosticoModal";
import { CATEGORIES, type FeedCategory } from "@/lib/blog-feeds";
import { fetchOwnedBlogPosts, fetchFeedBlogPosts, type BlogPost } from "@/lib/blog.functions";
import { categoryCover } from "@/lib/blog-covers";
import heroAi from "@/assets/blog-hero-ai.jpg";

const PAGE_TITLE = "Blog Aceleriq · IA, Automação, Tráfego e Crescimento";
const PAGE_DESCRIPTION =
  "Curadoria em tempo real sobre IA aplicada, automação, tráfego pago, vendas e crescimento, com a leitura estratégica da Aceleriq.";
const PAGE_URL = "https://aceleriq.com.br/blog";
const OG_IMAGE = "https://aceleriq.com.br/og-image.jpg";

export const Route = createFileRoute("/blog/")({
  loader: async () => {
    try {
      // Apenas posts próprios (admin + locais) — resposta instantânea.
      return await fetchOwnedBlogPosts();
    } catch {
      return { posts: [] as BlogPost[] };
    }
  },
  head: ({ loaderData }) => {
    const posts: BlogPost[] = (loaderData?.posts ?? []).slice(0, 12);
    const blogJsonLd = {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Blog Aceleriq",
      url: PAGE_URL,
      description: PAGE_DESCRIPTION,
      inLanguage: "pt-BR",
      publisher: {
        "@type": "Organization",
        name: "Aceleriq",
        url: "https://aceleriq.com.br",
        logo: { "@type": "ImageObject", url: "https://aceleriq.com.br/icon-512.png" },
      },
      blogPost: posts.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title.slice(0, 110),
        url: `${PAGE_URL}/${p.slug}`,
        datePublished: p.publishedAt,
        articleSection: p.category,
        image: p.image || undefined,
        author: {
          "@type": p.isLocal ? "Organization" : "Person",
          name: p.author || (p.isLocal ? "Aceleriq" : p.source),
        },
      })),
    };
    const itemListJsonLd = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: posts.length,
      itemListElement: posts.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${PAGE_URL}/${p.slug}`,
        name: p.title,
      })),
    };
    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://aceleriq.com.br" },
        { "@type": "ListItem", position: 2, name: "Blog", item: PAGE_URL },
      ],
    };
    return {
      meta: [
        { title: PAGE_TITLE },
        { name: "description", content: PAGE_DESCRIPTION },
        { property: "og:title", content: PAGE_TITLE },
        { property: "og:description", content: PAGE_DESCRIPTION },
        { property: "og:url", content: PAGE_URL },
        { property: "og:type", content: "website" },
        { property: "og:image", content: OG_IMAGE },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: PAGE_TITLE },
        { name: "twitter:description", content: PAGE_DESCRIPTION },
        { name: "twitter:image", content: OG_IMAGE },
      ],
      links: [{ rel: "canonical", href: PAGE_URL }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(blogJsonLd) },
        { type: "application/ld+json", children: JSON.stringify(itemListJsonLd) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd) },
      ],
    };
  },
  component: BlogIndex,
});

function timeAgo(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

function BlogIndex() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [cat, setCat] = useState<FeedCategory | "all">("all");
  const [q, setQ] = useState("");
  const { posts = [] } = (Route.useLoaderData() ?? {}) as { posts?: BlogPost[] };
  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (q && !`${p.title} ${p.excerpt} ${p.source}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [posts, cat, q]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Header onDiagnostico={() => setDiagOpen(true)} />

      <section className="relative pt-28 pb-10 md:pt-44 md:pb-20 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{ backgroundImage: `url(${heroAi})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(167,139,250,0.10),transparent_55%)]" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          }}
        />
        <div className="container-aceleriq relative">
          <div>
            <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1 mb-6">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <Rss className="h-3 w-3 text-primary" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                Live Intelligence Feed
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-semibold tracking-tight text-foreground max-w-4xl leading-[1.08]">
              Inteligência de mercado <span className="text-primary">em tempo real</span>.
            </h1>
            <p className="mt-4 md:mt-6 max-w-2xl text-sm md:text-lg text-muted-foreground leading-relaxed">
              Curadoria contínua das fontes mais confiáveis do mundo em IA aplicada, automação, tráfego pago, vendas e
              crescimento. Filtrado pela ótica da Aceleriq, sem ruído.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-primary" /> Curadoria por IA
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3 w-3 text-primary" /> Atualizado a cada 10 min
              </span>
            </div>
          </div>

          <div className="mt-8 md:mt-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="-mx-4 px-4 flex gap-2 overflow-x-auto md:overflow-visible md:mx-0 md:px-0 md:flex-wrap [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
              <FilterPill active={cat === "all"} onClick={() => setCat("all")}>
                Tudo
              </FilterPill>
              {CATEGORIES.map((c) => (
                <FilterPill key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>
                  {c.label}
                </FilterPill>
              ))}
            </div>
            <div className="relative md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar no feed..."
                className="w-full border border-white/10 bg-white/5 pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-aceleriq">
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-20">Nenhum artigo encontrado para esses filtros.</p>
          )}

          {featured && <FeaturedCard post={featured} />}

          {rest.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
              {rest.map((p, i) => (
                <PostCard key={p.slug} post={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <DiagnosticoModal open={diagOpen} onOpenChange={setDiagOpen} />
    </div>
  );
}

function FilterPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.18em] border transition-colors ${
        active
          ? "border-primary bg-primary/10 text-primary"
          : "border-white/10 bg-white/[0.02] text-muted-foreground hover:border-primary/30 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group block border border-white/10 bg-white/[0.02] hover:border-primary/40 transition-colors overflow-hidden"
    >
      <div className="grid md:grid-cols-2">
        <div className="relative aspect-[16/10] md:aspect-auto bg-gradient-to-br from-primary/20 via-violet-500/10 to-transparent overflow-hidden">
          <img
            src={post.image || categoryCover(post.category)}
            alt=""
              loading="eager"
              fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent" />
        </div>
        <div className="p-5 sm:p-8 md:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-3 md:mb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
              {post.isLocal ? "Aceleriq · Original" : "Em destaque"}
            </span>
            <span className="text-white/20">·</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground truncate">{post.source}</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors leading-snug">
            {post.title}
          </h2>
          <p className="mt-3 md:mt-4 text-sm md:text-base text-muted-foreground line-clamp-3">{post.excerpt}</p>
          <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3 w-3" /> {timeAgo(post.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1.5 text-primary group-hover:gap-2.5 transition-all">
              Ler análise <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function PostCard({ post }: { post: BlogPost; index: number }) {
  return (
    <div style={{ contentVisibility: "auto", containIntrinsicSize: "360px" }}>
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="group block h-full border border-white/10 bg-white/[0.02] hover:border-primary/40 transition-colors overflow-hidden"
      >
        <div className="relative aspect-[16/9] bg-gradient-to-br from-primary/15 via-violet-500/10 to-transparent overflow-hidden">
          <img
            src={post.image || categoryCover(post.category)}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {post.isLocal && (
            <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 border border-primary/40 bg-background/80 backdrop-blur px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-primary">
              <Sparkles className="h-2.5 w-2.5" /> Aceleriq
            </span>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-primary">{post.category}</span>
            <span className="text-white/15">·</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground truncate">
              {post.source}
            </span>
          </div>
          <h3 className="text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-3">
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
          <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3 w-3" /> {timeAgo(post.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              Ler análise <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
