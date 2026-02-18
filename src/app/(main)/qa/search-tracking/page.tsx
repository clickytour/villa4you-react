"use client";

import { useEffect, useMemo, useState } from "react";

type DataLayerEvent = Record<string, unknown> & { event?: string };

export default function SearchTrackingQAPage() {
  const [events, setEvents] = useState<DataLayerEvent[]>([]);

  useEffect(() => {
    const readEvents = () => {
      const dl = (window as Window & { dataLayer?: DataLayerEvent[] }).dataLayer || [];
      const searchEvents = dl.filter((e) => String(e?.event || "").startsWith("search_"));
      setEvents(searchEvents.slice(-100).reverse());
    };

    readEvents();
    const id = window.setInterval(readEvents, 1000);
    return () => window.clearInterval(id);
  }, []);

  const counts = useMemo(() => {
    return events.reduce<Record<string, number>>((acc, item) => {
      const key = String(item.event || "unknown");
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  }, [events]);

  return (
    <main className="mx-auto min-h-screen w-full max-w-[1280px] px-4 py-6">
      <h1 className="text-[40px] font-semibold leading-none text-slate-900">QA: Search Tracking Live Feed</h1>
      <p className="mt-2 text-[18px] text-slate-700">
        Shows latest <code>window.dataLayer</code> events starting with <code>search_</code>.
      </p>

      <section className="mt-5 rounded-xl border border-slate-300 bg-white p-4">
        <h2 className="text-[28px] font-semibold leading-none text-slate-900">Event counts (current page session)</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.keys(counts).length === 0 ? (
            <span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-sm text-slate-700">No search events yet</span>
          ) : (
            Object.entries(counts).map(([name, count]) => (
              <span key={name} className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-sm text-slate-700">
                {name}: {count}
              </span>
            ))
          )}
        </div>
      </section>

      <section className="mt-5 rounded-xl border border-slate-300 bg-white p-4">
        <h2 className="text-[28px] font-semibold leading-none text-slate-900">Latest search events</h2>
        <div className="mt-3 space-y-3">
          {events.length === 0 ? (
            <p className="text-sm text-slate-600">No events captured yet. Navigate to /search or click search handoff CTAs first.</p>
          ) : (
            events.map((evt, idx) => (
              <pre key={`${String(evt.event)}-${idx}`} className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-800">
                {JSON.stringify(evt, null, 2)}
              </pre>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
