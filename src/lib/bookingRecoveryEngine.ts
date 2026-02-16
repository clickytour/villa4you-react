export type SuggestedOption = {
  start: string;
  end: string;
  nights: number;
  shiftDays: number;
};

export function toDate(v: string) {
  return new Date(`${v}T00:00:00`);
}

export function toIsoLocal(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function addDaysIso(iso: string, days: number) {
  const d = toDate(iso);
  d.setDate(d.getDate() + days);
  return toIsoLocal(d);
}

export function calculateNights(startIso: string, endIso: string) {
  const start = toDate(startIso).getTime();
  const end = toDate(endIso).getTime();
  const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

export function getRequestedNightsIntent(
  requestedCheckIn: string,
  requestedCheckOut: string,
  minStay: number,
) {
  if (!requestedCheckIn || !requestedCheckOut) return minStay;
  const requestedRangeNights = calculateNights(requestedCheckIn, requestedCheckOut);
  // Exact-date intent: keep the full requested range length for proposals.
  return Math.max(minStay, requestedRangeNights > 0 ? requestedRangeNights : minStay);
}

export function isRangeBlocked(startIso: string, endIso: string, blockedNightsSet: Set<string>) {
  const start = toDate(startIso).getTime();
  const end = toDate(endIso).getTime();
  return [...blockedNightsSet].some((d) => {
    const t = toDate(d).getTime();
    // end date is checkout boundary (exclusive)
    return t >= start && t < end;
  });
}

export function buildNearestOptions({
  anchorStart,
  targetNights,
  blockedNightsSet,
  maxDaysAround,
  limit,
}: {
  anchorStart: string;
  targetNights: number;
  blockedNightsSet: Set<string>;
  maxDaysAround: number;
  limit: number;
}) {
  if (!anchorStart || targetNights <= 0) return [] as SuggestedOption[];

  const options: SuggestedOption[] = [];
  for (let offset = -maxDaysAround; offset <= maxDaysAround; offset++) {
    const start = addDaysIso(anchorStart, offset);
    const end = addDaysIso(start, targetNights);
    const blocked = isRangeBlocked(start, end, blockedNightsSet);
    if (!blocked) {
      options.push({ start, end, nights: targetNights, shiftDays: Math.abs(offset) });
    }
  }

  return options.sort((a, b) => a.shiftDays - b.shiftDays).slice(0, limit);
}
