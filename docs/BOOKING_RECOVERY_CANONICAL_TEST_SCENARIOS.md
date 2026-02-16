# Booking Recovery — Canonical Test Scenarios

Date: 2026-02-16  
Purpose: Baseline QA scenarios for V1 stabilization + V2 validation.

## Scenario S1 — Exact-intent recovery (same property)
- Input:
  - Start: 08/03/2026
  - End: 21/03/2026
- Expectation:
  - Manual approval state appears.
  - First block is exact-intent alternatives.
  - Exact target nights follow agreed business rule (12 nights for this case).

## Scenario S2 — Large-shift branch
- Input:
  - Requested dates blocked, nearest exact option shift > 7 days.
- Expectation:
  - Show shorter alternatives.
  - Show longer alternatives.
  - Show similar properties block.

## Scenario S3 — Long-stay split trigger
- Input:
  - Request >= 11 nights.
  - Single-property exact fit weak/unavailable.
- Expectation:
  - Show split-stay block.
  - Max 2 properties.
  - Same area logic preserved.

## Scenario S4 — Geo and price guardrails
- Input:
  - Similar properties with mixed distance/price.
- Expectation:
  - Favor within 10km.
  - Avoid > +20% price increase unless no acceptable alternatives.

## Scenario S5 — Seasonal discount policy
- Input A (Low/Mid season, large group >14):
  - Expectation: discount-eligible metadata true (up to 15–20%).
- Input B (High season):
  - Expectation: no-discount-first behavior; rely on combination/gap optimization.

## Scenario S6 — Performance baseline
- Input:
  - Normal page load without opening options panel.
- Expectation:
  - No heavy suggestion compute path.
  - No noticeable refresh lag.

## Scenario S7 — Gap-priority optimization
- Input:
  - Candidate set includes properties with short 3–5 night gaps.
- Expectation:
  - Engine prioritizes combinations that fill those gaps while preserving guest fit.

## Scenario S8 — CRM output format policy
- Input:
  - Unavailable request routed to social vs email.
- Expectation:
  - Social: short factual-friendly output.
  - Email: official structured output + optional discount note.
