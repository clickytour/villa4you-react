"use client";

import dynamic from "next/dynamic";

const calculators: Record<string, React.ComponentType> = {
  "vacation-owner-calculator": dynamic(() => import("./VacationOwnerCalculator")),
  "itinerary-builder": dynamic(() => import("./ItineraryBuilder")),
  "property-comparison": dynamic(() => import("./PropertyComparison")),
  "events-calendar": dynamic(() => import("./EventsCalendar")),
};

export default function ToolCalculatorEmbed({ slug }: { slug: string }) {
  const Calc = calculators[slug];
  if (!Calc) return null;
  return (
    <section className="py-12 bg-slate-50">
      <div className="container mx-auto max-w-6xl px-4">
        <Calc />
      </div>
    </section>
  );
}
