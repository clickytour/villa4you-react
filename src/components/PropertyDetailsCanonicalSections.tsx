import type { CoreMirrorProperty, DealMode } from "@/lib/coreMirrorPropertyMock";
import { GuestRequestInlineForm } from "@/components/GuestRequestInlineForm";
import { PlanyoAvailabilitySection } from "@/components/PlanyoAvailabilitySection";

const ALL_MODES: DealMode[] = ["short_term_rent", "sale", "monthly_rent"];

function modeLabel(mode: DealMode) {
  if (mode === "short_term_rent") return "Vacation";
  if (mode === "sale") return "Sale";
  return "Monthly rent";
}

export function PropertyDetailsCanonicalSections({ property, activeMode }: { property: CoreMirrorProperty; activeMode?: DealMode }) {
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${property.location.lng - 0.02}%2C${property.location.lat - 0.01}%2C${property.location.lng + 0.02}%2C${property.location.lat + 0.01}&layer=mapnik&marker=${property.location.lat}%2C${property.location.lng}`;

  const sortedSeasons = [...property.pricing.seasonalRates].sort((a, b) => a.from.localeCompare(b.from));
  const highestPrice = sortedSeasons.length ? Math.max(...sortedSeasons.map((s) => s.nightly)) : property.pricing.basicFrom;
  const highSeasonIndex = sortedSeasons.findIndex((s) => s.nightly === highestPrice);
  const highSeason = highSeasonIndex >= 0 ? sortedSeasons[highSeasonIndex] : null;

  const seasonBeforeHigh =
    highSeasonIndex > 0
      ? [...sortedSeasons.slice(0, highSeasonIndex)].reverse().find((s) => s.nightly < highestPrice) ?? null
      : null;

  const seasonAfterHigh =
    highSeasonIndex >= 0 && highSeasonIndex < sortedSeasons.length - 1
      ? sortedSeasons.slice(highSeasonIndex + 1).find((s) => s.nightly < highestPrice) ??
        sortedSeasons.find((s) => s.nightly < highestPrice) ??
        null
      : sortedSeasons.find((s) => s.nightly < highestPrice) ?? null;

  const normalizeSeasonLabel = (label: string) => label.replace(/low/gi, "Mid");

  const availableModes = ((property.dealType && property.dealType.length ? property.dealType : ["short_term_rent"]) as DealMode[]).filter((m) =>
    ALL_MODES.includes(m)
  );
  const currentMode = activeMode && availableModes.includes(activeMode) ? activeMode : availableModes[0];
  const isVacationMode = currentMode === "short_term_rent";
  const isSaleMode = currentMode === "sale";
  const isMonthlyMode = currentMode === "monthly_rent";
  const isRealEstate = property.type === "real-estate";
  const modeHref = (mode: DealMode) => {
    if (property.type !== "real-estate") return "#";
    if (mode === "short_term_rent") return `/property/real-estate/${property.slug}/vacation`;
    if (mode === "sale") return `/property/real-estate/${property.slug}/sale`;
    return `/property/real-estate/${property.slug}/monthly`;
  };

  return (
    <div className="mx-auto max-w-[1320px] px-4 py-8">
      <div className="mb-4 text-sm text-slate-500">For Guests / Property Details / {property.title}</div>

      {property.type === "real-estate" && availableModes.length > 1 && (
        <section className="mb-4 rounded-2xl border border-slate-200 bg-white p-3">
          <div className="flex flex-wrap gap-2">
            {availableModes.map((mode) => (
              <a
                key={mode}
                href={modeHref(mode)}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium ${currentMode === mode ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white text-slate-800"}`}
              >
                {modeLabel(mode)}
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="grid gap-6 xl:grid-cols-[1.75fr_0.95fr]">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="relative">
            <img src={property.gallery[0]} alt={property.title} className="h-[500px] w-full object-cover" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-5">
              <p className="text-2xl font-semibold text-white">{property.headline}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 p-2 md:grid-cols-3">
            {property.gallery.slice(1).map((img) => (
              <img key={img} src={img} alt={property.title} className="h-28 w-full rounded-lg object-cover" />
            ))}
          </div>
        </div>

        <aside className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{property.location.region}</p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight text-slate-900">{property.title}</h1>

          <div className="mt-auto pt-3 flex flex-nowrap gap-2">
            {property.badges.map((b) => (
              <span key={b} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-700">
                {b}
              </span>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-700">
            {!isRealEstate && <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">👥 {property.metrics.guests} guests</div>}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">🛏 {property.metrics.bedrooms} bedrooms</div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">🛁 {property.metrics.bathrooms} bathrooms</div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">📐 {property.metrics.areaSqm} m²</div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">🏖 {property.location.beachDistanceM} m to beach</div>
            {isSaleMode && <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">💹 ROI: {property.realEstateMeta?.roiPercent ?? "N/A"}%</div>}
            {isMonthlyMode && <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">📅 Monthly contract mode</div>}
            {!isRealEstate && <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">🏊 Pool: {property.amenities.includes("Private Swimming Pool") ? "Yes" : "No"}</div>}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">🐾 Pets: {property.policies.petsAllowed ? "Yes" : "No"}</div>
          </div>

          {(!isRealEstate || isVacationMode) && (
            <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-3">
              <p className="text-xs text-blue-700">Pricing (Planyo-linked property)</p>
              <p className="text-xl font-semibold text-blue-900">
                From {property.pricing.basicFrom} {property.pricing.currency} / night
              </p>
              {seasonBeforeHigh && (
                <p className="mt-1 text-[11px] text-blue-700">
                  Medium Season ({normalizeSeasonLabel(seasonBeforeHigh.label)}): {seasonBeforeHigh.nightly} {property.pricing.currency}
                </p>
              )}
              {highSeason && (
                <p className="text-xs text-blue-800">
                  High Season ({normalizeSeasonLabel(highSeason.label)}): {highSeason.nightly} {property.pricing.currency} · min stay {property.pricing.minStayNights} nights
                </p>
              )}
              {seasonAfterHigh && (
                <p className="text-[11px] text-blue-700">
                  Medium Season ({normalizeSeasonLabel(seasonAfterHigh.label)}): {seasonAfterHigh.nightly} {property.pricing.currency}
                </p>
              )}
            </div>
          )}

          {isVacationMode && (
            <PlanyoAvailabilitySection
              calendarId={property.planyo.calendarId}
              resourceId={property.planyo.resourceId}
              actionUrl={property.planyo.actionUrl}
              currency={property.pricing.currency}
              basicFrom={property.pricing.basicFrom}
              seasonalRates={property.pricing.seasonalRates}
              unavailableDates={property.pricing.unavailableDates}
              propertyTitle={property.title}
              minStayNights={property.pricing.minStayNights}
              relatedOptions={property.related}
            />
          )}

          {!isVacationMode && (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
              <p className="text-xs text-emerald-700">Mode specific offer</p>
              {isSaleMode && (
                <>
                  <p className="text-xl font-semibold text-emerald-900">
                    Sale price: {property.realEstateMeta?.salePriceEur ?? property.pricing.seasonalFrom} {property.pricing.currency}
                  </p>
                  <p className="mt-1 text-xs text-emerald-800">ROI: {property.realEstateMeta?.roiPercent ?? "N/A"}%</p>
                </>
              )}
              {isMonthlyMode && (
                <p className="text-xl font-semibold text-emerald-900">
                  Monthly rent: {property.realEstateMeta?.monthlyRentEur ?? property.pricing.basicFrom} {property.pricing.currency}
                </p>
              )}
              <a href="#guest-request-form" className="mt-2 inline-flex rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white">
                {isSaleMode ? "Request sale details" : "Request monthly offer"}
              </a>
            </div>
          )}
        </aside>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.75fr_0.95fr]">
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
            {(isRealEstate
              ? isSaleMode
                ? property.realEstateMeta?.saleHighlights ?? []
                : isMonthlyMode
                ? property.realEstateMeta?.monthlyHighlights ?? []
                : property.realEstateMeta?.vacationHighlights ?? []
              : property.highlights
            ).map((h) => (
              <li key={h}>• {h}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-semibold text-slate-900">Amenities</h2>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-700">
            {property.amenities.slice(0, 6).map((a) => (
              <div key={a} className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5">
                {a}
              </div>
            ))}
          </div>

          {property.amenities.length > 6 && (
            <details className="group mt-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">
                View more amenities ({property.amenities.length - 6})
              </summary>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-700">
                {property.amenities.slice(6).map((a) => (
                  <div key={a} className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5">
                    {a}
                  </div>
                ))}
              </div>
            </details>
          )}
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
          {property.tour3dUrl && (
            <a
              href={property.tour3dUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-900 whitespace-nowrap"
            >
              Open 3D Property Tour
            </a>
          )}
        </article>
      </section>

      {isSaleMode && property.realEstateMeta?.floorPlans?.length ? (
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-semibold text-slate-900">Floor plans</h2>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            {property.realEstateMeta.floorPlans.map((plan) => (
              <article key={plan.title} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <img src={plan.imageUrl} alt={plan.title} className="h-44 w-full object-cover" />
                <div className="p-3">
                  <p className="text-sm font-semibold text-slate-900">{plan.title}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {(isSaleMode || isMonthlyMode) && (
        <GuestRequestInlineForm
          contextType="property"
          contextId={property.id}
          contextSlug={property.slug}
          contextTitle={property.title}
          propertyMode={currentMode}
        />
      )}

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-slate-900">{isVacationMode ? "Services Nearby" : isSaleMode ? "Transaction & Advisory Services" : "Monthly Rental Support Services"}</h2>
          <a href="/services" className="inline-flex rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-900 whitespace-nowrap">Explore all services</a>
        </div>
        <div className="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {property.nearbyServices.slice(0, 3).map((service, idx) => (
            <article key={service.name} className="overflow-hidden rounded-xl border border-slate-300 bg-white flex h-full flex-col">
              <img
                src={
                  idx % 2 === 0
                    ? "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1200&auto=format&fit=crop"
                    : "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop"
                }
                alt={service.name}
                className="h-28 w-full object-cover"
              />
              <div className="p-3 flex h-full flex-col">
                <h3 className="text-sm font-semibold text-slate-900">{service.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{service.detail}</p>
                <div className="mt-auto pt-2 flex flex-nowrap gap-2">
                  <a href={service.href} className="inline-flex rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white whitespace-nowrap">
                    View service
                  </a>
                  {service.blogHref && (
                    <a href={service.blogHref} className="inline-flex rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-900 whitespace-nowrap">
                      Related post
                    </a>
                  )}
                  <a href={`/property/${property.slug}`} className="inline-flex rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-900 whitespace-nowrap">
                    Related property
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {property.nearbyServices.length > 3 && (
          <details className="group mt-4">
            <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">
              View more services ({property.nearbyServices.length - 3})
            </summary>
            <div className="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {property.nearbyServices.slice(3).map((service, idx) => (
                <article key={`${service.name}-more`} className="overflow-hidden rounded-xl border border-slate-300 bg-white flex h-full flex-col">
                  <img
                    src={
                      idx % 2 === 0
                        ? "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1200&auto=format&fit=crop"
                        : "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop"
                    }
                    alt={service.name}
                    className="h-28 w-full object-cover"
                  />
                  <div className="p-3 flex h-full flex-col">
                    <h3 className="text-sm font-semibold text-slate-900">{service.name}</h3>
                    <p className="mt-1 text-sm text-slate-600">{service.detail}</p>
                    <div className="mt-auto pt-2 flex flex-nowrap gap-2">
                      <a href={service.href} className="inline-flex rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white whitespace-nowrap">
                        View service
                      </a>
                      {service.blogHref && (
                        <a href={service.blogHref} className="inline-flex rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-900 whitespace-nowrap">
                          Related post
                        </a>
                      )}
                      <a href={`/property/${property.slug}`} className="inline-flex rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-900 whitespace-nowrap">
                        Related property
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </details>
        )}
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-slate-900">{isVacationMode ? "Related Blog Posts" : isSaleMode ? "Market & Investment Insights" : "Long-Stay Guides & Insights"}</h2>
          <a href="/blog" className="inline-flex rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-900 whitespace-nowrap">Explore all posts</a>
        </div>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          {property.blogPosts.slice(0, 3).map((post) => (
            <article key={post.title} className="overflow-hidden rounded-xl border border-slate-300 bg-white flex h-full flex-col">
              <img src={post.image} alt={post.title} className="h-36 w-full object-cover" />
              <div className="p-3 flex h-full flex-col">
                <p className="text-xs text-slate-500">{post.date}</p>
                <h3 className="mt-1 text-base font-semibold leading-tight text-slate-900">{post.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
                <div className="mt-auto pt-3 flex flex-nowrap gap-2">
                  <a href={post.href} className="inline-flex rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white whitespace-nowrap">
                    Read
                  </a>
                  <a href={`/property/${property.slug}`} className="inline-flex rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-900 whitespace-nowrap">
                    Related property
                  </a>
                  <a href="/services" className="inline-flex rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-900 whitespace-nowrap">
                    Related services
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {property.blogPosts.length > 3 && (
          <details className="group mt-4">
            <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">
              View more blog posts ({property.blogPosts.length - 3})
            </summary>
            <div className="mt-3 grid gap-4 md:grid-cols-3">
              {property.blogPosts.slice(3).map((post) => (
                <article key={`${post.title}-more`} className="overflow-hidden rounded-xl border border-slate-300 bg-white flex h-full flex-col">
                  <img src={post.image} alt={post.title} className="h-36 w-full object-cover" />
                  <div className="p-3 flex h-full flex-col">
                    <p className="text-xs text-slate-500">{post.date}</p>
                    <h3 className="mt-1 text-base font-semibold leading-tight text-slate-900">{post.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
                    <div className="mt-auto pt-3 flex flex-nowrap gap-2">
                      <a href={post.href} className="inline-flex rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white whitespace-nowrap">
                        Read
                      </a>
                      <a href={`/property/${property.slug}`} className="inline-flex rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-900 whitespace-nowrap">
                        Related property
                      </a>
                      <a href="/services" className="inline-flex rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-900 whitespace-nowrap">
                        Related services
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </details>
        )}
      </section>

      {isRealEstate && !isVacationMode && (
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-semibold text-slate-900">{isSaleMode ? "Request investment details" : "Request monthly rent details"}</h2>
          <p className="mt-2 text-sm text-slate-600">
            {isSaleMode
              ? "Share your budget, timeline and preferred contact channel. Our team will respond with full sale dossier and viewing availability."
              : "Share your preferred move-in date, contract period and tenant profile. Our team will send the monthly offer details."}
          </p>
        </section>
      )}

      {isVacationMode && (
        <GuestRequestInlineForm
          contextType="property"
          contextId={property.id}
          contextSlug={property.slug}
          contextTitle={property.title}
          propertyMode={currentMode}
        />
      )}

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-semibold text-slate-900">FAQ (Core-mirror readiness)</h2>
        <div className="mt-3 space-y-3">
          {property.faqs.slice(0, 3).map((item) => (
            <details key={item.q} className="group rounded-lg border border-slate-200 bg-slate-50 p-3">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-slate-900">
                <span>{item.q}</span>
                <span className="text-slate-500 group-open:rotate-180">⌄</span>
              </summary>
              <p className="mt-2 text-sm text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>

        {property.faqs.length > 3 && (
          <details className="group mt-4">
            <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">
              View more FAQs ({property.faqs.length - 3})
            </summary>
            <div className="mt-3 space-y-3">
              {property.faqs.slice(3).map((item) => (
                <details key={`${item.q}-more`} className="group rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-slate-900">
                    <span>{item.q}</span>
                    <span className="text-slate-500 group-open:rotate-180">⌄</span>
                  </summary>
                  <p className="mt-2 text-sm text-slate-600">{item.a}</p>
                </details>
              ))}
            </div>
          </details>
        )}
      </section>

      <section className="mt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-slate-900">Similar places nearby</h2>
          <a href="/for-guests" className="inline-flex rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-900 whitespace-nowrap">Explore more properties</a>
        </div>
        <div className="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {property.related.slice(0, 3).map((item) => (
            <article key={item.title} className="overflow-hidden rounded-xl border border-slate-200 bg-white flex h-full flex-col">
              <img src={item.image} alt={item.title} className="h-44 w-full object-cover" />
              <div className="p-4 flex h-full flex-col">
                <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-600">From {item.from} EUR / night</p>
                <p className="mt-1 text-xs text-slate-500">Santorini · 6 guests · 3 bd / 3 ba · ★ 4.7</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {['Romantic', 'View', 'Luxury', 'Pool', 'WiFi', 'Hot Tub'].map((tag) => (
                    <span key={`${item.title}-${tag}`} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-600">{tag}</span>
                  ))}
                </div>
                <div className="mt-auto pt-3 flex flex-nowrap gap-2">
                  <a href={item.href} className="inline-flex rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-900 whitespace-nowrap">
                    View
                  </a>
                  <a href="/services" className="inline-flex rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white whitespace-nowrap">
                    Related services
                  </a>
                  <a href="/blog" className="inline-flex rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-900 whitespace-nowrap">
                    Related blog posts
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {property.related.length > 3 && (
          <details className="group mt-4">
            <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">
              View more similar places ({property.related.length - 3})
            </summary>
            <div className="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {property.related.slice(3).map((item) => (
                <article key={`${item.title}-more`} className="overflow-hidden rounded-xl border border-slate-200 bg-white flex h-full flex-col">
                  <img src={item.image} alt={item.title} className="h-44 w-full object-cover" />
                  <div className="p-4 flex h-full flex-col">
                    <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">From {item.from} EUR / night</p>
                    <p className="mt-1 text-xs text-slate-500">Santorini · 6 guests · 3 bd / 3 ba · ★ 4.7</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {['Romantic', 'View', 'Luxury', 'Pool', 'WiFi', 'Hot Tub'].map((tag) => (
                        <span key={`${item.title}-more-${tag}`} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-600">{tag}</span>
                      ))}
                    </div>
                    <div className="mt-auto pt-3 flex flex-nowrap gap-2">
                      <a href={item.href} className="inline-flex rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-900 whitespace-nowrap">
                        View
                      </a>
                      <a href="/services" className="inline-flex rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white whitespace-nowrap">
                        Related services
                      </a>
                      <a href="/blog" className="inline-flex rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-900 whitespace-nowrap">
                        Related blog posts
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </details>
        )}
      </section>
    </div>
  );
}
