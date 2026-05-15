import React, { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowRight, Clock, Link2, Linkedin, MessageCircle, Share2, Sparkles, Twitter, Check } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { DiagnosticoModal } from "@/components/site/DiagnosticoModal";
import { fetchBlogPost } from "@/lib/blog.functions";
import { categoryCover } from "@/lib/blog-covers";
import { whatsappLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/contact";
import { TableOfContents, extractToc, slugify } from "@/components/site/TableOfContents";
import {
  SERVICE_LINK_TARGETS,
  buildPostLinkTargets,
  createLinkerState,
  injectInternalLinks,
} from "@/lib/internal-links";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const res = await fetchBlogPost({ data: { slug: params.slug } });
    if (!res.post) throw notFound();
    return res;
  },
  head: ({ loaderData, params }) => {
    const post = loaderData?.post;
    const url = `https://aceleriq.com.br/blog/${params.slug}`;
    if (!post) {
      return {
        meta: [
          { title: "Artigo · Blog Aceleriq" },
          { name: "robots", content: "noindex,follow" },
        ],
      };
    }
    const title = `${post.title} · Aceleriq`;
    const desc = (post.excerpt || `Análise sobre ${post.category} no blog da Aceleriq.`).slice(0, 158);
    const rawImage = post.image || `https://aceleriq.com.br/og-default.jpg`;
    const image = rawImage.startsWith("http") ? rawImage : `https://aceleriq.com.br${rawImage}`;
    const keywords = [
      post.category,
      "inteligência artificial",
      "automação",
      "marketing",
      "Aceleriq",
      post.source,
    ]
      .filter(Boolean)
      .join(", ");

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: keywords },
        { name: "author", content: post.author || "Aceleriq" },
        { name: "robots", content: "index,follow,max-image-preview:large,max-snippet:-1" },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { property: "og:site_name", content: "Aceleriq" },
        { property: "og:locale", content: "pt_BR" },
        { property: "og:image", content: image },
        { property: "og:image:alt", content: post.title },
        { property: "article:published_time", content: post.publishedAt },
        { property: "article:modified_time", content: post.publishedAt },
        { property: "article:section", content: post.category },
        { property: "article:author", content: post.author || "Aceleriq" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title.slice(0, 110),
            description: desc,
            image: [image],
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            inLanguage: post.lang === "en" ? "en" : "pt-BR",
            articleSection: post.category,
            keywords,
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            url,
            author: {
              "@type": post.isLocal ? "Organization" : "Person",
              name: post.author || (post.isLocal ? "Aceleriq" : post.source),
            },
            publisher: {
              "@type": "Organization",
              name: "Aceleriq",
              url: "https://aceleriq.com.br",
              logo: {
                "@type": "ImageObject",
                url: "https://aceleriq.com.br/icon-512.png",
              },
            },
            isAccessibleForFree: true,
            citation: post.isLocal ? undefined : post.link,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://aceleriq.com.br" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://aceleriq.com.br/blog" },
              { "@type": "ListItem", position: 3, name: post.title, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: BlogPostPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-background text-center px-6">
      <div>
        <h1 className="text-3xl font-display font-semibold mb-3">Artigo não encontrado</h1>
        <p className="text-muted-foreground mb-6">Talvez o feed tenha sido atualizado. Volte para o blog.</p>
        <Link to="/blog" className="text-primary hover:underline">
          ← Voltar ao blog
        </Link>
      </div>
    </div>
  ),
});

