import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * Social preview cards, built to docs/reference/og-card-build-spec.md.
 *
 * Satori renders these, so the vocabulary is deliberately narrow: flexbox only,
 * solid fills, solid borders, no shadows, no filters, no images. Letter spacing
 * is in px rather than em because Satori does not resolve em on that property
 * reliably.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const PAPER = "#fdf6ec";
const PAPER_DIM = "#f4e9d9";
const INK = "#241c16";
const INK_SOFT = "#4a4239";
const ASH = "#6f6559";
const ACCENT = "#b4552b";

const FONT_DIR = join(process.cwd(), "assets", "fonts");

function fontFile(name: string) {
  return readFileSync(join(FONT_DIR, name));
}

function fonts() {
  return [
    { name: "Anton", data: fontFile("Anton-Regular.ttf"), weight: 400 as const, style: "normal" as const },
    { name: "Inter", data: fontFile("Inter-Regular.ttf"), weight: 400 as const, style: "normal" as const },
    { name: "JetBrains Mono", data: fontFile("JetBrainsMono-Regular.ttf"), weight: 400 as const, style: "normal" as const },
  ];
}

/**
 * The variant B ramp. Character count is a proxy for width, not width itself, so
 * the headline is never set to nowrap: a title of unusually wide letters is
 * allowed to wrap, and the shell absorbs the extra line.
 */
function resourceHeadlineType(headline: string) {
  return headline.length <= 18
    ? { fontSize: 112, lineHeight: "104px" }
    : { fontSize: 92, lineHeight: "86px" };
}

type CardOptions = {
  kicker: string;
  headline: string;
  supporting: string;
  /** Variant B only. Renders the accent badge instead of the accent rule. */
  badge?: string;
  /** Variant B only. Right hand item in the foot rail. */
  footRight?: string;
  fontSize: number;
  lineHeight: string;
};

function Card({ kicker, headline, supporting, badge, footRight, fontSize, lineHeight }: CardOptions) {
  const mono = {
    fontFamily: "JetBrains Mono",
    fontSize: 20,
    lineHeight: "26px",
    letterSpacing: 4,
    color: ASH,
  };

  const rail = {
    fontFamily: "JetBrains Mono",
    fontSize: 18,
    lineHeight: "23px",
    letterSpacing: 3.6,
    color: ASH,
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: PAPER,
        padding: 80,
      }}
    >
      {badge ? (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div style={mono}>{kicker.toUpperCase()}</div>
          <div
            style={{
              display: "flex",
              backgroundColor: ACCENT,
              color: PAPER,
              fontFamily: "JetBrains Mono",
              fontSize: 18,
              lineHeight: "23px",
              letterSpacing: 3.6,
              padding: "11px 18px",
            }}
          >
            {badge.toUpperCase()}
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={mono}>{kicker.toUpperCase()}</div>
          <div style={{ display: "flex", width: 72, height: 6, backgroundColor: ACCENT, marginTop: 30 }} />
        </div>
      )}

      <div
        style={{
          display: "flex",
          fontFamily: "Anton",
          fontSize,
          lineHeight,
          letterSpacing: 0.5,
          color: INK,
        }}
      >
        {headline.replace(/\.$/, "").toUpperCase()}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontFamily: "Inter",
            fontSize: 26,
            lineHeight: "39px",
            color: INK_SOFT,
            maxWidth: 880,
          }}
        >
          {supporting}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: footRight ? "space-between" : "flex-start",
            marginTop: 28,
            paddingTop: 18,
            borderTop: `2px solid ${PAPER_DIM}`,
          }}
        >
          <div style={rail}>FRANCISCOGOST.COM</div>
          {footRight ? <div style={rail}>{footRight.toUpperCase()}</div> : null}
        </div>
      </div>
    </div>
  );
}

function render(options: CardOptions) {
  return new ImageResponse(<Card {...options} />, { ...OG_SIZE, fonts: fonts() });
}

/** Variant A, the site default and the fallback for any page without its own card. */
export function defaultCard(kicker: string, headline: string, supporting: string) {
  return render({ kicker, headline, supporting, fontSize: 96, lineHeight: "90px" });
}

/**
 * Variant C, standard pages. Sized for one to three short words, stepping down to
 * the variant B ramp once the page name runs past about thirteen characters.
 */
export function pageCard(kicker: string, headline: string, supporting: string) {
  const type = headline.length <= 13 ? { fontSize: 132, lineHeight: "122px" } : resourceHeadlineType(headline);
  return render({ kicker, headline, supporting, ...type });
}

/** Variant B, the gated resource template. */
export function resourceCard(kicker: string, headline: string, supporting: string) {
  return render({
    kicker,
    headline,
    supporting,
    badge: "Free PDF",
    footRight: "Francisco Gost",
    ...resourceHeadlineType(headline),
  });
}
