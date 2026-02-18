import type { Metadata } from "next";
import { sampleProposal } from '@/data/mock-proposals';
import { ProposalHeader } from '@/components/pickedfor/ProposalHeader';
import { ProposalFooter } from '@/components/pickedfor/ProposalFooter';
import {
  CriteriaBanner,
  UpdateBanner,
  ListingSummary,
  GroupedListings,
  StickyBottomCTA,
} from '@/components/pickedfor/ProposalContent';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DemoDocument({
  searchParams,
}: {
  searchParams: Promise<{ branded?: string; mode?: 'brand' | 'nologo' }>;
}) {
  const params = await searchParams;
  const branded = params.branded === 'true' || (params.branded == null && params.mode === 'brand');
  const { partner, listings, criteria } = sampleProposal;

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-20">
      <ProposalHeader partner={partner} branded={branded} />
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-6 border-b-2 border-gray-300 pb-6 text-center">
          <h1 className="font-serif text-3xl font-bold text-gray-900">Travel Proposal</h1>
          <p className="mt-2 font-serif text-lg italic text-gray-600">
            Here&apos;s what we picked for you
          </p>
          {branded && (
            <p className="mt-1 text-sm text-gray-500">
              Prepared by <span className="font-semibold">{partner.name}</span>
            </p>
          )}
          <p className="mt-2 text-xs text-gray-400">
            Issued{' '}
            {new Date(sampleProposal.createdAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
        <CriteriaBanner criteria={criteria} variant="document" />
        <UpdateBanner variant="document" />
        <ListingSummary listings={listings} variant="document" />
        <GroupedListings
          listings={listings}
          proposalId="demo-document"
          accentColor={branded ? partner.accentColor : '#4a5568'}
          variant="document"
        />
      </div>
      <ProposalFooter partner={partner} branded={branded} />
      <StickyBottomCTA partner={partner} branded={branded} accentColor={branded ? partner.accentColor : '#4a5568'} />
    </div>
  );
}
