CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'weekly-post-publish') THEN
    PERFORM cron.unschedule('weekly-post-publish');
  END IF;
END $$;

SELECT cron.schedule(
  'weekly-post-publish',
  '0 9 * * 2',
  $$
  SELECT net.http_post(
    url := 'https://project--f5e56613-d905-400e-a8e2-80206adf0dda.lovable.app/api/public/hooks/weekly-post',
    headers := '{"Content-Type": "application/json", "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnYXpyY2ZhaGt4eHd2d3plY2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1MDQxNjAsImV4cCI6MjA5MzA4MDE2MH0._kqx9ts0P-_r_eXy0Lr4vwIjC8qDlSlgqrz69jqJbis"}'::jsonb,
    body := '{}'::jsonb
  ) AS request_id;
  $$
);