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
    q: "How do I book?",
    a: "Open a property page and click “Check Availability.” We use Planyo for live calendars and secure bookings. If you prefer, send dates via the form and we’ll place a hold.",
    categories: ["Booking"],
  },
  {
    q: "What deposit is required?",
    a: "Deposit size depends on property terms and season. Exact amount appears before payment.",
    categories: ["Payments"],
  },
  {
    q: "What payment methods are accepted?",
    a: "Major cards and bank transfer are accepted. A deposit confirms the booking; the balance is due per your confirmation (often 30–45 days before arrival).",
    categories: ["Payments"],
  },
  {
    q: "What is the cancellation policy?",
    a: "Each villa has its own policy shown before payment. Most allow free cancellation within 24–48h after booking and then follow a tiered schedule.",
    categories: ["Policies"],
  },
  {
    q: "Do you charge a security deposit?",
    a: "Some villas require a refundable security hold. It’s released after check-out pending inspection.",
    categories: ["Payments"],
  },
  {
    q: "When do I get the exact address and check-in instructions?",
    a: "After full confirmation you’ll receive a digital guest guide with address, contact, directions and check-in details.",
    categories: ["Check-in & stay"],
  },
  {
    q: "Do you arrange airport transfers?",
    a: "Yes. We can set up private transfers, car rental, or boat taxis. Ask in the message and include flight details if available.",
    categories: ["Transfers & extras"],
  },
  {
    q: "Can you help with activities or chef services?",
    a: "Absolutely—tastings, cruises, private chef, childcare, and more. Tell us your wishlist and we’ll coordinate.",
    categories: ["Transfers & extras"],
  },
  {
    q: "Can I change dates or guest count?",
    a: "Yes, subject to availability and any rate differences. Send your booking reference and new dates via the form.",
    categories: ["Changes & refunds"],
  },
  {
    q: "How do refunds work?",
    a: "When eligible, refunds follow the cancellation policy and payment provider timelines.",
    categories: ["Policies"],
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
                const activeChipClass = "border-emerald-600 text-emerald-700";

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full border px-3 py-1.5 text-sm ${
                      active ? activeChipClass : "border-slate-300 text-slate-700"
                    } bg-white`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 overflow-hidden rounded-xl border border-slate-300 bg-white">
              {filteredFaq.map((item, idx) => {
                const openByDefault = false;
                const headerClass = "border-sky-500 text-slate-900";

                return (
                  <details key={item.q} className={idx < filteredFaq.length - 1 ? "border-b border-slate-200" : ""} open={openByDefault}>
                    <summary className="list-none p-2 marker:content-none">
                      <div className={`flex items-center justify-between rounded-lg border px-3 py-2 text-[30px] font-semibold leading-none ${headerClass}`}>
                        <span>{item.q}</span>
                        <span className="text-xl font-normal">+</span>
                      </div>
                    </summary>
                    <div className="px-4 pb-4">
                      <p className="text-[21px] text-slate-700">{item.a}</p>
                    </div>
                  </details>
                );
              })}
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

        <section className="mt-6 rounded-2xl border border-slate-300 bg-white px-4 py-8 text-center md:px-8">
          <h2 className="text-[42px] font-semibold leading-none text-slate-900">Still need help?</h2>
          <p className="mt-2 text-[21px] text-slate-600">Send us a support request — we usually reply within a few hours.</p>
          <button className="mt-4 rounded-xl bg-slate-900 px-5 py-2.5 text-base font-medium text-white">Open support form</button>
        </section>
      </div>
    </section>
  );
}
