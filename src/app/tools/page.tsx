"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { TOOLS, TOOL_CATEGORIES, TOOL_ROLES } from "@/lib/tools";

export default function ToolsHubPage() {
  const [roleFilter, setRoleFilter] = useState("");
  const [catFilter, setCatFilter] = useState("");

  const filtered = useMemo(() => {
    let result = TOOLS;
    if (roleFilter) result = result.filter((t) => t.roles.includes(roleFilter as any));
    if (catFilter) result = result.filter((t) => t.category === catFilter);
    return result;
  }, [roleFilter, catFilter]);

  const activeCount = TOOLS.filter((t) => t.status === "active").length;
  const totalCount = TOOLS.length;

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      {/* Hero */}
      <section className="bg-[#0F2B46] py-16 text-white">
        <div className="container mx-auto max-w-5xl px-4">
          <p className="text-sm font-medium text-cyan-300 uppercase tracking-wider">Villa4you Tools</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">Practical tools for guests, owners & partners</h1>
          <p className="mt-3 text-lg text-slate-300 max-w-2xl">
            Free planning tools for guests, revenue calculators for villa owners, and performance utilities for our partner network. Built with real Greek market data.
          </p>
          <div className="mt-6 flex gap-3 text-sm">
            <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-emerald-300">{activeCount} active</span>
            <span className="rounded-full bg-slate-500/20 border border-slate-500/40 px-3 py-1 text-slate-300">{totalCount - activeCount} coming soon</span>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-slate-200 bg-white">
        <div className="container mx-auto max-w-5xl px-4 py-4">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Audience</label>
              <div className="flex gap-1">
                <button onClick={() => setRoleFilter("")} className={`rounded-full px-3 py-1 text-xs font-medium transition ${!roleFilter ? "bg-[#0F2B46] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>All</button>
                {TOOL_ROLES.map((r) => (
                  <button key={r.slug} onClick={() => setRoleFilter(r.slug)} className={`rounded-full px-3 py-1 text-xs font-medium transition ${roleFilter === r.slug ? "bg-[#0F2B46] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Category</label>
              <div className="flex gap-1">
                <button onClick={() => setCatFilter("")} className={`rounded-full px-3 py-1 text-xs font-medium transition ${!catFilter ? "bg-[#0F2B46] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>All</button>
                {TOOL_CATEGORIES.map((c) => (
                  <button key={c.slug} onClick={() => setCatFilter(c.slug)} className={`rounded-full px-3 py-1 text-xs font-medium transition ${catFilter === c.slug ? "bg-[#0F2B46] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-10">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((tool) => {
              const cat = TOOL_CATEGORIES.find((c) => c.slug === tool.category);
              const isActive = tool.status === "active";
              return (
                <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:shadow-md hover:border-slate-300">
                  <div className="flex items-center gap-2 mb-2">
                    {cat && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">{cat.label}</span>}
                    {isActive ? (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">Live</span>
                    ) : (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-400">Coming Soon</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-[#0F2B46]">{tool.name}</h3>
                  <p className="mt-1 text-sm text-slate-500 line-clamp-2">{tool.tagline}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {tool.roles.map((r) => {
                      const role = TOOL_ROLES.find((tr) => tr.slug === r);
                      return <span key={r} className="rounded-full bg-slate-50 border border-slate-200 px-2 py-0.5 text-[10px] text-slate-500">{role?.label || r}</span>;
                    })}
                  </div>
                </Link>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-slate-400 py-12">No tools match your filters.</p>
          )}
        </div>
      </section>
    </div>
  );
}
