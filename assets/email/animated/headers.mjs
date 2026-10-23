// Builds the animated section headers for The Draft emails.
// Each header is the dark banner with a brand icon on the right that moves.
// Frames are captured with Playwright by pausing CSS animations at fixed
// times, then assembled into a looping GIF by frames-to-gif.py.
//
// node assets/email/animated/headers.mjs <out-dir> <chrome-path>

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const [outDir, chromePath] = process.argv.slice(2);
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../..");
// Inlined as data URLs: a page loaded with setContent cannot read file:// fonts.
const font = (f) => `data:font/ttf;base64,${fs.readFileSync(`${root}/assets/fonts/${f}`).toString("base64")}`;

const ACCENT = "#b4552b", INK = "#241c16", PAPER = "#fdf6ec";

const ICONS = {
  // Arrow flies into a target.
  "the-play": `<svg viewBox="0 0 100 100" width="96" height="96">
    <circle cx="50" cy="50" r="40" fill="none" stroke="${INK}" stroke-width="7"/>
    <circle cx="50" cy="50" r="24" fill="none" stroke="${ACCENT}" stroke-width="7"/>
    <circle cx="50" cy="50" r="8" fill="${INK}"/>
    <g class="arrow"><line x1="50" y1="50" x2="88" y2="12" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
    <path d="M88 12 L74 14 L86 26 Z" fill="${ACCENT}"/></g></svg>`,
  // Flame flickers.
  "banger-vs-flop": `<svg viewBox="0 0 100 100" width="96" height="96"><g class="flame">
    <path d="M50 8 C62 30 80 40 78 64 C76 84 62 94 50 94 C38 94 24 84 22 64 C21 50 30 42 36 32 C38 44 44 50 50 50 C46 36 44 22 50 8 Z" fill="${ACCENT}"/>
    <path d="M50 52 C58 62 64 68 63 78 C62 87 56 92 50 92 C44 92 38 87 37 78 C37 70 44 64 50 52 Z" fill="${PAPER}"/></g></svg>`,
  // Scissors snip.
  "steal-this": `<svg viewBox="0 0 100 100" width="96" height="96">
    <g class="blade-a"><line x1="22" y1="70" x2="86" y2="30" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><circle cx="20" cy="72" r="11" fill="none" stroke="${ACCENT}" stroke-width="6"/></g>
    <g class="blade-b"><line x1="22" y1="30" x2="86" y2="70" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><circle cx="20" cy="28" r="11" fill="none" stroke="${ACCENT}" stroke-width="6"/></g>
    <circle cx="52" cy="50" r="4" fill="${PAPER}"/></svg>`,
  // Eye looks left and right, blinks.
  "in-the-wild": `<svg viewBox="0 0 100 100" width="96" height="96"><g class="lid">
    <path d="M8 50 Q50 10 92 50 Q50 90 8 50 Z" fill="${PAPER}" stroke="${INK}" stroke-width="6"/>
    <g class="pupil"><circle cx="50" cy="50" r="15" fill="${ACCENT}"/><circle cx="50" cy="50" r="7" fill="${INK}"/></g></g></svg>`,
  // Bars grow.
  "the-scoreboard": `<svg viewBox="0 0 100 100" width="96" height="96">
    <line x1="10" y1="90" x2="92" y2="90" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
    <rect class="bar b1" x="16" y="20" width="18" height="70" fill="${INK}"/>
    <rect class="bar b2" x="41" y="20" width="18" height="70" fill="${ACCENT}"/>
    <rect class="bar b3" x="66" y="20" width="18" height="70" fill="${INK}"/></svg>`,
  // Gift box bounces and its lid pops.
  "share": `<svg viewBox="0 0 100 100" width="96" height="96"><g class="gift">
    <rect x="18" y="44" width="64" height="46" fill="${ACCENT}"/><rect x="45" y="44" width="10" height="46" fill="${INK}"/>
    <g class="lid"><rect x="12" y="30" width="76" height="16" fill="${INK}"/><rect x="45" y="30" width="10" height="16" fill="${ACCENT}"/>
    <path d="M50 30 C40 14 26 18 32 28 Z M50 30 C60 14 74 18 68 28 Z" fill="none" stroke="${ACCENT}" stroke-width="5"/></g></g></svg>`,
  // Clock hand spins.
  "off-the-clock": `<svg viewBox="0 0 100 100" width="96" height="96">
    <circle cx="50" cy="50" r="40" fill="${PAPER}" stroke="${INK}" stroke-width="7"/>
    <line x1="50" y1="50" x2="50" y2="30" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
    <g class="hand"><line x1="50" y1="50" x2="72" y2="50" stroke="${ACCENT}" stroke-width="5" stroke-linecap="round"/></g>
    <circle cx="50" cy="50" r="5" fill="${INK}"/></svg>`,
};

