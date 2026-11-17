alter table webrtc_peers add column if not exists joined_at timestamptz not null default now();

alter table webrtc_room add column if not exists host_peer text not null default '';
