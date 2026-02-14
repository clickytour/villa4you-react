"use client";

import { useMemo, useState } from "react";

type OfferCategory = "Hot Offers" | "Last-Minute" | "Group Deals";

type Offer = {
  title: string;
  meta: string;
  chips: string[];
  image: string;
  categories: OfferCategory[];
};

const categories: { label: OfferCategory; icon: string }[] = [
  { label: "Hot Offers", icon: "🔥" },
  { label: "Last-Minute", icon: "⏱️" },
  { label: "Group Deals", icon: "👥" },
];

const offers: Offer[] = [
  {
    title: "Crete Family Retreat",
    meta: "Rethymno, Crete · Gap 4 nights",
    chips: ["-20%", "Until Check-in within 7 days", "Last-minute", "Voucher GAP4-AB12"],
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1200&auto=format&fit=crop",
    categories: ["Hot Offers", "Last-Minute"],
  },
  {
    title: "Santorini Caldera Escape",
    meta: "Fira, Santorini · Gap 3 nights",
    chips: ["-15%", "Premium Plan", "Romantic", "Voucher SUN15-SAN"],
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop",
    categories: ["Hot Offers"],
  },
  {
    title: "Paros Group Villa Deal",
    meta: "Naousa, Paros · Gap 5 nights",
    chips: ["-18%", "Group deal", "8+ guests", "Voucher CREW18-PRS"],
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    categories: ["Hot Offers", "Group Deals"],
  },
  {
    title: "Mykonos Weekend Offer",
    meta: "Mykonos Town · Gap 2 nights",
    chips: ["-12%", "Fast booking", "Couples", "Voucher MYK12-WKND"],
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
    categories: ["Last-Minute"],
  },
  {
    title: "Athens Riviera Smart Save",
    meta: "Vouliagmeni, Athens · Gap 6 nights",
    chips: ["-14%", "City + beach", "Family", "Voucher ATH14-RIV"],
    image: "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?q=80&w=1200&auto=format&fit=crop",
    categories: ["Hot Offers"],
  },
  {
    title: "Halkidiki Friends Plan",
    meta: "Kassandra · Gap 4 nights",
    chips: ["-17%", "Group deal", "Sea view", "Voucher HKD17-GRP"],
    image: "https://images.unsplash.com/photo-1464890100898-a385f744067f?q=80&w=1200&auto=format&fit=crop",
    categories: ["Group Deals"],
  },
  {
    title: "Corfu Shoulder-Season Pick",
    meta: "Corfu Town · Gap 7 nights",
    chips: ["-22%", "Shoulder season", "Flexible", "Voucher CRF22-FLEX"],
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    categories: ["Hot Offers"],
  },
  {
    title: "Naxos Extended Stay",
    meta: "Agios Prokopios · Gap 8 nights",
    chips: ["-16%", "Longer stay", "Remote work", "Voucher NAX16-LONG"],
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1200&auto=format&fit=crop",
    categories: ["Group Deals"],
  },
  {
    title: "Zakynthos Summer Drop",
    meta: "Laganas · Gap 3 nights",
    chips: ["-13%", "Summer drop", "Pool", "Voucher ZTH13-SUN"],
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
    categories: ["Last-Minute"],
  },
  {
    title: "Lefkada Coast Escape",
    meta: "Nydri · Gap 5 nights",
    chips: ["-19%", "Hot offer", "Sea access", "Voucher LFK19-SEA"],
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop",
    categories: ["Hot Offers", "Last-Minute"],
  },
  {
    title: "Rhodes Old Town Plus",
    meta: "Rhodes · Gap 4 nights",
    chips: ["-11%", "Culture + beach", "City break", "Voucher RDS11-CITY"],
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop",
    categories: ["Hot Offers"],
  },
  {
    title: "Pelion Nature Villa",
    meta: "Tsagarada · Gap 6 nights",
    chips: ["-15%", "Mountain + coast", "Quiet", "Voucher PLN15-NAT"],
    image: "https://images.unsplash.com/photo-1472224371017-08207f84aaae?q=80&w=1200&auto=format&fit=crop",
    categories: ["Group Deals"],
  },
];

export function PlansOffersSections() {
  const [activeCategory, setActiveCategory] = useState<OfferCategory>("Hot Offers");

  const filteredOffers = useMemo(
    () => offers.filter((offer) => offer.categories.includes(activeCategory)),
    [activeCategory],
  );

  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-8 pt-4">
      <div className="rounded-2xl border border-slate-300 bg-white p-5 md:p-8">
        <p className="text-sm text-slate-500">Home › <span className="font-semibold text-slate-700">Plans & Offers</span></p>

        <h1 className="mt-3 text-[56px] font-semibold leading-none text-slate-900">
          Plans & Offers: last-minute deals, group savings, and our Premium Plan
        </h1>

        <p className="mt-3 max-w-4xl text-[21px] text-slate-600">
          We track real availability and surface genuine savings. Browse current highlights or get one email when a new match appears for your dates.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((cat) => {
            const active = cat.label === activeCategory;
            return (
              <button
                key={cat.label}
                type="button"
                onClick={() => setActiveCategory(cat.label)}
                className={`rounded-full border px-4 py-2 text-sm font-medium ${
                  active ? "border-emerald-600 text-emerald-700" : "border-slate-300 text-slate-700"
                } bg-white`}
              >
                {cat.icon} {cat.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredOffers.map((offer) => (
            <article key={offer.title} className="overflow-hidden rounded-xl border border-slate-300 bg-white">
              <img src={offer.image} alt={offer.title} className="h-52 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-[30px] font-semibold leading-none text-slate-900">{offer.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{offer.meta}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {offer.chips.map((chip) => (
                    <span key={chip} className="rounded-full border border-slate-300 bg-white px-2.5 py-1 text-xs text-slate-700">
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex flex-nowrap gap-2">
                  <button className="whitespace-nowrap rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">Check availability</button>
                  <button className="whitespace-nowrap rounded-xl border border-slate-800 bg-white px-4 py-2 text-sm font-medium text-slate-900">Plan my trip</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
