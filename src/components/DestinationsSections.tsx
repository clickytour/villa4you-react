"use client";

import { useMemo, useState } from "react";
import { trackSearchHandoffClick } from "@/lib/searchAnalytics";

const quickRegions = ["Halkidiki", "Mykonos", "Crete"];
const quickPicks = ["Kassandra", "Sithonia", "Athos"] as const;
const themeFilters = ["Pefkochori", "Hanioti", "Kallithea", "Mykonos Town", "Psarou", "Chania Old Town"] as const;

type QuickPick = (typeof quickPicks)[number];
type ThemeFilter = (typeof themeFilters)[number];

type StayCard = {
  title: string;
  area: string;
  nights: string;
  guests: string;
  price: string;
  image: string;
};

const trustItems = [
  { title: "Verified stays", subtitle: "Curated villas & hotels", icon: "✅" },
  { title: "Local support", subtitle: "On-the-ground tips", icon: "🗺️" },
  { title: "Family friendly", subtitle: "Great for kids", icon: "👨‍👩‍👧" },
  { title: "Quick replies", subtitle: "WhatsApp/Viber/Email", icon: "💬" },
];

const regionCards = [
  {
    title: "Halkidiki beaches",
    description: "Blue-water coves, pine-backed shores, and relaxed beach villages.",
    image: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Mykonos windmills",
    description: "Iconic Cycladic skyline, sunset alleys, and vibrant old-town rhythm.",
    image: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Crete old town",
    description: "Harbor walks, Venetian streets, and authentic Cretan neighborhood life.",
    image: "https://images.unsplash.com/photo-1533658925625-efd2f491378f?auto=format&fit=crop&w=1200&q=80",
  },
];

