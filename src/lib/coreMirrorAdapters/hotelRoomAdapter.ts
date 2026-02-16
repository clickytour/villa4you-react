import type { CoreMirrorHotelRoom } from "@/lib/coreMirrorHotelRoomMock";
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

export function toHotelRoomDetailsVM(room: CoreMirrorHotelRoom, activeMode?: DealType): CanonicalDetailsViewModel {
  const modes = sanitizeDealTypes("hotel-room", room.dealType);
  const mode = activeMode && modes.includes(activeMode) ? activeMode : modes[0];
  const dealType = [mode];
  return {
    id: room.id,
    slug: room.slug,
    entityType: "hotel-room",
    title: room.title,
    subtitle: room.shortSummary,
    dealType,
    primaryImage: room.media.primaryImage,
    gallery: room.media.galleryImages,
    tags: [room.roomType, ...dealType.map((d) => d.replaceAll("_", " "))],
    facts: [
      { label: "Max guests", value: room.maxGuests },
      { label: "Quantity", value: room.quantity },
      { label: "Nightly", value: `${room.rates.nightlyEur} EUR` },
      { label: "Monthly", value: `${room.rates.monthlyEur} EUR` },
    ],
    amenities: room.amenities,
    distances: [{ label: "Hotel", value: room.hotelSlug }],
    locationLabel: `Part of ${room.hotelSlug}`,
    modeTabs: modes.map((m) => ({
      label: modeLabel(m),
      href: `/property/hotel-room/${room.slug}/${modeSlug(m)}`,
      active: m === mode,
    })),
    parentLink: {
      label: "Back to parent hotel",
      href: `/property/hotel/${room.hotelSlug}/${modeSlug(mode)}`,
    },
    cta: {
      primary: pickPrimaryCta(dealType),
      secondary: "View parent hotel",
    },
  };
}
