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
    </Section>
  );
}
