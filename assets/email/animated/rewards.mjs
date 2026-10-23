// Animated referral reward cards for the beehiiv referral block.
// beehiiv crops reward images to a near-square tile and zooms in, so every
// element sits in the centre ~55% of the frame. A light sweep crosses the
// card and the badge pulses, so the block feels alive in the inbox.
//
// node assets/email/animated/rewards.mjs <out-dir> <chrome-path>

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const [outDir, chromePath] = process.argv.slice(2);
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../..");
const font = (f) => `data:font/ttf;base64,${fs.readFileSync(`${root}/assets/fonts/${f}`).toString("base64")}`;
const INK = "#241c16", PAPER = "#fdf6ec", ACCENT = "#b4552b";
const PERIOD = 2, FRAMES = 20;

const CARDS = [
  { name: "swipe", badge: "1 REFERRAL", title: "THE EXECUTIVE<br>SWIPE FILE", bg: PAPER, fg: INK, badgeBg: ACCENT },
  { name: "teardown", badge: "5 REFERRALS", title: "YOUR LINKEDIN,<br>TORN DOWN", bg: ACCENT, fg: PAPER, badgeBg: INK },
];

const html = (c) => `<html><head><style>
@font-face{font-family:Anton;src:url(${font("Anton-Regular.ttf")})}
@font-face{font-family:Mono;src:url(${font("JetBrainsMono-Regular.ttf")})}
*{margin:0;box-sizing:border-box}
#c{position:relative;overflow:hidden;width:600px;height:450px;background:${c.bg};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px}
.badge{font-family:Mono;font-size:20px;letter-spacing:3px;color:${PAPER};background:${c.badgeBg};padding:8px 16px;animation:pulse ${PERIOD}s ease-in-out infinite}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
.title{font-family:Anton;font-size:50px;line-height:1.02;color:${c.fg};text-align:center}
.sweep{position:absolute;top:-50%;left:-60%;width:30%;height:200%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);transform:rotate(20deg);animation:sweep ${PERIOD}s ease-in-out infinite}
@keyframes sweep{0%{left:-60%}60%,100%{left:130%}}
</style></head><body><div id="c"><div class="badge">${c.badge}</div><div class="title">${c.title}</div><div class="sweep"></div></div></body></html>`;

const b = await chromium.launch({ executablePath: chromePath });
const p = await b.newPage({ viewport: { width: 600, height: 450 } });
for (const c of CARDS) {
  const dir = path.join(outDir, `reward-${c.name}`);
  fs.mkdirSync(dir, { recursive: true });
  await p.setContent(html(c));
  await p.waitForTimeout(300);
  for (let i = 0; i < FRAMES; i++) {
    const t = (i / FRAMES) * PERIOD * 1000;
    await p.evaluate((t) => document.getAnimations().forEach((a) => { a.pause(); a.currentTime = t; }), t);
    await p.locator("#c").screenshot({ path: path.join(dir, `${String(i).padStart(2, "0")}.png`) });
  }
}
await b.close();
