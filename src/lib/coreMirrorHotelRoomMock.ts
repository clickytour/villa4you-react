export type CoreMirrorHotelRoom = {
  id: string;
  slug: string;
  hotelSlug: string;
  title: string;
  roomType: string;
  quantity: number;
  shortSummary: string;
  dealType: Array<"short_term_rent" | "monthly_rent" | "sale">;
  media: {
    primaryImage: string;
    galleryImages: string[];
    videoUrl?: string;
    tour3dUrl?: string;
    contentUrls?: Array<{ site: string; url: string }>;
  };
  rates: { nightlyEur: number; monthlyEur: number };
  maxGuests: number;
  amenities: string[];
  nearbyServices?: Array<{ name: string; detail: string; href: string; coverageKm?: number; image?: string; ctaLabel?: string; modes?: Array<"short_term_rent" | "monthly_rent" | "sale"> }>;
  blogPosts?: Array<{ title: string; href: string; date?: string; excerpt?: string; image?: string; ctaLabel?: string; modes?: Array<"short_term_rent" | "monthly_rent" | "sale"> }>;
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
      videoUrl: "https://www.youtube.com/embed/Scxs7L0vhZ4",
      tour3dUrl: "https://my.matterport.com/show/?m=8gW2J1r5gV9",
      contentUrls: [{ site: "Airbnb", url: "https://www.airbnb.com" }],
    },
    rates: { nightlyEur: 180, monthlyEur: 3900 },
    maxGuests: 3,
    amenities: ["Wi-Fi", "AC", "Espresso machine", "Balcony"],
    nearbyServices: [
      {
        name: "Laundry & Press",
        detail: "Same-day service",
        href: "/services/private-chef-villa-service",
        coverageKm: 15,
        image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=1200&auto=format&fit=crop",
        ctaLabel: "View laundry service",
        modes: ["monthly_rent", "short_term_rent"],
      },
      {
        name: "Private Transfer",
        detail: "Airport and marina transfer",
        href: "/services/airport-transfer-halkidiki",
        coverageKm: 120,
        image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1200&auto=format&fit=crop",
        ctaLabel: "Book transfer",
        modes: ["short_term_rent"],
      },
    ],
    blogPosts: [
      {
        title: "Suite booking tips for peak season",
        href: "/blog/family-seaside-vacation-checklist",
        date: "2026-02-08",
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200&auto=format&fit=crop",
        ctaLabel: "Read tips",
        modes: ["short_term_rent"],
      },
      {
        title: "How to choose room add-on services",
        href: "/blog/seasonal-rates-explained",
        date: "2026-02-05",
        image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&auto=format&fit=crop",
        ctaLabel: "Open article",
        modes: ["sale", "monthly_rent"],
      },
    ],
  },
];

export function getCoreMirrorHotelRoomBySlug(slug: string): CoreMirrorHotelRoom | null {
  return coreMirrorHotelRooms.find((r) => r.slug === slug) ?? null;
}

export function getCoreMirrorHotelRoomsByHotelSlug(hotelSlug: string): CoreMirrorHotelRoom[] {
  return coreMirrorHotelRooms.filter((r) => r.hotelSlug === hotelSlug);
}
