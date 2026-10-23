import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { listPosts } from "@/lib/beehiiv";
import { getContentPage, getSite } from "@/lib/content";

const site = getSite();
const copy = getContentPage();

export const metadata: Metadata = {
  title: "Content",
  description: site.seo.content,
};

// Rebuilt at most hourly, so a new issue appears without a deploy.
export const revalidate = 3600;

const DATE = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/**
 * The archive of The Draft, pulled from beehiiv rather than kept by hand.
 * Issues published before the "since" date in content/content.json are left
 * out on purpose: they belong to an earlier positioning of the newsletter.
 * Text cards only: beehiiv falls back to a generic publication thumbnail when
 * an issue has none, and that would put the same image on every card.
 */
export default async function Page() {
  const since = Date.parse(copy.since) / 1000;
  const posts = (await listPosts()).filter((post) => post.publishedAt >= since);

  return (
    <Section width="article" space="generous" grid="sm">
      <h1 className="display-1">{copy.title}</h1>
      <p className="lead mt-6 max-w-xl">{copy.lead}</p>

      {posts.length ? (
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.url}>
              <a
                href={post.url}
                className="group flex h-full flex-col border-2 border-ink bg-paper transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-accent)]"
              >
                <span className="flex flex-1 flex-col gap-2 p-6">
                  <span className="label text-ash">
                    {DATE.format(new Date(post.publishedAt * 1000))}
                  </span>
                  <span className="font-display text-2xl uppercase leading-tight text-ink">
                    {post.title}
                  </span>
                  {post.subtitle ? <span className="text-ink-soft">{post.subtitle}</span> : null}
                  <span className="label mt-auto pt-2 text-accent-deep">{copy.readLabel} &rarr;</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-14 max-w-xl border-2 border-ink bg-paper p-6 text-ink">{copy.emptyText}</p>
      )}

      <div className="mt-20 border-t-2 border-ink pt-10">
        <p className="max-w-xl text-ink-soft">{copy.ctaText}</p>
        <div className="mt-6">
          <Button href="/" variant="accent" arrow>
            {copy.ctaLabel}
          </Button>
        </div>
      </div>
    </Section>
  );
}
