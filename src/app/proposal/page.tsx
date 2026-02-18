import { proposals } from "@/lib/proposalMockData";
import { detailListings } from "@/lib/detailMockData";
import Link from "next/link";

const templates = ["modern", "document", "magazine"] as const;
const templateLabels = { modern: "🖥️ Modern", document: "📄 Document", magazine: "🖼️ Magazine" };
const typeEmoji: Record<string, string> = { vacation: '🏖️', hotel: '🏨', 'hotel-room': '🛏️', 'real-estate': '🏠', service: '✨' };

export default function ProposalIndex() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">PickedFor — QA Hub</h1>
        <p className="text-gray-500 mb-8 text-sm">All proposals, templates, detail pages, and search hub for QA review.</p>

        {/* ─── SEARCH HUB ─── */}
        <h2 className="text-2xl font-bold mb-4">🔍 Search Hub</h2>
        <p className="text-gray-400 mb-4 text-xs">
          Universal search across all listing types with dynamic filters, request basket, and proposal generation.
        </p>
        <div className="space-y-3 mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-semibold">🔍 Search Hub — All Intents</p>
                <p className="text-sm text-gray-500">5 intents: Vacation · Real Estate · Services · Hotels · Blog · Request basket · Proposal generation</p>
              </div>
              <span className="text-xs text-amber-600 font-medium">Pending QA</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="https://pickedfor.com/search?intent=vacation" className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-400 hover:bg-gray-50">🏖️ Vacation</Link>
              <Link href="https://pickedfor.com/search?intent=real-estate" className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-400 hover:bg-gray-50">🏠 Real Estate</Link>
              <Link href="https://pickedfor.com/search?intent=services" className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-400 hover:bg-gray-50">✨ Services</Link>
              <Link href="https://pickedfor.com/search?intent=hotels" className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-400 hover:bg-gray-50">🏨 Hotels</Link>
              <Link href="https://pickedfor.com/search?intent=blog" className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-400 hover:bg-gray-50">📝 Blog</Link>
              <Link href="https://pickedfor.com/search" className="rounded-lg border border-blue-300 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:border-blue-400">🔍 Full Hub</Link>
            </div>
          </div>
        </div>

        {/* ─── PROPOSALS ─── */}
        <h2 className="text-2xl font-bold mb-4">📋 Proposal Pages</h2>
        <p className="text-gray-400 mb-4 text-xs">
          Params: <code className="bg-gray-200 px-1 rounded">?template=modern|document|magazine</code> · <code className="bg-gray-200 px-1 rounded">?mode=brand|nologo</code>
        </p>
        <div className="space-y-4 mb-12">
          {proposals.map((p) => (
            <div key={p.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold">{p.title}</p>
                  <p className="text-sm text-gray-500">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mr-2 ${p.mode === "brand" ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-600"}`}>
                      {p.mode}
                    </span>
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mr-2 ${
                      p.type === "individual" ? "bg-green-100 text-green-700" :
                      p.type === "combination" ? "bg-purple-100 text-purple-700" :
                      "bg-orange-100 text-orange-700"
                    }`}>
                      {p.type}
                    </span>
                    {p.entityType} · {p.items.length || p.bundleItems?.length || 0} items
                  </p>
                </div>
                <span className="text-xs text-amber-600 font-medium">Pending QA</span>
              </div>
              <div className="flex gap-2">
                {templates.map((t) => (
                  <Link
                    key={t}
                    href={`https://pickedfor.com/proposal/${p.id}?template=${t}`}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:border-gray-400"
                  >
                    {templateLabels[t]}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ─── DETAIL PAGES ─── */}
        <h2 className="text-2xl font-bold mb-4">📄 Detail Pages</h2>
        <p className="text-gray-400 mb-4 text-xs">
          Universal detail page (all types) + Hotel room flow. Param: <code className="bg-gray-200 px-1 rounded">?mode=brand|nologo</code>
        </p>
        <div className="space-y-3 mb-12">
          {detailListings.map((l) => (
            <div key={l.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold">{typeEmoji[l.type] || ''} {l.name}</p>
                  <p className="text-sm text-gray-500">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mr-2 ${l.type === 'hotel' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                      {l.type}
                    </span>
                    {l.listingType} · {l.region}
                    {l.type === 'hotel' && l.rooms ? ` · ${l.rooms.length} room types` : ''}
                  </p>
                </div>
                <span className="text-xs text-amber-600 font-medium">Pending QA</span>
              </div>
              <div className="flex gap-2">
                <Link href={`https://pickedfor.com/pickedfor/detail/${l.slug}?mode=brand`} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-400 hover:bg-gray-50">
                  🏷️ Branded
                </Link>
                <Link href={`https://pickedfor.com/pickedfor/detail/${l.slug}?mode=nologo`} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-400 hover:bg-gray-50">
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
