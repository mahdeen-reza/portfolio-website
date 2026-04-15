"use client";

import { motion } from "motion/react";
import { fadeUp, fadeUpSubtle, staggerContainer } from "@/lib/animations";

const SKILL_CATEGORIES = [
  {
    title: "Data & Analytics",
    tools: ["BigQuery", "Looker", "SQL", "Fivetran", "dbt"],
  },
  {
    title: "Automation & AI",
    tools: ["TypeScript", "React", "Python", "OpenAI API", "Apps Script"],
  },
  {
    title: "Governance & Compliance",
    tools: ["SOX ITGC", "Access Reviews", "SaaS Management", "Okta", "Zylo"],
  },
];

export default function Skills() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Section label */}
        <motion.span
          variants={fadeUpSubtle}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="block font-body font-medium text-[11px] uppercase tracking-[0.1em] text-terracotta mb-4"
        >
          Skills &amp; Tools
        </motion.span>

        {/* Section heading */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-display font-semibold text-[clamp(28px,4vw,48px)] tracking-[-0.03em] leading-[1.05] text-dark mb-12"
        >
          What I work with.
        </motion.h2>

        {/* Skill cards — horizontal scroll on mobile, 3-col grid on md+ */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 md:overflow-visible md:grid md:grid-cols-3"
        >
          {SKILL_CATEGORIES.map((category) => (
            <motion.div
              key={category.title}
              variants={fadeUp}
              className="min-w-[260px] md:min-w-0 bg-warm border border-border rounded-xl p-6 flex flex-col gap-4"
            >
              <h3 className="font-display font-semibold text-base tracking-[-0.02em] text-dark">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.tools.map((tool) => (
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
    </section>
  );
}
