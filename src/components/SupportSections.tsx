const supportCards = [
  { title: "Guest FAQ", desc: "Check-in/out, payments, policies, concierge" },
  { title: "Owner FAQ", desc: "Payouts, reporting, onboarding, tech" },
  { title: "Policies", desc: "Rental terms, cancellations, deposits, privacy" },
  { title: "Media / Press", desc: "Press kit, logos, interviews" },
  { title: "Collaborate", desc: "PMC, providers, agents & affiliates" },
  { title: "Contact", desc: "Email, WhatsApp, phone" },
];

export function SupportSections() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-8 pt-4">
      <div className="rounded-2xl border border-slate-300 bg-white p-5 md:p-8">
        <p className="text-sm text-slate-500">Home › <span className="font-semibold text-slate-700">Support</span></p>

        <h1 className="mt-3 text-[56px] font-semibold leading-none text-slate-900">How can we help?</h1>
        <p className="mt-3 text-[21px] text-slate-600">
          Search our FAQs or jump to policies. Still stuck? Contact our team — we reply fast during working hours.
        </p>

        <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-slate-300 bg-white p-3 md:flex-row md:items-center">
          <div className="flex-1">
            <label className="text-sm font-medium text-slate-700">Search</label>
            <input
              className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400"
              placeholder="Search (e.g., cancellation, check-in, deposits)..."
            />
          </div>
          <button className="rounded-xl bg-slate-900 px-6 py-3 text-base font-medium text-white">Contact support</button>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {supportCards.map((card) => (
            <button
              key={card.title}
              type="button"
              className="rounded-xl border border-slate-300 bg-white p-4 text-left transition hover:border-slate-500 hover:shadow-sm"
            >
              <p className="text-[30px] font-semibold leading-none text-slate-900">{card.title}</p>
              <p className="mt-2 text-[21px] text-slate-600">{card.desc}</p>
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          {[
            {
              q: "How does booking work on Villa4you?",
              a: "Browse destinations, pick a property, then we hand off to our live availability engine (Planyo) or confirm directly with the owner. You’ll receive a confirmation email with next steps.",
            },
            {
              q: "What’s your cancellation policy?",
              a: "Policies vary by property and season. You’ll see the specific terms before you pay. For questions, contact support with your dates and property name.",
            },
            {
              q: "Which payment methods are accepted?",
              a: "Most villas accept credit/debit cards and bank transfer. Some allow split payments. Exact options are shown at checkout.",
            },
            {
              q: "Do you offer concierge (transfers, chef, tours)?",
              a: "Yes. After booking, we share a link to request airport transfers, private chef, car rentals, and curated activities in your region.",
            },
            {
              q: "I’m an owner — how do I get a free evaluation?",
              a: "Use our Free Evaluation form. We’ll review your home, region, and revenue goals, then suggest a model (self-managed, multi-platform, or fully managed).",
            },
          ].map((item, idx) => (
            <details key={item.q} className="overflow-hidden rounded-xl border border-slate-300 bg-white" open={idx === 0}>
              <summary className="cursor-pointer list-none px-4 py-3 text-[30px] font-semibold leading-none text-slate-900 marker:content-none">
                {item.q}
              </summary>
              <div className="px-4 pb-4">
                <p className="text-[21px] text-slate-700">{item.a}</p>
              </div>
            </details>
          ))}

          <div className="flex flex-wrap gap-3 pt-1">
            <button className="rounded-xl bg-slate-900 px-5 py-2.5 text-base font-medium text-white">View Policies</button>
            <button className="rounded-xl border border-slate-800 bg-white px-5 py-2.5 text-base font-medium text-slate-900">Contact Support</button>
          </div>
        </div>
      </div>
    </section>
  );
}
