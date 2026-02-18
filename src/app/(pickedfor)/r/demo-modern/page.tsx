import { sampleProposal } from '@/data/mock-proposals';
import { ProposalHeader } from '@/components/pickedfor/ProposalHeader';
import { ProposalFooter } from '@/components/pickedfor/ProposalFooter';
import { ListingCard } from '@/components/pickedfor/ListingCard';

export default async function DemoModern({
  searchParams,
}: {
  searchParams: Promise<{ branded?: string }>;
}) {
  const params = await searchParams;
  const branded = params.branded === 'true';
  const { partner, listings } = sampleProposal;

  return (
    <div className="min-h-screen bg-gray-50">
      <ProposalHeader partner={partner} branded={branded} />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Here&apos;s what we picked for you
          </h1>
          {branded && (
            <p className="mt-2 text-lg text-gray-500">
              Curated by{' '}
              <span
                className="font-semibold"
                style={{ color: partner.accentColor }}
              >
                {partner.name}
              </span>
            </p>
          )}
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              proposalId="demo-modern"
              accentColor={branded ? partner.accentColor : undefined}
              variant="modern"
            />
          ))}
        </div>
      </div>
      <ProposalFooter partner={partner} branded={branded} />
    </div>
  );
}
