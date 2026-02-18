'use client';

import { Proposal, ProposalItem, BundleItem } from '@/lib/proposalMockData';
import { AvailabilityBadge, StarRating, PhotoCarousel, ActionButtons, ListingSummary, MediaIcons, groupItems } from './shared';

interface Props {
  proposal: Proposal;
  mode: 'brand' | 'nologo';
}

const PICKEDFOR_BASE_URL = 'https://pickedfor.com';

function toPickedForUrl(pathOrUrl: string) {
  if (!pathOrUrl) return PICKEDFOR_BASE_URL;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  if (pathOrUrl.startsWith('/pickedfor/detail/')) return `${PICKEDFOR_BASE_URL}${pathOrUrl}`;
  const slug = pathOrUrl.split('/').filter(Boolean).pop();
  return slug ? `${PICKEDFOR_BASE_URL}/pickedfor/detail/${slug}` : PICKEDFOR_BASE_URL;
}

function ItemCard({ item, index, isBrand, entityType }: { item: ProposalItem; index: number; isBrand: boolean; entityType: string }) {
  const label = isBrand ? item.name : `${item.listingType} ${String.fromCharCode(65 + index)}`;
  const isRealEstate = entityType === 'real_estate';
  const isUnavailable = item.availability === 'unavailable';
  const photos = item.images ?? [item.image];

  return (
    <div className={`overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md ${isUnavailable ? 'opacity-60' : ''}`}>
      <div className="relative h-52">
        <PhotoCarousel images={photos} alt={label} className="h-full" />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-700 shadow-sm">{item.listingType}</span>
          <AvailabilityBadge status={item.availability} />
        </div>
        <div className="absolute right-3 top-3">
          <ActionButtons />
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className={`text-lg font-semibold text-gray-900 ${isUnavailable ? 'line-through decoration-red-400' : ''}`}>{label}</h3>
          <StarRating rating={item.rating} reviewCount={item.reviewCount} />
        </div>
        <p className="mt-0.5 text-sm text-gray-500">{item.region}</p>
        {(item.videoUrl || item.videoUrlGeneric || item.tour3dUrl || item.tour3dUrlGeneric) && <div className="mt-2"><MediaIcons videoUrl={item.videoUrl} videoUrlGeneric={item.videoUrlGeneric} tour3dUrl={item.tour3dUrl} tour3dUrlGeneric={item.tour3dUrlGeneric} isBrand={isBrand} /></div>}
        {isBrand && item.description && <p className="mt-2 line-clamp-2 text-sm text-gray-600">{item.description}</p>}
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
          {item.bedrooms != null && <span>🛏 {item.bedrooms} bed{item.bedrooms > 1 ? 's' : ''}</span>}
          {item.bathrooms != null && <span>🚿 {item.bathrooms} bath{item.bathrooms > 1 ? 's' : ''}</span>}
          {item.maxGuests != null && <span>👥 {item.maxGuests} guests</span>}
        </div>
        <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-4">
          <div>
            {item.pricePerNight != null && <p className="text-sm text-gray-500">€{item.pricePerNight}/night</p>}
            {item.totalPrice != null && (
              <p className={`text-xl font-bold ${isUnavailable ? 'text-gray-400 line-through' : 'text-blue-700'}`}>
                {isRealEstate ? `€${item.totalPrice.toLocaleString()}` : `€${item.totalPrice.toLocaleString()} total`}
              </p>
            )}
          </div>
          {isUnavailable ? (
            <a href="https://pickedfor.com/contact" className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:opacity-90">Find Similar</a>
          ) : (
            <div className="flex gap-2">
              <a href={toPickedForUrl(item.detailsUrl)} className="rounded-lg border border-blue-600 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50">View Details</a>
              <a href="https://pickedfor.com/contact" className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:opacity-90">Book Now</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BundleSection({ items, isBrand }: { items: BundleItem[]; isBrand: boolean }) {
  const total = items.reduce((s, b) => s + b.priceEur, 0);
  const typeIcons: Record<string, string> = { property: '🏠', transfer: '🚗', boat_rental: '⛵', service: '✨' };
  return (
    <div className="mb-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="bg-blue-50 px-6 py-4"><h2 className="text-lg font-bold text-gray-900">📦 Package Summary</h2></div>
      <div className="divide-y divide-gray-100">
        {items.map((b, i) => (
          <div key={i} className="flex items-center gap-4 p-4">
            <div className="h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200"><img src={b.image} alt={isBrand ? b.name : `Item ${i + 1}`} className="h-full w-full object-cover" /></div>
            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase text-gray-400">{typeIcons[b.type] ?? ''} {b.type.replace('_', ' ')}</p>
              <p className="truncate font-medium">{isBrand ? b.name : `Item ${i + 1}`}</p>
              {isBrand && b.description && <p className="truncate text-xs text-gray-500">{b.description}</p>}
              <div className="mt-0.5 flex gap-3 text-xs text-gray-400">
                {b.nights != null && <span>{b.nights} nights</span>}
                {b.guests != null && <span>{b.guests} guests</span>}
                {b.meta && <span>{b.meta}</span>}
              </div>
            </div>
            <p className="flex-shrink-0 font-semibold">€{b.priceEur.toLocaleString()}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between bg-blue-50 px-6 py-4">
        <span className="text-lg font-bold">Total</span>
        <span className="text-xl font-bold text-blue-700">€{total.toLocaleString()}</span>
      </div>
      <div className="px-6 pb-4">
        <button className="w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white hover:opacity-90">Book Entire Package</button>
      </div>
    </div>
  );
}

function FeedbackSection() {
  return (
    <div className="mt-12 border-t border-gray-200 pt-8">
      <h3 className="mb-4 text-center text-lg font-semibold">How do you like this proposal?</h3>
      <div className="mb-4 flex justify-center gap-4">
        <button className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-gray-200 text-2xl transition-colors hover:border-green-400 hover:bg-green-50">👍</button>
        <button className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-gray-200 text-2xl transition-colors hover:border-red-400 hover:bg-red-50">👎</button>
      </div>
      <div className="mx-auto max-w-md">
        <textarea placeholder="Any comments or preferences? (optional)" className="h-24 w-full resize-none rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
        <button className="mt-2 w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white">Send Feedback</button>
      </div>
    </div>
  );
}

function GroupedCards({ items, isBrand, entityType }: { items: ProposalItem[]; isBrand: boolean; entityType: string }) {
  const { available, unavailable, newMatches } = groupItems(items);
  const gridClass = 'grid gap-6 sm:grid-cols-2';
  let globalIdx = 0;

  return (
    <>
      {available.length > 0 && (
        <>
          <h2 className="mb-4 mt-8 text-lg font-semibold text-gray-700">✨ Your Selected Options</h2>
          <div className={gridClass}>
            {available.map((item) => { const i = globalIdx++; return <ItemCard key={i} item={item} index={i} isBrand={isBrand} entityType={entityType} />; })}
          </div>
        </>
      )}
      {unavailable.length > 0 && (
        <>
          <h2 className="mb-4 mt-10 text-lg font-semibold text-gray-700">⏳ No Longer Available</h2>
          <div className={gridClass}>
            {unavailable.map((item) => { const i = globalIdx++; return <ItemCard key={i} item={item} index={i} isBrand={isBrand} entityType={entityType} />; })}
          </div>
        </>
      )}
      {newMatches.length > 0 && (
        <>
          <h2 className="mb-4 mt-10 text-lg font-semibold text-gray-700">🆕 New Matches We Found</h2>
          <div className={gridClass}>
            {newMatches.map((item) => { const i = globalIdx++; return <ItemCard key={i} item={item} index={i} isBrand={isBrand} entityType={entityType} />; })}
          </div>
        </>
      )}
    </>
  );
}

export function ModernTemplate({ proposal, mode }: Props) {
  const isBrand = mode === 'brand';
  const totalGuests = proposal.items.reduce((s, i) => s + (i.maxGuests ?? 0), 0);
  const hasAvailabilityData = proposal.items.some((i) => i.availability);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="w-full border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {isBrand ? (
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-700 text-sm font-bold text-white">V4</div>
              <span className="text-lg font-semibold">PickedFor</span>
            </div>
          ) : (
            <span className="text-lg font-light tracking-wide text-gray-400">Curated Proposal</span>
          )}
          {isBrand && <a href="https://pickedfor.com/contact" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:opacity-90">Contact Us</a>}
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">{proposal.title}</h1>
          {proposal.subtitle && <p className="mt-2 text-lg text-gray-500">{proposal.subtitle}</p>}
          <p className="mt-2 text-xs text-gray-400">
            Created {new Date(proposal.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            {proposal.expiresAt && <> · Valid until {new Date(proposal.expiresAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</>}
          </p>
        </div>

        {/* Update banner */}
        <div className="mb-4 rounded-lg bg-blue-50 px-4 py-2 text-center text-xs text-blue-600">
          💡 Prices and availability updated just now
        </div>

        {/* Summary */}
        {hasAvailabilityData && <ListingSummary items={proposal.items} />}

        {/* Large group */}
        {proposal.type === 'large_group' && (
          <div className="my-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-center text-blue-800">
            <p className="text-lg font-semibold">👥 Accommodates {totalGuests} guests across {proposal.items.length} properties</p>
          </div>
        )}

        {/* Bundle */}
        {proposal.type === 'combination' && proposal.bundleItems && <BundleSection items={proposal.bundleItems} isBrand={isBrand} />}

        {/* Cards — grouped if availability data exists */}
        {proposal.items.length > 0 && (
          hasAvailabilityData
            ? <GroupedCards items={proposal.items} isBrand={isBrand} entityType={proposal.entityType} />
            : (
              <div className="grid gap-6 sm:grid-cols-2">
                {proposal.items.map((item, i) => <ItemCard key={i} item={item} index={i} isBrand={isBrand} entityType={proposal.entityType} />)}
              </div>
            )
        )}

        <FeedbackSection />
      </div>

      <footer className="border-t border-gray-200 bg-white py-8 text-center text-sm text-gray-500">
        {isBrand ? <p className="font-medium text-gray-700">Prepared for you by PickedFor</p> : <p>Prepared by your travel advisor</p>}
        <p className="mt-2 text-xs text-gray-400">© {new Date().getFullYear()} · Powered by PickedFor</p>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <p className="text-sm font-medium text-gray-700">{isBrand ? 'Ready to book? Contact PickedFor' : 'Ready to book? Get in touch'}</p>
          <a href="https://pickedfor.com/contact" className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:opacity-90">{isBrand ? '✉️ Contact Us' : '✉️ Inquire'}</a>
        </div>
      </div>
    </div>
  );
}
