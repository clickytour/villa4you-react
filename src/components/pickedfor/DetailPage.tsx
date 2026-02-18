'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ListingDetail } from '@/lib/detailMockData';
import { MediaIcons } from './templates/shared';

interface Props {
  listing: ListingDetail;
  isBrand: boolean;
  backUrl?: string;
  backLabel?: string;
}

function PhotoGallery({ images, name }: { images: string[]; name: string }) {
  const [main, setMain] = useState(0);
  return (
    <div>
      <div className="overflow-hidden rounded-xl">
        <img src={images[main]} alt={name} className="h-[400px] w-full object-cover sm:h-[500px]" />
      </div>
      {images.length > 1 && (
        <div className="mt-2 flex gap-2 overflow-x-auto">
          {images.map((src, i) => (
            <button key={i} onClick={() => setMain(i)} className={`flex-shrink-0 overflow-hidden rounded-lg ring-2 transition-all ${i === main ? 'ring-blue-500' : 'ring-transparent hover:ring-gray-300'}`}>
              <img src={src} alt={`${name} ${i + 1}`} className="h-20 w-28 object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function DetailPage({ listing, isBrand, backUrl, backLabel }: Props) {
  const [liked, setLiked] = useState(false);
  const displayName = isBrand ? listing.name : `${listing.listingType} Option`;
  const isRealEstate = listing.type === 'real-estate';
  const isService = listing.type === 'service';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="w-full border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
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

      <div className="mx-auto max-w-5xl px-6 py-8">
        {/* Back link */}
        {backUrl && (
          <Link href={backUrl} className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            ← {backLabel || 'Back to proposal'}
          </Link>
        )}

        {/* Gallery */}
        <PhotoGallery images={listing.images} name={displayName} />

        {/* Title bar */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-600">{listing.listingType}</span>
              {listing.rating && (
                <span className="flex items-center gap-1 text-sm">
                  <svg className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  <span className="font-semibold">{listing.rating}</span>
                  {listing.reviewCount && <span className="text-gray-400">({listing.reviewCount} reviews)</span>}
                </span>
              )}
              {listing.hotelStars && <span className="text-sm text-amber-500">{'★'.repeat(listing.hotelStars)}</span>}
            </div>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">{displayName}</h1>
            <p className="mt-1 text-gray-500">{listing.region}</p>
            {isBrand && listing.address && <p className="text-sm text-gray-400">{listing.address}</p>}
          </div>
          <div className="flex items-start gap-3">
            <div className="text-right">
              {listing.pricePerNight != null && <p className="text-sm text-gray-500">€{listing.pricePerNight}/night</p>}
              {listing.totalPrice != null && <p className="text-3xl font-bold text-blue-700">€{listing.totalPrice.toLocaleString()} <span className="text-sm font-normal text-gray-500">total</span></p>}
              {listing.salePrice != null && <p className="text-3xl font-bold text-blue-700">€{listing.salePrice.toLocaleString()}</p>}
              {listing.servicePrice != null && <p className="text-3xl font-bold text-blue-700">€{listing.servicePrice} <span className="text-sm font-normal text-gray-500">per session</span></p>}
              {listing.nights && <p className="text-xs text-gray-400">{listing.nights} nights</p>}
            </div>
            <button onClick={() => setLiked(!liked)} className="rounded-full p-2 hover:bg-gray-100">
              <svg className={`h-6 w-6 ${liked ? 'text-red-500' : 'text-gray-400'}`} fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
            </button>
          </div>
        </div>

        {/* Video / 3D Tour */}
        {(listing.videoUrl || listing.tour3dUrl) && (
          <div className="mt-4">
            <MediaIcons
              videoUrl={listing.videoUrl} videoUrlGeneric={listing.videoUrlGeneric}
              tour3dUrl={listing.tour3dUrl} tour3dUrlGeneric={listing.tour3dUrlGeneric}
              isBrand={isBrand}
            />
          </div>
        )}

        {/* Description */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">About</h2>
          <div className="mt-3 whitespace-pre-line leading-relaxed text-gray-600">
            {isBrand ? (listing.longDescription || listing.description) : listing.description}
          </div>
        </div>

        {/* Key Features */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Details</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {listing.features.map((f) => (
              <div key={f.label} className="rounded-lg border border-gray-200 bg-white p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">{f.label}</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">{f.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        {listing.amenities && listing.amenities.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900">Amenities</h2>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {listing.amenities.map((a) => (
                <div key={a.name} className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm text-gray-700 border border-gray-100">
                  <span className="text-green-500">✓</span> {a.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Service Includes */}
        {isService && listing.includes && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900">What&apos;s Included</h2>
            <ul className="mt-4 space-y-2">
              {listing.includes.map((item) => (
                <li key={item} className="flex items-center gap-2 text-gray-700">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-xs text-green-600">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Hotel Facilities */}
        {listing.facilities && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900">Hotel Facilities</h2>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {listing.facilities.map((f) => (
                <div key={f} className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm text-gray-700 border border-gray-100">
                  <span className="text-blue-500">●</span> {f}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Map Placeholder */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Location</h2>
          <div className="mt-4 flex h-64 items-center justify-center rounded-xl bg-gray-200 text-gray-400">
            📍 Map — {listing.region}
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          {isRealEstate ? (
            <>
              <a href="https://pickedfor.com/contact" className="flex-1 rounded-xl bg-blue-600 py-4 text-center text-lg font-semibold text-white hover:opacity-90">Request Information</a>
              <a href="https://pickedfor.com/contact" className="flex-1 rounded-xl border-2 border-blue-600 py-4 text-center text-lg font-semibold text-blue-600 hover:bg-blue-50">Schedule Viewing</a>
            </>
          ) : isService ? (
            <>
              <a href="https://pickedfor.com" className="flex-1 rounded-xl bg-blue-600 py-4 text-center text-lg font-semibold text-white hover:opacity-90">Book This Experience</a>
              <a href="https://pickedfor.com/contact" className="flex-1 rounded-xl border-2 border-blue-600 py-4 text-center text-lg font-semibold text-blue-600 hover:bg-blue-50">Ask a Question</a>
            </>
          ) : (
            <>
              <a href="https://pickedfor.com" className="flex-1 rounded-xl bg-blue-600 py-4 text-center text-lg font-semibold text-white hover:opacity-90">Book Now</a>
              <a href="https://pickedfor.com/contact" className="flex-1 rounded-xl border-2 border-blue-600 py-4 text-center text-lg font-semibold text-blue-600 hover:bg-blue-50">Inquire</a>
            </>
          )}
        </div>

        {/* Similar placeholder */}
        <div className="mt-12 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
          <h2 className="text-lg font-semibold text-gray-500">Similar Options</h2>
          <p className="mt-2 text-sm text-gray-400">More options matching your criteria will appear here</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 border-t border-gray-200 bg-white py-8 text-center text-sm text-gray-500">
        {isBrand ? <p className="font-medium text-gray-700">PickedFor</p> : <p>Your travel advisor</p>}
        <p className="mt-2 text-xs text-gray-400">© {new Date().getFullYear()} · Powered by PickedFor</p>
      </footer>
    </div>
  );
}
