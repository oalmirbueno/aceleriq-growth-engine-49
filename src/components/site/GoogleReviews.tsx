import { useEffect, useRef, useState } from "react";
import { Star, ExternalLink, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

const MAPS_EMBED = "https://www.google.com/maps?q=Aceleriq+Curitiba&output=embed";

// Link de avaliação do Google fornecido pelo cliente
export const GOOGLE_REVIEW_URL = "https://share.google/N6bMgKWg8aRB1t9m9";
// Quando tivermos o Place ID, trocar para o link direto:
// "https://search.google.com/local/writereview?placeid=XXXXXXXXX"

export type GoogleReview = {
  author: string;
  initials: string;
  rating: 5;
  date: string; // ex: "há 2 semanas"
  text: string;
  avatarColor?: string;
};

// ⚠️ PLACEHOLDER, substituir pelos textos REAIS dos reviews do Google Business
// (cliente vai enviar). Cada item: copie author + date + text exatamente como aparece
// no perfil. Manter apenas 5★. Quando a Google Places API for ativada, este array é
// substituído pela busca automática.
/** 
 * ⚠️ Somente avaliações REAIS do Google Meu Negócio.
 * A Aceleriq possui 8 avaliações verificadas (todas 5 estrelas).
 */
export const REVIEWS: GoogleReview[] = [
  // Listagem individual removida para focar no resumo verificado conforme solicitado, 
  // evitando placeholders até que o cliente forneça os textos exatos.
];

const AVERAGE = 5.0;
const COUNT = 8;

export function GoogleReviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[index] as HTMLElement | undefined;
    if (card) {
      el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
    }
  };

  const next = () => scrollTo(Math.min(activeIndex + 1, REVIEWS.length - 1));
  const prev = () => scrollTo(Math.max(activeIndex - 1, 0));

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const children = Array.from(el.children) as HTMLElement[];
      const center = el.scrollLeft + el.clientWidth / 2;
      let closest = 0;
      let min = Infinity;
      children.forEach((c, i) => {
        const cCenter = c.offsetLeft + c.clientWidth / 2;
        const dist = Math.abs(cCenter - center);
        if (dist < min) {
          min = dist;
          closest = i;
        }
      });
      setActiveIndex(closest);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="avaliacoes-google"
      className="border-t border-border/60 bg-gradient-to-b from-background to-background/40 py-24 md:py-32"
      aria-labelledby="reviews-heading"
    >
      <div className="container-aceleriq">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="label-eyebrow text-primary">Prova Social · Google</p>
            <h2
              id="reviews-heading"
              className="mt-4 text-4xl font-medium tracking-tight md:text-5xl"
            >
              O que dizem sobre a{" "}
              <span className="text-primary">Aceleriq</span> no Google
            </h2>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-mono text-lg font-semibold">
                {AVERAGE.toFixed(1)}
              </span>
              <span className="text-sm text-muted-foreground">
                · baseado em {COUNT} avaliações reais

              </span>
            </div>
          </div>

          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-6 py-3 text-sm font-medium text-primary transition-all hover:border-primary hover:bg-primary/20"
          >
            <Star className="h-4 w-4 fill-current" />
            Avalie-nos no Google
            <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-primary/20 bg-card/40 p-12 text-center backdrop-blur-sm">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
            <Star className="h-10 w-10 fill-primary" />
          </div>
          <div className="text-5xl font-bold text-white mb-2">{AVERAGE.toFixed(1)}</div>
          <p className="text-lg text-primary font-medium mb-4">{COUNT} avaliações verificadas no Google</p>
          <p className="max-w-md text-sm text-muted-foreground mb-8">
            Preferimos mostrar provas reais e verificáveis do que preencher o site com depoimentos genéricos.
          </p>
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-tech"
          >
            Ver avaliações no Google
          </a>
        </div>
          {/* Map + location card */}
          <div className="mt-16 grid gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4 flex flex-col justify-between rounded-2xl border border-border/60 bg-card/40 p-7">
              <div>
                <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                  <MapPin className="h-3.5 w-3.5" />
                  Curitiba · PR
                </span>
                <h3 className="mt-4 font-display text-2xl uppercase tracking-[-0.03em] leading-[1.1]">
                  Sede física,<br />
                  <span className="text-primary">atendimento nacional</span>
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Operação 100% remota para o Brasil inteiro, com base em Curitiba.
                  Perfil verificado no Google Business.
                </p>
              </div>
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noreferrer"
                className="group mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary"
              >
                Ver no Google
                <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
            <div className="lg:col-span-8 overflow-hidden rounded-2xl border border-border/60 bg-card/40">
              <iframe
                title="Aceleriq no Google Maps"
                src={MAPS_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[280px] w-full md:h-[340px]"
                style={{ border: 0, filter: "invert(0.92) hue-rotate(180deg) saturate(0.6)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
