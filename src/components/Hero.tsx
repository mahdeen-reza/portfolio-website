"use client";

import React from "react";
import { motion } from "motion/react";
import { EASE_OUT_EXPO } from "@/lib/animations";
import { usePreloaderDone } from "@/lib/usePreloaderDone";

const headingLines: React.ReactNode[] = [
  "Building toward AI-powered",
  <><span className="text-cream box-decoration-clone bg-[linear-gradient(to_bottom,transparent_5%,var(--color-terracotta)_5%,var(--color-terracotta)_95%,transparent_95%)]">SaaS governance</span></>,
];

const EXPERTISE_TAGS = [
  { text: "AI & Automation", delay: 0 },
  { text: "SaaS Management", delay: 1.5 },
  { text: "Compliance & Controls", delay: 3.0 },
  { text: "Data", delay: 4.5 },
];

export default function Hero() {
  const preloaderDone = usePreloaderDone();

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-64px)] bg-cream overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 pt-16 md:pt-24 lg:pt-12 pb-20 md:pb-28 lg:pb-20 flex flex-col min-h-[calc(100vh-64px)]">
        {/* Top — Heading: centered, full width */}
        <div className="text-left mt-[4vh]">
          <h1>
            {headingLines.map((line, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={
                  preloaderDone
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 12 }
                }
                transition={{
                  duration: 1.0,
                  ease: EASE_OUT_EXPO,
                  delay: i * 0.15,
                }}
                className="block font-display font-[625] text-[clamp(48px,7.2vw,104px)] tracking-[-0.03em] leading-[1.0] text-dark"
              >
                {line}
                {i === headingLines.length - 1 && (
                  <span
                    className="inline-block bg-dark ml-[0.06em] w-[3px] h-[0.85em] translate-y-[0.05em]"
                    style={{ animation: "blink-cursor 1s step-end infinite" }}
                  />
                )}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Middle — Floating expertise tags: centered row, fills available space */}
        <div className="hidden lg:flex items-center justify-center gap-16 mt-auto mb-6">
          {EXPERTISE_TAGS.map((tag, i) => (
            <motion.div
              key={tag.text}
              initial={{ opacity: 0, y: 10 }}
              animate={
                preloaderDone
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 10 }
              }
              transition={{
                duration: 1.0,
                ease: EASE_OUT_EXPO,
                delay: 0.6 + i * 0.12,
              }}
            >
              <span
                className="font-body text-[22px] text-muted/60 tracking-wide"
                style={{
                  display: "inline-block",
                  animation: `float-wave 6s ease-in-out ${tag.delay}s infinite`,
                }}
              >
                {tag.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Mobile spacer (tags hidden on mobile) */}
        <div className="flex-1 lg:hidden" />

        {/* Bottom — Subtitle + Buttons */}
        <div className="flex flex-col gap-6 text-center lg:text-left mt-auto lg:flex-row lg:items-end lg:justify-between">
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={
                preloaderDone
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 6 }
              }
              transition={{
                duration: 0.9,
                ease: EASE_OUT_EXPO,
                delay: 0.5,
              }}
              className="font-body text-[17px] md:text-[23px] leading-[1.7] text-muted max-w-md lg:max-w-[55%] mx-auto lg:mx-0"
            >
              <span className="text-charcoal font-semibold">Systems Governance Analyst at Lightspeed Commerce — building the function from scratch.</span>{" "}
              Scope spans SaaS management, data infrastructure and analysis, compliance controls, workflow automation, and AI-powered internal tooling. Exploring what becomes possible when you put AI inside the systems layer.{" "}
              <span className="text-terracotta-dark font-semibold">The work, as it's being built.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={
                preloaderDone
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 6 }
              }
              transition={{
                duration: 0.9,
                ease: EASE_OUT_EXPO,
                delay: 0.65,
              }}
              className="flex justify-center lg:justify-end lg:shrink-0"
            >
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-terracotta text-cream font-body text-[19px] font-semibold tracking-[0.04em] px-5.5 py-2.5 rounded-lg transition-colors duration-200 hover:bg-terracotta-dark hover:text-cream select-none cursor-pointer"
              >
                <span className="inline-block" style={{ animation: "bounce-arrow 1.5s ease-in-out infinite" }}>↓</span>{" "}Work
              </button>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
