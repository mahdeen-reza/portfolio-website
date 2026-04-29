# License Agent Build Sync & Case Study Update — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sync personal repo documentation with recent company repo architecture changes, update the portfolio case study, and add the architecture diagram.

**Architecture:** Three sequential phases — (1) update personal repo docs (README, ARCHITECTURE, PRD) with sanitized versions of the company repo changes, (2) render Mermaid diagram to SVG and commit to personal repo, (3) update portfolio case study content and add diagram reference.

**Tech Stack:** Markdown, Mermaid CLI (npx @mermaid-js/mermaid-cli), TypeScript (projects.ts), Git

---

### Task 1: Update Personal Repo README.md — Add New Features

**Files:**
- Modify: `/Users/mahdeen-reza.amin/projects/license-cleanup-agent-public/README.md:84-96`

- [ ] **Step 1: Add new features to Key Features section**

In `/Users/mahdeen-reza.amin/projects/license-cleanup-agent-public/README.md`, find the Key Features section (line 84). After the last existing bullet (`- **System onboarding** — ...` at line 95), add these new feature bullets before the `---` separator:

```markdown
- **Async analysis pipeline** — POST returns 202 immediately; pipeline runs in background with real-time status polling. Frontend shows progress updates ("AI reasoning: batch 5 of 34"). Concurrent run guard prevents overlapping analyses. Stale runs auto-expire after 20 minutes.
- **Parallel AI batching** — 8 concurrent API calls processing batches of 50 users each. Reduces AI reasoning step from ~8 minutes (sequential) to ~1 minute for 1700+ users.
- **Prompt caching** — static system context cached across all batches via Anthropic's prompt caching. First batch pays full input cost + cache write; subsequent batches pay ~10% for the cached portion.
- **In-progress runs** — resume incomplete reviews across sessions. Checkbox state persists to DB in real time; no progress is lost if the analyst navigates away.
- **Ticket submission workflow** — pre-filled submission modal with justification and email list. Analyst submits via ticketing portal, records ticket number for audit trail. Run lifecycle: processing → review in progress → submitted.
```

- [ ] **Step 2: Verify no company-specific terms leaked**

Search the added text for: ISSUP, JSM, Jira, Zylo, Workday, Lightspeed, Coolify. None should appear.

- [ ] **Step 3: Commit**

```bash
cd /Users/mahdeen-reza.amin/projects/license-cleanup-agent-public
git add README.md
git commit -m "docs: add async pipeline, parallel batching, prompt caching, in-progress runs, ticket submission to features

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 2: Update Personal Repo ARCHITECTURE.md — Schema & API Routes

**Files:**
- Modify: `/Users/mahdeen-reza.amin/projects/license-cleanup-agent-public/ARCHITECTURE.md`

- [ ] **Step 1: Update AnalysisRun model in Section 6 (Database Schema)**

Find the `model AnalysisRun` block (starting at line 259). Replace the count fields and add the new async/review fields. The updated model block should be:

```prisma
model AnalysisRun {
  id             String           @id @default(uuid())
  systemId       String
  system         System           @relation(fields: [systemId], references: [id])
  instanceName   String
  cleanupType    String           // "routine" | "on_demand"
  mode           String           // "standard" | "urgent" | "critical"
  licensesNeeded Int?
  ranByEmail     String
  ranAt          DateTime         @default(now())
  totalUsers     Int              @default(0)
  directRemove   Int              @default(0)
  notifyFirst    Int              @default(0)
  exEmployees    Int              @default(0)
  gtmFlagged     Int              @default(0)
  priorException Int              @default(0)
  humanReview    Int              @default(0)
  excluded       Int              @default(0)
  // Async pipeline status tracking
  status        String   @default("completed")  // "processing" | "completed" | "failed"
  statusDetail  String?                          // e.g. "AI reasoning: batch 5 of 34"
  errorMessage  String?                          // populated on failure
  // Review lifecycle (independent of pipeline status)
  reviewStatus  String    @default("in_progress")  // "in_progress" | "submitted"
  ticketNumber  String?                             // e.g. "TICKET-1234"
  submittedAt   DateTime?
  // Delta analysis
  previousRunId        String?
  previousRun          AnalysisRun?  @relation("RunComparison", fields: [previousRunId], references: [id])
  comparedRuns         AnalysisRun[] @relation("RunComparison")
  sporadicFlagged      Int           @default(0)
  reappeared           Int           @default(0)
  newlyInactive        Int           @default(0)
  persistentlyInactive Int           @default(0)
  recovered            Int           @default(0)
  netNew               Int           @default(0)
  results        AnalysisResult[]
  chatOverrides  ChatOverride[]
}
```

- [ ] **Step 2: Add `@@unique` constraint to PriorException model**

Find `model PriorException` (line 249). After the `updatedAt` field, before the closing `}`, add:

```prisma
  @@unique([systemId, userEmail])
