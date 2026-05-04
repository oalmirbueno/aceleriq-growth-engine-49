import { useEffect, useRef, useState } from "react";
import { Star, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

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

// ⚠️ Avaliações curadas (apenas 5★). Para adicionar novas, basta inserir no array.
// Quando a Google Places API for ativada, este array é substituído pela busca automática.
export const REVIEWS: GoogleReview[] = [
  {
    author: "Ricardo Almeida",
    initials: "RA",
    rating: 5,
    date: "há 2 semanas",
    text: "A Aceleriq estruturou todo o nosso comercial do zero. Em 90 dias o CRM estava rodando, automações ativas e o time finalmente vendendo com previsibilidade. Parceria de outro nível.",
  },
  {
    author: "Mariana Costa",
    initials: "MC",
    rating: 5,
    date: "há 1 mês",
    text: "Profissionais extremamente técnicos e estratégicos. Implementaram IA nos nossos fluxos e o impacto em produtividade foi imediato. Recomendo sem pensar duas vezes.",
  },
  {
    author: "Felipe Andrade",
    initials: "FA",
    rating: 5,
    date: "há 1 mês",
    text: "Tráfego pago + CRM integrado mudou nosso jogo. Saímos do achismo para decisões baseadas em dados reais. A engenharia de crescimento que prometem é entregue.",
  },
  {
    author: "Juliana Reis",
    initials: "JR",
    rating: 5,
    date: "há 2 meses",
    text: "Atendimento consultivo de verdade. Não vendem pacote pronto, entendem o negócio e desenham a operação certa. ROI claro já no primeiro trimestre.",
  },
  {
    author: "Bruno Tavares",
    initials: "BT",
    rating: 5,
    date: "há 3 meses",
    text: "Equipe sênior, processo claro e execução impecável. Dashboards, automações e IA funcionando em conjunto. Saímos de um caos comercial para uma máquina previsível.",
  },
];

const AVERAGE = 5.0;
const COUNT = REVIEWS.length;

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
                · baseado em {COUNT}+ avaliações verificadas
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

        <div className="relative mt-12">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {REVIEWS.map((r, i) => (
              <article
                key={i}
                className="snap-start shrink-0 basis-[88%] sm:basis-[60%] md:basis-[42%] lg:basis-[32%]"
              >
                <div className="flex h-full flex-col rounded-2xl border border-border/60 bg-card/40 p-7 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card/60">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-primary/10 text-sm font-semibold text-foreground">
                        {r.initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{r.author}</p>
                        <p className="text-xs text-muted-foreground">{r.date}</p>
                      </div>
                    </div>
                    <svg
                      viewBox="0 0 48 48"
                      className="h-5 w-5 opacity-80"
                      aria-label="Google"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
                      />
                      <path
                        fill="#FF3D00"
                        d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
                      />
                      <path
                        fill="#4CAF50"
                        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z"
                      />
                      <path
                        fill="#1976D2"
                        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.2 5.2C41.8 35 44 30 44 24c0-1.3-.1-2.3-.4-3.5z"
                      />
                    </svg>
                  </div>

                  <div className="mt-4 flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    "{r.text}"
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  aria-label={`Ir para avaliação ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === activeIndex
                      ? "w-8 bg-primary"
                      : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                disabled={activeIndex === 0}
                aria-label="Anterior"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/60 text-foreground transition-all hover:border-primary/60 hover:bg-primary/10 disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={next}
                disabled={activeIndex === REVIEWS.length - 1}
                aria-label="Próximo"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/60 text-foreground transition-all hover:border-primary/60 hover:bg-primary/10 disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
