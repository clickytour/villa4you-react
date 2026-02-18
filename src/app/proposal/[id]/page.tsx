"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { getProposalById, Proposal, ProposalItem, BundleItem } from "@/lib/proposalMockData";

function ProposalContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const proposal = getProposalById(id);

  if (!proposal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-400 mb-2">404</h1>
          <p className="text-gray-500">Proposal not found.</p>
          <a href="/proposal" className="mt-4 inline-block text-blue-600 hover:underline text-sm">← Back to proposals</a>
        </div>
      </div>
    );
  }

  const modeOverride = searchParams.get("mode") as "brand" | "nologo" | null;
  const mode = modeOverride ?? proposal.mode;
  const isBrand = mode === "brand";

  const totalGuests = proposal.items.reduce((s, i) => s + (i.maxGuests ?? 0), 0);
  const bundleTotal = proposal.bundleItems?.reduce((s, b) => s + b.priceEur, 0) ?? 0;

  return (
    <div className={`min-h-screen ${isBrand ? "bg-[#f3f5f8]" : "bg-gray-50"}`}>
      {/* Header */}
      <header className={`py-6 px-4 ${isBrand ? "bg-blue-700 text-white" : "bg-gray-700 text-white"}`}>
        <div className="max-w-5xl mx-auto">
          {isBrand && (
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-blue-700 font-bold text-sm">V4</div>
              <span className="font-semibold text-lg">Villa4you</span>
            </div>
          )}
          <h1 className="text-2xl md:text-3xl font-bold">{proposal.title}</h1>
          {proposal.subtitle && <p className="mt-1 text-sm opacity-90">{proposal.subtitle}</p>}
          <p className="mt-2 text-xs opacity-70">
            Created {new Date(proposal.createdAt).toLocaleDateString()}
            {proposal.expiresAt && <> · Expires {new Date(proposal.expiresAt).toLocaleDateString()}</>}
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Large group header */}
        {proposal.type === "large_group" && (
          <div className={`mb-6 p-4 rounded-lg text-center ${isBrand ? "bg-blue-50 text-blue-800 border border-blue-200" : "bg-gray-100 text-gray-700 border border-gray-200"}`}>
            <p className="text-lg font-semibold">
              Accommodates {totalGuests} guests across {proposal.items.length} properties
            </p>
          </div>
        )}

        {/* Combination / bundle */}
        {proposal.type === "combination" && proposal.bundleItems && (
          <div className="mb-8">
            <div className={`rounded-xl border overflow-hidden ${isBrand ? "border-blue-200 bg-white" : "border-gray-200 bg-white"}`}>
              <div className={`px-6 py-4 ${isBrand ? "bg-blue-50" : "bg-gray-50"}`}>
                <h2 className="text-lg font-bold">Package Summary</h2>
              </div>
              <div className="divide-y">
                {proposal.bundleItems.map((b, i) => (
                  <BundleRow key={i} item={b} index={i} isBrand={isBrand} />
                ))}
              </div>
              <div className={`px-6 py-4 flex items-center justify-between ${isBrand ? "bg-blue-50" : "bg-gray-50"}`}>
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-xl">€{bundleTotal.toLocaleString()}</span>
              </div>
              <div className="px-6 pb-4">
                <button className={`w-full py-2 rounded-lg font-medium ${isBrand ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-700 text-white hover:bg-gray-800"}`}>
                  Open Package Details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Property / item cards */}
        {proposal.items.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2">
            {proposal.items.map((item, i) => (
              <PropertyCard key={i} item={item} index={i} isBrand={isBrand} entityType={proposal.entityType} />
            ))}
          </div>
        )}

        {/* Feedback */}
        <FeedbackSection isBrand={isBrand} />
      </main>

      {/* Footer */}
      <footer className={`py-6 text-center text-sm ${isBrand ? "text-blue-700" : "text-gray-500"}`}>
        {isBrand ? "Prepared for you by Villa4you" : "Prepared by your travel advisor"}
      </footer>
    </div>
  );
}

