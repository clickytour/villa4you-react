"use client";

import { useMemo, useState } from "react";
import { serviceTaxonomy } from "@/lib/serviceTaxonomy";
import { PlaceAutocomplete } from "@/components/PlaceAutocomplete";

type Step = 1 | 2 | 3;

type FormState = {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  region: string;
  serviceCategory: string;
  serviceSubcategory: string;
  serviceDescription: string;
  pricingModel: string;
  packages: string;
  mediaLinks: string;
  termsAccepted: boolean;
  websiteHp: string;
};

const GUEST_REQUEST_API_URL = "/api/guest-request";
const inputClass = "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900";
const labelClass = "text-sm font-medium text-slate-700";

const serviceCategories = serviceTaxonomy;

const initial: FormState = {
  businessName: "",
  contactName: "",
  email: "",
  phone: "",
  website: "",
  region: "",
  serviceCategory: serviceCategories[0].id,
  serviceSubcategory: serviceCategories[0].subcategories[0].id,
  serviceDescription: "",
  pricingModel: "Per service",
  packages: "",
  mediaLinks: "",
  termsAccepted: false,
  websiteHp: "",
};

function csv(v: string) {
  return v.split(",").map((x) => x.trim()).filter(Boolean);
}

export function ServisApplySections() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");

  const selectedCategory = serviceCategories.find((c) => c.id === form.serviceCategory) ?? serviceCategories[0];
  const availableSubcategories = selectedCategory.subcategories;

  const payload = useMemo(
    () => ({
      source: "villa4you-react",
      formType: "service-provider-apply",
      submittedAt: new Date().toISOString(),
      business: {
        name: form.businessName,
        contact: form.contactName,
        email: form.email,
        phone: form.phone,
        website: form.website,
        region: form.region,
      },
      service: {
        categoryId: form.serviceCategory,
        categoryName: serviceCategories.find((c) => c.id === form.serviceCategory)?.name || "",
        subcategoryId: form.serviceSubcategory,
        subcategoryName: availableSubcategories.find((s) => s.id === form.serviceSubcategory)?.name || "",
        description: form.serviceDescription,
        pricingModel: form.pricingModel,
        packages: form.packages,
      },
      assets: {
        mediaLinks: csv(form.mediaLinks),
      },
      consent: { termsAccepted: form.termsAccepted },
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

  function validateStep(targetStep: Step) {
    const nextErrors: Record<string, string> = {};

    if (targetStep === 1) {
      if (!form.businessName.trim()) nextErrors.businessName = "Business name is required.";
      if (!form.contactName.trim()) nextErrors.contactName = "Contact person is required.";
      if (!form.email.trim()) nextErrors.email = "Email is required.";
      if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Enter a valid email.";
      if (!form.region.trim()) nextErrors.region = "Region is required.";
    }

    if (targetStep === 2) {
      if (!form.serviceDescription.trim() || form.serviceDescription.trim().length < 30) {
        nextErrors.serviceDescription = "Please add a short description (min 30 chars).";
      }
      if (!form.packages.trim()) nextErrors.packages = "Please add at least one package/price detail.";
    }

    if (targetStep === 3) {
      if (!form.termsAccepted) nextErrors.termsAccepted = "Please accept terms to submit.";
      if (form.websiteHp.trim()) nextErrors.websiteHp = "Spam check failed.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function nextStep() {
    if (!validateStep(step)) return;
    setStep((s) => (s === 1 ? 2 : 3));
  }

  function prevStep() {
    setStep((s) => (s === 1 ? 1 : s === 2 ? 1 : 2));
  }

  async function onSubmit() {
    if (!validateStep(3)) return;
    setSubmitting(true);
    setMsg("");
    try {
      const r = await fetch(GUEST_REQUEST_API_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!r.ok) throw new Error("submit failed");
      setMsg("Submitted successfully. Our team will review your service listing soon.");
      setForm(initial);
      setStep(1);
    } catch {
      setMsg("Submission failed. Please retry in a moment.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section className="mx-auto max-w-[1280px] px-4 pb-6 pt-4">
        <div className="rounded-2xl border border-slate-300 bg-white p-5 md:p-8">
          <p className="text-sm text-slate-500">Service Providers › <span className="font-semibold text-slate-700">List Your Business/Service</span></p>
          <h1 className="mt-3 text-[42px] font-semibold leading-none text-slate-900">Your service in front of thousands of customers</h1>
          <p className="mt-3 text-[21px] text-slate-600">Join ClickyTour and make your service visible to tourists, property owners, and agents — in just a few steps.</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-sm text-slate-700">⚡ Structured onboarding</span>
            <span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-sm text-slate-700">🛡️ GDPR-ready consent</span>
            <span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-sm text-slate-700">🧩 Turnstile-ready captcha slot</span>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">1</div>
              <p className="mt-2 text-sm font-semibold text-slate-900">Step 1</p>
              <p className="text-sm text-slate-700">Create account and start onboarding.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">2</div>
              <p className="mt-2 text-sm font-semibold text-slate-900">Step 2</p>
              <p className="text-sm text-slate-700">Fill service details, pricing, images.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">3</div>
              <p className="mt-2 text-sm font-semibold text-slate-900">Step 3</p>
              <p className="text-sm text-slate-700">Publish and start receiving bookings.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-10">
        <form className="rounded-2xl border border-slate-300 bg-white p-4" onSubmit={(e) => e.preventDefault()}>
          <h2 className="text-[42px] font-semibold leading-none text-slate-900">Provider Listing Form</h2>
          <p className="mt-2 text-[21px] text-slate-600">Universal provider wizard (List your service/business).</p>
          <p className="mt-1 text-sm text-slate-500">Required fields are marked with *</p>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <button type="button" onClick={() => setStep(1)} className={`rounded-xl border p-3 text-left text-sm ${step===1?"border-slate-900 bg-slate-900 text-white":"border-slate-300 bg-slate-50 text-slate-700"}`}>Step 1 · Business</button>
            <button type="button" onClick={() => setStep(2)} className={`rounded-xl border p-3 text-left text-sm ${step===2?"border-slate-900 bg-slate-900 text-white":"border-slate-300 bg-slate-50 text-slate-700"}`}>Step 2 · Service</button>
            <button type="button" onClick={() => setStep(3)} className={`rounded-xl border p-3 text-left text-sm ${step===3?"border-slate-900 bg-slate-900 text-white":"border-slate-300 bg-slate-50 text-slate-700"}`}>Step 3 · Review</button>
          </div>

          {step === 1 && (
            <fieldset className="mt-4 rounded-xl border border-slate-200 p-3">
              <legend className="px-2 text-sm font-semibold text-slate-800">Business details</legend>
              <div className="grid gap-3 md:grid-cols-2">
                <label className={labelClass}>Business name *<input className={inputClass} value={form.businessName} onChange={(e)=>setField("businessName", e.target.value)} />{errors.businessName && <span className="text-xs text-red-600">{errors.businessName}</span>}</label>
                <label className={labelClass}>Contact person *<input className={inputClass} value={form.contactName} onChange={(e)=>setField("contactName", e.target.value)} />{errors.contactName && <span className="text-xs text-red-600">{errors.contactName}</span>}</label>
                <label className={labelClass}>Email *<input type="email" className={inputClass} value={form.email} onChange={(e)=>setField("email", e.target.value)} />{errors.email && <span className="text-xs text-red-600">{errors.email}</span>}</label>
                <label className={labelClass}>Phone<input className={inputClass} value={form.phone} onChange={(e)=>setField("phone", e.target.value)} /></label>
                <label className={labelClass}>Website<input className={inputClass} value={form.website} onChange={(e)=>setField("website", e.target.value)} /></label>
                <div><label className={`${labelClass} mb-0`}>Region *</label><PlaceAutocomplete name="region" placeholder="Halkidiki, Crete..." value={form.region} onTextChange={(v) => setField("region", v)} onChange={(p) => { if (p) setField("region", p.displayName); }} />{errors.region && <span className="text-xs text-red-600">{errors.region}</span>}</div>
              </div>
            </fieldset>
          )}

          {step === 2 && (
            <fieldset className="mt-4 rounded-xl border border-slate-200 p-3">
              <legend className="px-2 text-sm font-semibold text-slate-800">Service details</legend>
              <div className="grid gap-3 md:grid-cols-2">
                <label className={labelClass}>Service category
                  <select
                    className={inputClass}
                    value={form.serviceCategory}
                    onChange={(e) => {
                      const categoryId = e.target.value;
                      setField("serviceCategory", categoryId);
                      const category = serviceCategories.find((c) => c.id === categoryId);
                      setField("serviceSubcategory", category?.subcategories[0]?.id ?? "");
                    }}
                  >
                    {serviceCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </label>
                <label className={labelClass}>Subcategory
                  <select className={inputClass} value={form.serviceSubcategory} onChange={(e)=>setField("serviceSubcategory", e.target.value)}>
                    {availableSubcategories.map((sub) => (
                      <option key={sub.id} value={sub.id}>{sub.name}</option>
                    ))}
                  </select>
                </label>
                <label className={labelClass}>Pricing model<select className={inputClass} value={form.pricingModel} onChange={(e)=>setField("pricingModel", e.target.value)}><option>Per service</option><option>Per hour</option><option>Per person</option><option>Package based</option><option>Custom quote</option></select></label>
              </div>
              <label className={`${labelClass} mt-3 block`}>Service description<textarea className={inputClass} rows={4} value={form.serviceDescription} onChange={(e)=>setField("serviceDescription", e.target.value)} />{errors.serviceDescription && <span className="text-xs text-red-600">{errors.serviceDescription}</span>}</label>
              <label className={`${labelClass} mt-3 block`}>Prices / packages<textarea className={inputClass} rows={3} value={form.packages} onChange={(e)=>setField("packages", e.target.value)} />{errors.packages && <span className="text-xs text-red-600">{errors.packages}</span>}</label>
              <label className={`${labelClass} mt-3 block`}>Photos / video links (comma-separated)<textarea className={inputClass} rows={3} value={form.mediaLinks} onChange={(e)=>setField("mediaLinks", e.target.value)} /></label>
            </fieldset>
          )}

          {step === 3 && (
            <>
              {/* Configure NEXT_PUBLIC_TURNSTILE_SITEKEY in env to enable real Turnstile widget */}
              <div id="cf-turnstile" className="cf-turnstile mt-4" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY || "placeholder"}></div>
              <label className="mt-3 flex items-start gap-2 text-sm text-slate-700"><input type="checkbox" className="mt-1" checked={form.termsAccepted} onChange={(e)=>setField("termsAccepted", e.target.checked)} /> I confirm all submitted details are accurate and authorized.</label>
              {errors.termsAccepted && <p className="mt-1 text-xs text-red-600">{errors.termsAccepted}</p>}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" value={form.websiteHp} onChange={(e)=>setField("websiteHp", e.target.value)} />
              {errors.websiteHp && <p className="mt-1 text-xs text-red-600">{errors.websiteHp}</p>}
            </>
          )}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-3">
              <button type="button" onClick={prevStep} disabled={step===1} className="rounded-xl border border-slate-800 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
              {step < 3 ? (
                <button type="button" onClick={nextStep} className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white">Next step</button>
              ) : (
                <button type="button" onClick={onSubmit} disabled={submitting} className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60">{submitting?"Submitting...":"Submit listing"}</button>
              )}
            </div>
          </div>

          {msg && <p className="mt-3 text-sm text-slate-700">{msg}</p>}
        </form>
      </section>
    </>
  );
}