```

- [ ] **Step 3: Update API Routes in Section 7**

Replace the API routes block (the ``` code block starting around line 366) with the updated version:

```
GET  /api/me                           <- Current user identity + role (from AppUser)
GET  /api/systems                      <- List registered systems + instances
POST /api/systems/onboard              <- New system onboarding (Phase 2)
POST /api/systems/onboard/confirm      <- Confirm reviewed Reasoning Table + save system
POST /api/systems/:systemId/generate-docs <- Generate formal Markdown documentation for a system
POST /api/analysis/run                 <- Start analysis pipeline (returns 202, runs async)
GET  /api/analysis/:runId/status       <- Lightweight polling for pipeline progress
GET  /api/analysis/in-progress         <- In-progress runs for current user (review not yet submitted)
GET  /api/analysis/history             <- Audit log -- completed + submitted runs
GET  /api/analysis/:runId              <- Full details of a past run
GET  /api/analysis/:runId/delta        <- Delta summary for a run (vs previous)
PUT  /api/analysis/:runId/check        <- Toggle single result checkbox (real-time persistence)
POST /api/analysis/:runId/action       <- Batch actioning decisions
POST /api/analysis/:runId/submit       <- Record ticket number and finalize the run
POST /api/analysis/:runId/chat         <- Review conversation (reclassify, add exception, query)
GET  /api/criteria/:systemId           <- Access criteria document for a system
POST /api/criteria/:systemId/chat      <- Criteria update conversation
POST /api/sporadic-flags               <- Add a sporadic/temporary access flag
GET  /api/sporadic-flags/:instanceName <- List sporadic flags for an instance
PUT  /api/sporadic-flags/:id           <- Update or deactivate a sporadic flag
GET  /api/user-history/:email/:instanceName <- User history timeline for a specific user + instance
GET  /api/admin/users                  <- List all provisioned users (admin only)
POST /api/admin/users                  <- Add a user (admin only)
PUT  /api/admin/users/:id             <- Update user name/role/active (admin only)
```

- [ ] **Step 4: Add new endpoint response schemas after the existing POST /analysis/run request block**

After the `POST /api/analysis/run — Request` code block (ending around line 399), add:

```markdown
### POST /api/analysis/run — Response (202 Accepted)
\`\`\`typescript
{ runId: string; status: 'processing' }
\`\`\`
Pipeline runs asynchronously in the background. Frontend polls `GET /api/analysis/:runId/status` for progress updates. On completion, fetches full results via `GET /api/analysis/:runId`.

### GET /api/analysis/:runId/status — Response
\`\`\`typescript
{
  status: 'processing' | 'completed' | 'failed';
  statusDetail: string | null;    // e.g. "AI reasoning: batch 5 of 34"
  errorMessage: string | null;    // populated on failure
  totalUsers: number;
}
\`\`\`
Includes stale run detection — runs processing for more than 20 minutes are reported as failed.
```

- [ ] **Step 5: Commit**

```bash
cd /Users/mahdeen-reza.amin/projects/license-cleanup-agent-public
git add ARCHITECTURE.md
git commit -m "docs: update schema and API routes for async pipeline, parallel batching, ticket submission

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 3: Update Personal Repo ARCHITECTURE.md — Intelligence Layer & Pipeline Steps

**Files:**
- Modify: `/Users/mahdeen-reza.amin/projects/license-cleanup-agent-public/ARCHITECTURE.md`

- [ ] **Step 1: Replace Intelligence Layer section (Section 8)**

Find `## 8. Intelligence Layer` and replace the `### AI Reasoning Engine` subsection (including the code block and the batch size paragraph). Keep `### Foundational Knowledge` unchanged. The new content:

