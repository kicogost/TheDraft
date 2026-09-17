# Reference summary: what we replicate, what we swap

Phase 0 deliverable. Seven pages of https://jayyanginspires.com studied at 1440px and 390px on 2026-09-17. Per page specs sit beside this file. Screenshots are in `screenshots/`.

Every later phase cites this file when making a layout decision. The rule from the brief holds: **when in doubt, match Jay's measurement and change the styling.**

## The finding that shapes everything

Jay's site is Next.js with Tailwind v4 and a small set of named CSS custom properties on `:root`. It is the same stack our brief specifies, built the same way. That means the study did not have to infer the system, it could read it. Every number below is a computed value, not an estimate.

## Replicate exactly

**Structure.** Full bleed sections, each with its own background, separated by 2px ink rules rather than by whitespace. A centred container inside every section. Sections alternate between a wide container and a narrow one, and between three background values. No page level gutter and no floating cards on a neutral field.

**The container system.**

| Container | Width | Used for |
|-----------|-------|----------|
| Wide | 1280px | section content, card grids, logo strips, footer |
| Hero | 1024px | homepage hero only, which is what makes it feel inset |
| Article | 1152px | resource pages, story column plus form aside |
| Prose | 768px | long form body, legal pages, centred CTAs |
| Form | 512px | the newsletter form itself |

Side padding is 20px below `sm` and 32px above it, on every container, without exception.

**The vertical rhythm.**

| Step | Desktop | Mobile | Where |
|------|---------|--------|-------|
| Standard section | 112px | 80px | most sections |
| Tight section | 80px | 64px | dense card sections |
| Generous section | 128px | 96px | hero top, closing CTA |
| Band section | 64px | 56px | small centred CTA strips |
| Footer | 40px | 40px | footer only |

**The background rhythm.** paper, then paper dim, then ink, cycled so that no two dark bands touch and every dark band is separated from the next by at least two light sections. The graph paper grid is applied per section, never to the body, which is what makes the page read as stacked sheets.

**Component behaviour.** These are behaviour contracts, not styling:

- Nav is fixed, transparent at rest, and transitions its background and bottom border over 300ms on scroll.
- Nav dropdowns are pure CSS on `group-hover` and `group-focus-within`, with a padded gap so the pointer can cross into the panel. No JavaScript, and they are keyboard reachable.
- Primary actions carry a trailing arrow in its own `aria-hidden` span so it can animate independently.
- Buttons lift 2px on hover, the arrow slides 4px right.
- Cards gain a hard offset shadow on hover.
- Links use a sweep underline that grows from the far edge over 350ms.
- Scroll reveal runs 700ms on `cubic-bezier(.16,1,.3,1)` and is fully cancelled under `prefers-reduced-motion: reduce`, alongside `scroll-behavior: auto`.
- The email input is full width with a 2px border, zero shadow, and a two ring focus state in the accent. Its label exists and is `sr-only`.
- The form stacks on mobile and goes inline from `sm`.
- The reassurance line sits under the button, never above it.

**Copy formulas.** These transfer directly, with Francisco's facts written into them:

- Section heading: two or three words, closed with a full stop. "My books." "My portfolio."
- h1: a first person claim in the present tense, about five words, no full stop, broken over two lines.
- Exactly one supporting sentence pair under every h1, never more.
- Eyebrow label above a heading: uppercase, three words at most, states the offer plainly.
- Newsletter pitch: one sentence on what arrives and how often, then a proof fragment with the number set in bold inside the same paragraph.
- Reassurance line: one short first person sentence that names the unsubscribe.
- Action link: two or three words plus an arrow.
- About page: a chronological ladder, each paragraph opening with an age or a year, each carrying one concrete number or named person, no subheadings.
- Resource page, the eight beat formula recorded in `jay-resource-beehiiv-pitch-deck.md`: name the artefact, describe it in one sentence, state the outcome, raise the obvious question, correct it with the real mechanism, give two numbered reasons, prove it with a second larger outcome, then ask for the email and restate what arrives.
- Related resources are labelled by stake and date rather than by topic, which turns a list of downloads into a chronology.
- Legal pages: numbered noun phrase headings, each section opening with a plain sentence saying what it covers.