const themeCards = [
  { title: "Beachfront Villas", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80" },
  { title: "Private Pool Villas", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80" },
  { title: "Family Friendly", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80" },
  { title: "Near Old Town", image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80" },
];

const staysByPick: Record<QuickPick, StayCard[]> = {
  Kassandra: [
    { title: "Seafront Villa Pine Bay", area: "Kassandra", nights: "3 nights", guests: "6 guests", price: "from €185/night", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80" },
    { title: "Blue Cove Residence", area: "Kassandra", nights: "5 nights", guests: "8 guests", price: "from €220/night", image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80" },
    { title: "Olive Garden Suites", area: "Kassandra", nights: "4 nights", guests: "4 guests", price: "from €140/night", image: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=1200&q=80" },
    { title: "Sunset Dunes Retreat", area: "Kassandra", nights: "7 nights", guests: "10 guests", price: "from €295/night", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80" },
    { title: "Aegean Breeze Loft", area: "Kassandra", nights: "2 nights", guests: "3 guests", price: "from €120/night", image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80" },
    { title: "Lagoon Pearl Apartments", area: "Kassandra", nights: "6 nights", guests: "5 guests", price: "from €168/night", image: "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?auto=format&fit=crop&w=1200&q=80" },
    { title: "Hidden Beach Maisonette", area: "Kassandra", nights: "3 nights", guests: "7 guests", price: "from €205/night", image: "https://images.unsplash.com/photo-1464890100898-a385f744067f?auto=format&fit=crop&w=1200&q=80" },
    { title: "Lemon Tree Courtyard", area: "Kassandra", nights: "4 nights", guests: "4 guests", price: "from €132/night", image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80" },
    { title: "Coral View Villa", area: "Kassandra", nights: "5 nights", guests: "9 guests", price: "from €248/night", image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80" },
  ],
  Sithonia: [
    { title: "Emerald Coast Villa", area: "Sithonia", nights: "4 nights", guests: "6 guests", price: "from €178/night", image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80" },
    { title: "Pine Hill Panorama", area: "Sithonia", nights: "5 nights", guests: "8 guests", price: "from €230/night", image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80" },
    { title: "Crystal Bay Apartments", area: "Sithonia", nights: "3 nights", guests: "4 guests", price: "from €135/night", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80" },
    { title: "Harbor View Maison", area: "Sithonia", nights: "7 nights", guests: "10 guests", price: "from €286/night", image: "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1200&q=80" },
    { title: "Sea Salt Studio", area: "Sithonia", nights: "2 nights", guests: "2 guests", price: "from €98/night", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80" },
    { title: "Lavender Court House", area: "Sithonia", nights: "6 nights", guests: "5 guests", price: "from €162/night", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80" },
    { title: "Cape Light Retreat", area: "Sithonia", nights: "4 nights", guests: "7 guests", price: "from €214/night", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80" },
    { title: "Marina Steps Residence", area: "Sithonia", nights: "3 nights", guests: "4 guests", price: "from €126/night", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80" },
    { title: "Sunrock Family Villa", area: "Sithonia", nights: "5 nights", guests: "9 guests", price: "from €239/night", image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80" },
  ],
  Athos: [
    { title: "Monastery View Lodge", area: "Athos", nights: "3 nights", guests: "4 guests", price: "from €145/night", image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80" },
    { title: "Quiet Bay Escape", area: "Athos", nights: "5 nights", guests: "6 guests", price: "from €188/night", image: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=1200&q=80" },
    { title: "Forest Edge Villa", area: "Athos", nights: "4 nights", guests: "8 guests", price: "from €228/night", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80" },
    { title: "Pilgrim Coast House", area: "Athos", nights: "6 nights", guests: "7 guests", price: "from €210/night", image: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1200&q=80" },
    { title: "Athos Olive Studio", area: "Athos", nights: "2 nights", guests: "2 guests", price: "from €89/night", image: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1200&q=80" },
    { title: "Cliffline Panorama", area: "Athos", nights: "7 nights", guests: "10 guests", price: "from €274/night", image: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=1200&q=80" },
    { title: "Hidden Harbor Nest", area: "Athos", nights: "3 nights", guests: "5 guests", price: "from €156/night", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80" },
    { title: "Aegean Stone House", area: "Athos", nights: "4 nights", guests: "6 guests", price: "from €182/night", image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1200&q=80" },
    { title: "Sunrise Veranda Villa", area: "Athos", nights: "5 nights", guests: "8 guests", price: "from €236/night", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80" },
  ],
};

const staysByTown: Record<ThemeFilter, StayCard[]> = {
  Pefkochori: [
    { title: "Pefkochori Palm Villa", area: "Pefkochori", nights: "4 nights", guests: "6 guests", price: "from €172/night", image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80" },
    { title: "Sea Alley Apartment", area: "Pefkochori", nights: "3 nights", guests: "4 guests", price: "from €129/night", image: "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=1200&q=80" },
    { title: "Wavefront Residence", area: "Pefkochori", nights: "5 nights", guests: "8 guests", price: "from €219/night", image: "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?auto=format&fit=crop&w=1200&q=80" },
    { title: "Harbor Garden House", area: "Pefkochori", nights: "2 nights", guests: "3 guests", price: "from €111/night", image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80" },
    { title: "Pine Coast Suites", area: "Pefkochori", nights: "6 nights", guests: "5 guests", price: "from €164/night", image: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80" },
    { title: "Sun Deck Maisonette", area: "Pefkochori", nights: "4 nights", guests: "7 guests", price: "from €196/night", image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80" },
  ],
  Hanioti: [
    { title: "Hanioti Breeze Home", area: "Hanioti", nights: "3 nights", guests: "4 guests", price: "from €138/night", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80" },
    { title: "Azure Bay Retreat", area: "Hanioti", nights: "5 nights", guests: "8 guests", price: "from €228/night", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80" },
    { title: "Olive Street Suites", area: "Hanioti", nights: "4 nights", guests: "5 guests", price: "from €149/night", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80" },
    { title: "Village Pearl Studio", area: "Hanioti", nights: "2 nights", guests: "2 guests", price: "from €95/night", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80" },
    { title: "Sunrise Family Villa", area: "Hanioti", nights: "6 nights", guests: "9 guests", price: "from €255/night", image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=80" },
    { title: "Garden Court Residence", area: "Hanioti", nights: "3 nights", guests: "6 guests", price: "from €168/night", image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80" },
  ],
  Kallithea: [
    { title: "Kallithea View Loft", area: "Kallithea", nights: "4 nights", guests: "4 guests", price: "from €142/night", image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80" },
    { title: "City & Sea House", area: "Kallithea", nights: "5 nights", guests: "7 guests", price: "from €214/night", image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1200&q=80" },
    { title: "Moonlight Penthouse", area: "Kallithea", nights: "2 nights", guests: "3 guests", price: "from €121/night", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80" },
    { title: "Promenade Studio", area: "Kallithea", nights: "3 nights", guests: "2 guests", price: "from €99/night", image: "https://images.unsplash.com/photo-1560185008-a33f32c5e8bd?auto=format&fit=crop&w=1200&q=80" },
    { title: "Asteria Family House", area: "Kallithea", nights: "6 nights", guests: "8 guests", price: "from €243/night", image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80" },
    { title: "Kallithea Garden Villa", area: "Kallithea", nights: "4 nights", guests: "6 guests", price: "from €187/night", image: "https://images.unsplash.com/photo-1616594039964-3f0ea8f7f5ea?auto=format&fit=crop&w=1200&q=80" },
  ],
  "Mykonos Town": [
    { title: "Little Venice Suite", area: "Mykonos Town", nights: "3 nights", guests: "2 guests", price: "from €210/night", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80" },
    { title: "Cycladic Charm Villa", area: "Mykonos Town", nights: "5 nights", guests: "6 guests", price: "from €340/night", image: "https://images.unsplash.com/photo-1505692952047-1a78307da8f2?auto=format&fit=crop&w=1200&q=80" },
    { title: "Sunset Alley House", area: "Mykonos Town", nights: "4 nights", guests: "4 guests", price: "from €265/night", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80" },
    { title: "Harbor White Studio", area: "Mykonos Town", nights: "2 nights", guests: "2 guests", price: "from €189/night", image: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80" },
    { title: "Windmill View Retreat", area: "Mykonos Town", nights: "6 nights", guests: "8 guests", price: "from €390/night", image: "https://images.unsplash.com/photo-1522706604294-ffaba7b8ebc9?auto=format&fit=crop&w=1200&q=80" },
    { title: "Aegean Steps Residence", area: "Mykonos Town", nights: "3 nights", guests: "5 guests", price: "from €278/night", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" },
  ],
  Psarou: [
    { title: "Psarou Bay Villa", area: "Psarou", nights: "4 nights", guests: "8 guests", price: "from €365/night", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80" },
    { title: "Beach Club House", area: "Psarou", nights: "5 nights", guests: "10 guests", price: "from €420/night", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80" },
    { title: "Coastal Serenity Loft", area: "Psarou", nights: "3 nights", guests: "4 guests", price: "from €250/night", image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80" },
    { title: "Blue Horizon Suites", area: "Psarou", nights: "2 nights", guests: "3 guests", price: "from €210/night", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80" },
    { title: "Palm Deck Residence", area: "Psarou", nights: "6 nights", guests: "7 guests", price: "from €332/night", image: "https://images.unsplash.com/photo-1617104551722-3b2d513664ef?auto=format&fit=crop&w=1200&q=80" },
    { title: "Sunline Villa Psarou", area: "Psarou", nights: "4 nights", guests: "9 guests", price: "from €389/night", image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80" },
  ],
  "Chania Old Town": [
    { title: "Harbor Stone House", area: "Chania Old Town", nights: "3 nights", guests: "4 guests", price: "from €176/night", image: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=1200&q=80" },
    { title: "Venetian Lane Retreat", area: "Chania Old Town", nights: "5 nights", guests: "6 guests", price: "from €225/night", image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80" },
    { title: "Old Port Suites", area: "Chania Old Town", nights: "4 nights", guests: "5 guests", price: "from €198/night", image: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1200&q=80" },
    { title: "Market Square Studio", area: "Chania Old Town", nights: "2 nights", guests: "2 guests", price: "from €119/night", image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80" },
    { title: "Lighthouse View Villa", area: "Chania Old Town", nights: "6 nights", guests: "8 guests", price: "from €268/night", image: "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1200&q=80" },
    { title: "Cretan Courtyard Home", area: "Chania Old Town", nights: "3 nights", guests: "6 guests", price: "from €184/night", image: "https://images.unsplash.com/photo-1464890100898-a385f744067f?auto=format&fit=crop&w=1200&q=80" },
  ],
};

export function DestinationsSections() {
  const [selectedRegion, setSelectedRegion] = useState<string>(quickRegions[0]);
  const [selectedPick, setSelectedPick] = useState<QuickPick>("Kassandra");
  const [selectedTheme, setSelectedTheme] = useState<string>(themeCards[0].title);
  const [selectedTown, setSelectedTown] = useState<ThemeFilter>("Pefkochori");

  const stays = useMemo(() => staysByPick[selectedPick], [selectedPick]);
  const townStays = useMemo(() => staysByTown[selectedTown], [selectedTown]);

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
          <a href="/search?vertical=stays&mode=vacation" onClick={() => trackSearchHandoffClick({ vertical: "stays", mode: "vacation", source_page: "destinations", handoff_surface: "hero_search", target_url: "/search?vertical=stays&mode=vacation" })} className="inline-flex h-12 items-center rounded-xl bg-emerald-500 px-7 text-base font-semibold text-slate-900 hover:bg-emerald-400">Search</a>
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

      <section className="mt-6 rounded-2xl border border-slate-300 bg-white p-5 md:p-6">
        <h2 className="text-[42px] font-semibold leading-none text-slate-900">Browse by Region</h2>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {regionCards.map((card) => (
            <button key={card.title} type="button" className="overflow-hidden rounded-xl border border-slate-200 bg-white text-left transition hover:border-slate-300">
              <img src={card.image} alt={card.title} className="h-40 w-full object-cover" />
              <div className="p-3">
                <p className="text-[28px] font-semibold leading-none text-slate-900">{card.title}</p>
                <p className="mt-2 text-[21px] leading-none text-slate-600">{card.description}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-semibold text-slate-800">Halkidiki quick pick:</span>
          {quickPicks.map((pick) => {
            const active = pick === selectedPick;
            return (
              <button
                key={pick}
                type="button"
                onClick={() => setSelectedPick(pick)}
                className={`rounded-full border px-4 py-2 text-sm ${
                  active ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white text-slate-700"
                }`}
              >
                {pick}
              </button>
            );
          })}
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {stays.map((stay) => (
            <article key={stay.title} className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
              <img src={stay.image} alt={stay.title} className="h-44 w-full object-cover" />
              <div className="flex flex-1 flex-col p-4">
                <p className="text-[28px] font-semibold leading-none text-slate-900">{stay.title}</p>
                <p className="mt-2 text-[21px] leading-none text-slate-600">{stay.area} · {stay.nights} · {stay.guests}</p>
                <p className="mt-3 text-[21px] font-semibold leading-none text-slate-900">{stay.price}</p>

                <div className="mt-auto flex flex-nowrap items-center gap-2 pt-4">
                  <a href={`/search?vertical=stays&mode=vacation&q=${encodeURIComponent(stay.title)}&location=${encodeURIComponent(stay.area)}`} onClick={() => trackSearchHandoffClick({ query: stay.title, vertical: "stays", mode: "vacation", location: stay.area, source_page: "destinations", handoff_surface: "stay_card_view_details", target_url: `/search?vertical=stays&mode=vacation&q=${encodeURIComponent(stay.title)}&location=${encodeURIComponent(stay.area)}` })} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 whitespace-nowrap">View details</a>
                  <a href={`/search?vertical=stays&mode=vacation&location=${encodeURIComponent(stay.area)}`} onClick={() => trackSearchHandoffClick({ vertical: "stays", mode: "vacation", location: stay.area, source_page: "destinations", handoff_surface: "stay_card_check_dates", target_url: `/search?vertical=stays&mode=vacation&location=${encodeURIComponent(stay.area)}` })} className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white whitespace-nowrap">Check dates</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-300 bg-white p-5 md:p-6">
        <h2 className="text-[42px] font-semibold leading-none text-slate-900">Inspiration by Theme</h2>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {themeCards.map((card) => {
            const active = selectedTheme === card.title;
            return (
              <button
                key={card.title}
                type="button"
                onClick={() => setSelectedTheme(card.title)}
                className={`overflow-hidden rounded-xl border text-left transition ${
                  active ? "border-slate-900" : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <img src={card.image} alt={card.title} className="h-24 w-full object-cover" />
                <div className="p-3">
                  <p className="text-[28px] font-semibold leading-none text-slate-900">{card.title}</p>
                </div>
              </button>
            );
          })}
        </div>

        <h3 className="mt-8 text-[42px] font-semibold leading-none text-slate-900">Trending Towns</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {themeFilters.map((town) => {
            const active = selectedTown === town;
            return (
              <button
                key={town}
                type="button"
                onClick={() => setSelectedTown(town)}
                className={`rounded-full border px-5 py-2 text-base ${
                  active ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white text-slate-700"
                }`}
              >
                {town}
              </button>
            );
          })}
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {townStays.map((stay) => (
            <article key={stay.title} className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
              <img src={stay.image} alt={stay.title} className="h-44 w-full object-cover" />
              <div className="flex flex-1 flex-col p-4">
                <p className="text-[28px] font-semibold leading-none text-slate-900">{stay.title}</p>
                <p className="mt-2 text-[21px] leading-none text-slate-600">{stay.area} · {stay.nights} · {stay.guests}</p>
                <p className="mt-3 text-[21px] font-semibold leading-none text-slate-900">{stay.price}</p>

                <div className="mt-auto flex flex-nowrap items-center gap-2 pt-4">
                  <a href={`/search?vertical=stays&mode=vacation&q=${encodeURIComponent(stay.title)}&location=${encodeURIComponent(stay.area)}`} onClick={() => trackSearchHandoffClick({ query: stay.title, vertical: "stays", mode: "vacation", location: stay.area, source_page: "destinations", handoff_surface: "town_stay_card_view_details", target_url: `/search?vertical=stays&mode=vacation&q=${encodeURIComponent(stay.title)}&location=${encodeURIComponent(stay.area)}` })} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 whitespace-nowrap">View details</a>
                  <a href={`/search?vertical=stays&mode=vacation&location=${encodeURIComponent(stay.area)}`} onClick={() => trackSearchHandoffClick({ vertical: "stays", mode: "vacation", location: stay.area, source_page: "destinations", handoff_surface: "town_stay_card_check_dates", target_url: `/search?vertical=stays&mode=vacation&location=${encodeURIComponent(stay.area)}` })} className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white whitespace-nowrap">Check dates</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-300 bg-white p-5 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-[42px] font-semibold leading-none text-slate-900">Prefer to explore on a map?</h2>
            <p className="mt-2 text-[21px] leading-none text-slate-600">See every villa, hotel and complex by location, with filters for beach distance, pool and more.</p>
          </div>
          <a href="/search?vertical=stays&mode=vacation" onClick={() => trackSearchHandoffClick({ vertical: "stays", mode: "vacation", source_page: "destinations", handoff_surface: "open_map_search", target_url: "/search?vertical=stays&mode=vacation" })} className="inline-flex items-center rounded-xl bg-sky-500 px-6 py-3 text-base font-semibold text-white hover:bg-sky-600">Open Map Search</a>
        </div>
      </section>
    </section>
  );
}
