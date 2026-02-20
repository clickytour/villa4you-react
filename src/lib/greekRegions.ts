/**
 * Greek regions/islands/cities for PlaceAutocomplete Tier 1.
 * 
 * Presets:
 *  - villa4you: Halkidiki, Mykonos, Crete (Phase 1)
 *  - clickytour: All Greece (Phase 1), worldwide later (remove static list)
 * 
 * placeId values are placeholders — will be populated with real Google Place IDs
 * when Tier 3 (Google API) is connected.
 */

export type PlaceEntry = {
  name: string;
  placeId: string;
  lat: number;
  lng: number;
  type: "region" | "island" | "city" | "area";
  parent?: string;
};

/**
 * Core-compatible location schema.
 * Maps to Core's location fields for seamless mirror DB integration.
 * 
 * Core fields:
 *   address, street, city, state_or_region, postal_code,
 *   latitude, longitude, country,
 *   g_place_id_self, g_place_id_admin2, g_place_id_admin3,
 *   g_place_id_admin4, g_place_id_admin5, g_place_id_country,
 *   g_place_payload
 */
export type CoreLocation = {
  address?: string;
  street?: string;
  city?: string;
  stateOrRegion?: string;
  postalCode?: string;
  latitude: number;
  longitude: number;
  country: string;
  gPlaceIdSelf?: string;       // Place ID of the exact location
  gPlaceIdAdmin2?: string;     // Municipality / admin level 2
  gPlaceIdAdmin3?: string;     // Regional unit / admin level 3
  gPlaceIdAdmin4?: string;     // Region / admin level 4
  gPlaceIdAdmin5?: string;     // Decentralized admin / level 5
  gPlaceIdCountry?: string;    // Country Place ID
  gPlacePayload?: unknown;     // Full Google Places response (cached)
};

/** Result from PlaceAutocomplete selection */
export type PlaceSelection = {
  displayName: string;         // What the user sees ("Santorini" or "Oia, Santorini")
  placeId: string;             // g_place_id_self equivalent
  lat: number;
  lng: number;
  country: string;             // "GR" for Greece
  region?: string;             // state_or_region equivalent
  city?: string;               // city equivalent
  placeType: PlaceEntry["type"];
  tier: 1 | 2 | 3;            // Which tier resolved this
  coreLocation?: CoreLocation; // Full Core-compatible object (from Tier 2/3)
};

/* ── Villa4you Phase 1 regions ── */
const halkidiki: PlaceEntry[] = [
  { name: "Halkidiki", placeId: "halkidiki", lat: 40.06, lng: 23.68, type: "region" },
  { name: "Kassandra, Halkidiki", placeId: "kassandra", lat: 39.96, lng: 23.42, type: "area", parent: "Halkidiki" },
  { name: "Sithonia, Halkidiki", placeId: "sithonia", lat: 40.07, lng: 23.79, type: "area", parent: "Halkidiki" },
  { name: "Athos, Halkidiki", placeId: "athos", lat: 40.16, lng: 24.33, type: "area", parent: "Halkidiki" },
  { name: "Polygyros, Halkidiki", placeId: "polygyros", lat: 40.37, lng: 23.44, type: "area", parent: "Halkidiki" },
  { name: "Nea Moudania, Halkidiki", placeId: "nea-moudania", lat: 40.24, lng: 23.28, type: "area", parent: "Halkidiki" },
  { name: "Pefkochori, Halkidiki", placeId: "pefkochori", lat: 39.97, lng: 23.62, type: "area", parent: "Halkidiki" },
  { name: "Kallithea, Halkidiki", placeId: "kallithea-halkidiki", lat: 39.95, lng: 23.43, type: "area", parent: "Halkidiki" },
  { name: "Afytos, Halkidiki", placeId: "afytos", lat: 40.10, lng: 23.43, type: "area", parent: "Halkidiki" },
  { name: "Nikiti, Halkidiki", placeId: "nikiti", lat: 40.21, lng: 23.67, type: "area", parent: "Halkidiki" },
  { name: "Vourvourou, Halkidiki", placeId: "vourvourou", lat: 40.18, lng: 23.78, type: "area", parent: "Halkidiki" },
  { name: "Neos Marmaras, Halkidiki", placeId: "neos-marmaras", lat: 40.09, lng: 23.77, type: "area", parent: "Halkidiki" },
  { name: "Sarti, Halkidiki", placeId: "sarti", lat: 40.09, lng: 23.97, type: "area", parent: "Halkidiki" },
  { name: "Toroni, Halkidiki", placeId: "toroni", lat: 40.00, lng: 23.90, type: "area", parent: "Halkidiki" },
];

