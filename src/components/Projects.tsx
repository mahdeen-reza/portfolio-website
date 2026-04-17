"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  fadeUp,
  fadeUpSubtle,
  staggerContainer,
  staggerContainerWide,
  EASE_SMOOTH,
} from "@/lib/animations";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

/* ── Metrics data ── */
const METRICS = [
  { value: "$6-fig", label: "Cost rationalization", icon: "cost" as const, color: "#C2884D" },
  { value: "100%", label: "SOX ITGC pass rate", icon: "compliance" as const, color: "#2D6A5D" },
  { value: "60+", label: "Systems managed", icon: "systems" as const, color: "#8B6544" },
  { value: "3+", label: "Years in SaaS ops", icon: "experience" as const, color: "#B5654A" },
];

/* ── Metric SVG icons ── */
function MetricIcon({ type, color }: { type: "cost" | "compliance" | "systems" | "experience"; color: string }) {
  const paths: Record<string, React.ReactNode> = {
    cost: (
      <path
        d="M4 4v16h16M8 14l3-3 2 2 5-5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    compliance: (
      <path
        d="M12 3l8 4v5c0 5-3.5 9.7-8 11-4.5-1.3-8-6-8-11V7l8-4zm-2 10l2 2 4-4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    systems: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" strokeLinecap="round" />
      </>
    ),
    experience: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  };

  return (
    <motion.svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="shrink-0"
      style={{ color }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE_SMOOTH }}
    >
      {paths[type]}
    </motion.svg>
  );
}

/* ── Projects section ── */
interface ProjectsProps {
  preview?: boolean;
  showBackLink?: boolean;
}

export default function Projects({
  preview = false,
  showBackLink = false,
}: ProjectsProps) {
  const displayed = preview
    ? projects.filter((p) => p.featured)
    : projects;

  return (
    <section
      id="projects"
      className="bg-warm-sand min-h-[calc(100vh-64px)] flex flex-col justify-center scroll-mt-16 pt-12 pb-20 md:pt-16 md:pb-28"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 w-full">
        {/* Back link (projects page only) */}
        {showBackLink && (
          <Link
            href="/"
            className="inline-block font-body text-[13px] font-medium text-terracotta transition-colors duration-200 hover:text-terracotta-dark mb-6"
          >
            &larr; Back to home
          </Link>
        )}

        {/* Section header */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-display font-bold text-[clamp(38px,5.5vw,72px)] uppercase tracking-[-0.03em] text-terracotta mb-2"
        >
          Projects
        </motion.h2>

        {/* Sub-headings row */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-x-16 gap-y-2 mb-3">
          <motion.h3
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-display font-bold text-[clamp(26px,3.5vw,34px)] tracking-[-0.02em] text-dark"
          >
            {preview ? "Selected Work" : "All Projects"}
          </motion.h3>
          <motion.h3
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-display font-bold text-[clamp(26px,3.5vw,34px)] tracking-[-0.02em] text-dark lg:text-right"
          >
            Key Impact Metrics
          </motion.h3>
        </div>

        {/* Content row — cards + metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-x-16 gap-y-8 items-start">
          {/* ── Left: cards + button ── */}
          <div className="flex flex-col">
            <motion.div
              variants={staggerContainerWide}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col gap-4"
            >
              {displayed.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </motion.div>

            {preview && (
              <motion.div
                variants={fadeUpSubtle}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-4 flex justify-end"
              >
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 bg-terracotta text-cream font-body text-[16px] font-medium tracking-[0.04em] px-6 py-2.5 rounded-lg transition-colors duration-200 hover:bg-terracotta-dark w-full justify-center lg:w-auto"
                >
                  View all projects
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </motion.div>
            )}
          </div>

          {/* ── Right: metrics — right-aligned, icons on right ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-col gap-5 py-2 items-end"
          >
            {METRICS.map((metric) => (
              <motion.div
                key={metric.label}
                variants={fadeUpSubtle}
                className="flex flex-row-reverse items-center gap-4"
              >
                <MetricIcon type={metric.icon} color={metric.color} />
                <div className="text-right">
                  <span className="block font-display font-bold text-[clamp(26px,3vw,36px)] tracking-[-0.03em] text-terracotta leading-none">
                    {metric.value}
                  </span>
                  <span className="block font-body text-[14px] text-muted tracking-[0.02em] leading-[1.4] mt-1">
                    {metric.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
