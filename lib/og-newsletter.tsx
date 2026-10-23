import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getNewsletterPage } from "@/lib/content";
import { OG_SIZE } from "@/lib/og";

/**
 * Share card for the homepage newsletter, built to look like the page it links to:
 * orange field, The Draft masthead, the tagline, and the ink band of client
 * logos. Separate from lib/og.tsx because that spec leaves images out.
 *
 * Satori cannot apply CSS filters, so the logos are pre-flattened white PNGs
 * in assets/og-logos, named after the wordmark files. Regenerate them if a
 * logo in content/newsletter.json changes. The words come from the shareCard
 * block in the same file.
 */

const PAPER = "#fdf6ec";
const INK = "#241c16";
const ACCENT = "#b4552b";

const ROOT = process.cwd();

function font(name: string) {
  return readFileSync(join(ROOT, "assets", "fonts", name));
}

export function Masthead({ size }: { size: number }) {
  const tile = Math.round(size * 1.15);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: Math.round(size * 0.35),
        backgroundColor: PAPER,
        border: `3px solid ${INK}`,
        boxShadow: `9px 9px 0 0 ${INK}`,
        padding: `${Math.round(size * 0.3)}px ${Math.round(size * 0.5)}px`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: tile, height: tile, backgroundColor: ACCENT }}>
        <svg width={tile * 0.58} height={tile * 0.41} viewBox="0 0 470 331" fill={PAPER}>
          <path d="M0 0 L235 187 L470 0 L470 331 L0 331 Z" />
        </svg>
      </div>
      <div style={{ display: "flex", fontFamily: "Anton", fontSize: size, lineHeight: 1, letterSpacing: 1, color: INK }}>
        THE DRAFT
      </div>
    </div>
  );
}

function Card() {
  const { logos, shareCard } = getNewsletterPage();

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", backgroundColor: ACCENT }}>
      <div style={{ display: "flex", flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 70px" }}>
        <Masthead size={74} />
        {/*
          One flex item per word with a column gap, because Satori keeps a
          leading space on a wrapped line when the words share one span.
        */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            columnGap: 18,
            marginTop: 44,
            fontFamily: "Anton",
            fontSize: 76,
            lineHeight: 1.02,
            color: PAPER,
          }}
        >
          {shareCard.tagline
            .toUpperCase()
            .split(" ")
            .map((word, i) => (
              <span key={i} style={word === shareCard.highlight ? { color: INK } : undefined}>
                {word}
              </span>
            ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: INK, padding: "24px 0 28px" }}>
        <div style={{ display: "flex", fontFamily: "JetBrains Mono", fontSize: 17, color: PAPER }}>
          {shareCard.readersLine}
        </div>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 44, marginTop: 18 }}>
          {logos.map((logo) => {
            const slug = logo.src.split("/").pop()!.split(".")[0];
            const data = readFileSync(join(ROOT, "assets", "og-logos", `${slug}-white.png`)).toString("base64");
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={slug}
                src={`data:image/png;base64,${data}`}
                width={Math.round(logo.width * 0.8)}
                height={Math.round(logo.height * 0.8)}
                alt=""
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function newsletterCard() {
  return new ImageResponse(<Card />, {
    ...OG_SIZE,
    fonts: [
      { name: "Anton", data: font("Anton-Regular.ttf"), weight: 400, style: "normal" },
      { name: "JetBrains Mono", data: font("JetBrainsMono-Regular.ttf"), weight: 400, style: "normal" },
    ],
  });
}
