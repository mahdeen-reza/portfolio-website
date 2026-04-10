export interface Project {
  number: string;
  name: string;
  slug: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
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
  },
  {
    number: "03",
    name: "SOX Access Review Controls",
    slug: "sox-access-review-controls",
    description:
      "Audit infrastructure for SOX ITGC compliance with cell-level edit tracking.",
    tags: ["Compliance", "Google Apps Script", "SOX"],
    github: "https://github.com/mahdeen-reza/systems-governance-toolkit",
  },
  {
    number: "04",
    name: "SaaS Renewal Operations",
    slug: "saas-renewal-operations",
    description:
      "End-to-end process architecture across a 60+ system portfolio.",
    tags: ["Process Design", "Operations", "Governance"],
  },
];
