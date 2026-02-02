import { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function Section({ title, children, className = "mb-10" }: SectionProps) {
  return (
    <section className={className}>
      <h2 className="text-xs font-medium uppercase tracking-widest text-foreground/50 mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}
