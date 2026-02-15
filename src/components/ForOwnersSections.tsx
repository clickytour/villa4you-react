const ownerHowItWorksSteps = [
  {
    title: "1) Free evaluation",
    text: "We assess your listing quality, seasonality, and pricing opportunities.",
  },
  {
    title: "2) Model & plan",
    text: "Pick Self-Managed, Multi-Platform Sync, or Fully Managed. We propose target ADR & occupancy.",
  },
  {
    title: "3) Launch & grow",
    text: "We activate channels, automate calendars, and deliver reporting that owners love.",
  },
];

const ownerModels = [
  {
    title: "Self-Managed",
    badge: "Best for hands-on owners",
    bullets: [
      "You handle guest comms & on-site ops",
      "We audit listing & pricing quarterly",
      "Tooling & templates, you execute",
      "Owner dashboard access",
    ],
    fee: "Fee: fixed advisory / month",
    primaryCta: "Start with Self-Managed",
  },
  {
    title: "Multi-Platform Sync",
    badge: "Most popular",
    bullets: [
      "We publish & sync across OTAs (Airbnb, Booking.com, Vrbo...)",
      "Dynamic pricing & calendar guardrails",
      "Shared guest comms (we draft, you approve or auto)",
      "Owner dashboard + monthly reporting",
    ],
    fee: "Fee: success-based % per booking",
    primaryCta: "Grow with Multi-Platform",
  },
  {
    title: "Fully Managed",
    badge: "Hands-off performance",
    bullets: [
      "We run everything end-to-end (OTAs, pricing, comms)",
      "Trusted local ops & SLAs",
      "Revenue optimization & owner reporting",
      "Guest experience upgrades (upsells)",
    ],
    fee: "Fee: custom % + service scope",
    primaryCta: "Request Fully Managed",
  },
];

const ownerPartnerPills = ["Airbnb", "Booking.com", "Vrbo", "Google Travel", "Dynamic Pricing", "PMS / Sync"];

const ownerResults = [
  {
    title: "Crete Villa · 4BR",
    metric: "+38% occupancy",
    text: "Switched from single-OTA to Multi-Platform Sync. ADR +17% via seasonal pricing.",
  },
  {
    title: "Mykonos Villa · 5BR",
    metric: "+24% ADR",
    text: "Fully Managed with pro photos & response SLA <30m. Repeat guest share 18%.",
  },
];

const ownerFaqItems = [
  {
    question: "What’s the difference between the three models?",
    answer:
      "Self-Managed: you handle day-to-day ops; we advise. Multi-Platform: we sync channels & pricing; comms are shared. Fully Managed: we run everything end-to-end.",
  },
  {
    question: "How are fees structured?",
    answer:
      "Self-Managed uses a fixed advisory fee. Multi-Platform and Fully Managed are success-based %, adjusted by region, season, and scope.",
  },
  {
    question: "Can I switch models later?",
    answer: "Yes. Many owners start with Multi-Platform and upgrade to Fully Managed before high season.",
  },
];

export function ForOwnersSections() {
  return (
    <>
      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <div className="rounded-[24px] border border-slate-200 bg-white/95 p-5 shadow-sm md:p-6">
          <h2 className="text-[42px] font-semibold tracking-[-0.01em] text-slate-900">How it works</h2>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {ownerHowItWorksSteps.map((step) => (
              <article key={step.title} className="rounded-xl border border-slate-200 bg-white p-4">
                <h3 className="text-[30px] font-semibold leading-none text-slate-900">{step.title}</h3>
                <p className="mt-3 text-[21px] text-slate-700">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <div className="rounded-[24px] border border-slate-200 bg-white/95 p-5 shadow-sm md:p-6">
          <h2 className="text-[42px] font-semibold tracking-[-0.01em] text-slate-900">Choose the management model that fits you</h2>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {ownerModels.map((model) => (
              <article key={model.title} className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="border-b border-slate-200 p-4">
                  <h3 className="text-[34px] font-semibold leading-none text-slate-900">{model.title}</h3>
                  <span className="mt-3 inline-block rounded-full border border-slate-300 px-2 py-1 text-[12px] text-slate-600">{model.badge}</span>
                </div>

                <div className="flex-1 space-y-2.5 p-4">
                  {model.bullets.map((bullet) => (
                    <p key={bullet} className="text-[21px] text-slate-700">✓ {bullet}</p>
                  ))}
                  <p className="pt-1 text-sm text-slate-500">{model.fee}</p>
                </div>

                <div className="border-t border-slate-200 p-4">
                  <div className="flex flex-nowrap items-center gap-3">
                    <button className="whitespace-nowrap rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white">{model.primaryCta}</button>
                    <button className="whitespace-nowrap rounded-xl border border-slate-400 bg-white px-5 py-2.5 text-sm font-medium text-slate-800">Learn more</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <div className="rounded-[24px] border border-slate-200 bg-white/95 p-5 shadow-sm md:p-6">
          <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-6">
            {ownerPartnerPills.map((pill) => (
              <span key={pill} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-center text-sm text-slate-500">
                {pill}
              </span>
            ))}
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {ownerResults.map((result) => (
              <article key={result.title} className="rounded-xl border border-slate-200 bg-white p-4">
                <h3 className="text-[30px] font-semibold leading-none text-slate-900">{result.title}</h3>
                <p className="mt-2 text-[42px] font-semibold leading-none text-emerald-700">{result.metric}</p>
                <p className="mt-3 text-[15px] text-slate-500">{result.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <div className="rounded-[24px] border border-slate-200 bg-white/95 p-5 shadow-sm md:p-6">
          <h2 className="text-[42px] font-semibold tracking-[-0.01em] text-slate-900">Owners FAQ</h2>

          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
            {ownerFaqItems.map((item, idx) => (
              <details key={item.question} className={idx < ownerFaqItems.length - 1 ? "border-b border-slate-200" : ""} open={idx === ownerFaqItems.length - 1}>
                <summary className="cursor-pointer list-none p-4 text-[30px] font-semibold leading-none text-slate-900 marker:content-none">
                  {item.question}
                </summary>
                <div className="px-4 pb-4">
                  <p className="text-[21px] text-slate-700">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-10">
        <div className="rounded-[24px] border border-slate-200 bg-white/95 p-6 text-center shadow-sm md:p-8">
          <h2 className="text-[42px] font-semibold leading-none tracking-[-0.01em] text-slate-900">Ready to see your villa&apos;s true potential?</h2>
          <p className="mt-3 text-[21px] text-slate-700">Get a free evaluation with target occupancy & ADR plan.</p>
          <div className="mt-5">
            <button className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white">Get Free Evaluation</button>
          </div>
        </div>
      </section>
    </>
  );
}
