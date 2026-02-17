"use client";

import { useEffect, useMemo, useState } from "react";
import { serviceTaxonomy } from "@/lib/serviceTaxonomy";
import { trackSearchHandoffClick } from "@/lib/searchAnalytics";

type Step = 1 | 2 | 3;
type GuestRole = "travel-rentals" | "tours-activities" | "real-estate";

type FormState = {
  guestRole: GuestRole;

  // common
  destination: string;
  adults: string;
  email: string;
  phone: string;

  // step 1 / role specific
  checkIn: string;
  checkOut: string;
  serviceCategory: string;
  serviceSubcategory: string;
  serviceDateTime: string;
  realEstateMode: string;
  realEstateType: string;
  regions: string;

  // step 2 / role specific
  bedrooms: string;
  children3to14: string;
  children0to3: string;
  distanceToBeach: string;
  distanceToInfrastructure: string;
  pickup: string;
  dropoff: string;
  preferredTimeWindow: string;
  realEstateBedrooms: string;
  propertyTypesMulti: string[];
  minSqm: string;
  maxSqm: string;
  featuresMulti: string[];
  timeframe: string;
  legalSupport: boolean;

  // step 3
  budgetTotal: string;
  budgetFrom: string;
  budgetTo: string;
  firstName: string;
  lastName: string;
  country: string;
  notes: string;
  consentData: boolean;
  consentMarketing: boolean;

  websiteHp: string;
};

const WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/14582531/ueuzwpy/";
const inputClass = "mt-1 h-9 w-full rounded-md border border-slate-300 bg-[#eef8f8] px-2.5 text-[12px] text-slate-800";

const initial: FormState = {
  guestRole: "travel-rentals",

  destination: "",
  adults: "2",
  email: "",
  phone: "",

  checkIn: "",
  checkOut: "",
  serviceCategory: "",
  serviceSubcategory: "",
  serviceDateTime: "",
  realEstateMode: "",
  realEstateType: "Home",
  regions: "",

  bedrooms: "",
  children3to14: "0",
  children0to3: "0",
  distanceToBeach: "",
  distanceToInfrastructure: "",
  pickup: "",
  dropoff: "",
  preferredTimeWindow: "",
  realEstateBedrooms: "any",
  propertyTypesMulti: [],
  minSqm: "",
  maxSqm: "",
  featuresMulti: [],
  timeframe: "",
  legalSupport: false,

  budgetTotal: "",
  budgetFrom: "100",
  budgetTo: "150",
  firstName: "",
  lastName: "",
  country: "",
  notes: "",
  consentData: false,
  consentMarketing: false,

  websiteHp: "",
};

const roleMeta: Record<GuestRole, { title: string; subtitle: string; consentText: string }> = {
  "travel-rentals": {
    title: "Request your vacation stay",
    subtitle: "Fill the form and we will respond quickly with tailored proposals within 1 business day.",
    consentText: "I consent to processing my data for this stay request.",
  },
  "tours-activities": {
    title: "Request a Service",
    subtitle: "Fill the form and we will respond quickly with tailored proposals within 1 business day.",
    consentText: "I consent to processing my data for this service request.",
  },
  "real-estate": {
    title: "Tell us what you're looking for",
    subtitle: "Fill the form and we will respond quickly with tailored proposals within 1 business day.",
    consentText: "I consent to processing my data for this real-estate request.",
  },
};

const quickServiceCategories = serviceTaxonomy;

const propertyTypeOptions = ["Apartment", "House", "Villa", "Land Plot", "Commercial"];
const featureOptions = ["Sea View", "Pool", "Parking", "Garden", "New Build", "Renovated"];

