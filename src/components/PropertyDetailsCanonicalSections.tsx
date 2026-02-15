import type { CoreMirrorProperty } from "@/lib/coreMirrorPropertyMock";
import { GuestRequestInlineForm } from "@/components/GuestRequestInlineForm";
import { PlanyoAvailabilitySection } from "@/components/PlanyoAvailabilitySection";

export function PropertyDetailsCanonicalSections({ property }: { property: CoreMirrorProperty }) {
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${property.location.lng - 0.02}%2C${property.location.lat - 0.01}%2C${property.location.lng + 0.02}%2C${property.location.lat + 0.01}&layer=mapnik&marker=${property.location.lat}%2C${property.location.lng}`;

  return (
    <div className="mx-auto max-w-[1320px] px-4 py-8">
      <div className="mb-4 text-sm text-slate-500">For Guests / Property Details / {property.title}</div>

      <section className="grid gap-6 xl:grid-cols-[1.55fr_1fr]">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <img src={property.gallery[0]} alt={property.title} className="h-[500px] w-full object-cover" />
          <div className="grid grid-cols-2 gap-2 p-2 md:grid-cols-3">
            {property.gallery.slice(1).map((img) => (
              <img key={img} src={img} alt={property.title} className="h-28 w-full rounded-lg object-cover" />
            ))}
          </div>
        </div>

        <aside className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{property.location.region}</p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight text-slate-900">{property.title}</h1>
          <p className="mt-2 text-base font-medium text-slate-700">{property.headline}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {property.badges.map((b) => (
              <span key={b} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-700">
                {b}
              </span>
            ))}
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border border-cyan-600">
            <div className="grid grid-cols-2">
              <div className="border-b border-r border-cyan-700 bg-cyan-500 p-3 text-slate-900">
                <p className="text-xs font-semibold uppercase tracking-wide">Bedrooms</p>
                <p className="mt-1 text-lg font-bold">{property.metrics.bedrooms}</p>
              </div>
              <div className="border-b border-cyan-700 bg-cyan-500 p-3 text-slate-900">
                <p className="text-xs font-semibold uppercase tracking-wide">Bathrooms</p>
                <p className="mt-1 text-lg font-bold">{property.metrics.bathrooms}</p>
              </div>
              <div className="border-r border-cyan-700 bg-cyan-500 p-3 text-slate-900">
                <p className="text-xs font-semibold uppercase tracking-wide">Max Guests</p>
                <p className="mt-1 text-lg font-bold">{property.metrics.guests}</p>
              </div>
              <div className="bg-cyan-500 p-3 text-slate-900">
                <p className="text-xs font-semibold uppercase tracking-wide">Area</p>
                <p className="mt-1 text-lg font-bold">{property.metrics.areaSqm} m²</p>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3 text-center">
            <p className="text-xl font-semibold text-slate-900">Check Price & Availability</p>
            <p className="mt-1 text-sm text-cyan-700">Book Your Stay at Our Vacation Rental Today</p>
            <p className="mt-2 text-sm text-slate-600">
              From {property.pricing.seasonalFrom} {property.pricing.currency} / night · {property.pricing.seasonName}
            </p>
          </div>

          <a
            href="/for-guests"
            className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"
          >
            Check availability
          </a>

          <PlanyoAvailabilitySection
            calendarId={property.planyo.calendarId}
            resourceId={property.planyo.resourceId}
            actionUrl={property.planyo.actionUrl}
            currency={property.pricing.currency}
            basicFrom={property.pricing.basicFrom}
            seasonalRates={property.pricing.seasonalRates}
            unavailableDates={property.pricing.unavailableDates}
          />
        </aside>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-semibold text-slate-900">Short Description</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">{property.shortDescription}</p>

          <details className="group mt-4">
            <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900">
              <span>Detail description</span>
              <span className="text-slate-500 group-open:rotate-180">⌄</span>
            </summary>
            <p className="px-2 pb-2 pt-3 text-sm leading-7 text-slate-700">{property.detailDescription}</p>
          </details>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-semibold text-slate-900">Overview & Highlights</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
            {property.highlights.map((h) => (
              <li key={h}>• {h}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-semibold text-slate-900">Amenities</h2>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-700">
            {property.amenities.map((a) => (
              <div key={a} className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5">
                {a}
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-semibold text-slate-900">Location & Getting Around</h2>
          <p className="mt-2 text-sm text-slate-600">
            {property.location.area}, {property.location.region}, {property.location.country}
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-700">
            {property.nearby.map((n) => (
              <div key={n.label} className="rounded-lg border border-slate-200 bg-slate-50 p-2">
                {n.label}: {n.value}
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-semibold text-slate-900">Map Location</h2>
          <iframe src={mapSrc} className="mt-3 h-[280px] w-full rounded-lg border border-slate-200" title="Property map location" />
          <a
            href={`https://www.openstreetmap.org/?mlat=${property.location.lat}&mlon=${property.location.lng}#map=14/${property.location.lat}/${property.location.lng}`}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-900"
          >
            Open full map
          </a>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-semibold text-slate-900">Property Video</h2>
          <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
            <iframe
              src={property.videoUrl}
              title={`${property.title} video`}
              className="h-[220px] w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </article>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-semibold text-slate-900">Services Nearby</h2>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          {property.nearbyServices.map((service, idx) => (
            <article key={service.name} className="overflow-hidden rounded-xl border border-slate-300 bg-white">
              <img
                src={
                  idx % 2 === 0
                    ? "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1200&auto=format&fit=crop"
                    : "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop"
                }
                alt={service.name}
                className="h-28 w-full object-cover"
              />
              <div className="p-3">
                <h3 className="text-sm font-semibold text-slate-900">{service.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{service.detail}</p>
                <div className="mt-2 flex gap-2">
                  <a href={service.href} className="inline-flex rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white">
                    View service
                  </a>
                  {service.blogHref && (
                    <a href={service.blogHref} className="inline-flex rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-900">
                      Related post
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-semibold text-slate-900">Related Blog Posts</h2>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          {property.blogPosts.map((post) => (
            <article key={post.title} className="overflow-hidden rounded-xl border border-slate-300 bg-white">
              <img src={post.image} alt={post.title} className="h-36 w-full object-cover" />
              <div className="p-3">
                <p className="text-xs text-slate-500">{post.date}</p>
                <h3 className="mt-1 text-base font-semibold leading-tight text-slate-900">{post.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
                <a href={post.href} className="mt-3 inline-flex rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white">
                  Read
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <GuestRequestInlineForm contextType="property" contextId={property.id} contextSlug={property.slug} contextTitle={property.title} />

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-semibold text-slate-900">FAQ (Core-mirror readiness)</h2>
        <div className="mt-3 space-y-3">
          {property.faqs.map((item) => (
            <article key={item.q} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <h3 className="text-sm font-semibold text-slate-900">{item.q}</h3>
              <p className="mt-1 text-sm text-slate-600">{item.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold text-slate-900">Similar places nearby</h2>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          {property.related.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <img src={item.image} alt={item.title} className="h-44 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-600">From {item.from} EUR / night</p>
                <a href={item.href} className="mt-3 inline-flex rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-900">
                  View
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
