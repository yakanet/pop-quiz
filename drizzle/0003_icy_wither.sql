CREATE TABLE "quiz_user" (
	"user_id" varchar PRIMARY KEY NOT NULL,
	"quiz_poll_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "quiz_user" ADD CONSTRAINT "quiz_user_quiz_poll_id_quiz_pool_id_fk" FOREIGN KEY ("quiz_poll_id") REFERENCES "public"."quiz_pool"("id") ON DELETE no action ON UPDATE no action;