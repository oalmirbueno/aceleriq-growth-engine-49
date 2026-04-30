create table if not exists public.layout_overrides (
  id text primary key,
  x double precision not null default 0,
  y double precision not null default 0,
  scale double precision not null default 1,
  rotation double precision not null default 0,
  opacity double precision not null default 1,
  z_index integer not null default 0,
  width double precision,
  height double precision,
  updated_at timestamptz not null default now()
);

alter table public.layout_overrides enable row level security;

create policy "public read layout overrides"
  on public.layout_overrides for select
  using (true);

create policy "public insert layout overrides"
  on public.layout_overrides for insert
  with check (true);

create policy "public update layout overrides"
  on public.layout_overrides for update
  using (true) with check (true);

create policy "public delete layout overrides"
  on public.layout_overrides for delete
  using (true);

alter publication supabase_realtime add table public.layout_overrides;