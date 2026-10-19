import type { Metadata } from "next";
import { Button } from "@/components/Button";
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

  const confirmLine = resource
    ? verified && resource.resourceUrl
      ? copy.resourceLine
      : copy.resourceLineUnverified
    : copy.newsletterLine;

  // "Send me the playbook" becomes "Download the playbook", so the button names
  // the thing without the title's full stop and capital landing mid sentence.
  // The words still come from the resource file, where Francisco edits them.
  const downloadLabel = resource?.submitLabel.startsWith("Send me ")
    ? resource.submitLabel.replace("Send me ", "Download ")
    : "Download it";

  /*
    The whole page is the question flow. They already know the signup worked,
    they pressed the button a second ago, so the confirmation is reduced to a
    label and the screen is given to the one thing they have not seen yet.
    Everything below appears once they are through it.
  */
  return (
    <StageQuestions
      question={getStageQuestion()}
      confirmLine={confirmLine}
      download={
        resource && verified && resource.resourceUrl
          ? {
              href: resource.resourceUrl,
              label: downloadLabel,
            }
          : undefined
      }
    >
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
    </StageQuestions>
  );
}
