import Link from "next/link";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { desc } from "drizzle-orm";
import { db } from "@/db/client";
import { newsletterSubscribers } from "@/db/schema";
import { getAdminAccess, withAdminToken } from "@/lib/admin-auth";
import { hasDatabase } from "@/lib/env";

export const metadata: Metadata = {
  title: "Admin newsletter — The Chambers of SSJ",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function formatTimestamp(value: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

function UnauthorizedCard() {
  return (
    <main className="min-h-screen px-6 py-16" style={{ background: "var(--bg-warm)" }}>
      <div className="container-main">
        <div className="max-w-xl mx-auto bg-white border border-[var(--border)] rounded-[var(--radius-lg)] p-10 shadow-[var(--shadow-lg)]">
          <p className="text-[11px] font-sans font-bold tracking-[0.22em] uppercase text-[var(--gold)] mb-4">
            Admin
          </p>
          <h1 className="font-serif text-3xl text-[var(--navy)] mb-4">Access required.</h1>
          <p className="text-[var(--text-dim)] leading-relaxed">
            Authenticate with HTTP Basic Auth or add a valid <code>?token=...</code> query parameter.
          </p>
        </div>
      </div>
    </main>
  );
}

export default async function AdminNewsletterPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const auth = getAdminAccess({
    authorization: (await headers()).get("authorization"),
    token,
  });

  if (!auth.authorized) {
    return <UnauthorizedCard />;
  }

  if (!hasDatabase) {
    return (
      <main className="min-h-screen px-6 py-16" style={{ background: "var(--bg-warm)" }}>
        <div className="container-main">
          <div className="max-w-xl mx-auto bg-white border border-[var(--border)] rounded-[var(--radius-lg)] p-10 shadow-[var(--shadow-lg)]">
            <h1 className="font-serif text-3xl text-[var(--navy)] mb-4">Database unavailable.</h1>
            <p className="text-[var(--text-dim)]">Set <code>DATABASE_URL</code> to view newsletter subscribers.</p>
          </div>
        </div>
      </main>
    );
  }

  const rows = await db()
    .select()
    .from(newsletterSubscribers)
    .orderBy(desc(newsletterSubscribers.createdAt))
    .limit(500);

  const exportHref = withAdminToken("/api/admin/newsletter/export", auth.queryToken);
  const submissionsHref = withAdminToken("/admin/submissions", auth.queryToken);

  return (
    <main className="min-h-screen px-6 py-10" style={{ background: "var(--bg)" }}>
      <div className="container-main space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-sans font-bold tracking-[0.22em] uppercase text-[var(--gold)] mb-2">
              Admin
            </p>
            <h1 className="font-serif text-4xl text-[var(--navy)]">Newsletter subscribers</h1>
            <p className="text-[var(--muted)] mt-2">Latest 500 records, newest first.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={submissionsHref} className="btn-ghost">
              View Submissions
            </Link>
            <a href={exportHref} className="btn-gold">
              Export CSV
            </a>
          </div>
        </div>

        <div className="overflow-x-auto bg-white border border-[var(--border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-md)]">
          <table className="min-w-full text-left">
            <thead className="border-b border-[var(--border)] bg-[var(--bg-warm)]">
              <tr className="text-[11px] font-sans font-bold tracking-[0.16em] uppercase text-[var(--muted)]">
                <th className="px-4 py-4">Email</th>
                <th className="px-4 py-4">Confirmed</th>
                <th className="px-4 py-4">Created</th>
                <th className="px-4 py-4">Source</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-[var(--border)] last:border-b-0">
                  <td className="px-4 py-4 text-sm text-[var(--navy)]">{row.email}</td>
                  <td className="px-4 py-4 text-sm text-[var(--text-dim)]">
                    {row.confirmed && !row.unsubscribedAt ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-4 text-sm text-[var(--text-dim)] whitespace-nowrap">
                    {formatTimestamp(row.createdAt)}
                  </td>
                  <td className="px-4 py-4 text-sm text-[var(--text-dim)]">{row.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
