const topCards = [
  { title: "18+ yrs", text: "Hospitality experience" },
  { title: "Multi-channel", text: "Distribution & pricing" },
  { title: "End-to-end", text: "Ops & guest support" },
  { title: "Transparent", text: "Reporting & dashboards" },
];

const models = [
  {
    title: "Self-Managed (with Pro Tools)",
    badge: "You host · We boost",
    bullets: [
      "Listing optimization & pro photos guidance",
      "Pricing recommendations & seasonality plan",
      "Optional guest support playbooks",
    ],
    note: "Best for owners who love hands-on hosting and want expert structure.",
  },
  {
    title: "Multi-Platform Sync",
    badge: "We distribute · You operate",
    bullets: [
      "Channel distribution & calendar sync",
      "Rate strategy & promo campaigns",
      "Lead capture & pre-booking screening",
    ],
    note: "Ideal when you want bookings growth without changing your operations.",
  },
  {
    title: "Fully Managed",
    badge: "We run it · You relax",
    bullets: [
      "Revenue management & multi-channel distribution",
      "Guest ops: from enquiry to check-out",
      "On-the-ground partners & quality control",
    ],
    note: "For owners seeking hassle-free performance and brand-level standards.",
  },
];

const steps = [
  {
    title: "1) Free Evaluation",
    text: "Share your property basics and goals. We review demand, seasonality, and revenue upside.",
  },
  {
    title: "2) Onboarding",
    text: "Listing refresh, pricing plan, calendar sync, and ops checklist. Pick your model and start date.",
  },
  {
    title: "3) Go-Live & Optimize",
    text: "Activate distribution and track leads/bookings. We iterate pricing & content for peak results.",
  },
];

const results = [
  {
    title: "Crete — 3BR sea-view villa",
    text: "+21% shoulder-season occupancy after calendar sync & promo bundles.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Mykonos — premium hillside villa",
    text: "Higher ADR with minimum-stay tuning & content refresh; fewer gaps.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Halkidiki — family house",
    text: "Stabilized bookings via families segment + curated activity partners.",
    image: "",
  },
];

export function VacationPropertyManagementSections() {
  return (
    <>
      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <div className="grid gap-3 md:grid-cols-4">
          {topCards.map((c) => (
            <article key={c.title} className="rounded-xl border border-slate-300 bg-white px-4 py-3">
              <h3 className="text-[42px] font-semibold leading-none text-slate-900">{c.title}</h3>
              <p className="mt-1 text-[21px] text-slate-600">{c.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <h2 className="text-[56px] font-semibold leading-none text-slate-900">Pick the management model that fits your goals</h2>
        <p className="mt-3 text-[22px] text-slate-600">Start light with syncing, keep control with self-managed support, or hand off everything for maximum ROI.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {models.map((m) => (
            <article key={m.title} className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-300 bg-white">
              <div className="border-b border-slate-300 p-4">
                <h3 className="text-[34px] font-semibold leading-none text-slate-900">{m.title}</h3>
              </div>
              <div className="flex-1 p-4">
                <span className="inline-block rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-600">{m.badge}</span>
                <ul className="mt-4 list-disc space-y-1 pl-6 text-[21px] text-slate-800">
                  {m.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <p className="mt-4 text-[21px] text-slate-600">{m.note}</p>
              </div>
              <div className="flex gap-2 border-t border-slate-300 p-4">
                <button className="rounded-xl border border-slate-800 bg-white px-4 py-2 text-sm font-medium text-slate-900">Learn more</button>
                <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">Free evaluation</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <h2 className="text-[56px] font-semibold leading-none text-slate-900">How it works</h2>
        <p className="mt-3 text-[22px] text-slate-600">Clear steps, transparent terms, measurable outcomes.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {steps.map((s) => (
            <article key={s.title} className="rounded-xl border border-slate-300 bg-white p-4">
              <h3 className="text-[34px] font-semibold leading-none text-slate-900">{s.title}</h3>
              <p className="mt-3 text-[21px] text-slate-700">{s.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <h2 className="text-[56px] font-semibold leading-none text-slate-900">Owner results & feedback</h2>
        <p className="mt-3 text-[22px] text-slate-600">A few examples of improvements after structured pricing and multi-channel distribution.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {results.map((r) => (
            <article key={r.title} className="overflow-hidden rounded-xl border border-slate-300 bg-white">
              {r.image ? <img src={r.image} alt={r.title} className="h-[260px] w-full object-cover" /> : <div className="h-[260px] w-full bg-slate-200" />}
              <div className="p-3">
                <h3 className="text-[30px] font-semibold leading-none text-slate-900">{r.title}</h3>
                <p className="mt-2 text-[21px] text-slate-600">{r.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <h2 className="text-[56px] font-semibold leading-none text-slate-900">Owners — frequently asked questions</h2>
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-300 bg-white">
          <article className="border-b border-slate-300 p-4">
            <h3 className="text-[30px] font-semibold text-rose-600">Which model should I choose?</h3>
            <p className="mt-2 text-[21px] text-slate-700">If you want hands-on control, start with <em>Self-Managed</em>. Want growth without changing ops? Pick <em>Multi-Platform Sync</em>. Prefer a complete hand-off? Go <em>Fully Managed</em>. We’ll advise after your evaluation.</p>
          </article>
          <article className="border-b border-slate-300 p-4">
            <h3 className="text-[30px] font-semibold text-rose-600">How are fees structured?</h3>
            <p className="mt-2 text-[21px] text-slate-700">Transparent, model-based. Self-Managed is advisory, Sync is distribution-based, Fully Managed uses a management % with KPI reviews. Exact terms are tailored per property and seasonality.</p>
          </article>
          <article>
            <h3 className="border-b-2 border-blue-600 bg-rose-600 px-4 py-2 text-[30px] font-semibold text-white">Can you work with our existing team?</h3>
            <p className="px-4 pb-4 pt-2 text-[21px] text-slate-700">Yes. We integrate with your current cleaners, maintenance, or concierge—then layer pricing, content, and distribution on top.</p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-10">
        <div className="rounded-2xl border border-slate-300 bg-white px-4 py-6 text-center">
          <h2 className="text-[56px] font-semibold leading-none text-slate-900">Let’s review your villa’s revenue potential</h2>
          <p className="mt-3 text-[22px] text-slate-600">Get a free evaluation with pricing recommendations and demand insights.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <button className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white">Start Free Evaluation</button>
            <button className="rounded-xl border border-slate-800 bg-white px-5 py-2.5 text-sm font-medium text-slate-900">Or explore Fully Managed</button>
          </div>
        </div>
      </section>
    </>
  );
}
