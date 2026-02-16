# CORE_MIRROR_HOTEL_SCHEMA_V1

Status: Draft finalized for mock-mode (pre Core DB integration)
Date: 2026-02-16
Source: Core Create Property (Hotel class) UI screenshots

## Objective
Define a dedicated Hotel schema that supports multi-mode business flows (`short_term_rent`, `monthly_rent`, `sale`) and canonical Hotel details presentation.

---

## 1) Canonical Entity: `CoreMirrorHotelV1`

```ts
type DealType = "short_term_rent" | "monthly_rent" | "sale";
type PropertyClass = "hotel";

type HotelType =
  | "hotel"
  | "resort"
  | "aparthotel"
  | "boutique_hotel"
  | "guesthouse"
  | "bed_breakfast"
  | "hostel"
  | "motel"
  | "lodge"
  | "holiday_park"
  | "ryokan"
  | "riad"
  | "capsule_hotel"
  | "villa"
  | string;

type DateRange = { from: string; to: string }; // YYYY-MM-DD

type CoreMirrorHotelV1 = {
  id: string;
  slug: string;
  status?: "draft" | "approved" | "deactivated" | string;

  reportableSeller: { id: string; name: string; email?: string };
  propertyClass: PropertyClass;
  propertyType: HotelType;
  dealType: DealType[];

  contractTerm?: {
    termId?: string;
    direct?: boolean;
    promo?: boolean;
    agent?: boolean;
  };

  ownerTitle: string;
  briefDescriptionFromOwner?: string;
  commercialTitle?: string;
  headlineEn?: string;
  shortSummaryEn?: string;
  descriptionEn?: string;

  floorspace?: number;
  floorspaceUnit?: string;
  grounds?: number;
  groundsUnit?: string;
  floorsInBuilding?: number;
  floorsOfProperty?: number;
  entrance?: string;

  rentalLicenceType?: string;
  rentalLicenceNumber?: string;
  shortRentRequiredWithFile?: boolean;
  monthlyRentRequiredWithoutFile?: boolean;
  licences?: Array<{ licenceType: string; number: string; fileUrl?: string }>;
  otherLicences?: Array<{ licenceType: string; number: string }>;

  // Present in Hotel flow screenshots
  realEstateDetails?: {
    floorPlanFiles?: string[];
    yearOfConstruction?: number;
    yearOfRenovation?: number;
    kitchenAreaSize?: number;
    kitchenAreaUnit?: string;
    livingRoomAreaSize?: number;
    livingRoomAreaUnit?: string;
    heatingFeatures?: Array<"diesel" | "gas" | "air_conditioner" | "other">;
    additionalFeatures?: string[];
    suitableFor?: string[];
    commonExpensesPerYearEur?: number;
    priceForSaleEur?: number;
    priceForSalePerSqmEur?: number;
    roiPercent?: number;
  };

  location: {
    latitude?: number;
    longitude?: number;
    country: string;
    city: string;
    street: string;
    address?: string;
    apartmentFloorBuilding?: string;
    stateOrRegion: string;
    postalZipCode: string;
    orientation?: string[];
  };

  hotelRoomsLinking?: {
    roomIds?: string[];
    roomCount?: number;
  };

  media: {
    primaryImage: string;
    galleryImages?: string[];
    videoUrl?: string;
    tour3dUrl?: string;
    contentUrls?: Array<{ site: string; contentUrl: string }>;
  };

  amenities?: string[];
  kitchenAmenities?: string[];

  distances?: {
    beachDistanceM?: number;
    infrastructureDistanceKm?: number;
    airportDistanceKm?: number;
    supermarketDistanceKm?: number;
    restaurantDistanceKm?: number;
    marinaDistanceKm?: number;
    policeOfficeDistanceKm?: number;
    medicalOfficeDistanceKm?: number;
    schoolDistanceKm?: number;
    entertainmentFacilityDistanceKm?: number;
  };

  availability?: {
    availableForSale?: boolean;
    availableForRentPeriods?: DateRange[];
    unavailablePeriods?: DateRange[];
  };

  // NOTE: monthly/sale pricing fields observed in this hotel flow;
  // nightly/seasonal pricing not yet confirmed in provided hotel screenshots
  rates?: {
    monthlyRateEur?: number;
    monthlyRatePerSqmEur?: number;
    salePriceEur?: number;
    salePricePerSqmEur?: number;
  };

  extras?: {
    cleaningIncluded?: boolean;
    securityDepositEur?: number;
    taxes?: Array<{ taxType: string; feeBasis?: string; amountEur?: number }>;
    optionalServices?: Array<{
      serviceName: string;
      feeBasis?: string;
      amountEur?: number;
      earliestOrder?: string;
      latestOrder?: string;
      isCustom?: boolean;
    }>;
  };

  bookingRules?: {
    advanceNoticeDays?: number;
    preferredPolicy?: string;
    additionalPolicies?: Array<{ policy: string; ratesIncreasePercent?: number }>;
    bookingComCancellationPolicies?: string[];
  };

  houseRules?: {
    suitableForKids?: "yes" | "no" | "conditional" | string;
    eventsOrPartiesAllowed?: boolean;
    petsAllowed?: boolean;
    wheelchairAccess?: boolean;
    smokingAllowed?: "yes" | "no" | "outside_only" | string;
    cameraPresent?: "yes" | "no" | "disclosed" | string;
    noiseMonitorsPresent?: boolean;
    houseRulesText?: string;
  };

  instructions?: {
    checkInTime?: string;
    checkOutTime?: string;
    checkInContactPerson?: string;
    keyCollectionPoint?: string;
    telephoneNumber?: string;
    instructionsText?: string;
    instructionsAttachmentUrl?: string;
    closestAirports?: string[];
    directionsPrivateText?: string;
  };
};
```

