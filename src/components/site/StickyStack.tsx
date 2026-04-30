import { Children, ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

/**
 * StickyStack — efeito "carta empilhada" cinematográfico.
 *
 * Cada filho fica sticky no topo ocupando 100vh.
 * Conforme o scroll avança, a próxima seção sobe POR CIMA cobrindo a anterior;
 * a anterior recua sutilmente (escala + blur + opacity) criando profundidade.
 * Sem cortes, sem espaços vazios.
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
    <div
      ref={containerRef}
      className="relative"
      // Cada filho consome 100vh + extra para suavizar a transição
      style={{ height: `${count * 130}vh` }}
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
  // Janela de "vida" deste item dentro do progresso total
  const start = index / total;
  const end = (index + 1) / total;
  const isLast = index === total - 1;

  // Transição começa em 55% da janela e termina em 95% (deixa "ar" para ler)
  const tStart = start + (end - start) * 0.55;
  const tEnd = start + (end - start) * 0.95;

  // Escala recua de 1 -> 0.88 (mais visível)
  const scale = useTransform(
    progress,
    [start, tStart, tEnd],
    isLast ? [1, 1, 1] : [1, 1, 0.88],
  );
  // Opacidade vai de 1 -> 0.3 para criar sensação de "indo para trás"
  const opacity = useTransform(
    progress,
    [start, tStart, tEnd],
    isLast ? [1, 1, 1] : [1, 1, 0.3],
  );
  // Leve deslocamento vertical para reforçar o "afundar"
  const y = useTransform(
    progress,
    [start, tStart, tEnd],
    isLast ? [0, 0, 0] : [0, 0, -60],
  );
  // Filtro de blur sutil — efeito profundidade
  const filter = useTransform(
    progress,
    [start, tStart, tEnd],
    isLast ? ["blur(0px)", "blur(0px)", "blur(0px)"] : ["blur(0px)", "blur(0px)", "blur(4px)"],
  );

  return (
    <div
      className="sticky top-0 h-screen w-full"
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        style={{ scale, opacity, y, filter }}
        className="h-full w-full bg-background flex flex-col justify-center will-change-transform"
      >
        {/* Linha-luz no topo da seção entrando, reforça a sobreposição */}
        {index > 0 && (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        )}
        {children}
      </motion.div>
    </div>
  );
}
