import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, MessageCircle, Sparkles } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { DiagnosticoModal } from "@/components/site/DiagnosticoModal";
import { fetchBlogPost } from "@/lib/blog.functions";
import { categoryCover } from "@/lib/blog-covers";
import { whatsappLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/contact";

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
      return { meta: [{ title: "Artigo · Blog Aceleriq" }] };
    }
    const title = `${post.title} · Aceleriq`;
    const desc = post.excerpt || `Leitura sobre ${post.category} no blog da Aceleriq.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        ...(post.image ? [{ property: "og:image", content: post.image }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        ...(post.image ? [{ name: "twitter:image", content: post.image }] : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: desc,
            image: post.image ? [post.image] : undefined,
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            mainEntityOfPage: url,
            author: { "@type": "Organization", name: post.author || "Aceleriq" },
            publisher: { "@type": "Organization", name: "Aceleriq", url: "https://aceleriq.com.br" },
            citation: post.isLocal ? undefined : post.link,
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
  const { post, related } = Route.useLoaderData();
  const internalBody = post.isLocal && post.content
    ? post.content.split(/\n\s*\n/)
    : [
        `Esse movimento em ${post.category} importa porque indica uma mudança prática no jeito como empresas captam demanda, operam vendas e tomam decisões com dados. A notícia reforça que tecnologia só gera vantagem quando entra conectada ao funil, à oferta e à execução comercial.`,
        post.excerpt,
        `Na leitura da Aceleriq, o ponto central não é apenas acompanhar a tendência, mas transformar esse sinal de mercado em ação: revisar processos, automatizar etapas repetitivas, melhorar a mensuração e criar campanhas mais precisas para gerar receita previsível.`,
      ].filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <Header onDiagnostico={() => setDiagOpen(true)} />

      <article className="relative pt-32 md:pt-40 pb-20 overflow-hidden">
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
        <div className="container-aceleriq max-w-4xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground hover:text-primary transition-colors mb-10"
          >
            <ArrowLeft className="h-3 w-3" /> Voltar ao feed
          </Link>

          <motion.header
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
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
            </div>

            <h1 className="text-3xl md:text-5xl font-display font-semibold tracking-tight text-foreground leading-tight">
              {post.title}
            </h1>

            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">{post.excerpt}</p>
          </motion.header>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-10 border border-white/10 overflow-hidden aspect-[16/9] relative bg-black"
          >
            <img
              src={post.image || categoryCover(post.category)}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>

          <div className="prose prose-invert prose-lg max-w-none mt-12 text-foreground/90 leading-relaxed">
            {internalBody.map((p: string, i: number) => (
              <p key={i} className="mb-6 text-base md:text-lg">
                {p.trim()}
              </p>
            ))}
          </div>

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
