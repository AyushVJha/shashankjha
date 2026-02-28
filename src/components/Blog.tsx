"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

const blogPosts = [
  {
    slug: "ott-regulation-india",
    title: "Why India Needs an OTT Regulatory Framework",
    excerpt:
      "The digital content landscape in India has grown exponentially, yet the regulatory framework has not kept pace. A closer look at why self-regulation isn't enough.",
    date: "September 2024",
    readTime: "6 min read",
  },
  {
    slug: "pil-as-instrument-of-change",
    title: "PIL as an Instrument of Social Change",
    excerpt:
      "Public Interest Litigation has been one of the most powerful tools in Indian jurisprudence. Examining its evolution and how it continues to shape policy.",
    date: "July 2024",
    readTime: "8 min read",
  },
  {
    slug: "digital-rights-constitution",
    title: "Digital Rights and the Indian Constitution",
    excerpt:
      "As technology evolves, so must our understanding of fundamental rights. How Indian courts are interpreting constitutional protections in the digital age.",
    date: "May 2024",
    readTime: "5 min read",
  },
];

export default function Blog() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="blog" className="pt-24 pb-24 bg-navy relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-off-white mb-3">
            Legal <span className="text-saffron">Insights</span>
          </h2>
          <p className="font-inter text-off-white/60 text-lg">
            Thoughts on law, constitution, and public policy
          </p>
        </motion.div>

        {/* Blog cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block bg-navy-lighter rounded-xl border border-off-white/5 p-6 h-full hover:border-saffron/20 transition-all case-card"
              >
                <div className="flex items-center gap-2 text-off-white/40 text-xs font-inter mb-4">
                  <Calendar size={14} />
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="font-playfair text-xl font-bold text-off-white mb-3 group-hover:text-saffron transition-colors leading-tight">
                  {post.title}
                </h3>

                <p className="font-inter text-off-white/50 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <span className="inline-flex items-center gap-1 text-saffron text-sm font-inter font-medium group-hover:underline">
                  Read Article <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
