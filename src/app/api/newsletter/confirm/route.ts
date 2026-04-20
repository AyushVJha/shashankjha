import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { env, hasDatabase } from "@/lib/env";
import { db } from "@/db/client";
import { newsletterSubscribers } from "@/db/schema";
import { log } from "@/lib/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const base = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  const url = new URL(request.url);
  const token = url.searchParams.get("token")?.trim();

  if (!token || token.length < 16) {
    return NextResponse.redirect(`${base}/newsletter/confirmed?status=invalid`, 302);
  }

  if (!hasDatabase) {
    log.error("newsletter.confirm_db_disabled");
    return NextResponse.redirect(`${base}/newsletter/confirmed?status=error`, 302);
  }

  try {
    const rows = await db()
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.confirmToken, token))
      .limit(1);

    const row = rows[0];
    if (!row) {
      return NextResponse.redirect(`${base}/newsletter/confirmed?status=invalid`, 302);
    }

    if (!row.confirmed) {
      await db()
        .update(newsletterSubscribers)
        .set({ confirmed: true, confirmedAt: new Date() })
        .where(eq(newsletterSubscribers.id, row.id));
    }

    return NextResponse.redirect(`${base}/newsletter/confirmed?status=ok`, 302);
  } catch (err) {
    log.error("newsletter.confirm_failed", {
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.redirect(`${base}/newsletter/confirmed?status=error`, 302);
  }
}
