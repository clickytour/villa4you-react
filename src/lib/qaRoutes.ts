import { heroPages } from "@/lib/landingHeroes";

export type QARoute = {
  href: string;
  label: string;
  group: "For Guests" | "For Owners" | "Collaborate" | "Complexes / Template Instances (QA)" | "Company & Utility";
  status: "Pending QA" | "QA Passed";
};

const staticRoutes: QARoute[] = [
  { href: "/", label: "Homepage", group: "Company & Utility", status: "Pending QA" },
  { href: "/support", label: "Support", group: "Company & Utility", status: "Pending QA" },
  { href: "/about", label: "About", group: "Company & Utility", status: "Pending QA" },
  { href: "/blog", label: "Blog", group: "Company & Utility", status: "Pending QA" },
  { href: "/blog/best-coastal-towns-halkidiki", label: "Blog Post (Sample)", group: "Company & Utility", status: "Pending QA" },
  { href: "/services", label: "Services", group: "Company & Utility", status: "Pending QA" },
  { href: "/services/airport-transfer-halkidiki", label: "Service Post (Sample)", group: "Company & Utility", status: "Pending QA" },
  { href: "/my-reservations", label: "My Reservations", group: "Company & Utility", status: "Pending QA" },
  { href: "/all-pages", label: "All Pages (QA)", group: "Company & Utility", status: "Pending QA" },

  { href: "/pmc-apply", label: "PMC Apply", group: "Collaborate", status: "Pending QA" },
  { href: "/service-apply", label: "Service Apply", group: "Collaborate", status: "Pending QA" },
  { href: "/agents-apply", label: "Agents Apply", group: "Collaborate", status: "Pending QA" },

  { href: "/guest-help-faq", label: "Guest Help FAQ", group: "For Guests", status: "Pending QA" },
  { href: "/plans-offers", label: "Plans & Offers", group: "For Guests", status: "Pending QA" },
  { href: "/destinations", label: "Destinations", group: "For Guests", status: "Pending QA" },
  { href: "/explore-map", label: "Explore Map", group: "For Guests", status: "Pending QA" },

  { href: "/free-evaluation", label: "Free Evaluation", group: "For Owners", status: "Pending QA" },

  { href: "/complex-template", label: "Complex Template (Base)", group: "Complexes / Template Instances (QA)", status: "Pending QA" },
  { href: "/luxury-suites-elsa", label: "Luxury Suites Elsa", group: "Complexes / Template Instances (QA)", status: "Pending QA" },
  { href: "/galini-beachfront-masonettes-complex", label: "Galini Beachfront Masonettes", group: "Complexes / Template Instances (QA)", status: "Pending QA" },
  { href: "/olea-suites-apartments-complex", label: "Olea Suites Apartments", group: "Complexes / Template Instances (QA)", status: "Pending QA" },
  { href: "/deluxe-suites-bomo", label: "Deluxe Suites Bomo", group: "Complexes / Template Instances (QA)", status: "Pending QA" },
  { href: "/simonitiko-beachfront-villas-complex", label: "Simonitiko Beachfront Villas", group: "Complexes / Template Instances (QA)", status: "Pending QA" },
  { href: "/tripotsmos-beachfront-complex-a", label: "Tripotsmos Beachfront Complex A", group: "Complexes / Template Instances (QA)", status: "Pending QA" },
  { href: "/tripotamos-beachfront-villas-complex-b", label: "Tripotamos Beachfront Villas B", group: "Complexes / Template Instances (QA)", status: "Pending QA" },
  { href: "/afitos-kassandra-halkidiki", label: "Afitos Kassandra Halkidiki", group: "Complexes / Template Instances (QA)", status: "Pending QA" },
  { href: "/complexes-sani-club-private-villas", label: "Sani Club Private Villas", group: "Complexes / Template Instances (QA)", status: "Pending QA" },

  { href: "/property/villa-glarokavos-sea-view", label: "Canonical Property Details (Core Mirror)", group: "Complexes / Template Instances (QA)", status: "Pending QA" },
  { href: "/property/vacation/villa-glarokavos-sea-view", label: "Canonical Vacation Property (Type Route)", group: "Complexes / Template Instances (QA)", status: "Pending QA" },
  { href: "/property/real-estate/kassandra-investment-villa", label: "Canonical Real Estate Property", group: "Complexes / Template Instances (QA)", status: "Pending QA" },
  { href: "/property/hotel/aegean-boutique-hotel", label: "Canonical Hotel Property", group: "Complexes / Template Instances (QA)", status: "Pending QA" },
  { href: "/property/hotel/aegean-boutique-hotel/vacation", label: "Canonical Hotel Vacation Mode", group: "Complexes / Template Instances (QA)", status: "Pending QA" },
  { href: "/property/hotel/aegean-boutique-hotel/sale", label: "Canonical Hotel Sale Mode", group: "Complexes / Template Instances (QA)", status: "Pending QA" },
  { href: "/property/hotel/aegean-boutique-hotel/monthly", label: "Canonical Hotel Monthly Mode", group: "Complexes / Template Instances (QA)", status: "Pending QA" },
  { href: "/property/hotel-room/aegean-deluxe-suite", label: "Canonical Hotel Room", group: "Complexes / Template Instances (QA)", status: "Pending QA" },
  { href: "/property/hotel-room/aegean-deluxe-suite/vacation", label: "Canonical Hotel Room Vacation Mode", group: "Complexes / Template Instances (QA)", status: "Pending QA" },
  { href: "/property/hotel-room/aegean-deluxe-suite/sale", label: "Canonical Hotel Room Sale Mode", group: "Complexes / Template Instances (QA)", status: "Pending QA" },
  { href: "/property/hotel-room/aegean-deluxe-suite/monthly", label: "Canonical Hotel Room Monthly Mode", group: "Complexes / Template Instances (QA)", status: "Pending QA" },
  { href: "/qa/real-estate-modes/kassandra-investment-villa", label: "Real Estate Mode Previews (Index)", group: "Complexes / Template Instances (QA)", status: "Pending QA" },
  { href: "/qa/real-estate-modes/kassandra-investment-villa/vacation", label: "Real Estate Mode Preview: Vacation", group: "Complexes / Template Instances (QA)", status: "Pending QA" },
  { href: "/qa/real-estate-modes/kassandra-investment-villa/sale", label: "Real Estate Mode Preview: Sale", group: "Complexes / Template Instances (QA)", status: "Pending QA" },
  { href: "/qa/real-estate-modes/kassandra-investment-villa/monthly", label: "Real Estate Mode Preview: Monthly", group: "Complexes / Template Instances (QA)", status: "Pending QA" },
];

const heroDerived: QARoute[] = heroPages
  .filter((h) => h.route !== "/")
  .map((h) => ({
    href: h.route,
    label: h.slug,
    group: h.route.startsWith("/for-guests") || h.route.includes("search-results") || h.route.includes("destinations") || h.route.includes("explore-map")
      ? "For Guests"
      : h.route.startsWith("/for-owners") || h.route.includes("vacation-property-management")
      ? "For Owners"
      : h.route.includes("collaborate") || h.route.includes("partner") || h.route.includes("agents")
      ? "Collaborate"
      : "Company & Utility",
    status: "Pending QA" as const,
  }));

export const qaRoutes: QARoute[] = Array.from(
  new Map([...heroDerived, ...staticRoutes].map((r) => [r.href, r])).values()
);
