import type { ReactNode } from "react";

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  mark?: boolean;
};

export function ExternalLink({
  href,
  children,
  className,
  mark = false,
}: ExternalLinkProps) {
  const classes = [mark ? "mark" : null, className].filter(Boolean).join(" ");

  return (
    <a
      href={href}
      className={classes || undefined}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <span className="extArrow" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}
