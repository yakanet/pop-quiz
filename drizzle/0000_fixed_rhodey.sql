CREATE TYPE "public"."question_type" AS ENUM('SINGLE', 'MULTIPLE', 'CURSOR');--> statement-breakpoint
CREATE TABLE "quiz_answer" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"quiz_item_id" integer NOT NULL,
	"answer" json NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quiz_question_item" (
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
	"state" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quiz_question" (
	"id" serial PRIMARY KEY NOT NULL,
	"quiz_poll_id" integer NOT NULL,
	"question_type" "question_type" NOT NULL,
	"question" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "quiz_answer" ADD CONSTRAINT "quiz_answer_quiz_item_id_quiz_question_item_id_fk" FOREIGN KEY ("quiz_item_id") REFERENCES "public"."quiz_question_item"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_question_item" ADD CONSTRAINT "quiz_question_item_quiz_id_quiz_question_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz_question"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_question" ADD CONSTRAINT "quiz_question_quiz_poll_id_quiz_pool_id_fk" FOREIGN KEY ("quiz_poll_id") REFERENCES "public"."quiz_pool"("id") ON DELETE no action ON UPDATE no action;