function BlogPostPage() {
  const [diagOpen, setDiagOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { post, related } = Route.useLoaderData();
  const hasMarkdown = Boolean(post.content && post.content.length > 0);

  const wordSource = (post.content || post.excerpt || "").replace(/[#*_>`\-]/g, " ");
  const words = wordSource.trim().split(/\s+/).filter(Boolean).length;
  const readingMinutes = Math.max(2, Math.round(words / 220));

  const shareUrl = `https://aceleriq.com.br/blog/${post.slug}`;
  const shareText = `${post.title} — via Aceleriq`;
  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
  };
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const keyPoints: string[] = (() => {
    if (!hasMarkdown) return [];
    const content: string = (post.content as string) || "";
    const headings = content
      .split("\n")
      .filter((l: string) => /^#{2,3}\s+/.test(l))
      .map((l: string) => l.replace(/^#{2,3}\s+/, "").trim())
      .filter((l: string) => l.length > 6 && l.length < 110)
      .slice(0, 3);
    if (headings.length >= 2) return headings;
    const sentences = content
      .replace(/[#*_>`]/g, "")
      .split(/(?<=[.!?])\s+/)
      .map((s: string) => s.trim())
      .filter((s: string) => s.length > 40 && s.length < 180)
      .slice(0, 3);
    return sentences;
  })();

  const fallbackBody = [
    `Esse movimento em ${post.category} importa porque indica uma mudança prática no jeito como empresas captam demanda, operam vendas e tomam decisões com dados. A notícia reforça que tecnologia só gera vantagem quando entra conectada ao funil, à oferta e à execução comercial.`,
    post.excerpt,
    `Na leitura da Aceleriq, o ponto central não é apenas acompanhar a tendência, mas transformar esse sinal de mercado em ação: revisar processos, automatizar etapas repetitivas, melhorar a mensuração e criar campanhas mais precisas para gerar receita previsível.`,
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <Header onDiagnostico={() => setDiagOpen(true)} />

      <article className="relative pt-24 md:pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(167,139,250,0.10),transparent_55%)]" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${post.image || categoryCover(post.category)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(36px) saturate(1.2)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/95 to-background" />
        <div className="container-aceleriq max-w-4xl relative z-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground hover:text-primary transition-colors mb-10"
          >
            <ArrowLeft className="h-3 w-3" /> Voltar ao feed
          </Link>

          <header>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {post.isLocal && (
                <span className="inline-flex items-center gap-1 border border-primary/40 bg-primary/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                  <Sparkles className="h-3 w-3" /> Original Aceleriq
                </span>
              )}
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">{post.category}</span>
              <span className="text-white/20">·</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{post.source}</span>
              <span className="text-white/20">·</span>
              <span className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono uppercase tracking-[0.2em]">
                <Clock className="h-3 w-3" />
                {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="text-white/20">·</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {readingMinutes} min de leitura
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-display font-semibold tracking-tight text-foreground leading-tight">
              {post.title}
            </h1>

            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">{post.excerpt}</p>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mr-1">
                <Share2 className="h-3 w-3" /> Compartilhar
              </span>
              <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Compartilhar no WhatsApp" className="inline-flex items-center justify-center h-8 w-8 border border-white/10 hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground">
                <MessageCircle className="h-3.5 w-3.5" />
              </a>
              <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Compartilhar no LinkedIn" className="inline-flex items-center justify-center h-8 w-8 border border-white/10 hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground">
                <Linkedin className="h-3.5 w-3.5" />
              </a>
              <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Compartilhar no X" className="inline-flex items-center justify-center h-8 w-8 border border-white/10 hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground">
                <Twitter className="h-3.5 w-3.5" />
              </a>
              <button type="button" onClick={handleCopy} aria-label="Copiar link" className="inline-flex items-center justify-center h-8 w-8 border border-white/10 hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground">
                {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Link2 className="h-3.5 w-3.5" />}
              </button>
            </div>
          </header>

          <div className="mt-10 border border-white/10 overflow-hidden aspect-[16/9] relative bg-black">
            <img
              src={post.image || categoryCover(post.category)}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {keyPoints.length > 0 && (
            <aside className="mt-10 border-l-2 border-primary/60 bg-white/[0.02] pl-5 pr-4 py-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-3">
                Pontos-chave
              </div>
              <ul className="space-y-2">
                {keyPoints.map((k, i) => (
                  <li key={i} className="flex gap-3 text-sm text-foreground/85 leading-relaxed">
                    <span className="font-mono text-[11px] text-primary/80 mt-0.5">0{i + 1}</span>
                    <span>{k}</span>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {hasMarkdown && (() => {
            const toc = extractToc(post.content as string);
            const counts = new Map<string, number>();
            const idFor = (text: string) => {
              let id = slugify(text);
              const n = (counts.get(id) ?? 0) + 1;
              counts.set(id, n);
              return n > 1 ? `${id}-${n}` : id;
            };
            const flatten = (children: React.ReactNode): string =>
              React.Children.toArray(children)
                .map((c) => (typeof c === "string" ? c : typeof c === "number" ? String(c) : (c as { props?: { children?: React.ReactNode } })?.props?.children ? flatten((c as { props: { children: React.ReactNode } }).props.children) : ""))
                .join("");

            // Internal-link auto-injector. Service pages first (high authority),
            // then related posts. State is shared across all paragraphs/lists
            // so we cap total links per article.
            const linkTargets = [
              ...SERVICE_LINK_TARGETS,
              ...buildPostLinkTargets(related.map((r: { slug: string; title: string }) => ({ slug: r.slug, title: r.title }))),
            ];
            const linker = createLinkerState(6);
            const InternalLink = ({ to, title, className, children }: { to: string; title?: string; className?: string; children: React.ReactNode }) => (
              <Link to={to} title={title} className={className}>
                {children}
              </Link>
            );
            const autolink = (children: React.ReactNode) =>
              injectInternalLinks(children, linkTargets, linker, InternalLink);

            return (
              <div className="relative mt-12">
                <TableOfContents items={toc} />
                <div className="article-prose scroll-mt-24">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h2: ({ children, ...props }) => (
                        <h2 id={idFor(flatten(children))} className="scroll-mt-24" {...props}>
                          {children}
                        </h2>
                      ),
                      h3: ({ children, ...props }) => (
                        <h3 id={idFor(flatten(children))} className="scroll-mt-24" {...props}>
                          {children}
                        </h3>
                      ),
                      p: ({ children, ...props }) => <p {...props}>{autolink(children)}</p>,
                      li: ({ children, ...props }) => <li {...props}>{autolink(children)}</li>,
                    }}
                  >
                    {post.content!}
                  </ReactMarkdown>
                </div>
              </div>
            );
          })()}
          {!hasMarkdown && (
            <div className="max-w-none mt-12 leading-relaxed space-y-6">
              {fallbackBody.map((p: string, i: number) => (
                <p
                  key={i}
                  className="text-base md:text-lg text-foreground/90"
                  style={{ color: "hsl(var(--foreground) / 0.9)" }}
                >
                  {p.trim()}
                </p>
              ))}
            </div>
          )}

          {/* Aceleriq angle */}
          <div className="mt-12 border border-primary/25 bg-primary/[0.04] p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-32 w-32 bg-primary/10 blur-3xl" />
            <div className="flex items-center gap-2 mb-3 relative">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">Leitura Aceleriq</span>
            </div>
            <p className="text-foreground/90 leading-relaxed relative">
              {post.isLocal
                ? "Estratégia, dados e IA precisam andar juntos. É exatamente isso que aplicamos no método A.C.E.L.E.R.A para transformar marketing em receita previsível."
                : "Tendências como esta mostram por que estratégia, dados e IA precisam andar juntos. Na Aceleriq aplicamos esse tipo de movimento dentro do método A.C.E.L.E.R.A para gerar receita previsível, não apenas tecnologia isolada."}
            </p>
          </div>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              Quero aplicar isso no meu negócio
            </a>
          </div>

          {!post.isLocal && (
            <p className="mt-6 text-xs text-muted-foreground">
              Fonte consultada: <a href={post.link} target="_blank" rel="noopener noreferrer nofollow" className="text-primary hover:underline">{post.source}</a>.
            </p>
          )}
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="pb-24">
          <div className="container-aceleriq max-w-5xl">
            <h2 className="text-2xl font-display font-semibold mb-6">Continue lendo</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((r: typeof related[number]) => (
                <Link
                  key={r.slug}
                  to="/blog/$slug"
                  params={{ slug: r.slug }}
                  className="group block border border-white/10 bg-white/[0.02] hover:border-primary/40 transition-colors p-5"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
                    {r.source}
                  </div>
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-3">
                    {r.title}
                  </h3>
                  <div className="mt-3 inline-flex items-center gap-1 text-[11px] text-primary opacity-70 group-hover:opacity-100 group-hover:gap-2 transition-all">
                    Ler análise <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <DiagnosticoModal open={diagOpen} onOpenChange={setDiagOpen} />
    </div>
  );
}
