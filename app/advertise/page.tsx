import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { LogoTicker } from "@/components/LogoTicker";
import { Section } from "@/components/Section";
import { getAdvertisePage, getNewsletterPage, getSite } from "@/lib/content";

const site = getSite();
const copy = getAdvertisePage();

export const metadata: Metadata = {
  title: "Advertise",
  description: site.seo.advertise,
};

/**
 * For brands that want to reach the people reading The Draft. Every number
 * and placement lives in content/advertise.json, so the page can grow with
 * the list (add a subscriber count, Instagram, prices) without touching code.
 */
export default function Page() {
  return (
    <>
      <Section width="article" space="generous" grid="sm">
        <h1 className="display-1">{copy.title}</h1>
        <p className="lead mt-6 max-w-xl">{copy.lead}</p>
        <div className="mt-8">
          <Button href={copy.cta.href} variant="accent" size="lg" arrow>
            {copy.cta.label}
          </Button>
        </div>

        <p className="label mt-20">{copy.statsLabel}</p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-3">
          {copy.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-2 border-2 border-ink bg-paper p-6">
              <dt className="text-ink-soft">{stat.label}</dt>
              <dd className="font-display text-5xl leading-none text-ink">{stat.value}</dd>
            </div>
          ))}
        </dl>

        <p className="label mt-16">{copy.placementsLabel}</p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {copy.placements.map((placement) => (
            <li key={placement.name} className="border-2 border-ink bg-paper p-6">
              <h2 className="font-display text-2xl uppercase leading-tight">{placement.name}</h2>
              <p className="mt-3 text-ink-soft">{placement.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <section className="bg-ink py-12 text-center text-paper sm:py-14">
        <p className="px-5 font-mono text-base font-medium sm:px-8 sm:text-lg">{copy.logosLabel}</p>
        <div className="mt-10 sm:mt-12">
          <LogoTicker logos={getNewsletterPage().logos} />
        </div>
      </section>

      <Section width="article" space="standard">
        <p className="max-w-xl text-lg text-ink">{copy.ratesNote}</p>
        <div className="mt-8">
          <Button href={copy.cta.href} variant="primary" size="lg" arrow>
            {copy.cta.label}
          </Button>
        </div>
      </Section>
    </>
  );
}
