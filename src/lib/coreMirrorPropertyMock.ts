export type CoreMirrorProperty = {
  id: string;
  slug: string;
  title: string;
  headline: string;
  shortDescription: string;
  detailDescription: string;
  type: "vacation" | "real-estate";
  location: {
    area: string;
    region: string;
    country: string;
    beachDistanceM: number;
    lat: number;
    lng: number;
  };
  // summary removed per core parity
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
    seasonalRates: { label: string; from: string; to: string; nightly: number }[];
    unavailableDates: string[];
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
  planyo: { calendarId: string; resourceId: string; actionUrl: string };
  videoUrl: string;
  tour3dUrl?: string;
  nearbyServices: { name: string; detail: string; href: string; blogHref?: string }[];
  blogPosts: { title: string; href: string; date: string; excerpt: string; image: string }[];
};

const properties: CoreMirrorProperty[] = [
  {
    id: "6325",
    slug: "villa-glarokavos-sea-view",
    title: "Villa Glarokavos Sea View",
    headline: "Sea-View Luxury Villa in Halkidiki",
    shortDescription: "Premium 5-bedroom villa for families and groups near Pefkohori beach.",
    detailDescription: "Villa Glarokavos Sea View combines spacious interiors, private pool comfort, and quick access to key local services. It is designed for guests who want a high-comfort stay with clear availability and pricing visibility.",
    type: "vacation",
    location: {
      area: "Glarokavos",
      region: "Pefkohori, Halkidiki",
      country: "Greece",
      beachDistanceM: 600,
      lat: 39.9886,
      lng: 23.6176,
    },
    // summary removed per core parity
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
      basicFrom: 500,
      seasonalFrom: 900,
      seasonName: "High Season",
      minStayNights: 7,
      seasonalRates: [
        { label: "Mid", from: "2026-05-01", to: "2026-06-20", nightly: 500 },
        { label: "Mid", from: "2026-06-21", to: "2026-06-30", nightly: 750 },
        { label: "High", from: "2026-07-01", to: "2026-08-31", nightly: 900 },
        { label: "Mid", from: "2026-09-01", to: "2026-09-30", nightly: 750 },
      ],
      unavailableDates: ["2026-03-01", "2026-03-02", "2026-03-03", "2026-03-04", "2026-03-05", "2026-03-06", "2026-03-07", "2026-03-08", "2026-03-20", "2026-03-21", "2026-03-22", "2026-03-23", "2026-03-24", "2026-03-25", "2026-03-26", "2026-03-27"],
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
      { label: "Airport", value: "95 km" },
      { label: "Infrastructure", value: "1.2 km" },
      { label: "Restaurants", value: "900 m" },
      { label: "Supermarket", value: "800 m" },
      { label: "Marina", value: "3.4 km" },
      { label: "Police Office", value: "4.1 km" },
      { label: "Medical Office", value: "2.8 km" },
      { label: "Entertainment Facilities", value: "1.6 km" },
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
      {
        q: "How far is the property from key infrastructure?",
        a: "Distance indicators on this page include airport, infrastructure, restaurants, supermarket, marina, police office, medical office, and entertainment facilities.",
      },
      {
        q: "Can I request booking details from this page?",
        a: "Yes. Use the Guest Request section to submit your dates and contact details for availability and booking follow-up.",
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
    planyo: {
      calendarId: "63884",
      resourceId: "221043",
      actionUrl: "/my-reservations",
    },
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tour3dUrl: "https://my.matterport.com/show/?m=SxQL3iGyoDo",
    nearbyServices: [
      {
        name: "Airport Transfer",
        detail: "Door-to-door transfer from SKG airport",
        href: "/services/airport-transfer-halkidiki",
        blogHref: "/blog/family-seaside-vacation-checklist",
      },
      {
        name: "Private Chef",
        detail: "In-villa Greek and Mediterranean menus",
        href: "/services/private-chef-villa-service",
        blogHref: "/blog/best-coastal-towns-halkidiki",
      },
      { name: "Boat Experience", detail: "Daily cruises from nearby marina", href: "/services/airport-transfer-halkidiki" },
      { name: "Wellness & Massage", detail: "At-home relaxation sessions", href: "/services/private-chef-villa-service" },
    ],
    blogPosts: [
      {
        title: "Best Coastal Towns for Summer in Halkidiki",
        href: "/blog/best-coastal-towns-halkidiki",
        date: "2026-02-10",
        excerpt: "A practical guide to choosing the right coastal base for your holiday.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
      },
      {
        title: "Family-Friendly Seaside Vacation Planning Checklist",
        href: "/blog/family-seaside-vacation-checklist",
        date: "2026-02-08",
        excerpt: "Everything families should plan before booking a sea-view villa.",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
      },
      {
        title: "How Seasonal Rates Work for Vacation Rentals",
        href: "/blog/seasonal-rates-explained",
        date: "2026-02-05",
        excerpt: "Understand high/low season pricing and basic-rate fallback logic.",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop",
      },
    ],
  },
];

export function getCoreMirrorPropertyBySlug(slug: string): CoreMirrorProperty | null {
  return properties.find((p) => p.slug === slug) ?? null;
}
