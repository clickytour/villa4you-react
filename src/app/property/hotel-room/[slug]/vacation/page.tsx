import { notFound } from "next/navigation";
import { CanonicalEntityDetailsSections } from "@/components/CanonicalEntityDetailsSections";
import { toHotelRoomDetailsVM } from "@/lib/coreMirrorAdapters";
import { getCoreMirrorHotelRoomBySlug } from "@/lib/coreMirrorHotelRoomMock";

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
