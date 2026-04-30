# Landing Page Aceleriq — Engenharia de Crescimento

Landing page premium, moderna e responsiva para captar leads qualificados via **Diagnóstico de Maturidade em Crescimento e IA**, com formulário no estilo **Typeform** (uma pergunta por tela, transições suaves, barra de progresso) e armazenamento real dos leads no Lovable Cloud (Supabase).

## Identidade visual 

- **Tema dark premium** — fundo `#0A0B12` com gradientes profundos azul/violeta
- **Acentos**: azul elétrico `#3B82F6` + violeta `#8B5CF6` + verde-lima `#A3E635` (CTA conversão)
- **Tipografia**: Inter (corpo) + Space Grotesk (headlines) — pesos 400/600/700
- **Estética**: Stripe + Linear + Vercel — glass morphism sutil, gradientes vivos, grid lines, glow em CTAs
- **Microinterações**: fade/slide on scroll, hover lift em cards, gradient animado no hero, números contando, cursor glow no diagnóstico

## Contatos integrados

- WhatsApp: `41 99748-3429` (links `wa.me` com mensagem pré-preenchida)
- E-mail: `aceleriq@gmail.com`
- Instagram: `@aceleriq`

## Estrutura da página (15 seções)

1. **Header fixo** — logo Aceleriq, navegação (Método, Resultados, Diagnóstico, FAQ), CTA "Diagnóstico Gratuito"
2. **Hero** — headline "Engenharia de Crescimento para empresas que querem escalar com método, dados e IA", subheadline, dois CTAs (primário "Fazer Diagnóstico Gratuito" / secundário WhatsApp), badge de prova social, visual de dashboard/grid animado
3. **Faixa de dores** — "Você reconhece algum destes sintomas?" (6 cards com ícones: leads ruins, time comercial sem método, ferramentas desconectadas, sem dados, dependência do dono, marketing sem ROI)
4. **O que é a Aceleriq** — bloco institucional posicionando como engenharia de crescimento (não agência), com 4 pilares
5. **Método A.C.E.L.E.R.A** — sequência horizontal interativa, cada letra expande com descrição (Análise, Clareza, Estratégia, Lançamento, Execução, Resultado, Aceleração)
6. **Áreas de atuação** — grid de 8 cards (Diagnóstico, Estratégia, Tráfego, CRM, IA & Automação, Processos comerciais, Dados, Estruturação operacional)
7. **Para quem é** — duas colunas: "É para você se..." vs "Não é para você se..."
8. **Diagnóstico de Maturidade (Typeform-style)** — seção âncora destacada, ver detalhamento abaixo
9. **Resultados / Prova social** — 4 métricas animadas + 3 mini-cases (segmento, desafio, resultado)
10. **Depoimentos** — carrossel com 3-4 depoimentos
11. **Comparativo** — tabela "Agência comum vs Aceleriq" (8 linhas)
12. **Por que agora** — bloco de urgência sobre IA + janela de mercado
13. **FAQ** — accordion com 8 perguntas (preço, prazo, segmentos, garantia, diferença vs agência, como funciona o diagnóstico, atendimento, contrato)
14. **CTA final** — bloco full-width gradiente, "Pronto para acelerar?" + botão diagnóstico + WhatsApp
15. **Footer** — logo, tagline, navegação, contatos clicáveis (WhatsApp/e-mail/Instagram), copyright

## Diagnóstico Typeform-style (peça central)

Modal ou rota dedicada `/diagnostico` que abre em **fullscreen escuro premium**, uma pergunta por tela, com:

- **Barra de progresso** no topo + contador "Pergunta 3 de 12"
- **Transições** slide+fade entre perguntas (framer-motion)
- **Navegação**: Enter para avançar, setas/botão "Voltar", atalhos numéricos para múltipla escolha
- **Tipos de input**: múltipla escolha (cards clicáveis), escala 1-5 (botões grandes), texto curto, e-mail, telefone
- **Auto-advance** em escolhas únicas, com micro-delay de 300ms
- **Visual** "ferramenta inteligente": ícone animado da Aceleriq pulsando, hint contextual por pergunta

### Fluxo de perguntas (12 etapas)

1. Nome
2. E-mail corporativo
3. WhatsApp
4. Empresa + cargo
5. Segmento (escolha)
6. Faturamento mensal (faixas)
7. Tamanho do time comercial
8. Maturidade do processo comercial (escala 1-5)
9. Uso atual de tráfego pago (escolha)
10. Maturidade em CRM/dados (escala 1-5)
11. Uso atual de IA/automação (escolha)
12. Principal gargalo hoje (escolha) + campo livre opcional

### Tela de resultado

Após submit, calcula **score 0-100** ponderando perguntas 8-11 + faturamento, e classifica:

- **0-39 — Estágio Inicial**: "Sua operação precisa de fundação estratégica antes de escalar"
- **40-69 — Estágio Estruturação**: "Você tem base, mas falta método e integração"
- **70-100 — Estágio Aceleração**: "Pronto para escalar com IA e automação avançada"

Tela mostra: classificação, gráfico radar das 4 dimensões, 3 recomendações personalizadas, CTA grande "Agendar conversa estratégica" (WhatsApp pré-preenchido com nome e classificação) + opção de receber por e-mail.

## Backend (Lovable Cloud / Supabase)

Tabela `leads`:

- `id`, `created_at`
- `nome`, `email`, `whatsapp`, `empresa`, `cargo`
- `segmento`, `faturamento`, `tamanho_time`
- `maturidade_comercial`, `trafego_pago`, `maturidade_crm`, `uso_ia`, `gargalo_principal`, `observacao`
- `score` (int), `classificacao` (enum: inicial/estruturacao/aceleracao)
- `status` (enum: novo/contato_feito/qualificado/agendado/cliente/descartado, default `novo`)
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `referrer`, `user_agent`

RLS:

- INSERT público (anônimo) permitido — landing precisa gravar
- SELECT/UPDATE/DELETE apenas para usuários autenticados com role `admin` (tabela `user_roles` separada)

Server function valida payload com Zod antes de inserir, captura UTMs do `window.location.search` e referrer no client e envia junto.

## Responsividade & performance

- Mobile-first; breakpoints sm/md/lg/xl
- Header colapsa em menu hamburger; diagnóstico fullscreen mobile com botões grandes (touch targets 48px+)
- Lazy load de seções abaixo da dobra; imagens em WebP; sem libs pesadas
- Lighthouse alvo: 90+ em todas as categorias

## SEO & metadata

- Title, description, og:image, Twitter card no `__root.tsx`
- Schema.org Organization + FAQPage
- Favicon e apple-touch-icon

## Stack técnica

- TanStack Start (já instalado), Tailwind v4, shadcn/ui
- **framer-motion** para transições do Typeform e scroll animations
- **react-hook-form + zod** para validação
- **lucide-react** para ícones
- Supabase via Lovable Cloud (cliente browser para INSERT)
- Server function para envio + validação server-side

## Entregáveis

- Landing single-page em `/` com todas as 15 seções
- Rota `/diagnostico` com experiência Typeform fullscreen
- Tabela `leads` + `user_roles` + RLS configuradas
- Todos os CTAs e contatos clicáveis com `wa.me` / `mailto:` / Instagram
- Captura de UTMs e referrer automática