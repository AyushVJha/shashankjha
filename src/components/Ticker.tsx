"use client";

import { tickerItems } from "@/data/ticker";

export default function Ticker() {
  const doubled = [...tickerItems, ...tickerItems];

  return (
    <div className="border-t border-b border-[var(--border)] overflow-hidden py-4 bg-[var(--surface)]">
      <div className="ticker-animate flex whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center text-[var(--muted)] font-sans text-[11px] tracking-[0.15em] uppercase mx-8"
          >
            {item}
            <span className="text-[var(--gold)] ml-8">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
