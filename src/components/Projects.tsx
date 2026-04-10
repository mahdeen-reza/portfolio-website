"use client";

import { motion } from "motion/react";
import { fadeUp, staggerContainerWide } from "@/lib/animations";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="bg-dark py-20 md:py-28 scroll-mt-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Section label */}
        <motion.span
          variants={fadeUp}
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
          Selected work.
        </motion.h2>

        {/* Cards */}
        <motion.div
          variants={staggerContainerWide}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-4"
        >
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
