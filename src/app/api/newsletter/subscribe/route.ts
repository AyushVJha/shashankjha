import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { Resend } from "resend";
import { eq } from "drizzle-orm";
import { newsletterSchema } from "@/lib/schemas/newsletter";
import { getLimiter, clientIp } from "@/lib/rate-limit";
import { env, hasDatabase, hasResend } from "@/lib/env";
import { db } from "@/db/client";
import { newsletterSubscribers } from "@/db/schema";
import { FROM_ADDRESS } from "@/lib/email-routing";
import NewsletterConfirm from "@/emails/NewsletterConfirm";
import { log } from "@/lib/logger";
import { maskEmail } from "@/lib/mask";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const limiter = getLimiter("newsletter_subscribe", 3, 60 * 60);

async function sendConfirmation(email: string, confirmToken: string, unsubscribeToken: string) {
  const base = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  const confirmUrl = `${base}/api/newsletter/confirm?token=${confirmToken}`;
  const unsubscribeUrl = `${base}/api/newsletter/unsubscribe?token=${unsubscribeToken}`;

  const resend = new Resend(env.RESEND_API_KEY!);
  const r = await resend.emails.send({
    from: FROM_ADDRESS,
    to: email,
    subject: "Confirm your subscription — The Chambers of SSJ",
    react: NewsletterConfirm({ confirmUrl, unsubscribeUrl }),
    text: [
      "Please confirm your subscription to updates from The Chambers of SSJ.",
      "",
      `Confirm: ${confirmUrl}`,
      "",
      `If you didn't sign up, you can ignore this email or unsubscribe:`,
      unsubscribeUrl,
    ].join("\n"),
    headers: { "List-Unsubscribe": `<${unsubscribeUrl}>` },
  });
  if (r.error) throw new Error(r.error.message);
  return r.data?.id ?? null;
}

export async function POST(request: Request) {
  const requestId = request.headers.get("x-request-id") || nanoid(12);
  const ip = clientIp(request);

  try {
    const rl = await limiter.check(ip);
    if (!rl.success) {
      return NextResponse.json(
        { ok: false, error: "Too many attempts. Please try again later.", requestId },
        { status: 429 }
      );
    }

    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON body", requestId },
        { status: 400 }
      );
    }

    const parsed = newsletterSchema.safeParse(raw);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return NextResponse.json(
        { ok: false, error: first?.message || "Invalid input", requestId },
        { status: 400 }
      );
    }

    if (parsed.data.website) {
      log.warn("newsletter.honeypot_triggered", { requestId, ip });
      return NextResponse.json({ ok: true, requestId });
    }

    const email = parsed.data.email.trim().toLowerCase();
    const source = parsed.data.source || "footer";

    if (!hasResend) {
      log.error("newsletter.resend_missing", {
        requestId,
        emailMasked: maskEmail(email),
      });
      return NextResponse.json(
        {
          ok: false,
          error: "Newsletter is temporarily unavailable. Please try again later.",
          requestId,
        },
        { status: 503 }
      );
    }

    if (!hasDatabase) {
      log.error("newsletter.db_disabled", { requestId });
      return NextResponse.json(
        { ok: false, error: "Newsletter is temporarily unavailable.", requestId },
        { status: 503 }
      );
    }

    const existing = await db()
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, email))
      .limit(1);

    const row = existing[0];

    if (row && row.confirmed) {
      log.info("newsletter.already_confirmed", { requestId, emailMasked: maskEmail(email) });
      return NextResponse.json({ ok: true, requestId });
    }

    const confirmToken = nanoid(32);
    const unsubscribeToken = row?.unsubscribeToken ?? nanoid(32);

    if (row) {
      await db()
        .update(newsletterSubscribers)
        .set({
          confirmToken,
          unsubscribeToken,
          unsubscribedAt: null,
          source,
        })
        .where(eq(newsletterSubscribers.id, row.id));
    } else {
      await db().insert(newsletterSubscribers).values({
        email,
        confirmToken,
        unsubscribeToken,
        source,
      });
    }

    try {
      await sendConfirmation(email, confirmToken, unsubscribeToken);
    } catch (err) {
      log.error("newsletter.email_send_failed", {
        requestId,
        error: err instanceof Error ? err.message : String(err),
        emailMasked: maskEmail(email),
      });
      return NextResponse.json(
        {
          ok: false,
          error: "We couldn't send the confirmation email. Please try again shortly.",
          requestId,
        },
        { status: 502 }
      );
    }

    log.info("newsletter.subscribe_sent", { requestId, emailMasked: maskEmail(email), source });
    return NextResponse.json({ ok: true, requestId });
  } catch (err) {
    log.error("newsletter.subscribe_unhandled", {
      requestId,
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      { ok: false, error: "Unexpected error. Please try again shortly.", requestId },
      { status: 500 }
    );
  }
}
