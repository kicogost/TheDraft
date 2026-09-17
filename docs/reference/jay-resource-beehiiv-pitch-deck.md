# Jay Yang, resource page, beehiiv pitch deck

Source: https://jayyanginspires.com/resources/beehiiv-pitch-deck
Captured: 2026-09-17, 1440x900 and 390x844.
Screenshots: `screenshots/resource-beehiiv-1440.png`, `screenshots/resource-beehiiv-390.png`.

This is the most important page in the study. It is the template our `/resources/[slug]` route copies. Shared chrome is in `jay-home.md`.

## Layout

One section, page height 1790px. No alternating backgrounds, no dark band before the footer, no closing CTA. The graph paper grid runs the whole page.

- Outer container: `max-w-6xl px-5 pb-24 sm:px-8 sm:pb-32`. Note 1152px, narrower than the 1280px used everywhere else, and 128px of bottom padding.
- Main grid: `grid gap-x-10 gap-y-12 lg:grid-cols-[1fr_22rem] lg:gap-x-14 xl:grid-cols-[1fr_24rem]`. At 1440px that resolves to a 648px story column and a 384px aside, with a 56px gutter.
- The aside is the form. It sits at the top of the right column, level with the h1, so it is above the fold without any sticky behaviour.
- Below the grid, a full width hairline rule, then the "more resources" block.
- At 390px the grid collapses to one column. The order is h1, description, form card, then the story, so the form stays above the fold on mobile too.

Vertical order in the story column: h1, one line description, lead paragraph, body paragraphs, numbered list, closing paragraph, the "drop your email" line.

## Typography

- h1 at 76px Anton uppercase. One line at 1440px. Slightly smaller than the 88px homepage h1.
- Description directly under the h1 at 20px ink soft, two lines, roughly 560px measure.
- Lead paragraph at 20px, ink, heavier presence than the body. It is the hook sentence.
- Body paragraphs at 16px ink soft, 1.625 line height, roughly 650px measure, about 24px apart.
- Numbered list items at 16px, with the numeral in Anton or Inter bold at around 18px in accent.
- Form card header at roughly 26px Anton uppercase in paper on ink, three lines.
- Form eyebrow at the 12px uppercase label step, ash, with a small emoji at the end.
- "More pitch decks" label at the same 12px uppercase step, ash.
- Related card kicker at the 12px uppercase step, ash. Related card title in Anton at around 22px.

## Components

**Resource form card.** The signature component of the page.

- Outer frame: `border-2 border-ink`, zero radius, with a hard offset shadow in accent, roughly 10px down and right.
- Header block: ink background, paper text, Anton uppercase, three short lines. It carries a claim about the company or the outcome rather than a form instruction.
- Body block: paper background, roughly 24px padding.
- Eyebrow line: uppercase 12px ash, in this case an instruction to hand over the email, closed with a small pointing emoji.
- Input: `w-full border-2 border-ink bg-paper px-4 py-3.5`, 56px tall, zero radius, placeholder `you@email.com` in ash, `aria-label="Email address"`, `autocomplete="email"`, `required`, focus is `focus:ring-2 focus:ring-ember` with `focus:outline-none`.
- Submit: `mt-3 flex w-full items-center justify-center gap-2.5 bg-ink px-6 py-4 text-base font-semibold text-paper`, 56px tall, full width, with a trailing arrow span. Note the button is ink here, not accent, because the accent is already spent on the card shadow.
- Hover: 2px lift on the button, 4px arrow slide.
- Disabled state: `disabled:opacity-60`.
- There is no `action` attribute. The form posts through JavaScript.

**Numbered list.** A left hairline rule in accent at low alpha, items indented off it, each numeral set in accent as a zero padded two digit figure. This is a nice, cheap way to make a two item list feel like a framework.

**Related resources block.** A full width hairline ink rule, then a 12px uppercase ash label, then a two column `grid` of cards with a 16px gutter. Each card is `border-2 border-ink`, roughly 20px padding, and holds a kicker label in ash micro caps, the resource title in Anton uppercase, and a trailing arrow pushed to the right edge. The current resource is excluded from the list.

## Colour

Shared tokens. Distribution on this page: ink for the form card header and the submit button, accent for the card shadow, the list numerals and the list rule, ash for every label and the description, ink soft for the body.

## Motion

Shared. The story column and the related block are each wrapped in `.reveal`. No sticky positioning and no scroll driven behaviour on the form.

## Copy patterns

This is a formula and it holds across both resource pages. Recording it as steps:

1. **h1** is the plain name of the asset, two or three words, no full stop, no adjectives.
2. **Description**, one sentence, sets up the artefact and the outcome in the same breath. It names what the thing literally is, then what it achieved. It always contains a concrete detail: an age, a company, a number.
3. **Lead paragraph**, one sentence, first person, states the outcome as a bare fact.
4. **The turn.** A short paragraph that raises the obvious question the reader has, then answers it with modesty. In this case the question is how, and the answer credits luck.
5. **The correction.** The next paragraph takes the modesty back and states the real, teachable mechanism.
6. **The numbered reasons.** Two items, each one short sentence, each starting with the same three words so they scan as a pair.
7. **The proof.** One sentence that applies the same method to a second, larger outcome, with a number in it.
8. **The ask.** A paragraph that opens with the instruction to drop the email below, then restates in full what will arrive. This paragraph repeats the description almost word for word, deliberately, because it is the last thing read before the form.

Other notes:

- First person throughout, present and past tense, no second person except in the numbered reasons and the ask.
- Real names are used and linked where relevant.
- Sentences are short. The longest is about 35 words, most are under 20.
- The form eyebrow is an instruction, not a label, and it is friendly.
- Related cards are labelled with the stake and the age rather than the topic, which turns a list of downloads into a chronology.

Jay's sentences are summarised here so the shape is legible. None of them may be reused.

## Metadata

- Title: `beehiiv Pitch Deck · Jay Yang`. The resource name, not the slug, keeping the brand's own capitalisation.
- Description is the same single sentence used as the on page description, reused verbatim. Good, that is one field in frontmatter doing two jobs.
- Own OG image route at `/resources/<slug>/opengraph-image`.
