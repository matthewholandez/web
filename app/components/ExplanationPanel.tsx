import type { ExplanationContentComponent } from "../lib/explanations";
import { CloseExplanationButton } from "./CloseExplanationButton";
import { ExplanationContent } from "./ExplanationContent";

export function ExplanationPanel({
  Content,
  slug,
}: {
  Content: ExplanationContentComponent;
  slug: string;
}) {
  const headingId = `explanation-${slug}-title`;

  return (
    <aside className="explanationPanel" aria-labelledby={headingId}>
      <CloseExplanationButton />
      <ExplanationContent Content={Content} headingId={headingId} />
    </aside>
  );
}
