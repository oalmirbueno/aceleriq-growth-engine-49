-- Enum de status da pauta
DO $$ BEGIN
  CREATE TYPE public.topic_queue_status AS ENUM ('pending', 'generating', 'published', 'skipped', 'failed');
EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS public.blog_topic_queue (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  focus_keyword text NOT NULL,
  category text NOT NULL DEFAULT 'crescimento',
  angle text NOT NULL DEFAULT '',
  priority integer NOT NULL DEFAULT 100,
  status public.topic_queue_status NOT NULL DEFAULT 'pending',
  scheduled_for timestamp with time zone,
  generated_post_id uuid,
  last_error text,
  attempts integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS blog_topic_queue_status_priority_idx
  ON public.blog_topic_queue (status, priority ASC, created_at ASC);

CREATE TRIGGER blog_topic_queue_set_updated_at
  BEFORE UPDATE ON public.blog_topic_queue
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.blog_topic_queue ENABLE ROW LEVEL SECURITY;
-- Sem policies → apenas service role acessa. Admin UI passa pelo backend.