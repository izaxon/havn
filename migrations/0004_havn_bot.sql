create table if not exists havn_seat (
  room text not null,
  seat integer not null,
  token text not null,
  created_at timestamptz not null default now(),
  primary key (room, seat),
  unique (token)
);

create table if not exists havn_rate (
  token text not null,
  bucket bigint not null,
  hits integer not null,
  primary key (token, bucket)
);
