"use client";

import { useMemo, useState } from "react";
import { filterSearchSimulationRecords, getSearchSimulationRecords, type SearchMode, type SearchVertical } from "@/lib/searchSimulation";

const verticalOptions: Array<{ id: SearchVertical; label: string }> = [
  { id: "all", label: "All" },
  { id: "stays", label: "Stays" },
  { id: "services", label: "Services" },
  { id: "blog", label: "Blog" },
];

const modeOptions: Array<{ id: SearchMode; label: string }> = [
  { id: "all", label: "All modes" },
  { id: "vacation", label: "Vacation" },
  { id: "sale", label: "Sale" },
  { id: "monthly", label: "Monthly" },
];

export function SearchResultsGuestSections() {
  const [q, setQ] = useState("Halkidiki");
  const [vertical, setVertical] = useState<SearchVertical>("all");
  const [mode, setMode] = useState<SearchMode>("all");
  const [location, setLocation] = useState("");

  const records = useMemo(() => getSearchSimulationRecords(), []);
  const filtered = useMemo(
    () => filterSearchSimulationRecords(records, { q, vertical, mode, location }),
    [records, q, vertical, mode, location]
  );

  return (
    <>
      <section className="mx-auto max-w-[1280px] px-4 pb-4">
        <div className="rounded-xl border border-slate-300 bg-white p-4">
          <h1 className="text-[34px] font-semibold leading-none text-slate-900">Search Results (Core-mirror simulation)</h1>
          <p className="mt-2 text-[18px] text-slate-700">Unified search across stays, services and blog. Simulation uses mirror DB until Core integration.</p>

          <div className="mt-4 grid gap-3 md:grid-cols-4">
            <label className="text-sm text-slate-700">
              Search intent
              <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try: Halkidiki, transfer, ROI" />
            </label>
            <label className="text-sm text-slate-700">
              Vertical
              <select className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" value={vertical} onChange={(e) => setVertical(e.target.value as SearchVertical)}>
                {verticalOptions.map((v) => (
                  <option key={v.id} value={v.id}>{v.label}</option>
                ))}
              </select>
            </label>
            <label className="text-sm text-slate-700">
              Mode
              <select className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" value={mode} onChange={(e) => setMode(e.target.value as SearchMode)}>
                {modeOptions.map((m) => (
                  <option key={m.id} value={m.id}>{m.label}</option>
                ))}
              </select>
            </label>
            <label className="text-sm text-slate-700">
              Location
              <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., Halkidiki" />
            </label>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {verticalOptions.map((v) => (
              <button
                key={v.id}
                onClick={() => setVertical(v.id)}
                className={`rounded-full border px-3 py-1 text-sm ${vertical === v.id ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white text-slate-700"}`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <p className="text-[20px] text-slate-700">{filtered.length} results match your query</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {filtered.map((item) => (
            <article key={item.id} className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-300 bg-white">
              {item.image && <img src={item.image} alt={item.title} className="h-[220px] w-full object-cover" />}
              <div className="flex-1 p-3">
                <p className="text-xs text-slate-500">{item.vertical.toUpperCase()} {item.mode !== "all" ? `· ${item.mode.toUpperCase()}` : ""}{item.location ? ` · ${item.location}` : ""}</p>
                <h3 className="mt-1 text-[26px] font-semibold leading-none text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                {item.priceLabel && <p className="mt-2 text-sm font-medium text-slate-800">{item.priceLabel}</p>}
                <div className="mt-2 flex flex-wrap gap-1">
                  {item.tags.slice(0, 4).map((t) => (
                    <span key={t} className="rounded-full border border-slate-300 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-700">{t}</span>
                  ))}
                </div>
              </div>
              <div className="border-t border-slate-300 p-3">
                <a href={item.href} className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">Open result</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-10">
        <div className="rounded-xl border border-slate-300 bg-white p-4">
          <h2 className="text-[30px] font-semibold leading-none text-slate-900">Search strategy notes (UI/UX/SEO/Marketing)</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-[16px] text-slate-700">
            <li>Use one universal search entry in header + contextual search in key pages.</li>
            <li>Keep mode-aware ranking (vacation/sale/monthly) to avoid mixed-intent noise.</li>
            <li>Ensure SEO crawlable results routes for high-intent combinations (destination + mode + category).</li>
            <li>Add trust boosters in cards: ratings, coverage km, availability confidence, response speed.</li>
            <li>Track conversion metrics by vertical: stays, services, blog assist-path.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
