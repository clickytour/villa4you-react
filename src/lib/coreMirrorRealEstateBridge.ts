import type { CoreMirrorProperty } from "@/lib/coreMirrorPropertyMock";
import { getCoreMirrorRealEstateBySlug } from "@/lib/coreMirrorRealEstateMock";

export function getRealEstatePropertyForCanonicalPage(slug: string): CoreMirrorProperty | null {
  const source = getCoreMirrorRealEstateBySlug(slug);
  if (!source) return null;

  return {
    id: source.id,
    slug: source.slug,
    title: source.title,
    headline: source.title,
    shortDescription: source.shortSummary,
    detailDescription: source.description,
    type: "real-estate",
    location: {
      area: source.location.city,
      region: source.location.region,
      country: source.location.country,
      beachDistanceM: Number(source.distances.find((d) => d.label.toLowerCase().includes("beach"))?.value.replace(/[^0-9]/g, "") ?? 0),
      lat: 40.0,
      lng: 23.5,
    },
    highlights: [
      "Real-estate canonical presentation",
      ...source.dealType.map((d) => d.replaceAll("_", " ")),
    ],
    metrics: {
      guests: 0,
      bedrooms: source.metrics.bedrooms,
      bathrooms: source.metrics.bathrooms,
      areaSqm: source.metrics.areaSqm,
    },
    gallery: [source.media.primaryImage, ...source.media.galleryImages],
    pricing: {
      currency: "EUR",
      basicFrom: source.prices.monthlyEur,
      seasonalFrom: source.prices.saleEur,
      seasonName: "Sale",
      minStayNights: 30,
      seasonalRates: [
        { label: "Sale", from: "2026-01-01", to: "2026-12-31", nightly: source.prices.saleEur },
        { label: "Monthly", from: "2026-01-01", to: "2026-12-31", nightly: source.prices.monthlyEur },
      ],
      unavailableDates: [],
    },
    amenities: source.amenities,
    policies: {
      smokingAllowed: false,
      petsAllowed: true,
      cancellationSummary: "Real-estate inquiry workflow based on deal mode.",
      tourismLicense: "N/A",
    },
    nearby: source.distances,
    badges: ["Real Estate", `ROI ${source.prices.roiPercent}%`],
    faqs: [
      {
        q: "Can this property be purchased?",
        a: "Yes, this property supports sale mode in the Core schema.",
      },
      {
        q: "Is monthly rental available?",
        a: "Yes, monthly rental is available for this real-estate item.",
      },
    ],
    related: [
      {
        title: "Aegean Boutique Hotel",
        href: "/property/hotel/aegean-boutique-hotel",
        from: source.prices.monthlyEur,
        image: source.media.primaryImage,
      },
    ],
    planyo: {
      calendarId: "63884",
      resourceId: "221043",
      actionUrl: "/my-reservations",
    },
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tour3dUrl: undefined,
    nearbyServices: [
      { name: "Legal Due Diligence", detail: "Document and ownership review", href: "/services" },
      { name: "Valuation Support", detail: "Comparative market analysis", href: "/services" },
    ],
    blogPosts: [
      {
        title: "How to evaluate ROI for coastal real estate",
        href: "/blog/seasonal-rates-explained",
        date: "2026-02-10",
        excerpt: "Framework for comparing monthly and sale strategies.",
        image: source.media.primaryImage,
      },
    ],
  };
}
