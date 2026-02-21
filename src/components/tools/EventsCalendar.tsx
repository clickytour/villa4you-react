"use client";

import { useState, useMemo } from "react";

interface Event {
  name: string;
  date: string;
  endDate?: string;
  region: string;
  category: string;
  description: string;
  impact: "high" | "medium" | "low";
}

const EVENTS: Event[] = [
  // January
  { name: "New Year's Day", date: "2026-01-01", region: "All Greece", category: "holiday", description: "National holiday. Most businesses closed.", impact: "high" },
  { name: "Epiphany / Blessing of Waters", date: "2026-01-06", region: "All Greece", category: "cultural", description: "Cross thrown into the sea, divers compete to retrieve it. Spectacular in island ports.", impact: "medium" },
  // February
  { name: "Patras Carnival", date: "2026-02-08", endDate: "2026-02-22", region: "Peloponnese", category: "festival", description: "Greece's largest carnival. Parades, floats, and parties. Book early!", impact: "high" },
  { name: "Apokries (Carnival Season)", date: "2026-02-08", endDate: "2026-02-22", region: "All Greece", category: "cultural", description: "Three weeks of celebrations before Lent. Street parties across Greece.", impact: "medium" },
  // March
  { name: "Clean Monday (Kathara Deftera)", date: "2026-03-02", region: "All Greece", category: "holiday", description: "Start of Lent. Kite flying, seafood feasts, outdoor celebrations.", impact: "high" },
  { name: "Greek Independence Day", date: "2026-03-25", region: "All Greece", category: "holiday", description: "Military parades in every city. National holiday.", impact: "high" },
  // April
  { name: "Orthodox Easter", date: "2026-04-13", endDate: "2026-04-20", region: "All Greece", category: "holiday", description: "Greece's most important holiday. Midnight services, fireworks, lamb roasts. Peak Greek tourism moment.", impact: "high" },
  { name: "Corfu Easter", date: "2026-04-18", region: "Corfu", category: "cultural", description: "Famous pot-throwing tradition (Botides). Unique Corfu Easter celebrations.", impact: "high" },
  // May
  { name: "May Day / Labor Day", date: "2026-05-01", region: "All Greece", category: "holiday", description: "Flower wreaths on doors. Picnics and countryside outings.", impact: "medium" },
  { name: "Thessaloniki Street Food Festival", date: "2026-05-15", endDate: "2026-05-18", region: "Thessaloniki", category: "food", description: "Annual food festival with local and international street food vendors.", impact: "medium" },
  // June
  { name: "Athens & Epidaurus Festival", date: "2026-06-01", endDate: "2026-08-31", region: "Athens", category: "arts", description: "Summer-long performing arts festival. Ancient theater performances at Epidaurus and Herodes Atticus.", impact: "high" },
  { name: "Midsummer Fires (Klidonas)", date: "2026-06-24", region: "All Greece", category: "cultural", description: "Traditional bonfire celebrations on Saint John's Eve.", impact: "low" },
  { name: "Matala Beach Festival", date: "2026-06-20", endDate: "2026-06-22", region: "Crete", category: "music", description: "Music festival in the famous Matala caves on Crete's south coast.", impact: "medium" },
  // July
  { name: "Rockwave Festival", date: "2026-07-03", endDate: "2026-07-05", region: "Athens", category: "music", description: "Greece's biggest rock/alternative music festival near Athens.", impact: "medium" },
  { name: "Sani Festival", date: "2026-07-10", endDate: "2026-08-20", region: "Halkidiki", category: "arts", description: "Jazz, classical, and world music by the sea at Sani Resort.", impact: "medium" },
  { name: "Wine Festival Rethymno", date: "2026-07-15", endDate: "2026-07-25", region: "Crete", category: "food", description: "Cretan wine tasting, music, and dancing in Rethymno park.", impact: "medium" },
  // August
  { name: "Assumption of Mary (Dekapentavgoustos)", date: "2026-08-15", region: "All Greece", category: "holiday", description: "Major religious holiday. Island panigiri (festivals) everywhere. Peak tourism day.", impact: "high" },
  { name: "Olympus Festival", date: "2026-08-01", endDate: "2026-08-20", region: "Thessaloniki", category: "arts", description: "Theater and music at the foot of Mount Olympus in Dion.", impact: "medium" },
  { name: "Ikaria Music Festival", date: "2026-08-10", endDate: "2026-08-12", region: "Other Islands", category: "music", description: "Three days of music and celebration on the Blue Zone island of Ikaria.", impact: "low" },
  // September
  { name: "Thessaloniki International Fair", date: "2026-09-06", endDate: "2026-09-14", region: "Thessaloniki", category: "business", description: "Greece's largest trade fair. PM speech, business networking, concerts.", impact: "high" },
  { name: "Spetses Armata", date: "2026-09-12", region: "Other Islands", category: "cultural", description: "Naval battle reenactment and fireworks at Spetses harbor.", impact: "medium" },
  { name: "Grape Harvest Festivals", date: "2026-09-15", endDate: "2026-10-15", region: "Peloponnese", category: "food", description: "Wine harvest celebrations across Nemea, Santorini, and Peloponnese wine regions.", impact: "medium" },
  // October
  { name: "Ochi Day", date: "2026-10-28", region: "All Greece", category: "holiday", description: "National holiday commemorating Greece's 'No' to Mussolini. Military parades.", impact: "high" },
  { name: "Thessaloniki Film Festival", date: "2026-10-30", endDate: "2026-11-09", region: "Thessaloniki", category: "arts", description: "Greece's premier film festival, international screenings and events.", impact: "medium" },
  { name: "Chestnut Festival", date: "2026-10-18", region: "Pelion", category: "food", description: "Celebrate the chestnut harvest in Pelion mountain villages.", impact: "low" },
  // November
  { name: "Athens Marathon", date: "2026-11-08", region: "Athens", category: "sports", description: "The original marathon route from Marathon to Athens. 20,000+ runners.", impact: "high" },
  { name: "Thessaloniki Marathon", date: "2026-11-15", region: "Thessaloniki", category: "sports", description: "Growing marathon event along the Thessaloniki waterfront.", impact: "medium" },
  // December
  { name: "Christmas Season", date: "2026-12-20", endDate: "2026-12-31", region: "All Greece", category: "holiday", description: "Christmas markets, decorated boats (karavaki tradition), festive events.", impact: "high" },
  { name: "New Year's Eve", date: "2026-12-31", region: "All Greece", category: "holiday", description: "Vasilopita cake, card games, fireworks at midnight. Major celebrations in Athens.", impact: "high" },
];

