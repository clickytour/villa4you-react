import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Curated Proposal — PickedFor',
  description: 'Handpicked listings curated just for you.',
};

export default function PickedForLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
