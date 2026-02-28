"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Cases", href: "#cases" },
  { label: "Media", href: "#media" },
  { label: "Expertise", href: "#expertise" },
  { label: "Contact", href: "#contact-section" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-2xl border-b border-[var(--border)] py-4 shadow-[0_2px_24px_rgba(15,23,36,0.06)]"
            : "bg-transparent py-7"
        }`}
      >
        <div className="container-main flex items-center justify-between">
          <Link href="/" className="group">
            <span className="font-serif text-xl font-medium tracking-wide text-[var(--navy)]">
              The Chambers of <span className="text-[var(--gold)]">SSJ</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[12px] font-sans font-medium tracking-[0.15em] uppercase text-[var(--muted)] hover:text-[var(--navy)] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://twitter.com/shashank_ssj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-sans tracking-[0.1em] font-medium text-[var(--gold)] border border-[var(--gold-border)] px-5 py-2.5 rounded-lg hover:bg-[var(--gold-bg)] hover:border-[var(--gold)] transition-all duration-300"
            >
              @shashank_ssj
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[var(--navy)] hover:text-[var(--gold)] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl pt-28 px-8 md:hidden"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMobileOpen(false)}
                  className="text-3xl font-serif font-light text-[var(--navy)] hover:text-[var(--gold)] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="border-t border-[var(--border)] pt-6">
                <a
                  href="https://twitter.com/shashank_ssj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-sans text-[var(--gold)]"
                >
                  @shashank_ssj →
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
