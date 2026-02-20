# Villa4you — Header & Footer Structure Audit

**Date:** 2026-02-19  
**Site:** staging.villa4you.gr  
**Pages audited:** 13 (/, /for-guests, /for-owners, /collaborate, /support, /about, /search, /free-evaluation, /contact, /blog, /terms, /privacy, /cookies)

---

## 1. Complete Menu Map

### 1.1 Header — Top Bar (Logo Row)

| Element | Type | Notes |
|---------|------|-------|
| **Villa4you React** | Logo/link → `/` | Text logo, no image. Says "React" — should be just "Villa4you" in production |
| **Evaluate Your Property ▾** | CTA dropdown (dark bg) | Desktop only, right-aligned |

#### "Evaluate Your Property" Dropdown Children

| Label | Link |
|-------|------|
| List Property / Free Evaluation | `/free-evaluation` |
| Apply as PMC | `/pmc-apply` |
| List Your Service | `/service-apply` |
| Join as Agent | `/agents-apply` |

### 1.2 Header — Desktop Navigation Bar (`<nav aria-label="Primary">`)

| Nav Item | Type | Children |
|----------|------|----------|
| **Home** | Link → `/` | — |
| **For Guests ▾** | Dropdown | See below |
| **Destinations ▾** | Dropdown | See below |
| **For Owners ▾** | Dropdown | See below |
| **Collaborate ▾** | Dropdown | See below |
| **Support ▾** | Dropdown | See below |
| **Blog** | Link → `/blog` | — |
| **About** | Link → `/about` | — |

#### For Guests Dropdown

| Label | Link |
|-------|------|
| For Guests Hub | `/for-guests` |
| Search | `/search` |
| Guest Search Results | `/search-results-page-for-guests` |
| Explore Map | `/explore-map` |
| Guest Help FAQ | `/guest-help-faq` |
| Plans & Offers | `/plans-offers` |
| Testimonials | `/testimonials` |

#### Destinations Dropdown

| Label | Link |
|-------|------|
| Destinations Hub | `/destinations` |
| **— Halkidiki (section header)** | — |
| Luxury Suites Elsa | `/luxury-suites-elsa` |
| Galini Beachfront Masonettes | `/galini-beachfront-masonettes-complex` |
| Olea Suites Apartments | `/olea-suites-apartments-complex` |
| Deluxe Suites Bomo | `/deluxe-suites-bomo` |
| Simonitiko Beachfront Villas | `/simonitiko-beachfront-villas-complex` |
| Tripotsmos Beachfront Complex A | `/tripotsmos-beachfront-complex-a` |
| Tripotamos Beachfront Villas Complex B | `/tripotamos-beachfront-villas-complex-b` |
| Afitos Kassandra Halkidiki | `/afitos-kassandra-halkidiki` |
| Sani Club Private Villas | `/complexes-sani-club-private-villas` |
| **— Myconos (section header)** | — (no children) |
| *Crete (coming soon)* | — (disabled/grey text) |

#### For Owners Dropdown

| Label | Link |
|-------|------|
| For Owners Hub | `/for-owners` |
| Vacation Property Management | `/vacation-property-management` |
| Free Evaluation | `/free-evaluation` |

#### Collaborate Dropdown

| Label | Link | Badge |
|-------|------|-------|
| Collaborate Hub | `/collaborate` | — |
| Partner PMC | `/partner-pmc` | — |
| PMC Apply | `/pmc-apply` | **Draft** |
| Service Providers | `/partner-service-providers` | — |
| Service Apply | `/service-apply` | **Draft** |
| Agents | `/agents` | — |
| Agents Apply | `/agents-apply` | **Draft** |

#### Support Dropdown

| Label | Link |
|-------|------|
| Support Hub | `/support` |
| Contact | `/contact` |

### 1.3 Mobile Menu (hamburger `<details>`)

Identical nav items to desktop, wrapped in a collapsible panel. Includes the "Evaluate Your Property" dropdown at the top, followed by Home, For Guests, Destinations, For Owners, Collaborate, Support, Blog, About.

