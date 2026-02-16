import type { Metadata } from "next";
import { ReservationsSections } from "@/components/ReservationsSections";

export const metadata: Metadata = {
  title: "My Reservations | Villa4You",
  description: "Reservation workspace for Villa4You guests.",
};

export default async function MyReservationsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const query = new URLSearchParams(
    Object.entries(params).flatMap(([k, v]) =>
      Array.isArray(v) ? v.map((x) => [k, x]) : v ? [[k, v]] : []
    ) as [string, string][]
  ).toString();

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <ReservationsSections query={query} />
    </div>
  );
}
