const popularDestinationCards = [
  {
    title: "Halkidiki",
    tags: ["Family", "Beach"],
    text: "Three-peninsula region with clear waters, relaxed villages, and summer energy.",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Kassandra",
    tags: ["Nightlife", "Beach clubs"],
    text: "Popular first peninsula for lively beach bars and easy-access seaside stays.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Sithonia",
    tags: ["Nature", "Relaxed"],
    text: "Hidden coves, pine landscapes, and quieter holiday rhythm.",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Athos",
    tags: ["Culture", "Nature"],
    text: "Distinct eastern peninsula known for dramatic coastline and spiritual heritage.",
    image:
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Crete",
    tags: ["Family", "Gastronomy"],
    text: "Largest Greek island with beaches, gorges, villages, and world-class cuisine.",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Mykonos",
    tags: ["Luxury", "Lifestyle"],
    text: "Iconic beaches, stylish dining, and classic Cycladic atmosphere.",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop",
  },

];

export function ForGuestsSections() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-10">
      <div className="rounded-[24px] border border-slate-200 bg-white/95 p-5 shadow-sm md:p-6">
        <h2 className="text-[32px] font-semibold tracking-[-0.01em] text-slate-900">Popular destinations</h2>
        <p className="mt-1 text-[16px] text-slate-600">
          Browse our most loved islands and city breaks. Jump to guides or straight to villas.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {popularDestinationCards.map((card) => (
            <article key={card.title} className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
              <img src={card.image} alt={card.title} className="h-44 w-full object-cover" />
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-[34px] font-semibold leading-none text-slate-900">{card.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-300 px-2 py-1 text-[11px] text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-3 min-h-[48px] text-[15px] text-slate-700">{card.text}</p>
              </div>
              <div className="mt-auto flex items-center gap-2 border-t border-slate-200 p-4">
                <button className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900">Explore</button>
                <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm text-white">See Villas</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

