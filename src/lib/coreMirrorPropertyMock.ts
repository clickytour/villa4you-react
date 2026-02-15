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
  },
];

export function getCoreMirrorPropertyBySlug(slug: string): CoreMirrorProperty | null {
  return properties.find((p) => p.slug === slug) ?? null;
}
