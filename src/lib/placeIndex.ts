/**
 * Place Index for villa4you-react — Tier 2 autocomplete.
 * 
 * Villa4you doesn't have Core mirror data yet.
 * Tier 2 here extends Tier 1 static regions with any future DB data.
 * For now, it just re-exports the static greekRegions as suggestions.
 * 
 * When Core mirror is connected, swap to real DB queries.
 */

import { VILLA4YOU_REGIONS, type PlaceEntry } from "@/lib/greekRegions";

export type PlaceSuggestion = {
  label: string;
  area: string;
  region: string;
  country: string;
  placeId?: string;
  lat?: number;
  lng?: number;
  listingCount: number;
};

function norm(s: string): string {
  return s.trim().toLowerCase();
}

function entryToSuggestion(e: PlaceEntry): PlaceSuggestion {
  return {
    label: e.name,
    area: e.parent ?? "",
    region: e.name,
    country: "Greece",
    placeId: e.placeId,
    lat: e.lat,
    lng: e.lng,
    listingCount: 0,
  };
}

let _index: PlaceSuggestion[] | null = null;

export function getPlaceIndex(): PlaceSuggestion[] {
  if (!_index) {
    _index = VILLA4YOU_REGIONS.map(entryToSuggestion);
  }
  return _index;
}

export function invalidatePlaceIndex(): void {
  _index = null;
}

export function suggestPlaces(
  query: string,
  opts?: { country?: string; limit?: number }
): PlaceSuggestion[] {
  const q = norm(query);
  if (!q) return [];

  const limit = opts?.limit ?? 10;
  const index = getPlaceIndex();

  const candidates = opts?.country
    ? index.filter((p) => norm(p.country) === norm(opts.country!))
    : index;

  const scored = candidates.map((p) => {
    const labelLower = norm(p.label);
    const areaLower = norm(p.area);
    const regionLower = norm(p.region);

    let score = 0;
    if (areaLower === q || regionLower === q) score += 100;
    else if (areaLower.startsWith(q) || regionLower.startsWith(q)) score += 80;
    else if (labelLower.startsWith(q)) score += 70;
    else if (labelLower.includes(q)) score += 40;
    else return null;

    return { place: p, score };
  });

  return scored
    .filter(Boolean)
    .sort((a, b) => b!.score - a!.score)
    .slice(0, limit)
    .map((s) => s!.place);
}