export function QuickRequestPanel() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(initial);
  const maxStep: Step = form.guestRole === "travel-rentals" ? 2 : 3;
  const currentStep: Step = maxStep === 2 ? (step === 1 ? 1 : 2) : step;

  useEffect(() => {
    if (maxStep === 2 && step === 3) setStep(2);
  }, [maxStep, step]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");

  const selectedQuickServiceCategory = useMemo(
    () => quickServiceCategories.find((c) => c.id === form.serviceCategory),
    [form.serviceCategory]
  );
  const quickServiceSubcategories = selectedQuickServiceCategory?.subcategories ?? [];

  const payload = useMemo(
    () => ({
      source: "villa4you-react",
      formType: "quick-request",
      submittedAt: new Date().toISOString(),
      guestRole: form.guestRole,
      step1: {
        destination: form.destination,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        adults: Number(form.adults || 0),
        email: form.email,
        phone: form.phone,
        serviceCategory: form.serviceCategory,
        serviceSubcategory: form.serviceSubcategory,
        serviceDateTime: form.serviceDateTime,
        realEstateMode: form.realEstateMode,
        realEstateType: form.realEstateType,
        regions: form.regions,
      },
      step2: {
        rentalsBedrooms: form.bedrooms,
        children3to14: Number(form.children3to14 || 0),
        children0to3: Number(form.children0to3 || 0),
        distanceToBeach: form.distanceToBeach,
        distanceToInfrastructure: form.distanceToInfrastructure,
        pickup: form.pickup,
        dropoff: form.dropoff,
        preferredTimeWindow: form.preferredTimeWindow,
        realEstateBedrooms: form.realEstateBedrooms,
        propertyTypesMulti: form.propertyTypesMulti,
        minSqm: form.minSqm,
        maxSqm: form.maxSqm,
        featuresMulti: form.featuresMulti,
        timeframe: form.timeframe,
        legalSupport: form.legalSupport,
      },
      step3: {
        budgetTotal: form.budgetTotal,
        budgetFrom: form.budgetFrom,
        budgetTo: form.budgetTo,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        country: form.country,
        notes: form.notes,
        consentData: form.consentData,
        consentMarketing: form.consentMarketing,
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

  function toggleMulti(key: "propertyTypesMulti" | "featuresMulti", value: string) {
    setForm((prev) => {
      const has = prev[key].includes(value);
      return {
        ...prev,
        [key]: has ? prev[key].filter((x) => x !== value) : [...prev[key], value],
      };
    });
  }

  function validateStep(target: Step) {
    const next: Record<string, string> = {};

    if (target === 1) {
      if (!form.email.trim()) next.email = "Required";
      if (!form.phone.trim()) next.phone = "Required";

      if (form.guestRole === "travel-rentals") {
        if (!form.checkIn.trim()) next.checkIn = "Required";
        if (!form.checkOut.trim()) next.checkOut = "Required";
        if (!form.destination.trim()) next.destination = "Required";
        if (!form.adults.trim() || Number(form.adults) < 1) next.adults = "Min 1";
      }

      if (form.guestRole === "tours-activities") {
        if (!form.destination.trim()) next.destination = "Required";
        if (!form.serviceCategory.trim()) next.serviceCategory = "Required";
        if (!form.serviceDateTime.trim()) next.serviceDateTime = "Required";
        if (!form.adults.trim() || Number(form.adults) < 1) next.adults = "Min 1";
      }

      if (form.guestRole === "real-estate") {
        if (!form.realEstateMode.trim()) next.realEstateMode = "Required";
        if (!form.realEstateType.trim()) next.realEstateType = "Required";
        if (!form.regions.trim()) next.regions = "Required";
      }
    }

    if (target === 2) {
      if (form.websiteHp.trim()) next.websiteHp = "Spam check failed.";

      if (form.guestRole === "travel-rentals") {
        if (!form.firstName.trim()) next.firstName = "Required";
        if (!form.lastName.trim()) next.lastName = "Required";
        if (!form.country.trim()) next.country = "Required";
        if (!form.bedrooms.trim()) next.bedrooms = "Required";
        if (!form.distanceToBeach.trim()) next.distanceToBeach = "Required";
        if (!form.distanceToInfrastructure.trim()) next.distanceToInfrastructure = "Required";
        const from = Number(form.budgetFrom || 0);
        const to = Number(form.budgetTo || 0);
        if (!form.budgetFrom.trim() || Number.isNaN(from) || from < 100) next.budgetFrom = "Min 100";
        if (!form.budgetTo.trim() || Number.isNaN(to) || to < from + 50) next.budgetTo = "Must be at least +50 from Budget From";
        if (!form.email.trim()) next.email = "Required";
        if (!form.consentData) next.consentData = "Consent is required.";
      }

      if (form.guestRole === "real-estate") {
        if (form.propertyTypesMulti.length === 0) next.propertyTypesMulti = "Select at least one";
        if (form.budgetFrom && form.budgetTo && Number(form.budgetFrom) > Number(form.budgetTo)) {
          next.budgetTo = "Budget To should be >= Budget From.";
        }
      }
    }

    if (target === 3) {
      if (!form.firstName.trim()) next.firstName = "Required";
      if (!form.lastName.trim()) next.lastName = "Required";
      if (!form.country.trim()) next.country = "Required";
      if (!form.email.trim()) next.email = "Required";
      if (!form.consentData) next.consentData = "Consent is required.";
      if (form.websiteHp.trim()) next.websiteHp = "Spam check failed.";

    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function submit() {
    if (!validateStep(maxStep)) return;
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

  const meta = roleMeta[form.guestRole];

  return (
    <>
      <h2 className="text-[18px] font-semibold leading-none text-slate-900">{meta.title}</h2>
      <p className="mt-1 text-[11px] text-slate-600">{meta.subtitle}</p>
      <a href="/search?vertical=all" onClick={() => trackSearchHandoffClick({ vertical: "all", source_page: "quick_request", handoff_surface: "quick_request_global_search", target_url: "/search?vertical=all" })} className="mt-1 inline-flex text-[11px] font-medium text-slate-900 underline underline-offset-2">Open global search</a>

      <p className="mt-2 text-[11px] font-semibold text-slate-600">Step {currentStep} of {maxStep}</p>

      {currentStep === 1 && (
        <label className="mt-2 block text-[11px] font-semibold text-slate-700">
          I&apos;m a...
          <select className={inputClass} value={form.guestRole} onChange={(e) => setField("guestRole", e.target.value as GuestRole)}>
            <option value="travel-rentals">Guest (Travel & Rentals)</option>
            <option value="tours-activities">Guest (Tours & Activities)</option>
            <option value="real-estate">Guest (Real Estate Buyer / Renter)</option>
          </select>
        </label>
      )}

      {currentStep === 1 && (
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {form.guestRole === "travel-rentals" && (
            <>
              <label className="text-[10px] font-semibold text-slate-700">Check-in*
                <input type="date" className={inputClass} value={form.checkIn} onChange={(e) => setField("checkIn", e.target.value)} />
                {errors.checkIn && <span className="text-[10px] text-red-600">{errors.checkIn}</span>}
              </label>
              <label className="text-[10px] font-semibold text-slate-700">Check-out*
                <input type="date" className={inputClass} value={form.checkOut} onChange={(e) => setField("checkOut", e.target.value)} />
                {errors.checkOut && <span className="text-[10px] text-red-600">{errors.checkOut}</span>}
              </label>
              <label className="text-[10px] font-semibold text-slate-700">Destination / Region*
                <input className={inputClass} placeholder="e.g., Santorini" value={form.destination} onChange={(e) => setField("destination", e.target.value)} />
                {errors.destination && <span className="text-[10px] text-red-600">{errors.destination}</span>}
              </label>
              <label className="text-[10px] font-semibold text-slate-700">Adults*
                <input type="number" min={1} className={inputClass} value={form.adults} onChange={(e) => setField("adults", e.target.value)} />
                {errors.adults && <span className="text-[10px] text-red-600">{errors.adults}</span>}
              </label>
            </>
          )}

          {form.guestRole === "tours-activities" && (
            <>
              <label className="text-[10px] font-semibold text-slate-700">Destination / Region*
                <input className={inputClass} placeholder="e.g., Chania" value={form.destination} onChange={(e) => setField("destination", e.target.value)} />
                {errors.destination && <span className="text-[10px] text-red-600">{errors.destination}</span>}
              </label>
              <label className="text-[10px] font-semibold text-slate-700">Service Category*
                <select
                  className={inputClass}
                  value={form.serviceCategory}
                  onChange={(e) => {
                    const nextCategory = e.target.value;
                    setField("serviceCategory", nextCategory);
                    const firstSub = quickServiceCategories.find((c) => c.id === nextCategory)?.subcategories?.[0]?.id ?? "";
                    setField("serviceSubcategory", firstSub);
                  }}
                >
                  <option value="">Please Select</option>
                  {quickServiceCategories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
                {errors.serviceCategory && <span className="text-[10px] text-red-600">{errors.serviceCategory}</span>}
              </label>
              <label className="text-[10px] font-semibold text-slate-700">Subcategory (optional)
                <select className={inputClass} value={form.serviceSubcategory} onChange={(e) => setField("serviceSubcategory", e.target.value)} disabled={!form.serviceCategory}>
                  <option value="">— Optional —</option>
                  {quickServiceSubcategories.map((sub) => (
                    <option key={sub.id} value={sub.id}>{sub.name}</option>
                  ))}
                </select>
              </label>
              <label className="text-[10px] font-semibold text-slate-700">Date & Time*
                <input type="datetime-local" className={inputClass} value={form.serviceDateTime} onChange={(e) => setField("serviceDateTime", e.target.value)} />
                {errors.serviceDateTime && <span className="text-[10px] text-red-600">{errors.serviceDateTime}</span>}
              </label>
              <label className="text-[10px] font-semibold text-slate-700">Adults*
                <input type="number" min={1} className={inputClass} value={form.adults} onChange={(e) => setField("adults", e.target.value)} />
                {errors.adults && <span className="text-[10px] text-red-600">{errors.adults}</span>}
              </label>
            </>
          )}

          {form.guestRole === "real-estate" && (
            <>
              <label className="text-[10px] font-semibold text-slate-700">Mode*
                <select className={inputClass} value={form.realEstateMode} onChange={(e) => setField("realEstateMode", e.target.value)}>
                  <option value="">—</option>
                  <option value="buy">Buy</option>
                  <option value="rent">Rent</option>
                </select>
                {errors.realEstateMode && <span className="text-[10px] text-red-600">{errors.realEstateMode}</span>}
              </label>
              <label className="text-[10px] font-semibold text-slate-700">Type*
                <select className={inputClass} value={form.realEstateType} onChange={(e) => setField("realEstateType", e.target.value)}>
                  <option>Home</option>
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>Land</option>
                </select>
              </label>
              <label className="text-[10px] font-semibold text-slate-700 sm:col-span-2">Regions*
                <input className={inputClass} value={form.regions} onChange={(e) => setField("regions", e.target.value)} />
                {errors.regions && <span className="text-[10px] text-red-600">{errors.regions}</span>}
              </label>
            </>
          )}

          <label className="text-[10px] font-semibold text-slate-700">Email*
            <input type="email" className={inputClass} value={form.email} onChange={(e) => setField("email", e.target.value)} />
            {errors.email && <span className="text-[10px] text-red-600">{errors.email}</span>}
          </label>
          <label className="text-[10px] font-semibold text-slate-700">Phone*
            <input className={inputClass} value={form.phone} onChange={(e) => setField("phone", e.target.value)} />
            {errors.phone && <span className="text-[10px] text-red-600">{errors.phone}</span>}
          </label>
        </div>
      )}

      {currentStep === 2 && (
        <div className="mt-2 space-y-2">
          {form.guestRole === "travel-rentals" && (
            <div className="grid gap-2 sm:grid-cols-2">
              <label className="text-[10px] font-semibold text-slate-700">Bedrooms*
                <select className={inputClass} value={form.bedrooms} onChange={(e) => setField("bedrooms", e.target.value)}>
                  <option value="">Please Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4+">4+</option>
                </select>
                {errors.bedrooms && <span className="text-[10px] text-red-600">{errors.bedrooms}</span>}
              </label>
              <label className="text-[10px] font-semibold text-slate-700">Adults*
                <input type="number" min={1} className={inputClass} value={form.adults} onChange={(e) => setField("adults", e.target.value)} />
              </label>
              <label className="text-[10px] font-semibold text-slate-700">Children (3–14)
                <select className={inputClass} value={form.children3to14} onChange={(e) => setField("children3to14", e.target.value)}>
                  <option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>
                </select>
              </label>
              <label className="text-[10px] font-semibold text-slate-700">Children (0–3)
                <select className={inputClass} value={form.children0to3} onChange={(e) => setField("children0to3", e.target.value)}>
                  <option value="0">0</option><option value="1">1</option><option value="2">2</option>
                </select>
              </label>
              <label className="text-[10px] font-semibold text-slate-700">Distance to beach (m)*
                <select className={inputClass} value={form.distanceToBeach} onChange={(e) => setField("distanceToBeach", e.target.value)}>
                  <option value="">Please Select</option><option value="0-300">0-300</option><option value="300-700">300-700</option><option value="700-1500">700-1500</option><option value="1500+">1500+</option>
                </select>
                {errors.distanceToBeach && <span className="text-[10px] text-red-600">{errors.distanceToBeach}</span>}
              </label>
              <label className="text-[10px] font-semibold text-slate-700">Distance to infrastructure (km)*
                <select className={inputClass} value={form.distanceToInfrastructure} onChange={(e) => setField("distanceToInfrastructure", e.target.value)}>
                  <option value="">Please Select</option><option value="0-1">0-1</option><option value="1-3">1-3</option><option value="3-7">3-7</option><option value="7+">7+</option>
                </select>
                {errors.distanceToInfrastructure && <span className="text-[10px] text-red-600">{errors.distanceToInfrastructure}</span>}
              </label>
            </div>
          )}

          {form.guestRole === "tours-activities" && (
            <div className="grid gap-2 sm:grid-cols-2">
              <label className="text-[10px] font-semibold text-slate-700">Subcategory (optional)
                <select className={inputClass} value={form.serviceSubcategory} onChange={(e) => setField("serviceSubcategory", e.target.value)} disabled={!form.serviceCategory}>
                  <option value="">? Optional ?</option>
                  {quickServiceSubcategories.map((sub) => (
                    <option key={sub.id} value={sub.id}>{sub.name}</option>
                  ))}
                </select>
              </label>
              <label className="text-[10px] font-semibold text-slate-700">Pickup (optional)
                <input className={inputClass} placeholder="Hotel or address" value={form.pickup} onChange={(e) => setField("pickup", e.target.value)} />
              </label>
              <label className="text-[10px] font-semibold text-slate-700">Dropoff (optional)
                <input className={inputClass} placeholder="Hotel or address" value={form.dropoff} onChange={(e) => setField("dropoff", e.target.value)} />
              </label>
              <label className="text-[10px] font-semibold text-slate-700">Preferred time window (optional)
                <select className={inputClass} value={form.preferredTimeWindow} onChange={(e) => setField("preferredTimeWindow", e.target.value)}>
                  <option value="">No preference</option><option value="morning">Morning</option><option value="afternoon">Afternoon</option><option value="evening">Evening</option>
                </select>
              </label>
              <label className="text-[10px] font-semibold text-slate-700 sm:col-span-2">Budget (optional, total)
                <input className={inputClass} placeholder="e.g., 120" value={form.budgetTotal} onChange={(e) => setField("budgetTotal", e.target.value)} />
                {errors.budgetTotal && <span className="text-[10px] text-red-600">{errors.budgetTotal}</span>}
              </label>
            </div>
          )}

          {form.guestRole === "real-estate" && (
            <div className="space-y-2">
              <div className="grid gap-2 sm:grid-cols-2">
                <label className="text-[10px] font-semibold text-slate-700">Bedrooms (optional)
                  <select className={inputClass} value={form.realEstateBedrooms} onChange={(e) => setField("realEstateBedrooms", e.target.value)}><option value="any">Any</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4+">4+</option></select>
                </label>
              </div>

              <div>
                <p className="text-[10px] font-semibold text-slate-700">Property Type (multi)</p>
                <div className="mt-1 grid gap-1.5 sm:grid-cols-3">
                  {propertyTypeOptions.map((opt) => (
                    <button key={opt} type="button" onClick={() => toggleMulti("propertyTypesMulti", opt)} className={`h-8 rounded-md border text-[11px] font-semibold ${form.propertyTypesMulti.includes(opt) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white text-slate-700"}`}>{opt}</button>
                  ))}
                </div>
                {errors.propertyTypesMulti && <p className="text-[10px] text-red-600">{errors.propertyTypesMulti}</p>}
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <label className="text-[10px] font-semibold text-slate-700">Min sqm
                  <input className={inputClass} value={form.minSqm} onChange={(e) => setField("minSqm", e.target.value)} />
                </label>
                <label className="text-[10px] font-semibold text-slate-700">Max sqm
                  <input className={inputClass} value={form.maxSqm} onChange={(e) => setField("maxSqm", e.target.value)} />
                </label>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <label className="text-[10px] font-semibold text-slate-700">From (?)
                  <input className={inputClass} placeholder="e.g., 120000" value={form.budgetFrom} onChange={(e) => setField("budgetFrom", e.target.value)} />
                </label>
                <label className="text-[10px] font-semibold text-slate-700">To (?)
                  <input className={inputClass} placeholder="e.g., 250000" value={form.budgetTo} onChange={(e) => setField("budgetTo", e.target.value)} />
                  {errors.budgetTo && <span className="text-[10px] text-red-600">{errors.budgetTo}</span>}
                </label>
              </div>

              <div>
                <p className="text-[10px] font-semibold text-slate-700">Features (multi)</p>
                <div className="mt-1 grid gap-1.5 sm:grid-cols-3">
                  {featureOptions.map((opt) => (
                    <button key={opt} type="button" onClick={() => toggleMulti("featuresMulti", opt)} className={`h-8 rounded-md border text-[11px] font-semibold ${form.featuresMulti.includes(opt) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white text-slate-700"}`}>{opt}</button>
                  ))}
                </div>
              </div>

              <label className="text-[10px] font-semibold text-slate-700">Timeframe
                <select className={inputClass} value={form.timeframe} onChange={(e) => setField("timeframe", e.target.value)}><option value="">No preference</option><option value="0-3m">0-3 months</option><option value="3-6m">3-6 months</option><option value="6m+">6+ months</option></select>
              </label>

              <label className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-2.5 py-2 text-[11px] text-slate-700">
                <input type="checkbox" checked={form.legalSupport} onChange={(e) => setField("legalSupport", e.target.checked)} /> Need legal/mortgage support
              </label>
            </div>
          )}
        </div>
      )}

      {currentStep === maxStep && (
        <div className="mt-2 space-y-2">
          {form.guestRole === "travel-rentals" && (
            <div className="grid gap-2 sm:grid-cols-2">
              <label className="text-[10px] font-semibold text-slate-700">Budget From (€)*
                <input
                  type="number"
                  min={100}
                  className={inputClass}
                  placeholder="min 100"
                  value={form.budgetFrom}
                  onChange={(e) => {
                    const raw = e.target.value;
                    const num = Number(raw || 0);
                    const normalizedFrom = !raw ? "" : String(Math.max(100, num));
                    setField("budgetFrom", normalizedFrom);
                    if (normalizedFrom) {
                      const minTo = Number(normalizedFrom) + 50;
                      const currTo = Number(form.budgetTo || 0);
                      if (!form.budgetTo || Number.isNaN(currTo) || currTo < minTo) {
                        setField("budgetTo", String(minTo));
                      }
                    }
                  }}
                />
                {errors.budgetFrom && <span className="text-[10px] text-red-600">{errors.budgetFrom}</span>}
              </label>
              <label className="text-[10px] font-semibold text-slate-700">Budget To (€)*
                <input
                  type="number"
                  min={150}
                  className={inputClass}
                  placeholder="min +50 from From"
                  value={form.budgetTo}
                  onChange={(e) => {
                    const raw = e.target.value;
                    const num = Number(raw || 0);
                    const minTo = Math.max(150, (Number(form.budgetFrom || 0) || 100) + 50);
                    const normalizedTo = !raw ? "" : String(Math.max(minTo, num));
                    setField("budgetTo", normalizedTo);
                  }}
                />
                {errors.budgetTo && <span className="text-[10px] text-red-600">{errors.budgetTo}</span>}
              </label>
            </div>
          )}

          {form.guestRole === "real-estate" && (
            <div className="grid gap-2 sm:grid-cols-2">
              <label className="text-[10px] font-semibold text-slate-700">From (€)
                <input className={inputClass} placeholder="e.g., 120000" value={form.budgetFrom} onChange={(e) => setField("budgetFrom", e.target.value)} />
              </label>
              <label className="text-[10px] font-semibold text-slate-700">To (€)
                <input className={inputClass} placeholder="e.g., 250000" value={form.budgetTo} onChange={(e) => setField("budgetTo", e.target.value)} />
                {errors.budgetTo && <span className="text-[10px] text-red-600">{errors.budgetTo}</span>}
              </label>
            </div>
          )}

          <div className="grid gap-2 sm:grid-cols-2">
            <label className="text-[10px] font-semibold text-slate-700">First Name*
              <input className={inputClass} value={form.firstName} onChange={(e) => setField("firstName", e.target.value)} />
              {errors.firstName && <span className="text-[10px] text-red-600">{errors.firstName}</span>}
            </label>
            <label className="text-[10px] font-semibold text-slate-700">Last Name*
              <input className={inputClass} value={form.lastName} onChange={(e) => setField("lastName", e.target.value)} />
              {errors.lastName && <span className="text-[10px] text-red-600">{errors.lastName}</span>}
            </label>
            {/* email/phone are captured in step 1 for all roles */}
            <label className="text-[10px] font-semibold text-slate-700 sm:col-span-2">Country*
              <input className={inputClass} placeholder="e.g., Greece" value={form.country} onChange={(e) => setField("country", e.target.value)} />
              {errors.country && <span className="text-[10px] text-red-600">{errors.country}</span>}
            </label>
            <label className="text-[10px] font-semibold text-slate-700 sm:col-span-2">Notes (optional)
              <textarea className="mt-1 w-full rounded-md border border-slate-300 bg-[#eef8f8] px-2.5 py-2 text-[12px] text-slate-800" rows={3} value={form.notes} onChange={(e) => setField("notes", e.target.value)} />
            </label>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-[11px] text-slate-700">Quick verification · Cloudflare Turnstile placeholder</div>

          <label className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-2.5 py-2 text-[11px] text-slate-700">
            <input type="checkbox" checked={form.consentData} onChange={(e) => setField("consentData", e.target.checked)} /> {meta.consentText}
          </label>
          {errors.consentData && <p className="text-[10px] text-red-600">{errors.consentData}</p>}

          <label className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-2.5 py-2 text-[11px] text-slate-700">
            <input type="checkbox" checked={form.consentMarketing} onChange={(e) => setField("consentMarketing", e.target.checked)} /> Keep me posted about offers and tips.
          </label>
        </div>
      )}

      <p className="mt-2 text-[11px] text-slate-500">We&apos;ll prefill the next step and match you instantly.</p>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" value={form.websiteHp} onChange={(e) => setField("websiteHp", e.target.value)} />
      {errors.websiteHp && <p className="mt-1 text-[10px] text-red-600">{errors.websiteHp}</p>}

      <div className="mt-3 flex items-center justify-end gap-2">
        {currentStep > 1 && (
          <button type="button" onClick={() => setStep((currentStep - 1) as Step)} className="h-9 min-w-[86px] whitespace-nowrap rounded-md border border-slate-300 bg-white px-3 text-[13px] font-semibold text-slate-700">← Back</button>
        )}
        {currentStep < maxStep ? (
          <button type="button" onClick={() => validateStep(currentStep) && setStep((currentStep + 1) as Step)} className="h-9 w-full rounded-md bg-[#1c2f66] px-3 text-[13px] font-semibold text-white">Next</button>
        ) : (
          <button type="button" onClick={submit} disabled={submitting} className="h-9 w-full rounded-md bg-[#1c2f66] px-3 text-[13px] font-semibold text-white disabled:opacity-60">{submitting ? "Sending..." : "Submit request"}</button>
        )}
      </div>

      {msg && <p className="mt-2 text-[11px] text-slate-700">{msg}</p>}
    </>
  );
}
