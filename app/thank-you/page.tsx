import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { getResource } from "@/lib/content";
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

  return (
    <Section width="prose" space="generous" grid="sm">
      <h1 className="display-1">Check your inbox.</h1>

      {resource ? (
        <>
          <p className="lead mt-6">
            {verified && resource.resourceUrl
              ? "Your copy is ready below, and a link is on its way by email too."
              : "It is on its way to your inbox now."}
          </p>

          {verified && resource.resourceUrl ? (
            <div className="mt-10">
              <Button href={resource.resourceUrl} size="lg" arrow>
                Download {resource.title.replace(/\.$/, "")}
              </Button>
            </div>
          ) : null}
        </>
      ) : (
        <p className="lead mt-6">
You are subscribed. The next Draft lands on Monday morning.
        </p>
      )}

      <div className="mt-12 flex flex-wrap gap-6">
        <Button href="/#newsletter" variant="outline">
          Back to the newsletter
        </Button>
        <Button href="/resources" variant="outline">
          See the other resources
        </Button>
      </div>
    </Section>
  );
}
