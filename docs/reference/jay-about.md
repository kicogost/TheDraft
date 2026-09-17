# Jay Yang, about

Source: https://jayyanginspires.com/about
Captured: 2026-09-17, 1440x900 and 390x844.
Screenshots: `screenshots/about-1440.png`, `screenshots/about-390.png`.

Nav, footer, colour tokens and motion are shared across the site and are documented once in `jay-home.md`. This file records only what is specific to this page.

## Layout

One section, 871px tall, no alternating backgrounds, no dark band, no closing CTA. The page ends and the footer starts. Page height is 1358px, the shortest content page on the site.

- Section: `max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28`, so 1280px container, 32px side padding, 112px bottom padding and no top padding beyond the fixed nav offset.
- h1 sits alone at the top, then a `mt-10` grid.
- Grid: `grid gap-12 lg:grid-cols-[1fr_0.5fr] lg:gap-16`. At 1440px that resolves to a 768px prose column and a 384px aside, with a 64px gutter.
- The prose column holds the whole biography. The aside holds one portrait card and one button.
- At 390px the grid collapses to a single column, prose first, portrait below.

## Typography

- h1 "About me" in Anton at 44px. Notably smaller than the homepage h1 at 88px and the portfolio h1 at 48px. Interior utility pages step the display face down.
- Lead paragraph at 20px, ink soft, 1.625 line height. One paragraph only.
- Body paragraphs at 16px, ink soft, with roughly 24px between them.
- Inline links are accent coloured with a visible underline. This is the only place on the site where accent is used for body text links.
- Portrait caption sets the name in Anton uppercase at around 18px and the role in italic Inter ash.

Everything else follows the shared scale in `jay-home.md`.

## Components

**Portrait card.** A 2px ink border around the photo with a hard offset shadow in accent behind it, offset down and right. A caption bar sits inside the bottom of the frame on paper, holding the name at left in the display face and the role at right in italic ash. The photo fills the frame at a roughly 4:5 ratio.

**Aside CTA.** A full width ink button directly under the card, 16px 600 paper text with a trailing arrow. Same lift and arrow slide as every other button.

No cards, no grid, no form on this page. The newsletter is reached by the button, not embedded.

## Colour

Shared tokens. The only page specific note is that the portrait shadow uses the accent rather than ink, which is the one place accent is used as a large flat area outside a button.

## Motion

Shared. The prose column is wrapped in `.reveal`.

## Copy patterns

This is the clearest copy formula on the site and the one our manifesto and work pages should borrow.

- h1 is the plainest possible label, two words, no full stop.
- The lead paragraph states the role in one sentence, then names the newsletter and what it is about in a second clause of the same sentence.
- The body is a chronological ladder of proof. Each paragraph opens with an age or a year, states one concrete thing that happened, and names a real number or a real person. Roughly: at 16, at 17, at 18, at 19, these days.
- Every claim that can be linked is linked, and the link text is the artefact rather than the verb, for example the deck itself rather than "click here".
- Numbers are specific and never rounded for effect.
- The final paragraph is present tense and forward looking, one sentence about what he is doing now.
- A short postscript paragraph carries the newest announcement, so the page can be updated without a rewrite.
- No headings inside the body. The chronology does the structuring.

## Metadata

- Title: `About · Jay Yang`.
- Description is third person, names the roles, and closes with a phrase describing the story rather than repeating the roles.
- Own OG image route at `/about/opengraph-image`.
