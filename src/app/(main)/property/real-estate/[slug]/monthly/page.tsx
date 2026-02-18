import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PropertyDetailsCanonicalSections } from "@/components/PropertyDetailsCanonicalSections";
import { getRealEstatePropertyForCanonicalPage } from "@/lib/coreMirrorRealEstateBridge";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const property = getRealEstatePropertyForCanonicalPage(slug);
  if (!property) return { title: "Property monthly mode | Villa4You" };
  return {
    title: `${property.title} Monthly Rent | Villa4You`,
    description: `Monthly-rent mode for ${property.title}. Explore terms and long-stay options.`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://staging.villa4you.gr"}/property/real-estate/${slug}/monthly`,
    },
  };
}

export default async function RealEstateMonthlyModeRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = getRealEstatePropertyForCanonicalPage(slug);
  if (!property) notFound();

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <PropertyDetailsCanonicalSections property={property} activeMode="monthly_rent" />
    </div>
  );
}
