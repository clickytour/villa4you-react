# SEARCH_RESULTS_STRATEGY_V1

Status: Ready-solution blueprint with mirror-DB simulation (pre Core API integration)

## Goal

Define where search-result functionality should exist across the site and how it should work for UX/SEO/Marketing, using mirror data now and Core API later.

## Search entry points (where)

1. Global header search (all pages)
2. Dedicated search results page (`/search-results-page-for-guests`)
3. Context search blocks on:
   - Destinations
   - Explore Map
   - Services index
   - Blog index
4. Cross-entity related modules on detail pages (property, service, blog)

## Vertical model (what)

Unified search should support these verticals:
- Stays (vacation/real-estate/hotel/hotel-room, mode-aware)
- Services
- Blog

## Mode model

For property-related search, mode is mandatory ranking context:
- `vacation`
- `sale`
- `monthly`

## Recommended filter set (V1)

### Core filters
- Query intent (free text)
- Vertical (all/stays/services/blog)
- Mode (all/vacation/sale/monthly)
- Location

### Extended filters (next)
- Price range (nightly/monthly/sale)
- Guests / bedrooms / bathrooms (stays)
- Amenities
- Distance to beach/infrastructure
- Service area coverage km (services)
- Category/subcategory (services)
- Publish date / category (blog)

## Ranking parameters (suggested)

Beyond UI/UX/SEO/marketing baseline, include these relevance parameters:

1. Intent match score (query in title/description/tags)
2. Mode relevance score (mode exact match > generic)
3. Geo relevance (location + coverage fit)
4. Availability confidence (for booking-capable entities)
5. Commercial priority score (if business rules require)
6. Content freshness (blog/services updates)
7. Trust score (rating/reviews/profile completeness)
8. Conversion propensity (historical CTR -> inquiry/booking)
9. Response SLA score (services with faster response first)
10. SEO intent depth (landing suitability for long-tail queries)

## SEO architecture

1. Keep crawlable, indexable high-intent result routes
2. Avoid duplicate canonical conflicts between base and mode routes
3. Build static metadata templates by vertical + mode + location
4. Add structured data per card type (stay/service/blog)
5. Add internal links from detail pages to intent-relevant result sets

## Marketing architecture

1. Result cards should include conversion hints:
   - price anchor
   - trust/quality signal
   - intent-specific CTA
2. Include educational block under results (decision support)
3. Track assisted conversion from blog/service result clicks to property inquiries

## Mirror-DB simulation implementation (current)

- `src/lib/searchSimulation.ts`
  - builds unified search records from mirror entities
  - applies filtering and lightweight relevance sorting
- `src/components/SearchResultsGuestSections.tsx`
  - interactive simulation UI for unified results

## Integration switch plan

- Keep simulation as fallback while Core API stabilizes
- Replace source with adapter-driven Core payload once available
- Preserve same UI contract to avoid rework
