import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CanonicalEntityDetailsSections } from "@/components/CanonicalEntityDetailsSections";
import { toHotelRoomDetailsVM } from "@/lib/coreMirrorAdapters";
import { getCoreMirrorHotelRoomBySlug } from "@/lib/coreMirrorHotelRoomMock";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://staging.villa4you.gr";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const room = getCoreMirrorHotelRoomBySlug(slug);
  if (!room) return { title: "Hotel room sale mode | Villa4You" };

  return {
    title: `${room.title} For Sale | Villa4You`,
    description: `Sale mode for ${room.title}. Explore investment details and inquiry flow.`,
    alternates: { canonical: `${baseUrl}/property/hotel-room/${slug}/sale` },
  };
}

export default async function HotelRoomSaleModePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = getCoreMirrorHotelRoomBySlug(slug);
  if (!room || !room.dealType.includes("sale")) notFound();

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <CanonicalEntityDetailsSections vm={toHotelRoomDetailsVM(room, "sale")} />
    </div>
  );
}
