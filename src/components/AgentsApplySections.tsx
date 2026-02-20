"use client";

import { useMemo, useState } from "react";
import { PlaceAutocomplete } from "@/components/PlaceAutocomplete";

type Step = 1 | 2 | 3;

type AgentType = "independent" | "agency" | "tour-operator";

type FormState = {
  businessName: string;
  legalName: string;
  contactName: string;
  role: string;
  email: string;
  phone: string;
  website: string;
  regions: string;
  languages: string;
  agentType: AgentType;
  partnershipModel: "free" | "pro" | "commission";
  productsFocus: string[];
  monthlyLeads: string;
  currentTools: string;
  wantsWhiteLabel: boolean;
  needsNetPricing: boolean;
  profileNote: string;
  requestNote: string;
  referral: string;
  consentData: boolean;
  consentAccuracy: boolean;
  websiteHp: string;
};

const GUEST_REQUEST_API_URL = "/api/guest-request";
const inputClass = "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-slate-600";
const labelClass = "text-sm font-medium text-slate-700";

const productOptions = ["Rentals", "Tours & Activities", "Real Estate", "Services"];

const agentTypeMeta: Record<AgentType, { title: string; hint: string }> = {
  independent: { title: "Independent Agent", hint: "Solo or small operation focused on fast client fulfillment." },
  agency: { title: "Travel Agency", hint: "Agency workflow with repeatable proposals and team collaboration." },
  "tour-operator": { title: "Tour Operator", hint: "Operator model with packaged itineraries and recurring demand." },
};

const initial: FormState = {
  businessName: "",
  legalName: "",
  contactName: "",
  role: "",
  email: "",
  phone: "",
  website: "",
  regions: "",
  languages: "",
  agentType: "independent",
  partnershipModel: "pro",
  productsFocus: ["Rentals"],
  monthlyLeads: "",
  currentTools: "",
  wantsWhiteLabel: true,
  needsNetPricing: true,
  profileNote: "",
  requestNote: "",
  referral: "",
  consentData: false,
  consentAccuracy: false,
  websiteHp: "",
};

