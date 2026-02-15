const groups = [
  {
    title: "For Guests",
    links: [
      ["/for-guests", "For Guests Hub"],
      ["/search-results-page-for-guests", "Search Results"],
      ["/destinations", "Destinations"],
      ["/explore-map", "Explore Map"],
      ["/guest-help-faq", "Guest Help FAQ"],
      ["/plans-offers", "Plans & Offers"],
    ],
  },
  {
    title: "For Owners",
    links: [
      ["/for-owners", "For Owners Hub"],
      ["/vacation-property-management", "Vacation Property Management"],
      ["/free-evaluation", "Free Evaluation"],
    ],
  },
  {
    title: "Collaborate",
    links: [
      ["/collaborate", "Collaborate Hub"],
      ["/partner-pmc", "Partner PMC"],
      ["/pmc-apply", "PMC Apply"],
      ["/partner-service-providers", "Service Providers"],
      ["/service-apply", "Service Apply"],
      ["/agents", "Agents"],
      ["/agents-apply", "Agents Apply"],
    ],
  },
  {
    title: "Company & Utility",
    links: [
      ["/", "Homepage"],
      ["/support", "Support"],
      ["/about", "About"],
      ["/blog", "Blog"],
      ["/all-pages", "All Pages (QA)"]
    ],
  },
];

export function AllPagesSections() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-10">
      <h1 className="text-3xl font-semibold text-slate-900">All Pages (QA)</h1>
      <p className="mt-2 text-sm text-slate-600">Temporary QA navigation index. Will be reduced after final roadmap approval.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {groups.map((group) => (
          <article key={group.title} className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="text-lg font-semibold text-slate-900">{group.title}</h2>
            <ul className="mt-3 space-y-2">
              {group.links.map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-sm text-blue-700 hover:underline">
                    {label} <span className="text-slate-500">({href})</span>
                  </a>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
