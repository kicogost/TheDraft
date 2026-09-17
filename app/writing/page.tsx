import type { Metadata } from "next";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Writing",
};

export default function Page() {
  return (
    <Section width="wide" space="generous">
      <h1 className="display-1">Writing.</h1>
      <p className="lead mt-6 max-w-xl">Placeholder. The issue list reads from content/writing.json in phase 2.</p>
    </Section>
  );
}
