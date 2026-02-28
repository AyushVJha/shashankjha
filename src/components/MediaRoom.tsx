"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { news } from "@/data/news";
import { ExternalLink, Tv, Newspaper, Mic, MessageSquare } from "lucide-react";

const categoryInfo = {
  Press: { icon: Newspaper, color: "#2563eb" },
  TV: { icon: Tv, color: "#dc2626" },
  Interview: { icon: MessageSquare, color: "#059669" },
  Speaking: { icon: Mic, color: "#7c3aed" },
};

export default function MediaRoom() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="media" className="section-padding relative overflow-hidden" style={{ background: "linear-gradient(180deg, var(--bg-warm) 0%, var(--bg) 100%)" }}>
      {/* Subtle dot background */}
      <div className="absolute inset-0 opacity-[0.3]" style={{
        backgroundImage: 'radial-gradient(circle, rgba(15,23,36,0.04) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />
      
      <div className="container-main relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-label"
        >
          Press &amp; Media
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-title"
        >
          In The <em>Spotlight</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="section-sub"
        >
          Featured in leading publications and news channels across India
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, i) => {
            const catInfo = categoryInfo[item.category];
            const Icon = catInfo.icon;
            return (
              <motion.a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group relative bg-white border border-[var(--border)] rounded-[var(--radius-lg)] p-8 hover:border-[var(--gold-border)] hover:shadow-[var(--shadow-xl)] transition-all duration-400 flex flex-col"
              >
                {/* Category badge */}
                <div className="flex items-center justify-between mb-5">
                  <div 
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-sans font-bold tracking-[0.1em] uppercase"
                    style={{ 
                      backgroundColor: `${catInfo.color}10`,
                      color: catInfo.color
                    }}
                  >
                    <Icon size={12} />
                    {item.category}
                  </div>
                  <span className="text-[12px] font-sans text-[var(--faint)]">{item.date}</span>
                </div>
                
                {/* Publication name */}
                <p className="text-[13px] font-sans font-bold tracking-[0.08em] uppercase text-[var(--gold)] mb-3">
                  {item.publication}
                </p>

                <h3 className="font-serif text-[18px] md:text-[20px] font-medium text-[var(--navy)] leading-[1.45] group-hover:text-[var(--gold)] transition-colors duration-300 mb-6 flex-1">
                  {item.headline}
                </h3>

                <span className="text-[12px] font-sans font-semibold tracking-[0.1em] uppercase text-[var(--muted)] group-hover:text-[var(--gold)] transition-all duration-300 inline-flex items-center gap-2">
                  Read more
                  <ExternalLink size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                
                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
