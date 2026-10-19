import Image from "next/image";
import { Button } from "@/components/Button";
import { ResourceForm } from "@/components/ResourceForm";
import { Section } from "@/components/Section";
import { bookingUrl, getSite } from "@/lib/content";

const site = getSite();

export default function HomePage() {
  const rallyUpHref = bookingUrl("homepage-block") || site.company.cta.href;

  return (
    <>
      {/*
        The hero carries id="newsletter" because the block that used to hold
        it is gone. Seven links across the nav, footer, thank you page,
        resources page and about copy point at that anchor, and they are all
        labelled "newsletter", so they should land where you can sign up.
      */}
      <Section id="newsletter" width="hero" space="generous" grid="sm">
        <h1 className="display-1">
          {site.hero.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="lead mt-7 max-w-xl">{site.hero.support}</p>
        {/*
          One action above the fold. Everything else on the page points at the
          same place, because a visitor who landed ten seconds ago will take
          one decision and splitting the hero across two wins neither.
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

        {/*
          The three client marks. They are square app icons rather than
          wordmarks, so they are set as a row of tiles with the name beside
          each one, and the image is decorative because the name is already
          there as text.
        */}
        <ul className="mt-9 flex flex-wrap items-center gap-x-9 gap-y-5">
          {site.company.logos.map((logo) => (
            <li key={logo.name} className="flex items-center gap-3">
              <Image
                src={logo.src}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 rounded-md"
              />
              <span className="label text-ink">{logo.name}</span>
            </li>
          ))}
        </ul>

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
