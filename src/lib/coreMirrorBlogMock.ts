export type CoreMirrorBlogPost = {
  slug: string;
  title: string;
  category: "Travel Tips" | "Owners" | "Agents & Partners";
  publishedAt: string;
  excerpt: string;
  coverImage: string;
  content: string[];
  relatedPropertySlug?: string;
};

export const coreMirrorBlogPosts: CoreMirrorBlogPost[] = [
  {
    slug: "best-coastal-towns-halkidiki",
    title: "Best Coastal Towns for Summer in Halkidiki",
    category: "Travel Tips",
    publishedAt: "2026-02-10",
    excerpt: "A practical guide to choosing the right coastal base for your holiday.",
    coverImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
    content: [
      "Halkidiki offers very different micro-destinations: family beaches, lively summer towns, and quieter villa zones.",
      "If your target is sea-view stays with balanced access, Pefkohori and nearby Glarokavos are strong choices.",
      "For longer stays, prioritize easy supermarket and transfer logistics as much as beach distance.",
    ],
    relatedPropertySlug: "villa-glarokavos-sea-view",
  },
  {
    slug: "family-seaside-vacation-checklist",
    title: "Family-Friendly Seaside Vacation Planning Checklist",
    category: "Travel Tips",
    publishedAt: "2026-02-08",
    excerpt: "Everything families should plan before booking a sea-view villa.",
    coverImage:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop",
    content: [
      "Start from room configuration and child-safe amenities before selecting destination aesthetics.",
      "Confirm airport transfer timing and nearest essential services to avoid day-one friction.",
      "Use a simple cost matrix: nightly rate, cleaning fee, transfer budget, and daily extras.",
    ],
  },
  {
    slug: "seasonal-rates-explained",
    title: "How Seasonal Rates Work for Vacation Rentals",
    category: "Owners",
    publishedAt: "2026-02-05",
    excerpt: "Understand high/low season pricing and basic-rate fallback logic.",
    coverImage:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1600&auto=format&fit=crop",
    content: [
      "Core manages seasonal pricing windows, while basic rate acts as fallback when no season matches the selected dates.",
      "This prevents empty pricing states and gives predictable behavior for all booking windows.",
      "For owner reporting, keep seasonal definitions explicit and avoid overlapping date ranges.",
    ],
    relatedPropertySlug: "villa-glarokavos-sea-view",
  },
];

export function getCoreMirrorBlogPostBySlug(slug: string): CoreMirrorBlogPost | null {
  return coreMirrorBlogPosts.find((p) => p.slug === slug) ?? null;
}
