import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://staging.villa4you.gr";

// Sitemap policy:
// - Include canonical marketing + conversion routes
// - Exclude template-instance/demo routes (property-instance previews) to avoid SEO noise
const routes = [
  "/",
  "/for-guests",
  "/for-owners",
  "/collaborate",
  "/about",
  "/vacation-property-management",
  "/search-results-page-for-guests",
  "/destinations",
  "/explore-map",
  "/partner-pmc",
  "/pmc-apply",
  "/partner-service-providers",
  "/service-apply",
  "/agents",
  "/agents-apply",
  "/free-evaluation",
  "/support",
  "/plans-offers",
  "/guest-help-faq",
  "/blog",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
