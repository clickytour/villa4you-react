/**
 * Search Hub Engine — unified search index across all Core Mirror data sources.
 * Provides intent-aware filtering, sorting, and URL param serialization.
 */

import { type CoreMirrorProperty, getCoreMirrorPropertyBySlug } from "./coreMirrorPropertyMock";
import { coreMirrorHotelRooms, type CoreMirrorHotelRoom } from "./coreMirrorHotelRoomMock";
import { coreMirrorServices, type CoreMirrorService } from "./coreMirrorServicesMock";
import { coreMirrorBlogPosts, type CoreMirrorBlogPost } from "./coreMirrorBlogMock";
import { realEstateProperties, type CoreMirrorRealEstateProperty } from "./coreMirrorRealEstateMock";
import { hotels, type CoreMirrorHotel } from "./coreMirrorHotelMock";

/* ── Intent types ─────────────────────────────────────────── */

export type SearchIntent = "vacation" | "real-estate" | "services" | "hotels" | "blog";

export const INTENTS: { id: SearchIntent; label: string; icon: string }[] = [
  { id: "vacation", label: "Vacation Rentals", icon: "🏖️" },
  { id: "hotels", label: "Hotels", icon: "🏨" },
  { id: "real-estate", label: "Real Estate", icon: "🏠" },
  { id: "services", label: "Services", icon: "✨" },
  { id: "blog", label: "Blog", icon: "📝" },
];

export type SortOption = "relevance" | "price-asc" | "price-desc" | "beach-distance" | "date" | "area" | "roi";

/* ── Unified search result item ──────────────────────────── */

export type SearchResultItem = {
  id: string;
  intent: SearchIntent;
  title: string;
  description: string;
  image?: string;
  href: string;
  price?: number;
  priceLabel?: string;
  location?: string;
  region?: string;
  badges: string[];
  facts: { label: string; value: string }[];
  // extras for filtering
  bedrooms?: number;
  guests?: number;
  areaSqm?: number;
  beachDistanceM?: number;
  amenities?: string[];
  categoryId?: string;
  subcategoryId?: string;
  blogCategory?: string;
  publishedAt?: string;
  stars?: number;
  roiPercent?: number;
  dealTypes?: string[];
};

/* ── Build index ─────────────────────────────────────────── */

function vacationItems(): SearchResultItem[] {
  const p = getCoreMirrorPropertyBySlug("villa-glarokavos-sea-view");
  if (!p) return [];
  return [
    {
      id: `vac-${p.slug}`,
      intent: "vacation",
      title: p.title,
      description: p.shortDescription,
      image: p.gallery[0],
      href: `/property/${p.slug}`,
      price: p.pricing.basicFrom,
      priceLabel: `From €${p.pricing.basicFrom}/night`,
      location: p.location.area,
      region: p.location.region,
      badges: p.badges,
      facts: [
        { label: "Guests", value: String(p.metrics.guests) },
        { label: "Bedrooms", value: String(p.metrics.bedrooms) },
        { label: "Beach", value: `${p.location.beachDistanceM}m` },
      ],
      bedrooms: p.metrics.bedrooms,
      guests: p.metrics.guests,
      areaSqm: p.metrics.areaSqm,
      beachDistanceM: p.location.beachDistanceM,
      amenities: p.amenities,
      dealTypes: p.dealType || ["short_term_rent"],
    },
  ];
}

function realEstateItems(): SearchResultItem[] {
  return realEstateProperties.map((r) => ({
    id: `re-${r.slug}`,
    intent: "real-estate" as SearchIntent,
    title: r.title,
    description: r.shortSummary,
    image: r.media.primaryImage,
    href: `/property/real-estate/${r.slug}`,
    price: r.prices.saleEur,
    priceLabel: `Sale €${(r.prices.saleEur / 1000).toFixed(0)}K | Rent €${r.prices.monthlyEur}/mo`,
    location: r.location.city,
    region: r.location.region,
    badges: r.amenities.slice(0, 3),
    facts: [
      { label: "Bedrooms", value: String(r.metrics.bedrooms) },
      { label: "Area", value: `${r.metrics.areaSqm} sqm` },
      { label: "ROI", value: `${r.prices.roiPercent}%` },
    ],
    bedrooms: r.metrics.bedrooms,
    areaSqm: r.metrics.areaSqm,
    amenities: r.amenities,
    roiPercent: r.prices.roiPercent,
    dealTypes: r.dealType,
  }));
}

