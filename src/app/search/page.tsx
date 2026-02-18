import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchHub } from "@/components/SearchHub";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://staging.villa4you.gr";

export const metadata: Metadata = {
  title: "Search Hub | Villa4You",
  description: "Discover vacation rentals, real estate, services, hotels and travel guides — all in one universal search hub.",
  alternates: {
    canonical: `${baseUrl}/search`,
  },
};

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>}>
        <SearchHub />
      </Suspense>
    </div>
  );
}
