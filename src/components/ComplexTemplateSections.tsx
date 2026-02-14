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
  variant?:
    | "default"
    | "luxury-elsa"
    | "galini-beachfront"
    | "olea-suites"
    | "deluxe-suites-bomo"
    | "simonitiko-beachfront-villas"
    | "tripotsmos-beachfront-a"
    | "tripotamos-beachfront-b"
    | "afitos-kassandra-halkidiki";
};

const defaultUnitList: UnitItem[] = [
  { name: "Luxury Suites Elsa", type: "Apartments", beds: "1 bedroom", guests: "2 guests", image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80", price: "from €110/night" },
  { name: "Galini Beachfront Maisonettes", type: "Villas", beds: "2 bedrooms", guests: "5 guests", image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80", price: "from €188/night" },
  { name: "Olea Suites & Apartments", type: "Apartments", beds: "1 bedroom", guests: "3 guests", image: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=1200&q=80", price: "from €120/night" },
];

const luxuryElsaUnitList: UnitItem[] = [
  { name: "Luxury Junior Suite Elsa", type: "Apartments", beds: "1 bedroom", guests: "2 guests", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80", price: "from €100/night", note: "4 one-bedroom suites" },
  { name: "Luxury Senior Suite Elsa", type: "Apartments", beds: "2 bedrooms", guests: "4 guests", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80", price: "from €130/night", note: "2 two-bedroom suites" },
];

const galiniUnitList: UnitItem[] = [
  { name: "Maisonette Tania 02", type: "Villas", beds: "2 bedrooms", guests: "5 guests", image: "https://images.unsplash.com/photo-1625602812206-5ec545ca1231?auto=format&fit=crop&w=1200&q=80" },
  { name: "Maisonette Tania 09", type: "Villas", beds: "2 bedrooms", guests: "5 guests", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80" },
  { name: "Maisonette Tania 39", type: "Villas", beds: "2 bedrooms", guests: "5 guests", image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80" },
  { name: "Maisonette Lucky 13", type: "Villas", beds: "2 bedrooms", guests: "5 guests", image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80" },
  { name: "Villa Aphrodite Beachfront", type: "Villas", beds: "2 bedrooms", guests: "5 guests", image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80" },
  { name: "Eva's House 29", type: "Villas", beds: "2 bedrooms", guests: "5 guests", image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80" },
  { name: "Eva's House 40", type: "Villas", beds: "2 bedrooms", guests: "5 guests", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80" },
  { name: "Eva's House 48", type: "Villas", beds: "2 bedrooms", guests: "5 guests", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" },
  { name: "Eva's House 06", type: "Villas", beds: "2 bedrooms", guests: "5 guests", image: "https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=1200&q=80" },
  { name: "Elli's House", type: "Villas", beds: "2 bedrooms", guests: "5 guests", image: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=1200&q=80" },
];

const oleaUnitList: UnitItem[] = [
  { name: "Deluxe Helga Apartment", type: "Apartments", beds: "2 bedrooms, 1 WC", guests: "Max 6 guests", image: "https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&w=1200&q=80", note: "350m to the beach" },
  { name: "Kalloni Luxury Twin Suite", type: "Apartments", beds: "2 bedrooms, 2 WC", guests: "Max 6 guests", image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80", note: "350m to the beach" },
  { name: "Junior Suite Vita", type: "Apartments", beds: "1 bedroom, 1 WC", guests: "Max 4 guests", image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80", note: "350m to the beach" },
  { name: "Luxury Suite Marina", type: "Apartments", beds: "1 bedroom, 1 WC", guests: "Max 4 guests", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80", note: "350m to the beach" },
  { name: "Deluxe Twin Suite Mary", type: "Apartments", beds: "2 bedrooms, 1 WC", guests: "Max 6 guests", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80", note: "350m to the beach" },
  { name: "Modern Maisonette Tamara", type: "Villas", beds: "3 bedrooms, 2.5 WC", guests: "Max 8 guests", image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80", note: "350m to the beach" },
  { name: "Luxury Twin Suite Maria", type: "Apartments", beds: "2 bedrooms, 1 WC", guests: "Max 6 guests", image: "/olea-luxury-twin-suite-maria.jpg", note: "350m to the beach" },
  { name: "Luxury Villa Gracia", type: "Villas", beds: "4 bedrooms, 3 WC", guests: "Max 10 guests", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80", note: "350m to the beach" },
];

const bomoUnitList: UnitItem[] = [
  { name: "Deluxe Suites Elena 1", type: "Apartments", beds: "1 bedroom, 1 WC", guests: "Max 4 guests", image: "/bomo-card-elena-1.jpg" },
  { name: "Deluxe Suites Elena 2", type: "Apartments", beds: "2 bedrooms, 1 WC", guests: "Max 6 guests", image: "/bomo-card-elena-2.jpg" },
  { name: "Deluxe Suite Dina", type: "Apartments", beds: "1 bedroom, 1 WC", guests: "Max 4 guests", image: "/bomo-card-tina.jpg" },
];

const simonitikoUnitList: UnitItem[] = [
  { name: "Villa Agni Beach Front", type: "Villas", beds: "4 bedrooms, 3 WC", guests: "Max 8 guests", image: "/simonitiko-agni.jpg" },
  { name: "Villa Theodora", type: "Villas", beds: "4 bedrooms, 2 WC", guests: "Max 8 guests", image: "/simonitiko-theodora.jpg", note: "Beach Front" },
  { name: "Villa Elinda", type: "Villas", beds: "4 bedrooms, 3 WC", guests: "Max 8 guests", image: "/simonitiko-elinda.jpg", note: "30 m from the beach" },
  { name: "Villa Nikol", type: "Villas", beds: "4 bedrooms, 3 WC", guests: "Max 8 guests", image: "/simonitiko-nikol.jpg", note: "30 m from the beach" },
  { name: "Villa Rossen", type: "Villas", beds: "4 bedrooms, 3 WC", guests: "Max 8 guests", image: "/simonitiko-rossen.jpg", note: "130 m from the beach" },
  { name: "Villa Spa Elina", type: "Villas", beds: "6 bedrooms, 4 WC", guests: "Max 12 guests", image: "/simonitiko-spa-elina.jpg", note: "200 m from the beach" },
  { name: "Villa Sandy", type: "Villas", beds: "4 bedrooms, 3 WC", guests: "Max 8 guests", image: "/simonitiko-sandy.jpg", note: "250 m from the beach" },
  { name: "Villa Rania", type: "Villas", beds: "4 bedrooms, 3 WC", guests: "Max 8 guests", image: "/simonitiko-rania.jpg", note: "250 m from the beach" },
  { name: "Villa Konstantina", type: "Villas", beds: "4 bedrooms, 3 WC", guests: "Max 8 guests", image: "/simonitiko-konstantina.jpg", note: "250 m from the beach" },
  { name: "Suite Anetta", type: "Apartments", beds: "1 bedroom, 1 WC", guests: "Max 4 guests", image: "/simonitiko-anetta.webp", note: "300 m from the beach" },
  { name: "Villa Victoria", type: "Villas", beds: "4 bedrooms, 2 WC", guests: "Max 8 guests", image: "/simonitiko-victoria.jpg", note: "250 m from the beach" },
];

const tripotsmosUnitList: UnitItem[] = [
  { name: "Villa White Rose", type: "Villas", beds: "3 bedrooms, 2 WC", guests: "Max 8 guests", image: "/tripotsmos-white-rose.jpg", note: "Beach Front" },
  { name: "Villa Myrta", type: "Villas", beds: "3 bedrooms, 2 WC", guests: "Max 7 guests", image: "/tripotsmos-myrta.jpg", note: "100 m to the beach" },
  { name: "Villa George", type: "Villas", beds: "3 bedrooms, 2 WC", guests: "Max 7 guests", image: "/tripotsmos-george.jpg", note: "100 m to the beach" },
  { name: "Villa Daphne", type: "Villas", beds: "4 bedrooms, 2 WC", guests: "Max 8 guests", image: "/tripotsmos-daphne.jpg", note: "Beach Front" },
  { name: "Villa Sussana", type: "Villas", beds: "3 bedrooms, 2 WC", guests: "Max 7 guests", image: "/tripotsmos-sussana.webp", note: "60 m to the beach" },
  { name: "Villa Evangelia", type: "Villas", beds: "3 bedrooms, 2 WC", guests: "Max 7 guests", image: "/tripotsmos-evangelia.jpg", note: "80 m to the beach" },
  { name: "Villa Georgia", type: "Villas", beds: "4 bedrooms, 2 WC", guests: "Max 8 guests", image: "/tripotsmos-georgia.jpg", note: "Beach Front" },
];

const tripotamosBUnitList: UnitItem[] = [
  { name: "Villa Maria", type: "Villas", beds: "Beach Front - 3 bedrooms, 1.5 WC", guests: "Max 6 Guests", image: "/tripotamos-b-card-base.jpg" },
  { name: "Villa Dora", type: "Villas", beds: "30 m to the beach - 3 bedrooms, 1.5 WC", guests: "Max 6 Guests", image: "/tripotamos-b-card-base.jpg" },
  { name: "Villa Stella", type: "Villas", beds: "40 m to the beach - 3 bedrooms, 1.5 WC", guests: "Max 6 Guests", image: "/tripotamos-b-card-base.jpg" },
  { name: "Villa Sulata", type: "Villas", beds: "140 m to the beach - 3 bedrooms, 1.5 WC", guests: "Max 6 Guests", image: "/tripotamos-b-card-base.jpg" },
  { name: "Villa Silvia", type: "Villas", beds: "80 m to the beach - 3 bedrooms, 1.5 WC", guests: "Max 6 Guests", image: "/tripotamos-b-card-base.jpg" },
  { name: "Villa Fotini", type: "Villas", beds: "60 m to the beach - 3 bedrooms, 1.5 WC", guests: "Max 6 Guests", image: "/tripotamos-b-card-base.jpg" },
  { name: "Villa Irini", type: "Villas", beds: "70 m to the beach - 3 bedrooms, 1.5 WC", guests: "Max 6 Guests", image: "/tripotamos-b-card-base.jpg" },
  { name: "Villa Sissy", type: "Villas", beds: "50 m to the beach - 5 bedrooms, 1.5 WC", guests: "Max 10 Guests", image: "/tripotamos-b-card-base.jpg" },
  { name: "Villa d'Este", type: "Villas", beds: "20 m to the beach - 4 bedrooms, 3 WC", guests: "Max 8 Guests", image: "/tripotamos-b-card-base.jpg" },
];

const afitosUnitList: UnitItem[] = [
  { name: "Afitos Traditional View Studio", type: "Apartments", beds: "1 bedroom, 1 bathroom", guests: "Max Guests 2", image: "/tripotamos-b-card-base.jpg", note: "100 meters from the beach" },
  { name: "Afitos Five Guests Apartment", type: "Apartments", beds: "2 bedrooms, 1 bathroom", guests: "Max Guests 5", image: "/tripotamos-b-card-base.jpg", note: "100 meters from the beach" },
  { name: "Two Bedrooms Apartment (Bunk bed)", type: "Apartments", beds: "2 bedrooms, 1 bathroom", guests: "Max Guests 6", image: "/tripotamos-b-card-base.jpg", note: "350 meters from the beach" },
  { name: "Two Bedrooms Apartment", type: "Apartments", beds: "2 bedrooms, 1 bathroom", guests: "Max Guests 5", image: "/tripotamos-b-card-base.jpg", note: "200 meters from the beach" },
  { name: "Afitos Heritage Villa", type: "Villas", beds: "2 bedrooms, 1 bathroom", guests: "Max Guests 6", image: "/tripotamos-b-card-base.jpg", note: "100 meters from the beach" },
  { name: "Family Maisonette", type: "Villas", beds: "2 bedrooms, 2 bathrooms", guests: "Max Guests 5", image: "/tripotamos-b-card-base.jpg", note: "100 meters from the beach" },
  { name: "Afitos Seaside Studio", type: "Apartments", beds: "1 bedroom, 1 bathroom", guests: "Max Guests 2", image: "/tripotamos-b-card-base.jpg", note: "100 meters from the beach" },
  { name: "Superior Studio", type: "Apartments", beds: "1 bedroom, 1 bathroom", guests: "Max Guests 2", image: "/tripotamos-b-card-base.jpg", note: "200 meters from the beach" },
  { name: "Harmony Apartment A", type: "Apartments", beds: "2 bedrooms, 1 bathroom", guests: "Max Guests 7", image: "/tripotamos-b-card-base.jpg", note: "100 meters from the beach" },
  { name: "Harmony Apartment B", type: "Apartments", beds: "2 bedrooms, 1 bathroom", guests: "Max Guests 6", image: "/tripotamos-b-card-base.jpg", note: "200 meters from the beach" },
  { name: "Harmony Apartment E", type: "Apartments", beds: "2 bedrooms, 1 bathroom", guests: "Max Guests 6", image: "/tripotamos-b-card-base.jpg", note: "200 meters from the beach" },
  { name: "Harmony Apartment F", type: "Apartments", beds: "2 bedrooms, 1 bathroom", guests: "Max Guests 7", image: "/tripotamos-b-card-base.jpg", note: "200 meters from the beach" },
  { name: "Aegean View Apartment", type: "Apartments", beds: "1 bedroom, 1 bathroom", guests: "Max Guests 8", image: "/tripotamos-b-card-base.jpg", note: "100 meters from the beach" },
  { name: "Grand Pool Villa", type: "Villas", beds: "4 bedrooms, 4 bathrooms", guests: "Max Guests 14", image: "/tripotamos-b-card-base.jpg", note: "100 meters from the beach" },
];

export function ComplexTemplateSections({ variant = "default" }: ComplexTemplateSectionsProps) {
  const isLuxuryElsa = variant === "luxury-elsa";
  const isGalini = variant === "galini-beachfront";
  const isOlea = variant === "olea-suites";
  const isBomo = variant === "deluxe-suites-bomo";
  const isSimonitiko = variant === "simonitiko-beachfront-villas";
  const isTripotsmos = variant === "tripotsmos-beachfront-a";
  const isTripotamosB = variant === "tripotamos-beachfront-b";
  const isAfitos = variant === "afitos-kassandra-halkidiki";

  const unitList = isLuxuryElsa
    ? luxuryElsaUnitList
    : isGalini
      ? galiniUnitList
      : isOlea
        ? oleaUnitList
        : isBomo
          ? bomoUnitList
          : isSimonitiko
            ? simonitikoUnitList
            : isTripotsmos
              ? tripotsmosUnitList
              : isTripotamosB
                ? tripotamosBUnitList
                : isAfitos
                  ? afitosUnitList
                  : defaultUnitList;

  const [activeType, setActiveType] = useState<UnitType>("All");
  const [activeUnit, setActiveUnit] = useState<string>("");

  const units = useMemo(() => {
    const typeFiltered = activeType === "All" ? unitList : unitList.filter((u) => u.type === activeType);
    if (!activeUnit) return typeFiltered;
    return typeFiltered.filter((u) => u.name === activeUnit || typeFiltered.length === 1 || !typeFiltered.some((x) => x.name === activeUnit));
  }, [activeType, activeUnit, unitList]);

  const heroTitle = isLuxuryElsa
    ? "Luxury Suites Elsa"
    : isGalini
      ? "Galini Beachfront Masonettes Complex"
      : isOlea
        ? "Olea Suites & Apartments Complex"
        : isBomo
          ? "Deluxe Suites Bomo"
          : isSimonitiko
            ? "Simonitiko Beachfront Villas Complex"
            : isTripotsmos
              ? "Tripotsmos Beachfront Complex A"
              : isTripotamosB
                ? "Tripotamos Beachfront Villas Complex B"
                : isAfitos
                  ? "Afitos Kassandra Halkidiki"
                  : "Luxury Complex Template";

  const heroDescription = isLuxuryElsa
    ? "The nearby Porto Carras resort offers activities including a casino, golf course, spas and restaurants."
    : isGalini
      ? "We want our guests to have the very best experience when visiting Nikiti."
      : isOlea
        ? "Our team is dedicated to giving our guests the very best holiday experience."
        : isBomo
          ? "The promenade along the beach has dozens of shops, restaurants and bars."
          : isSimonitiko
            ? "Beautiful sunsets and quiet beach moments in a peaceful setting."
            : isTripotsmos
              ? "Browse our collection of cozy and comfortable beachfront villas."
              : isTripotamosB
                ? "Marvel at the breathtaking sunsets from our beachfront villas in Tripotamos."
                : isAfitos
                  ? "Discover luxury and comfort at Villa4you's handpicked properties in Afitos, Kassandra Halkidiki."
                  : "Reusable detail-page structure for mixed villa/apartment complexes.";

  const amenities = [
    "Shared swimming pool",
    "Free Wi-Fi",
    "Private parking",
    "Air conditioning",
    "Family-friendly",
    "Outdoor seating",
    "Fully equipped kitchen",
    "Quick request support",
  ];

  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-8 pt-4">
      <div className="rounded-2xl border border-slate-300 bg-[#091339] px-4 py-10 md:px-8">
        <p className="text-sm text-slate-300">
          Home &gt; Complexes &gt; <span className="font-semibold text-white">{heroTitle}</span>
        </p>
        <h1 className="mt-3 text-center text-[56px] font-semibold leading-none text-white">
          {isTripotamosB ? "Sunset Villas at Tripotamos" : isAfitos ? "Afitos Kassandra Halkidiki" : isGalini || isOlea || isBomo || isSimonitiko || isTripotsmos ? "Explore Vacation Villas" : heroTitle}
        </h1>
        <p className="mx-auto mt-3 max-w-[900px] text-center text-[21px] text-slate-200">{heroDescription}</p>
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
              {unitList.map((u) => {
                const isActive = activeUnit === u.name;
                return (
                  <button
                    key={u.name}
                    type="button"
                    onClick={() => {
                      setActiveUnit(u.name);
                      setActiveType(u.type);
                    }}
                    className={`block w-full rounded-lg border px-2 py-2 text-left text-[18px] leading-none transition ${isActive ? "border-blue-500 bg-blue-50 text-slate-900" : "border-transparent text-slate-700 hover:border-slate-200 hover:bg-slate-50"}`}
                  >
                    {u.name}
                  </button>
                );
              })}
            </div>
            {(isLuxuryElsa || isGalini || isOlea || isBomo || isSimonitiko || isTripotsmos || isTripotamosB) && (
              <p className="mt-4 text-[21px] font-semibold leading-none text-slate-800">Shared Swimming Pool</p>
            )}
          </aside>

          <div>
            <div className="flex flex-wrap gap-2">
              {unitTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setActiveType(type);
                    if (type === "All") setActiveUnit("");
                    else setActiveUnit(unitList.find((u) => u.type === type)?.name ?? "");
                  }}
                  className={`rounded-full border px-4 py-2 text-sm ${activeType === type ? "border-emerald-500 bg-emerald-500 text-slate-900" : "border-slate-300 bg-white text-slate-700"}`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className={`mt-4 grid gap-4 ${isGalini || isOlea || isBomo || isSimonitiko || isTripotsmos || isTripotamosB || isAfitos ? "md:grid-cols-4" : "md:grid-cols-2 xl:grid-cols-2"}`}>
              {units.map((u) => (
                <article key={u.name} className="flex h-full flex-col overflow-hidden rounded-xl border border-blue-500 bg-white">
                  <img src={u.image} alt={u.name} className={`${isGalini || isOlea || isBomo || isSimonitiko || isTripotsmos || isTripotamosB || isAfitos ? "h-44" : "h-56"} w-full object-cover`} />
                  <div className="flex flex-1 flex-col p-3 text-center">
                    <p className={`${isGalini || isOlea || isBomo || isSimonitiko || isTripotsmos || isTripotamosB || isAfitos ? "text-[24px]" : "text-[30px]"} font-semibold leading-none text-slate-900`}>{u.name}</p>
                    {u.note ? <p className="mt-2 text-[18px] leading-none text-slate-600">{u.note}</p> : <p className="mt-2 text-[18px] leading-none text-slate-600">{u.beds ?? ""} {u.guests ? `- ${u.guests}` : ""}</p>}
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

      <section className="mt-6 rounded-2xl border border-slate-300 bg-white p-6">
        <h2 className="text-[34px] font-semibold leading-none text-slate-900">About this complex</h2>
        <p className="mt-3 text-[18px] text-slate-700">{heroDescription}</p>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-300 bg-white p-6">
        <h2 className="text-[34px] font-semibold leading-none text-slate-900">Amenities</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {amenities.map((item) => (
            <div key={item} className="rounded-xl border border-blue-500 px-4 py-3 text-[16px] font-medium text-slate-900">{item}</div>
          ))}
        </div>
      </section>

      {(isOlea || isBomo || isSimonitiko || isTripotsmos || isTripotamosB || isAfitos) ? (
        <section className="mt-6 rounded-2xl border border-slate-300 bg-white p-6">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <img
                src={isBomo ? "/bomo-details-main.jpg" : isSimonitiko ? "/simonitiko-details-main.jpg" : isTripotsmos ? "/tripotsmos-details-main.jpg" : isTripotamosB ? "/tripotsmos-details-main.jpg" : isAfitos ? "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80" : "/olea-details-main.jpg"}
                alt="Complex details"
                className="h-64 w-full rounded-xl object-cover"
              />
            </div>
            <div>
              <h2 className="text-[34px] font-semibold leading-none text-slate-900">Details</h2>
              <p className="mt-3 text-[17px] text-slate-700">
                {isBomo
                  ? "Our Deluxe Suites Elena is located in the heart of Nikiti and combines modern accommodation with balconies, terraces and a large shared swimming pool at the center of the property."
                  : isSimonitiko
                    ? "Located in Agia Kyriaki, this beachfront complex offers a quiet and family-friendly environment directly on a 500-meter beach."
                    : isTripotsmos
                      ? "Experience the ultimate holiday escape at Tripotsmos Beachfront Villas with cozy maisons and sea views."
                      : isTripotamosB
                        ? "Experience the ultimate holiday escape at Tripotamos Beachfront Villas Complex. Cozy and comfortable maisonettes offer a panoramic view of the sea from your spacious, covered veranda."
                        : isAfitos
                          ? "Afitos, a picturesque village located on the Kassandra peninsula of Halkidiki, Greece, blends natural beauty with traditional stone architecture and crystal-clear Aegean waters."
                          : "The grounds have outstanding amenities and family-friendly spaces."}
              </p>
              <p className="mt-3 text-[17px] text-slate-700">
                {isBomo
                  ? "Nikiti beach is a short walk away with many activities and beach bars nearby."
                  : isSimonitiko
                    ? "Shallow waters and protected bay conditions make this area ideal for families."
                    : isTripotsmos || isTripotamosB
                      ? "Our surrounding quiet white-sand beach is only minutes away. Enjoy peaceful holidays with nearby village amenities and easy access to Neo Marmaras."
                      : isAfitos
                        ? "Afitos is renowned for its local taverns, narrow cobblestone streets and vibrant cultural scene. The local artisan shops and nearby beaches make it ideal for a relaxing yet enriching holiday experience."
                        : "The complex is centrally located in Nikiti with easy access to local shops and beachfront promenade."}
              </p>

              <h3 className="mt-5 text-[26px] font-semibold text-slate-900">Distances</h3>
              <ul className="mt-3 space-y-2 text-slate-700">
                {isBomo ? (
                  <>
                    <li>✈ 90 km</li>
                    <li>🏖️ 100 meters</li>
                    <li>🛒 100 meters</li>
                    <li>🚌 100 meters</li>
                    <li>🏘️ 200 meters</li>
                    <li>⚓ 500 meters</li>
                  </>
                ) : isSimonitiko ? (
                  <>
                    <li>✈ 115 km</li>
                    <li>🏖️ 10 km</li>
                    <li>🛒 150 meters</li>
                    <li>🚌 300 meters</li>
                    <li>🏘️ 10 km</li>
                    <li>⚓ 7 km</li>
                  </>
                ) : isTripotsmos || isTripotamosB ? (
                  <>
                    <li>✈ 95 km</li>
                    <li>🏖️ 5 km</li>
                    <li>🛒 1 km</li>
                    <li>🚌 5 km</li>
                    <li>🏘️ 5 km</li>
                    <li>⚓ 5 km</li>
                  </>
                ) : isAfitos ? (
                  <>
                    <li>✈ 100 km</li>
                    <li>🏖️ 50-200 meters</li>
                    <li>🛒 50-350 meters</li>
                    <li>🚌 50-350 meters</li>
                    <li>🏘️ 250 meters</li>
                    <li>⚓ 200-800 meters</li>
                  </>
                ) : (
                  <>
                    <li>✈ 90 km</li>
                    <li>🏖️ 500 m</li>
                    <li>🛒 500 m</li>
                    <li>🚌 300 m</li>
                    <li>🏘️ 300 m</li>
                    <li>⚓ 400 m</li>
                  </>
                )}
              </ul>

              <button className="mt-4 rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-white">Quick Request</button>
            </div>
          </div>
        </section>
      ) : (
        <section className="mt-6 rounded-2xl border border-slate-300 bg-white p-6">
          <h2 className="text-[34px] font-semibold leading-none text-slate-900">Location highlights</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {["5 min to beach", "10 min to marina", "Near Porto Carras resort"].map((item) => (
              <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-center text-[17px] font-semibold text-slate-900">{item}</div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-6 rounded-2xl border border-slate-300 bg-[#091339] p-6 text-white">
        <h2 className="text-[34px] font-semibold leading-none">Need help choosing your suite?</h2>
        <p className="mt-3 max-w-[760px] text-[18px] text-slate-200">Tell us your travel dates and guest details - we will recommend the best available option in this complex.</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <button className="rounded-xl bg-emerald-500 px-5 py-2.5 text-base font-semibold text-slate-900">Contact host team</button>
          <button className="rounded-xl border border-white/40 bg-white px-5 py-2.5 text-base font-semibold text-slate-900">Check all dates</button>
        </div>
      </section>
    </section>
  );
}
