export type CoreMirrorProperty = {
  id: string;
  slug: string;
  title: string;
  type: "vacation" | "real-estate";
  location: {
    area: string;
    region: string;
    country: string;
    beachDistanceM: number;
  };
  summary: string;
  highlights: string[];
  metrics: {
    guests: number;
    bedrooms: number;
    bathrooms: number;
    areaSqm: number;
  };
  gallery: string[];
  pricing: {
    currency: string;
    basicFrom: number;
    seasonalFrom: number;
    seasonName: string;
    minStayNights: number;
  };
  amenities: string[];
  policies: {
    smokingAllowed: boolean;
    petsAllowed: boolean;
    cancellationSummary: string;
    tourismLicense: string;
  };
  nearby: { label: string; value: string }[];
  badges: string[];
  faqs: { q: string; a: string }[];
  related: { title: string; href: string; from: number; image: string }[];
  videoUrl: string;
  nearbyServices: { name: string; detail: string }[];
  blogPosts: { title: string; href: string; date: string; excerpt: string }[];
};

const properties: CoreMirrorProperty[] = [
  {
    id: "6325",
    slug: "villa-glarokavos-sea-view",
    title: "Villa Glarokavos Sea View",
    type: "vacation",
    location: {
      area: "Glarokavos",
      region: "Pefkohori, Halkidiki",
      country: "Greece",
      beachDistanceM: 600,
    },
    summary:
      "Spacious 5-bedroom villa near Pefkohori with sea-view positioning, family-ready comfort, and group-friendly layout for summer stays.",
    highlights: [
      "Sea-view holiday villa",
      "Family and group friendly",
      "Close to beach and local infrastructure",
      "Private pool and furnished terrace",
    ],
    metrics: {
      guests: 10,
      bedrooms: 5,
      bathrooms: 4,
      areaSqm: 260,
    },
    gallery: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1600&auto=format&fit=crop",
    ],
    pricing: {
      currency: "EUR",
      basicFrom: 550,
      seasonalFrom: 700,
      seasonName: "High Season",
      minStayNights: 5,
    },
    amenities: [
      "Air Conditioning",
      "Free Wi-Fi",
      "Private Swimming Pool",
      "Full Kitchen",
      "Dishwasher",
      "Free Parking",
      "Furnished Terrace",
      "BBQ",
      "Baby bed",
      "Sea view",
    ],
    policies: {
      smokingAllowed: true,
      petsAllowed: true,
      cancellationSummary: "Flexible cancellation policy with staged refund windows.",
      tourismLicense: "9999999",
    },
    nearby: [
      { label: "Beach", value: "600 m" },
      { label: "Airport", value: "95 km" },
      { label: "Restaurant", value: "700 m" },
      { label: "Supermarket", value: "800 m" },
    ],
    badges: ["Sea View", "Family Friendly", "Private Pool", "Near Beach"],
    faqs: [
      {
        q: "How does pricing work when no seasonal rate is set?",
        a: "Seasonal rate is preferred. If no season matches selected dates, the system falls back to the Basic nightly rate.",
      },
      {
        q: "Is this page already Core-integrated?",
        a: "This version is bound to a local Core-mirror mock model and is ready to map to final Core payload contracts.",
      },
    ],
    related: [
      {
        title: "Villa Edema",
        href: "/listing/vacation/5780/",
        from: 700,
        image:
          "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1200&auto=format&fit=crop",
      },
      {
        title: "Luxury Suite Irakleia 1",
        href: "/listing/real-estate/5760/",
        from: 100,
        image:
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    nearbyServices: [
      { name: "Airport Transfer", detail: "Door-to-door transfer from SKG airport" },
      { name: "Private Chef", detail: "In-villa Greek and Mediterranean menus" },
      { name: "Boat Experience", detail: "Daily cruises from nearby marina" },
      { name: "Wellness & Massage", detail: "At-home relaxation sessions" },
    ],
    blogPosts: [
      {
        title: "Best Coastal Towns for Summer in Halkidiki",
        href: "/blog/best-coastal-towns-halkidiki",
        date: "2026-02-10",
        excerpt: "A practical guide to choosing the right coastal base for your holiday.",
      },
      {
        title: "Family-Friendly Seaside Vacation Planning Checklist",
        href: "/blog/family-seaside-vacation-checklist",
        date: "2026-02-08",
        excerpt: "Everything families should plan before booking a sea-view villa.",
      },
      {
        title: "How Seasonal Rates Work for Vacation Rentals",
        href: "/blog/seasonal-rates-explained",
        date: "2026-02-05",
        excerpt: "Understand high/low season pricing and basic-rate fallback logic.",
      },
    ],
  },
];

export function getCoreMirrorPropertyBySlug(slug: string): CoreMirrorProperty | null {
  return properties.find((p) => p.slug === slug) ?? null;
}
