import Link from "next/link";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { getSite } from "@/lib/content";

const site = getSite();

export default function HomePage() {
  return (
    <>
      <Section width="hero" space="generous" grid="sm">
        <h1 className="display-1 max-w-3xl">{site.heroHeadline}</h1>
        <p className="lead mt-6 max-w-xl">{site.heroSupport}</p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Button href="/work" size="lg" arrow>
            Work with me
          </Button>
          <Link
            href="/manifesto"
            className="link-sweep font-semibold text-ink transition-colors hover:text-accent-deep"
          >
            Read the manifesto
          </Link>
        </div>
      </Section>

      <Section id="newsletter" background="dim" rules="both" grid="sm">
        <p className="label">{site.newsletter.label}</p>
        <h2 className="display-2 mt-4">{site.newsletter.name}.</h2>
        <p className="mt-5 max-w-xl">{site.newsletter.pitch}</p>
        <p className="mt-6 text-sm text-ash">
          The signup form arrives in phase 4.
        </p>
      </Section>

      <Section background="ink" space="generous">
        <h2 className="display-2 max-w-3xl text-paper">
          Closing call to action, written in phase 3.
        </h2>
        <div className="mt-10">
          <Button href="/#newsletter" variant="accent" size="lg" arrow>
            Read The Draft
          </Button>
        </div>
      </Section>
    </>
  );
}
