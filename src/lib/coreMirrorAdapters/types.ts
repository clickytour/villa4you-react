export type EntityType = "vacation" | "real-estate" | "hotel" | "hotel-room";

export type DealType = "short_term_rent" | "monthly_rent" | "sale";

export type CanonicalDetailsViewModel = {
  id: string;
  slug: string;
  entityType: EntityType;
  title: string;
  subtitle?: string;
  description?: string;
  dealType: DealType[];
  primaryImage: string;
  gallery: string[];
  tags: string[];
  facts: Array<{ label: string; value: string | number }>;
  amenities: string[];
  distances: Array<{ label: string; value: string }>;
  locationLabel?: string;
  modeTabs?: Array<{ label: string; href: string; active?: boolean }>;
  sectionCards?: {
    title: string;
    items: Array<{
      title: string;
      subtitle?: string;
      href: string;
      imageUrl?: string;
      priceLabel?: string;
      ctaPrimary?: string;
      ctaSecondary?: { label: string; href: string };
    }>;
  };
  bookingWidget?: {
    calendarId: string;
    resourceId: string;
    actionUrl: string;
    currency: string;
    basicFrom: number;
    seasonalRates: Array<{ label: string; from: string; to: string; nightly: number }>;
    unavailableDates: string[];
    minStayNights: number;
    relatedOptions: Array<{ title: string; href: string; from: number; image: string }>;
  };
  media?: {
    videoUrl?: string;
    tour3dUrl?: string;
    contentUrls?: Array<{ site: string; url: string }>;
  };
  parentLink?: { label: string; href: string };
  relatedServices?: Array<{ name: string; detail: string; href: string; coverageKm?: number; image?: string; ctaLabel?: string }>;
  relatedBlogPosts?: Array<{ title: string; href: string; date?: string; excerpt?: string; image?: string; ctaLabel?: string }>;
  cta: {
    primary: string;
    secondary?: string;
  };
};
