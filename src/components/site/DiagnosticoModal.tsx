import { useEffect, useState, useCallback } from "react";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MessageCircle,
  Loader2,
  Sparkles,
  CornerDownLeft,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  QUIZ,
  type QuizAnswers,
  type CapturaForm,
  type Faturamento,
  type Interesse,
  FATURAMENTO_OPTIONS,
  INTERESSE_OPTIONS,
  calcScore,
  classificar,
  recomendar,
  formatResumoWhatsapp,
} from "@/lib/diagnostico";
import { whatsappLink } from "@/lib/contact";

// ─────────────────────────────────────────────────────
// Typeform-style steps: each step = 1 question
// ─────────────────────────────────────────────────────
type CapturaKey =
  | "nome"
  | "whatsapp"
  | "empresa"
  | "site_instagram"
  | "faturamento_mensal"
  | "interesse_principal"
  | "principal_gargalo";

const CAPTURA_STEPS: {
  key: CapturaKey;
  pergunta: string;
  hint?: string;
  required: boolean;
  type: "text" | "tel" | "select" | "textarea";
  placeholder?: string;
  options?: { value: string; label: string }[];
}[] = [
  {
    key: "nome",
    pergunta: "Antes de começar, qual o seu nome?",
    hint: "Como você gostaria de ser chamado.",
    required: true,
    type: "text",
    placeholder: "Seu nome completo",
  },
  {
    key: "empresa",
    pergunta: "Qual o nome da sua empresa?",
    required: true,
    type: "text",
    placeholder: "Nome da empresa",
  },
  {
    key: "whatsapp",
    pergunta: "Qual o melhor WhatsApp para te enviar o resumo?",
    hint: "Você receberá seu diagnóstico por aqui também.",
    required: true,
    type: "tel",
    placeholder: "(00) 00000-0000",
  },
  {
    key: "site_instagram",
    pergunta: "Tem site ou Instagram da empresa?",
    hint: "Opcional · ajuda a contextualizar a análise.",
    required: false,
    type: "text",
    placeholder: "empresa.com.br ou @empresa",
  },
  {
    key: "faturamento_mensal",
    pergunta: "Qual o faturamento mensal aproximado da empresa hoje?",
    required: true,
    type: "select",
    options: FATURAMENTO_OPTIONS as unknown as { value: string; label: string }[],
  },
  {
    key: "interesse_principal",
    pergunta: "Qual a área que você mais quer destravar agora?",
    required: true,
    type: "select",
    options: INTERESSE_OPTIONS as unknown as { value: string; label: string }[],
  },
  {
    key: "principal_gargalo",
    pergunta: "Em uma frase, o que mais trava o crescimento hoje?",
    hint: "Seja honesto · quanto mais claro, melhor o diagnóstico.",
    required: true,
    type: "textarea",
    placeholder: "Ex: time comercial sem método, CAC subindo, dependência do dono...",
  },
];

const capturaSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(120),
  whatsapp: z
    .string()
    .trim()
    .min(8, "WhatsApp inválido")
    .max(30, "WhatsApp muito longo")
    .regex(/^[\d\s()+\-]+$/, "Use apenas números e ( ) + -"),
  empresa: z.string().trim().min(2, "Informe sua empresa").max(160),
  site_instagram: z.string().trim().max(200).optional().or(z.literal("")),
  faturamento_mensal: z.enum(["ate_100k", "100k_300k", "300k_1m", "1m_5m", "acima_5m"]),
  principal_gargalo: z.string().trim().min(5, "Conte um pouco mais").max(500),
  interesse_principal: z.enum([
    "marketing", "vendas", "crm", "ia", "dados", "automacao", "operacao",
  ]),
});

type Phase = "captura" | "quiz" | "resultado";

