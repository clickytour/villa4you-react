import { notFound } from "next/navigation";
import { CanonicalEntityDetailsSections } from "@/components/CanonicalEntityDetailsSections";
import { toHotelDetailsVM } from "@/lib/coreMirrorAdapters";
import { getCoreMirrorHotelBySlug } from "@/lib/coreMirrorHotelMock";

export default async function HotelVacationModePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hotel = getCoreMirrorHotelBySlug(slug);
  if (!hotel) notFound();

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <CanonicalEntityDetailsSections vm={toHotelDetailsVM(hotel, "short_term_rent")} />
    </div>
  );
}
