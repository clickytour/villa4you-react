# CORE_MIRROR_SERVICES_QA_CHECKLIST_V1

## URLs
- Services index: `/services`
- Service detail sample 1: `/services/airport-transfer-halkidiki`
- Service detail sample 2: `/services/private-chef-villa-service`

## Pricing & Booking
- [ ] Booking type label visible and mapped correctly
- [ ] External booking link appears only when provided
- [ ] Pricing description appears when provided
- [ ] Price table renders columns: photo/title/model/guest gross/agent net/commissionable
- [ ] Price model labels map correctly (package/per hour/per person/per service/quote)

## Platform & Subscription
- [ ] Plan badge/label shown (`free/standard/premium`)
- [ ] Audience chips shown and readable

## Synchronization
- [ ] Synchronization section visible
- [ ] Status shown
- [ ] Sites available shown
- [ ] Note shown when provided

## Taxonomy consistency
- [ ] Category/subcategory chips match taxonomy source
- [ ] `service-apply` and `quick-request` use taxonomy from `src/lib/serviceTaxonomy.ts`

## Related links
- [ ] Related property link opens expected page
- [ ] Related blog link opens expected page

## Property pages relevance checks
- [ ] Hotel mode pages show mode-filtered services/blog cards
- [ ] Hotel-room mode pages show mode-filtered services/blog cards
- [ ] Real-estate mode pages show mode-filtered services/blog cards
- [ ] Vacation page shows services/blog cards from mirror source
