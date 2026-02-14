const trustCards = [
  { title: "2 growth paths", text: "List inventory + sell network properties" },
  { title: "Owner matching", text: "New owner leads in your operating area" },
  { title: "White-label", text: "No-logo proposals (PDF/link)" },
  { title: "Net pricing", text: "Optional agent resale model" },
];

const pathCards = [
  {
    title: "Path A — List your properties on ClickyTour",
    text: "Get more booking requests by distributing your inventory to ClickyTour demand + verified agent/broker network.",
    bullets: [
      "Increase occupancy from ClickyTour visibility + partners",
      "Enable white-label offers to close owner & guest deals faster",
      "Optional: allow agents to book using net pricing",
    ],
    cta: "Open bookings path",
    href: "/pmc-apply",
  },
  {
    title: "Path B — Sell/Rent network properties to your clients",
    text: "Expand your sellable portfolio by using ClickyTour network inventory and smart offer tools.",
    bullets: [
      "Use pool inventory to answer more client requests",
      "Generate quick offers with your own branding",
      "Close faster with shareable links or PDF exports",
    ],
    cta: "Open showcase path",
    href: "/collaborate",
  },
];

const ecosystemSteps = [
  {
    title: "1) Owner requests help",
    text: "Owner submits a property request and ClickyTour verifies basic listing fit.",
  },
  {
    title: "2) Region-based match",
    text: "You receive a match when the owner is in your operating area and service profile.",
  },
  {
    title: "3) You close agreement",
    text: "You contact the owner directly and close the management agreement.",
  },
];

const valueCards = [
  {
    title: "📌 Portfolio growth",
    subtitle: "Owner matching + inbound leads",
    text: "Get connected with owners in your region who need management and expand your managed units.",
  },
  {
    title: "📣 Sales tools",
    subtitle: "White-label showcase",
    text: "Send no-logo proposals (PDF/link) to win new contracts and close guest deals faster.",
  },
  {
    title: "⚙️ Operations",
    subtitle: "Dashboard + channels + tools",
    text: "Centralize bookings, payouts, communications, channel sync, and reporting in one PMC workspace.",
  },
];

const whoCards = [
  {
    title: "🏢 Small to Medium Management Companies",
    text: "Grow customers fast by listing your inventory and enabling structured distribution.",
  },
  {
    title: "🌍 Regional Vacation Managers",
    text: "Expand your managed area with owner matching and pool bookings.",
  },
  {
    title: "🏙️ Real Estate Agencies with Rental Division",
    text: "Sell/rent properties using white-label offers and network inventory.",
  },
];

const navCards = [
  { title: "Grow", desc: "Grow Your Portfolio", meta: "Owner leads + matching + white-label", href: "/partner-pmc" },
  { title: "Bookings", desc: "Increase Bookings", meta: "Pool exposure + agents + listings", href: "/pmc-apply" },
  { title: "Operate", desc: "Manage & Operate", meta: "Dashboard → Channels → Tools → Reports", href: "/support" },
  { title: "Showcase", desc: "White-label Showcase", meta: "No-logo proposals to win deals", href: "/collaborate" },
  { title: "Agents", desc: "Allow Agents (Net Pricing)", meta: "Agents resell, you receive net payout", href: "/collaborate" },
  { title: "Help", desc: "Help & Support", meta: "FAQ + plans + support routes", href: "/support" },
];

const joinSteps = [
  {
    title: "✅ Step 1 — Register as a PMC",
    text: "Submit your PMC request so we can validate regions, services, and portfolio profile.",
  },
  {
    title: "🏠 Step 2 — Add / List Properties",
    text: "Publish your inventory for ClickyTour demand and partner visibility.",
  },
  {
    title: "🚀 Step 3 — Start Sharing, Booking, Growing",
    text: "Use white-label proposals, pool inventory, and agent net pricing to grow faster.",
  },
];

const faqItems = [
  {
    q: "How do we get new properties from ClickyTour?",
    a: "When owners list properties in your operating area and profile, ClickyTour can route matched leads to your PMC for direct follow-up.",
  },
  {
    q: "What is the white-label showcase?",
    a: "It is a one-click offer system to share proposals with your branding (or no-logo), including pricing, property details, and terms via PDF or link.",
  },
  {
    q: "Can agents book our properties?",
    a: "Yes. You can optionally enable agent booking on net pricing terms so agents can resell while you receive your net payout.",
  },
];

