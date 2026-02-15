type NavItem = {
  href: string;
  label: string;
  submenu?: { href: string; label: string; draft?: boolean }[];
};

const primaryNav: NavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/for-guests",
    label: "For Guests",
    submenu: [
      { href: "/for-guests", label: "For Guests Hub" },
      { href: "/search-results-page-for-guests", label: "Search Results" },
      { href: "/destinations", label: "Destinations" },
      { href: "/explore-map", label: "Explore Map" },
      { href: "/guest-help-faq", label: "Guest Help FAQ" },
      { href: "/plans-offers", label: "Plans & Offers" },
    ],
  },
  {
    href: "/for-owners",
    label: "For Owners",
    submenu: [
      { href: "/for-owners", label: "For Owners Hub" },
      { href: "/vacation-property-management", label: "Vacation Property Management" },
      { href: "/free-evaluation", label: "Free Evaluation" },
    ],
  },
  {
    href: "/collaborate",
    label: "Collaborate",
    submenu: [
      { href: "/collaborate", label: "Collaborate Hub" },
      { href: "/partner-pmc", label: "Partner PMC" },
      { href: "/pmc-apply", label: "PMC Apply", draft: true },
      { href: "/partner-service-providers", label: "Service Providers" },
      { href: "/service-apply", label: "Service Apply", draft: true },
      { href: "/agents", label: "Agents" },
      { href: "/agents-apply", label: "Agents Apply", draft: true },
    ],
  },
  { href: "/support", label: "Support" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <a href="/" className="text-lg font-semibold text-slate-900">
            Villa4you React
          </a>
          <div className="flex items-center gap-2">
            <a href="/all-pages" className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700">
              All Pages (QA)
            </a>
            <a href="/free-evaluation" className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white">
              Evaluate Your Property
            </a>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-2" aria-label="Primary">
          {primaryNav.map((item) =>
            item.submenu ? (
              <details key={item.href} className="group relative">
                <summary className="list-none cursor-pointer rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm text-blue-900 hover:border-blue-300">
                  {item.label} ▾
                </summary>
                <div className="absolute left-0 top-[110%] z-50 hidden min-w-[280px] rounded-xl border border-slate-200 bg-white p-2 shadow-lg group-open:block">
                  {item.submenu.map((sub) => (
                    <a key={sub.href} href={sub.href} className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
                      <span>{sub.label}</span>
                      {sub.draft && <span className="rounded border border-amber-300 bg-amber-50 px-1.5 py-0.5 text-[10px] text-amber-700">Draft</span>}
                    </a>
                  ))}
                </div>
              </details>
            ) : (
              <a key={item.href} href={item.href} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 hover:border-slate-300">
                {item.label}
              </a>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
