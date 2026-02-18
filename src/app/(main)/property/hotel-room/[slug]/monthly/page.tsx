import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CanonicalEntityDetailsSections } from "@/components/CanonicalEntityDetailsSections";
import { toHotelRoomDetailsVM } from "@/lib/coreMirrorAdapters";
import { getCoreMirrorHotelRoomBySlug } from "@/lib/coreMirrorHotelRoomMock";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://staging.villa4you.gr";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const room = getCoreMirrorHotelRoomBySlug(slug);
  if (!room) return { title: "Hotel room monthly mode | Villa4You" };

  return {
    title: `${room.title} Monthly Rent | Villa4You`,
    description: `Monthly-rent mode for ${room.title}. Review long-stay terms and inquiry path.`,
    alternates: { canonical: `${baseUrl}/property/hotel-room/${slug}/monthly` },
  };
}

export default async function HotelRoomMonthlyModePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = getCoreMirrorHotelRoomBySlug(slug);
  if (!room || !room.dealType.includes("monthly_rent")) notFound();

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <CanonicalEntityDetailsSections vm={toHotelRoomDetailsVM(room, "monthly_rent")} />
    </div>
  );
}
