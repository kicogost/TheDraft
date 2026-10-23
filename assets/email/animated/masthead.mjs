// Animated email masthead: the orange banner from masthead.html, with the
// envelope tile spinning a full 360 degrees in 3D, like the Big Desk Energy logo.
// Frames go to <out-dir>/masthead, then frames-to-gif.py builds the GIF.
//
// node assets/email/animated/masthead.mjs <out-dir> <chrome-path>

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const [outDir, chromePath] = process.argv.slice(2);
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../..");
const font = (f) => `data:font/ttf;base64,${fs.readFileSync(`${root}/assets/fonts/${f}`).toString("base64")}`;

const ACCENT = "#b4552b", INK = "#241c16", PAPER = "#fdf6ec";
const FRAMES = 24, PERIOD = 2.4;
const mark = `<svg width="54" height="38" viewBox="0 0 470 331" fill="${PAPER}"><path d="M0 0 L235 187 L470 0 L470 331 L0 331 Z"/></svg>`;

const html = `<html><head><style>
@font-face{font-family:Anton;src:url(${font("Anton-Regular.ttf")})}
@font-face{font-family:Mono;src:url(${font("JetBrainsMono-Regular.ttf")})}
*{margin:0;box-sizing:border-box}
.stage{width:92px;height:92px;perspective:420px}
.tile{position:relative;width:92px;height:92px;transform-style:preserve-3d;animation:spin ${PERIOD}s ease-in-out infinite}
.face{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:${ACCENT};backface-visibility:hidden}
.back{transform:rotateY(180deg);background:${INK}}
@keyframes spin{0%,15%{transform:rotateY(0)}85%,100%{transform:rotateY(360deg)}}
</style></head><body>
<div id="c" style="width:1200px;height:420px;background:${ACCENT};display:flex;flex-direction:column;align-items:center;justify-content:center">
<div style="display:flex;align-items:center;gap:26px;background:${PAPER};border:4px solid ${INK};box-shadow:12px 12px 0 ${INK};padding:24px 40px">
<div class="stage"><div class="tile"><div class="face">${mark}</div><div class="face back">${mark}</div></div></div>
<div style="font-family:Anton;font-size:80px;line-height:1;color:${INK};letter-spacing:1px">THE DRAFT</div></div>
<div style="margin-top:44px;font-family:Anton;font-size:44px;color:${PAPER};letter-spacing:.5px">HOW TOP <span style="color:${INK}">1%</span> STARTUPS CRUSH ORGANIC MARKETING.</div>
<div style="margin-top:14px;font-family:Mono;font-size:20px;color:${PAPER}">Every Tuesday · by Francisco Gost</div></div></body></html>`;

const b = await chromium.launch({ executablePath: chromePath });
const p = await b.newPage({ viewport: { width: 1200, height: 440 } });
await p.setContent(html);
await p.waitForTimeout(400);
const dir = path.join(outDir, "masthead");
fs.mkdirSync(dir, { recursive: true });
for (let i = 0; i < FRAMES; i++) {
  const t = (i / FRAMES) * PERIOD * 1000;
  await p.evaluate((t) => document.getAnimations().forEach((a) => { a.pause(); a.currentTime = t; }), t);
  await p.locator("#c").screenshot({ path: path.join(dir, `${String(i).padStart(2, "0")}.png`) });
}
await b.close();
