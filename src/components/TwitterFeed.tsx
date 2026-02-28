"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { featuredTweet } from "@/data/featured-tweet";
import { MessageCircle, Repeat2, Eye, ExternalLink, Heart } from "lucide-react";

const allTweets = [
  {
    text: "Filed a fresh PIL today seeking accountability for the destruction of temple properties. The Constitution protects every citizen\u2019s right to worship.",
    date: "Feb 28",
    likes: "8.2K",
    retweets: "2.1K",
  },
  {
    text: "Appeared before the Supreme Court on the OTT regulation matter. Arguments on content certification framework will continue next week.",
    date: "Feb 20",
    likes: "5.4K",
    retweets: "1.8K",
  },
  {
    text: "The strength of a democracy lies not in its leaders, but in its courts. Every PIL we file is a citizen\u2019s petition to the conscience of the nation.",
    date: "Feb 12",
    likes: "11.7K",
    retweets: "4.2K",
  },
  {
    text: "Consumer rights are fundamental rights. Our NCDRC victory today sets a strong precedent \u2014 corporations must answer to the people they serve.",
    date: "Jan 28",
    likes: "7.1K",
    retweets: "2.9K",
  },
  {
    text: "Honoured to speak at Sangam Talks on the evolution of PIL in India. From Hussainara Khatoon to today \u2014 the journey of justice continues.",
    date: "Jan 18",
    likes: "6.3K",
    retweets: "2.4K",
  },
  {
    text: "Digital privacy isn\u2019t a privilege \u2014 it\u2019s a constitutional right. Filed our petition challenging the new data harvesting framework before the Delhi HC.",
    date: "Jan 10",
    likes: "10.2K",
    retweets: "3.9K",
  },
];

const VISIBLE_COUNT = 4;
const CYCLE_INTERVAL = 5000;

export default function TwitterFeed() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [startIndex, setStartIndex] = useState(0);

  const visibleTweets = [];
  for (let i = 0; i < VISIBLE_COUNT; i++) {
    visibleTweets.push(allTweets[(startIndex + i) % allTweets.length]);
  }

  const cycle = useCallback(() => {
    setStartIndex((prev) => (prev + 1) % allTweets.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(cycle, CYCLE_INTERVAL);
    return () => clearInterval(timer);
  }, [cycle]);

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

        {/* Featured quote */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative rounded-[var(--radius-lg)] overflow-hidden mb-14"
          style={{
            background: "linear-gradient(135deg, #0F1724 0%, #1B2438 60%, #263152 100%)",
          }}
        >
          {/* Decorative dots */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative px-10 py-12 md:px-16 md:py-16 lg:px-20 lg:py-20">
            {/* Quote mark */}
            <div className="text-[120px] font-serif text-[var(--gold)] opacity-15 leading-none absolute top-4 left-8 md:left-14 select-none">
              &ldquo;
            </div>

            <blockquote className="relative font-serif text-[24px] md:text-[30px] lg:text-[38px] font-medium text-white leading-[1.35] max-w-4xl">
              {featuredTweet.text
                .replace(/[^\x20-\x7E\u2019\u2014\u2018.,!?\-\s]/g, "")
                .trim()}
            </blockquote>

            <div className="flex flex-wrap items-center gap-10 mt-12 pt-8 border-t border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <MessageCircle size={16} className="text-white/40" />
                <span className="text-[20px] font-bold text-white">
                  {featuredTweet.replies}
                </span>
                <span className="text-[12px] text-white/40 font-medium">
                  Replies
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Repeat2 size={16} className="text-white/40" />
                <span className="text-[20px] font-bold text-white">
                  {featuredTweet.retweets}
                </span>
                <span className="text-[12px] text-white/40 font-medium">
                  Reposts
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Eye size={16} className="text-white/40" />
                <span className="text-[20px] font-bold text-white">
                  {featuredTweet.views}
                </span>
                <span className="text-[12px] text-white/40 font-medium">
                  Views
                </span>
              </div>
            </div>
          </div>

          {/* Gold accent line at bottom */}
          <div className="h-1 bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-transparent" />
        </motion.div>

        {/* Posts header */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-[11px] font-sans font-bold tracking-[0.18em] uppercase text-[var(--muted)]">
            Recent Posts
          </span>
          <span className="flex items-center gap-2 text-[11px] font-sans font-semibold text-[var(--gold)]">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live Feed
          </span>
        </div>

        {/* Tweet grid — 4 visible, 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {visibleTweets.map((tweet, i) => (
              <motion.a
                key={tweet.text}
                href="https://twitter.com/shashank_ssj"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.97 }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                layout
                className="tweet-card block group"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-deep)] flex items-center justify-center flex-shrink-0">
                    <span className="font-serif text-[14px] font-bold text-white">
                      S
                    </span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[14px] font-sans font-semibold text-[var(--navy)] block leading-tight">
                      Shashank Shekhar Jha
                    </span>
                    <span className="text-[12px] font-sans text-[var(--muted)]">
                      @shashank_ssj
                    </span>
                  </div>
                  <span className="ml-auto text-[11px] font-sans font-medium text-[var(--faint)] whitespace-nowrap">
                    {tweet.date}
                  </span>
                </div>

                {/* Text */}
                <p className="text-[15px] font-sans text-[var(--text-dim)] leading-[1.8] mb-6 group-hover:text-[var(--navy)] transition-colors duration-300">
                  {tweet.text}
                </p>

                {/* Metrics */}
                <div className="flex gap-6 text-[12px] font-sans font-medium text-[var(--muted)]">
                  <span className="flex items-center gap-1.5">
                    <Heart size={13} />
                    {tweet.likes}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Repeat2 size={13} />
                    {tweet.retweets}
                  </span>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
