'use client';

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
};

export function ListingCard({
  listing,
  proposalId,
  accentColor = '#1e3a5f',
  variant = 'modern',
}: Props) {
  const href = `/r/${proposalId}/${listing.slug}`;

  if (variant === 'document') {
    return (
      <div className="overflow-hidden rounded border border-gray-300 bg-white">
        <div className="flex flex-col sm:flex-row">
          <div className="relative h-48 sm:h-auto sm:w-56 flex-shrink-0">
            <img
              src={listing.photos[0]}
              alt={listing.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
              {typeBadge[listing.type]}
            </span>
            <h3 className="font-serif text-lg font-bold text-gray-900">
              {listing.title}
            </h3>
            {listing.location && (
              <p className="mt-1 text-sm text-gray-500">{listing.location}</p>
            )}
            <table className="mt-3 w-full text-sm">
              <tbody>
                {listing.features.slice(0, 4).map((f) => (
                  <tr key={f.label} className="border-b border-gray-100">
                    <td className="py-1 pr-3 font-medium text-gray-600">
                      {f.label}
                    </td>
                    <td className="py-1 text-gray-800">{f.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-auto flex items-center justify-between pt-4">
              <p className="text-xl font-bold" style={{ color: accentColor }}>
                {listing.price}{' '}
                <span className="text-sm font-normal text-gray-500">
                  {listing.priceNote}
                </span>
              </p>
              <div className="flex gap-2">
                <Link
                  href={href}
                  className="rounded border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-gray-50"
                  style={{ borderColor: accentColor, color: accentColor }}
                >
                  View Details
                </Link>
                <a
                  href="#inquire"
                  className="rounded px-3 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: accentColor }}
                >
                  Inquire
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'magazine') {
    return (
      <div className="group relative overflow-hidden rounded-xl">
        <div className="relative h-72 sm:h-80">
          <img
            src={listing.photos[0]}
            alt={listing.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute left-4 top-4">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-800">
              {typeBadge[listing.type]}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-2xl font-bold leading-tight">
              {listing.title}
            </h3>
            {listing.location && (
              <p className="mt-1 text-sm text-white/80">{listing.location}</p>
            )}
            <div className="mt-3 flex flex-wrap gap-3 text-sm text-white/90">
              {listing.features.slice(0, 3).map((f) => (
                <span key={f.label}>
                  <span className="font-semibold">{f.value}</span>{' '}
                  <span className="text-white/70">{f.label}</span>
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-2xl font-bold">
                {listing.price}{' '}
                <span className="text-sm font-normal text-white/70">
                  {listing.priceNote}
                </span>
              </p>
              <div className="flex gap-2">
                <Link
                  href={href}
                  className="rounded-full border border-white/60 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  View Details
                </Link>
                <a
                  href="#inquire"
                  className="rounded-full px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: accentColor }}
                >
                  Inquire
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Modern (default)
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-52">
        <img
          src={listing.photos[0]}
          alt={listing.title}
          className="h-full w-full object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-700 shadow-sm">
          {typeBadge[listing.type]}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900">{listing.title}</h3>
        {listing.location && (
          <p className="mt-0.5 text-sm text-gray-500">{listing.location}</p>
        )}
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
          {listing.features.slice(0, 4).map((f) => (
            <span key={f.label}>
              <span className="font-medium">{f.label}:</span> {f.value}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
          <p className="text-xl font-bold" style={{ color: accentColor }}>
            {listing.price}{' '}
            <span className="text-sm font-normal text-gray-500">
              {listing.priceNote}
            </span>
          </p>
          <div className="flex gap-2">
            <Link
              href={href}
              className="rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-gray-50"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              View Details
            </Link>
            <a
              href="#inquire"
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: accentColor }}
            >
              Inquire
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
