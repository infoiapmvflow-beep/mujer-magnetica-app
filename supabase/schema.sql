-- Ejecutar desde Supabase SQL Editor una sola vez en proyecto nuevo.
create table if not exists public.user_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{"name":"","entries":{},"complete":[]}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.user_progress enable row level security;
drop policy if exists "read own progress" on public.user_progress;
create policy "read own progress" on public.user_progress for select to authenticated using (user_id=auth.uid());
drop policy if exists "insert own progress" on public.user_progress;
create policy "insert own progress" on public.user_progress for insert to authenticated with check (user_id=auth.uid());
drop policy if exists "update own progress" on public.user_progress;
create policy "update own progress" on public.user_progress for update to authenticated using (user_id=auth.uid()) with check (user_id=auth.uid());

create table if not exists public.entitlements (
 email text primary key check (email=lower(trim(email))),
 active boolean not null default false,
 last_event_at timestamptz not null,
 updated_at timestamptz not null default now()
);
alter table public.entitlements enable row level security;
drop policy if exists "buyer reads own entitlement" on public.entitlements;
create policy "buyer reads own entitlement" on public.entitlements for select to authenticated using (email=lower(auth.jwt()->>'email'));

create table if not exists public.hotmart_events (
 event_id text primary key,
 email text not null,
 product_id text not null,
 event_type text not null,
 occurred_at timestamptz not null,
 received_at timestamptz not null default now()
);
alter table public.hotmart_events enable row level security;
-- Ninguna política de lectura/escritura pública para eventos.

create or replace function public.apply_hotmart_event(
 event_id text, product_id text, email text, active boolean, occurred_at timestamptz, event_type text
) returns void language plpgsql security definer set search_path=public as $$
begin
  if event_id is null or length(event_id)<1 or email is null or position('@' in email)=0 or occurred_at is null then
    raise exception 'Invalid webhook';
  end if;
  insert into public.hotmart_events(event_id,email,product_id,event_type,occurred_at)
  values(event_id,lower(trim(email)),product_id,event_type,occurred_at)
  on conflict (event_id) do nothing;
  if not found then return; end if;
  insert into public.entitlements(email,active,last_event_at,updated_at)
  values(lower(trim(email)),active,occurred_at,now())
  on conflict (email) do update set
    active=excluded.active,last_event_at=excluded.last_event_at,updated_at=now()
  where public.entitlements.last_event_at <= excluded.last_event_at;
end;
$$;
revoke all on function public.apply_hotmart_event(text,text,text,boolean,timestamptz,text) from public, anon, authenticated;
grant execute on function public.apply_hotmart_event(text,text,text,boolean,timestamptz,text) to service_role;

-- Subir los MP3 a un bucket PRIVADO llamado premium-audios (crear en Storage primero).
-- Esta política permite firmar la URL SOLAMENTE a compradoras con acceso activo.
drop policy if exists "active buyers listen" on storage.objects;
create policy "active buyers listen" on storage.objects for select to authenticated
using (bucket_id='premium-audios' and exists (
 select 1 from public.entitlements e
 where e.email=lower(auth.jwt()->>'email') and e.active=true
));
