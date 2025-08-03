ALTER TABLE "quiz_pool" RENAME TO "quiz_state";--> statement-breakpoint
ALTER TABLE "quiz_user" DROP CONSTRAINT "quiz_user_user_id_quizPollId_unique";--> statement-breakpoint
ALTER TABLE "quiz_question" DROP CONSTRAINT "quiz_question_quiz_poll_id_quiz_pool_id_fk";
--> statement-breakpoint
ALTER TABLE "quiz_user" DROP CONSTRAINT "quiz_user_quiz_poll_id_quiz_pool_id_fk";
--> statement-breakpoint
ALTER TABLE "quiz_state" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "quiz_question" DROP COLUMN "quiz_poll_id";--> statement-breakpoint
ALTER TABLE "quiz_user" DROP COLUMN "quiz_poll_id";