"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cases } from "@/data/cases";
import { Scale, Building2, FileText, Clock } from "lucide-react";

const filters = ["All", "Supreme Court", "High Court", "PIL"];

function statusInfo(status: string) {
  switch (status) {
    case "Ongoing":
      return { label: "Active", color: "#5B7A5E", bg: "#5B7A5E15", glow: true };
    case "Filed":
      return { label: "Pending", color: "#B8963F", bg: "#B8963F15", glow: false };
    case "Disposed":
      return { label: "Resolved", color: "#4A5B7A", bg: "#4A5B7A15", glow: false };
    case "Landmark":
      return { label: "Landmark", color: "#6B5B7A", bg: "#6B5B7A15", glow: false };
    case "Dismissed":
      return { label: "Concluded", color: "#6b7280", bg: "#6b728015", glow: false };
    case "Withdrawn for refiling":
      return { label: "Under Review", color: "#A66B3F", bg: "#A66B3F15", glow: false };
    default:
      return { label: status, color: "#6b7280", bg: "#6b728015", glow: false };
  }
}

function getCategoryIcon(category: string) {
  if (category.includes("Supreme Court")) return Scale;
  if (category.includes("High Court")) return Building2;
  if (category.includes("PIL")) return FileText;
  return Clock;
}

export default function Cases() {
  const [activeFilter, setActiveFilter] = useState("All");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const filteredCases = cases.filter((c) => {
    if (activeFilter === "All") return true;
    return c.category.includes(activeFilter);
  });

  return (
    <section ref={ref} id="cases" className="section-padding relative overflow-hidden" style={{ background: "linear-gradient(180deg, var(--bg) 0%, var(--bg-warm) 50%, var(--bg) 100%)" }}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-[var(--gold)] opacity-[0.02] blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[var(--navy)] opacity-[0.02] blur-[100px]" />
      
      <div className="container-main relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-label"
        >
          Litigation Portfolio
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-title"
        >
          Landmark Cases<br /><em>&amp; Petitions</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="section-sub"
        >
          Constitutional battles fought across India&apos;s highest courts — each case representing 
          a commitment to justice, civil liberties, and the rule of law.
        </motion.p>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-14"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`text-[11px] font-sans font-bold tracking-[0.12em] uppercase px-6 py-3 border rounded-full transition-all duration-300 ${
                activeFilter === filter
                  ? "text-white bg-[var(--navy)] border-[var(--navy)] shadow-[0_4px_16px_rgba(26,31,54,0.25)]"
                  : "text-[var(--muted)] bg-white border-[var(--border)] hover:border-[var(--gold-border)] hover:text-[var(--navy)]"
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Case tiles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((c, i) => {
            const info = statusInfo(c.status);
            const Icon = getCategoryIcon(c.category[0]);
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                className="group relative bg-white border border-[var(--border)] rounded-[var(--radius-lg)] p-8 hover:border-[var(--gold)] hover:shadow-[var(--shadow-xl)] transition-all duration-400"
              >
                {/* Top row: icon + year + status */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--bg-warm)] flex items-center justify-center">
                      <Icon size={18} className="text-[var(--gold)]" />
                    </div>
                    <span className="font-serif text-[26px] font-light text-[var(--faint)]">
                      {c.year}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {info.glow && <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
                    <span
                      className="text-[10px] font-sans font-bold tracking-[0.12em] uppercase px-3 py-1.5 rounded-full"
                      style={{ backgroundColor: info.bg, color: info.color }}
                    >
                      {info.label}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-serif text-[21px] md:text-[23px] font-semibold text-[var(--navy)] leading-[1.3] mb-3 group-hover:text-[var(--gold)] transition-colors duration-400">
                  {c.title}
                </h3>

                {/* Court */}
                <p className="text-[12px] font-sans font-semibold tracking-[0.08em] text-[var(--muted)] uppercase mb-4">
                  {c.court}
                </p>

                {/* Description */}
                <p className="text-[14px] font-sans text-[var(--text-dim)] leading-[1.75] mb-6 line-clamp-3">
                  {c.description}
                </p>

                {/* Category tags */}
                <div className="flex flex-wrap gap-2 pt-5 border-t border-[var(--border)]">
                  {c.category.map((cat) => (
                    <span
                      key={cat}
                      className="text-[9px] font-sans font-bold tracking-[0.1em] uppercase text-[var(--muted)] px-3 py-1.5 border border-[var(--border)] rounded-full bg-[var(--bg)] group-hover:border-[var(--gold-border)] group-hover:text-[var(--gold)] transition-all duration-300"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                
                {/* Hover accent */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[var(--gold)] to-transparent rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
