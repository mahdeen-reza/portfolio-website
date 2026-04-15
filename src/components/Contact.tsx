"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { fadeUp, fadeUpSubtle, staggerContainer } from "@/lib/animations";

export default function Contact() {
  return (
    <section id="contact" className="bg-cream py-24 md:py-32 scroll-mt-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-xl"
        >
          {/* Section label */}
          <motion.span
            variants={fadeUpSubtle}
            className="block font-body font-medium text-[11px] uppercase tracking-[0.1em] text-terracotta mb-4"
          >
            Get in touch
          </motion.span>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            className="font-display font-semibold text-[clamp(28px,4vw,48px)] tracking-[-0.03em] leading-[1.05] text-dark mb-4"
          >
            Let&apos;s talk.
          </motion.h2>

          {/* Copy */}
          <motion.p
            variants={fadeUpSubtle}
            className="font-body text-[15px] leading-[1.7] text-muted mb-8"
          >
            Open to conversations about AI, SaaS management, and the future of
            operations work. Reach out and let&apos;s connect.
          </motion.p>

          {/* Links */}
          <motion.div
            variants={fadeUpSubtle}
            className="flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <Link
              href="https://linkedin.com/in/mahdeen-reza"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-terracotta text-cream font-body font-medium text-[13px] px-6 py-3 rounded-lg transition-all duration-200 hover:bg-terracotta-dark hover:scale-[1.02]"
            >
              LinkedIn &rarr;
            </Link>
            <Link
              href="mailto:hello@mahdeenreza.com"
              className="font-body text-[13px] text-dark/70 transition-colors duration-200 hover:text-terracotta py-2"
            >
              hello@mahdeenreza.com
            </Link>
            <Link
              href="https://github.com/mahdeen-reza"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[13px] text-dark/70 transition-colors duration-200 hover:text-terracotta py-2"
            >
              GitHub
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
