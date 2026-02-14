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
import { PlansOffersSections } from "@/components/PlansOffersSections";
import { GuestHelpFaqSections } from "@/components/GuestHelpFaqSections";
import { DestinationsSections } from "@/components/DestinationsSections";
import { ExploreMapSections } from "@/components/ExploreMapSections";
import { ComplexTemplateSections } from "@/components/ComplexTemplateSections";
import { heroPagesBySlug } from "@/lib/landingHeroes";

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
    </div>
  );
}
