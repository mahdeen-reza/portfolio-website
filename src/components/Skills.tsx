"use client";

import { motion } from "motion/react";
import {
  fadeUpFast,
  staggerContainerFast,
} from "@/lib/animations";
import {
  SiSalesforce,
  SiLooker,
  SiZapier,
  SiGithub,
  SiClaude,
  SiR,
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

/* ── Multi-color brand icons (replacing monochrome react-icons/si) ── */

const PythonMultiIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="skills-python-grad" x1="12" y1="0" x2="12" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0.45" stopColor="#3776AB" />
        <stop offset="0.55" stopColor="#FFD43B" />
      </linearGradient>
    </defs>
    <path fill="url(#skills-python-grad)" d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08" />
  </svg>
);

const SlackMultiIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path fill="#E01E5A" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" />
    <path fill="#36C5F0" d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" />
    <path fill="#2EB67D" d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" />
    <path fill="#ECB22E" d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
  </svg>
);

const BigQueryMultiIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="skills-bq-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#4285F4" />
        <stop offset="0.4" stopColor="#4285F4" />
        <stop offset="0.7" stopColor="#34A853" />
        <stop offset="1" stopColor="#FBBC04" />
      </linearGradient>
    </defs>
    <path fill="url(#skills-bq-grad)" d="M5.676 10.595h2.052v5.244a5.892 5.892 0 0 1-2.052-2.088v-3.156zm18.179 10.836a.504.504 0 0 1 0 .708l-1.716 1.716a.504.504 0 0 1-.708 0l-4.248-4.248a.206.206 0 0 1-.007-.007c-.02-.02-.028-.045-.043-.066a10.736 10.736 0 0 1-6.334 2.065C4.835 21.599 0 16.764 0 10.799S4.835 0 10.8 0s10.799 4.835 10.799 10.8c0 2.369-.772 4.553-2.066 6.333.025.017.052.028.074.05l4.248 4.248zm-5.028-10.632a8.015 8.015 0 1 0-8.028 8.028h.024a8.016 8.016 0 0 0 8.004-8.028zm-4.86 4.98a6.002 6.002 0 0 0 2.04-2.184v-1.764h-2.04v3.948zm-4.5.948c.442.057.887.08 1.332.072.4.025.8.025 1.2 0V7.692H9.468v9.035z" />
  </svg>
);

const JiraMultiIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="skills-jira-grad" x1="5" y1="24" x2="20" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#0052CC" />
        <stop offset="1" stopColor="#2684FF" />
      </linearGradient>
    </defs>
    <path fill="url(#skills-jira-grad)" d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.758a1.001 1.001 0 0 0-1.001-1.001zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24 12.483V1.005A1.001 1.001 0 0 0 23.013 0Z" />
  </svg>
);

const GoogleAppsScriptMultiIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="skills-gas-grad" x1="0" y1="2" x2="24" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#4285F4" />
        <stop offset="0.33" stopColor="#34A853" />
        <stop offset="0.66" stopColor="#FBBC04" />
        <stop offset="1" stopColor="#EA4335" />
      </linearGradient>
    </defs>
    <path fill="url(#skills-gas-grad)" d="M12.363 2.54a3.136 3.136 0 0 0-.376.022 2.864 2.864 0 0 0-1.589.828c-.562.58-.82 1.115-.773 1.943-.01.264.193 1.023.272 1.274 1.115 3.546 2.09 6.75 3.26 10.279.08.246.168.486.267.72.02.047.035.046.048-.004.077-.297.174-.612.29-.945.894-2.576 1.772-5.14 2.633-7.696a.345.345 0 0 0 .004-.217 163.054 163.054 0 0 0-1.49-4.572 2.603 2.603 0 0 0-.704-.933c-.55-.46-1.166-.694-1.842-.7Zm9.078.117a2.734 2.734 0 0 0-2.878 1.828l-4.576 13.289a2.734 2.734 0 0 0 1.695 3.475l.12.04a2.734 2.734 0 0 0 3.475-1.694L23.85 6.307a2.734 2.734 0 0 0-1.695-3.476c-.233-.1-.506-.124-.716-.174ZM12.375 3.96a1.396 1.396 0 1 1 0 2.791 1.395 1.395 0 0 1 0-2.79zm8.809.07a1.402 1.402 0 1 1 0 2.803 1.402 1.402 0 0 1 0-2.803zM5.419 7.605a2.853 2.853 0 0 0-.468.052 2.683 2.683 0 0 0-1.337.627 2.62 2.62 0 0 0-.924 1.833 3.808 3.808 0 0 0 0 .648 2.52 2.52 0 0 0 .673 1.52c.221.238.465.454.732.648 3.043 2.21 6.08 4.43 9.108 6.664a.78.78 0 0 0 .158.089c.03-.043.032-.098.007-.167a17.409 17.409 0 0 0-.317-1.066 532.752 532.752 0 0 1-2.02-6.251 41.91 41.91 0 0 0-.497-1.477c-.967-.849-2.078-1.6-3.023-2.302A3.848 3.848 0 0 0 6.153 7.7a2.388 2.388 0 0 0-.734-.094Zm.02 1.424a1.398 1.398 0 1 1 0 2.796 1.398 1.398 0 0 1 0-2.796zm-2.458 6.792c-.733-.006-1.375.202-1.927.622a2.72 2.72 0 0 0-.95 1.45 2.78 2.78 0 0 0-.09 1.04 2.74 2.74 0 0 0 .695 1.583c.664.578 1.26.85 2 .945 1.42-.005 2.84-.012 4.262-.02h.418c2.277-.003 4.513-.002 6.706.003.148.005.28.003.392-.01.06-.005.091-.031.092-.077a10.656 10.656 0 0 0-.834-.653 488.746 488.746 0 0 1-6.57-4.815.236.236 0 0 0-.14-.047c-1.34-.003-2.691-.01-4.054-.02zm-.19 1.418a1.402 1.402 0 1 1 0 2.803 1.402 1.402 0 0 1 0-2.803zm13.874.002a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z" />
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
      { name: "BigQuery", icon: BigQueryMultiIcon, color: "#4285F4" },
      { name: "Looker Studio", icon: SiLooker, color: "#4285F4" },
      { name: "Zapier", icon: SiZapier, color: "#FF4A00" },
      { name: "Jira", icon: JiraMultiIcon, color: "#0052CC" },
      { name: "GitHub", icon: SiGithub, color: "#24292F" },
      { name: "Slack (Configuration)", icon: SlackMultiIcon, color: "#E01E5A" },
      { name: "Ardoq", icon: ArdoqIcon, color: "#0B4F6C" },
    ],
  },
  {
    header: "Technical Competencies",
    skills: [
      { name: "Advanced Claude Code", icon: SiClaude, color: "#D97757" },
      { name: "Glean Agents", icon: GleanIcon, color: "#4CAF50" },
      { name: "Excel VBA", icon: ExcelIcon, color: "#217346" },
      { name: "Google Apps Script", icon: GoogleAppsScriptMultiIcon, color: "#4285F4" },
      { name: "SQL & SOQL", icon: SqlIcon, color: "#F29111" },
      { name: "R", icon: SiR, color: "#276DC3" },
      { name: "MATLAB", icon: MatlabIcon, color: "#E16737" },
      { name: "Python", icon: PythonMultiIcon, color: "#3776AB" },
    ],
  },
];

/* ═══════════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════════ */

export default function Skills() {
  return (
    <section id="skills" className="bg-white min-h-[calc(85vh-54px)] flex flex-col scroll-mt-16 pt-12 pb-20 md:pt-16 md:pb-28">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 w-full">
        {/* Section heading */}
        <motion.h2
          variants={fadeUpFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="font-display font-bold text-[clamp(38px,5.5vw,72px)] uppercase tracking-[-0.03em] text-terracotta mb-6 md:mb-8 will-change-transform"
        >
          What I work with
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
              className="bg-warm-sand border border-dark/12 rounded-xl py-5 px-5 sm:px-10 md:py-8 md:px-14 transition-all duration-300 hover:bg-sand-light/60 hover:backdrop-blur-lg hover:border-white/50 hover:shadow-2xl hover:shadow-dark/8 hover:-translate-y-2 will-change-transform"
            >
              <h3 className="font-display font-bold text-[clamp(20px,2.5vw,28px)] tracking-[-0.02em] text-terracotta mb-4">
                {container.header}
              </h3>
              <div className="flex flex-col gap-2.5">
                {container.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2.5 px-2 py-1 -mx-2 rounded-md transition-transform duration-200 hover:scale-[1.12] origin-left cursor-default"
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
                    <span className="font-body text-[15px] sm:text-[17px] font-medium text-charcoal leading-[1.6]">
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
