// Hardcoded countdown target: August 5, 2026, 5:00 PM Eastern Time.
// August is EDT (UTC-4), so 17:00 ET === 21:00 UTC.
export const TARGET = new Date("2026-08-05T21:00:00Z");

// Human-readable label for the target, shown under the countdown.
export const TARGET_LABEL = "August 5, 2026 · 5:00 PM ET";

// What the target moment is.
export const EVENT_LABEL = "End of 1B term at Waterloo";

// Ontario / Canada statutory holidays (2026), as local YYYY-MM-DD strings.
// These are excluded from the business-day count. The full year is listed so
// the count stays correct no matter when the page is viewed.
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
