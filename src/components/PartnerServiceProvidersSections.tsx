const providerBenefits = [
  "📌 A clear listing & onboarding flow",
  "🧾 Transparent pricing & plan rules",
  "📣 Promotion tools & templates",
  "🤝 Access to guests, agents, owners",
];

const quickFlags = ["✅ Fast listing", "✅ Clean categories", "⚡ Mobile-optimized", "💬 Support & FAQ"];

const navItems = [
  { title: "Categories", desc: "Choose where your service appears", href: "/partner-service-providers" },
  { title: "List Service", desc: "Create your business profile", href: "/service-apply" },
  { title: "Pricing", desc: "Plans, fees, and visibility options", href: "/plans-offers" },
  { title: "Support", desc: "FAQ and guided onboarding help", href: "/support" },
];

const categories = [
  "Cleaning & Housekeeping",
  "Maintenance & Repairs",
  "Transfers & Mobility",
  "Chefs & Catering",
  "Experiences & Activities",
  "Wellness & Spa",
  "Photography & Media",
  "Concierge Services",
];

export function PartnerServiceProvidersSections() {
  return (
    <>
      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <div className="rounded-[24px] border border-slate-200 bg-white/95 p-5 shadow-sm md:p-6">
          <h2 className="text-[42px] font-semibold tracking-[-0.01em] text-slate-900">ClickyTour.com • Service Providers</h2>
          <p className="mt-3 text-[21px] text-slate-700">
            Grow bookings and visibility with a clear provider path. List your business, reach guests and agents, and offer services to property owners — all from one structured menu.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <div className="grid gap-3 md:grid-cols-2">
          <article className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="text-[30px] font-semibold leading-none text-slate-900">What you get</h3>
            <ul className="mt-3 space-y-2 text-[21px] text-slate-700">
              {providerBenefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="text-[30px] font-semibold leading-none text-slate-900">Quick navigation</h3>
            <p className="mt-2 text-[21px] text-slate-700">These shortcuts match your Service Providers submenu.</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {quickFlags.map((flag) => (
                <div key={flag} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">{flag}</div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <h2 className="text-[42px] font-semibold tracking-[-0.01em] text-slate-900">Provider Navigation — list, offer, grow</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          {navItems.map((item) => (
            <a key={item.title} href={item.href} className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-400">
              <h3 className="text-[30px] font-semibold leading-none text-slate-900">{item.title}</h3>
              <p className="mt-2 text-[19px] text-slate-700">{item.desc}</p>
              <p className="mt-3 text-sm font-medium text-slate-900">Open →</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <div className="rounded-[24px] border border-slate-200 bg-white/95 p-5 shadow-sm md:p-6">
          <h2 className="text-[42px] font-semibold tracking-[-0.01em] text-slate-900">Service categories (for this market)</h2>
          <p className="mt-2 text-[21px] text-slate-700">Choose the category that matches what you sell. Subcategories help guests and owners filter faster.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {categories.map((cat) => (
              <div key={cat} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">{cat}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-10">
        <div className="rounded-[24px] border border-slate-200 bg-white/95 p-6 text-center shadow-sm md:p-8">
          <h2 className="text-[42px] font-semibold leading-none tracking-[-0.01em] text-slate-900">Ready to join as a provider?</h2>
          <p className="mt-3 text-[21px] text-slate-700">Create your listing or request free guidance and we’ll walk you through setup.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a href="/service-apply" className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white">List your service</a>
            <a href="/free-evaluation" className="rounded-xl border border-slate-400 bg-white px-5 py-2.5 text-sm font-medium text-slate-800">Request free evaluation</a>
          </div>
        </div>
      </section>
    </>
  );
}
