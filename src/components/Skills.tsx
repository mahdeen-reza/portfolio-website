"use client";

import { motion } from "motion/react";
import {
  fadeUpFast,
  staggerContainerFast,
} from "@/lib/animations";
import {
  SiSalesforce,
  SiGooglebigquery,
  SiLooker,
  SiZapier,
  SiJira,
  SiGithub,
  SiSlack,
  SiClaude,
  SiGoogleappsscript,
  SiR,
  SiPython,
} from "react-icons/si";
import type { IconType } from "react-icons";

/* ═══════════════════════════════════════════════════════
   Custom SVG icons — stroke-based, 18px, viewBox 0 0 24 24
   Matches MetricIcon style from Projects.tsx
   ═══════════════════════════════════════════════════════ */

/* ── Domain Expertise icons ── */

const SaasOpsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Cloud */}
    <path d="M6.5 19a4.5 4.5 0 0 1-.42-8.98A7 7 0 0 1 19.5 11a4.5 4.5 0 0 1-1 8.98" />
    {/* Gear cog */}
    <circle cx="12" cy="14" r="2" />
    <path d="M12 10v-1M12 19v-1M8.5 12.5l-.7-.7M16.2 16.2l-.7-.7M8 14H7M17 14h-1M8.5 15.5l-.7.7M16.2 11.8l-.7.7" />
  </svg>
);

const SalesOpsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Funnel */}
    <path d="M3 4h18l-6 7v6l-4 3V11L3 4z" />
  </svg>
);

const ApiIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Two connected nodes */}
    <circle cx="7" cy="12" r="3" />
    <circle cx="17" cy="12" r="3" />
    <path d="M10 12h4" />
    <path d="M7 9V5M7 15v4M17 9V5M17 15v4" />
  </svg>
);

const ShieldCheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 3l8 4v5c0 5-3.5 9.7-8 11-4.5-1.3-8-6-8-11V7l8-4z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const BarChartIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Bar chart with trend line */}
    <path d="M4 20h16" />
    <path d="M6 20v-6M10 20v-10M14 20v-8M18 20v-12" />
    <path d="M4 10l4-3 4 2 4-3 4-2" />
  </svg>
);

const AutomationIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Circular arrows */}
    <path d="M21 12a9 9 0 1 1-3-6.7" />
    <path d="M21 3v6h-6" />
    {/* Lightning bolt */}
    <path d="M13 8l-2 4h3l-2 4" />
  </svg>
);

const ClipboardIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M9 3v2h6V3" />
    <path d="M9 10l2 2 4-4" />
    <path d="M9 16h6" />
  </svg>
);

const FlowchartIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Three connected boxes */}
    <rect x="3" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="8" y="16" width="8" height="5" rx="1" />
    <path d="M6.5 8v4h5.5v4M17.5 8v4H12v4" />
  </svg>
);

/* ── Fallback brand icons (not available in react-icons/si) ── */

const ArdoqIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Architecture graph — connected nodes */}
    <circle cx="12" cy="5" r="2.5" />
    <circle cx="5" cy="18" r="2.5" />
    <circle cx="19" cy="18" r="2.5" />
    <path d="M10.5 7l-4 8.5M13.5 7l4 8.5M7.5 18h9" />
  </svg>
);

const GleanIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Magnifying glass with sparkle */}
    <circle cx="10" cy="10" r="6" />
    <path d="M21 21l-4.35-4.35" />
    <path d="M10 7v2M10 11v2M8 10h4" />
  </svg>
);

const ExcelIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Spreadsheet with X */}
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
  </svg>
);

const SqlIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Database cylinder */}
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
    <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
  </svg>
);

const MatlabIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Waveform / matrix */}
    <path d="M2 12l4-8 3 6 3-4 3 8 3-6 4 4" />
    <path d="M2 20h20" />
  </svg>
);

/* ═══════════════════════════════════════════════════════
   Skill data
   ═══════════════════════════════════════════════════════ */

interface SkillItem {
  name: string;
  icon: IconType | React.FC<{ className?: string }>;
  color: string;
}

