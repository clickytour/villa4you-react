"use client";

import { useMemo, useState } from "react";

type RoleKey = "guests" | "owners" | "collab";

type RoleConfig = {
  eyebrow: string;
  h1: string;
  p: string;
  ctas: [string, string];
  kpis: string[];
  trustTitle: string;
  howSteps: string[];
};

const roleCfg: Record<RoleKey, RoleConfig> = {
  guests: {
    eyebrow: "Trusted villa stays & management · 18+ years",
    h1: "Find the perfect villa for your vacations in Greece",
    p: "Villa4you connects vetted villas, expert trip planning, and pro property management across Greece.",
    ctas: ["Find a Villa", "Plan My Trip"],
    kpis: ["⭐ 4.8/5 guest reviews", "🏝️ 6+ top destinations", "🔄 seamless Planyo bookings"],
    trustTitle: "Why Villa4you?",
    howSteps: ["Choose destination + dates", "Get curated villa shortlist", "Book with confidence"],
  },
  owners: {
    eyebrow: "Owners · Transparent management & reporting",
    h1: "Grow your villa revenue with the right management model",
    p: "From Self‑Managed to Fully Managed: improve distribution, operations, and pricing.",
    ctas: ["Free evaluation", "See how it works"],
    kpis: ["📈 Revenue strategy", "🧾 Transparent reporting", "🧰 Ops playbooks"],
    trustTitle: "Why owners choose Villa4you",
    howSteps: ["Property audit", "Pricing & operations plan", "Monthly performance loop"],
  },
  collab: {
    eyebrow: "Partners · Agents · Providers · PMCs",
    h1: "Collaborate to sell more villas and services",
    p: "Partner for net pricing, listings, co‑marketing, and shared tools.",
    ctas: ["Partner programs", "Agents & affiliates"],
    kpis: ["🤝 Partner programs", "🏷️ Net pricing", "🔌 Tools & integrations"],
    trustTitle: "Why partners work with Villa4you",
    howSteps: ["Onboard partner", "Publish offers & assets", "Scale with shared pipeline"],
  },
};

const collabPosts = [
  { title: "How agents earn with net pricing", meta: "Collaborate · 4 min read" },
  { title: "Partner onboarding checklist", meta: "Partners · 5 min read" },
  { title: "How to list services effectively", meta: "Providers · 4 min read" },
];

const destinations = ["Santorini", "Mykonos", "Paros", "Crete", "Rhodes", "Corfu"];

export function HomepageRoleExperience() {
  const [role, setRole] = useState<RoleKey>("guests");
  const cfg = useMemo(() => roleCfg[role], [role]);

  return (
    <main className="min-h-screen bg-[#f3f5f8] pb-24 text-slate-900 md:pb-10">
      <section className="mx-auto max-w-[1200px] px-4 py-8">
        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-5 flex flex-wrap gap-2">
            {(["guests", "owners", "collab"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${
                  role === r ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{cfg.eyebrow}</p>
              <h1 className="mt-2 max-w-[18ch] text-4xl font-semibold leading-tight md:text-6xl">{cfg.h1}</h1>
              <p className="mt-3 max-w-2xl text-lg text-slate-700">{cfg.p}</p>

              <div className="mt-5 flex flex-wrap gap-3">
                <button className="rounded-lg bg-slate-900 px-4 py-2 text-white">{cfg.ctas[0]}</button>
                <button className="rounded-lg border border-slate-300 bg-white px-4 py-2">{cfg.ctas[1]}</button>
              </div>

              <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-700">
                {cfg.kpis.map((kpi) => (
                  <span key={kpi} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
                    {kpi}
                  </span>
                ))}
              </div>
            </div>

            <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Quick Request (UI mock)</h3>
              <div className="mt-3 grid gap-2">
                <input className="rounded-lg border bg-white px-3 py-2 text-sm" placeholder="Destination" />
                <div className="grid grid-cols-2 gap-2">
                  <input className="rounded-lg border bg-white px-3 py-2 text-sm" placeholder="Check-in" />
                  <input className="rounded-lg border bg-white px-3 py-2 text-sm" placeholder="Check-out" />
                </div>
                <input className="rounded-lg border bg-white px-3 py-2 text-sm" placeholder="Adults" />
                <button className="mt-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white">Next</button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 pb-6">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">How it works</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {cfg.howSteps.map((step, i) => (
              <div key={step} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
                <p className="text-xs font-semibold text-slate-500">STEP {i + 1}</p>
                <p className="mt-1 font-medium text-slate-800">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 pb-6">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Top destinations</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {destinations.map((d) => (
              <span key={d} className="rounded-full border border-slate-300 px-3 py-1.5 text-sm">
                {d}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 pb-6">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">{cfg.trustTitle}</h2>
          <ul className="mt-3 grid gap-2 text-sm text-slate-700 md:grid-cols-2">
            <li>• Trusted network and operational consistency</li>
            <li>• Structured listings and better booking readiness</li>
            <li>• Clear process visibility for teams and partners</li>
            <li>• Baseline aligned to approved homepage system</li>
          </ul>
          <blockquote className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            “Fast response, clear options, and smooth booking handoff.”
          </blockquote>
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
