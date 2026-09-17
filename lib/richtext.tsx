import Link from "next/link";
import type { ReactNode } from "react";

const PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

/**
 * Renders the inline [text](url) links used in the content JSON, so Francisco
 * can edit copy and links without touching React. Deliberately tiny: links
 * only, no other markdown.
 */
export function RichText({ children }: { children: string }) {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  PATTERN.lastIndex = 0;

  while ((match = PATTERN.exec(children)) !== null) {
    if (match.index > cursor) {
      nodes.push(children.slice(cursor, match.index));
    }

    const [, label, href] = match;
    const isExternal = href.startsWith("http");
    const className =
      "font-medium text-accent-deep underline underline-offset-4 transition-colors hover:text-ink";

    nodes.push(
      isExternal ? (
        <a
          key={match.index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {label}
        </a>
      ) : (
        <Link key={match.index} href={href} className={className}>
          {label}
        </Link>
      ),
    );

    cursor = match.index + match[0].length;
  }

  if (cursor < children.length) {
    nodes.push(children.slice(cursor));
  }

  return <>{nodes}</>;
}
