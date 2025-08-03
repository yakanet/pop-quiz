ALTER TABLE "quiz_pool" ALTER COLUMN "name" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "quiz_pool" ALTER COLUMN "name" SET NOT NULL;