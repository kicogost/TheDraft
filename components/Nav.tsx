"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import type { NavItem } from "@/lib/content";

type NavProps = {
  name: string;
  links: NavItem[];
  cta: { label: string; href: string };
};

export function Nav({ name, links, cta }: NavProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-line bg-paper/95 backdrop-blur-sm"
          : "border-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8"
      >
        <Link href="/" className="shrink-0" aria-label={`${name}, home`}>
          <Logo name={name} />
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((link) =>
            link.children && link.children.length > 0 ? (
              <Dropdown key={link.label} item={link} />
            ) : (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`link-sweep text-sm font-medium transition-colors hover:text-ink ${
                  pathname === link.href ? "text-ink" : "text-ink-soft"
                }`}
              >
                {link.label}
              </Link>
            ),
          )}
          <Button href={cta.href} size="md">
            {cta.label}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex h-10 w-10 items-center justify-center lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-ink transition-transform duration-200 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-6 bg-ink transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-ink transition-transform duration-200 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {open ? (
        <div id="mobile-nav" className="border-t border-line bg-paper lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-8">
            {links.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className="block py-2 text-lg text-ink-soft transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
                {link.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block py-1.5 pl-4 text-ink-soft transition-colors hover:text-ink"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
            <Button href={cta.href} size="md" className="mt-3 w-full">
              {cta.label}
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

/**
 * Hover and focus driven, no JavaScript state. The padded gap under the
 * trigger keeps the panel reachable as the pointer crosses into it.
 */
function Dropdown({ item }: { item: NavItem }) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-ink group-hover:text-ink"
      >
        {item.label}
        <span
          aria-hidden="true"
          className="text-[0.65rem] transition-transform group-hover:rotate-180"
        >
          &#9660;
        </span>
      </button>
      <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <div className="border-2 border-ink bg-paper p-2 shadow-[6px_6px_0_0_var(--color-accent)]">
          {item.children?.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="group/item block px-3 py-2.5 transition-colors hover:bg-ink"
            >
              <span className="text-sm font-medium text-ink-soft group-hover/item:text-paper">
                {child.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
