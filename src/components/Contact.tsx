"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

const purposes = [
  "Legal Consultation",
  "General Inquiry",
  "Media / Interview",
  "Collaboration",
];

const contactLinks = [
  { label: "Email", value: "contact@shashankjha.in", href: "mailto:contact@shashankjha.in" },
  { label: "X (Twitter)", value: "@shashank_ssj", href: "https://twitter.com/shashank_ssj" },
  { label: "Instagram", value: "@shashank.ssj", href: "https://instagram.com/shashank.ssj" },
  { label: "The Chambers of SSJ", value: "A-57, 2nd Floor, Amar Colony, Lajpat Nagar IV, New Delhi 110024", href: "https://www.google.com/maps/search/The+Chambers+of+SSJ+Delhi" },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: "",
    message: "",
    honeypot: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;

    setFormState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          purpose: formData.purpose,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setFormState("success");
      setFormData({ name: "", email: "", phone: "", purpose: "", message: "", honeypot: "" });
    } catch (err) {
      setFormState("error");
      setErrorMsg(err instanceof Error ? err.message : "An error occurred. Please try again.");
    }
  };

  return (
    <section ref={ref} id="contact-section" className="section-padding" style={{ background: "linear-gradient(180deg, var(--bg-cream) 0%, var(--bg-warm) 100%)" }}>
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {/* Left — Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="section-label"
            >
              Get In Touch
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="section-title mb-10"
            >
              Let&apos;s <em>Connect</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-[16px] font-sans text-[var(--muted)] mb-12 max-w-lg leading-[1.8]"
            >
              For legal consultations, media inquiries, collaborations, or any
              questions — reach out directly.
            </motion.p>

            <div className="space-y-0">
              {contactLinks.map((link, i) => {
                const Tag = link.href ? "a" : "div";
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                  >
                    <Tag
                      {...(link.href
                        ? {
                            href: link.href,
                            target: "_blank",
                            rel: "noopener noreferrer",
                          }
                        : {})}
                      className={`block py-6 border-b border-[var(--border)] group ${
                        link.href ? "hover:bg-white/50 cursor-pointer" : "cursor-default"
                      } transition-colors duration-300`}
                    >
                      <span className="text-[12px] font-sans font-semibold tracking-[0.12em] uppercase text-[var(--gold)] block mb-1">
                        {link.label}
                      </span>
                      <span className="text-[16px] font-sans text-[var(--text-dim)] group-hover:text-[var(--navy)] transition-colors">
                        {link.value}
                      </span>
                    </Tag>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right — Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 bg-white border border-[var(--border)] rounded-[var(--radius-lg)] p-8 md:p-10 shadow-[var(--shadow-lg)]"
          >
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              className="absolute opacity-0 pointer-events-none"
              tabIndex={-1}
              autoComplete="off"
            />

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone (optional)"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
            />

            <select
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="" disabled>Purpose of Contact</option>
              {purposes.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>

            <textarea
              name="message"
              placeholder="Your Message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="form-input resize-none"
            />

            <button
              type="submit"
              disabled={formState === "loading"}
              className="btn-gold w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formState === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>

            {formState === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 text-[#16a34a] text-sm font-sans font-medium"
              >
                <CheckCircle className="w-4 h-4" />
                Message sent successfully. We&apos;ll respond shortly.
              </motion.div>
            )}

            {formState === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 text-[#dc2626] text-sm font-sans font-medium"
              >
                <AlertCircle className="w-4 h-4" />
                {errorMsg}
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
