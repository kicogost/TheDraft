import type { Metadata } from "next";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Work with me",
  description:
    "A working session on your career with Francisco Gost. Leave with a positioning line, a rewritten profile and an outreach plan.",
};

export default function CallPage() {
  return (
    <Section width="prose" space="generous" grid="sm">
      <h1 className="display-1">Work with me.</h1>
      <p className="lead mt-6">
        Placeholder. The offer, the process, the price and the checkout land
        once the session length and price are set.
      </p>
    </Section>
  );
}
