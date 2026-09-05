"use client";

import { useRef } from "react";
import Script from "next/script";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function TwitterFeed() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      id="twitter"
      className="section-padding relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, var(--bg) 0%, var(--bg-warm) 50%, var(--bg) 100%)",
      }}
    >
      {/* Subtle circles */}
      <div className="absolute top-[-120px] right-[-80px] w-[500px] h-[500px] rounded-full border border-[var(--gold)] opacity-[0.04]" />
      <div className="absolute bottom-[-100px] left-[-60px] w-[400px] h-[400px] rounded-full border border-[var(--gold)] opacity-[0.03]" />

      <div className="container-main relative z-10">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="section-label"
            >
              Social Voice
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="section-title !mb-0"
            >
              On <em>Law &amp; Justice</em>
            </motion.h2>
          </div>
          <motion.a
            href="https://twitter.com/shashank_ssj"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2.5 text-[11px] font-sans font-bold tracking-[0.14em] uppercase text-[var(--navy)] bg-[var(--bg)] border-2 border-[var(--border-strong)] px-7 py-3.5 rounded-full mt-6 md:mt-0 hover:bg-[var(--navy)] hover:text-white hover:border-[var(--navy)] transition-all duration-300"
          >
            Follow @shashank_ssj
            <ExternalLink size={13} />
          </motion.a>
        </div>

        {/* Real, live embedded timeline from X */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-white border border-[var(--border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] overflow-hidden flex justify-center p-2"
        >
          <a
            className="twitter-timeline"
            data-height="700"
            data-theme="light"
            data-chrome="noheader nofooter noborders transparent"
            href="https://twitter.com/shashank_ssj?ref_src=twsrc%5Etfw"
          >
            Tweets by @shashank_ssj
          </a>
          <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />
        </motion.div>
      </div>
    </section>
  );
}