function hotelItems(): SearchResultItem[] {
  return hotels.map((h) => ({
    id: `hotel-${h.slug}`,
    intent: "hotels" as SearchIntent,
    title: h.title,
    description: h.shortSummary,
    image: h.media.primaryImage,
    href: `/property/hotel/${h.slug}`,
    price: h.prices.fromNightlyEur,
    priceLabel: `From €${h.prices.fromNightlyEur}/night`,
    location: h.location.city,
    region: h.location.region,
    badges: h.amenities.slice(0, 3),
    facts: [
      { label: "Type", value: h.hotelType.replace(/_/g, " ") },
      { label: "From", value: `€${h.prices.fromNightlyEur}/night` },
    ],
    amenities: h.amenities,
    stars: h.hotelType === "boutique_hotel" ? 4 : 3,
    beachDistanceM: parseDistanceM(h.distances.find((d) => d.label === "Beach")?.value),
    dealTypes: h.dealType,
  }));
}

function serviceItems(): SearchResultItem[] {
  return coreMirrorServices.map((s) => {
    const firstPrice = s.pricingBooking.priceList[0];
    return {
      id: `svc-${s.slug}`,
      intent: "services" as SearchIntent,
      title: s.basicDetails.businessName,
      description: s.basicDetails.shortDescription,
      image: s.media.primaryPhoto,
      href: `/services/${s.slug}`,
      price: firstPrice?.guestPriceGross,
      priceLabel: s.basicDetails.priceDescription,
      location: s.locationServiceArea.city,
      region: s.locationServiceArea.stateRegion,
      badges: s.basicDetails.highlights,
      facts: [
        { label: "Category", value: s.basicDetails.categoryId },
        { label: "Booking", value: s.pricingBooking.bookingType || "request" },
      ],
      categoryId: s.basicDetails.categoryId,
      subcategoryId: s.basicDetails.subcategoryId,
    };
  });
}

function blogItems(): SearchResultItem[] {
  return coreMirrorBlogPosts.map((b) => ({
    id: `blog-${b.slug}`,
    intent: "blog" as SearchIntent,
    title: b.title,
    description: b.excerpt,
    image: b.coverImage,
    href: `/blog/${b.slug}`,
    badges: [b.category],
    facts: [
      { label: "Category", value: b.category },
      { label: "Published", value: b.publishedAt },
    ],
    blogCategory: b.category,
    publishedAt: b.publishedAt,
  }));
}

function parseDistanceM(val?: string): number | undefined {
  if (!val) return undefined;
  const m = val.match(/([\d.]+)\s*(m|km)/i);
  if (!m) return undefined;
  const n = parseFloat(m[1]);
  return m[2].toLowerCase() === "km" ? n * 1000 : n;
}

/* Also add hotel rooms as vacation items */
function hotelRoomVacationItems(): SearchResultItem[] {
  return coreMirrorHotelRooms.map((r) => ({
    id: `room-${r.slug}`,
    intent: "vacation" as SearchIntent,
    title: r.title,
    description: r.shortSummary,
    image: r.media.primaryImage,
    href: `/property/hotel-room/${r.slug}`,
    price: r.rates.nightlyEur,
    priceLabel: `From €${r.rates.nightlyEur}/night`,
    location: r.hotelSlug,
    badges: r.amenities.slice(0, 3),
    facts: [
      { label: "Max Guests", value: String(r.maxGuests) },
      { label: "Type", value: r.roomType },
    ],
    guests: r.maxGuests,
    amenities: r.amenities,
    dealTypes: r.dealType,
  }));
}

export function getAllSearchItems(): SearchResultItem[] {
  return [
    ...vacationItems(),
    ...hotelRoomVacationItems(),
    ...realEstateItems(),
    ...hotelItems(),
    ...serviceItems(),
    ...blogItems(),
  ];
}

