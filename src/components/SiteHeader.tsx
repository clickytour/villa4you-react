"use client";

import { useEffect, useState } from "react";

type SubmenuItem = {
  label: string;
  href?: string;
  draft?: boolean;
  disabled?: boolean;
  separator?: boolean;
  sectionLabel?: boolean;
};

type NavItem = {
  href: string;
  label: string;
  submenu?: SubmenuItem[];
};

const primaryNav: NavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/for-guests",
    label: "For Guests",
    submenu: [
      { href: "/for-guests", label: "For Guests Hub" },
      { href: "/search", label: "Search" },
      { href: "/search-results-page-for-guests", label: "Guest Search Results" },
      { href: "/explore-map", label: "Explore Map" },
      { href: "/guest-help-faq", label: "Guest Help FAQ" },
      { href: "/plans-offers", label: "Plans & Offers" },
      { href: "/testimonials", label: "Testimonials" },
    ],
  },
  {
    href: "/destinations",
    label: "Destinations",
    submenu: [
      { href: "/destinations", label: "Destinations Hub" },
      { separator: true, label: "separator" },
      { sectionLabel: true, label: "Halkidiki" },
      { href: "/luxury-suites-elsa", label: "Luxury Suites Elsa" },
      { href: "/galini-beachfront-masonettes-complex", label: "Galini Beachfront Masonettes" },
      { href: "/olea-suites-apartments-complex", label: "Olea Suites Apartments" },
      { href: "/deluxe-suites-bomo", label: "Deluxe Suites Bomo" },
      { href: "/simonitiko-beachfront-villas-complex", label: "Simonitiko Beachfront Villas" },
      { href: "/tripotsmos-beachfront-complex-a", label: "Tripotsmos Beachfront Complex A" },
      { href: "/tripotamos-beachfront-villas-complex-b", label: "Tripotamos Beachfront Villas Complex B" },
      { href: "/afitos-kassandra-halkidiki", label: "Afitos Kassandra Halkidiki" },
      { href: "/complexes-sani-club-private-villas", label: "Sani Club Private Villas" },
      { sectionLabel: true, label: "Myconos" },
      { sectionLabel: true, label: "Crete (coming soon)", disabled: true },
    ],
  },
  {
    href: "/for-owners",
    label: "For Owners",
    submenu: [
      { href: "/for-owners", label: "For Owners Hub" },
      { href: "/vacation-property-management", label: "Vacation Property Management" },
      { href: "/free-evaluation", label: "Free Evaluation" },
      { href: "/tools/vacation-owner-calculator", label: "Revenue Calculator" },
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
  {
    href: "/support",
    label: "Support",
    submenu: [
      { href: "/support", label: "Support Hub" },
      { href: "/contact", label: "Contact" },
    ],
  },
  { href: "/tools", label: "Tools" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

function SubmenuEntry({ sub }: { sub: SubmenuItem }) {
  if (sub.separator) {
    return <div className="my-1 border-t border-slate-200" aria-hidden="true" />;
  }

  if (sub.sectionLabel || sub.disabled || !sub.href) {
    return (
      <div className={`rounded-lg px-2 py-1.5 text-sm ${sub.disabled ? "text-slate-400" : "font-semibold text-slate-500"}`}>
        {sub.label}
      </div>
    );
  }

  return (
    <a href={sub.href} className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
      <span>{sub.label}</span>
      {sub.draft && <span className="rounded border border-amber-300 bg-amber-50 px-1.5 py-0.5 text-[10px] text-amber-700">Draft</span>}
    </a>
  );
}

export function SiteHeader() {
  const [showQaPages, setShowQaPages] = useState(process.env.NODE_ENV === "development");

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setShowQaPages(true);
      return;
    }

    const getHostname = (value?: string) => {
      if (!value) return "";

      try {
        return new URL(value).hostname.toLowerCase();
      } catch {
        return value.toLowerCase();
      }
    };

    const envHostname = getHostname(process.env.NEXT_PUBLIC_SITE_URL);
    const runtimeHostname = window.location.hostname.toLowerCase();
    const hostnames = `${envHostname} ${runtimeHostname}`;

    setShowQaPages(
      hostnames.includes("staging") ||
        hostnames.includes("localhost") ||
        hostnames.includes("vercel.app")
    );
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-[1280px] px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <a href="/" className="text-lg font-semibold text-slate-900">
            Villa4you React
          </a>

          <div className="hidden items-center gap-2 md:flex">
            {showQaPages && (
              <a href="/qa" className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-900 hover:border-amber-400">
                All Pages (QA)
              </a>
            )}

            <details className="group relative">
              <summary className="list-none cursor-pointer rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white">
                Evaluate Your Property ▾
              </summary>
              <div className="absolute right-0 top-[110%] z-50 hidden min-w-[250px] rounded-xl border border-slate-200 bg-white p-2 shadow-lg group-open:block">
                <a href="/free-evaluation" className="block rounded-lg px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50">List Property / Free Evaluation</a>
                <a href="/pmc-apply" className="block rounded-lg px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50">Apply as PMC</a>
                <a href="/service-apply" className="block rounded-lg px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50">List Your Service</a>
                <a href="/agents-apply" className="block rounded-lg px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50">Join as Agent</a>
              </div>
            </details>
          </div>

          <details className="group relative md:hidden">
            <summary className="list-none cursor-pointer rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-800">
              Menu ☰
            </summary>
            <div className="absolute right-0 top-[110%] z-50 w-[92vw] max-w-[360px] rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
              <div className="space-y-2">
                {showQaPages && (
                  <a href="/qa" className="block rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-900">
                    All Pages (QA)
                  </a>
                )}

                <details className="group/sub rounded-lg border border-slate-200">
                  <summary className="list-none cursor-pointer px-3 py-2 text-sm font-medium text-slate-900">Evaluate Your Property ▾</summary>
                  <div className="space-y-1 px-2 pb-2">
                    <a href="/free-evaluation" className="block rounded-lg px-2 py-2 text-sm text-slate-700 hover:bg-slate-50">List Property / Free Evaluation</a>
                    <a href="/pmc-apply" className="block rounded-lg px-2 py-2 text-sm text-slate-700 hover:bg-slate-50">Apply as PMC</a>
                    <a href="/service-apply" className="block rounded-lg px-2 py-2 text-sm text-slate-700 hover:bg-slate-50">List Your Service</a>
                    <a href="/agents-apply" className="block rounded-lg px-2 py-2 text-sm text-slate-700 hover:bg-slate-50">Join as Agent</a>
                  </div>
                </details>

                {primaryNav.map((item) =>
                  item.submenu ? (
                    <details key={item.href} className="rounded-lg border border-slate-200">
                      <summary className="list-none cursor-pointer px-3 py-2 text-sm font-medium text-slate-900">{item.label} ▾</summary>
                      <div className="space-y-1 px-2 pb-2">
                        {item.submenu.map((sub) => (
                          <SubmenuEntry key={`${item.href}-${sub.label}-${sub.href ?? "nolink"}`} sub={sub} />
                        ))}
                      </div>
                    </details>
                  ) : (
                    <a key={item.href} href={item.href} className="block rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700">
                      {item.label}
                    </a>
                  )
                )}
              </div>
            </div>
          </details>
        </div>

        <nav className="mt-3 hidden flex-wrap items-center gap-2 md:flex" aria-label="Primary">
          {primaryNav.map((item) =>
            item.submenu ? (
              <details key={item.href} className="group relative">
                <summary className="list-none cursor-pointer rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm text-blue-900 hover:border-blue-300">
                  {item.label} ▾
                </summary>
                <div className="absolute left-0 top-[110%] z-50 hidden min-w-[280px] rounded-xl border border-slate-200 bg-white p-2 shadow-lg group-open:block">
                  {item.submenu.map((sub) => (
                    <SubmenuEntry key={`${item.href}-${sub.label}-${sub.href ?? "nolink"}`} sub={sub} />
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
