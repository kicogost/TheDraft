import Link from "next/link";
import { Button } from "@/components/Button";
import { NewsletterForm } from "@/components/NewsletterForm";
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
        <p className="lead mt-6 max-w-xl">{site.hero.support}</p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Button href={`${site.hero.primary.href}?from=hero`} size="lg" arrow>
            {site.hero.primary.label}
          </Button>
          <Link
            href={site.hero.secondary.href}
            className="link-sweep font-semibold text-ink transition-colors hover:text-accent-deep"
          >
            {site.hero.secondary.label}
          </Link>
        </div>
      </Section>

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

      <Section id="newsletter" background="dim" rules="both" grid="sm">
        <div className="grid gap-10 lg:grid-cols-[1fr_32rem] lg:gap-16">
          <div>
            <p className="label">{site.newsletter.label}</p>
            <h2 className="display-2 mt-4">{site.newsletter.name}.</h2>
            <p className="mt-5 max-w-xl">{site.newsletter.pitch}</p>
          </div>
          <div className="self-center">
            <NewsletterForm
              source="homepage"
              reassurance={site.newsletter.reassurance}
            />
          </div>
        </div>
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
