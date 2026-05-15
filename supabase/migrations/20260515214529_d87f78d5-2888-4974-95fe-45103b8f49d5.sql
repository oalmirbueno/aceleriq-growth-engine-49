-- Garante extensões necessárias
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Limpa job anterior se existir (idempotência)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'warm-cache-daily') THEN
    PERFORM cron.unschedule('warm-cache-daily');
  END IF;
END $$;

-- Aquece /sitemap.xml e /blog diariamente às 06:00 UTC (03:00 Brasília)
SELECT cron.schedule(
  'warm-cache-daily',
  '0 6 * * *',
  $$
  SELECT net.http_post(
    url := 'https://project--f5e56613-d905-400e-a8e2-80206adf0dda.lovable.app/api/public/hooks/warm-cache',
    headers := '{"Content-Type": "application/json", "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnYXpyY2ZhaGt4eHd2d3plY2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1MDQxNjAsImV4cCI6MjA5MzA4MDE2MH0._kqx9ts0P-_r_eXy0Lr4vwIjC8qDlSlgqrz69jqJbis"}'::jsonb,
    body := '{}'::jsonb
  ) AS request_id;
  $$
);