import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingHero } from "@/components/LandingHero";
import { ForGuestsSections } from "@/components/ForGuestsSections";
import { ForOwnersSections } from "@/components/ForOwnersSections";
import { CollaborateSections } from "@/components/CollaborateSections";
import { AboutSections } from "@/components/AboutSections";
import { VacationPropertyManagementSections } from "@/components/VacationPropertyManagementSections";
import { SearchResultsGuestSections } from "@/components/SearchResultsGuestSections";
import { FreeEvaluationSections } from "@/components/FreeEvaluationSections";
import { SupportSections } from "@/components/SupportSections";
import { BlogSections } from "@/components/BlogSections";
import { PmcApplySections } from "@/components/PmcApplySections";
import { PlansOffersSections } from "@/components/PlansOffersSections";
import { GuestHelpFaqSections } from "@/components/GuestHelpFaqSections";
import { DestinationsSections } from "@/components/DestinationsSections";
import { ExploreMapSections } from "@/components/ExploreMapSections";
import { ComplexTemplateSections } from "@/components/ComplexTemplateSections";
import { PartnerPmcSections } from "@/components/PartnerPmcSections";
import { heroPagesBySlug } from "@/lib/landingHeroes";

const seoBySlug: Record<string, Metadata> = {
  "pmc-apply": {
    title: "PMC Application | Partner with Villa4you in Greece",
    description:
      "Submit your Property Management Company application to partner with Villa4you. Share your portfolio, destinations, and operating model for onboarding review.",
    keywords: [
      "PMC application form",
      "property management company onboarding",
      "villa management partner Greece",
      "Villa4you PMC apply",
      "vacation rental management partnership",
    ],
    alternates: { canonical: "/pmc-apply" },
    openGraph: {
      title: "Apply as a Property Management Company Partner | Villa4you",
      description:
        "Complete the PMC onboarding form and get a structured review for distribution, pricing, and growth collaboration.",
      type: "website",
      url: "/pmc-apply",
    },
  },
  "partner-pmc": {
    title: "Partner with Villa4you as a PMC in Greece | Distribution, Pricing & Growth",
    description:
      "Join Villa4you as a Property Management Company partner. Scale bookings with multi-channel distribution, revenue-focused pricing strategy, and owner-ready reporting.",
    keywords: [
      "property management company Greece",
      "PMC partnership",
      "villa distribution channels",
      "vacation rental revenue management",
      "villa portfolio growth",
      "Villa4you collaborate",
    ],
    alternates: { canonical: "/partner-pmc" },
    openGraph: {
      title: "Partner with Villa4you as a Property Management Company",
      description:
        "A growth-focused PMC partnership model for Greek destinations: better occupancy, stronger pricing, and operational clarity.",
      type: "website",
      url: "/partner-pmc",
    },
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return seoBySlug[slug] ?? {};
}

export default async function HeroPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "free-evaluation") {
    return (
      <div className="min-h-screen bg-[#f3f5f8]">
        <FreeEvaluationSections />
      </div>
    );
  }

  if (slug === "support") {
    return (
      <div className="min-h-screen bg-[#f3f5f8]">
        <SupportSections />
      </div>
    );
  }

  if (slug === "blog") {
    return (
      <div className="min-h-screen bg-[#f3f5f8]">
        <BlogSections />
      </div>
    );
  }

  if (slug === "plans-offers") {
    return (
      <div className="min-h-screen bg-[#f3f5f8]">
        <PlansOffersSections />
      </div>
    );
  }

  if (slug === "guest-help-faq") {
    return (
      <div className="min-h-screen bg-[#f3f5f8]">
        <GuestHelpFaqSections />
      </div>
    );
  }

  if (slug === "pmc-apply") {
    return (
      <div className="min-h-screen bg-[#f3f5f8]">
        <PmcApplySections />
      </div>
    );
  }

  if (slug === "destinations") {
    return (
      <div className="min-h-screen bg-[#f3f5f8]">
        <DestinationsSections />
      </div>
    );
  }

  if (slug === "explore-map") {
    return (
      <div className="min-h-screen bg-[#f3f5f8]">
        <ExploreMapSections />
      </div>
    );
  }

  if (slug === "complex-template") {
    return (
      <div className="min-h-screen bg-[#f3f5f8]">
        <ComplexTemplateSections />
      </div>
    );
  }

  if (slug === "luxury-suites-elsa") {
    return (
      <div className="min-h-screen bg-[#f3f5f8]">
        <ComplexTemplateSections variant="luxury-elsa" />
      </div>
    );
  }

  if (slug === "galini-beachfront-masonettes-complex") {
    return (
      <div className="min-h-screen bg-[#f3f5f8]">
        <ComplexTemplateSections variant="galini-beachfront" />
      </div>
    );
  }

  if (slug === "olea-suites-apartments-complex") {
    return (
      <div className="min-h-screen bg-[#f3f5f8]">
        <ComplexTemplateSections variant="olea-suites" />
      </div>
    );
  }

  if (slug === "deluxe-suites-bomo") {
    return (
      <div className="min-h-screen bg-[#f3f5f8]">
        <ComplexTemplateSections variant="deluxe-suites-bomo" />
      </div>
    );
  }

  if (slug === "simonitiko-beachfront-villas-complex") {
    return (
      <div className="min-h-screen bg-[#f3f5f8]">
        <ComplexTemplateSections variant="simonitiko-beachfront-villas" />
      </div>
    );
  }

  if (slug === "tripotsmos-beachfront-complex-a") {
    return (
      <div className="min-h-screen bg-[#f3f5f8]">
        <ComplexTemplateSections variant="tripotsmos-beachfront-a" />
      </div>
    );
  }

  if (slug === "tripotamos-beachfront-villas-complex-b") {
    return (
      <div className="min-h-screen bg-[#f3f5f8]">
        <ComplexTemplateSections variant="tripotamos-beachfront-b" />
      </div>
    );
  }

  if (slug === "afitos-kassandra-halkidiki") {
    return (
      <div className="min-h-screen bg-[#f3f5f8]">
        <ComplexTemplateSections variant="afitos-kassandra-halkidiki" />
      </div>
    );
  }

  if (slug === "complexes-sani-club-private-villas") {
    return (
      <div className="min-h-screen bg-[#f3f5f8]">
        <ComplexTemplateSections variant="complexes-sani-club-private-villas" />
      </div>
    );
  }

  const page = heroPagesBySlug[slug];

  if (!page) {
    notFound();
  }

  const pmcApplySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "PMC Application",
    url: "/pmc-apply",
    description:
      "Apply as a Property Management Company partner with Villa4you by submitting your portfolio, coverage, and operating model.",
    potentialAction: {
      "@type": "ApplyAction",
      name: "Submit PMC Application",
      target: "/pmc-apply",
    },
  };

  const partnerPmcFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is this partnership ideal for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PMCs managing villas or complexes that want stronger occupancy, clearer owner reporting, and scalable distribution workflows.",
        },
      },
      {
        "@type": "Question",
        name: "Do you support one destination only or multi-region PMCs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Both. Many PMCs start with one region and expand after the pilot phase proves conversion and operational fit.",
        },
      },
      {
        "@type": "Question",
        name: "What is required to start?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A short company profile, portfolio scope, service regions, and your preferred operating model. We then run a structured onboarding review.",
        },
      },
      {
        "@type": "Question",
        name: "How fast can we go live?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Typical timeline is 7–21 days depending on portfolio readiness, media quality, and selected collaboration scope.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      {slug === "pmc-apply" && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pmcApplySchema) }} />
      )}
      {slug === "partner-pmc" && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(partnerPmcFaqSchema) }} />
      )}
      <LandingHero config={page} />
      {slug === "for-guests" && <ForGuestsSections />}
      {slug === "for-owners" && <ForOwnersSections />}
      {slug === "collaborate" && <CollaborateSections />}
      {slug === "about" && <AboutSections />}
      {slug === "vacation-property-management" && <VacationPropertyManagementSections />}
      {slug === "search-results-page-for-guests" && <SearchResultsGuestSections />}
      {slug === "partner-pmc" && <PartnerPmcSections />}
    </div>
  );
}
