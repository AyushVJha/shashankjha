# DEPLOY

## Production ship sequence

1. In Neon:
   Create a new project, open the dashboard, and copy the pooled `DATABASE_URL`.

2. In Upstash:
   Create a Redis database, then copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.

3. In Resend:
   Add and verify the domain `shashankjha.in`.

4. At the registrar or DNS host:
   Add the Resend SPF, DKIM, and DMARC DNS records shown in the Resend dashboard.

5. For mail hosting:
   Create the mailbox `contact@shashankjha.in` in Google Workspace or Zoho Mail.

6. At the registrar or DNS host:
   Point MX records for `shashankjha.in` to the provider from step 5.

7. In Vercel:
   Open the project dashboard, then go to `Settings -> Environment Variables`.

8. Add these variables to both `Production` and `Preview`:

```bash
RESEND_API_KEY=...
RESEND_FROM_EMAIL=noreply@shashankjha.in
CONTACT_EMAIL=contact@shashankjha.in
DATABASE_URL=...
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
ADMIN_TOKEN=...
SENTRY_DSN=...
SENTRY_AUTH_TOKEN=...
SITE_URL=https://shashankjha.in
NEXT_PUBLIC_SITE_URL=https://shashankjha.in
```

9. In the local terminal:

```bash
cp .env.example .env.local
```

10. Populate `.env.local` with the same production values, then run:

```bash
npm install
npm run db:migrate
npm run build
```

11. Commit and push the branch:

```bash
git status
git push origin main
```

12. In Vercel:
    Trigger the production deployment if it does not start automatically.

13. After the deployment finishes:

```bash
curl -I https://shashankjha.in
curl https://shashankjha.in/api/health
```

14. Open the following in the browser:
    - `https://shashankjha.in/`
    - `https://shashankjha.in/admin/submissions?token=YOUR_ADMIN_TOKEN`
    - `https://shashankjha.in/admin/newsletter?token=YOUR_ADMIN_TOKEN`

## First-time migration via Vercel CLI

If you prefer to run the first migration from a Vercel-linked shell instead of your machine:

```bash
vercel env pull .env.local
npm run db:migrate
```

## Smoke test checklist

- Submit a test contact form entry from the homepage.
- Confirm a new message arrives in `contact@shashankjha.in`.
- Confirm an acknowledgement email arrives in the submitter inbox.
- Check Neon for a new row in `contact_submissions`.
- Open `/admin/submissions` and change the status from `received` to `read`.
- Submit a newsletter signup from the footer.
- Confirm the opt-in email arrives.
- Click the confirmation link and verify the thank-you page loads.
- Check Neon for a new row in `newsletter_subscribers` with `confirmed = true`.
- Open `/admin/newsletter` and download the CSV export.
