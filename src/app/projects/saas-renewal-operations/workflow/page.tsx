import Link from "next/link";
import type { Metadata } from "next";
import Markdown from "@/components/Markdown";

export const metadata: Metadata = {
  title: "Workflow Documentation: SaaS Renewal & Expansion | Mahdeen Reza",
  description:
    "Comprehensive process reference for SaaS tool renewals and seat expansions — covering initiation through close-out.",
};

const sections = [
  {
    heading: "Process Overview",
    body: `| | **Tool Renewal** | **Tool Expansion** |
|---|---|---|
| **Trigger** | 70-day renewal window, surfaced by renewals dashboard | Expansion need identified and submitted by Product Manager |
| **Portal entry** | Renewal ticket logged by Systems Governance | Expansion ticket submitted by Product Manager |
| **Finance gate** | Mandatory — no advancement without budget confirmation | Mandatory — no advancement without budget confirmation |
| **Procurement involvement** | Post-recommendation: ticket review, negotiation, full procurement process | Post-analysis: ticket review, negotiation, full procurement process |`,
  },
  {
    heading: "Swim Lane Ownership",
    body: `Both process maps operate across defined swim lanes. Each lane owns the output of the steps that fall within it. Systems Governance orchestrates the full workflow.

**Tool Renewal — 5 Swim Lanes**

| Swim Lane | Owns |
|---|---|
| **Systems Governance** | Process initiation, all analysis and documentation, renewal recommendation, vendor notification, procurement ticket creation, ISSUP ticket, clean-up coordination, close-out |
| **Business Owner(s) & Key Stakeholders** | Recommendation review and approval, scope adjustment input, budget accommodation decision |
| **Procurement** | PRO ticket review and approvals, price and terms negotiation with vendor, legal review, contract signature, PO issuance and approvals, invoice request and forwarding |
| **Finance** | Budget validation, payment execution via procurement platform, invoice processing |
| **Vendor** | Quote issuance, invoice submission, payment confirmation |

**Tool Expansion — 4 Swim Lanes**

| Swim Lane | Owns |
|---|---|
| **Systems Governance** | Process initiation, capacity assessment, all analysis and documentation, vendor enquiry coordination, expansion decision notice, procurement ticket creation, ISSUP ticket, clean-up coordination, close-out |
| **Procurement** | PRO ticket review and approvals, price negotiation with vendor, legal review, contract amendment, PO issuance and approvals, invoice request and forwarding |
| **Finance** | Budget validation, payment execution, invoice processing |
| **Vendor** | Quote issuance, invoice submission, payment confirmation |`,
  },
  {
    heading: "Tool Renewal Process",
    body: `**Step 1 — Process Initiation** (Systems Governance)
The renewals dashboard surfaces a system entering the 70-day window. Systems Governance logs a renewal ticket in the portal and creates the Renewal Brief — the central document that carries all commercial, operational, and stakeholder context through the full cycle. Business owner, consultation points, budget owner, and vendor contact are confirmed at initiation.

**Step 2 — Data Collection** (Systems Governance)
Contract and license metadata is pulled from the contracts source of truth: renewal date, current license count, pricing, contract term, and auto-renewal deadline. Usage data is pulled from the SaaS management platform: active users, login activity, feature utilization, and license allocation.

**Step 3 — Business Context Documentation** (Systems Governance)
The business context document for the system is created (if new) or reviewed and updated. Captures: system purpose, primary use cases, user segments, key workflows, and strategic fit within the GTM stack.

**Step 4 — Users Analysis** (Systems Governance)
A structured user-level utilization analysis is conducted — identifying inactive or underutilized license holders, assessing capacity against current and projected headcount, and surfacing optimization opportunities. Findings are documented in a users analysis sheet linked to the Renewal Brief.

**Step 5 — Use Case Collection** (Systems Governance)
Active use cases are gathered from the business owner and key stakeholders — capturing which workflows depend on the system and any unmet needs not reflected in usage data alone.

**Step 6 — Future Need Input** (Systems Governance)
Forward-looking license requirements are collected to account for planned headcount changes, team expansions, or new workflows expected within the contract term.

**Step 7 — Budget Validation** (Finance) — Mandatory Gate
All anticipated renewal costs are submitted to finance for budget validation. No renewal advances without confirmed budget alignment. Unresolved budget constraints are addressed at this stage.

**Step 8 — Renewal Recommendation** (Systems Governance)
All inputs are synthesized into a structured recommendation covering: renewal decision, scope change with justification, target license count, pricing position, preferred contract term, and cost savings where applicable. The Renewal Decision Overview in the Renewal Brief is completed.

**Step 9 — Recommendation Review** (Business Owner(s) & Key Stakeholders)
The recommendation is presented to business owners and key stakeholders for review and approval.

| Outcome | Next Step |
|---|---|
| **Approved** | Advance to vendor notification |
| **Further review needed** | Scope and/or budget inputs revisited → recalibrate → return to review |
| **Rejected** | Budget accommodation discussion → scope adjustment → recalibrate → return to review |

**Step 10 — Renewal Decision Notice to Vendor** (Systems Governance)
*Timing: no later than 30 days before renewal date.* The vendor is formally notified of the renewal decision and intended scope. Timing is deliberate — ensuring adequate commercial runway before deadline pressure sets in and establishing the basis for negotiation.

**Step 11 — PRO Ticket Review & Approvals** (Procurement)
The procurement team reviews and approves the renewal request before proceeding to vendor negotiation.

**Step 12 — Price & Terms Negotiation** (Procurement)
Procurement negotiates pricing, contract term, and commercial terms with the vendor. The usage analysis and business context gathered by Systems Governance directly inform the negotiating position.

**Step 13 — Procurement Process** (Procurement)
Legal review → contract signature → requisition and PO issuance and approvals → invoice request and forwarding to finance.

**Step 14 — Payment Execution** (Finance)
Finance validates final budget alignment against the approved PO, processes payment through the procurement platform, and completes invoice processing.

**Step 15 — Vendor Close-Out** (Vendor)
Vendor issues quote, submits invoice, and confirms payment receipt.

**Step 16 — Systems Support Ticket** (Systems Governance)
*Required if the renewal involves a scope change.* A systems support ticket is submitted specifying users to provision or deprovision. The systems support team executes all access changes in the managed system.

**Step 17 — Clean-Up** (Systems Governance)
*Required if the renewal involves a license reduction (descope).* Users identified in the earlier analysis are deprovisioned by the systems support team. Completion confirmed before documentation is updated.

**Step 18 — Documentation Update & Communication** (Systems Governance)
The contracts source of truth is updated with finalized contract details. Access or scope changes are communicated to relevant stakeholders. All renewal artifacts are filed: Renewal Brief, users analysis sheet, business context document, PO reference.`,
  },
  {
    heading: "Tool Expansion Process",
    body: `**Decision Gate — Can Existing Capacity Accommodate?**

| Outcome | Path |
|---|---|
| **Yes** | Internal route — clean-up and provision without vendor or procurement involvement |
| **No** | Full expansion path — vendor engagement and procurement required |

---

### Internal Route (Existing Capacity Sufficient)

**Step 3A — Users Analysis & Clean-Up Identification** (Systems Governance)
A structured users analysis identifies which inactive or underutilized license holders can be deprovisioned to create capacity for the incoming users.

**Step 3B — Systems Support Ticket** (Systems Governance → Systems Support)
A systems support ticket is submitted specifying: users to deprovision (identified through analysis) and users to provision (new users requiring access). The systems support team executes both actions. Expansion complete — no vendor engagement or procurement required.

---

### Full Expansion Path (Additional Licenses Required)

**Step 3 — Internal Expansion Brief** (Systems Governance)
An expansion brief is created documenting scope, business justification, additional license count, and stakeholder context. Attached to the portal ticket.

**Step 4 — Users Analysis** (Systems Governance)
A users analysis confirms the current utilization picture and validates the license gap — ensuring the expansion scope is accurate before vendor engagement.

**Step 5 — Business Context Documentation Update** (Systems Governance)
The business context document is updated to reflect expanded scope: new use cases, additional user segments, and any changes to how the system will be used post-expansion.

**Step 6 — Budget Validation** (Finance) — Mandatory Gate
The additional license cost estimate is submitted to finance for budget validation. No expansion advances without confirmed budget alignment.

**Step 7 — Expansion Enquiry with Vendor** (Systems Governance)
The vendor is contacted to confirm license availability and establish the basis for pricing negotiation.

**Step 8 — PRO Ticket Review & Approvals** (Procurement)
The procurement team reviews and approves the expansion request before proceeding to negotiation.

**Step 9 — Price Negotiation** (Procurement)
Procurement negotiates pricing for the additional licenses. Current contract terms and the users analysis inform the commercial position.

**Step 10 — Expansion Decision Notice to Vendor** (Systems Governance)
The expansion decision is formally communicated — confirming the additional license count and agreed commercial terms.

**Step 11 — Procurement Process** (Procurement)
Legal review → contract amendment or new agreement signature → PO issuance and approvals → invoice request and forwarding to finance.

**Step 12 — Payment Execution** (Finance)
Finance validates final budget alignment, processes payment, and handles invoice processing.

**Step 13 — Vendor Close-Out** (Vendor)
Vendor issues quote, submits invoice, confirms payment.

**Step 14 — Systems Support Ticket** (Systems Governance → Systems Support)
A systems support ticket is submitted to provision the new users. The systems support team executes provisioning in the managed system.

**Step 15 — Documentation Update & Communication** (Systems Governance)
The contracts source of truth is updated with the revised license count, cost, and any contract amendment details. Relevant stakeholders are informed. All expansion artifacts are filed.`,
  },
  {
    heading: "Supporting Artifacts",
    body: `Every renewal and expansion cycle produces and maintains the following:

| Artifact | Purpose |
|---|---|
| **Renewal / Expansion Brief** | Central document carrying all commercial, operational, and stakeholder context through the cycle |
| **Users Analysis Sheet** | User-level utilization analysis supporting scope and provisioning decisions |
| **Business Context Document** | Qualitative record of the system's purpose, use cases, and strategic fit |
| **Procurement Record (PO link)** | Formal purchasing record linked from the Renewal / Expansion Brief |
| **Portal Ticket** | Central tracking record for the full cycle in the Systems Governance portal |`,
  },
];

