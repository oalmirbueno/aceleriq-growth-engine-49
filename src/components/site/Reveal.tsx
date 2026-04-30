import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

/**
 * Reveal — efeito de entrada cinematográfico estilo Apple.
 * Combinação: fade + escala leve + sobe + blur que se dissolve.
 * Acionado por scroll (whileInView), apenas uma vez.
 *
 * Props:
 *  - delay: atraso em segundos
 *  - y: deslocamento inicial em px (default 28)
 *  - blur: usar blur (default true)
 *  - as: tag wrapper (default div)
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  blur = true,
  className,
  amount = 0.2,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  blur?: boolean;
  className?: string;
  amount?: number;
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y,
        scale: 0.985,
        filter: blur ? "blur(8px)" : "blur(0px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, amount, margin: "-80px 0px -80px 0px" }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1], // expo-out — curva Apple
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
