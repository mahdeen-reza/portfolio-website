"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { fadeUp } from "@/lib/animations";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const tags = project.cardTags ?? project.tags;

  return (
    <motion.div variants={fadeUp} className="group">
      <Link
        href={`/projects/${project.slug}`}
        className="block transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-terracotta/10"
      >
        {/* Folder tab */}
        <div className="inline-block bg-dark/[0.06] border border-dark/15 border-b-0 rounded-t-lg px-5 py-1.5 transition-all duration-300 group-hover:bg-terracotta/[0.06] group-hover:border-terracotta/30">
          <span className="font-body text-[11px] font-medium uppercase tracking-[0.06em] text-muted">
            {project.status}
          </span>
        </div>

        {/* Card body */}
        <div className="border border-dark/15 bg-dark/[0.06] rounded-xl rounded-tl-none p-5 md:p-6 transition-all duration-300 group-hover:bg-terracotta/[0.04] group-hover:border-terracotta/30">
          <div className="flex flex-col gap-3">
            <h3 className="font-display font-semibold text-[clamp(24px,3vw,34px)] tracking-[-0.02em] text-dark">
              {project.name}
            </h3>
            <p className="font-body text-[20px] leading-[1.6] text-muted">
              {project.description}
            </p>
            {project.impact && (
              <p className="font-body text-[14px] leading-[1.5] text-muted">
                {project.impact}
              </p>
            )}
            <div className="flex flex-wrap gap-2 mt-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="font-body text-[13px] font-medium text-terracotta bg-terracotta/15 border border-terracotta/30 px-3 py-1.5 rounded-md transition-colors duration-200 hover:bg-terracotta/25"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="self-end font-body text-[16px] font-medium text-terracotta tracking-[0.02em] mt-2 transition-all duration-300 group-hover:text-terracotta-dark group-hover:scale-105 group-hover:translate-x-1 origin-right">
              Read case study <span aria-hidden="true">&rarr;</span>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
