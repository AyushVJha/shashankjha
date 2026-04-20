import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { Resend } from "resend";
import { contactSchema } from "@/lib/schemas/contact";
import { sanitizeText } from "@/lib/sanitize";
import { getLimiter, clientIp } from "@/lib/rate-limit";
import { env, hasDatabase, hasResend } from "@/lib/env";
import { db } from "@/db/client";
import { contactSubmissions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { CONTACT_RECIPIENT, FROM_ADDRESS } from "@/lib/email-routing";
import ContactNotification from "@/emails/ContactNotification";
import ContactAcknowledgement from "@/emails/ContactAcknowledgement";
import { log } from "@/lib/logger";
import { maskEmail } from "@/lib/mask";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const limiter = getLimiter("contact", 5, 60 * 60);

function formatIST(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);
}

export async function POST(request: Request) {
  const requestId = request.headers.get("x-request-id") || nanoid(12);
  const ip = clientIp(request);
  const userAgent = request.headers.get("user-agent") || "unknown";

  try {
    const rl = await limiter.check(ip);
    if (!rl.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Too many submissions. Please try again in an hour.",
          requestId,
        },
        { status: 429, headers: { "retry-after": String(Math.ceil((rl.reset - Date.now()) / 1000)) } }
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

    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return NextResponse.json(
        {
          ok: false,
          error: first?.message || "Invalid input",
          field: first?.path.join(".") || undefined,
          requestId,
        },
        { status: 400 }
      );
    }

    const input = parsed.data;

    if (input.website && input.website.length > 0) {
      log.warn("contact.honeypot_triggered", { requestId, ip });
      return NextResponse.json({ ok: true, id: requestId, requestId });
    }

    const cleaned = {
      name: sanitizeText(input.name),
      email: input.email.trim().toLowerCase(),
      phone:
        input.phone && input.phone.trim()
          ? sanitizeText(input.phone).replace(/[\s-]/g, "")
          : null,
      purpose: input.purpose,
      subject: sanitizeText(input.subject),
      message: sanitizeText(input.message),
    };

    if (!hasResend) {
      log.error("contact.resend_missing", {
        requestId,
        emailMasked: maskEmail(cleaned.email),
      });
      return NextResponse.json(
        {
          ok: false,
          error:
            "The contact form is temporarily unavailable. Please email contact@shashankjha.in directly.",
          requestId,
        },
        { status: 503 }
      );
    }

    let submissionId: string | null = null;
    if (hasDatabase) {
      try {
        const rows = await db()
          .insert(contactSubmissions)
          .values({
            name: cleaned.name,
            email: cleaned.email,
            phone: cleaned.phone,
            purpose: cleaned.purpose,
            subject: cleaned.subject,
            message: cleaned.message,
            ip,
            userAgent,
            requestId,
          })
          .returning({ id: contactSubmissions.id });
        submissionId = rows[0]?.id ?? null;
      } catch (err) {
        log.error("contact.db_insert_failed", {
          requestId,
          error: err instanceof Error ? err.message : String(err),
          emailMasked: maskEmail(cleaned.email),
        });
      }
    } else {
      log.warn("contact.db_disabled", { requestId });
    }

    let emailMessageId: string | null = null;
    try {
      const resend = new Resend(env.RESEND_API_KEY!);
      const timestampIST = formatIST(new Date());

      const notification = await resend.emails.send({
        from: FROM_ADDRESS,
        to: CONTACT_RECIPIENT,
        replyTo: cleaned.email,
        subject: `[${cleaned.purpose}] ${cleaned.subject} — ${cleaned.name}`,
        react: ContactNotification({
          name: cleaned.name,
          email: cleaned.email,
          phone: cleaned.phone || undefined,
          purpose: cleaned.purpose,
          subject: cleaned.subject,
          message: cleaned.message,
          timestampIST,
          ip,
          userAgent,
          requestId,
        }),
        text: buildNotificationText({
          ...cleaned,
          phone: cleaned.phone,
          timestampIST,
          ip,
          userAgent,
          requestId,
        }),
        headers: { "X-Request-Id": requestId },
      });

      if (notification.error) {
        throw new Error(notification.error.message);
      }
      emailMessageId = notification.data?.id ?? null;

      await resend.emails.send({
        from: FROM_ADDRESS,
        to: cleaned.email,
        replyTo: CONTACT_RECIPIENT,
        subject: "We've received your message — The Chambers of SSJ",
        react: ContactAcknowledgement({
          name: cleaned.name,
          purpose: cleaned.purpose,
          subject: cleaned.subject,
          requestId,
        }),
        text: buildAckText({
          name: cleaned.name,
          purpose: cleaned.purpose,
          subject: cleaned.subject,
          requestId,
        }),
        headers: { "X-Request-Id": requestId },
      });
    } catch (err) {
      log.error("contact.email_send_failed", {
        requestId,
        error: err instanceof Error ? err.message : String(err),
        emailMasked: maskEmail(cleaned.email),
      });
      return NextResponse.json(
        {
          ok: false,
          error:
            "We couldn't deliver your message right now. Please email contact@shashankjha.in directly, or try again shortly.",
          requestId,
        },
        { status: 502 }
      );
    }

    if (submissionId && emailMessageId && hasDatabase) {
      try {
        await db()
          .update(contactSubmissions)
          .set({ emailMessageId })
          .where(eq(contactSubmissions.id, submissionId));
      } catch (err) {
        log.error("contact.db_update_failed", {
          requestId,
          submissionId,
          error: err instanceof Error ? err.message : String(err),
        });
      }
    }

    log.info("contact.received", {
      requestId,
      purpose: cleaned.purpose,
      emailMasked: maskEmail(cleaned.email),
      persisted: Boolean(submissionId),
      emailed: Boolean(emailMessageId),
    });

    return NextResponse.json({
      ok: true,
      id: submissionId ?? requestId,
      requestId,
    });
  } catch (err) {
    log.error("contact.unhandled", {
      requestId,
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      {
        ok: false,
        error: "An unexpected error occurred. Please try again shortly.",
        requestId,
      },
      { status: 500 }
    );
  }
}

function buildNotificationText(d: {
  name: string;
  email: string;
  phone: string | null;
  purpose: string;
  subject: string;
  message: string;
  timestampIST: string;
  ip: string;
  userAgent: string;
  requestId: string;
}) {
  return [
    "New contact form submission",
    `Received: ${d.timestampIST}`,
    "",
    `Purpose: ${d.purpose}`,
    `Name:    ${d.name}`,
    `Email:   ${d.email}`,
    `Phone:   ${d.phone || "—"}`,
    `Subject: ${d.subject}`,
    "",
    "Message:",
    d.message,
    "",
    `Request ID: ${d.requestId}`,
    `IP: ${d.ip}`,
    `User-Agent: ${d.userAgent}`,
  ].join("\n");
}

function buildAckText(d: {
  name: string;
  purpose: string;
  subject: string;
  requestId: string;
}) {
  return [
    `Dear ${d.name},`,
    "",
    `We've received your ${d.purpose.toLowerCase()} regarding "${d.subject}" and it is now with our team.`,
    "",
    "You can expect a response within 2–3 business days. For time-sensitive legal matters, please mention urgency in a follow-up reply.",
    "",
    "This is an automated acknowledgement — no action is required from you.",
    "",
    "Warm regards,",
    "The Chambers of SSJ",
    "A-57, 2nd Floor, Amar Colony, Lajpat Nagar IV, New Delhi 110024",
    "",
    `Reference: ${d.requestId}`,
  ].join("\n");
}
