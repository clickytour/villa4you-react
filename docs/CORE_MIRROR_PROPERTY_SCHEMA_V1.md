# CORE_MIRROR_PROPERTY_SCHEMA_V1 (Draft)

Status: ANCHOR baseline created. Finalization pending WP reference + Core contract details.

## Objective
Define local mirror structure for property presentation page before direct Core integration.

## Proposed Entities
- `property_core`
- `property_media`
- `property_rates`
- `property_amenities`
- `property_policies`
- `property_location`
- `property_services`

## Minimal Shape (conceptual)
```ts
PropertyCore {
  id: string;
  slug: string;
  title: string;
  type?: string;
  status?: string;
  guests?: number;
  bedrooms?: number;
  bathrooms?: number;
  areaSqm?: number;
  summary?: string;
}

PropertyRate {
  propertyId: string;
  mode: 'seasonal' | 'basic';
  seasonId?: string;
  fromDate?: string;
  toDate?: string;
  amount: number;
  currency: string;
  minStay?: number;
}
```

## ViewModel Adapter Contract
`toPropertyViewModel(mirrorData) => PropertyViewModel`

Responsibilities:
- normalize naming/types
- apply rate precedence (seasonal -> basic fallback)
- deliver UI-safe defaults
- expose visibility flags for optional sections

## Validation Rules (initial)
- Hard fail if missing: `id`, `slug`, `title`, `currency`
- Soft hide optional sections with no values
- Enforce `from <= to` where range pairs exist

## Pending Inputs
- Core enum dictionary for property types/statuses
- Real payload samples from Core
- WP reference mapping (field parity)
- Media standards (primary image, gallery order)

## Next Action
After WP reference arrives: convert this draft into exact schema table with required/optional/default/indexed fields.
