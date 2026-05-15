# Sistema de captação de backlinks — Aceleriq Blog

Pipeline interno (CRM enxuto) para prospectar, executar e acompanhar backlinks qualificados, com metas mensais e métricas de execução.

## Arquitetura

### 1. Banco (Lovable Cloud)

**`backlink_targets`** — cada oportunidade de backlink
- `domain` (text) — ex.: `g1.globo.com`
- `domain_authority` (int, 0–100) — preenchido manualmente ou via Semrush depois
- `type` (enum): `parceria` | `guest_post` | `publicacao` | `menção` | `diretorio`
- `status` (enum): `prospect` | `contatado` | `negociando` | `aceito` | `publicado` | `recusado` | `arquivado`
- `priority` (enum): `alta` | `media` | `baixa`
- `contact_name`, `contact_email`, `contact_url` (text, opcionais)
- `pitch_angle` (text) — ângulo da proposta
- `target_blog_slug` (text) — qual post da Aceleriq é o alvo do link
- `proposed_anchor` (text) — texto âncora desejado
- `published_url` (text) — URL final onde o link foi publicado
- `published_anchor` (text) — âncora real publicada
- `dofollow` (bool)
- `value_estimated_brl` (numeric) — valor de mídia equivalente (opcional)
- `notes` (text)
- `next_action_at` (timestamptz) — próximo follow-up
- `published_at` (timestamptz)
- `created_at`, `updated_at`

**`backlink_goals`** — metas mensais
- `month` (date, primeiro dia do mês, único)
- `target_count` (int) — quantos backlinks publicados no mês
- `target_avg_da` (int) — DA médio mínimo
- `notes` (text)

**RLS**: ambas tabelas públicas para leitura/escrita por enquanto (sem auth no projeto). Vou propor proteger por senha simples no UI ou implementar Supabase Auth — escolha sua.

### 2. Server functions (`src/lib/backlinks.functions.ts`)
- `listBacklinks({ status?, type?, search? })`
- `createBacklink(data)`
- `updateBacklink({ id, patch })`
- `deleteBacklink({ id })`
- `listGoals()` / `upsertGoal({ month, target_count, target_avg_da })`
- `getBacklinkMetrics()` — agrega: total publicados no mês, DA médio, % vs meta, breakdown por status/tipo, próximas ações vencidas

### 3. UI — `/admin/backlinks` (oculto do menu público)
- **Header com KPIs**: Publicados no mês / Meta · DA médio · Pipeline ativo · Vencidos
- **Tabs**: Pipeline (kanban) · Lista (table com filtros) · Metas
- **Kanban** com 6 colunas (prospect → publicado), drag-to-update status
- **Drawer de edição** ao clicar em card: form completo + histórico de alterações
- **Botão "Nova oportunidade"** — modal com form
- **Tab Metas**: gráfico simples (barras) publicados vs meta mensal últimos 6 meses
- **Export CSV** — para enviar pra equipe externa de outreach

Estética coerente com o resto: dark, mono uppercase tracking-wide nos labels, primary em destaques, sem decorações.

## Detalhes técnicos

```text
src/
  routes/
    admin.backlinks.tsx           # rota oculta protegida
  lib/
    backlinks.functions.ts        # createServerFn (admin via supabaseAdmin)
    backlinks-types.ts            # enums + tipos compartilhados
  components/admin/backlinks/
    BacklinkKanban.tsx
    BacklinkTable.tsx
    BacklinkForm.tsx              # drawer/modal
    BacklinkMetrics.tsx           # KPIs + gráfico de metas
    GoalsEditor.tsx
```

- Server fns usam `supabaseAdmin` (sem RLS) já que rota é admin.
- Mutations invalidam `useQuery` keys: `['backlinks']`, `['backlink-metrics']`, `['backlink-goals']`.
- Drag-and-drop no kanban com `@dnd-kit/core` (já usado em outros projetos; instalar se faltar).
- Gráfico com SVG simples inline — sem Recharts pra manter bundle leve.

## Decisões que preciso confirmar antes de codar

1. **Proteção da rota `/admin/backlinks`**:
   a) Senha simples em variável de ambiente (`ADMIN_PASSWORD`) — rápido, sem fluxo de signup.
   b) Supabase Auth completo (email/senha, você cria sua conta admin).
   c) Sem proteção por enquanto (só URL não-listada).

2. **Integração com Semrush**: já temos a tool conectada — quer que eu busque DA/Authority Score automaticamente quando você cadastrar um domínio? (Adiciona um botão "Atualizar métricas" no card.)

3. **Seed inicial**: quer que eu pré-popule com ~15–20 alvos relevantes pro nicho (mídias de marketing/IA brasileiras: Resultados Digitais, RockContent, AdNews, Meio & Mensagem, ProXXIma, etc.)?

Confirma essas 3 e eu já implemento na sequência: migração → server fns → UI.
