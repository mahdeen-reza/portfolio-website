"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import {
  fadeUpFast,
  fadeUpSubtleFast,
  staggerContainerFast,
} from "@/lib/animations";

/* ── Info container data ── */
const HOBBIES = [
  { emoji: "\u{1F3CF}", label: "Cricket" },
  { emoji: "\u26BD", label: "Football" },
  { emoji: "\u{1F3BE}", label: "Padel" },
  { emoji: "\u{1F916}", label: "AI" },
  { emoji: "\u{1F3DB}\uFE0F", label: "Economics and Politics" },
  { emoji: "\u{1F4C8}", label: "Financial Markets" },
  { emoji: "\u{1F454}", label: "Fashion" },
  { emoji: "\u{1F37D}\uFE0F", label: "Food" },
];

const CAREER_PATHS = [
  { emoji: "\u{1F3AF}", label: "Product" },
  { emoji: "\u{1F504}", label: "RevOps" },
  { emoji: "\u{1F3D7}\uFE0F", label: "Solutions Architect" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [showComingSoon, setShowComingSoon] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "start 0.2"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [32, 0]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-white overflow-hidden scroll-mt-16 pt-8 md:pt-12"
    >
      <motion.div
        style={
          prefersReducedMotion
            ? {}
            : { scale, borderRadius }
        }
        className="bg-warm-sand min-h-[calc(85vh-54px)] flex flex-col pt-10 pb-16 md:pt-16 md:pb-28 origin-center"
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 w-full">
          {/* Section heading */}
          <motion.h2
            variants={fadeUpFast}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="font-display font-bold text-[clamp(38px,5.5vw,72px)] uppercase tracking-[-0.03em] text-terracotta mb-8 will-change-transform"
          >
            About
          </motion.h2>

          {/* Two-column layout: 30/70 (portrait left, text right) */}
          <motion.div
            variants={staggerContainerFast}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-10 lg:gap-12 items-stretch"
          >
            {/* ── Left column: photo + resume button ── */}
            <motion.div
              variants={fadeUpSubtleFast}
              className="flex flex-col will-change-transform"
            >
              <Image
                src="/portrait-final.jpg"
                alt="Mahdeen Reza"
                width={1200}
                height={1200}
                className="w-full h-auto object-cover"
                sizes="(max-width: 1024px) 100vw, 30vw"
              />
              <div className="flex-1" />
              <button
                type="button"
                onClick={() => setShowComingSoon(true)}
                className="inline-flex items-center justify-center gap-2 w-full bg-terracotta text-cream font-body text-[16px] font-medium tracking-[0.04em] px-6 py-3 rounded-lg transition-colors duration-200 hover:bg-terracotta-dark mt-4 select-none"
              >
                Download Resume
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
              </button>
              {showComingSoon && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-2 rounded-lg bg-dark/90 text-cream font-body text-[13px] tracking-[0.06em] text-center py-2 px-4"
                >
                  COMING SOON
                </motion.div>
              )}
            </motion.div>

            {/* ── Right column: text + containers ── */}
            <motion.div variants={fadeUpFast} className="flex flex-col will-change-transform">
              {/* Body text */}
              <div className="mb-8 space-y-4">
                <p className="font-body text-[17px] md:text-[23px] leading-[1.7] text-charcoal">
                  Economics and Political Science at McGill &mdash; into Sales
                  Operations &mdash; now building at the intersection of
                  Business, GTM Systems, AI, and Data. Unconventional entry into
                  tech, intentional in direction.
                </p>
                <p className="font-body text-[17px] md:text-[23px] leading-[1.7] text-charcoal">
                  A business-first foundation brings a different angle to
                  systems thinking &mdash; one that connects the operational and
                  the technical. This site documents the work as it&apos;s being
                  built.
                </p>
              </div>

              {/* Separator */}
              <div className="border-t border-dark/10 mb-8" />

              {/* Info containers — grid, full width, equal height */}
              <div className="grid grid-cols-1 sm:grid-cols-[3fr_1fr] gap-4">
                {/* Hobbies — 3-column list */}
                <div className="bg-dark/[0.03] border border-dark/10 rounded-xl pl-6 sm:pl-12 pr-6 py-6">
                  <h3 className="font-display font-bold text-[15px] uppercase tracking-[0.06em] text-dark mb-5">
                    Hobbies &amp; Interests
                  </h3>
                  <ul className="grid grid-cols-2 gap-x-6 sm:grid-cols-3 sm:gap-x-10 gap-y-2.5">
                    {HOBBIES.map((item) => (
                      <li
                        key={item.label}
                        className="flex items-center gap-2.5 font-body text-[13px] leading-[1.6] text-muted"
                      >
                        <span className="text-[15px] shrink-0">{item.emoji}</span>
                        {item.label}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Career Path — equal height via grid stretch */}
                <div className="bg-dark/[0.03] border border-dark/10 rounded-xl px-7 py-6">
                  <h3 className="font-display font-bold text-[15px] uppercase tracking-[0.06em] text-dark mb-5">
                    Career Path Interests
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {CAREER_PATHS.map((item) => (
                      <li
                        key={item.label}
                        className="flex items-center gap-2.5 font-body text-[13px] leading-[1.6] text-muted"
                      >
                        <span className="text-[15px] shrink-0">{item.emoji}</span>
                        {item.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
