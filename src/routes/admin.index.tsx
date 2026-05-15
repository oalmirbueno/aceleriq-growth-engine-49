import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useAdmin } from "@/components/admin/AdminShell";
import { getBlogPostStats } from "@/lib/blog-posts.functions";
import { getLeadsOverview } from "@/lib/leads.functions";
import { getSeoOverview } from "@/lib/seo-gsc.functions";
import { ArrowRight, AlertTriangle, TrendingUp, TrendingDown, FileText, Users, Search, Plus } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminHome,
});

function delta(curr: number, prev: number): { pct: number; up: boolean } {
  if (prev === 0) return { pct: curr > 0 ? 100 : 0, up: curr > 0 };
  const pct = Math.round(((curr - prev) / prev) * 100);
  return { pct: Math.abs(pct), up: pct >= 0 };
}

function Kpi({ label, value, sub, trend }: { label: string; value: string; sub?: string; trend?: { pct: number; up: boolean } }) {
  return (
    <div className="border border-white/10 bg-white/[0.02] p-5">
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</div>
      <div className="mt-3 text-3xl font-display font-semibold">{value}</div>
      <div className="mt-2 flex items-center gap-2 text-xs">
        {trend && (
          <span className={`inline-flex items-center gap-1 ${trend.up ? "text-emerald-400" : "text-red-400"}`}>
            {trend.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {trend.pct}%
          </span>
        )}
        {sub && <span className="text-muted-foreground">{sub}</span>}
      </div>
    </div>
  );
}

function AdminHome() {
  const { password } = useAdmin();
  const blogStatsFn = useServerFn(getBlogPostStats);
  const leadsFn = useServerFn(getLeadsOverview);
  const seoFn = useServerFn(getSeoOverview);

  const blog = useQuery({ queryKey: ["admin-blog-stats"], queryFn: () => blogStatsFn({ data: { password } }) });
  const leads = useQuery({ queryKey: ["admin-leads-overview"], queryFn: () => leadsFn({ data: { password } }) });
  const seo = useQuery({ queryKey: ["admin-seo-overview"], queryFn: () => seoFn({ data: { password } }) });

  const seoTrend = seo.data ? delta(seo.data.totals.clicks, seo.data.totalsPrev.clicks) : undefined;
  const leadsTrend = leads.data ? delta(leads.data.thisMonth, leads.data.prevMonth) : undefined;
  const postsTrend = blog.data ? delta(blog.data.publishedThisMonth, blog.data.publishedPrevMonth) : undefined;

  return (
    <div className="px-6 md:px-10 py-10 max-w-6xl">
      <div className="mb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-2">Painel Admin</div>
        <h1 className="text-3xl md:text-4xl font-display font-semibold">Visão geral</h1>
        <p className="text-sm text-muted-foreground mt-2">Performance dos últimos 28 dias e ações pendentes.</p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-10">
        <Kpi
          label="Cliques orgânicos 28d"
          value={seo.isLoading ? "…" : (seo.data?.totals.clicks ?? 0).toLocaleString("pt-BR")}
          sub="vs período anterior"
          trend={seoTrend}
        />
        <Kpi
          label="Posição média 28d"
          value={seo.isLoading ? "…" : (seo.data?.totals.position ?? 0).toFixed(1)}
          sub={`${(seo.data?.totals.impressions ?? 0).toLocaleString("pt-BR")} impressões`}
        />
        <Kpi
          label="Leads no mês"
          value={leads.isLoading ? "…" : String(leads.data?.thisMonth ?? 0)}
          sub={`${leads.data?.hot ?? 0} quentes (score ≥ 70)`}
          trend={leadsTrend}
        />
        <Kpi
          label="Posts publicados"
          value={blog.isLoading ? "…" : String(blog.data?.publishedThisMonth ?? 0)}
          sub={`${blog.data?.drafts ?? 0} rascunhos · ${blog.data?.inReview ?? 0} em revisão`}
          trend={postsTrend}
        />
      </div>

      {/* Quick actions */}
      <div className="grid gap-3 md:grid-cols-3 mb-10">
        <Link to="/admin/posts/novo" className="border border-primary/30 bg-primary/5 hover:bg-primary/10 p-4 flex items-center justify-between transition-colors">
          <span className="flex items-center gap-3 text-sm"><Plus className="h-4 w-4 text-primary" /> Novo post</span>
          <ArrowRight className="h-4 w-4 text-primary" />
        </Link>
        <Link to="/admin/leads" className="border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] p-4 flex items-center justify-between transition-colors">
          <span className="flex items-center gap-3 text-sm"><Users className="h-4 w-4 text-primary" /> Ver leads</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link to="/admin/seo" className="border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] p-4 flex items-center justify-between transition-colors">
          <span className="flex items-center gap-3 text-sm"><Search className="h-4 w-4 text-primary" /> Detalhes SEO</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Alertas SEO */}
      <section>
        <h2 className="text-xl font-display font-semibold mb-4">Alertas e oportunidades</h2>
        {seo.data?.error && (
          <div className="border border-yellow-500/30 bg-yellow-500/5 p-4 text-sm text-yellow-200 mb-4">
            Não foi possível carregar dados do Google Search Console: {seo.data.error}
          </div>
        )}
        {seo.data && seo.data.alerts.length === 0 && !seo.data.error && (
          <p className="text-sm text-muted-foreground">Nenhum alerta no momento. Tudo dentro do esperado.</p>
        )}
        <div className="space-y-2">
          {(seo.data?.alerts ?? []).map((a) => (
            <div key={a.id} className={`border p-4 flex gap-3 items-start ${a.severity === "critical" ? "border-red-500/30 bg-red-500/5" : a.severity === "warn" ? "border-yellow-500/30 bg-yellow-500/5" : "border-white/10 bg-white/[0.02]"}`}>
              <AlertTriangle className={`h-4 w-4 mt-0.5 flex-shrink-0 ${a.severity === "critical" ? "text-red-400" : a.severity === "warn" ? "text-yellow-400" : "text-primary"}`} />
              <div className="text-sm">
                <div className="font-medium text-foreground">{a.title}</div>
                <div className="text-muted-foreground mt-1">{a.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
