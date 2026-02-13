const popularDestinationCards = [
  {
    title: "Crete",
    tags: ["Family", "Gastronomy"],
    text: "Largest Greek island—beaches, gorges, villages, and world-class cuisine.",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Santorini",
    tags: ["Luxury", "Romance"],
    text: "Caldera sunsets and iconic whitewashed villages.",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Mykonos",
    tags: ["Nightlife", "Luxury"],
    text: "Iconic beaches, beach clubs, and Cycladic charm.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Paros",
    tags: ["Family", "Relaxed"],
    text: "Balanced island vibe with beaches and authentic villages.",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Rhodes",
    tags: ["History", "Beach"],
    text: "Medieval old town with long sunny coastline.",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Corfu",
    tags: ["Nature", "Culture"],
    text: "Green landscapes, elegant town center, and crystal waters.",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
  },
];

export function ForGuestsSections() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <h2 className="text-[32px] font-semibold tracking-[-0.01em] text-slate-900">Popular destinations</h2>
        <p className="mt-1 text-[16px] text-slate-600">
          Browse our most loved islands and city breaks. Jump to guides or straight to villas.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {popularDestinationCards.map((card) => (
            <article key={card.title} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <img src={card.image} alt={card.title} className="h-44 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-[30px] font-semibold leading-none text-slate-900">{card.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-300 px-2 py-1 text-[11px] text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-[15px] text-slate-700">{card.text}</p>
              </div>
              <div className="flex gap-2 border-t border-slate-200 p-4">
                <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm">Explore</button>
                <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm text-white">See Villas</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
