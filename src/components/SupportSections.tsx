export function SupportSections() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-8 pt-4">
      <div className="rounded-2xl border border-slate-300 bg-white p-5 md:p-8">
        <p className="text-sm text-slate-500">Home › <span className="font-semibold text-slate-700">Support</span></p>

        <h1 className="mt-3 text-[56px] font-semibold leading-none text-slate-900">How can we help?</h1>
        <p className="mt-3 text-[21px] text-slate-600">
          Search our FAQs or jump to policies. Still stuck? Contact our team — we reply fast during working hours.
        </p>

        <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-slate-300 bg-white p-3 md:flex-row md:items-center">
          <div className="flex-1">
            <label className="text-sm font-medium text-slate-700">Search</label>
            <input
              className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400"
              placeholder="Search (e.g., cancellation, check-in, deposits)..."
            />
          </div>
          <button className="rounded-xl bg-slate-900 px-6 py-3 text-base font-medium text-white">Contact support</button>
        </div>
      </div>
    </section>
  );
}
