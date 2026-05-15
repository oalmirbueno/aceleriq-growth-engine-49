import type { SeoCheckItem, SeoCheckReport } from "./blog-posts-types";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

interface CheckInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  seo_title: string | null;
  seo_description: string | null;
  focus_keyword: string | null;
}

export function runSeoChecklist(p: CheckInput): SeoCheckReport {
  const items: SeoCheckItem[] = [];
  const titleForSeo = (p.seo_title || p.title || "").trim();
  const descForSeo = (p.seo_description || p.excerpt || "").trim();
  const kw = (p.focus_keyword || "").trim().toLowerCase();
  const content = p.content || "";
  const contentLower = content.toLowerCase();
  const words = content.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // 1. Title length
  items.push({
    id: "title_len",
    label: "Título SEO entre 30 e 60 caracteres",
    pass: titleForSeo.length >= 30 && titleForSeo.length <= 60,
    detail: `${titleForSeo.length} caracteres`,
  });

  // 2. Description length
  items.push({
    id: "desc_len",
    label: "Meta description entre 120 e 160 caracteres",
    pass: descForSeo.length >= 120 && descForSeo.length <= 160,
    detail: `${descForSeo.length} caracteres`,
  });

  // 3. Focus keyword definida
  items.push({
    id: "kw_defined",
    label: "Focus keyword definida",
    pass: kw.length > 0,
    detail: kw ? `"${kw}"` : "Vazio",
  });

  // 4. Focus keyword no título
  items.push({
    id: "kw_in_title",
    label: "Focus keyword aparece no título",
    pass: kw.length > 0 && titleForSeo.toLowerCase().includes(kw),
    detail: kw ? "Verificado no título SEO" : "Sem keyword",
  });

  // 5. Focus keyword no slug
  items.push({
    id: "kw_in_slug",
    label: "Focus keyword aparece no slug",
    pass: kw.length > 0 && p.slug.includes(slugify(kw)),
    detail: p.slug || "Slug vazio",
  });

  // 6. Focus keyword nos primeiros 100 chars do conteúdo
  items.push({
    id: "kw_first_100",
    label: "Focus keyword nos primeiros 100 caracteres do conteúdo",
    pass: kw.length > 0 && contentLower.slice(0, 200).includes(kw),
    detail: "Indica relevância imediata para o tema",
  });

  // 7. Densidade da keyword 0.5–2.5%
  let density = 0;
  if (kw && wordCount > 0) {
    const matches = (contentLower.match(new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "g")) || [])
      .length;
    density = (matches / wordCount) * 100;
  }
  items.push({
    id: "kw_density",
    label: "Densidade da focus keyword entre 0,5% e 2,5%",
    pass: density >= 0.5 && density <= 2.5,
    detail: `${density.toFixed(2)}% (${wordCount} palavras)`,
  });

  // 8. Word count >= 600
  items.push({
    id: "word_count",
    label: "Mínimo de 600 palavras",
    pass: wordCount >= 600,
    detail: `${wordCount} palavras`,
  });

  // 9. Pelo menos 1 H2
  const h2Count = (content.match(/^##\s/gm) || []).length;
  items.push({
    id: "has_h2",
    label: "Pelo menos 1 subtítulo H2",
    pass: h2Count >= 1,
    detail: `${h2Count} H2 encontrados`,
  });

  // 10. Pelo menos 3 subtítulos no total (H2 ou H3)
  const h3Count = (content.match(/^###\s/gm) || []).length;
  items.push({
    id: "headings_3plus",
    label: "Pelo menos 3 subtítulos (H2 + H3)",
    pass: h2Count + h3Count >= 3,
    detail: `${h2Count + h3Count} subtítulos`,
  });

  // 11. Internal links: pelo menos 2 (markdown links começando com / e não //)
  const internalLinks = (content.match(/\[[^\]]+\]\((\/[^)\s]+)\)/g) || []).filter(
    (m) => !/\]\(\/\//.test(m),
  );
  items.push({
    id: "internal_links",
    label: "Pelo menos 2 links internos",
    pass: internalLinks.length >= 2,
    detail: `${internalLinks.length} link(s) interno(s) encontrado(s)`,
  });

  // 12. Cover image
  items.push({
    id: "cover",
    label: "Imagem de capa definida",
    pass: !!p.cover_image && p.cover_image.length > 0,
    detail: p.cover_image ? "OK" : "Vai usar a capa padrão da categoria",
  });

  const passes = items.filter((i) => i.pass).length;
  const total = items.length;
  const score = Math.round((passes / total) * 100);
  return { score, passes, total, items, canPublish: score >= 80 };
}

export { slugify };
