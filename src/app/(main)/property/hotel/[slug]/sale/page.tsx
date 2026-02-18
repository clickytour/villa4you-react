import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CanonicalEntityDetailsSections } from "@/components/CanonicalEntityDetailsSections";
import { toHotelDetailsVM } from "@/lib/coreMirrorAdapters";
import { getCoreMirrorHotelBySlug } from "@/lib/coreMirrorHotelMock";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://staging.villa4you.gr";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const hotel = getCoreMirrorHotelBySlug(slug);
  if (!hotel) return { title: "Hotel sale mode | Villa4You" };

  return {
    title: `${hotel.title} For Sale | Villa4You`,
    description: `Sale mode for ${hotel.title}. Review investment-oriented details and contact flow.`,
    alternates: { canonical: `${baseUrl}/property/hotel/${slug}/sale` },
  };
}

export default async function HotelSaleModePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hotel = getCoreMirrorHotelBySlug(slug);
  if (!hotel || !hotel.dealType.includes("sale")) notFound();

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <CanonicalEntityDetailsSections vm={toHotelDetailsVM(hotel, "sale")} />
    </div>
  );
}
