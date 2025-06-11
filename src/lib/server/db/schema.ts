import { boolean, integer, json, pgEnum, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const questionType = pgEnum('question_type', ['SINGLE', 'MULTIPLE', 'CURSOR']);
export const quizPool = pgTable('quiz_pool', {
	id: serial().primaryKey(),
	name: varchar().default('50'),
	state: varchar().notNull(),
	createdAt: timestamp({ withTimezone: true, mode: 'date' })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp({ withTimezone: true, mode: 'date' })
		.$onUpdate(() => new Date())
		.notNull()
		.defaultNow()
});

export const quizQuestion = pgTable('quiz_question', {
	id: serial().primaryKey(),
	quizPollId: integer().notNull().references(() => quizPool.id),
	questionType: questionType().notNull(),
	question: varchar().notNull(),
	createdAt: timestamp({ withTimezone: true, mode: 'date' })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp({ withTimezone: true, mode: 'date' })
		.$onUpdate(() => new Date())
		.notNull()
		.defaultNow()
});

export const quizItem = pgTable('quiz_question_item', {
	id: serial().primaryKey(),
	title: varchar().notNull(),
	answer: boolean().default(false).notNull(),
	createdAt: timestamp({ withTimezone: true, mode: 'date' })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp({ withTimezone: true, mode: 'date' })
		.$onUpdate(() => new Date())
		.notNull()
		.defaultNow(),
	quizId: integer().notNull()
		.references(() => quizQuestion.id)
});

export const quizAnswer = pgTable('quiz_answer', {
	id: serial().primaryKey(),
	userId: varchar().notNull(),
	quizItemId: integer().notNull()
		.references(() => quizItem.id),
	answer: json().notNull(),
	createdAt: timestamp({ withTimezone: true, mode: 'date' })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp({ withTimezone: true, mode: 'date' })
		.$onUpdate(() => new Date())
		.notNull()
		.defaultNow()
});

export type QuizState = 'PENDING' | `QUESTION_${string}` | 'FINISHED'