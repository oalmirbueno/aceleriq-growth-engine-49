import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import type {
  BacklinkGoal,
  BacklinkTarget,
  BacklinkStatus,
  BacklinkType,
  BacklinkPriority,
} from "./backlinks-types";

// ---------- Auth gate ----------

function checkPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    throw new Error("ADMIN_PASSWORD não configurado no servidor.");
  }
  if (password !== expected) {
    throw new Error("Senha incorreta.");
  }
}

export const verifyAdminPassword = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string }) =>
    z.object({ password: z.string().min(1).max(200) }).parse(input),
  )
  .handler(async ({ data }) => {
    checkPassword(data.password);
    return { ok: true as const };
  });

// ---------- Targets ----------

const targetInsertSchema = z.object({
  domain: z.string().min(1).max(255),
  domain_authority: z.number().int().min(0).max(100).nullable().optional(),
  type: z.enum(["parceria", "guest_post", "publicacao", "mencao", "diretorio"]),
  status: z.enum(["prospect", "contatado", "negociando", "aceito", "publicado", "recusado", "arquivado"]),
  priority: z.enum(["alta", "media", "baixa"]),
  contact_name: z.string().max(255).nullable().optional(),
  contact_email: z.string().max(255).nullable().optional(),
  contact_url: z.string().max(500).nullable().optional(),
  pitch_angle: z.string().max(2000).nullable().optional(),
  target_blog_slug: z.string().max(255).nullable().optional(),
  proposed_anchor: z.string().max(255).nullable().optional(),
  published_url: z.string().max(500).nullable().optional(),
  published_anchor: z.string().max(255).nullable().optional(),
  dofollow: z.boolean(),
  value_estimated_brl: z.number().min(0).max(10_000_000).nullable().optional(),
  notes: z.string().max(5000).nullable().optional(),
  next_action_at: z.string().nullable().optional(),
  published_at: z.string().nullable().optional(),
});

export const listBacklinks = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string }) =>
    z.object({ password: z.string().min(1) }).parse(input),
  )
  .handler(async ({ data }): Promise<BacklinkTarget[]> => {
    checkPassword(data.password);
    const { data: rows, error } = await supabaseAdmin
      .from("backlink_targets")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1000);
    if (error) throw new Error(error.message);
    return (rows ?? []) as BacklinkTarget[];
  });

export const createBacklink = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string; target: unknown }) =>
    z
      .object({
        password: z.string().min(1),
        target: targetInsertSchema,
      })
      .parse(input),
  )
  .handler(async ({ data }): Promise<BacklinkTarget> => {
    checkPassword(data.password);
    const { data: row, error } = await supabaseAdmin
      .from("backlink_targets")
      .insert(data.target)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return row as BacklinkTarget;
  });

export const updateBacklink = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string; id: string; patch: unknown }) =>
    z
      .object({
        password: z.string().min(1),
        id: z.string().uuid(),
        patch: targetInsertSchema.partial(),
      })
      .parse(input),
  )
  .handler(async ({ data }): Promise<BacklinkTarget> => {
    checkPassword(data.password);
    const { data: row, error } = await supabaseAdmin
      .from("backlink_targets")
      .update(data.patch)
      .eq("id", data.id)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return row as BacklinkTarget;
  });

export const deleteBacklink = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string; id: string }) =>
    z
      .object({ password: z.string().min(1), id: z.string().uuid() })
      .parse(input),
  )
  .handler(async ({ data }) => {
    checkPassword(data.password);
    const { error } = await supabaseAdmin.from("backlink_targets").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

// ---------- Goals ----------

export const listGoals = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string }) =>
    z.object({ password: z.string().min(1) }).parse(input),
  )
  .handler(async ({ data }): Promise<BacklinkGoal[]> => {
    checkPassword(data.password);
    const { data: rows, error } = await supabaseAdmin
      .from("backlink_goals")
      .select("*")
      .order("month", { ascending: false })
      .limit(24);
    if (error) throw new Error(error.message);
    return (rows ?? []) as BacklinkGoal[];
  });

