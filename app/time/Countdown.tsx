"use client";

import { useEffect, useState } from "react";
import { TARGET, TARGET_LABEL, EVENT_LABEL, HOLIDAYS } from "./config";
import { businessDaysBetween } from "./businessDays";

const HOLIDAY_SET = new Set(HOLIDAYS);

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  businessDays: number;
  done: boolean;
};

function computeRemaining(now: Date): Remaining {
  const diffMs = TARGET.getTime() - now.getTime();

  if (diffMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, businessDays: 0, done: true };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const businessDays = businessDaysBetween(now, TARGET, HOLIDAY_SET);

  return { days, hours, minutes, seconds, businessDays, done: false };
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export default function Countdown() {
  // Start null to avoid a hydration mismatch; fill in after mount.
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(computeRemaining(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Reserve the readout's vertical space before mount so nothing jumps.
  if (!remaining) {
    return <div className="readout readout--pending" aria-hidden="true" />;
  }

  const cells: { label: string; value: string }[] = [
    { label: "Days", value: String(remaining.days) },
    { label: "Hours", value: pad(remaining.hours) },
    { label: "Minutes", value: pad(remaining.minutes) },
    { label: "Seconds", value: pad(remaining.seconds) },
  ];

  return (
    <>
      <div
        className="readout"
        role="timer"
        aria-live="off"
        aria-label={`${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes, ${remaining.seconds} seconds remaining`}
      >
        {cells.map((c, i) => (
          <div className="cell" key={c.label}>
            <span className="num">{c.value}</span>
            {i < cells.length - 1 && (
              <span className={i === 2 ? "sep sep--blink" : "sep"}>:</span>
            )}
            <span className="label">{c.label}</span>
          </div>
        ))}
      </div>

      <div className="meta">
        {remaining.done ? (
          <p className="meta__line meta__line--strong">The moment has arrived.</p>
        ) : (
          <p className="meta__line meta__line--strong">
            {remaining.businessDays} business days remaining
          </p>
        )}
        <p className="meta__line">
          {remaining.done
            ? `${TARGET_LABEL} (${EVENT_LABEL})`
            : `until ${TARGET_LABEL} (${EVENT_LABEL})`}
        </p>
      </div>
    </>
  );
}
