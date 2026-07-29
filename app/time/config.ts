// Queue of upcoming countdown targets, soonest first preferred but order
// does not matter — getActiveEvent always picks the closest future moment.
// Add new milestones here; past ones stay for history / "done" fallback.

export type CountdownEvent = {
  /** Instant the countdown reaches zero (UTC Date). */
  target: Date;
  /** Human-readable when, shown under the countdown. */
  targetLabel: string;
  /** What the moment is. */
  eventLabel: string;
};

export const EVENTS: CountdownEvent[] = [
  {
    // August 5, 2026, 5:00 PM Eastern Time (EDT = UTC-4 → 21:00 UTC).
    target: new Date("2026-08-05T21:00:00Z"),
    targetLabel: "August 5, 2026 · 5:00 PM ET",
    eventLabel: "End of 1B term at Waterloo",
  },
    {
    target: new Date("2026-09-08T13:00:00Z"),
    targetLabel: "September 8, 2026 · 9:00 AM ET",
    eventLabel: "Start of 2nd co-op",
  },
];

/**
 * Closest event still in the future relative to `now`.
 * Returns null when every queued event has passed.
 */
export function getActiveEvent(now: Date = new Date()): CountdownEvent | null {
  let best: CountdownEvent | null = null;

  for (const event of EVENTS) {
    if (event.target.getTime() <= now.getTime()) continue;
    if (!best || event.target.getTime() < best.target.getTime()) {
      best = event;
    }
  }

  return best;
}

/**
 * Event to display on the page: the next upcoming one, or — if the queue
 * is exhausted — the most recently passed event (for the "done" state).
 */
export function getDisplayEvent(now: Date = new Date()): CountdownEvent | null {
  const active = getActiveEvent(now);
  if (active) return active;
  if (EVENTS.length === 0) return null;

  let latest = EVENTS[0];
  for (const event of EVENTS) {
    if (event.target.getTime() > latest.target.getTime()) {
      latest = event;
    }
  }
  return latest;
}

// Ontario / Canada statutory holidays, as local YYYY-MM-DD strings.
// Excluded from the business-day count. Keep years covered by EVENTS listed
// so the count stays correct no matter which queued target is active.
export const HOLIDAYS: string[] = [
  "2026-01-01", // New Year's Day
  "2026-02-16", // Family Day
  "2026-04-03", // Good Friday
  "2026-05-18", // Victoria Day
  "2026-07-01", // Canada Day
  "2026-08-03", // Civic Holiday
  "2026-09-07", // Labour Day
  "2026-10-12", // Thanksgiving
  "2026-12-25", // Christmas Day
  "2026-12-26", // Boxing Day
];
