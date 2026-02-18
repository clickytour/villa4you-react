"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  INTENTS,
  getAllSearchItems,
  filterAndSort,
  filtersToParams,
  paramsToFilters,
  type SearchIntent,
  type SearchFilters,
  type SearchResultItem,
  type SortOption,
} from "@/lib/searchHubEngine";
import { serviceTaxonomy } from "@/lib/serviceTaxonomy";

/* ── Basket types ─────────────────────────────────────────── */

export type BasketItem = {
  id: string;
  intent: SearchIntent;
  title: string;
  image?: string;
  price?: number;
  priceLabel?: string;
  href: string;
};

function loadBasket(): BasketItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("v4y_basket") || "[]");
  } catch {
    return [];
  }
}

function saveBasket(items: BasketItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("v4y_basket", JSON.stringify(items));
}

/* ── Intent badges ────────────────────────────────────────── */

const INTENT_COLORS: Record<SearchIntent, string> = {
  vacation: "bg-sky-100 text-sky-700",
  "real-estate": "bg-emerald-100 text-emerald-700",
  services: "bg-amber-100 text-amber-700",
  hotels: "bg-violet-100 text-violet-700",
  blog: "bg-rose-100 text-rose-700",
};

/* ── Beach distance options ───────────────────────────────── */
const BEACH_BRACKETS = [
  { value: "", label: "Any" },
  { value: "0-300", label: "0–300m" },
  { value: "300-700", label: "300–700m" },
  { value: "700-1500", label: "700–1500m" },
  { value: "1500+", label: "1500m+" },
];

const AMENITY_OPTIONS = ["Pool", "Sea View", "Parking", "Wi-Fi", "A/C", "BBQ", "Pet-friendly"];
const FEATURE_OPTIONS = ["Sea View", "Pool", "Parking", "Garden", "New Build", "Renovated"];
const PROPERTY_TYPES = ["Villa", "House", "Apartment", "Land", "Commercial"];
const BLOG_CATEGORIES = ["Travel Tips", "Owners", "Agents & Partners"];
const BEDROOM_OPTIONS = [
  { value: 0, label: "Any" },
  { value: 1, label: "1+" },
  { value: 2, label: "2+" },
  { value: 3, label: "3+" },
  { value: 4, label: "4+" },
];

const SORT_OPTIONS: Record<SearchIntent, { value: SortOption; label: string }[]> = {
  vacation: [
    { value: "relevance", label: "Relevance" },
    { value: "price-asc", label: "Price ↑" },
    { value: "price-desc", label: "Price ↓" },
    { value: "beach-distance", label: "Beach distance" },
  ],
  "real-estate": [
    { value: "relevance", label: "Relevance" },
    { value: "price-asc", label: "Price ↑" },
    { value: "price-desc", label: "Price ↓" },
    { value: "area", label: "Area (largest)" },
    { value: "roi", label: "ROI %" },
  ],
  services: [
    { value: "relevance", label: "Relevance" },
    { value: "price-asc", label: "Price ↑" },
    { value: "price-desc", label: "Price ↓" },
  ],
  hotels: [
    { value: "relevance", label: "Relevance" },
    { value: "price-asc", label: "Price ↑" },
    { value: "price-desc", label: "Price ↓" },
  ],
  blog: [
    { value: "relevance", label: "Relevance" },
    { value: "date", label: "Newest" },
  ],
};

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════ */

