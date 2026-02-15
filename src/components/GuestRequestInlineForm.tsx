"use client";

import { useState } from "react";

type ContextType = "property" | "service";

type Props = {
  contextType: ContextType;
  contextId: string;
  contextSlug: string;
  contextTitle: string;
  categoryName?: string;
  subcategoryName?: string;
};

const WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/14582531/ueuzwpy/";

export function GuestRequestInlineForm(props: Props) {
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    checkIn: "",
    checkOut: "",
    adults: "2",
    children: "0",
    preferredDate: "",
    preferredTime: "",
    participants: "2",
    note: "",
    terms: false,
    hp: "",
  });

  async function submit() {
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.country || !form.terms) {
      setMsg("Please complete required fields.");
      return;
    }
    if (props.contextType === "property" && (!form.checkIn || !form.checkOut)) {
      setMsg("Please add check-in and check-out dates.");
      return;
    }
    if (props.contextType === "service" && !form.preferredDate) {
      setMsg("Please add preferred service date.");
      return;
    }
    if (form.hp.trim()) {
      setMsg("Spam check failed.");
      return;
    }

    setSending(true);
    setMsg("");
    try {
      const payload = {
        source: "villa4you-react",
        formType: "guest-request",
        submittedAt: new Date().toISOString(),
        context: {
          type: props.contextType,
          id: props.contextId,
          slug: props.contextSlug,
          title: props.contextTitle,
          categoryName: props.categoryName || null,
          subcategoryName: props.subcategoryName || null,
        },
        guest: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          country: form.country,
        },
        request:
          props.contextType === "property"
            ? {
                checkIn: form.checkIn,
                checkOut: form.checkOut,
                adults: Number(form.adults || 0),
                children: Number(form.children || 0),
                note: form.note,
              }
            : {
                preferredDate: form.preferredDate,
                preferredTime: form.preferredTime,
                participants: Number(form.participants || 0),
                note: form.note,
              },
        consent: { termsAccepted: form.terms },
      };

      const r = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!r.ok) throw new Error("submit failed");
      setMsg("Request sent successfully.");
    } catch {
      setMsg("Request failed. Please retry.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="text-xl font-semibold text-slate-900">Guest Request</h2>
      <p className="mt-1 text-sm text-slate-600">
        {props.contextType === "property" ? "Ask for availability and booking details." : "Ask for service availability and details."}
      </p>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="First name *" value={form.firstName} onChange={(e)=>setForm({...form, firstName:e.target.value})} />
        <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Last name *" value={form.lastName} onChange={(e)=>setForm({...form, lastName:e.target.value})} />
        <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Email *" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} />
        <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Phone *" value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} />
        <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2" placeholder="Country *" value={form.country} onChange={(e)=>setForm({...form, country:e.target.value})} />
      </div>

      {props.contextType === "property" ? (
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <input type="date" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" value={form.checkIn} onChange={(e)=>setForm({...form, checkIn:e.target.value})} />
          <input type="date" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" value={form.checkOut} onChange={(e)=>setForm({...form, checkOut:e.target.value})} />
          <input type="number" min={1} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Adults" value={form.adults} onChange={(e)=>setForm({...form, adults:e.target.value})} />
          <input type="number" min={0} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Children" value={form.children} onChange={(e)=>setForm({...form, children:e.target.value})} />
        </div>
      ) : (
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <input type="date" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" value={form.preferredDate} onChange={(e)=>setForm({...form, preferredDate:e.target.value})} />
          <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Preferred time" value={form.preferredTime} onChange={(e)=>setForm({...form, preferredTime:e.target.value})} />
          <input type="number" min={1} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Participants" value={form.participants} onChange={(e)=>setForm({...form, participants:e.target.value})} />
        </div>
      )}

      <textarea className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" rows={3} placeholder="Message / request details" value={form.note} onChange={(e)=>setForm({...form, note:e.target.value})} />
      <input className="hidden" value={form.hp} onChange={(e)=>setForm({...form, hp:e.target.value})} tabIndex={-1} autoComplete="off" />

      <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">Turnstile placeholder (to activate with site key + server verify).</div>

      <label className="mt-3 flex items-start gap-2 text-sm text-slate-700">
        <input type="checkbox" checked={form.terms} onChange={(e)=>setForm({...form, terms:e.target.checked})} />
        I agree to be contacted regarding this request.
      </label>

      <div className="mt-3">
        <button onClick={submit} disabled={sending} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
          {sending ? "Sending..." : "Send request"}
        </button>
      </div>

      {msg && <p className="mt-2 text-sm text-slate-700">{msg}</p>}
    </section>
  );
}
