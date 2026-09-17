import type { Metadata } from "next";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Terms",
};

export default function Page() {
  return (
    <Section width="prose" space="generous">
      <h1 className="display-1">Terms of service.</h1>
      <p className="lead mt-6 max-w-xl">Placeholder. This becomes MDX in phase 2.</p>
    </Section>
  );
}
