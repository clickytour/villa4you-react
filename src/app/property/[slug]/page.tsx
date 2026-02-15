import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PropertyDetailsCanonicalSections } from "@/components/PropertyDetailsCanonicalSections";
import { getCoreMirrorPropertyBySlug } from "@/lib/coreMirrorPropertyMock";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const property = getCoreMirrorPropertyBySlug(slug);

  if (!property) {
    return {
      title: "Property details | Villa4You",
      description: "Property details and availability",
    };
  }

  return {
    title: `${property.title} | Villa4You`,
    description: `${property.shortDescription} From ${property.pricing.seasonalFrom} ${property.pricing.currency} per night.`,
    openGraph: {
      title: `${property.title} | Villa4You`,
      description: property.shortDescription,
      images: [property.gallery[0]],
      type: "website",
    },
  };
}

export default async function PropertyDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = getCoreMirrorPropertyBySlug(slug);

  if (!property) notFound();

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <PropertyDetailsCanonicalSections property={property} />
    </div>
  );
}
