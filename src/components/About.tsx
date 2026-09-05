"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Award, Building, MapPin } from "lucide-react";

const courts = [
  "Supreme Court of India",
  "Delhi High Court",
  "Karnataka High Court",
  "Allahabad High Court",
  "Patna High Court",
  "Uttarakhand High Court",
  "NCLT / NCLAT",
  "DRT / DRAT",
  "NCDRC",
  "RERA Tribunals",
];

const highlights = [
  { icon: GraduationCap, label: "Education", value: "LLB, BA Journalism" },
  { icon: Award, label: "Experience", value: "7+ Years Practice" },
  { icon: Building, label: "Primary Court", value: "Supreme Court" },
  { icon: MapPin, label: "Based In", value: "New Delhi" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="about" className="section-padding relative overflow-hidden" style={{ background: "linear-gradient(180deg, var(--bg) 0%, var(--bg-warm) 50%, var(--bg-cream) 100%)" }}>
      {/* Decorative circles */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full border border-[var(--gold)] opacity-[0.05]" />
      <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] rounded-full border border-[var(--gold)] opacity-[0.03]" />
      
      <div className="container-main relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 lg:gap-24 items-start">
          {/* Left — Text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="section-label"
            >
              The Advocate
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="section-title mb-10"
            >
              About <em>Shashank</em>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-serif font-semibold leading-[1.2] mb-10 text-[var(--navy)]"
              style={{ fontSize: "clamp(26px, 3.5vw, 38px)" }}
            >
              A practicing advocate who believes law is not just a profession
              — <span className="text-[var(--gold)]">it is a calling.</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[16px] font-sans text-[var(--text-dim)] leading-[1.9] mb-6"
            >
              Shashank Shekhar Jha is a Supreme Court of India advocate with over
              7 years of dedicated practice. He has successfully appeared before the Supreme Court, 
              Delhi High Court, Karnataka High Court, Allahabad High Court, Patna High
              Court, Uttarakhand High Court, NCLT, NCLAT, and multiple other
              tribunals across the country.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-[16px] font-sans text-[var(--text-dim)] leading-[1.9] mb-10"
            >
              Known for his fearless advocacy on constitutional rights and 
              public interest matters, he has filed landmark PILs on issues of national importance —
              from seeking justice in criminal cases to OTT content regulation to communal
              violence investigations. A regular face on national television debates
              and one of India&apos;s most followed legal voices on social media.
            </motion.p>

            {/* Quick facts grid */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12 p-7 bg-white rounded-[var(--radius-lg)] border border-[var(--border)] shadow-[var(--shadow-sm)]"
            >
              {highlights.map((item, i) => (
                <div key={item.label} className="text-center">
                  <item.icon size={20} className="mx-auto mb-2 text-[var(--gold)]" />
                  <div className="text-[10px] font-sans font-semibold tracking-[0.12em] uppercase text-[var(--muted)] mb-1">{item.label}</div>
                  <div className="text-[13px] font-sans font-semibold text-[var(--navy)]">{item.value}</div>
                </div>
              ))}
            </motion.div>

            {/* Courts practiced in */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <div className="text-[11px] font-sans font-bold tracking-[0.15em] uppercase text-[var(--gold)] mb-4">
                Courts &amp; Tribunals
              </div>
              <div className="flex flex-wrap gap-2">
                {courts.map((court) => (
                  <span 
                    key={court} 
                    className="text-[11px] font-sans font-medium text-[var(--text-dim)] px-4 py-2 bg-white border border-[var(--border)] rounded-full hover:border-[var(--gold-border)] hover:text-[var(--gold)] transition-all duration-300"
                  >
                    {court}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative w-full max-w-xs mx-auto lg:max-w-none lg:mx-0 lg:sticky lg:top-32"
          >
            {/* Decorative frames */}
            <div className="absolute -top-4 -right-4 w-full h-full border-2 border-[var(--gold)] opacity-20 rounded-2xl" />
            <div className="absolute -bottom-3 -left-3 w-full h-full border border-[var(--gold)] opacity-10 rounded-2xl" />

            <div className="relative w-full shadow-[0_24px_70px_rgba(26,31,54,0.12)] rounded-2xl overflow-hidden">
              <div className="relative aspect-[3/4] bg-[var(--bg)]">
                <div className="absolute inset-0 bg-[var(--bg-warm)] flex items-center justify-center">
                  <span className="font-serif text-8xl text-[var(--navy)]/[0.04]">SSJ</span>
                </div>
                <Image
                  src="/images/shashank-about.jpg"
                  alt="Advocate Shashank Shekhar Jha"
                  fill
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 384px, 90vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/30 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
