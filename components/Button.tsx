import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "accent" | "outline";
type Size = "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-ink text-paper border-2 border-ink hover:bg-ink-soft",
  accent: "bg-accent text-paper border-2 border-accent hover:bg-accent-deep",
  outline: "bg-transparent text-ink border-2 border-ink hover:bg-ink hover:text-paper",
};

const SIZES: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-8 py-4 text-lg",
};

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Primary actions carry a trailing arrow. It animates on its own. */
  arrow?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
}: ButtonProps) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  const classes = [
    "group inline-flex items-center justify-center gap-2.5 font-semibold",
    "transition-transform duration-150 hover:-translate-y-0.5",
    VARIANTS[variant],
    SIZES[size],
    className,
  ].join(" ");

  const content = (
    <>
      {children}
      {arrow ? (
        <span
          aria-hidden="true"
          className="transition-transform duration-150 group-hover:translate-x-1"
        >
          &rarr;
        </span>
      ) : null}
    </>
  );

  if (isExternal) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
