import Link from "next/link";

const audienceBlocks = [
  {
    title: "For Guests",
    text: "Hand-picked villas with local support, transfers, and activities. Book with confidence.",
    href: "/vacation-assistance",
  },
  {
    title: "For Owners",
    text: "Choose the right management model and grow revenue with transparent reporting.",
    href: "/for-owners",
  },
  {
    title: "Collaborate",
    text: "PMCs, providers, and agents: partner for net pricing, listings, and shared tools.",
    href: "/collaborate",
  },
];

const destinations = [
  { name: "Santorini", tags: ["Luxury", "Romance"], href: "/destinations/santorini" },
  { name: "Crete", tags: ["Family", "Gastronomy"], href: "/destinations/crete" },
  { name: "Mykonos", tags: ["Nightlife", "Beaches"], href: "/destinations/mykonos" },
];

const featuredVillas = [
  {
    name: "Villa Blue Calda",
    details: "Santorini · 4 BR · Pool · Caldera view",
    href: "/destinations/santorini/villa-blue-calda",
  },
  {
    name: "Villa Olive Grove",
    details: "Crete · 5 BR · Family-friendly",
    href: "/destinations/crete/villa-olive-grove",
  },
  {
    name: "Villa Psarou Pearl",
    details: "Mykonos · 3 BR · Near beach clubs",
    href: "/destinations/mykonos/villa-psarou-pearl",
  },
];

const steps = [
  {
    title: "1) Shortlist",
    text: "Browse by destination and dates; we pre-filter options based on your needs.",
  },
  {
    title: "2) Check availability",
    text: "Live availability with transparent rates, terms, and booking policies.",
  },
  {
    title: "3) Add services",
    text: "Transfers, chef, and activities with trusted local partners.",
  },
];

const ctas = [
  {
    title: "Free Owner Evaluation",
    text: "Assess your villa’s earning potential and the right management model.",
    action: "Start evaluation",
    href: "/owners/free-evaluation",
  },
  {
    title: "Trip Planning Call",
    text: "Share your dates and vibe, and get a curated shortlist.",
    action: "Request plan",
    href: "/vacation-assistance",
  },
  {
    title: "Partner Welcome Pack",
    text: "For PMCs, providers, and agents: pricing, tooling, and integration guidance.",
    action: "Get the pack",
    href: "/collaborate",
  },
];

export default function Home() {
  return (
    <main className="bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="text-lg font-semibold tracking-tight text-slate-700">villa4you</div>
          <nav className="hidden gap-6 text-sm text-slate-700 md:flex">
            <Link href="/for-guests">For Guests</Link>
            <Link href="/for-owners">For Owners</Link>
            <Link href="/collaborate">Collaborate</Link>
            <Link href="/about">About</Link>
            <Link href="/support">Support</Link>
            <Link href="/blog">Blog</Link>
          </nav>
          <input
            className="hidden rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm md:block"
            value="Where to or what trip?"
            readOnly
          />
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-2 lg:p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-700">
              Trusted villa stays & management · 18+ years
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
              Find the perfect villa for your vacations in Greece
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              Villa4you connects vetted villas, expert trip planning, and pro property management
              across Greece. Book via Planyo, manage in Kommo, powered by ClickyTour Core.
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">Guests</span>
              <span className="rounded-full bg-rose-50 px-3 py-1 text-rose-700">Owners</span>
              <span className="rounded-full bg-violet-50 px-3 py-1 text-violet-700">Collaborate</span>
            </div>

            <div className="mt-4 flex gap-3">
              <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                Find a Villa
              </button>
              <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium">
                Plan My Trip
              </button>
            </div>

            <div className="mt-5 grid gap-3 rounded-xl border border-slate-200 p-3 sm:grid-cols-5">
              <input className="rounded-lg border border-slate-200 px-3 py-2 text-sm" value="Destination" readOnly />
              <input className="rounded-lg border border-slate-200 px-3 py-2 text-sm" value="Check-in" readOnly />
              <input className="rounded-lg border border-slate-200 px-3 py-2 text-sm" value="Check-out" readOnly />
              <input className="rounded-lg border border-slate-200 px-3 py-2 text-sm" value="Adults" readOnly />
              <button className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white">Search</button>
            </div>

            <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
              <span>⭐ 4.8/5 guest reviews</span>
              <span>🏝️ 6+ top destinations</span>
              <span>🔄 seamless Planyo bookings</span>
            </div>
          </div>

          <aside className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h2 className="text-2xl font-semibold">Quick Request</h2>
            <p className="text-sm text-slate-600">Get a shortlist fast — 60 seconds.</p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="text-sm font-medium">Check-in *<input className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" value="dd/mm/yyyy" readOnly /></label>
              <label className="text-sm font-medium">Check-out *<input className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" value="dd/mm/yyyy" readOnly /></label>
              <label className="text-sm font-medium">Bedrooms *<input className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" value="Please Select" readOnly /></label>
              <label className="text-sm font-medium">Adults *<input className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" value="Please Select" readOnly /></label>
              <label className="text-sm font-medium">Children (3–14 age) *<input className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" value="Please Select" readOnly /></label>
              <label className="text-sm font-medium">Children (0–3 age)<input className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" value="0" readOnly /></label>
              <label className="text-sm font-medium">Distance to the beach<input className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" value="Please Select" readOnly /></label>
              <label className="text-sm font-medium">Distance to infrastructures<input className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" value="Please Select" readOnly /></label>
            </div>

            <div className="mt-4 flex justify-end">
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white">Next</button>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-6 pb-16 md:grid-cols-3">
        {audienceBlocks.map((block) => (
          <Link
            key={block.title}
            href={block.href}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
          >
            <h2 className="text-xl font-semibold">{block.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{block.text}</p>
          </Link>
        ))}
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 md:grid-cols-3">
        {destinations.map((destination) => (
          <Link
            key={destination.name}
            href={destination.href}
            className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
          >
            <h2 className="text-xl font-semibold">{destination.name}</h2>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
              {destination.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-2 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-2xl font-bold">Featured villas</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {featuredVillas.map((villa) => (
            <Link
              key={villa.name}
              href={villa.href}
              className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300"
            >
              <h3 className="font-semibold">{villa.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{villa.details}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-2xl font-bold">How it works</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <article key={step.title} className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="text-2xl font-bold">Start now</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {ctas.map((cta) => (
            <article key={cta.title} className="rounded-2xl bg-sky-900 p-6 text-white">
              <h3 className="font-semibold">{cta.title}</h3>
              <p className="mt-2 text-sm text-sky-100">{cta.text}</p>
              <Link
                href={cta.href}
                className="mt-4 inline-block rounded-lg bg-white px-3 py-2 text-sm font-medium text-sky-900"
              >
                {cta.action}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
