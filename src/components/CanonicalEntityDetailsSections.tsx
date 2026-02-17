import type { CanonicalDetailsViewModel } from "@/lib/coreMirrorAdapters";
import { GuestRequestInlineForm } from "@/components/GuestRequestInlineForm";
import { PlanyoAvailabilitySection } from "@/components/PlanyoAvailabilitySection";
import { isHttpsUrl, normalizeContentUrls, normalizeVideoForRender } from "@/lib/mediaPresentation";

export function CanonicalEntityDetailsSections({ vm }: { vm: CanonicalDetailsViewModel }) {
  const mode = vm.dealType[0];
  const isVacation = mode === "short_term_rent";
  const isSale = mode === "sale";
  const isMonthly = mode === "monthly_rent";
  const videoRender = normalizeVideoForRender(vm.media?.videoUrl);
  const mediaLinks = normalizeContentUrls(vm.media?.contentUrls);
  const hasTour = isHttpsUrl(vm.media?.tour3dUrl);

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

      <section className="mb-4 grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">⭐ Verified listing profile</div>
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">{isVacation ? "🛎 Live reservation flow" : isSale ? "📈 Investment-oriented presentation" : "📅 Long-stay oriented presentation"}</div>
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">🔒 Mode-specific inquiry routing</div>
      </section>

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
            <a href="#guest-request-form" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">{vm.cta.primary}</a>
            {vm.cta.secondary && (
              <a href="#guest-request-form" className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900">{vm.cta.secondary}</a>
            )}
            {vm.parentLink && (
              <a href={vm.parentLink.href} className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900">{vm.parentLink.label}</a>
            )}
          </div>

          {vm.bookingWidget && (
            <div className="mt-4">
              <PlanyoAvailabilitySection
                calendarId={vm.bookingWidget.calendarId}
                resourceId={vm.bookingWidget.resourceId}
                actionUrl={vm.bookingWidget.actionUrl}
                currency={vm.bookingWidget.currency}
                basicFrom={vm.bookingWidget.basicFrom}
                seasonalRates={vm.bookingWidget.seasonalRates}
                unavailableDates={vm.bookingWidget.unavailableDates}
                propertyTitle={vm.title}
                minStayNights={vm.bookingWidget.minStayNights}
                relatedOptions={vm.bookingWidget.relatedOptions}
              />
            </div>
          )}
        </aside>
      </section>

      {vm.entityType === "hotel" && vm.sectionCards && vm.sectionCards.items.length > 0 && (
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-semibold text-slate-900">{vm.sectionCards.title}</h2>
          <div className="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {vm.sectionCards.items.map((item) => (
              <article key={item.href} className="overflow-hidden rounded-xl border border-slate-200 bg-white flex h-full flex-col">
                {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="h-36 w-full object-cover" />}
                <div className="p-3 flex h-full flex-col">
                  <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                  {item.subtitle && <p className="mt-1 text-xs text-slate-600">{item.subtitle}</p>}
                  {item.priceLabel && <p className="mt-2 text-sm font-medium text-slate-800">{item.priceLabel}</p>}
                  <div className="mt-auto pt-3 flex flex-nowrap gap-2">
                    <a href={item.href} className="inline-flex rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white whitespace-nowrap">
                      {item.ctaPrimary || "View room"}
                    </a>
                    {item.ctaSecondary && (
                      <a href={item.ctaSecondary.href} className="inline-flex rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-900 whitespace-nowrap">
                        {item.ctaSecondary.label}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {(videoRender || hasTour || mediaLinks.length > 0) && (
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-semibold text-slate-900">Media presentation</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {videoRender && (
              <article className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                <div className="aspect-video w-full bg-black/5">
                  {videoRender.kind === "iframe" && (
                    <iframe src={videoRender.src} title={`${vm.title} video`} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  )}
                  {videoRender.kind === "video" && (
                    <video className="h-full w-full" controls preload="metadata">
                      <source src={videoRender.src} type="video/mp4" />
                    </video>
                  )}
                  {videoRender.kind === "link" && (
                    <div className="flex h-full items-center justify-center p-4 text-center">
                      <a href={videoRender.href} target="_blank" rel="noreferrer" className="text-slate-900 underline underline-offset-2">{videoRender.title}</a>
                    </div>
                  )}
                </div>
                <div className="border-t border-slate-200 px-3 py-2 text-sm text-slate-700 flex items-center justify-between">
                  <span>Video presentation</span>
                  <span className="rounded-full border border-slate-300 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-700">{videoRender.provider}</span>
                </div>
              </article>
            )}
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-slate-900">Additional media links</h3>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                {hasTour && (
                  <a href={vm.media?.tour3dUrl} target="_blank" rel="noreferrer" className="text-slate-900 underline underline-offset-2">Open 3D tour</a>
                )}
                {mediaLinks.map((entry) => (
                  <a key={`${entry.site}-${entry.url}`} href={entry.url} target="_blank" rel="noreferrer" className="text-slate-900 underline underline-offset-2">{entry.site}: {entry.url}</a>
                ))}
              </div>
            </article>
          </div>
        </section>
      )}

      {vm.description && (
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-semibold text-slate-900">{isVacation ? "Property Description" : isSale ? "Investment Description" : "Long-Stay Description"}</h2>
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

      {vm.entityType !== "hotel" && vm.sectionCards && vm.sectionCards.items.length > 0 && (
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-semibold text-slate-900">{vm.sectionCards.title}</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {vm.sectionCards.items.map((item) => (
              <a key={item.href} href={item.href} className="rounded-xl border border-slate-200 bg-slate-50 p-3 hover:bg-white">
                <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                {item.subtitle && <p className="text-xs text-slate-600 mt-1">{item.subtitle}</p>}
              </a>
            ))}
          </div>
        </section>
      )}

      <GuestRequestInlineForm
        contextType="property"
        contextId={vm.id}
        contextSlug={vm.slug}
        contextTitle={vm.title}
        propertyMode={vm.dealType[0]}
      />
    </div>
  );
}
