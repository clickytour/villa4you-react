import Link from "next/link";

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
          <div className="text-lg font-semibold tracking-tight text-sky-900">Villa4you</div>
          <nav className="hidden gap-6 text-sm text-slate-700 md:flex">
            <Link href="/destinations">Destinations</Link>
            <Link href="/listing">Villas</Link>
            <Link href="/for-owners">For owners</Link>
            <Link href="/collaborate">Collaborate</Link>
          </nav>
          <Link
            href="/vacation-assistance"
            className="rounded-lg bg-sky-900 px-3 py-2 text-sm font-medium text-white"
          >
            Plan your trip
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
          Trusted villa stays & management · 18+ years
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
          Find the perfect villa for your vacations in Greece
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-slate-600">
          Villa4you connects vetted villas, expert trip planning, and professional property
          management across Greece. Book with confidence and get local support where it matters.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-white px-4 py-2 shadow-sm">⭐ 4.8/5 guest reviews</span>
          <span className="rounded-full bg-white px-4 py-2 shadow-sm">🏝️ 6+ destinations</span>
          <span className="rounded-full bg-white px-4 py-2 shadow-sm">🔄 seamless bookings</span>
        </div>
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

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Villa4you. Homepage React pilot.</p>
          <p>Next step: responsive polish + exact content parity + API form wiring.</p>
        </div>
      </footer>
    </main>
  );
}
