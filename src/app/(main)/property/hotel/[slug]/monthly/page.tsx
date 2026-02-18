import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CanonicalEntityDetailsSections } from "@/components/CanonicalEntityDetailsSections";
import { toHotelDetailsVM } from "@/lib/coreMirrorAdapters";
import { getCoreMirrorHotelBySlug } from "@/lib/coreMirrorHotelMock";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://staging.villa4you.gr";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const hotel = getCoreMirrorHotelBySlug(slug);
  if (!hotel) return { title: "Hotel monthly mode | Villa4You" };

  return {
    title: `${hotel.title} Monthly Rent | Villa4You`,
    description: `Monthly-rent mode for ${hotel.title}. Explore long-stay terms and inquiry options.`,
    alternates: { canonical: `${baseUrl}/property/hotel/${slug}/monthly` },
  };
}

export default async function HotelMonthlyModePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hotel = getCoreMirrorHotelBySlug(slug);
  if (!hotel || !hotel.dealType.includes("monthly_rent")) notFound();

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <CanonicalEntityDetailsSections vm={toHotelDetailsVM(hotel, "monthly_rent")} />
    </div>
  );
}
