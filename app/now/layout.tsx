import type { Metadata } from "next";
import "./now.css";

export const metadata: Metadata = {
  title: "Now",
  description: "What Matthew Holandez is up to right now.",
  alternates: {
    canonical: "/now",
  },
  openGraph: {
    title: "Now · Matthew Holandez",
    description: "What Matthew Holandez is up to right now.",
    url: "/now",
    type: "website",
  },
};

export default function NowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="now">{children}</div>;
}
