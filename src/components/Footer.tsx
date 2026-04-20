import Link from "next/link";
import NewsletterSignup from "./NewsletterSignup";

const links = [
  { label: "About", href: "#about", external: false },
  { label: "Cases", href: "#cases", external: false },
  { label: "Media", href: "#media", external: false },
  { label: "Expertise", href: "#expertise", external: false },
  { label: "X (Twitter)", href: "https://twitter.com/shashank_ssj", external: true },
  { label: "Instagram", href: "https://instagram.com/shashank.ssj", external: true },
  { label: "Contact", href: "#contact-section", external: false },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-16 bg-white">
      <div className="container-main">
        <div className="flex flex-col items-center gap-10">
          <Link href="/" className="group">
            <span className="font-serif text-2xl font-medium text-[var(--navy)]">
              The Chambers of <span className="text-[var(--gold)]">SSJ</span>
            </span>
          </Link>

          <ul className="flex flex-wrap items-center justify-center gap-8">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="text-[11px] font-sans font-bold tracking-[0.18em] uppercase text-[var(--muted)] hover:text-[var(--gold)] transition-colors duration-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="w-16 h-[1px] bg-[var(--gold)] opacity-30" />

          <NewsletterSignup source="footer" />

          <div className="w-16 h-[1px] bg-[var(--gold)] opacity-30" />

          <p className="text-[12px] font-sans text-[var(--faint)]">
            © {new Date().getFullYear()} The Chambers of SSJ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
