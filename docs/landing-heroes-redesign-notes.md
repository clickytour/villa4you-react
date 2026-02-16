# Landing Heroes Redesign Notes

## Scope completed
Redesigned hero prototypes were created for:
1. `/for-guests/`
2. `/for-owners/`
3. `/collaborate/`
4. `/about/`
5. `/search-results-page-for-guests/`
6. `/vacation-property-management/`

A route index page (`/`) was also added for quick navigation during review.

## What changed
- Built a reusable light-style hero component (`src/components/LandingHero.tsx`) to keep visual consistency.
- Added page-specific content configuration (`src/lib/landingHeroes.ts`) with improved headline/subheadline copy.
- Replaced the old **Quick Request** form panel with a contextual **scheme/diagram-style guidance block** on each page.
- Added relevant, high-quality background hero imagery per page to support each audience intent.
- Preserved original page intent (guests, owners, collaborate, about, search UX, property management) while improving clarity and conversion messaging.

## Why these improvements
- **UX clarity:** clearer hierarchy and more focused CTAs reduce decision friction.
- **Marketing impact:** stronger value propositions and proof cues (trust chips, outcomes) improve perceived credibility.
- **SEO/copy quality:** audience-specific keywords and intent-focused phrasing better match landing-page search behavior.
- **Template consistency:** one shared system ensures maintainability and easier iteration across more landing pages.

## Notes
- Implemented as dedicated routes through dynamic routing (`src/app/[slug]/page.tsx`) backed by typed config.
- This setup allows quick copy/image testing without reworking layout structure.
