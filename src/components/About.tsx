"use client";

import { motion } from "motion/react";
import { fadeUp, slideFromLeft, staggerContainer } from "@/lib/animations";

const SKILLS = [
  {
    category: "Data & Analytics",
    tools: ["BigQuery", "Looker", "SQL", "Fivetran", "dbt"],
  },
  {
    category: "Automation & AI",
    tools: ["TypeScript", "React", "Python", "OpenAI API", "Apps Script"],
  },
  {
    category: "Governance & Compliance",
    tools: ["SOX ITGC", "Access Reviews", "SaaS Management", "Okta", "Zylo"],
  },
];

export default function About() {
  return (
    <section id="about" className="bg-warm py-20 md:py-28 scroll-mt-16">
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

        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16">
          {/* Left — photo + bio */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* Mini photo placeholder */}
            <motion.div
              variants={fadeUp}
              className="w-24 h-24 rounded-full bg-dark/5 border border-border flex items-center justify-center"
            >
              <span className="font-display font-bold text-2xl tracking-[-0.03em] text-dark/10">
                MR
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-4">
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
          </motion.div>

          {/* Right — skills grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            {SKILLS.map((skill) => (
              <motion.div key={skill.category} variants={fadeUp}>
                <h3 className="font-display font-semibold text-base tracking-[-0.02em] text-dark mb-3">
                  {skill.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skill.tools.map((tool) => (
                    <span
                      key={tool}
                      className="font-body text-[12px] text-muted bg-dark/[0.04] border border-border px-3 py-1.5 rounded-md"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
