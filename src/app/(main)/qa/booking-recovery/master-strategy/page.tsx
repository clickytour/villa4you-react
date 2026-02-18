export default function BookingRecoveryMasterStrategyPage() {
  return (
    <main className="mx-auto max-w-4xl p-6 md:p-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold tracking-wide text-purple-700">EXPERIMENTAL</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">Booking Recovery Master Strategy Lab</h1>
        <p className="mt-2 text-sm text-slate-600">
          This page is reserved for strategy experiments. Approved baseline behavior on property pages must stay unchanged.
        </p>

        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900">
          <p className="font-semibold">Current scope</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Gap-optimization simulations (8–20 nights) with variable min-stay (3–10).</li>
            <li>Alternative split-ranking models without touching production baseline.</li>
            <li>Future season-correct final-price comparison logic for related properties.</li>
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 text-xs">
          <a className="rounded-md border border-slate-300 bg-white px-2 py-1 text-slate-700" href="/qa/booking-recovery">
            Back to QA Board
          </a>
          <a className="rounded-md border border-slate-300 bg-white px-2 py-1 text-slate-700" href="/property/villa-glarokavos-sea-view">
            Open baseline property flow
          </a>
        </div>
      </div>
    </main>
  );
}
