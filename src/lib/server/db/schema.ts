// import { boolean, integer, pgEnum, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
//
// export const questionType = pgEnum('question_type', ['SINGLE', 'MULTIPLE', 'CURSOR']);
// export const quizPool = pgTable('quiz_pool', {
// 	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
// 	id: serial('id').primaryKey(),
// 	name: varchar().default('50'),
// 	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
// 		.defaultNow()
// 		.notNull(),
// 	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
// 		.$onUpdate(() => new Date())
// 		.notNull()
// 		.defaultNow()
// });
//
// export const quizState = pgTable('quiz_state', {
// 	id: serial('id').primaryKey(),
// 	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
// 		.defaultNow()
// 		.notNull(),
// 	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
// 		.$onUpdate(() => new Date())
// 		.notNull()
// 		.defaultNow(),
// 	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
// 	quizPoolId: integer('quiz_pool_id').notNull().references(() => quizPool.id),
// 	state: varchar().notNull()
// });
//
// export const quiz = pgTable('quiz', {
// 	id: serial('id').primaryKey(),
// 	quizPollId: integer('quiz_poll_id').notNull().references(() => quizPool.id),
// 	questionType: questionType('question_type').notNull(),
// 	question: varchar().notNull(),
// 	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
// 		.defaultNow()
// 		.notNull(),
// 	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
// 		.$onUpdate(() => new Date())
// 		.notNull()
// 		.defaultNow()
// });
//
// export const quizItem = pgTable('quiz_item', {
// 	id: serial('id').primaryKey(),
// 	title: varchar().notNull(),
// 	answer: boolean().default(false).notNull(),
// 	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
// 		.defaultNow()
// 		.notNull(),
// 	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
// 		.$onUpdate(() => new Date())
// 		.notNull()
// 		.defaultNow(),
// 	quizId: integer('quiz_id').notNull()
// 		.references(() => quiz.id)
// });
//
// export type QuizState = 'PENDING' | `QUESTION_${string}` | 'FINISHED'