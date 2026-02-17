import { coreMirrorServices } from "@/lib/coreMirrorServicesMock";
import { serviceTaxonomy } from "@/lib/serviceTaxonomy";

export function ServicesIndexSections() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-8 pt-4">
      <div className="rounded-2xl border border-slate-300 bg-white p-6">
        <p className="text-sm text-slate-500">Home / Services</p>
        <h1 className="mt-2 text-4xl font-semibold text-slate-900">Services Marketplace</h1>
        <p className="mt-2 text-slate-600">Core-mirror service template with dynamic single-service pages.</p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {coreMirrorServices.map((service) => {
            const category = serviceTaxonomy.find((c) => c.id === service.basicDetails.categoryId);
            const sub = category?.subcategories.find((s) => s.id === service.basicDetails.subcategoryId);
            return (
            <article key={service.slug} className="overflow-hidden rounded-xl border border-slate-300 bg-white">
              <img src={service.media.primaryPhoto} alt={service.basicDetails.businessName} className="h-40 w-full object-cover" />
              <div className="p-3">
                <p className="text-xs text-slate-500">{category?.name ?? "Service"} / {sub?.name ?? "General"} · {service.locationServiceArea.city}</p>
                <h3 className="mt-1 text-xl font-semibold text-slate-900">{service.basicDetails.businessName}</h3>
                <p className="mt-2 text-sm text-slate-600">{service.basicDetails.shortDescription}</p>
                <a href={`/services/${service.slug}`} className="mt-3 inline-flex rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white">View service</a>
              </div>
            </article>
          );
          })}
        </div>
      </div>
    </section>
  );
}