---

## 2) Required vs Optional

### Hard required
- `id`, `slug`
- `reportableSeller.id`, `reportableSeller.name`
- `propertyClass=hotel`
- `propertyType`
- `dealType[]`
- `ownerTitle`
- `location.country`, `location.city`, `location.street`, `location.stateOrRegion`, `location.postalZipCode`
- `media.primaryImage`

### Strongly recommended
- `headlineEn` or `commercialTitle`
- at least one pricing block based on mode:
  - sale mode -> `salePriceEur` (or `priceForSaleEur` in `realEstateDetails`)
  - monthly mode -> `monthlyRateEur`

---

## 3) Canonical UI Mapping (Hotel details)

- Hero: title + summary + media gallery
- Hotel identity: hotel type, classification, deal-mode badges
- Price panel adapts by mode:
  - short-term rent: TBD pending hotel-rate screen
  - monthly rent: monthly rates
  - sale: sale valuation + ROI blocks
- Facilities & distances: same matrix style
- Location + map: full address/coordinates
- Room inventory hook: linked room units (`hotelRoomsLinking`)
- CTA adapts by mode (Book / Monthly inquiry / Investment contact)

---

## 4) Validation / Normalization Rules

1. `dealType[]` must not be empty.
2. If `dealType` includes `sale`, require a sale price source.
3. If `dealType` includes `monthly_rent`, require monthly price source.
4. Coordinates must be valid range when present.
5. Date ranges must satisfy `from <= to`.
6. Slug in kebab-case.

---

## 5) Confirmed by screenshots

Confirmed sections:
- Basic Details (Hotel class + Hotel-specific property type list)
- Contract Term (with direct/promo/agent toggles)
- Real estate details block available in Hotel flow
- Location
- Hotel Rooms linking section exists
- Media
- Description
- Facilities
- Distances
- Availability (for sale + rent periods + blocked periods)
- Extras (cleaning, deposit, taxes, optional services)
- Booking rules (advance notice, preferred/additional cancellation policy, Booking.com overrides)
- House rules (kids/events/pets/smoking/camera/noise monitors + rich-text rules)
- Instructions (check-in/out, contact, key collection, phone, airports, private directions)

---

## 6) Pending for V1.1 closure

Need Hotel-specific screenshots for:
- Basic rates / seasonal rates (if enabled for short-term hotel mode)
- Synchronisation

Need separate Hotel Room flow to finalize child schema and parent-child canonical binding.
