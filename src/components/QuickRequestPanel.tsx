"use client";

import { useMemo, useState } from "react";

type Step = 1 | 2;

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

const WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/14582531/ueuzwpy/";

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

const inputClass = "mt-1 h-9 w-full rounded-md border border-slate-300 bg-white px-2.5 text-[12px] text-slate-800";

export function QuickRequestPanel() {
  const [step, setStep] = useState<Step>(1);
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

  function validateStep(target: Step) {
    const next: Record<string, string> = {};
    if (target === 1) {
      if (!form.destination.trim()) next.destination = "Required";
      if (!form.checkIn.trim()) next.checkIn = "Required";
      if (!form.checkOut.trim()) next.checkOut = "Required";
      if (!form.adults.trim() || Number(form.adults) < 1) next.adults = "Min 1";
    }
    if (target === 2) {
      if (form.websiteHp.trim()) next.websiteHp = "Spam check failed.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function submit() {
    if (!validateStep(2)) return;
    setSubmitting(true);
    setMsg("");
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("submit failed");
      setMsg("Request sent.");
      setForm(initial);
      setStep(1);
    } catch {
      setMsg("Submission failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <h2 className="text-[18px] font-semibold leading-none text-slate-900">Quick Request</h2>
      <p className="mt-1 text-[11px] text-slate-600">Get a shortlist fast — 60 seconds.</p>

      {step === 1 ? (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <label className="text-[10px] font-semibold text-slate-700">Destination
            <input className={inputClass} placeholder="Please Select" value={form.destination} onChange={(e) => setField("destination", e.target.value)} />
            {errors.destination && <span className="text-[10px] text-red-600">{errors.destination}</span>}
          </label>
          <label className="text-[10px] font-semibold text-slate-700">Check-in
            <input type="date" className={inputClass} value={form.checkIn} onChange={(e) => setField("checkIn", e.target.value)} />
            {errors.checkIn && <span className="text-[10px] text-red-600">{errors.checkIn}</span>}
          </label>
          <label className="text-[10px] font-semibold text-slate-700">Check-out
            <input type="date" className={inputClass} value={form.checkOut} onChange={(e) => setField("checkOut", e.target.value)} />
            {errors.checkOut && <span className="text-[10px] text-red-600">{errors.checkOut}</span>}
          </label>
          <label className="text-[10px] font-semibold text-slate-700">Adults
            <input type="number" min={1} className={inputClass} value={form.adults} onChange={(e) => setField("adults", e.target.value)} />
            {errors.adults && <span className="text-[10px] text-red-600">{errors.adults}</span>}
          </label>
          <label className="text-[10px] font-semibold text-slate-700">Children (3–14 age)
            <input type="number" min={0} className={inputClass} value={form.children3to14} onChange={(e) => setField("children3to14", e.target.value)} />
          </label>
          <label className="text-[10px] font-semibold text-slate-700">Children (0–3 age)
            <input type="number" min={0} className={inputClass} value={form.children0to3} onChange={(e) => setField("children0to3", e.target.value)} />
          </label>
        </div>
      ) : (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <label className="text-[10px] font-semibold text-slate-700">Distance to beach
            <input className={inputClass} placeholder="Please Select" value={form.distanceToBeach} onChange={(e) => setField("distanceToBeach", e.target.value)} />
          </label>
          <label className="text-[10px] font-semibold text-slate-700">Distance to infrastructures
            <input className={inputClass} placeholder="Please Select" value={form.distanceToInfrastructure} onChange={(e) => setField("distanceToInfrastructure", e.target.value)} />
          </label>
        </div>
      )}

      <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-[11px] text-slate-700">Captcha: Cloudflare Turnstile placeholder.</div>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" value={form.websiteHp} onChange={(e) => setField("websiteHp", e.target.value)} />
      {errors.websiteHp && <p className="mt-1 text-[10px] text-red-600">{errors.websiteHp}</p>}

      <div className="mt-3 flex items-center justify-end gap-2">
        {step === 2 && (
          <button type="button" onClick={() => setStep(1)} className="h-9 rounded-md border border-slate-300 bg-white px-3 text-[13px] font-semibold text-slate-700">Back</button>
        )}
        {step === 1 ? (
          <button type="button" onClick={() => validateStep(1) && setStep(2)} className="h-9 min-w-[72px] rounded-md bg-blue-600 px-3 text-[13px] font-semibold text-white">Next</button>
        ) : (
          <button type="button" onClick={submit} disabled={submitting} className="h-9 min-w-[72px] rounded-md bg-blue-600 px-3 text-[13px] font-semibold text-white disabled:opacity-60">{submitting ? "Sending..." : "Submit"}</button>
        )}
      </div>

      {msg && <p className="mt-2 text-[11px] text-slate-700">{msg}</p>}
    </>
  );
}