```markdown
### Reasoning Engine (Anthropic API)
\`\`\`typescript
// src/intelligence/reasoningEngine.ts
const systemContext = buildSystemContext(
  foundationalKnowledge,  // from DB
  instanceConfig,         // thresholds, product alignment, gtmHandling
  runConfig,              // mode, cleanupType, licensesNeeded
  priorExceptions,        // exception register for this instance
);

const response = await client.messages.create({
  model: MODEL_ID,
  max_tokens: 5000,
  system: [{ type: 'text', text: systemContext, cache_control: { type: 'ephemeral' } }],
  messages: [{ role: 'user', content: userBatchPayload }],
});
\`\`\`

Batch size is set to 50 users per API call, with up to 8 batches running in parallel (BATCH_SIZE and CONCURRENCY constants in src/intelligence/reasoningEngine.ts). For a typical large instance (~1700 users) this means ~34 batches completing in ~5 rounds of 8, reducing the AI step from ~8 minutes (sequential) to ~1 minute. The static system context is cached across all batches via Anthropic's prompt caching — first batch pays full price + cache write; subsequent batches pay ~10% for the cached portion. Per-user data is sent in compact pipe-delimited tabular format to reduce input tokens.
```

Keep the existing `### Per-User Output from AI` and `### New System Onboarding` subsections unchanged.

- [ ] **Step 2: Update Pipeline Steps**

Find the pipeline steps section (after `### POST /api/analysis/run — Pipeline Steps`). Add the async pipeline note before the numbered list, and update the list:

```markdown
### POST /api/analysis/run — Pipeline Steps
Pipeline runs asynchronously after the POST returns 202. Progress is reported via `statusDetail` field on the AnalysisRun record, polled by `GET /api/analysis/:runId/status`.

\`\`\`
0. Create AnalysisRun record with status="processing", return 202 immediately
1. Parse both CSVs (csv-parse) + enrich users
2. Deduplicate usage platform rows (especially connector duplicates)
3. Exclude new users (createdDate < 30 days)
4. Identify + exclude integration users
5. Run email normalization cascade for all remaining users
6. Enrich matched users with HR data
7. Apply GTM decision framework (4 layers)
8. Apply instance product alignment
9. Check prior exception register
10. Check sporadic flag register — tag users with known temporary access patterns
11. Run deterministic pre-classification
12. Send enriched dataset to AI reasoning engine (batches of 50 users, 8 batches in parallel)
    — statusDetail updated as batches complete: "AI reasoning: batch N of M"
13. Receive classifications + reasoning per user
14. Save results to DB
15. Delta comparison (if previous run exists for this instance):
    a. Look up most recent completed run for this instance
    b. Set previousRunId on current run
    c. Join current results to previous results on email
    d. Tag each result with deltaCategory + previousClassification
    e. Compute and store delta summary counts on AnalysisRun
    f. If no previous run -> baseline run, all deltaCategory = null
16. Write UserInstanceHistory events for all classified users
17. Mark run status="completed"
\`\`\`
```

- [ ] **Step 3: Add new endpoint docs after the existing POST /action block**

After the `### POST /api/analysis/:runId/action` block, add:

```markdown
### PUT /api/analysis/:runId/check — Toggle Single Checkbox
\`\`\`typescript
// Request body
{ resultId: string; checked: boolean }

// Processing:
// Sets actionStatus to "actioned" (checked=true) or "pending" (checked=false)
// Does NOT write audit events — those are written at submission time
\`\`\`

### POST /api/analysis/:runId/submit — Record Ticket Number and Finalize
\`\`\`typescript
// Request body
{ ticketNumber: string }  // e.g. "TICKET-1234"

// Processing:
// 1. Validate ticket number format
// 2. Update reviewStatus to "submitted", record ticketNumber + submittedAt
// 3. Write UserInstanceHistory events for all actioned/deferred users
\`\`\`
```

- [ ] **Step 4: Verify sanitization — no company terms**

Search the modified file for: ISSUP, JSM, Jira, Zylo, Workday, Lightspeed, Coolify, SF Core, SF NuOrder. None should appear in the newly added/modified content.

- [ ] **Step 5: Commit**

```bash
cd /Users/mahdeen-reza.amin/projects/license-cleanup-agent-public
git add ARCHITECTURE.md
git commit -m "docs: update intelligence layer and pipeline steps for prompt caching, parallel batching, async pipeline

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 4: Update Personal Repo PRD.md

**Files:**
- Modify: `/Users/mahdeen-reza.amin/projects/license-cleanup-agent-public/PRD.md`

- [ ] **Step 1: Update header date**

Change line 3 from:
```
**Last Updated:** March 2026  
```
to:
```
**Last Updated:** April 2026  
```

- [ ] **Step 2: Update Non-Goals**

Replace line 42:
```
- Automating user removal, ticket submission, or notifications (human executes all actions)
```
with:
```
- Automating user removal or notifications (human executes all actions). Ticket content is generated and the ticketing portal is opened, but the analyst submits the ticket manually.
```

- [ ] **Step 3: Add In-Progress Runs to Core User Flows**

Before `### Flow 1` (line 62), add:

