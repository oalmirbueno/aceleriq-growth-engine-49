import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { useAdmin } from "@/components/admin/AdminShell";
import { listBlogPosts, deleteBlogPost } from "@/lib/blog-posts.functions";
import { STATUS_LABEL, type BlogPostStatus } from "@/lib/blog-posts-types";
import { Button } from "@/components/ui/button";
import { Plus, ExternalLink, Trash2, Pencil } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/posts")({
  component: PostsList,
});

const FILTERS: { id: BlogPostStatus | "all"; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "draft", label: "Rascunhos" },
  { id: "in_review", label: "Em revisão" },
  { id: "approved", label: "Aprovados" },
  { id: "published", label: "Publicados" },
];

const STATUS_COLOR: Record<BlogPostStatus, string> = {
  draft: "text-muted-foreground border-white/15 bg-white/[0.03]",
  in_review: "text-yellow-300 border-yellow-500/30 bg-yellow-500/5",
  approved: "text-blue-300 border-blue-500/30 bg-blue-500/5",
  published: "text-emerald-300 border-emerald-500/30 bg-emerald-500/5",
};

function PostsList() {
  const { password } = useAdmin();
  const [filter, setFilter] = useState<BlogPostStatus | "all">("all");
  const list = useServerFn(listBlogPosts);
  const del = useServerFn(deleteBlogPost);
  const qc = useQueryClient();

  const q = useQuery({
    queryKey: ["admin-posts", filter],
    queryFn: () => list({ data: { password, status: filter } }),
  });

  const delMut = useMutation({
    mutationFn: (id: string) => del({ data: { password, id } }),
    onSuccess: () => {
      toast.success("Post removido.");
      qc.invalidateQueries({ queryKey: ["admin-posts"] });
      qc.invalidateQueries({ queryKey: ["admin-blog-stats"] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Erro ao remover"),
  });

  return (
    <div className="px-6 md:px-10 py-10 max-w-6xl">
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-2">
            Conteúdo
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-semibold">
            Posts do blog
          </h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl">
            Artigos originais Aceleriq com acompanhamento de SEO (palavra-chave, meta description, slug) e
            checklist antes da publicação.
          </p>
        </div>
        <Link to="/admin/posts/$id" params={{ id: "novo" }}>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Novo post
          </Button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 text-xs border transition-colors ${
              filter === f.id
                ? "border-primary text-primary bg-primary/10"
                : "border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {q.isLoading && <p className="text-sm text-muted-foreground">Carregando…</p>}
      {q.error && (
        <p className="text-sm text-red-400">
          {q.error instanceof Error ? q.error.message : "Erro ao carregar"}
        </p>
      )}

      {q.data && q.data.length === 0 && (
        <div className="border border-dashed border-white/10 p-10 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Nenhum post {filter !== "all" ? `com status "${STATUS_LABEL[filter as BlogPostStatus]}"` : "ainda"}.
          </p>
          <Link to="/admin/posts/$id" params={{ id: "novo" }}>
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" /> Criar o primeiro
            </Button>
          </Link>
        </div>
      )}

      <div className="space-y-2">
        {(q.data ?? []).map((p) => {
          const score =
            "score" in p.review_notes && typeof p.review_notes.score === "number"
              ? p.review_notes.score
              : null;
          return (
            <div
              key={p.id}
              className="border border-white/10 bg-white/[0.02] p-4 flex items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 border ${STATUS_COLOR[p.status]}`}
                  >
                    {STATUS_LABEL[p.status]}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {p.category}
                  </span>
                  {score !== null && (
                    <span
                      className={`font-mono text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 border ${
                        score >= 80
                          ? "border-emerald-500/30 text-emerald-300"
                          : score >= 50
                            ? "border-yellow-500/30 text-yellow-300"
                            : "border-red-500/30 text-red-300"
                      }`}
                    >
                      SEO {score}%
                    </span>
                  )}
                </div>
                <div className="font-display text-base truncate">{p.title}</div>
                <div className="text-xs text-muted-foreground truncate">
                  /blog/{p.slug}
                  {p.focus_keyword && (
                    <>
                      <span className="mx-2">·</span>
                      <span>kw: {p.focus_keyword}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                {p.status === "published" && (
                  <a
                    href={`/blog/${p.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-muted-foreground hover:text-foreground"
                    title="Ver no blog"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                <Link
                  to="/admin/posts/$id"
                  params={{ id: p.id }}
                  className="p-2 text-muted-foreground hover:text-primary"
                  title="Editar"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => {
                    if (confirm(`Remover "${p.title}"?`)) delMut.mutate(p.id);
                  }}
                  className="p-2 text-muted-foreground hover:text-destructive"
                  title="Remover"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
