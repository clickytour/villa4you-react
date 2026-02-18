import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CanonicalEntityDetailsSections } from "@/components/CanonicalEntityDetailsSections";
import { toHotelRoomDetailsVM } from "@/lib/coreMirrorAdapters";
import { getCoreMirrorHotelRoomBySlug } from "@/lib/coreMirrorHotelRoomMock";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://staging.villa4you.gr";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const room = getCoreMirrorHotelRoomBySlug(slug);
  if (!room) return { title: "Hotel room details | Villa4You" };

  return {
    title: `${room.title} | Villa4You`,
    description: `Explore ${room.title} details, features, and available deal modes.`,
    alternates: { canonical: `${baseUrl}/property/hotel-room/${slug}` },
  };
}

export default async function HotelRoomPropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = getCoreMirrorHotelRoomBySlug(slug);
  if (!room) notFound();

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <CanonicalEntityDetailsSections vm={toHotelRoomDetailsVM(room)} />
    </div>
  );
}
