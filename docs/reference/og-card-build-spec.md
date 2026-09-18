# Social preview cards, build spec

Delivered by Claude Design against docs/brief-og-images.md. Implemented in
app/opengraph-image.tsx and the per route variants. Keep this in sync if the
cards change.

Canvas 1200 x 630. Satori safe: flexbox only, solid fills, solid borders, no shadows, no filters, no images.

## Shared shell, all variants

| Property | Value |
| --- | --- |
| Size | 1200 x 630 |
| Background | `#fdf6ec` |
| Padding | 80px on all four sides |
| Content box | 1040 x 470 |
| Layout | `display:flex; flex-direction:column; justify-content:space-between` |
| Children | exactly three blocks: head, headline, foot |

## Type ramp

| Role | Family | Size | Line height | Letter spacing | Case | Colour |
| --- | --- | --- | --- | --- | --- | --- |
| Kicker | JetBrains Mono 400 | 20px | 26px | 4px | uppercase | `#6f6559` |
| Badge, variant B | JetBrains Mono 400 | 18px | 23px | 3.6px | uppercase | `#fdf6ec` |
| Headline | Anton 400 | see variant | see variant | 0.5px | uppercase | `#241c16` |
| Supporting | Inter 400 | 26px | 39px | 0 | sentence case | `#4a4239` |
| Foot rail | JetBrains Mono 400 | 18px | 23px | 3.6px | uppercase | `#6f6559` |

Supporting sentence takes `max-width: 880px`.

## Accent, one element per card

- Variants A and C: a rule, 72 x 6px, `#b4552b`, 30px under the kicker.
- Variant B: the badge, `#b4552b` background, `#fdf6ec` text, padding 11px / 18px, square corners. No accent rule.

## Foot rail

- `border-top: 2px solid #f4e9d9`, full 1040px width, 28px above the rule, 18px below.
- Variants A and C: `FRANCISCOGOST.COM`, left.
- Variant B: `FRANCISCOGOST.COM` left, `FRANCISCO GOST` right, space-between.

## Variant A, site default

Kicker `FRANCISCO GOST` plus accent rule. Headline Anton 96px / 90px, wraps to two lines by design.

## Variant B, resource template

Head is a row: kicker left, `FREE PDF` badge right.

| Headline length | Size | Line height |
| --- | --- | --- |
| 18 characters or fewer | 112px | 104px |
| 19 to 25 characters | 92px | 86px |

No `white-space: nowrap`. Cap resource titles at 25 characters in the content file.

## Variant C, standard page

Kicker `FRANCISCO GOST` plus accent rule. Headline Anton 132px / 122px, for one to
three short words. Beyond about 13 characters, step to the variant B ramp.

## Feed check

At 400px wide the headline renders at an effective 31 to 32px and holds. The kicker
and foot rail become decoration at that scale, which is why the headline carries the
whole message and the supporting sentence repeats nothing from it.
