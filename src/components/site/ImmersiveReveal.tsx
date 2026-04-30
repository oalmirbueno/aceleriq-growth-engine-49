import { useEffect, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ImmersiveReveal — abertura cinematográfica do site.
 *
 * Padrão usado por sites premium (Apple, Linear, Aceternity):
 * 1. Tela preta cobre tudo
 * 2. Linha de luz horizontal "rasga" o preto
 * 3. Cortina abre verticalmente (clip-path) revelando o conteúdo
 * 4. Conteúdo entra com leve scale-down (de 1.05 → 1) e blur-to-focus
 *
 * Usado uma única vez por sessão (sessionStorage).
 */
export function ImmersiveReveal({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<"idle" | "scan" | "open" | "done">(
    "idle",
  );

  useEffect(() => {
    // Mostra apenas uma vez por sessão para não cansar visitas repetidas
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("aceleriq:reveal");
    if (seen) {
      setPhase("done");
      return;
    }
    sessionStorage.setItem("aceleriq:reveal", "1");

    // Trava scroll durante a animação
    const html = document.documentElement;
    html.style.overflow = "hidden";

    const t1 = setTimeout(() => setPhase("scan"), 80);
    const t2 = setTimeout(() => setPhase("open"), 750);
    const t3 = setTimeout(() => {
      setPhase("done");
      html.style.overflow = "";
    }, 1700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      html.style.overflow = "";
    };
  }, []);

  return (
    <>
      {/* Conteúdo: começa levemente ampliado e desfocado, foca conforme cortina abre */}
      <motion.div
        initial={false}
        animate={
          phase === "done" || phase === "open"
            ? { scale: 1, filter: "blur(0px)" }
            : { scale: 1.05, filter: "blur(8px)" }
        }
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "center 40%" }}
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {phase !== "done" && (
          <>
            {/* Cortina superior */}
            <motion.div
              key="curtain-top"
              className="fixed inset-x-0 top-0 z-[100] bg-background pointer-events-none"
              initial={{ height: "50vh" }}
              animate={{ height: phase === "open" ? "0vh" : "50vh" }}
              transition={{ duration: 0.95, ease: [0.85, 0, 0.15, 1] }}
            />
            {/* Cortina inferior */}
            <motion.div
              key="curtain-bottom"
              className="fixed inset-x-0 bottom-0 z-[100] bg-background pointer-events-none"
              initial={{ height: "50vh" }}
              animate={{ height: phase === "open" ? "0vh" : "50vh" }}
              transition={{ duration: 0.95, ease: [0.85, 0, 0.15, 1] }}
            />

            {/* Linha de luz horizontal — "rasga" o preto */}
            <motion.div
              key="scan-line"
              className="fixed left-0 right-0 top-1/2 z-[101] h-px pointer-events-none"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{
                opacity: phase === "scan" ? 1 : 0,
                scaleX: phase === "idle" ? 0 : 1,
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--primary), transparent)",
                boxShadow: "0 0 24px var(--primary), 0 0 48px var(--primary)",
              }}
            />

            {/* Marca técnica central — identidade durante o reveal */}
            <motion.div
              key="brand-mark"
              className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "scan" ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-col items-center gap-3">
                <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-primary">
                  ACELERIQ
                </span>
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground">
                  Inicializando protocolo…
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
