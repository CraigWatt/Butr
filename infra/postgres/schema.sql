create table if not exists users (
  id text primary key,
  email text not null unique,
  display_name text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists waitlist_signups (
  id text primary key,
  email text not null,
  display_name text null,
  accepted_terms_at timestamptz not null,
  accepted_privacy_at timestamptz not null,
  accepted_isa_scope_at timestamptz not null,
  accepted_control_layer_ack_at timestamptz not null,
  marketing_opt_in boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists trading212_connections (
  user_id text primary key references users(id),
  account_type text not null,
  encrypted_api_key text not null,
  encrypted_api_secret text not null,
  key_version text not null,
  connected_at timestamptz not null default now(),
  revoked_at timestamptz null,
  updated_at timestamptz not null default now()
);

create table if not exists trade_previews (
  id text primary key,
  trade_intent_id text not null,
  account_id text not null,
  mode text not null,
  broker text not null,
  ticker text not null,
  side text not null,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists approval_requests (
  id text primary key,
  trade_preview_id text not null references trade_previews(id),
  status text not null,
  requested_at timestamptz not null,
  decided_at timestamptz null,
  decided_by text null,
  payload jsonb not null
);

create table if not exists execution_tickets (
  id text primary key,
  approval_request_id text not null references approval_requests(id),
  trade_preview_id text not null references trade_previews(id),
  mode text not null,
  status text not null,
  summary text not null,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists execution_results (
  id text primary key,
  approval_request_id text not null references approval_requests(id),
  status text not null,
  broker_order_id text null,
  executed_quantity numeric null,
  executed_notional jsonb null,
  submitted_at timestamptz not null,
  finished_at timestamptz null,
  error_message text null,
  payload jsonb not null
);

create table if not exists audit_events (
  id text primary key,
  type text not null,
  message text not null,
  created_at timestamptz not null
);

create index if not exists idx_trade_previews_trade_intent_id on trade_previews(trade_intent_id);
create index if not exists idx_approval_requests_trade_preview_id on approval_requests(trade_preview_id);
create index if not exists idx_execution_tickets_approval_request_id on execution_tickets(approval_request_id);
create index if not exists idx_execution_results_approval_request_id on execution_results(approval_request_id);
create index if not exists idx_audit_events_created_at on audit_events(created_at desc);
