import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { getManifesto } from "@/lib/content";
import { RichText } from "@/lib/richtext";

const doc = getManifesto();

export const metadata: Metadata = {
  title: "The Application Loop",
  description:
    "Five steps almost every job seeker runs, why none of them works, and what it looks like from the side of the desk that reads the applications.",
};

/**
 * Names the trap before offering the way out. Structure follows the pattern
 * Jacob Pegs uses for the Manual Loop, which is the one part of that page
 * worth borrowing: diagnose the reader's situation step by step, then show
 * the view they have never had. Every word is Francisco's and every number
 * is his own.
 */
export default function Page() {
  return (
    <Section width="prose" space="generous">
      <h1 className="display-1">{doc.title}</h1>
      <p className="lead mt-6 max-w-xl">{doc.lead}</p>

      {doc.steps.map((step) => (
        <div key={step.heading} className="mt-12">
          <h2 className="text-xl font-medium">{step.heading}</h2>
          <p className="mt-4 max-w-xl text-ink-soft">
            <RichText>{step.body}</RichText>
          </p>
        </div>
      ))}

      <div className="mt-16 border-t-2 border-ink pt-10">
        <h2 className="display-2">{doc.closeHeading}</h2>
        {doc.close.map((paragraph) => (
          <p key={paragraph} className="mt-5 max-w-xl text-ink-soft">
            <RichText>{paragraph}</RichText>
          </p>
        ))}
      </div>
    </Section>
  );
}
