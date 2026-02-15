"use client";

import Script from "next/script";
import { useEffect, useMemo, useState } from "react";

type SeasonalRate = { label: string; from: string; to: string; nightly: number };

function toDate(v: string) {
  return new Date(`${v}T00:00:00`);
}

export function PlanyoAvailabilitySection({
  calendarId,
  resourceId,
  actionUrl,
  currency,
  basicFrom,
  seasonalRates,
  unavailableDates,
}: {
  calendarId: string;
  resourceId: string;
  actionUrl: string;
  currency: string;
  basicFrom: number;
  seasonalRates: SeasonalRate[];
  unavailableDates: string[];
}) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [apiStatus, setApiStatus] = useState<"idle" | "ok" | "error">("idle");
  const [availabilityHint, setAvailabilityHint] = useState("");

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

  useEffect(() => {
    fetch("/api/planyo/rest?method=api_test")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(() => setApiStatus("ok"))
      .catch(() => setApiStatus("error"));
  }, []);

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
          <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <p className="mt-2 text-sm text-slate-700">
          Estimated from <strong>{nightly} {currency}</strong> / night
        </p>
        {hasUnavailableInRange && <p className="mt-1 text-xs text-red-600">Selected range includes unavailable dates. Please adjust dates.</p>}
        {availabilityHint && <p className="mt-1 text-xs text-slate-600">{availabilityHint}</p>}

        <a
          role="button"
          className="mt-3 inline-flex rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white"
          href={`${actionUrl}?resource_id=${resourceId}&mode=reserve&planyo_lang=EN`}
        >
          Make reservation
        </a>
      </div>
    </section>
  );
}
