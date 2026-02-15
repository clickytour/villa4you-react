"use client";

import { useMemo, useState } from "react";

const regions = ["All Greece", "Halkidiki", "Mykonos", "Crete"] as const;
const stayTypes = ["All", "Villas", "Apartments", "Hotels", "Family"] as const;
const beachDistance = ["Any", "< 300m", "< 800m", "< 2km"] as const;

type Region = (typeof regions)[number];
type StayType = (typeof stayTypes)[number];
type Distance = (typeof beachDistance)[number];

type MapCard = {
  title: string;
  region: Exclude<Region, "All Greece">;
  type: Exclude<StayType, "All">;
  guests: number;
  pool: boolean;
  beachMeters: number;
  price: string;
  image: string;
};

const mapCards: MapCard[] = [
  { title: "Azure Bay Villa", region: "Halkidiki", type: "Villas", guests: 8, pool: true, beachMeters: 220, price: "from €240/night", image: "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?auto=format&fit=crop&w=1200&q=80" },
  { title: "Old Port Suites", region: "Crete", type: "Apartments", guests: 4, pool: false, beachMeters: 640, price: "from €132/night", image: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=1200&q=80" },
  { title: "Windmill View House", region: "Mykonos", type: "Villas", guests: 6, pool: true, beachMeters: 480, price: "from €318/night", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80" },
  { title: "Lagoon Family Stay", region: "Halkidiki", type: "Family", guests: 7, pool: true, beachMeters: 180, price: "from €198/night", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80" },
  { title: "Harbor Light Hotel", region: "Crete", type: "Hotels", guests: 3, pool: true, beachMeters: 950, price: "from €156/night", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80" },
  { title: "Psarou Coast Villa", region: "Mykonos", type: "Villas", guests: 10, pool: true, beachMeters: 120, price: "from €420/night", image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80" },
];

const faq = [
  {
    q: "How does map search work?",
    a: "Map Search displays villas, apartments and hotels by exact location. Apply filters and click each pin or card to compare options instantly.",
  },
  {
    q: "Can I filter by beach distance and pool?",
    a: "Yes. You can combine filters like beach distance, pool availability, stay type and guest capacity to narrow results quickly.",
  },
  {
    q: "Is this live availability?",
    a: "This page is currently UI demo mode for design validation. Live availability wiring can be connected in the next integration phase.",
  },
];

export function ExploreMapSections() {
  const [activeRegion, setActiveRegion] = useState<Region>("All Greece");
  const [activeType, setActiveType] = useState<StayType>("All");
  const [activeDistance, setActiveDistance] = useState<Distance>("Any");
  const [poolOnly, setPoolOnly] = useState(false);

  const filtered = useMemo(() => {
    return mapCards.filter((c) => {
      const regionOk = activeRegion === "All Greece" || c.region === activeRegion;
      const typeOk = activeType === "All" || c.type === activeType;
      const poolOk = !poolOnly || c.pool;
      const distanceOk =
        activeDistance === "Any" ||
        (activeDistance === "< 300m" && c.beachMeters < 300) ||
        (activeDistance === "< 800m" && c.beachMeters < 800) ||
        (activeDistance === "< 2km" && c.beachMeters < 2000);
      return regionOk && typeOk && poolOk && distanceOk;
    });
  }, [activeRegion, activeType, activeDistance, poolOnly]);

  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-8 pt-4">
      <div className="rounded-2xl border border-slate-300 bg-[#091339] px-4 py-10 md:px-8">
        <p className="text-sm text-slate-300">Home › <span className="font-semibold text-white">Explore Map</span></p>
        <h1 className="mt-3 text-center text-[56px] font-semibold leading-none text-white">Explore Villas on the Map</h1>
        <p className="mx-auto mt-3 max-w-[900px] text-center text-[21px] text-slate-200">
          Compare location, beach distance, pool and stay type in one view. Faster discovery, better decisions, higher booking confidence.
        </p>

        <div className="mx-auto mt-6 flex w-full max-w-[840px] flex-col gap-3 rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur sm:flex-row">
          <input className="h-12 w-full rounded-xl border border-white/20 bg-white px-4 text-slate-900 placeholder:text-slate-400 sm:flex-1" placeholder="Search area, beach, landmark..." />
          <button className="h-12 rounded-xl bg-emerald-500 px-6 text-base font-semibold text-slate-900 hover:bg-emerald-400">Search on map</button>
        </div>
      </div>

      <section className="mt-6 rounded-2xl border border-slate-300 bg-white p-5 md:p-6">
        <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
            <div className="flex items-center justify-between border-b border-slate-200 bg-white px-3 py-2">
              <p className="text-sm font-semibold text-slate-800">Interactive Map (UI demo)</p>
              <button className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-700">Reset view</button>
            </div>
            <div className="relative h-[420px] bg-[radial-gradient(circle_at_20%_20%,#dbeafe,transparent_35%),radial-gradient(circle_at_80%_30%,#bfdbfe,transparent_30%),linear-gradient(135deg,#e2e8f0,#f8fafc)]">
              <div className="absolute left-[20%] top-[22%] rounded-full bg-sky-500 px-2 py-1 text-xs font-semibold text-white">€240</div>
              <div className="absolute left-[52%] top-[34%] rounded-full bg-sky-500 px-2 py-1 text-xs font-semibold text-white">€318</div>
              <div className="absolute left-[67%] top-[58%] rounded-full bg-sky-500 px-2 py-1 text-xs font-semibold text-white">€156</div>
              <div className="absolute left-[36%] top-[65%] rounded-full bg-sky-500 px-2 py-1 text-xs font-semibold text-white">€198</div>
            </div>
          </div>

          <aside className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="text-[42px] font-semibold leading-none text-slate-900">Map Filters</h2>

            <div className="mt-4">
              <p className="mb-2 text-sm font-semibold text-slate-700">Region</p>
              <div className="flex flex-wrap gap-2">
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => setActiveRegion(region)}
                    className={`rounded-full border px-4 py-2 text-sm ${
                      activeRegion === region ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white text-slate-700"
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <p className="mb-2 text-sm font-semibold text-slate-700">Stay type</p>
              <div className="flex flex-wrap gap-2">
                {stayTypes.map((type) => (
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
            </div>

            <div className="mt-4">
              <p className="mb-2 text-sm font-semibold text-slate-700">Beach distance</p>
              <div className="flex flex-wrap gap-2">
                {beachDistance.map((dist) => (
                  <button
                    key={dist}
                    onClick={() => setActiveDistance(dist)}
                    className={`rounded-full border px-4 py-2 text-sm ${
                      activeDistance === dist ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white text-slate-700"
                    }`}
                  >
                    {dist}
                  </button>
                ))}
              </div>
            </div>

            <label className="mt-4 flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={poolOnly} onChange={(e) => setPoolOnly(e.target.checked)} /> Pool only
            </label>

            <p className="mt-4 text-sm text-slate-500">{filtered.length} demo stays match your filters.</p>
          </aside>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-300 bg-white p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-[42px] font-semibold leading-none text-slate-900">Map Results</h2>
          <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">Open full map experience</button>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((card) => (
            <article key={card.title} className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
              <img src={card.image} alt={card.title} className="h-44 w-full object-cover" />
              <div className="flex flex-1 flex-col p-4">
                <p className="text-[28px] font-semibold leading-none text-slate-900">{card.title}</p>
                <p className="mt-2 text-[21px] leading-none text-slate-600">{card.region} · {card.type} · {card.guests} guests</p>
                <p className="mt-2 text-sm text-slate-600">Beach {card.beachMeters}m · {card.pool ? "Pool" : "No pool"}</p>
                <p className="mt-3 text-[21px] font-semibold leading-none text-slate-900">{card.price}</p>
                <div className="mt-auto flex flex-nowrap items-center gap-2 pt-4">
                  <button className="whitespace-nowrap rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800">View details</button>
                  <button className="whitespace-nowrap rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white">Check dates</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-300 bg-white p-5">
          <h3 className="text-[28px] font-semibold leading-none text-slate-900">Smarter route to booking</h3>
          <p className="mt-2 text-[21px] leading-none text-slate-600">Spot clusters, compare neighborhoods, and decide faster with location-first discovery.</p>
        </div>
        <div className="rounded-2xl border border-slate-300 bg-white p-5">
          <h3 className="text-[28px] font-semibold leading-none text-slate-900">Built for conversion</h3>
          <p className="mt-2 text-[21px] leading-none text-slate-600">Transparent map context increases confidence and shortens the path from browse to booking.</p>
        </div>
        <div className="rounded-2xl border border-slate-300 bg-white p-5">
          <h3 className="text-[28px] font-semibold leading-none text-slate-900">SEO-friendly content blocks</h3>
          <p className="mt-2 text-[21px] leading-none text-slate-600">Structured headings and intent-matched copy support discoverability for map-related travel searches.</p>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-300 bg-white p-5 md:p-6">
        <h2 className="text-[42px] font-semibold leading-none text-slate-900">Explore Map FAQ</h2>
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
          {faq.map((item, idx) => (
            <details key={item.q} className={idx < faq.length - 1 ? "border-b border-slate-200" : ""}>
              <summary className="list-none p-3 marker:content-none">
                <div className="flex items-center justify-between rounded-lg border border-sky-500 px-3 py-2 text-[28px] font-semibold leading-none text-slate-900">
                  <span>{item.q}</span>
                  <span className="text-xl font-normal">+</span>
                </div>
              </summary>
              <p className="px-4 pb-4 text-[21px] leading-none text-slate-700">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-300 bg-white p-6 text-center">
        <h2 className="text-[42px] font-semibold leading-none text-slate-900">Need help choosing the right area?</h2>
        <p className="mx-auto mt-2 max-w-[900px] text-[21px] leading-none text-slate-600">Tell us your trip style and we’ll suggest high-converting options by map zone, beach access and budget.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button className="rounded-xl bg-slate-900 px-5 py-2.5 text-base font-medium text-white">Talk to concierge</button>
          <button className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-base font-medium text-slate-800">Open support form</button>
        </div>
      </section>
    </section>
  );
}
