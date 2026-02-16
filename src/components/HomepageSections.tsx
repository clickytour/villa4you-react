const whyBookCards = [
  {
    title: "18+ years",
    desc: "Experience in Greek stays",
  },
  {
    title: "Vetted villas",
    desc: "Quality, safety, compliance",
  },
  {
    title: "Trip assistance",
    desc: "Transfers & activities",
  },
  {
    title: "Transparent",
    desc: "Clear pricing & policies",
  },
];

const destinationCards = [
  { name: "Santorini", tag: "Popular for couples" },
  { name: "Mykonos", tag: "Lifestyle & nightlife" },
  { name: "Paros", tag: "Family-friendly stays" },
  { name: "Crete", tag: "Long-stay variety" },
  { name: "Rhodes", tag: "Beach + history" },
  { name: "Corfu", tag: "Nature + villas" },
];

const blogCards = [
  { title: "How agents earn with net pricing", meta: "Collaborate · 4 min read" },
  { title: "Partner onboarding checklist", meta: "Partners · 5 min read" },
  { title: "How to list services effectively", meta: "Providers · 4 min read" },
];

const serviceCards = [
  "Airport transfers",
  "Private chef",
  "Boat experiences",
  "Housekeeping",
  "Concierge support",
  "Activity planning",
];

export function HomepageSections() {
  return (
    <div className="bg-[#f3f5f8] pb-20">
      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-[40px] font-medium tracking-tight text-slate-900">Why book with Villa4you</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {whyBookCards.map((card) => (
              <article key={card.title} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-5 text-center">
                <h3 className="text-[34px] font-semibold leading-none text-slate-900">{card.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{card.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold">How it works</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              "Choose destination + travel dates",
              "Receive curated villa shortlist",
              "Confirm and book with confidence",
            ].map((step, i) => (
              <div key={step} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold text-slate-500">STEP {i + 1}</p>
                <p className="mt-1 text-sm font-medium text-slate-800">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold">Top destinations</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {destinationCards.map((d) => (
              <article key={d.name} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="h-24 rounded-md bg-slate-200" />
                <h3 className="mt-3 font-semibold">{d.name}</h3>
                <p className="text-sm text-slate-600">{d.tag}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold">Popular villa services</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {serviceCards.map((s) => (
              <span key={s} className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1.5 text-sm text-slate-700">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold">Collaborate posts</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {blogCards.map((b) => (
              <article key={b.title} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="h-28 rounded-md bg-slate-200" />
                <h3 className="mt-3 font-semibold">{b.title}</h3>
                <small className="text-slate-500">{b.meta}</small>
                <div className="mt-3">
                  <button className="rounded-md bg-slate-900 px-3 py-1.5 text-sm text-white">Read</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold">Trusted by guests, owners and partners</h2>
          <blockquote className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            “Fast response, clear options, and smooth booking handoff.”
          </blockquote>
          <div className="mt-4 grid gap-2 text-sm text-slate-700 md:grid-cols-2">
            <p>• 18+ years hospitality experience</p>
            <p>• Verified providers and operations support</p>
            <p>• Structured booking and CRM workflows</p>
            <p>• Baseline design aligned for all next pages</p>
          </div>
        </div>
      </section>
    </div>
  );
}
