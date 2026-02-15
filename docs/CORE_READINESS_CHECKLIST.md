# Core Readiness Checklist

_Last updated: 2026-02-15 (Europe/Athens)_

## Objective
Track what is confirmed vs missing for safe Forms/WP -> Core integration planning.

## Status Legend
- ✅ Done (confirmed)
- 🟡 Partial / draft
- ⛔ Missing (blocking)

## A) Confirmed Foundations

| Item | Status | Source | Notes |
|---|---:|---|---|
| Core test/prod domain roadmap | ✅ | Eugene | Test now `test.villa4you.club`; planned move to `test.clickytour.com`; target prod `clickytour.club`. |
| Core scope definition | ✅ | Eugene | Properties, Services, Blog posts, Job Seeker. |
| Core role model | ✅ | Eugene | Owners/service owners/PMC/agents/accountants; guest `User` tracked as consumer without Core auth. |
| Forms -> Core intake principle | ✅ | Eugene | Forms send minimal starter (~10%) for draft creation. |
| Core process ownership | ✅ | Eugene | Forms are intake path only; business process owned by Core. |
| Rates model principle | ✅ | Eugene | Seasonal rates in Seasons; Basic rates fallback outside seasons. |

## B) Contracts & Data (Needed for implementation)

| Item | Status | Owner | Priority | Blocker Impact |
|---|---:|---|---:|---|
| Canonical DB schema map (entities, fields, types, required) | ⛔ | Core team / Eugene | P0 | Cannot finalize payload contracts safely. |
| Relationship map (property/service/user links) | ⛔ | Core team | P0 | Risky assumptions in mapping and validation. |
| Enumerations dictionary (ids/labels/stability) | ⛔ | Core team | P0 | UI selects/radios cannot be locked. |
| Payload samples (create/update/read) per module | ⛔ | Core team | P0 | No contract-level QA possible. |
| Error model (validation, auth, rate-limit, conflict) | ⛔ | Core team | P1 | Cannot design resilient retries/UX errors. |
| API auth/versioning strategy | ⛔ | Core team | P1 | Integration wiring blocked. |

## C) Form Logic & Mapping (Needed for parity)

| Item | Status | Owner | Priority | Blocker Impact |
|---|---:|---|---:|---|
| WP/Form -> Core field mapping matrix | ⛔ | WP + Core | P0 | Cannot ensure semantic parity. |
| Filter/sort mapping rules | ⛔ | WP + Core | P1 | Search/list behavior parity blocked. |
| Edit-form dependency rules (radio/select show/hide/required) | ⛔ | Core team | P0 | Cannot reproduce business logic correctly. |
| Tab/section structure + save sequencing | ⛔ | Core team | P1 | Risk of invalid update order. |
| Draft -> published lifecycle transitions | 🟡 | Core team | P1 | Partially known, not contract-ready. |

## D) Integration Readiness Gate

Proceed from design/mock to API connection only when all are available:
1. DB schema map + enum dictionary
2. Payload samples for key flows
3. Dependency/mapping/filter rules
4. Auth/version/error handling details

## E) Immediate Next Actions

1. Keep collecting confirmations from Eugene and mark checklist rows from ⛔ -> ✅.
2. For each confirmed item, create a mini "Accepted Contract Note" (date/source/decision/risk).
3. Once P0 rows are green, prepare implementation-ready contract package for dev execution.
