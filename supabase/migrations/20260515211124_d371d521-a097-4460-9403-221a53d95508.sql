ALTER TABLE public.diagnostico_leads
  ADD COLUMN IF NOT EXISTS origem text;

CREATE INDEX IF NOT EXISTS idx_diagnostico_leads_origem
  ON public.diagnostico_leads (origem);

CREATE INDEX IF NOT EXISTS idx_diagnostico_leads_created_at
  ON public.diagnostico_leads (created_at DESC);