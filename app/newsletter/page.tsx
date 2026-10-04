import type { Metadata } from "next";
import { ResourceForm } from "@/components/ResourceForm";
import { Section } from "@/components/Section";
import { getNewsletterPage, getSite } from "@/lib/content";

const site = getSite();
const copy = getNewsletterPage();

export const metadata: Metadata = {
  title: "The Draft",
  description:
    "A weekly letter on getting hired without applying. The message that got a reply, the thing someone built that got them an interview, and the attempt that went nowhere.",
};

/**
 * The homepage sells the DM and happens to carry the newsletter. This page is
 * the other way round, because it exists to be a destination: the link in a
 * LinkedIn bio, at the end of a post, or in a reply to someone who asked what
 * the newsletter is. The form still hands over the DM, since nobody trades an
 * address for "a newsletter", but here that is the thing which arrives first
 * rather than the thing being sold.
 */
export default function Page() {
  return (
    <Section width="article" space="generous" grid="sm">
      <p className="label">{copy.label}</p>
      <h1 className="display-1 mt-4">{copy.title}</h1>
      <p className="lead mt-6 max-w-xl">{copy.lead}</p>
      <p className="mt-6 max-w-xl text-ink-soft">{copy.proof}</p>

      <div className="mt-14 border-t-2 border-ink pt-12">
        <h2 className="display-2">{copy.formHeading}</h2>
        <p className="mt-5 max-w-xl text-ink-soft">{copy.formLead}</p>
        <div className="mt-8 max-w-xl">
          <ResourceForm
            slug={site.newsletter.offerSlug}
            source="newsletter"
            submitLabel={copy.submitLabel}
            disclosure={copy.disclosure}
          />
        </div>
      </div>

      {/*
        Proof that the thing exists and arrives. Linked out to beehiiv rather
        than mirrored here, so there is one copy of each issue and no archive
        to keep in sync. Both of these were email only until the web channel
        was added, which is why there was nothing to link to before.
      */}
      <div className="mt-20 border-t-2 border-ink pt-10">
        <p className="label">{copy.issuesLabel}</p>
        <p className="mt-4 max-w-xl text-ink-soft">{copy.issuesNote}</p>

        <ul className="mt-8 grid gap-4">
          {copy.issues.map((issue) => (
            <li key={issue.href}>
              <a
                href={issue.href}
                className="group flex flex-col gap-2 border-2 border-ink p-6 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-accent)]"
              >
                <span className="label text-ash">{issue.date}</span>
                <span className="font-display text-2xl leading-tight">{issue.title}</span>
                <span className="text-ink-soft">{issue.blurb}</span>
                <span className="label mt-2 text-accent-deep">Read it &rarr;</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
