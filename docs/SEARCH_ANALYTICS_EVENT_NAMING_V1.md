# SEARCH_ANALYTICS_EVENT_NAMING_V1

Status: Draft-ready baseline (non-Core, mirror-search phase)
Date: 2026-02-17

## 1) Naming convention

Use snake_case and stable prefixes:
- `search_*` for unified search events
- `search_result_*` for result-card interactions
- `search_handoff_*` for cross-page handoff into `/search`

Rules:
- Event names are immutable once published.
- Keep parameters consistent across events.
- Avoid page-specific custom keys when a shared key exists.

## 2) Required common parameters

Attach to every search event:
- `query` (string)
- `vertical` (`all|stays|services|blog`)
- `mode` (`all|vacation|sale|monthly`)
- `location` (string, optional)
- `results_count` (number, when available)
- `source_page` (e.g. `destinations`, `explore_map`, `blog`, `support`, `search`)
- `search_source` (`mirror_simulation` for current phase)
- `session_id` (analytics session)

## 3) Event catalog (V1)

### A. Search lifecycle
1. `search_page_view`
- Trigger: `/search` page loads
- Params: common + `landing_url`

2. `search_filters_changed`
- Trigger: vertical/mode/location filter change
- Params: common + `changed_filter` (`vertical|mode|location`)

3. `search_query_submitted`
- Trigger: Enter in query/location inputs
- Params: common + `submit_surface` (`query_input|location_input`)

4. `search_results_rendered`
- Trigger: results list rendered after state update
- Params: common + `render_latency_ms` (if measurable)

### B. Result interactions
5. `search_result_impression`
- Trigger: result card enters viewport (optional if observer exists)
- Params: common + `result_id`, `result_vertical`, `result_mode`, `position`

6. `search_result_click`
- Trigger: user clicks "Open result"
- Params: common + `result_id`, `result_vertical`, `result_mode`, `position`, `target_href`

### C. Cross-page handoff events
7. `search_handoff_click`
- Trigger: CTA on non-search pages navigating to `/search`
- Params: common + `handoff_surface` (e.g. `destinations_card_check_dates`, `blog_read`, `support_card`), `target_url`

## 4) Recommended funnel views

Primary funnel:
1) `search_page_view`
2) `search_filters_changed` / `search_query_submitted`
3) `search_results_rendered`
4) `search_result_click`
5) downstream conversion event (booking/inquiry/service lead)

Cross-page assist funnel:
1) `search_handoff_click`
2) `search_page_view`
3) `search_result_click`
4) downstream conversion

## 5) Current-phase notes

- Current search source is mirror simulation; set `search_source=mirror_simulation`.
- On Core rollout, keep event names unchanged; only switch `search_source` value (e.g. `core_index`).

## 6) Minimal implementation order

1. Implement `search_page_view`
2. Implement `search_handoff_click`
3. Implement `search_result_click`
4. Add `search_filters_changed` and `search_query_submitted`
5. Optional: add `search_result_impression`
