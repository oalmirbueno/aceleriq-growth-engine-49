import almirPhoto from "@/assets/almir-real.png";

export type HumanBandProps = {
  image: string;
  eyebrow?: string;
  title: React.ReactNode;
  body: string;
  /** Show the Almir character peeking on the right */
  withAlmir?: boolean;
  /** Alignment of the text panel */
  align?: "left" | "right";
};

/**
 * Full-bleed cinematic band: humanized Brazilian office photo bleeding into
 * the page with a black gradient overlay, brand text on top, and (optional)
 * Almir peeking from the side to keep the character present across pages.
 */
export function HumanBand({
  image,
  eyebrow = "✦ Bastidores · Aceleriq",
  title,
  body,
  withAlmir = false,
  align = "left",
}: HumanBandProps) {
  return (
    <section className="relative overflow-hidden bg-black">
      {/* Photo bleeding full width */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt=""
          aria-hidden
          className="h-full w-full object-cover opacity-[0.55]"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              align === "left"
                ? "linear-gradient(90deg, oklch(6% 0 0) 0%, oklch(6% 0 0 / 0.85) 35%, oklch(6% 0 0 / 0.25) 70%, transparent 100%)"
                : "linear-gradient(270deg, oklch(6% 0 0) 0%, oklch(6% 0 0 / 0.85) 35%, oklch(6% 0 0 / 0.25) 70%, transparent 100%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-16 py-24 md:py-36">
        <div
          className={`grid gap-10 lg:grid-cols-12 ${
            align === "right" ? "lg:[direction:rtl]" : ""
          }`}
        >
          <div className="lg:col-span-6 lg:[direction:ltr]">
            {eyebrow && (
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[oklch(72%_0.19_145)]">
                {eyebrow}
              </div>
            )}
            <h2 className="mt-5 font-display text-3xl md:text-5xl lg:text-6xl uppercase leading-[1.02] tracking-[-0.035em] text-white">
              {title}
            </h2>
            <p className="mt-6 max-w-xl text-[14px] md:text-[15px] leading-[1.7] text-white/75 font-light">
              {body}
            </p>
          </div>

          {withAlmir && (
            <div className="hidden lg:block lg:col-span-6 lg:[direction:ltr] relative">
              <div
                aria-hidden
                className="absolute -bottom-24 right-0 h-[520px] w-[420px]"
                style={{
                  filter:
                    "drop-shadow(0 40px 40px oklch(0% 0 0 / 0.6)) drop-shadow(0 0 60px oklch(72% 0.19 145 / 0.25))",
                }}
              >
                <img
                  src={almirPhoto}
                  alt=""
                  className="h-full w-full object-contain object-bottom"
                  loading="lazy"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