export default function WorkflowPage() {
  return (
    <main className="pt-16 bg-warm-sand">
      <article id="case-study" className="bg-warm-sand pt-12 pb-20 md:pt-16 md:pb-28">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 w-full">
          {/* Back link */}
          <Link
            href="/projects/saas-renewal-operations"
            className="inline-block font-body text-[13px] font-medium text-terracotta transition-colors duration-200 hover:text-terracotta-dark mb-6"
          >
            &larr; Back to case study
          </Link>

          {/* Title */}
          <h1 className="font-display font-bold text-[clamp(38px,5.5vw,72px)] uppercase tracking-[-0.03em] text-terracotta -mb-1">
            Workflow
          </h1>
          <p className="font-display font-bold text-[clamp(26px,3.5vw,34px)] tracking-[-0.02em] text-dark mb-4">
            SaaS Renewal & Expansion Documentation
          </p>

          {/* Subtitle */}
          <p className="font-body text-[20px] leading-[1.7] text-charcoal/60 mb-8">
            Function: Technology Operations — Systems Governance | Portfolio: GTM
            SaaS Portfolio | Version: 1.0
          </p>

          {/* Intro */}
          <div className="pb-8 mb-12 border-b border-dark/10">
            <p className="font-body text-[20px] leading-[1.7] text-charcoal">
              Comprehensive process reference for SaaS tool renewals and seat
              expansions — covering initiation through close-out, including
              decision logic and swim lane ownership at every stage. The Systems
              Governance function orchestrates both workflows end-to-end;
              individual steps are owned and executed by the responsible party in
              each swim lane.
            </p>
          </div>

          {/* Content sections */}
          <div className="flex flex-col gap-16 max-w-[900px]">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display font-bold text-[clamp(26px,3.5vw,34px)] tracking-[-0.02em] text-dark mb-6">
                  {section.heading}
                </h2>
                <Markdown content={section.body} />
              </section>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
