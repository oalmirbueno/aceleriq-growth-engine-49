import React from "react";

export interface LinkTarget {
  /** Internal href, e.g. "/servicos/trafego-pago" or "/blog/foo". */
  href: string;
  /** Lowercase keywords to match. Order matters: more specific first. */
  keywords: string[];
  /** Optional title attribute for the anchor. */
  title?: string;
}

/** Service / pillar pages — high priority, always available. */
export const SERVICE_LINK_TARGETS: LinkTarget[] = [
  {
    href: "/servicos/trafego-pago",
    title: "Tráfego pago Aceleriq",
    keywords: [
      "tráfego pago",
      "trafego pago",
      "google ads",
      "meta ads",
      "facebook ads",
      "anúncios pagos",
      "mídia paga",
      "performance media",
    ],
  },
  {
    href: "/servicos/automacao-e-ia",
    title: "Automação e IA Aceleriq",
    keywords: [
      "automação de marketing",
      "automacao de marketing",
      "automação com ia",
      "agentes de ia",
      "inteligência artificial",
      "inteligencia artificial",
      "automação",
      "automacao",
    ],
  },
  {
    href: "/servicos/criacao-de-sites",
    title: "Criação de sites Aceleriq",
    keywords: [
      "criação de sites",
      "criacao de sites",
      "landing page",
      "landing pages",
      "site institucional",
      "desenvolvimento web",
    ],
  },
  {
    href: "/servicos/agencia-de-marketing-digital-curitiba",
    title: "Agência de marketing digital em Curitiba",
    keywords: [
      "agência de marketing digital em curitiba",
      "agência em curitiba",
      "marketing digital em curitiba",
      "agência de marketing digital",
      "agência de marketing",
    ],
  },
];

/** Landing-page key sections (Diagnóstico, Método, Sobre) — concentra autoridade nos hubs de conversão. */
export const LANDING_LINK_TARGETS: LinkTarget[] = [
  {
    href: "/#diagnostico",
    title: "Diagnóstico Aceleriq gratuito",
    keywords: [
      "diagnóstico gratuito",
      "diagnostico gratuito",
      "diagnóstico de marketing",
      "diagnostico de marketing",
      "diagnóstico estratégico",
      "diagnostico estrategico",
      "diagnóstico aceleriq",
      "diagnostico aceleriq",
    ],
  },
  {
    href: "/#metodo",
    title: "Método Aceleriq",
    keywords: [
      "método aceleriq",
      "metodo aceleriq",
      "método de aceleração",
      "metodo de aceleracao",
      "framework de crescimento",
      "framework comercial",
      "processo de aceleração",
      "processo de aceleracao",
    ],
  },
  {
    href: "/sobre-a-aceleriq",
    title: "Sobre a Aceleriq",
    keywords: [
      "sobre a aceleriq",
      "quem é a aceleriq",
      "quem e a aceleriq",
      "história da aceleriq",
      "historia da aceleriq",
      "agência aceleriq",
      "agencia aceleriq",
    ],
  },
];

/** Build keyword targets from related posts (title-based, conservative). */
export function buildPostLinkTargets(
  posts: { slug: string; title: string }[],
): LinkTarget[] {
  return posts.map((p) => {
    const clean = p.title
      .replace(/[—–|·:]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    // Use the first 5-7 word chunk of the title as the keyword phrase.
    const head = clean.split(" ").slice(0, 7).join(" ").toLowerCase();
    const alt = clean.split(" ").slice(0, 5).join(" ").toLowerCase();
    return {
      href: `/blog/${p.slug}`,
      title: p.title,
      keywords: Array.from(new Set([head, alt])).filter((k) => k.length > 14),
    };
  });
}

/**
 * Escape a string for use inside a RegExp.
 */
function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

interface State {
  /** Maximum auto-links per article (across all targets). */
  maxLinks: number;
  /** href -> count, so each target is used at most once. */
  used: Map<string, number>;
  /** Total injected so far. */
  total: number;
}

export function createLinkerState(maxLinks = 6): State {
  return { maxLinks, used: new Map(), total: 0 };
}

/**
 * Find the first keyword from any target inside `text` that hasn't been used
 * yet, respecting case-insensitive matching but preserving original casing.
 */
function findFirstMatch(
  text: string,
  targets: LinkTarget[],
  state: State,
): { start: number; end: number; target: LinkTarget } | null {
  let best: { start: number; end: number; target: LinkTarget } | null = null;
  for (const t of targets) {
    if (state.used.has(t.href)) continue;
    for (const kw of t.keywords) {
      const re = new RegExp(`\\b${escapeRegex(kw)}\\b`, "i");
      const m = re.exec(text);
      if (m && m.index >= 0) {
        if (!best || m.index < best.start) {
          best = { start: m.index, end: m.index + m[0].length, target: t };
        }
      }
    }
  }
  return best;
}

/**
 * Walk ReactMarkdown children and inject internal anchors into raw text nodes.
 * Skips nodes that are already inside an <a>, <code>, <pre>, or heading.
 */
export function injectInternalLinks(
  children: React.ReactNode,
  targets: LinkTarget[],
  state: State,
  LinkComponent: React.ComponentType<{
    to: string;
    title?: string;
    className?: string;
    children: React.ReactNode;
  }>,
): React.ReactNode {
  if (state.total >= state.maxLinks) return children;

  return React.Children.map(children, (child) => {
    if (state.total >= state.maxLinks) return child;

    if (typeof child === "string") {
      const out: React.ReactNode[] = [];
      let rest = child;
      let key = 0;
      while (rest && state.total < state.maxLinks) {
        const m = findFirstMatch(rest, targets, state);
        if (!m) break;
        if (m.start > 0) out.push(rest.slice(0, m.start));
        const matched = rest.slice(m.start, m.end);
        out.push(
          React.createElement(
            LinkComponent,
            {
              key: `il-${state.total}-${key++}`,
              to: m.target.href,
              title: m.target.title,
              className: "internal-link",
              children: matched,
            },
          ),
        );
        state.used.set(m.target.href, (state.used.get(m.target.href) ?? 0) + 1);
        state.total += 1;
        rest = rest.slice(m.end);
      }
      if (rest) out.push(rest);
      return out.length === 1 ? out[0] : out;
    }

    if (React.isValidElement(child)) {
      const type = child.type as unknown;
      const tag = typeof type === "string" ? type : "";
      // Don't rewrite inside anchors, code, or headings.
      if (
        tag === "a" ||
        tag === "code" ||
        tag === "pre" ||
        tag === "h1" ||
        tag === "h2" ||
        tag === "h3" ||
        tag === "h4"
      ) {
        return child;
      }
      const props = child.props as { children?: React.ReactNode };
      if (props?.children == null) return child;
      const newChildren = injectInternalLinks(
        props.children,
        targets,
        state,
        LinkComponent,
      );
      return React.cloneElement(child, undefined, newChildren);
    }

    return child;
  });
}
