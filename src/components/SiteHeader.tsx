const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/for-guests", label: "For Guests" },
  { href: "/for-owners", label: "For Owners" },
  { href: "/support", label: "Support" },
  { href: "/about", label: "About" },
];

const collaborateSubmenu = [
  { href: "/partner-pmc", label: "Partner PMC" },
  { href: "/partner-service-providers", label: "Service Providers" },
  { href: "/agents", label: "Agents" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <a href="/" className="text-lg font-semibold text-slate-900">
            Villa4you React
          </a>
          <a href="/service-apply" className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white">
            List Your Service
          </a>
        </div>

        <nav className="flex flex-wrap items-center gap-2" aria-label="Primary">
          {primaryNav.map((item) => (
            <a key={item.href} href={item.href} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 hover:border-slate-300">
              {item.label}
            </a>
          ))}

          <details className="group relative">
            <summary className="list-none cursor-pointer rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm text-blue-900 hover:border-blue-300">
              Collaborate ▾
            </summary>
            <div className="absolute left-0 top-[110%] z-50 hidden min-w-[220px] rounded-xl border border-slate-200 bg-white p-2 shadow-lg group-open:block">
              <a href="/collaborate" className="block rounded-lg px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50">Collaborate Hub</a>
              {collaborateSubmenu.map((item) => (
                <a key={item.href} href={item.href} className="block rounded-lg px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
                  {item.label}
                </a>
              ))}
            </div>
          </details>
        </nav>
      </div>
    </header>
  );
}
