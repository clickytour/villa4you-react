import type { CoreMirrorService } from "@/lib/coreMirrorServicesMock";
import { serviceTaxonomy } from "@/lib/serviceTaxonomy";
import { GuestRequestInlineForm } from "@/components/GuestRequestInlineForm";

export function ServiceDetailSections({ service }: { service: CoreMirrorService }) {
  const category = serviceTaxonomy.find((c) => c.id === service.categoryId);
  const subcategory = category?.subcategories.find((s) => s.id === service.subcategoryId);

  return (
    <section className="mx-auto max-w-[1180px] px-4 pb-10 pt-4">
      <article className="rounded-2xl border border-slate-300 bg-white p-6">
        <p className="text-sm text-slate-500">Services / {category?.name ?? "Service"}</p>
        <h1 className="mt-2 text-4xl font-semibold text-slate-900">{service.name}</h1>
        <p className="mt-2 text-slate-600">{service.excerpt}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs text-emerald-700">Category: {category?.name ?? "Service"}</span>
          <span className="rounded-full border border-blue-300 bg-blue-50 px-3 py-1 text-xs text-blue-700">Subcategory: {subcategory?.name ?? "General"}</span>
        </div>

        <img src={service.image} alt={service.name} className="mt-4 h-[360px] w-full rounded-xl object-cover" />

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-3 text-slate-700">
            {service.description.map((line) => (
              <p key={line}>{line}</p>
            ))}

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
                const isActiveCategory = cat.id === service.categoryId;
                return (
                  <div key={cat.id} className={`rounded-lg border p-3 ${isActiveCategory ? "border-emerald-400 bg-emerald-50" : "border-slate-200 bg-white"}`}>
                    <p className={`text-sm font-semibold ${isActiveCategory ? "text-emerald-800" : "text-slate-800"}`}>{cat.name}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {cat.subcategories.map((sub) => {
                        const isActiveSub = isActiveCategory && sub.id === service.subcategoryId;
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
          contextTitle={service.name}
          categoryName={category?.name}
          subcategoryName={subcategory?.name}
        />
      </article>
    </section>
  );
}
