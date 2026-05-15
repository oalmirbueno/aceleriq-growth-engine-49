import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { useAdmin } from "@/components/admin/AdminShell";
import { checkUrlsIndexation, type UrlIndexCheck } from "@/lib/index-check.functions";
import {
  getIndexationOverview,
  triggerIndexationCheck,
  type IndexationAlert,
} from "@/lib/indexation-alerts.functions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  XCircle,
  AlertCircle,
  AlertTriangle,
  ImageIcon,
  Bell,
} from "lucide-react";

export const Route = createFileRoute("/admin/indexacao")({
  head: () => ({ meta: [{ title: "Indexação · Admin · Aceleriq" }] }),
  component: IndexCheckPage,
});

function verdictTone(v?: string): "ok" | "warn" | "bad" | "muted" {
  if (!v) return "muted";
  if (v === "PASS") return "ok";
  if (v === "PARTIAL" || v === "NEUTRAL") return "warn";
  return "bad";
}

function StatusPill({
  tone,
  label,
}: {
  tone: "ok" | "warn" | "bad" | "muted";
  label: string;
}) {
  const cls =
    tone === "ok"
      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
      : tone === "warn"
        ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
        : tone === "bad"
          ? "bg-red-500/10 text-red-400 border-red-500/30"
          : "bg-white/5 text-muted-foreground border-white/10";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider border ${cls}`}
    >
      {label}
    </span>
  );
}

function ResultCard({ r }: { r: UrlIndexCheck }) {
  const g = r.google;
  const b = r.bing;
  const p = r.preview;

  const googleTone = g.available ? verdictTone(g.verdict) : "muted";
  const googleLabel = !g.available
    ? "Indisponível"
    : g.verdict === "PASS"
      ? "Indexada"
      : g.verdict ?? "?";

  const bingTone =
    b.indexed === true ? "ok" : b.indexed === false ? "bad" : "muted";
  const bingLabel =
    b.indexed === true ? "Indexada" : b.indexed === false ? "Fora do índice" : "?";

  const canonicalTone =
    p.canonicalMatchesUrl === true
      ? "ok"
      : p.canonicalMatchesUrl === false
        ? "warn"
        : "muted";

  return (
    <div className="border border-white/10 bg-white/[0.02] p-4 md:p-5">
      <div className="flex items-start gap-4">
        {/* Preview thumbnail */}
        <div className="hidden md:flex h-20 w-32 flex-shrink-0 border border-white/10 bg-white/[0.02] items-center justify-center overflow-hidden">
          {p.ogImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.ogImage} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImageIcon className="h-5 w-5 text-muted-foreground/40" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <a
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-mono text-primary hover:underline truncate inline-flex items-center gap-1"
            >
              {r.url.replace(/^https?:\/\//, "")}
              <ExternalLink className="h-3 w-3" />
            </a>
            {p.status && p.status !== 200 && (
              <Badge variant="destructive" className="text-[10px]">
                HTTP {p.status}
              </Badge>
            )}
          </div>

          <h3 className="font-display text-base font-semibold mb-1 line-clamp-1">
            {p.title ?? "(sem title)"}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
            {p.description ?? "(sem meta description)"}
          </p>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              Google
            </span>
            <StatusPill tone={googleTone} label={googleLabel} />
            {g.coverageState && (
              <span className="text-[10px] text-muted-foreground">
                {g.coverageState}
              </span>
            )}

            <span className="ml-3 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              Bing
            </span>
            <StatusPill tone={bingTone} label={bingLabel} />

            <span className="ml-3 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              Canonical
            </span>
            <StatusPill
              tone={canonicalTone}
              label={
                p.canonicalMatchesUrl === true
                  ? "OK"
                  : p.canonicalMatchesUrl === false
                    ? "Diverge"
                    : "Ausente"
              }
            />
          </div>

          {/* Detalhes técnicos */}
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-[11px]">
            {p.canonical && (
              <div className="flex gap-2">
                <dt className="text-muted-foreground">Canonical (HTML):</dt>
                <dd className="font-mono truncate">{p.canonical}</dd>
              </div>
            )}
            {g.googleCanonical && (
              <div className="flex gap-2">
                <dt className="text-muted-foreground">Canonical (Google):</dt>
                <dd className="font-mono truncate">{g.googleCanonical}</dd>
              </div>
            )}
            {g.lastCrawlTime && (
              <div className="flex gap-2">
                <dt className="text-muted-foreground">Último crawl:</dt>
                <dd>{new Date(g.lastCrawlTime).toLocaleString("pt-BR")}</dd>
              </div>
            )}
            {g.robotsTxtState && (
              <div className="flex gap-2">
                <dt className="text-muted-foreground">Robots.txt:</dt>
                <dd>{g.robotsTxtState}</dd>
              </div>
            )}
            {p.robots && (
              <div className="flex gap-2">
                <dt className="text-muted-foreground">Meta robots:</dt>
                <dd className="font-mono">{p.robots}</dd>
              </div>
            )}
            {g.error && (
              <div className="flex gap-2 md:col-span-2 text-amber-400">
                <AlertCircle className="h-3 w-3 mt-0.5" />
                <span>Google: {g.error}</span>
              </div>
            )}
            {b.error && (
              <div className="flex gap-2 md:col-span-2 text-amber-400">
                <AlertCircle className="h-3 w-3 mt-0.5" />
                <span>Bing: {b.error}</span>
              </div>
            )}
          </dl>

          {g.inspectionUrl && (
            <a
              href={g.inspectionUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
            >
              Abrir no Search Console <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function IndexCheckPage() {
  const { password } = useAdmin();
  const check = useServerFn(checkUrlsIndexation);
  const overviewFn = useServerFn(getIndexationOverview);
  const triggerFn = useServerFn(triggerIndexationCheck);
  const [customUrls, setCustomUrls] = useState("");

  const overview = useQuery({
    queryKey: ["indexation-overview"],
    queryFn: () => overviewFn({ data: { password } }),
    refetchOnWindowFocus: false,
  });

  const triggerMut = useMutation({
    mutationFn: () => triggerFn({ data: { password } }),
    onSuccess: () => overview.refetch(),
  });

  const mut = useMutation({
    mutationFn: async (urls?: string[]) => check({ data: { password, urls } }),
  });

  // Auto-roda na primeira carga (URLs default = 10 últimos posts)
  useEffect(() => {
    if (!mut.data && !mut.isPending) mut.mutate(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const summary = mut.data?.results.reduce(
    (acc, r) => {
      if (r.google.verdict === "PASS") acc.gIndexed += 1;
      else if (r.google.available) acc.gIssues += 1;
      if (r.bing.indexed === true) acc.bIndexed += 1;
      else if (r.bing.indexed === false) acc.bMissing += 1;
      if (r.preview.canonicalMatchesUrl === false) acc.canonicalIssues += 1;
      return acc;
    },
    { gIndexed: 0, gIssues: 0, bIndexed: 0, bMissing: 0, canonicalIssues: 0 },
  );

  function runCustom() {
    const urls = customUrls
      .split(/\s+/)
      .map((s) => s.trim())
      .filter((s) => /^https?:\/\//.test(s));
    mut.mutate(urls.length ? urls : undefined);
  }

  return (
    <div className="px-4 md:px-8 py-8 max-w-6xl">
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-1">
            Verificação · Google + Bing
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-semibold">
            Indexação & previews
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Status de indexação, canonical e preview social das suas URLs do blog.
          </p>
        </div>
        <Button
          onClick={() => mut.mutate(undefined)}
          disabled={mut.isPending}
          variant="outline"
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${mut.isPending ? "animate-spin" : ""}`}
          />
          {mut.isPending ? "Verificando..." : "Recarregar 10 últimas"}
        </Button>
      </div>

      {/* Painel de monitoramento contínuo (cron diário) */}
      <IndexationMonitorPanel
        data={overview.data}
        isLoading={overview.isLoading}
        error={overview.error instanceof Error ? overview.error.message : null}
        onRefresh={() => overview.refetch()}
        onRunNow={() => triggerMut.mutate()}
        runningNow={triggerMut.isPending}
      />


      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <Stat label="Google indexadas" value={summary.gIndexed} tone="ok" />
          <Stat label="Google c/ problema" value={summary.gIssues} tone="warn" />
          <Stat label="Bing indexadas" value={summary.bIndexed} tone="ok" />
          <Stat label="Bing fora" value={summary.bMissing} tone="bad" />
          <Stat
            label="Canonical divergente"
            value={summary.canonicalIssues}
            tone="warn"
          />
        </div>
      )}

      {/* Custom URLs */}
      <div className="border border-white/10 bg-white/[0.02] p-4 mb-6">
        <label className="block text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
          URLs personalizadas (opcional · uma por linha · até 20)
        </label>
        <Textarea
          value={customUrls}
          onChange={(e) => setCustomUrls(e.target.value)}
          rows={3}
          placeholder="https://aceleriq.com.br/blog/post-1&#10;https://aceleriq.com.br/blog/post-2"
          className="font-mono text-xs"
        />
        <Button onClick={runCustom} size="sm" className="mt-3" disabled={mut.isPending}>
          <Search className="h-3.5 w-3.5 mr-2" />
          Verificar essas URLs
        </Button>
      </div>

      {/* Results */}
      {mut.isPending && !mut.data && (
        <div className="text-sm text-muted-foreground">
          Consultando Google Search Console e Bing…
        </div>
      )}

      {mut.error && (
        <div className="border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-400 mb-6">
          <XCircle className="h-4 w-4 inline mr-2" />
          {mut.error instanceof Error ? mut.error.message : "Falha ao verificar."}
        </div>
      )}

      <div className="space-y-3">
        {mut.data?.results.map((r) => (
          <ResultCard key={r.url} r={r} />
        ))}
      </div>

      {mut.data && (
        <p className="text-[11px] text-muted-foreground mt-6 font-mono">
          Verificado em {new Date(mut.data.checkedAt).toLocaleString("pt-BR")} ·{" "}
          <Link to="/admin" className="hover:underline">
            ← Voltar à visão geral
          </Link>
        </p>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "ok" | "warn" | "bad";
}) {
  const color =
    tone === "ok"
      ? "text-emerald-400"
      : tone === "warn"
        ? "text-amber-400"
        : "text-red-400";
  return (
    <div className="border border-white/10 bg-white/[0.02] p-3">
      <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className={`text-2xl font-display font-semibold mt-1 flex items-center gap-2 ${color}`}>
        {value}
        {tone === "ok" && value > 0 && <CheckCircle2 className="h-4 w-4" />}
      </div>
    </div>
  );
}
