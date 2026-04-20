# shashankjha.in

Official website for Advocate Shashank Shekhar Jha, built on Next.js 16 App Router and deployed on Vercel.

## Stack

- Next.js 16.1.6
- React 19.2
- TypeScript strict mode
- Tailwind CSS v4
- Framer Motion
- Resend
- Zod
- Drizzle ORM with Neon serverless Postgres
- Upstash Redis rate limiting
- Vercel Analytics and Speed Insights
- Sentry for optional error monitoring

## Local setup

```bash
git clone <repo-url>
cd shashankjha
npm install
cp .env.example .env.local
```

Fill in `.env.local`, then run:

```bash
npm run dev
```

The app validates environment variables at boot through `src/lib/env.ts`.

## Environment variables

Use the committed `.env.example` as the source of truth:

```bash
RESEND_API_KEY=
RESEND_FROM_EMAIL=noreply@shashankjha.in
CONTACT_EMAIL=contact@shashankjha.in
DATABASE_URL=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
ADMIN_TOKEN=
SENTRY_DSN=
SENTRY_AUTH_TOKEN=
SITE_URL=https://shashankjha.in
NEXT_PUBLIC_SITE_URL=https://shashankjha.in
```

Notes:

- `DATABASE_URL` should be the Neon pooled connection string.
- `ADMIN_TOKEN` should be a long random string, at least 32 characters.
- `SENTRY_DSN` is optional. If absent, Sentry stays inactive.
- `SENTRY_AUTH_TOKEN` is optional and should only be added if you later enable sourcemap upload.

## Database commands

```bash
npm run db:generate
npm run db:migrate
npm run db:studio
```

Schema lives in `src/db/schema.ts`, with SQL migrations in `drizzle/`.

## Production deployment runbook

1. Create a Neon project and copy the pooled `DATABASE_URL`.
2. Create an Upstash Redis database and copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.
3. Verify `shashankjha.in` in Resend, then add SPF, DKIM, and DMARC records at the registrar or DNS host.
4. In Vercel, add all environment variables to both the Production and Preview environments.
5. Before the first production release, run `npm run db:migrate` against the production Neon database, either locally with the production `DATABASE_URL` loaded or through the Vercel CLI shell.
6. Create the `contact@shashankjha.in` mailbox in Google Workspace or Zoho Mail, then point MX records so the inbox actually receives replies.
7. Deploy to Vercel and verify `/api/health`, `/admin/submissions`, the contact form, and the newsletter flow.

The full ordered checklist is in `DEPLOY.md`.

## Admin token rotation

To rotate `ADMIN_TOKEN` without public downtime:

1. Generate a new 32+ character token.
2. In Vercel, update `ADMIN_TOKEN` for Preview and Production.
3. Redeploy the site.
4. Verify `/admin/submissions?token=NEW_TOKEN`.
5. Remove any saved links or password-manager entries that still use the old token.

This rotation does not interrupt the public website because only the admin gate depends on `ADMIN_TOKEN`.

## Content model

The structured content files in `src/data/cases.ts`, `src/data/news.ts`, and `src/data/videos.ts` remain the source of truth for cases, press coverage, and videos. They are not migrated into the database.

The database is only used for:

- contact submissions
- newsletter subscribers

## Operations notes

- Contact submissions are rate-limited to 5 per IP per hour.
- Newsletter signups are rate-limited to 3 per IP per hour.
- Upstash Redis is preferred for rate limiting. If its credentials are absent, the app falls back to in-memory limiting and logs a warning.
- `/api/health` reports database reachability and whether email delivery is configured.
- `/admin/submissions` supports status updates for incoming contact messages.
- `/admin/newsletter` lists newsletter subscribers and exports CSV.

## Build and run

```bash
npm run build
npm run start
```

## Content updates

Public-facing editorial content still lives in code:

- `src/data/cases.ts`
- `src/data/news.ts`
- `src/data/videos.ts`
- `src/data/ticker.ts`

No CMS or admin editor was introduced for those sections.
