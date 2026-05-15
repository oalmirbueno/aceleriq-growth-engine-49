-- Garantir RLS habilitado (já está, mas idempotente)
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Limpa qualquer política antiga com o mesmo nome (idempotência)
DROP POLICY IF EXISTS "Public can read published posts" ON public.blog_posts;

-- Leitura pública somente de posts publicados.
-- Drafts/scheduled permanecem invisíveis ao cliente; o admin usa service role
-- (bypass RLS) para gerenciar todos os estados.
CREATE POLICY "Public can read published posts"
ON public.blog_posts
FOR SELECT
TO anon, authenticated
USING (status = 'published');