**Metadata.** `Page · Name` titles, descriptions in the third person that close on a concrete number, dynamic OG image routes per page with legal pages falling back to the site wide one, `summary_large_image`, canonical on every page.

## Swap

| Layer | Jay | Ours |
|-------|-----|------|
| Name, story, facts, photos, logos | His | Francisco's |
| Every sentence | His | Rewritten from the pattern, never pasted |
| Display face | Anton, uppercase, single weight | Instrument Serif, sentence case, Georgia fallback |
| Body face | Inter | Inter, kept |
| Mono | Declared but unused | JetBrains Mono, used for the ASCII hero and small labels |
| Accent hue | Blue `#0f63c4` | Burnt orange |
| Accent usage | Liberal: button fills, badges, body links, numerals | Sparing: focus rings, one arrow, marks, hover |
| Primary button fill | Accent | Ink with paper text |
| Corner radius | 0 everywhere | Pill, 999px |
| Component borders | 2px ink, hard offset shadows | Hairline rules, border darkens to ink on hover |
| Hero | Type only | ASCII portrait plus type |
| Information architecture | Books, portfolio, resources | Manifesto, work, projects, writing, resources |
| Newsletter | The Spark | The Draft |

The two that need care:

**Display face weight.** Anton at 88px is a solid black block. Instrument Serif at 88px is far lighter and will not hold the same corner of the page. Keep Jay's measurements for size and line height, then compensate with the measure: set our h1 on a shorter line so it still forms a mass. Expect to test 1.0 line height rather than the 0.98 Anton uses, since a serif needs slightly more room.

**Corner radius.** Jay's zero radius plus 2px borders plus hard offset shadows is a single coherent idea. Pills plus hairlines plus a border colour shift is a different but equally coherent one. What must not happen is half of each. If we go pill, every radius in the system is a pill or a hairline rectangle, and the hard offset shadow does not appear anywhere.

## Token map

Jay's tokens on the left, the brief's on the right, with two additions the study says we need.

| Jay | Value | Ours | Value | Note |
|-----|-------|------|-------|------|
| `--color-paper` | `#f4efe5` | `--bg` | `#f5f1e8` | near identical already |
| `--color-paper-dim` | `#e9e1d2` | `--bg-dim` | `#ece5d6` | **new**, replaces the brief's lighter second background |
| `--color-ink` | `#100e0c` | `--ink` | `#16130f` | |
| `--color-ink-soft` | `#2a2622` | `--ink-soft` | `#2f2a24` | **new.** See below |
| `--color-ash` | `#6b645a` | `--ink-muted` | `#6b655c` | already in the brief |
| `--color-line` | `#100e0c17` | `--rule` | `#16130f17` | switch to alpha. See below |
| `--color-ember` | `#0f63c4` | `--accent` | `#b8461f` | hue swap |

Three changes to the brief's token set that the study argues for:

1. **A dim background that goes darker, not lighter.** The brief's second background token is `#fbf9f4`, which is lighter than the page. Jay's alternating band is *darker* than the page. The whole section rhythm depends on the alternate band receding rather than lifting. Recommend dropping that token and adding `--bg-dim: #ece5d6` in its place. Its name in the brief also happens to contain a banned word, so it has to change either way.
2. **A second text colour.** The brief has ink and ink muted with nothing between. Jay runs a three step ladder: ink for headings, ink soft for body, ash for labels. Body copy set in full ink on a warm paper is heavier than it looks in a mock. Recommend adding `--ink-soft: #2f2a24` and setting body copy in it.
3. **Rules as alpha, not as a solid.** The brief's `--rule: #e3dccd` is a fixed colour that will look wrong on the dim band and cannot be used on ink. Ink at 9% composites correctly over paper, over dim, and inverts as paper at 15% on ink sections.

