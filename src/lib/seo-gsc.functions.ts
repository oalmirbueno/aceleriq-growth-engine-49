import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SITE_URL = "https://aceleriq.com.br";
const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";

interface GscRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface GscResponse {
  rows?: GscRow[];
}

function checkPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) throw new Error("ADMIN_PASSWORD não configurado.");
  if (password !== expected) throw new Error("Senha incorreta.");
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

async function gscQuery(body: Record<string, unknown>): Promise<GscResponse> {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const gscKey = process.env.GOOGLE_SEARCH_CONSOLE_API_KEY;
  if (!lovableKey || !gscKey) throw new Error("Conector Google Search Console não configurado.");

  const url = `${GATEWAY}/webmasters/v3/sites/${encodeURIComponent(SITE_URL + "/")}/searchAnalytics/query`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": gscKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`GSC ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

// ─── Cache simples in-memory ─────────────────────────
const cache = new Map<string, { at: number; value: unknown }>();
const TTL = 30 * 60 * 1000; // 30 min

async function cached<T>(key: string, factory: () => Promise<T>): Promise<T> {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL) return hit.value as T;
  try {
    const value = await factory();
    cache.set(key, { at: Date.now(), value });
    return value;
  } catch (e) {
    if (hit) return hit.value as T; // serve stale on failure
    throw e;
  }
}

export interface SeoOverview {
  totals: { clicks: number; impressions: number; ctr: number; position: number };
  totalsPrev: { clicks: number; impressions: number; ctr: number; position: number };
  daily: { date: string; clicks: number; impressions: number }[];
  topQueries: { query: string; clicks: number; impressions: number; ctr: number; position: number }[];
  topPages: { page: string; clicks: number; impressions: number; ctr: number; position: number }[];
  alerts: { id: string; severity: "info" | "warn" | "critical"; title: string; detail: string; href?: string }[];
  error?: string;
}

const EMPTY_OVERVIEW: SeoOverview = {
  totals: { clicks: 0, impressions: 0, ctr: 0, position: 0 },
  totalsPrev: { clicks: 0, impressions: 0, ctr: 0, position: 0 },
  daily: [],
  topQueries: [],
  topPages: [],
  alerts: [],
};

function aggregate(rows: GscRow[]): { clicks: number; impressions: number; ctr: number; position: number } {
  if (rows.length === 0) return { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  const clicks = rows.reduce((a, r) => a + (r.clicks || 0), 0);
  const impressions = rows.reduce((a, r) => a + (r.impressions || 0), 0);
  const ctr = impressions > 0 ? clicks / impressions : 0;
  const position = rows.reduce((a, r) => a + (r.position || 0) * (r.impressions || 0), 0) /
    Math.max(1, impressions);
  return { clicks, impressions, ctr, position };
}

export const getSeoOverview = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string }) =>
    z.object({ password: z.string().min(1) }).parse(input),
  )
  .handler(async ({ data }): Promise<SeoOverview> => {
    checkPassword(data.password);
    return cached("seo-overview-28d", async () => {
      const today = new Date();
      const end = isoDate(new Date(today.getTime() - 2 * 86400000)); // GSC tem delay 2d
      const start = isoDate(new Date(today.getTime() - 30 * 86400000));
      const prevEnd = isoDate(new Date(today.getTime() - 31 * 86400000));
      const prevStart = isoDate(new Date(today.getTime() - 59 * 86400000));

      try {
        const [totalsRes, prevRes, daily, queries, pages] = await Promise.all([
          gscQuery({ startDate: start, endDate: end, dimensions: [], rowLimit: 1 }),
          gscQuery({ startDate: prevStart, endDate: prevEnd, dimensions: [], rowLimit: 1 }),
          gscQuery({ startDate: start, endDate: end, dimensions: ["date"], rowLimit: 100 }),
          gscQuery({ startDate: start, endDate: end, dimensions: ["query"], rowLimit: 25 }),
          gscQuery({ startDate: start, endDate: end, dimensions: ["page"], rowLimit: 25 }),
        ]);

        const totals = aggregate(totalsRes.rows ?? []);
        const totalsPrev = aggregate(prevRes.rows ?? []);

        const dailyRows = (daily.rows ?? []).map((r) => ({
          date: r.keys[0],
          clicks: r.clicks,
          impressions: r.impressions,
        }));

        const topQueries = (queries.rows ?? [])
          .map((r) => ({
            query: r.keys[0],
            clicks: r.clicks,
            impressions: r.impressions,
            ctr: r.ctr,
            position: r.position,
          }))
          .sort((a, b) => b.clicks - a.clicks)
          .slice(0, 15);

        const topPages = (pages.rows ?? [])
          .map((r) => ({
            page: r.keys[0],
            clicks: r.clicks,
            impressions: r.impressions,
            ctr: r.ctr,
            position: r.position,
          }))
          .sort((a, b) => b.clicks - a.clicks)
          .slice(0, 15);

        // ── Alertas ──
        const alerts: SeoOverview["alerts"] = [];

        // Posição piorou >3 posições vs período anterior
        if (totals.position > 0 && totalsPrev.position > 0 && totals.position - totalsPrev.position > 3) {
          alerts.push({
            id: "position_drop",
            severity: "critical",
            title: "Posição média piorou",
            detail: `Posição média caiu de ${totalsPrev.position.toFixed(1)} para ${totals.position.toFixed(1)} nos últimos 28 dias.`,
          });
        }

        // Páginas com posição boa mas CTR baixo
        topPages
          .filter((p) => p.position <= 10 && p.ctr < 0.01 && p.impressions > 100)
          .slice(0, 5)
          .forEach((p, i) =>
            alerts.push({
              id: `low_ctr_${i}`,
              severity: "warn",
              title: "CTR baixo em página com boa posição",
              detail: `${p.page} — posição ${p.position.toFixed(1)}, CTR ${(p.ctr * 100).toFixed(2)}%. Reescrever title/meta.`,
              href: p.page,
            }),
          );

        // Queries 11–20 (almost there)
        topQueries
          .filter((q) => q.position > 10 && q.position <= 20 && q.impressions > 50)
          .slice(0, 5)
          .forEach((q, i) =>
            alerts.push({
              id: `near_top_${i}`,
              severity: "info",
              title: `"${q.query}" — quase no Top 10`,
              detail: `Posição ${q.position.toFixed(1)} com ${q.impressions} impressões. Reforçar com link interno.`,
            }),
          );

        return { totals, totalsPrev, daily: dailyRows, topQueries, topPages, alerts };
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Erro desconhecido";
        console.error("[getSeoOverview]", msg);
        return { ...EMPTY_OVERVIEW, error: msg };
      }
    });
  });
