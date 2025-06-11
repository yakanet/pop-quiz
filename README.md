# Pop-quiz

Everything you need to build a Svelte project.

## Developing

Once you've created a project and installed dependencies with `pnpm install`

You need to create a .env file based on .env.examples

| Environment Variable | Description                                                       | Example                                      |
|----------------------|-------------------------------------------------------------------|----------------------------------------------|
| DATABASE_URL         | PostgreSQL connection string for the database (pooled connection) | postgresql://username:password@host/database |
| DATABASE_LISTEN_URL  | PostgreSQL connection string for the database (direct connection) | postgresql://username:password@host/database |

Then start a development server:

```bash
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev -- --open
```

## Building

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
    NOT_STARTED --> PENDING
    PENDING --> QUESTION_*
    QUESTION_* --virtual state--> ANSWERED_*
    QUESTION_* --> PENDING
    ANSWERED_* --> PENDING
    PENDING --> FINISHED
    UNKNOWN
```