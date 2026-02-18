import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CanonicalEntityDetailsSections } from "@/components/CanonicalEntityDetailsSections";
import { toHotelDetailsVM } from "@/lib/coreMirrorAdapters";
import { getCoreMirrorHotelBySlug } from "@/lib/coreMirrorHotelMock";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://staging.villa4you.gr";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const hotel = getCoreMirrorHotelBySlug(slug);
  if (!hotel) return { title: "Hotel vacation mode | Villa4You" };

  return {
    title: `${hotel.title} Vacation Stay | Villa4You`,
    description: `Vacation mode for ${hotel.title}. Explore room options and short-stay availability.`,
    alternates: { canonical: `${baseUrl}/property/hotel/${slug}/vacation` },
  };
}

export default async function HotelVacationModePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hotel = getCoreMirrorHotelBySlug(slug);
  if (!hotel || !hotel.dealType.includes("short_term_rent")) notFound();

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <CanonicalEntityDetailsSections vm={toHotelDetailsVM(hotel, "short_term_rent")} />
    </div>
  );
}
