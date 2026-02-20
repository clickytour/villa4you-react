import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/places/google?q=santorini&country=Greece&limit=5
 *
 * Tier 3: Google Places Autocomplete fallback.
 * Only called when Tier 1 (static) + Tier 2 (mirror DB) return < 3 results.
 *
 * Uses Google Places API (New) — Autocomplete endpoint.
 * Session-based pricing: ~$0.017 per session (up to 12 requests per session).
 *
 * Requires env: GOOGLE_PLACES_API_KEY
 * If not configured, returns empty suggestions gracefully.
 */

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY ?? "";

// Simple in-memory cache to reduce API calls (TTL: 5 minutes)
const cache = new Map<string, { data: unknown; ts: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000;

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get("q") ?? "";
  const country = searchParams.get("country") ?? undefined;
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "5", 10), 10);

  if (!q || q.length < 2) {
    return NextResponse.json({ suggestions: [], source: "google" });
  }

  if (!GOOGLE_API_KEY) {
    return NextResponse.json(
      { suggestions: [], source: "google", error: "GOOGLE_PLACES_API_KEY not configured" },
      { status: 200 } // graceful — component treats as "no results"
    );
  }

  // Check cache
  const cacheKey = `${q.toLowerCase()}|${country?.toLowerCase() ?? ""}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
    return NextResponse.json(cached.data);
  }

  try {
    // Google Places API (New) — Autocomplete
    const body: Record<string, unknown> = {
      input: q,
      languageCode: "en",
    };

    // Country restriction
    if (country) {
      // Map country name to ISO code for Google API
      const countryMap: Record<string, string> = {
        greece: "gr", gr: "gr",
        italy: "it", it: "it",
        spain: "es", es: "es",
        france: "fr", fr: "fr",
        portugal: "pt", pt: "pt",
        croatia: "hr", hr: "hr",
        turkey: "tr", tr: "tr",
        cyprus: "cy", cy: "cy",
      };
      const cc = countryMap[country.toLowerCase()];
      if (cc) {
        body.includedRegionCodes = [cc];
      }
    }

    // Bias toward regions/localities (not businesses)
    body.includedPrimaryTypes = ["locality", "sublocality", "administrative_area_level_1", "administrative_area_level_2", "island", "neighborhood"];

    const res = await fetch(
      "https://places.googleapis.com/v1/places:autocomplete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": GOOGLE_API_KEY,
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error("[Tier 3] Google Places error:", res.status, errText);
      return NextResponse.json({ suggestions: [], source: "google", error: "Google API error" });
    }

    const data = await res.json();
    const predictions = (data.suggestions ?? []).slice(0, limit);

    const suggestions = predictions.map((pred: { placePrediction?: { placeId?: string; text?: { text?: string }; structuredFormat?: { mainText?: { text?: string }; secondaryText?: { text?: string } } } }) => {
      const p = pred.placePrediction ?? {};
      const mainText = p.structuredFormat?.mainText?.text ?? p.text?.text ?? "";
      const secondary = p.structuredFormat?.secondaryText?.text ?? "";

      return {
        displayName: mainText,
        label: secondary ? `${mainText}, ${secondary}` : mainText,
        area: mainText,
        region: secondary || mainText,
        country: country ?? "",
        placeId: p.placeId ?? null,
        lat: null, // Would need Place Details call for coords (deferred)
        lng: null,
        listingCount: 0,
        tier: 3,
      };
    });

    const response = { suggestions, source: "google", query: q };

    // Cache the result
    cache.set(cacheKey, { data: response, ts: Date.now() });

    // Evict old cache entries (simple cleanup)
    if (cache.size > 500) {
      const now = Date.now();
      for (const [k, v] of cache) {
        if (now - v.ts > CACHE_TTL_MS) cache.delete(k);
      }
    }

    return NextResponse.json(response);
  } catch (err) {
    console.error("[Tier 3] Google Places fetch error:", err);
    return NextResponse.json({ suggestions: [], source: "google", error: "fetch failed" });
  }
}
