import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CanonicalEntityDetailsSections } from "@/components/CanonicalEntityDetailsSections";
import { toHotelRoomDetailsVM } from "@/lib/coreMirrorAdapters";
import { getCoreMirrorHotelRoomBySlug } from "@/lib/coreMirrorHotelRoomMock";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://staging.villa4you.gr";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const room = getCoreMirrorHotelRoomBySlug(slug);
  if (!room) return { title: "Hotel room vacation mode | Villa4You" };

  return {
    title: `${room.title} Vacation Stay | Villa4You`,
    description: `Vacation mode for ${room.title}. Check short-stay booking options and availability.`,
    alternates: { canonical: `${baseUrl}/property/hotel-room/${slug}/vacation` },
  };
}

export default async function HotelRoomVacationModePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = getCoreMirrorHotelRoomBySlug(slug);
  if (!room || !room.dealType.includes("short_term_rent")) notFound();

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <CanonicalEntityDetailsSections vm={toHotelRoomDetailsVM(room, "short_term_rent")} />
    </div>
  );
}
