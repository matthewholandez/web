import type { ReactNode } from "react";

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
  mark?: boolean;
};

/** Outbound link with ↗. Opens http(s) in a new tab. */
export function ExternalLink({
  href,
  children,
  mark = false,
}: ExternalLinkProps) {
  const http = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      className={mark ? "mark" : undefined}
      {...(http
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
    >
      {children}
      <span className="extArrow" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}
