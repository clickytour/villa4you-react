# SEARCH_ROLLOUT_PLAN_V2

Status: Unified rollout plan including **existing** search-result functionality across the site.

## Implementation status (updated 2026-02-17)

### Completed (excluding Core live integration)
- ✅ Canonical global route `/search` is live and included in sitemap/header links.
- ✅ Existing touchpoints wired to unified query contract:
  - Destinations
  - Explore Map
  - Blog
  - Support
  - Quick Request
- ✅ URL-state contract active on `/search` (`q`, `vertical`, `mode`, `location`).
- ✅ Hybrid history behavior implemented:
  - `pushState` for major changes (vertical/mode/chip, Enter submit)
  - `replaceState` for typing refinements
- ✅ Canonical metadata hardening completed for key property mode routes.
- ✅ QA route index (`/all-pages`) now includes dedicated `/search` deep-link entries.

### Pending (non-Core)
- ⏳ Final documentation pass for analytics/event naming conventions (if required).

### Pending (Core integration track)
- ⏳ Switch search source from mirror simulation to Core-backed mirror/API adapter.

## 1) Existing search/result touchpoints (inventory)

| Touchpoint | Current route/component | Status | Decision |
|---|---|---|---|
| Guest search results page | `/search-results-page-for-guests` + `SearchResultsGuestSections` | Exists (now mirror-simulation ready) | **Keep + upgrade to canonical search experience** |
| Destinations search | `DestinationsSections` | Exists | **Keep UI, connect to shared query/filter contract** |
| Explore map search | `ExploreMapSections` | Exists | **Keep UI, connect to shared query/filter contract** |
| Services index search/filter | `/services` + `ServicesIndexSections` | Exists | **Keep + map to unified search model** |
| Blog search | `/blog` components | Exists | **Keep + map to unified search model** |
| Support FAQ search | `SupportSections`, `GuestHelpFaqSections` | Exists | **Keep local FAQ search (not index-wide), add optional handoff to global search** |
| Quick Request filtering | `QuickRequestPanel` | Exists | **Keep as assisted-intent capture, map categories to search taxonomy** |
| Header search entry | `SiteHeader` currently links to Search Results | Partial | **Upgrade to global `/search` entrypoint** |

---

## 2) Unified search architecture (target)

### Canonical entrypoints
1. `/search` (new global entry)
2. `/search-results-page-for-guests` (guest-focused results UX)
3. Existing vertical pages (`/services`, `/blog`, `/explore-map`, `/destinations`) using same query contract

### Shared query/filter contract
- `q` (intent query)
- `vertical` (`all|stays|services|blog`)
- `mode` (`all|vacation|sale|monthly`)
- `location`
- optional vertical filters:
  - stays: guests/bedrooms/budget/amenities
  - services: category/subcategory/coverageKm/bookingType
  - blog: category/dateRange/topic

### Shared data/ranking layer
- Use mirror simulation now (`src/lib/searchSimulation.ts`)
- Switch to Core adapters later without UI rewrite
- Ranking baseline:
  1) intent score
  2) mode relevance
  3) geo relevance
  4) trust/conversion signals

---

## 3) Keep / Refactor / Merge actions

## A. Keep (no UX break)
- Keep existing page layouts for destinations/map/services/blog/support
- Keep existing quick-request journey

## B. Refactor (shared logic)
- Move all page-specific filtering to shared utility functions
- Standardize URL params so all entrypoints can deep-link into same result state
- Standardize card metadata fields across verticals

## C. Merge (experience cohesion)
- Header search -> `/search` as primary global search
- “Open map search” and destination search actions should pass same query params
- Service/blog local searches should optionally expose “expand to global search” CTA

---

## 4) Implementation phases

### P0 (foundation)
1. Introduce `/search` page shell with shared query contract
2. Keep `/search-results-page-for-guests` as powered-by shared search layer
3. Wire `/services` and `/blog` to shared params

### P1 (cross-site consistency)
4. Wire `/destinations` and `/explore-map` to shared contract
5. Add reusable `SearchResultCard` variants (stay/service/blog)
6. Add canonical + metadata templates for high-intent routes

### P2 (optimization)
7. Add analytics for search-to-conversion path
8. Add intent-aware ranking refinements (SLA, freshness, coverage fit)
9. Add A/B blocks for CTA and sort strategy

---

## 5) SEO/UX/Marketing acceptance criteria

### SEO
- No duplicate canonical conflicts
- Indexable high-intent result pages
- Internal linking between search -> detail -> related results

### UX
- Same filters mean same behavior across touchpoints
- Predictable mode handling (`vacation/sale/monthly`)
- Fast refinement loop (no dead-end pages)

### Marketing
- Results cards include clear conversion anchors (price/trust/coverage/cta)
- Assisted conversion path from blog/service results to property inquiry
- Track top queries and drop-off points

---

## 6) Mirror-to-Core transition rule

- UI components remain stable.
- Only source adapter changes:
  - now: mirror simulation
  - later: Core API payload via adapters
- This minimizes rework and de-risks integration.
