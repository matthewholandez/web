import type { ReactNode } from "react";

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
  mark?: boolean;
};

function ExternalLinkLabel({ children }: { children: ReactNode }) {
  if (typeof children === "string") {
    const lastWord = children.match(/^([\s\S]*\s)(\S+)$/);

    if (lastWord) {
      return (
        <>
          {lastWord[1]}
          <span className="externalLink__tail">
            {lastWord[2]}
            <span className="extArrow" aria-hidden="true" />
          </span>
        </>
      );
    }
  }

  return (
    <span className="externalLink__tail">
      {children}
      <span className="extArrow" aria-hidden="true" />
    </span>
  );
}

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
      <ExternalLinkLabel>{children}</ExternalLinkLabel>
    </a>
  );
}