export function PartnerPmcSections() {
  return (
    <>
      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <div className="rounded-[24px] border border-slate-200 bg-white/95 p-5 shadow-sm md:p-6">
          <h2 className="text-[42px] font-semibold tracking-[-0.01em] text-slate-900">Grow your portfolio and bookings — with a structured PMC path</h2>
          <p className="mt-3 text-[21px] text-slate-700">
            Two powerful ways to grow: (1) list your properties to get more customers from ClickyTour demand + agent network, and
            (2) sell/rent ClickyTour network properties to your clients to expand your portfolio.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <div className="grid gap-3 md:grid-cols-4">
          {trustCards.map((card) => (
            <article key={card.title} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
              <h3 className="text-[34px] font-semibold leading-none text-slate-900">{card.title}</h3>
              <p className="mt-1 text-[19px] text-slate-600">{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <h2 className="text-[42px] font-semibold tracking-[-0.01em] text-slate-900">Choose your goal</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {pathCards.map((card) => (
            <article key={card.title} className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="text-[30px] font-semibold leading-none text-slate-900">{card.title}</h3>
              <p className="mt-3 text-[21px] text-slate-700">{card.text}</p>
              <ul className="mt-3 list-disc space-y-1 pl-6 text-[19px] text-slate-800">
                {card.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <div className="mt-auto pt-4">
                <a href={card.href} className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white">
                  {card.cta}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <div className="rounded-[24px] border border-slate-200 bg-white/95 p-5 shadow-sm md:p-6">
          <h2 className="text-[42px] font-semibold tracking-[-0.01em] text-slate-900">PMC ecosystem: list properties, send no-logo presentations, grow customers and portfolio</h2>
          <p className="mt-2 text-[21px] text-slate-700">Get matched with new properties (Owners → PMC)</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {ecosystemSteps.map((step) => (
              <article key={step.title} className="rounded-xl border border-slate-200 bg-white p-4">
                <h3 className="text-[30px] font-semibold leading-none text-slate-900">{step.title}</h3>
                <p className="mt-3 text-[21px] text-slate-700">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <h2 className="text-[42px] font-semibold tracking-[-0.01em] text-slate-900">What you get</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {valueCards.map((card) => (
            <article key={card.title} className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="text-[30px] font-semibold leading-none text-slate-900">{card.title}</h3>
              <p className="mt-2 text-sm font-semibold text-slate-500">{card.subtitle}</p>
              <p className="mt-3 text-[21px] text-slate-700">{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <div className="rounded-[24px] border border-slate-200 bg-white/95 p-5 shadow-sm md:p-6">
          <h2 className="text-[42px] font-semibold tracking-[-0.01em] text-slate-900">We&apos;re built for professionals like you</h2>
          <p className="mt-2 text-[21px] text-slate-700">Who Can Work With Us? If you manage multiple properties — this path is designed for you.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {whoCards.map((card) => (
              <article key={card.title} className="rounded-xl border border-slate-200 bg-white p-4">
                <h3 className="text-[30px] font-semibold leading-none text-slate-900">{card.title}</h3>
                <p className="mt-3 text-[21px] text-slate-700">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <div className="rounded-[24px] border border-slate-200 bg-white/95 p-5 shadow-sm md:p-6">
          <h2 className="text-[42px] font-semibold tracking-[-0.01em] text-slate-900">Smart Offer System — One-Click Offers. No Extra Work.</h2>
          <p className="mt-2 text-[21px] text-slate-700">Generate and share offers with your branding instantly. Save 30+ minutes per lead using automated templates and filters.</p>
          <ul className="mt-3 list-disc space-y-1 pl-6 text-[19px] text-slate-800">
            <li>Add your logo or send without branding (no ClickyTour logo)</li>
            <li>Include pricing, property details, and guest terms</li>
            <li>Share via link or export as PDF</li>
          </ul>
          <p className="mt-3 text-sm text-slate-600">Tip: use white-label offers to win owner contracts and close guest deals faster — with the same tool.</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <h2 className="text-[42px] font-semibold tracking-[-0.01em] text-slate-900">Quick navigation</h2>
        <p className="mt-2 text-[21px] text-slate-700">Shortcuts that match your PMC submenu.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {navCards.map((card) => (
            <a key={card.title} href={card.href} className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-400">
              <p className="text-sm font-semibold uppercase tracking-[0.04em] text-slate-500">{card.title}</p>
              <h3 className="mt-1 text-[30px] font-semibold leading-none text-slate-900">{card.desc}</h3>
              <p className="mt-2 text-[19px] text-slate-700">{card.meta}</p>
              <p className="mt-3 text-sm font-medium text-slate-900">Open →</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <h2 className="text-[42px] font-semibold tracking-[-0.01em] text-slate-900">Join in 3 easy steps</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {joinSteps.map((step) => (
            <article key={step.title} className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="text-[30px] font-semibold leading-none text-slate-900">{step.title}</h3>
              <p className="mt-3 text-[21px] text-slate-700">{step.text}</p>
            </article>
          ))}
        </div>
        <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          Matching note: If an owner lists a property in your operating area, ClickyTour can route the lead to you so you can manage the property directly.
        </p>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <div className="rounded-[24px] border border-blue-200 bg-white/95 p-5 shadow-sm md:p-6">
          <h2 className="text-[42px] font-semibold tracking-[-0.01em] text-slate-900">FAQ preview</h2>
          <p className="mt-2 text-[21px] text-slate-700">Quick answers. Open the full FAQ for everything.</p>
          <div className="mt-4 overflow-hidden rounded-xl border border-blue-200 bg-white">
            {faqItems.map((item, idx) => (
              <details key={item.q} className={idx < faqItems.length - 1 ? "border-b border-blue-200" : ""}>
                <summary className="cursor-pointer list-none px-4 py-3 text-[30px] font-semibold text-slate-900 marker:content-none">{item.q}</summary>
                <p className="px-4 pb-4 text-[21px] text-slate-700">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-10">
        <div className="rounded-[24px] border border-slate-200 bg-white/95 p-6 text-center shadow-sm md:p-8">
          <h2 className="text-[42px] font-semibold leading-none tracking-[-0.01em] text-slate-900">Ready to partner? Start your PMC pathway</h2>
          <p className="mt-3 text-[21px] text-slate-700">Grow your portfolio, unlock extra bookings, and centralize operations with a clean ClickyTour workflow.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a href="/pmc-apply" className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white">Apply as PMC</a>
            <a href="/collaborate" className="rounded-xl border border-slate-400 bg-white px-5 py-2.5 text-sm font-medium text-slate-800">Explore collaboration</a>
            <a href="/support" className="rounded-xl border border-slate-400 bg-white px-5 py-2.5 text-sm font-medium text-slate-800">Help & support</a>
          </div>
        </div>
      </section>
    </>
  );
}
