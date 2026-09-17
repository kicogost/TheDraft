import type { Metadata } from "next";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Thank you",
};

export default function Page() {
  return (
    <Section width="prose" space="generous">
      <h1 className="display-1">Check your inbox.</h1>
      <p className="lead mt-6 max-w-xl">Placeholder. Confirmation copy lands in phase 4.</p>
    </Section>
  );
}
