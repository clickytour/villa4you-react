# SEARCH_QA_REPORT_P0_2026-02-17

Environment: `https://staging.villa4you.gr`

Scope: P0/P0.2 verification excluding Core live integration.

## 1) Search deep-link checks

| URL | Expected | Result |
|---|---|---|
| `/search` | Search UI loads | PASS |
| `/search?vertical=stays&mode=vacation` | Stays + vacation preselected | PASS |
| `/search?vertical=blog` | Blog preselected | PASS |
| `/search?vertical=services&q=concierge` | Services intent filtering | PASS |
| `/search?vertical=all&q=support` | Global search support intent | PASS |

## 2) Canonical checks

### Search canonical
- `/search` and query variants render canonical as `/search`.
- Result: PASS

### Property mode canonical checks
- `/property/hotel/.../(vacation|sale|monthly)` → canonical matches exact route
- `/property/hotel-room/.../(vacation|sale|monthly)` → canonical matches exact route
- `/property/real-estate/.../(vacation|sale|monthly)` → canonical matches exact route
- Result: PASS

## 3) Touchpoint wiring checks

- Destinations CTAs route into `/search` with query contract.
- Explore Map CTAs route into `/search` with query contract.
- Blog CTAs route into `/search` with blog/search intent.
- Support cards and actions route into `/search` handoff.
- Quick Request includes global search handoff.
- Result: PASS

## 4) URL-state and history behavior

Implemented policy:
- `pushState` for major intent changes (vertical/mode/chips/Enter submit)
- `replaceState` for typing refinements

Expected UX:
- Shareable URL at every meaningful state.
- Back/Forward navigates meaningful search states without per-keystroke noise.

Result: PASS

## 5) Current limitations (known, accepted)

- Search source is mirror simulation (no live Core query yet).
- Services have switchable data-source path, but unified search remains mirror-mode until integration approval.

## 6) Conclusion

P0 + P0.2 search rollout is functionally complete and QA-passed on staging for non-Core scope.
