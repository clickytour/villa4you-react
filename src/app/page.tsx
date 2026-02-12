import Link from "next/link";

const audienceBlocks = [
  {
    title: "For Guests",
    text: "Hand-picked villas with local support, transfers, and activities. Book with confidence.",
    href: "/vacation-assistance",
    image:
      "https://images.unsplash.com/photo-1505483531331-379b6c0cf8a0?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "For Owners",
    text: "Choose the right management model and grow revenue with transparent reporting.",
    href: "/for-owners",
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Collaborate",
    text: "PMCs, providers, and agents: partner for net pricing, listings, and shared tools.",
    href: "/collaborate",
    image:
      "https://images.unsplash.com/photo-1527104772451-159ad4df4b47?q=80&w=1200&auto=format&fit=crop",
  },
];

const heroFields = [
  "Destination",
  "Check-in",
  "Check-out",
  "Adults",
  "Children (3–14 age)",
  "Children (0–3 age)",
  "Distance to beach",
  "Distance to infrastructures",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#090A0E] text-white">
      <div className="mx-auto max-w-[1280px] px-4 pb-20 pt-6 md:px-8 md:pt-10">
        <section className="rounded-[24px] border border-white/20 bg-[radial-gradient(circle_at_15%_10%,#141a2d_0%,#0b0d13_50%,#090a0e_100%)] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] md:p-6 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-8">
            <div>
              <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-emerald-300">
                Trusted villa stays & management · 18+ years
              </p>
              <h1 className="mt-3 max-w-[16ch] text-[44px] font-semibold leading-[1.08] tracking-[-0.02em] text-white md:text-[56px] md:leading-[1.06]">
                Find the perfect villa for your vacations in Greece
              </h1>
              <p className="mt-4 max-w-[34ch] text-[20px] leading-[1.35] text-white/80 md:text-[24px]">
                Vetted homes, local trip planning, and trusted support for seamless stays across top Greek destinations.
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <span className="rounded-full border border-emerald-300/70 bg-emerald-400/15 px-5 py-2.5 text-[16px] font-semibold text-emerald-200">Guests</span>
                <span className="rounded-full border border-pink-300/60 bg-pink-400/10 px-5 py-2.5 text-[16px] font-semibold text-pink-200">Owners</span>
                <span className="rounded-full border border-fuchsia-300/60 bg-fuchsia-400/10 px-5 py-2.5 text-[16px] font-semibold text-fuchsia-200">Collaborate</span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <button className="h-[52px] rounded-[14px] bg-black text-[20px] font-medium text-[#f5e680] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
                  Find a Villa
                </button>
                <button className="h-[52px] rounded-[14px] border border-white/50 bg-white/5 text-[20px] font-medium text-[#f5e680]">
                  Plan My Trip
                </button>
              </div>

              <div className="mt-5 rounded-[16px] border border-white/25 bg-black/25 p-3.5 md:p-4">
                <div className="grid gap-2.5 md:grid-cols-[2fr_1fr_1fr_0.8fr_auto]">
                  <input className="h-[52px] rounded-xl border border-white/20 bg-white/10 px-4 text-[18px] text-white/90 placeholder:text-white/55" placeholder="Type a place (e.g., Santorini, Paros)" />
                  <input className="h-[52px] rounded-xl border border-white/20 bg-white/10 px-4 text-[17px] text-white/90 placeholder:text-white/55" placeholder="dd/mm/yyyy" />
                  <input className="h-[52px] rounded-xl border border-white/20 bg-white/10 px-4 text-[17px] text-white/90 placeholder:text-white/55" placeholder="dd/mm/yyyy" />
                  <input className="h-[52px] rounded-xl border border-white/20 bg-white/10 px-4 text-[17px] text-white/90 placeholder:text-white/55" defaultValue="2" />
                  <button className="h-[52px] rounded-xl bg-black px-5 text-[20px] font-medium text-white">Search</button>
                </div>
                <p className="mt-3 text-[13px] text-white/65">Tip: this destination will also be included in the Quick Request.</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-[20px] text-white/85">
                <span>⭐ 4.8/5 guest reviews</span>
                <span>🏝️ 6+ top destinations</span>
              </div>
            </div>

            <aside className="rounded-[20px] border border-white/25 bg-white/5 p-4 backdrop-blur md:p-5">
              <h2 className="text-[34px] font-semibold leading-none">Quick Request</h2>
              <p className="mt-1 text-sm text-white/70">Get a shortlist fast — 60 seconds.</p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {heroFields.map((label) => (
                  <label key={label} className="text-[14px] font-semibold text-white/90">
                    {label}
                    <input
                      className="mt-1.5 h-[52px] w-full rounded-xl border border-white/25 bg-black/30 px-3 text-[16px] text-white/90 placeholder:text-white/60"
                      placeholder={label.includes("Children (0") ? "0" : "Please Select"}
                    />
                  </label>
                ))}
              </div>

              <div className="mt-4 flex justify-end">
                <button className="h-12 min-w-[88px] rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white">Next</button>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {audienceBlocks.map((block) => (
            <Link
              key={block.title}
              href={block.href}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:-translate-y-0.5"
            >
              <div className="h-40 w-full bg-cover bg-center" style={{ backgroundImage: `url(${block.image})` }} />
              <div className="p-5">
                <h3 className="text-xl font-semibold">{block.title}</h3>
                <p className="mt-2 text-sm text-white/75">{block.text}</p>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
