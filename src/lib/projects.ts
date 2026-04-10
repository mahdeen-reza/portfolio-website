export interface CaseStudySection {
  heading: string;
  body: string;
}

export interface Project {
  number: string;
  name: string;
  slug: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  role: string;
  status: string;
  sections: CaseStudySection[];
}

export const projects: Project[] = [
  {
    number: "01",
    name: "License Clean-Up Agent",
    slug: "license-cleanup-agent",
    description:
      "AI-powered internal tool automating Salesforce license analysis across 5 instances.",
    tags: ["AI", "TypeScript", "React", "Full-stack"],
    github: "https://github.com/mahdeen-reza/license-cleanup-agent-demo",
    role: "Creator & Lead Developer",
    status: "Shipped",
    sections: [
      {
        heading: "The Problem",
        body: "License reconciliation across five Salesforce instances was a manual, error-prone process that consumed significant analyst time each quarter. Discrepancies between provisioned and active licenses went undetected, leading to overspend and compliance gaps.",
      },
      {
        heading: "The Approach",
        body: "Built an AI-powered internal tool using TypeScript, React, and the OpenAI API. The agent connects to each Salesforce instance, pulls license allocation and usage data, and applies heuristic and AI-driven analysis to flag inactive users, over-provisioned permission sets, and optimization opportunities.",
      },
      {
        heading: "Key Decisions",
        body: "Chose a full-stack TypeScript architecture to keep the frontend and backend type-safe end-to-end. Used streaming responses from the AI layer to keep the interface responsive during analysis. Designed the tool to be instance-agnostic so it could scale across all five orgs without per-instance configuration.",
      },
      {
        heading: "Results",
        body: "Reduced license review time from days to minutes. Identified six-figure savings in unused and misallocated licenses. The tool is now part of the quarterly governance cycle and has been adopted by the broader SalesOps team.",
      },
    ],
  },
  {
    number: "02",
    name: "SaaS License Monitor",
    slug: "saas-license-monitor",
    description:
      "BigQuery + Looker pipeline replacing manual tracking with automated capacity alerting.",
    tags: ["BigQuery", "Looker", "SQL", "Fivetran"],
    github: "https://github.com/mahdeen-reza/saas-license-monitor",
    demo: "https://mahdeen-reza.github.io/saas-license-monitor",
    role: "Architect & Builder",
    status: "Live",
    sections: [
      {
        heading: "The Problem",
        body: "SaaS license utilization was tracked in disconnected spreadsheets, updated manually on a monthly cadence. Teams would discover capacity issues only after hitting hard limits — causing access outages and emergency procurement cycles.",
      },
      {
        heading: "The Approach",
        body: "Designed a data pipeline using Fivetran to ingest license data from multiple SaaS platforms into BigQuery. Built transformation layers in SQL to normalize usage metrics, calculate utilization rates, and flag contracts approaching capacity thresholds. Connected the output to Looker dashboards for real-time visibility.",
      },
      {
        heading: "Key Decisions",
        body: "Chose BigQuery over a traditional data warehouse for its serverless pricing model and native Looker integration. Implemented threshold-based alerting rather than simple reporting so stakeholders receive proactive notifications before capacity issues materialize.",
      },
      {
        heading: "Results",
        body: "Replaced a manual monthly process with automated daily monitoring. Eliminated capacity-related outages by catching utilization spikes early. Gave procurement and finance teams the data they needed to make informed renewal decisions weeks in advance.",
      },
    ],
  },
  {
    number: "03",
    name: "SOX Access Review Controls",
    slug: "sox-access-review-controls",
    description:
      "Audit infrastructure for SOX ITGC compliance with cell-level edit tracking.",
    tags: ["Compliance", "Google Apps Script", "SOX"],
    github: "https://github.com/mahdeen-reza/systems-governance-toolkit",
    role: "Compliance Engineer",
    status: "Production",
    sections: [
      {
        heading: "The Problem",
        body: "SOX ITGC access reviews required evidence of who approved what, when, and whether any changes were made after approval. The existing process used shared spreadsheets with no audit trail — a material control weakness flagged by internal audit.",
      },
      {
        heading: "The Approach",
        body: "Built a Google Apps Script-based framework that adds cell-level edit tracking to access review workbooks. Every change — who made it, what the old value was, what the new value is, and the timestamp — is logged to a protected audit sheet that reviewers cannot modify.",
      },
      {
        heading: "Key Decisions",
        body: "Chose Google Apps Script to meet teams where they already work (Google Sheets) rather than forcing adoption of a new tool. Designed the audit log as append-only with script-level protections to satisfy auditor requirements for tamper-evident records.",
      },
      {
        heading: "Results",
        body: "Achieved 100% SOX ITGC pass rate across all access review cycles. Eliminated the control weakness finding from the prior year. The framework has been adopted across multiple control areas beyond the original scope.",
      },
    ],
  },
  {
    number: "04",
    name: "SaaS Renewal Operations",
    slug: "saas-renewal-operations",
    description:
      "End-to-end process architecture across a 60+ system portfolio.",
    tags: ["Process Design", "Operations", "Governance"],
    role: "Process Architect",
    status: "Ongoing",
    sections: [
      {
        heading: "The Problem",
        body: "Renewal management across a 60+ system portfolio was reactive — contracts would surface weeks or days before expiry, leaving no time for negotiation, consolidation analysis, or stakeholder alignment. There was no single source of truth for contract terms, ownership, or renewal timelines.",
      },
      {
        heading: "The Approach",
        body: "Designed an end-to-end renewal operations framework covering intake, evaluation, negotiation prep, approval routing, and post-renewal documentation. Established a centralized contract registry with standardized fields for every SaaS agreement, linked to utilization data from the license monitoring pipeline.",
      },
      {
        heading: "Key Decisions",
        body: "Prioritized process design over tooling — the framework needed to work regardless of which procurement or contract management platform the org adopted. Built in structured decision points (renew, consolidate, renegotiate, sunset) with clear criteria at each stage.",
      },
      {
        heading: "Results",
        body: "Shifted renewal conversations from reactive to proactive, typically engaging 90+ days before expiry. Enabled consolidation analysis that identified redundant tools across departments. Gave leadership portfolio-level visibility into SaaS spend and contract risk for the first time.",
      },
    ],
  },
];
