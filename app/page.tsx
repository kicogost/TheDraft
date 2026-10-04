import Link from "next/link";
import { Button } from "@/components/Button";
import { ResourceForm } from "@/components/ResourceForm";
import { Section } from "@/components/Section";
import { bookingUrl, getSite } from "@/lib/content";

const site = getSite();

export default function HomePage() {
  const rallyUpHref = bookingUrl("homepage-block") || site.company.cta.href;

  return (
    <>
      <Section width="hero" space="generous" grid="sm">
        <h1 className="display-1">
          {site.hero.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <ul className="mt-7 space-y-1.5">
          {site.hero.credentials.map((line) => (
            <li key={line} className="label text-ash">
              {line}
            </li>
          ))}
        </ul>
        <p className="lead mt-7 max-w-xl">{site.hero.support}</p>
        {/*
          One action above the fold. The $100 call keeps its place in the nav
          and the closing band, but asking a visitor who landed ten seconds ago
          to book a paid call competes with the free thing that actually
          converts, and splitting the hero across both wins neither.
        */}
        <div className="mt-8 max-w-xl">
          <ResourceForm
            slug={site.newsletter.offerSlug}
            source="hero"
            layout="inline"
            submitLabel={site.hero.submitLabel}
            disclosure={site.hero.disclosure}
          />
        </div>
        <div className="mt-7">
          <Link
            href={`${site.hero.secondary.href}?from=hero`}
            className="link-sweep font-semibold text-ink transition-colors hover:text-accent-deep"
          >
            {site.hero.secondary.label}
          </Link>
        </div>
      </Section>

      {/*
        This block asks for an email and gives back a thing, not a
        subscription. The newsletter still arrives, disclosed under the form,
        because nobody trades an address for "a newsletter": 39 of the first
        53 signups came through the gated resource and 5 through this block
        when it was a plain signup. The anchor stays #newsletter, since seven
        links across the site and the content files point at it.
      */}
      <Section id="newsletter" background="dim" rules="both" grid="sm">
        <div className="grid gap-10 lg:grid-cols-[1fr_32rem] lg:gap-16">
          <div>
            <p className="label">{site.newsletter.label}</p>
            <h2 className="display-2 mt-4">{site.newsletter.heading}</h2>
            <p className="mt-5 max-w-xl">{site.newsletter.pitch}</p>
            <p className="mt-4 max-w-xl text-ink-soft">{site.newsletter.ask}</p>
          </div>
          <div className="self-center">
            <ResourceForm
              slug={site.newsletter.offerSlug}
              source="homepage"
              submitLabel={site.newsletter.submitLabel}
              disclosure={site.newsletter.reassurance}
            />
          </div>
        </div>
      </Section>

      {/*
        RallyUp sits below the offer, not above it. "Chief of staff at RallyUp"
        is proof and belongs near the top, but this block is a pitch for a
        different business to a different buyer, and in slot two it stood
        between every visitor and the thing they came for.
      */}
      <Section background="paper" rules="both" grid="sm" space="tight">
        <p className="label">{site.company.eyebrow}</p>
        <h2 className="display-2 mt-4">{site.company.name}.</h2>
        <p className="mt-5 max-w-2xl">{site.company.body}</p>
        {rallyUpHref ? (
          <div className="mt-8">
            <Button href={rallyUpHref} variant="outline" arrow>
              {site.company.cta.label}
            </Button>
          </div>
        ) : null}
      </Section>

      <Section background="ink" space="generous">
        <h2 className="display-2 text-paper">
          {site.closing.question.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <div className="mt-10">
          <Button
            href={`${site.closing.cta.href}?from=closing-band`}
            variant="accent"
            size="lg"
            arrow
          >
            {site.closing.cta.label}
          </Button>
        </div>
      </Section>
    </>
  );
}
