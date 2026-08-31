import type { ReactNode } from "react";
import Link from "next/link";

export function SiteShell({
  homeLink = false,
  children,
}: {
  homeLink?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="shell">
      <div className="shell__main">
        {children}
        <p className="siteFooter">
          {homeLink ? (
            <>
              <Link href="/" className="siteFooter__link">
                home
              </Link>
              <span className="siteFooter__sep" aria-hidden="true">
                ·
              </span>
            </>
          ) : null}
          <Link href="/privacy" className="siteFooter__link">
            privacy
          </Link>
        </p>
      </div>
    </div>
  );
}
