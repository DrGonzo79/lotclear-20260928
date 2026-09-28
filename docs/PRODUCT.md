# Product plan

## ICP and job

**ICP:** title clerk or office manager at a 10–75-car independent used dealership processing 40–200 retail transactions/month across multiple states. **JTBD:** “Before I submit a deal jacket, tell me exactly what is missing under the current state workflow so funding and resale are not delayed by a preventable reject.”

## MVP

1. Select jurisdiction and deal facts.
2. Inventory received documents.
3. Evaluate a versioned, human-reviewed ruleset including conditional requirements.
4. Return an evidence-linked blocker list and route a complete packet to human approval.

The prototype implements steps 1–3 over shared fictional fixtures and a tested FastAPI endpoint. It performs no OCR, filing or legal analysis.

## Data model

- `Dealer(id, legal_name, jurisdictions, volume_band)`
- `Deal(id, dealer_id, vin, buyer_ref, lien_status, funding_hold)`
- `Document(id, deal_id, type, hash, received_at, extraction_confidence)`
- `RuleVersion(id, jurisdiction, effective_from, reviewed_at, source_url)`
- `Requirement(rule_id, document_type, condition, evidence)`
- `PacketAudit(id, deal_id, rule_version_id, status, missing_items, reviewer_id)`

## Architecture and AI strategy

Next.js hosts the clerk workflow and static demo. FastAPI owns validation and deterministic rule evaluation. Production adds encrypted object storage, Postgres, background OCR and an approval queue. AI may classify documents and extract fields, but deterministic rules and a human own the filing decision. Low confidence must fail closed.

## Economics

Test $49/$79/$99 per title, matching the source’s suggested range. At 100 packets/month, $79 produces $7,900 revenue per dealer. A same-day human-review model can support attractive margin only if exception handling averages under 10 minutes; rules maintenance, insurance and regulated labor are the largest costs. A subscription can follow after repeat volume is proven.

## Validation and GTM

- Founder-led outreach to 30 independent-dealer office managers through state dealer associations and title-service referrals.
- Sell 20 same-day preflights before building portal integrations.
- Gate: two paying dealers, ≥30 packets, first-pass acceptance improvement, median review <10 minutes, and at least one prevented reject worth more than the fee.
- Land with per-title preflight; expand into aging dashboards, managed filing and multi-location controls.

## Moat

The UI and OCR are commodities. Defensibility comes from versioned jurisdiction rules, observed rejection outcomes, dealer-specific exception history, portal operating knowledge and trusted reviewer operations.

## Risks

- Stale rules → effective dates, primary-source citation, scheduled review and fail-closed expiry.
- Unlicensed practice/filing → counsel by state and credentialed humans; sell preflight first.
- Sensitive PII → minimize, encrypt, isolate and delete.
- Portal fragmentation → begin with customer-owned packet exports.
- False readiness → human approval, evidence, audit trail and professional liability coverage.

## 30 / 60 / 90 days

- **30:** observe ten packet builds, sell 30 preflights, catalog top rejection causes in one state.
- **60:** rules authoring, secure uploads, reviewer console and acceptance feedback for three states.
- **90:** five paying dealers, 500 audited packets, one approved portal integration, decide whether to scale managed filing or remain preflight software.
