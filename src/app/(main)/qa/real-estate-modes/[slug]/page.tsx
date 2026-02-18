import { notFound } from "next/navigation";
import { getRealEstatePropertyForCanonicalPage } from "@/lib/coreMirrorRealEstateBridge";

export default async function RealEstateModesIndexPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = getRealEstatePropertyForCanonicalPage(slug);
  if (!property) notFound();

  return (
    <section className="mx-auto max-w-[900px] px-4 py-10">
      <h1 className="text-3xl font-semibold text-slate-900">Real Estate Mode Previews</h1>
      <p className="mt-2 text-slate-600">Temporary QA pages for visual/content agreement per mode for: <span className="font-semibold">{property.title}</span></p>
      <div className="mt-6 grid gap-3">
        <a className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900" href={`/qa/real-estate-modes/${slug}/vacation`}>Vacation mode preview</a>
        <a className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900" href={`/qa/real-estate-modes/${slug}/sale`}>Sale mode preview</a>
        <a className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900" href={`/qa/real-estate-modes/${slug}/monthly`}>Monthly mode preview</a>
      </div>
    </section>
  );
}
