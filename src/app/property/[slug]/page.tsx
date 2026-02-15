import { notFound } from "next/navigation";
import { PropertyDetailsCanonicalSections } from "@/components/PropertyDetailsCanonicalSections";
import { getCoreMirrorPropertyBySlug } from "@/lib/coreMirrorPropertyMock";

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
