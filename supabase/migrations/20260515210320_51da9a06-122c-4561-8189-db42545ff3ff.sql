
-- Enums
CREATE TYPE public.backlink_type AS ENUM ('parceria', 'guest_post', 'publicacao', 'mencao', 'diretorio');
CREATE TYPE public.backlink_status AS ENUM ('prospect', 'contatado', 'negociando', 'aceito', 'publicado', 'recusado', 'arquivado');
CREATE TYPE public.backlink_priority AS ENUM ('alta', 'media', 'baixa');

-- Targets
CREATE TABLE public.backlink_targets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  domain TEXT NOT NULL,
  domain_authority INTEGER CHECK (domain_authority >= 0 AND domain_authority <= 100),
  type public.backlink_type NOT NULL DEFAULT 'parceria',
  status public.backlink_status NOT NULL DEFAULT 'prospect',
  priority public.backlink_priority NOT NULL DEFAULT 'media',
  contact_name TEXT,
  contact_email TEXT,
  contact_url TEXT,
  pitch_angle TEXT,
  target_blog_slug TEXT,
  proposed_anchor TEXT,
  published_url TEXT,
  published_anchor TEXT,
  dofollow BOOLEAN NOT NULL DEFAULT true,
  value_estimated_brl NUMERIC(10,2),
  notes TEXT,
  next_action_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_backlink_targets_status ON public.backlink_targets(status);
CREATE INDEX idx_backlink_targets_published_at ON public.backlink_targets(published_at DESC) WHERE published_at IS NOT NULL;
CREATE INDEX idx_backlink_targets_next_action ON public.backlink_targets(next_action_at) WHERE next_action_at IS NOT NULL;

-- Goals
CREATE TABLE public.backlink_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month DATE NOT NULL UNIQUE,
  target_count INTEGER NOT NULL DEFAULT 0,
  target_avg_da INTEGER NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- updated_at trigger function (idempotent)
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER backlink_targets_updated_at
  BEFORE UPDATE ON public.backlink_targets
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER backlink_goals_updated_at
  BEFORE UPDATE ON public.backlink_goals
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Auto-set published_at when status flips to 'publicado'
CREATE OR REPLACE FUNCTION public.backlink_set_published_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.status = 'publicado' AND OLD.status IS DISTINCT FROM 'publicado' AND NEW.published_at IS NULL THEN
    NEW.published_at = now();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER backlink_targets_set_published_at
  BEFORE UPDATE ON public.backlink_targets
  FOR EACH ROW EXECUTE FUNCTION public.backlink_set_published_at();

-- RLS: enable, no public policies — all access via supabaseAdmin (service role bypasses RLS)
ALTER TABLE public.backlink_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.backlink_goals ENABLE ROW LEVEL SECURITY;
