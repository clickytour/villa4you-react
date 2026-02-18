export type CoreMirrorHotel = {
  id: string;
  slug: string;
  title: string;
  shortSummary: string;
  description: string;
  hotelType: string;
  dealType: Array<"short_term_rent" | "monthly_rent" | "sale">;
  media: {
    primaryImage: string;
    galleryImages: string[];
    videoUrl?: string;
    tour3dUrl?: string;
    contentUrls?: Array<{ site: string; url: string }>;
  };
  location: { city: string; region: string; country: string };
  prices: { fromNightlyEur: number; monthlyEur: number; saleEur: number };
  amenities: string[];
  distances: Array<{ label: string; value: string }>;
  nearbyServices?: Array<{ name: string; detail: string; href: string; coverageKm?: number; image?: string; ctaLabel?: string; modes?: Array<"short_term_rent" | "monthly_rent" | "sale"> }>;
  blogPosts?: Array<{ title: string; href: string; date?: string; excerpt?: string; image?: string; ctaLabel?: string; modes?: Array<"short_term_rent" | "monthly_rent" | "sale"> }>;
};

export const hotels: CoreMirrorHotel[] = [
  {
    id: "h-301",
    slug: "aegean-boutique-hotel",
    title: "Aegean Boutique Hotel",
    shortSummary: "Boutique hotel with flexible operation model (rental, monthly, sale).",
    description: "Hotel asset with room-level pricing and seasonal strategy, suitable for operators and investors.",
    hotelType: "boutique_hotel",
    dealType: ["short_term_rent", "monthly_rent", "sale"],
    media: {
      primaryImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1800&auto=format&fit=crop",
      galleryImages: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200&auto=format&fit=crop",
      ],
      videoUrl: "https://www.youtube.com/embed/2QF8xM0LxMI",
      tour3dUrl: "https://my.matterport.com/show/?m=SxQL3iGyoDo",
      contentUrls: [
        { site: "YouTube", url: "https://www.youtube.com/watch?v=2QF8xM0LxMI" },
        { site: "Booking", url: "https://www.booking.com" },
      ],
    },
    location: { city: "Pefkohori", region: "Halkidiki", country: "Greece" },
    prices: { fromNightlyEur: 130, monthlyEur: 3400, saleEur: 2100000 },
    amenities: ["Reception", "Wi-Fi", "Breakfast", "Pool", "Parking"],
    distances: [
      { label: "Beach", value: "220 m" },
      { label: "Airport", value: "98 km" },
      { label: "Marina", value: "2.1 km" },
    ],
    nearbyServices: [
      {
        name: "Airport Transfer",
        detail: "Direct transfer from SKG",
        href: "/services/airport-transfer-halkidiki",
        coverageKm: 120,
        image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1200&auto=format&fit=crop",
        ctaLabel: "View service",
        modes: ["short_term_rent", "monthly_rent"],
      },
      {
        name: "Private Chef",
        detail: "In-room dining experiences",
        href: "/services/private-chef-villa-service",
        coverageKm: 35,
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop",
        ctaLabel: "Book chef",
        modes: ["short_term_rent"],
      },
    ],
    blogPosts: [
      {
        title: "Top hotel services guests request in Halkidiki",
        href: "/blog/best-coastal-towns-halkidiki",
        date: "2026-02-10",
        image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1200&auto=format&fit=crop",
        ctaLabel: "Read article",
        modes: ["short_term_rent", "monthly_rent"],
      },
      {
        title: "How service coverage improves stay conversion",
        href: "/blog/seasonal-rates-explained",
        date: "2026-02-05",
        image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=1200&auto=format&fit=crop",
        ctaLabel: "Open insights",
        modes: ["sale"],
      },
    ],
  },
];

export function getCoreMirrorHotelBySlug(slug: string): CoreMirrorHotel | null {
  return hotels.find((h) => h.slug === slug) ?? null;
}
