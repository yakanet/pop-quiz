CREATE TABLE "admin_session" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "admin_user" (
	"id" varchar PRIMARY KEY NOT NULL,
	"enabled" boolean DEFAULT false NOT NULL,
	"username" varchar NOT NULL,
	"password_hash" varchar NOT NULL,
	CONSTRAINT "admin_user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "admin_session" ADD CONSTRAINT "admin_session_user_id_admin_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."admin_user"("id") ON DELETE no action ON UPDATE no action;