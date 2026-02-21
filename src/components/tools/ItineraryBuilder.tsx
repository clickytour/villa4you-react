"use client";

import { useState, useMemo } from "react";

const DESTINATIONS = [
  { name: "Athens", days: 3, highlights: ["Acropolis & Parthenon", "Plaka district walk", "National Archaeological Museum", "Monastiraki flea market", "Lycabettus Hill sunset", "Temple of Poseidon (Sounio day trip)"] },
  { name: "Santorini", days: 3, highlights: ["Oia sunset walk", "Caldera boat cruise", "Wine tasting tour", "Red Beach & Akrotiri ruins", "Fira to Oia hike", "Perissa black sand beach"] },
  { name: "Mykonos", days: 2, highlights: ["Little Venice sunset", "Windmills photo stop", "Paradise Beach", "Delos island day trip", "Mykonos Town nightlife", "Ano Mera village"] },
  { name: "Crete (Chania)", days: 3, highlights: ["Venetian Harbor walk", "Samaria Gorge hike", "Elafonisi pink beach", "Old town food tour", "Balos Lagoon boat trip", "Kournas Lake"] },
  { name: "Crete (Heraklion)", days: 2, highlights: ["Knossos Palace", "Heraklion Archaeological Museum", "Spinalonga island", "Matala beach & caves", "CretAquarium", "Archanes wine village"] },
  { name: "Rhodes", days: 2, highlights: ["Medieval Old Town (UNESCO)", "Lindos Acropolis", "Valley of Butterflies", "Prasonisi windsurfing", "Street of Knights", "Tsambika Beach"] },
  { name: "Corfu", days: 2, highlights: ["Old Town (UNESCO)", "Paleokastritsa monastery & beach", "Canal d'Amour", "Achilleion Palace", "Sidari rock formations", "Corfu Trail hiking"] },
  { name: "Halkidiki", days: 3, highlights: ["Kassandra beach hopping", "Sithonia hidden coves", "Mount Athos boat view", "Kavourotrypes orange beach", "Neos Marmaras waterfront", "Aristotle's Park (Stagira)"] },
  { name: "Meteora", days: 1, highlights: ["Monastery visits (Great Meteoron, Varlaam)", "Sunset viewpoint", "Rock climbing", "Kalambaka town walk"] },
  { name: "Thessaloniki", days: 2, highlights: ["White Tower promenade", "Ano Poli old quarter", "Modiano Market food tour", "Archaeological Museum", "Ladadika nightlife", "Thessaloniki waterfront cycling"] },
  { name: "Nafplio & Peloponnese", days: 2, highlights: ["Palamidi fortress", "Nafplio old town", "Epidaurus ancient theater", "Mycenae archaeological site", "Tolo beach", "Wine route drive"] },
  { name: "Zakynthos", days: 2, highlights: ["Shipwreck Beach (Navagio)", "Blue Caves boat tour", "Turtle island (Marathonisi)", "Bochali viewpoint sunset", "Porto Limnionas", "Zakynthos Town"] },
];

const INTERESTS = [
  { id: "history", name: "History & Culture", icon: "\uD83C\uDFDB\uFE0F" },
  { id: "beach", name: "Beaches & Water", icon: "\uD83C\uDFD6\uFE0F" },
  { id: "food", name: "Food & Wine", icon: "\uD83C\uDF77" },
  { id: "adventure", name: "Adventure & Hiking", icon: "\u26F0\uFE0F" },
  { id: "nightlife", name: "Nightlife", icon: "\uD83C\uDF1F" },
  { id: "photography", name: "Photography", icon: "\uD83D\uDCF7" },
  { id: "family", name: "Family Activities", icon: "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66" },
  { id: "relaxation", name: "Relaxation & Spa", icon: "\uD83E\uDDD6" },
];

const PACE = [
  { id: "relaxed", name: "Relaxed", desc: "2-3 activities/day, plenty of free time", multiplier: 0.6 },
  { id: "moderate", name: "Moderate", desc: "3-4 activities/day, balanced", multiplier: 1.0 },
  { id: "packed", name: "Action-Packed", desc: "5-6 activities/day, see everything", multiplier: 1.4 },
];

