import { motion } from "framer-motion";
import { Cpu, Bot, BarChart3, Radio, Zap, Network, Sparkles, Target, TrendingUp, Database, GitBranch, Rocket } from "lucide-react";

/**
 * Ornamentos skeumórficos — chips, badges, knobs, ondas e ícones
 * que ambientam o site com referência a IA, tecnologia e marketing.
 * Todos posicionados absolutos, pointer-events:none, e baixa opacidade
 * para não competir com o conteúdo principal.
 */

// ─────────────────────────────────────────────────────────────
// Primitivos skeumórficos
// ─────────────────────────────────────────────────────────────

export function ChipBadge({
  label,
  icon: Icon,
  className = "",
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
}) {
  return (
    <div
      className={`liquid-chip pointer-events-none select-none inline-flex items-center gap-2 rounded-md px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/80 ${className}`}
    >
      <Icon className="h-3 w-3 text-primary drop-shadow-[0_0_4px_oklch(85%_0.2_145/0.6)]" />
      <span>{label}</span>
      <span className="h-1 w-1 rounded-full bg-primary shadow-[0_0_6px_currentColor] animate-pulse" />
    </div>
  );
}

export function ChipCard({
  label,
  className = "",
  rotate = 0,
}: {
  label: string;
  className?: string;
  rotate?: number;
}) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div
        className="relative h-16 w-16 rounded-lg border border-primary/25 bg-gradient-to-br from-[oklch(20%_0.02_145)] to-[oklch(12%_0.01_145)]"
        style={{
          boxShadow:
            "inset 0 1px 0 oklch(100% 0 0 / 0.08), inset 0 -1px 0 oklch(0% 0 0 / 0.5), 0 6px 18px -6px oklch(0% 0 0 / 0.6), 0 0 0 1px oklch(85% 0.2 145 / 0.12)",
        }}
      >
        {/* "Pinos" laterais */}
        <div className="absolute -left-1 top-2 bottom-2 flex flex-col justify-around">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="block h-0.5 w-1.5 rounded-sm bg-primary/40" />
          ))}
        </div>
        <div className="absolute -right-1 top-2 bottom-2 flex flex-col justify-around">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="block h-0.5 w-1.5 rounded-sm bg-primary/40" />
          ))}
        </div>
        {/* Núcleo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-[8px] tracking-[0.2em] text-primary/80">
            {label}
          </span>
        </div>
        {/* Reflexo de vidro */}
        <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-b from-white/5 via-transparent to-transparent" />
      </div>
    </div>
  );
}

