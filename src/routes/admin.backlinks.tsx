import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  listBacklinks,
  createBacklink,
  updateBacklink,
  deleteBacklink,
  listGoals,
  upsertGoal,
  getBacklinkMetrics,
  verifyAdminPassword,
} from "@/lib/backlinks.functions";
import {
  ALL_PRIORITIES,
  ALL_STATUSES,
  ALL_TYPES,
  PIPELINE_STATUSES,
  PRIORITY_LABEL,
  STATUS_LABEL,
  TYPE_LABEL,
  type BacklinkPriority,
  type BacklinkStatus,
  type BacklinkTarget,
  type BacklinkType,
} from "@/lib/backlinks-types";
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
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Download, Plus, RefreshCcw, Trash2, ExternalLink, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/admin/backlinks")({
  component: AdminBacklinksPage,
  head: () => ({
    meta: [
      { title: "Backlinks · Admin Aceleriq" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

const PASSWORD_KEY = "aceleriq_admin_password";

function AdminBacklinksPage() {
  const [password, setPassword] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(PASSWORD_KEY);
    if (stored) setPassword(stored);
  }, []);

  if (!password) {
    return <PasswordGate onAuthenticated={(pwd) => {
      sessionStorage.setItem(PASSWORD_KEY, pwd);
      setPassword(pwd);
    }} />;
  }

  return <AdminDashboard password={password} onLogout={() => {
    sessionStorage.removeItem(PASSWORD_KEY);
    setPassword(null);
  }} />;
}

// ---------- Password gate ----------

function PasswordGate({ onAuthenticated }: { onAuthenticated: (pwd: string) => void }) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const verify = useServerFn(verifyAdminPassword);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await verify({ data: { password: value } });
      onAuthenticated(value);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao autenticar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <form onSubmit={submit} className="w-full max-w-sm space-y-6 border border-border/40 bg-card/40 backdrop-blur p-8 rounded-lg">
        <div className="space-y-2">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">Aceleriq Admin</p>
          <h1 className="text-2xl font-semibold">Acesso restrito</h1>
          <p className="text-sm text-muted-foreground">Insira a senha administrativa para acessar o pipeline de backlinks.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="pwd">Senha</Label>
          <Input
            id="pwd"
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Verificando…" : "Entrar"}
        </Button>
      </form>
    </div>
  );
}

// ---------- Dashboard ----------

