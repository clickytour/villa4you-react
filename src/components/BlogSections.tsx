import { trackSearchHandoffClick } from "@/lib/searchAnalytics";

const demoPosts = [
  {
    title: "Santorini: best areas for villa stays",
    meta: "Aug 12, 2025 · Travel Tips",
    excerpt: "Caldera vs. beaches — how to choose where to stay.",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Owner guide: pricing for higher ADR in 2025",
    meta: "Jul 3, 2025 · Owners",
    excerpt: "Levers that move occupancy and rate without hurting reviews.",
    image:
      "https://images.unsplash.com/photo-1464890100898-a385f744067f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Crete villas for big groups",
    meta: "Jun 18, 2025 · Travel Tips",
    excerpt: "Large layouts, pools and chef options close to beaches.",
    image:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "How agents & affiliates earn with Villa4you",
    meta: "May 20, 2025 · Agents & Partners",
    excerpt: "Commissions, partner workflows and co-marketing opportunities.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Athens in 3 days (with day trip)",
    meta: "Apr 11, 2025 · Travel Tips",
    excerpt: "A practical itinerary with neighborhoods, food and easy transfers.",
    image:
      "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Our housekeeping checklist for 5-star stays",
    meta: "Mar 4, 2025 · Owners",
    excerpt: "Standards, turnovers and quality-control checkpoints that matter.",
    image:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1200&auto=format&fit=crop",
  },
];

export function BlogSections() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-8 pt-4">
      <div className="rounded-2xl border border-slate-300 bg-white p-5 md:p-8">
        <p className="text-sm text-slate-500">Home › <span className="font-semibold text-slate-700">Blog</span></p>

        <h1 className="mt-3 text-[56px] font-semibold leading-none text-slate-900">
          Villa travel tips, owner growth & partner playbooks
        </h1>

        <p className="mt-3 text-[21px] text-slate-600">
          Actionable guides for guests, owners and collaborators across Greece.
        </p>

        <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center">
          <input
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 md:flex-1"
            placeholder="Search articles (e.g., Santorini, pricing, transfers)..."
          />

          <div className="flex flex-wrap gap-2">
            {["All", "Travel Tips", "Owners", "Agents & Partners"].map((chip, idx) => (
              <button
                key={chip}
                className={`rounded-full border px-4 py-2 text-sm ${
                  idx === 0 ? "border-emerald-600 text-emerald-700" : "border-slate-300 text-slate-700"
                } bg-white`}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3">
          <a href="/search?vertical=blog" onClick={() => trackSearchHandoffClick({ vertical: "blog", source_page: "blog", handoff_surface: "blog_open_global_search", target_url: "/search?vertical=blog" })} className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900">Open in global search</a>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[3fr_1.15fr]">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {demoPosts.map((post) => (
              <article key={post.title} className="overflow-hidden rounded-xl border border-slate-300 bg-white">
                <img src={post.image} alt={post.title} className="h-36 w-full object-cover" />
                <div className="p-3">
                  <p className="text-xs text-slate-500">{post.meta}</p>
                  <h3 className="mt-1 text-[30px] font-semibold leading-none text-slate-900">{post.title}</h3>
                  <p className="mt-2 text-[21px] text-slate-600">{post.excerpt}</p>
                  <a href={`/search?vertical=blog&q=${encodeURIComponent(post.title)}`} onClick={() => trackSearchHandoffClick({ query: post.title, vertical: "blog", source_page: "blog", handoff_surface: "blog_post_read", target_url: `/search?vertical=blog&q=${encodeURIComponent(post.title)}` })} className="mt-3 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">Read</a>
                </div>
              </article>
            ))}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-4 lg:self-start">
            <div className="rounded-xl border border-slate-300 bg-white p-5">
              <h3 className="text-[42px] font-semibold leading-none text-slate-900">Subscribe for new posts</h3>
              <p className="mt-2 text-[21px] text-slate-600">Get tips & offers — 1–2 emails/month.</p>
              <a href="/search?vertical=all&q=newsletter" onClick={() => trackSearchHandoffClick({ query: "newsletter", vertical: "all", source_page: "blog", handoff_surface: "blog_newsletter_cta", target_url: "/search?vertical=all&q=newsletter" })} className="mt-4 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-base font-medium text-white">Join the newsletter</a>
            </div>

            <div className="rounded-xl border border-slate-300 bg-white p-5">
              <h3 className="text-[42px] font-semibold leading-none text-slate-900">Owners: Free evaluation</h3>
              <p className="mt-2 text-[21px] text-slate-600">We’ll review your villa and growth goals.</p>
              <a href="/search?vertical=services&q=free+evaluation" onClick={() => trackSearchHandoffClick({ query: "free evaluation", vertical: "services", source_page: "blog", handoff_surface: "blog_free_evaluation_cta", target_url: "/search?vertical=services&q=free+evaluation" })} className="mt-4 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-base font-medium text-white">Start now</a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