export function SearchHub() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // All items (static, computed once)
  const allItems = useMemo(() => getAllSearchItems(), []);

  // Parse URL → filters
  const initialFilters = useMemo(() => paramsToFilters(searchParams), [searchParams]);
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [basketOpen, setBasketOpen] = useState(false);

  // Load basket from localStorage
  useEffect(() => { setBasket(loadBasket()); }, []);

  // Sync filters → URL
  const syncUrl = useCallback(
    (f: SearchFilters) => {
      const p = filtersToParams(f);
      router.replace(`/search?${p.toString()}`, { scroll: false });
    },
    [router]
  );

  const updateFilters = useCallback(
    (patch: Partial<SearchFilters>) => {
      setFilters((prev) => {
        const next = { ...prev, ...patch };
        syncUrl(next);
        return next;
      });
    },
    [syncUrl]
  );

  const setIntent = useCallback(
    (intent: SearchIntent) => {
      // Reset intent-specific filters when switching
      const base: SearchFilters = { intent, q: filters.q, location: filters.location, sort: "relevance" };
      setFilters(base);
      syncUrl(base);
    },
    [filters.q, filters.location, syncUrl]
  );

  // Filter results
  const results = useMemo(() => filterAndSort(allItems, filters), [allItems, filters]);

  // Active filter chips
  const activeChips = useMemo(() => {
    const chips: { key: string; label: string }[] = [];
    if (filters.q) chips.push({ key: "q", label: `"${filters.q}"` });
    if (filters.location) chips.push({ key: "location", label: `📍 ${filters.location}` });
    if (filters.bedrooms) chips.push({ key: "bedrooms", label: `${filters.bedrooms}+ beds` });
    if (filters.guests) chips.push({ key: "guests", label: `${filters.guests}+ guests` });
    if (filters.beachDistance) chips.push({ key: "beachDistance", label: `Beach: ${filters.beachDistance}m` });
    if (filters.budgetMin) chips.push({ key: "budgetMin", label: `Min €${filters.budgetMin}` });
    if (filters.budgetMax) chips.push({ key: "budgetMax", label: `Max €${filters.budgetMax}` });
    if (filters.category) {
      const cat = serviceTaxonomy.find((c) => c.id === filters.category);
      chips.push({ key: "category", label: cat?.name || filters.category });
    }
    if (filters.subcategory) chips.push({ key: "subcategory", label: filters.subcategory });
    if (filters.stars) chips.push({ key: "stars", label: `${filters.stars}+ ★` });
    if (filters.blogCategory) chips.push({ key: "blogCategory", label: filters.blogCategory });
    if (filters.mode) chips.push({ key: "mode", label: filters.mode === "buy" ? "Buy" : "Rent" });
    if (filters.amenities?.length) filters.amenities.forEach((a) => chips.push({ key: `amenity-${a}`, label: a }));
    if (filters.features?.length) filters.features.forEach((f) => chips.push({ key: `feature-${f}`, label: f }));
    return chips;
  }, [filters]);

  const removeChip = useCallback(
    (key: string) => {
      if (key === "q") updateFilters({ q: undefined });
      else if (key === "location") updateFilters({ location: undefined });
      else if (key === "bedrooms") updateFilters({ bedrooms: undefined });
      else if (key === "guests") updateFilters({ guests: undefined });
      else if (key === "beachDistance") updateFilters({ beachDistance: undefined });
      else if (key === "budgetMin") updateFilters({ budgetMin: undefined });
      else if (key === "budgetMax") updateFilters({ budgetMax: undefined });
      else if (key === "category") updateFilters({ category: undefined, subcategory: undefined });
      else if (key === "subcategory") updateFilters({ subcategory: undefined });
      else if (key === "stars") updateFilters({ stars: undefined });
      else if (key === "blogCategory") updateFilters({ blogCategory: undefined });
      else if (key === "mode") updateFilters({ mode: undefined });
      else if (key.startsWith("amenity-")) {
        const a = key.replace("amenity-", "");
        updateFilters({ amenities: filters.amenities?.filter((x) => x !== a) });
      } else if (key.startsWith("feature-")) {
        const f = key.replace("feature-", "");
        updateFilters({ features: filters.features?.filter((x) => x !== f) });
      }
    },
    [filters, updateFilters]
  );

  // Basket actions
  const addToBasket = useCallback((item: SearchResultItem) => {
    setBasket((prev) => {
      if (prev.some((b) => b.id === item.id)) return prev;
      const next = [...prev, { id: item.id, intent: item.intent, title: item.title, image: item.image, price: item.price, priceLabel: item.priceLabel, href: item.href }];
      saveBasket(next);
      return next;
    });
  }, []);

  const removeFromBasket = useCallback((id: string) => {
    setBasket((prev) => {
      const next = prev.filter((b) => b.id !== id);
      saveBasket(next);
      return next;
    });
  }, []);

  const isInBasket = useCallback((id: string) => basket.some((b) => b.id === id), [basket]);

  // Subcategories for selected category
  const subcategories = useMemo(() => {
    if (!filters.category) return [];
    const cat = serviceTaxonomy.find((c) => c.id === filters.category);
    return cat?.subcategories || [];
  }, [filters.category]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Search Hub</h1>
          <p className="text-blue-200 text-sm">Discover vacation rentals, real estate, services, hotels & guides — all in one place.</p>
        </div>
      </div>

      {/* Intent Tabs */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex overflow-x-auto">
          {INTENTS.map((intent) => (
            <button
              key={intent.id}
              onClick={() => setIntent(intent.id)}
              className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                filters.intent === intent.id
                  ? "border-blue-600 text-blue-700 bg-blue-50/50"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span>{intent.icon}</span>
              <span>{intent.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* ── Filter Sidebar ─────────────────────────── */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-5">
              <h2 className="font-semibold text-slate-800 text-sm uppercase tracking-wide">Filters</h2>

              {/* Search */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Search</label>
                <input
                  type="text"
                  value={filters.q || ""}
                  onChange={(e) => updateFilters({ q: e.target.value || undefined })}
                  placeholder="Search..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Location (all intents) */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Location</label>
                <input
                  type="text"
                  value={filters.location || ""}
                  onChange={(e) => updateFilters({ location: e.target.value || undefined })}
                  placeholder="e.g. Halkidiki"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* ── VACATION FILTERS ── */}
              {filters.intent === "vacation" && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Check-in</label>
                      <input type="date" value={filters.checkIn || ""} onChange={(e) => updateFilters({ checkIn: e.target.value || undefined })} className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Check-out</label>
                      <input type="date" value={filters.checkOut || ""} onChange={(e) => updateFilters({ checkOut: e.target.value || undefined })} className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Guests</label>
                      <input type="number" min={0} value={filters.guests || ""} onChange={(e) => updateFilters({ guests: e.target.value ? Number(e.target.value) : undefined })} placeholder="Any" className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Bedrooms</label>
                      <select value={filters.bedrooms || 0} onChange={(e) => updateFilters({ bedrooms: Number(e.target.value) || undefined })} className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-sm">
                        {BEDROOM_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Beach distance</label>
                    <select value={filters.beachDistance || ""} onChange={(e) => updateFilters({ beachDistance: e.target.value || undefined })} className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-sm">
                      {BEACH_BRACKETS.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Budget min €</label>
                      <input type="number" min={0} value={filters.budgetMin || ""} onChange={(e) => updateFilters({ budgetMin: e.target.value ? Number(e.target.value) : undefined })} placeholder="0" className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Budget max €</label>
                      <input type="number" min={0} value={filters.budgetMax || ""} onChange={(e) => updateFilters({ budgetMax: e.target.value ? Number(e.target.value) : undefined })} placeholder="Any" className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Amenities</label>
                    <div className="flex flex-wrap gap-2">
                      {AMENITY_OPTIONS.map((a) => {
                        const active = filters.amenities?.includes(a);
                        return (
                          <button key={a} onClick={() => {
                            const curr = filters.amenities || [];
                            updateFilters({ amenities: active ? curr.filter((x) => x !== a) : [...curr, a] });
                          }} className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${active ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                            {a}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {/* ── REAL ESTATE FILTERS ── */}
              {filters.intent === "real-estate" && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Mode</label>
                    <div className="flex gap-2">
                      {(["buy", "rent"] as const).map((m) => (
                        <button key={m} onClick={() => updateFilters({ mode: filters.mode === m ? undefined : m })} className={`flex-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filters.mode === m ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                          {m === "buy" ? "Buy" : "Rent"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Property type</label>
                    <div className="flex flex-wrap gap-2">
                      {PROPERTY_TYPES.map((t) => {
                        const active = filters.propertyTypes?.includes(t);
                        return (
                          <button key={t} onClick={() => {
                            const curr = filters.propertyTypes || [];
                            updateFilters({ propertyTypes: active ? curr.filter((x) => x !== t) : [...curr, t] });
                          }} className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${active ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Bedrooms</label>
                    <select value={filters.bedrooms || 0} onChange={(e) => updateFilters({ bedrooms: Number(e.target.value) || undefined })} className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-sm">
                      {BEDROOM_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Min sqm</label>
                      <input type="number" min={0} value={filters.minSqm || ""} onChange={(e) => updateFilters({ minSqm: e.target.value ? Number(e.target.value) : undefined })} className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Max sqm</label>
                      <input type="number" min={0} value={filters.maxSqm || ""} onChange={(e) => updateFilters({ maxSqm: e.target.value ? Number(e.target.value) : undefined })} className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Budget min €</label>
                      <input type="number" min={0} value={filters.budgetMin || ""} onChange={(e) => updateFilters({ budgetMin: e.target.value ? Number(e.target.value) : undefined })} className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Budget max €</label>
                      <input type="number" min={0} value={filters.budgetMax || ""} onChange={(e) => updateFilters({ budgetMax: e.target.value ? Number(e.target.value) : undefined })} className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Features</label>
                    <div className="flex flex-wrap gap-2">
                      {FEATURE_OPTIONS.map((f) => {
                        const active = filters.features?.includes(f);
                        return (
                          <button key={f} onClick={() => {
                            const curr = filters.features || [];
                            updateFilters({ features: active ? curr.filter((x) => x !== f) : [...curr, f] });
                          }} className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${active ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                            {f}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {/* ── SERVICES FILTERS ── */}
              {filters.intent === "services" && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Category</label>
                    <select
                      value={filters.category || ""}
                      onChange={(e) => updateFilters({ category: e.target.value || undefined, subcategory: undefined })}
                      className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-sm"
                    >
                      <option value="">All categories</option>
                      {serviceTaxonomy.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  {subcategories.length > 0 && (
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Subcategory</label>
                      <select
                        value={filters.subcategory || ""}
                        onChange={(e) => updateFilters({ subcategory: e.target.value || undefined })}
                        className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-sm"
                      >
                        <option value="">All subcategories</option>
                        {subcategories.map((s) => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Budget min €</label>
                      <input type="number" min={0} value={filters.budgetMin || ""} onChange={(e) => updateFilters({ budgetMin: e.target.value ? Number(e.target.value) : undefined })} className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Budget max €</label>
                      <input type="number" min={0} value={filters.budgetMax || ""} onChange={(e) => updateFilters({ budgetMax: e.target.value ? Number(e.target.value) : undefined })} className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-sm" />
                    </div>
                  </div>
                </>
              )}

              {/* ── HOTELS FILTERS ── */}
              {filters.intent === "hotels" && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Check-in</label>
                      <input type="date" value={filters.checkIn || ""} onChange={(e) => updateFilters({ checkIn: e.target.value || undefined })} className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Check-out</label>
                      <input type="date" value={filters.checkOut || ""} onChange={(e) => updateFilters({ checkOut: e.target.value || undefined })} className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Guests</label>
                    <input type="number" min={0} value={filters.guests || ""} onChange={(e) => updateFilters({ guests: e.target.value ? Number(e.target.value) : undefined })} placeholder="Any" className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Stars (min)</label>
                    <select value={filters.stars || 0} onChange={(e) => updateFilters({ stars: Number(e.target.value) || undefined })} className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-sm">
                      <option value={0}>Any</option>
                      {[1, 2, 3, 4, 5].map((s) => <option key={s} value={s}>{s}+ ★</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Budget min €</label>
                      <input type="number" min={0} value={filters.budgetMin || ""} onChange={(e) => updateFilters({ budgetMin: e.target.value ? Number(e.target.value) : undefined })} className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Budget max €</label>
                      <input type="number" min={0} value={filters.budgetMax || ""} onChange={(e) => updateFilters({ budgetMax: e.target.value ? Number(e.target.value) : undefined })} className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-sm" />
                    </div>
                  </div>
                </>
              )}

              {/* ── BLOG FILTERS ── */}
              {filters.intent === "blog" && (
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Category</label>
                  <select value={filters.blogCategory || ""} onChange={(e) => updateFilters({ blogCategory: e.target.value || undefined })} className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-sm">
                    <option value="">All categories</option>
                    {BLOG_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              )}
            </div>
          </aside>

          {/* ── Results Area ──────────────────────────── */}
          <main className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="text-sm text-slate-500">
                <span className="font-semibold text-slate-800">{results.length}</span> result{results.length !== 1 ? "s" : ""}
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={filters.sort || "relevance"}
                  onChange={(e) => updateFilters({ sort: e.target.value as SortOption })}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm bg-white"
                >
                  {(SORT_OPTIONS[filters.intent] || SORT_OPTIONS.vacation).map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <div className="flex bg-slate-100 rounded-lg p-0.5">
                  <button onClick={() => setViewMode("grid")} className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${viewMode === "grid" ? "bg-white shadow-sm text-slate-800" : "text-slate-500"}`}>
                    ▦ Grid
                  </button>
                  <button onClick={() => setViewMode("list")} className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${viewMode === "list" ? "bg-white shadow-sm text-slate-800" : "text-slate-500"}`}>
                    ☰ List
                  </button>
                </div>
              </div>
            </div>

            {/* Active filter chips */}
            {activeChips.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {activeChips.map((chip) => (
                  <button
                    key={chip.key}
                    onClick={() => removeChip(chip.key)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-100 transition-colors"
                  >
                    {chip.label}
                    <span className="text-blue-400">✕</span>
                  </button>
                ))}
                <button
                  onClick={() => {
                    const base: SearchFilters = { intent: filters.intent };
                    setFilters(base);
                    syncUrl(base);
                  }}
                  className="text-xs text-slate-400 hover:text-slate-600 underline"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Results */}
            {results.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-4xl mb-3">🔍</div>
                <h3 className="font-semibold text-slate-700 text-lg mb-1">No results found</h3>
                <p className="text-slate-400 text-sm">Try adjusting your filters or switching intent.</p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {results.map((item) => (
                  <ResultCard key={item.id} item={item} isInBasket={isInBasket(item.id)} onAdd={() => addToBasket(item)} onRemove={() => removeFromBasket(item.id)} />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {results.map((item) => (
                  <ResultListRow key={item.id} item={item} isInBasket={isInBasket(item.id)} onAdd={() => addToBasket(item)} onRemove={() => removeFromBasket(item.id)} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ── Request Basket ────────────────────────────── */}
      {basket.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          {basketOpen && (
            <div className="bg-white border-t border-slate-200 shadow-2xl max-h-[50vh] overflow-y-auto">
              <div className="max-w-5xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-slate-800">Your Request Basket</h3>
                  <button onClick={() => setBasketOpen(false)} className="text-slate-400 hover:text-slate-600 text-sm">✕ Close</button>
                </div>
                <div className="space-y-2">
                  {basket.map((b) => (
                    <div key={b.id} className="flex items-center gap-3 bg-slate-50 rounded-lg p-3">
                      {b.image && (
                        <img src={b.image} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${INTENT_COLORS[b.intent]}`}>
                            {b.intent}
                          </span>
                          <span className="text-sm font-medium text-slate-800 truncate">{b.title}</span>
                        </div>
                        {b.priceLabel && <div className="text-xs text-slate-500">{b.priceLabel}</div>}
                      </div>
                      <button onClick={() => removeFromBasket(b.id)} className="text-slate-400 hover:text-red-500 text-sm flex-shrink-0">✕</button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <a
                    href={`/proposal/search-hub-${Date.now().toString(36)}`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
                  >
                    Get Proposal →
                  </a>
                </div>
              </div>
            </div>
          )}
          <div
            className="bg-blue-700 text-white px-4 py-3 cursor-pointer"
            onClick={() => setBasketOpen(!basketOpen)}
          >
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg">🛒</span>
                <span className="font-medium text-sm">{basket.length} item{basket.length !== 1 ? "s" : ""} in your request</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-blue-200 text-sm">{basketOpen ? "▾ Collapse" : "▴ Expand"}</span>
                <a
                  href={`/proposal/search-hub-${Date.now().toString(36)}`}
                  className="px-4 py-1.5 bg-white text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  Get Proposal
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Photo Carousel (matches ListingCard style) ─────────── */

function SearchPhotoCarousel({ photos, alt, className }: { photos: string[]; alt: string; className?: string }) {
  const [idx, setIdx] = useState(0);
  const imgs = photos.length > 0 ? photos : [];
  if (imgs.length === 0) return null;
  const prev = () => setIdx((i) => (i === 0 ? imgs.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === imgs.length - 1 ? 0 : i + 1));

  return (
    <div className={`group/carousel relative overflow-hidden ${className ?? ""}`}>
      <img src={imgs[idx]} alt={alt} className="h-full w-full object-cover transition-opacity duration-300" />
      {imgs.length > 1 && (
        <>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); prev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 opacity-0 shadow-md transition-opacity group-hover/carousel:opacity-100"
            aria-label="Previous photo"
          >
            <svg className="h-4 w-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); next(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 opacity-0 shadow-md transition-opacity group-hover/carousel:opacity-100"
            aria-label="Next photo"
          >
            <svg className="h-4 w-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {imgs.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIdx(i); }}
                className={`h-1.5 rounded-full transition-all ${i === idx ? "w-4 bg-white" : "w-1.5 bg-white/60"}`}
                aria-label={`Photo ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function availabilityBadge(status?: SearchResultItem["availability"]) {
  if (status === "unavailable") {
    return <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700"><span className="h-1.5 w-1.5 rounded-full bg-red-500" />No longer available</span>;
  }
  if (status === "new") {
    return <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700"><span className="h-1.5 w-1.5 rounded-full bg-blue-500" />New Match</span>;
  }
  return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Available</span>;
}

function SearchStarRating({ rating, reviewCount }: { rating?: number; reviewCount?: number }) {
  if (!rating) return null;
  return (
    <span className="inline-flex items-center gap-1 text-sm">
      <svg className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
      <span className="font-semibold">{rating.toFixed(1)}</span>
      {reviewCount ? <span className="text-gray-400">({reviewCount})</span> : null}
    </span>
  );
}

function SearchActionButtons() {
  const [liked, setLiked] = useState(false);
  return (
    <div className="flex items-center gap-1 rounded-full bg-white/90 px-1 py-0.5 shadow-sm">
      <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }} className="rounded-full p-1.5 transition-colors hover:bg-gray-100" aria-label="Like">
        <svg className={`h-5 w-5 ${liked ? "text-red-500" : "text-gray-400"}`} fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
      </button>
      <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className="rounded-full p-1.5 transition-colors hover:bg-gray-100" aria-label="Dislike">
        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
      <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className="rounded-full p-1.5 transition-colors hover:bg-gray-100" aria-label="Share">
        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
      </button>
    </div>
  );
}

function typeLabel(intent: SearchIntent) {
  if (intent === "vacation") return "VILLA";
  if (intent === "hotels") return "HOTEL";
  if (intent === "real-estate") return "PROPERTY";
  if (intent === "services") return "SERVICE";
  return "BLOG";
}

function factsRow(item: SearchResultItem) {
  const beds = item.bedrooms ?? Number(item.facts.find((f) => /bed/i.test(f.label))?.value || 0);
  const baths = item.bathrooms ?? Number(item.facts.find((f) => /bath/i.test(f.label))?.value || 0);
  const guests = item.guests ?? Number(item.facts.find((f) => /guest/i.test(f.label))?.value || 0);
  return (
    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-600">
      <span>🛏 {beds || "-"} beds</span><span className="text-gray-300">·</span>
      <span>🚿 {baths || "-"} baths</span><span className="text-gray-300">·</span>
      <span>👥 {guests || "-"} guests</span>
    </div>
  );
}

function PriceBlock({ item }: { item: SearchResultItem }) {
  const night = item.price ? `€${item.price.toLocaleString()}/night` : item.priceLabel || "Price on request";
  const total = item.totalPrice ? `€${item.totalPrice.toLocaleString()} total` : undefined;
  return (
    <div>
      <p className="text-sm font-medium text-slate-600">{night}</p>
      {total ? <p className="text-xl font-bold text-slate-900">{total}</p> : null}
    </div>
  );
}

function ResultCard({ item, isInBasket, onAdd, onRemove }: { item: SearchResultItem; isInBasket: boolean; onAdd: () => void; onRemove: () => void }) {
  const images = Array.from(new Set([...(item.images || []), ...(item.image ? [item.image] : [])]));

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-52">
        {images.length > 0 ? <SearchPhotoCarousel photos={images} alt={item.title} className="h-full" /> : <div className="h-full w-full bg-slate-200 flex items-center justify-center text-slate-400 text-4xl">📷</div>}
        <div className="absolute left-3 top-3 flex items-center gap-2 z-10">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-700 shadow-sm">{typeLabel(item.intent)}</span>
          {availabilityBadge(item.availability)}
        </div>
        <div className="absolute right-3 top-3 z-10"><SearchActionButtons /></div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{item.title}</h3>
        {item.location && <p className="mt-0.5 text-sm text-gray-500">{item.location}</p>}
        <div className="mt-2 flex items-center justify-between gap-2">
          <SearchStarRating rating={item.rating} reviewCount={item.reviewCount} />
          <div className="flex items-center gap-1.5">
            {item.videoUrl ? <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">▶ Video</span> : null}
            {item.tour3dUrl ? <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">◎ 3D Tour</span> : null}
          </div>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-gray-600">{item.description}</p>
        {factsRow(item)}
        <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-4">
          <PriceBlock item={item} />
          <div className="flex gap-2">
            <a href={item.href} className="rounded-lg border border-blue-600 px-3 py-1.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50">View Details</a>
            <a href="#inquire" className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">Book Now</a>
            <button onClick={isInBasket ? onRemove : onAdd} className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${isInBasket ? "bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-600" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>{isInBasket ? "✓ Added" : "➕ Add"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultListRow({ item, isInBasket, onAdd, onRemove }: { item: SearchResultItem; isInBasket: boolean; onAdd: () => void; onRemove: () => void }) {
  const images = Array.from(new Set([...(item.images || []), ...(item.image ? [item.image] : [])]));

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-col sm:flex-row">
        <div className="relative h-52 flex-shrink-0 sm:h-auto sm:w-64">
          {images.length > 0 ? <SearchPhotoCarousel photos={images} alt={item.title} className="h-full" /> : <div className="h-full w-full bg-slate-200 flex items-center justify-center text-slate-400 text-4xl min-h-[12rem]">📷</div>}
          <div className="absolute left-3 top-3 flex items-center gap-2 z-10">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-700 shadow-sm">{typeLabel(item.intent)}</span>
            {availabilityBadge(item.availability)}
          </div>
          <div className="absolute right-3 top-3 z-10"><SearchActionButtons /></div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
          {item.location && <p className="mt-0.5 text-sm text-gray-500">{item.location}</p>}
          <div className="mt-2 flex items-center gap-2">
            <SearchStarRating rating={item.rating} reviewCount={item.reviewCount} />
            {item.videoUrl ? <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">▶ Video</span> : null}
            {item.tour3dUrl ? <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">◎ 3D Tour</span> : null}
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-gray-600">{item.description}</p>
          {factsRow(item)}
          <div className="mt-auto flex items-end justify-between pt-4">
            <PriceBlock item={item} />
            <div className="flex gap-2">
              <a href={item.href} className="rounded-lg border border-blue-600 px-3 py-1.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50">View Details</a>
              <a href="#inquire" className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">Book Now</a>
              <button onClick={isInBasket ? onRemove : onAdd} className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${isInBasket ? "bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-600" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>{isInBasket ? "✓ Added" : "➕ Add"}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
