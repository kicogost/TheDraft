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
 * already decided to look, so the page is one screen with one field, laid out
 * after the Big Desk Energy landing page: masthead, byline, one line on what
 * it is, the form, then a band of who reads it. On a 1440 by 900 screen all
 * of it, logo strip included, sits above the fold.
 *
 * The form is the same ResourceForm as before, so the signup still goes
 * through /api/resource, the playbook still arrives first and /thank-you
 * still runs the stage question.
 */
export default function Page() {
  return (
    <>
      <section className="bg-accent px-5 pb-14 pt-10 text-paper sm:px-8 sm:pb-16 sm:pt-11">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          <h1 className="flex items-center gap-4 border-2 border-ink bg-paper px-5 py-4 shadow-[6px_6px_0_0_var(--color-ink)] sm:px-7">
            <span className="grid h-12 w-12 shrink-0 place-items-center bg-accent text-paper sm:h-14 sm:w-14">
              <LogoMark className="w-7 sm:w-8" />
            </span>
            <span className="font-display text-4xl uppercase leading-none tracking-wide text-ink sm:text-5xl">
              {copy.title}
            </span>
          </h1>

          <p className="mt-8 font-mono text-sm">{copy.byline}</p>
          <p className="mt-2 font-mono text-base leading-snug sm:text-lg">{copy.lead}</p>

          <div className="mt-8 w-full max-w-xl border-2 border-ink bg-paper p-1.5 text-left">
            <ResourceForm
              slug={site.newsletter.offerSlug}
              source="newsletter"
              submitLabel={copy.submitLabel}
              layout="inline"
            />
          </div>

          <p className="mt-4 font-mono text-xs sm:text-sm">{copy.offer}</p>
        </div>
      </section>

      <section className="border-b border-paper/15 bg-ink py-12 text-center text-paper sm:py-14">
        <p className="px-5 font-mono text-base font-medium sm:px-8 sm:text-lg">
          {copy.readersLine}
        </p>
        <div className="mt-10 sm:mt-12">
          <LogoTicker logos={copy.logos} />
        </div>
      </section>
    </>
  );
}
