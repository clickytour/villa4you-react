"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { searchRegions, type Preset, type PlaceEntry } from "@/lib/greekRegions";

export type PlaceResult = {
  /** Display label */
  displayName: string;
  label: string;
  area: string;
  region: string;
  country: string;
  placeId: string | null;
  lat: number | null;
  lng: number | null;
  listingCount: number;
  /** Which tier resolved this result */
  tier: 1 | 2 | 3;
};

type PlaceAutocompleteProps = {
  /** Field label */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Current value (controlled) */
  value?: string;
  /** Called when user types (free text changes) */
  onTextChange?: (value: string) => void;
  /** Called when user selects a structured suggestion */
  onChange?: (place: PlaceResult | null) => void;
  /** Filter by country (e.g. "Greece") */
  country?: string;
  /** Preset for Tier 1 static regions: "villa4you" (Halkidiki/Mykonos/Crete) or "clickytour" (all Greece) */
  preset?: Preset;
  /** Max suggestions to show */
  limit?: number;
  /** Input name attribute */
  name?: string;
  /** Required field */
  required?: boolean;
  /** Error message */
  error?: string;
  /** Additional className for the wrapper */
  className?: string;
};

/** Convert a Tier 1 PlaceEntry to PlaceResult */
function entryToResult(e: PlaceEntry): PlaceResult {
  return {
    displayName: e.name,
    label: e.name,
    area: e.parent ?? "",
    region: e.name,
    country: "Greece",
    placeId: e.placeId,
    lat: e.lat,
    lng: e.lng,
    listingCount: 0,
    tier: 1,
  };
}

export function PlaceAutocomplete({
  label,
  placeholder = "Start typing a destination...",
  value: controlledValue,
  onTextChange,
  onChange,
  country,
  preset = "villa4you",
  limit = 8,
  name,
  required,
  error,
  className = "",
}: PlaceAutocompleteProps) {
  const [inputValue, setInputValue] = useState(controlledValue ?? "");
  const [suggestions, setSuggestions] = useState<PlaceResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Sync controlled value
  useEffect(() => {
    if (controlledValue !== undefined) setInputValue(controlledValue);
  }, [controlledValue]);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /**
   * 3-Tier cascade:
   *  1. Tier 1: instant static match from greekRegions (no network)
   *  2. Tier 2: mirror DB /api/places/suggest (fills gaps from Core data)
   *  3. Tier 3: Google Places API fallback /api/places/google (unknown locations)
   */
  const fetchSuggestions = useCallback(
    async (q: string) => {
      if (q.length < 2) {
        setSuggestions([]);
        setIsOpen(false);
        return;
      }

      // ── Tier 1: instant static ──
      const tier1 = searchRegions(q, preset, limit).map(entryToResult);

      // If Tier 1 has enough results, show them immediately without API call
      if (tier1.length >= limit) {
        setSuggestions(tier1.slice(0, limit));
        setIsOpen(true);
        setHighlightIndex(-1);
        return;
      }

      // Show Tier 1 results immediately while loading Tier 2
      if (tier1.length > 0) {
        setSuggestions(tier1);
        setIsOpen(true);
        setHighlightIndex(-1);
      }

      // ── Tier 2: mirror DB ──
      setLoading(true);
      try {
        const remaining = limit - tier1.length;
        const params = new URLSearchParams({ q, limit: String(remaining + 5) }); // fetch extra to dedup
        if (country) params.set("country", country);
        const res = await fetch(`/api/places/suggest?${params}`);
        const data = await res.json();

        const tier1Labels = new Set(tier1.map((r) => r.displayName.toLowerCase()));
        const tier2: PlaceResult[] = ((data.suggestions ?? []) as PlaceResult[])
          .filter((s) => !tier1Labels.has(s.label.toLowerCase()))
          .slice(0, remaining)
          .map((s) => ({ ...s, displayName: s.label, tier: 2 as const }));

        const merged = [...tier1, ...tier2];

        // ── Tier 3: Google Places fallback ──
        if (merged.length < 3) {
          try {
            const gParams = new URLSearchParams({ q, limit: String(limit - merged.length) });
            if (country) gParams.set("country", country);
            const gRes = await fetch(`/api/places/google?${gParams}`);
            if (gRes.ok) {
              const gData = await gRes.json();
              const existingLabels = new Set(merged.map((r) => r.displayName.toLowerCase()));
              const tier3: PlaceResult[] = ((gData.suggestions ?? []) as PlaceResult[])
                .filter((s) => !existingLabels.has((s.displayName || s.label).toLowerCase()))
                .slice(0, limit - merged.length)
                .map((s) => ({ ...s, displayName: s.displayName || s.label, tier: 3 as const }));
              merged.push(...tier3);
            }
          } catch {
            // Tier 3 not configured yet — silently skip
          }
        }

        setSuggestions(merged.slice(0, limit));
        setIsOpen(merged.length > 0);
        setHighlightIndex(-1);
      } catch {
        // Keep Tier 1 results if API fails
        if (tier1.length === 0) setSuggestions([]);
      } finally {
        setLoading(false);
      }
    },
    [country, limit, preset]
  );

  function handleInputChange(val: string) {
    setInputValue(val);
    onTextChange?.(val);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(val), 150);
  }

  function handleSelect(place: PlaceResult) {
    setInputValue(place.displayName);
    onTextChange?.(place.displayName);
    onChange?.(place);
    setIsOpen(false);
    setSuggestions([]);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[highlightIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  }

  const tierBadge = (tier: number) => {
    if (tier === 3) return "Google";
    return null;
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-slate-700">
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          name={name}
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => { if (suggestions.length > 0) setIsOpen(true); }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          required={required}
          autoComplete="off"
          className={`w-full rounded-lg border px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 ${
            error ? "border-red-400" : "border-slate-300"
          }`}
        />
        {loading && (
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
          </div>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
          {suggestions.map((s, i) => (
            <li
              key={`${s.displayName}-${s.tier}`}
              onMouseDown={() => handleSelect(s)}
              onMouseEnter={() => setHighlightIndex(i)}
              className={`flex cursor-pointer items-center justify-between px-4 py-2 text-sm ${
                i === highlightIndex ? "bg-slate-100 text-slate-900" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span>
                <span className="font-medium">{s.displayName}</span>
                {s.country && s.displayName !== s.country && (
                  <span className="ml-1 text-slate-400">{s.country}</span>
                )}
              </span>
              <span className="ml-2 flex items-center gap-1.5">
                {s.listingCount > 0 && (
                  <span className="text-xs text-slate-400">
                    {s.listingCount} listing{s.listingCount !== 1 ? "s" : ""}
                  </span>
                )}
                {tierBadge(s.tier) && (
                  <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-500">
                    {tierBadge(s.tier)}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
