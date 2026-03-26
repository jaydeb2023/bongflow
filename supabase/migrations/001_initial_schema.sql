-- ============================================
-- BongoFlow AI — Complete Supabase Schema
-- Run: supabase db push or paste in SQL editor
-- ============================================

-- Enable extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm"; -- for full-text search

-- ============================================
-- USERS / BUSINESSES
-- ============================================
create table if not exists public.businesses (
  id uuid primary key default uuid_generate_v4(),
  owner_name text not null,
  business_name text not null,
  phone text unique not null,
  email text unique,
  business_type text, -- dukan, clinic, salon, coaching, real_estate, restaurant, other
  gstin text,
  address text,
  city text default 'Kolkata',
  language_pref text default 'bengali', -- bengali, hindi, english
  subscription_plan text default 'starter', -- starter, pro, team
  subscription_status text default 'trial', -- trial, active, expired
  subscription_expires_at timestamptz,
  razorpay_customer_id text,
  razorpay_subscription_id text,
  referral_code text unique default upper(substr(md5(random()::text), 1, 8)),
  referred_by uuid references public.businesses(id),
  whatsapp_connected boolean default false,
  aisensy_api_key text,
  total_referrals int default 0,
  free_months_earned int default 0,
  onboarded boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- TEAM MEMBERS
-- ============================================
create table if not exists public.team_members (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references public.businesses(id) on delete cascade,
  name text not null,
  phone text not null,
  email text,
  role text default 'agent', -- owner, manager, agent
  is_active boolean default true,
  permissions jsonb default '{"inbox": true, "pipeline": true, "reports": false, "settings": false}'::jsonb,
  supabase_user_id uuid,
  last_active_at timestamptz,
  created_at timestamptz default now()
);

-- ============================================
-- CONTACTS / LEADS
-- ============================================
create table if not exists public.contacts (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references public.businesses(id) on delete cascade,
  assigned_to uuid references public.team_members(id),
  whatsapp_number text not null,
  name text,
  business_name text,
  email text,
  city text,
  tags text[] default '{}',
  lead_score int default 0 check (lead_score >= 0 and lead_score <= 100),
  interest_level text default 'cold', -- hot, warm, cold
  pipeline_stage text default 'new', -- new, qualified, proposal, negotiation, won, lost
  potential_value numeric default 0,
  actual_value numeric default 0,
  source text default 'whatsapp', -- whatsapp, referral, walk_in, call, facebook
  notes text,
  last_message_at timestamptz,
  last_called_at timestamptz,
  follow_up_at timestamptz,
  total_messages int default 0,
  total_voice_notes int default 0,
  upi_pending_amount numeric default 0,
  is_blocked boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- MESSAGES (WhatsApp)
-- ============================================
create table if not exists public.messages (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references public.businesses(id) on delete cascade,
  contact_id uuid references public.contacts(id) on delete cascade,
  direction text not null, -- inbound, outbound
  message_type text default 'text', -- text, voice, image, document, template
  raw_text text,
  voice_transcript_bengali text,
  voice_transcript_english text,
  audio_url text,
  audio_duration_secs int,
  media_url text,
  intent_category text, -- price_inquiry, booking_request, complaint, follow_up, payment_reminder, general
  ai_lead_score int,
  ai_confidence int,
  ai_reply_suggested text,
  ai_reply_sent boolean default false,
  ai_next_action text,
  whatsapp_message_id text unique,
  template_name text,
  is_read boolean default false,
  sent_by uuid references public.team_members(id),
  created_at timestamptz default now()
);

-- ============================================
-- DEALS / PIPELINE
-- ============================================
create table if not exists public.deals (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references public.businesses(id) on delete cascade,
  contact_id uuid references public.contacts(id) on delete cascade,
  assigned_to uuid references public.team_members(id),
  title text not null,
  stage text default 'new', -- new, interested, visit, negotiation, won, lost
  value numeric default 0,
  currency text default 'INR',
  probability int default 50,
  expected_close_date date,
  actual_close_date date,
  lost_reason text,
  notes text,
  next_action text,
  next_action_date timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- CALLS (Voice Calling Agent + Missed Calls)
-- ============================================
create table if not exists public.calls (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references public.businesses(id) on delete cascade,
  contact_id uuid references public.contacts(id),
  direction text, -- inbound, outbound
  call_type text, -- ai_agent, manual, missed
  status text, -- initiated, ringing, in_progress, completed, missed, failed, no_answer
  from_number text,
  to_number text,
  duration_secs int default 0,
  recording_url text,
  transcript text,
  transcript_bengali text,
  ai_summary text,
  ai_lead_score_after int,
  twilio_call_sid text unique,
  missed_call_auto_replied boolean default false,
  missed_call_reply_text text,
  created_at timestamptz default now(),
  ended_at timestamptz
);

-- ============================================
-- UPI TRANSACTIONS / FOLLOW-UPS
-- ============================================
create table if not exists public.upi_transactions (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references public.businesses(id) on delete cascade,
  contact_id uuid references public.contacts(id),
  deal_id uuid references public.deals(id),
  razorpay_payment_link_id text,
  razorpay_payment_id text,
  razorpay_order_id text,
  amount numeric not null,
  currency text default 'INR',
  description text,
  payment_link_url text,
  status text default 'pending', -- pending, sent, paid, expired, failed
  gst_rate numeric default 18,
  gst_amount numeric,
  invoice_number text unique,
  invoice_url text,
  reminder_count int default 0,
  last_reminder_at timestamptz,
  next_reminder_at timestamptz,
  auto_followup_enabled boolean default true,
  paid_at timestamptz,
  created_at timestamptz default now()
);

-- ============================================
-- VOICE TEMPLATES
-- ============================================
create table if not exists public.voice_templates (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references public.businesses(id) on delete cascade,
  created_by uuid references public.team_members(id),
  name text not null,
  category text, -- greeting, follow_up, payment_reminder, offer, booking_confirm, appointment_reminder
  text_bengali text,
  text_english text,
  audio_url text, -- pre-recorded TTS
  variables text[] default '{}', -- e.g. {customer_name}, {amount}, {date}
  is_active boolean default true,
  usage_count int default 0,
  whatsapp_template_id text, -- approved WA template name
  created_at timestamptz default now()
);

-- ============================================
-- WHATSAPP GROUP ANALYTICS
-- ============================================
create table if not exists public.whatsapp_groups (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references public.businesses(id) on delete cascade,
  group_name text not null,
  group_id text unique, -- WA group JID
  member_count int default 0,
  description text,
  is_broadcast boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.group_messages (
  id uuid primary key default uuid_generate_v4(),
  group_id uuid references public.whatsapp_groups(id) on delete cascade,
  sender_number text,
  sender_name text,
  message_text text,
  message_type text default 'text',
  engagement_score int default 0, -- AI-computed
  reply_count int default 0,
  reaction_count int default 0,
  created_at timestamptz default now()
);

-- ============================================
-- REFERRALS
-- ============================================
create table if not exists public.referrals (
  id uuid primary key default uuid_generate_v4(),
  referrer_id uuid references public.businesses(id) on delete cascade,
  referred_id uuid references public.businesses(id) on delete cascade,
  referral_code text,
  status text default 'pending', -- pending, signed_up, subscribed, rewarded
  reward_type text default 'free_month',
  reward_given boolean default false,
  reward_given_at timestamptz,
  created_at timestamptz default now(),
  unique(referrer_id, referred_id)
);

-- ============================================
-- AI LOGS (for improvement)
-- ============================================
create table if not exists public.ai_logs (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references public.businesses(id) on delete cascade,
  contact_id uuid references public.contacts(id),
  log_type text, -- voice_transcription, lead_scoring, reply_generation, call_summary
  input_text text,
  output_json jsonb,
  ai_model text,
  tokens_used int,
  latency_ms int,
  user_feedback int, -- 1=good, -1=bad, 0=no feedback
  created_at timestamptz default now()
);

-- ============================================
-- NOTIFICATIONS
-- ============================================
create table if not exists public.notifications (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references public.businesses(id) on delete cascade,
  team_member_id uuid references public.team_members(id),
  type text, -- new_lead, hot_lead, payment_received, missed_call, follow_up_due
  title text,
  body text,
  data jsonb,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
alter table public.businesses enable row level security;
alter table public.contacts enable row level security;
alter table public.messages enable row level security;
alter table public.deals enable row level security;
alter table public.calls enable row level security;
alter table public.upi_transactions enable row level security;
alter table public.team_members enable row level security;

-- Basic RLS policies (businesses can only see their own data)
create policy "businesses_own_data" on public.businesses
  for all using (auth.uid() = id or id in (
    select business_id from public.team_members where supabase_user_id = auth.uid()
  ));

create policy "contacts_own_business" on public.contacts
  for all using (business_id in (
    select id from public.businesses where id = business_id
  ));

-- ============================================
-- INDEXES for performance
-- ============================================
create index if not exists idx_contacts_business on public.contacts(business_id);
create index if not exists idx_contacts_score on public.contacts(lead_score desc);
create index if not exists idx_contacts_wa on public.contacts(whatsapp_number);
create index if not exists idx_messages_contact on public.messages(contact_id);
create index if not exists idx_messages_created on public.messages(created_at desc);
create index if not exists idx_calls_business on public.calls(business_id);
create index if not exists idx_upi_status on public.upi_transactions(status);
create index if not exists idx_deals_stage on public.deals(stage);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_contact_update before update on public.contacts
  for each row execute function public.handle_updated_at();
create trigger on_deal_update before update on public.deals
  for each row execute function public.handle_updated_at();
create trigger on_business_update before update on public.businesses
  for each row execute function public.handle_updated_at();

-- Auto-generate invoice number
create or replace function public.generate_invoice_number()
returns trigger as $$
begin
  if new.invoice_number is null then
    new.invoice_number = 'INV-' || to_char(now(), 'YYYYMM') || '-' || lpad(
      (select count(*)::text from public.upi_transactions where business_id = new.business_id), 4, '0'
    );
  end if;
  return new;
end;
$$ language plpgsql;

create trigger generate_invoice before insert on public.upi_transactions
  for each row execute function public.generate_invoice_number();
