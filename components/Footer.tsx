import Link from "next/link";
import { Logo } from "@/components/Logo";
import type { NavItem } from "@/lib/content";

type FooterProps = {
  name: string;
  tagline: string;
  explore: NavItem[];
  legal: NavItem[];
  social: NavItem[];
};

function Column({ title, links }: { title: string; links: NavItem[] }) {
  if (links.length === 0) return null;

  return (
    <div className="flex flex-col gap-2.5">
      <span className="label text-paper/55">{title}</span>
      {links.map((link) => {
        const isExternal = link.href.startsWith("http");
        const className = "link-sweep w-fit text-paper/80 transition-colors hover:text-paper";

        return isExternal ? (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
          >
            {link.label}
          </a>
        ) : (
          <Link key={link.href} href={link.href} className={className}>
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}

export function Footer({ name, tagline, explore, legal, social }: FooterProps) {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Link href="/" aria-label={`${name}, home`}>
              <Logo name={name} tone="paper" size="lg" />
            </Link>
            <p className="mt-4 max-w-xs text-lg italic text-paper/60">{tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-8 sm:flex sm:gap-10">
            <Column title="Explore" links={explore} />
            <Column title="Follow" links={social} />
            <Column title="Legal" links={legal} />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-paper/15 pt-6 text-sm text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <span>
            &copy; {new Date().getFullYear()} {name}. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
