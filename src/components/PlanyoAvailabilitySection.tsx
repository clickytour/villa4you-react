"use client";

import Script from "next/script";
import { useEffect, useMemo, useState } from "react";
import { BOOKING_RECOVERY_CONFIG } from "@/lib/bookingRecoveryConfig";
import {
  addDaysIso,
  buildNearestOptions,
  calculateNights,
  getRequestedNightsIntent,
  toDate,
  toIsoLocal,
  type SuggestedOption,
} from "@/lib/bookingRecoveryEngine";

type SeasonalRate = { label: string; from: string; to: string; nightly: number };
type RelatedPropertyOption = { title: string; href: string; from: number };

function toDisplayDate(iso: string) {
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}-${m}-${y}`;
}

export function PlanyoAvailabilitySection({
  calendarId,
  resourceId,
  actionUrl,
  currency,
  basicFrom,
  seasonalRates,
  unavailableDates,
  propertyTitle,
  minStayNights,
  relatedOptions,
}: {
  calendarId: string;
  resourceId: string;
  actionUrl: string;
  currency: string;
  basicFrom: number;
  seasonalRates: SeasonalRate[];
  unavailableDates: string[];
  propertyTitle?: string;
  minStayNights?: number;
  relatedOptions?: RelatedPropertyOption[];
}) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [requestedCheckIn, setRequestedCheckIn] = useState("");
  const [requestedCheckOut, setRequestedCheckOut] = useState("");
  const [apiStatus, setApiStatus] = useState<"idle" | "ok" | "error">("idle");
  const [availabilityHint, setAvailabilityHint] = useState("");
  const [minStayNotice, setMinStayNotice] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const nightly = useMemo(() => {
    if (!checkIn) return basicFrom;
    const d = toDate(checkIn);
    const season = seasonalRates.find((s) => d >= toDate(s.from) && d <= toDate(s.to));
    return season?.nightly ?? basicFrom;
  }, [checkIn, seasonalRates, basicFrom]);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    return calculateNights(checkIn, checkOut);
  }, [checkIn, checkOut]);

  const minStay = Math.max(1, minStayNights || 1);
  const minCheckoutDate = useMemo(() => {
    if (!checkIn) return "";
    const d = toDate(checkIn);
    d.setDate(d.getDate() + minStay);
    return toIsoLocal(d);
  }, [checkIn, minStay]);

  const unavailableSet = useMemo(() => new Set(unavailableDates), [unavailableDates]);

  const requestedNights = useMemo(
    () => getRequestedNightsIntent(requestedCheckIn, requestedCheckOut, minStay),
    [requestedCheckIn, requestedCheckOut, minStay],
  );

  const blockedNightsSet = useMemo(() => {
    // Same-day checkout/check-in allowed: treat last date of each unavailable block as checkout boundary (allowed start)
    const out = new Set<string>();
    unavailableDates.forEach((d) => {
      const next = addDaysIso(d, 1);
      const isBlockEnd = !unavailableSet.has(next);
      if (!isBlockEnd) out.add(d);
    });
    return out;
  }, [unavailableDates, unavailableSet]);

  const hasUnavailableInRange = useMemo(() => {
    if (!checkIn || !checkOut) return false;
    const start = toDate(checkIn).getTime();
    const end = toDate(checkOut).getTime();
    return [...blockedNightsSet].some((d) => {
      const t = toDate(d).getTime();
      // end date is checkout boundary (exclusive)
      return t >= start && t < end;
    });
  }, [checkIn, checkOut, blockedNightsSet]);

  function normalizeStartDate(iso: string) {
    let candidate = iso;
    let guard = 0;
    while (blockedNightsSet.has(candidate) && guard < 60) {
      candidate = addDaysIso(candidate, 1);
      guard += 1;
    }
    return candidate;
  }

  function getNearestOptions(targetNights: number, limit: number) {
    return buildNearestOptions({
      anchorStart: checkIn,
      targetNights,
      blockedNightsSet,
      maxDaysAround: BOOKING_RECOVERY_CONFIG.SEARCH_WINDOW_DAYS,
      limit,
    });
  }

  const needsManualApproval = hasUnavailableInRange || availabilityHint.toLowerCase().includes("may be unavailable");
  const shouldComputeSuggestions = !!checkIn && !!checkOut && needsManualApproval && showOptions;

  const exactOptions = useMemo(() => {
    if (!shouldComputeSuggestions) return [] as SuggestedOption[];
    return getNearestOptions(requestedNights, BOOKING_RECOVERY_CONFIG.EXACT_OPTIONS_LIMIT);
  }, [shouldComputeSuggestions, checkIn, requestedNights, blockedNightsSet]);

  const shorterTargetNights = useMemo(() => {
    if (requestedNights <= minStay) return null;
    return Math.max(minStay, requestedNights - 1);
  }, [requestedNights, minStay]);

  const shorterOptions = useMemo(() => {
    if (!shouldComputeSuggestions || !shorterTargetNights) return [] as SuggestedOption[];
    return getNearestOptions(shorterTargetNights, BOOKING_RECOVERY_CONFIG.ALT_OPTIONS_LIMIT);
  }, [shouldComputeSuggestions, checkIn, shorterTargetNights, blockedNightsSet]);

  const longerOptions = useMemo(() => {
    if (!shouldComputeSuggestions) return [] as SuggestedOption[];
    return getNearestOptions(requestedNights + 1, BOOKING_RECOVERY_CONFIG.ALT_OPTIONS_LIMIT);
  }, [shouldComputeSuggestions, checkIn, requestedNights, blockedNightsSet]);

  const bestExactShift = exactOptions.length ? exactOptions[0].shiftDays : null;
  const largeShift = (bestExactShift ?? 0) > BOOKING_RECOVERY_CONFIG.LARGE_SHIFT_DAYS;

  const splitStaySuggestions = useMemo(() => {
    if (
      !shouldComputeSuggestions
      || !checkIn
      || !checkOut
      || requestedNights < BOOKING_RECOVERY_CONFIG.LONG_STAY_NIGHTS
    ) return [] as Array<{
      property: RelatedPropertyOption;
      start: string;
      end: string;
      nights: number;
    }>;

    const candidates = (relatedOptions || []).slice(0, BOOKING_RECOVERY_CONFIG.MAX_SPLIT_PROPERTIES);
    if (candidates.length < 2) return [];

    // Selected-property-first split strategy: prioritize 7+5, then 8+5, then 6+6.
    const preferredNearbyGapNights = [5, 4, 3, 6];
    const nearbyNights = preferredNearbyGapNights.find((n) => n > 0 && n < requestedNights) ?? Math.floor(requestedNights / 2);
    const selectedNights = requestedNights - nearbyNights;
    const splitDate = addDaysIso(checkIn, selectedNights);

    return [
      { property: candidates[0], start: checkIn, end: splitDate, nights: selectedNights },
      { property: candidates[1], start: splitDate, end: checkOut, nights: nearbyNights },
    ];
  }, [shouldComputeSuggestions, checkIn, checkOut, requestedNights, relatedOptions]);

  const cleaningFee = 100;
  const subtotal = nights * nightly;
  const total = subtotal + cleaningFee;

  useEffect(() => {
    fetch("/api/planyo/rest?method=api_test")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(() => setApiStatus("ok"))
      .catch(() => setApiStatus("error"));
  }, []);

  useEffect(() => {
    if (!checkIn || !minCheckoutDate) return;

    const normalizedStart = normalizeStartDate(checkIn);
    if (normalizedStart !== checkIn) {
      setCheckIn(normalizedStart);
      setMinStayNotice(`Selected start date was unavailable. Moved to next available date: ${normalizedStart}.`);
      return;
    }

    if (!checkOut || toDate(checkOut).getTime() < toDate(minCheckoutDate).getTime()) {
      setCheckOut(minCheckoutDate);
    }
  }, [checkIn, checkOut, minCheckoutDate]);

  useEffect(() => {
    setShowOptions(false);
    if (!checkIn || !checkOut) {
      setAvailabilityHint("");
      return;
    }

    const url = `/api/planyo/availability?resource_id=${resourceId}&start_date=${encodeURIComponent(checkIn)}&end_date=${encodeURIComponent(checkOut)}`;
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((res) => {
        const txt = JSON.stringify(res?.data || res || "").toLowerCase();
        if (txt.includes("false") || txt.includes("unavailable")) {
          setAvailabilityHint("Planyo check: selected dates may be unavailable.");
        } else {
          setAvailabilityHint("Planyo check: dates look reservable.");
        }
      })
      .catch(() => setAvailabilityHint("Planyo check unavailable right now; fallback using mirror data."));
  }, [checkIn, checkOut, resourceId]);

  return (
    <section className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-3">
      <Script src="https://www.planyo.com/utils.js" strategy="afterInteractive" />
      <Script src="https://www.planyo.com/wrappers.js" strategy="afterInteractive" />
      <Script src="https://www.planyo.com/Plugins/PlanyoFiles/jquery-3.6.4.min.js" strategy="afterInteractive" />
      <Script src="https://www.planyo.com/Plugins/PlanyoFiles/price-preview.js" strategy="afterInteractive" />

      <link rel="stylesheet" href="https://sandbox.planyo.com/Plugins/PlanyoFiles/bootstrap-planyo.min.css" />
      <link rel="stylesheet" href={`https://sandbox.planyo.com/schemes/?calendar=${calendarId}&sel=scheme_css`} />

      <p className="text-xs text-blue-700">Live availability & pricing (Core mirror + Planyo)</p>
      <p className="mt-1 text-[11px] text-slate-600">
        Planyo API status: {apiStatus === "ok" ? "connected" : apiStatus === "error" ? "error" : "checking"}
      </p>
      <p className="mt-0.5 text-[10px] text-slate-400">Build: {process.env.NEXT_PUBLIC_BUILD_MARKER?.slice(0, 7) || "local"}</p>

      <div className="mt-2 rounded-lg border border-blue-200 bg-white p-3">
        <div className="grid gap-2 md:grid-cols-2">
          <label className="text-[11px] text-slate-600">
            Start date *
            <input type="date" value={checkIn} onChange={(e) => {
              const next = e.target.value;
              if (!next) {
                setRequestedCheckIn("");
                setCheckIn("");
                return;
              }
              const normalized = normalizeStartDate(next);
              // Keep intent aligned with the effective visible date (prevents off-by-one drift in recovery suggestions).
              setRequestedCheckIn(normalized);
              setCheckIn(normalized);
              if (normalized !== next) {
                setMinStayNotice(`Selected start date was unavailable. Moved to next available date: ${normalized}.`);
              } else {
                setMinStayNotice("");
              }
            }} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </label>
          <label className="text-[11px] text-slate-600">
            End date *
            <input type="date" value={checkOut} min={minCheckoutDate || undefined} onChange={(e) => {
              const next = e.target.value;
              if (checkIn && minCheckoutDate && next && toDate(next).getTime() < toDate(minCheckoutDate).getTime()) {
                setRequestedCheckOut(minCheckoutDate);
                setCheckOut(minCheckoutDate);
                setMinStayNotice(`Minimum stay is ${minStay} ${minStay === 1 ? "night" : "nights"}. End date was adjusted.`);
              } else {
                setRequestedCheckOut(next);
                setCheckOut(next);
                setMinStayNotice("");
              }
            }} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </label>
        </div>
        <p className="mt-2 text-xs text-slate-600">Minimum stay: {minStay} {minStay === 1 ? "night" : "nights"}.</p>
        <p className="mt-1 text-xs text-slate-500">Consecutive-rental gap: 0 nights (same-day check-out/check-in allowed).</p>

        {checkIn && checkOut && !needsManualApproval ? (
          <div className="mt-3 space-y-2 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">{propertyTitle || "Selected Property"}</p>
            <p>
              {currency} {nightly.toFixed(2)} per night
            </p>
            <p className="text-lg font-semibold text-slate-900">{currency} {subtotal.toFixed(2)}</p>
            <div className="border-t border-slate-200 pt-2">
              <p>Final Cleaning</p>
              <p className="font-medium">{currency} {cleaningFee.toFixed(2)}</p>
            </div>
            <div className="border-t border-slate-200 pt-2">
              <p className="font-semibold text-slate-900">Total</p>
              <p className="text-lg font-semibold text-slate-900">{currency} {total.toFixed(2)}</p>
              {nights > 0 && <p className="text-xs text-slate-600">{nights} {nights === 1 ? "night" : "nights"} total</p>}
            </div>
          </div>
        ) : !checkIn || !checkOut ? (
          <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
            Fill Start date and End date to expand price breakdown.
          </div>
        ) : null}

        {minStayNotice && <p className="mt-2 text-xs text-amber-700">{minStayNotice}</p>}
        {availabilityHint && !needsManualApproval && <p className="mt-1 text-xs text-slate-600">{availabilityHint}</p>}

        {checkIn && checkOut && needsManualApproval ? (
          <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50 p-3">
            <p className="text-base font-semibold text-blue-800">These dates need manual approval. Our operator can confirm exceptions quickly.</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <a
                role="button"
                className="inline-flex rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white whitespace-nowrap"
                href="#guest-request-form"
              >
                Send priority request
              </a>
              <button
                type="button"
                onClick={() => setShowOptions((v) => !v)}
                className="inline-flex rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-900 whitespace-nowrap"
              >
                See nearest valid options
              </button>
            </div>

            {showOptions && (
              <div className="mt-3 space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-2">
                <p className="text-xs text-slate-600">
                  Requested exact stay: <strong>{toDisplayDate(checkIn)} → {toDisplayDate(checkOut)}</strong> ({calculateNights(checkIn, checkOut)} nights).
                </p>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-700">Selected property (exact dates)</p>
                  <div className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700">
                    <p className="font-semibold text-slate-900">{propertyTitle || "Selected Property"}</p>
                    <p>{toDisplayDate(checkIn)} → {toDisplayDate(checkOut)} ({calculateNights(checkIn, checkOut)} nights)</p>
                    <p className="mt-1 text-[11px] text-slate-500">Not directly reservable online — operator confirmation required.</p>
                  </div>
                </div>

                {!!relatedOptions?.length && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-slate-700">Other properties for the same exact dates</p>
                    {relatedOptions.slice(0, 3).map((item) => (
                      <a key={item.title} href={item.href} className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700 hover:bg-slate-50">
                        <span>{item.title}</span>
                        <span>{calculateNights(checkIn, checkOut)} nights · From {item.from} EUR / night</span>
                      </a>
                    ))}
                  </div>
                )}

                {!!splitStaySuggestions.length && (
                  <div className="space-y-2 rounded-md border border-blue-200 bg-white p-2">
                    <p className="text-xs font-semibold text-blue-800">Combined 2-property proposal (same area)</p>
                    <p className="text-xs text-slate-600">For this combination, our operator will create the reservation manually for you.</p>
                    {splitStaySuggestions.map((s, idx) => (
                      <div key={`${s.property.title}-${idx}`} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs text-slate-700">
                        <p className="font-semibold text-slate-900">{idx === 0 ? `${propertyTitle || "Selected Property"} (selected)` : s.property.title}</p>
                        <p>{toDisplayDate(s.start)} → {toDisplayDate(s.end)} ({s.nights} {s.nights === 1 ? "night" : "nights"})</p>
                        {idx > 0 && <a href={s.property.href} className="mt-1 inline-flex rounded-md border border-slate-300 px-2 py-0.5 text-[11px] font-medium text-slate-900">View property</a>}
                      </div>
                    ))}
                    <a
                      role="button"
                      className="inline-flex rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white whitespace-nowrap"
                      href="#guest-request-form"
                    >
                      Request this combination
                    </a>
                    <p className="text-[11px] text-slate-500">No need to restart search — we’ll coordinate both properties in one booking flow.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : checkIn && checkOut ? (
          <a
            role="button"
            className="mt-3 inline-flex rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white whitespace-nowrap"
            href={`${actionUrl}?resource_id=${resourceId}&mode=reserve&planyo_lang=EN`}
          >
            Make reservation
          </a>
        ) : null}
      </div>
    </section>
  );
}
