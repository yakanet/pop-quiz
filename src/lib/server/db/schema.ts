import {
  boolean,
  integer,
  json,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  unique,
  varchar,
} from 'drizzle-orm/pg-core';

export const questionType = pgEnum('question_type', ['SINGLE', 'MULTIPLE', 'CURSOR']);
export const quizPool = pgTable('quiz_pool', {
  id: serial().primaryKey(),
  name: varchar().default('50'),
  state: varchar().notNull(),
  createdAt: timestamp({ withTimezone: true, mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true, mode: 'date' })
    .$onUpdate(() => new Date())
    .notNull()
    .defaultNow(),
});

export const quizQuestion = pgTable('quiz_question', {
  id: serial().primaryKey(),
  quizPollId: integer()
    .notNull()
    .references(() => quizPool.id),
  questionType: questionType().notNull(),
  question: varchar().notNull(),
  createdAt: timestamp({ withTimezone: true, mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true, mode: 'date' })
    .$onUpdate(() => new Date())
    .notNull()
    .defaultNow(),
});

export const quizItem = pgTable('quiz_question_item', {
  id: serial().primaryKey(),
  title: varchar().notNull(),
  answer: boolean().default(false).notNull(),
  createdAt: timestamp({ withTimezone: true, mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true, mode: 'date' })
    .$onUpdate(() => new Date())
    .notNull()
    .defaultNow(),
  quizId: integer()
    .notNull()
    .references(() => quizQuestion.id),
});

export const quizUser = pgTable(
  'quiz_user',
  {
    user_id: varchar().primaryKey(),
    quizPollId: integer()
      .notNull()
      .references(() => quizPool.id),
    createdAt: timestamp({ withTimezone: true, mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp({ withTimezone: true, mode: 'date' })
      .$onUpdate(() => new Date())
      .notNull()
      .defaultNow(),
  },
  (table) => [unique().on(table.user_id, table.quizPollId)]
);

export const quizAnswer = pgTable('quiz_answer', {
  id: serial().primaryKey(),
  userId: varchar()
    .notNull()
    .references(() => quizUser.user_id),
  quizItemId: integer()
    .notNull()
    .references(() => quizItem.id),
  answer: json().notNull(),
  createdAt: timestamp({ withTimezone: true, mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true, mode: 'date' })
    .$onUpdate(() => new Date())
    .notNull()
    .defaultNow(),
});

export const adminUser = pgTable('admin_user', {
  id: varchar().primaryKey(),
  enabled: boolean().notNull().default(false),
  username: varchar().notNull().unique(),
  passwordHash: varchar().notNull(),
});

export const adminSession = pgTable('admin_session', {
  id: varchar().primaryKey(),
  userId: varchar()
    .notNull()
    .references(() => adminUser.id),
  expiresAt: timestamp({ withTimezone: true }).notNull(),
});

export type Session = typeof adminSession.$inferSelect;

export type User = typeof adminUser.$inferSelect;

export type Question = typeof quizQuestion.$inferSelect;
export type QuestionItem = typeof quizItem.$inferSelect;
