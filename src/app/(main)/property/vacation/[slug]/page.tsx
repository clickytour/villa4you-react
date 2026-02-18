import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CanonicalEntityDetailsSections } from "@/components/CanonicalEntityDetailsSections";
import { toVacationDetailsVM } from "@/lib/coreMirrorAdapters";
import { getCoreMirrorPropertyBySlug } from "@/lib/coreMirrorPropertyMock";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://staging.villa4you.gr";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const property = getCoreMirrorPropertyBySlug(slug);
  if (!property) return { title: "Vacation property details | Villa4You" };

  return {
    title: `${property.title} | Villa4You`,
    description: `Explore ${property.title} details, amenities, and booking options.`,
    alternates: { canonical: `${baseUrl}/property/vacation/${slug}` },
  };
}

export default async function VacationPropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = getCoreMirrorPropertyBySlug(slug);
  if (!property) notFound();

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <CanonicalEntityDetailsSections vm={toVacationDetailsVM(property)} />
    </div>
  );
}
