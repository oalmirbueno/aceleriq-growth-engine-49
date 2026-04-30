
-- Tabela de leads capturados pelo Diagnóstico Gratuito
CREATE TABLE public.diagnostico_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  whatsapp text NOT NULL,
  empresa text NOT NULL,
  site_instagram text,
  faturamento_mensal text NOT NULL,
  principal_gargalo text NOT NULL,
  interesse_principal text NOT NULL,
  respostas jsonb NOT NULL DEFAULT '{}'::jsonb,
  score integer NOT NULL DEFAULT 0,
  classificacao text NOT NULL DEFAULT '',
  recomendacoes jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Validações leves
ALTER TABLE public.diagnostico_leads
  ADD CONSTRAINT diagnostico_leads_nome_len CHECK (char_length(nome) BETWEEN 1 AND 120),
  ADD CONSTRAINT diagnostico_leads_whatsapp_len CHECK (char_length(whatsapp) BETWEEN 8 AND 30),
  ADD CONSTRAINT diagnostico_leads_empresa_len CHECK (char_length(empresa) BETWEEN 1 AND 160),
  ADD CONSTRAINT diagnostico_leads_score_range CHECK (score BETWEEN 0 AND 100);

CREATE INDEX idx_diagnostico_leads_created_at ON public.diagnostico_leads(created_at DESC);

-- RLS
ALTER TABLE public.diagnostico_leads ENABLE ROW LEVEL SECURITY;

-- Qualquer visitante pode submeter (insert) um lead.
CREATE POLICY "Anyone can submit a diagnostic lead"
  ON public.diagnostico_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Leitura: ninguém via aplicação (apenas via service role / dashboard).
-- Sem update/delete pela aplicação.
