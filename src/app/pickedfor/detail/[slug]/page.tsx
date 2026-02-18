'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { getDetailBySlug } from '@/lib/detailMockData';
import { DetailPage } from '@/components/pickedfor/DetailPage';
import { HotelPage } from '@/components/pickedfor/HotelPage';

function DetailContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const mode = searchParams.get('mode') ?? 'brand';
  const from = searchParams.get('from');
  const isBrand = mode === 'brand';

  const listing = getDetailBySlug(slug);

  if (!listing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-400">404</h1>
          <p className="mt-2 text-gray-500">Listing not found</p>
          <a href="https://pickedfor.com/proposal" className="mt-4 inline-block text-sm text-blue-600 hover:underline">← Back to proposals</a>
        </div>
      </div>
    );
  }

  const backUrl = from ? `https://pickedfor.com/proposal/${from}` : 'https://pickedfor.com/proposal';

  if (listing.type === 'hotel') {
    return <HotelPage hotel={listing} isBrand={isBrand} backUrl={backUrl} proposalId={from ?? undefined} />;
  }

  return <DetailPage listing={listing} isBrand={isBrand} backUrl={backUrl} />;
}

export default function DetailRoute() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading…</div>}>
      <DetailContent />
    </Suspense>
  );
}
