const footerLinks = [
  { href: "/support", label: "Support" },
  { href: "/guest-help-faq", label: "Guest Help FAQ" },
  { href: "/plans-offers", label: "Plans & Offers" },
  { href: "/blog", label: "Blog" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-4 py-6 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-600">© {new Date().getFullYear()} Villa4you / ClickyTour</p>
        <div className="flex flex-wrap gap-3">
          {footerLinks.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-slate-700 hover:text-slate-900">
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
