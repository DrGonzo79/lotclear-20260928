# Phased build prompts

1. **Paid concierge:** add secure uploads, redaction, document inventory, a reviewer checklist and downloadable decision record for one state.
2. **Rules platform:** add primary-source citations, effective dates, reviewer approval, expiry/fail-closed behavior, rule diffs and audit history. Test every conditional branch.
3. **Document assist:** add malware scanning, OCR/classification with field confidence, human correction and extraction benchmarks. AI never makes the filing decision.
4. **Managed filing:** only after legal review, add one portal adapter with credential isolation, idempotency, submission receipts, rejection states and a kill switch.
5. **Scale:** expand state-by-state after 500 accepted packets; instrument margin per packet and rules-maintenance load.

For every phase: write failing integration tests first; cover nil, empty, stale-rule, duplicate, upstream-error and timeout paths; test keyboard/mobile flows; document rollback; never claim legal completeness or live filing without proof.
