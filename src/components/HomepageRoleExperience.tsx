"use client";

import { useMemo, useState } from "react";

type RoleKey = "guests" | "owners" | "collab";

const roleCfg = {
  guests: {
    eyebrow: "Trusted villa stays & management · 18+ years",
    h1: "Find the perfect villa for your vacations in Greece",
    p: "Villa4you connects vetted villas, expert trip planning, and pro property management across Greece.",
    ctas: ["Find a Villa", "Plan My Trip"],
  },
  owners: {
    eyebrow: "Owners · Transparent management & reporting",
    h1: "Grow your villa revenue with the right management model",
    p: "From Self‑Managed to Fully Managed: improve distribution, operations, and pricing.",
    ctas: ["Free evaluation", "See how it works"],
  },
  collab: {
    eyebrow: "Partners · Agents · Providers · PMCs",
    h1: "Collaborate to sell more villas and services",
    p: "Partner for net pricing, listings, co‑marketing, and shared tools.",
    ctas: ["Partner programs", "Agents & affiliates"],
  },
} as const;

const collabPosts = [
  { title: "How agents earn with net pricing", meta: "Collaborate · 4 min read" },
  { title: "Partner onboarding checklist", meta: "Partners · 5 min read" },
  { title: "How to list services effectively", meta: "Providers · 4 min read" },
];

export function HomepageRoleExperience() {
  const [role, setRole] = useState<RoleKey>("guests");
  const cfg = useMemo(() => roleCfg[role], [role]);

  return (
    <main className="min-h-screen bg-[#f3f5f8] text-slate-900">
      <section className="mx-auto max-w-[1200px] px-4 py-8">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-4 flex gap-2">
            {(["guests", "owners", "collab"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  role === r ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{cfg.eyebrow}</p>
          <h1 className="mt-2 text-4xl font-semibold leading-tight md:text-5xl">{cfg.h1}</h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-700">{cfg.p}</p>

          <div className="mt-5 flex gap-3">
            <button className="rounded-lg bg-slate-900 px-4 py-2 text-white">{cfg.ctas[0]}</button>
            <button className="rounded-lg border border-slate-300 bg-white px-4 py-2">{cfg.ctas[1]}</button>
          </div>
        </div>
      </section>

      {role === "collab" && (
        <section className="mx-auto max-w-[1200px] px-4 pb-24">
          <h2 className="mb-4 text-xl font-semibold">Collaborate posts</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {collabPosts.map((p) => (
              <article key={p.title} className="rounded-xl border bg-white p-4 shadow-sm">
                <div className="h-28 rounded-md bg-slate-200" />
                <h3 className="mt-3 font-semibold">{p.title}</h3>
                <small className="text-slate-500">{p.meta}</small>
                <div className="mt-3">
                  <button className="rounded-md bg-slate-900 px-3 py-1.5 text-sm text-white">Read</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <div className="fixed bottom-0 left-0 right-0 border-t bg-white p-3 md:hidden">
        <div className="mx-auto flex max-w-[1200px] justify-between gap-2 text-sm">
          <button className="flex-1 rounded-md border px-3 py-2">Call</button>
          <button className="flex-1 rounded-md border px-3 py-2">WhatsApp</button>
          <button className="flex-1 rounded-md bg-slate-900 px-3 py-2 text-white">Plan my trip</button>
        </div>
      </div>
    </main>
  );
}
