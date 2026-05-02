"use client";

import { motion } from "motion/react";
import {
  fadeUp,
  fadeUpSubtle,
  staggerContainer,
  staggerContainerWide,
  EASE_SMOOTH,
} from "@/lib/animations";
import { useProjectsOverlay } from "@/context/ProjectsOverlayContext";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

/* ── Metrics data ── */
const METRICS = [
  { value: "$500K+", label: "Systems rationalization savings", icon: "cost" as const },
  { value: "100%", label: "SOX ITGC pass rate to date", icon: "compliance" as const },
  { value: "60+", label: "Systems portfolio managed", icon: "systems" as const },
  { value: "8%+", label: "License utilization lift", icon: "utilization" as const },
  { value: "3", label: "Years in SaaS IS", icon: "experience" as const },
];

/* ── Metric SVG icons ── */
function MetricIcon({ type }: { type: "cost" | "compliance" | "systems" | "utilization" | "experience" }) {
  const paths: Record<string, React.ReactNode> = {
    cost: (
      <>
        <path d="M4 4v16h16" stroke="#6B6B6B" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 14l3-3 2 2 5-5" stroke="#2D6A5D" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    compliance: (
      <>
        <path d="M12 3l8 4v5c0 5-3.5 9.7-8 11-4.5-1.3-8-6-8-11V7l8-4z" stroke="#2D6A5D" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 13l2 2 4-4" stroke="#B5654A" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    systems: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" stroke="#C2884D" />
        <rect x="14" y="3" width="7" height="7" rx="1" stroke="#C2884D" />
        <rect x="3" y="14" width="7" height="7" rx="1" stroke="#C2884D" />
        <rect x="14" y="14" width="7" height="7" rx="1" stroke="#C2884D" />
        <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" stroke="#8B6544" strokeLinecap="round" />
      </>
    ),
    utilization: (
      <>
        <rect x="4" y="14" width="3" height="6" rx="0.5" stroke="#8B6544" />
        <rect x="10.5" y="10" width="3" height="10" rx="0.5" stroke="#8B6544" />
        <rect x="17" y="6" width="3" height="14" rx="0.5" stroke="#8B6544" />
        <path d="M6 5l4-2m0 0l-1.5 2M10 3l1.5 2" stroke="#2D6A5D" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    experience: (
      <>
        <circle cx="12" cy="12" r="9" stroke="#B5654A" />
        <path d="M12 7v5l3 3" stroke="#C2884D" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  };

  return (
    <motion.svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      className="shrink-0"
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
}

export default function Projects({
  preview = false,
}: ProjectsProps) {
  const { open, triggerRef } = useProjectsOverlay();
  const displayed = preview
    ? projects.filter((p) => p.featured)
    : projects;

  return (
    <section
      id="projects"
      className="bg-warm-sand flex flex-col scroll-mt-16 pt-10 pb-16 md:pt-16 md:pb-28"
    >
      <div className="px-6 md:px-12 lg:px-20 w-full">
        {/* Section header */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-display font-bold text-[clamp(38px,5.5vw,72px)] uppercase tracking-[-0.03em] text-terracotta -mb-1"
        >
          Projects
        </motion.h2>

        {/* Sub-heading */}
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-display font-bold text-[clamp(26px,3.5vw,34px)] tracking-[-0.02em] text-dark mb-4"
        >
          {preview ? "Selected Work" : "All Projects"}
        </motion.h3>

        {/* Cards — 2-column grid */}
        <motion.div
          variants={staggerContainerWide}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
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
            <button
              ref={triggerRef as React.RefObject<HTMLButtonElement>}
              onClick={open}
              className="inline-flex items-center gap-2 bg-terracotta text-cream font-body text-[16px] font-medium tracking-[0.04em] px-6 py-2.5 rounded-lg transition-colors duration-200 hover:bg-terracotta-dark w-full justify-center lg:w-auto cursor-pointer select-none"
            >
              View all projects
              <span aria-hidden="true">&rarr;</span>
            </button>
          </motion.div>
        )}

      </div>

      {/* ── Impact metrics — constrained to match About/Skills width ── */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 w-full">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-wrap justify-evenly gap-y-6 mt-16"
        >
          {METRICS.map((metric) => (
            <motion.div
              key={metric.label}
              variants={fadeUpSubtle}
              className="flex items-center gap-3"
            >
              <MetricIcon type={metric.icon} />
              <div>
                <span className="block font-display font-bold text-[clamp(25px,2.9vw,35px)] tracking-[-0.03em] text-terracotta leading-none">
                  {metric.value}
                </span>
                <span className="block font-body text-[15px] text-charcoal tracking-[0.02em] leading-[1.4] mt-1">
                  {metric.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