```markdown
**In-Progress Runs:** When an analyst opens the app, any runs that are completed but not yet submitted (review still in progress) are shown below the run configuration form. Each in-progress run shows instance, mode, date, and a progress bar indicating how many users have been reviewed. Analyst can click **Resume** to continue reviewing where they left off.
```

- [ ] **Step 4: Update Flow 1 steps for async pipeline and ticket submission**

Replace step 6 (line 69) with:
```
6. Pipeline starts asynchronously -- app returns immediately with a progress indicator. Analyst sees real-time status updates (e.g. "AI reasoning: batch 5 of 34"). Agent processes: normalizes emails -> joins HR data -> applies GTM framework -> classifies all users -> generates reasoning per user -> compares against previous run for this instance (if exists)
```

Replace steps 12-13 (lines 75-76) with:
```
12. Clicks **Submit Ticket** -> submission modal opens with pre-filled fields (summary, justification with email list, system, priority). Analyst reviews, clicks **Open Portal** to open the ticketing portal with content copied to clipboard, and submits.
13. After submitting, enters the ticket number (e.g. TICKET-1234) back in the modal -> tool records ticket number, marks run as "submitted," and logs all actioned/deferred users in the audit trail.
```

- [ ] **Step 5: Update Flow 2 for async and ticket submission**

Replace step 3 (line 84) with:
```
3. Uploads both CSVs -> runs analysis (pipeline runs asynchronously with progress tracking)
```

Replace step 5 (line 86) with:
```
5. Analyst works through Direct Remove list top-down, **checking off users** until minimum is met. Checkboxes persist in real-time. Uses User History panel to quickly verify borderline cases.
```

Replace steps 7-8 (lines 88-89) with:
```
7. Clicks **Submit Ticket** -> submission modal opens with pre-filled content, analyst submits via ticketing portal and records ticket number
8. Tool finalizes run as "submitted" with ticket number for audit trail
```

- [ ] **Step 6: Update Processing section — AI reference**

Find line 180 (`- AI reasoning`) and replace "AI reasoning" with "Anthropic Claude reasoning" if it says "Bedrock". (The personal repo already says "AI reasoning" — verify and update only if needed.)

- [ ] **Step 7: Update pipeline flow diagram**

Find the `Upload → Validate` flow diagram (around line 203). Replace the relevant lines:

```
Upload → Validate CSV schemas match expected format
       → Warn if schema mismatch detected
       → Create run record, return 202 immediately
       → Pipeline runs asynchronously -- frontend polls for progress

Process → Parse both files in memory
        → Deduplicate usage platform rows
```

And in the Process section, replace any "Bedrock" reference with "AI reasoning engine". Update the Action section:

```
Action → Analyst checks off users per tab (checkboxes persist in real-time)
       → Clicks Submit Ticket -> submission modal opens with pre-filled fields
       → Opens ticketing portal with content copied -> submits manually
       → Records ticket number -> run marked as "submitted"
```

- [ ] **Step 8: Update Constraints table**

Update the AI row to say "Anthropic Claude API" if it says Bedrock. Update the Actions row:
```
| Actions | Human-executed only -- no automated removals or notifications. Ticket content is generated but submitted manually via ticketing portal. |
```

- [ ] **Step 9: Update V1 Scope**

After the existing "Living Access Criteria" bullet, add:
```
- **Ticket Submission Workflow -- pre-filled modal, opens ticketing portal, records ticket number for audit trail**
- **In-Progress Runs -- resume incomplete reviews, real-time progress tracking across sessions**
- **Async Analysis Pipeline -- background processing with real-time status polling, eliminates timeout issues on large datasets**
```

Update "Out of scope" — replace:
```
- Automated ticket submission
```
with:
```
- Fully automated ticket submission (tool generates content and opens portal, but analyst submits manually)
```

- [ ] **Step 10: Verify sanitization**

Search for: ISSUP, JSM, Jira, Zylo, Workday, Lightspeed, Coolify. None should appear in newly added/modified content.

- [ ] **Step 11: Commit**

