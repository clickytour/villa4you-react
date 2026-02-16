export type CoreMirrorHotelRoom = {
  id: string;
  slug: string;
  hotelSlug: string;
  title: string;
  roomType: string;
  quantity: number;
  shortSummary: string;
  dealType: Array<"short_term_rent" | "monthly_rent" | "sale">;
  media: { primaryImage: string; galleryImages: string[] };
  rates: { nightlyEur: number; monthlyEur: number };
  maxGuests: number;
  amenities: string[];
};

export const coreMirrorHotelRooms: CoreMirrorHotelRoom[] = [
  {
    id: "hr-701",
    slug: "aegean-deluxe-suite",
    hotelSlug: "aegean-boutique-hotel",
    title: "Aegean Deluxe Suite",
    roomType: "suite",
    quantity: 6,
    shortSummary: "Premium suite unit with nightly and monthly operation options.",
    dealType: ["short_term_rent", "monthly_rent", "sale"],
    media: {
      primaryImage: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1800&auto=format&fit=crop",
      galleryImages: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      ],
    },
    rates: { nightlyEur: 180, monthlyEur: 3900 },
    maxGuests: 3,
    amenities: ["Wi-Fi", "AC", "Espresso machine", "Balcony"],
  },
];

export function getCoreMirrorHotelRoomBySlug(slug: string): CoreMirrorHotelRoom | null {
  return coreMirrorHotelRooms.find((r) => r.slug === slug) ?? null;
}

export function getCoreMirrorHotelRoomsByHotelSlug(hotelSlug: string): CoreMirrorHotelRoom[] {
  return coreMirrorHotelRooms.filter((r) => r.hotelSlug === hotelSlug);
}
