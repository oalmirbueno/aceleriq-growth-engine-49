CREATE TABLE IF NOT EXISTS public.indexation_status (
  url text PRIMARY KEY,
  source text NOT NULL DEFAULT 'blog_post',
  published_at timestamptz,
  first_seen_at timestamptz NOT NULL DEFAULT now(),
  last_checked_at timestamptz,
  verdict text,
  coverage_state text,
  indexing_state text,
  page_fetch_state text,
  robots_txt_state text,
  last_crawl_time timestamptz,
  google_canonical text,
  user_canonical text,
  inspection_url text,
  alert_active boolean NOT NULL DEFAULT false,
  alert_since timestamptz,
  consecutive_failures integer NOT NULL DEFAULT 0,
  last_error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS indexation_status_alert_idx
  ON public.indexation_status (alert_active, alert_since DESC)
  WHERE alert_active = true;

CREATE INDEX IF NOT EXISTS indexation_status_published_idx
  ON public.indexation_status (published_at DESC NULLS LAST);

DROP TRIGGER IF EXISTS trg_indexation_status_set_updated_at ON public.indexation_status;
CREATE TRIGGER trg_indexation_status_set_updated_at
BEFORE UPDATE ON public.indexation_status
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.indexation_status ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public read indexation status" ON public.indexation_status;
CREATE POLICY "public read indexation status"
ON public.indexation_status
FOR SELECT
USING (true);

-- Schedule daily indexation check (08:30 UTC = 05:30 BRT)
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

DO $$
BEGIN
  PERFORM cron.unschedule('check-indexation-daily');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

SELECT cron.schedule(
  'check-indexation-daily',
  '30 8 * * *',
  $$
  SELECT net.http_post(
    url := 'https://project--f5e56613-d905-400e-a8e2-80206adf0dda.lovable.app/api/public/hooks/check-indexation',
    headers := '{"Content-Type": "application/json", "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnYXpyY2ZhaGt4eHd2d3plY2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1MDQxNjAsImV4cCI6MjA5MzA4MDE2MH0._kqx9ts0P-_r_eXy0Lr4vwIjC8qDlSlgqrz69jqJbis"}'::jsonb,
    body := '{}'::jsonb
  ) AS request_id;
  $$
);