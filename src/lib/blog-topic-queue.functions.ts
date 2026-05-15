// Server functions para gerenciar a fila de pautas no admin.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { generateAndPublishWeeklyPost } from "./blog-generator.server";

function checkPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) throw new Error("ADMIN_PASSWORD não configurado no servidor.");
  if (password !== expected) throw new Error("Senha incorreta.");
}

const VALID_CATEGORIES = [
  "ia",
  "automacao",
  "trafego",
  "marketing",
  "vendas",
  "crescimento",
] as const;
const VALID_STATUSES = [
  "pending",
  "generating",
  "published",
  "skipped",
  "failed",
] as const;

export interface TopicQueueRow {
  id: string;
  title: string;
  focus_keyword: string;
  category: string;
  angle: string;
  priority: number;
  status: (typeof VALID_STATUSES)[number];
  scheduled_for: string | null;
  generated_post_id: string | null;
  last_error: string | null;
  attempts: number;
  created_at: string;
  updated_at: string;
}

// ─── List ─────────────────────────────────────────────────
export const listTopicQueue = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string }) =>
    z.object({ password: z.string().min(1) }).parse(input),
  )
  .handler(async ({ data }) => {
    checkPassword(data.password);
    const { data: rows, error } = await supabaseAdmin
      .from("blog_topic_queue")
      .select("*")
      .order("status", { ascending: true })
      .order("priority", { ascending: true })
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw new Error(error.message);
    return (rows ?? []) as TopicQueueRow[];
  });

// ─── Create ───────────────────────────────────────────────
export const addTopic = createServerFn({ method: "POST" })
  .inputValidator(
    (input: {
      password: string;
      title: string;
      focus_keyword: string;
      category: string;
      angle?: string;
      priority?: number;
    }) =>
      z
        .object({
          password: z.string().min(1),
          title: z.string().min(5).max(200),
          focus_keyword: z.string().min(2).max(80),
          category: z.enum(VALID_CATEGORIES),
          angle: z.string().max(800).default(""),
          priority: z.number().int().min(1).max(1000).default(100),
        })
        .parse(input),
  )
  .handler(async ({ data }) => {
    checkPassword(data.password);
    const { data: row, error } = await supabaseAdmin
      .from("blog_topic_queue")
      .insert({
        title: data.title,
        focus_keyword: data.focus_keyword,
        category: data.category,
        angle: data.angle ?? "",
        priority: data.priority ?? 100,
      })
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return row as TopicQueueRow;
  });

// ─── Delete ───────────────────────────────────────────────
export const deleteTopic = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string; id: string }) =>
    z.object({ password: z.string().min(1), id: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data }) => {
    checkPassword(data.password);
    const { error } = await supabaseAdmin
      .from("blog_topic_queue")
      .delete()
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

// ─── Reset to pending ─────────────────────────────────────
export const resetTopic = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string; id: string }) =>
    z.object({ password: z.string().min(1), id: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data }) => {
    checkPassword(data.password);
    const { error } = await supabaseAdmin
      .from("blog_topic_queue")
      .update({ status: "pending", last_error: null })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

// ─── Run now ──────────────────────────────────────────────
export const runTopicNow = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string; id?: string }) =>
    z
      .object({ password: z.string().min(1), id: z.string().uuid().optional() })
      .parse(input),
  )
  .handler(async ({ data }) => {
    checkPassword(data.password);
    return generateAndPublishWeeklyPost({ topicId: data.id });
  });
