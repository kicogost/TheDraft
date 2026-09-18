import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { getCall, getSite } from "@/lib/content";

const call = getCall();
const site = getSite();

export const metadata: Metadata = {
  title: "Work with me",
  description:
    "A one hour LinkedIn and career workshop with Francisco Gost. Leave with a positioning line, a rewritten profile and a 90-day plan.",
};

function Ticks({ items, tone }: { items: string[]; tone: "yes" | "no" }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden="true"
            className={
              tone === "yes"
                ? "font-semibold text-accent-deep"
                : "font-semibold text-ash"
            }
          >
            {tone === "yes" ? "+" : "–"}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CallPage() {
  const href = site.call.checkoutUrl;

  return (
    <>
      <Section width="article" space="generous" grid="sm">
        <div className="grid gap-x-14 gap-y-12 lg:grid-cols-[1fr_22rem]">
          <div>
            <h1 className="display-1">{call.title}</h1>
            <p className="lead mt-6 max-w-xl">{call.lead}</p>

            <div className="mt-10 max-w-xl">
              {call.story.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="mt-5">
                  {paragraph}
                </p>
              ))}
            </div>

            <p className="label mt-12">{call.detailsLabel}</p>
            <ul className="mt-5 space-y-3">
              {call.outcomes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="font-semibold text-accent-deep">
                    +
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pt-4">
            <div className="border-2 border-ink bg-paper shadow-[10px_10px_0_0_var(--color-accent)]">
              <div className="bg-ink px-6 py-5">
                <p className="display-3 text-paper">{site.call.price}</p>
                <p className="mt-1 text-sm text-paper/70">
                  {site.call.duration} &middot; {site.call.platform}
                </p>
              </div>
              <div className="px-6 py-6">
                <Button href={href} className="w-full" arrow>
                  {call.ctaLabel}
                </Button>
                <p className="mt-3 text-sm text-ash">
                  You pay and pick a slot in the same step. Nothing else stands
                  between you and the call.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section background="dim" rules="both" grid="sm" width="article">
        <p className="label">{call.processLabel}</p>
        <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {call.process.map((step, i) => (
            <li key={step.title} className="border-t-2 border-ink pt-4">
              <span className="label-micro text-accent-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="display-3 mt-2">{step.title}</h2>
              <p className="mt-2 text-sm">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section width="article" grid="sm">
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-12">
          <div className="border-2 border-ink p-6">
            <p className="label">{call.forYouLabel}</p>
            <Ticks items={call.forYou} tone="yes" />
          </div>
          <div className="border-2 border-line p-6">
            <p className="label">{call.notForYouLabel}</p>
            <Ticks items={call.notForYou} tone="no" />
          </div>
        </div>
      </Section>

      <Section width="prose" background="paper" rules="top" grid="sm">
        <p className="label">{call.faqLabel}</p>
        <dl className="mt-8">
          {call.faq.map((item) => (
            <div key={item.q} className="border-b border-line py-5">
              <dt className="display-3">{item.q}</dt>
              <dd className="mt-2">{item.a}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section background="ink" space="generous" width="prose" className="text-center">
        <h2 className="display-2 text-paper">Ready to be the obvious hire?</h2>
        <div className="mt-10 flex justify-center">
          <Button href={href} variant="accent" size="lg" arrow>
            {call.ctaLabel}
          </Button>
        </div>
      </Section>
    </>
  );
}
