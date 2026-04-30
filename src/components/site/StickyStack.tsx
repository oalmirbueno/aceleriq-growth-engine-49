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

  // Altura do container = N - 1 transições. NÃO adicionamos uma "tela extra"
  // no final, porque a última camada usa height:auto e seguiria grudada
  // gerando espaço vazio. Quando o scroll do container acaba, ela libera
  // naturalmente e o fluxo continua.
  const totalHeight = `${(count - 1) * 90}vh`;
  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: totalHeight }}
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

  // Janela de transição entre este item e o próximo.
  const outStart = (index + 0.55) / total;
  const outEnd = (index + 1) / total;
  // Para a ÚLTIMA camada, esticamos a entrada por TODO o resto do container,
  // assim ela termina de subir exatamente quando o sticky se solta — sem
  // espaço vazio onde ela ficaria parada.
  const inStart = isLast ? (index - 1) / total : (index - 0.45) / total;
  const inEnd = isLast ? 1 : index / total;

  // SAÍDA — recua sutilmente quando o próximo cobre.
  const scaleOut = useTransform(
    progress,
    [outStart, outEnd],
    isLast ? [1, 1] : [1, 0.94],
  );
  const opacityOut = useTransform(
    progress,
    [outStart, outEnd],
    isLast ? [1, 1] : [1, 0.55],
  );

  // ENTRADA — sobe de baixo.
  const yIn = useTransform(
    progress,
    [inStart, inEnd],
    isFirst ? ["0%", "0%"] : ["100%", "0%"],
  );

  return (
    <div
      className="sticky top-0 w-full overflow-hidden"
      style={{
        zIndex: index + 1,
        backgroundColor: "var(--background)",
        // Última camada não força h-screen — segue altura natural do conteúdo,
        // eliminando espaço vazio quando a seção é mais curta que a viewport.
        height: isLast ? "auto" : "100vh",
        minHeight: isLast ? "auto" : undefined,
      }}
    >
      <motion.div
        style={{
          y: yIn,
          scale: scaleOut,
          opacity: opacityOut,
          backgroundColor: "var(--background)",
        }}
        className={`w-full will-change-transform relative overflow-hidden ${
          isLast ? "" : "h-full flex flex-col justify-center"
        }`}
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
