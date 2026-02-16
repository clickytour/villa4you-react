import { qaRoutes } from "@/lib/qaRoutes";

const groups = [
  "For Guests",
  "For Owners",
  "Collaborate",
  "Complexes / Template Instances (QA)",
  "Company & Utility",
] as const;

export function AllPagesSections() {
  const total = qaRoutes.length;
  const passed = qaRoutes.filter((r) => r.status === "QA Passed").length;

  return (
    <section className="mx-auto max-w-[1280px] px-4 py-10">
      <h1 className="text-3xl font-semibold text-slate-900">All Pages (QA)</h1>
      <p className="mt-2 text-sm text-slate-600">Temporary QA navigation index. New routes from hero config + static flow list are auto-collected here.</p>

      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-sm font-semibold text-slate-800">QA Progress</p>
        <p className="mt-1 text-sm text-slate-600">{passed} / {total} pages QA Passed</p>
        <div className="mt-2 h-2 overflow-hidden rounded bg-slate-200">
          <div className="h-full bg-slate-900" style={{ width: `${total ? Math.round((passed / total) * 100) : 0}%` }} />
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {groups.map((group) => {
          const links = qaRoutes.filter((r) => r.group === group);
          return (
            <article key={group} className="rounded-xl border border-slate-200 bg-white p-4">
              <h2 className="text-lg font-semibold text-slate-900">{group}</h2>
              <ul className="mt-3 space-y-2">
                {links.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm text-blue-700 hover:bg-slate-50 hover:underline">
                      <span>
                        {item.label} <span className="text-slate-500">({item.href})</span>
                      </span>
                      <span className="rounded border border-amber-300 bg-amber-50 px-1.5 py-0.5 text-[10px] text-amber-700">{item.status}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
