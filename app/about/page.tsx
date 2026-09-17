import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { getAbout } from "@/lib/content";
import { RichText } from "@/lib/richtext";

const about = getAbout();

export const metadata: Metadata = {
  title: "About",
  description:
    "Francisco Gost is chief of staff at RallyUp. From Mallorca to London to one cold message that changed the job.",
};

export default function AboutPage() {
  return (
    <Section space="generous" grid="sm">
      <h1 className="display-2">{about.title}</h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_0.5fr] lg:gap-16">
        <div>
          <p className="lead text-ink">
            <RichText>{about.lead}</RichText>
          </p>
          {about.ladder.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="mt-6">
              <RichText>{paragraph}</RichText>
            </p>
          ))}
          <p className="mt-6">{about.closing}</p>
        </div>

        <div className="lg:pt-2">
          <figure className="border-2 border-ink bg-paper shadow-[10px_10px_0_0_var(--color-accent)]">
            <Image
              src={about.portrait.src}
              alt={about.portrait.alt}
              width={800}
              height={800}
              className="w-full"
              priority
            />
            <figcaption className="flex items-baseline justify-between gap-3 border-t-2 border-ink px-4 py-3">
              <span className="font-display text-lg leading-none">
                {about.portrait.caption}
              </span>
              <span className="text-sm italic text-ash">
                {about.portrait.role}
              </span>
            </figcaption>
          </figure>
          <Button href={about.cta.href} className="mt-4 w-full" arrow>
            {about.cta.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
