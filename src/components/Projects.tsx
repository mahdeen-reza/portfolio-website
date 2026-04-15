"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { fadeUp, fadeUpSubtle, staggerContainerWide } from "@/lib/animations";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

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
    <section id="projects" className="bg-dark py-24 md:py-32 scroll-mt-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Back link (projects page only) */}
        {showBackLink && (
          <Link
            href="/"
            className="inline-block font-body text-[13px] font-medium text-terracotta transition-colors duration-200 hover:text-terracotta-dark mb-10"
          >
            &larr; Back to home
          </Link>
        )}

        {/* Section label */}
        <motion.span
          variants={fadeUpSubtle}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="block font-body font-medium text-[11px] uppercase tracking-[0.1em] text-terracotta mb-4"
        >
          Projects
        </motion.span>

        {/* Section heading */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-display font-semibold text-[clamp(28px,4vw,48px)] tracking-[-0.03em] leading-[1.05] text-cream mb-12"
        >
          {preview ? "Selected work." : "All projects."}
        </motion.h2>

        {/* Cards */}
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

        {/* View all link (homepage preview only) */}
        {preview && (
          <motion.div
            variants={fadeUpSubtle}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-body font-medium text-[13px] text-terracotta transition-colors duration-200 hover:text-terracotta-dark"
            >
              View all projects &rarr;
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
