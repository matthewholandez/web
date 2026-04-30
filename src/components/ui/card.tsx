import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`border border-foreground/5 px-4 py-4 ${className}`}>
      {children}
    </div>
  );
}

interface CardLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function CardLink({ href, children, className = "" }: CardLinkProps) {
  const isInternal = href.startsWith("/");
  const classes = `block group border border-foreground/5 bg-white px-4 py-4 hover:bg-black transition-colors ${className}`;

  if (isInternal) {
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
    >
      {children}
    </a>
  );
}
