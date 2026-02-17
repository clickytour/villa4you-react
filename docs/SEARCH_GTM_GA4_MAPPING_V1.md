# SEARCH_GTM_GA4_MAPPING_V1

Status: Ready for GTM/GA4 configuration
Date: 2026-02-17
Scope: Unified search tracking events (`search_*`) from `window.dataLayer`

## 1) DataLayer events available

Current events pushed by app:
- `search_page_view`
- `search_handoff_click`
- `search_result_click`

Common payload fields:
- `search_source` (`mirror_simulation`)
- `query`
- `vertical`
- `mode`
- `location`
- `results_count`
- `source_page`

Event-specific payload fields:
- `search_page_view`: `landing_url`
- `search_handoff_click`: `handoff_surface`, `target_url`
- `search_result_click`: `result_id`, `result_vertical`, `result_mode`, `position`, `target_href`

## 2) GTM setup (recommended)

### Triggers
Create 3 Custom Event triggers:
1. Trigger name: `CE - search_page_view`
   - Event name: `search_page_view`
2. Trigger name: `CE - search_handoff_click`
   - Event name: `search_handoff_click`
3. Trigger name: `CE - search_result_click`
   - Event name: `search_result_click`

### Variables
Create Data Layer Variables for all fields used in GA4 params:
- `dlv_query` -> `query`
- `dlv_vertical` -> `vertical`
- `dlv_mode` -> `mode`
- `dlv_location` -> `location`
- `dlv_results_count` -> `results_count`
- `dlv_source_page` -> `source_page`
- `dlv_search_source` -> `search_source`
- `dlv_landing_url` -> `landing_url`
- `dlv_handoff_surface` -> `handoff_surface`
- `dlv_target_url` -> `target_url`
- `dlv_result_id` -> `result_id`
- `dlv_result_vertical` -> `result_vertical`
- `dlv_result_mode` -> `result_mode`
- `dlv_position` -> `position`
- `dlv_target_href` -> `target_href`

## 3) GA4 event tags

Create GA4 Event tags:

### Tag A: `GA4 - search_page_view`
- Event name: `search_page_view`
- Trigger: `CE - search_page_view`
- Event params:
  - `query` = `{{dlv_query}}`
  - `vertical` = `{{dlv_vertical}}`
  - `mode` = `{{dlv_mode}}`
  - `location` = `{{dlv_location}}`
  - `results_count` = `{{dlv_results_count}}`
  - `source_page` = `{{dlv_source_page}}`
  - `search_source` = `{{dlv_search_source}}`
  - `landing_url` = `{{dlv_landing_url}}`

### Tag B: `GA4 - search_handoff_click`
- Event name: `search_handoff_click`
- Trigger: `CE - search_handoff_click`
- Event params:
  - all common params above
  - `handoff_surface` = `{{dlv_handoff_surface}}`
  - `target_url` = `{{dlv_target_url}}`

### Tag C: `GA4 - search_result_click`
- Event name: `search_result_click`
- Trigger: `CE - search_result_click`
- Event params:
  - all common params above
  - `result_id` = `{{dlv_result_id}}`
  - `result_vertical` = `{{dlv_result_vertical}}`
  - `result_mode` = `{{dlv_result_mode}}`
  - `position` = `{{dlv_position}}`
  - `target_href` = `{{dlv_target_href}}`

## 4) GA4 custom dimensions (register)

Register event-scoped custom dimensions for:
- `vertical`
- `mode`
- `location`
- `source_page`
- `search_source`
- `handoff_surface`
- `result_id`
- `result_vertical`
- `result_mode`
- `position`

## 5) Validation checklist

1. Open GTM Preview and staging site.
2. Trigger each event flow:
   - visit `/search` -> expect `search_page_view`
   - click any handoff CTA from blog/support/destinations/map -> expect `search_handoff_click`
   - click `Open result` in `/search` -> expect `search_result_click`
3. Confirm event params populated in GTM event panel.
4. Confirm events appear in GA4 DebugView.
5. Confirm custom dimensions populate after GA processing delay.

## 6) Notes

- Current `search_source` must remain `mirror_simulation` until Core rollout.
- On Core switch, only change payload value to `core_index` (keep event names stable).
