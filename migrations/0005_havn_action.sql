create table if not exists havn_action (
  token text not null,
  client_id text not null,
  room text not null,
  revision integer not null,
  created_at timestamptz not null default now(),
  primary key (token, client_id)
);
