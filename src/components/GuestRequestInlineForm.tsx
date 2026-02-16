"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type ContextType = "property" | "service";
type PropertyMode = "short_term_rent" | "sale" | "monthly_rent";

type Props = {
  contextType: ContextType;
  contextId: string;
  contextSlug: string;
  contextTitle: string;
  propertyMode?: PropertyMode;
  categoryName?: string;
  subcategoryName?: string;
};

const WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/14582531/ueuzwpy/";

export function GuestRequestInlineForm(props: Props) {
  const searchParams = useSearchParams();
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
    adults: "",
    children03to14: "",
    children0to3: "",
    preferredDate: "",
    preferredTime: "",
    participants: "2",
    moveInDate: "",
    contractMonths: "",
    monthlyBudget: "",
    saleBudget: "",
    investmentPurpose: "",
    timeline: "",
    note: "",
    terms: false,
    hp: "",
  });

  const propertyMode: PropertyMode = props.propertyMode || "short_term_rent";
  const isPropertyVacationMode = props.contextType === "property" && propertyMode === "short_term_rent";
  const isPropertySaleMode = props.contextType === "property" && propertyMode === "sale";
  const isPropertyMonthlyMode = props.contextType === "property" && propertyMode === "monthly_rent";

  useEffect(() => {
    if (props.contextType !== "property") return;
    const checkIn = searchParams.get("checkIn") || "";
    const checkOut = searchParams.get("checkOut") || "";
    if (!checkIn && !checkOut) return;
    setForm((prev) => ({
      ...prev,
      checkIn: prev.checkIn || checkIn,
      checkOut: prev.checkOut || checkOut,
    }));
  }, [props.contextType, searchParams]);

  async function submit() {
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.country || !form.terms) {
      setMsg("Please complete required fields.");
      return;
    }
    if (isPropertyVacationMode && (!form.checkIn || !form.checkOut)) {
      setMsg("Please add check-in and check-out dates.");
      return;
    }
    if (isPropertySaleMode && (!form.saleBudget || !form.timeline)) {
      setMsg("Please add sale budget and timeline.");
      return;
    }
    if (isPropertyMonthlyMode && (!form.moveInDate || !form.contractMonths || !form.monthlyBudget)) {
      setMsg("Please add move-in date, contract period, and monthly budget.");
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
            ? isPropertyVacationMode
              ? {
                  mode: "short_term_rent",
                  checkIn: form.checkIn,
                  checkOut: form.checkOut,
                  adults: Number(form.adults || 0),
                  children03to14: Number(form.children03to14 || 0),
                  children0to3: Number(form.children0to3 || 0),
                  note: form.note,
                }
              : isPropertySaleMode
              ? {
                  mode: "sale",
                  saleBudget: form.saleBudget,
                  timeline: form.timeline,
                  investmentPurpose: form.investmentPurpose,
                  note: form.note,
                }
              : {
                  mode: "monthly_rent",
                  moveInDate: form.moveInDate,
                  contractMonths: Number(form.contractMonths || 0),
                  monthlyBudget: form.monthlyBudget,
                  participants: Number(form.participants || 0),
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
    <section id="guest-request-form" className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
      <div className="grid gap-6 lg:grid-cols-[1.45fr_0.85fr]">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            {isPropertySaleMode ? "Sale Inquiry" : isPropertyMonthlyMode ? "Monthly Rent Inquiry" : "Guest Request"}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {props.contextType === "property"
              ? isPropertyVacationMode
                ? "Ask for availability and booking details."
                : isPropertySaleMode
                ? "Share your budget and timeline to receive sale details and viewing options."
                : "Share your monthly-rent profile and we will send matching terms."
              : "Ask for service availability and details."}
          </p>

          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="First name *" value={form.firstName} onChange={(e)=>setForm({...form, firstName:e.target.value})} />
            <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Last name *" value={form.lastName} onChange={(e)=>setForm({...form, lastName:e.target.value})} />
            <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Email *" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} />
            <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Phone *" value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} />
            <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2" placeholder="Country *" value={form.country} onChange={(e)=>setForm({...form, country:e.target.value})} />
          </div>

          {props.contextType === "property" ? (
            isPropertyVacationMode ? (
              <div className="mt-3 space-y-3">
                <div className="grid gap-3 md:grid-cols-2">
                  <label className="text-xs font-medium text-slate-600">
                    Check-in date *
                    <input type="date" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" value={form.checkIn} onChange={(e)=>setForm({...form, checkIn:e.target.value})} />
                  </label>
                  <label className="text-xs font-medium text-slate-600">
                    Check-out date *
                    <input type="date" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" value={form.checkOut} onChange={(e)=>setForm({...form, checkOut:e.target.value})} />
                  </label>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  <label className="text-xs font-medium text-slate-600">
                    Adults
                    <input type="number" min={1} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Number of adults" value={form.adults} onChange={(e)=>setForm({...form, adults:e.target.value})} />
                  </label>
                  <label className="text-xs font-medium text-slate-600">
                    Children 03-14 years
                    <input type="number" min={0} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Children 03-14 years" value={form.children03to14} onChange={(e)=>setForm({...form, children03to14:e.target.value})} />
                  </label>
                  <label className="text-xs font-medium text-slate-600">
                    Children 0-3 years
                    <input type="number" min={0} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Children 0-3 years" value={form.children0to3} onChange={(e)=>setForm({...form, children0to3:e.target.value})} />
                  </label>
                </div>
              </div>
            ) : isPropertySaleMode ? (
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <label className="text-xs font-medium text-slate-600">
                  Budget for purchase *
                  <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="e.g. 500000 EUR" value={form.saleBudget} onChange={(e)=>setForm({...form, saleBudget:e.target.value})} />
                </label>
                <label className="text-xs font-medium text-slate-600">
                  Purchase timeline *
                  <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="e.g. within 3 months" value={form.timeline} onChange={(e)=>setForm({...form, timeline:e.target.value})} />
                </label>
                <label className="text-xs font-medium text-slate-600 md:col-span-2">
                  Purpose
                  <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Investment / own use / mixed" value={form.investmentPurpose} onChange={(e)=>setForm({...form, investmentPurpose:e.target.value})} />
                </label>
              </div>
            ) : (
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <label className="text-xs font-medium text-slate-600">
                  Move-in date *
                  <input type="date" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" value={form.moveInDate} onChange={(e)=>setForm({...form, moveInDate:e.target.value})} />
                </label>
                <label className="text-xs font-medium text-slate-600">
                  Contract period (months) *
                  <input type="number" min={1} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="e.g. 12" value={form.contractMonths} onChange={(e)=>setForm({...form, contractMonths:e.target.value})} />
                </label>
                <label className="text-xs font-medium text-slate-600">
                  Monthly budget *
                  <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="e.g. 1800 EUR" value={form.monthlyBudget} onChange={(e)=>setForm({...form, monthlyBudget:e.target.value})} />
                </label>
                <label className="text-xs font-medium text-slate-600">
                  Occupants
                  <input type="number" min={1} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Number of occupants" value={form.participants} onChange={(e)=>setForm({...form, participants:e.target.value})} />
                </label>
              </div>
            )
          ) : (
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <label className="text-xs font-medium text-slate-600">
                Preferred date *
                <input type="date" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" value={form.preferredDate} onChange={(e)=>setForm({...form, preferredDate:e.target.value})} />
              </label>
              <label className="text-xs font-medium text-slate-600">
                Preferred time
                <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="e.g. 10:00 - 12:00" value={form.preferredTime} onChange={(e)=>setForm({...form, preferredTime:e.target.value})} />
              </label>
              <label className="text-xs font-medium text-slate-600">
                Participants
                <input type="number" min={1} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Number of participants" value={form.participants} onChange={(e)=>setForm({...form, participants:e.target.value})} />
              </label>
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
              {sending ? "Sending..." : isPropertySaleMode ? "Send sale inquiry" : isPropertyMonthlyMode ? "Send monthly inquiry" : "Send request"}
            </button>
          </div>

          {msg && <p className="mt-2 text-sm text-slate-700">{msg}</p>}
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-base font-semibold text-slate-900">Your Booking Agent</h3>
          <p className="mt-1 text-xs text-slate-600">Demo card (will be dynamic from Core/Mirror DB later)</p>

          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
              alt="Booking agent"
              className="h-56 w-full object-cover object-top"
            />
            <div className="p-3">
              <p className="text-base font-semibold text-slate-900">Elena Papadopoulou</p>
              <p className="text-sm text-slate-600">Senior Guest Relations Agent</p>

              <div className="mt-3 space-y-2 text-sm text-slate-700">
                <p>📞 +30 210 123 4567</p>
                <p>✉️ elena@villa4you.gr</p>
                <p>💬 WhatsApp: +30 694 123 4567</p>
              </div>

              <div className="mt-3 rounded-lg border border-cyan-200 bg-cyan-50 p-2 text-xs text-cyan-800">
                Usually replies within 15–30 minutes.
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
