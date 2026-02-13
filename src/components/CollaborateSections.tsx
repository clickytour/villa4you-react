const topTrustCards = [
  { title: "18+ yrs", text: "Hospitality & villas" },
  { title: "Multi-channel", text: "Distribution & pricing" },
  { title: "Net rates", text: "For agents/affiliates" },
  { title: "On-the-ground", text: "Ops partners & support" },
];

const pathCards = [
  {
    title: "Property Management Companies (PMC)",
    text: "Increase portfolio bookings with our multi-platform distribution, revenue tools, and ready-to-go content kit.",
    bullets: [
      "Channel distribution & pricing automation",
      "Owner reporting & content standards",
      "Lead sharing in covered regions",
    ],
    primary: "Learn more",
    secondary: "Apply",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Service & Business Providers",
    text: "List and promote your services (cleaning, maintenance, transfers, catering, activities) to villa owners & guests.",
    bullets: [
      "Directory listing & category pages",
      "Lead routing per destination",
      "Optional sponsored placements",
    ],
    primary: "Explore",
    secondary: "List your business",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Agents & Affiliates",
    text: "Access net rates & book villas for clients. Use our tools or white-label minisite—get paid per booking.",
    bullets: [
      "Net pricing & hold options",
      "White-label offer links",
      "Real-time availability via Planyo",
    ],
    primary: "View program",
    secondary: "Join now",
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop",
  },
];

const steps = [
  {
    title: "1) Pick a track",
    text: "Choose PMC, Provider, or Agent. We’ll tailor onboarding to your role.",
  },
  {
    title: "2) Verify & set up",
    text: "Complete the short form; we confirm scope, regions, and access.",
  },
  {
    title: "3) Launch",
    text: "Get tools, net rates (if applicable), and start receiving leads or bookings.",
  },
];

const bottomTrustCards = [
  { title: "Verified", text: "Partners directory" },
  { title: "SLA-backed", text: "Response times" },
  { title: "GDPR", text: "Data processing" },
  { title: "ClickyTour", text: "Ecosystem tools" },
];

const faqItems = [
  {
    q: "Which regions can I cover?",
    a: "Crete, Halkidiki, Santorini, Athens, Mykonos, Paros. Ask us about expanding regions via partners.",
  },
  {
    q: "How are leads routed?",
    a: "We route by destination, category, and SLA. Providers receive contact details; PMCs receive owner/guest leads per scope.",
  },
  {
    q: "How do agents earn?",
    a: "Agents get net pricing on eligible villas or a commission plan on confirmed bookings. Details on the Agents page.",
  },
  {
    q: "Is there a fee?",
    a: "Listing is free for basic provider profiles; sponsored placements and advanced tools are optional add-ons.",
  },
];

export function CollaborateSections() {
  return (
    <>
      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <div className="grid gap-3 md:grid-cols-4">
          {topTrustCards.map((card) => (
            <article key={card.title} className="rounded-xl border border-slate-300 bg-white px-4 py-3">
              <h3 className="text-[42px] font-semibold leading-none text-slate-900">{card.title}</h3>
              <p className="mt-1 text-[21px] text-slate-500">{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <h2 className="text-[42px] font-semibold tracking-[-0.01em] text-slate-900">Choose your path</h2>
        <p className="mt-2 text-[22px] text-slate-600">Three straightforward collaboration tracks. Pick one—or combine.</p>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {pathCards.map((card) => (
            <article key={card.title} className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-300 bg-white">
              {card.image ? (
                <img src={card.image} alt={card.title} className="h-[260px] w-full object-cover" />
              ) : (
                <div className="h-[260px] w-full bg-slate-200" />
              )}
              <div className="flex-1 p-4">
                <h3 className="text-[34px] font-semibold leading-none text-slate-900">{card.title}</h3>
                <p className="mt-3 text-[21px] text-slate-700">{card.text}</p>
                <ul className="mt-3 list-disc space-y-1 pl-6 text-[21px] text-slate-800">
                  {card.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-2 border-t border-slate-300 p-4">
                <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">{card.primary}</button>
                <button className="rounded-xl border border-slate-800 bg-white px-4 py-2 text-sm font-medium text-slate-900">{card.secondary}</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <h2 className="text-[42px] font-semibold tracking-[-0.01em] text-slate-900">How collaboration works</h2>
        <p className="mt-2 text-[22px] text-slate-600">Simple steps—clear terms—fast onboarding.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {steps.map((step) => (
            <article key={step.title} className="rounded-xl border border-slate-300 bg-white p-4">
              <h3 className="text-[34px] font-semibold leading-none text-slate-900">{step.title}</h3>
              <p className="mt-3 text-[21px] text-slate-700">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <div className="grid gap-3 md:grid-cols-4">
          {bottomTrustCards.map((card) => (
            <article key={card.title} className="rounded-xl border border-slate-300 bg-white px-4 py-3">
              <h3 className="text-[42px] font-semibold leading-none text-slate-900">{card.title}</h3>
              <p className="mt-1 text-[21px] text-slate-500">{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <div className="rounded-2xl border border-slate-300 bg-white px-4 py-6 text-center">
          <h2 className="text-[56px] font-semibold leading-none text-slate-900">Ready to collaborate?</h2>
          <p className="mt-3 text-[22px] text-slate-600">Tell us your role and region—we’ll get you set up this week.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <button className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white">Apply as PMC</button>
            <button className="rounded-xl border border-slate-800 bg-white px-5 py-2.5 text-sm font-medium text-slate-900">List your business</button>
            <button className="rounded-xl border border-slate-800 bg-white px-5 py-2.5 text-sm font-medium text-slate-900">Join as Agent</button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-10">
        <h2 className="text-[42px] font-semibold tracking-[-0.01em] text-slate-900">Frequently asked questions</h2>
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-300 bg-white">
          {faqItems.map((item, idx) => (
            <details key={item.q} className={idx < faqItems.length - 1 ? "border-b border-slate-300" : ""} open={idx === faqItems.length - 1}>
              <summary className="cursor-pointer list-none px-4 py-3 text-[30px] font-semibold text-slate-900 marker:content-none">
                {item.q}
              </summary>
              <p className="px-4 pb-4 text-[21px] text-slate-700">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
