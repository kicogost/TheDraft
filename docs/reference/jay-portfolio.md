# Jay Yang, portfolio

Source: https://jayyanginspires.com/portfolio
Captured: 2026-09-17, 1440x900 and 390x844.
Screenshots: `screenshots/portfolio-1440.png`, `screenshots/portfolio-390.png`.

Shared chrome is documented in `jay-home.md`. This is the page our `/projects` and `/work` grids should be measured against.

## Layout

Three sections, page height 1662px.

| # | Section | Container | Vertical padding | Background |
|---|---------|-----------|------------------|------------|
| 1 | Page header | `max-w-7xl` | `pb-8 sm:pb-10` (40px) | paper, graph paper grid |
| 2 | Card grid | `max-w-7xl` | `pb-20 sm:pb-28` (112px) | paper, graph paper grid |
| 3 | Closing CTA | `max-w-3xl` (768px), centred | `py-14 sm:py-16` (64px) | paper dim, 2px ink top rule, 80px graph paper grid |

- The header and the grid are two sections but read as one because neither has a top padding and the background is continuous. The header pays only 40px into the grid below it.
- Grid: `grid gap-4 sm:grid-cols-2 lg:grid-cols-3`. Three columns of 394px with a 16px gutter at 1440px, two columns from `sm`, one column at 390px.
- The gutter is deliberately tight at 16px, which is what makes a set of bordered cards read as a single block rather than as floating tiles.
- A small disclosure paragraph sits under the grid in ash.
- The closing CTA drops to the narrow 768px container and centres, with a small accent sunburst above the button.

## Typography

- h1 at 48px Anton uppercase, two lines, ending in a full stop.
- Lead paragraph at 16px ink soft, roughly 620px measure, two lines.
- Card title h2 at 24.8px Anton uppercase.
- Card category label at the 10.4px micro label step, uppercase, ash.
- Card role label at the same micro step but in accent, with the year following after a middle dot in ash.
- Card description at 16px ink soft, clamped to two lines with an ellipsis.
- Promo line at 14px, with the code itself in accent.
- Disclosure paragraph at 14px ash.

## Components

**Portfolio card.** `border-2 border-ink`, zero radius, roughly 24px internal padding. Structure top to bottom:

1. Header row: a 40x40 bordered logo tile at left, and at right the relationship in accent micro caps plus a middle dot plus the year in ash.
2. Company name in Anton uppercase.
3. Category in ash micro caps.
4. Two line description in ink soft.
5. An optional dashed hairline rule, then a promo code line.
6. A "Visit" action link with a trailing arrow, pinned to the bottom so all cards in a row align.

The whole card is an anchor. On hover the card gains the hard offset ink shadow and shifts, the same lift language as the book cards on the homepage.

**Closing CTA band.** Centred, on paper dim, with the 80px graph paper variant rather than the 64px one. A small accent sunburst mark, then a single accent button with an arrow. No heading.

## Colour

Shared tokens. The accent does three jobs on this page: the relationship label, the promo code, and the CTA button fill. The year, the category and the disclosure all sit in ash, so the accent reads as "the thing that matters" in each card.

## Motion

Shared. The header block and the grid are each wrapped in `.reveal`. Card hover is the shadow lift.

## Copy patterns

- h1 is a first person belief statement rather than a description of the page, two lines, closed with a full stop. The page is called Portfolio in the nav but the h1 never says "portfolio".
- The lead is two sentences: what the involvement is, then a warm sentence about the companies.
- Every card description is one or two sentences, present tense, and describes what the company does for its customer rather than what the company is. Several use a familiar comparison to land the idea fast.
- Category labels are one or two words, uppercase, and read as a sector rather than a tagline.
- Relationship labels are a single word: investor, advisor.
- The disclosure is plain and slightly self deprecating, states the financial interest, says the opinions are not unbiased, and links to the full disclaimer.
- The closing CTA is an instruction rather than a question.

## Metadata

- Title: `Portfolio · Jay Yang`.
- Description lists the actual company names, which is a sensible pattern for a page whose value is the list.
- Own OG image route at `/portfolio/opengraph-image`.
