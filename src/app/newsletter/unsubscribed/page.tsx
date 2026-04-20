import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unsubscribed — The Chambers of SSJ",
  robots: { index: false, follow: false },
};

type SP = { status?: string };

export default async function UnsubscribedPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const { status } = await searchParams;

  const headline =
    status === "invalid"
      ? "Link expired or invalid"
      : status === "error"
      ? "Something went wrong"
      : "You've been unsubscribed.";

  const body =
    status === "invalid"
      ? "This unsubscribe link is no longer valid. If you're still receiving emails, reply to any of them with 'unsubscribe' and we'll handle it manually."
      : status === "error"
      ? "We hit an unexpected issue processing your unsubscribe. Please try again in a minute."
      : "You won't receive further emails from this list. If this was a mistake, you can resubscribe from the homepage footer.";

  return (
    <main
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "var(--bg-warm)" }}
    >
      <div className="max-w-lg text-center bg-white border border-[var(--border)] rounded-[var(--radius-lg)] p-10 shadow-[var(--shadow-lg)]">
        <p className="text-[11px] font-sans font-bold tracking-[0.22em] uppercase text-[var(--gold)] mb-4">
          The Chambers of SSJ
        </p>
        <h1 className="font-serif text-3xl text-[var(--navy)] mb-4">{headline}</h1>
        <p className="text-[var(--text-dim)] leading-relaxed mb-8">{body}</p>
        <Link href="/" className="btn-gold">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
