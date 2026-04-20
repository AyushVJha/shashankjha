"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSchema, type NewsletterInput } from "@/lib/schemas/newsletter";

export default function NewsletterSignup({ source = "footer" }: { source?: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "", source, website: "" },
    mode: "onSubmit",
  });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (values) => {
    setStatus("idle");
    setServerError(null);

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus("error");
        setServerError(data.error || "Something went wrong.");
        return;
      }

      setStatus("success");
      reset({ email: "", source, website: "" });
    } catch {
      setStatus("error");
      setServerError("Network error. Please try again shortly.");
    }
  });

  return (
    <div className="w-full max-w-md text-center">
      <p className="text-[11px] font-sans font-bold tracking-[0.18em] uppercase text-[var(--gold)] mb-3">
        Stay updated
      </p>
      <p className="text-[13px] font-sans text-[var(--muted)] mb-4 leading-relaxed">
        Occasional notes on cases, PILs, and commentary — nothing else.
      </p>

      {status === "success" ? (
        <div className="flex items-center justify-center gap-2 text-[#16a34a] text-sm font-sans font-medium py-3">
          <CheckCircle2 className="w-4 h-4" />
          Check your inbox to confirm.
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="flex flex-col sm:flex-row gap-2">
          <div
            aria-hidden="true"
            style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }}
          >
            <label>
              Website
              <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
            </label>
          </div>

          <input
            type="email"
            placeholder="your@email.com"
            aria-invalid={!!errors.email}
            aria-label="Email address"
            className="form-input flex-1"
            {...register("email")}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-gold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Subscribe"}
          </button>
        </form>
      )}

      {errors.email && (
        <p className="text-[#dc2626] text-xs font-sans font-medium mt-2" role="alert">
          {errors.email.message}
        </p>
      )}

      {status === "error" && serverError && (
        <p className="flex items-center justify-center gap-2 text-[#dc2626] text-xs font-sans font-medium mt-2">
          <AlertCircle className="w-3 h-3" />
          {serverError}
        </p>
      )}
    </div>
  );
}