interface SkillContainer {
  header: string;
  skills: SkillItem[];
}

const SKILL_CONTAINERS: SkillContainer[] = [
  {
    header: "Domain Expertise",
    skills: [
      { name: "SaaS Management and Operations", icon: SaasOpsIcon, color: "#4285F4" },
      { name: "Sales Operations", icon: SalesOpsIcon, color: "#E8772E" },
      { name: "APIs and Integrations", icon: ApiIcon, color: "#22A06B" },
      { name: "ITGC - SOX Access Controls", icon: ShieldCheckIcon, color: "#0052CC" },
      { name: "Business & Data Analysis", icon: BarChartIcon, color: "#8B5CF6" },
      { name: "Workflow Automations", icon: AutomationIcon, color: "#F59E0B" },
      { name: "Requirements Gathering", icon: ClipboardIcon, color: "#0891B2" },
      { name: "Process Mapping", icon: FlowchartIcon, color: "#6366F1" },
    ],
  },
  {
    header: "Software & Tools",
    skills: [
      { name: "Salesforce", icon: SiSalesforce, color: "#00A1E0" },
      { name: "BigQuery", icon: SiGooglebigquery, color: "#4285F4" },
      { name: "Looker Studio", icon: SiLooker, color: "#4285F4" },
      { name: "Zapier", icon: SiZapier, color: "#FF4A00" },
      { name: "Jira", icon: SiJira, color: "#0052CC" },
      { name: "GitHub", icon: SiGithub, color: "#24292F" },
      { name: "Slack (Configuration)", icon: SiSlack, color: "#E01E5A" },
      { name: "Ardoq", icon: ArdoqIcon, color: "#0B4F6C" },
    ],
  },
  {
    header: "Technical Competencies",
    skills: [
      { name: "Advanced Claude Code", icon: SiClaude, color: "#D97757" },
      { name: "Glean Agents", icon: GleanIcon, color: "#4CAF50" },
      { name: "Excel VBA", icon: ExcelIcon, color: "#217346" },
      { name: "Google Apps Script", icon: SiGoogleappsscript, color: "#4285F4" },
      { name: "SQL & SOQL", icon: SqlIcon, color: "#F29111" },
      { name: "R", icon: SiR, color: "#276DC3" },
      { name: "MATLAB", icon: MatlabIcon, color: "#E16737" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
    ],
  },
];

/* ═══════════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════════ */

export default function Skills() {
  return (
    <section id="skills" className="bg-cream min-h-[calc(85vh-54px)] flex flex-col scroll-mt-16 pt-12 pb-20 md:pt-16 md:pb-28">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 w-full">
        {/* Section heading */}
        <motion.h2
          variants={fadeUpFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="font-display font-bold text-[clamp(38px,5.5vw,72px)] uppercase tracking-[-0.03em] text-terracotta mb-6 md:mb-8 will-change-transform"
        >
          Skills
        </motion.h2>

        {/* Three equal columns */}
        <motion.div
          variants={staggerContainerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4"
        >
          {SKILL_CONTAINERS.map((container) => (
            <motion.div
              key={container.header}
              variants={fadeUpFast}
              className="bg-warm border border-dark/12 rounded-xl py-6 px-10 md:py-8 md:px-14 transition-all duration-300 hover:bg-white/60 hover:backdrop-blur-md hover:border-white/40 hover:shadow-xl hover:shadow-dark/5 hover:-translate-y-1 will-change-transform"
            >
              <h3 className="font-display font-bold text-[clamp(20px,2.5vw,28px)] tracking-[-0.02em] text-terracotta mb-4">
                {container.header}
              </h3>
              <div className="flex flex-col gap-2.5">
                {container.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2.5 px-2 py-1 -mx-2 rounded-md transition-transform duration-200 hover:scale-[1.06] origin-left cursor-default"
                  >
                    <span
                      className="shrink-0"
                      style={{ color: skill.color }}
                    >
                      <skill.icon
                        className="w-5 h-5"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="font-body text-[17px] font-medium text-muted leading-[1.6]">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
