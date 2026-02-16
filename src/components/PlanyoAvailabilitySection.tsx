"use client";

import Script from "next/script";
import { useEffect, useMemo, useRef, useState } from "react";
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

function toInputDisplayDate(iso: string) {
  if (!iso) return "dd/mm/yyyy";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}

function SimpleDatePicker({
  value,
  onChange,
  min,
}: {
  value: string;
  onChange: (iso: string) => void;
  min?: string;
}) {
  const [open, setOpen] = useState(false);
  const minDate = useMemo(() => (min ? toDate(min) : null), [min]);
  const [viewMonth, setViewMonth] = useState<Date>(() => {
    const base = value ? toDate(value) : (min ? toDate(min) : new Date());
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const base = value ? toDate(value) : (min ? toDate(min) : new Date());
    setViewMonth(new Date(base.getFullYear(), base.getMonth(), 1));
  }, [open, value, min]);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: Array<{ iso: string; day: number; disabled: boolean } | null> = [];
  for (let i = 0; i < firstWeekday; i += 1) cells.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) {
    const dt = new Date(year, month, d);
    const iso = toIsoLocal(dt);
    const disabled = !!minDate && dt.getTime() < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()).getTime();
    cells.push({ iso, day: d, disabled });
  }

  return (
    <div ref={wrapRef} className="relative mt-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-left text-sm text-slate-900"
      >
        {toInputDisplayDate(value)}
      </button>

      {open && (
        <div className="absolute z-20 mt-1 w-72 rounded-lg border border-slate-200 bg-white p-2 shadow-xl">
          <div className="mb-2 flex items-center justify-between text-sm">
            <button type="button" onClick={() => setViewMonth(new Date(year, month - 1, 1))} className="rounded border px-2 py-0.5">←</button>
            <span className="font-semibold">{viewMonth.toLocaleString("en-US", { month: "long", year: "numeric" })}</span>
            <button type="button" onClick={() => setViewMonth(new Date(year, month + 1, 1))} className="rounded border px-2 py-0.5">→</button>
          </div>

          <div className="mb-1 grid grid-cols-7 text-center text-[11px] text-slate-500">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => <span key={d}>{d}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((c, idx) => {
              if (!c) return <span key={`blank-${idx}`} className="h-8" />;
              const isSelected = value === c.iso;
              return (
                <button
                  key={c.iso}
                  type="button"
                  onClick={() => {
                    if (c.disabled) {
                      setOpen(false);
                      return;
                    }
                    onChange(c.iso);
                    setOpen(false);
                  }}
                  className={`h-8 rounded text-sm ${isSelected ? "bg-blue-600 text-white" : "bg-white text-slate-900"} ${c.disabled ? "cursor-not-allowed opacity-30" : "hover:bg-slate-100"}`}
                >
                  {c.day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
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
  const todayIso = useMemo(() => toIsoLocal(new Date()), []);
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

  function isRangeAvailable(startIso: string, nightsCount: number) {
    if (!startIso || nightsCount <= 0) return false;
    for (let i = 0; i < nightsCount; i += 1) {
      const d = addDaysIso(startIso, i);
      if (blockedNightsSet.has(d)) return false;
    }
    return true;
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

  const selectedExactOption = exactOptions[0] ?? null;
  const requestedEndIso = checkIn ? addDaysIso(checkIn, requestedNights) : "";
  const requestedRangeNights = checkIn && checkOut ? calculateNights(checkIn, checkOut) : 0;

  const selectedPropertyOption = useMemo(() => {
    if (!shouldComputeSuggestions || !checkIn || !requestedRangeNights) return selectedExactOption;

    // Business semantics: unavailable date blocks check-in on that day, but previous night can still be valid.
    // For selected property, first try the same requested start date with nearest duration (0..3 nights shorter/longer).
    const candidateNights = [
      requestedRangeNights,
      requestedRangeNights - 1,
      requestedRangeNights - 2,
      requestedRangeNights - 3,
      requestedRangeNights + 1,
      requestedRangeNights + 2,
      requestedRangeNights + 3,
    ].filter((n, idx, arr) => n >= minStay && arr.indexOf(n) === idx);

    for (const n of candidateNights) {
      if (isRangeAvailable(checkIn, n)) {
        return {
          start: checkIn,
          end: addDaysIso(checkIn, n),
          nights: n,
          shiftDays: 0,
        } as SuggestedOption;
      }
    }

    return selectedExactOption;
  }, [shouldComputeSuggestions, checkIn, requestedRangeNights, minStay, blockedNightsSet, selectedExactOption]);
  const selectedSeasonMultiplier = basicFrom > 0 ? (nightly / basicFrom) : 1;
  const relatedPriceMin = nightly * 0.8;
  const relatedPriceMax = nightly * 1.2;
  const rankedRelatedOptions = useMemo(() => {
    if (!relatedOptions?.length) return [] as RelatedPropertyOption[];
    return [...relatedOptions].sort((a, b) => Math.abs(a.from - nightly) - Math.abs(b.from - nightly));
  }, [relatedOptions, nightly]);
  const filteredRelatedOptions = useMemo(() => {
    if (!rankedRelatedOptions.length) return [] as RelatedPropertyOption[];
    return rankedRelatedOptions.filter((item) => item.from >= relatedPriceMin && item.from <= relatedPriceMax);
  }, [rankedRelatedOptions, relatedPriceMin, relatedPriceMax]);
  const relatedDisplayOptions = filteredRelatedOptions.length ? filteredRelatedOptions : rankedRelatedOptions.slice(0, 3);

  function getSeasonAdjustedNightlyForRelated(item: RelatedPropertyOption) {
    return item.from * selectedSeasonMultiplier;
  }

  function getSeasonAdjustedTotalForRelated(item: RelatedPropertyOption, nightsCount: number) {
    return getSeasonAdjustedNightlyForRelated(item) * nightsCount;
  }

  const splitStaySuggestions = useMemo(() => {
    if (
      !shouldComputeSuggestions
      || !checkIn
      || !checkOut
      || requestedRangeNights < BOOKING_RECOVERY_CONFIG.LONG_STAY_NIGHTS
    ) return [] as Array<{
      property: RelatedPropertyOption;
      start: string;
      end: string;
      nights: number;
    }>;

    const candidates = relatedDisplayOptions.slice(0, BOOKING_RECOVERY_CONFIG.MAX_SPLIT_PROPERTIES);
    if (candidates.length < 2) return [];

    // Combined-stay constraints:
    // - avoid creating weak selected-property gaps (prefer 6 or 7 selected nights first)
    // - keep second property at >=7 nights when possible
    const minOtherPropertyNights = 7;
    const preferredSelectedNights = [6, 7, 5, 8, 4, 9];
    const selectedNights = preferredSelectedNights.find((n) => {
      const otherNights = requestedRangeNights - n;
      return n > 0 && otherNights >= minOtherPropertyNights;
    }) ?? Math.max(1, requestedRangeNights - minOtherPropertyNights);
    const nearbyNights = requestedRangeNights - selectedNights;
    const splitDate = addDaysIso(checkIn, selectedNights);
    const requestedEnd = addDaysIso(checkIn, requestedRangeNights);

    return [
      { property: candidates[0], start: checkIn, end: splitDate, nights: selectedNights },
      { property: candidates[1], start: splitDate, end: requestedEnd, nights: nearbyNights },
    ];
  }, [shouldComputeSuggestions, checkIn, checkOut, requestedRangeNights, relatedDisplayOptions]);

  const combinedSeasonAdjustedTotal = useMemo(() => {
    if (!splitStaySuggestions.length) return 0;
    return splitStaySuggestions.reduce((sum, s, idx) => {
      const segment = idx === 0 ? (nightly * s.nights) : getSeasonAdjustedTotalForRelated(s.property, s.nights);
      return sum + segment;
    }, 0);
  }, [splitStaySuggestions, nightly]);

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

    if (checkOut && toDate(checkOut).getTime() < toDate(minCheckoutDate).getTime()) {
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
            <SimpleDatePicker
              value={checkIn}
              min={todayIso}
              onChange={(next) => {
                if (!next) {
                  setRequestedCheckIn("");
                  setCheckIn("");
                  return;
                }
                const normalized = normalizeStartDate(next);
                setRequestedCheckIn(normalized);
                setCheckIn(normalized);

                const d = toDate(normalized);
                d.setDate(d.getDate() + minStay);
                const autoCheckout = toIsoLocal(d);
                if (!checkOut) {
                  setRequestedCheckOut(autoCheckout);
                  setCheckOut(autoCheckout);
                }

                if (normalized !== next) {
                  setMinStayNotice(`Selected start date was unavailable. Moved to next available date: ${normalized}.`);
                } else {
                  setMinStayNotice("");
                }
              }}
            />
          </label>
          <label className="text-[11px] text-slate-600">
            End date *
            <SimpleDatePicker
              value={checkOut}
              min={minCheckoutDate || undefined}
              onChange={(next) => {
                if (checkIn && minCheckoutDate && next && toDate(next).getTime() < toDate(minCheckoutDate).getTime()) {
                  setRequestedCheckOut(minCheckoutDate);
                  setCheckOut(minCheckoutDate);
                  setMinStayNotice(`Minimum stay is ${minStay} ${minStay === 1 ? "night" : "nights"}. End date was adjusted.`);
                } else {
                  setRequestedCheckOut(next);
                  setCheckOut(next);
                  setMinStayNotice("");
                }
              }}
            />
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
                href={`?checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}#guest-request-form`}
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
                  Requested dates: <strong>{toDisplayDate(checkIn)} → {toDisplayDate(checkOut)}</strong> ({requestedRangeNights} nights).
                </p>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-700">Selected property exact match</p>
                  {selectedPropertyOption ? (
                    <div className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700">
                      <p className="font-semibold text-slate-900">{propertyTitle || "Selected Property"}</p>
                      <p>{toDisplayDate(selectedPropertyOption.start)} → {toDisplayDate(selectedPropertyOption.end)} ({selectedPropertyOption.nights} nights)</p>
                      <p className="mt-1 text-[11px] text-slate-500">Closest valid stay for this property from your selected check-in date.</p>
                      <button
                        type="button"
                        onClick={() => {
                          setCheckIn(selectedPropertyOption.start);
                          setCheckOut(selectedPropertyOption.end);
                          setShowOptions(false);
                        }}
                        className="mt-1 inline-flex rounded-md bg-slate-900 px-2 py-1 text-[11px] font-semibold text-white whitespace-nowrap"
                      >
                        Select exact match
                      </button>
                    </div>
                  ) : (
                    <div className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700">
                      No close match found for selected property in nearest range.
                    </div>
                  )}
                </div>

                {!!relatedDisplayOptions.length && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-slate-700">Other properties for requested dates</p>
                    {relatedDisplayOptions.slice(0, 3).map((item) => (
                      <a key={item.title} href={item.href} className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700 hover:bg-slate-50">
                        <span>{item.title}</span>
                        <span>{requestedRangeNights} nights · Season-adjusted total: {currency} {getSeasonAdjustedTotalForRelated(item, requestedRangeNights).toFixed(0)}</span>
                      </a>
                    ))}
                    <p className="text-[11px] text-slate-500">
                      {filteredRelatedOptions.length
                        ? "Filtered to same price band (±20%) for your selected season context."
                        : "No properties in ±20% band; showing closest-price options for your requested dates."}
                    </p>
                  </div>
                )}

                {!!splitStaySuggestions.length && (
                  <div className="space-y-2 rounded-md border border-blue-200 bg-white p-2">
                    <p className="text-xs font-semibold text-blue-800">Combined 2-property proposal (same area)</p>
                    <p className="text-xs text-slate-600">For this combination, our operator will create the reservation manually for you.</p>
                    <p className="text-[11px] text-slate-500">Total combined stay: {requestedRangeNights} nights (matching your requested dates). Other-property segment target: minimum 7 nights.</p>
                    <p className="text-[11px] text-slate-500">Season-adjusted combined total: {currency} {combinedSeasonAdjustedTotal.toFixed(0)}</p>
                    {splitStaySuggestions.map((s, idx) => (
                      <div key={`${s.property.title}-${idx}`} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs text-slate-700">
                        <p className="font-semibold text-slate-900">{idx === 0 ? `${propertyTitle || "Selected Property"} (selected)` : s.property.title}</p>
                        <p>{toDisplayDate(s.start)} → {toDisplayDate(s.end)} ({s.nights} {s.nights === 1 ? "night" : "nights"})</p>
                        <p className="text-[11px] text-slate-600">
                          Segment total: {currency} {(idx === 0 ? (nightly * s.nights) : getSeasonAdjustedTotalForRelated(s.property, s.nights)).toFixed(0)}
                        </p>
                        {idx > 0 && <a href={s.property.href} className="mt-1 inline-flex rounded-md border border-slate-300 px-2 py-0.5 text-[11px] font-medium text-slate-900">View property</a>}
                      </div>
                    ))}
                    <a
                      role="button"
                      className="inline-flex rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white whitespace-nowrap"
                      href={`?checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}#guest-request-form`}
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