const SECTIONS = [
  ["01", "The play", "The main piece. Steal it.", "the-play"],
  ["02", "Banger vs flop", "The best and worst post of the week.", "banger-vs-flop"],
  ["03", "Steal this", "Copy it, paste it, ship it.", "steal-this"],
  ["04", "The scoreboard", "Building in public, real numbers.", "the-scoreboard"],
  ["05", "Off the clock", "The bit that isn't about work.", "off-the-clock"],
  ["06", "Share The Draft", "Bring a friend, unlock rewards.", "share"],
];

const PERIOD = 1.6; // seconds per loop
const FRAMES = 16;

const css = `
@font-face{font-family:Anton;src:url(${font("Anton-Regular.ttf")})}
@font-face{font-family:Mono;src:url(${font("JetBrainsMono-Regular.ttf")})}
*{margin:0;box-sizing:border-box}
svg *{transform-box:fill-box}
.arrow{animation:arrow ${PERIOD}s ease-in infinite}
@keyframes arrow{0%{transform:translate(28px,-28px);opacity:0}15%{opacity:1}55%,100%{transform:translate(0,0)}}
.flame{transform-origin:50% 100%;animation:flame ${PERIOD}s ease-in-out infinite}
@keyframes flame{0%,100%{transform:scale(1,1) rotate(-3deg)}25%{transform:scale(1.06,.92) rotate(2deg)}50%{transform:scale(.95,1.08) rotate(-1deg)}75%{transform:scale(1.04,.95) rotate(3deg)}}
.blade-a{transform-origin:50% 50%;transform-box:view-box;animation:ba ${PERIOD}s ease-in-out infinite}
.blade-b{transform-origin:52% 50%;transform-box:view-box;animation:bb ${PERIOD}s ease-in-out infinite}
@keyframes ba{0%,100%{transform:rotate(0)}50%{transform:rotate(16deg)}}
@keyframes bb{0%,100%{transform:rotate(0)}50%{transform:rotate(-16deg)}}
.pupil{animation:look ${PERIOD}s ease-in-out infinite}
@keyframes look{0%,100%{transform:translateX(-14px)}45%,55%{transform:translateX(14px)}}
.lid{transform-origin:50% 50%;animation:blink ${PERIOD}s linear infinite}
@keyframes blink{0%,88%,100%{transform:scaleY(1)}94%{transform:scaleY(.1)}}
.bar{transform-origin:50% 100%;animation:grow ${PERIOD}s ease-out infinite}
.b1{animation-delay:0s}.b2{animation-delay:-.2s}.b3{animation-delay:-.4s}
@keyframes grow{0%{transform:scaleY(.2)}60%,100%{transform:scaleY(1)}}
.b1{transform:scaleY(.55)}.b3{transform:scaleY(.8)}
.gift{transform-origin:50% 100%;animation:hop ${PERIOD}s ease-in-out infinite}
@keyframes hop{0%,60%,100%{transform:translateY(0)}70%{transform:translateY(-8px)}80%{transform:translateY(0)}}
.lid{transform-origin:20% 100%;animation:pop ${PERIOD}s ease-in-out infinite}
@keyframes pop{0%,60%,100%{transform:rotate(0)}72%{transform:translateY(-10px) rotate(-14deg)}85%{transform:rotate(0)}}
.hand{transform-origin:0% 50%;animation:spin ${PERIOD}s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
`;

const html = ([n, title, sub, icon]) => `<html><head><style>${css}</style></head><body>
<div id="c" style="width:1200px;height:200px;background:${INK};display:flex;align-items:center;padding:0 64px;gap:36px;border-bottom:10px solid ${ACCENT}">
<div style="font-family:Anton;font-size:110px;line-height:1;color:${ACCENT}">${n}</div>
<div style="display:flex;flex-direction:column;gap:10px;flex:1"><div style="font-family:Anton;font-size:72px;line-height:1;color:${PAPER};letter-spacing:1px">${title.toUpperCase()}</div>
<div style="font-family:Mono;font-size:22px;color:${PAPER};opacity:.75">${sub}</div></div>
<div style="width:132px;height:132px;background:${PAPER};display:flex;align-items:center;justify-content:center;border:4px solid ${ACCENT}">${ICONS[icon]}</div>
</div></body></html>`;

const b = await chromium.launch({ executablePath: chromePath });
const p = await b.newPage({ viewport: { width: 1200, height: 220 } });
for (const s of SECTIONS) {
  const dir = path.join(outDir, `${s[0]}-${s[3]}`);
  fs.mkdirSync(dir, { recursive: true });
  await p.setContent(html(s));
  await p.waitForTimeout(400);
  for (let i = 0; i < FRAMES; i++) {
    const t = (i / FRAMES) * PERIOD * 1000;
    await p.evaluate((t) => document.getAnimations().forEach((a) => { a.pause(); a.currentTime = t + (a.effect.getTiming().delay < 0 ? -a.effect.getTiming().delay : 0); }), t);
    await p.locator("#c").screenshot({ path: path.join(dir, `${String(i).padStart(2, "0")}.png`) });
  }
}
await b.close();
