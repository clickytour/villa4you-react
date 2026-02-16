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
    items: Array<{ title: string; subtitle?: string; href: string }>;
  };
  parentLink?: { label: string; href: string };
  cta: {
    primary: string;
    secondary?: string;
  };
};
