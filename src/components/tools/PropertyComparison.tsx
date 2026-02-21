"use client";

import { useState } from "react";

interface Property {
  id: number;
  name: string;
  location: string;
  type: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqm: number;
  amenities: string[];
  rating: number;
  reviews: number;
  image: string;
}

const SAMPLE_PROPERTIES: Property[] = [
  { id: 1, name: "Villa Azure", location: "Halkidiki, Kassandra", type: "Villa", price: 180, bedrooms: 3, bathrooms: 2, sqm: 120, amenities: ["Pool", "Sea View", "BBQ", "Parking", "WiFi", "AC"], rating: 4.8, reviews: 47, image: "/placeholder-villa.jpg" },
  { id: 2, name: "Seaside Retreat", location: "Crete, Chania", type: "Villa", price: 220, bedrooms: 4, bathrooms: 3, sqm: 160, amenities: ["Pool", "Sea View", "Garden", "Parking", "WiFi", "AC", "Hot Tub"], rating: 4.9, reviews: 83, image: "/placeholder-villa2.jpg" },
  { id: 3, name: "Cycladic Dream", location: "Santorini, Oia", type: "Apartment", price: 350, bedrooms: 2, bathrooms: 1, sqm: 65, amenities: ["Caldera View", "WiFi", "AC", "Balcony"], rating: 4.7, reviews: 124, image: "/placeholder-apt.jpg" },
  { id: 4, name: "Olive Grove House", location: "Pelion, Tsagarada", type: "Stone House", price: 95, bedrooms: 2, bathrooms: 1, sqm: 85, amenities: ["Garden", "Fireplace", "Parking", "WiFi", "Mountain View"], rating: 4.6, reviews: 29, image: "/placeholder-house.jpg" },
  { id: 5, name: "Urban Loft Athens", location: "Athens, Plaka", type: "Apartment", price: 110, bedrooms: 1, bathrooms: 1, sqm: 50, amenities: ["Rooftop", "WiFi", "AC", "City View"], rating: 4.5, reviews: 156, image: "/placeholder-loft.jpg" },
  { id: 6, name: "Mykonos Bliss", location: "Mykonos, Ornos", type: "Villa", price: 450, bedrooms: 3, bathrooms: 2, sqm: 140, amenities: ["Pool", "Sea View", "WiFi", "AC", "Chef Service", "Transfer"], rating: 4.9, reviews: 67, image: "/placeholder-mykonos.jpg" },
  { id: 7, name: "Corfu Garden Villa", location: "Corfu, Paleokastritsa", type: "Villa", price: 160, bedrooms: 3, bathrooms: 2, sqm: 130, amenities: ["Pool", "Garden", "BBQ", "Parking", "WiFi", "AC"], rating: 4.7, reviews: 52, image: "/placeholder-corfu.jpg" },
  { id: 8, name: "Rhodes Old Town Apt", location: "Rhodes, Old Town", type: "Apartment", price: 85, bedrooms: 1, bathrooms: 1, sqm: 45, amenities: ["Historic Building", "WiFi", "AC", "Courtyard"], rating: 4.4, reviews: 91, image: "/placeholder-rhodes.jpg" },
];

