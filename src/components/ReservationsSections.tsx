export function ReservationsSections({ query = "" }: { query?: string }) {
  return (
    <section className="mx-auto max-w-[1180px] px-4 pb-10 pt-4">
      <div className="rounded-2xl border border-slate-300 bg-white p-6">
        <p className="text-sm text-slate-500">Home / Reservations</p>
        <h1 className="mt-2 text-4xl font-semibold text-slate-900">My Reservations</h1>
        <p className="mt-2 text-slate-600">Complete your booking without leaving villa4you.gr</p>

        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs text-slate-600">Embedded reservation workspace (Planyo backend)</p>
          <iframe
            src={`https://villa4you.gr/my-reservations/${query ? `?${query}` : ""}`}
            className="mt-2 h-[760px] w-full rounded-lg border border-slate-300 bg-white"
            title="My Reservations"
          />
        </div>
      </div>
    </section>
  );
}
