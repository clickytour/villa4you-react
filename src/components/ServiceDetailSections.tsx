import type { CoreMirrorService } from "@/lib/coreMirrorServicesMock";
import { serviceTaxonomy } from "@/lib/serviceTaxonomy";
import { GuestRequestInlineForm } from "@/components/GuestRequestInlineForm";

const bookingTypeLabel: Record<string, string> = {
  external_booking_link: "External Booking Link",
  instant_booking: "Instant Booking",
  request_to_book: "Request to Book",
};
const priceModelLabel: Record<string, string> = {
  package: "Package",
  per_hour: "Per Hour",
  per_person: "Per Person",
  per_service: "Per Service",
  quote: "Quote",
};
const planLabel: Record<string, string> = {
  free: "Free",
  standard: "Standard",
  premium: "Premium",
};

export function ServiceDetailSections({ service }: { service: CoreMirrorService }) {
  const category = serviceTaxonomy.find((c) => c.id === service.basicDetails.categoryId);
  const subcategory = category?.subcategories.find((s) => s.id === service.basicDetails.subcategoryId);

  return (
    <section className="mx-auto max-w-[1180px] px-4 pb-10 pt-4">
      <article className="rounded-2xl border border-slate-300 bg-white p-6">
        <p className="text-sm text-slate-500">Services / {category?.name ?? "Service"}</p>
        <h1 className="mt-2 text-4xl font-semibold text-slate-900">{service.basicDetails.businessName}</h1>
        <p className="mt-2 text-slate-600">{service.basicDetails.shortDescription}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs text-emerald-700">Category: {category?.name ?? "Service"}</span>
          <span className="rounded-full border border-blue-300 bg-blue-50 px-3 py-1 text-xs text-blue-700">Subcategory: {subcategory?.name ?? "General"}</span>
        </div>

        <img src={service.media.primaryPhoto} alt={service.basicDetails.businessName} className="mt-4 h-[360px] w-full rounded-xl object-cover" />

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-3 text-slate-700">
            <p>{service.basicDetails.fullDescription}</p>
            {service.basicDetails.highlights.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {service.basicDetails.highlights.map((h) => (
                  <span key={h} className="rounded-full border border-slate-300 bg-slate-50 px-2 py-1 text-xs text-slate-700">{h}</span>
                ))}
              </div>
            )}
            <p className="text-sm text-slate-600">Coverage: {service.locationServiceArea.serviceAreaCoverageKm ?? "N/A"} km · City: {service.locationServiceArea.city}</p>

            <section className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <h3 className="text-sm font-semibold text-slate-900">Pricing & Booking</h3>
              <p className="mt-1 text-xs text-slate-600">Booking type: {bookingTypeLabel[service.pricingBooking.bookingType ?? "request_to_book"]}</p>
              {service.pricingBooking.externalBookingLink && (
                <a href={service.pricingBooking.externalBookingLink} target="_blank" rel="noreferrer" className="mt-1 inline-block text-xs text-slate-900 underline underline-offset-2">
                  External booking link
                </a>
              )}
              {service.pricingBooking.pricingDescription && (
                <p className="mt-2 text-xs text-slate-700">{service.pricingBooking.pricingDescription}</p>
              )}

              <div className="mt-3 overflow-x-auto rounded-lg border border-slate-200 bg-white">
                <table className="min-w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-100 text-slate-800">
                    <tr>
                      <th className="px-2 py-2">Photo</th>
                      <th className="px-2 py-2">Title</th>
                      <th className="px-2 py-2">Price Model</th>
                      <th className="px-2 py-2">Guest Gross</th>
                      <th className="px-2 py-2">Agent Net</th>
                      <th className="px-2 py-2">Comm.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {service.pricingBooking.priceList.map((row) => (
                      <tr key={`${row.title}-${row.priceModel}`} className="border-t border-slate-200">
                        <td className="px-2 py-2">{row.photo ? <img src={row.photo} alt={row.title} className="h-8 w-8 rounded object-cover" /> : <span className="text-slate-400">—</span>}</td>
                        <td className="px-2 py-2">{row.title}</td>
                        <td className="px-2 py-2">{priceModelLabel[row.priceModel]}</td>
                        <td className="px-2 py-2">{typeof row.guestPriceGross === "number" ? `€${row.guestPriceGross.toFixed(2)}` : "—"}</td>
                        <td className="px-2 py-2">{typeof row.agentPriceNet === "number" ? `€${row.agentPriceNet.toFixed(2)}` : "—"}</td>
                        <td className="px-2 py-2">{row.commissionable ? "Yes" : "No"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <h3 className="text-sm font-semibold text-slate-900">Platform & Subscription</h3>
              <p className="mt-1 text-xs text-slate-700">Plan: {planLabel[service.platformSubscription.subscriptionPlan ?? "free"]}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {service.platformSubscription.audienceTarget.map((a) => (
                  <span key={a} className="rounded-full border border-slate-300 bg-white px-2 py-0.5 text-[11px] text-slate-700">{a.replaceAll("_", " ")}</span>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <h3 className="text-sm font-semibold text-slate-900">Synchronization</h3>
              <p className="mt-1 text-xs text-slate-700">Status: {service.synchronization?.status ?? "draft"}</p>
              <p className="text-xs text-slate-700">Sites available: {service.synchronization?.sitesAvailable ?? 0}</p>
              {service.synchronization?.note && <p className="text-xs text-slate-600">{service.synchronization.note}</p>}
            </section>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {service.relatedPropertySlug && (
                <a href={`/property/${service.relatedPropertySlug}`} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900">Open related property</a>
              )}
              {service.relatedBlogSlug && (
                <a href={`/blog/${service.relatedBlogSlug}`} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900">Open related blog post</a>
              )}
            </div>
          </div>

          <aside className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h2 className="text-lg font-semibold text-slate-900">Category & Subcategory Explorer</h2>
            <p className="mt-1 text-sm text-slate-600">Aligned with Service Apply taxonomy for Core-ready consistency.</p>

            <div className="mt-3 space-y-3 max-h-[420px] overflow-auto pr-1">
              {serviceTaxonomy.map((cat) => {
                const isActiveCategory = cat.id === service.basicDetails.categoryId;
                return (
                  <div key={cat.id} className={`rounded-lg border p-3 ${isActiveCategory ? "border-emerald-400 bg-emerald-50" : "border-slate-200 bg-white"}`}>
                    <p className={`text-sm font-semibold ${isActiveCategory ? "text-emerald-800" : "text-slate-800"}`}>{cat.name}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {cat.subcategories.map((sub) => {
                        const isActiveSub = isActiveCategory && sub.id === service.basicDetails.subcategoryId;
                        return (
                          <span key={sub.id} className={`rounded-full border px-2 py-0.5 text-xs ${isActiveSub ? "border-blue-400 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-600"}`}>
                            {sub.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>

        <GuestRequestInlineForm
          contextType="service"
          contextId={service.slug}
          contextSlug={service.slug}
          contextTitle={service.basicDetails.businessName}
          categoryName={category?.name}
          subcategoryName={subcategory?.name}
        />
      </article>
    </section>
  );
}
