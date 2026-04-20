"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, PURPOSES, type ContactInput } from "@/lib/schemas/contact";

type SuccessResponse = { ok: true; id: string; requestId: string };
type ErrorResponse = { ok: false; error: string; field?: string; requestId: string };

const contactLinks = [
  { label: "Email", value: "contact@shashankjha.in", href: "mailto:contact@shashankjha.in" },
  { label: "X (Twitter)", value: "@shashank_ssj", href: "https://twitter.com/shashank_ssj" },
  { label: "Instagram", value: "@shashank.ssj", href: "https://instagram.com/shashank.ssj" },
  { label: "The Chambers of SSJ", value: "A-57, 2nd Floor, Amar Colony, Lajpat Nagar IV, New Delhi 110024", href: "https://www.google.com/maps/search/The+Chambers+of+SSJ+Delhi" },
];

const honeypotStyle: React.CSSProperties = {
  position: "absolute",
  left: "-9999px",
  width: 1,
  height: 1,
  opacity: 0,
  pointerEvents: "none",
};

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      purpose: undefined,
      subject: "",
      message: "",
      website: "",
    },
    mode: "onBlur",
  });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<{ message: string; requestId?: string } | null>(null);
  const [successRequestId, setSuccessRequestId] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (values) => {
    setStatus("idle");
    setServerError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await res.json()) as SuccessResponse | ErrorResponse;

      if (!res.ok || !data.ok) {
        const err = data as ErrorResponse;
        setStatus("error");
        setServerError({ message: err.error, requestId: err.requestId });
        return;
      }

      setStatus("success");
      setSuccessRequestId(data.requestId);
      reset();
    } catch {
      setStatus("error");
      setServerError({
        message:
          "Network error. Please check your connection and try again, or email contact@shashankjha.in directly.",
      });
    }
  });

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
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 bg-white border border-[var(--border)] rounded-[var(--radius-lg)] p-8 md:p-10 shadow-[var(--shadow-lg)]"
          >
            <div aria-hidden="true" style={honeypotStyle}>
              <label>
                Website
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("website")}
                />
              </label>
            </div>

            <Field error={errors.name?.message}>
              <input
                type="text"
                placeholder="Your Name"
                aria-invalid={!!errors.name}
                className="form-input"
                {...register("name")}
              />
            </Field>

            <Field error={errors.email?.message}>
              <input
                type="email"
                placeholder="Your Email"
                aria-invalid={!!errors.email}
                className="form-input"
                {...register("email")}
              />
            </Field>

            <Field error={errors.phone?.message}>
              <input
                type="tel"
                placeholder="Phone (optional, E.164 e.g. +919876543210)"
                aria-invalid={!!errors.phone}
                className="form-input"
                {...register("phone")}
              />
            </Field>

            <Field error={errors.purpose?.message}>
              <select
                aria-invalid={!!errors.purpose}
                className="form-input"
                defaultValue=""
                {...register("purpose")}
              >
                <option value="" disabled>Purpose of Contact</option>
                {PURPOSES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </Field>

            <Field error={errors.subject?.message}>
              <input
                type="text"
                placeholder="Subject"
                aria-invalid={!!errors.subject}
                className="form-input"
                {...register("subject")}
              />
            </Field>

            <Field error={errors.message?.message}>
              <textarea
                placeholder="Your Message (minimum 20 characters)"
                rows={5}
                aria-invalid={!!errors.message}
                className="form-input resize-none"
                {...register("message")}
              />
            </Field>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-gold w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>

            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-1 text-[#16a34a] text-sm font-sans font-medium"
              >
                <span className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4" />
                  Message received. We&apos;ll respond within 2&ndash;3 business days.
                </span>
                {successRequestId && (
                  <span className="text-[var(--muted)] text-xs ml-7">
                    Reference: {successRequestId}
                  </span>
                )}
              </motion.div>
            )}

            {status === "error" && serverError && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-1 text-[#dc2626] text-sm font-sans font-medium"
              >
                <span className="flex items-center gap-3">
                  <AlertCircle className="w-4 h-4" />
                  {serverError.message}
                </span>
                {serverError.requestId && (
                  <span className="text-[var(--muted)] text-xs ml-7">
                    Reference: {serverError.requestId} — quote this if you follow up.
                  </span>
                )}
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  children,
  error,
}: {
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="space-y-1.5">
      {children}
      {error && (
        <p className="text-[#dc2626] text-xs font-sans font-medium pl-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
