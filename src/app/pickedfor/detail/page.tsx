import type { Metadata } from "next";
import { detailListings } from "@/lib/detailMockData";
import Link from "next/link";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const typeEmoji: Record<string, string> = { vacation: '🏖️', hotel: '🏨', 'hotel-room': '🛏️', 'real-estate': '🏠', service: '✨' };

export default function DetailIndex() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold">PickedFor — Detail Page Demos</h1>
        <p className="mb-8 text-sm text-gray-500">Universal detail pages + hotel room flow. Each has branded and no-logo versions.</p>
        <div className="space-y-3">
          {detailListings.map((l) => (
            <div key={l.id} className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="font-semibold">{typeEmoji[l.type] || ''} {l.name}</p>
              <p className="text-sm text-gray-500">{l.type} · {l.listingType} · {l.region}</p>
              <div className="mt-2 flex gap-2">
                <Link href={`/pickedfor/detail/${l.slug}?mode=brand`} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-400 hover:bg-gray-50">
                  🏷️ Branded
                </Link>
                <Link href={`/pickedfor/detail/${l.slug}?mode=nologo`} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-400 hover:bg-gray-50">
                  🔒 No-logo
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
