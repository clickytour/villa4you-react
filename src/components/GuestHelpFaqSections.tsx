"use client";

import { useMemo, useState } from "react";

type FaqCategory = "All" | "Booking" | "Payments" | "Policies" | "Check-in & stay" | "Changes & refunds" | "Transfers & extras";

type FaqItem = {
  q: string;
  a: string;
  categories: Exclude<FaqCategory, "All">[];
};

const categories: FaqCategory[] = [
  "All",
  "Booking",
  "Payments",
  "Policies",
  "Check-in & stay",
  "Changes & refunds",
  "Transfers & extras",
];

const faqItems: FaqItem[] = [
  {
    q: "How does booking work?",
    a: "Select your villa and click Check availability to open live calendars and inquiry options.",
    categories: ["Booking"],
  },
  {
    q: "What deposit is required?",
    a: "Deposit size depends on property terms and season. Exact amount appears before payment.",
    categories: ["Payments", "Policies"],
  },
  {
    q: "What is the cancellation policy?",
    a: "Each property has its own policy. You’ll always see it before confirming.",
    categories: ["Policies", "Changes & refunds"],
  },
  {
    q: "Do you require a security deposit?",
    a: "Some homes require it, others don’t. Terms are listed in each property page.",
    categories: ["Policies", "Payments"],
  },
  {
    q: "How do refunds work?",
    a: "When eligible, refunds follow the property’s cancellation window and payment channel timelines.",
    categories: ["Changes & refunds", "Payments"],
  },
  {
    q: "Can I change dates?",
    a: "Date changes are possible subject to availability and property policy.",
    categories: ["Changes & refunds", "Booking"],
  },
  {
    q: "How fast do you reply?",
    a: "Typically within working hours. Urgent in-stay requests are prioritized.",
    categories: ["Check-in & stay"],
  },
];

export function GuestHelpFaqSections() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("All");

  const filteredFaq = useMemo(() => {
    if (activeCategory === "All") return faqItems;
    return faqItems.filter((item) => item.categories.includes(activeCategory));
  }, [activeCategory]);

  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-8 pt-4">
      <div className="rounded-2xl border border-slate-300 bg-white p-5 md:p-8">
        <p className="text-sm text-slate-500">Home › <span className="font-semibold text-slate-700">Guest Help & FAQ</span></p>

        <h1 className="mt-3 text-[56px] font-semibold leading-none text-slate-900">Guest Help & FAQ</h1>

        <p className="mt-3 text-[21px] text-slate-600">
          Answers to booking, payments, policies, and trip logistics. Need a hand? Send us a quick note and our team will reply shortly.
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <input
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 md:flex-1"
                placeholder="Search (e.g., refund, check-in, deposit, transfer)..."
              />
              <button className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700">Clear</button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map((cat) => {
                const active = cat === activeCategory;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full border px-3 py-1.5 text-sm ${
                      active ? "border-emerald-600 text-emerald-700" : "border-slate-300 text-slate-700"
                    } bg-white`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 overflow-hidden rounded-xl border border-slate-300 bg-white">
              {filteredFaq.map((item, idx) => (
                <details key={item.q} className={idx < filteredFaq.length - 1 ? "border-b border-slate-200" : ""}>
                  <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-[30px] font-semibold leading-none text-slate-900 marker:content-none">
                    <span>{item.q}</span>
                    <span className="text-xl font-normal">+</span>
                  </summary>
                  <div className="px-4 pb-4">
                    <p className="text-[21px] text-slate-700">{item.a}</p>
                  </div>
                </details>
              ))}
            </div>

            <p className="mt-2 text-sm text-slate-500">Didn’t find what you needed? Use the form on the right and we’ll help.</p>
          </div>

          <aside className="rounded-xl border border-slate-300 bg-white p-4">
            <h2 className="text-[42px] font-semibold leading-none text-slate-900">Need help? Contact support</h2>
            <div className="mt-3 space-y-3">
              <label className="block text-sm font-medium text-slate-700">Name *<input className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2" /></label>
              <label className="block text-sm font-medium text-slate-700">Email *<input className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2" /></label>
              <label className="block text-sm font-medium text-slate-700">Phone<input className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2" placeholder="+30 697..." /></label>
              <p className="-mt-2 text-xs text-slate-500">Use international format if possible.</p>
              <label className="block text-sm font-medium text-slate-700">Booking reference (optional)<input className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2" /></label>
              <label className="block text-sm font-medium text-slate-700">Topic *
                <select className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900">
                  <option>Select...</option>
                </select>
              </label>
              <label className="block text-sm font-medium text-slate-700">Message *<textarea className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2" rows={4} /></label>
              <label className="flex items-start gap-2 text-sm text-slate-700"><input type="checkbox" className="mt-1" /> I consent to processing my data to handle this request. *</label>
              <button className="rounded-xl bg-slate-900 px-5 py-2.5 text-base font-medium text-white">Send</button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
