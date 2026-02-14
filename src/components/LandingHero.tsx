import type { HeroPageConfig } from "@/lib/landingHeroes";
import { QuickRequestForm } from "@/components/QuickRequestForm";

export function LandingHero({ config }: { config: HeroPageConfig }) {
  const isGuests = config.slug === "for-guests";
  const isHomepageTemplate = config.slug === "homepage-template";
  return (
    <main className="bg-[#f3f5f8] text-slate-900">
      <section className="mx-auto max-w-[1280px] px-4 py-6">
        <div
          className="overflow-hidden rounded-[24px] border border-slate-200 p-4 md:p-6"
          style={{
            backgroundImage: `linear-gradient(110deg, rgba(255,255,255,0.72) 0%, rgba(246,250,255,0.64) 40%, rgba(238,245,252,0.56) 64%, rgba(232,241,249,0.46) 100%), url('${config.heroImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="min-w-0">
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-emerald-700">{config.badge}</p>

              <h1
                className={`mt-2 max-w-[16ch] font-semibold leading-[0.98] tracking-[-0.02em] text-slate-900 ${isGuests ? "text-[56px] md:text-[62px] lg:text-[66px]" : "text-[42px] md:text-[58px] lg:text-[68px]"}`}
                style={{ textShadow: "0 1px 2px rgba(255,255,255,0.35), 0 1px 10px rgba(15,31,70,0.08)" }}
              >
                {config.title}
              </h1>

              <p className={`mt-4 max-w-[42ch] text-slate-800 ${isGuests ? "text-[20px] leading-[1.45] md:text-[21px]" : "text-[22px] leading-[1.08] md:text-[34px] lg:text-[42px]"}`}>{config.subtitle}</p>

              {config.chips.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2 text-[13px] font-semibold">
                  {config.chips.map((chip) => (
                    <span key={chip} className="rounded-full border border-slate-300 bg-white/70 px-3 py-1.5 text-slate-800">
                      {chip}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-2.5">
                <button className="h-11 rounded-[10px] bg-slate-900 px-4 text-[15px] font-medium text-white">{config.ctaPrimary}</button>
                <button className="h-11 rounded-[10px] border border-slate-400 bg-white/75 px-4 text-[15px] font-medium text-slate-800">
                  {config.ctaSecondary}
                </button>
                {config.ctaTertiary && (
                  <button className="h-11 rounded-[10px] border border-slate-400 bg-white/75 px-4 text-[15px] font-medium text-slate-800">
                    {config.ctaTertiary}
                  </button>
                )}
              </div>

              {isHomepageTemplate ? (
                <QuickRequestForm />
              ) : (
                <div className="mt-4 rounded-[12px] border border-slate-300 bg-white/85 p-3 backdrop-blur">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.05em] text-slate-700">Key value proposition</p>
                  <p className="mt-1 text-[14px] text-slate-700 md:text-[15px]">
                    Better matching, better communication, and better outcomes for guests, owners, and partners.
                  </p>
                </div>
              )}

              <div className="mt-3 flex flex-wrap gap-4 text-[14px] text-slate-700">
                {config.trust.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            {config.sideMode !== "panel" ? (
              <aside className="w-full overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm lg:max-w-[420px]">
                <img
                  src={config.sideImage || config.heroImage}
                  alt={`${config.route} hero visual`}
                  className="h-[190px] w-full object-cover object-center sm:h-[220px] lg:h-[260px]"
                />
              </aside>
            ) : (
              <aside className="w-full max-w-[360px] rounded-[16px] border border-slate-300 bg-white/90 p-4 shadow-sm">
                <h2 className="text-[18px] font-semibold leading-none text-slate-900">{config.panelTitle}</h2>
                <p className="mt-1 text-[11px] text-slate-600">{config.panelFooter || "Contextual guidance block replacing the old quick request form."}</p>

                {isHomepageTemplate ? (
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {config.panelItems.map((item) => (
                      <label key={item.label} className="text-[10px] font-semibold text-slate-700">
                        {item.label}
                        <input className="mt-1 h-9 w-full rounded-md border border-slate-300 bg-white px-2.5 text-[12px] text-slate-800" defaultValue={item.value} />
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="mt-3 space-y-2.5">
                    {config.panelItems.map((item) => (
                      <div key={item.label} className="rounded-xl border border-slate-200 bg-slate-50/80 p-2.5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-slate-600">{item.label}</p>
                        <p className="mt-1 text-[13px] text-slate-800">{item.value}</p>
                      </div>
                    ))}
                  </div>
                )}

                {isHomepageTemplate ? (
                  <div className="mt-3 flex justify-end">
                    <button className="h-9 min-w-[72px] rounded-md bg-blue-600 px-3 text-[13px] font-semibold text-white">Next</button>
                  </div>
                ) : (
                  <div className="mt-3 rounded-lg border border-blue-100 bg-blue-50 p-2.5 text-[12px] text-blue-900">{config.panelFooter}</div>
                )}
              </aside>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
