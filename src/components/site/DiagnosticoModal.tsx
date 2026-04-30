import { useState } from "react";
import { z } from "zod";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Check, MessageCircle, Loader2, Sparkles } from "lucide-react";
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

type Step = "captura" | "quiz" | "resultado";

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

export function DiagnosticoModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [step, setStep] = useState<Step>("captura");
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

  const reset = () => {
    setStep("captura");
    setCaptura({
      nome: "", whatsapp: "", empresa: "", site_instagram: "",
      faturamento_mensal: "100k_300k", principal_gargalo: "", interesse_principal: "vendas",
    });
    setAnswers({});
    setQuizIdx(0);
    setResultado(null);
    setSubmitting(false);
  };

  const handleClose = (v: boolean) => {
    if (!v) setTimeout(reset, 250);
    onOpenChange(v);
  };

  const validateAndNext = () => {
    const result = capturaSchema.safeParse(captura);
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Verifique os campos");
      return;
    }
    setStep("quiz");
  };

  const currentQuestion = QUIZ[quizIdx];
  const totalQuestions = QUIZ.length;
  const progressPct = Math.round(((quizIdx + 1) / totalQuestions) * 100);

  const answerAndAdvance = (value: number) => {
    const next = { ...answers, [currentQuestion.id]: value };
    setAnswers(next);
    if (quizIdx + 1 < totalQuestions) {
      setQuizIdx(quizIdx + 1);
    } else {
      finalizar(next);
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
      setStep("resultado");
    } catch (e) {
      console.error(e);
      toast.error("Não foi possível salvar. Tente novamente em instantes.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-xl max-h-[92vh] overflow-y-auto border-border bg-card p-0">
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

          {step === "captura" && (
            <CapturaStep
              data={captura}
              onChange={setCaptura}
              onSubmit={validateAndNext}
            />
          )}

          {step === "quiz" && currentQuestion && (
            <QuizStep
              idx={quizIdx}
              total={totalQuestions}
              progressPct={progressPct}
              question={currentQuestion}
              currentValue={answers[currentQuestion.id]}
              onAnswer={answerAndAdvance}
              onBack={() => quizIdx > 0 ? setQuizIdx(quizIdx - 1) : setStep("captura")}
              submitting={submitting}
            />
          )}

          {step === "resultado" && resultado && (
            <ResultadoStep
              captura={captura}
              {...resultado}
              onClose={() => handleClose(false)}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── STEP 1: CAPTURA ─────────────────────────────────
function CapturaStep({
  data, onChange, onSubmit,
}: {
  data: CapturaForm;
  onChange: (d: CapturaForm) => void;
  onSubmit: () => void;
}) {
  const set = <K extends keyof CapturaForm>(k: K, v: CapturaForm[K]) =>
    onChange({ ...data, [k]: v });

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
      className="p-6 md:p-8"
    >
      <span className="label-eyebrow flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
        Diagnóstico Gratuito · Etapa 1 de 2
      </span>
      <h2 className="mt-3 font-display text-2xl font-semibold leading-tight md:text-3xl">
        Vamos te conhecer antes do diagnóstico.
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Preencha para receber sua classificação e 3 recomendações personalizadas em ~3 minutos.
      </p>

      <div className="mt-6 grid gap-4">
        <Field label="Nome completo" required>
          <Input
            value={data.nome}
            onChange={(e) => set("nome", e.target.value)}
            placeholder="Seu nome"
            maxLength={120}
            required
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="WhatsApp" required>
            <Input
              value={data.whatsapp}
              onChange={(e) => set("whatsapp", e.target.value)}
              placeholder="(00) 00000-0000"
              maxLength={30}
              required
            />
          </Field>
          <Field label="Empresa" required>
            <Input
              value={data.empresa}
              onChange={(e) => set("empresa", e.target.value)}
              placeholder="Nome da empresa"
              maxLength={160}
              required
            />
          </Field>
        </div>

        <Field label="Site ou Instagram da empresa">
          <Input
            value={data.site_instagram ?? ""}
            onChange={(e) => set("site_instagram", e.target.value)}
            placeholder="empresa.com ou @empresa"
            maxLength={200}
          />
        </Field>

        <Field label="Faturamento mensal aproximado" required>
          <Select
            value={data.faturamento_mensal}
            onValueChange={(v) => set("faturamento_mensal", v as Faturamento)}
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {FATURAMENTO_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Interesse principal" required>
          <Select
            value={data.interesse_principal}
            onValueChange={(v) => set("interesse_principal", v as Interesse)}
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {INTERESSE_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Principal gargalo hoje" required>
          <Textarea
            value={data.principal_gargalo}
            onChange={(e) => set("principal_gargalo", e.target.value)}
            placeholder="Em uma frase: o que mais trava o crescimento da empresa hoje?"
            maxLength={500}
            rows={3}
            required
          />
        </Field>
      </div>

      <Button
        type="submit"
        size="lg"
        className="mt-6 w-full h-12 rounded-md bg-primary text-[14px] font-semibold text-primary-foreground btn-interactive"
      >
        Iniciar diagnóstico
        <ArrowRight className="h-4 w-4" />
      </Button>
      <p className="mt-3 text-center text-[11px] text-muted-foreground">
        Seus dados são tratados com sigilo · Sem spam · 100% gratuito
      </p>
    </form>
  );
}

function Field({
  label, required, children,
}: {
  label: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="mb-1.5 block text-[12px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
        {label}{required && <span className="text-primary"> *</span>}
      </Label>
      {children}
    </div>
  );
}

// ─── STEP 2: QUIZ ────────────────────────────────────
function QuizStep({
  idx, total, progressPct, question, currentValue, onAnswer, onBack, submitting,
}: {
  idx: number;
  total: number;
  progressPct: number;
  question: typeof QUIZ[number];
  currentValue: number | undefined;
  onAnswer: (v: number) => void;
  onBack: () => void;
  submitting: boolean;
}) {
  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between">
        <span className="label-eyebrow flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
          Etapa 2 de 2 · Pergunta {idx + 1} de {total}
        </span>
        <span className="text-mono text-[11px] text-primary">{progressPct}%</span>
      </div>

      <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <h3 className="mt-6 font-display text-xl font-semibold leading-snug md:text-2xl">
        {question.pergunta}
      </h3>

      <div className="mt-6 grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            disabled={submitting}
            onClick={() => onAnswer(n)}
            className={`aspect-square rounded-lg border text-mono text-base font-semibold transition-all
              ${currentValue === n
                ? "border-primary bg-primary/15 text-primary"
                : "border-border bg-background text-foreground/80 hover:border-primary/60 hover:bg-primary/[0.08] hover:text-primary"}
              disabled:opacity-50`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        <span>{question.hintMin}</span>
        <span>{question.hintMax}</span>
      </div>

      <div className="mt-6 flex items-center justify-between">
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

        {submitting && (
          <span className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Calculando seu diagnóstico...
          </span>
        )}
      </div>
    </div>
  );
}

// ─── STEP 3: RESULTADO ───────────────────────────────
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
    <div className="p-6 md:p-8">
      <span className="label-eyebrow flex items-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-primary" />
        Diagnóstico concluído
      </span>

      <h2 className="mt-3 font-display text-2xl font-semibold leading-tight md:text-3xl">
        Seu Score de Maturidade
      </h2>

      <div className="mt-5 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/[0.08] to-transparent p-6">
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
        <div className="mt-4 h-[4px] w-full overflow-hidden rounded-full bg-background">
          <div
            className="h-full bg-gradient-to-r from-primary/60 to-primary transition-all duration-700"
            style={{ width: `${score}%` }}
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
              className="flex items-start gap-3 rounded-xl border border-border bg-background/60 p-4"
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
