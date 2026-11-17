create table if not exists webrtc_peers (
  room text not null,
  peer_id text not null,
  name text not null default '',
  last_seen timestamptz not null default now(),
  primary key (room, peer_id)
);

create table if not exists webrtc_signals (
  id bigserial primary key,
  room text not null,
  to_peer text not null,
  from_peer text not null,
  kind text not null,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists webrtc_signals_inbox
  on webrtc_signals (room, to_peer, id);

create table if not exists webrtc_room (
  room text primary key,
  host_key text not null,
  revision integer not null,
  state jsonb not null,
  seats jsonb not null,
  full_peers jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists webrtc_actions (
  id bigserial primary key,
  room text not null,
  from_peer text not null,
  client_id text not null,
  action jsonb not null,
  created_at timestamptz not null default now()
);

create unique index if not exists webrtc_actions_client
  on webrtc_actions (room, client_id);
