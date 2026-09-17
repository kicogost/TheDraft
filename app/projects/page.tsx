import type { Metadata } from "next";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Projects",
};

export default function Page() {
  return (
    <Section width="wide" space="generous">
      <h1 className="display-1">Projects.</h1>
      <p className="lead mt-6 max-w-xl">Placeholder. The grid reads from content/projects.json in phase 2.</p>
    </Section>
  );
}
