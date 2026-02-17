import type { CoreMirrorProperty } from "@/lib/coreMirrorPropertyMock";
import { pickPrimaryCta, sanitizeDealTypes } from "@/lib/coreMirrorAdapters/dealTypeRules";
import type { CanonicalDetailsViewModel } from "@/lib/coreMirrorAdapters/types";

export function toVacationDetailsVM(property: CoreMirrorProperty): CanonicalDetailsViewModel {
  const dealType = sanitizeDealTypes("vacation", ["short_term_rent"]);
  return {
    id: property.id,
    slug: property.slug,
    entityType: "vacation",
    title: property.title,
    subtitle: property.shortDescription,
    description: property.detailDescription,
    dealType,
    primaryImage: property.gallery[0],
    gallery: property.gallery.slice(1),
    tags: property.badges,
    facts: [
      { label: "Guests", value: property.metrics.guests },
      { label: "Bedrooms", value: property.metrics.bedrooms },
      { label: "Bathrooms", value: property.metrics.bathrooms },
      { label: "From", value: `${property.pricing.basicFrom} ${property.pricing.currency}/night` },
    ],
    amenities: property.amenities,
    distances: property.nearby,
    locationLabel: `${property.location.area}, ${property.location.region}, ${property.location.country}`,
    media: {
      videoUrl: property.videoUrl,
      tour3dUrl: property.tour3dUrl,
      contentUrls: property.contentUrls,
    },
    relatedServices: property.nearbyServices.map((s, idx) => ({
      name: s.name,
      detail: s.detail,
      href: s.href,
      image: property.gallery[idx % property.gallery.length],
      ctaLabel: "View service",
    })),
    relatedBlogPosts: property.blogPosts.map((p) => ({
      title: p.title,
      href: p.href,
      date: p.date,
      excerpt: p.excerpt,
      image: p.image,
      ctaLabel: "Read post",
    })),
    cta: {
      primary: pickPrimaryCta(dealType),
      secondary: "Send priority request",
    },
  };
}
