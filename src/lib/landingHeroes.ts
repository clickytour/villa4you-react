export type HeroPageConfig = {
  slug: string;
  route: string;
  badge: string;
  title: string;
  subtitle: string;
  chips: string[];
  ctaPrimary: string;
  ctaSecondary: string;
  ctaTertiary?: string;
  trust: string[];
  heroImage: string;
  sideMode?: "panel" | "image";
  sideImage?: string;
  panelTitle: string;
  panelItems: { label: string; value: string }[];
  panelFooter: string;
};

export const heroPages: HeroPageConfig[] = [
  {
    slug: "homepage-template",
    route: "/",
    badge: "TRUSTED VILLA STAYS & MANAGEMENT · 18+ YEARS",
    title: "Find the perfect villa for your vacations in Greece",
    subtitle:
      "Villa4you connects vetted villas, expert trip planning, and pro property management across Greece. Book via Planyo, manage in Kommo, powered by ClickyTour Core.",
    chips: ["Guests", "Owners", "Collaborate"],
    ctaPrimary: "Find a Villa",
    ctaSecondary: "Plan My Trip",
    trust: ["⭐ 4.8/5 guest reviews", "🏝️ 6+ top destinations", "🔄 seamless Planyo bookings"],
    heroImage:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1800&auto=format&fit=crop",
    sideMode: "panel",
    panelTitle: "Quick Request",
    panelItems: [
      { label: "Destination", value: "Please Select" },
      { label: "Check-in", value: "Please Select" },
      { label: "Check-out", value: "Please Select" },
      { label: "Adults", value: "Please Select" },
      { label: "Children (3–14 age)", value: "Please Select" },
      { label: "Children (0–3 age)", value: "0" },
      { label: "Distance to beach", value: "Please Select" },
      { label: "Distance to infrastructures", value: "Please Select" },
    ],
    panelFooter: "Get a shortlist fast — 60 seconds.",
  },
  {
    slug: "for-guests",
    route: "/for-guests",
    badge: "Home › For Guests",
    title: "Hand-picked villas in Greece + personal trip planning",
    subtitle:
      "Find a verified villa in our top destinations or let our team craft a tailored plan with transfers and activities. Seamless handoff to Planyo for live availability & booking.",
    chips: [],
    ctaPrimary: "Find a Villa",
    ctaSecondary: "Get a Free Trip Plan",
    ctaTertiary: "Hot Offers",
    trust: ["⭐ 4.8/5 guest reviews", "🏝️ Top destinations", "🔄 seamless bookings"],
    heroImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1800&auto=format&fit=crop",
    sideMode: "image",
    sideImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    panelTitle: "",
    panelItems: [],
    panelFooter: "",
  },
  {
    slug: "for-owners",
    route: "/for-owners",
    badge: "Revenue growth for villa owners",
    title: "Turn your villa into a high-performing, low-stress rental business",
    subtitle:
      "From listing optimization to guest communication and calendar strategy, we help owners increase occupancy and improve margins.",
    chips: ["Pricing strategy", "Premium positioning", "Owner transparency"],
    ctaPrimary: "Grow my revenue",
    ctaSecondary: "See owner services",
    trust: ["📈 Performance-led approach", "🧾 Clear reporting", "🤝 Dedicated account support"],
    heroImage:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1800&auto=format&fit=crop",
    panelTitle: "Owner growth framework",
    panelItems: [
      { label: "Market audit", value: "Positioning + competitive pricing" },
      { label: "Listing upgrade", value: "Content, media, conversion UX" },
      { label: "Ongoing optimization", value: "Rates, occupancy, guest quality" },
    ],
    panelFooter: "Built for owners who want professional results.",
  },
  {
    slug: "collaborate",
    route: "/collaborate",
    badge: "Partner network for quality growth",
    title: "Collaborate with Villa4you to unlock more bookings and shared value",
    subtitle:
      "We partner with travel professionals, service providers, and local experts to create better guest experiences and stronger occupancy outcomes.",
    chips: ["Travel partners", "Service ecosystem", "Co-marketing opportunities"],
    ctaPrimary: "Become a partner",
    ctaSecondary: "Explore collaboration models",
    trust: ["🌍 Cross-market exposure", "🔗 Reliable workflows", "💬 Responsive team"],
    heroImage:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1800&auto=format&fit=crop",
    panelTitle: "Partnership collaboration map",
    panelItems: [
      { label: "Discovery call", value: "Align goals and target audiences" },
      { label: "Pilot collaboration", value: "Launch a focused campaign" },
      { label: "Scale together", value: "Expand channels + service scope" },
    ],
    panelFooter: "Partnerships designed for long-term wins.",
  },
  {
    slug: "partner-pmc",
    route: "/partner-pmc",
    badge: "Home › Collaborate › Partner PMC",
    title: "Grow your portfolio and bookings with a structured PMC path",
    subtitle:
      "List your properties for more demand and partner exposure, and sell network inventory to your clients with white-label and net-pricing options.",
    chips: ["PMC growth", "Distribution", "Owner reporting"],
    ctaPrimary: "Apply as PMC",
    ctaSecondary: "Explore collaboration",
    trust: ["📈 Performance-first model", "🤝 Partnership onboarding", "🏝️ Destination-focused growth"],
    heroImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1800&auto=format&fit=crop",
    sideMode: "panel",
    panelTitle: "PMC partnership at a glance",
    panelItems: [
      { label: "Best for", value: "PMCs managing villas or complexes" },
      { label: "Coverage", value: "Single destination or multi-region" },
      { label: "Launch model", value: "Pilot first, then scale" },
    ],
    panelFooter: "Built to improve bookings while keeping operations structured.",
  },
  {
    slug: "about",
    route: "/about",
    badge: "People, standards, and local know-how",
    title: "Meet the team behind memorable villa stays in Greece",
    subtitle:
      "Villa4you combines hospitality expertise, destination insight, and operational excellence to serve both guests and owners.",
    chips: ["18+ years in hospitality", "Guest & owner focus", "Human-first service"],
    ctaPrimary: "Our story",
    ctaSecondary: "Talk to our team",
    trust: ["👥 Experienced advisors", "🏛️ Greek destination knowledge", "✅ High quality standards"],
    heroImage:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1800&auto=format&fit=crop",
    panelTitle: "What defines Villa4you",
    panelItems: [
      { label: "Curated quality", value: "Villas evaluated for consistency" },
      { label: "Operational care", value: "Support before, during, after stay" },
      { label: "Sustainable growth", value: "Balanced value for guests & owners" },
    ],
    panelFooter: "Built on trust, service quality, and local expertise.",
  },
  {
    slug: "search-results-page-for-guests",
    route: "/search-results-page-for-guests",
    badge: "Smarter villa discovery experience",
    title: "Search results that help guests compare villas faster and book better",
    subtitle:
      "Clear filters, meaningful highlights, and destination-focused guidance help guests move from browsing to booking without friction.",
    chips: ["Clear comparison", "Intent-based filters", "Faster decision flow"],
    ctaPrimary: "Preview guest search UX",
    ctaSecondary: "Request UX walkthrough",
    trust: ["⚡ Reduced decision fatigue", "🧭 Better property fit", "📱 Mobile-friendly flow"],
    heroImage:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1800&auto=format&fit=crop",
    panelTitle: "Suggested search-result architecture",
    panelItems: [
      { label: "Top summary bar", value: "Dates, guests, location clarity" },
      { label: "Smart filter rail", value: "Amenities, distance, budget" },
      { label: "Result cards", value: "Photos, social proof, quick actions" },
    ],
    panelFooter: "Optimized to boost confidence and conversion.",
  },
  {
    slug: "vacation-property-management",
    route: "/vacation-property-management",
    badge: "End-to-end vacation rental management",
    title: "Professional vacation property management for owners who want peace of mind",
    subtitle:
      "We handle operations, guest communication, and performance optimization so your property earns more while your workload drops.",
    chips: ["Operations", "Guest experience", "Revenue optimization"],
    ctaPrimary: "Request management plan",
    ctaSecondary: "See management scope",
    trust: ["🛎️ Full service coverage", "📊 Data-driven decisions", "🏡 Asset care mindset"],
    heroImage:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1800&auto=format&fit=crop",
    sideMode: "image",
    sideImage:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1400&auto=format&fit=crop",
    panelTitle: "Management operating model",
    panelItems: [
      { label: "Onboarding", value: "Property readiness + standards" },
      { label: "Daily execution", value: "Bookings, check-ins, guest support" },
      { label: "Performance review", value: "Monthly insights + action plan" },
    ],
    panelFooter: "A system built to protect and grow your asset.",
  },
];

export const heroPagesBySlug = Object.fromEntries(heroPages.map((page) => [page.slug, page]));
