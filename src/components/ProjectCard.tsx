"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { fadeUpLarge } from "@/lib/animations";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div variants={fadeUpLarge}>
      <Link
        href={`/projects/${project.slug}`}
        className="group block border border-white/10 bg-white/[0.03] rounded-xl p-6 md:p-8 transition-all duration-250 hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-0.5"
      >
        <div className="flex items-start gap-6 md:gap-8">
          {/* Number */}
          <span className="hidden sm:block font-display font-semibold text-[48px] leading-none tracking-[-0.03em] text-white/[0.08] shrink-0 select-none">
            {project.number}
          </span>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-semibold text-lg tracking-[-0.02em] text-cream mb-1.5">
              {project.name}
            </h3>
            <p className="font-body text-sm leading-[1.6] text-cream/55 mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-body text-[11px] font-medium text-terracotta bg-terracotta/10 px-2.5 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <span className="shrink-0 text-cream/40 text-lg transition-all duration-250 group-hover:text-cream/70 group-hover:translate-x-1 mt-1">
            &rarr;
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
