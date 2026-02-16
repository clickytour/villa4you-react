import type { CoreMirrorHotel } from "@/lib/coreMirrorHotelMock";
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
    facts: [
      { label: "From nightly", value: `${hotel.prices.fromNightlyEur} EUR` },
      { label: "Monthly", value: `${hotel.prices.monthlyEur} EUR` },
      { label: "Sale", value: `${hotel.prices.saleEur} EUR` },
    ],
    amenities: hotel.amenities,
    distances: hotel.distances,
    locationLabel: `${hotel.location.city}, ${hotel.location.region}, ${hotel.location.country}`,
    modeTabs: modes.map((m) => ({
      label: modeLabel(m),
      href: `/property/hotel/${hotel.slug}/${modeSlug(m)}`,
      active: m === mode,
    })),
    cta: {
      primary: pickPrimaryCta(dealType),
      secondary: "Open room inventory",
    },
  };
}