```bash
cd /Users/mahdeen-reza.amin/projects/license-cleanup-agent-public
git add PRD.md
git commit -m "docs: update PRD for async pipeline, ticket submission, in-progress runs, Anthropic API

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 5: Render Mermaid Diagram to SVG

**Files:**
- Create: `/Users/mahdeen-reza.amin/projects/license-cleanup-agent-public/architecture/pipeline_architecture.svg`

- [ ] **Step 1: Create a temporary Mermaid source file**

```bash
cat > /tmp/pipeline_architecture.mmd << 'MERMAID'
flowchart TB
    subgraph Input
        A[Usage Platform CSV] --> C[Parse & Deduplicate]
        B[HR System CSV] --> C
    end

    subgraph Processing
        C --> D[Email Normalization Cascade]
        D --> E[HR Data Enrichment]
        E --> F[Classification Engine<br/>GTM 4-Layer Framework]
    end

    subgraph Intelligence
        G[Foundational Knowledge<br/>+ Access Criteria] --> H
        F --> H[AI Reasoning Engine<br/>Anthropic Claude API]
    end

    subgraph Output
        H --> I[9-Category Results<br/>7 Tabs]
        I --> J[Selective Actioning<br/>Per-User Checkboxes]
        J --> K[Email List + Audit Log]
    end

    subgraph Persistence
        H --> L[(PostgreSQL<br/>14 Prisma Models)]
        L --> M[Delta Analysis<br/>Run-Over-Run]
        L --> N[User History<br/>Timeline View]
        L --> O[Sporadic Register<br/>+ Exception Register]
        M --> I
    end

    subgraph Review
        I --> P[Review Chat<br/>Reclassify / Query / Flag]
        P --> L
    end
MERMAID
```

- [ ] **Step 2: Render to SVG using mermaid CLI**

```bash
npx --yes @mermaid-js/mermaid-cli -i /tmp/pipeline_architecture.mmd -o /Users/mahdeen-reza.amin/projects/license-cleanup-agent-public/architecture/pipeline_architecture.svg --backgroundColor transparent
```

If the `--backgroundColor transparent` flag fails, run without it and the default white background is acceptable.

- [ ] **Step 3: Verify SVG was created**

```bash
ls -la /Users/mahdeen-reza.amin/projects/license-cleanup-agent-public/architecture/pipeline_architecture.svg
```

Expected: file exists, non-zero size.

- [ ] **Step 4: Commit**

```bash
cd /Users/mahdeen-reza.amin/projects/license-cleanup-agent-public
git add architecture/pipeline_architecture.svg
git commit -m "docs: add pipeline architecture SVG rendered from Mermaid diagram

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 6: Push Personal Repo Changes

- [ ] **Step 1: Verify git remote is personal account**

```bash
cd /Users/mahdeen-reza.amin/projects/license-cleanup-agent-public
git remote -v
```

Expected: `origin https://github.com/mahdeen-reza/license-cleanup-agent.git`

- [ ] **Step 2: Verify commit log looks correct**

```bash
git log --oneline -5
```

Expected: 4 new commits (README, ARCHITECTURE schema/routes, ARCHITECTURE intelligence/pipeline, PRD, SVG).

- [ ] **Step 3: Push to remote**

```bash
git push origin main
```

---

### Task 7: Update Portfolio Case Study — Architecture Section

**Files:**
- Modify: `/Users/mahdeen-reza.amin/projects/portfolio-website/src/lib/projects.ts:117-167`

- [ ] **Step 1: Add architecture diagram at top of Architecture section body**

In the license-cleanup-agent's Architecture section body (starts at line 118 with `` body: `The system is a single-container... ``), prepend the image markdown before the existing text. The first line of the body should become:

```
![Pipeline Architecture](https://raw.githubusercontent.com/mahdeen-reza/license-cleanup-agent/main/architecture/pipeline_architecture.svg)

The system is a single-container web application...
```

This matches the pattern used in the SaaS License Monitor case study at line 273.

- [ ] **Step 2: Update AI Reasoning Engine subsection**

Find the AI Reasoning Engine paragraph in the Architecture section body (line 157). Replace:
```
Users are batched (25 per API call) to manage token limits. The system context includes foundational knowledge, instance-specific access criteria, and prior exception data.
```
with:
```
Users are batched (50 per API call) with up to 8 batches running in parallel, reducing the AI step from ~8 minutes to ~1 minute for large datasets. The static system context -- foundational knowledge, instance-specific access criteria, and prior exception data -- is cached across all batches via Anthropic's prompt caching, so only the first batch pays full input cost.
```

- [ ] **Step 3: Add "Production Hardening" subsection at end of Architecture body**

