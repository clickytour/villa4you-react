"use client";

import Script from "next/script";
import { useEffect, useMemo, useState } from "react";

type SeasonalRate = { label: string; from: string; to: string; nightly: number };

function toDate(v: string) {
  return new Date(`${v}T00:00:00`);
}

function toIsoLocal(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
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
}) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [apiStatus, setApiStatus] = useState<"idle" | "ok" | "error">("idle");
  const [availabilityHint, setAvailabilityHint] = useState("");
  const [minStayNotice, setMinStayNotice] = useState("");

  const nightly = useMemo(() => {
    if (!checkIn) return basicFrom;
    const d = toDate(checkIn);
    const season = seasonalRates.find((s) => d >= toDate(s.from) && d <= toDate(s.to));
    return season?.nightly ?? basicFrom;
  }, [checkIn, seasonalRates, basicFrom]);

  const hasUnavailableInRange = useMemo(() => {
    if (!checkIn || !checkOut) return false;
    const start = toDate(checkIn).getTime();
    const end = toDate(checkOut).getTime();
    return unavailableDates.some((d) => {
      const t = toDate(d).getTime();
      return t >= start && t <= end;
    });
  }, [checkIn, checkOut, unavailableDates]);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const start = toDate(checkIn).getTime();
    const end = toDate(checkOut).getTime();
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [checkIn, checkOut]);

  const minStay = Math.max(1, minStayNights || 1);
  const minCheckoutDate = useMemo(() => {
    if (!checkIn) return "";
    const d = toDate(checkIn);
    d.setDate(d.getDate() + minStay);
    return toIsoLocal(d);
  }, [checkIn, minStay]);

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

    if (!checkOut || toDate(checkOut).getTime() < toDate(minCheckoutDate).getTime()) {
      setCheckOut(minCheckoutDate);
    }
  }, [checkIn, checkOut, minCheckoutDate]);

  useEffect(() => {
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

      <div className="mt-2 rounded-lg border border-blue-200 bg-white p-3">
        <div className="grid gap-2 md:grid-cols-2">
          <label className="text-[11px] text-slate-600">
            Start date *
            <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </label>
          <label className="text-[11px] text-slate-600">
            End date *
            <input type="date" value={checkOut} min={minCheckoutDate || undefined} onChange={(e) => {
              const next = e.target.value;
              if (checkIn && minCheckoutDate && next && toDate(next).getTime() < toDate(minCheckoutDate).getTime()) {
                setCheckOut(minCheckoutDate);
                setMinStayNotice(`Minimum stay is ${minStay} ${minStay === 1 ? "night" : "nights"}. End date was adjusted.`);
              } else {
                setCheckOut(next);
                setMinStayNotice("");
              }
            }} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </label>
        </div>
        <p className="mt-2 text-xs text-slate-600">Minimum stay: {minStay} {minStay === 1 ? "night" : "nights"}.</p>

        {checkIn && checkOut ? (
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
        ) : (
          <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
            Fill Start date and End date to expand price breakdown.
          </div>
        )}

        {minStayNotice && <p className="mt-2 text-xs text-red-600">{minStayNotice}</p>}
        {hasUnavailableInRange && <p className="mt-2 text-xs text-red-600">Selected range includes unavailable dates. Please adjust dates.</p>}
        {availabilityHint && <p className="mt-1 text-xs text-slate-600">{availabilityHint}</p>}

        {checkIn && checkOut && (
          <a
            role="button"
            className="mt-3 inline-flex rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white whitespace-nowrap"
            href={`${actionUrl}?resource_id=${resourceId}&mode=reserve&planyo_lang=EN`}
          >
            Make reservation
          </a>
        )}
      </div>
    </section>
  );
}