function PropertyCard({ item, index, isBrand, entityType }: { item: ProposalItem; index: number; isBrand: boolean; entityType: string }) {
  const label = isBrand ? item.name : `Property ${String.fromCharCode(65 + index)}`;
  const isRealEstate = entityType === "real_estate";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 bg-gray-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image} alt={label} className="w-full h-full object-cover" />
        {item.rating && (
          <span className="absolute top-2 right-2 bg-white/90 text-sm font-semibold px-2 py-0.5 rounded-full">
            ⭐ {item.rating}
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 uppercase tracking-wide">{item.listingType} · {item.region}</p>
        <h3 className="font-semibold text-lg mt-1">{label}</h3>
        {isBrand && item.description && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>}
        <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-500">
          {item.bedrooms != null && <span>🛏 {item.bedrooms} bed{item.bedrooms > 1 ? "s" : ""}</span>}
          {item.bathrooms != null && <span>🚿 {item.bathrooms} bath{item.bathrooms > 1 ? "s" : ""}</span>}
          {item.maxGuests != null && <span>👥 {item.maxGuests}</span>}
        </div>
        <div className="mt-3 flex items-end justify-between">
          <div>
            {item.pricePerNight != null && <p className="text-sm text-gray-500">€{item.pricePerNight}/night</p>}
            {item.totalPrice != null && (
              <p className="font-bold text-lg">
                {isRealEstate ? `€${item.totalPrice.toLocaleString()}` : `€${item.totalPrice.toLocaleString()} total`}
              </p>
            )}
          </div>
          <a
            href={item.detailsUrl}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${isBrand ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-700 text-white hover:bg-gray-800"}`}
          >
            View Details
          </a>
        </div>
      </div>
    </div>
  );
}

function BundleRow({ item, index, isBrand }: { item: BundleItem; index: number; isBrand: boolean }) {
  const typeLabels: Record<string, string> = { property: "🏠 Property", transfer: "🚗 Transfer", boat_rental: "⛵ Boat Rental", service: "✨ Service" };
  return (
    <div className="flex gap-4 p-4 items-center">
      <div className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image} alt={isBrand ? item.name : `Item ${index + 1}`} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400 uppercase">{typeLabels[item.type] ?? item.type}</p>
        <p className="font-medium truncate">{isBrand ? item.name : `Item ${index + 1}`}</p>
        {isBrand && item.description && <p className="text-xs text-gray-500 truncate">{item.description}</p>}
        {item.meta && <p className="text-xs text-gray-400">{item.meta}</p>}
        <div className="flex gap-3 text-xs text-gray-400 mt-0.5">
          {item.nights != null && <span>{item.nights} nights</span>}
          {item.guests != null && <span>{item.guests} guests</span>}
          {item.bedrooms != null && <span>{item.bedrooms} beds</span>}
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="font-semibold">€{item.priceEur.toLocaleString()}</p>
      </div>
    </div>
  );
}

function FeedbackSection({ isBrand }: { isBrand: boolean }) {
  return (
    <div className="mt-12 border-t pt-8">
      <h3 className="text-lg font-semibold text-center mb-4">How do you like this proposal?</h3>
      <div className="flex justify-center gap-4 mb-4">
        <button className="w-14 h-14 rounded-full border-2 border-gray-200 hover:border-green-400 hover:bg-green-50 flex items-center justify-center text-2xl transition-colors">👍</button>
        <button className="w-14 h-14 rounded-full border-2 border-gray-200 hover:border-red-400 hover:bg-red-50 flex items-center justify-center text-2xl transition-colors">👎</button>
      </div>
      <div className="max-w-md mx-auto">
        <textarea
          placeholder="Any comments or preferences? (optional)"
          className="w-full border border-gray-200 rounded-lg p-3 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button className={`mt-2 w-full py-2 rounded-lg text-sm font-medium ${isBrand ? "bg-blue-600 text-white" : "bg-gray-700 text-white"}`}>
          Send Feedback
        </button>
      </div>
    </div>
  );
}

export default function ProposalPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
      <ProposalContent />
    </Suspense>
  );
}
