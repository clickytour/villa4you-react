# Booking Recovery — Implementation Tickets (Execution Queue)

Owner: Aigrammatea  
Status: Draft for immediate execution  
Date: 2026-02-16

## Lane A — V1 Stabilization (now)

### BR-101 — Exact-intent night calculation lock
- Goal: Ensure exact-length suggestions use user intent range consistently.
- Scope:
  - Centralize requested-night intent function.
  - Remove conflicting ad-hoc calculations.
- Acceptance:
  - Scenario 08/03 -> 21/03 yields exact option targeting 12 nights (per agreed business rule).

### BR-102 — Suggestion panel compute guard
- Goal: Avoid heavy recomputation outside manual-approval + expanded options state.
- Scope:
  - Keep deferred compute behavior.
  - Add memo guard tests.
- Acceptance:
  - No visible lag during normal page load/refresh.

### BR-103 — Staging deployment consistency check
- Goal: Prevent stale build confusion during QA.
- Scope:
  - Add a lightweight build marker/version line in UI or console for QA verification.
- Acceptance:
  - QA can verify active commit/build quickly.

---

## Lane B — V2 Engine Foundation

### BR-201 — Extract bookingRecoveryEngine module
- Goal: Move fallback logic out of UI component.
- Scope:
  - Create `src/lib/bookingRecoveryEngine.ts`.
  - Export pure functions for:
    - exact options,
    - shorter/longer options,
    - split-stay candidate generation.
- Acceptance:
  - UI consumes engine outputs only.

### BR-202 — Central config + thresholds
- Goal: Keep all business constants in one place.
- Scope:
  - Create config object for:
    - LONG_STAY_NIGHTS=11,
    - LARGE_SHIFT_DAYS=7,
    - MAX_PRICE_DELTA=20,
    - GEO_RADIUS_KM=10,
    - MAX_SPLIT_PROPERTIES=2.
- Acceptance:
  - No hardcoded thresholds scattered in component code.

### BR-203 — Unit tests for date/intent/split logic
- Goal: Eliminate off-by-one and split bugs.
- Scope:
  - Add tests for 6 canonical scenarios.
- Acceptance:
  - All scenario tests green in CI/local.

---

## Lane C — V2 Scoring & Portfolio Optimization

### BR-301 — Candidate scoring model
- Goal: Rank alternatives by conversion relevance.
- Scope:
  - Implement weighted scoring with business priorities.
- Acceptance:
  - Top suggestions align with policy constraints and expected order.

### BR-302 — Gap-priority weighting
- Goal: Prefer low-booked inventory and 3–5 night gap filling.
- Scope:
  - Add reservation-pressure signal + gap-fit boost.
- Acceptance:
  - Engine boosts gap-filling combinations where feasible.

### BR-303 — Seasonal discount decision helper
- Goal: Apply low/mid discount strategy while preserving high-season no-discount-first policy.
- Scope:
  - Add helper that flags discount eligibility in recommendation metadata.
- Acceptance:
  - Recommendations include correct discount policy flags.

---

## Lane D — CRM Messaging Templates

### BR-401 — Social short factual-friendly templates
- Goal: Quick channel response for FB/Instagram.
- Scope:
  - Add short templates for unavailable-date recovery and split-stay proposals.

### BR-402 — Email official templates
- Goal: Official message style with optional discount note.
- Scope:
  - Add structured email templates with optional policy-based discount paragraph.

---

## Recommended execution order (start now)
1. BR-101
2. BR-102
3. BR-103
4. BR-201
5. BR-202
6. BR-203
7. BR-301
8. BR-302
9. BR-303
10. BR-401
11. BR-402
