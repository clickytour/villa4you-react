# Quick Request QA Checklist (Staging)

## Scope
- Homepage Quick Request panel only (`/` on staging)
- Role flows:
  - Guest (Travel & Rentals) -> 2 steps
  - Guest (Tours & Activities) -> 3 steps
  - Guest (Real Estate Buyer / Renter) -> 3 steps

## A) Global UX Checks
- [ ] Step indicator shows correct total per role (2 or 3)
- [ ] Back/Next buttons work on each step (no dead state)
- [ ] No repeated fields across steps
- [ ] Button labels and text alignment are clean on mobile/desktop
- [ ] Validation messages are visible and clear

## B) Travel & Rentals (2-step)
### Step 1
- [ ] Required: Check-in, Check-out, Destination, Adults, Email, Phone
- [ ] Layout: Destination (left) + Adults (right)

### Step 2
- [ ] Required: Bedrooms, Distance to beach, Distance to infrastructure
- [ ] Budget From: prefilled 100, cannot go below 100
- [ ] Budget To: prefilled 150, cannot go below max(150, From+50)
- [ ] If Budget From changes, Budget To auto-adjusts to at least +50
- [ ] Required: First Name, Last Name, Country, Consent
- [ ] Turnstile placeholder visible only on final submit step

## C) Tours & Activities (3-step)
### Step 1 (Intent)
- [ ] Required: Destination, Service Category, Date & Time, Adults, Email, Phone
- [ ] Category list uses service-apply taxonomy

### Step 2 (Service details)
- [ ] No repeated Step-1 destination field
- [ ] Subcategory depends on selected category
- [ ] Pickup / Dropoff / Preferred time window present
- [ ] Optional total budget present

### Step 3 (Identity & submit)
- [ ] Required: First Name, Last Name, Country, Consent
- [ ] No duplicated fields from Step 1/2

## D) Real Estate (3-step)
### Step 1 (Intent)
- [ ] Required: Mode, Type, Regions, Email, Phone

### Step 2 (Property criteria)
- [ ] Property type multi-select works
- [ ] Bedrooms/min-max sqm/features/timeframe/legal support present
- [ ] Budget From/To logic valid (From <= To)

### Step 3 (Identity & submit)
- [ ] Required: First Name, Last Name, Country, Consent
- [ ] No duplicated fields from previous steps

## E) Submission/Technical
- [ ] Honeypot hidden and active
- [ ] Payload contains role, step1/step2/step3 objects
- [ ] Submit success and fail messages behave correctly

## F) SEO/Marketing/Copy Sanity
- [ ] Role-specific title/subtitle matches role intent
- [ ] Consent text matches role context
- [ ] No placeholder/debug text visible to end users (except explicit Turnstile placeholder until integration)

## Next Implementation Queue (after Claude integration)
1. Cloudflare Turnstile real client+server verification
2. xverify email validation integration (API details pending)
3. Phone verification provider selection (free-tier shortlist + recommendation)
