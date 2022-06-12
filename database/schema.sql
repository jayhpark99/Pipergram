set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"fullName" TEXT NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	"profilePicture" TEXT NOT NULL,
	"createdAt" timestamp with time zone NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "public"."posts" (
	"photoId" serial NOT NULL,
	"userId" int NOT NULL,
	"caption" TEXT NOT NULL,
	"postPicture" TEXT NOT NULL,
	"location" TEXT,
	"createdAt" timestamp with time zone NOT NULL default now(),
	CONSTRAINT "posts_pk" PRIMARY KEY ("photoId")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "public"."likes" (
	"photoId" int NOT NULL,
	"userId" int NOT NULL
) WITH (
  OIDS=FALSE
);


ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "likes" ADD CONSTRAINT "likes_fk0" FOREIGN KEY ("photoId") REFERENCES "posts"("photoId");
ALTER TABLE "likes" ADD CONSTRAINT "likes_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
