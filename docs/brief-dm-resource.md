# Design brief: The chief of staff DM

A lead magnet for Francisco Gost's personal site. Rebuild of an existing PDF.
Everything below is the real brand, taken from the live site and the design
tokens in the codebase.

## 1. What this is

A free, email-gated PDF. Someone hands over their email address on
franciscogost.com and gets this. It is the single highest intent moment in the
funnel: they have paid with an address specifically to see this document, so it
has to feel like it was worth the trade within two seconds of opening.

**The artefact:** a real cold LinkedIn message Francisco sent at 23 to a
founder he had never met. The founder replied in thirty minutes. It became a
chief of staff role on $100k plus equity.

**The document:** that message reproduced exactly as sent, typos included, with
annotations explaining why each part works.

## 2. Who reads it

People a few years into a career who feel overlooked and want a better role.
Not founders, not marketers. They are competent and invisible, and they are
sceptical of career advice because most of it is written by people selling
something.

They are reading on a laptop, probably at work, probably in a hurry.

## 3. Voice and copy rules

Non-negotiable, and they apply to any text added or rewritten:

- **No em dashes anywhere.** Use a comma, a full stop or a colon.
- **Sentence case.** Uppercase is allowed as *styling* on display type, but the
  underlying copy stays sentence case.
- **Never use:** unlock, empower, elevate, solutions, leverage.
- First person singular. Short sentences. Around 17 words average.
- When a comma would work, use a full stop instead.
- Specific numbers, never rounded for effect. No hype. The material is
  persuasive because it is true, not because it is loud.

The register is dry, plain, slightly self deprecating. He is 23 and does not
pretend to be a guru.

## 4. Brand

### Colour

| Token | Hex | Use |
|-------|-----|-----|
| Paper | `#fdf6ec` | Page background. Warm, never white |
| Paper dim | `#f4e9d9` | Alternating bands, callout fills |
| Ink | `#241c16` | Headings, rules, dark fills. Warm near-black, never pure black |
| Ink soft | `#4a4239` | Body copy. Body is never full ink |
| Ash | `#6f6559` | Labels, captions, small print |
| Line | `#241c16` at 9% | Hairline rules and the graph paper grid |
| Accent | `#b4552b` | Burnt orange. Marks, fills, the logo tile |
| Accent deep | `#9e441d` | Accent at text size. See the contrast note below |

**Contrast, measured.** `#b4552b` on paper is 4.58:1, which scrapes AA, and
4.09:1 on the dim band, which fails. So the exact accent is for fills and marks
only. Any accent coloured text uses `#9e441d`, which is 5.93:1 on paper.

Ink on paper is 15.6:1. Ink soft on paper is 9.2:1.

### Type

- **Display:** Anton. A condensed caps face, single weight. Line height 0.98,
  letter spacing 0.005em, always uppercase. This is the loud voice.
- **Body:** Inter. 16px, line height 1.65, in ink soft.
- **Labels:** JetBrains Mono. Uppercase, 12px, letter spacing 0.2em, in ash.
  Used for eyebrows, dates, section kickers.

If a font is unavailable: Anton falls back to Arial Narrow, Inter to system
sans, JetBrains Mono to any mono.

### Visual system

The whole system is square and flat. There is not a rounded corner anywhere,
because the brand logo is a hard edged square holding a sharp geometric
envelope. Specifically:

- **Zero border radius.** Everywhere. Buttons, cards, images, callouts.
- **2px ink borders** on components. **1px hairlines** at 9% ink for structure.
- **Hard offset shadows** in the accent, roughly 10px down and right, no blur.
  This is the only shadow in the system. No soft drop shadows.
- **Graph paper texture:** 1px lines at 9% ink on a 64px grid, applied to
  sections, never to the whole page.
- Generous whitespace. Prose measure around 65 characters.

The overall feel is editorial and calm, with the display face providing the
only loudness. Nothing should look like a SaaS landing page.

### Logo

A square in accent orange holding an envelope mark in paper. The envelope is a
rectangle with a V notch cut from the top edge, apex at 49.9% across and 56.4%
down. As a path in a 470x331 box: `M0 0 L235 187 L470 0 L470 331 L0 331 Z`

## 5. The content

Four sections, in this order. The existing PDF is four pages.

**1. Before I sent it.** What he knew going in. He read the founder's last
twenty posts, not to flatter him but to learn how he talks, then wrote back in
the founder's own language. He also noticed what was missing beyond the obvious
gap, and pitched that too.

**2. The message.** The DM reproduced verbatim. Typos left in deliberately.
One line is highlighted: the one where he tells the founder he found him the
same way he would find the founder's future customers.

**3. Why each part is there.** Seven numbered annotations, each a bold claim
followed by an explanation. The important one: the message was not a claim
about outreach, it *was* outreach, arriving in the inbox while the reader read
the claim.

**4. What came back.** The reply, four words, thirty minutes later. Then what
turned a fractional arrangement into a full time role.

## 6. What the rebuild should improve

The current version is honest but plain. It reads like a well set document
rather than something made. Specifically:

- **The message itself should look like a message.** Right now it sits in a
  bordered box in body type. Francisco has real LinkedIn screenshots. The
  document should treat the thread as the hero artefact, not as a quotation.
- **The annotations should connect to the message visually.** Numbered notes
  that point at the lines they describe, rather than a list underneath.
- **The highlighted line needs to dominate.** It is the single idea the reader
  should leave with.
- **Page one should stop them.** It currently opens with a title and a
  standfirst. It could open with the reply, or the thirty minute timestamp, or
  the number.
- Page breaks currently leave large empty areas.

## 7. Constraints

- **A4 or US Letter, portrait.** Read on screen, occasionally printed.
- Must survive being viewed at phone width.
- It is a free lead magnet, not a brochure. Four to six pages. Longer is fine
  if every page earns itself, shorter is better than padded.
- Real names appear: the founder is Alec Kremins, the company is RallyUp. Both
  are cleared for use.
- The compensation is stated as "$100k plus equity" and should stay that way.
- Do not invent numbers, quotes or events. Everything factual in this document
  is real, and the only reason it works is that a reader can check it.

## 8. What Francisco is supplying

- The current PDF, for structure and copy
- Screenshots of the real LinkedIn thread, including the reply and timestamps

## 9. Where it ends up

Served from `franciscogost.com` behind a signed download route, and linked from
an automation email. So it travels on its own, away from the site, and has to
carry the brand by itself.
