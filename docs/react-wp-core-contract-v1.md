# React WP/Core Integration Contract v1

Status: Draft implementation baseline (React-owned)
Date: 2026-02-13
Linked Jira: https://villa4youclub.atlassian.net/browse/WP-29

## Scope
This contract defines how the React app normalizes incoming WP/Core property payloads for stable rendering.

## Implemented in code
- `src/lib/propertyNormalizer.ts`
- Main entry: `normalizeWpProperty(payload)`

## Covered now
1. Stable ID extraction (`core_id`, `resource_id`)
2. Numeric coercion for mixed string/number fields
3. Location normalization (`country/region/city/lat/lng`)
4. Metrics normalization (bedrooms, bathrooms, guests, floorspace)
5. Pricing normalization (`price`, `common_expences`, `cleaning_coust`)
6. Media normalization (`featured_image_url`, `gallery[].url`)
7. JSON-string parsing for:
   - `capacity_json`
   - `highligts`
8. Status normalization into `active|inactive|unknown|custom`
9. Warning capture for known non-canonical names

## Known naming inconsistencies to resolve with WP/Core
- `cleaning_coust` (expected likely `cleaning_cost`)
- `common_expences` (expected likely `common_expenses`)
- `highligts` (expected likely `highlights`)
- `ground_units` vs `grounds_units`

## Contract policy (temporary until Core confirms)
- Input values may arrive as string/number/null.
- Numeric parser converts `"12"`, `"12.4"`, `"12,4"` into number.
- Invalid numeric values become `null` (never throw in UI path).
- JSON-string parse failures become empty objects.

## Required final decisions (blockers before freeze)
1. Canonical field names (typo aliases: keep or migrate)
2. Precedence rule for repeated updates of same `core_id/resource_id`
3. Unit policy for distance/area fields
4. Null/default policy for optional fields

## Next implementation step
- Add fixture tests using payload variants a/b/c and assert deterministic normalized output.
