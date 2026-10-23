import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { Masthead } from "@/lib/og-newsletter";

/**
 * The title image at the top of each issue of The Draft, like the cover a
 * Big Desk Energy issue opens with. One URL per issue, no design work:
 *
 *   /email/issue?title=We just closed $137,988&date=28 October 2026
 *
 * beehiiv copies the image into its own library when the issue is built
 * (save_image with this URL), so later changes here never alter an issue
 * that has already gone out.
 */

const PAPER = "#fdf6ec";
const INK = "#241c16";
const ACCENT = "#b4552b";

function font(name: string) {
  return readFileSync(join(process.cwd(), "assets", "fonts", name));
}

export function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const title = (params.get("title") ?? "The Draft").slice(0, 90);
  const date = (params.get("date") ?? "").slice(0, 40);
  const size = title.length <= 28 ? 104 : title.length <= 50 ? 84 : 66;

  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", backgroundColor: ACCENT, padding: "56px 64px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Masthead size={40} />
          <div style={{ display: "flex", fontFamily: "JetBrains Mono", fontSize: 24, color: PAPER }}>{date.toUpperCase()}</div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", columnGap: Math.round(size * 0.24), fontFamily: "Anton", fontSize: size, lineHeight: 1.02, color: PAPER }}>
          {title.toUpperCase().split(" ").map((word, i) => (
            <span key={i}>{word}</span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, borderTop: `3px solid ${INK}`, paddingTop: 18, fontFamily: "JetBrains Mono", fontSize: 22, color: INK }}>
          HOW TOP 1% STARTUPS CRUSH ORGANIC MARKETING · BY FRANCISCO GOST
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Anton", data: font("Anton-Regular.ttf"), weight: 400, style: "normal" },
        { name: "JetBrains Mono", data: font("JetBrainsMono-Regular.ttf"), weight: 400, style: "normal" },
      ],
    },
  );
}
