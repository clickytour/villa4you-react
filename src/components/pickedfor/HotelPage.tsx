'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ListingDetail, HotelRoom } from '@/lib/detailMockData';
import { MediaIcons } from './templates/shared';

interface Props {
  hotel: ListingDetail;
  isBrand: boolean;
  backUrl?: string;
  proposalId?: string;
}

function RoomCard({ room, isBrand, hotelSlug, proposalId }: { room: HotelRoom; isBrand: boolean; hotelSlug: string; proposalId?: string }) {
  const displayName = isBrand ? room.name : `Room Option`;
  const detailUrl = proposalId
    ? `https://pickedfor.com/pickedfor/detail/${room.slug}?from=${proposalId}&mode=${isBrand ? 'brand' : 'nologo'}`
    : `https://pickedfor.com/pickedfor/detail/${room.slug}?mode=${isBrand ? 'brand' : 'nologo'}`;

  return (
    <div className={`overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md ${!room.available ? 'opacity-50' : ''}`}>
      <div className="flex flex-col sm:flex-row">
        <div className="h-40 flex-shrink-0 sm:h-auto sm:w-48">
          <img src={room.image} alt={displayName} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{displayName}</h3>
              <p className="text-sm text-gray-500">{room.sqm} m² · {room.beds}</p>
            </div>
            {!room.available && (
              <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700">Sold Out</span>
            )}
            {room.available && (
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">Available</span>
            )}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {room.features.map((f) => (
              <span key={f} className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600">{f}</span>
            ))}
          </div>
          <div className="mt-auto flex items-center justify-between pt-4">
            <div>
              <p className="text-sm text-gray-500">from</p>
              <p className="text-xl font-bold text-blue-700">€{room.pricePerNight}<span className="text-sm font-normal text-gray-500">/night</span></p>
            </div>
            {room.available ? (
              <div className="flex gap-2">
                <Link href={detailUrl} className="rounded-lg border border-blue-600 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50">
                  View Room
                </Link>
                <a href="https://pickedfor.com" className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:opacity-90">
                  Book
                </a>
              </div>
            ) : (
              <span className="text-sm text-gray-400">Not available for your dates</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HotelPage({ hotel, isBrand, backUrl, proposalId }: Props) {
  const [liked, setLiked] = useState(false);
  const displayName = isBrand ? hotel.name : 'Hotel Option';

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
        {backUrl && (
          <Link href={backUrl} className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            ← Back to proposal
          </Link>
        )}

        {/* Hero image */}
        <div className="overflow-hidden rounded-xl">
          <img src={hotel.images[0]} alt={displayName} className="h-[350px] w-full object-cover" />
        </div>

        {/* Title */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-600">Hotel</span>
              {hotel.hotelStars && <span className="text-amber-500">{'★'.repeat(hotel.hotelStars)}</span>}
              {hotel.rating && (
                <span className="flex items-center gap-1 text-sm">
                  <svg className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  <span className="font-semibold">{hotel.rating}</span>
                  <span className="text-gray-400">({hotel.reviewCount})</span>
                </span>
              )}
            </div>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">{displayName}</h1>
            <p className="mt-1 text-gray-500">{hotel.region}</p>
            {isBrand && hotel.address && <p className="text-sm text-gray-400">{hotel.address}</p>}
          </div>
          <button onClick={() => setLiked(!liked)} className="rounded-full p-2 hover:bg-gray-100">
            <svg className={`h-6 w-6 ${liked ? 'text-red-500' : 'text-gray-400'}`} fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
          </button>
        </div>

        {/* Video / 3D */}
        {(hotel.videoUrl || hotel.tour3dUrl) && (
          <div className="mt-4">
            <MediaIcons videoUrl={hotel.videoUrl} videoUrlGeneric={hotel.videoUrlGeneric} tour3dUrl={hotel.tour3dUrl} tour3dUrlGeneric={hotel.tour3dUrlGeneric} isBrand={isBrand} />
          </div>
        )}

        {/* Description */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">About the Hotel</h2>
          <div className="mt-3 whitespace-pre-line leading-relaxed text-gray-600">
            {isBrand ? (hotel.longDescription || hotel.description) : hotel.description}
          </div>
        </div>

        {/* Key features */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Hotel Details</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {hotel.features.map((f) => (
              <div key={f.label} className="rounded-lg border border-gray-200 bg-white p-3 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">{f.label}</p>
                <p className="mt-1 font-semibold text-gray-900">{f.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Facilities */}
        {hotel.facilities && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900">Facilities</h2>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {hotel.facilities.map((f) => (
                <div key={f} className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm text-gray-700 border border-gray-100">
                  <span className="text-blue-500">●</span> {f}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ROOMS */}
        {hotel.rooms && hotel.rooms.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900">Available Rooms</h2>
            <p className="mt-1 text-sm text-gray-500">{hotel.rooms.filter(r => r.available).length} of {hotel.rooms.length} room types available for your dates</p>
            <div className="mt-6 space-y-4">
              {hotel.rooms.map((room) => (
                <RoomCard key={room.id} room={room} isBrand={isBrand} hotelSlug={hotel.slug} proposalId={proposalId} />
              ))}
            </div>
          </div>
        )}

        {/* Map */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Location</h2>
          <div className="mt-4 flex h-64 items-center justify-center rounded-xl bg-gray-200 text-gray-400">
            📍 Map — {hotel.region}
          </div>
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
