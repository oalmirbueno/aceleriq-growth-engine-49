import { createFileRoute, Outlet } from "@tanstack/react-router";
import { fetchBlogPosts, type BlogPost } from "@/lib/blog.functions";

const PAGE_TITLE = "Blog Aceleriq · IA, Automação, Tráfego e Crescimento";
const PAGE_DESCRIPTION =
  "Curadoria em tempo real sobre IA aplicada, automação, tráfego pago, vendas e crescimento, com a leitura estratégica da Aceleriq.";
const PAGE_URL = "https://aceleriq.com.br/blog";
const OG_IMAGE = "https://aceleriq.com.br/og-image.jpg";

export const Route = createFileRoute("/blog")({
  loader: async () => {
    try {
      return await fetchBlogPosts();
    } catch {
      return { posts: [] as BlogPost[] };
    }
  },
  head: ({ loaderData }) => {
    const posts = (loaderData?.posts ?? []).slice(0, 12);
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
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(blogJsonLd) },
        { type: "application/ld+json", children: JSON.stringify(itemListJsonLd) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd) },
      ],
    };
  },
  component: () => <Outlet />,
});
