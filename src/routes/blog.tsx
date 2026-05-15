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
  head: () => ({
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
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Blog Aceleriq",
          url: PAGE_URL,
          description: PAGE_DESCRIPTION,
          publisher: { "@type": "Organization", name: "Aceleriq", url: "https://aceleriq.com.br" },
        }),
      },
    ],
  }),
  component: () => <Outlet />,
});
