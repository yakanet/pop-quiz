CREATE TYPE "public"."question_type" AS ENUM('SINGLE', 'MULTIPLE', 'CURSOR');--> statement-breakpoint
CREATE TABLE "quiz" (
	"id" serial PRIMARY KEY NOT NULL,
	"quiz_poll_id" integer NOT NULL,
	"question_type" "question_type" NOT NULL,
	"question" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quiz_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"answer" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"quiz_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quiz_pool" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar DEFAULT '50',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quiz_state" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"quiz_pool_id" integer NOT NULL,
	"state" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_quiz_poll_id_quiz_pool_id_fk" FOREIGN KEY ("quiz_poll_id") REFERENCES "public"."quiz_pool"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_item" ADD CONSTRAINT "quiz_item_quiz_id_quiz_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_state" ADD CONSTRAINT "quiz_state_quiz_pool_id_quiz_pool_id_fk" FOREIGN KEY ("quiz_pool_id") REFERENCES "public"."quiz_pool"("id") ON DELETE no action ON UPDATE no action;