import type { Metadata } from "next";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Work",
};

export default function Page() {
  return (
    <Section width="wide" space="generous">
      <h1 className="display-1">Work.</h1>
      <p className="lead mt-6 max-w-xl">Placeholder. The CV reads from content/work.json in phase 2.</p>
    </Section>
  );
}
