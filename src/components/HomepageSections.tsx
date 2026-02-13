export function HomepageSections() {
  return (
    <div className="bg-[#f3f5f8] pb-20">
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
          <div className="mt-4 flex flex-wrap gap-2">
            {["Santorini", "Mykonos", "Paros", "Crete", "Rhodes", "Corfu"].map((d) => (
              <span key={d} className="rounded-full border border-slate-300 px-3 py-1.5 text-sm text-slate-700">
                {d}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold">Collaborate posts</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              ["How agents earn with net pricing", "Collaborate · 4 min read"],
              ["Partner onboarding checklist", "Partners · 5 min read"],
              ["How to list services effectively", "Providers · 4 min read"],
            ].map(([title, meta]) => (
              <article key={title} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="h-28 rounded-md bg-slate-200" />
                <h3 className="mt-3 font-semibold">{title}</h3>
                <small className="text-slate-500">{meta}</small>
                <div className="mt-3">
                  <button className="rounded-md bg-slate-900 px-3 py-1.5 text-sm text-white">Read</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
