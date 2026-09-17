# Jay Yang, resource page, Noah Kagan pitch deck

Source: https://jayyanginspires.com/resources/noah-kagan-pitch-deck
Captured: 2026-09-17, 1440x900 and 390x844.
Screenshots: `screenshots/resource-noah-kagan-1440.png`, `screenshots/resource-noah-kagan-390.png`.

Captured as the control for the beehiiv page. The full template is documented in `jay-resource-beehiiv-pitch-deck.md`. This file records only what changes between two instances of the same template, which tells us exactly what belongs in frontmatter.

## What is identical

Layout, container widths, grid columns, spacing, type scale, the form card, the numbered list treatment, the related block, the footer, and the whole copy formula. The two pages are the same component rendered twice.

## What changes per resource

| Field | beehiiv page | Noah Kagan page |
|-------|--------------|-----------------|
| h1 | Name of the deck | Name of the deck |
| Description | One sentence, artefact plus outcome | One sentence, artefact plus outcome |
| Form card header | A claim about the company | A claim about the effort, set as three short stats |
| Form eyebrow | Same instruction on both | Same instruction on both |
| Submit label | "Get the deck" | "Get the deck" |
| Story body | Its own narrative | Its own narrative |
| Related cards | The other two decks | The other two decks |
| Related kicker | The stake plus the age | The stake plus the age |

Two observations worth carrying into our schema:

- The form card header is per resource, not shared. On the beehiiv page it is a sentence about what the company does. On this page it is three fragments about the work that went in, each closed with a full stop, which reads as a stat line. So the field is free text in the display face, not a fixed string.
- The submit label and the eyebrow are constant across resources, so they belong in the component, not in frontmatter.

## Copy patterns specific to this page

- The lead paragraph opens by naming the two reasons the reader might be here, including the unflattering one. It is a disarming move and it appears only on this page.
- The narrative is a four beat story: the situation, the decision, the effort with a number attached, the result with a named outcome.
- The result sentence chains three proofs into one line: he got the role, the role had a title, the title produced a bestseller.
- The ask paragraph is shorter than on the beehiiv page, because the story already restated the artefact.

## Metadata

- Title: `Noah Kagan Pitch Deck · Jay Yang`.
- Description names the age, the amount and the person. It uses a dash to join the two clauses, which we replace with a comma or a full stop under our own copy rules.
- Shares an OG image hash with the beehiiv resource, so the resource OG images are generated from a single template with per resource text.