const mykonos: PlaceEntry[] = [
  { name: "Mykonos", placeId: "mykonos", lat: 37.45, lng: 25.33, type: "island" },
  { name: "Mykonos Town", placeId: "mykonos-town", lat: 37.45, lng: 25.33, type: "area", parent: "Mykonos" },
  { name: "Ornos, Mykonos", placeId: "ornos", lat: 37.43, lng: 25.33, type: "area", parent: "Mykonos" },
  { name: "Platis Gialos, Mykonos", placeId: "platis-gialos", lat: 37.42, lng: 25.34, type: "area", parent: "Mykonos" },
  { name: "Elia, Mykonos", placeId: "elia-mykonos", lat: 37.42, lng: 25.37, type: "area", parent: "Mykonos" },
  { name: "Ano Mera, Mykonos", placeId: "ano-mera", lat: 37.46, lng: 25.39, type: "area", parent: "Mykonos" },
  { name: "Agios Ioannis, Mykonos", placeId: "agios-ioannis-mykonos", lat: 37.43, lng: 25.31, type: "area", parent: "Mykonos" },
];

const crete: PlaceEntry[] = [
  { name: "Crete", placeId: "crete", lat: 35.24, lng: 24.90, type: "region" },
  { name: "Heraklion, Crete", placeId: "heraklion", lat: 35.34, lng: 25.13, type: "city", parent: "Crete" },
  { name: "Chania, Crete", placeId: "chania", lat: 35.52, lng: 24.02, type: "city", parent: "Crete" },
  { name: "Rethymno, Crete", placeId: "rethymno", lat: 35.37, lng: 24.47, type: "city", parent: "Crete" },
  { name: "Agios Nikolaos, Crete", placeId: "agios-nikolaos", lat: 35.19, lng: 25.72, type: "city", parent: "Crete" },
  { name: "Elounda, Crete", placeId: "elounda", lat: 35.26, lng: 25.73, type: "area", parent: "Crete" },
  { name: "Hersonissos, Crete", placeId: "hersonissos", lat: 35.31, lng: 25.38, type: "area", parent: "Crete" },
  { name: "Malia, Crete", placeId: "malia", lat: 35.29, lng: 25.46, type: "area", parent: "Crete" },
  { name: "Agia Pelagia, Crete", placeId: "agia-pelagia", lat: 35.40, lng: 25.01, type: "area", parent: "Crete" },
  { name: "Plakias, Crete", placeId: "plakias", lat: 35.18, lng: 24.40, type: "area", parent: "Crete" },
  { name: "Matala, Crete", placeId: "matala", lat: 34.99, lng: 24.75, type: "area", parent: "Crete" },
  { name: "Sitia, Crete", placeId: "sitia", lat: 35.21, lng: 26.10, type: "city", parent: "Crete" },
  { name: "Ierapetra, Crete", placeId: "ierapetra", lat: 35.01, lng: 25.74, type: "city", parent: "Crete" },
  { name: "Kissamos, Crete", placeId: "kissamos", lat: 35.49, lng: 23.66, type: "area", parent: "Crete" },
];

