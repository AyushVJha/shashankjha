"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const stats = [
  { value: "7", suffix: "+", label: "Years Practice" },
  { value: "20", suffix: "+", label: "Courts" },
  { value: "50", suffix: "+", label: "PILs Filed" },
  { value: "15", label: "States" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-screen flex items-center"
      style={{
        background:
          "radial-gradient(ellipse 120% 80% at 20% 50%, #F5F0E6 0%, #FAF9F6 50%, #F0EBE1 100%)",
      }}
    >
      {/* Fine dot pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(201,168,76,0.12) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Large sweeping gold arc */}
      <div className="absolute top-[-40%] right-[-20%] w-[900px] h-[900px] rounded-full border border-[var(--gold)] opacity-[0.07] z-0" />
      <div className="absolute bottom-[-30%] left-[-15%] w-[700px] h-[700px] rounded-full border border-[var(--gold)] opacity-[0.05] z-0" />

      {/* Corner ornaments */}
      <div className="hidden lg:block absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-[var(--gold)] opacity-25 z-0" />
      <div className="hidden lg:block absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-[var(--gold)] opacity-25 z-0" />

      <div className="relative z-10 w-full py-28 lg:py-0">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-16 lg:gap-20 items-center min-h-[calc(100vh-80px)]">
            {/* Left — Text */}
            <div className="text-center lg:text-left pt-16 lg:pt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="inline-flex items-center gap-3 mb-10"
              >
                <span className="w-10 h-[1.5px] bg-[var(--gold)]" />
                <span className="text-[11px] font-sans font-bold tracking-[0.3em] uppercase text-[var(--gold)]">
                  Advocate · Supreme Court of India
                </span>
                <span className="w-10 h-[1.5px] bg-[var(--gold)]" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-serif font-bold leading-[0.92] text-[var(--navy)]"
                style={{ fontSize: "clamp(52px, 8vw, 100px)" }}
              >
                Shashank
                <br />
                <span className="text-[var(--gold)] italic font-medium">
                  Shekhar
                </span>{" "}
                Jha
              </motion.h1>

              {/* Elegant separator */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-4 my-10 justify-center lg:justify-start origin-left"
              >
                <span className="w-16 h-[2px] bg-gradient-to-r from-[var(--gold)] to-transparent" />
                <span className="w-[6px] h-[6px] rounded-full bg-[var(--gold)]" />
                <span className="w-10 h-[1px] bg-[var(--gold)] opacity-40" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="text-[17px] sm:text-[19px] text-[var(--text-dim)] font-sans font-normal max-w-[480px] mx-auto lg:mx-0 leading-[1.85]"
              >
                Constitutional lawyer, PIL advocate, and one of India&apos;s most
                prominent legal voices — fighting for justice across the
                nation&apos;s highest courts.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-5 mt-14"
              >
                <a href="#cases" className="btn-gold">
                  View Landmark Cases
                  <ArrowRight size={15} strokeWidth={2.5} />
                </a>
                <a href="#contact-section" className="btn-ghost">
                  Get In Touch
                </a>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="grid grid-cols-4 gap-6 max-w-[540px] mx-auto lg:mx-0 mt-20 pt-10 border-t border-[var(--border-strong)]"
              >
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.85 + i * 0.08 }}
                    className="text-center lg:text-left"
                  >
                    <div className="font-serif text-[38px] sm:text-[46px] font-bold text-[var(--navy)] leading-none">
                      {stat.value}
                      {stat.suffix && (
                        <span className="text-[var(--gold)]">
                          {stat.suffix}
                        </span>
                      )}
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-[var(--muted)] mt-3">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right — Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="hidden lg:block relative"
            >
              {/* Gold frame behind */}
              <div className="absolute -top-5 -right-5 w-full h-full border-2 border-[var(--gold)] opacity-15 rounded-[var(--radius-lg)]" />
              <div className="absolute -bottom-5 -left-5 w-full h-full border border-[var(--gold)] opacity-10 rounded-[var(--radius-lg)]" />

              <div className="relative rounded-[var(--radius-lg)] overflow-hidden shadow-[0_40px_100px_rgba(15,23,36,0.2)]">
                <div className="aspect-[3/4] relative bg-[var(--bg-warm)]">
                  <img
                    src="/images/shashank-hero.jpg"
                    alt="Advocate Shashank Shekhar Jha"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a]/80 via-[#0a0f1a]/10 to-transparent" />
                </div>

                {/* Caption overlay */}
                <div className="absolute bottom-0 left-0 right-0 px-8 py-8">
                  <div className="text-white font-serif text-[22px] font-semibold tracking-wide">
                    Adv. Shashank Shekhar Jha
                  </div>
                  <div className="text-white/60 text-[10px] font-sans font-bold tracking-[0.25em] uppercase mt-1.5">
                    Supreme Court of India
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] font-sans font-bold tracking-[0.3em] uppercase text-[var(--muted)]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <ChevronDown size={16} className="text-[var(--gold)]" />
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg)] to-transparent z-10" />
    </section>
  );
}
