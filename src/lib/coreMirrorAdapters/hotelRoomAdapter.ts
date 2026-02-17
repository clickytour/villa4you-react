import { getCoreMirrorHotelRoomsByHotelSlug, type CoreMirrorHotelRoom } from "@/lib/coreMirrorHotelRoomMock";
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
      ...(mode === "short_term_rent"
        ? [{ label: "Nightly", value: `${room.rates.nightlyEur} EUR` as const }]
        : mode === "monthly_rent"
        ? [{ label: "Monthly", value: `${room.rates.monthlyEur} EUR` as const }]
        : []),
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
    media: {
      videoUrl: room.media.videoUrl,
      tour3dUrl: room.media.tour3dUrl,
      contentUrls: room.media.contentUrls,
    },
    bookingWidget:
      mode === "short_term_rent"
        ? {
            calendarId: "63884",
            resourceId: room.id,
            actionUrl: "/my-reservations",
            currency: "EUR",
            basicFrom: room.rates.nightlyEur,
            seasonalRates: [
              { label: "Mid", from: "2026-05-01", to: "2026-06-30", nightly: room.rates.nightlyEur },
              { label: "High", from: "2026-07-01", to: "2026-08-31", nightly: Math.round(room.rates.nightlyEur * 1.3) },
              { label: "Mid", from: "2026-09-01", to: "2026-09-30", nightly: Math.round(room.rates.nightlyEur * 1.1) },
            ],
            unavailableDates: [],
            minStayNights: 2,
            relatedOptions: getCoreMirrorHotelRoomsByHotelSlug(room.hotelSlug).map((r) => ({
              title: r.title,
              href: `/property/hotel-room/${r.slug}/vacation`,
              from: r.rates.nightlyEur,
              image: r.media.primaryImage,
            })),
          }
        : undefined,
    cta: {
      primary: pickPrimaryCta(dealType),
      secondary: "View parent hotel",
    },
  };
}
