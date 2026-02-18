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

function ItemCard({ item, index, isBrand, entityType, accent }: { item: ProposalItem; index: number; isBrand: boolean; entityType: string; accent: string }) {
  const label = isBrand ? item.name : `${item.listingType} ${String.fromCharCode(65 + index)}`;
  const isRealEstate = entityType === 'real_estate';
  const isUnavailable = item.availability === 'unavailable';
  const photos = item.images ?? [item.image];

  return (
    <div className={`group relative overflow-hidden rounded-xl ${isUnavailable ? 'opacity-50' : ''}`}>
      <div className="relative h-72 sm:h-80">
        <PhotoCarousel images={photos} alt={label} className="h-full" overlay />
        <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-800">{item.listingType}</span>
          <AvailabilityBadge status={item.availability} />
        </div>
        <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
          {item.rating && <span className="rounded-full bg-black/50 px-2 py-0.5 text-sm font-semibold text-white backdrop-blur-sm">⭐ {item.rating}</span>}
          <ActionButtons light />
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 p-6 text-white">
          <h3 className={`text-2xl font-bold leading-tight ${isUnavailable ? 'line-through decoration-red-400' : ''}`}>{label}</h3>
          <p className="mt-1 text-sm text-white/80">{item.region}</p>
          {(item.videoUrl || item.videoUrlGeneric || item.tour3dUrl || item.tour3dUrlGeneric) && <div className="mt-2"><MediaIcons videoUrl={item.videoUrl} videoUrlGeneric={item.videoUrlGeneric} tour3dUrl={item.tour3dUrl} tour3dUrlGeneric={item.tour3dUrlGeneric} isBrand={isBrand} light /></div>}
          {isBrand && item.description && <p className="mt-2 line-clamp-2 text-sm text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{item.description}</p>}
          <div className="mt-3 flex flex-wrap gap-3 text-sm text-white/90">
            {item.bedrooms != null && <span>🛏 {item.bedrooms} beds</span>}
            {item.bathrooms != null && <span>🚿 {item.bathrooms} baths</span>}
            {item.maxGuests != null && <span>👥 {item.maxGuests}</span>}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              {item.pricePerNight != null && <p className="text-sm text-white/60">€{item.pricePerNight}/night</p>}
              {item.totalPrice != null && (
                <p className={`text-2xl font-bold ${isUnavailable ? 'line-through text-white/50' : ''}`} style={isUnavailable ? {} : { color: accent }}>
                  {isRealEstate ? `€${item.totalPrice.toLocaleString()}` : `€${item.totalPrice.toLocaleString()} total`}
                </p>
              )}
            </div>
            {isUnavailable ? (
              <a href="https://pickedfor.com/contact" className="rounded-full px-4 py-2 text-sm font-medium text-white" style={{ backgroundColor: accent }}>Find Similar</a>
            ) : (
              <div className="flex gap-2">
                <a href={toPickedForUrl(item.detailsUrl)} className="rounded-full border border-white/60 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/20">View Details</a>
                <a href="https://pickedfor.com/contact" className="rounded-full px-4 py-2 text-sm font-medium text-white" style={{ backgroundColor: accent }}>Book Now</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function BundleSection({ items, isBrand, accent }: { items: BundleItem[]; isBrand: boolean; accent: string }) {
  const total = items.reduce((s, b) => s + b.priceEur, 0);
  const typeIcons: Record<string, string> = { property: '🏠', transfer: '🚗', boat_rental: '⛵', service: '✨' };
  return (
    <div className="mb-10 overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="border-b border-white/10 px-6 py-4"><h2 className="text-lg font-bold text-white">📦 Package Summary</h2></div>
      <div className="divide-y divide-white/10">
        {items.map((b, i) => (
          <div key={i} className="flex items-center gap-4 p-4">
            <div className="h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg"><img src={b.image} alt={isBrand ? b.name : `Item ${i + 1}`} className="h-full w-full object-cover" /></div>
            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase text-white/40">{typeIcons[b.type] ?? ''} {b.type.replace('_', ' ')}</p>
              <p className="truncate font-medium text-white">{isBrand ? b.name : `Item ${i + 1}`}</p>
              {isBrand && b.description && <p className="truncate text-xs text-white/50">{b.description}</p>}
              <div className="mt-0.5 flex gap-3 text-xs text-white/40">{b.nights != null && <span>{b.nights} nights</span>}{b.guests != null && <span>{b.guests} guests</span>}{b.meta && <span>{b.meta}</span>}</div>
            </div>
            <p className="flex-shrink-0 font-semibold text-white">€{b.priceEur.toLocaleString()}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-white/10 px-6 py-4">
        <span className="text-lg font-bold text-white">Total</span>
        <span className="text-xl font-bold" style={{ color: accent }}>€{total.toLocaleString()}</span>
      </div>
      <div className="px-6 pb-4">
        <button className="w-full rounded-full py-2.5 font-medium text-white hover:opacity-90" style={{ backgroundColor: accent }}>Book Entire Package</button>
      </div>
    </div>
  );
}

function GroupedCards({ items, isBrand, entityType, accent }: { items: ProposalItem[]; isBrand: boolean; entityType: string; accent: string }) {
  const { available, unavailable, newMatches } = groupItems(items);
  let globalIdx = 0;
  return (
    <>
      {available.length > 0 && (
        <><h2 className="mb-4 mt-8 text-lg font-semibold text-white/80">✨ Your Selected Options</h2>
        <div className="grid gap-8 sm:grid-cols-2">{available.map((item) => { const i = globalIdx++; return <ItemCard key={i} item={item} index={i} isBrand={isBrand} entityType={entityType} accent={accent} />; })}</div></>
      )}
      {unavailable.length > 0 && (
        <><h2 className="mb-4 mt-10 text-lg font-semibold text-white/80">⏳ No Longer Available</h2>
        <div className="grid gap-8 sm:grid-cols-2">{unavailable.map((item) => { const i = globalIdx++; return <ItemCard key={i} item={item} index={i} isBrand={isBrand} entityType={entityType} accent={accent} />; })}</div></>
      )}
      {newMatches.length > 0 && (
        <><h2 className="mb-4 mt-10 text-lg font-semibold text-white/80">🆕 New Matches We Found</h2>
        <div className="grid gap-8 sm:grid-cols-2">{newMatches.map((item) => { const i = globalIdx++; return <ItemCard key={i} item={item} index={i} isBrand={isBrand} entityType={entityType} accent={accent} />; })}</div></>
      )}
    </>
  );
}

function FeedbackSection({ accent }: { accent: string }) {
  return (
    <div className="mt-12 border-t border-white/10 pt-8">
      <h3 className="mb-4 text-center text-lg font-semibold text-white/80">How do you like this proposal?</h3>
      <div className="mb-4 flex justify-center gap-4">
        <button className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/20 text-2xl hover:border-green-400 hover:bg-green-500/10">👍</button>
        <button className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/20 text-2xl hover:border-red-400 hover:bg-red-500/10">👎</button>
      </div>
      <div className="mx-auto max-w-md">
        <textarea placeholder="Any comments or preferences? (optional)" className="h-24 w-full resize-none rounded-lg border border-white/20 bg-white/5 p-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/30" />
        <button className="mt-2 w-full rounded-full py-2 text-sm font-medium text-white" style={{ backgroundColor: accent }}>Send Feedback</button>
      </div>
    </div>
  );
}

export function MagazineTemplate({ proposal, mode }: Props) {
  const isBrand = mode === 'brand';
  const accent = isBrand ? '#d4af37' : '#e2b857';
  const totalGuests = proposal.items.reduce((s, i) => s + (i.maxGuests ?? 0), 0);
  const heroImg = proposal.items[0]?.image || proposal.bundleItems?.[0]?.image || '';
  const hasAvailabilityData = proposal.items.some((i) => i.availability);

  return (
    <div className="min-h-screen bg-black pb-20 text-white">
      <header className="w-full border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          {isBrand ? <span className="text-lg font-semibold">PickedFor</span> : <span className="text-lg font-light uppercase tracking-[0.3em] text-white/50">Curated</span>}
          {isBrand && <a href="https://pickedfor.com/contact" className="rounded-full border border-white/30 px-5 py-2 text-sm font-medium text-white hover:bg-white/10">Get in Touch</a>}
        </div>
      </header>

      <div className="relative flex h-[40vh] items-center justify-center overflow-hidden">
        {heroImg && <img src={heroImg} alt="Hero" className="absolute inset-0 h-full w-full object-cover opacity-40" />}
        <div className="relative z-10 text-center">
          <p className="text-sm font-light uppercase tracking-[0.4em] text-white/60">Your exclusive selection</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{proposal.title}</h1>
          {proposal.subtitle && <p className="mt-3 text-lg text-white/70">{proposal.subtitle}</p>}
          <p className="mt-3 text-xs text-white/40">{new Date(proposal.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-4 rounded-lg bg-blue-500/10 px-4 py-2 text-center text-xs text-blue-300">💡 Prices and availability updated just now</div>
        {hasAvailabilityData && <ListingSummary items={proposal.items} dark />}

        {proposal.type === 'large_group' && (
          <div className="my-8 rounded-xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm">
            <p className="text-lg font-semibold">👥 Accommodates {totalGuests} guests across {proposal.items.length} properties</p>
          </div>
        )}

        {proposal.type === 'combination' && proposal.bundleItems && <BundleSection items={proposal.bundleItems} isBrand={isBrand} accent={accent} />}

        {proposal.items.length > 0 && (
          hasAvailabilityData
            ? <GroupedCards items={proposal.items} isBrand={isBrand} entityType={proposal.entityType} accent={accent} />
            : <div className="grid gap-8 sm:grid-cols-2">{proposal.items.map((item, i) => <ItemCard key={i} item={item} index={i} isBrand={isBrand} entityType={proposal.entityType} accent={accent} />)}</div>
        )}

        <FeedbackSection accent={accent} />
      </div>

      <footer className="border-t border-white/10 py-8 text-center text-sm text-white/40">
        {isBrand ? <p className="font-medium text-white/60">Prepared for you by PickedFor</p> : <p>Prepared by your travel advisor</p>}
        <p className="mt-2 text-xs text-white/20">© {new Date().getFullYear()} · Powered by PickedFor</p>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <p className="text-sm font-medium text-white/70">{isBrand ? 'Ready to book? Contact PickedFor' : 'Interested? Get in touch'}</p>
          <a href="https://pickedfor.com/contact" className="rounded-full px-4 py-1.5 text-sm font-medium text-white" style={{ backgroundColor: accent }}>✉️ Contact</a>
        </div>
      </div>
    </div>
  );
}
