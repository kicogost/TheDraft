# Jay Yang, book

Source: https://jayyanginspires.com/book
Captured: 2026-09-17, 1440x900 and 390x844.
Screenshots: `screenshots/book-1440.png`, `screenshots/book-390.png`.

The longest page on the site and the clearest demonstration of the section rhythm: how backgrounds alternate, where the dark band sits, and how a single page carries two separate calls to action. Shared chrome is in `jay-home.md`.

## Layout

Five sections plus the footer, page height 3732px.

| # | Section | Container | Vertical padding | Background |
|---|---------|-----------|------------------|------------|
| 1 | Hero, split | `max-w-7xl` | `pt-32` (128px), `pb-16 sm:pb-20` (80px) | paper, graph paper, 2px ink bottom rule |
| 2 | Quote and setup | `max-w-3xl` (768px) | `py-20 sm:py-28` (112px) | paper, graph paper |
| 3 | They didn't wait. | `max-w-7xl` | `py-20 sm:py-28` (112px) | ink |
| 4 | Read it free. | `max-w-7xl` | `py-20 sm:py-28` (112px) | paper dim, 80px graph paper, 2px ink rules top and bottom |
| 5 | Closing CTA, centred | `max-w-3xl` (768px) | `py-20 sm:py-28` (112px) | paper, graph paper |

The rhythm is worth stating plainly, because it is the thing to copy: **paper, paper narrow, ink, paper dim, paper narrow centred, ink footer.** Wide sections alternate with narrow ones, and the two dark bands are separated by two light sections so neither feels like a theme change.

- Hero: `grid items-center gap-12 lg:grid-cols-2`, two 584px columns with a 48px gutter. Copy left, product image right.
- Section 3 splits into three columns divided by vertical hairlines rather than gaps, so the columns read as one ruled table.
- Section 4: `grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]`, a 467px image column and a 700px copy column.
- Section 5 is centred on the narrow container, which is the only centred text on the page besides the quote.
- At 390px every grid stacks. The hero image drops below the copy.

## Typography

- h1 at 112px Anton uppercase, the largest type on the site, two lines, closed with a full stop.
- h2 at 72px Anton uppercase for the two big section headings, both closed with a full stop.
- h3 at 30px Anton uppercase for the three names in the dark band.
- Hero sub at 18px ink soft over three lines, on a deliberately short measure of roughly 330px so it forms a block under the h1.
- Hero credential line at the 12px uppercase label step, with the parts joined by a middle dot.
- Quote at roughly 26px, sentence case, in quotation marks, not in the display face. It is set in Inter, which is what stops it competing with the headings.
- Body at 16px ink soft.
- One body paragraph per section is set in bold at the same size, used as a turn in the argument rather than as a heading.
- An italic lead opens section 4.
- Small print under each button at 14px ash.

## Components

**Split hero.** Copy column holds h1, sub paragraph, credential line, a two button row, then a small print line. The image column holds the product shot with two pages fanned behind it at a slight rotation.

**Button pair.** Primary is ink filled with paper text and a trailing arrow. Secondary sits beside it as a 2px ink outline on transparent with ink text and no arrow. This is the only two button row on the site and it is the model for our closing CTA.

**Three column proof band.** On ink. A section heading, then three columns separated by 1px vertical rules in paper at low alpha. Each column is a small accent sunburst mark, a name in Anton uppercase, then two or three sentences at 14px in paper at around 80%. No cards, no borders, just the rules.

**Offer block.** Image left, copy right. Italic lead, body, a signature line that pairs a small accent sunburst with an italic attribution, then an ink button, then a 14px ash line that discloses exactly what signing up also does. That disclosure sitting under the button rather than above it is a pattern worth keeping.

**Centred closing CTA.** A small accent sunburst, a three line h2 at 72px, an accent button, then a plain underlined text link as the secondary action. The secondary action is a link, not a second button, which keeps the hierarchy obvious.

## Colour

Shared tokens. The dark band inverts the whole ladder: paper for headings, paper at 80% for body, paper at low alpha for the rules. The accent appears only three times on a 3732px page: the sunburst marks, the final button, and the "Get the free PDF" affordance. Everything else is ink, ink soft and ash. This is much closer to the sparing accent use our brief asks for than the homepage is.

## Motion

Shared. Sections are individually wrapped in `.reveal`. The product image is static.

## Copy patterns

- Both big h2s are three words or fewer and closed with a full stop.
- The h1 repeats the book title exactly, with a full stop added.
- The credential line stacks proof points separated by middle dots, uppercase, tiny. It carries the bestseller status and the foreword author.
- The quote is presented without attribution and is the thesis of the book in one line.
- The argument runs: here is the script everyone is handed, here is why it does not work, here is the correction in bold, here is my standing to say it.
- The proof band uses three well known names, and each entry is written to the same three part shape: they did not wait, here is what they did instead, here is what it produced.
- The free offer is justified with a personal reason before it is made, which is what stops it reading as a lead magnet.
- The small print under the button is honest and specific about the newsletter signup and the unsubscribe.
- The closing heading is an aphorism, not an instruction, and the button under it is the instruction.

## Metadata

- Title: `You Can Just Do Things · Jay Yang`.
- Description leads with the strongest proof, names the foreword author, and closes with the formats on offer.
- Own OG image route at `/book/opengraph-image`.
