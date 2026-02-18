'use client';

import { Partner } from '@/data/mock-proposals';

interface Props {
  partner: Partner;
  branded: boolean;
}

export function ProposalHeader({ partner, branded }: Props) {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {branded && partner.logo ? (
          <img
            src={partner.logo}
            alt={partner.name}
            className="h-10 object-contain"
          />
        ) : (
          <span className="text-lg font-light tracking-wide text-gray-400">
            Curated Proposal
          </span>
        )}
        {branded && (
          <a
            href={`mailto:${partner.email}`}
            className="rounded-full px-4 py-2 text-sm font-medium text-white transition-colors"
            style={{ backgroundColor: partner.accentColor }}
          >
            Contact Us
          </a>
        )}
      </div>
    </header>
  );
}
