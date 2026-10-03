import type { Metadata } from "next";
import { CopyBlock } from "@/components/CopyBlock";
import { Section } from "@/components/Section";
import { getBuilder } from "@/lib/content";

const builder = getBuilder();

export const metadata: Metadata = {
  title: "The cold message builder",
  description: builder.description,
};

export default function Page() {
  return (
    <Section width="article" space="generous" grid="sm">
      <p className="label text-accent-deep">{builder.kicker}</p>
      <h1 className="display-1 mt-4">{builder.title}</h1>
      <p className="lead mt-6 max-w-xl">{builder.description}</p>
      <p className="mt-6 max-w-xl text-ink-soft">{builder.intro}</p>

      <div className="mt-12">
        <CopyBlock
          text={builder.prompt}
          label={builder.copyLabel}
          copiedLabel={builder.copiedLabel}
        />
      </div>

      <p className="mt-10 max-w-xl border-l-2 border-accent pl-5 text-ink-soft">
        {builder.footnote}
      </p>
    </Section>
  );
}
