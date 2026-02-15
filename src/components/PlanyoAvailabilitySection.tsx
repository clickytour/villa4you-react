"use client";

import Script from "next/script";

export function PlanyoAvailabilitySection({
  calendarId,
  actionUrl,
}: {
  calendarId: string;
  actionUrl: string;
}) {
  const iframeSrc = `${actionUrl}?calendar=${calendarId}&submitted=1`;

  return (
    <section className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-3">
      <Script src="https://www.planyo.com/utils.js" strategy="afterInteractive" />
      <Script src="https://www.planyo.com/wrappers.js" strategy="afterInteractive" />
      <link rel="stylesheet" href="https://sandbox.planyo.com/Plugins/PlanyoFiles/bootstrap-planyo.min.css" />
      <link rel="stylesheet" href={`https://sandbox.planyo.com/schemes/?calendar=${calendarId}&sel=scheme_css`} />

      <p className="text-xs text-blue-700">Live availability & pricing (Planyo)</p>
      <iframe
        src={iframeSrc}
        className="mt-2 h-[340px] w-full rounded-lg border border-blue-200 bg-white"
        title="Planyo availability and pricing"
      />
    </section>
  );
}
