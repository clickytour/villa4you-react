"use client";

export function LuxurySuitesElsaSections() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-8 pt-4">
      <div className="rounded-2xl border border-slate-300 bg-white p-6 md:p-8 text-center">
        <p className="text-sm text-amber-700">Luxury Suites Elsa Destination</p>
        <h1 className="mt-2 text-[56px] font-semibold leading-none text-slate-900">Explore Vacation Villas</h1>
        <p className="mx-auto mt-4 max-w-[900px] text-[21px] text-slate-600">
          The nearby 5-star Porto Carras resort is a great place to find activities including a casino,
          18-hole golf course, spas, restaurants, and one of the largest organic wineries in Greece
          (which produces an exclusive local wine called Domaine Porto Carras). You might even escape
          the hustle and bustle of Neo Marmaras and take a day trip to the old town of Parthenonas
          where you can explore the quieter traditional Greek life.
        </p>
      </div>

      <section className="mt-6 rounded-2xl border border-slate-300 bg-white p-5 md:p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr_0.8fr]">
          <article className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury Junior Suite Elsa"
                className="h-72 w-full object-cover"
              />
              <span className="absolute left-0 top-3 -rotate-45 bg-sky-500 px-8 py-1 text-xs font-semibold text-white">FROM €100</span>
            </div>
            <div className="flex flex-1 flex-col p-4 text-center">
              <h2 className="text-[36px] font-semibold leading-none text-slate-900">Luxury Junior Suite Elsa</h2>
              <p className="mt-2 text-[21px] text-slate-600">4 one bedroom suites</p>
              <div className="mt-auto pt-4">
                <button className="rounded-xl bg-slate-900 px-5 py-2.5 text-base font-medium text-white">Discover more</button>
              </div>
            </div>
          </article>

          <article className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury Senior Suite Elsa"
                className="h-72 w-full object-cover"
              />
              <span className="absolute left-0 top-3 -rotate-45 bg-sky-500 px-8 py-1 text-xs font-semibold text-white">FROM €130</span>
            </div>
            <div className="flex flex-1 flex-col p-4 text-center">
              <h2 className="text-[36px] font-semibold leading-none text-slate-900">Luxury Senior Suite Elsa</h2>
              <p className="mt-2 text-[21px] text-slate-600">2 two bedroom suites</p>
              <div className="mt-auto pt-4">
                <button className="rounded-xl bg-slate-900 px-5 py-2.5 text-base font-medium text-white">Discover more</button>
              </div>
            </div>
          </article>

          <aside className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-[42px] font-semibold leading-none text-slate-900">Shared Swimming Pool</h3>
            <p className="mt-3 text-[21px] text-slate-600">Included as shown in the approved reference for Luxury Suites Elsa.</p>
            <button className="mt-4 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-base font-medium text-slate-800">Check availability</button>
          </aside>
        </div>
      </section>
    </section>
  );
}
