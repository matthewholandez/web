import type { ReactNode } from "react";
import { SiteNav } from "./SiteNav";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="shell">
      <aside className="shell__nav">
        <SiteNav />
      </aside>
      <div className="shell__main">{children}</div>
    </div>
  );
}
