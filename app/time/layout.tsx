import type { Metadata } from "next";
import "./time.css";

export const metadata: Metadata = {
  title: "Time Remaining",
  description: "Countdown to August 5, 2026 · 5:00 PM ET",
};

export default function TimeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="time-remaining">{children}</div>;
}
