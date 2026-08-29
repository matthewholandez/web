import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExplanationContent } from "../../components/ExplanationContent";
import { SiteShell } from "../../components/SiteShell";
import {
  getExplanationSlugs,
  getExplanationTitle,
  loadExplanation,
} from "../../lib/explanations";

type ExplanationPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getExplanationSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ExplanationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = await getExplanationTitle(slug);

  if (!title) {
    return {};
  }

  return {
    title,
    alternates: {
      canonical: `/explanations/${slug}`,
    },
    openGraph: {
      title: `${title} · Matthew Holandez`,
      url: `/explanations/${slug}`,
      type: "article",
    },
  };
}

export default async function ExplanationPage({
  params,
}: ExplanationPageProps) {
  const { slug } = await params;
  const Content = await loadExplanation(slug);

  if (!Content) {
    notFound();
  }

  return (
    <SiteShell>
      <main className="explanationPage">
        <ExplanationContent
          Content={Content}
          headingId={`explanation-${slug}-title`}
        />
      </main>
    </SiteShell>
  );
}
