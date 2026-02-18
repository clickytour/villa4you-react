'use client';

import { Partner } from '@/data/mock-proposals';

interface Props {
  partner: Partner;
  branded: boolean;
}

export function ProposalFooter({ partner, branded }: Props) {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white py-8">
      <div className="mx-auto max-w-6xl px-6 text-center text-sm text-gray-500">
        {branded ? (
          <>
            <p className="font-medium text-gray-700">{partner.name}</p>
            <p className="mt-1">
              {partner.email} · {partner.phone}
            </p>
            {partner.website && (
              <p className="mt-1">
                <a
                  href={partner.website}
                  className="underline hover:text-gray-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {partner.website.replace(/^https?:\/\//, '')}
                </a>
              </p>
            )}
          </>
        ) : (
          <p>This proposal was created for you by a travel specialist.</p>
        )}
        <p className="mt-4 text-xs text-gray-400">
          © {new Date().getFullYear()} · Powered by PickedFor
        </p>
      </div>
    </footer>
  );
}
