import { z } from "zod";

// Coerce empty strings from .env files to undefined so optional fields
// don't fail validation when the value is intentionally left blank. Also
// trims whitespace, since dashboard textareas (e.g. Vercel's env var UI)
// can silently include a trailing newline when a value is pasted in.
function opt(schema: z.ZodString) {
  return z.preprocess((v) => {
    const trimmed = typeof v === "string" ? v.trim() : v;
    return trimmed === "" || trimmed == null ? undefined : trimmed;
  }, schema.optional());
}

const envSchema = z.object({
  RESEND_API_KEY: opt(z.string().min(1, "RESEND_API_KEY must not be empty")),
  RESEND_FROM_EMAIL: z
    .preprocess((v) => (v === "" || v == null ? undefined : v), z.string().email())
    .default("noreply@shashankjha.in"),
  CONTACT_EMAIL: z
    .preprocess((v) => (v === "" || v == null ? undefined : v), z.string().email())
    .default("contact@shashankjha.in"),

  DATABASE_URL: opt(z.string().min(1)),

  UPSTASH_REDIS_REST_URL: opt(z.string().min(1)),
  UPSTASH_REDIS_REST_TOKEN: opt(z.string().min(1)),

  ADMIN_TOKEN: opt(z.string().min(16, "ADMIN_TOKEN must be at least 16 characters")),

  SENTRY_DSN: opt(z.string().min(1)),
  SENTRY_AUTH_TOKEN: opt(z.string().min(1)),

  SITE_URL: z
    .preprocess((v) => (v === "" || v == null ? undefined : v), z.string().url())
    .default("https://shashankjha.in"),
  NEXT_PUBLIC_SITE_URL: z
    .preprocess((v) => (v === "" || v == null ? undefined : v), z.string().url())
    .default("https://shashankjha.in"),

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

  const redisFields = [
    data.UPSTASH_REDIS_REST_URL,
    data.UPSTASH_REDIS_REST_TOKEN,
  ].filter(Boolean);
  if (redisFields.length > 0 && redisFields.length < 2) {
    throw new Error(
      "UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must either both be set or both be omitted"
    );
  }

  // Skip strict required-var check during `next build` — values are injected
  // at runtime on Vercel, not at build time. We still fail fast at request time
  // because each route imports `env` and these checks run on first module load.
  const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";

  if (data.NODE_ENV === "production" && !isBuildPhase) {
    const required: Array<keyof Env> = ["RESEND_API_KEY", "DATABASE_URL", "ADMIN_TOKEN"];
    const missing = required.filter((k) => !data[k]);
    if (missing.length > 0) {
      throw new Error(`Missing required production env vars: ${missing.join(", ")}`);
    }
  }

  return data;
}

export const env = load();

export const hasRedis = Boolean(env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN);
export const hasDatabase = Boolean(env.DATABASE_URL);
export const hasResend = Boolean(env.RESEND_API_KEY);
export const hasSentry = Boolean(env.SENTRY_DSN);
