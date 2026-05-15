import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

function checkPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) throw new Error("ADMIN_PASSWORD não configurado.");
  if (password !== expected) throw new Error("Senha incorreta.");
}

export interface IndexationAlert {
  url: string;
  source: string;
  publishedAt: string | null;
  lastCheckedAt: string | null;
  alertSince: string | null;
  verdict: string | null;
  coverageState: string | null;
  inspectionUrl: string | null;
  consecutiveFailures: number;
  lastError: string | null;
}

export interface IndexationOverview {
  alerts: IndexationAlert[];
  totals: { tracked: number; indexed: number; alerts: number };
  lastRunAt: string | null;
}

export const getIndexationOverview = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string }) =>
    z.object({ password: z.string().min(1) }).parse(input),
  )
  .handler(async ({ data }): Promise<IndexationOverview> => {
    checkPassword(data.password);

    const { data: rows, error } = await supabaseAdmin
      .from("indexation_status")
      .select(
        "url, source, published_at, last_checked_at, alert_since, alert_active, verdict, coverage_state, inspection_url, consecutive_failures, last_error",
      )
      .order("alert_since", { ascending: false, nullsFirst: false })
      .limit(200);

    if (error) throw new Error(error.message);

    const all = rows ?? [];
    const alerts: IndexationAlert[] = all
      .filter((r) => r.alert_active)
      .map((r) => ({
        url: r.url,
        source: r.source,
        publishedAt: r.published_at,
        lastCheckedAt: r.last_checked_at,
        alertSince: r.alert_since,
        verdict: r.verdict,
        coverageState: r.coverage_state,
        inspectionUrl: r.inspection_url,
        consecutiveFailures: r.consecutive_failures,
        lastError: r.last_error,
      }));

    const indexed = all.filter((r) => r.verdict === "PASS").length;
    const lastRunAt = all.reduce<string | null>((acc, r) => {
      if (!r.last_checked_at) return acc;
      if (!acc || r.last_checked_at > acc) return r.last_checked_at;
      return acc;
    }, null);

    return {
      alerts,
      totals: { tracked: all.length, indexed, alerts: alerts.length },
      lastRunAt,
    };
  });

export const triggerIndexationCheck = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string }) =>
    z.object({ password: z.string().min(1) }).parse(input),
  )
  .handler(async ({ data }): Promise<{ ok: boolean; summary: Record<string, unknown> }> => {
    checkPassword(data.password);
    const url =
      "https://aceleriq.com.br/api/public/hooks/check-indexation";
    const anon =
      process.env.SUPABASE_PUBLISHABLE_KEY ??
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnYXpyY2ZhaGt4eHd2d3plY2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1MDQxNjAsImV4cCI6MjA5MzA4MDE2MH0._kqx9ts0P-_r_eXy0Lr4vwIjC8qDlSlgqrz69jqJbis";
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: anon },
      body: "{}",
    });
    const summary = await res.json().catch(() => ({}));
    return { ok: res.ok, summary };
  });
