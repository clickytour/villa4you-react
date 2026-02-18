import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PropertyDetailsCanonicalSections } from "@/components/PropertyDetailsCanonicalSections";
import { getRealEstatePropertyForCanonicalPage } from "@/lib/coreMirrorRealEstateBridge";
import type { DealMode } from "@/lib/coreMirrorPropertyMock";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://staging.villa4you.gr";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const property = getRealEstatePropertyForCanonicalPage(slug);
  if (!property) return { title: "Real estate property | Villa4You" };

  return {
    title: `${property.title} | Villa4You`,
    description: `Explore ${property.title} across vacation, sale, and monthly-rent modes.`,
    alternates: { canonical: `${baseUrl}/property/real-estate/${slug}` },
  };
}

export default async function RealEstatePropertyPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ mode?: string }>;
}) {
  const { slug } = await params;
  const { mode } = await searchParams;
  const property = getRealEstatePropertyForCanonicalPage(slug);
  if (!property) notFound();

  const activeMode = mode === "sale" || mode === "monthly_rent" || mode === "short_term_rent" ? (mode as DealMode) : undefined;

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <PropertyDetailsCanonicalSections property={property} activeMode={activeMode} />
    </div>
  );
}
