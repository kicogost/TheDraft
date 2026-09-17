import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { bookingUrl, getPortfolio } from "@/lib/content";

const portfolio = getPortfolio();

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "The companies Francisco Gost holds a stake in and helps build, starting with RallyUp.",
};

export default function PortfolioPage() {
  const { entries } = portfolio;
  const columns =
    entries.length >= 5
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : entries.length >= 2
        ? "sm:grid-cols-2"
        : "max-w-2xl";

  return (
    <>
      <Section space="none" grid="sm" className="pt-10 sm:pt-12">
        <div className="mx-auto w-full">
          <h1 className="display-2 max-w-3xl">{portfolio.title}</h1>
          <p className="mt-6 max-w-xl">{portfolio.lead}</p>
        </div>
      </Section>

      <Section space="none" grid="sm" className="pb-20 pt-10 sm:pb-28">
        <div className={`grid gap-4 ${columns}`}>
          {entries.map((entry) => {
            const promoHref =
              bookingUrl("portfolio-card") || entry.promo?.href || "";

            return (
              <Card key={entry.name} href={entry.href || undefined}>
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden border-2 border-ink">
                    {entry.logo ? (
                      <Image
                        src={entry.logo}
                        alt=""
                        width={44}
                        height={44}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="font-display text-lg leading-none">
                        {entry.name.charAt(0)}
                      </span>
                    )}
                  </span>
                  <span className="label-micro text-right">
                    <span className="text-accent-deep">
                      {entry.relationship}
                    </span>
                    <span className="text-ash"> · {entry.year}</span>
                  </span>
                </div>

                <h2 className="display-3 mt-5">{entry.name}</h2>
                <p className="label-micro mt-1.5">{entry.category}</p>
                <p className="mt-4">{entry.description}</p>

                {promoHref && entry.promo?.label ? (
                  <p className="mt-5 border-t border-dashed border-line pt-4 text-sm">
                    <span className="text-accent-deep">{entry.promo.label}</span>
                  </p>
                ) : null}

                <span className="mt-auto pt-6 text-sm font-semibold text-ink">
                  Visit{" "}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </span>
              </Card>
            );
          })}
        </div>

        <p className="mt-8 max-w-2xl text-sm text-ash">
          {portfolio.disclosure}
        </p>
      </Section>

      {portfolio.cta.href ? (
        <Section
          background="dim"
          rules="top"
          grid="lg"
          space="band"
          width="prose"
          className="text-center"
        >
          <Button href={portfolio.cta.href} variant="accent" arrow>
            {portfolio.cta.label}
          </Button>
        </Section>
      ) : null}
    </>
  );
}
