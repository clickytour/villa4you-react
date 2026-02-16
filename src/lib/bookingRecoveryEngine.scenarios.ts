import assert from "node:assert/strict";
import { BOOKING_RECOVERY_CONFIG } from "@/lib/bookingRecoveryConfig";
import {
  addDaysIso,
  buildNearestOptions,
  getRequestedNightsIntent,
  isRangeBlocked,
} from "@/lib/bookingRecoveryEngine";

function makeBlockedSet(unavailableDates: string[]) {
  const unavailableSet = new Set(unavailableDates);
  const blocked = new Set<string>();
  unavailableDates.forEach((d) => {
    const next = addDaysIso(d, 1);
    const isBlockEnd = !unavailableSet.has(next);
    if (!isBlockEnd) blocked.add(d);
  });
  return blocked;
}

function run() {
  // S1 exact-intent rule keeps full requested range length.
  const requestedNights = getRequestedNightsIntent("2026-03-08", "2026-03-21", 7);
  assert.equal(requestedNights, 13, "S1 failed: expected 13-night exact-date intent");

  // S2 blocked-range logic should mark consecutive blocked range but allow checkout boundary.
  const blocked = makeBlockedSet(["2026-03-08", "2026-03-09", "2026-03-10"]);
  assert.equal(isRangeBlocked("2026-03-08", "2026-03-12", blocked), true, "S2 failed: blocked range not detected");
  assert.equal(isRangeBlocked("2026-03-10", "2026-03-11", blocked), false, "S2 failed: checkout boundary should be allowed");

  // S3 nearest option generation should return exact target length.
  const options = buildNearestOptions({
    anchorStart: "2026-03-08",
    targetNights: 12,
    blockedNightsSet: blocked,
    maxDaysAround: 21,
    limit: 5,
  });
  assert.ok(options.length > 0, "S3 failed: expected at least one suggestion");
  assert.ok(options.every((o) => o.nights === 12), "S3 failed: non-exact length option found");

  // S4 config guardrails.
  assert.equal(BOOKING_RECOVERY_CONFIG.LONG_STAY_NIGHTS, 11, "S4 failed: long stay threshold mismatch");
  assert.equal(BOOKING_RECOVERY_CONFIG.GEO_RADIUS_KM, 10, "S4 failed: geo radius mismatch");
  assert.equal(BOOKING_RECOVERY_CONFIG.MAX_PRICE_DELTA_PERCENT, 20, "S4 failed: price delta mismatch");

  // S5 options are sorted by smallest shift.
  const sorted = buildNearestOptions({
    anchorStart: "2026-03-08",
    targetNights: 7,
    blockedNightsSet: new Set<string>(),
    maxDaysAround: 3,
    limit: 5,
  });
  for (let i = 1; i < sorted.length; i += 1) {
    assert.ok(sorted[i - 1].shiftDays <= sorted[i].shiftDays, "S5 failed: options not sorted by shift");
  }

  // S6 empty anchor returns no suggestions.
  const empty = buildNearestOptions({
    anchorStart: "",
    targetNights: 12,
    blockedNightsSet: new Set<string>(),
    maxDaysAround: 21,
    limit: 5,
  });
  assert.equal(empty.length, 0, "S6 failed: expected zero options for empty anchor");

  console.log("✅ bookingRecoveryEngine scenarios: all checks passed");
}

run();
