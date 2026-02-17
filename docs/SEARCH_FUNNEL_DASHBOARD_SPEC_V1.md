# SEARCH_FUNNEL_DASHBOARD_SPEC_V1

Status: Analytics dashboard specification (non-Core phase)
Date: 2026-02-17

## 1) Objective

Provide a clear funnel view for search discovery -> engagement -> conversion handoff, split by intent and surface.

Primary question this dashboard answers:
- Which search intents/surfaces produce the highest downstream conversion quality?

## 2) Funnel definition

### Funnel A: On-search interaction funnel
1. `search_page_view`
2. `search_result_click`
3. downstream conversion event (booking/inquiry/lead submit)

### Funnel B: Cross-page assisted funnel
1. `search_handoff_click`
2. `search_page_view`
3. `search_result_click`
4. downstream conversion event

## 3) Required events

Implemented now:
- `search_page_view`
- `search_handoff_click`
- `search_result_click`

Expected downstream events (existing or to be mapped):
- `booking_initiated` or equivalent
- `inquiry_submitted` or equivalent
- `quick_request_submitted` or equivalent

## 4) Core dimensions (segment keys)

Required dimensions:
- `vertical` (`all|stays|services|blog`)
- `mode` (`all|vacation|sale|monthly`)
- `source_page`
- `search_source` (`mirror_simulation` now, `core_index` later)
- `handoff_surface`
- `result_vertical`
- `result_mode`

Optional dimensions:
- `location`
- `query` (bucketed/grouped to avoid high-cardinality issues)
- `position` (result rank)

## 5) KPI set

Primary KPIs:
- Search sessions (count of `search_page_view`)
- Handoff-to-search rate = `search_page_view after handoff / search_handoff_click`
- Result CTR = `search_result_click / search_page_view`
- Assisted conversion rate = `conversion after search_result_click / search_result_click`

Secondary KPIs:
- Avg result position clicked
- Top handoff surfaces by click volume
- Top vertical/mode combinations by conversion efficiency
- Zero-result session rate (requires `results_count` from `search_page_view`)

## 6) Recommended dashboard sections

### Section A: Executive summary (7/30 days)
- Search sessions
- Result CTR
- Assisted conversion rate
- Top converting vertical

### Section B: Funnel visualization
- Funnel A and Funnel B side-by-side
- Drop-off % between each stage

### Section C: Surface performance table
Columns:
- `handoff_surface`
- handoff clicks
- landed search sessions
- result clicks
- assisted conversions
- assisted conversion rate

### Section D: Intent segmentation
Breakdowns by:
- vertical
- mode
- source_page
- result_vertical

### Section E: Quality diagnostics
- Zero-result sessions trend
- Click position distribution
- Query bucket performance

## 7) Attribution window (recommended)

For assisted conversion linking:
- Session-scoped by default
- Fallback: 24h click window if session continuity unavailable

## 8) Data quality checks

Weekly checks:
1. Event volume stability by event name
2. Missing required params rate (<2%)
3. `search_source` consistency
4. Duplicate event spike detection

## 9) Non-Core vs Core transition

No dashboard schema change required.
On Core cutover:
- keep same event names
- switch `search_source` value (`mirror_simulation` -> `core_index`)
- compare KPI deltas before/after cutover

## 10) Delivery checklist

- [ ] GTM triggers/tags published
- [ ] GA4 custom dimensions registered
- [ ] Funnel exploration/report created
- [ ] Surface performance table created
- [ ] Baseline snapshot exported (pre-Core)
