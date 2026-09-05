"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Scale, FileText, Shield, Building2, Users, Laptop, Briefcase, Heart } from "lucide-react";

const expertiseItems = [
  { name: "Public Interest Litigation", desc: "Fighting for constitutional rights at the highest courts of India", Icon: Scale, color: "#D9BB6C" },
  { name: "Writ Petitions", desc: "Challenging unjust laws and executive overreach under Article 32 & 226", Icon: FileText, color: "#7B8CAD" },
  { name: "Criminal Litigation", desc: "Defense and prosecution across all jurisdictions with strategic advocacy", Icon: Shield, color: "#B87373" },
  { name: "Civil Suits", desc: "Complex disputes in property, contracts, torts, and recovery matters", Icon: Building2, color: "#7FA184" },
  { name: "Consumer Disputes", desc: "Protecting consumer rights at NCDRC & State Consumer Forums", Icon: Users, color: "#9B8AAD" },
  { name: "Cyber & IT Law", desc: "Digital rights, online defamation, IT Act violations, and data protection", Icon: Laptop, color: "#6FA3A3" },
  { name: "Corporate Disputes", desc: "NCLT, insolvency proceedings, and company law matters", Icon: Briefcase, color: "#C79361" },
  { name: "Family Law", desc: "Custody battles, divorce proceedings, and matrimonial disputes", Icon: Heart, color: "#B77E93" },
];

export default function Expertise() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="expertise" className="section-padding relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F1724 0%, #1B2438 50%, #162035 100%)" }}>
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }} />
      
      <div className="container-main relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-label !text-[var(--gold-light)]"
        >
          Practice Areas
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-title !text-white"
        >
          Legal <em>Expertise</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="section-sub !text-white/50"
        >
          Comprehensive legal representation across India&apos;s judicial system, 
          from the Supreme Court to specialized tribunals.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {expertiseItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
              className="group bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-[var(--radius-lg)] p-8 hover:bg-white/[0.1] hover:border-[var(--gold-border)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)] transition-all duration-400"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300"
                style={{ backgroundColor: `${item.color}20` }}
              >
                <item.Icon size={22} style={{ color: item.color }} />
              </div>
              
              <h3 className="font-serif text-[19px] font-semibold text-white leading-[1.3] mb-3 group-hover:text-[var(--gold-light)] transition-colors duration-300">
                {item.name}
              </h3>
              <p className="text-[13px] font-sans text-white/50 leading-[1.7]">
                {item.desc}
              </p>
              
              {/* Hover line accent */}
              <div className="w-0 h-[2px] bg-[var(--gold)] mt-6 group-hover:w-12 transition-all duration-400" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
