import type { Metadata } from "next";
import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { getSite, getSocialLinks } from "@/lib/content";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const site = getSite();

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.oneLiner}`,
    template: `%s · ${site.name}`,
  },
  description: site.oneLiner,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-5 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <Nav name={site.name} links={site.nav} cta={site.navCta} />
        <main id="main" className="pt-16">
          {children}
        </main>
        <Footer
          name={site.name}
          tagline={site.tagline}
          email={site.contactEmail}
          explore={site.footer.explore}
          legal={site.footer.legal}
          social={getSocialLinks()}
        />
      </body>
    </html>
  );
}
