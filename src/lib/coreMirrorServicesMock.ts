export type ServicePriceModel = "package" | "per_hour" | "per_person" | "per_service" | "quote";

export type CoreMirrorService = {
  slug: string;

  basicDetails: {
    businessName: string;
    legalName?: string;
    ownerManagerName?: string;
    categoryId: string;
    subcategoryId: string;
    shortDescription: string;
    fullDescription: string;
    highlights: string[];
    languagesSupported: string[];
    priceDescription?: string;
    email: string;
    phone: string;
    preferredContactMethod?: string;
    websiteUrl?: string;
    socialMediaLinks?: string[];
  };

  locationServiceArea: {
    lat?: number;
    lng?: number;
    country: string;
    city: string;
    street?: string;
    stateRegion?: string;
    address?: string;
    apartmentFloorBuilding?: string;
    postalZipCode?: string;
    serviceAreaCoverageKm?: number;
  };

  media: {
    primaryPhoto: string;
    galleryPhotos: string[];
    promoVideoUrl?: string;
    logo?: string;
  };

  pricingBooking: {
    bookingType?: string;
    priceList: Array<{
      title: string;
      priceModel: ServicePriceModel;
      guestPriceGross?: number;
      agentPriceNet?: number;
      commissionable?: boolean;
      photo?: string;
    }>;
  };

  platformSubscription: {
    subscriptionPlan?: string;
    audienceTarget: Array<"guests" | "agents" | "property_owners">;
  };

  synchronization?: {
    status?: string;
    externalRefs?: string[];
  };

  relatedPropertySlug?: string;
  relatedBlogSlug?: string;
};

export const coreMirrorServices: CoreMirrorService[] = [
  {
    slug: "airport-transfer-halkidiki",
    basicDetails: {
      businessName: "Airport Transfer Halkidiki",
      legalName: "Halkidiki Mobility P.C.",
      ownerManagerName: "Nikos Papadopoulos",
      categoryId: "transfersTransport",
      subcategoryId: "airportTransfer",
      shortDescription: "Door-to-door transfers from SKG to your villa with fixed pricing.",
      fullDescription:
        "Private transfer scheduling based on arrival/departure times. Family-friendly options including child seats on request. Direct drop-off at villa entrance when access allows.",
      highlights: ["24/7 support", "Fixed pre-booked pricing", "Family seats available"],
      languagesSupported: ["English", "Greek"],
      priceDescription: "Airport pickup (1 hour) from €60",
      email: "bookings@airport-transfer.example",
      phone: "+30 6900000001",
      preferredContactMethod: "WhatsApp",
      websiteUrl: "https://example.com/airport-transfer",
      socialMediaLinks: ["https://instagram.com"],
    },
    locationServiceArea: {
      lat: 40.5197,
      lng: 22.9709,
      country: "Greece",
      city: "Thessaloniki",
      street: "Airport Road",
      stateRegion: "Central Macedonia",
      address: "SKG Airport Zone",
      postalZipCode: "55103",
      serviceAreaCoverageKm: 120,
    },
    media: {
      primaryPhoto: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1400&auto=format&fit=crop",
      galleryPhotos: [
        "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?q=80&w=1200&auto=format&fit=crop",
      ],
      promoVideoUrl: "https://www.youtube.com/watch?v=2QF8xM0LxMI",
      logo: "https://images.unsplash.com/photo-1612831455544-6d9a36e20c77?q=80&w=400&auto=format&fit=crop",
    },
    pricingBooking: {
      bookingType: "Instant booking",
      priceList: [
        {
          title: "SKG -> Kassandra",
          priceModel: "package",
          guestPriceGross: 60,
          agentPriceNet: 50,
          commissionable: true,
        },
        {
          title: "Private driver per hour",
          priceModel: "per_hour",
          guestPriceGross: 35,
          commissionable: true,
        },
      ],
    },
    platformSubscription: {
      subscriptionPlan: "Pro",
      audienceTarget: ["guests", "agents"],
    },
    synchronization: {
      status: "active",
      externalRefs: ["core:svc-1001"],
    },
    relatedPropertySlug: "villa-glarokavos-sea-view",
    relatedBlogSlug: "family-seaside-vacation-checklist",
  },
  {
    slug: "private-chef-villa-service",
    basicDetails: {
      businessName: "Private Chef Villa Service",
      legalName: "Mediterranean Chef Services",
      ownerManagerName: "Eleni K.",
      categoryId: "cafesRestaurantsNightlife",
      subcategoryId: "localCuisineExperience",
      shortDescription: "In-villa breakfast and curated Mediterranean dinner menus.",
      fullDescription:
        "Custom menus for families, groups, and dietary restrictions. Local ingredients and seasonal recipes. Single-meal and multi-day packages available.",
      highlights: ["Custom menu", "Dietary options", "Local ingredients"],
      languagesSupported: ["English", "Greek", "Italian"],
      priceDescription: "Dinner package from €180",
      email: "hello@chef-service.example",
      phone: "+30 6900000002",
      preferredContactMethod: "Email",
      websiteUrl: "https://example.com/private-chef",
      socialMediaLinks: ["https://facebook.com"],
    },
    locationServiceArea: {
      country: "Greece",
      city: "Halkidiki",
      stateRegion: "Central Macedonia",
      serviceAreaCoverageKm: 35,
    },
    media: {
      primaryPhoto: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1400&auto=format&fit=crop",
      galleryPhotos: [
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop",
      ],
      promoVideoUrl: "https://vimeo.com/76979871",
    },
    pricingBooking: {
      bookingType: "Request",
      priceList: [
        {
          title: "Chef dinner package",
          priceModel: "package",
          guestPriceGross: 180,
          commissionable: false,
        },
        {
          title: "Chef per person",
          priceModel: "per_person",
          guestPriceGross: 45,
          commissionable: false,
        },
      ],
    },
    platformSubscription: {
      subscriptionPlan: "Starter",
      audienceTarget: ["guests", "property_owners"],
    },
    relatedPropertySlug: "villa-glarokavos-sea-view",
    relatedBlogSlug: "best-coastal-towns-halkidiki",
  },
];

export function getCoreMirrorServiceBySlug(slug: string): CoreMirrorService | null {
  return coreMirrorServices.find((s) => s.slug === slug) ?? null;
}
