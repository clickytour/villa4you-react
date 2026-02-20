import { NextRequest, NextResponse } from "next/server";
import { suggestPlaces } from "@/lib/placeIndex";

/**
 * GET /api/places/suggest?q=halk&country=Greece&limit=8
 *
 * Tier 2 place autocomplete — queries the Core mirror DB place index.
 * Returns cached/known destinations without hitting Google Places API.
 *
 * When Core mirror is live (Prisma + Vercel Postgres), this will query
 * the actual DB. Currently reads from static mock data via placeIndex.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get("q") ?? "";
  const country = searchParams.get("country") ?? undefined;
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "8", 10), 20);

  if (!q || q.length < 2) {
    return NextResponse.json({ suggestions: [], source: "mirror" });
  }

  const suggestions = suggestPlaces(q, { country, limit });

  return NextResponse.json({
    suggestions: suggestions.map((s) => ({
      label: s.label,
      area: s.area,
      region: s.region,
      country: s.country,
      placeId: s.placeId ?? null,
      lat: s.lat ?? null,
      lng: s.lng ?? null,
      listingCount: s.listingCount,
    })),
    source: "mirror",
    query: q,
  });
}
