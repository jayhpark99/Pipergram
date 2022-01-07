set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "public"."users" (
  "userId"         serial,
  "fullName"       text           not null,
  "username"       text           not null,
  "hashedPassword" text           not null,
  "profilePicture" text           not null,
  "createdAt"      timestamptz(6) not null default now(),
  primary key ("userId"),
  unique ("username")
);

create table "public"."posts" (
  "photoId"        serial,
  "userId"         serial         not null,
  "url"            text           not null,
  "location"       text           not null,
  "createdAt"      timestamptz(6) not null default now(),
  primary key ("photoId")
);
