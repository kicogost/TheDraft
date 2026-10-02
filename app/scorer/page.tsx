import type { Metadata } from "next";
import { CopyBlock } from "@/components/CopyBlock";
import { Section } from "@/components/Section";
import { getScorer } from "@/lib/content";

const scorer = getScorer();

export const metadata: Metadata = {
  title: "The message scorer",
  description: scorer.description,
};

export default function Page() {
  return (
    <Section width="article" space="generous" grid="sm">
      <p className="label text-accent-deep">{scorer.kicker}</p>
      <h1 className="display-1 mt-4">{scorer.title}</h1>
      <p className="lead mt-6 max-w-xl">{scorer.description}</p>
      <p className="mt-6 max-w-xl text-ink-soft">{scorer.intro}</p>

      <div className="mt-12">
        <CopyBlock
          text={scorer.prompt}
          label={scorer.copyLabel}
          copiedLabel={scorer.copiedLabel}
        />
      </div>

      <p className="mt-10 max-w-xl border-l-2 border-accent pl-5 text-ink-soft">
        {scorer.footnote}
      </p>
    </Section>
  );
}
