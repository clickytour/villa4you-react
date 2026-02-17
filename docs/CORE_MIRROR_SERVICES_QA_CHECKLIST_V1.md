# CORE_MIRROR_SERVICES_QA_CHECKLIST_V1

## URLs
- Services index: `/services`
- Service detail sample 1: `/services/airport-transfer-halkidiki`
- Service detail sample 2: `/services/private-chef-villa-service`

## Pricing & Booking
- [x] Booking type label visible and mapped correctly
- [x] External booking link appears only when provided
- [x] Pricing description appears when provided
- [x] Price table renders columns: photo/title/model/guest gross/agent net/commissionable
- [x] Price model labels map correctly (package/per hour/per person/per service/quote)

## Platform & Subscription
- [x] Plan badge/label shown (`free/standard/premium`)
- [x] Audience chips shown and readable

## Synchronization
- [x] Synchronization section visible
- [x] Status shown
- [x] Sites available shown
- [x] Note shown when provided

## Taxonomy consistency
- [x] Category/subcategory chips match taxonomy source
- [x] `service-apply` and `quick-request` use taxonomy from `src/lib/serviceTaxonomy.ts`

## Related links
- [x] Related property link opens expected page
- [x] Related blog link opens expected page

## Property pages relevance checks
- [x] Hotel mode pages show mode-filtered services/blog cards
- [x] Hotel-room mode pages show mode-filtered services/blog cards
- [x] Real-estate mode pages show mode-filtered services/blog cards
- [x] Vacation page shows services/blog cards from mirror source

## Freeze note

Validated on staging after deploy alias update to latest preview.
