# CORE_MIRROR_SERVICES_SCHEMA_V1

This document mirrors Core `Create Services` screens into a typed mock schema until final canonical Core payload is delivered.

## Covered Core tabs

1. Basic details
2. Location & Service Area
3. Media
4. Pricing & Booking
5. Platform & Subscription
6. Highlights / Synchronization (minimal placeholders)

## Mirror model

`src/lib/coreMirrorServicesMock.ts`

### Root
- `slug`
- `basicDetails`
- `locationServiceArea`
- `media`
- `pricingBooking`
- `platformSubscription`
- `synchronization`
- `relatedPropertySlug`
- `relatedBlogSlug`

### basicDetails
- `businessName`
- `legalName`
- `ownerManagerName`
- `categoryId`
- `subcategoryId`
- `shortDescription`
- `fullDescription`
- `highlights[]`
- `languagesSupported[]`
- `priceDescription`
- `email`
- `phone`
- `preferredContactMethod`
- `websiteUrl`
- `socialMediaLinks[]`

### locationServiceArea
- `lat`
- `lng`
- `country`
- `city`
- `street`
- `stateRegion`
- `address`
- `apartmentFloorBuilding`
- `postalZipCode`
- `serviceAreaCoverageKm`

### media
- `primaryPhoto`
- `galleryPhotos[]`
- `promoVideoUrl`
- `logo`

### pricingBooking
- `bookingType`
- `priceList[]` items:
  - `title`
  - `priceModel` (`package | per_hour | per_person | per_service | quote`)
  - `guestPriceGross`
  - `agentPriceNet`
  - `commissionable`
  - `photo`

### platformSubscription
- `subscriptionPlan`
- `audienceTarget[]` (`guests | agents | property_owners`)

## Current UI usage

- Services index page:
  - category/subcategory
  - primary image
  - short description
  - location city
- Service detail page:
  - short + full description
  - highlights
  - coverage km
  - booking type + number of price items
  - taxonomy explorer
  - related property/blog links

## Pending for final Core contract

- Replace mock structure with exact API payload key names once Core canonical contract is approved.
- Add full UI rendering for:
  - detailed price list table
  - audience badges
  - all location fields
  - synchronization statuses.
