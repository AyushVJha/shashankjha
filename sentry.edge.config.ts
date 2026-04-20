import * as Sentry from "@sentry/nextjs";

const dsn = process.env.SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    enabled: true,
    tracesSampleRate: 0.1,
    sendDefaultPii: false,
  });
}
