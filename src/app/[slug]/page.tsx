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
import { PartnerServiceProvidersSections } from "@/components/PartnerServiceProvidersSections";
import { ServisApplySections } from "@/components/ServisApplySections";
import { AgentsSections } from "@/components/AgentsSections";
import { AgentsApplySections } from "@/components/AgentsApplySections";
import { AllPagesSections } from "@/components/AllPagesSections";
import { heroPagesBySlug } from "@/lib/landingHeroes";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://staging.villa4you.gr";

const seoBySlug: Record<string, { title: string; description: string }> = {
  agents: {
    title: "For Agents | ClickyTour Partner Ecosystem",
    description: "Join as an agent or tour operator. Access rentals, services, white-label offers, and net pricing tools.",
  },
  "agents-apply": {
    title: "Agents Apply | ClickyTour",
    description: "Submit your agent application in 3 steps and request white-label + net-pricing partnership setup.",
  },
  "partner-pmc": {
    title: "Partner PMC | ClickyTour",
    description: "Explore the PMC partnership path and grow bookings with structured collaboration.",
  },
  "pmc-apply": {
    title: "PMC Apply | ClickyTour",
    description: "Apply as a Property Management Company with a 3-step onboarding form.",
  },
  "partner-service-providers": {
    title: "Service Providers | ClickyTour",
    description: "List and grow as a service provider with structured onboarding and category-based visibility.",
  },
  "service-apply": {
    title: "Service Apply | ClickyTour",
    description: "Submit your service listing in 3 steps with category/subcategory mapping and review flow.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const seo = seoBySlug[slug];

  if (!seo) return {};

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `${baseUrl}/${slug}`,
    },
  };
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

  if (slug === "all-pages") {
    return (
      <div className="min-h-screen bg-[#f3f5f8]">
        <AllPagesSections />
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

  if (slug === "service-apply") {
    return (
      <div className="min-h-screen bg-[#f3f5f8]">
        <ServisApplySections />
      </div>
    );
  }

  if (slug === "agents-apply") {
    return (
      <div className="min-h-screen bg-[#f3f5f8]">
        <AgentsApplySections />
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

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <LandingHero config={page} />
      {slug === "for-guests" && <ForGuestsSections />}
      {slug === "for-owners" && <ForOwnersSections />}
      {slug === "collaborate" && <CollaborateSections />}
      {slug === "about" && <AboutSections />}
      {slug === "vacation-property-management" && <VacationPropertyManagementSections />}
      {slug === "search-results-page-for-guests" && <SearchResultsGuestSections />}
      {slug === "partner-pmc" && <PartnerPmcSections />}
      {slug === "partner-service-providers" && <PartnerServiceProvidersSections />}
      {slug === "agents" && <AgentsSections />}
    </div>
  );
}
