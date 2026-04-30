import { Children, ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

/**
 * StickyStack — efeito "carta empilhada" cinematográfico.
 *
 * Cada filho fica sticky no topo. A próxima seção SOBE de baixo
 * cobrindo a anterior. A anterior recua sutilmente (escala + blur + opacity).
 * Sem cortes, sem espaços vazios.
 *
 * Layout: total height = (count) * 100vh — cada item ocupa exatamente 1 tela
 * de scroll. A última seção NÃO ganha "scroll extra" para evitar espaço vazio
 * antes da próxima seção fora do stack.
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
      style={{ height: `${count * 90}vh` }}
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
  const isFirst = index === 0;
  const isLast = index === total - 1;

  // Janela de transição entre este item e o próximo
  // Cada item domina de (i/total) a ((i+1)/total)
  // A transição ocorre na fronteira: vamos de (i+0.6)/total a (i+1)/total
  const outStart = (index + 0.6) / total;
  const outEnd = (index + 1) / total;

  // ENTRADA: este item sobe de baixo na fronteira anterior
  const inStart = (index - 0.4) / total;
  const inEnd = index / total;

  // Animação de SAÍDA (este item recua quando o próximo cobre)
  const scaleOut = useTransform(
    progress,
    [outStart, outEnd],
    isLast ? [1, 1] : [1, 0.94],
  );
  const opacityOut = useTransform(
    progress,
    [outStart, outEnd],
    isLast ? [1, 1] : [1, 0.5],
  );

  // Animação de ENTRADA (este item sobe de baixo)
  const yIn = useTransform(
    progress,
    [inStart, inEnd],
    isFirst ? ["0%", "0%"] : ["100%", "0%"],
  );

  return (
    <div
      className="sticky top-0 h-screen w-full overflow-hidden"
      style={{ zIndex: index + 1, backgroundColor: "var(--background)" }}
    >
      <motion.div
        style={{
          y: yIn,
          scale: scaleOut,
          opacity: opacityOut,
          backgroundColor: "var(--background)",
        }}
        className="h-full w-full flex flex-col justify-center will-change-transform relative overflow-hidden"
      >
        {/* Linha-luz no topo da seção entrando */}
        {!isFirst && (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent z-10" />
        )}
        {children}
      </motion.div>
    </div>
  );
}
