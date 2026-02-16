import type { CanonicalDetailsViewModel } from "@/lib/coreMirrorAdapters";

export function CanonicalEntityDetailsSections({ vm }: { vm: CanonicalDetailsViewModel }) {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8">
      <div className="mb-4 text-sm text-slate-500">Property / {vm.entityType} / {vm.title}</div>

      {vm.modeTabs && vm.modeTabs.length > 1 && (
        <section className="mb-4 rounded-2xl border border-slate-200 bg-white p-3">
          <div className="flex flex-wrap gap-2">
            {vm.modeTabs.map((tab) => (
              <a
                key={tab.href}
                href={tab.href}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium ${tab.active ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white text-slate-800"}`}
              >
                {tab.label}
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <img src={vm.primaryImage} alt={vm.title} className="h-[470px] w-full object-cover" />
          {vm.gallery.length > 0 && (
            <div className="grid grid-cols-2 gap-2 p-2 md:grid-cols-3">
              {vm.gallery.slice(0, 6).map((img) => (
                <img key={img} src={img} alt={vm.title} className="h-24 w-full rounded-lg object-cover" />
              ))}
            </div>
          )}
        </div>

        <aside className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">{vm.title}</h1>
          {vm.subtitle && <p className="mt-2 text-sm text-slate-600">{vm.subtitle}</p>}
          {vm.locationLabel && <p className="mt-2 text-sm text-slate-500">{vm.locationLabel}</p>}

          <div className="mt-4 flex flex-wrap gap-2">
            {vm.tags.map((t) => (
              <span key={t} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-700">{t}</span>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-700">
            {vm.facts.map((fact) => (
              <div key={fact.label} className="rounded-lg border border-slate-200 bg-slate-50 p-2">
                <span className="font-medium">{fact.label}:</span> {fact.value}
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">{vm.cta.primary}</button>
            {vm.cta.secondary && (
              <button className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900">{vm.cta.secondary}</button>
            )}
          </div>
        </aside>
      </section>

      {vm.description && (
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-semibold text-slate-900">Description</h2>
          <p className="mt-2 text-sm leading-7 text-slate-700">{vm.description}</p>
        </section>
      )}

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-semibold text-slate-900">Amenities</h2>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-700">
            {vm.amenities.map((a) => (
              <div key={a} className="rounded-lg border border-slate-200 bg-slate-50 p-2">{a}</div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-semibold text-slate-900">Distances</h2>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-700">
            {vm.distances.map((d) => (
              <div key={d.label} className="rounded-lg border border-slate-200 bg-slate-50 p-2">{d.label}: {d.value}</div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
