import type { Metadata } from "next";
import Contact from "@/content/contact.md";
import { SiteShell } from "../components/SiteShell";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email Matthew Holandez.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact · Matthew Holandez",
    description: "Email Matthew Holandez.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <SiteShell>
      <main>
        <h1 className="srOnly">Contact</h1>
        <div className="prose">
          <Contact />
        </div>
      </main>
    </SiteShell>
  );
}
