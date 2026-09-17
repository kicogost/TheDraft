import type { ReactNode } from "react";

/** Container widths, measured off the reference site. */
type Width = "wide" | "article" | "hero" | "prose";
/** Vertical rhythm steps, measured off the reference site. */
type Space = "standard" | "tight" | "generous" | "band" | "none";
type Background = "paper" | "dim" | "ink";
type Rules = "none" | "top" | "bottom" | "both";

const WIDTHS: Record<Width, string> = {
  wide: "max-w-7xl",
  article: "max-w-6xl",
  hero: "max-w-5xl",
  prose: "max-w-3xl",
};

const SPACES: Record<Space, string> = {
  standard: "py-20 sm:py-28",
  tight: "py-16 sm:py-20",
  generous: "py-24 sm:py-32",
  band: "py-14 sm:py-16",
  none: "",
};

const BACKGROUNDS: Record<Background, string> = {
  paper: "bg-paper text-ink-soft",
  dim: "bg-paper-dim text-ink-soft",
  ink: "bg-ink text-paper",
};

const RULES: Record<Rules, string> = {
  none: "",
  top: "border-t-2 border-ink",
  bottom: "border-b-2 border-ink",
  both: "border-y-2 border-ink",
};

type SectionProps = {
  children: ReactNode;
  width?: Width;
  space?: Space;
  background?: Background;
  rules?: Rules;
  /** The stacked-sheet texture. Never applied to the body. */
  grid?: false | "sm" | "lg";
  id?: string;
  className?: string;
};

export function Section({
  children,
  width = "wide",
  space = "standard",
  background = "paper",
  rules = "none",
  grid = false,
  id,
  className = "",
}: SectionProps) {
  const outer = [
    BACKGROUNDS[background],
    RULES[rules],
    grid === "sm" ? "grid-paper" : "",
    grid === "lg" ? "grid-paper-lg" : "",
    id ? "scroll-mt-24" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inner = ["mx-auto w-full px-5 sm:px-8", WIDTHS[width], SPACES[space]]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={outer}>
      <div className={inner}>{children}</div>
    </section>
  );
}
