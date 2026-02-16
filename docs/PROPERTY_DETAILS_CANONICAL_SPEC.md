# PROPERTY_DETAILS_CANONICAL_SPEC (Draft v1)

Status: ANCHOR baseline created. Pending WP single-property reference for final field parity.

## Objective
Define one canonical Property Details page template for React that can be bound to Core mirror data with minimal refactor later.

## Proposed Route
- Canonical dynamic route: `/property/[slug]`
- Optional canonical ID route fallback: `/properties/[id]` (if needed by Core contracts)

## Section Architecture (UI baseline)
1. Hero (title, location, media gallery, badges)
2. Key Facts (guests, bedrooms, bathrooms, sqm, distance)
3. Pricing Summary (seasonal rates + basic fallback)
4. Amenities (grouped)
5. Availability/Booking CTA
6. Location/Map
7. House Rules & Policies
8. Nearby/Services
9. FAQ / Host notes
10. Related Properties CTA

## Core Binding Strategy
- UI consumes a single `PropertyViewModel`.
- Adapter maps `coreMirror payload -> PropertyViewModel`.
- Missing optional values hide blocks (no empty placeholders).

## Required Field Baseline (for render safety)
- `id`, `slug`, `title`, `location`, `heroMedia[0]`, `basePricing`, `currency`

## Pricing Rules (aligned with Core principles)
- Prefer Seasonal rate if selected dates match active season
- Fallback to Basic rate when no season applies

## Pending Inputs (must be filled after WP reference)
- Final field-by-field WP parity matrix
- Exact ordering/content of sections and labels
- SEO metadata template per property
- CTA placement/priority

## Next Action
Receive WP single-property page reference and finalize this spec with explicit field mapping table.
