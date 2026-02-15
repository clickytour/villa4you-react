export type CoreMirrorService = {
  slug: string;
  name: string;
  category: string;
  location: string;
  excerpt: string;
  description: string[];
  image: string;
  relatedPropertySlug?: string;
  relatedBlogSlug?: string;
};

export const coreMirrorServices: CoreMirrorService[] = [
  {
    slug: "airport-transfer-halkidiki",
    name: "Airport Transfer Halkidiki",
    category: "Transport",
    location: "Pefkohori / Kassandra",
    excerpt: "Door-to-door transfers from SKG to your villa with fixed pricing.",
    description: [
      "Private transfer scheduling based on arrival/departure times.",
      "Family-friendly options including child seats on request.",
      "Direct drop-off at villa entrance when access allows.",
    ],
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1400&auto=format&fit=crop",
    relatedPropertySlug: "villa-glarokavos-sea-view",
    relatedBlogSlug: "family-seaside-vacation-checklist",
  },
  {
    slug: "private-chef-villa-service",
    name: "Private Chef Villa Service",
    category: "Food & Dining",
    location: "Halkidiki",
    excerpt: "In-villa breakfast and curated Mediterranean dinner menus.",
    description: [
      "Custom menus for families, groups, and dietary restrictions.",
      "Local ingredients and seasonal recipes.",
      "Single-meal and multi-day packages available.",
    ],
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1400&auto=format&fit=crop",
    relatedPropertySlug: "villa-glarokavos-sea-view",
    relatedBlogSlug: "best-coastal-towns-halkidiki",
  },
];

export function getCoreMirrorServiceBySlug(slug: string): CoreMirrorService | null {
  return coreMirrorServices.find((s) => s.slug === slug) ?? null;
}
