import { SiteShell } from "../components/SiteShell";
import { formatNowDate, getNowEntries } from "./entries";

export default async function NowPage() {
  const entries = await getNowEntries();
  const latest = entries[0];

  return (
    <SiteShell>
      <main className="page">
        <h1 className="name">Now</h1>
        <p className="tagline">
          {latest
            ? `Updated ${formatNowDate(latest.date)}`
            : "What I'm up to"}
        </p>

        {entries.map((entry) => {
          const Content = entry.Content;
          return (
            <article className="now-entry" key={entry.slug}>
              <time className="now-date" dateTime={entry.date}>
                {formatNowDate(entry.date)}
              </time>
              <div className="now-body">
                <Content />
              </div>
            </article>
          );
        })}
      </main>
    </SiteShell>
  );
}
