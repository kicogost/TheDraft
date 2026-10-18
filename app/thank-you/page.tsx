import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { StageQuestions } from "@/components/StageQuestions";
import {
  getOtherResources,
  getResource,
  getStageQuestion,
  getThankYou,
} from "@/lib/content";
import { verifyResource } from "@/lib/signing";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ resource?: string; t?: string }>;
};

export default async function ThankYouPage({ searchParams }: Props) {
  const { resource: slug, t } = await searchParams;
  const resource = slug ? getResource(slug) : undefined;
  const verified = resource && t ? verifyResource(resource.slug, t) : false;
  const copy = getThankYou();
  // Only offer the index when there is actually something else on it. With one
  // live resource, "see the other resources" leads to the thing they just got.
  const others = resource ? getOtherResources(resource.slug).length : 0;

  return (
    <Section width="prose" space="generous" grid="sm">
      {/*
        The confirmation is deliberately quiet. They already know it worked,
        they pressed the button a second ago. The offer below is the thing
        they have not seen yet, so that takes the display weight instead.
      */}
      <p className="label text-ash">Confirmed</p>

      {resource ? (
        <>
          <p className="mt-3 text-lg text-ink">
            {verified && resource.resourceUrl
              ? copy.resourceLine
              : copy.resourceLineUnverified}
          </p>


        </>
      ) : (
        <p className="mt-3 text-lg text-ink">{copy.newsletterLine}</p>
      )}

      <StageQuestions
        question={getStageQuestion()}
        download={
          resource && verified && resource.resourceUrl
            ? {
                href: resource.resourceUrl,
                label: `Download ${resource.title.replace(/\.$/, "")}`,
              }
            : undefined
        }
      />

      <div className="mt-12 flex flex-wrap gap-6">
        <Button href="/newsletter" variant="outline">
          Back to the newsletter
        </Button>
        {others > 0 ? (
          <Button href="/resources" variant="outline">
            {others === 1 ? "See the other resource" : "See the other resources"}
          </Button>
        ) : (
          <Button href="/about" variant="outline">
            About me
          </Button>
        )}
      </div>
    </Section>
  );
}
