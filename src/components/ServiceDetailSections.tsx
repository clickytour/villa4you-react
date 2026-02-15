import type { CoreMirrorService } from "@/lib/coreMirrorServicesMock";

export function ServiceDetailSections({ service }: { service: CoreMirrorService }) {
  return (
    <section className="mx-auto max-w-[980px] px-4 pb-10 pt-4">
      <article className="rounded-2xl border border-slate-300 bg-white p-6">
        <p className="text-sm text-slate-500">Services / {service.category}</p>
        <h1 className="mt-2 text-4xl font-semibold text-slate-900">{service.name}</h1>
        <p className="mt-2 text-slate-600">{service.excerpt}</p>
        <img src={service.image} alt={service.name} className="mt-4 h-[360px] w-full rounded-xl object-cover" />

        <div className="mt-5 space-y-3 text-slate-700">
          {service.description.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {service.relatedPropertySlug && (
            <a href={`/property/${service.relatedPropertySlug}`} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900">Open related property</a>
          )}
          {service.relatedBlogSlug && (
            <a href={`/blog/${service.relatedBlogSlug}`} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900">Open related blog post</a>
          )}
        </div>
      </article>
    </section>
  );
}
