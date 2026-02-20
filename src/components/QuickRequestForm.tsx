"use client";

import { useMemo, useState } from "react";
import { PlaceAutocomplete } from "@/components/PlaceAutocomplete";

type FormState = {
  destination: string;
  checkIn: string;
  checkOut: string;
  adults: string;
  children3to14: string;
  children0to3: string;
  distanceToBeach: string;
  distanceToInfrastructure: string;
  websiteHp: string;
};

const GUEST_REQUEST_API_URL = "/api/guest-request";

const inputClass = "h-10 rounded-lg border border-slate-300 bg-white px-3 text-[13px] text-slate-800 placeholder:text-slate-500";

const initial: FormState = {
  destination: "",
  checkIn: "",
  checkOut: "",
  adults: "2",
  children3to14: "0",
  children0to3: "0",
  distanceToBeach: "",
  distanceToInfrastructure: "",
  websiteHp: "",
};

export function QuickRequestForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");

  const payload = useMemo(
    () => ({
      source: "villa4you-react",
      formType: "quick-request",
      submittedAt: new Date().toISOString(),
      quickRequest: {
        destination: form.destination,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        adults: Number(form.adults || 0),
        children3to14: Number(form.children3to14 || 0),
        children0to3: Number(form.children0to3 || 0),
        distanceToBeach: form.distanceToBeach,
        distanceToInfrastructure: form.distanceToInfrastructure,
      },
    }),
    [form]
  );

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((prev) => {
      if (!prev[key as string]) return prev;
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  }

  function validate() {
    const next: Record<string, string> = {};
    if (!form.destination.trim()) next.destination = "Destination is required.";
    if (!form.checkIn.trim()) next.checkIn = "Check-in is required.";
    if (!form.checkOut.trim()) next.checkOut = "Check-out is required.";
    if (!form.adults.trim() || Number(form.adults) < 1) next.adults = "At least 1 adult is required.";
    if (form.websiteHp.trim()) next.websiteHp = "Spam check failed.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit() {
    if (!validate()) return;
    setSubmitting(true);
    setMsg("");
    try {
      const res = await fetch(GUEST_REQUEST_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("submit failed");
      setMsg("Quick request sent. We will prepare your shortlist.");
      setForm(initial);
    } catch {
      setMsg("Submission failed. Please retry in a moment.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-4 rounded-[12px] border border-slate-300 bg-white/85 p-3 backdrop-blur">
      <div className="grid gap-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <PlaceAutocomplete name="destination" placeholder="Type a place (e.g., Santorini, Paros)" value={form.destination} onTextChange={(v) => setField("destination", v)} onChange={(p) => { if (p) setField("destination", p.displayName); }} />
          {errors.destination && <p className="mt-1 text-[11px] text-red-600">{errors.destination}</p>}
        </div>

        <div className="lg:col-span-2">
          <input type="date" className={`${inputClass} w-full`} value={form.checkIn} onChange={(e) => setField("checkIn", e.target.value)} />
          {errors.checkIn && <p className="mt-1 text-[11px] text-red-600">{errors.checkIn}</p>}
        </div>

        <div className="lg:col-span-2">
          <input type="date" className={`${inputClass} w-full`} value={form.checkOut} onChange={(e) => setField("checkOut", e.target.value)} />
          {errors.checkOut && <p className="mt-1 text-[11px] text-red-600">{errors.checkOut}</p>}
        </div>

        <div className="lg:col-span-2">
          <input type="number" min={1} className={`${inputClass} w-full`} value={form.adults} onChange={(e) => setField("adults", e.target.value)} placeholder="Adults" />
          {errors.adults && <p className="mt-1 text-[11px] text-red-600">{errors.adults}</p>}
        </div>

        <button type="button" onClick={onSubmit} disabled={submitting} className="h-10 rounded-lg bg-slate-900 px-4 text-[14px] font-medium text-white lg:col-span-2 disabled:opacity-60">
          {submitting ? "Sending..." : "Search"}
        </button>
      </div>

      <div className="mt-2 grid gap-2 md:grid-cols-2 lg:grid-cols-4">
        <input type="number" min={0} className={`${inputClass} w-full`} placeholder="Children (3–14)" value={form.children3to14} onChange={(e) => setField("children3to14", e.target.value)} />
        <input type="number" min={0} className={`${inputClass} w-full`} placeholder="Children (0–3)" value={form.children0to3} onChange={(e) => setField("children0to3", e.target.value)} />
        <input className={`${inputClass} w-full`} placeholder="Distance to beach" value={form.distanceToBeach} onChange={(e) => setField("distanceToBeach", e.target.value)} />
        <input className={`${inputClass} w-full`} placeholder="Distance to infrastructures" value={form.distanceToInfrastructure} onChange={(e) => setField("distanceToInfrastructure", e.target.value)} />
      </div>

      {/* Configure NEXT_PUBLIC_TURNSTILE_SITEKEY in env to enable real Turnstile widget */}
      <div id="cf-turnstile" className="cf-turnstile mt-2" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY || "placeholder"}></div>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" value={form.websiteHp} onChange={(e) => setField("websiteHp", e.target.value)} />
      {errors.websiteHp && <p className="mt-1 text-[11px] text-red-600">{errors.websiteHp}</p>}

      {msg && <p className="mt-1.5 text-[11px] text-slate-700">{msg}</p>}
      <p className="mt-1.5 text-[11px] text-slate-600">Tip: this destination will also be included in the Quick Request.</p>
    </div>
  );
}
