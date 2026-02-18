import type { Metadata } from "next";
import { SearchResultsGuestSections } from "@/components/SearchResultsGuestSections";
import type { SearchMode, SearchVertical } from "@/lib/searchSimulation";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://staging.villa4you.gr";

export const metadata: Metadata = {
  title: "Search | Villa4You",
  description: "Unified search across stays, services and blog with mode-aware filtering.",
  alternates: {
    canonical: `${baseUrl}/search`,
  },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : undefined;
  const verticalRaw = typeof params.vertical === "string" ? params.vertical : undefined;
  const modeRaw = typeof params.mode === "string" ? params.mode : undefined;
  const location = typeof params.location === "string" ? params.location : undefined;

  const verticals: SearchVertical[] = ["all", "stays", "services", "blog"];
  const modes: SearchMode[] = ["all", "vacation", "sale", "monthly"];
  const vertical = verticalRaw && verticals.includes(verticalRaw as SearchVertical) ? (verticalRaw as SearchVertical) : undefined;
  const mode = modeRaw && modes.includes(modeRaw as SearchMode) ? (modeRaw as SearchMode) : undefined;

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <SearchResultsGuestSections
        initialQ={q}
        initialVertical={vertical}
        initialMode={mode}
        initialLocation={location}
      />
    </div>
  );
}
