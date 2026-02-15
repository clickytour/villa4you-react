const amenityFilters = [
  "Pool",
  "Beachfront",
  "Heated pool",
  "Hot tub",
  "Wi-Fi",
  "Parking",
  "Chef",
  "Gym",
  "Accessible",
  "Pet-friendly",
];

const vibeFilters = ["Family", "Luxury", "Romantic", "Nightlife", "Remote", "Great views"];

const resultCards = [
  {
    name: "Eros Caldera View Villa",
    location: "Santorini",
    guests: "6 guests",
    bedsBaths: "3 bd / 3 ba",
    rating: "4.7",
    price: "€680/night",
    tags: ["Romantic", "View", "Luxury", "Pool", "Wifi", "Hot Tub"],
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Mykonos Sunset Estate",
    location: "Mykonos",
    guests: "10 guests",
    bedsBaths: "5 bd / 5 ba",
    rating: "4.6",
    price: "€820/night",
    tags: ["Nightlife", "Luxury", "View", "Pool", "Wifi", "Parking", "Chef"],
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Cretan Family Retreat",
    location: "Crete",
    guests: "7 guests",
    bedsBaths: "3 bd / 2 ba",
    rating: "4.5",
    price: "€540/night",
    tags: ["Family", "Value", "Pool", "Wifi", "Parking", "Pet Friendly"],
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Paros White Horizon",
    location: "Paros",
    guests: "8 guests",
    bedsBaths: "4 bd / 3 ba",
    rating: "4.8",
    price: "€620/night",
    tags: ["View", "Pool", "Chef", "Luxury"],
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Athens Riviera Loft",
    location: "Athens",
    guests: "4 guests",
    bedsBaths: "2 bd / 2 ba",
    rating: "4.4",
    price: "€360/night",
    tags: ["City", "Wifi", "Parking"],
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Halkidiki Pine Haven",
    location: "Halkidiki",
    guests: "9 guests",
    bedsBaths: "4 bd / 3 ba",
    rating: "4.7",
    price: "€590/night",
    tags: ["Family", "Beachfront", "Pool", "Great views"],
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Corfu Garden House",
    location: "Corfu",
    guests: "6 guests",
    bedsBaths: "3 bd / 2 ba",
    rating: "4.6",
    price: "€510/night",
    tags: ["Family", "Pet Friendly", "Pool"],
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Rhodes Sea Breeze",
    location: "Rhodes",
    guests: "5 guests",
    bedsBaths: "2 bd / 2 ba",
    rating: "4.3",
    price: "€430/night",
    tags: ["Beachfront", "Value", "Wifi"],
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Santorini Lava Dome",
    location: "Santorini",
    guests: "12 guests",
    bedsBaths: "6 bd / 6 ba",
    rating: "4.9",
    price: "€1100/night",
    tags: ["Luxury", "View", "Hot Tub", "Chef"],
    image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Naxos Windmill Villa",
    location: "Naxos",
    guests: "6 guests",
    bedsBaths: "3 bd / 2 ba",
    rating: "4.5",
    price: "€470/night",
    tags: ["Romantic", "Remote", "Pool"],
    image: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Kefalonia Coast Nest",
    location: "Kefalonia",
    guests: "8 guests",
    bedsBaths: "4 bd / 3 ba",
    rating: "4.6",
    price: "€560/night",
    tags: ["Great views", "Pool", "Wifi"],
    image: "https://images.unsplash.com/photo-1499696010181-1e4fbc9f70b2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Zakynthos Olive Peak",
    location: "Zakynthos",
    guests: "7 guests",
    bedsBaths: "3 bd / 3 ba",
    rating: "4.4",
    price: "€520/night",
    tags: ["Family", "Parking", "Gym"],
    image: "https://images.unsplash.com/photo-1430285561322-7808604715df?q=80&w=1200&auto=format&fit=crop",
  },
];

export function SearchResultsGuestSections() {
  return (
    <>
      <section className="mx-auto max-w-[1280px] px-4 pb-4">
        <div className="rounded-xl border border-slate-300 bg-white p-3">
          <div className="grid gap-3 md:grid-cols-6">
            <label className="text-sm text-slate-700">Search<input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" value="Try: Santorini" readOnly /></label>
            <label className="text-sm text-slate-700">Destination<select className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"><option>Any</option></select></label>
            <label className="text-sm text-slate-700">Check-in<input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" value="dd/mm/yyyy" readOnly /></label>
            <label className="text-sm text-slate-700">Check-out<input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" value="dd/mm/yyyy" readOnly /></label>
            <label className="text-sm text-slate-700">Guests<input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" value="e.g., 6" readOnly /></label>
            <label className="text-sm text-slate-700">Max €/night<input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" value="e.g., 800" readOnly /></label>
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-6">
            <label className="text-sm text-slate-700">Bedrooms (min)<select className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"><option>Any</option></select></label>
            <label className="text-sm text-slate-700">Bathrooms (min)<select className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"><option>Any</option></select></label>
            <label className="text-sm text-slate-700">Type<select className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"><option>Any</option></select></label>
            <label className="text-sm text-slate-700">Rating<select className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"><option>Any</option></select></label>
            <div className="md:col-span-2">
              <p className="text-sm text-slate-700">Amenities</p>
              <div className="mt-1 flex flex-wrap gap-2">
                {amenityFilters.map((a) => (
                  <span key={a} className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-sm text-rose-600">{a}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {vibeFilters.map((v) => (
                <span key={v} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700">{v}</span>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <select className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"><option>Sort: Relevance</option></select>
              <button className="rounded-xl border border-slate-800 bg-white px-4 py-2 text-sm font-medium text-slate-900">Reset filters</button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <p className="text-[22px] text-slate-700">12 villas match your filters</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {resultCards.map((card) => (
            <article key={card.name} className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-300 bg-white">
              <div className="relative">
                <img src={card.image} alt={card.name} className="h-[260px] w-full object-cover" />
                <span className="absolute left-3 top-3 rounded-full bg-slate-800 px-3 py-1 text-sm text-white">from {card.price}</span>
              </div>
              <div className="flex-1 p-3">
                <h3 className="text-[34px] font-semibold leading-none text-slate-900">{card.name}</h3>
                <p className="mt-2 text-[21px] text-slate-600">{card.location} · {card.guests} · {card.bedsBaths} · ★ {card.rating}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {card.tags.map((t) => (
                    <span key={t} className="rounded-full border border-slate-300 bg-white px-2 py-1 text-sm text-slate-600">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex flex-nowrap gap-2 border-t border-slate-300 p-3">
                <button className="whitespace-nowrap rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">Check availability</button>
                <button className="whitespace-nowrap rounded-xl border border-slate-800 bg-white px-4 py-2 text-sm font-medium text-slate-900">View details</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-10">
        <div className="rounded-xl border border-slate-300 bg-white p-4">
          <h2 className="text-[34px] font-semibold leading-none text-slate-900">How to filter the best Greek villa for your trip</h2>
          <p className="mt-3 text-[21px] text-slate-700">Start with destination and travel month, then filter by <em>guests</em>, <em>bedrooms</em>, and <em>budget per night</em>. Amenities like heated pool or beachfront quickly narrow options. Want a human shortlist? Our team can match you to the best fit in minutes.</p>
        </div>
      </section>
    </>
  );
}
