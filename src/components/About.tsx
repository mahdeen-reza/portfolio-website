"use client";

import { motion } from "motion/react";
import { fadeUp, fadeUpSubtle, slideFromLeft, staggerContainer } from "@/lib/animations";

export default function About() {
  return (
    <section id="about" className="bg-warm py-24 md:py-32 scroll-mt-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Section label */}
        <motion.span
          variants={slideFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="block font-body font-medium text-[11px] uppercase tracking-[0.1em] text-terracotta mb-4"
        >
          About
        </motion.span>

        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-display font-semibold text-[clamp(28px,4vw,48px)] tracking-[-0.03em] leading-[1.05] text-dark mb-12"
        >
          The person behind the systems.
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          {/* Photo + bio */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            {/* Mini photo placeholder */}
            <motion.div
              variants={fadeUpSubtle}
              className="w-24 h-24 rounded-full bg-dark/5 border border-border flex items-center justify-center shrink-0"
            >
              <span className="font-display font-bold text-2xl tracking-[-0.03em] text-dark/10">
                MR
              </span>
            </motion.div>

            <motion.div variants={fadeUpSubtle} className="flex flex-col gap-4">
              <p className="font-body text-[15px] leading-[1.7] text-dark/75">
                I&apos;m Mahdeen Reza — a Systems Governance Analyst with a background
                in economics from McGill University. I started in SalesOps, where I
                discovered that the most impactful work happens at the intersection of
                systems, data, and process.
              </p>
              <p className="font-body text-[15px] leading-[1.7] text-dark/75">
                Today I build the infrastructure that keeps organizations running
                cleanly — from AI-powered license analysis tools to SOX-compliant
                audit frameworks. I manage a 60+ system portfolio and focus on turning
                manual, error-prone processes into automated, auditable workflows.
              </p>
              <p className="font-body text-[15px] leading-[1.7] text-dark/75">
                When I&apos;m not deep in governance work, I&apos;m prototyping internal tools
                with TypeScript and React, or exploring how AI can reshape operations.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