function AdminDashboard({ password, onLogout }: { password: string; onLogout: () => void }) {
  const qc = useQueryClient();
  const list = useServerFn(listBacklinks);
  const metricsFn = useServerFn(getBacklinkMetrics);
  const goalsFn = useServerFn(listGoals);

  const targetsQ = useQuery({
    queryKey: ["backlinks"],
    queryFn: () => list({ data: { password } }),
  });
  const metricsQ = useQuery({
    queryKey: ["backlink-metrics"],
    queryFn: () => metricsFn({ data: { password } }),
  });
  const goalsQ = useQuery({
    queryKey: ["backlink-goals"],
    queryFn: () => goalsFn({ data: { password } }),
  });

  const [editing, setEditing] = useState<BacklinkTarget | "new" | null>(null);

  const refreshAll = () => {
    qc.invalidateQueries({ queryKey: ["backlinks"] });
    qc.invalidateQueries({ queryKey: ["backlink-metrics"] });
    qc.invalidateQueries({ queryKey: ["backlink-goals"] });
  };

  const exportCsv = () => {
    const targets = targetsQ.data ?? [];
    const headers = [
      "domain","domain_authority","type","status","priority","contact_name","contact_email",
      "contact_url","pitch_angle","target_blog_slug","proposed_anchor","published_url",
      "published_anchor","dofollow","value_estimated_brl","next_action_at","published_at","created_at","notes",
    ];
    const escape = (v: unknown) => {
      const s = v === null || v === undefined ? "" : String(v);
      return `"${s.replace(/"/g, '""')}"`;
    };
    const rows = targets.map((t) => headers.map((h) => escape((t as unknown as Record<string, unknown>)[h])).join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `backlinks-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border/40 bg-card/30 backdrop-blur">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Aceleriq Admin</p>
            <h1 className="text-2xl font-semibold mt-1">Backlinks</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={refreshAll}>
              <RefreshCcw className="w-3.5 h-3.5 mr-2" /> Atualizar
            </Button>
            <Button variant="outline" size="sm" onClick={exportCsv}>
              <Download className="w-3.5 h-3.5 mr-2" /> CSV
            </Button>
            <Button size="sm" onClick={() => setEditing("new")}>
              <Plus className="w-3.5 h-3.5 mr-2" /> Nova oportunidade
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout}>Sair</Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 space-y-8">
        <MetricsHeader metrics={metricsQ.data} loading={metricsQ.isLoading} />

        <Tabs defaultValue="pipeline">
          <TabsList>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="list">Lista</TabsTrigger>
            <TabsTrigger value="goals">Metas</TabsTrigger>
          </TabsList>

          <TabsContent value="pipeline" className="mt-6">
            <Kanban
              targets={targetsQ.data ?? []}
              loading={targetsQ.isLoading}
              onEdit={(t) => setEditing(t)}
              password={password}
            />
          </TabsContent>

          <TabsContent value="list" className="mt-6">
            <ListView
              targets={targetsQ.data ?? []}
              loading={targetsQ.isLoading}
              onEdit={(t) => setEditing(t)}
            />
          </TabsContent>

          <TabsContent value="goals" className="mt-6">
            <GoalsTab
              password={password}
              goals={goalsQ.data ?? []}
              metrics={metricsQ.data}
            />
          </TabsContent>
        </Tabs>
      </div>

      <Sheet open={editing !== null} onOpenChange={(o) => !o && setEditing(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{editing === "new" ? "Nova oportunidade" : "Editar oportunidade"}</SheetTitle>
          </SheetHeader>
          {editing && (
            <BacklinkForm
              password={password}
              initial={editing === "new" ? null : editing}
              onSaved={() => {
                setEditing(null);
                refreshAll();
              }}
              onDeleted={() => {
                setEditing(null);
                refreshAll();
              }}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

// ---------- Metrics ----------

function MetricsHeader({ metrics, loading }: { metrics: Awaited<ReturnType<typeof getBacklinkMetrics>> | undefined; loading: boolean }) {
  if (loading || !metrics) {
    return <div className="h-24 rounded-lg border border-border/40 bg-card/30 animate-pulse" />;
  }
  const goalProgress = metrics.monthGoalCount > 0
    ? Math.min(100, Math.round((metrics.monthPublishedCount / metrics.monthGoalCount) * 100))
    : 0;

  const cards = [
    {
      label: "Publicados / Meta (mês)",
      value: `${metrics.monthPublishedCount} / ${metrics.monthGoalCount || "—"}`,
      sub: metrics.monthGoalCount > 0 ? `${goalProgress}% da meta` : "Sem meta definida",
    },
    {
      label: "DA médio (mês)",
      value: metrics.monthAvgDa || "—",
      sub: metrics.monthGoalAvgDa > 0 ? `Alvo ≥ ${metrics.monthGoalAvgDa}` : "Sem alvo",
    },
    {
      label: "Pipeline ativo",
      value: metrics.pipelineActive,
      sub: "Contatado · Negociando · Aceito",
    },
    {
      label: "Vencidos",
      value: metrics.overdueCount,
      sub: "Próxima ação atrasada",
      warn: metrics.overdueCount > 0,
    },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {cards.map((c) => (
        <div key={c.label} className="border border-border/40 bg-card/30 backdrop-blur p-5 rounded-lg">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">{c.label}</p>
          <p className={`text-3xl font-semibold mt-2 ${c.warn ? "text-destructive" : ""}`}>{c.value}</p>
          <p className="text-xs text-muted-foreground mt-1">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}

// ---------- Kanban ----------

function Kanban({
  targets,
  loading,
  onEdit,
  password,
}: {
  targets: BacklinkTarget[];
  loading: boolean;
  onEdit: (t: BacklinkTarget) => void;
  password: string;
}) {
  const qc = useQueryClient();
  const update = useServerFn(updateBacklink);
  const moveMut = useMutation({
    mutationFn: (vars: { id: string; status: BacklinkStatus }) =>
      update({ data: { password, id: vars.id, patch: { status: vars.status } } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["backlinks"] });
      qc.invalidateQueries({ queryKey: ["backlink-metrics"] });
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Erro ao atualizar"),
  });

  if (loading) return <div className="h-64 rounded-lg border border-border/40 bg-card/30 animate-pulse" />;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {PIPELINE_STATUSES.map((status) => {
        const cards = targets.filter((t) => t.status === status);
        return (
          <div key={status} className="border border-border/40 bg-card/20 rounded-lg p-3 min-h-[200px]">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">{STATUS_LABEL[status]}</p>
              <span className="text-xs text-muted-foreground">{cards.length}</span>
            </div>
            <div className="space-y-2">
              {cards.map((t) => (
                <KanbanCard
                  key={t.id}
                  target={t}
                  onEdit={() => onEdit(t)}
                  onMove={(s) => moveMut.mutate({ id: t.id, status: s })}
                />
              ))}
              {cards.length === 0 && (
                <p className="text-xs text-muted-foreground/60 text-center py-6">vazio</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function KanbanCard({
  target,
  onEdit,
  onMove,
}: {
  target: BacklinkTarget;
  onEdit: () => void;
  onMove: (s: BacklinkStatus) => void;
}) {
  const overdue =
    target.next_action_at &&
    new Date(target.next_action_at) < new Date() &&
    !["publicado", "recusado", "arquivado"].includes(target.status);

  return (
    <div className="border border-border/40 bg-background/40 rounded p-3 group hover:border-primary/40 transition-colors">
      <button onClick={onEdit} className="w-full text-left">
        <p className="text-sm font-medium truncate">{target.domain}</p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <Badge variant="outline" className="text-[10px] py-0">{TYPE_LABEL[target.type]}</Badge>
          {target.domain_authority !== null && (
            <span className="text-[10px] font-mono text-muted-foreground">DA {target.domain_authority}</span>
          )}
          <PriorityDot priority={target.priority} />
          {overdue && <AlertTriangle className="w-3 h-3 text-destructive" />}
        </div>
        {target.pitch_angle && (
          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{target.pitch_angle}</p>
        )}
      </button>
      <Select value={target.status} onValueChange={(v) => onMove(v as BacklinkStatus)}>
        <SelectTrigger className="mt-2 h-7 text-[11px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {ALL_STATUSES.map((s) => (
            <SelectItem key={s} value={s} className="text-xs">
              {STATUS_LABEL[s]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function PriorityDot({ priority }: { priority: BacklinkPriority }) {
  const color =
    priority === "alta" ? "bg-destructive"
      : priority === "media" ? "bg-primary"
      : "bg-muted-foreground";
  return <span className={`inline-block w-1.5 h-1.5 rounded-full ${color}`} title={`Prioridade ${PRIORITY_LABEL[priority]}`} />;
}

// ---------- List ----------

function ListView({
  targets,
  loading,
  onEdit,
}: {
  targets: BacklinkTarget[];
  loading: boolean;
  onEdit: (t: BacklinkTarget) => void;
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<BacklinkStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<BacklinkType | "all">("all");

  const filtered = useMemo(() => {
    return targets.filter((t) => {
      if (statusFilter !== "all" && t.status !== statusFilter) return false;
      if (typeFilter !== "all" && t.type !== typeFilter) return false;
      if (search) {
        const s = search.toLowerCase();
        if (
          !t.domain.toLowerCase().includes(s) &&
          !(t.contact_name ?? "").toLowerCase().includes(s) &&
          !(t.pitch_angle ?? "").toLowerCase().includes(s)
        ) return false;
      }
      return true;
    });
  }, [targets, search, statusFilter, typeFilter]);

  if (loading) return <div className="h-64 rounded-lg border border-border/40 bg-card/30 animate-pulse" />;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Input placeholder="Buscar domínio, contato, pitch…" value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs" />
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos status</SelectItem>
            {ALL_STATUSES.map((s) => <SelectItem key={s} value={s}>{STATUS_LABEL[s]}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as typeof typeFilter)}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos tipos</SelectItem>
            {ALL_TYPES.map((t) => <SelectItem key={t} value={t}>{TYPE_LABEL[t]}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="border border-border/40 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-card/40 text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
            <tr>
              <th className="px-3 py-3 text-left">Domínio</th>
              <th className="px-3 py-3 text-left">Tipo</th>
              <th className="px-3 py-3 text-left">Status</th>
              <th className="px-3 py-3 text-left">DA</th>
              <th className="px-3 py-3 text-left">Próx. ação</th>
              <th className="px-3 py-3 text-left">Publicado</th>
              <th className="px-3 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="border-t border-border/30 hover:bg-card/20 cursor-pointer" onClick={() => onEdit(t)}>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <PriorityDot priority={t.priority} />
                    <span className="font-medium">{t.domain}</span>
                  </div>
                </td>
                <td className="px-3 py-3 text-muted-foreground">{TYPE_LABEL[t.type]}</td>
                <td className="px-3 py-3"><Badge variant="outline">{STATUS_LABEL[t.status]}</Badge></td>
                <td className="px-3 py-3 font-mono text-xs">{t.domain_authority ?? "—"}</td>
                <td className="px-3 py-3 text-xs text-muted-foreground">{t.next_action_at ? new Date(t.next_action_at).toLocaleDateString("pt-BR") : "—"}</td>
                <td className="px-3 py-3 text-xs text-muted-foreground">
                  {t.published_url ? (
                    <a href={t.published_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      Ver <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : "—"}
                </td>
                <td className="px-3 py-3" />
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="text-center text-muted-foreground py-12">Nenhuma oportunidade encontrada.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------- Form (sheet) ----------

function BacklinkForm({
  password,
  initial,
  onSaved,
  onDeleted,
}: {
  password: string;
  initial: BacklinkTarget | null;
  onSaved: () => void;
  onDeleted: () => void;
}) {
  const create = useServerFn(createBacklink);
  const update = useServerFn(updateBacklink);
  const remove = useServerFn(deleteBacklink);

  const [form, setForm] = useState({
    domain: initial?.domain ?? "",
    domain_authority: initial?.domain_authority ?? null as number | null,
    type: (initial?.type ?? "parceria") as BacklinkType,
    status: (initial?.status ?? "prospect") as BacklinkStatus,
    priority: (initial?.priority ?? "media") as BacklinkPriority,
    contact_name: initial?.contact_name ?? "",
    contact_email: initial?.contact_email ?? "",
    contact_url: initial?.contact_url ?? "",
    pitch_angle: initial?.pitch_angle ?? "",
    target_blog_slug: initial?.target_blog_slug ?? "",
    proposed_anchor: initial?.proposed_anchor ?? "",
    published_url: initial?.published_url ?? "",
    published_anchor: initial?.published_anchor ?? "",
    dofollow: initial?.dofollow ?? true,
    value_estimated_brl: initial?.value_estimated_brl ?? null as number | null,
    notes: initial?.notes ?? "",
    next_action_at: initial?.next_action_at ? initial.next_action_at.slice(0, 10) : "",
    published_at: initial?.published_at ? initial.published_at.slice(0, 10) : "",
  });
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    if (!form.domain.trim()) {
      toast.error("Domínio é obrigatório");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        domain: form.domain.trim(),
        domain_authority: form.domain_authority,
        type: form.type,
        status: form.status,
        priority: form.priority,
        contact_name: form.contact_name || null,
        contact_email: form.contact_email || null,
        contact_url: form.contact_url || null,
        pitch_angle: form.pitch_angle || null,
        target_blog_slug: form.target_blog_slug || null,
        proposed_anchor: form.proposed_anchor || null,
        published_url: form.published_url || null,
        published_anchor: form.published_anchor || null,
        dofollow: form.dofollow,
        value_estimated_brl: form.value_estimated_brl,
        notes: form.notes || null,
        next_action_at: form.next_action_at ? new Date(form.next_action_at).toISOString() : null,
        published_at: form.published_at ? new Date(form.published_at).toISOString() : null,
      };
      if (initial) {
        await update({ data: { password, id: initial.id, patch: payload } });
        toast.success("Atualizado");
      } else {
        await create({ data: { password, target: payload } });
        toast.success("Criado");
      }
      onSaved();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!initial) return;
    if (!confirm(`Excluir a oportunidade "${initial.domain}"? Essa ação não pode ser desfeita.`)) return;
    try {
      await remove({ data: { password, id: initial.id } });
      toast.success("Excluído");
      onDeleted();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao excluir");
    }
  };

  return (
    <div className="space-y-5 mt-6 pb-12">
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <Label>Domínio *</Label>
          <Input value={form.domain} onChange={(e) => setForm({ ...form, domain: e.target.value })} placeholder="exemplo.com.br" />
        </div>
        <div>
          <Label>Tipo</Label>
          <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as BacklinkType })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{ALL_TYPES.map((t) => <SelectItem key={t} value={t}>{TYPE_LABEL[t]}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <Label>Status</Label>
          <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as BacklinkStatus })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{ALL_STATUSES.map((s) => <SelectItem key={s} value={s}>{STATUS_LABEL[s]}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <Label>Prioridade</Label>
          <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v as BacklinkPriority })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{ALL_PRIORITIES.map((p) => <SelectItem key={p} value={p}>{PRIORITY_LABEL[p]}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <Label>Domain Authority (0–100)</Label>
          <Input
            type="number"
            min={0}
            max={100}
            value={form.domain_authority ?? ""}
            onChange={(e) => setForm({ ...form, domain_authority: e.target.value === "" ? null : Number(e.target.value) })}
          />
        </div>
        <div>
          <Label>Contato (nome)</Label>
          <Input value={form.contact_name} onChange={(e) => setForm({ ...form, contact_name: e.target.value })} />
        </div>
        <div>
          <Label>Contato (e-mail)</Label>
          <Input type="email" value={form.contact_email} onChange={(e) => setForm({ ...form, contact_email: e.target.value })} />
        </div>
        <div className="col-span-2">
          <Label>Contato (URL/LinkedIn)</Label>
          <Input value={form.contact_url} onChange={(e) => setForm({ ...form, contact_url: e.target.value })} />
        </div>
        <div className="col-span-2">
          <Label>Ângulo do pitch</Label>
          <Textarea rows={3} value={form.pitch_angle} onChange={(e) => setForm({ ...form, pitch_angle: e.target.value })} />
        </div>
        <div>
          <Label>Post-alvo (slug)</Label>
          <Input value={form.target_blog_slug} onChange={(e) => setForm({ ...form, target_blog_slug: e.target.value })} placeholder="meu-post" />
        </div>
        <div>
          <Label>Âncora proposta</Label>
          <Input value={form.proposed_anchor} onChange={(e) => setForm({ ...form, proposed_anchor: e.target.value })} />
        </div>
        <div className="col-span-2">
          <Label>URL publicada</Label>
          <Input value={form.published_url} onChange={(e) => setForm({ ...form, published_url: e.target.value })} placeholder="https://…" />
        </div>
        <div>
          <Label>Âncora publicada</Label>
          <Input value={form.published_anchor} onChange={(e) => setForm({ ...form, published_anchor: e.target.value })} />
        </div>
        <div className="flex items-end gap-3 pb-2">
          <Label className="flex items-center gap-2 cursor-pointer">
            <Switch checked={form.dofollow} onCheckedChange={(v) => setForm({ ...form, dofollow: v })} />
            Dofollow
          </Label>
        </div>
        <div>
          <Label>Próxima ação</Label>
          <Input type="date" value={form.next_action_at} onChange={(e) => setForm({ ...form, next_action_at: e.target.value })} />
        </div>
        <div>
          <Label>Data publicação</Label>
          <Input type="date" value={form.published_at} onChange={(e) => setForm({ ...form, published_at: e.target.value })} />
        </div>
        <div className="col-span-2">
          <Label>Valor estimado (BRL)</Label>
          <Input
            type="number"
            min={0}
            value={form.value_estimated_brl ?? ""}
            onChange={(e) => setForm({ ...form, value_estimated_brl: e.target.value === "" ? null : Number(e.target.value) })}
          />
        </div>
        <div className="col-span-2">
          <Label>Notas</Label>
          <Textarea rows={4} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border/40">
        {initial ? (
          <Button variant="ghost" size="sm" onClick={handleDelete} className="text-destructive hover:text-destructive">
            <Trash2 className="w-3.5 h-3.5 mr-2" /> Excluir
          </Button>
        ) : <span />}
        <Button onClick={submit} disabled={saving}>{saving ? "Salvando…" : "Salvar"}</Button>
      </div>
    </div>
  );
}

// ---------- Goals ----------

function GoalsTab({
  password,
  goals,
  metrics,
}: {
  password: string;
  goals: Awaited<ReturnType<typeof listGoals>>;
  metrics: Awaited<ReturnType<typeof getBacklinkMetrics>> | undefined;
}) {
  const qc = useQueryClient();
  const upsert = useServerFn(upsertGoal);
  const now = new Date();
  const monthKey = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}-01`;
  const current = goals.find((g) => g.month.slice(0, 10) === monthKey);

  const [form, setForm] = useState({
    target_count: current?.target_count ?? 0,
    target_avg_da: current?.target_avg_da ?? 0,
    notes: current?.notes ?? "",
  });

  useEffect(() => {
    setForm({
      target_count: current?.target_count ?? 0,
      target_avg_da: current?.target_avg_da ?? 0,
      notes: current?.notes ?? "",
    });
  }, [current?.target_count, current?.target_avg_da, current?.notes]);

  const save = async () => {
    try {
      await upsert({
        data: {
          password,
          month: monthKey,
          target_count: Number(form.target_count) || 0,
          target_avg_da: Number(form.target_avg_da) || 0,
          notes: form.notes || null,
        },
      });
      toast.success("Meta atualizada");
      qc.invalidateQueries({ queryKey: ["backlink-goals"] });
      qc.invalidateQueries({ queryKey: ["backlink-metrics"] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao salvar meta");
    }
  };

  const history = metrics?.monthlyHistory ?? [];
  const maxBar = Math.max(1, ...history.map((h) => Math.max(h.published, h.goal)));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="border border-border/40 bg-card/30 rounded-lg p-6 space-y-4">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Meta de {now.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}</p>
          <h2 className="text-xl font-semibold mt-1">Definir meta mensal</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Backlinks publicados</Label>
            <Input type="number" min={0} value={form.target_count} onChange={(e) => setForm({ ...form, target_count: Number(e.target.value) })} />
          </div>
          <div>
            <Label>DA médio mínimo</Label>
            <Input type="number" min={0} max={100} value={form.target_avg_da} onChange={(e) => setForm({ ...form, target_avg_da: Number(e.target.value) })} />
          </div>
          <div className="col-span-2">
            <Label>Notas</Label>
            <Textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>
        </div>
        <Button onClick={save}>Salvar meta</Button>
      </div>

      <div className="border border-border/40 bg-card/30 rounded-lg p-6">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Últimos 6 meses</p>
        <h2 className="text-xl font-semibold mt-1 mb-6">Publicados vs meta</h2>
        <div className="space-y-3">
          {history.map((h) => {
            const pubPct = (h.published / maxBar) * 100;
            const goalPct = (h.goal / maxBar) * 100;
            const monthLabel = new Date(h.month).toLocaleDateString("pt-BR", { month: "short", year: "2-digit" });
            return (
              <div key={h.month} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono uppercase text-muted-foreground">{monthLabel}</span>
                  <span className="text-muted-foreground">
                    <span className="text-foreground font-medium">{h.published}</span>
                    {h.goal > 0 && <span> / {h.goal}</span>}
                    {h.avgDa > 0 && <span className="ml-2">DA {h.avgDa}</span>}
                  </span>
                </div>
                <div className="relative h-2 bg-muted/30 rounded-full overflow-hidden">
                  {h.goal > 0 && (
                    <div className="absolute top-0 h-full border-r border-dashed border-muted-foreground/40" style={{ left: `${goalPct}%` }} />
                  )}
                  <div className="h-full bg-primary rounded-full" style={{ width: `${pubPct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
