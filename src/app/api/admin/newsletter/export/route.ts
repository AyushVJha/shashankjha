import { desc } from "drizzle-orm";
import { db } from "@/db/client";
import { newsletterSubscribers } from "@/db/schema";
import { getAdminAccess, unauthorizedAdminResponse } from "@/lib/admin-auth";
import { hasDatabase } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function csvEscape(value: string) {
  return `"${value.replaceAll("\"", "\"\"")}"`;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const auth = getAdminAccess({
    authorization: request.headers.get("authorization"),
    token: url.searchParams.get("token"),
  });

  if (!auth.authorized) {
    return unauthorizedAdminResponse();
  }

  if (!hasDatabase) {
    return new Response("DATABASE_URL is not configured.", { status: 503 });
  }

  const rows = await db()
    .select()
    .from(newsletterSubscribers)
    .orderBy(desc(newsletterSubscribers.createdAt));

  const csv = [
    ["email", "confirmed", "created_at", "source"]
      .map(csvEscape)
      .join(","),
    ...rows.map((row) =>
      [
        row.email,
        row.confirmed && !row.unsubscribedAt ? "true" : "false",
        row.createdAt.toISOString(),
        row.source,
      ]
        .map(csvEscape)
        .join(",")
    ),
  ].join("\n");

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