/* ── Filter params ───────────────────────────────────────── */

export type SearchFilters = {
  intent: SearchIntent;
  q?: string;
  location?: string;
  // Vacation
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  bedrooms?: number;
  beachDistance?: string; // "0-300" | "300-700" | "700-1500" | "1500+"
  budgetMin?: number;
  budgetMax?: number;
  amenities?: string[];
  // Real Estate
  mode?: "buy" | "rent";
  propertyTypes?: string[];
  minSqm?: number;
  maxSqm?: number;
  features?: string[];
  // Services
  category?: string;
  subcategory?: string;
  // Hotels
  stars?: number;
  // Blog
  blogCategory?: string;
  // Sort
  sort?: SortOption;
};

export function filterAndSort(items: SearchResultItem[], filters: SearchFilters): SearchResultItem[] {
  let results = items.filter((item) => item.intent === filters.intent);

  // Text search
  if (filters.q) {
    const q = filters.q.toLowerCase();
    results = results.filter((item) => {
      const hay = `${item.title} ${item.description} ${item.location || ""} ${item.region || ""} ${item.badges.join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }

  // Location
  if (filters.location) {
    const loc = filters.location.toLowerCase();
    results = results.filter((item) => {
      const hay = `${item.location || ""} ${item.region || ""}`.toLowerCase();
      return hay.includes(loc);
    });
  }

  // Vacation-specific
  if (filters.intent === "vacation") {
    if (filters.guests) results = results.filter((i) => (i.guests || 0) >= filters.guests!);
    if (filters.bedrooms) results = results.filter((i) => (i.bedrooms || 0) >= filters.bedrooms!);
    if (filters.budgetMin) results = results.filter((i) => (i.price || 0) >= filters.budgetMin!);
    if (filters.budgetMax) results = results.filter((i) => (i.price || Infinity) <= filters.budgetMax!);
    if (filters.beachDistance) {
      results = results.filter((i) => {
        if (!i.beachDistanceM) return true;
        const d = i.beachDistanceM;
        switch (filters.beachDistance) {
          case "0-300": return d <= 300;
          case "300-700": return d > 300 && d <= 700;
          case "700-1500": return d > 700 && d <= 1500;
          case "1500+": return d > 1500;
          default: return true;
        }
      });
    }
    if (filters.amenities?.length) {
      results = results.filter((i) =>
        filters.amenities!.every((a) => i.amenities?.some((ia) => ia.toLowerCase().includes(a.toLowerCase())))
      );
    }
  }

  // Real Estate
  if (filters.intent === "real-estate") {
    if (filters.budgetMin) results = results.filter((i) => (i.price || 0) >= filters.budgetMin!);
    if (filters.budgetMax) results = results.filter((i) => (i.price || Infinity) <= filters.budgetMax!);
    if (filters.bedrooms) results = results.filter((i) => (i.bedrooms || 0) >= filters.bedrooms!);
    if (filters.minSqm) results = results.filter((i) => (i.areaSqm || 0) >= filters.minSqm!);
    if (filters.maxSqm) results = results.filter((i) => (i.areaSqm || Infinity) <= filters.maxSqm!);
    if (filters.features?.length) {
      results = results.filter((i) =>
        filters.features!.every((f) => i.amenities?.some((a) => a.toLowerCase().includes(f.toLowerCase())))
      );
    }
  }

  // Services
  if (filters.intent === "services") {
    if (filters.category) results = results.filter((i) => i.categoryId === filters.category);
    if (filters.subcategory) results = results.filter((i) => i.subcategoryId === filters.subcategory);
    if (filters.budgetMin) results = results.filter((i) => (i.price || 0) >= filters.budgetMin!);
    if (filters.budgetMax) results = results.filter((i) => (i.price || Infinity) <= filters.budgetMax!);
  }

  // Hotels
  if (filters.intent === "hotels") {
    if (filters.stars) results = results.filter((i) => (i.stars || 0) >= filters.stars!);
    if (filters.budgetMin) results = results.filter((i) => (i.price || 0) >= filters.budgetMin!);
    if (filters.budgetMax) results = results.filter((i) => (i.price || Infinity) <= filters.budgetMax!);
  }

  // Blog
  if (filters.intent === "blog") {
    if (filters.blogCategory) results = results.filter((i) => i.blogCategory === filters.blogCategory);
  }

  // Sort
  const sort = filters.sort || "relevance";
  switch (sort) {
    case "price-asc":
      results.sort((a, b) => (a.price || 0) - (b.price || 0));
      break;
    case "price-desc":
      results.sort((a, b) => (b.price || 0) - (a.price || 0));
      break;
    case "beach-distance":
      results.sort((a, b) => (a.beachDistanceM || 99999) - (b.beachDistanceM || 99999));
      break;
    case "date":
      results.sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));
      break;
    case "area":
      results.sort((a, b) => (b.areaSqm || 0) - (a.areaSqm || 0));
      break;
    case "roi":
      results.sort((a, b) => (b.roiPercent || 0) - (a.roiPercent || 0));
      break;
    default:
      // relevance — keep current order (text-match score could improve this)
      break;
  }

  return results;
}

/* ── URL param helpers ───────────────────────────────────── */

export function filtersToParams(f: SearchFilters): URLSearchParams {
  const p = new URLSearchParams();
  p.set("intent", f.intent);
  if (f.q) p.set("q", f.q);
  if (f.location) p.set("location", f.location);
  if (f.checkIn) p.set("checkIn", f.checkIn);
  if (f.checkOut) p.set("checkOut", f.checkOut);
  if (f.guests) p.set("guests", String(f.guests));
  if (f.bedrooms) p.set("bedrooms", String(f.bedrooms));
  if (f.beachDistance) p.set("beachDistance", f.beachDistance);
  if (f.budgetMin) p.set("budgetMin", String(f.budgetMin));
  if (f.budgetMax) p.set("budgetMax", String(f.budgetMax));
  if (f.amenities?.length) p.set("amenities", f.amenities.join(","));
  if (f.mode) p.set("mode", f.mode);
  if (f.propertyTypes?.length) p.set("propertyTypes", f.propertyTypes.join(","));
  if (f.minSqm) p.set("minSqm", String(f.minSqm));
  if (f.maxSqm) p.set("maxSqm", String(f.maxSqm));
  if (f.features?.length) p.set("features", f.features.join(","));
  if (f.category) p.set("category", f.category);
  if (f.subcategory) p.set("subcategory", f.subcategory);
  if (f.stars) p.set("stars", String(f.stars));
  if (f.blogCategory) p.set("blogCategory", f.blogCategory);
  if (f.sort && f.sort !== "relevance") p.set("sort", f.sort);
  return p;
}

export function paramsToFilters(p: URLSearchParams): SearchFilters {
  const intent = (p.get("intent") as SearchIntent) || "vacation";
  return {
    intent,
    q: p.get("q") || undefined,
    location: p.get("location") || undefined,
    checkIn: p.get("checkIn") || undefined,
    checkOut: p.get("checkOut") || undefined,
    guests: p.has("guests") ? Number(p.get("guests")) : undefined,
    bedrooms: p.has("bedrooms") ? Number(p.get("bedrooms")) : undefined,
    beachDistance: p.get("beachDistance") || undefined,
    budgetMin: p.has("budgetMin") ? Number(p.get("budgetMin")) : undefined,
    budgetMax: p.has("budgetMax") ? Number(p.get("budgetMax")) : undefined,
    amenities: p.get("amenities")?.split(",").filter(Boolean) || undefined,
    mode: (p.get("mode") as "buy" | "rent") || undefined,
    propertyTypes: p.get("propertyTypes")?.split(",").filter(Boolean) || undefined,
    minSqm: p.has("minSqm") ? Number(p.get("minSqm")) : undefined,
    maxSqm: p.has("maxSqm") ? Number(p.get("maxSqm")) : undefined,
    features: p.get("features")?.split(",").filter(Boolean) || undefined,
    category: p.get("category") || undefined,
    subcategory: p.get("subcategory") || undefined,
    stars: p.has("stars") ? Number(p.get("stars")) : undefined,
    blogCategory: p.get("blogCategory") || undefined,
    sort: (p.get("sort") as SortOption) || undefined,
  };
}
