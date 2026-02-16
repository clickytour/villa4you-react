const agentBenefits = [
  {
    title: "Net pricing access",
    text: "Get agent-friendly net pricing on eligible properties and build competitive offers for your clients.",
  },
  {
    title: "White-label proposals",
    text: "Share branded or no-logo proposals fast via links and PDF to increase close rates.",
  },
  {
    title: "Faster booking flow",
    text: "Move from request to confirmation with clean inventory visibility and clear booking terms.",
  },
];

const agentSteps = [
  { title: "1) Join as agent", text: "Submit your profile and target destinations." },
  { title: "2) Access inventory", text: "Receive eligible listings and net pricing structure." },
  { title: "3) Sell & grow", text: "Share offers, secure bookings, and scale client volume." },
];

export function AgentsSections() {
  return (
    <>
      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <div className="rounded-[24px] border border-slate-200 bg-white/95 p-5 shadow-sm md:p-6">
          <h2 className="text-[42px] font-semibold tracking-[-0.01em] text-slate-900">Built for travel agents and affiliate partners</h2>
          <p className="mt-3 text-[21px] text-slate-700">Use ClickyTour inventory, net pricing, and white-label tools to convert client demand faster.</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <div className="grid gap-3 md:grid-cols-3">
          {agentBenefits.map((item) => (
            <article key={item.title} className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="text-[30px] font-semibold leading-none text-slate-900">{item.title}</h3>
              <p className="mt-3 text-[21px] text-slate-700">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-6">
        <h2 className="text-[42px] font-semibold tracking-[-0.01em] text-slate-900">How it works</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {agentSteps.map((step) => (
            <article key={step.title} className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="text-[30px] font-semibold leading-none text-slate-900">{step.title}</h3>
              <p className="mt-3 text-[21px] text-slate-700">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-10">
        <div className="rounded-[24px] border border-slate-200 bg-white/95 p-6 text-center shadow-sm md:p-8">
          <h2 className="text-[42px] font-semibold leading-none tracking-[-0.01em] text-slate-900">Ready to join as an agent?</h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a href="/agents-apply" className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white">Apply now</a>
            <a href="/collaborate" className="rounded-xl border border-slate-400 bg-white px-5 py-2.5 text-sm font-medium text-slate-800">Back to collaborate</a>
          </div>
        </div>
      </section>
    </>
  );
}
