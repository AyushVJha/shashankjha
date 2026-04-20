import * as Sentry from "@sentry/nextjs";
import { env, hasSentry } from "@/lib/env";

if (hasSentry) {
  Sentry.init({
    dsn: env.SENTRY_DSN,
    enabled: true,
    tracesSampleRate: 0.1,
    sendDefaultPii: false,
  });
}
