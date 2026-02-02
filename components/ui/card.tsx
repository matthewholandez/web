import { ReactNode } from "react";

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
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group border border-foreground/5 px-4 py-4 hover:bg-black transition-colors ${className}`}
    >
      {children}
    </a>
  );
}
