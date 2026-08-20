import type { Metadata } from "next";
import Privacy from "@/content/privacy.md";
import { SiteShell } from "../components/SiteShell";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy policy for mholandez.com, including Vercel Analytics.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy · Matthew Holandez",
    description: "Privacy policy for mholandez.com, including Vercel Analytics.",
    url: "/privacy",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <SiteShell>
      <main className="privacyPage">
        <h1 className="name">Privacy</h1>
        <div className="prose privacy">
          <Privacy />
        </div>
      </main>
    </SiteShell>
  );
}
