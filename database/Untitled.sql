CREATE TABLE "departments" (
  "id" integer PRIMARY KEY,
  "title" varchar,
  "created_at" timestamp
);

CREATE TABLE "categories" (
  "id" integer PRIMARY KEY,
  "department_id" integer,
  "title" varchar,
  "created_at" timestamp
);

CREATE TABLE "questions" (
  "id" integer PRIMARY KEY,
  "category_id" integer,
  "body" text,
  "code" varchar,
  "created_at" timestamp
);

CREATE TABLE "answers" (
  "id" integer PRIMARY KEY,
  "body" text,
  "question_id" integer,
  "correct" integer,
  "created_at" timestamp
);

COMMENT ON COLUMN "questions"."body" IS 'Content of the post';

COMMENT ON COLUMN "answers"."body" IS 'Content of the post';

ALTER TABLE "answers" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("id");

ALTER TABLE "questions" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "categories" ADD FOREIGN KEY ("department_id") REFERENCES "departments" ("id");
