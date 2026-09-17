import type { Metadata } from "next";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Resources",
};

export default function Page() {
  return (
    <Section width="wide" space="generous">
      <h1 className="display-1">Resources.</h1>
      <p className="lead mt-6 max-w-xl">Placeholder. The index reads from content/resources in phase 4.</p>
    </Section>
  );
}
