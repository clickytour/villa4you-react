import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PropertyDetailsCanonicalSections } from "@/components/PropertyDetailsCanonicalSections";
import { getVacationPropertyForCanonicalPage } from "@/lib/coreMirrorVacationBridge";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const property = getVacationPropertyForCanonicalPage(slug);

  if (!property) {
    return {
      title: "Property details | Villa4You",
      description: "Property details and availability",
    };
  }

  return {
    title: `${property.title} | Villa4You`,
    description: `${property.shortDescription} From ${property.pricing.seasonalFrom} ${property.pricing.currency} per night.`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://staging.villa4you.gr"}/property/${slug}`,
    },
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
  const property = getVacationPropertyForCanonicalPage(slug);

  if (!property) notFound();

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <PropertyDetailsCanonicalSections property={property} />
    </div>
  );
}
