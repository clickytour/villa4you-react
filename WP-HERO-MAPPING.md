# WP Hero Mapping (React v2 → WordPress)

## Section structure

1. **Hero wrapper** (`.v4y-hero`)
2. **Left column** (`.v4y-hero-main`)
   - trust line
   - H1
   - paragraph
   - chips row
   - CTA row
   - mini search row
   - trust badges
3. **Right column card** (`.v4y-quick-request`)
   - title/subtitle
   - 8 fields (2-column desktop, 1-column mobile)
   - Next button

## Breakpoints

- Mobile: `max-width: 767px`
- Tablet: `768px–1023px`
- Desktop: `1024px+`

## Critical sizing

- Container max width: `1280px`
- Hero radius: `24px`
- Card radius: `20px`
- Inputs: `50–52px` height
- CTA buttons: `56px` height
- H1 size: `62/72/78px` (m/t/d)

## WP implementation notes

- If using Gutenberg:
  - Group block for wrapper
  - Columns block (66/34 desktop)
  - Buttons block for 2 CTAs
  - Form plugin shortcode for request card
- If using Elementor:
  - Section with two containers
  - Left: heading + text + buttons + form row
  - Right: form widget inside bordered container

## CSS class map

- `.v4y-hero`
- `.v4y-hero-main`
- `.v4y-chip`
- `.v4y-cta-primary`
- `.v4y-cta-secondary`
- `.v4y-inline-search`
- `.v4y-quick-request`
- `.v4y-input`

## UX flow rule

On mobile, keep **copy + CTAs visible first**, then form. Avoid duplicate CTA labels between sticky bottom bar and hero body.
