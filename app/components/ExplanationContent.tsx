import type { ComponentPropsWithoutRef } from "react";
import type { MDXComponents } from "mdx/types";
import type { ExplanationContentComponent } from "../lib/explanations";

export function ExplanationContent({
  Content,
  headingId,
}: {
  Content: ExplanationContentComponent;
  headingId: string;
}) {
  const components = {
    h1: ({ children }: ComponentPropsWithoutRef<"h1">) => (
      <h1 className="explanationTitle" id={headingId}>
        <span className="mark">{children}</span>
      </h1>
    ),
  } satisfies MDXComponents;

  return (
    <div className="prose explanationProse">
      <Content components={components} />
    </div>
  );
}
