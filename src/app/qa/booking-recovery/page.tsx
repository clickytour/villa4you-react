const pendingChecklist = [
  "Replace 'Estimated total' with season-correct final property price for requested dates (server-driven).",
  "Enforce related-property price band with configurable tolerance (default ±20%, allow 15–20%).",
  "Validate split strategy for requested ranges 8–20 nights and min-stay 3–10 nights.",
  "Ensure selected property split avoids weak gaps (prefer 6/7-night segment over 8-night if it creates poor follow-up availability).",
  "Enforce other-property segment minimum >= 7 nights in combined proposal (and support stricter rules when required).",
  "Show combined proposal total nights always equal to requested calendar range.",
  "Verify all displayed dates use DD-MM-YYYY format.",
  "QA pass on staging with screenshots for: exact match, other properties, combined proposal, CTA flow.",
];

const doneChecklist = [
  "Exact-match selected-property block restored with self-serve CTA.",
  "Other-properties section title updated to 'Other properties for requested dates'.",
  "Fallback logic added: if no options in ±20% band, show closest-price options instead of hiding blocks.",
  "Combined proposal now preserves requested total-night range.",
];

export default function BookingRecoveryQaPage() {
  return (
    <main className="mx-auto max-w-4xl p-6 md:p-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold tracking-wide text-blue-700">QA LAB</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">Booking Recovery QA Board</h1>
        <p className="mt-2 text-sm text-slate-600">
          Use this page to track testing status for unavailable-date recovery logic (exact match, related options,
          and combined proposals).
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <h2 className="text-sm font-semibold text-emerald-900">Done</h2>
            <ul className="mt-3 space-y-2 text-xs text-emerald-900">
              {doneChecklist.map((item) => (
                <li key={item} className="flex gap-2">
                  <span>✅</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <h2 className="text-sm font-semibold text-amber-900">Pending QA</h2>
            <ul className="mt-3 space-y-2 text-xs text-amber-900">
              {pendingChecklist.map((item) => (
                <li key={item} className="flex gap-2">
                  <span>🟡</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-sm font-semibold text-slate-900">Quick test links</h2>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <a className="rounded-md border border-slate-300 bg-white px-2 py-1 text-slate-700" href="/property/villa-glarokavos-sea-view">
              Open sample property
            </a>
            <a className="rounded-md border border-slate-300 bg-white px-2 py-1 text-slate-700" href="/properties/demo">
              Open demo property page
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
