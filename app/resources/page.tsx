import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { getResources, getSite } from "@/lib/content";

const site = getSite();

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Free guides from Francisco Gost on getting hired: the cold DM that got him the job, and how to get seen on LinkedIn by the people who can hire you.",
};

export default function Page() {
  const resources = getResources();

  return (
    <Section width="article" space="generous" grid="sm">
      <h1 className="display-1">Everything I give away.</h1>
      <p className="lead mt-6 max-w-xl">
        Written from what actually worked, with the numbers attached. Free, in exchange for an
        email address you can walk away from at any point.
      </p>

      <div className="mt-16 grid gap-4 sm:grid-cols-2">
        {resources.map((resource) => (
          <Link
            key={resource.slug}
            href={`/resources/${resource.slug}`}
            className="group flex flex-col justify-between gap-6 border-2 border-ink p-6 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-accent)]"
          >
            <div>
              <p className="label text-accent-deep">{resource.kicker}</p>
              <p className="mt-4 font-display text-2xl leading-tight">{resource.title}</p>
              <p className="mt-3 text-ink-soft">{resource.description}</p>
            </div>
            <span className="label">Get it free →</span>
          </Link>
        ))}
      </div>

      <div className="mt-20 border-t-2 border-ink pt-10">
        <p className="label">The weekly one</p>
        <p className="mt-4 max-w-xl text-ink-soft">
          {site.newsletter.name} goes out every week, and it is where the rest of this ends up
          first.
        </p>
        <Link
          href="/#newsletter"
          className="label mt-6 inline-block text-accent-deep underline underline-offset-4 transition-colors hover:text-ink"
        >
          Read what it is about →
        </Link>
      </div>
    </Section>
  );
}
