import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { proposals } from "@/lib/proposalMockData";
import { detailListings } from "@/lib/detailMockData";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const templates = ["modern", "document", "magazine"] as const;
const templateLabels = { modern: "🖥️ Modern", document: "📄 Document", magazine: "🖼️ Magazine" };
const typeEmoji: Record<string, string> = { vacation: "🏖️", hotel: "🏨", "hotel-room": "🛏️", "real-estate": "🏠", service: "✨" };

export default async function ProposalIndex({
  searchParams,
}: {
  searchParams: Promise<{ qa?: string }>;
}) {
  const params = await searchParams;
  const isDev = process.env.NODE_ENV === "development";
  const hasQaOverride = params.qa === "1";
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").toLowerCase();
  const isStaging = siteUrl.includes("staging") || siteUrl.includes("vercel.app");
  const canViewQaHub = isDev || hasQaOverride || isStaging;

  if (!canViewQaHub) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">PickedFor — QA Hub</h1>
        <p className="mb-8 text-sm text-gray-500">All proposals, templates, detail pages, and search hub for QA review.</p>

        {/* ─── SEARCH HUB ─── */}
        <h2 className="mb-4 text-2xl font-bold">🔍 Search Hub</h2>
        <p className="mb-4 text-xs text-gray-400">
          Universal search across all listing types with dynamic filters, request basket, and proposal generation.
        </p>
        <div className="mb-12 space-y-3">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <p className="font-semibold">🔍 Search Hub — All Intents</p>
                <p className="text-sm text-gray-500">5 intents: Vacation · Real Estate · Services · Hotels · Blog · Request basket · Proposal generation</p>
              </div>
              {canViewQaHub && <span className="text-xs font-medium text-amber-600">Pending QA</span>}
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/search?intent=vacation" className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-400 hover:bg-gray-50">🏖️ Vacation</Link>
              <Link href="/search?intent=real-estate" className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-400 hover:bg-gray-50">🏠 Real Estate</Link>
              <Link href="/search?intent=services" className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-400 hover:bg-gray-50">✨ Services</Link>
              <Link href="/search?intent=hotels" className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-400 hover:bg-gray-50">🏨 Hotels</Link>
              <Link href="/search?intent=blog" className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-400 hover:bg-gray-50">📝 Blog</Link>
              <Link href="/search" className="rounded-lg border border-blue-300 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:border-blue-400">🔍 Full Hub</Link>
            </div>
          </div>
        </div>

        {/* ─── PROPOSALS ─── */}
        <h2 className="mb-4 text-2xl font-bold">📋 Proposal Pages</h2>
        <p className="mb-4 text-xs text-gray-400">
          Params: <code className="rounded bg-gray-200 px-1">?template=modern|document|magazine</code> · <code className="rounded bg-gray-200 px-1">?mode=brand|nologo</code>
        </p>
        <div className="mb-12 space-y-4">
          {proposals.map((p) => (
            <div key={p.id} className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <p className="font-semibold">{p.title}</p>
                  <p className="text-sm text-gray-500">
                    <span className={`mr-2 inline-block rounded px-2 py-0.5 text-xs font-medium ${p.mode === "brand" ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-600"}`}>
                      {p.mode}
                    </span>
                    <span
                      className={`mr-2 inline-block rounded px-2 py-0.5 text-xs font-medium ${
                        p.type === "individual" ? "bg-green-100 text-green-700" : p.type === "combination" ? "bg-purple-100 text-purple-700" : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {p.type}
                    </span>
                    {p.entityType} · {p.items.length || p.bundleItems?.length || 0} items
                  </p>
                </div>
                {canViewQaHub && <span className="text-xs font-medium text-amber-600">Pending QA</span>}
              </div>
              <div className="flex gap-2">
                {templates.map((t) => (
                  <Link
                    key={t}
                    href={`/proposal/${p.id}?template=${t}`}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-gray-400 hover:bg-gray-50"
                  >
                    {templateLabels[t]}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ─── DETAIL PAGES ─── */}
        <h2 className="mb-4 text-2xl font-bold">📄 Detail Pages</h2>
        <p className="mb-4 text-xs text-gray-400">
          Universal detail page (all types) + Hotel room flow. Param: <code className="rounded bg-gray-200 px-1">?mode=brand|nologo</code>
        </p>
        <div className="mb-12 space-y-3">
          {detailListings.map((l) => (
            <div key={l.id} className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <p className="font-semibold">
                    {typeEmoji[l.type] || ""} {l.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className={`mr-2 inline-block rounded px-2 py-0.5 text-xs font-medium ${l.type === "hotel" ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"}`}>
                      {l.type}
                    </span>
                    {l.listingType} · {l.region}
                    {l.type === "hotel" && l.rooms ? ` · ${l.rooms.length} room types` : ""}
                  </p>
                </div>
                {canViewQaHub && <span className="text-xs font-medium text-amber-600">Pending QA</span>}
              </div>
              <div className="flex gap-2">
                <Link href={`/pickedfor/detail/${l.slug}?mode=brand`} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-400 hover:bg-gray-50">
                  🏷️ Branded
                </Link>
                <Link href={`/pickedfor/detail/${l.slug}?mode=nologo`} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-400 hover:bg-gray-50">
                  🔒 No-logo
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
