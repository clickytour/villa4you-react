"use client";

import { useMemo, useState } from "react";

const unitTypes = ["All", "Villas", "Apartments"] as const;
type UnitType = (typeof unitTypes)[number];

type UnitItem = {
  name: string;
  type: Exclude<UnitType, "All">;
  beds?: string;
  guests?: string;
  image: string;
  price?: string;
  note?: string;
};

type ComplexTemplateSectionsProps = {
  variant?: "default" | "luxury-elsa";
};

const defaultUnitList: UnitItem[] = [
  { name: "Luxury Suites Elisa", type: "Apartments", beds: "1 bedroom", guests: "2 guests", image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80", price: "from €110/night" },
  { name: "Galini Beachfront Maisonettes", type: "Villas", beds: "2 bedrooms", guests: "5 guests", image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80", price: "from €188/night" },
  { name: "Olea Suites & Apartments", type: "Apartments", beds: "1 bedroom", guests: "3 guests", image: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=1200&q=80", price: "from €120/night" },
];

const luxuryElsaUnitList: UnitItem[] = [
  {
    name: "Luxury Junior Suite Elsa",
    type: "Apartments",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
    price: "FROM €100",
    note: "4 one bedroom suites",
  },
  {
    name: "Luxury Senior Suite Elsa",
    type: "Apartments",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    price: "FROM €130",
    note: "2 two bedroom suites",
  },
];

export function ComplexTemplateSections({ variant = "default" }: ComplexTemplateSectionsProps) {
  const [activeType, setActiveType] = useState<UnitType>("All");

  const isLuxuryElsa = variant === "luxury-elsa";
  const unitList = isLuxuryElsa ? luxuryElsaUnitList : defaultUnitList;

  const units = useMemo(() => (activeType === "All" ? unitList : unitList.filter((u) => u.type === activeType)), [activeType, unitList]);

  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-8 pt-4">
      <div className="rounded-2xl border border-slate-300 bg-[#091339] px-4 py-10 md:px-8">
        <p className="text-sm text-slate-300">
          Home › Complexes › <span className="font-semibold text-white">{isLuxuryElsa ? "Luxury Suites Elsa" : "Complex Template"}</span>
        </p>
        <h1 className="mt-3 text-center text-[56px] font-semibold leading-none text-white">{isLuxuryElsa ? "Explore Vacation Villas" : "Luxury Complex Template"}</h1>
        <p className="mx-auto mt-3 max-w-[900px] text-center text-[21px] text-slate-200">
          {isLuxuryElsa
            ? "The nearby 5-star Porto Carras resort is a great place to find activities including a casino, 18-hole golf course, spas, restaurants, and one of the largest organic wineries in Greece (which produces an exclusive local wine called Domaine Porto Carras). You might even escape the hustle and bustle of Neo Marmaras and take a day trip to the old town of Parthenonas where you can explore the quieter traditional Greek life."
            : "Reusable detail-page structure for mixed villa/apartment complexes with marketing, SEO and conversion-ready UI."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button className="rounded-xl bg-emerald-500 px-5 py-2.5 text-base font-semibold text-slate-900">Check availability</button>
          <button className="rounded-xl border border-white/40 bg-white px-5 py-2.5 text-base font-semibold text-slate-900">Open map</button>
        </div>
      </div>

      <section className="mt-6 rounded-2xl border border-slate-300 bg-white p-5 md:p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
          <aside className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="text-[32px] font-semibold leading-none text-slate-900">Units in this complex</h3>
            <div className="mt-3 space-y-1">
              {unitList.map((u) => (
                <button key={u.name} type="button" className="block w-full rounded-lg border border-transparent px-2 py-2 text-left text-[18px] leading-none text-slate-700 hover:border-slate-200 hover:bg-slate-50">
                  {u.name}
                </button>
              ))}
            </div>
            {isLuxuryElsa && <p className="mt-4 text-[21px] leading-none font-semibold text-slate-800">Shared Swimming Pool</p>}
          </aside>

          <div>
            <div className="flex flex-wrap gap-2">
              {unitTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`rounded-full border px-4 py-2 text-sm ${
                    activeType === type ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white text-slate-700"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-2">
              {units.map((u) => (
                <article key={u.name} className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <img src={u.image} alt={u.name} className="h-56 w-full object-cover" />
                  <div className="flex flex-1 flex-col p-3 text-center">
                    <p className="text-[30px] font-semibold leading-none text-slate-900">{u.name}</p>
                    {u.note ? (
                      <p className="mt-2 text-[21px] leading-none text-slate-600">{u.note}</p>
                    ) : (
                      <p className="mt-2 text-[18px] leading-none text-slate-600">
                        {u.type} {u.beds ? `· ${u.beds}` : ""} {u.guests ? `· ${u.guests}` : ""}
                      </p>
                    )}
                    {u.price && <p className="mt-3 text-[20px] font-semibold leading-none text-slate-900">{u.price}</p>}
                    <div className="mt-auto flex flex-nowrap items-center justify-center gap-2 pt-3">
                      <button className="whitespace-nowrap rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white">Discover more</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