Append after the "### Persistence and Audit Trail" paragraph (before the closing backtick on line 167):

```markdown

### Production Hardening

The initial synchronous pipeline timed out on large datasets -- 1700+ users generating 34+ sequential API batches took 8-10 minutes, exceeding reverse proxy timeouts. Three changes solved this.

The analysis endpoint now returns 202 immediately with a run ID. The pipeline runs in the background, updating a status field at each stage. The frontend polls for progress every 3 seconds, showing real-time updates ("AI reasoning: batch 5 of 34"). A concurrent run guard prevents overlapping analyses, and stale runs auto-expire after 20 minutes.

AI reasoning batches run 8 at a time through a worker-pool pattern instead of sequentially. Combined with prompt caching on the static system context -- where the first batch pays full input cost and subsequent batches pay roughly 10% for the cached portion -- the AI step dropped from ~8 minutes to under a minute.

The review workflow now persists checkbox state to the database in real time. Analysts can pause a review, close the browser, and resume later without losing progress. A submission modal pre-fills the support ticket content, opens the ticketing portal, and records the ticket number to finalize the run. Each run moves through a clear lifecycle: processing, review in progress, submitted.
```

- [ ] **Step 4: Verify the edits compile**

```bash
cd /Users/mahdeen-reza.amin/projects/portfolio-website
npm run build
```

Expected: successful build with no TypeScript errors.

---

### Task 8: Update Portfolio Case Study — What's Next & Status

**Files:**
- Modify: `/Users/mahdeen-reza.amin/projects/portfolio-website/src/lib/projects.ts:216-220`

- [ ] **Step 1: Update the status field**

Find the license-cleanup-agent project's `status` field (line 49):
```
status: "Phase 1 complete, Phase 2 infrastructure ready",
```

Replace with:
```
status: "Production — Phase 2 infrastructure ready",
```

- [ ] **Step 2: Update the What's Next section body**

Find the What's Next section (line 216-220). The current body mentions "automated ticket submission post-analysis (removing the copy-paste step)" as a future item — but this is now done. Replace the body:

```
`**Phase 2 is infrastructure-ready.** The self-serve system onboarding flow -- upload a sample CSV, provide a description, review the AI-generated reasoning table, confirm -- is already built. Expanding to additional SaaS systems requires no engineering work, just an analyst with a CSV and five minutes.

Since the initial build, three production bottlenecks have been resolved. The analysis pipeline now runs asynchronously with real-time progress tracking -- eliminating the timeout failures that occurred on large datasets. The ticket submission step is no longer a manual copy-paste -- a pre-filled modal generates the content and opens the ticketing portal directly. And review state persists across sessions, so analysts can pause and resume without losing progress.

Beyond that: automated data loading from platform APIs (removing the manual CSV export) and eventually a fully hands-off pipeline that a support team member can operate without analyst handover.`
```

- [ ] **Step 3: Verify build**

```bash
cd /Users/mahdeen-reza.amin/projects/portfolio-website
npm run build
```

Expected: successful build.

---

### Task 9: Verify Everything End-to-End

- [ ] **Step 1: Check dev server renders correctly**

Start dev server if not running and open `http://localhost:3000/projects/license-cleanup-agent`. Verify:
- Architecture section shows the pipeline diagram image at the top
- "Production Hardening" subsection appears after "Persistence and Audit Trail"
- AI Reasoning Engine paragraph mentions batch size 50 and parallel batching
- What's Next section reflects completed items
- Status in header says "Production — Phase 2 infrastructure ready"

- [ ] **Step 2: Verify other case study pages are unaffected**

Check `/projects/saas-license-monitor`, `/projects/sox-access-review-controls`, `/projects/saas-renewal-operations` — all should render identically to before.

- [ ] **Step 3: Verify git context is correct**

```bash
cd /Users/mahdeen-reza.amin/projects/portfolio-website
git remote -v
```

Expected: portfolio-website remote, not the license-cleanup-agent remote.

```bash
cd /Users/mahdeen-reza.amin/projects/license-cleanup-agent-public
git remote -v
```

Expected: `origin https://github.com/mahdeen-reza/license-cleanup-agent.git` (personal account).

- [ ] **Step 4: Sanitization final check on personal repo**

```bash
cd /Users/mahdeen-reza.amin/projects/license-cleanup-agent-public
grep -rn "ISSUP\|Jira\|JSM\|Zylo\|Workday\|Lightspeed\|Coolify" README.md ARCHITECTURE.md PRD.md
```

Expected: no matches in newly modified content.
