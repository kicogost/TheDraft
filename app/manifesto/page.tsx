import type { Metadata } from "next";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Manifesto",
};

export default function Page() {
  return (
    <Section width="prose" space="generous">
      <h1 className="display-1">Manifesto.</h1>
      <p className="lead mt-6 max-w-xl">Placeholder. The body is drafted separately and lands as MDX in phase 2.</p>
    </Section>
  );
}
