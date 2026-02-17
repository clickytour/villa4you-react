# SEARCH_TRACKING_QA_V1

Environment: `https://staging.villa4you.gr`

## Covered events
- `search_page_view`
- `search_handoff_click`
- `search_result_click`

## Quick manual test flow

1. Open `/search`.
2. In browser console, run:
```js
window.dataLayer?.filter((e) => String(e.event || "").startsWith("search_"))
```
Expect at least one `search_page_view`.

3. Open `/blog` and click `Open in global search` or any `Read` CTA.
4. Run same console command and verify `search_handoff_click` entries.

5. On `/search`, click `Open result` on any card.
6. Run same console command and verify `search_result_click` entries.

## Expected key payload fields

All events should include:
- `search_source` (`mirror_simulation`)
- `vertical`
- `source_page`

Event-specific checks:
- `search_page_view`: has `landing_url`
- `search_handoff_click`: has `handoff_surface`, `target_url`
- `search_result_click`: has `result_id`, `position`, `target_href`

## Notes
- Events are pushed to `window.dataLayer` only; GTM/GA mapping is downstream.
- Current phase is mirror-search tracking baseline (non-Core).
