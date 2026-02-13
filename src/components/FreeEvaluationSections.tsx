const models = [
  {
    title: "Self-Managed Assist",
    badge: "You run ops",
    bullets: [
      "Listing tune-up (photos brief, copy, amenities mapping)",
      "Smart pricing rules for Greek seasonality & events",
      "Channel setup/health (Airbnb, Booking.com, Vrbo, Google Vacation Rentals)",
      "Owner handles guest comms & housekeeping",
    ],
  },
  {
    title: "Multi-Platform",
    badge: "Co-managed",
    bullets: [
      "Full multi-channel distribution & sync",
      "7/7 multilingual guest comms (EN/EL + optional DE/FR/RU)",
      "Revenue & yield management + min-stay/L.O.S control",
      "Access to vetted cleaners, laundry, pool/garden, transfers",
    ],
  },
  {
    title: "Fully Managed",
    badge: "Hands-off",
    bullets: [
      "End-to-end operations with quality standards, reporting and owner peace of mind",
      "Guest support 24/7, check-in/out & in-stay care",
      "Housekeeping schedule, linens, maintenance coordination",
      "Upsells & concierge (transfers, tours, chefs, activities)",
    ],
  },
];

const inputClass = "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900";
const labelClass = "text-sm font-medium text-slate-700";