export function NeonKnob({
  className = "",
  value = 0.7,
}: {
  className?: string;
  value?: number;
}) {
  const angle = -135 + value * 270;
  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <div
        className="relative h-14 w-14 rounded-full border border-primary/30 bg-gradient-to-br from-[oklch(22%_0.02_145)] to-[oklch(10%_0.01_145)]"
        style={{
          boxShadow:
            "inset 0 2px 4px oklch(100% 0 0 / 0.08), inset 0 -2px 4px oklch(0% 0 0 / 0.6), 0 6px 16px -4px oklch(0% 0 0 / 0.5)",
        }}
      >
        <div
          className="absolute left-1/2 top-1/2 h-1 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent to-primary shadow-[0_0_8px_oklch(85%_0.2_145/0.8)]"
          style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(35%)` }}
        />
        <div className="absolute inset-2 rounded-full border border-primary/15" />
      </div>
    </div>
  );
}

export function WaveformStrip({
  className = "",
  bars = 18,
}: {
  className?: string;
  bars?: number;
}) {
  return (
    <div
      className={`pointer-events-none select-none flex items-end gap-[3px] h-10 ${className}`}
    >
      {Array.from({ length: bars }).map((_, i) => (
        <motion.span
          key={i}
          className="block w-[3px] rounded-sm bg-gradient-to-t from-primary/30 to-primary"
          style={{ filter: "drop-shadow(0 0 4px oklch(85% 0.2 145 / 0.5))" }}
          animate={{
            height: ["20%", `${30 + (i % 5) * 14}%`, "25%"],
          }}
          transition={{
            duration: 1.4 + (i % 4) * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.06,
          }}
        />
      ))}
    </div>
  );
}

export function CircuitLine({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 60"
      className={`pointer-events-none select-none ${className}`}
      fill="none"
      stroke="currentColor"
    >
      <defs>
        <linearGradient id="circ-grad" x1="0" x2="1">
          <stop offset="0" stopColor="oklch(85% 0.2 145)" stopOpacity="0" />
          <stop offset="0.5" stopColor="oklch(85% 0.2 145)" stopOpacity="0.7" />
          <stop offset="1" stopColor="oklch(85% 0.2 145)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 30 H40 L55 15 H90 L105 30 H150 L165 45 H200 L215 30 H240"
        stroke="url(#circ-grad)"
        strokeWidth="1.2"
      />
      <circle cx="40" cy="30" r="2.5" fill="oklch(85% 0.2 145)" />
      <circle cx="90" cy="15" r="2" fill="oklch(85% 0.2 145)" opacity="0.7" />
      <circle cx="150" cy="30" r="2.5" fill="oklch(85% 0.2 145)" />
      <circle cx="200" cy="45" r="2" fill="oklch(85% 0.2 145)" opacity="0.7" />
    </svg>
  );
}

export function NodeGraph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 120"
      className={`pointer-events-none select-none ${className}`}
      fill="none"
    >
      <g stroke="oklch(85% 0.2 145)" strokeOpacity="0.4" strokeWidth="0.8">
        <line x1="30" y1="30" x2="80" y2="60" />
        <line x1="80" y1="60" x2="130" y2="30" />
        <line x1="80" y1="60" x2="50" y2="95" />
        <line x1="80" y1="60" x2="120" y2="95" />
        <line x1="30" y1="30" x2="130" y2="30" strokeDasharray="2 3" />
      </g>
      <g fill="oklch(85% 0.2 145)">
        <circle cx="30" cy="30" r="3" />
        <circle cx="130" cy="30" r="3" />
        <circle cx="80" cy="60" r="4.5" opacity="0.9" />
        <circle cx="50" cy="95" r="3" />
        <circle cx="120" cy="95" r="3" />
      </g>
      <g fill="oklch(85% 0.2 145)" opacity="0.25">
        <circle cx="80" cy="60" r="9" />
      </g>
    </svg>
  );
}

export function MiniChart({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none select-none rounded-lg border border-primary/20 bg-gradient-to-b from-card/85 to-background/70 p-2.5 backdrop-blur-sm ${className}`}
      style={{
        boxShadow:
          "inset 0 1px 0 oklch(100% 0 0 / 0.05), 0 8px 22px -10px oklch(85% 0.2 145 / 0.3)",
      }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-foreground/50">
          ROI · 90D
        </span>
        <span className="font-mono text-[9px] text-primary">+312%</span>
      </div>
      <svg viewBox="0 0 120 40" className="w-28 h-9">
        <defs>
          <linearGradient id="mc-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="oklch(85% 0.2 145)" stopOpacity="0.45" />
            <stop offset="1" stopColor="oklch(85% 0.2 145)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 32 L15 28 L30 30 L45 22 L60 24 L75 14 L90 16 L105 6 L120 8 L120 40 L0 40 Z"
          fill="url(#mc-fill)"
        />
        <path
          d="M0 32 L15 28 L30 30 L45 22 L60 24 L75 14 L90 16 L105 6 L120 8"
          fill="none"
          stroke="oklch(85% 0.2 145)"
          strokeWidth="1.4"
        />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Layouts pré-prontos por seção
// ─────────────────────────────────────────────────────────────

/** Camada de fundo para uma seção — ornamentos sutis nas bordas */
export function SectionAmbient({
  variant = "ai",
}: {
  variant?: "ai" | "marketing" | "data" | "tech";
}) {
  if (variant === "ai") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <ChipBadge
          label="AI · CORE"
          icon={Bot}
          className="absolute left-6 top-10 hidden md:inline-flex opacity-70"
        />
        <NodeGraph className="absolute right-4 top-12 w-40 opacity-50 hidden md:block" />
        <CircuitLine className="absolute left-0 bottom-8 w-72 opacity-40 hidden md:block text-primary" />
        <ChipCard
          label="GPU"
          rotate={-8}
          className="absolute right-10 bottom-10 opacity-60 hidden lg:block"
        />
      </div>
    );
  }
  if (variant === "marketing") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <ChipBadge
          label="ROAS · LIVE"
          icon={TrendingUp}
          className="absolute right-6 top-10 hidden md:inline-flex opacity-70"
        />
        <MiniChart className="absolute left-6 bottom-10 hidden md:block opacity-80" />
        <ChipBadge
          label="PIPELINE"
          icon={Target}
          className="absolute left-8 top-16 hidden lg:inline-flex opacity-60"
        />
        <WaveformStrip className="absolute right-10 bottom-12 opacity-50 hidden lg:flex" />
      </div>
    );
  }
  if (variant === "data") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <ChipBadge
          label="DATA · STREAM"
          icon={Database}
          className="absolute left-6 top-10 hidden md:inline-flex opacity-70"
        />
        <WaveformStrip className="absolute right-8 top-14 opacity-60 hidden md:flex" />
        <NeonKnob className="absolute left-10 bottom-10 opacity-60 hidden lg:block" />
        <CircuitLine className="absolute right-0 bottom-6 w-72 opacity-40 hidden md:block text-primary" />
      </div>
    );
  }
  // tech
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <ChipBadge
        label="SYS · ONLINE"
        icon={Cpu}
        className="absolute right-6 top-10 hidden md:inline-flex opacity-70"
      />
      <ChipCard
        label="MCU"
        rotate={6}
        className="absolute left-10 top-12 opacity-60 hidden lg:block"
      />
      <NodeGraph className="absolute right-6 bottom-8 w-36 opacity-45 hidden md:block" />
      <ChipBadge
        label="UPTIME 99.98%"
        icon={Radio}
        className="absolute left-6 bottom-10 hidden lg:inline-flex opacity-60"
      />
    </div>
  );
}

