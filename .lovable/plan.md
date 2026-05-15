# Painel Admin Aceleriq — SEO, Posts e Leads

Um único hub em `/admin` com navegação lateral, reusando o gate de senha (`ADMIN_PASSWORD`) já em uso em `/admin/backlinks`. Tudo via `createServerFn` + `supabaseAdmin`. RLS continua bloqueando acesso público.

## 1. Estrutura de rotas

- `/admin` → dashboard com KPIs + alertas (entry point)
- `/admin/seo` → métricas Search Console + sitemap + indexação
- `/admin/posts` → lista + editor com workflow de revisão
- `/admin/posts/novo` e `/admin/posts/$id` → editor markdown com preview
- `/admin/leads` → leads do Diagnóstico + leads dos LPs (filtro por origem)
- `/admin/backlinks` → mantém o que já existe

Layout compartilhado em `src/routes/admin.tsx` (sidebar + gate de senha único, evita repetir o login).

## 2. Banco de dados

Nova tabela `blog_posts`:
- `slug` (unique), `title`, `excerpt`, `content` (markdown), `cover_image`
- `category` (enum existente do blog: ia/automacao/trafego/marketing/vendas/crescimento)
- `status` (`draft` | `in_review` | `approved` | `published`)
- `seo_title`, `seo_description`, `focus_keyword`
- `review_notes` (jsonb — checklist SEO automático)
- `author`, `published_at`, `created_at`, `updated_at`

Trigger: ao mudar `status` para `published`, seta `published_at = now()`.

`blog.functions.ts` passa a mesclar `LOCAL_POSTS` (legado) + `blog_posts` com `status='published'` no feed. Sitemap também.

## 3. Editor de posts com revisão

Editor markdown lado a lado com preview renderizado (mesmo `ReactMarkdown` do blog, então o autor vê o resultado real).

Painel de revisão automática antes de publicar — checklist visual com pass/fail:
- Título: 30–60 chars
- SEO description: 120–160 chars
- Focus keyword presente em H1, primeiros 100 chars, slug e meta
- Densidade da focus keyword 0.5–2.5%
- Pelo menos 1 H2 e 3 H2/H3 no total
- Mínimo 600 palavras
- Pelo menos 2 links internos detectados (`/lp/`, `/blog/`, `/servicos/`)
- Imagem de capa definida

Workflow: `draft → in_review → approved → published`. Botão "Publicar" só fica ativo quando ≥80% do checklist passa OU o admin força com nota.

## 4. SEO — Search Console

Server function que chama o connector Google Search Console (`GOOGLE_SEARCH_CONSOLE_API_KEY` já configurado) e devolve para `aceleriq.com.br`:

- KPIs últimos 28 dias: cliques, impressões, CTR, posição média
- Top 10 queries (cliques + posição)
- Top 10 páginas (cliques + impressões)
- Status de indexação por URL do sitemap (sitemaps API + URL inspection quando disponível)
- Tendência diária (gráfico de linha — clicks + impressions)

Cache server-side de 30 min para não estourar quota.

### Alertas automáticos (na home do admin)
- Posição média piorou >3 posições em 7 dias
- Páginas com CTR <1% e posição 1–10 (oportunidade de title/meta)
- Posts publicados há >7 dias sem nenhuma impressão (problema de indexação)
- Queries com posição 11–20 ("almost there" — empurrar com link interno)

## 5. Leads do Diagnóstico

Tabela com:
- Filtro por origem (`lp:ia`, `blog:slug`, direto, etc.) — usa a coluna `origem` que adicionei
- Filtro por classificação (verde/amarelo/vermelho)
- Detalhe expandido com todas as respostas + score + recomendações
- Export CSV
- KPIs: total, conversão por origem, score médio, leads "quentes" (>70)
- Link direto WhatsApp pré-preenchido com resumo

## 6. Dashboard `/admin` (home)

Hero com 4 KPIs compactos:
- Cliques orgânicos 28d (vs 28d anteriores)
- Posição média 28d (vs anterior)
- Leads do mês (vs mês anterior)
- Posts publicados (vs mês anterior)

Lista de alertas SEO acionáveis + atalhos para "novo post", "ver leads", "publicar rascunhos".

## Detalhes técnicos

- `src/lib/blog-posts.functions.ts` — CRUD + checklist SEO server-side
- `src/lib/seo-gsc.functions.ts` — wrapper do connector com cache
- `src/lib/admin-auth.ts` — extrai a verificação de senha já existente para reuso
- `src/components/admin/AdminShell.tsx` — sidebar + gate compartilhado
- `src/components/admin/MarkdownEditor.tsx` — textarea + preview lado-a-lado (sem dependência nova)
- Recharts para os gráficos (já está no projeto se eu verificar — caso contrário, gráficos SVG simples sem nova dep)
- Migração `blog_posts` + trigger
- Atualizar `blog.functions.ts` e sitemap para incluir posts da nova tabela

## Fora do escopo deste plano
- Multi-usuário (continua single password)
- Upload de imagens (usa URL externa por enquanto — posso adicionar storage depois se quiser)
- Versionamento/histórico de posts (mantém só o estado atual)

Confirma e eu mando ver?
