# CORE_DEALTYPE_RULES_V1

Date: 2026-02-16
Source: Drcris clarification

## Canonical deal-type matrix

- **Vacation Property**
  - allowed: `short_term_rent`, `sale`
  - not allowed: `monthly_rent`

- **Real Estate Property**
  - allowed: `short_term_rent`, `monthly_rent`, `sale`

- **Hotel**
  - allowed: `short_term_rent`, `monthly_rent`, `sale`

- **Hotel Room**
  - allowed: `short_term_rent`, `monthly_rent`, `sale`
  - should inherit defaults from parent hotel unless explicitly overridden

## Implementation note

When UI/adapters validate payloads, enforce allowed `dealType` per entity to avoid cross-type mode leaks.