export function DiagnosticoModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [phase, setPhase] = useState<Phase>("captura");
  const [capturaIdx, setCapturaIdx] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [captura, setCaptura] = useState<CapturaForm>({
    nome: "",
    whatsapp: "",
    empresa: "",
    site_instagram: "",
    faturamento_mensal: "100k_300k",
    principal_gargalo: "",
    interesse_principal: "vendas",
  });
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [quizIdx, setQuizIdx] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [resultado, setResultado] = useState<{
    score: number;
    classificacao: string;
    classResumo: string;
    recomendacoes: string[];
  } | null>(null);

  const totalCaptura = CAPTURA_STEPS.length;
  const totalQuiz = QUIZ.length;
  const totalSteps = totalCaptura + totalQuiz;
  const currentGlobalStep =
    phase === "captura" ? capturaIdx + 1 : phase === "quiz" ? totalCaptura + quizIdx + 1 : totalSteps;
  const progressPct = Math.round((currentGlobalStep / totalSteps) * 100);

  const reset = useCallback(() => {
    setPhase("captura");
    setCapturaIdx(0);
    setDirection(1);
    setCaptura({
      nome: "", whatsapp: "", empresa: "", site_instagram: "",
      faturamento_mensal: "100k_300k", principal_gargalo: "", interesse_principal: "vendas",
    });
    setAnswers({});
    setQuizIdx(0);
    setResultado(null);
    setSubmitting(false);
  }, []);

  const handleClose = (v: boolean) => {
    if (!v) setTimeout(reset, 300);
    onOpenChange(v);
  };

  // ─── CAPTURA NAV ─────────────────────────────────
  const validateField = (key: CapturaKey): string | null => {
    const step = CAPTURA_STEPS.find((s) => s.key === key)!;
    const v = (captura[key] ?? "") as string;
    if (step.required && (!v || v.trim().length < 2)) {
      return "Esse campo é obrigatório.";
    }
    if (key === "whatsapp" && !/^[\d\s()+\-]{8,}$/.test(v.trim())) {
      return "WhatsApp inválido. Use apenas números e ( ) + -.";
    }
    if (key === "principal_gargalo" && v.trim().length < 5) {
      return "Conte um pouco mais para nós entendermos.";
    }
    return null;
  };

  const nextCaptura = () => {
    const cur = CAPTURA_STEPS[capturaIdx];
    const err = validateField(cur.key);
    if (err) {
      toast.error(err);
      return;
    }
    if (capturaIdx + 1 < totalCaptura) {
      setDirection(1);
      setCapturaIdx(capturaIdx + 1);
    } else {
      // final validation
      const result = capturaSchema.safeParse(captura);
      if (!result.success) {
        toast.error(result.error.issues[0]?.message ?? "Verifique os campos");
        return;
      }
      setDirection(1);
      setPhase("quiz");
    }
  };

  const backCaptura = () => {
    if (capturaIdx === 0) return;
    setDirection(-1);
    setCapturaIdx(capturaIdx - 1);
  };

  // ─── QUIZ NAV ────────────────────────────────────
  const currentQuestion = QUIZ[quizIdx];

  const answerAndAdvance = (value: number) => {
    const next = { ...answers, [currentQuestion.id]: value };
    setAnswers(next);
    if (quizIdx + 1 < totalQuiz) {
      setDirection(1);
      setTimeout(() => setQuizIdx(quizIdx + 1), 180);
    } else {
      finalizar(next);
    }
  };

  const backQuiz = () => {
    if (quizIdx === 0) {
      setDirection(-1);
      setPhase("captura");
      setCapturaIdx(totalCaptura - 1);
    } else {
      setDirection(-1);
      setQuizIdx(quizIdx - 1);
    }
  };

  const finalizar = async (finalAnswers: QuizAnswers) => {
    setSubmitting(true);
    try {
      const score = calcScore(finalAnswers);
      const cls = classificar(score);
      const recs = recomendar(finalAnswers, captura.interesse_principal);

      const { error } = await supabase.from("diagnostico_leads").insert({
        nome: captura.nome.trim(),
        whatsapp: captura.whatsapp.trim(),
        empresa: captura.empresa.trim(),
        site_instagram: captura.site_instagram?.trim() || null,
        faturamento_mensal: captura.faturamento_mensal,
        principal_gargalo: captura.principal_gargalo.trim(),
        interesse_principal: captura.interesse_principal,
        respostas: finalAnswers,
        score,
        classificacao: cls.label,
        recomendacoes: recs,
      });
      if (error) throw error;

      setResultado({
        score,
        classificacao: cls.label,
        classResumo: cls.resumo,
        recomendacoes: recs,
      });
      setDirection(1);
      setPhase("resultado");
    } catch (e) {
      console.error(e);
      toast.error("Não foi possível salvar. Tente novamente em instantes.");
    } finally {
      setSubmitting(false);
    }
  };

  // ─── KEYBOARD SHORTCUTS ──────────────────────────
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (phase === "quiz") {
        const num = parseInt(e.key, 10);
        if (num >= 1 && num <= 5 && !submitting) {
          e.preventDefault();
          answerAndAdvance(num);
        }
      }
      if (phase === "captura" && e.key === "Enter" && !e.shiftKey) {
        const cur = CAPTURA_STEPS[capturaIdx];
        if (cur.type !== "textarea") {
          e.preventDefault();
          nextCaptura();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, phase, capturaIdx, quizIdx, captura, answers, submitting]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-2xl border-primary/20 bg-card/95 p-0 backdrop-blur-2xl shadow-[0_30px_120px_-20px_oklch(0%_0_0/0.7)]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, oklch(var(--card-l, 14% 0.01 240) / 0.97) 0%, oklch(var(--card-l, 14% 0.01 240) / 0.93) 100%)",
        }}
      >
        <div className="relative overflow-hidden rounded-lg">
          {/* Top progress bar */}
          <div className="absolute inset-x-0 top-0 z-10 h-[3px] bg-border/40">
            <motion.div
              className="h-full bg-gradient-to-r from-primary/70 via-primary to-primary/70 shadow-[0_0_12px_oklch(85%_0.2_145/0.6)]"
              initial={false}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>

          {/* Glow accents */}
          <div className="pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full bg-primary/[0.08] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-primary/[0.05] blur-3xl" />

          <div className="relative min-h-[480px] md:min-h-[520px]">
            <AnimatePresence mode="wait" custom={direction}>
              {phase === "captura" && (
                <SlideWrap key={`cap-${capturaIdx}`} direction={direction}>
                  <CapturaSlide
                    step={CAPTURA_STEPS[capturaIdx]}
                    idx={capturaIdx}
                    total={totalCaptura}
                    value={(captura[CAPTURA_STEPS[capturaIdx].key] ?? "") as string}
                    onChange={(v) =>
                      setCaptura({ ...captura, [CAPTURA_STEPS[capturaIdx].key]: v })
                    }
                    onNext={nextCaptura}
                    onBack={backCaptura}
                    canBack={capturaIdx > 0}
                  />
                </SlideWrap>
              )}

              {phase === "quiz" && currentQuestion && (
                <SlideWrap key={`quiz-${quizIdx}`} direction={direction}>
                  <QuizSlide
                    idx={quizIdx}
                    total={totalQuiz}
                    question={currentQuestion}
                    currentValue={answers[currentQuestion.id]}
                    onAnswer={answerAndAdvance}
                    onBack={backQuiz}
                    submitting={submitting}
                  />
                </SlideWrap>
              )}

              {phase === "resultado" && resultado && (
                <SlideWrap key="result" direction={1}>
                  <ResultadoStep
                    captura={captura}
                    {...resultado}
                    onClose={() => handleClose(false)}
                  />
                </SlideWrap>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── SLIDE WRAPPER ──────────────────────────────────
function SlideWrap({
  children,
  direction,
}: {
  children: React.ReactNode;
  direction: 1 | -1;
}) {
  return (
    <motion.div
      custom={direction}
      initial={{ opacity: 0, y: direction === 1 ? 24 : -24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: direction === 1 ? -16 : 16 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0"
    >
      {children}
    </motion.div>
  );
}

// ─── CAPTURA SLIDE (1 question per screen) ──────────
function CapturaSlide({
  step,
  idx,
  total,
  value,
  onChange,
  onNext,
  onBack,
  canBack,
}: {
  step: typeof CAPTURA_STEPS[number];
  idx: number;
  total: number;
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
  canBack: boolean;
}) {
  return (
    <div className="flex h-full min-h-[480px] flex-col p-6 pt-10 md:p-10 md:pt-12">
      <div className="mb-5 flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.18em] text-primary">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-[10px] font-semibold">
          {idx + 1}
        </span>
        <span className="text-muted-foreground">de {total}</span>
        <span className="text-border">·</span>
        <span>Sobre você</span>
      </div>

      <h2 className="font-display text-2xl font-semibold leading-[1.15] tracking-tight text-foreground md:text-3xl">
        {step.pergunta}
        {step.required && <span className="ml-1 text-primary">*</span>}
      </h2>
      {step.hint && (
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground md:text-sm">
          {step.hint}
        </p>
      )}

      <div className="mt-6 flex-1">
        {step.type === "text" || step.type === "tel" ? (
          <Input
            autoFocus
            type={step.type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={step.placeholder}
            className="h-12 border-0 border-b border-border bg-transparent px-0 text-lg shadow-none focus-visible:border-primary focus-visible:ring-0 md:text-xl"
          />
        ) : step.type === "textarea" ? (
          <Textarea
            autoFocus
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={step.placeholder}
            rows={4}
            className="resize-none border-0 border-b border-border bg-transparent px-0 text-base shadow-none focus-visible:border-primary focus-visible:ring-0 md:text-lg"
          />
        ) : step.type === "select" && step.options ? (
          <div className="grid gap-2">
            {step.options.map((o) => {
              const active = value === o.value;
              return (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => {
                    onChange(o.value);
                    setTimeout(onNext, 180);
                  }}
                  className={`group flex items-center justify-between rounded-xl border px-5 py-3.5 text-left text-[14px] font-medium transition-all md:text-[15px] ${
                    active
                      ? "border-primary bg-primary/[0.12] text-primary shadow-[0_0_24px_-8px_oklch(85%_0.2_145/0.5)]"
                      : "border-border bg-background/40 text-foreground/90 hover:border-primary/50 hover:bg-primary/[0.05]"
                  }`}
                >
                  <span>{o.label}</span>
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-mono transition-all ${
                      active
                        ? "border-primary bg-primary text-background"
                        : "border-border text-muted-foreground group-hover:border-primary/50"
                    }`}
                  >
                    {active ? <Check className="h-3 w-3" strokeWidth={3} /> : ""}
                  </span>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onBack}
          disabled={!canBack}
          className="text-muted-foreground hover:text-foreground disabled:opacity-30"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar
        </Button>

        {step.type !== "select" && (
          <Button
            type="button"
            onClick={onNext}
            className="h-11 rounded-md bg-primary px-6 text-[13px] font-semibold text-primary-foreground btn-interactive"
          >
            {idx + 1 === total ? "Iniciar diagnóstico" : "Continuar"}
            <CornerDownLeft className="h-3.5 w-3.5 opacity-70" />
          </Button>
        )}
      </div>
    </div>
  );
}

// ─── QUIZ SLIDE ─────────────────────────────────────
function QuizSlide({
  idx,
  total,
  question,
  currentValue,
  onAnswer,
  onBack,
  submitting,
}: {
  idx: number;
  total: number;
  question: typeof QUIZ[number];
  currentValue: number | undefined;
  onAnswer: (v: number) => void;
  onBack: () => void;
  submitting: boolean;
}) {
  return (
    <div className="flex h-full min-h-[480px] flex-col p-6 pt-10 md:p-10 md:pt-12">
      <div className="mb-5 flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.18em] text-primary">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-[10px] font-semibold">
          {idx + 1}
        </span>
        <span className="text-muted-foreground">de {total}</span>
        <span className="text-border">·</span>
        <span>Diagnóstico de maturidade</span>
      </div>

      <h3 className="font-display text-xl font-semibold leading-[1.2] tracking-tight text-foreground md:text-[26px]">
        {question.pergunta}
      </h3>

      <div className="mt-8 grid grid-cols-5 gap-2 md:gap-3">
        {[1, 2, 3, 4, 5].map((n) => {
          const active = currentValue === n;
          return (
            <button
              key={n}
              type="button"
              disabled={submitting}
              onClick={() => onAnswer(n)}
              className={`relative aspect-square rounded-xl border text-mono text-lg font-semibold transition-all duration-200 md:text-xl ${
                active
                  ? "border-primary bg-primary/20 text-primary shadow-[0_0_24px_-4px_oklch(85%_0.2_145/0.6)] scale-[1.04]"
                  : "border-border bg-background/40 text-foreground/85 hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/[0.08] hover:text-primary"
              } disabled:opacity-50`}
            >
              {n}
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[8px] font-mono uppercase tracking-widest text-muted-foreground/60">
                {n}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        <span>{question.hintMin}</span>
        <span>{question.hintMax}</span>
      </div>

      <div className="mt-auto pt-8 flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onBack}
          disabled={submitting}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar
        </Button>

        <span className="hidden items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground md:flex">
          <kbd className="rounded border border-border bg-background/60 px-1.5 py-0.5 text-[9px]">1</kbd>
          <span>·</span>
          <kbd className="rounded border border-border bg-background/60 px-1.5 py-0.5 text-[9px]">5</kbd>
          <span className="ml-1">para responder</span>
        </span>

        {submitting && (
          <span className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Calculando...
          </span>
        )}
      </div>
    </div>
  );
}

// ─── RESULTADO ───────────────────────────────────────
function ResultadoStep({
  captura, score, classificacao, classResumo, recomendacoes, onClose,
}: {
  captura: CapturaForm;
  score: number;
  classificacao: string;
  classResumo: string;
  recomendacoes: string[];
  onClose: () => void;
}) {
  const msg = formatResumoWhatsapp({ captura, score, classificacao, recomendacoes });
  const link = whatsappLink(msg);

  return (
    <div className="max-h-[88vh] overflow-y-auto p-6 pt-10 md:p-10 md:pt-12">
      <span className="label-eyebrow flex items-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-primary" />
        Diagnóstico concluído
      </span>

      <h2 className="mt-3 font-display text-2xl font-semibold leading-tight md:text-3xl">
        Seu Score de Maturidade
      </h2>

      <div className="mt-5 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/[0.10] to-transparent p-6 backdrop-blur-sm">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-mono text-[11px] uppercase tracking-[0.18em] text-primary">
              Score
            </span>
            <div className="mt-1 text-mono text-5xl font-bold leading-none text-primary md:text-6xl">
              {score}
              <span className="text-2xl text-primary/50">/100</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Classificação
            </span>
            <div className="mt-1 font-display text-base font-semibold uppercase tracking-tight text-foreground md:text-lg">
              {classificacao}
            </div>
          </div>
        </div>
        <div className="mt-4 h-[5px] w-full overflow-hidden rounded-full bg-background/60">
          <motion.div
            className="h-full bg-gradient-to-r from-primary/60 to-primary"
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
        </div>
        <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
          {classResumo}
        </p>
      </div>

      <div className="mt-6">
        <span className="label-eyebrow">3 recomendações personalizadas</span>
        <ul className="mt-3 space-y-2.5">
          {recomendacoes.map((r, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl border border-border bg-background/60 p-4 backdrop-blur-sm"
            >
              <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-mono text-[11px] font-semibold text-primary">
                {i + 1}
              </span>
              <span className="text-[13px] leading-relaxed text-foreground/90">{r}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
        <Button
          asChild
          size="lg"
          className="h-12 flex-1 rounded-md bg-primary text-[13px] font-semibold text-primary-foreground btn-interactive"
        >
          <a href={link} target="_blank" rel="noreferrer">
            <MessageCircle className="h-4 w-4" />
            Enviar resumo no WhatsApp
          </a>
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={onClose}
          className="h-12 sm:flex-none rounded-md border-border bg-transparent text-[13px] font-semibold hover:bg-card"
        >
          <Check className="h-4 w-4 text-primary" />
          Concluir
        </Button>
      </div>

      <p className="mt-3 text-center text-[11px] text-muted-foreground">
        O time da Aceleriq retorna em até 1 dia útil.
      </p>
    </div>
  );
}
