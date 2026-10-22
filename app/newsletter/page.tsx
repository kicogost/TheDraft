import type { Metadata } from "next";
import { LogoMark } from "@/components/Logo";
import { LogoTicker } from "@/components/LogoTicker";
import { ResourceForm } from "@/components/ResourceForm";
import { getNewsletterPage, getSite } from "@/lib/content";

const site = getSite();
const copy = getNewsletterPage();

export const metadata: Metadata = {
  title: "The Draft",
  description: site.seo.newsletter,
};

/**
 * The link in a LinkedIn bio or at the end of a post. Someone arriving here
 * already decided to look, so the page is one screen with one field: the
 * masthead, one line on what it is, the form, then who reads it. Nothing to
 * scroll past and nothing to read before the input.
 *
 * The form is the same ResourceForm as before, so the signup still goes
 * through /api/resource, the playbook still arrives first and /thank-you
 * still runs the stage question.
 */
export default function Page() {
  return (
    <>
      <section className="grid place-items-center bg-accent px-5 py-16 text-paper sm:px-8 sm:py-16">
        <div className="flex w-full max-w-2xl flex-col items-center text-center">
          <h1 className="flex items-center gap-4 border-2 border-ink bg-paper px-6 py-5 shadow-[8px_8px_0_0_var(--color-ink)] sm:gap-5 sm:px-9 sm:py-6">
            <span className="grid h-14 w-14 shrink-0 place-items-center bg-accent text-paper sm:h-20 sm:w-20">
              <LogoMark className="w-8 sm:w-11" />
            </span>
            <span className="font-display text-5xl uppercase leading-none tracking-wide text-ink sm:text-7xl">
              {copy.title}
            </span>
          </h1>

          <p className="mt-10 font-mono text-lg leading-relaxed sm:text-xl">
            {copy.lead}
          </p>
          <p className="mt-3 font-mono text-sm opacity-90">{copy.byline}</p>

          <div className="mt-10 w-full border-2 border-ink bg-paper p-2 text-left">
            <ResourceForm
              slug={site.newsletter.offerSlug}
              source="newsletter"
              submitLabel={copy.submitLabel}
              layout="inline"
            />
          </div>

          <p className="mt-4 text-sm">{copy.offer}</p>
        </div>
      </section>

      <section className="border-b border-paper/15 bg-ink py-12 text-center text-paper">
        <p className="px-5 font-mono text-sm sm:px-8">{copy.readersLine}</p>
        <div className="mt-10">
          <LogoTicker logos={copy.logos} />
        </div>
      </section>
    </>
  );
}
