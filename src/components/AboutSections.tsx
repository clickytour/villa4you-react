const stats = [
  { value: "25k+", label: "Guests served" },
  { value: "400+", label: "Curated villas" },
  { value: "4.9/5", label: "Average guest rating" },
  { value: "18 yrs", label: "Operating in Greece" },
];

const story = [
  {
    title: "2006",
    text: "Started with a handful of villas in Halkidiki, building trust one stay at a time.",
  },
  {
    title: "2014",
    text: "Expanded to Crete & Santorini; launched owner services focused on revenue & reviews.",
  },
  {
    title: "2020",
    text: "Unified guest support & operations; added premium concierge and transfers.",
  },
  {
    title: "Today",
    text: "Multi-region portfolio, data-driven pricing, and vetted partners for seamless stays.",
  },
];

const team = [
  {
    name: "Maria K.",
    role: "Guest Experience Lead",
    contact: "maria@villa4you.gr",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Giorgos P.",
    role: "Operations",
    contact: "LinkedIn",
    image: "",
  },
  {
    name: "Irina S.",
    role: "Owner Success",
    contact: "owners@villa4you.gr",
    image: "",
  },
  {
    name: "Nikos T.",
    role: "Revenue & Pricing",
    contact: "pricing@villa4you.gr",
    image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?q=80&w=900&auto=format&fit=crop",
  },
];

const reviews = [
  {
    quote: "Flawless check-in and spot-on villa suggestions for our family trip.",
    by: "— Elena, Athens",
  },
  {
    quote: "Our occupancy jumped 22% after switching to Villa4you's management.",
    by: "— Dimitris, Owner",
  },
  {
    quote: "Concierge arranged everything from transfers to a private chef. 10/10.",
    by: "— Chloe, UK",
  },
];

const trust = ["SSL", "Secure payments", "Partner", "Partner"];

export function AboutSections() {
  return (
    <>
      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <div className="grid gap-3 md:grid-cols-4">
          {stats.map((s) => (
            <article key={s.value} className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-center">
              <h3 className="text-[42px] font-semibold leading-none text-slate-900">{s.value}</h3>
              <p className="mt-2 text-[21px] text-slate-600">{s.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <div className="rounded-2xl border border-slate-300 bg-white p-4">
          <h2 className="text-[56px] font-semibold leading-none text-slate-900">Our story</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            {story.map((item) => (
              <article key={item.title} className="rounded-xl border border-slate-300 bg-white p-4">
                <h3 className="text-[34px] font-semibold leading-none text-slate-900">{item.title}</h3>
                <p className="mt-3 text-[21px] text-slate-700">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <h2 className="text-[56px] font-semibold leading-none text-slate-900">Meet the team</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          {team.map((m) => (
            <article key={m.name} className="overflow-hidden rounded-xl border border-slate-300 bg-white">
              {m.image ? <img src={m.image} alt={m.name} className="h-[260px] w-full object-cover" /> : <div className="h-[260px] w-full bg-slate-200" />}
              <div className="p-3">
                <h3 className="text-[30px] font-semibold leading-none text-slate-900">{m.name}</h3>
                <p className="mt-1 text-[21px] text-slate-600">{m.role}</p>
                <p className="mt-1 text-[21px] text-rose-600">{m.contact}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <div className="rounded-2xl border border-slate-300 bg-white p-4">
          <h2 className="text-[56px] font-semibold leading-none text-slate-900">Reviews</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {reviews.map((r) => (
              <article key={r.quote} className="rounded-xl border border-slate-300 bg-white p-4">
                <p className="text-[30px] text-slate-800">“{r.quote}”</p>
                <p className="mt-3 text-[21px] text-slate-500">{r.by}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-10">
        <h2 className="text-[56px] font-semibold leading-none text-slate-900">Trusted by travelers & partners</h2>
        <div className="mt-3 flex flex-wrap gap-5 text-[34px] text-slate-600">
          {trust.map((t) => (
            <span key={t}>✓ {t}</span>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-slate-300 bg-white px-4 py-6 text-center">
          <h3 className="text-[56px] font-semibold leading-none text-slate-900">Where to next?</h3>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <button className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white">Browse Destinations</button>
            <button className="rounded-xl border border-slate-800 bg-white px-5 py-2.5 text-sm font-medium text-slate-900">Owners: Free Evaluation</button>
          </div>
        </div>
      </section>
    </>
  );
}
