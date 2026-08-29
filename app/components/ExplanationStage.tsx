import type { ReactNode } from "react";

export function ExplanationStage({
  children,
  explanation,
}: {
  children: ReactNode;
  explanation: ReactNode;
}) {
  return (
    <div className="explanationStage">
      <div className="explanationStage__page">{children}</div>
      <div className="explanationStage__slot">{explanation}</div>
    </div>
  );
}