const CATEGORIES = [
  { id: "holiday", name: "National Holiday", color: "bg-red-100 text-red-700", icon: "\uD83C\uDDEC\uD83C\uDDF7" },
  { id: "cultural", name: "Cultural", color: "bg-violet-100 text-violet-700", icon: "\uD83C\uDFAD" },
  { id: "festival", name: "Festival", color: "bg-amber-100 text-amber-700", icon: "\uD83C\uDF89" },
  { id: "music", name: "Music", color: "bg-pink-100 text-pink-700", icon: "\uD83C\uDFB5" },
  { id: "food", name: "Food & Wine", color: "bg-emerald-100 text-emerald-700", icon: "\uD83C\uDF77" },
  { id: "arts", name: "Arts & Performance", color: "bg-indigo-100 text-indigo-700", icon: "\uD83C\uDFA8" },
  { id: "sports", name: "Sports", color: "bg-blue-100 text-blue-700", icon: "\uD83C\uDFC3" },
  { id: "business", name: "Business", color: "bg-slate-100 text-slate-700", icon: "\uD83D\uDCBC" },
];

const REGIONS = ["All Greece", "Athens", "Thessaloniki", "Crete", "Halkidiki", "Corfu", "Peloponnese", "Pelion", "Other Islands"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function EventsCalendar() {
  const [selectedMonth, setSelectedMonth] = useState(-1); // -1 = all
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filtered = useMemo(() => {
    return EVENTS.filter(e => {
      const month = parseInt(e.date.substring(5, 7)) - 1;
      if (selectedMonth >= 0 && month !== selectedMonth) return false;
      if (selectedRegion && e.region !== selectedRegion && e.region !== "All Greece") return false;
      if (selectedCategory && e.category !== selectedCategory) return false;
      return true;
    });
  }, [selectedMonth, selectedRegion, selectedCategory]);

  const eventsByMonth = useMemo(() => {
    const grouped: Record<number, Event[]> = {};
    filtered.forEach(e => {
      const month = parseInt(e.date.substring(5, 7)) - 1;
      if (!grouped[month]) grouped[month] = [];
      grouped[month].push(e);
    });
    return grouped;
  }, [filtered]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Month</label>
          <div className="flex gap-0.5">
            <button onClick={() => setSelectedMonth(-1)} className={`rounded-l-lg border px-2 py-1.5 text-[10px] font-medium transition ${selectedMonth === -1 ? "border-cyan-600 bg-cyan-600 text-white" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>All</button>
            {MONTHS.map((m, i) => (
              <button key={i} onClick={() => setSelectedMonth(i)} className={`border px-1.5 py-1.5 text-[10px] font-medium transition ${i === 11 ? "rounded-r-lg" : ""} ${selectedMonth === i ? "border-cyan-600 bg-cyan-600 text-white" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                {m}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Region</label>
          <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs">
            <option value="">All Regions</option>
            {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Type</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs">
            <option value="">All Types</option>
            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-3">
        <div className="rounded-lg bg-cyan-50 border border-cyan-200 px-4 py-2">
          <span className="text-xs text-cyan-600 font-semibold">{filtered.length} events</span>
        </div>
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-2">
          <span className="text-xs text-red-600 font-semibold">{filtered.filter(e => e.impact === "high").length} high impact</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        {Object.entries(eventsByMonth).sort(([a], [b]) => +a - +b).map(([monthIdx, events]) => (
          <div key={monthIdx}>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-sm font-bold text-slate-700 px-3 py-1 rounded-full bg-slate-100">{MONTHS[+monthIdx]} 2026</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event, i) => {
                const cat = CATEGORIES.find(c => c.id === event.category);
                return (
                  <div key={i} className={`rounded-xl border bg-white p-4 transition hover:shadow-md ${event.impact === "high" ? "border-l-4 border-l-red-500 border-t border-r border-b border-slate-200" : "border-slate-200"}`}>
                    <div className="flex items-start justify-between mb-2">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${cat?.color}`}>{cat?.icon} {cat?.name}</span>
                      {event.impact === "high" && <span className="rounded-full bg-red-100 px-2 py-0.5 text-[9px] font-bold text-red-600">HIGH IMPACT</span>}
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">{event.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {event.date.substring(5)} {event.endDate ? ` - ${event.endDate.substring(5)}` : ""}
                      <span className="mx-1">|</span>
                      {event.region}
                    </p>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{event.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 p-12 text-center">
          <p className="text-slate-400">No events match your filters. Try broadening your search.</p>
        </div>
      )}

      <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-4">
        <h4 className="text-sm font-bold text-cyan-800 mb-2">Pricing Tips by Events</h4>
        <div className="space-y-1 text-xs text-cyan-700">
          <p>&#128200; <strong>Orthodox Easter (April):</strong> Increase rates 30-50%. Book minimum 3-night stays.</p>
          <p>&#128200; <strong>August 15 (Assumption):</strong> Peak demand everywhere. Premium pricing + early booking discounts.</p>
          <p>&#128200; <strong>Athens Marathon (November):</strong> Shoulder season boost. Target Athens properties.</p>
          <p>&#128200; <strong>Carnival Season (February):</strong> Patras hotels sell out. Cross-promote nearby regions.</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
        <p className="text-[10px] text-slate-500">
          <strong>Note:</strong> Event dates are approximate for 2026. Orthodox Easter and moveable feasts may shift. Check official sources for exact dates. Some festivals are announced closer to the date.
        </p>
      </div>
    </div>
  );
}
