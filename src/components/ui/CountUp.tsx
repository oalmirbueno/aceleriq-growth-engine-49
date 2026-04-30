import { useEffect, useRef, useState } from "react";

type Props = {
  to: number;
  /** Decimal places */
  decimals?: number;
  /** Duration in ms */
  duration?: number;
  prefix?: string;
  suffix?: string;
  /** Class for the wrapper span */
  className?: string;
};

/**
 * Counts from 0 to `to` whenever the element scrolls into view.
 * Re-triggers each time it re-enters the viewport.
 */
export function CountUp({ to, decimals = 0, duration = 1600, prefix = "", suffix = "", className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let startTime = 0;

    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min(1, (ts - startTime) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(eased * to);
      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            cancelAnimationFrame(raf);
            startTime = 0;
            setVal(0);
            raf = requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}
