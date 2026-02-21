import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TOOLS, TOOL_CATEGORIES, TOOL_ROLES, getToolBySlug } from "@/lib/tools";
import ToolCalculatorEmbed from "@/components/tools/ToolCalculatorEmbed";

export async function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: `${tool.name} | Villa4you Tools`,
    description: tool.description.slice(0, 160),
  };
}

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const cat = TOOL_CATEGORIES.find((c) => c.slug === tool.category);
  const isActive = tool.status === "active";
  const isComingSoon = tool.status === "comingSoon";

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      {/* Hero */}
      <section className="bg-[#0F2B46] py-16 text-white">
        <div className="container mx-auto max-w-5xl px-4">
          <nav className="mb-4 text-sm text-slate-400">
            <Link href="/tools" className="hover:text-cyan-300">Tools</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{tool.name}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            {cat && <span className="rounded-full bg-white/10 px-3 py-0.5 text-xs text-slate-300">{cat.label}</span>}
            {tool.roles.map((r) => (
              <span key={r} className="rounded-full bg-white/10 px-3 py-0.5 text-xs text-cyan-200">
                {TOOL_ROLES.find((tr) => tr.slug === r)?.label || r}
              </span>
            ))}
            {isComingSoon && <span className="rounded-full bg-amber-500/30 px-3 py-0.5 text-xs font-bold text-amber-200">Coming Soon</span>}
          </div>

          <h1 className="text-3xl font-bold sm:text-4xl">{tool.name}</h1>
          <p className="mt-2 text-lg text-slate-300">{tool.tagline}</p>
          <p className="mt-3 max-w-3xl text-slate-400 leading-relaxed">{tool.description}</p>
        </div>
      </section>

      {/* Calculator embed */}
      <ToolCalculatorEmbed slug={tool.slug} />

      {/* Features */}
      <section className="py-12">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="text-xl font-semibold text-slate-900">What it covers</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {tool.features.map((f, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                <svg className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <span className="text-sm text-slate-700">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      {tool.useCases && tool.useCases.length > 0 && (
        <section className="bg-white py-12 border-y border-slate-200">
          <div className="container mx-auto max-w-5xl px-4">
            <h2 className="text-xl font-semibold text-slate-900">Who it helps</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {tool.useCases.map((uc) => (
                <div key={uc.role} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="font-semibold text-slate-900 mb-3">{uc.role}</h3>
                  <ul className="space-y-2">
                    {uc.cases.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="text-slate-400 mt-0.5">&#x25B8;</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-12">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <div className="rounded-2xl bg-[#0F2B46] p-8 text-white">
            <h2 className="text-2xl font-bold">{isComingSoon ? `${tool.name} — Coming Soon` : "Ready to get started?"}</h2>
            <p className="mt-2 text-slate-300">{isComingSoon ? "We'll notify you when this tool launches." : "Explore Villa4you's full suite of tools and services."}</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href={isComingSoon ? "/contact" : "/tools"} className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#0F2B46] hover:bg-slate-100 transition">
                {isComingSoon ? "Get Notified" : "Browse All Tools"}
              </Link>
              <Link href="/for-owners" className="rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition">
                Owner Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
