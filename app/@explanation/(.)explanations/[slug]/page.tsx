import { notFound } from "next/navigation";
import { ExplanationPanel } from "../../../components/ExplanationPanel";
import {
  getExplanationSlugs,
  loadExplanation,
} from "../../../lib/explanations";

type ExplanationPanelPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getExplanationSlugs()).map((slug) => ({ slug }));
}

export default async function ExplanationPanelPage({
  params,
}: ExplanationPanelPageProps) {
  const { slug } = await params;
  const Content = await loadExplanation(slug);

  if (!Content) {
    notFound();
  }

  return <ExplanationPanel Content={Content} slug={slug} />;
}
