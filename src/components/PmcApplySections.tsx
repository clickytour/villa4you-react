"use client";

import { useMemo, useState } from "react";
import { PlaceAutocomplete } from "@/components/PlaceAutocomplete";

type OnboardingIntent = "full-management" | "co-managed" | "revenue-only";
type Step = 1 | 2 | 3;

type FormState = {
  companyName: string;
  legalName: string;
  contactPerson: string;
  role: string;
  email: string;
  phone: string;
  messaging: string;
  website: string;
  regions: string;
  languages: string;
  propertyTypes: string;
  customTags: string;
  managedCount: string;
  years: string;
  onboardingIntent: OnboardingIntent;
  onboardingStatus: "ready-now" | "pilot-phase" | "planning";
  currentChannels: string[];
  pmsTool: string;
  averageAdr: string;
  occupancyTarget: string;
  serviceModelNote: string;
  description: string;
  logoFileName: string;
  referral: string;
  consentData: boolean;
  consentAccuracy: boolean;
  websiteHp: string;
};

const GUEST_REQUEST_API_URL = "/api/guest-request";

const initialState: FormState = {
  companyName: "",
  legalName: "",
  contactPerson: "",
  role: "",
  email: "",
  phone: "",
  messaging: "",
  website: "",
  regions: "",
  languages: "",
  propertyTypes: "",
  customTags: "",
  managedCount: "",
  years: "",
  onboardingIntent: "full-management",
  onboardingStatus: "ready-now",
  currentChannels: [],
  pmsTool: "",
  averageAdr: "",
  occupancyTarget: "",
  serviceModelNote: "",
  description: "",
  logoFileName: "",
  referral: "",
  consentData: false,
  consentAccuracy: false,
  websiteHp: "",
};

const inputClass = "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-slate-600";
const labelClass = "text-sm font-medium text-slate-700";

const channelOptions = ["Airbnb", "Booking.com", "Vrbo", "Direct website", "Other"]; 

const intentMeta: Record<OnboardingIntent, { title: string; hint: string }> = {
  "full-management": {
    title: "Full management",
    hint: "You want Villa4you support across distribution, pricing, and operational workflow.",
  },
  "co-managed": {
    title: "Co-managed",
    hint: "You run core operations and want structured channel/pricing collaboration.",
  },
  "revenue-only": {
    title: "Revenue management only",
    hint: "Primary focus is pricing strategy, occupancy optimization, and distribution performance.",
  },
};