export const upsertGoal = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string; month: string; target_count: number; target_avg_da: number; notes?: string | null }) =>
    z
      .object({
        password: z.string().min(1),
        month: z.string().regex(/^\d{4}-\d{2}-01$/),
        target_count: z.number().int().min(0).max(10000),
        target_avg_da: z.number().int().min(0).max(100),
        notes: z.string().max(2000).nullable().optional(),
      })
      .parse(input),
  )
  .handler(async ({ data }): Promise<BacklinkGoal> => {
    checkPassword(data.password);
    const { data: row, error } = await supabaseAdmin
      .from("backlink_goals")
      .upsert(
        {
          month: data.month,
          target_count: data.target_count,
          target_avg_da: data.target_avg_da,
          notes: data.notes ?? null,
        },
        { onConflict: "month" },
      )
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return row as BacklinkGoal;
  });

// ---------- Metrics ----------

export interface BacklinkMetrics {
  monthPublishedCount: number;
  monthAvgDa: number;
  monthGoalCount: number;
  monthGoalAvgDa: number;
  pipelineActive: number;
  overdueCount: number;
  byStatus: Record<BacklinkStatus, number>;
  byType: Record<BacklinkType, number>;
  byPriority: Record<BacklinkPriority, number>;
  monthlyHistory: Array<{ month: string; published: number; goal: number; avgDa: number }>;
}

export const getBacklinkMetrics = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string }) =>
    z.object({ password: z.string().min(1) }).parse(input),
  )
  .handler(async ({ data }): Promise<BacklinkMetrics> => {
    checkPassword(data.password);

    const [{ data: targets, error: e1 }, { data: goals, error: e2 }] = await Promise.all([
      supabaseAdmin.from("backlink_targets").select("*").limit(2000),
      supabaseAdmin.from("backlink_goals").select("*").limit(36),
    ]);
    if (e1) throw new Error(e1.message);
    if (e2) throw new Error(e2.message);

    const all = (targets ?? []) as BacklinkTarget[];
    const goalsArr = (goals ?? []) as BacklinkGoal[];
    const now = new Date();
    const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
    const monthKey = monthStart.toISOString().slice(0, 10);

    const publishedThisMonth = all.filter(
      (t) => t.status === "publicado" && t.published_at && new Date(t.published_at) >= monthStart,
    );
    const monthAvgDa =
      publishedThisMonth.length > 0
        ? Math.round(
            publishedThisMonth.reduce((sum, t) => sum + (t.domain_authority ?? 0), 0) /
              publishedThisMonth.length,
          )
        : 0;

    const currentGoal = goalsArr.find((g) => g.month.slice(0, 10) === monthKey);

    const pipelineActive = all.filter((t) =>
      ["contatado", "negociando", "aceito"].includes(t.status),
    ).length;

    const overdueCount = all.filter(
      (t) =>
        t.next_action_at &&
        new Date(t.next_action_at) < now &&
        !["publicado", "recusado", "arquivado"].includes(t.status),
    ).length;

    const empty = <K extends string>(keys: readonly K[]): Record<K, number> =>
      Object.fromEntries(keys.map((k) => [k, 0])) as Record<K, number>;

    const byStatus = empty([
      "prospect",
      "contatado",
      "negociando",
      "aceito",
      "publicado",
      "recusado",
      "arquivado",
    ] as const);
    const byType = empty(["parceria", "guest_post", "publicacao", "mencao", "diretorio"] as const);
    const byPriority = empty(["alta", "media", "baixa"] as const);

    for (const t of all) {
      byStatus[t.status]++;
      byType[t.type]++;
      byPriority[t.priority]++;
    }

    // Histórico últimos 6 meses
    const monthlyHistory: BacklinkMetrics["monthlyHistory"] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1));
      const key = d.toISOString().slice(0, 10);
      const next = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1));
      const monthPosts = all.filter(
        (t) =>
          t.status === "publicado" &&
          t.published_at &&
          new Date(t.published_at) >= d &&
          new Date(t.published_at) < next,
      );
      const goal = goalsArr.find((g) => g.month.slice(0, 10) === key);
      const avgDa =
        monthPosts.length > 0
          ? Math.round(
              monthPosts.reduce((sum, t) => sum + (t.domain_authority ?? 0), 0) / monthPosts.length,
            )
          : 0;
      monthlyHistory.push({
        month: key,
        published: monthPosts.length,
        goal: goal?.target_count ?? 0,
        avgDa,
      });
    }

    return {
      monthPublishedCount: publishedThisMonth.length,
      monthAvgDa,
      monthGoalCount: currentGoal?.target_count ?? 0,
      monthGoalAvgDa: currentGoal?.target_avg_da ?? 0,
      pipelineActive,
      overdueCount,
      byStatus,
      byType,
      byPriority,
      monthlyHistory,
    };
  });
