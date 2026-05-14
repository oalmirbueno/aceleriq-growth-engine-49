import { MapPin, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const GMB_URL = "https://share.google/mKLNQdrqYDigKkFxo";
const MAPS_EMBED =
  "https://www.google.com/maps?q=Aceleriq+Curitiba&output=embed";

export function GoogleBusiness() {
  return (
    <section id="onde-estamos" className="relative py-16 md:py-24 bg-grid-ambient">
      <div className="container-aceleriq grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <span className="label-eyebrow inline-flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            Curitiba · PR
          </span>
          <h2 className="mt-3 font-display text-3xl font-medium leading-[1.1] tracking-[-0.03em] md:text-4xl">
            A Aceleriq <span className="text-primary neon-text-glow">no Google</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            Sede em Curitiba, atendimento 100% remoto para o Brasil. Veja nosso
            perfil verificado no Google e a avaliação dos clientes que já passaram
            pelo Método Acelera.
          </p>

          <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/[0.08] bg-card/40 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Star className="h-5 w-5 fill-primary" />
            </div>
            <div>
              <div className="font-display text-lg font-medium">5,0 / 5,0</div>
              <div className="text-[12px] text-muted-foreground">Avaliação no Google · clientes verificados</div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-md bg-primary px-7 text-[14px] font-semibold text-primary-foreground btn-interactive">
              <a href={GMB_URL} target="_blank" rel="noreferrer">
                Ver no Google
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-md border-border bg-transparent px-7 text-[14px] font-medium hover:bg-card">
              <a href={`${GMB_URL}`} target="_blank" rel="noreferrer">
                Avaliar a Aceleriq
              </a>
            </Button>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-card/40">
            <iframe
              title="Aceleriq no Google Maps"
              src={MAPS_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[360px] w-full md:h-[440px]"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
