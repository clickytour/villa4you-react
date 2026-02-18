import { sampleProposal } from '@/data/mock-proposals';
import { ProposalHeader } from '@/components/pickedfor/ProposalHeader';
import { ProposalFooter } from '@/components/pickedfor/ProposalFooter';
import { ListingCard } from '@/components/pickedfor/ListingCard';

export default async function DemoMagazine({
  searchParams,
}: {
  searchParams: Promise<{ branded?: string }>;
}) {
  const params = await searchParams;
  const branded = params.branded === 'true';
  const { partner, listings } = sampleProposal;

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="w-full border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          {branded && partner.logo ? (
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-10 object-contain brightness-0 invert"
            />
          ) : (
            <span className="text-lg font-light uppercase tracking-[0.3em] text-white/50">
              Curated
            </span>
          )}
          {branded && (
            <a
              href={`mailto:${partner.email}`}
              className="rounded-full border border-white/30 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Get in Touch
            </a>
          )}
        </div>
      </header>

      {/* Hero */}
      <div className="relative flex h-[40vh] items-center justify-center overflow-hidden">
        <img
          src={listings[0].photos[0]}
          alt="Hero"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="relative z-10 text-center">
          <p className="text-sm font-light uppercase tracking-[0.4em] text-white/60">
            Your exclusive selection
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Here&apos;s what we picked for you
          </h1>
          {branded && (
            <p className="mt-3 text-lg text-white/70">
              Curated by{' '}
              <span style={{ color: partner.secondaryColor }}>
                {partner.name}
              </span>
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              proposalId="demo-magazine"
              accentColor={
                branded ? partner.secondaryColor : '#e2b857'
              }
              variant="magazine"
            />
          ))}
        </div>
      </div>

      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-white/40">
          {branded ? (
            <>
              <p className="font-medium text-white/60">{partner.name}</p>
              <p className="mt-1">
                {partner.email} · {partner.phone}
              </p>
            </>
          ) : (
            <p>This proposal was created for you by a travel specialist.</p>
          )}
          <p className="mt-4 text-xs text-white/20">
            © {new Date().getFullYear()} · Powered by PickedFor
          </p>
        </div>
      </footer>
    </div>
  );
}
