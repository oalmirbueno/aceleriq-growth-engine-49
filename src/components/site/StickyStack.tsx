import { Children, ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

/**
 * StickyStack — efeito "carta empilhada":
 * Cada filho ocupa 100vh e fica sticky no topo.
 * Conforme o usuário rola, a próxima seção sobe POR CIMA da anterior,
 * que recua sutilmente (escala + leve blur/opacity) — sem cortes,
 * sem espaços vazios, transição cinematográfica.
 *
 * Uso:
 *   <StickyStack>
 *     <Pains />
 *     <About />
 *   </StickyStack>
 */
export function StickyStack({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  const count = items.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    // Altura total = N * 100vh. Cada filho é sticky -> stack natural.
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${count * 100}vh` }}
    >
      {items.map((child, i) => (
        <StickyLayer
          key={i}
          index={i}
          total={count}
          progress={scrollYProgress}
        >
          {child}
        </StickyLayer>
      ))}
    </div>
  );
}

function StickyLayer({
  children,
  index,
  total,
  progress,
}: {
  children: ReactNode;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Janela de transição deste item: [i/total, (i+1)/total]
  const start = index / total;
  const end = (index + 1) / total;
  const isLast = index === total - 1;

  // Recua o item enquanto o próximo sobe por cima (apenas se não for o último).
  // Escala 1 -> 0.94, opacidade 1 -> 0.55 nos últimos 40% da janela.
  const fadeStart = start + (end - start) * 0.6;
  const scale = useTransform(
    progress,
    [start, fadeStart, end],
    isLast ? [1, 1, 1] : [1, 1, 0.94],
  );
  const opacity = useTransform(
    progress,
    [start, fadeStart, end],
    isLast ? [1, 1, 1] : [1, 1, 0.55],
  );
  const y = useTransform(
    progress,
    [start, fadeStart, end],
    isLast ? [0, 0, 0] : [0, 0, -40],
  );

  return (
    <div
      className="sticky top-0 h-screen w-full overflow-hidden"
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        style={{ scale, opacity, y }}
        className="h-full w-full bg-background flex flex-col justify-center"
      >
        {children}
      </motion.div>
    </div>
  );
}
