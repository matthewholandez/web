import fs from "fs";
import path from "path";
import type { ComponentType } from "react";
import type { MDXProps } from "mdx/types";

export type NowMeta = {
  date: string;
};

export type NowEntry = {
  slug: string;
  meta: NowMeta;
  Content: ComponentType<MDXProps>;
};

const contentDir = path.join(process.cwd(), "content/now");

export async function getNowEntries(): Promise<NowEntry[]> {
  const files = fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"));

  const entries = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const mod = await import(`@/content/now/${slug}.mdx`);
      return {
        slug,
        meta: mod.meta as NowMeta,
        Content: mod.default,
      };
    }),
  );

  return entries.sort(
    (a, b) =>
      new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime(),
  );
}

export function formatNowDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