**Accent contrast, measured.** Against our paper at `#f5f1e8`, `#b8461f` gives 4.74:1, which clears AA for normal text by a hair. Against the dim band at `#ece5d6` it gives 4.26:1, which **fails** AA. Two ways out, Francisco's call at phase 1:

- Keep `#b8461f` for fills and marks only, and never set body sized text in it. Inline links become ink with an underline.
- Or darken slightly to `#a83e1a`, which gives 5.53:1 on paper and 4.97:1 on dim, passes everywhere, and is visually almost the same burnt orange.

For reference, ink on paper is 16.43:1 and ink soft on paper is 12.61:1, both comfortable.

## Conflicts between the brief and the measurements

Flagged for review. In each case the brief's own tie breaker says to take Jay's number.

| Item | Brief says | Measured | Recommendation |
|------|-----------|----------|----------------|
| Section spacing | 96px desktop, 64px mobile | 112px and 80px | Take 112 and 80, with 80 and 64 as the tight step |
| Prose width | 720px | 768px | Take 768px |
| Grid width | 1040px | 1280px | Take 1280px. 1040px cannot hold a three column card grid at the measured 16px gutter |
| Body size | 17px desktop, 16px mobile | 16px body, 20px leads | Take 16px body and add a 20px lead step. A single 17px size loses the lead |
| Accent use | Sparing | Liberal | Keep the brief. It means primary buttons are ink, which matches Jay's own resource form button |
| Light only, no dark mode | Stated | Full ink sections on three pages | No conflict. These are dark sections in a light theme, not a dark theme. Recommend we keep them, they carry the rhythm |
| Resource form label | "Get it free, in your inbox" | Identical to Jay's live line | Rewrite it. The brief quoted him verbatim |

## Decisions locked at phase 1

Francisco reviewed the four open questions and delegated the first two. Recorded here because later phases cite this file.

1. **Square, not pill.** The brand logo is a hard edged square holding a sharp geometric envelope, and the newsletter thumbnail rules a straight accent bar under the wordmark. There is no curve in the brand. So the component language is zero radius throughout, hairline rules for structure, 2px borders for components, and a hard offset shadow in the accent for lift. This overrides the brief's `border-radius: 999px`.
2. **The palette comes from his own assets.** Accent `#b4552b` and paper `#fdf6ec` are sampled from the logo, ink `#241c16` and body `#4a4239` from the thumbnail. Measured: `#b4552b` on paper is 4.58:1, which scrapes AA, and 4.09:1 on the dim band, which fails. So the exact brand orange is kept for fills, marks and the logo, and `--color-accent-deep: #9e441d` (5.93:1 on paper, 5.31:1 on dim) carries any accent coloured text.
3. **Flat nav, no dropdown.** There are two resources, and the information architecture already puts five items in the bar. A hover dropdown for two links is not worth the interaction. `Nav` takes a flat list from `content/site.json`, and a dropdown can be added per item when the resource count justifies it.
4. **The homepage keeps the full ink closing band.** Confirmed. Dark sections in a light theme, not a dark theme.

Also applied, from the conflicts table above: 112px and 80px section spacing, 768px prose, 1280px grids, and a 16px body with a separate 20px lead step.

## Open questions for Francisco

1. Pills or squares. The brief says pill. Jay's entire component language is square with hard shadows. Either is fine, but it decides the character of the site and it should be decided before phase 1 builds `Button`.
2. Accent as `#b8461f` for fills only, or darken to `#a83e1a` and use it freely.
3. Jay's nav carries dropdowns for Books and Resources. Our IA has one group that could take a dropdown, Resources. Do we build the dropdown in phase 1 or ship a flat nav and add it when there are enough resources to need it.
4. The homepage closing CTA on Jay's site is a full ink band. Confirm we want a dark band on the homepage, given the light background rule.

## Note for the phase 6 copy lint

Match banned words on word boundaries, case insensitively. A naive substring grep flags `elevated` inside an identifier and will produce false failures. Lint `/content` and `/app` as the brief says, and add `/docs` once these reference files stop quoting the brief's own token names.
