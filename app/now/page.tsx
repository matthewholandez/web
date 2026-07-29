import Link from "next/link";
import { formatNowDate, getNowEntries } from "./entries";

export default async function NowPage() {
  const entries = await getNowEntries();
  const latest = entries[0];

  return (
    <main className="page">
      <h1 className="name">Now</h1>
      <p className="tagline">
        {latest
          ? `Updated ${formatNowDate(latest.meta.date)}`
          : "What I'm up to"}
      </p>

      {entries.map((entry) => {
        const Content = entry.Content;
        return (
          <article className="now-entry" key={entry.slug}>
            {entry !== latest ? (
              <time className="now-date" dateTime={entry.meta.date}>
                {formatNowDate(entry.meta.date)}
              </time>
            ) : null}
            <div className="now-body">
              <Content />
            </div>
          </article>
        );
      })}

      <div className="pageLinks">
        <Link className="timeLink" href="/">
          <span aria-hidden="true">←</span> Home
        </Link>
      </div>
    </main>
  );
}
