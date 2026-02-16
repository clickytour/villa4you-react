import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PropertyDetailsCanonicalSections } from "@/components/PropertyDetailsCanonicalSections";
import { getRealEstatePropertyForCanonicalPage } from "@/lib/coreMirrorRealEstateBridge";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const property = getRealEstatePropertyForCanonicalPage(slug);
  if (!property) return { title: "Property vacation mode | Villa4You" };
  return {
    title: `${property.title} Vacation Rental | Villa4You`,
    description: `Vacation-rental mode for ${property.title}. Check availability and short-stay details.`,
  };
}

export default async function RealEstateVacationModeRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = getRealEstatePropertyForCanonicalPage(slug);
  if (!property) notFound();

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <PropertyDetailsCanonicalSections property={property} activeMode="short_term_rent" />
    </div>
  );
}
