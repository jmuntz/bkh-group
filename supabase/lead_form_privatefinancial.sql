-- Run in Supabase SQL Editor or via migration tooling.
-- Table: backup / audit trail for website finance enquiries (paired with email via Resend).

create table if not exists public.lead_form_privatefinancial (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,

  loan_amount text,
  business_name text not null,
  loan_reason text not null,
  timeline text not null,
  referral_source text not null,

  accepted_terms boolean not null default false,

  -- Delivery audit (updated from /api/send after Resend attempt)
  email_sent_at timestamptz,
  email_delivery_error text,

  source text not null default 'web_lead_form',
  user_agent text,
  client_ip text
);

comment on table public.lead_form_privatefinancial is 'Finance lead enquiries from the marketing site form; mirrors email notifications.';

create index if not exists idx_lead_form_privatefinancial_created_at
  on public.lead_form_privatefinancial (created_at desc);

create index if not exists idx_lead_form_privatefinancial_email
  on public.lead_form_privatefinancial (email);

alter table public.lead_form_privatefinancial enable row level security;

-- Server API: SUPABASE_SECRET = Secret (sb_secret_*) under “Publishable and secret API keys”, or service_role JWT under “Legacy anon, service_role API keys”. NOT Publishable (sb_publishable_*) or anon JWT.
-- If you see "violates row-level security", the wrong key is almost always in .env.
--
-- Explicit policies for the service_role JWT (insert + update for email delivery fields):
drop policy if exists "lead_form_service_role_insert" on public.lead_form_privatefinancial;
drop policy if exists "lead_form_service_role_update" on public.lead_form_privatefinancial;

create policy "lead_form_service_role_insert"
  on public.lead_form_privatefinancial
  for insert
  to service_role
  with check (true);

create policy "lead_form_service_role_update"
  on public.lead_form_privatefinancial
  for update
  to service_role
  using (true)
  with check (true);

-- Optional read policy for staff (authenticated role) - customise if you use Supabase Auth for an admin app:
-- create policy "Staff read leads" on public.lead_form_privatefinancial
--   for select to authenticated using (true);
