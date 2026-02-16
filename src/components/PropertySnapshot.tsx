import type { NormalizedProperty } from "@/lib/propertyNormalizer";

export function PropertySnapshot({ property }: { property: NormalizedProperty }) {
  return (
    <main className="mx-auto max-w-5xl p-6 text-slate-900">
      <h1 className="text-2xl font-semibold">{property.title}</h1>
      <p className="mt-1 text-slate-600">{property.subtitle}</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded border p-3">Guests: {property.metrics.maxGuests ?? "-"}</div>
        <div className="rounded border p-3">Bedrooms: {property.metrics.bedrooms ?? "-"}</div>
        <div className="rounded border p-3">Bathrooms: {property.metrics.bathrooms ?? "-"}</div>
        <div className="rounded border p-3">Floorspace: {property.metrics.floorspace ?? "-"} {property.metrics.floorspaceUnits}</div>
      </div>

      <div className="mt-4 rounded border p-4">
        <p className="font-medium">Location</p>
        <p className="text-sm text-slate-700">
          {property.location.city}, {property.location.region}, {property.location.country}
        </p>
      </div>

      {property.raw.typeWarnings.length > 0 && (
        <div className="mt-4 rounded border border-amber-300 bg-amber-50 p-4 text-sm">
          <p className="font-semibold">Contract warnings</p>
          <ul className="mt-1 list-disc pl-5">
            {property.raw.typeWarnings.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