### 1.4 Footer

| Row | Label | Link |
|-----|-------|------|
| Copyright | © 2026 Villa4you / ClickyTour | — |
| **Row 1** | Support | `/support` |
| | Guest Help FAQ | `/guest-help-faq` |
| | Plans & Offers | `/plans-offers` |
| | Blog | `/blog` |
| **Row 2** | Privacy Policy | `/privacy-policy` ⚠️ |
| | Terms of Service | `/terms` |

---

## 2. Link Validation

All header and footer links tested with HTTP HEAD requests against `staging.villa4you.gr`.

| Link | Status | Notes |
|------|--------|-------|
| `/` | ✅ 200 | |
| `/for-guests` | ✅ 200 | |
| `/search` | ✅ 200 | |
| `/search-results-page-for-guests` | ✅ 200 | |
| `/explore-map` | ✅ 200 | |
| `/guest-help-faq` | ✅ 200 | |
| `/plans-offers` | ✅ 200 | |
| `/testimonials` | ✅ 200 | |
| `/destinations` | ✅ 200 | |
| `/luxury-suites-elsa` | ✅ 200 | |
| `/galini-beachfront-masonettes-complex` | ✅ 200 | |
| `/olea-suites-apartments-complex` | ✅ 200 | |
| `/deluxe-suites-bomo` | ✅ 200 | |
| `/simonitiko-beachfront-villas-complex` | ✅ 200 | |
| `/tripotsmos-beachfront-complex-a` | ✅ 200 | |
| `/tripotamos-beachfront-villas-complex-b` | ✅ 200 | |
| `/afitos-kassandra-halkidiki` | ✅ 200 | |
| `/complexes-sani-club-private-villas` | ✅ 200 | |
| `/for-owners` | ✅ 200 | |
| `/vacation-property-management` | ✅ 200 | |
| `/free-evaluation` | ✅ 200 | |
| `/collaborate` | ✅ 200 | |
| `/partner-pmc` | ✅ 200 | |
| `/pmc-apply` | ✅ 200 | |
| `/partner-service-providers` | ✅ 200 | |
| `/service-apply` | ✅ 200 | |
| `/agents` | ✅ 200 | |
| `/agents-apply` | ✅ 200 | |
| `/support` | ✅ 200 | |
| `/contact` | ✅ 200 | |
| `/blog` | ✅ 200 | |
| `/about` | ✅ 200 | |
| `/terms` | ✅ 200 | |
| `/privacy` | ✅ 200 | |
| `/cookies` | ✅ 200 | |
| **`/privacy-policy`** | **⚠️ 308** | **Footer links here but it 308 redirects (and fails). Actual page is `/privacy`.** |

### Dead / Broken Links

| Link | Location | Issue |
|------|----------|-------|
| `/privacy-policy` | Footer → "Privacy Policy" | **308 Permanent Redirect — broken redirect loop or missing target.** Should link to `/privacy` instead. |

---

## 3. Consistency Check

### 3.1 Header Consistency

✅ **Header HTML is byte-identical across all 13 pages tested.** (SHA256 hash: `C3-25-5A-0C...` on every page)

### 3.2 Footer Consistency

✅ **Footer HTML is byte-identical across all 13 pages tested.** (SHA256 hash: `F6-86-1F-02...` on every page)

### 3.3 Naming Inconsistencies

| Context | Label Used | Notes |
|---------|-----------|-------|
| Header nav | "For Guests" | Dropdown summary text |
| Header dropdown child | "For Guests Hub" | Link label inside dropdown |
| Header nav | "For Owners" | Dropdown summary text |
| Header dropdown child | "For Owners Hub" | Link label inside dropdown |
| Header nav | "Collaborate" | Dropdown summary text |
| Header dropdown child | "Collaborate Hub" | Link label inside dropdown |
| Header nav | "Support" | Dropdown summary text |
| Header dropdown child | "Support Hub" | Link label inside dropdown |
| Destinations dropdown | "Tripotsmos" vs "Tripotamos" | **Typo:** `/tripotsmos-beachfront-complex-a` (label: "Tripotsmos") vs `/tripotamos-beachfront-villas-complex-b` (label: "Tripotamos") — inconsistent spelling |
| Destinations dropdown | "Myconos" | **Typo:** Should be "Mykonos" (standard English spelling) |
| Footer | "Privacy Policy" → `/privacy-policy` | Page actually lives at `/privacy` |
| Logo | "Villa4you React" | Should drop "React" for production |

