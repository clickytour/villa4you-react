import { notFound } from "next/navigation";
import { LandingHero } from "@/components/LandingHero";
import { ForGuestsSections } from "@/components/ForGuestsSections";
import { ForOwnersSections } from "@/components/ForOwnersSections";
import { CollaborateSections } from "@/components/CollaborateSections";
import { AboutSections } from "@/components/AboutSections";
import { VacationPropertyManagementSections } from "@/components/VacationPropertyManagementSections";
import { heroPagesBySlug } from "@/lib/landingHeroes";

export default async function HeroPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
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
    </div>
  );
}