export default function ItineraryBuilder() {
  const [selectedDests, setSelectedDests] = useState<number[]>([0, 1, 2]);
  const [daysPerDest, setDaysPerDest] = useState<Record<number, number>>({ 0: 3, 1: 3, 2: 2 });
  const [interests, setInterests] = useState<string[]>(["history", "beach", "food"]);
  const [pace, setPace] = useState("moderate");
  const [groupType, setGroupType] = useState("couple");

  const toggleDest = (i: number) => {
    if (selectedDests.includes(i)) {
      setSelectedDests(selectedDests.filter(x => x !== i));
      const d = { ...daysPerDest }; delete d[i]; setDaysPerDest(d);
    } else {
      setSelectedDests([...selectedDests, i]);
      setDaysPerDest({ ...daysPerDest, [i]: DESTINATIONS[i].days });
    }
  };

  const totalDays = useMemo(() => selectedDests.reduce((s, i) => s + (daysPerDest[i] || DESTINATIONS[i].days), 0), [selectedDests, daysPerDest]);

  const itinerary = useMemo(() => {
    let dayNum = 0;
    const paceObj = PACE.find(p => p.id === pace) || PACE[1];
    return selectedDests.map((destIdx) => {
      const dest = DESTINATIONS[destIdx];
      const days = daysPerDest[destIdx] || dest.days;
      const destDays = [];
      for (let d = 0; d < days; d++) {
        dayNum++;
        const activitiesPerDay = Math.round(3 * paceObj.multiplier);
        const startIdx = d * activitiesPerDay;
        const dayActivities = dest.highlights.slice(startIdx, startIdx + activitiesPerDay);
        if (dayActivities.length === 0) {
          destDays.push({ day: dayNum, activities: ["Free day — explore at your own pace"], isTransfer: false });
        } else {
          destDays.push({ day: dayNum, activities: dayActivities, isTransfer: false });
        }
      }
      return { destination: dest.name, days: destDays };
    });
  }, [selectedDests, daysPerDest, pace]);

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Settings - 2 cols */}
      <div className="lg:col-span-2 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Destinations (click to add)</label>
          <div className="flex flex-wrap gap-1.5">
            {DESTINATIONS.map((d, i) => (
              <button key={i} onClick={() => toggleDest(i)} className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${selectedDests.includes(i) ? "border-cyan-600 bg-cyan-600 text-white" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                {d.name}
              </button>
            ))}
          </div>
        </div>

        {selectedDests.length > 0 && (
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Days per Destination ({totalDays} total)</label>
            <div className="space-y-2">
              {selectedDests.map((idx, pos) => (
                <div key={idx} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-2.5">
                  <span className="w-5 h-5 rounded-full bg-cyan-600 text-white text-[10px] font-bold flex items-center justify-center">{pos + 1}</span>
                  <span className="flex-1 text-sm font-medium">{DESTINATIONS[idx].name}</span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setDaysPerDest({ ...daysPerDest, [idx]: Math.max(1, (daysPerDest[idx] || DESTINATIONS[idx].days) - 1) })} className="w-6 h-6 rounded border text-xs">-</button>
                    <span className="w-6 text-center text-sm font-bold">{daysPerDest[idx] || DESTINATIONS[idx].days}</span>
                    <button onClick={() => setDaysPerDest({ ...daysPerDest, [idx]: (daysPerDest[idx] || DESTINATIONS[idx].days) + 1 })} className="w-6 h-6 rounded border text-xs">+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Interests</label>
          <div className="flex flex-wrap gap-1.5">
            {INTERESTS.map((int) => (
              <button key={int.id} onClick={() => setInterests(prev => prev.includes(int.id) ? prev.filter(x => x !== int.id) : [...prev, int.id])} className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${interests.includes(int.id) ? "border-cyan-600 bg-cyan-50 text-cyan-700" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}>
                {int.icon} {int.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Travel Pace</label>
          <div className="space-y-1.5">
            {PACE.map((p) => (
              <button key={p.id} onClick={() => setPace(p.id)} className={`w-full rounded-lg border p-2.5 text-left transition ${pace === p.id ? "border-cyan-600 bg-cyan-50" : "border-slate-200 hover:bg-slate-50"}`}>
                <span className={`text-sm font-semibold ${pace === p.id ? "text-cyan-700" : "text-slate-700"}`}>{p.name}</span>
                <span className="text-xs text-slate-500 ml-2">{p.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Group Type</label>
          <div className="flex gap-2">
            {[["solo","Solo"],["couple","Couple"],["family","Family"],["friends","Friends"],["group","Large Group"]].map(([k,v]) => (
              <button key={k} onClick={() => setGroupType(k)} className={`flex-1 rounded-lg border px-2 py-2 text-xs font-medium transition ${groupType === k ? "border-cyan-600 bg-cyan-50 text-cyan-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Itinerary - 3 cols */}
      <div className="lg:col-span-3 space-y-4">
        <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-5 text-white">
          <h3 className="text-lg font-bold">Your Greece Itinerary</h3>
          <p className="text-sm text-slate-300 mt-1">{totalDays} days | {selectedDests.length} destinations | {PACE.find(p => p.id === pace)?.name} pace</p>
        </div>

        {itinerary.map((dest, destIdx) => (
          <div key={destIdx} className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 px-5 py-3">
              <h4 className="text-white font-bold">{dest.destination}</h4>
              <p className="text-cyan-100 text-xs">{dest.days.length} {dest.days.length === 1 ? "day" : "days"}</p>
            </div>
            <div className="p-4 space-y-3">
              {dest.days.map((day) => (
                <div key={day.day} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center text-xs font-bold flex-shrink-0">D{day.day}</div>
                    {day.day < totalDays && <div className="w-px flex-1 bg-slate-200 mt-1" />}
                  </div>
                  <div className="flex-1 pb-3">
                    <div className="space-y-1">
                      {day.activities.map((act, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-cyan-500 mt-1 text-xs">&#9679;</span>
                          <span className="text-sm text-slate-700">{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {selectedDests.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 p-12 text-center">
            <p className="text-slate-400">Select destinations to generate your itinerary</p>
          </div>
        )}

        {selectedDests.length > 0 && (
          <div className="flex gap-2">
            <button onClick={() => navigator.clipboard.writeText(itinerary.map(d => `=== ${d.destination} ===\n${d.days.map(day => `Day ${day.day}: ${day.activities.join(" | ")}`).join("\n")}`).join("\n\n"))} className="flex-1 rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-cyan-700">
              Copy Itinerary
            </button>
            <button className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-500 cursor-not-allowed">
              Export PDF (soon)
            </button>
          </div>
        )}

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
          <p className="text-[10px] text-amber-700">
            <strong>Coming soon:</strong> AI-powered personalization that tailors activities to your interests, budget, and group type. Currently using curated highlight recommendations.
          </p>
        </div>
      </div>
    </div>
  );
}
