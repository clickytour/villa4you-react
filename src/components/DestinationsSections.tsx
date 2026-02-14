"use client";

import { useState } from "react";

const quickRegions = ["Halkidiki", "Mykonos", "Crete"];

const trustItems = [
  { title: "Verified stays", subtitle: "Curated villas & hotels", icon: "✅" },
  { title: "Local support", subtitle: "On-the-ground tips", icon: "🗺️" },
  { title: "Family friendly", subtitle: "Great for kids", icon: "👨‍👩‍👧" },
  { title: "Quick replies", subtitle: "WhatsApp/Viber/Email", icon: "💬" },
];

export function DestinationsSections() {
  const [selectedRegion, setSelectedRegion] = useState<string>(quickRegions[0]);

  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-8 pt-4">
      <div className="rounded-2xl border border-slate-300 bg-[#091339] px-4 py-10 text-center md:px-8">
        <h1 className="text-[56px] font-semibold leading-none text-white">Find Your Perfect Destination in Greece</h1>
        <p className="mt-3 text-[21px] text-slate-200">Browse regions, towns and complexes across Halkidiki, Mykonos & Crete.</p>

        <div className="mx-auto mt-6 flex w-full max-w-[760px] flex-col gap-3 sm:flex-row">
          <input
            className="h-12 w-full rounded-xl border border-white/20 bg-white px-4 text-base text-slate-900 placeholder:text-slate-400 sm:flex-1"
            placeholder="Search regions, towns, complexes, beaches..."
          />
          <button className="h-12 rounded-xl bg-emerald-500 px-7 text-base font-semibold text-slate-900 hover:bg-emerald-400">Search</button>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {quickRegions.map((region) => {
            const active = selectedRegion === region;
            return (
              <button
                key={region}
                type="button"
                onClick={() => setSelectedRegion(region)}
                className={`rounded-full border px-5 py-2 text-base ${
                  active ? "border-white bg-white text-slate-900" : "border-white/60 bg-white/95 text-slate-900"
                }`}
              >
                {region}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 grid gap-3 rounded-2xl border border-slate-300 bg-white p-4 md:grid-cols-2 lg:grid-cols-4">
        {trustItems.map((item) => (
          <div key={item.title} className="flex items-start gap-3 rounded-xl px-2 py-1">
            <span className="mt-0.5 text-lg" aria-hidden>
              {item.icon}
            </span>
            <div>
              <p className="text-[28px] font-semibold leading-none text-slate-900">{item.title}</p>
              <p className="mt-1 text-[21px] leading-none text-slate-600">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
