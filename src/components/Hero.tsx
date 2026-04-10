"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { EASE_OUT_EXPO, fadeUp, staggerContainer } from "@/lib/animations";
import { usePreloaderDone } from "@/lib/usePreloaderDone";

const headingLines = ["Building the", "systems behind", "the systems."];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const preloaderDone = usePreloaderDone();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100vh-64px)] bg-cream overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24 lg:py-32 flex flex-col lg:grid lg:grid-cols-[1fr_0.7fr] gap-12 lg:gap-16 items-center">
        {/* Left column — text */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={preloaderDone ? "visible" : "hidden"}
          className="flex flex-col gap-6 text-center lg:text-left"
        >
          {/* Heading — staggered lines */}
          <h1>
            {headingLines.map((line, i) => (
              <motion.span
                key={i}
                variants={fadeUp}
                className="block font-display font-bold text-[clamp(48px,8vw,100px)] tracking-[-0.04em] leading-[0.98] text-dark"
              >
                {line}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="font-body text-[15px] leading-[1.7] text-muted max-w-md mx-auto lg:mx-0"
          >
            Systems Governance Analyst specializing in AI, SaaS management,
            automation, and compliance. Turning complexity into clarity.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            <Link
              href="/projects"
              className="bg-terracotta text-cream font-body font-medium text-[13px] px-6 py-3 rounded-lg transition-all duration-200 hover:bg-terracotta-dark hover:scale-[1.02]"
            >
              View projects
            </Link>
            <Link
              href="https://linkedin.com/in/mahdeen-reza"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-charcoal text-charcoal font-body font-medium text-[13px] px-6 py-3 rounded-lg transition-all duration-250 hover:bg-charcoal hover:text-cream"
            >
              LinkedIn &rarr;
            </Link>
          </motion.div>
        </motion.div>

        {/* Right column — photo placeholder with parallax */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={preloaderDone ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.4 }}
          style={{ y: photoY }}
          className="w-full max-w-[400px] lg:max-w-none"
        >
          <div className="aspect-[3/4] rounded-2xl bg-dark/5 border border-border flex items-center justify-center">
            <span className="font-display font-bold text-[clamp(48px,6vw,80px)] tracking-[-0.04em] text-dark/10">
              MR
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