function splitCsv(value: string) {
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

export function PmcApplySections() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const payload = useMemo(() => {
    const nowIso = new Date().toISOString();
    return {
      source: "villa4you-react",
      formType: "pmc-apply",
      submittedAt: nowIso,
      owner: "DrCris",
      company: {
        companyName: form.companyName,
        legalName: form.legalName,
        contactPerson: form.contactPerson,
        role: form.role,
        email: form.email,
        phone: form.phone,
        messaging: form.messaging,
        website: form.website,
      },
      portfolio: {
        regions: splitCsv(form.regions),
        languages: splitCsv(form.languages),
        propertyTypes: splitCsv(form.propertyTypes),
        customTags: splitCsv(form.customTags),
        managedCount: Number(form.managedCount || 0),
        yearsExperience: Number(form.years || 0),
      },
      operations: {
        onboardingIntent: form.onboardingIntent,
        onboardingStatus: form.onboardingStatus,
        currentChannels: form.currentChannels,
        pmsTool: form.pmsTool,
        averageAdr: form.averageAdr,
        occupancyTarget: form.occupancyTarget,
        serviceModelNote: form.serviceModelNote,
      },
      profile: {
        description: form.description,
        logoFileName: form.logoFileName,
        referral: form.referral,
      },
      consent: {
        dataProcessing: form.consentData,
        dataAccuracy: form.consentAccuracy,
      },
    };
  }, [form]);

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key as string]) return prev;
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  }

  function toggleChannel(channel: string) {
    setForm((prev) => {
      const has = prev.currentChannels.includes(channel);
      return {
        ...prev,
        currentChannels: has ? prev.currentChannels.filter((c) => c !== channel) : [...prev.currentChannels, channel],
      };
    });
  }

  function validateStep(targetStep: Step) {
    const nextErrors: Record<string, string> = {};

    if (targetStep === 1) {
      if (!form.companyName.trim()) nextErrors.companyName = "Company name is required.";
      if (!form.contactPerson.trim()) nextErrors.contactPerson = "Contact person is required.";
      if (!form.role.trim()) nextErrors.role = "Role / position is required.";
      if (!form.email.trim()) nextErrors.email = "Email is required.";
      if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Enter a valid email.";
      if (!form.phone.trim()) nextErrors.phone = "Phone is required.";
      if (!form.messaging.trim()) nextErrors.messaging = "Preferred chat is required.";
      if (!form.website.trim()) nextErrors.website = "Website is required.";
      if (!form.regions.trim()) nextErrors.regions = "At least one region is required.";
      if (!form.languages.trim()) nextErrors.languages = "At least one language is required.";
      if (!form.propertyTypes.trim()) nextErrors.propertyTypes = "At least one property type is required.";
    }

    if (targetStep === 2) {
      if (!form.onboardingIntent) nextErrors.onboardingIntent = "Service model is required.";
      if (!form.onboardingStatus) nextErrors.onboardingStatus = "Onboarding status is required.";
      if (!form.description.trim() || form.description.trim().length < 40) {
        nextErrors.description = "Please add a short profile description (min 40 chars).";
      }
      if (!form.managedCount.trim()) nextErrors.managedCount = "Managed properties count is required.";
      if (!form.years.trim()) nextErrors.years = "Years of experience is required.";
      if (form.currentChannels.length === 0) nextErrors.currentChannels = "Select at least one active channel.";
      if (!form.logoFileName.trim()) nextErrors.logoFileName = "Upload one logo file.";
    }

    if (targetStep === 3) {
      if (!form.consentData) nextErrors.consentData = "Consent is required to continue.";
      if (!form.consentAccuracy) nextErrors.consentAccuracy = "Please confirm submission accuracy.";
      if (form.websiteHp.trim()) nextErrors.websiteHp = "Spam check failed.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function goNext() {
    if (!validateStep(step)) return;
    setStep((prev) => (prev === 1 ? 2 : 3));
  }

  function goPrev() {
    setStep((prev) => (prev === 3 ? 2 : 1));
  }

  async function submitForm() {
    if (!validateStep(3)) return;

    setSubmitting(true);
    setSubmitState("idle");
    setSubmitMessage("");

    try {
      const res = await fetch(GUEST_REQUEST_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Webhook error (${res.status})`);
      }

      setSubmitState("success");
      setSubmitMessage("Application submitted successfully. Our team will review your PMC profile shortly.");
      setForm(initialState);
      setStep(1);
    } catch {
      setSubmitState("error");
      setSubmitMessage("Submission failed. Please retry in a moment or contact support.");
    } finally {
      setSubmitting(false);
    }
  }

  const intentDetails = intentMeta[form.onboardingIntent];

  return (
    <>
      <section className="mx-auto max-w-[1280px] px-4 pb-6 pt-4">
        <div className="rounded-2xl border border-slate-300 bg-white p-5 md:p-8">
          <p className="text-sm text-slate-500">Home › Collaborate › <span className="font-semibold text-slate-700">PMC Apply</span></p>

          <div className="mt-4 grid gap-5 md:grid-cols-[1.6fr_1fr] md:items-center">
            <div>
              <p className="text-sm font-semibold text-slate-600">Property Management Companies</p>
              <h1 className="mt-1 text-[42px] font-semibold leading-none text-slate-900">Apply as a PMC partner on Villa4you</h1>
              <p className="mt-3 text-[21px] text-slate-600">
                Complete the onboarding form to join our collaboration ecosystem. We review your portfolio profile, regional coverage, and operating model.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <a href="#pmc-form-anchor" className="rounded-xl bg-slate-900 px-5 py-2.5 text-base font-medium text-white">Start application</a>
                <a href="/collaborate" className="rounded-xl border border-slate-800 bg-white px-5 py-2.5 text-base font-medium text-slate-900">Back to collaborate</a>
                <a href="/support" className="rounded-xl border border-slate-800 bg-white px-5 py-2.5 text-base font-medium text-slate-900">Support</a>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-sm text-slate-700">⚡ Structured onboarding</span>
                <span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-sm text-slate-700">🛡️ GDPR-ready consent</span>
                <span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-sm text-slate-700">🧩 Turnstile-ready captcha slot</span>
              </div>
            </div>

            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop"
              alt="PMC onboarding"
              className="h-[260px] w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      <section id="pmc-form-anchor" className="mx-auto max-w-[1280px] px-4 pb-10">
        <div className="rounded-2xl border border-slate-300 bg-white p-4 md:p-6">
          <h2 className="text-[42px] font-semibold leading-none text-slate-900">PMC Application Form</h2>
          <p className="mt-2 text-[21px] text-slate-600">3-step application with validation, dynamic fields, and consent checks before submit.</p>
          <p className="mt-1 text-sm text-slate-500">Required fields are marked with *</p>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[1, 2, 3].map((n) => {
              const current = n as Step;
              const active = step === current;
              const done = step > current;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setStep(current)}
                  className={`rounded-xl border p-3 text-left text-sm ${active ? "border-slate-900 bg-slate-900 text-white" : done ? "border-emerald-600 bg-emerald-50 text-emerald-800" : "border-slate-300 bg-slate-50 text-slate-700"}`}
                >
                  <div className="font-semibold">Step {n}</div>
                  <div className="mt-0.5 text-xs opacity-90">
                    {n === 1 ? "Company & coverage" : n === 2 ? "Operations & profile" : "Review & submit"}
                  </div>
                </button>
              );
            })}
          </div>

          <form className="mt-4 space-y-4" onSubmit={(e) => e.preventDefault()}>
            {step === 1 && (
              <>
                <fieldset className="rounded-xl border border-slate-200 p-3">
                  <legend className="px-2 text-sm font-semibold text-slate-800">Company profile</legend>
                  <div className="grid gap-3 md:grid-cols-2">
                    <label className={labelClass}>Company name *
                      <input className={inputClass} value={form.companyName} onChange={(e) => setField("companyName", e.target.value)} />
                      {errors.companyName && <span className="text-xs text-red-600">{errors.companyName}</span>}
                    </label>
                    <label className={labelClass}>Legal company name
                      <input className={inputClass} value={form.legalName} onChange={(e) => setField("legalName", e.target.value)} />
                    </label>
                    <label className={labelClass}>Contact person *
                      <input className={inputClass} value={form.contactPerson} onChange={(e) => setField("contactPerson", e.target.value)} />
                      {errors.contactPerson && <span className="text-xs text-red-600">{errors.contactPerson}</span>}
                    </label>
                    <label className={labelClass}>Role / position *
                      <select className={inputClass} value={form.role} onChange={(e) => setField("role", e.target.value)}>
                        <option value="">Please select</option>
                        <option value="owner-founder">Owner / Founder</option>
                        <option value="general-manager">General Manager</option>
                        <option value="operations-manager">Operations Manager</option>
                        <option value="sales-business-dev">Sales / Business Development</option>
                        <option value="revenue-manager">Revenue Manager</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.role && <span className="text-xs text-red-600">{errors.role}</span>}
                    </label>
                    <label className={labelClass}>Email *
                      <input type="email" className={inputClass} value={form.email} onChange={(e) => setField("email", e.target.value)} />
                      {errors.email && <span className="text-xs text-red-600">{errors.email}</span>}
                    </label>
                    <label className={labelClass}>Phone *
                      <input className={inputClass} placeholder="+30 ..." value={form.phone} onChange={(e) => setField("phone", e.target.value)} />
                      {errors.phone && <span className="text-xs text-red-600">{errors.phone}</span>}
                    </label>
                    <label className={labelClass}>Preferred chat *
                      <select className={inputClass} value={form.messaging} onChange={(e) => setField("messaging", e.target.value)}>
                        <option value="">Please select</option>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="viber">Viber</option>
                        <option value="telegram">Telegram</option>
                        <option value="email">Email only</option>
                      </select>
                      {errors.messaging && <span className="text-xs text-red-600">{errors.messaging}</span>}
                    </label>
                    <label className={labelClass}>Website *
                      <input className={inputClass} placeholder="https://..." value={form.website} onChange={(e) => setField("website", e.target.value)} />
                      {errors.website && <span className="text-xs text-red-600">{errors.website}</span>}
                    </label>
                  </div>
                </fieldset>

                <fieldset className="rounded-xl border border-slate-200 p-3">
                  <legend className="px-2 text-sm font-semibold text-slate-800">Coverage & portfolio</legend>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div><label className={`${labelClass} mb-0`}>Regions / areas *</label>
                      <PlaceAutocomplete name="regions" placeholder="Halkidiki, Crete..." value={form.regions} onTextChange={(v) => setField("regions", v)} onChange={(p) => { if (p) setField("regions", p.displayName); }} />
                      {errors.regions && <span className="text-xs text-red-600">{errors.regions}</span>}
                    </div>
                    <label className={labelClass}>Languages *
                      <input className={inputClass} placeholder="EN, EL, DE..." value={form.languages} onChange={(e) => setField("languages", e.target.value)} />
                      {errors.languages && <span className="text-xs text-red-600">{errors.languages}</span>}
                    </label>
                    <label className={labelClass}>Property types *
                      <input className={inputClass} placeholder="Villa, Apartment, Complex..." value={form.propertyTypes} onChange={(e) => setField("propertyTypes", e.target.value)} />
                      {errors.propertyTypes && <span className="text-xs text-red-600">{errors.propertyTypes}</span>}
                    </label>
                    <label className={labelClass}>Custom tags
                      <input className={inputClass} placeholder="beachfront, family, luxury" value={form.customTags} onChange={(e) => setField("customTags", e.target.value)} />
                    </label>
                  </div>
                </fieldset>
              </>
            )}

            {step === 2 && (
              <>
                <fieldset className="rounded-xl border border-slate-200 p-3">
                  <legend className="px-2 text-sm font-semibold text-slate-800">Service model</legend>
                  <div className="grid gap-3 md:grid-cols-3">
                    {(Object.keys(intentMeta) as OnboardingIntent[]).map((intent) => {
                      const active = form.onboardingIntent === intent;
                      return (
                        <button
                          key={intent}
                          type="button"
                          onClick={() => setField("onboardingIntent", intent)}
                          className={`rounded-xl border p-3 text-left ${active ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-slate-50 text-slate-700"}`}
                        >
                          <div className="text-sm font-semibold">{intentMeta[intent].title}</div>
                          <div className="mt-1 text-xs opacity-90">{intentMeta[intent].hint}</div>
                        </button>
                      );
                    })}
                  </div>
                  {errors.onboardingIntent && <p className="mt-2 text-xs text-red-600">{errors.onboardingIntent}</p>}

                  <label className={`${labelClass} mt-3 block`}>Onboarding status *
                    <select className={inputClass} value={form.onboardingStatus} onChange={(e) => setField("onboardingStatus", e.target.value as FormState["onboardingStatus"])}>
                      <option value="ready-now">Ready now (can start immediately)</option>
                      <option value="pilot-phase">Pilot phase (small rollout first)</option>
                      <option value="planning">Planning stage (needs alignment first)</option>
                    </select>
                    {errors.onboardingStatus && <span className="text-xs text-red-600">{errors.onboardingStatus}</span>}
                  </label>
                </fieldset>

                <fieldset className="rounded-xl border border-slate-200 p-3">
                  <legend className="px-2 text-sm font-semibold text-slate-800">Operations snapshot</legend>
                  <div className="grid gap-3 md:grid-cols-2">
                    <label className={labelClass}>Managed properties count *
                      <input type="number" className={inputClass} value={form.managedCount} onChange={(e) => setField("managedCount", e.target.value)} />
                      {errors.managedCount && <span className="text-xs text-red-600">{errors.managedCount}</span>}
                    </label>
                    <label className={labelClass}>Years of experience *
                      <input type="number" className={inputClass} value={form.years} onChange={(e) => setField("years", e.target.value)} />
                      {errors.years && <span className="text-xs text-red-600">{errors.years}</span>}
                    </label>
                    <label className={labelClass}>Current PMS / channel manager
                      <input className={inputClass} placeholder="Hostaway, Guesty, Beds24..." value={form.pmsTool} onChange={(e) => setField("pmsTool", e.target.value)} />
                    </label>
                    <label className={labelClass}>Average ADR (optional)
                      <input className={inputClass} placeholder="e.g. 230 EUR" value={form.averageAdr} onChange={(e) => setField("averageAdr", e.target.value)} />
                    </label>
                    <label className={labelClass}>Occupancy target (optional)
                      <input className={inputClass} placeholder="e.g. +12% this season" value={form.occupancyTarget} onChange={(e) => setField("occupancyTarget", e.target.value)} />
                    </label>
                    <label className={labelClass}>How did you hear about us?
                      <select className={inputClass} value={form.referral} onChange={(e) => setField("referral", e.target.value)}>
                        <option value="">Please select</option>
                        <option value="google-search">Google Search</option>
                        <option value="social-media">Social Media</option>
                        <option value="partner-referral">Partner Referral</option>
                        <option value="event-webinar">Event / Webinar</option>
                        <option value="direct-contact">Direct Contact from ClickyTour</option>
                        <option value="other">Other</option>
                      </select>
                    </label>
                  </div>

                  <div className="mt-3">
                    <p className="text-sm font-medium text-slate-700">Current active channels *</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {channelOptions.map((option) => {
                        const active = form.currentChannels.includes(option);
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => toggleChannel(option)}
                            className={`rounded-full border px-3 py-1.5 text-sm ${active ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white text-slate-700"}`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                    {errors.currentChannels && <span className="text-xs text-red-600">{errors.currentChannels}</span>}
                  </div>
                </fieldset>

                <fieldset className="rounded-xl border border-slate-200 p-3">
                  <legend className="px-2 text-sm font-semibold text-slate-800">Company profile content</legend>
                  <p className="text-sm text-slate-600">Selected model: <span className="font-semibold text-slate-800">{intentDetails.title}</span> · {intentDetails.hint}</p>

                  <label className={`${labelClass} mt-3 block`}>Company description *
                    <textarea className={inputClass} rows={4} placeholder="Describe services, destination strengths, and what makes your PMC stand out." value={form.description} onChange={(e) => setField("description", e.target.value)} />
                    {errors.description && <span className="text-xs text-red-600">{errors.description}</span>}
                  </label>

                  <label className={`${labelClass} mt-3 block`}>Upload logo *
                    <input
                      type="file"
                      accept="image/*"
                      className={inputClass}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        setField("logoFileName", file ? file.name : "");
                      }}
                    />
                    <span className="mt-1 block text-xs text-slate-500">Limit: 1 file (logo image).</span>
                    {form.logoFileName && <span className="mt-1 block text-xs text-slate-600">Selected: {form.logoFileName}</span>}
                    {errors.logoFileName && <span className="text-xs text-red-600">{errors.logoFileName}</span>}
                  </label>

                  <label className={`${labelClass} mt-3 block`}>Extra details for this onboarding model
                    <textarea className={inputClass} rows={3} placeholder="Any specific goals, constraints, or region plans" value={form.serviceModelNote} onChange={(e) => setField("serviceModelNote", e.target.value)} />
                  </label>
                </fieldset>
              </>
            )}

            {step === 3 && (
              <>
                <fieldset className="rounded-xl border border-slate-200 p-3">
                  <legend className="px-2 text-sm font-semibold text-slate-800">Consent & verification</legend>
                  <label className="flex items-start gap-2 text-sm text-slate-700">
                    <input type="checkbox" className="mt-1" checked={form.consentData} onChange={(e) => setField("consentData", e.target.checked)} />
                    I consent to data processing and partner-directory review flow.
                  </label>
                  {errors.consentData && <p className="mt-1 text-xs text-red-600">{errors.consentData}</p>}

                  <label className="mt-2 flex items-start gap-2 text-sm text-slate-700">
                    <input type="checkbox" className="mt-1" checked={form.consentAccuracy} onChange={(e) => setField("consentAccuracy", e.target.checked)} />
                    I confirm submitted data is accurate and authorized by my company.
                  </label>
                  {errors.consentAccuracy && <p className="mt-1 text-xs text-red-600">{errors.consentAccuracy}</p>}

                  {/* Configure NEXT_PUBLIC_TURNSTILE_SITEKEY in env to enable real Turnstile widget */}
                  <div id="cf-turnstile" className="cf-turnstile mt-3" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY || "placeholder"}></div>

                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    value={form.websiteHp}
                    onChange={(e) => setField("websiteHp", e.target.value)}
                  />
                  {errors.websiteHp && <p className="mt-1 text-xs text-red-600">{errors.websiteHp}</p>}
                </fieldset>
              </>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-3">
                <button type="button" onClick={goPrev} disabled={step === 1} className="rounded-xl border border-slate-800 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 disabled:cursor-not-allowed disabled:opacity-40">
                  Previous
                </button>
                {step < 3 ? (
                  <button type="button" onClick={goNext} className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white">
                    Next step
                  </button>
                ) : (
                  <button type="button" onClick={submitForm} disabled={submitting} className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60">
                    {submitting ? "Submitting..." : "Submit PMC application"}
                  </button>
                )}
              </div>

              <a href="/collaborate" className="text-sm font-medium text-slate-600 underline underline-offset-2">Need to adjust collaboration path?</a>
            </div>

            {submitState !== "idle" && (
              <p className={`rounded-lg border px-3 py-2 text-sm ${submitState === "success" ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-red-300 bg-red-50 text-red-700"}`}>
                {submitMessage}
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
