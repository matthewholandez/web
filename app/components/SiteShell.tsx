import type { ReactNode } from "react";
import Link from "next/link";
import { SiteNav } from "./SiteNav";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="shell">
      <aside className="shell__nav">
        <SiteNav />
      </aside>
      <div className="shell__main">
        {children}
        <p className="siteFooter">
          <Link href="/privacy" className="siteFooter__link">
            privacy
          </Link>
        </p>
      </div>
    </div>
  );
}
