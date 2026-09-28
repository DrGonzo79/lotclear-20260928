# CEO Review

Status: DONE_WITH_CONCERNS · Mode: SCOPE REDUCTION

## Nuclear challenge and alternatives

The grand “AI title service” hides the hard part: licensed operations, changing state rules and liability. The outcome is a clean packet that releases cash. The concierge preflight, rules-backed desk and full filing network were compared in `OFFICE_HOURS.md`; this prototype proves the rules-backed decision surface while keeping filing and legal judgment out. Current state → paper checklist and DMV callbacks → cited preflight → 12-month ideal of a human-supervised multi-state operations network.

## 1. Architecture
One deterministic packet-audit boundary consumes versioned requirements and returns missing items. Static client parity exists only for the Pages demo. Production must separate rule authoring, document extraction, human review and portal submission.

## 2. Error and rescue map
422 covers malformed IDs, unsupported states, empty/duplicate/unknown documents; 404 names a missing deal. Future OCR low confidence, unreadable upload, stale rule, portal outage, rejected credential and duplicate submission each need distinct states and user remediation.

## 3. Security and threat model
Deal jackets contain identity, VIN, address, finance and signature data. Require encryption, tenant isolation, malware scanning, least-privilege access, redaction-safe logs, retention/deletion controls and an immutable reviewer trail. The demo contains fictional records only.

## 4. Data flow and interaction edges
Deal/state/documents → validation → versioned rule selection → conditional requirements → missing-item diff → readiness result. Nil/empty/wrong type stop before compute; changing inputs clears stale output; repeated clicks disable during work; clipboard denial is visible.

## 5. Code quality
Shared fixtures keep behavior inspectable. Client and backend duplication is acceptable only for a serverless demonstration; production should generate a client from the API schema and centralize versioned rules.

## 6. Tests
Python covers success, missing item, unknown deal, invalid payload and duplicate documents. Playwright covers the hold-to-ready workflow, rule inspection, deal change, copy, validation and mobile overflow. Stale-rule, OCR and idempotent-submission tests are deferred.

## 7. Observability
Measure packets audited, first-pass acceptance, time-to-ready, missing-item frequency, rule age, manual overrides and downstream rejection reason. Alert on any expired rule, acceptance-rate drop, portal errors and unreviewed high-risk override.

## 8. Database and state
No database in the prototype. Production needs immutable rule versions, jurisdiction/effective-date indexes, packet versioning, document hashes, reviewer decisions and idempotent submission keys. Never silently overwrite a decision.

## 9. API contract
`POST /packet-audit` is typed and bounded. Before external clients add `/v1`, rule-version metadata, request IDs, structured error codes, rate limits and an explicit human-approval resource.

## 10. Performance and scale
Fixture scans are trivial. At 10× cache compiled rules and queue OCR. At 100× partition by tenant/jurisdiction, isolate portal workers and preserve per-state backpressure.

## 11. Design and UX
The hierarchy exposes held cash, packet contents, rule detail, decision and exact next action. Empty/loading/error states, focus styles and responsive layouts are present. Production must show rule citations/effective dates and reviewer identity before users can trust it.

## Decisions

- **Strongest challenges:** unverified demand, stale-rule liability and regulated filing operations.
- **Accepted:** state selection, packet checklist, deterministic preflight, exact blocker, rule detail and tested API.
- **Deferred:** OCR, live DMV/DMS connectors, human reviewer console, filing, payments and rejection chasing.
- **Not in scope:** legal advice, autonomous filing, paid APIs, live backend hosting or claims of current state-law completeness.
