# CORE_MIRROR_PROPERTY_SCHEMA_V1

Status: Finalized for mock-mode implementation (pre Core DB integration)
Date: 2026-02-16
Source: Core Create Property UI screenshots shared by Drcris

## Objective
Define a stable local mirror schema for canonical property pages (rental + real-estate ready), aligned with current Core field structure, so UI can be built now and mapped with low rework later.

---

## 1) Canonical Entity: `CoreMirrorPropertyV1`

```ts
type DealType = "short_term_rent" | "monthly_rent" | "sale";

type PropertyClass =
  | "residential"
  | "commercial"
  | "land"
  | "hotel"
  | "hotel_room"
  | "other";

type PropertyType =
  | "villa"
  | "house"
  | "flat"
  | "maisonette"
  | "detached_house"
  | "apartment"
  | "studio"
  | "bungalow"
  | "loft"
  | "building"
  | "complex"
  | "farm"
  | "boat"
  | string;

type Weekday = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

type DateRange = {
  from: string; // YYYY-MM-DD
  to: string;   // YYYY-MM-DD
};

type LicenceRecord = {
  licenceType: string;
  number: string;
  fileUrl?: string;
};

type SeasonRate = {
  seasonType: "season" | "custom";
  seasonId?: string;
  seasonLabel?: string;
  basicNightNetEur?: number;
  basicNightGrossEur?: number;
  basicNightGrossOtaEur?: number;
  weekendNightNetEur?: number;
  weekendNightGrossEur?: number;
  weekendNightGrossOtaEur?: number;
  minStayNights?: number;
  maxStayNights?: number;
  checkInDays?: Weekday[];
  checkOutDays?: Weekday[];
  discountEnabled?: boolean;
};

export type CoreMirrorPropertyV1 = {
  // identity
  id: string;
  slug: string;
  status?: "draft" | "approved" | "deactivated" | string;

  // ownership / class
  reportableSeller: { id: string; name: string; email?: string };
  propertyClass: PropertyClass;
  propertyType: PropertyType;
  dealType: DealType[];

  // titles / descriptions
  ownerTitle: string;
  briefDescriptionFromOwner?: string;
  commercialTitle?: string;
  headlineEn?: string;
  shortSummaryEn?: string;
  descriptionEn?: string; // rich text/html

  // dimensions
  floorspace?: number;
  floorspaceUnit?: string;
  grounds?: number;
  groundsUnit?: string;
  floorsInBuilding?: number;
  floorsOfProperty?: number;
  entrance?: string;

  // licensing
  rentalLicenceType?: string;
  rentalLicenceNumber?: string;
  shortTermRequiredWithFile?: boolean;
  licences?: LicenceRecord[];
  otherLicences?: Array<{ licenceType: string; number: string }>;

  // location
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
    orientation?: Array<"east" | "north" | "west" | "south">;
  };

  // rooms
  rooms: {
    bedroomsCount?: number;
    bathroomsCount?: number;
    kitchensCount?: number;
    otherRooms?: string[];
  };

  // media
  media: {
    primaryImage: string;
    galleryImages?: string[];
    videoUrl?: string;
    tour3dUrl?: string;
    contentUrls?: Array<{ site: string; contentUrl: string }>;
  };

  // facilities / highlights
  amenities?: string[];
  kitchenAmenities?: string[];
  destinationHighlights?: string[];

  // distances
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

  // availability
  availability?: {
    availableForRentPeriods?: DateRange[];
    unavailablePeriods?: DateRange[];
  };

  // rates
  rates?: {
    currency: "EUR" | string;
    basicNightNet?: number;
    weekendNightNet?: number;
    maxGuests?: number;
    minStayNights?: number;
    maxStayNights?: number;
    checkInDays?: Weekday[];
    checkOutDays?: Weekday[];
    seasonalRates?: SeasonRate[];
  };

  // booking rules
  bookingRules?: {
    advanceNoticeDays?: number;
    preferredCancellationPolicy?: string;
    bookingComCancellationPolicies?: string[];
  };

  // optional local view helpers (not Core-native)
  relatedPropertySlugs?: string[];
  relatedServiceSlugs?: string[];
  relatedBlogSlugs?: string[];
};
```

