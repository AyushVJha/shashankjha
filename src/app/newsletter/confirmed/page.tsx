import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscription confirmed — The Chambers of SSJ",
  robots: { index: false, follow: false },
};

type SP = { status?: string };

export default async function ConfirmedPage({
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
      : "You're in — welcome.";

  const body =
    status === "invalid"
      ? "This confirmation link is no longer valid. You can sign up again from the footer of our homepage."
      : status === "error"
      ? "We hit an unexpected issue confirming your subscription. Please try the link again in a minute, or sign up again."
      : "Your email is confirmed. You'll hear from The Chambers of SSJ when there's something worth your attention — no spam, no churn.";

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
