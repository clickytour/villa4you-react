import { notFound } from "next/navigation";
import { PropertyDetailsCanonicalSections } from "@/components/PropertyDetailsCanonicalSections";
import { getRealEstatePropertyForCanonicalPage } from "@/lib/coreMirrorRealEstateBridge";

export default async function RealEstateMonthlyModePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = getRealEstatePropertyForCanonicalPage(slug);
  if (!property) notFound();

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <PropertyDetailsCanonicalSections property={property} activeMode="monthly_rent" />
    </div>
  );
}
