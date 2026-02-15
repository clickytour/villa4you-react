import type { CoreMirrorProperty } from "@/lib/coreMirrorPropertyMock";

export function PropertyDetailsCanonicalSections({ property }: { property: CoreMirrorProperty }) {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8">
      <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <img src={property.gallery[0]} alt={property.title} className="h-[360px] w-full object-cover" />
          <div className="grid grid-cols-2 gap-2 p-2 md:grid-cols-3">
            {property.gallery.slice(1).map((img) => (
              <img key={img} src={img} alt={property.title} className="h-28 w-full rounded-lg object-cover" />
            ))}
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{property.location.region}</p>
          <h1 className="mt-1 text-3xl font-semibold text-slate-900">{property.title}</h1>
          <p className="mt-2 text-sm text-slate-600">{property.summary}</p>

          <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-700">
            <div className="rounded-lg border border-slate-200 p-2">👥 {property.metrics.guests} guests</div>
            <div className="rounded-lg border border-slate-200 p-2">🛏 {property.metrics.bedrooms} bedrooms</div>
            <div className="rounded-lg border border-slate-200 p-2">🛁 {property.metrics.bathrooms} bathrooms</div>
            <div className="rounded-lg border border-slate-200 p-2">📐 {property.metrics.areaSqm} m²</div>
          </div>

          <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-3">
            <p className="text-xs text-blue-700">Pricing (Core mirror logic)</p>
            <p className="text-lg font-semibold text-blue-900">
              From {property.pricing.seasonalFrom} {property.pricing.currency} / night
            </p>
            <p className="text-xs text-blue-800">
              {property.pricing.seasonName} · fallback basic from {property.pricing.basicFrom} {property.pricing.currency} · min stay {property.pricing.minStayNights} nights
            </p>
          </div>

          <a href="/for-guests" className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
            Check availability
          </a>
        </aside>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-semibold text-slate-900">Overview & Highlights</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {property.highlights.map((h) => (
              <li key={h}>• {h}</li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-semibold text-slate-900">Amenities</h2>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-700">
            {property.amenities.map((a) => (
              <div key={a} className="rounded-lg border border-slate-200 px-2 py-1.5">{a}</div>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-semibold text-slate-900">Location & Getting Around</h2>
          <p className="mt-2 text-sm text-slate-600">{property.location.area}, {property.location.region}, {property.location.country}</p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-700">
            {property.nearby.map((n) => (
              <div key={n.label} className="rounded-lg border border-slate-200 p-2">{n.label}: {n.value}</div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-semibold text-slate-900">Rules, Safety & Cancellation</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>Smoking: {property.policies.smokingAllowed ? "Allowed" : "Not allowed"}</li>
            <li>Pets: {property.policies.petsAllowed ? "Allowed" : "Not allowed"}</li>
            <li>Tourism License: {property.policies.tourismLicense}</li>
            <li>Cancellation: {property.policies.cancellationSummary}</li>
          </ul>
        </article>
      </section>
    </div>
  );
}
