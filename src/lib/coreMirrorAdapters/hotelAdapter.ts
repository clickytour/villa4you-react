import type { CoreMirrorHotel } from "@/lib/coreMirrorHotelMock";
import { getCoreMirrorHotelRoomsByHotelSlug } from "@/lib/coreMirrorHotelRoomMock";
import { pickPrimaryCta, sanitizeDealTypes } from "@/lib/coreMirrorAdapters/dealTypeRules";
import type { CanonicalDetailsViewModel, DealType } from "@/lib/coreMirrorAdapters/types";

function modeLabel(mode: DealType) {
  if (mode === "short_term_rent") return "Vacation";
  if (mode === "sale") return "Sale";
  return "Monthly rent";
}

function modeSlug(mode: DealType) {
  if (mode === "short_term_rent") return "vacation";
  if (mode === "sale") return "sale";
  return "monthly";
}

export function toHotelDetailsVM(hotel: CoreMirrorHotel, activeMode?: DealType): CanonicalDetailsViewModel {
  const modes = sanitizeDealTypes("hotel", hotel.dealType);
  const mode = activeMode && modes.includes(activeMode) ? activeMode : modes[0];
  const dealType = [mode];
  return {
    id: hotel.id,
    slug: hotel.slug,
    entityType: "hotel",
    title: hotel.title,
    subtitle: hotel.shortSummary,
    description: hotel.description,
    dealType,
    primaryImage: hotel.media.primaryImage,
    gallery: hotel.media.galleryImages,
    tags: [hotel.hotelType.replaceAll("_", " "), ...dealType.map((d) => d.replaceAll("_", " "))],
    facts:
      mode === "short_term_rent"
        ? [{ label: "From nightly", value: `${hotel.prices.fromNightlyEur} EUR` }]
        : mode === "monthly_rent"
        ? [{ label: "Monthly", value: `${hotel.prices.monthlyEur} EUR` }]
        : [{ label: "Sale", value: `${hotel.prices.saleEur} EUR` }],
    amenities: hotel.amenities,
    distances: hotel.distances,
    locationLabel: `${hotel.location.city}, ${hotel.location.region}, ${hotel.location.country}`,
    modeTabs: modes.map((m) => ({
      label: modeLabel(m),
      href: `/property/hotel/${hotel.slug}/${modeSlug(m)}`,
      active: m === mode,
    })),
    sectionCards: {
      title: mode === "short_term_rent" ? "Choose your room type" : mode === "monthly_rent" ? "Long-stay room units" : "Room units for investment review",
      items: getCoreMirrorHotelRoomsByHotelSlug(hotel.slug).map((r) => ({
        title: r.title,
        subtitle: `${r.roomType} · up to ${r.maxGuests} guests`,
        href: `/property/hotel-room/${r.slug}/${modeSlug(mode)}`,
        imageUrl: r.media.primaryImage,
        priceLabel:
          mode === "short_term_rent"
            ? `From ${r.rates.nightlyEur} EUR / night`
            : mode === "monthly_rent"
            ? `From ${r.rates.monthlyEur} EUR / month`
            : `Unit available for sale inquiry`,
        ctaPrimary: mode === "sale" ? "View unit for sale" : mode === "monthly_rent" ? "View monthly terms" : "View room",
        ctaSecondary: {
          label: mode === "sale" ? "Request investment info" : "Contact advisor",
          href: `/property/hotel/${hotel.slug}/${modeSlug(mode)}#guest-request-form`,
        },
      })),
    },
    bookingWidget:
      mode === "short_term_rent"
        ? {
            calendarId: "63884",
            resourceId: "221043",
            actionUrl: "/my-reservations",
            currency: "EUR",
            basicFrom: hotel.prices.fromNightlyEur,
            seasonalRates: [
              { label: "Mid", from: "2026-05-01", to: "2026-06-30", nightly: hotel.prices.fromNightlyEur },
              { label: "High", from: "2026-07-01", to: "2026-08-31", nightly: Math.round(hotel.prices.fromNightlyEur * 1.35) },
              { label: "Mid", from: "2026-09-01", to: "2026-09-30", nightly: Math.round(hotel.prices.fromNightlyEur * 1.1) },
            ],
            unavailableDates: [],
            minStayNights: 2,
            relatedOptions: getCoreMirrorHotelRoomsByHotelSlug(hotel.slug).map((r) => ({
              title: r.title,
              href: `/property/hotel-room/${r.slug}/vacation`,
              from: r.rates.nightlyEur,
              image: r.media.primaryImage,
            })),
          }
        : undefined,
    cta: {
      primary: pickPrimaryCta(dealType),
      secondary: "Open room inventory",
    },
  };
}