function splitCsv(value: string) {
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

export function AgentsApplySections() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const payload = useMemo(() => {
    return {
      source: "villa4you-react",
      formType: "agents-apply",
      submittedAt: new Date().toISOString(),
      business: {
        businessName: form.businessName,
        legalName: form.legalName,
        contactName: form.contactName,
        role: form.role,
        email: form.email,
        phone: form.phone,
        website: form.website,
      },
      agentProfile: {
        agentType: form.agentType,
        partnershipModel: form.partnershipModel,
        productsFocus: form.productsFocus,
        regions: splitCsv(form.regions),
        languages: splitCsv(form.languages),
        monthlyLeads: form.monthlyLeads,
        currentTools: form.currentTools,
      },
      partnershipNeeds: {
        whiteLabelQuotes: form.wantsWhiteLabel,
        netPricing: form.needsNetPricing,
        profileNote: form.profileNote,
        requestNote: form.requestNote,
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

  function toggleProduct(product: string) {
    setForm((prev) => {
      const has = prev.productsFocus.includes(product);
      const next = has ? prev.productsFocus.filter((p) => p !== product) : [...prev.productsFocus, product];
      return { ...prev, productsFocus: next.length ? next : ["Rentals"] };
    });
  }

  function validate(targetStep: Step) {
    const next: Record<string, string> = {};

    if (targetStep === 1) {
      if (!form.businessName.trim()) next.businessName = "Business name is required.";
      if (!form.legalName.trim()) next.legalName = "Legal name is required.";
      if (!form.contactName.trim()) next.contactName = "Contact name is required.";
      if (!form.role.trim()) next.role = "Role / position is required.";
      if (!form.email.trim()) next.email = "Email is required.";
      if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email.";
      if (!form.phone.trim()) next.phone = "Phone is required.";
      if (!form.website.trim()) next.website = "Website is required.";
      if (!form.regions.trim()) next.regions = "At least one region is required.";
      if (!form.languages.trim()) next.languages = "At least one language is required.";
    }

    if (targetStep === 2) {
      if (!form.partnershipModel) next.partnershipModel = "Please select a partnership model.";
      if (form.productsFocus.length === 0) next.productsFocus = "Select at least one focus area.";
      if (!form.monthlyLeads.trim()) next.monthlyLeads = "Monthly lead estimate is required.";
      if (!form.referral.trim()) next.referral = "Please select how you heard about us.";
      if (!form.profileNote.trim() || form.profileNote.trim().length < 30) {
        next.profileNote = "Add a short profile note (min 30 characters).";
      }
    }

    if (targetStep === 3) {
      if (!form.consentData) next.consentData = "Consent is required.";
      if (!form.consentAccuracy) next.consentAccuracy = "Please confirm submission accuracy.";
      if (form.websiteHp.trim()) next.websiteHp = "Spam check failed.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function nextStep() {
    if (!validate(step)) return;
    setStep((prev) => (prev === 1 ? 2 : 3));
  }

  function prevStep() {
    setStep((prev) => (prev === 3 ? 2 : 1));
  }

  async function submit() {
    if (!validate(3)) return;

    setSubmitting(true);
    setStatus("idle");
    setMessage("");

    try {
      const res = await fetch(GUEST_REQUEST_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Webhook submit failed");

      setStatus("success");
      setMessage("Agent application submitted successfully. Our team will contact you after profile review.");
      setForm(initial);
      setStep(1);
    } catch {
      setStatus("error");
      setMessage("Submission failed. Please retry in a moment or contact support.");
    } finally {
      setSubmitting(false);
    }
  }

  const typeDetails = agentTypeMeta[form.agentType];

  return (
    <>
      <section className="mx-auto max-w-[1280px] px-4 pb-6 pt-4">
        <div className="rounded-2xl border border-slate-300 bg-white p-5 md:p-8">
          <p className="text-sm text-slate-500">Home › Collaborate › Agents › <span className="font-semibold text-slate-700">Agents Apply</span></p>

          <div className="mt-4 grid gap-5 md:grid-cols-[1.6fr_1fr] md:items-center">
            <div>
              <p className="text-sm font-semibold text-slate-600">Agents / Tour Operators</p>
              <h1 className="mt-1 text-[42px] font-semibold leading-none text-slate-900">Work smarter. Sell more. Earn more.</h1>
              <p className="mt-3 text-[21px] text-slate-600">Apply to access rentals, services, and real-estate inventory with white-label offers and net-pricing options.</p>

              <div className="mt-4 flex flex-wrap gap-3">
                <a href="#agents-apply-anchor" className="rounded-xl bg-slate-900 px-5 py-2.5 text-base font-medium text-white">Start application</a>
                <a href="/agents" className="rounded-xl border border-slate-800 bg-white px-5 py-2.5 text-base font-medium text-slate-900">Back to Agents</a>
                <a href="/support" className="rounded-xl border border-slate-800 bg-white px-5 py-2.5 text-base font-medium text-slate-900">Support</a>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-sm text-slate-700">⚡ Structured onboarding</span>
                <span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-sm text-slate-700">🛡️ GDPR-ready consent</span>
                <span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-sm text-slate-700">🧩 Turnstile-ready captcha slot</span>
              </div>
            </div>

            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop"
              alt="Agents onboarding"
              className="h-[260px] w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      <section id="agents-apply-anchor" className="mx-auto max-w-[1280px] px-4 pb-10">
        <div className="rounded-2xl border border-slate-300 bg-white p-4 md:p-6">
          <h2 className="text-[42px] font-semibold leading-none text-slate-900">Agents Application Form</h2>
          <p className="mt-2 text-[21px] text-slate-600">3-step application with profile validation and consent checks before submit.</p>
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
                    {n === 1 ? "Business profile" : n === 2 ? "Workflow & tools" : "Review & submit"}
                  </div>
                </button>
              );
            })}
          </div>

          <form className="mt-4 space-y-4" onSubmit={(e) => e.preventDefault()}>
            {step === 1 && (
              <fieldset className="rounded-xl border border-slate-200 p-3">
                <legend className="px-2 text-sm font-semibold text-slate-800">Business profile</legend>
                <div className="grid gap-3 md:grid-cols-2">
                  <label className={labelClass}>Business name *
                    <input className={inputClass} value={form.businessName} onChange={(e) => setField("businessName", e.target.value)} />
                    {errors.businessName && <span className="text-xs text-red-600">{errors.businessName}</span>}
                  </label>
                  <label className={labelClass}>Legal name *
                    <input className={inputClass} value={form.legalName} onChange={(e) => setField("legalName", e.target.value)} />
                    {errors.legalName && <span className="text-xs text-red-600">{errors.legalName}</span>}
                  </label>
                  <label className={labelClass}>Contact name *
                    <input className={inputClass} value={form.contactName} onChange={(e) => setField("contactName", e.target.value)} />
                    {errors.contactName && <span className="text-xs text-red-600">{errors.contactName}</span>}
                  </label>
                  <label className={labelClass}>Role / Position *
                    <select className={inputClass} value={form.role} onChange={(e) => setField("role", e.target.value)}>
                      <option value="">Please select</option>
                      <option value="owner-founder">Owner / Founder</option>
                      <option value="sales-manager">Sales Manager</option>
                      <option value="travel-agent">Travel Agent</option>
                      <option value="tour-operator-manager">Tour Operator Manager</option>
                      <option value="business-development">Business Development</option>
                      <option value="operations-manager">Operations Manager</option>
                    </select>
                    {errors.role && <span className="text-xs text-red-600">{errors.role}</span>}
                  </label>
                  <label className={labelClass}>Email *
                    <input type="email" className={inputClass} value={form.email} onChange={(e) => setField("email", e.target.value)} />
                    {errors.email && <span className="text-xs text-red-600">{errors.email}</span>}
                  </label>
                  <label className={labelClass}>Phone *
                    <input className={inputClass} value={form.phone} onChange={(e) => setField("phone", e.target.value)} />
                    {errors.phone && <span className="text-xs text-red-600">{errors.phone}</span>}
                  </label>
                  <label className={labelClass}>Website *
                    <input className={inputClass} placeholder="https://..." value={form.website} onChange={(e) => setField("website", e.target.value)} />
                    {errors.website && <span className="text-xs text-red-600">{errors.website}</span>}
                  </label>
                  <div><label className={`${labelClass} mb-0`}>Regions *</label>
                    <PlaceAutocomplete name="regions" placeholder="Halkidiki, Crete..." value={form.regions} onTextChange={(v) => setField("regions", v)} onChange={(p) => { if (p) setField("regions", p.displayName); }} />
                    {errors.regions && <span className="text-xs text-red-600">{errors.regions}</span>}
                  </div>
                  <label className={labelClass}>Languages *
                    <input className={inputClass} placeholder="EN, EL, DE..." value={form.languages} onChange={(e) => setField("languages", e.target.value)} />
                    {errors.languages && <span className="text-xs text-red-600">{errors.languages}</span>}
                  </label>
                </div>
              </fieldset>
            )}

            {step === 2 && (
              <>
                <fieldset className="rounded-xl border border-slate-200 p-3">
                  <legend className="px-2 text-sm font-semibold text-slate-800">Agent model</legend>
                  <div className="grid gap-3 md:grid-cols-3">
                    {(Object.keys(agentTypeMeta) as AgentType[]).map((type) => {
                      const active = form.agentType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setField("agentType", type)}
                          className={`rounded-xl border p-3 text-left ${active ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-slate-50 text-slate-700"}`}
                        >
                          <div className="text-sm font-semibold">{agentTypeMeta[type].title}</div>
                          <div className="mt-1 text-xs opacity-90">{agentTypeMeta[type].hint}</div>
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-sm text-slate-600">Selected: <span className="font-semibold text-slate-900">{typeDetails.title}</span> · {typeDetails.hint}</p>
                </fieldset>

                <fieldset className="rounded-xl border border-slate-200 p-3">
                  <legend className="px-2 text-sm font-semibold text-slate-800">Workflow & tools</legend>

                  <p className="text-sm font-medium text-slate-700">Partnership model *</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {[
                      { id: "free", label: "Free Access" },
                      { id: "pro", label: "Pro Plan" },
                      { id: "commission", label: "Commission Model" },
                    ].map((model) => {
                      const active = form.partnershipModel === model.id;
                      return (
                        <button
                          key={model.id}
                          type="button"
                          onClick={() => setField("partnershipModel", model.id as FormState["partnershipModel"])}
                          className={`rounded-full border px-3 py-1.5 text-sm ${active ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white text-slate-700"}`}
                        >
                          {model.label}
                        </button>
                      );
                    })}
                  </div>
                  {errors.partnershipModel && <p className="mt-1 text-xs text-red-600">{errors.partnershipModel}</p>}

                  <p className="mt-3 text-sm font-medium text-slate-700">Products focus *</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {productOptions.map((option) => {
                      const active = form.productsFocus.includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleProduct(option)}
                          className={`rounded-full border px-3 py-1.5 text-sm ${active ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white text-slate-700"}`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                  {errors.productsFocus && <p className="mt-1 text-xs text-red-600">{errors.productsFocus}</p>}

                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    <label className={labelClass}>Monthly lead estimate *
                      <input className={inputClass} placeholder="e.g. 20-50 leads/month" value={form.monthlyLeads} onChange={(e) => setField("monthlyLeads", e.target.value)} />
                      {errors.monthlyLeads && <span className="text-xs text-red-600">{errors.monthlyLeads}</span>}
                    </label>
                    <label className={labelClass}>Current tools (CRM, booking, quotation)
                      <input className={inputClass} placeholder="Kommo, HubSpot, custom CRM..." value={form.currentTools} onChange={(e) => setField("currentTools", e.target.value)} />
                    </label>
                  </div>

                  <div className="mt-3 grid gap-2 md:grid-cols-2">
                    <label className="flex items-start gap-2 rounded-lg border border-slate-200 p-2 text-sm text-slate-700">
                      <input type="checkbox" className="mt-1" checked={form.wantsWhiteLabel} onChange={(e) => setField("wantsWhiteLabel", e.target.checked)} />
                      Need white-label offers (PDF/link)
                    </label>
                    <label className="flex items-start gap-2 rounded-lg border border-slate-200 p-2 text-sm text-slate-700">
                      <input type="checkbox" className="mt-1" checked={form.needsNetPricing} onChange={(e) => setField("needsNetPricing", e.target.checked)} />
                      Need net pricing access
                    </label>
                  </div>

                  <label className={`${labelClass} mt-3 block`}>Agent profile note *
                    <textarea className={inputClass} rows={3} placeholder="Describe client profile, destinations, and what you sell most." value={form.profileNote} onChange={(e) => setField("profileNote", e.target.value)} />
                    {errors.profileNote && <span className="text-xs text-red-600">{errors.profileNote}</span>}
                  </label>

                  <label className={`${labelClass} mt-3 block`}>Advanced request
                    <textarea className={inputClass} rows={3} placeholder="Any specific partnership request, custom flow, or support need." value={form.requestNote} onChange={(e) => setField("requestNote", e.target.value)} />
                  </label>

                  <label className={`${labelClass} mt-3 block`}>How did you hear about us? *
                    <select className={inputClass} value={form.referral} onChange={(e) => setField("referral", e.target.value)}>
                      <option value="">Please select</option>
                      <option value="google-search">Google Search</option>
                      <option value="social-media">Social Media</option>
                      <option value="existing-partner">Existing Partner Referral</option>
                      <option value="event-webinar">Event / Webinar</option>
                      <option value="direct-contact">Direct Contact from ClickyTour</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.referral && <span className="text-xs text-red-600">{errors.referral}</span>}
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
                    I consent to data processing for partner profile review and onboarding.
                  </label>
                  {errors.consentData && <p className="mt-1 text-xs text-red-600">{errors.consentData}</p>}

                  <label className="mt-2 flex items-start gap-2 text-sm text-slate-700">
                    <input type="checkbox" className="mt-1" checked={form.consentAccuracy} onChange={(e) => setField("consentAccuracy", e.target.checked)} />
                    I confirm submitted information is accurate and authorized.
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
                <button type="button" onClick={prevStep} disabled={step === 1} className="rounded-xl border border-slate-800 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
                {step < 3 ? (
                  <button type="button" onClick={nextStep} className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white">Next step</button>
                ) : (
                  <button type="button" onClick={submit} disabled={submitting} className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60">{submitting ? "Submitting..." : "Submit agent application"}</button>
                )}
              </div>

              <a href="/agents" className="text-sm font-medium text-slate-600 underline underline-offset-2">Need to review agent details first?</a>
            </div>

            {status !== "idle" && (
              <p className={`rounded-lg border px-3 py-2 text-sm ${status === "success" ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-red-300 bg-red-50 text-red-700"}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
