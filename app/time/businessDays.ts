// Format a Date as a local YYYY-MM-DD key (avoids UTC off-by-one issues).
function localKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// Count business days (Mon-Fri) strictly remaining between `from` and `to`,
// excluding any date whose local key is in `holidays`.
//
// A day counts if its full calendar day falls on or after `from`'s day and
// before `to`. We walk day by day from the start of today up to (not past)
// the target moment.
export function businessDaysBetween(
  from: Date,
  to: Date,
  holidays: Set<string>
): number {
  if (to <= from) return 0;

  const cursor = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  let count = 0;

  while (cursor < to) {
    const dow = cursor.getDay(); // 0 = Sun, 6 = Sat
    const isWeekday = dow >= 1 && dow <= 5;
    if (isWeekday && !holidays.has(localKey(cursor))) {
      count++;
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return count;
}
