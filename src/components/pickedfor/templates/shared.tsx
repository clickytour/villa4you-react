'use client';

import { useRef, useState, type TouchEvent } from 'react';
import { ProposalItem } from '@/lib/proposalMockData';

const PICKEDFOR_BASE_URL = 'https://pickedfor.com';

export function toPickedForUrl(pathOrUrl: string) {
  if (!pathOrUrl) return PICKEDFOR_BASE_URL;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  if (pathOrUrl.startsWith('/pickedfor/detail/')) return `${PICKEDFOR_BASE_URL}${pathOrUrl}`;
  const slug = pathOrUrl.split('/').filter(Boolean).pop();
  return slug ? `${PICKEDFOR_BASE_URL}/pickedfor/detail/${slug}` : PICKEDFOR_BASE_URL;
}

// ─── Availability Badge ───
export function AvailabilityBadge({ status }: { status?: ProposalItem['availability'] }) {
  if (!status || status === 'available') {
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

// ─── Star Rating ───
export function StarRating({ rating, reviewCount }: { rating?: number; reviewCount?: number }) {
  if (!rating) return null;
  return (
    <span className="inline-flex items-center gap-1 text-sm">
      <svg className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <span className="font-semibold">{rating}</span>
      {reviewCount != null && <span className="text-gray-400">({reviewCount})</span>}
    </span>
  );
}

// ─── Photo Carousel ───
export function PhotoCarousel({ images, alt, className, overlay }: { images: string[]; alt: string; className?: string; overlay?: boolean }) {
  const [idx, setIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const photos = images.length > 0 ? images : [''];
  const prev = () => setIdx((i) => (i === 0 ? photos.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === photos.length - 1 ? 0 : i + 1));

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current == null) return;
    const endX = e.changedTouches[0]?.clientX;
    if (typeof endX !== 'number') return;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(delta) < 30) return;
    if (delta > 0) prev();
    else next();
  };

  return (
    <div
      className={`group/carousel relative overflow-hidden touch-pan-y ${className ?? ''}`}
      onTouchStart={photos.length > 1 ? onTouchStart : undefined}
      onTouchEnd={photos.length > 1 ? onTouchEnd : undefined}
    >
      <img src={photos[idx]} alt={alt} className="h-full w-full object-cover transition-opacity duration-300" />
      {overlay && <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-t from-black/85 via-black/40 to-black/5" />}
      {photos.length > 1 && (
        <>
          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); prev(); }} className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-1.5 opacity-100 shadow-md transition-opacity sm:opacity-0 sm:group-hover/carousel:opacity-100" aria-label="Previous">
            <svg className="h-4 w-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); next(); }} className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-1.5 opacity-100 shadow-md transition-opacity sm:opacity-0 sm:group-hover/carousel:opacity-100" aria-label="Next">
            <svg className="h-4 w-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
          <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
            {photos.map((_, i) => (
              <button key={i} onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIdx(i); }} className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-4 bg-white' : 'w-1.5 bg-white/60'}`} aria-label={`Photo ${i + 1}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Like / Dislike / Share ───
export function ActionButtons({ light }: { light?: boolean }) {
  const [liked, setLiked] = useState(false);
  const base = light ? 'hover:bg-white/20' : 'hover:bg-gray-100';
  return (
    <div className="flex items-center gap-0.5">
      <button onClick={(e) => { e.preventDefault(); setLiked(!liked); }} className={`rounded-full p-1.5 transition-colors ${base} ${liked ? 'text-red-500' : light ? 'text-white/60' : 'text-gray-400'}`} aria-label="Like">
        <svg className="h-5 w-5" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
      </button>
      <button onClick={(e) => { e.preventDefault(); }} className={`rounded-full p-1.5 transition-colors ${base} ${light ? 'text-white/60' : 'text-gray-400'}`} aria-label="Dismiss">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
      <button onClick={(e) => { e.preventDefault(); }} className={`rounded-full p-1.5 transition-colors ${base} ${light ? 'text-white/60' : 'text-gray-400'}`} aria-label="Share">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
      </button>
    </div>
  );
}

// ─── Listing Summary ───
export function ListingSummary({ items, dark }: { items: ProposalItem[]; dark?: boolean }) {
  const available = items.filter((l) => !l.availability || l.availability === 'available').length;
  const unavailable = items.filter((l) => l.availability === 'unavailable').length;
  const newMatch = items.filter((l) => l.availability === 'new-match').length;
  if (unavailable === 0 && newMatch === 0) return null;

  return (
    <p className={`text-center text-sm ${dark ? 'text-white/50' : 'text-gray-400'}`}>
      {items.length} options
      <span className={`mx-1.5 ${dark ? 'text-white/20' : 'text-gray-300'}`}>·</span>
      <span className="text-emerald-600">{available} available</span>
      {unavailable > 0 && (
        <>
          <span className={`mx-1.5 ${dark ? 'text-white/20' : 'text-gray-300'}`}>·</span>
          <span className="text-red-500">{unavailable} no longer available</span>
        </>
      )}
      {newMatch > 0 && (
        <>
          <span className={`mx-1.5 ${dark ? 'text-white/20' : 'text-gray-300'}`}>·</span>
          <span className="text-blue-500">{newMatch} new match</span>
        </>
      )}
    </p>
  );
}

// ─── Media Icons (Video + 3D Tour) ───
export function MediaIcons({ videoUrl, videoUrlGeneric, tour3dUrl, tour3dUrlGeneric, isBrand, light }: { videoUrl?: string; videoUrlGeneric?: string; tour3dUrl?: string; tour3dUrlGeneric?: string; isBrand?: boolean; light?: boolean }) {
  const video = isBrand ? videoUrl : (videoUrlGeneric ?? videoUrl);
  const tour = isBrand ? tour3dUrl : (tour3dUrlGeneric ?? tour3dUrl);
  if (!video && !tour) return null;
  const base = light
    ? 'bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm'
    : 'bg-gray-100 text-gray-600 hover:bg-gray-200';
  return (
    <div className="flex gap-1.5">
      {video && (
        <a href={video} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${base}`} title="Watch Video">
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          Video
        </a>
      )}
      {tour && (
        <a href={tour} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${base}`} title="3D Virtual Tour">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>
          3D Tour
        </a>
      )}
    </div>
  );
}

// ─── Group items by availability ───
export function groupItems(items: ProposalItem[]) {
  const available = items.filter((i) => !i.availability || i.availability === 'available');
  const unavailable = items.filter((i) => i.availability === 'unavailable');
  const newMatches = items.filter((i) => i.availability === 'new-match');
  return { available, unavailable, newMatches };
}