export function FreeEvaluationSections() {
  return (
    <>
      <section className="mx-auto max-w-[1280px] px-4 pb-6 pt-4">
        <div className="rounded-2xl border border-slate-300 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Owner revenue intake</p>
          <h1 className="mt-2 text-[42px] font-semibold leading-none text-slate-900">Free Evaluation for your villa</h1>
          <p className="mt-3 text-[21px] text-slate-600">Get a practical growth plan in minutes. Share your property details and we’ll recommend the best model.</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <h2 className="text-[42px] font-semibold leading-none text-slate-900">Choose the management model that fits your villa</h2>
        <p className="mt-2 text-sm text-slate-600">We operate across Greece (islands & mainland). Multi-lingual guest ops and vetted local providers.</p>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {models.map((m) => (
            <article key={m.title} className="flex h-full flex-col rounded-xl border border-slate-300 bg-white">
              <div className="border-b border-slate-300 p-4">
                <span className="inline-block rounded-full border border-slate-300 px-2 py-1 text-xs text-slate-600">{m.badge}</span>
                <h3 className="mt-2 text-[30px] font-semibold leading-none text-slate-900">{m.title}</h3>
              </div>
              <ul className="flex-1 space-y-2 p-4 text-[18px] text-slate-800">
                {m.bullets.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
              <div className="border-t border-slate-300 p-4">
                <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">Get Free Evaluation</button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-300 bg-white">
          <table className="w-full min-w-[900px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-300 bg-slate-50 text-left text-slate-700">
                <th className="p-3">Area</th>
                <th className="p-3">Self-Managed Assist</th>
                <th className="p-3">Multi-Platform</th>
                <th className="p-3">Fully Managed</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {[
                ["Channel distribution", "Core OTAs setup & audits", "Full multi-channel + sync", "Full multi-channel + sync"],
                ["Revenue/yield management", "Rules & seasonality", "Dynamic pricing", "Dynamic pricing"],
                ["Guest communications", "Owner", "Villa4you 7/7", "Villa4you 24/7"],
                ["On-site operations", "Owner team", "Owner or Villa4you providers", "Villa4you end-to-end"],
                ["Concierge & upsells", "Optional via partners", "Optional", "Included"],
                ["Reporting", "Monthly lite", "Monthly detailed", "Monthly + season planning"],
              ].map((row) => (
                <tr key={row[0]} className="border-b border-slate-200">
                  {row.map((cell) => (
                    <td key={cell} className="p-3">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-10">
        <form className="rounded-2xl border border-slate-300 bg-white p-4">
          <h2 className="text-[42px] font-semibold leading-none text-slate-900">Owner / Property Intake Form</h2>
          <p className="mt-2 text-[21px] text-slate-600">UI-only now. We will wire Zapier/CRM and submission flow in the next phase.</p>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm text-slate-700">Step 1 · Start + Contact</div>
            <div className="rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm text-slate-700">Step 2 · Region + Property Specs</div>
            <div className="rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm text-slate-700">Step 3 · Distances + Amenities</div>
          </div>

          <fieldset className="mt-4 rounded-xl border border-slate-200 p-3">
            <legend className="px-2 text-sm font-semibold text-slate-800">Start</legend>
            <div className="grid gap-3 md:grid-cols-2">
              <label className={labelClass}>What do you need? *<select className={inputClass}><option>Property Evaluation</option><option>Listing & Marketing</option><option>Full Management</option><option>Consultation</option></select></label>
              <label className={labelClass}>Property Type *<select className={inputClass}><option>Villa</option><option>House</option><option>Apartment</option><option>Townhouse</option><option>Maisonette</option><option>Other</option></select></label>
            </div>
          </fieldset>

          <fieldset className="mt-4 rounded-xl border border-slate-200 p-3">
            <legend className="px-2 text-sm font-semibold text-slate-800">Owner / Contact</legend>
            <div className="grid gap-3 md:grid-cols-2">
              <label className={labelClass}>First Name *<input className={inputClass} /></label>
              <label className={labelClass}>Last Name *<input className={inputClass} /></label>
              <label className={labelClass}>Email *<input type="email" className={inputClass} /></label>
              <label className={labelClass}>Phone<input className={inputClass} placeholder="+30 ..." /></label>
              <label className={labelClass}>Preferred chat<select className={inputClass}><option>Select...</option><option>whatsapp</option><option>viber</option><option>telegram</option><option>messenger</option><option>email</option></select></label>
              <label className={labelClass}>Country<input className={inputClass} /></label>
            </div>
          </fieldset>

          <fieldset className="mt-4 rounded-xl border border-slate-200 p-3">
            <legend className="px-2 text-sm font-semibold text-slate-800">Region & Address</legend>
            <div className="grid gap-3 md:grid-cols-2">
              <label className={labelClass}>Region *<select className={inputClass}><option>Crete</option><option>Halkidiki</option><option>Santorini</option><option>Athens</option><option>Mykonos</option><option>Paros</option><option>Other</option></select><span className="mt-1 block text-xs text-slate-500">Choose “Other” if not listed.</span></label>
              <label className={labelClass}>Region (text)<input className={inputClass} placeholder="e.g., Ida-Viru maakond" /></label>
              <label className={labelClass}>Street 1<input className={inputClass} /></label>
              <label className={labelClass}>Street 2<input className={inputClass} /></label>
              <label className={labelClass}>City<input className={inputClass} /></label>
              <label className={labelClass}>State / Region<input className={inputClass} /></label>
              <label className={labelClass}>Postal Code<input className={inputClass} /></label>
              <label className={labelClass}>Google Map URL<input className={inputClass} placeholder="https://..." /></label>
            </div>
          </fieldset>

          <fieldset className="mt-4 rounded-xl border border-slate-200 p-3">
            <legend className="px-2 text-sm font-semibold text-slate-800">History</legend>
            <div className="grid gap-3 md:grid-cols-2">
              <div className={labelClass}>Rented before?
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-700">
                  <label className="flex items-center gap-2"><input type="radio" name="rentedBefore" /> Yes</label>
                  <label className="flex items-center gap-2"><input type="radio" name="rentedBefore" defaultChecked /> No</label>
                </div>
              </div>
              <label className={labelClass}>Existing Listing URL<input className={inputClass} placeholder="https://..." /></label>
            </div>
            <label className={`${labelClass} mt-3 block`}>Brief history<textarea className={inputClass} rows={3} /></label>
          </fieldset>

          <fieldset className="mt-4 rounded-xl border border-slate-200 p-3">
            <legend className="px-2 text-sm font-semibold text-slate-800">Property Specs</legend>
            <div className="grid gap-3 md:grid-cols-2">
              <label className={labelClass}>Title<input className={inputClass} placeholder="Internal name" /></label>
              <label className={labelClass}>Condition<select className={inputClass}><option>Select</option><option>New</option><option>Excellent</option><option>Good</option><option>Needs renovation</option></select></label>
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <label className={labelClass}>Square meters<input type="number" className={inputClass} /></label>
              <label className={labelClass}>Bedrooms *<input type="number" className={inputClass} /></label>
              <label className={labelClass}>Beds<input type="number" className={inputClass} /></label>
              <label className={labelClass}>Bathrooms<input type="number" className={inputClass} /></label>
              <label className={labelClass}>Max Guests<input type="number" className={inputClass} /></label>
              <label className={labelClass}>Floors<input type="number" className={inputClass} /></label>
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div className={labelClass}>Has Pool?
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-700">
                  <label className="flex items-center gap-2"><input type="radio" name="hasPool" /> Yes</label>
                  <label className="flex items-center gap-2"><input type="radio" name="hasPool" defaultChecked /> No</label>
                </div>
              </div>
              <label className={labelClass}>Pool Type<input className={inputClass} placeholder="Private / Shared" /></label>
            </div>
          </fieldset>

          <fieldset className="mt-4 rounded-xl border border-slate-200 p-3">
            <legend className="px-2 text-sm font-semibold text-slate-800">Distances</legend>
            <div className="grid gap-3 md:grid-cols-3">
              <label className={labelClass}>Beach (m)<input type="number" className={inputClass} /></label>
              <label className={labelClass}>Infrastructure (km)<input type="number" className={inputClass} /></label>
              <label className={labelClass}>Airport (km)<input type="number" className={inputClass} /></label>
              <label className={labelClass}>Supermarket (km)<input type="number" className={inputClass} /></label>
              <label className={labelClass}>Restaurants (km)<input type="number" className={inputClass} /></label>
              <label className={labelClass}>Marina (km)<input type="number" className={inputClass} /></label>
              <label className={labelClass}>Police (km)<input type="number" className={inputClass} /></label>
              <label className={labelClass}>Medical (km)<input type="number" className={inputClass} /></label>
            </div>
          </fieldset>

          <fieldset className="mt-4 rounded-xl border border-slate-200 p-3">
            <legend className="px-2 text-sm font-semibold text-slate-800">Key Amenities</legend>
            <div className="flex flex-wrap gap-2">
              {["Pool", "Sea view", "Parking", "Wi-Fi", "A/C", "BBQ", "Pet-friendly", "Baby equipment", "EV charger", "Hot tub", "Gym", "Accessible"].map((a) => (
                <label key={a} className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700">
                  <input type="checkbox" /> {a}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-4 rounded-xl border border-slate-200 p-3 text-sm text-slate-700">
            <label className="flex items-start gap-2"><input type="checkbox" className="mt-1" /> I consent to data processing for evaluation and contact purposes.</label>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button type="button" className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white">Submit evaluation request</button>
            <button type="button" className="rounded-xl border border-slate-800 bg-white px-5 py-2.5 text-sm font-medium text-slate-900">Save draft</button>
            <p className="text-xs text-slate-500">UI only in this phase. Submission logic will be connected in the integration step.</p>
          </div>
        </form>
      </section>
    </>
  );
}
