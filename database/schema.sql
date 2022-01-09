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



CREATE TABLE "public"."followers" (
	"followedId" int NOT NULL,
	"followingId" int NOT NULL
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



CREATE TABLE "public"."comments" (
	"commentId" serial NOT NULL,
	"userId" int NOT NULL,
	"createdAt" timestamp with time zone NOT NULL default now(),
	"photoId" int NOT NULL,
	"content" TEXT NOT NULL,
	CONSTRAINT "comments_pk" PRIMARY KEY ("commentId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."likes" (
	"photoId" int NOT NULL,
	"userId" int NOT NULL
) WITH (
  OIDS=FALSE
);




ALTER TABLE "followers" ADD CONSTRAINT "followers_fk0" FOREIGN KEY ("followedId") REFERENCES "users"("userId");
ALTER TABLE "followers" ADD CONSTRAINT "followers_fk1" FOREIGN KEY ("followingId") REFERENCES "users"("userId");

ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("photoId") REFERENCES "posts"("photoId");

ALTER TABLE "likes" ADD CONSTRAINT "likes_fk0" FOREIGN KEY ("photoId") REFERENCES "posts"("photoId");
ALTER TABLE "likes" ADD CONSTRAINT "likes_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