/** Faixa horizontal de "instrumentos" — para usar entre seções */
export function InstrumentBar() {
  return (
    <div className="container-aceleriq py-6">
      <div
        className="hairline relative flex items-center justify-between gap-6 rounded-2xl bg-gradient-to-b from-card/80 to-background/60 px-5 py-4 backdrop-blur-sm overflow-hidden"
        style={{
          boxShadow:
            "inset 0 1px 0 oklch(100% 0 0 / 0.04), 0 12px 40px -16px oklch(85% 0.2 145 / 0.25)",
        }}
      >
        <div className="flex items-center gap-3">
          <NeonKnob value={0.65} />
          <div className="hidden sm:block">
            <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-foreground/50">
              GROWTH · GAIN
            </div>
            <div className="font-mono text-sm text-primary">+0.65</div>
          </div>
        </div>
        <WaveformStrip className="flex-1 max-w-md" bars={28} />
        <div className="hidden md:flex items-center gap-3">
          <ChipBadge label="AI" icon={Sparkles} />
          <ChipBadge label="CRM" icon={Network} />
          <ChipBadge label="PAID" icon={Zap} />
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <ChipCard label="V2" rotate={-4} />
        </div>
      </div>
    </div>
  );
}

export const OrnamentIcons = {
  Cpu,
  Bot,
  BarChart3,
  Radio,
  Zap,
  Network,
  Sparkles,
  Target,
  TrendingUp,
  Database,
  GitBranch,
  Rocket,
};
