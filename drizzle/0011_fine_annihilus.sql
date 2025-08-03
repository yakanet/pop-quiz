ALTER TABLE "quiz_answer" DROP CONSTRAINT "quiz_answer_quiz_item_id_quiz_question_item_id_fk";
--> statement-breakpoint
ALTER TABLE "quiz_question_item" DROP CONSTRAINT "quiz_question_item_quiz_id_quiz_question_id_fk";
--> statement-breakpoint
ALTER TABLE "quiz_answer" ADD CONSTRAINT "quiz_answer_quiz_item_id_quiz_question_item_id_fk" FOREIGN KEY ("quiz_item_id") REFERENCES "public"."quiz_question_item"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_question_item" ADD CONSTRAINT "quiz_question_item_quiz_id_quiz_question_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz_question"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_answer" DROP COLUMN "answer";