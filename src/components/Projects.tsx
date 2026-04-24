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
  { value: "$6-fig", label: "Cost rationalization", icon: "cost" as const, color: "#C2884D" },
  { value: "100%", label: "SOX ITGC pass rate", icon: "compliance" as const, color: "#2D6A5D" },
  { value: "60+", label: "Systems managed", icon: "systems" as const, color: "#8B6544" },
  { value: "3+", label: "Years in SaaS ops", icon: "experience" as const, color: "#B5654A" },
  { value: "—", label: "Coming soon", icon: "experience" as const, color: "#B5654A" },
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
      width="28"
      height="28"
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
      className="bg-warm-sand flex flex-col scroll-mt-16 pt-12 pb-20 md:pt-16 md:pb-28"
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
          className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mt-16"
        >
          {METRICS.map((metric) => (
            <motion.div
              key={metric.label}
              variants={fadeUpSubtle}
              className="flex items-center gap-3"
            >
              <MetricIcon type={metric.icon} color={metric.color} />
              <div>
                <span className="block font-display font-bold text-[clamp(22px,2.5vw,30px)] tracking-[-0.03em] text-terracotta leading-none">
                  {metric.value}
                </span>
                <span className="block font-body text-[13px] text-charcoal tracking-[0.02em] leading-[1.4] mt-1">
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
