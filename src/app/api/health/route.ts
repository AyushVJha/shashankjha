import { NextResponse } from "next/server";
import { dbHealth } from "@/db/client";
import { hasResend } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const db = await dbHealth();
  const email: "configured" | "missing_key" = hasResend ? "configured" : "missing_key";
  const ok = db === "up" && email === "configured";

  return NextResponse.json(
    { ok, db, email },
    { status: ok ? 200 : 503, headers: { "Cache-Control": "no-store" } }
  );
}
