import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { AdminShell, useAdmin } from "@/components/admin/AdminShell";
import {
  listTopicQueue,
  addTopic,
  deleteTopic,
  resetTopic,
  runTopicNow,
  type TopicQueueRow,
} from "@/lib/blog-topic-queue.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Loader2,
  Plus,
  Play,
  RotateCcw,
  Trash2,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
} from "lucide-react";

const CATEGORIES = [
  { value: "ia", label: "IA" },
  { value: "automacao", label: "Automação" },
  { value: "trafego", label: "Tráfego" },
  { value: "marketing", label: "Marketing" },
  { value: "vendas", label: "Vendas" },
  { value: "crescimento", label: "Crescimento" },
];

export const Route = createFileRoute("/admin/conteudo")({
  component: () => (
    <AdminShell>
      <ConteudoInner />
    </AdminShell>
  ),
});

function statusChip(s: TopicQueueRow["status"]) {
  const map = {
    pending: { label: "Na fila", icon: Clock, cls: "text-foreground/70 border-white/15" },
    generating: {
      label: "Gerando",
      icon: Loader2,
      cls: "text-primary border-primary/40 animate-pulse",
    },
    published: {
      label: "Publicado",
      icon: CheckCircle2,
      cls: "text-primary border-primary/40",
    },
    skipped: {
      label: "Pulado",
      icon: XCircle,
      cls: "text-muted-foreground border-white/10",
    },
    failed: {
      label: "Falhou",
      icon: AlertCircle,
      cls: "text-destructive border-destructive/50",
    },
  } as const;
  const m = map[s] ?? map.pending;
  const Icon = m.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] ${m.cls}`}
    >
      <Icon className={`h-3 w-3 ${s === "generating" ? "animate-spin" : ""}`} />
      {m.label}
    </span>
  );
}

function ConteudoInner() {
  const { password } = useAdmin();
  const qc = useQueryClient();
  const list = useServerFn(listTopicQueue);
  const add = useServerFn(addTopic);
  const del = useServerFn(deleteTopic);
  const reset = useServerFn(resetTopic);
  const run = useServerFn(runTopicNow);

  const { data, isLoading } = useQuery({
    queryKey: ["topic-queue"],
    queryFn: () => list({ data: { password } }),
  });

  const addMut = useMutation({
    mutationFn: (input: Parameters<typeof add>[0]["data"]) => add({ data: input }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["topic-queue"] });
      toast.success("Pauta adicionada à fila.");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Erro ao adicionar."),
  });

  const delMut = useMutation({
    mutationFn: (id: string) => del({ data: { password, id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["topic-queue"] }),
  });

  const resetMut = useMutation({
    mutationFn: (id: string) => reset({ data: { password, id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["topic-queue"] });
      toast.success("Pauta voltou para a fila.");
    },
  });

  const runMut = useMutation({
    mutationFn: (id?: string) => run({ data: { password, id } }),
    onSuccess: (r) => {
      qc.invalidateQueries({ queryKey: ["topic-queue"] });
      if (r.ok) {
        toast.success(`Publicado: ${r.title} (SEO ${r.seo_score}/100).`);
      } else {
        toast.error(r.reason ?? "Não foi possível gerar o post.");
      }
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Erro ao gerar."),
  });

  const grouped = useMemo(() => {
    const out: Record<TopicQueueRow["status"], TopicQueueRow[]> = {
      pending: [],
      generating: [],
      published: [],
      skipped: [],
      failed: [],
    };
    for (const r of data ?? []) out[r.status].push(r);
    return out;
  }, [data]);

  return (
    <div className="px-6 md:px-10 py-8 md:py-10 max-w-6xl">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-2">
            Conteúdo automatizado
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-semibold leading-tight">
            Fila editorial semanal
          </h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
            1 post original publicado toda terça-feira (09:00 UTC), gerado a partir
            da próxima pauta da fila. Use o botão abaixo para gerar agora ou
            adicionar novas pautas.
          </p>
        </div>
        <Button
          onClick={() => runMut.mutate(undefined)}
          disabled={runMut.isPending || (grouped.pending.length === 0 && !runMut.isPending)}
          className="gap-2"
        >
          {runMut.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          Gerar próximo agora
        </Button>
      </div>

      {/* Form de nova pauta */}
      <NewTopicForm
        onSubmit={(d) =>
          addMut.mutate({
            password,
            ...d,
          })
        }
        loading={addMut.isPending}
      />

      {/* Listagem */}
      <div className="mt-10 space-y-10">
        {isLoading && (
          <div className="text-sm text-muted-foreground">Carregando fila…</div>
        )}

        <Section
          title="Próximas na fila"
          count={grouped.pending.length}
          empty="Nenhuma pauta pendente. Adicione acima para alimentar o cron semanal."
          rows={grouped.pending}
          onRun={(id) => runMut.mutate(id)}
          onDelete={(id) => delMut.mutate(id)}
          runningId={runMut.isPending ? runMut.variables : undefined}
        />

        {grouped.generating.length > 0 && (
          <Section
            title="Em geração"
            count={grouped.generating.length}
            rows={grouped.generating}
            onRun={() => {}}
            onDelete={(id) => delMut.mutate(id)}
          />
        )}

        <Section
          title="Publicadas"
          count={grouped.published.length}
          empty="Ainda nenhum post automatizado publicado."
          rows={grouped.published}
          onRun={() => {}}
          onDelete={(id) => delMut.mutate(id)}
          showPostLink
        />

        {grouped.failed.length > 0 && (
          <Section
            title="Com erro"
            count={grouped.failed.length}
            rows={grouped.failed}
            onRun={(id) => runMut.mutate(id)}
            onDelete={(id) => delMut.mutate(id)}
            onReset={(id) => resetMut.mutate(id)}
            showError
          />
        )}
      </div>
    </div>
  );
}

function NewTopicForm({
  onSubmit,
  loading,
}: {
  onSubmit: (d: {
    title: string;
    focus_keyword: string;
    category: string;
    angle: string;
    priority: number;
  }) => void;
  loading: boolean;
}) {
  const [title, setTitle] = useState("");
  const [kw, setKw] = useState("");
  const [cat, setCat] = useState("ia");
  const [angle, setAngle] = useState("");
  const [priority, setPriority] = useState(100);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!title.trim() || !kw.trim()) {
          toast.error("Título e palavra-chave são obrigatórios.");
          return;
        }
        onSubmit({
          title: title.trim(),
          focus_keyword: kw.trim(),
          category: cat,
          angle: angle.trim(),
          priority,
        });
        setTitle("");
        setKw("");
        setAngle("");
        setPriority(100);
      }}
      className="mt-8 border border-white/10 bg-white/[0.02] p-5 md:p-6 space-y-4"
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
        Nova pauta
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground">Título / pauta</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex.: Como agentes de IA reduzem custo operacional em PME"
            maxLength={200}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground">Palavra-chave foco</label>
          <Input
            value={kw}
            onChange={(e) => setKw(e.target.value)}
            placeholder="agente de IA para empresas"
            maxLength={80}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground">Categoria</label>
          <Select value={cat} onValueChange={setCat}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground">
            Prioridade (menor = primeiro)
          </label>
          <Input
            type="number"
            min={1}
            max={1000}
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value) || 100)}
          />
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs text-muted-foreground">
            Ângulo editorial (opcional)
          </label>
          <Textarea
            value={angle}
            onChange={(e) => setAngle(e.target.value)}
            placeholder="Foque em PME do setor industrial em Curitiba. Cite caso prático de implantação em 30 dias."
            rows={3}
            maxLength={800}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={loading} className="gap-2">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          Adicionar à fila
        </Button>
      </div>
    </form>
  );
}

function Section({
  title,
  count,
  rows,
  empty,
  onRun,
  onDelete,
  onReset,
  runningId,
  showError,
  showPostLink,
}: {
  title: string;
  count: number;
  rows: TopicQueueRow[];
  empty?: string;
  onRun: (id: string) => void;
  onDelete: (id: string) => void;
  onReset?: (id: string) => void;
  runningId?: string;
  showError?: boolean;
  showPostLink?: boolean;
}) {
  return (
    <section>
      <div className="flex items-baseline gap-3 mb-4">
        <h2 className="text-lg font-display font-semibold">{title}</h2>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          {count}
        </span>
      </div>
      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">{empty}</p>
      ) : (
        <ul className="border border-white/10 divide-y divide-white/10">
          {rows.map((r) => (
            <li key={r.id} className="px-4 py-3 flex items-start gap-4 hover:bg-white/[0.02]">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  {statusChip(r.status)}
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {r.category}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    P{r.priority}
                  </span>
                  {r.attempts > 0 && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      tent. {r.attempts}
                    </span>
                  )}
                </div>
                <div className="mt-1.5 text-sm font-medium text-foreground truncate">
                  {r.title}
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground truncate">
                  KW: {r.focus_keyword}
                  {r.angle ? ` · ${r.angle}` : ""}
                </div>
                {showError && r.last_error && (
                  <div className="mt-2 text-xs text-destructive font-mono break-all">
                    {r.last_error.slice(0, 240)}
                  </div>
                )}
                {showPostLink && r.generated_post_id && (
                  <Link
                    to="/admin/posts/$id"
                    params={{ id: r.generated_post_id }}
                    className="mt-2 inline-block text-xs text-primary hover:underline"
                  >
                    Abrir post →
                  </Link>
                )}
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {(r.status === "pending" || r.status === "failed") && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onRun(r.id)}
                    disabled={runningId === r.id}
                    className="gap-1.5"
                  >
                    {runningId === r.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Play className="h-3.5 w-3.5" />
                    )}
                    Gerar
                  </Button>
                )}
                {onReset && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onReset(r.id)}
                    className="gap-1.5"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDelete(r.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