/* ── Additional clickytour regions ── */
const otherGreekRegions: PlaceEntry[] = [
  { name: "Santorini", placeId: "santorini", lat: 36.39, lng: 25.46, type: "island" },
  { name: "Fira, Santorini", placeId: "fira", lat: 36.42, lng: 25.43, type: "area", parent: "Santorini" },
  { name: "Oia, Santorini", placeId: "oia", lat: 36.46, lng: 25.37, type: "area", parent: "Santorini" },
  { name: "Imerovigli, Santorini", placeId: "imerovigli", lat: 36.43, lng: 25.42, type: "area", parent: "Santorini" },
  { name: "Kamari, Santorini", placeId: "kamari", lat: 36.38, lng: 25.49, type: "area", parent: "Santorini" },
  { name: "Athens", placeId: "athens", lat: 37.98, lng: 23.73, type: "city" },
  { name: "Athens Riviera", placeId: "athens-riviera", lat: 37.82, lng: 23.78, type: "area", parent: "Athens" },
  { name: "Glyfada, Athens", placeId: "glyfada", lat: 37.86, lng: 23.75, type: "area", parent: "Athens" },
  { name: "Vouliagmeni, Athens", placeId: "vouliagmeni", lat: 37.81, lng: 23.78, type: "area", parent: "Athens" },
  { name: "Corfu", placeId: "corfu", lat: 39.62, lng: 19.92, type: "island" },
  { name: "Corfu Town", placeId: "corfu-town", lat: 39.62, lng: 19.92, type: "area", parent: "Corfu" },
  { name: "Paleokastritsa, Corfu", placeId: "paleokastritsa", lat: 39.67, lng: 19.75, type: "area", parent: "Corfu" },
  { name: "Rhodes", placeId: "rhodes", lat: 36.43, lng: 28.22, type: "island" },
  { name: "Rhodes Town", placeId: "rhodes-town", lat: 36.44, lng: 28.22, type: "area", parent: "Rhodes" },
  { name: "Lindos, Rhodes", placeId: "lindos", lat: 36.09, lng: 28.09, type: "area", parent: "Rhodes" },
  { name: "Zakynthos", placeId: "zakynthos", lat: 37.79, lng: 20.90, type: "island" },
  { name: "Paros", placeId: "paros", lat: 37.08, lng: 25.15, type: "island" },
  { name: "Naoussa, Paros", placeId: "naoussa-paros", lat: 37.12, lng: 25.24, type: "area", parent: "Paros" },
  { name: "Naxos", placeId: "naxos", lat: 37.10, lng: 25.38, type: "island" },
  { name: "Lefkada", placeId: "lefkada", lat: 38.83, lng: 20.71, type: "island" },
  { name: "Thessaloniki", placeId: "thessaloniki", lat: 40.64, lng: 22.94, type: "city" },
  { name: "Peloponnese", placeId: "peloponnese", lat: 37.50, lng: 22.37, type: "region" },
  { name: "Nafplio, Peloponnese", placeId: "nafplio", lat: 37.57, lng: 22.80, type: "city", parent: "Peloponnese" },
  { name: "Monemvasia, Peloponnese", placeId: "monemvasia", lat: 36.69, lng: 23.05, type: "area", parent: "Peloponnese" },
  { name: "Skiathos", placeId: "skiathos", lat: 39.16, lng: 23.49, type: "island" },
  { name: "Skopelos", placeId: "skopelos", lat: 39.12, lng: 23.73, type: "island" },
  { name: "Kos", placeId: "kos", lat: 36.89, lng: 27.09, type: "island" },
  { name: "Milos", placeId: "milos", lat: 36.74, lng: 24.43, type: "island" },
  { name: "Hydra", placeId: "hydra", lat: 37.35, lng: 23.46, type: "island" },
  { name: "Kefalonia", placeId: "kefalonia", lat: 38.18, lng: 20.57, type: "island" },
  { name: "Ithaca", placeId: "ithaca", lat: 38.37, lng: 20.72, type: "island" },
  { name: "Samos", placeId: "samos", lat: 37.76, lng: 26.97, type: "island" },
  { name: "Lesvos", placeId: "lesvos", lat: 39.10, lng: 26.33, type: "island" },
  { name: "Tinos", placeId: "tinos", lat: 37.54, lng: 25.16, type: "island" },
  { name: "Aegina", placeId: "aegina", lat: 37.75, lng: 23.43, type: "island" },
  { name: "Parga", placeId: "parga", lat: 39.28, lng: 20.40, type: "area" },
  { name: "Pelion", placeId: "pelion", lat: 39.39, lng: 23.05, type: "region" },
  { name: "Volos", placeId: "volos", lat: 39.36, lng: 22.94, type: "city" },
  { name: "Meteora", placeId: "meteora", lat: 39.72, lng: 21.63, type: "area" },
  { name: "Olympus Riviera", placeId: "olympus-riviera", lat: 40.09, lng: 22.59, type: "area" },
];

/* ── Presets ── */
export const VILLA4YOU_REGIONS: PlaceEntry[] = [...halkidiki, ...mykonos, ...crete];
export const CLICKYTOUR_REGIONS: PlaceEntry[] = [...VILLA4YOU_REGIONS, ...otherGreekRegions];

export type Preset = "villa4you" | "clickytour";

export function getRegionsForPreset(preset: Preset): PlaceEntry[] {
  return preset === "villa4you" ? VILLA4YOU_REGIONS : CLICKYTOUR_REGIONS;
}

/**
 * Search regions by text query (Tier 1).
 * Returns top matches sorted by relevance (exact > starts-with > contains).
 */
export function searchRegions(query: string, preset: Preset, limit = 8): PlaceEntry[] {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  const regions = getRegionsForPreset(preset);

  const exact: PlaceEntry[] = [];
  const startsWith: PlaceEntry[] = [];
  const contains: PlaceEntry[] = [];

  for (const r of regions) {
    const n = r.name.toLowerCase();
    if (n === q) exact.push(r);
    else if (n.startsWith(q)) startsWith.push(r);
    else if (n.includes(q)) contains.push(r);
  }

  // Prioritize parent regions over sub-areas
  const prioritize = (arr: PlaceEntry[]) =>
    arr.sort((a, b) => (a.parent ? 1 : 0) - (b.parent ? 1 : 0));

  return [...prioritize(exact), ...prioritize(startsWith), ...prioritize(contains)].slice(0, limit);
}
