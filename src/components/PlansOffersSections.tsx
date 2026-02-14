export function PlansOffersSections() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-8 pt-4">
      <div className="rounded-2xl border border-slate-300 bg-white p-5 md:p-8">
        <p className="text-sm text-slate-500">Home › <span className="font-semibold text-slate-700">Plans & Offers</span></p>

        <h1 className="mt-3 text-[56px] font-semibold leading-none text-slate-900">
          Plans & Offers: last-minute deals, group savings, and our Premium Plan
        </h1>

        <p className="mt-3 max-w-4xl text-[21px] text-slate-600">
          We track real availability and surface genuine savings. Browse current highlights or get one email when a new match appears for your dates.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <button className="rounded-full border border-emerald-600 bg-white px-4 py-2 text-sm font-medium text-emerald-700">🔥 Hot Offers</button>
          <button className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700">⏱️ Last-Minute</button>
          <button className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700">👥 Group Deals</button>
        </div>
      </div>
    </section>
  );
}
