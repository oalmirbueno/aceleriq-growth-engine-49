import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

function checkPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) throw new Error("ADMIN_PASSWORD não configurado.");
  if (password !== expected) throw new Error("Senha incorreta.");
}

export interface DiagnosticoLeadRow {
  id: string;
  created_at: string;
  nome: string;
  whatsapp: string;
  empresa: string;
  site_instagram: string | null;
  faturamento_mensal: string;
  principal_gargalo: string;
  interesse_principal: string;
  respostas: Record<string, never>;
  score: number;
  classificacao: string;
  recomendacoes: unknown;
  origem: string | null;
}

export interface LeadsOverview {
  total: number;
  thisMonth: number;
  prevMonth: number;
  hot: number; // score >= 70
  scoreAvg: number;
  byOrigem: { origem: string; count: number }[];
  byClassificacao: { classificacao: string; count: number }[];
}

export const listLeads = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string; origem?: string; classificacao?: string; q?: string }) =>
    z
      .object({
        password: z.string().min(1),
        origem: z.string().max(200).optional(),
        classificacao: z.string().max(50).optional(),
        q: z.string().max(200).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data }): Promise<DiagnosticoLeadRow[]> => {
    checkPassword(data.password);
    let q = supabaseAdmin
      .from("diagnostico_leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (data.origem) q = q.eq("origem", data.origem);
    if (data.classificacao) q = q.eq("classificacao", data.classificacao);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    let list = (rows ?? []) as unknown as DiagnosticoLeadRow[];
    if (data.q) {
      const needle = data.q.toLowerCase();
      list = list.filter(
        (r) =>
          r.nome.toLowerCase().includes(needle) ||
          r.empresa.toLowerCase().includes(needle) ||
          (r.principal_gargalo || "").toLowerCase().includes(needle),
      );
    }
    return list;
  });

export const getLeadsOverview = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string }) =>
    z.object({ password: z.string().min(1) }).parse(input),
  )
  .handler(async ({ data }): Promise<LeadsOverview> => {
    checkPassword(data.password);
    const { data: rows, error } = await supabaseAdmin
      .from("diagnostico_leads")
      .select("created_at, score, classificacao, origem");
    if (error) throw new Error(error.message);
    const list = rows ?? [];

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const prevStart = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString();

    const byOrigemMap = new Map<string, number>();
    const byClassMap = new Map<string, number>();
    let scoreSum = 0;
    let hot = 0;
    let thisMonth = 0;
    let prevMonth = 0;

    for (const r of list) {
      const origem = (r.origem as string | null) ?? "direto";
      byOrigemMap.set(origem, (byOrigemMap.get(origem) ?? 0) + 1);
      const classif = (r.classificacao as string) || "—";
      byClassMap.set(classif, (byClassMap.get(classif) ?? 0) + 1);
      scoreSum += (r.score as number) ?? 0;
      if (((r.score as number) ?? 0) >= 70) hot++;
      const created = r.created_at as string;
      if (created >= monthStart) thisMonth++;
      else if (created >= prevStart) prevMonth++;
    }

    return {
      total: list.length,
      thisMonth,
      prevMonth,
      hot,
      scoreAvg: list.length ? Math.round(scoreSum / list.length) : 0,
      byOrigem: Array.from(byOrigemMap.entries())
        .map(([origem, count]) => ({ origem, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10),
      byClassificacao: Array.from(byClassMap.entries())
        .map(([classificacao, count]) => ({ classificacao, count }))
        .sort((a, b) => b.count - a.count),
    };
  });
