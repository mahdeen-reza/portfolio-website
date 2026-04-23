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
    tags: ["Google Apps Script", "Google Sheets", "SOX", "Compliance"],
    github: "https://github.com/mahdeen-reza/systems-governance-toolkit",
    role: "Compliance Engineer",
    status: "Live — deployed across access review cycles",
    sections: [
      {
        heading: "Background",
        body: `SOX ITGC access reviews require designated managers to periodically confirm whether their direct reports should retain system access. Reviews run in Google Sheets, are tested externally by auditors, and carry direct audit consequences if controls fail.`,
      },
      {
        heading: "The Problem",
        body: `The process had controls in place, but the approach was detection-heavy. Two gaps created audit risk.

**Enforcement was not live.** Nothing prevented a reviewer from editing a row assigned to someone else. The only catch mechanism was manual post-review validation — matching completed rows against HR data using spreadsheet formulas after the fact.

**Attribution was incomplete.** Sheet-level edit history existed but lacked per-cell resolution. Confirming who changed what required manual reconciliation, not automatic attribution.`,
      },
      {
        heading: "The Solution — Two Layers",
        body: `Built directly into Google Sheets using Google Apps Script — keeping the audit evidence in the same environment auditors already review, with no additional tooling to introduce or defend.

**Layer 1 — Row-Level Enforcement**
Editor identity is captured automatically from their Google Workspace login and checked against the assigned reviewer for that row. Unauthorized edits are reverted immediately and the editor is notified in real time. Authorized edits are timestamped with the reviewer's email and time of sign-off.

**Layer 2 — Cell-Level Audit Trail**
Runs before Layer 1's revert logic — so unauthorized attempts are captured before they are wiped. Every edit to the primary decision column is logged to a dedicated audit tab: timestamp, editor email, record ID, assigned reviewer email, value entered, match status, and edit type. A validation status (Match / No Match / No Owner Assigned) is written to a visible column in the main sheet.

No Match persists in the validation column even after a revert — the attempt is the compliance signal, not just the outcome.`,
      },
      {
        heading: "The Code",
        body: `The full script is a single Google Apps Script file (\`access_review.gs\`) deployed via an installable trigger on each review sheet. Source: [systems-governance-toolkit on GitHub](https://github.com/mahdeen-reza/systems-governance-toolkit)

The architecture separates configuration from logic. Two configuration blocks at the top of the script define every sheet-specific value — column indices, sheet names, audit log tab name. Deploying to a new review sheet means updating these blocks only. The logic blocks are never modified.

\`\`\`javascript
// LAYER 1 CONFIGURATION — update these values to match your sheet
const SHEET_NAME         = "Access Review";  // Exact name of the sheet tab to monitor
const COLUMNS_TO_WATCH   = [25, 26, 27];     // Columns to enforce (Y=25, Z=26, AA=27)
const OWNER_EMAIL_COLUMN = 23;               // Column containing the assigned reviewer's email (W=23)
const LOG_COLUMN_OFFSET  = 4;                // Reviewer timestamp: edited col + offset (e.g. Y+4 → col AC)

// LAYER 2 CONFIGURATION — update these values to match your sheet
const AUDIT_LOG_SHEET_NAME = "Audit Log";  // Exact name of the audit log tab
const HISTORY_TRACK_COLUMN = 25;           // Primary decision column to audit (Y=25)
const MATCH_STATUS_COLUMN  = 30;           // Column for Edit History Validation status (AD=30)
const AUDIT_RECORD_ID_COL  = 1;            // Column containing the system Record ID (A=1)
const AUDIT_USER_NAME_COL  = 2;            // Column containing the User Name (B=2)
\`\`\`

**Layer 1 — Row-Level Enforcement (\`onEdit\`)**

The \`onEdit\` function fires on every edit event. It first passes the event to the audit layer (Layer 2), then checks whether the edit falls within a watched column. If it does, the editor's email is compared against the assigned reviewer email for that row. Unauthorized edits are reverted immediately — single-cell edits restore the previous value via \`e.oldValue\`, while multi-cell edits (drag/paste) revert to blank as a safe fallback. Authorized edits containing "yes" or "no" trigger a reviewer timestamp written to a logging column.

\`\`\`javascript
function onEdit(e) {
  onEditAuditHistory(e); // Audit layer runs first — captures value before any revert

  if (!e || !e.range) return;

  const range     = e.range;
  const sheet     = range.getSheet();
  const userEmail = e.user ? e.user.getEmail() : null;

  if (sheet.getName() !== SHEET_NAME || !userEmail) return;

  for (let row = range.getRow(); row <= range.getLastRow(); row++) {
    for (let col = range.getColumn(); col <= range.getLastColumn(); col++) {

      if (COLUMNS_TO_WATCH.includes(col)) {
        const ownerEmail = sheet.getRange(row, OWNER_EMAIL_COLUMN)
                               .getValue().trim().toLowerCase();

        if (ownerEmail && userEmail.toLowerCase() !== ownerEmail) {
          // Revert unauthorized edit
          const oldValue = (range.getNumRows() === 1 && range.getNumColumns() === 1)
                           ? e.oldValue : "";
          sheet.getRange(row, col).setValue(oldValue);

          SpreadsheetApp.getActiveSpreadsheet().toast(
            \\\`Change reverted. You are not authorized to edit this row.\\\`,
            "Access Denied", 5
          );
        } else {
          // Log reviewer timestamp on authorized edits containing "yes" or "no"
          const newValue = sheet.getRange(row, col).getValue().toString().toLowerCase();
          if (newValue.includes("yes") || newValue.includes("no")) {
            const timestamp = new Date();
            const stampText = \\\`\\\${userEmail} reviewed on \\\${timestamp.toLocaleString()}\\\`;
            sheet.getRange(row, col + LOG_COLUMN_OFFSET).setValue(stampText);
          }
        }
      }
    }
  }
}
\`\`\`

**Layer 2 — Cell-Level Audit Trail (\`onEditAuditHistory\`)**

Called as the first action inside \`onEdit()\` — before the revert fires — so unauthorized values are captured in the audit log before they are wiped. For every edit to the primary decision column, the function reads the editor email, assigned reviewer email, record metadata, and new value. It derives a match status (\`Match\`, \`No Match\`, or \`No Owner Assigned\`) and appends a full record to the audit log tab. The validation status is also written to a visible column in the main sheet — including for unauthorized attempts, so the mismatch is surfaced even after the cell is reverted.

\`\`\`javascript
function onEditAuditHistory(e) {
  if (!e || !e.range) return;

  const range     = e.range;
  const sheet     = range.getSheet();
  const userEmail = e.user ? e.user.getEmail().toLowerCase() : null;

  if (sheet.getName() !== SHEET_NAME || !userEmail) return;

  const ss         = SpreadsheetApp.getActiveSpreadsheet();
  const auditSheet = ss.getSheetByName(AUDIT_LOG_SHEET_NAME);
  if (!auditSheet) return;

  for (let row = range.getRow(); row <= range.getLastRow(); row++) {
    for (let col = range.getColumn(); col <= range.getLastColumn(); col++) {

      if (col !== HISTORY_TRACK_COLUMN) continue;

      const recordId      = sheet.getRange(row, AUDIT_RECORD_ID_COL).getValue();
      const userName      = sheet.getRange(row, AUDIT_USER_NAME_COL).getValue();
      const reviewerEmail = sheet.getRange(row, OWNER_EMAIL_COLUMN)
                                 .getValue().trim().toLowerCase();
      const newValue      = sheet.getRange(row, col).getValue();
      const timestamp     = new Date();

      let matchStatus, editType;

      if (!reviewerEmail) {
        matchStatus = "No Owner Assigned";
        editType    = "Authorized";
      } else if (userEmail === reviewerEmail) {
        matchStatus = "Match";
        editType    = "Authorized";
      } else {
        matchStatus = "No Match";
        editType    = "Unauthorized Attempt";
      }

      // Append full record to audit log
      auditSheet.appendRow([
        timestamp, userEmail, recordId, userName,
        reviewerEmail, newValue, matchStatus, editType
      ]);

      // Write validation status to main sheet — all outcomes including unauthorized
      sheet.getRange(row, MATCH_STATUS_COLUMN).setValue(matchStatus);
    }
  }
}
\`\`\`

Key design decision: the audit function is called *before* the enforcement function's revert logic. This ordering guarantees that even unauthorized edits — which will be immediately reverted — are captured in the audit log with the actual value the editor attempted to write. The compliance record is complete regardless of whether the enforcement control succeeds or fails.`,
      },
      {
        heading: "Impact",
        body: `| Metric | Outcome |
|---|---|
| SOX ITGC pass rate | 100% — no discrepancies found since implementation |
| Manual post-review validation | Eliminated — attribution is live and automatic |
| Audit evidence | Generated by the process itself, not reconstructed after the fact |
| Coverage | Deployed across UARs and PARs |
| Reusability | New review sheets deployed via configuration block update only — no logic changes |`,
      },
      {
        heading: "What's Next",
        body: `**Centralized audit trail.** The audit log currently lives as a tab within each review sheet. Next access review season, the script will be updated to auto-generate a dedicated Google Sheet per review cycle, stored in a designated Drive folder — centralizing the audit trail across all review sheets into a single, structured location.

**Trigger automation.** Deployment currently requires manually setting up an installable trigger per sheet. Will be exploring options to automate this step.

**Approver view.** The current sheet surfaces all rows to all approvers — reviewers have to locate their assigned rows manually. A cleaner solution would be a view that filters to only the rows assigned to the logged-in reviewer based on their email. This is on the roadmap pending leadership assessment of effort versus ROI — the current implementation is working well and any change needs to justify the investment.`,
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
    role: "Sole Designer and Implementer",
    status: "Ongoing",
    sections: [
      {
        heading: "The Problem",
        body: `Managing SaaS renewals without a documented process is manageable — until it isn't. Renewals get done, but they get done reactively, inconsistently, and without the analytical foundation that separates a transactional renewal from a strategic one.

The systems governance function within a software-as-a-service organization managed SaaS renewals for a dedicated portfolio of GTM tools without a formalized process, a defined operating cadence, or structured documentation standards. As the portfolio grew in scale and complexity, the absence of standardized operating infrastructure became increasingly visible.

### Pain Points

**Absence of a standardized operating procedure**
There was no consistent framework governing how renewals were planned, sequenced, or documented. Without a defined standard, the approach varied across renewals — making it difficult to ensure consistent outcomes, maintain accountability, or build on prior cycles systematically.

**Compressed analysis windows**
A thorough utilization analysis — user-level reporting, business context documentation, use case collection, capacity assessment — requires time and dedicated focus. Without a defined lead time built into the process, structured analysis was deprioritized in favor of execution on several renewals of major systems, particularly during periods of competing priorities. Rationalization opportunities — right-sizing, descoping, feature license optimization — were structurally difficult to surface as a result. Not because they didn't exist, but because there was rarely enough runway to find them.

**No consistent stakeholder loop**
Procurement, budget-owning departments, finance, and vendors were engaged reactively rather than through a structured communication sequence. This created friction and misaligned expectations at multiple points in the cycle — particularly in the commercial and approval stages where timing and clarity matter most.

**No structured record of renewal decisions**
Renewal outcomes were executed without a documented record of the analysis, recommendations, and decisions that produced them. If a decision was later questioned — on scope, pricing, or vendor terms — there was no structured artifact to reference.

**Implicit process as a single point of failure**
The renewal process relied on institutional knowledge passed informally without standardization. It couldn't be meaningfully delegated, systematically improved, or transferred intact. The function was dependent on continuity of individuals rather than on a repeatable, documented system.

---

The cost of this state was not dramatic — it was cumulative. Renewals got done. But strategic decisions were missed. Friction accumulated. And the function stayed dependent on tribal knowledge rather than growing into something the team could operate and build on.

> **Key Points**
> - No standardized operating procedure across a 60+ system portfolio
> - Structured analysis consistently deprioritized under compressed timelines
> - Rationalization opportunities structurally invisible — not absent, just unfindable
> - Renewal process a single point of failure — lived in institutional knowledge, not a system`,
      },
      {
        heading: "Role and Scope",
        body: `I designed and operationalized the end-to-end SaaS renewal function within an internal technology operations team at a software-as-a-service organization — formalizing and documenting what had previously been an informal, undocumented process with no standardized framework to build from.

| | |
|---|---|
| **Scope** | Full GTM SaaS portfolio — 60+ systems across sales, marketing, revenue operations, and customer success |
| **Role** | Sole designer and implementer — process architecture, tooling, documentation, stakeholder communication standards, and adoption |
| **Approach** | Observed and ran 10–12 major renewals over 7–8 months before formalizing — the process was built from operational reality, not designed in a vacuum |

> **Key Points**
> - Greenfield mandate — no predecessor process, no template, no documentation to inherit
> - 10–12 live renewals observed before formalization — pattern recognition before standardization
> - Sole ownership across every layer: process, tooling, documentation, and adoption`,
      },
      {
        heading: "What I Built",
        body: `The work produced four interconnected layers — each addressing a distinct gap in how the function planned, executed, and tracked renewals.

### Layer 1 — The Renewal Workflow

Two end-to-end process maps — one governing renewals, one governing seat and license expansions — designed and documented from scratch as the first standardized operating procedure the function had run against. Both workflows are orchestrated by Systems Governance across defined swim lanes: business owners, procurement, finance, and the vendor each own specific stages, with Systems Governance holding process ownership end-to-end.

The renewal cycle triggers at 70 days. The expansion cycle triggers when a product manager submits a request through the Systems Governance portal. Both share a mandatory finance validation gate and a structured analysis phase that protects the work needed to make informed, defensible decisions before any commercial or procurement action is taken.

[→ Full workflow documentation: step-by-step process guide](/projects/saas-renewal-operations/workflow)

### Layer 2 — The Tooling Layer

A Systems Governance portal was built to serve as the operational home for the function. Every renewal is logged as a ticket at initiation. Every expansion request is submitted by product managers through the portal directly. The Renewal Brief is attached to every ticket — keeping all context collocated with the work item. The portal replaced ad-hoc tracking with a structured, auditable record of every active and historical renewal and expansion in one place.

### Layer 3 — The Analytical Output

The structured analysis phase — protected by the 70-day lead time — is the mechanism through which strategic decisions become possible. Several renewals executed under the process produced rationalization and right-sizing outcomes that would have been difficult to surface under the previous ad-hoc approach, simply because there was now enough time and structure to do the analysis properly.

The Renewal Brief formalizes this output into a consistent artifact at the close of every cycle:

| Field | Description |
|---|---|
| Renewal decision | Renew / not renew |
| Scope change | Expand / descope / no change — with justification |
| License counts | Current and renewal figures |
| Pricing | Current and renewal terms |
| Cost savings | Where applicable |
| Linked documentation | Users analysis sheet, business context doc, PO reference |

Every renewal produces one — creating a documented record of every decision made, the analysis behind it, and the outcome it produced.

### Layer 4 — The Visibility Infrastructure

A three-layer data infrastructure provides continuous, portfolio-wide renewal visibility.

| Layer | What it is |
|---|---|
| **Contracts source of truth** | Structured model covering all 60+ systems: renewal dates, license counts, contract values, pricing, vendor contacts. Single input layer — one change propagates automatically throughout |
| **Connected data warehouse** | Derives from the contracts model automatically. No manual sync, no duplicate entry |
| **Looker dashboard** | Clean renewal-focused view: all systems sorted by renewal date, calculated days-to-renewal field, three-tier color-coded prioritization flag |

Dashboard summary tiles surface: total systems count, renewals due this month, and systems currently inside the 70-day process window. When the dashboard surfaces a system entering the window, the renewal process begins.

> **Key Points**
> - First standardized, documented renewal and expansion operating procedure for the function
> - 70-day lead time structurally protects the analysis window — not a guideline, a process gate
> - Finance validation is a mandatory gate in both workflows — no advancement without budget confirmation
> - Single input layer in the contracts source of truth — one entry point, everything else derives automatically
> - Renewal Brief produces a documented record of every renewal decision across the full portfolio`,
      },
      {
        heading: "Outcomes",
        body: `The work produced outcomes across three distinct dimensions.

| Dimension | Outcome |
|---|---|
| **Operational** | Renewals run against a defined 70-day process window, surfaced automatically through the dashboard. Ad-hoc start replaced by a visible, prioritized pipeline. Structured communication sequencing and early stakeholder mapping eliminated reactive engagement across procurement, finance, vendors, and business owners. |
| **Strategic** | The mandatory analysis phase created the conditions for strategic decisions that were structurally difficult to surface before. Several renewals produced rationalization and right-sizing outcomes identified through structured usage analysis done in advance — opportunities that existed before but were invisible without the time and structure to find them. |
| **Organizational** | The function is now delegable and repeatable. Process, tooling, documentation standards, and portal are all in place. A new team member onboards against a documented system — not against whoever held the institutional knowledge before. The function depends on a process, not on individuals. |

> **Key Points**
> - Defined 70-day renewal window replaced ad-hoc, as-needed start across 60+ systems
> - Strategic rationalization opportunities surfaced as a direct result of protected analysis time
> - Function is now fully delegable — documented system over institutional knowledge`,
      },
      {
        heading: "Design Decisions Worth Calling Out",
        body: `Three deliberate choices shaped how this process was built — and why it holds up under operational pressure.

**The analysis phase is mandatory, not optional**
In an ad-hoc renewal process, structured analysis is the first thing dropped when timelines compress. A proper utilization review — user-level usage data, business context documentation, use case collection — requires dedicated time that a reactive approach rarely protects. The decision to mandate the analysis phase as a fixed, sequenced step inside a 70-day window was deliberate: the only way to consistently produce it was to make skipping it structurally difficult.

**The portal as the operational home, not a tracking spreadsheet**
A shared spreadsheet could have tracked renewals. The decision to build a structured portal went further — creating a formal intake system with defined workflows for both internal logging and external stakeholder requests. Every renewal and expansion has a ticket, a brief, and a documented record. The portal made the process auditable by default, not by effort.

**One input layer — everything else derives from it**
The contracts source of truth is built around a single input tab. One entry point for any change — the rest of the model, the connected data warehouse, and the Looker dashboard update automatically. The alternative — maintaining data in multiple places — produces version drift and erodes trust in the numbers over time. Centralizing input was a deliberate architectural decision, not a convenience.

> **Key Points**
> - Analysis phase is a fixed process gate — structurally protected, not effort-dependent
> - Portal makes the process auditable by default — every cycle has a ticket, a brief, and a record
> - Single input layer eliminates version drift across a 60+ system portfolio`,
      },
      {
        heading: "What's Next",
        body: `The process is established and operational — but the current implementation still relies on a distributed set of tools. The renewal brief lives in a document. The contracts source of truth lives in a spreadsheet. The dashboard lives in a BI tool. The portal lives in a project management platform. Each works well individually; together, they require context switching and manual upkeep that compounds across a portfolio of over 60 systems.

### The Next Evolution — A Unified Renewal System

The goal is a single internal tool where every component of the renewal function lives in one place.

| Component | Current State | Target State |
|---|---|---|
| Contracts data | Manually maintained spreadsheet | Form-based data model — updated through structured input, not direct sheet edits |
| Renewal dashboard | Separate BI tool, derives from spreadsheet | Auto-generated from the contracts data model — always current |
| Renewal workspace | Google Doc brief + Jira ticket | Auto-generated renewal record per system when the 70-day window opens — full cycle worked through in one place |
| Documentation | Distributed across multiple tools | Centralized within the renewal record — brief, analysis, decisions, and close-out in one view |

When a system enters the renewal window, the tool surfaces it as an active record — a dedicated workspace where the full renewal cycle can be completed without leaving the system. No context switching. No manual propagation of data across tools.

### What That Unlocks

With operational overhead removed, the function's analytical capacity shifts. The focus moves from keeping the process running to extracting more value from it — deeper SKU-level optimization, feature license rationalization, and more sophisticated commercial positioning at renewal. That is where the next layer of impact lives.

> **Key Points**
> - Current implementation is functional but distributed — context switching and manual upkeep across 60+ renewals is the remaining friction
> - Target state: a unified internal tool where contracts data, dashboard, renewal workspace, and documentation live in one place
> - Consolidation unlocks capacity for higher-value analytical work — SKU-level optimization and feature license rationalization`,
      },
    ],
  },
];
