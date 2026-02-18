import Link from 'next/link';
import { getListingBySlug, samplePartner } from '@/data/mock-proposals';
import { ProposalHeader } from '@/components/pickedfor/ProposalHeader';
import { ProposalFooter } from '@/components/pickedfor/ProposalFooter';
import { notFound } from 'next/navigation';

export default async function ListingDetail({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; 'listing-slug': string }>;
  searchParams: Promise<{ branded?: string }>;
}) {
  const { id, 'listing-slug': slug } = await params;
  const sp = await searchParams;
  const branded = sp.branded === 'true';
  const listing = getListingBySlug(slug);
  if (!listing) notFound();

  const partner = samplePartner;
  const accent = branded ? partner.accentColor : '#1e3a5f';

  return (
    <div className="min-h-screen bg-gray-50">
      <ProposalHeader partner={partner} branded={branded} />

      <div className="mx-auto max-w-5xl px-6 py-8">
        {/* Back */}
        <Link
          href={`/r/${id}`}
          className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to proposal
        </Link>

        {/* Photo Gallery */}
        <div className="grid gap-2 sm:grid-cols-3">
          {listing.photos.map((src, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-xl ${i === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}`}
            >
              <img
                src={src}
                alt={`${listing.title} ${i + 1}`}
                className="h-full w-full object-cover"
                style={{ minHeight: i === 0 ? '400px' : '196px' }}
              />
            </div>
          ))}
        </div>

        {/* Title + Price */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-600">
              {listing.type}
            </span>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              {listing.title}
            </h1>
            {listing.location && (
              <p className="mt-1 text-gray-500">{listing.location}</p>
            )}
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold" style={{ color: accent }}>
              {listing.price}
            </p>
            {listing.priceNote && (
              <p className="text-sm text-gray-500">{listing.priceNote}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Description</h2>
          <p className="mt-3 leading-relaxed text-gray-600">
            {listing.description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Details</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {listing.features.map((f) => (
              <div
                key={f.label}
                className="rounded-lg border border-gray-200 bg-white p-4"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  {f.label}
                </p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {f.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Location</h2>
          <div className="mt-4 flex h-64 items-center justify-center rounded-xl bg-gray-200 text-gray-400">
            Map placeholder — {listing.location}
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="#inquire"
            className="flex-1 rounded-xl py-4 text-center text-lg font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: accent }}
          >
            Inquire Now
          </a>
          <a
            href="#book"
            className="flex-1 rounded-xl border-2 py-4 text-center text-lg font-semibold transition-colors hover:bg-gray-50"
            style={{ borderColor: accent, color: accent }}
          >
            Book This
          </a>
        </div>
      </div>

      <ProposalFooter partner={partner} branded={branded} />
    </div>
  );
}
