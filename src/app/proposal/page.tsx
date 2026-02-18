import { proposals } from "@/lib/proposalMockData";
import Link from "next/link";

export default function ProposalIndex() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Proposal Demos</h1>
        <p className="text-gray-500 mb-8 text-sm">Click any proposal to preview. Append <code className="bg-gray-200 px-1 rounded">?mode=brand</code> or <code className="bg-gray-200 px-1 rounded">?mode=nologo</code> to override.</p>
        <div className="space-y-3">
          {proposals.map((p) => (
            <Link
              key={p.id}
              href={`/proposal/${p.id}`}
              className="block bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{p.title}</p>
                  <p className="text-sm text-gray-500">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mr-2 ${p.mode === "brand" ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-600"}`}>
                      {p.mode}
                    </span>
                    {p.type} · {p.entityType} · {p.items.length || p.bundleItems?.length || 0} items
                  </p>
                </div>
                <span className="text-gray-400 text-lg">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
