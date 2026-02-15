import type { CoreMirrorProperty } from "@/lib/coreMirrorPropertyMock";
import { GuestRequestInlineForm } from "@/components/GuestRequestInlineForm";

export function PropertyDetailsCanonicalSections({ property }: { property: CoreMirrorProperty }) {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8">
      <div className="mb-4 text-sm text-slate-500">For Guests / Property Details / {property.title}</div>

      <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <img src={property.gallery[0]} alt={property.title} className="h-[420px] w-full object-cover" />
          <div className="grid grid-cols-2 gap-2 p-2 md:grid-cols-3">
            {property.gallery.slice(1).map((img) => (
              <img key={img} src={img} alt={property.title} className="h-28 w-full rounded-lg object-cover" />
            ))}
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{property.location.region}</p>
          <h1 className="mt-1 text-3xl font-semibold text-slate-900">{property.title}</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            {property.badges.map((b) => (
              <span key={b} className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] text-slate-700">{b}</span>
            ))}
          </div>
          <p className="mt-3 text-sm text-slate-600">{property.summary}</p>

          <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-700">
            <div className="rounded-lg border border-slate-200 p-2">👥 {property.metrics.guests} guests</div>
            <div className="rounded-lg border border-slate-200 p-2">🛏 {property.metrics.bedrooms} bedrooms</div>
            <div className="rounded-lg border border-slate-200 p-2">🛁 {property.metrics.bathrooms} bathrooms</div>
            <div className="rounded-lg border border-slate-200 p-2">📐 {property.metrics.areaSqm} m²</div>
          </div>

          <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-3">
            <p className="text-xs text-blue-700">Pricing (Core mirror logic)</p>
            <p className="text-lg font-semibold text-blue-900">From {property.pricing.seasonalFrom} {property.pricing.currency} / night</p>
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

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-xl font-semibold text-slate-900">View Video</h2>
        <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
          <iframe
            src={property.videoUrl}
            title={`${property.title} video`}
            className="h-[360px] w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-xl font-semibold text-slate-900">Services Nearby</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {property.nearbyServices.map((service) => (
            <article key={service.name} className="rounded-lg border border-slate-200 p-3">
              <h3 className="text-sm font-semibold text-slate-900">{service.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{service.detail}</p>
              <div className="mt-2 flex gap-2">
                <a href={service.href} className="inline-flex rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white">View service</a>
                {service.blogHref && (
                  <a href={service.blogHref} className="inline-flex rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-900">Related post</a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-xl font-semibold text-slate-900">Related Blog Posts</h2>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          {property.blogPosts.map((post) => (
            <article key={post.title} className="overflow-hidden rounded-xl border border-slate-300 bg-white">
              <img src={post.image} alt={post.title} className="h-32 w-full object-cover" />
              <div className="p-3">
                <p className="text-xs text-slate-500">{post.date}</p>
                <h3 className="mt-1 text-base font-semibold leading-tight text-slate-900">{post.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
                <a href={post.href} className="mt-3 inline-flex rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white">Read</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <GuestRequestInlineForm
        contextType="property"
        contextId={property.id}
        contextSlug={property.slug}
        contextTitle={property.title}
      />

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-xl font-semibold text-slate-900">FAQ (Core-mirror readiness)</h2>
        <div className="mt-3 space-y-3">
          {property.faqs.map((item) => (
            <article key={item.q} className="rounded-lg border border-slate-200 p-3">
              <h3 className="text-sm font-semibold text-slate-900">{item.q}</h3>
              <p className="mt-1 text-sm text-slate-600">{item.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-slate-900">Similar places nearby</h2>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          {property.related.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <img src={item.image} alt={item.title} className="h-40 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-600">From {item.from} EUR / night</p>
                <a href={item.href} className="mt-3 inline-flex rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-900">View</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
