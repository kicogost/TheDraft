import Link from "next/link";
import type { ReactNode } from "react";

type CardProps = {
  href?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Zero radius, 2px ink border, no shadow at rest. The hard offset shadow in
 * the accent appears on hover, which is the lift language used site wide.
 */
export function Card({ href, children, className = "" }: CardProps) {
  const classes = [
    "group flex h-full flex-col border-2 border-ink bg-paper p-6",
    "transition-all duration-150",
    href
      ? "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-accent)]"
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (!href) return <div className={classes}>{children}</div>;

  const isExternal = href.startsWith("http");

  return isExternal ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {children}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
