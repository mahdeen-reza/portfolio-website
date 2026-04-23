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
  featured?: boolean;
  impact?: string;
  cardTags?: string[];
  screenshot?: string;
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
    tags: ["TypeScript", "Express 5", "React 19", "PostgreSQL", "Claude API"],
    github: "https://github.com/mahdeen-reza/license-cleanup-agent-demo",
    featured: true,
    impact: "Identified six-figure savings in unused licenses",
    cardTags: ["Vibe-Coded", "Claude Code", "TypeScript", "React"],
    screenshot: "/projects/license-cleanup-agent.png",
    role: "Solo builder — architecture through deployment",
    status: "Phase 1 complete, Phase 2 infrastructure ready",
    sections: [
      {
        heading: "The Problem",
        body: `When a SaaS instance runs out of available license seats, new hire onboarding stops. The only way to free capacity is a clean-up cycle -- identify inactive users, compile a removal list, and submit a support ticket. Before this tool existed, that meant exporting a usage report and an HR employee roster, loading both into a spreadsheet, manually joining them on email (which rarely matched cleanly), applying business rules from memory, and building the removal list row by row.

Each cycle took approximately two hours of focused analytical work and roughly a full business day end-to-end when accounting for competing priorities. There was no audit trail -- no record of who was reviewed, what was decided, or why. Access criteria were undocumented. The entire process relied on tacit knowledge held by one person. And every clean-up started from scratch, with no memory of what happened in the previous cycle.

The operational cost wasn't just analyst time. It was the institutional risk of a process that couldn't be handed off, couldn't be audited, and couldn't learn from its own history.`,
      },
      {
        heading: "My Role",
        body: `I designed and built the entire system end to end -- sole architect, developer, domain expert, and product owner. This was not a delegated engineering task with requirements handed down. I authored the product requirements, defined all business rules and classification logic, designed the database schema and system architecture, built the full-stack application, and deployed it to production.

The domain knowledge -- how clean-ups actually work, what the edge cases are, which mistakes are expensive -- came from doing the manual process myself. The tool encodes that operational experience into a system that can be run by anyone with the right access.`,
      },
      {
        heading: "Approach",
        body: `Before writing any code, I wrote four planning documents that lived in the repository throughout the build:

- **PRD** -- product requirements, user flows, success metrics, and explicit non-goals
- **Architecture doc** -- field schemas, database models, API routes, normalization logic, and intelligence layer design
- **Rules decision table** -- complete classification logic, the department classification framework, activity signal interpretation, and every edge case
- **CLAUDE.md** -- project context file auto-loaded by Claude Code every development session, ensuring the AI assistant never lost context between sessions

This planning-first approach meant that by the time I started building, every classification rule, every edge case, and every data flow was already specified. The documents evolved as the build progressed -- they were living references, not throwaway artifacts.

The design philosophy was conservative throughout: when in doubt, route to Human Review. The cost of incorrectly removing a user (disrupted work, re-provisioning, escalation) always exceeds the cost of leaving one extra license seat occupied.`,
      },
      {
        heading: "Architecture",
        body: `The system is a single-container web application: a React SPA served by Express, with PostgreSQL handling all persistence. The analysis pipeline runs in 16 steps, from CSV parsing through AI reasoning to delta comparison.

### Input Layer

The analyst uploads two CSV files -- a usage platform export (user activity and license data) and an HR system export (employee roster). Files are parsed in memory and never written to disk. The HR system is treated as the authoritative source for all employee information.

### Email Normalization Cascade

A simple email join between the usage export and the HR roster fails in practice. Users appear with instance-specific suffixes, legacy domains from acquisitions, plus-alias variants, and name mismatches. The normalization cascade resolves these through a 5-tier sequence:

1. Direct email match against 5 candidate formats (as-is, plus-alias stripped, instance suffix stripped, domain swapped, domain swapped + plus-alias stripped)
2. Full name match from directory fields as a fallback
3. Failure classification for unresolved cases (ambiguous matches, legacy domains, no match at all)

Every Tier 3 (name-based) match is flagged for human verification -- the system never auto-actions on an ambiguous identity resolution.

### HR Enrichment

Every usage export user gets enriched with full HR context: department, division, business title, product assignment, region, manager, worker type, leave status, employment status, and termination date. This context feeds directly into the classification engine.

### Classification Engine

A deterministic 10-step precedence chain classifies every user before AI sees them. The first matching rule wins:

1. Exclude new users (created within 30 days)
2. Exclude integration/service accounts (pattern matching)
3. Flag ex-employees (HR shows terminated but still in usage platform)
4. Route ambiguous/unresolved matches to Human Review
5. Check prior exception register
6. Route protected departments to Human Review
7. Apply 4-layer department classification framework (Division > Department > Business Title > Product alignment)
8. Flag discrepant activity signals
9. Exclude active users
10. Classify inactive users as Direct Remove or Notify First based on signal strength

The department classification framework protects revenue-facing users through four layers of increasingly specific checks, from broad division-level rules down to individual business title keyword matching and product alignment verification.

### AI Reasoning Engine

The Anthropic Claude API validates and refines deterministic pre-classifications, assigns confidence levels (high, medium, low), and writes a 1-2 sentence plain-English reasoning for every user. Users are batched (25 per API call) to manage token limits. The system context includes foundational knowledge, instance-specific access criteria, and prior exception data.

When no API key is configured, the pipeline runs entirely on the deterministic classifier. Classification still works -- the AI layer adds nuance, not core functionality.

### Delta Analysis

Every run after the first automatically compares against the most recent previous run for the same instance. Each user is tagged with one of five delta categories: newly inactive, persistently inactive, recovered, reappeared, or net new. This means the analyst can prioritize newly inactive users for fresh review while quickly confirming persistently inactive users they've seen before.

### Persistence and Audit Trail

Fourteen Prisma models store the complete history: analysis runs, per-user results, action decisions, user history events, sporadic access flags, prior exceptions, chat overrides, access criteria versions, and conversation history. Every run, every classification, and every analyst decision is recorded with identity and timestamp.`,
      },
      {
        heading: "The Hard Problems",
        body: `### 1. Email Normalization -- Why a Simple Join Doesn't Work

The usage platform and the HR system store emails differently. Users appear with instance-specific suffixes, legacy domains from acquisitions, plus-alias variants, and sometimes no email match at all -- just a name in a directory field that might correspond to one of several HR records.

A naive LEFT JOIN ON email misses roughly 20-30% of users in a typical dataset. The normalization cascade generates up to 5 email candidates per user, tries each against the HR roster, then falls back to name matching. When name matching produces multiple candidates, the system classifies the match as ambiguous and routes to Human Review rather than guessing.

The edge cases compound: an acquired employee with a legacy email, whose name appears twice in the HR roster (two John Smiths), requires the cascade to try domain swapping, fail on ambiguity, and correctly route to manual investigation. The demo data includes these exact scenarios.

### 2. Conservative Classification -- The Cost of a Wrong Removal

Removing the wrong user is expensive. The employee loses access mid-workflow, files a support ticket, the license needs to be re-provisioned, and the clean-up process loses credibility. A missed removal, by contrast, costs one license seat until the next cycle.

This asymmetry drove every design decision in the classification engine. The 10-step precedence chain is ordered from most conservative to least -- new users and integration accounts are excluded before anything else. The department classification framework has four layers specifically to avoid accidentally removing a revenue-facing user. Protected departments always route to Human Review regardless of activity level. And when AI is unavailable, every user is classified as Human Review rather than applying the deterministic rules without a second opinion.

The 9-category output isn't just classification granularity for its own sake -- each category maps to a different action workflow with different risk profiles. Ex-employees get a priority ticket (offboarding failure). Revenue-facing users require manager consultation. Borderline cases get human review. The system's job is to sort users into the right workflow, not to make removal decisions.

### 3. Delta Analysis -- Inverting the Compound Review Burden

Without run-over-run comparison, every clean-up cycle is a fresh review of the same users. The analyst sees 200 users, reviews all 200, removes 30, and next month sees 190 users -- including 170 they reviewed last time. The review burden compounds because there's no memory.

Delta analysis inverts this. By comparing against the previous run, the system tags each user with context: "you reviewed this user last month and deferred them" or "this user was removed last month but reappeared" or "this user was active last month and is now inactive for the first time." The analyst can process persistently inactive users in seconds (they've seen the reasoning before) and focus their attention on newly inactive users and unexpected reappearances.

The sporadic access register adds another layer: users with project-based access patterns (quarter-end reconciliation, annual audits) are flagged so that their removal and reappearance isn't surprising. The flag doesn't protect them from removal -- it provides context that prevents unnecessary investigation.

Over time, the review surface shrinks. The first run is a full review. By the third run, the analyst is spending most of their time on genuinely new findings.`,
      },
      {
        heading: "Impact",
        body: `| Metric | Before | After |
|---|---|---|
| Analysis time per clean-up | ~2 hours manual | Under 10 minutes |
| End-to-end (identify to ticket) | ~1 business day | Under 2 hours |
| Audit trail | None | Full -- every run, user, and decision recorded |
| Criteria documentation | None -- tacit knowledge | Fully encoded, versioned, editable |
| Cross-run institutional memory | None | Compounds automatically over time |

The time savings are significant, but the larger impact is structural. The process is now documented, auditable, and transferable. Access criteria are explicit and versioned. Clean-up decisions are defensible in escalations because every user has a written reasoning. And the system gets better over time -- delta analysis and sporadic registers mean each run is faster and more informed than the last.`,
      },
      {
        heading: "What I'd Do Differently",
        body: `**Earlier investment in automated testing.** The classification engine has complex branching logic and interacts with multiple data sources. I validated it manually against known clean-up datasets, but a proper test suite with fixtures for each classification path and edge case would have caught regressions faster and made refactoring safer. The demo data exercises all 9 categories, but it's not a substitute for unit and integration tests.

**More modular business rule configuration from day one.** The department classification framework, protected department lists, and activity thresholds are currently encoded in the classification engine. Extracting these into per-instance configuration earlier would have simplified the path from Phase 1 (single platform) to Phase 2 (multiple systems). The self-serve onboarding flow partially addresses this, but the core classifier still has hardcoded assumptions that will need refactoring.`,
      },
      {
        heading: "What's Next",
        body: `**Phase 2 is infrastructure-ready.** The self-serve system onboarding flow -- upload a sample CSV, provide a description, review the AI-generated reasoning table, confirm -- is already built. Expanding to additional SaaS systems requires no engineering work, just an analyst with a CSV and five minutes.

Beyond system expansion: automated ticket submission post-analysis (removing the copy-paste step), automated data loading from platform APIs (removing the manual CSV export step), and ultimately a fully automated end-to-end process operable by a support team member without analyst handover.`,
      },
    ],
  },
  {
    number: "02",
    name: "SaaS License Monitor",
    slug: "saas-license-monitor",
    description:
      "BigQuery + Looker pipeline replacing manual tracking with automated capacity alerting.",
    tags: ["BigQuery", "Fivetran", "Looker", "GCP", "SQL", "LookML"],
    github: "https://github.com/mahdeen-reza/saas-license-monitor",
    demo: "https://mahdeen-reza.github.io/saas-license-monitor",
    featured: true,
    impact: "Replaced manual monthly tracking with automated daily monitoring",
    cardTags: ["BigQuery", "Looker", "SQL", "Fivetran"],
    screenshot: "/projects/saas-license-monitor.png",
    role: "Sole designer and builder — architecture, SQL, LookML, alerting, documentation",
    status: "Phase 1 live · Phase 2 designed and documented",
    sections: [
      {
        heading: "Problem",
        body: `The Information Systems team at a publicly traded SaaS company manages licenses across a growing portfolio of SaaS tools. Checking capacity meant logging into each system individually — different interface, different reporting format, no consistent cadence. Staying current required constant context switching with no central view to anchor it.

The absence of alerting meant shortages only surfaced when a new hire couldn't be provisioned. At that point, the remediation path — identifying removable users, requesting additional licenses, waiting on vendor processing — added days of delay to onboarding. There was no utilization history, no trend data, and no data foundation for renewal conversations. Which systems were trending toward capacity? Which warranted a seat reduction at renewal? The team couldn't answer these without manual research from scratch each time.

Every shortage was reactive. Every incident was avoidable.`,
      },
      {
        heading: "Role",
        body: `Built end-to-end as a solo project — no dedicated data engineering support, no handoff between design and implementation. Full scope ownership: identifying the problem, designing the architecture, authoring all business logic, writing every line of SQL and LookML, configuring the pipeline, and documenting the system for the team.

Domain expertise was as important as the technical build. Which user types count against license usage, which system admin accounts should be excluded, how different Salesforce instances expose their data differently through the same Fivetran connector — none of that is in a manual. All of it was encoded from scratch as documented, versioned logic.`,
      },
      {
        heading: "Approach",
        body: `The central architecture question before writing any SQL: how do you build something that works for five Salesforce instances today but doesn't need to be rebuilt for the next ten systems?

The answer was a **staging contract** — a binding agreement on what every data source must output before it feeds the pipeline. Eight columns, always the same, regardless of source. Because the contract is fixed, the serving layer never needs to know where data came from. Because each source has its own isolated staging view, a change in one system touches nothing else. Because the assembly query is a pure UNION ALL, adding a new system means writing one view and uncommenting one line.

Two other deliberate decisions shaped the build. **Pure SQL over dbt** — the team doesn't have dedicated data engineering capacity, and a framework with its own learning curve would have made this a system only one person could maintain. **Utilization pre-computed at assembly time** rather than in Looker — keeps dashboard performance predictable as the dataset grows and eliminates division-by-zero errors at the visualization layer.`,
      },
      {
        heading: "Architecture",
        body: `![Pipeline Architecture](https://raw.githubusercontent.com/mahdeen-reza/saas-license-monitor/main/architecture/pipeline_architecture.svg)

Four layers, each with exactly one job:

**Ingestion** — Fivetran syncs Salesforce data into BigQuery every 40 minutes. Data lands in raw datasets, untouched.

**Staging** — SQL views transform raw data per-source into the standard 8-column schema. All business logic lives here and nowhere else. All five Salesforce instances are combined into a single view via UNION ALL.

**Serving** — A scheduled query runs at 06:00 UTC, assembles all staging views, and appends a daily snapshot to license_inventory. An idempotency guard (DELETE WHERE snapshot_date = CURRENT_DATE()) runs before every insert, making reruns safe.

**Alerting** — Looker evaluates thresholds at 06:30 UTC and fires to Slack and email. Threshold logic lives in LookML, not SQL — updatable without touching the pipeline.`,
      },
      {
        heading: "Key Features",
        body: `**Three-section dashboard**, designed for three audiences:

- *Health summary* — total, used, and available licenses across all systems; count of systems at critical or warning; data quality issue count. Readable at a glance by anyone.
- *System detail* — utilization bar chart, full license breakdown with conditional formatting by alert status, available licenses by type. For IS admins managing day-to-day provisioning.
- *Trend view* — available licenses and utilization over time, per system. For renewal planning and management reporting.

**Tiered alerting**, evaluated daily before the business day starts:

- Critical (< 5 available seats) → Slack + email to all IS admins
- Warning (< 10 available seats) → Slack to IS team lead
- Weekly PDF digest → IT management and VP, Monday 08:00

**Extensible pipeline** — adding a new system requires one staging view and one uncommented line. The serving table, LookML model, and dashboard never change. Phase 2 covers REST API ingestion, Google Sheets manual intake, and Cloud Run scrapers for tools without accessible APIs.

**Data quality visibility** — data_quality_flag is part of the staging contract. Failed ingestion writes a descriptive flag ('api_failed', 'stale') rather than a zero or missing row. The health summary tile surfaces it directly — broken ingestion is visible without checking pipeline logs.

**Three years of daily history** retained via BigQuery partition expiry, enabling trend analysis and year-over-year renewal comparisons.`,
      },
      {
        heading: "Handling the Hard Cases",
        body: `One Salesforce instance doesn't expose a user_license table through Fivetran — the pre-aggregated source the other four rely on. License usage had to be reconstructed from the raw user table: filter active users, exclude system-level account types, map internal user_type codes to human-readable license categories, aggregate by category, and apply hardcoded contract totals — including a -2 adjustment for system/admin accounts that hold licenses but aren't real provisioned users. Instance-specific, fully documented in the staging view, invisible to everything downstream.

Phase 2 adds a different challenge: tools without a Fivetran connector and possibly no API. The solution was a decision tree for ingestion method selection — REST API where one exists, a Google Sheets External Table where a monthly manual intake is viable, and a Cloud Run scraper as a last resort. In all three cases, raw data lands in BigQuery, a staging view normalizes it to the contract, and one line is uncommented in the assembly query. The pipeline doesn't need to know how the data arrived.`,
      },
      {
        heading: "Impact",
        body: `| | Before | After |
|---|---|---|
| How shortages were discovered | User couldn't be provisioned | Slack alert at 06:30 UTC before anyone is affected |
| Capacity check process | Manual, per-system, no consistent cadence | Single dashboard, all systems, updated daily |
| Trend visibility | None | 3 years of daily snapshots retained |
| Renewal planning basis | Anecdotal | Data-driven utilization history per system |
| Alerting | None | Automated, threshold-based, tiered by severity |
| License logic documentation | Tacit knowledge | Encoded in SQL, versioned, editable |`,
      },
      {
        heading: "What I'd Do Differently — and What's Next",
        body: `**Thresholds.** Fixed thresholds (< 5 critical, < 10 warning) applied uniformly across all license types don't reflect how different pools behave. A pool of 500 Chatter seats and a pool of 1 Analytics Integration seat are not equivalent risks. Percentage-based or per-system configurable thresholds would be more meaningful — a known gap to address before Phase 2 ships.

**Scrapers.** In retrospect, I'd push back harder before recommending the scraper path. Scrapers break when admin UIs change, require credential management, and add monitoring overhead. A stronger case that no API or partner integration exists should be required before defaulting to one.

**Manual intake.** The Google Sheets External Table approach works but puts data freshness entirely in a human's hands. A staleness flag for rows not updated within 35 days and a proactive admin reminder would close that gap. The flag logic is in the design; the reminder system isn't built yet.

**What's next.** Phase 2 — extending the pipeline to the rest of the SaaS portfolio using the hybrid ingestion model already designed and documented. The natural next layer beyond that is cost attribution: correlating license spend against utilization to surface rationalization opportunities at renewal, not just shortage warnings.`,
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