const ALL_AMENITIES = [...new Set(SAMPLE_PROPERTIES.flatMap(p => p.amenities))].sort();

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(s => (
        <svg key={s} className={`w-4 h-4 ${s <= Math.round(rating) ? "text-amber-400" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-slate-500 ml-1">{rating} ({rating >= 4.8 ? "Excellent" : rating >= 4.5 ? "Very Good" : "Good"})</span>
    </div>
  );
}

export default function PropertyComparison() {
  const [selected, setSelected] = useState<number[]>([0, 1, 2]);

  const toggleProperty = (idx: number) => {
    if (selected.includes(idx)) {
      setSelected(selected.filter(i => i !== idx));
    } else if (selected.length < 4) {
      setSelected([...selected, idx]);
    }
  };

  const compared = selected.map(i => SAMPLE_PROPERTIES[i]);
  const cheapest = compared.length > 0 ? Math.min(...compared.map(p => p.price)) : 0;
  const bestRated = compared.length > 0 ? Math.max(...compared.map(p => p.rating)) : 0;
  const biggest = compared.length > 0 ? Math.max(...compared.map(p => p.sqm)) : 0;

  return (
    <div className="space-y-6">
      {/* Property selector */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Select Properties to Compare (max 4)</label>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_PROPERTIES.map((p, i) => (
            <button key={i} onClick={() => toggleProperty(i)} className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${selected.includes(i) ? "border-cyan-600 bg-cyan-600 text-white" : selected.length >= 4 ? "border-slate-200 text-slate-300 cursor-not-allowed" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
              {p.name} — {p.location.split(",")[0]}
            </button>
          ))}
        </div>
      </div>

      {compared.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 p-12 text-center">
          <p className="text-slate-400">Select at least 2 properties to compare</p>
        </div>
      ) : (
        <>
          {/* Comparison Grid */}
          <div className="overflow-x-auto">
            <div className={`grid gap-4 min-w-[${compared.length * 250}px]`} style={{ gridTemplateColumns: `repeat(${compared.length}, 1fr)` }}>
              {/* Headers */}
              {compared.map((p) => (
                <div key={p.id} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                  <div className="h-32 bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
                    <span className="text-4xl">{p.type === "Villa" ? "\uD83C\uDFE1" : p.type === "Stone House" ? "\uD83C\uDFDA\uFE0F" : "\uD83C\uDFE2"}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-900">{p.name}</h3>
                    <p className="text-xs text-slate-500">{p.location}</p>
                    <StarRating rating={p.rating} />
                    <p className="text-xs text-slate-400 mt-1">{p.reviews} reviews</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 w-36">Feature</th>
                  {compared.map(p => (
                    <th key={p.id} className="text-center px-4 py-3 text-xs font-semibold text-slate-700">{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {([
                  { label: "Nightly Rate", key: "price", format: (v: number) => `\u20AC${v}`, highlight: (v: number) => v === cheapest },
                  { label: "Type", key: "type", format: (v: number) => `${v}`, highlight: () => false },
                  { label: "Bedrooms", key: "bedrooms", format: (v: number) => `${v} BR`, highlight: () => false },
                  { label: "Bathrooms", key: "bathrooms", format: (v: number) => `${v} BA`, highlight: () => false },
                  { label: "Size", key: "sqm", format: (v: number) => `${v} m\u00B2`, highlight: (v: number) => v === biggest },
                  { label: "Rating", key: "rating", format: (v: number) => `${v}/5`, highlight: (v: number) => v === bestRated },
                  { label: "Price/m\u00B2/night", key: "ppsqm", format: (v: number) => `\u20AC${v.toFixed(2)}`, highlight: () => false },
                ] as { label: string; key: string; format: (v: number) => string; highlight: (v: number) => boolean }[]).map((row) => (
                  <tr key={row.label} className="border-t border-slate-100">
                    <td className="px-4 py-2.5 text-xs font-semibold text-slate-500">{row.label}</td>
                    {compared.map(p => {
                      const val: number = row.key === "ppsqm" ? p.price / p.sqm : Number((p as unknown as Record<string, unknown>)[row.key]);
                      const isHighlight = row.highlight(val);
                      return (
                        <td key={p.id} className={`px-4 py-2.5 text-center font-medium ${isHighlight ? "text-emerald-600 font-bold" : "text-slate-700"}`}>
                          {isHighlight && <span className="text-emerald-500 mr-1">&#9733;</span>}
                          {row.format(val)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Amenities Comparison */}
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
            <div className="px-4 py-3 bg-slate-50 border-b">
              <h4 className="text-sm font-bold text-slate-700">Amenities</h4>
            </div>
            <div className="p-4">
              <div className="space-y-1.5">
                {ALL_AMENITIES.map(amenity => {
                  const has = compared.map(p => p.amenities.includes(amenity));
                  if (!has.some(Boolean)) return null;
                  return (
                    <div key={amenity} className="flex items-center">
                      <span className="w-36 text-xs text-slate-600">{amenity}</span>
                      {has.map((h, i) => (
                        <span key={i} className="flex-1 text-center">
                          {h ? <span className="text-emerald-500">&#10004;</span> : <span className="text-slate-300">&#10006;</span>}
                        </span>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick verdict */}
          <div className="rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 p-5 text-white">
            <h4 className="font-bold mb-2">Quick Verdict</h4>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div>
                <p className="text-slate-400 text-xs">Best Value</p>
                <p className="font-semibold">{compared.reduce((best, p) => p.price < best.price ? p : best, compared[0]).name}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs">Highest Rated</p>
                <p className="font-semibold">{compared.reduce((best, p) => p.rating > best.rating ? p : best, compared[0]).name}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs">Most Space</p>
                <p className="font-semibold">{compared.reduce((best, p) => p.sqm > best.sqm ? p : best, compared[0]).name}</p>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
        <p className="text-[10px] text-slate-500">
          <strong>Note:</strong> Sample properties shown for demo. When connected to live listings, you'll be able to compare any properties from your search results or saved favorites.
        </p>
      </div>
    </div>
  );
}
