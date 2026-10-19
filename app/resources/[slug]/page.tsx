import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ResourceForm } from "@/components/ResourceForm";
import { Section } from "@/components/Section";
import { getAllResources, getOtherResources, getResource, getSite } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllResources().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) return {};
  // A retired resource keeps its page so links already sent still work, but it
  // sells a positioning we have moved on from, so it stays out of the index.
  const retired = "retired" in resource && resource.retired === true;
  return {
    title: resource.title.replace(/\.$/, ""),
    description: resource.description,
    ...(retired ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function ResourcePage({ params }: Params) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) notFound();

  const others = getOtherResources(slug);
  const isStory = resource.template === "story";

  /*
    A retired resource keeps its page and its download, so links already sent
    out still work, but it must stop taking new signups. Left live it enrols
    people into a sequence for something that is no longer published.
  */
  const retired = "retired" in resource && resource.retired === true;

  const form = retired ? (
    <div className="border-2 border-line bg-paper-dim px-6 py-6">
      <p className="label text-ash">No longer available</p>
      <p className="mt-3 text-ink-soft">{getSite().retiredNote}</p>
      <Link
        href="/resources/chief-of-staff-dm"
        className="label mt-5 inline-block text-accent-deep underline underline-offset-4 transition-colors hover:text-ink"
      >
        Get that one instead &rarr;
      </Link>
    </div>
  ) : (
    <div className="border-2 border-ink bg-paper shadow-[10px_10px_0_0_var(--color-accent)]">
      <div className="bg-ink px-6 py-5">
        <p className="display-3 text-paper">{resource.formHeader}</p>
      </div>
      <div className="px-6 py-6">
        <ResourceForm
          slug={resource.slug}
          eyebrow={resource.formEyebrow}
          submitLabel={resource.submitLabel}
          disclosure={resource.disclosure}
        />
      </div>
    </div>
  );

  const story = (
    <div>
      {resource.blocks.map((block, index) => {
        if (block.type === "list") {
          return (
            <ol
              key={index}
              className="my-8 space-y-4 border-l-2 border-accent/30 pl-6"
            >
              {block.items?.map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-display text-lg leading-snug text-accent-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          );
        }
        if (block.type === "lead") {
          return (
            <p key={index} className="lead text-ink">
              {block.text}
            </p>
          );
        }
        return (
          <p key={index} className="mt-6">
            {block.text}
          </p>
        );
      })}
    </div>
  );

  return (
    <>
      <Section width="article" space="none" grid="sm" className="pb-24 pt-10 sm:pb-32 sm:pt-12">
        {isStory ? (
          <div className="grid gap-x-10 gap-y-12 lg:grid-cols-[1fr_22rem] lg:gap-x-14">
            <div>
              <h1 className="display-1">{resource.title}</h1>
              <p className="lead mt-6 max-w-xl">{resource.description}</p>
              <div className="mt-10">{story}</div>
            </div>
            <div className="lg:pt-4">{form}</div>
          </div>
        ) : (
          <div className="max-w-3xl">
            <h1 className="display-1">{resource.title}</h1>
            <p className="lead mt-6">{resource.description}</p>
            <div className="mt-10 max-w-lg">{form}</div>
            <p className="label mt-16">{resource.insideLabel}</p>
            <ol className="mt-6 space-y-4 border-l-2 border-accent/30 pl-6">
              {resource.inside?.map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-display text-lg leading-snug text-accent-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
            {resource.blocks.length > 0 ? (
              <div className="mt-16 max-w-xl">{story}</div>
            ) : null}
          </div>
        )}

        {others.length > 0 ? (
          <div className="mt-20 border-t-2 border-ink pt-10">
            <p className="label">More resources</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/resources/${other.slug}`}
                  className="group flex items-center justify-between gap-4 border-2 border-ink p-5 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-accent)]"
                >
                  <span>
                    <span className="label-micro block">{other.kicker}</span>
                    <span className="display-3 mt-1 block">
                      {other.title.replace(/\.$/, "")}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-accent-deep transition-transform group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </Section>
    </>
  );
}