---

## 4. Issues & Recommendations

### 🔴 Critical Issues

| # | Issue | Location | Fix |
|---|-------|----------|-----|
| 1 | **Footer "Privacy Policy" links to `/privacy-policy` (308 redirect, broken)**  | Footer | Change href to `/privacy` |
| 2 | **Logo says "Villa4you React"** — exposes tech stack to users | Header | Change to "Villa4you" |

### 🟡 Moderate Issues

| # | Issue | Location | Fix |
|---|-------|----------|-----|
| 3 | **"Draft" badge pages publicly accessible** — `/pmc-apply`, `/service-apply`, `/agents-apply` all marked "Draft" in nav but fully accessible | Collaborate dropdown | Either remove from nav until ready, or remove Draft badges if ready |
| 4 | **Typo: "Tripotsmos"** should be "Tripotamos" (matches the -b variant slug) | Destinations dropdown | Fix label and slug: `/tripotsmos-beachfront-complex-a` → `/tripotamos-beachfront-complex-a` |
| 5 | **Typo: "Myconos"** should be "Mykonos" | Destinations dropdown header | Fix spelling |
| 6 | **"Galini Beachfront Masonettes"** — should be "Maisonettes" | Destinations dropdown | Fix spelling in slug and label |
| 7 | **Footer missing `/cookies` link** — Cookie Policy page exists but isn't linked from footer | Footer | Add "Cookie Policy" link next to Privacy/Terms |
| 8 | **Footer missing `/contact` link** — Contact page exists but only reachable via Support dropdown | Footer | Add "Contact" to footer |
| 9 | **Footer missing `/about` link** | Footer | Add "About" to footer |
| 10 | **Copyright symbol broken** — shows "c 2026" instead of "© 2026" | Footer | Use `©` or `\u00A9` |

### 🟢 Recommendations

| # | Recommendation | Details |
|---|---------------|---------|
| 11 | **Simplify Destinations dropdown** — listing 9 individual properties in the main nav is overwhelming | Group by region with a "View all" link; move individual properties to destination pages |
| 12 | **Add `aria-expanded` to dropdown triggers** — currently using `<details>/<summary>` which has limited screen reader support for menus | Consider `<button>` with `aria-expanded` + `aria-haspopup="menu"` for proper a11y |
| 13 | **Missing `<nav>` landmark for footer** | Wrap footer links in `<nav aria-label="Footer">` for accessibility |
| 14 | **No skip-to-content link** | Add a visually hidden "Skip to main content" link as first focusable element |
| 15 | **Duplicate `<main>` tags** — the HTML has `<main>` nested inside another `<main>` | Fix: only one `<main>` per page (HTML spec requirement) |
| 16 | **"Guest Search Results" in nav** — this feels like an internal/technical page, not a user-facing nav item | Consider removing from nav; users reach it naturally via search |
| 17 | **"Explore Map" page** — linked in nav but may not be content-ready | Verify content exists or remove until ready |
| 18 | **Missing `og:image`** — no Open Graph image meta tag | Add a default OG image for social sharing |
| 19 | **Homepage subtitle mentions internal tools** — "Book via Planyo, manage in Kommo, powered by ClickyTour Core" is internal language | Rewrite for guest-facing copy |

### Summary

- **36 unique links** in header navigation
- **6 links** in footer
- **1 broken link** (`/privacy-policy` → 308)
- **Header/footer 100% consistent** across all pages
- **3 spelling errors** (Tripotsmos, Myconos, Masonettes)
- **1 invalid HTML** (nested `<main>` elements)
- **3 draft pages** publicly linked with "Draft" badge
