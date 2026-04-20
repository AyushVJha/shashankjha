import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db/client";
import { contactSubmissions } from "@/db/schema";
import {
  getAdminAccess,
  safeAdminRedirectPath,
  unauthorizedAdminResponse,
} from "@/lib/admin-auth";
import { env, hasDatabase } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const statusSchema = z.enum(["received", "read", "replied", "spam"]);
const paramsSchema = z.object({ id: z.uuid() });

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const formData = await request.formData();
  const url = new URL(request.url);
  const token =
    url.searchParams.get("token") ||
    (typeof formData.get("token") === "string" ? String(formData.get("token")) : null);
  const auth = getAdminAccess({
    authorization: request.headers.get("authorization"),
    token,
  });

  if (!auth.authorized) {
    return unauthorizedAdminResponse();
  }

  if (!hasDatabase) {
    return NextResponse.json(
      { ok: false, error: "DATABASE_URL is not configured." },
      { status: 503 }
    );
  }

  const parsedParams = paramsSchema.safeParse(await params);
  const nextStatus = statusSchema.safeParse(formData.get("status"));
  const redirectPath = safeAdminRedirectPath(
    formData.get("redirectTo"),
    "/admin/submissions",
    auth.queryToken
  );

  if (!parsedParams.success || !nextStatus.success) {
    return NextResponse.redirect(new URL(redirectPath, env.NEXT_PUBLIC_SITE_URL), 303);
  }

  await db()
    .update(contactSubmissions)
    .set({ status: nextStatus.data })
    .where(eq(contactSubmissions.id, parsedParams.data.id));

  return NextResponse.redirect(new URL(redirectPath, env.NEXT_PUBLIC_SITE_URL), 303);
}
