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

function ItemRow({ item, index, isBrand, entityType, accent }: { item: ProposalItem; index: number; isBrand: boolean; entityType: string; accent: string }) {
  const label = isBrand ? item.name : `${item.listingType} ${String.fromCharCode(65 + index)}`;
  const isRealEstate = entityType === 'real_estate';
  const isUnavailable = item.availability === 'unavailable';
  const photos = item.images ?? [item.image];

  return (
    <div className={`overflow-hidden rounded border border-gray-300 bg-white ${isUnavailable ? 'opacity-60' : ''}`}>
      <div className="flex flex-col sm:flex-row">
        <div className="relative h-48 flex-shrink-0 sm:h-auto sm:w-56">
          <PhotoCarousel images={photos} alt={label} className="h-full" />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{item.listingType}</span>
                <AvailabilityBadge status={item.availability} />
              </div>
              <h3 className={`font-serif text-lg font-bold text-gray-900 ${isUnavailable ? 'line-through decoration-red-400' : ''}`}>{label}</h3>
              <p className="text-sm text-gray-500">{item.region}</p>
            </div>
            <div className="flex items-center gap-2">
              <StarRating rating={item.rating} reviewCount={item.reviewCount} />
              <ActionButtons />
            </div>
          </div>
          {(item.videoUrl || item.videoUrlGeneric || item.tour3dUrl || item.tour3dUrlGeneric) && <div className="mt-2"><MediaIcons videoUrl={item.videoUrl} videoUrlGeneric={item.videoUrlGeneric} tour3dUrl={item.tour3dUrl} tour3dUrlGeneric={item.tour3dUrlGeneric} isBrand={isBrand} /></div>}
          {isBrand && item.description && <p className="mt-2 text-sm text-gray-600">{item.description}</p>}
          <table className="mt-3 w-full text-sm">
            <tbody>
              {item.bedrooms != null && <tr className="border-b border-gray-100"><td className="py-1 pr-3 font-medium text-gray-600">Bedrooms</td><td className="py-1 text-gray-800">{item.bedrooms}</td></tr>}
              {item.bathrooms != null && <tr className="border-b border-gray-100"><td className="py-1 pr-3 font-medium text-gray-600">Bathrooms</td><td className="py-1 text-gray-800">{item.bathrooms}</td></tr>}
              {item.maxGuests != null && <tr className="border-b border-gray-100"><td className="py-1 pr-3 font-medium text-gray-600">Max Guests</td><td className="py-1 text-gray-800">{item.maxGuests}</td></tr>}
            </tbody>
          </table>
          <div className="mt-auto flex items-center justify-between pt-4">
            <div>
              {item.pricePerNight != null && <p className="text-sm text-gray-500">€{item.pricePerNight}/night</p>}
              {item.totalPrice != null && (
                <p className={`text-xl font-bold ${isUnavailable ? 'text-gray-400 line-through' : ''}`} style={isUnavailable ? {} : { color: accent }}>
                  {isRealEstate ? `€${item.totalPrice.toLocaleString()}` : `€${item.totalPrice.toLocaleString()} total`}
                </p>
              )}
            </div>
            {isUnavailable ? (
              <a href="https://pickedfor.com/contact" className="rounded px-3 py-1.5 text-sm font-medium text-white" style={{ backgroundColor: accent }}>Find Similar</a>
            ) : (
              <div className="flex gap-2">
                <a href={toPickedForUrl(item.detailsUrl)} className="rounded border px-3 py-1.5 text-sm font-medium hover:bg-gray-50" style={{ borderColor: accent, color: accent }}>View Details</a>
                <a href="https://pickedfor.com/contact" className="rounded px-3 py-1.5 text-sm font-medium text-white" style={{ backgroundColor: accent }}>Inquire</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function BundleTable({ items, isBrand, accent }: { items: BundleItem[]; isBrand: boolean; accent: string }) {
  const total = items.reduce((s, b) => s + b.priceEur, 0);
  return (
    <div className="mb-8 overflow-hidden rounded border border-gray-300 bg-white">
      <div className="border-b-2 border-gray-300 bg-gray-50 px-6 py-3"><h2 className="font-serif text-lg font-bold">Package Summary</h2></div>
      <table className="w-full text-sm">
        <thead><tr className="border-b border-gray-200 bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500"><th className="px-6 py-2">#</th><th className="px-6 py-2">Item</th><th className="px-6 py-2">Details</th><th className="px-6 py-2 text-right">Price</th></tr></thead>
        <tbody className="divide-y divide-gray-100">
          {items.map((b, i) => (
            <tr key={i}>
              <td className="px-6 py-3 text-gray-400">{i + 1}</td>
              <td className="px-6 py-3"><p className="font-medium">{isBrand ? b.name : `Item ${i + 1}`}</p><p className="text-xs text-gray-400">{b.type.replace('_', ' ')}</p></td>
              <td className="px-6 py-3 text-xs text-gray-500">{b.nights != null && <span>{b.nights} nights · </span>}{b.guests != null && <span>{b.guests} guests · </span>}{b.meta && <span>{b.meta}</span>}</td>
              <td className="px-6 py-3 text-right font-semibold">€{b.priceEur.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
        <tfoot><tr className="bg-gray-50"><td colSpan={3} className="px-6 py-3 text-right font-bold">Total</td><td className="px-6 py-3 text-right text-xl font-bold" style={{ color: accent }}>€{total.toLocaleString()}</td></tr></tfoot>
      </table>
    </div>
  );
}

function GroupedRows({ items, isBrand, entityType, accent }: { items: ProposalItem[]; isBrand: boolean; entityType: string; accent: string }) {
  const { available, unavailable, newMatches } = groupItems(items);
  let globalIdx = 0;
  return (
    <>
      {available.length > 0 && (
        <><h2 className="mb-4 mt-8 font-serif text-lg font-semibold text-gray-700">✨ Your Selected Options</h2>
        <div className="flex flex-col gap-6">{available.map((item) => { const i = globalIdx++; return <ItemRow key={i} item={item} index={i} isBrand={isBrand} entityType={entityType} accent={accent} />; })}</div></>
      )}
      {unavailable.length > 0 && (
        <><h2 className="mb-4 mt-10 font-serif text-lg font-semibold text-gray-700">⏳ No Longer Available</h2>
        <div className="flex flex-col gap-6">{unavailable.map((item) => { const i = globalIdx++; return <ItemRow key={i} item={item} index={i} isBrand={isBrand} entityType={entityType} accent={accent} />; })}</div></>
      )}
      {newMatches.length > 0 && (
        <><h2 className="mb-4 mt-10 font-serif text-lg font-semibold text-gray-700">🆕 New Matches We Found</h2>
        <div className="flex flex-col gap-6">{newMatches.map((item) => { const i = globalIdx++; return <ItemRow key={i} item={item} index={i} isBrand={isBrand} entityType={entityType} accent={accent} />; })}</div></>
      )}
    </>
  );
}

function FeedbackSection({ accent }: { accent: string }) {
  return (
    <div className="mt-12 border-t-2 border-gray-300 pt-8">
      <h3 className="mb-4 text-center font-serif text-lg font-semibold">Your Feedback</h3>
      <div className="mb-4 flex justify-center gap-4">
        <button className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-200 text-xl hover:border-green-400 hover:bg-green-50">👍</button>
        <button className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-200 text-xl hover:border-red-400 hover:bg-red-50">👎</button>
      </div>
      <div className="mx-auto max-w-md">
        <textarea placeholder="Any comments or preferences? (optional)" className="h-24 w-full resize-none rounded border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400" />
        <button className="mt-2 w-full rounded py-2 text-sm font-medium text-white" style={{ backgroundColor: accent }}>Submit Feedback</button>
      </div>
    </div>
  );
}

export function DocumentTemplate({ proposal, mode }: Props) {
  const isBrand = mode === 'brand';
  const accent = isBrand ? '#1e3a5f' : '#4a5568';
  const totalGuests = proposal.items.reduce((s, i) => s + (i.maxGuests ?? 0), 0);
  const hasAvailabilityData = proposal.items.some((i) => i.availability);

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-20">
      <header className="w-full border-b border-gray-300 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          {isBrand ? (
            <div className="flex items-center gap-2"><div className="flex h-8 w-8 items-center justify-center rounded bg-[#1e3a5f] text-sm font-bold text-white">V4</div><span className="font-serif text-lg font-semibold">PickedFor</span></div>
          ) : (
            <span className="font-serif text-lg font-light text-gray-400">Travel Proposal</span>
          )}
          {isBrand && <a href="https://pickedfor.com/contact" className="rounded border px-4 py-2 text-sm font-medium hover:bg-gray-50" style={{ borderColor: accent, color: accent }}>Contact Us</a>}
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8 border-b-2 border-gray-300 pb-6 text-center">
          <h1 className="font-serif text-3xl font-bold text-gray-900">{proposal.title}</h1>
          {proposal.subtitle && <p className="mt-2 font-serif text-lg italic text-gray-600">{proposal.subtitle}</p>}
          <p className="mt-2 text-xs text-gray-400">
            Issued {new Date(proposal.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            {proposal.expiresAt && <> · Valid until {new Date(proposal.expiresAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</>}
          </p>
        </div>

        <div className="mb-4 rounded border border-gray-300 bg-white px-4 py-2 text-center text-xs text-blue-600">💡 Prices and availability updated just now</div>
        {hasAvailabilityData && <ListingSummary items={proposal.items} />}

        {proposal.type === 'large_group' && (
          <div className="my-6 rounded border border-gray-300 bg-white p-4 text-center"><p className="font-serif text-lg font-semibold text-gray-700">👥 Accommodates {totalGuests} guests across {proposal.items.length} properties</p></div>
        )}

        {proposal.type === 'combination' && proposal.bundleItems && <BundleTable items={proposal.bundleItems} isBrand={isBrand} accent={accent} />}

        {proposal.items.length > 0 && (
          hasAvailabilityData
            ? <GroupedRows items={proposal.items} isBrand={isBrand} entityType={proposal.entityType} accent={accent} />
            : <div className="flex flex-col gap-6">{proposal.items.map((item, i) => <ItemRow key={i} item={item} index={i} isBrand={isBrand} entityType={proposal.entityType} accent={accent} />)}</div>
        )}

        <FeedbackSection accent={accent} />
      </div>

      <footer className="border-t border-gray-300 bg-white py-8 text-center text-sm text-gray-500">
        {isBrand ? <p className="font-serif font-medium text-gray-700">Prepared for you by PickedFor</p> : <p className="font-serif">Prepared by your travel advisor</p>}
        <p className="mt-2 text-xs text-gray-400">© {new Date().getFullYear()} · Powered by PickedFor</p>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-300 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <p className="text-sm font-medium text-gray-700">{isBrand ? 'Ready to proceed? Contact PickedFor' : 'Interested? Get in touch'}</p>
          <a href="https://pickedfor.com/contact" className="rounded px-4 py-1.5 text-sm font-medium text-white" style={{ backgroundColor: accent }}>✉️ Contact</a>
        </div>
      </div>
    </div>
  );
}
