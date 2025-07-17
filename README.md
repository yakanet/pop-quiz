# Pop-quiz

Pop-quiz is a simple interactive quiz application to support a gesticulated conference.

## Developing

Once you've created a project and installed dependencies with `pnpm install`

You need to create a `.env` file based on `.env.example`

| Environment Variable | Description                                                       | Example                                      |
| -------------------- | ----------------------------------------------------------------- | -------------------------------------------- |
| DATABASE_URL         | PostgreSQL connection string for the database (pooled connection) | postgresql://username:password@host/database |
| DATABASE_LISTEN_URL  | PostgreSQL connection string for the database (direct connection) | postgresql://username:password@host/database |

Then start a development server:

```bash
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev -- --open
```

## Manage database

### Init database

When you have an empty database, you can initialize dabase schema using the following command :

```bash
pnpm db migrate
```

### Generate a migration file from database

In order to create migration file (a versioned schema), you need to use the following command :

```bash
pnpm db generate
```

### Dev mode with database (from schema.ts to database)

In dev mode, when you update your schema.ts file, to update the database schema, use the following command :

```bash
pnpm db push
```

### Access database (browser IDE)

In dev mode, drizzle has an IDE to visualize data

```bash
pnpm db studio
```

The browser IDE will be accessible on https://local.drizzle.studio/

### Building

To create a production version of your app:

```bash
pnpm build
```

You can preview the production build with `pnpm preview`.

### Quiz states

```mermaid
---
title: Quiz workflow
---
flowchart LR
    NOT_STARTED --> PREPARE_QUESTION_*
    PREPARE_QUESTION_* --> QUESTION_*
    QUESTION_* --virtual state--> ANSWERED_*
    QUESTION_* --> CLOSED_QUESTION_*
    ANSWERED_* --> CLOSED_QUESTION_*
    CLOSED_QUESTION_* --> PREPARE_QUESTION_*
    CLOSED_QUESTION_* --> FINISHED
    UNKNOWN
```
