# CORE_SERVICES_CORE_TO_MIRROR_MAPPING_V1

Status: **V1 Freeze Mapping (Core Screens -> Mirror -> UI)**

## Scope

Maps Service fields from Core UI screens to local Core-mirror schema and current UI surfaces.

- Core screen source: Service Edit/Create tabs (Basic details, Location & Service Area, Media, Pricing & Booking, Platform & Subscription, Synchronization)
- Mirror model: `src/lib/coreMirrorServicesMock.ts`
- UI surfaces: `/services`, `/services/[slug]`, related cards on property pages

## Mapping Table

| Core screen field | Mirror key | UI location | Required in mirror |
|---|---|---|---|
| Business / Service Name | `basicDetails.businessName` | `/services`, `/services/[slug]` | Yes |
| Business Legal Name | `basicDetails.legalName` | `/services/[slug]` (data layer ready) | Optional |
| Owner / Manager Name | `basicDetails.ownerManagerName` | `/services/[slug]` (data layer ready) | Optional |
| Category | `basicDetails.categoryId` | `/services`, `/services/[slug]`, taxonomy explorer | Yes |
| Subcategory | `basicDetails.subcategoryId` | `/services`, `/services/[slug]`, taxonomy explorer | Yes |
| Short Description | `basicDetails.shortDescription` | `/services`, `/services/[slug]` | Yes |
| Full Description | `basicDetails.fullDescription` | `/services/[slug]` | Yes |
| Key Highlights / Selling Points | `basicDetails.highlights[]` | `/services/[slug]` | Optional |
| Languages Supported | `basicDetails.languagesSupported[]` | data layer ready | Optional |
| Price Description | `basicDetails.priceDescription` | data layer ready | Optional |
| Email | `basicDetails.email` | data layer ready | Yes |
| Phone Number | `basicDetails.phone` | data layer ready | Yes |
| Preferred Contact Method | `basicDetails.preferredContactMethod` | data layer ready | Optional |
| Website URL | `basicDetails.websiteUrl` | data layer ready | Optional |
| Social Media Links | `basicDetails.socialMediaLinks[]` | data layer ready | Optional |
| Latitude | `locationServiceArea.lat` | data layer ready | Optional |
| Longitude | `locationServiceArea.lng` | data layer ready | Optional |
| Country | `locationServiceArea.country` | data layer ready | Yes |
| City | `locationServiceArea.city` | `/services`, `/services/[slug]` | Yes |
| Street | `locationServiceArea.street` | data layer ready | Optional |
| State / Region | `locationServiceArea.stateRegion` | data layer ready | Optional |
| Address | `locationServiceArea.address` | data layer ready | Optional |
| Apartment/Floor/Building | `locationServiceArea.apartmentFloorBuilding` | data layer ready | Optional |
| Postal / Zip | `locationServiceArea.postalZipCode` | data layer ready | Optional |
| Service Area Coverage (km) | `locationServiceArea.serviceAreaCoverageKm` | `/services/[slug]`, property service cards | Optional |
| Primary Photo | `media.primaryPhoto` | `/services`, `/services/[slug]` | Yes |
| Gallery Photos | `media.galleryPhotos[]` | data layer ready | Optional |
| Promo Video URL | `media.promoVideoUrl` | data layer ready | Optional |
| Logo | `media.logo` | data layer ready | Optional |
| Booking Type | `pricingBooking.bookingType` | `/services/[slug]` | Optional |
| External Booking Link | `pricingBooking.externalBookingLink` | `/services/[slug]` | Optional |
| Pricing Description | `pricingBooking.pricingDescription` | `/services/[slug]` | Optional |
| Price row - Title | `pricingBooking.priceList[].title` | `/services/[slug]` pricing table | Yes (per row) |
| Price row - Price Model | `pricingBooking.priceList[].priceModel` | `/services/[slug]` pricing table | Yes (per row) |
| Price row - Guest Price (Gross) | `pricingBooking.priceList[].guestPriceGross` | `/services/[slug]` pricing table | Optional |
| Price row - Agent Price (Net) | `pricingBooking.priceList[].agentPriceNet` | `/services/[slug]` pricing table | Optional |
| Price row - Commissionable | `pricingBooking.priceList[].commissionable` | `/services/[slug]` pricing table | Optional |
| Price row - Photo | `pricingBooking.priceList[].photo` | `/services/[slug]` pricing table | Optional |
| Subscription Plan | `platformSubscription.subscriptionPlan` | `/services/[slug]` | Optional |
| Audience Target | `platformSubscription.audienceTarget[]` | `/services/[slug]` | Yes |
| Synchronization status | `synchronization.status` | `/services/[slug]` | Optional |
| Synchronization sites | `synchronization.sitesAvailable` | `/services/[slug]` | Optional |
| Synchronization note | `synchronization.note` | `/services/[slug]` | Optional |

## Enum locks (V1)

- `pricingBooking.bookingType`: `external_booking_link | instant_booking | request_to_book`
- `pricingBooking.priceList[].priceModel`: `package | per_hour | per_person | per_service | quote`
- `platformSubscription.subscriptionPlan`: `free | standard | premium`
- `platformSubscription.audienceTarget[]`: `guests | agents | property_owners`

## Integration note

When real Core payload is available, only adapter/key alignment should change. UI blocks are already present for V1 fields.