---

## 2) Required vs Optional (V1)

### Hard required (must exist for page render)
- `id`
- `slug`
- `reportableSeller.id`
- `reportableSeller.name`
- `propertyClass`
- `propertyType`
- `dealType[]` (at least 1)
- `ownerTitle`
- `location.country`
- `location.city`
- `location.street`
- `location.stateOrRegion`
- `location.postalZipCode`
- `media.primaryImage`

### Soft required (recommended for conversion)
- `headlineEn` or `commercialTitle`
- `shortSummaryEn`
- `rooms.bedroomsCount`
- `rooms.bathroomsCount`
- `rates.currency`
- `rates.minStayNights` (for rental)
- `rates.maxGuests` (for rental)

### Optional
Everything else (hide section if empty).

---

## 3) UI Mapping (Core -> Canonical Details)

- **Hero title**: `headlineEn || commercialTitle || ownerTitle`
- **Subtitle**: `shortSummaryEn || briefDescriptionFromOwner`
- **Primary gallery**: `media.primaryImage + media.galleryImages[]`
- **Video/Tour tabs**: `media.videoUrl`, `media.tour3dUrl`
- **Location block + map**: `location.*`, `latitude/longitude`
- **Specs chips**: bedrooms, bathrooms, kitchens, floorspace, propertyType
- **Amenities section**: `amenities[]`, `kitchenAmenities[]`
- **Distances section**: `distances.*`
- **Highlights tags**: `destinationHighlights[]`
- **Availability widget**: `availability.availableForRentPeriods[]`, `unavailablePeriods[]`
- **Pricing panel**: `rates.basicNightNet`, `weekendNightNet`, `seasonalRates[]`
- **Booking constraints**: `minStayNights`, `maxStayNights`, `checkInDays[]`, `checkOutDays[]`
- **Compliance/License**: `rentalLicenceType`, `rentalLicenceNumber`, `licences[]`

---

## 4) Normalization Rules (for mock adapter)

1. **Slug normalization**: lowercase kebab-case.
2. **Units normalization**:
   - beach: meters
   - all other distances: kilometers
3. **Deal mode flags**:
   - rental mode if `dealType` contains `short_term_rent` or `monthly_rent`
   - sale mode if `dealType` contains `sale`
4. **Pricing fallback**:
   - show seasonal price when matching season exists
   - fallback to basic rate
5. **Section visibility**:
   - hide block when all mapped fields are empty
6. **Range validity**:
   - all date ranges must satisfy `from <= to`

---

## 5) Validation Rules (V1)

- Reject hard-required missing fields.
- Reject invalid numeric ranges:
  - `minStayNights > maxStayNights`
- Reject invalid coordinates when present:
  - lat outside [-90, 90], lng outside [-180, 180]
- Reject malformed dates in range arrays.
- Reject empty `dealType`.

---

## 6) Implementation Notes

- Keep this schema as the local contract until Core mirror DB/API is connected.
- Do not block UI work on pending sections (`Extras`, `House rules`, `Instructions`, `Synchronisation`) — append when screenshots/contract arrive.
- Maintain backward compatibility adapter from existing `coreMirrorPropertyMock` shape to `CoreMirrorPropertyV1` during transition.

---

## 7) Open Items (pending screenshots/contracts)

- Contract Term section exact fields
- Extras section exact fields
- House rules exact fields
- Instructions exact fields
- Synchronisation section exact fields
- Definitive enum dictionary IDs from Core (not only labels)

---

## 8) Scope Decision

This V1 is approved for:
- canonical rental property details simulation
- real-estate-ready detail flow foundation (`dealType: sale`)
- list-card + detail-page consistency in mock mode

When Core integration starts, map field IDs one-to-one and preserve this view contract for UI stability.
