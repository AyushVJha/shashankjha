import { z } from "zod";

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required").optional(),
  RESEND_FROM_EMAIL: z.string().email().default("noreply@shashankjha.in"),
  CONTACT_EMAIL: z.string().email().default("contact@shashankjha.in"),

  DATABASE_URL: z.string().url().optional(),

  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),

  ADMIN_TOKEN: z.string().min(16).optional(),

  SENTRY_DSN: z.string().url().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),

  SITE_URL: z.string().url().default("https://shashankjha.in"),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://shashankjha.in"),

  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

export type Env = z.infer<typeof envSchema>;

function load(): Env {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(`Invalid environment configuration:\n${issues}`);
  }

  const data = parsed.data;

  if (data.NODE_ENV === "production") {
    const required: Array<keyof Env> = [
      "RESEND_API_KEY",
      "DATABASE_URL",
      "ADMIN_TOKEN",
    ];
    const missing = required.filter((k) => !data[k]);
    if (missing.length > 0) {
      throw new Error(
        `Missing required production env vars: ${missing.join(", ")}`
      );
    }
  }

  return data;
}

export const env = load();

export const hasRedis = Boolean(
  env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN
);
export const hasDatabase = Boolean(env.DATABASE_URL);
export const hasResend = Boolean(env.RESEND_API_KEY);
export const hasSentry = Boolean(env.SENTRY_DSN);
