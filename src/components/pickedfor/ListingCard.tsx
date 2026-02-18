'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Listing } from '@/data/mock-proposals';

interface Props {
  listing: Listing;
  proposalId: string;
  accentColor?: string;
  variant?: 'modern' | 'document' | 'magazine';
}

const typeBadge: Record<string, string> = {
  vacation: 'Villa',
  transfer: 'Transfer',
  boat: 'Boat Rental',
  'real-estate': 'Property',
};

function AvailabilityBadge({ status }: { status: Listing['availability'] }) {
  if (status === 'available') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Available
      </span>
    );
  }
  if (status === 'unavailable') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
        No longer available
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
      New Match
    </span>
  );
}

function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm">
      <svg className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <span className="font-semibold">{rating}</span>
      <span className="text-gray-400">({reviewCount})</span>
    </span>
  );
}

function PhotoCarousel({ photos, alt, className }: { photos: string[]; alt: string; className?: string }) {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i === 0 ? photos.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === photos.length - 1 ? 0 : i + 1));

  return (
    <div className={`group/carousel relative overflow-hidden ${className ?? ''}`}>
      <img src={photos[idx]} alt={alt} className="h-full w-full object-cover transition-opacity duration-300" />
      {photos.length > 1 && (
        <>
          <button
            onClick={(e) => { e.preventDefault(); prev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 opacity-0 shadow-md transition-opacity group-hover/carousel:opacity-100"
            aria-label="Previous photo"
          >
            <svg className="h-4 w-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            onClick={(e) => { e.preventDefault(); next(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 opacity-0 shadow-md transition-opacity group-hover/carousel:opacity-100"
            aria-label="Next photo"
          >
            <svg className="h-4 w-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.preventDefault(); setIdx(i); }}
                className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-4 bg-white' : 'w-1.5 bg-white/60'}`}
                aria-label={`Photo ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// SVG icons
const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg className={`h-5 w-5 ${filled ? 'text-red-500' : 'text-gray-400'}`} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const XIcon = () => (
  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ShareIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);

export function ListingCard({
  listing,
  proposalId,
  accentColor = '#1e3a5f',
  variant = 'modern',
}: Props) {
  const [liked, setLiked] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const href = `https://pickedfor.com/pickedfor/detail/${listing.slug}`;
  const isUnavailable = listing.availability === 'unavailable';

  // Dismissed overlay
  if (dismissed) {
    return (
      <div className="relative flex items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 py-16 text-center">
        <div>
          <p className="text-lg font-medium text-gray-400">Removed from your list</p>
          <p className="mt-1 text-sm text-gray-400">{listing.title}</p>
          <button
            onClick={() => setDismissed(false)}
            className="mt-3 rounded-lg border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-white"
          >
            Undo
          </button>
        </div>
      </div>
    );
  }

  // Action buttons (like / dislike / share)
  const ActionButtons = ({ light }: { light?: boolean }) => (
    <div className="flex items-center gap-1">
      <button onClick={(e) => { e.preventDefault(); setLiked(!liked); }} className={`rounded-full p-1.5 transition-colors ${light ? 'hover:bg-white/20' : 'hover:bg-gray-100'}`} aria-label="Like">
        <HeartIcon filled={liked} />
      </button>
      <button onClick={(e) => { e.preventDefault(); setDismissed(true); }} className={`rounded-full p-1.5 transition-colors ${light ? 'hover:bg-white/20' : 'hover:bg-gray-100'}`} aria-label="Remove">
        <XIcon />
      </button>
      <button onClick={(e) => { e.preventDefault(); }} className={`rounded-full p-1.5 transition-colors ${light ? 'hover:bg-white/20 text-white/70' : 'hover:bg-gray-100 text-gray-400'}`} aria-label="Share">
        <ShareIcon />
      </button>
    </div>
  );

  // CTAs based on availability
  const CTAButtons = ({ outline, filled }: { outline: string; filled: string }) => {
    if (isUnavailable) {
      return (
        <a href="https://pickedfor.com/contact" className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 ${filled}`} style={{ backgroundColor: accentColor }}>
          Find Similar
        </a>
      );
    }
    return (
      <div className="flex gap-2">
        <Link href={href} className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-gray-50 ${outline}`} style={{ borderColor: accentColor, color: accentColor }}>
          View Details
        </Link>
        <a href="https://pickedfor.com/contact" className="rounded-lg px-3 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90" style={{ backgroundColor: accentColor }}>
          Book Now
        </a>
      </div>
    );
  };

  // ─── DOCUMENT VARIANT ───
  if (variant === 'document') {
    return (
      <div className={`overflow-hidden rounded border border-gray-300 bg-white ${isUnavailable ? 'opacity-60' : ''}`}>
        <div className="flex flex-col sm:flex-row">
          <div className="relative h-48 flex-shrink-0 sm:h-auto sm:w-56">
            <PhotoCarousel photos={listing.photos} alt={listing.title} className="h-full" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">{typeBadge[listing.type]}</span>
                <h3 className={`font-serif text-lg font-bold text-gray-900 ${isUnavailable ? 'line-through decoration-red-400' : ''}`}>{listing.title}</h3>
              </div>
              <ActionButtons />
            </div>
            {listing.location && <p className="mt-1 text-sm text-gray-500">{listing.location}</p>}
            <div className="mt-1.5 flex items-center gap-3">
              <AvailabilityBadge status={listing.availability} />
              <StarRating rating={listing.rating} reviewCount={listing.reviewCount} />
            </div>
            <p className="mt-2 line-clamp-2 text-sm text-gray-600">{listing.description}</p>
            <table className="mt-3 w-full text-sm">
              <tbody>
                {listing.features.slice(0, 4).map((f) => (
                  <tr key={f.label} className="border-b border-gray-100">
                    <td className="py-1 pr-3 font-medium text-gray-600">{f.label}</td>
                    <td className="py-1 text-gray-800">{f.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-auto flex items-center justify-between pt-4">
              <p className={`text-xl font-bold ${isUnavailable ? 'text-gray-400 line-through' : ''}`} style={isUnavailable ? {} : { color: accentColor }}>
                {listing.price} <span className="text-sm font-normal text-gray-500">{listing.priceNote}</span>
              </p>
              <CTAButtons outline="" filled="" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── MAGAZINE VARIANT ───
  if (variant === 'magazine') {
    return (
      <div className={`group relative overflow-hidden rounded-xl ${isUnavailable ? 'opacity-50' : ''}`}>
        <div className="relative h-72 sm:h-80">
          <PhotoCarousel photos={listing.photos} alt={listing.title} className="h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-800">{typeBadge[listing.type]}</span>
            <AvailabilityBadge status={listing.availability} />
          </div>
          <div className="absolute right-4 top-4">
            <ActionButtons light />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-2xl font-bold leading-tight">{listing.title}</h3>
            {listing.location && <p className="mt-1 text-sm text-white/80">{listing.location}</p>}
            <div className="mt-1 flex items-center gap-2">
              <StarRating rating={listing.rating} reviewCount={listing.reviewCount} />
            </div>
            <p className="mt-2 line-clamp-2 text-sm text-white/70">{listing.description}</p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm text-white/90">
              {listing.features.slice(0, 3).map((f) => (
                <span key={f.label}>
                  <span className="font-semibold">{f.value}</span>{' '}
                  <span className="text-white/70">{f.label}</span>
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className={`text-2xl font-bold ${isUnavailable ? 'line-through text-white/50' : ''}`}>
                {listing.price} <span className="text-sm font-normal text-white/70">{listing.priceNote}</span>
              </p>
              {isUnavailable ? (
                <a href="https://pickedfor.com/contact" className="rounded-full px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90" style={{ backgroundColor: accentColor }}>Find Similar</a>
              ) : (
                <div className="flex gap-2">
                  <Link href={href} className="rounded-full border border-white/60 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20">View Details</Link>
                  <a href="https://pickedfor.com/contact" className="rounded-full px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90" style={{ backgroundColor: accentColor }}>Book Now</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── MODERN (default) ───
  return (
    <div className={`overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md ${isUnavailable ? 'opacity-60' : ''}`}>
      <div className="relative h-52">
        <PhotoCarousel photos={listing.photos} alt={listing.title} className="h-full" />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-700 shadow-sm">{typeBadge[listing.type]}</span>
          <AvailabilityBadge status={listing.availability} />
        </div>
        <div className="absolute right-3 top-3">
          <ActionButtons />
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className={`text-lg font-semibold text-gray-900 ${isUnavailable ? 'line-through decoration-red-400' : ''}`}>{listing.title}</h3>
          <StarRating rating={listing.rating} reviewCount={listing.reviewCount} />
        </div>
        {listing.location && <p className="mt-0.5 text-sm text-gray-500">{listing.location}</p>}
        <p className="mt-2 line-clamp-2 text-sm text-gray-600">{listing.description}</p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
          {listing.features.slice(0, 4).map((f) => (
            <span key={f.label}>
              <span className="font-medium">{f.label}:</span> {f.value}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
          <p className={`text-xl font-bold ${isUnavailable ? 'text-gray-400 line-through' : ''}`} style={isUnavailable ? {} : { color: accentColor }}>
            {listing.price} <span className="text-sm font-normal text-gray-500">{listing.priceNote}</span>
          </p>
          <CTAButtons outline="" filled="" />
        </div>
      </div>
    </div>
  );
}
