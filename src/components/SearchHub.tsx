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

/* ── Result Card (Grid) ─────────────────────────────────── */

function ResultCard({ item, isInBasket, onAdd, onRemove }: { item: SearchResultItem; isInBasket: boolean; onAdd: () => void; onRemove: () => void }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group">
      {item.image && (
        <div className="relative h-48 overflow-hidden">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <span className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${INTENT_COLORS[item.intent]}`}>
            {item.intent}
          </span>
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-slate-800 text-sm mb-1 line-clamp-1">{item.title}</h3>
        <p className="text-slate-500 text-xs line-clamp-2 mb-3">{item.description}</p>
        {item.priceLabel && (
          <div className="text-blue-700 font-semibold text-sm mb-2">{item.priceLabel}</div>
        )}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {item.facts.slice(0, 3).map((f) => (
            <span key={f.label} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
              {f.label}: {f.value}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <a href={item.href} className="flex-1 text-center px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors">
            View Details
          </a>
          <button
            onClick={isInBasket ? onRemove : onAdd}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              isInBasket ? "bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-600" : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            {isInBasket ? "✓ Added" : "➕ Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Result Row (List) ──────────────────────────────────── */

function ResultListRow({ item, isInBasket, onAdd, onRemove }: { item: SearchResultItem; isInBasket: boolean; onAdd: () => void; onRemove: () => void }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex gap-4 hover:shadow-md transition-shadow">
      {item.image && (
        <img src={item.image} alt={item.title} className="w-32 h-24 rounded-lg object-cover flex-shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${INTENT_COLORS[item.intent]}`}>
            {item.intent}
          </span>
          <h3 className="font-semibold text-slate-800 text-sm truncate">{item.title}</h3>
        </div>
        <p className="text-slate-500 text-xs line-clamp-1 mb-2">{item.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {item.facts.slice(0, 4).map((f) => (
            <span key={f.label} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
              {f.label}: {f.value}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-end justify-between flex-shrink-0">
        {item.priceLabel && <div className="text-blue-700 font-semibold text-sm whitespace-nowrap">{item.priceLabel}</div>}
        <div className="flex gap-2">
          <a href={item.href} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700">
            Details
          </a>
          <button
            onClick={isInBasket ? onRemove : onAdd}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium ${isInBasket ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600 hover:bg-blue-50"}`}
          >
            {isInBasket ? "✓" : "➕"}
          </button>
        </div>
      </div>
    </div>
  );
}
