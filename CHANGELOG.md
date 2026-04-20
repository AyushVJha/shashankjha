# CHANGELOG

## 1. Contact form end-to-end

- Modified `src/app/api/contact/route.ts`
- Modified `src/components/Contact.tsx`
- Added `src/lib/schemas/contact.ts`
- Added `src/lib/email-routing.ts`
- Added `src/lib/sanitize.ts`
- Added `src/lib/rate-limit.ts`
- Added `src/lib/logger.ts`
- Added `src/lib/mask.ts`
- Added `src/emails/ContactNotification.tsx`
- Added `src/emails/ContactAcknowledgement.tsx`

## 2. Database layer

- Added `src/db/schema.ts`
- Added `src/db/client.ts`
- Added `drizzle.config.ts`
- Added `drizzle/0000_initial.sql`
- Added `drizzle/meta/0000_snapshot.json`
- Added `drizzle/meta/_journal.json`
- Modified `package.json`
- Modified `package-lock.json`

## 3. Newsletter

- Added `src/lib/schemas/newsletter.ts`
- Added `src/components/NewsletterSignup.tsx`
- Modified `src/components/Footer.tsx`
- Added `src/emails/NewsletterConfirm.tsx`
- Added `src/app/api/newsletter/subscribe/route.ts`
- Added `src/app/api/newsletter/confirm/route.ts`
- Added `src/app/api/newsletter/unsubscribe/route.ts`
- Added `src/app/newsletter/confirmed/page.tsx`
- Added `src/app/newsletter/unsubscribed/page.tsx`

## 4. Security hardening

- Modified `next.config.ts`
- Added `middleware.ts`
- Modified `src/lib/env.ts`
- Added `src/app/api/health/route.ts`
- Modified `next-sitemap.config.js`
- Modified `public/robots.txt`
- Modified `src/app/api/contact/route.ts`
- Modified `src/app/api/newsletter/subscribe/route.ts`

## 5. Observability and admin views

- Modified `src/app/layout.tsx`
- Modified `next.config.ts`
- Added `src/instrumentation.ts`
- Added `src/instrumentation-client.ts`
- Added `sentry.server.config.ts`
- Added `sentry.edge.config.ts`
- Added `src/lib/admin-auth.ts`
- Added `src/app/admin/submissions/page.tsx`
- Added `src/app/admin/newsletter/page.tsx`
- Added `src/app/api/admin/submissions/[id]/status/route.ts`
- Added `src/app/api/admin/newsletter/export/route.ts`

## 6. Environment variables

- Modified `.env.example`

## 7. Documentation and handoff

- Modified `README.md`
- Added `CHANGELOG.md`
- Added `DEPLOY.md`
- Added `BLOCKERS.md`
