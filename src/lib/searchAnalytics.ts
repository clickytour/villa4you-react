"use client";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

type SearchEventBase = {
  query?: string;
  vertical?: "all" | "stays" | "services" | "blog";
  mode?: "all" | "vacation" | "sale" | "monthly";
  location?: string;
  results_count?: number;
  source_page?: string;
  search_source?: "mirror_simulation" | "core_index";
};

function pushEvent(event: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

export function trackSearchPageView(payload: SearchEventBase & { landing_url?: string }) {
  pushEvent({ event: "search_page_view", search_source: "mirror_simulation", ...payload });
}

export function trackSearchResultClick(
  payload: SearchEventBase & {
    result_id: string;
    result_vertical: string;
    result_mode?: string;
    position: number;
    target_href: string;
  }
) {
  pushEvent({ event: "search_result_click", search_source: "mirror_simulation", ...payload });
}

export function trackSearchHandoffClick(
  payload: SearchEventBase & {
    handoff_surface: string;
    target_url: string;
  }
) {
  pushEvent({ event: "search_handoff_click", search_source: "mirror_simulation", ...payload });
}
