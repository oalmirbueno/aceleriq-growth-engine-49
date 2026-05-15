create extension if not exists pg_cron with schema extensions;
create extension if not exists pg_net with schema extensions;

-- Remove versão anterior (idempotente)
do $$
begin
  perform cron.unschedule('resubmit-sitemap-daily');
exception when others then null;
end $$;

select cron.schedule(
  'resubmit-sitemap-daily',
  '0 8 * * *',
  $$
  select net.http_post(
    url := 'https://project--f5e56613-d905-400e-a8e2-80206adf0dda.lovable.app/api/public/hooks/resubmit-sitemap',
    headers := '{"Content-Type":"application/json","apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnYXpyY2ZhaGt4eHd2d3plY2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1MDQxNjAsImV4cCI6MjA5MzA4MDE2MH0._kqx9ts0P-_r_eXy0Lr4vwIjC8qDlSlgqrz69jqJbis"}'::jsonb,
    body := '{}'::jsonb
  );
  $$
);