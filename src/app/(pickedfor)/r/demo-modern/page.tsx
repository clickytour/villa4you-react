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

export default async function DemoModern({
  searchParams,
}: {
  searchParams: Promise<{ branded?: string; mode?: 'brand' | 'nologo' }>;
}) {
  const params = await searchParams;
  const branded = params.branded === 'true' || (params.branded == null && params.mode === 'brand');
  const { partner, listings, criteria } = sampleProposal;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <ProposalHeader partner={partner} branded={branded} />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Here&apos;s what we picked for you
          </h1>
          {branded && (
            <p className="mt-2 text-lg text-gray-500">
              Curated by{' '}
              <span className="font-semibold" style={{ color: partner.accentColor }}>
                {partner.name}
              </span>
            </p>
          )}
        </div>
        <CriteriaBanner criteria={criteria} variant="modern" />
        <UpdateBanner variant="modern" />
        <ListingSummary listings={listings} variant="modern" />
        <GroupedListings
          listings={listings}
          proposalId="demo-modern"
          accentColor={branded ? partner.accentColor : undefined}
          variant="modern"
        />
      </div>
      <ProposalFooter partner={partner} branded={branded} />
      <StickyBottomCTA partner={partner} branded={branded} accentColor={branded ? partner.accentColor : '#1e3a5f'} />
    </div>
  );
}
