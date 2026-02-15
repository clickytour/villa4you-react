import type { MetadataRoute } from "next";

const baseUrl = "https://villa4you-react.vercel.app";

const routes = [
  "/",
  "/for-guests",
  "/for-owners",
  "/collaborate",
  "/about",
  "/vacation-property-management",
  "/search-results-page-for-guests",
  "/partner-pmc",
  "/pmc-apply",
  "/partner-service-providers",
  "/agents",
  "/agents-apply",
  "/service-apply",
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
