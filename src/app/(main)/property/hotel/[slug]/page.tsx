import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CanonicalEntityDetailsSections } from "@/components/CanonicalEntityDetailsSections";
import { toHotelDetailsVM } from "@/lib/coreMirrorAdapters";
import { getCoreMirrorHotelBySlug } from "@/lib/coreMirrorHotelMock";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://staging.villa4you.gr";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const hotel = getCoreMirrorHotelBySlug(slug);
  if (!hotel) return { title: "Hotel details | Villa4You" };

  return {
    title: `${hotel.title} | Villa4You`,
    description: `Discover ${hotel.title} details, amenities, and available deal modes.`,
    alternates: { canonical: `${baseUrl}/property/hotel/${slug}` },
  };
}

export default async function HotelPropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hotel = getCoreMirrorHotelBySlug(slug);
  if (!hotel) notFound();

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <CanonicalEntityDetailsSections vm={toHotelDetailsVM(hotel)} />
    </div>
  );
}
