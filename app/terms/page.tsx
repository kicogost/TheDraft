import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { getLegal } from "@/lib/content";
import { RichText } from "@/lib/richtext";

const doc = getLegal("terms");

export const metadata: Metadata = {
  title: "Terms of service",
  description: doc.lead,
};

export default function Page() {
  return (
    <Section width="prose" space="generous">
      <h1 className="display-1">{doc.title}</h1>
      <p className="lead mt-6 max-w-xl">{doc.lead}</p>
      <p className="label mt-4 text-ash">Last updated {doc.updated}</p>

      {doc.sections.map((section) => (
        <div key={section.heading} className="mt-12">
          <h2 className="text-xl font-medium">{section.heading}</h2>
          {section.body.map((paragraph) => (
            <p key={paragraph} className="mt-4 max-w-xl text-ink-soft">
              <RichText>{paragraph}</RichText>
            </p>
          ))}
        </div>
      ))}
    </Section>
  );
}
