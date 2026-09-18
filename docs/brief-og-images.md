# Design brief: social preview cards for franciscogost.com

## What this is for

Every time a link to franciscogost.com is posted on LinkedIn, X, WhatsApp or Slack, those platforms look for an Open Graph image: a 1200 x 630 card shown above the link. The site has none, so links currently render as a bare grey box with a URL. Francisco's entire funnel is LinkedIn to site, so this card is the first thing most visitors ever see of the brand.

You already designed the two lead magnet PDFs for this brand, "The first 30 days" and "The chief of staff DM". These cards should read as siblings of those documents. Same face, same restraint, same paper.

## Who Francisco is

Francisco Gost, 23, chief of staff at RallyUp, a LinkedIn content agency. He got the role by sending one cold message. He writes a weekly email called The Draft and sells a one hour LinkedIn and career workshop. The positioning line is "I turn overlooked people into hires."

The register is calm, editorial and plain spoken. Not a SaaS landing page, not hype. Think a well set broadsheet, not a startup pitch.

## Hard technical constraint, please read this before designing

These cards are generated in code by Next.js `ImageResponse`, which uses Satori. Satori supports only a subset of CSS. If the design depends on anything outside that subset it cannot be built. Specifically:

- **Flexbox only.** No CSS grid, no float, no absolute positioning tricks beyond simple `position: absolute` with explicit offsets.
- **No CSS filters, blend modes, masks or clip paths.**
- **Gradients:** linear and radial only, no conic.
- **Fonts:** must be a real font file we can load. Anton, Inter and JetBrains Mono are all available. No variable font axes, no synthetic bold or italic. Anton has a single weight, 400.
- **No SVG filters, no `backdrop-filter`, no `box-shadow` on text.**
- **Borders and border radius are fine.** Solid strokes, hairlines, rules: all fine.
- **Images** must be raster and embeddable. Prefer none, or one small logo.

Simple, flat, typographic layouts work perfectly. Anything that leans on effects will not.

## Brand tokens, use these exact values

| Token | Hex | Use |
| --- | --- | --- |
| Paper | `#fdf6ec` | Card background |
| Paper dim | `#f4e9d9` | Secondary panels, rules |
| Ink | `#241c16` | Headlines, the dark band |
| Ink soft | `#4a4239` | Supporting sentences |
| Ash | `#6f6559` | Least prominent text |
| Accent | `#b4552b` | One element per card, never body text |
| Accent deep | `#9e441d` | Accent when it sits on paper dim, for contrast |

Typography:

- **Anton**, weight 400, uppercase, tight tracking. This is the display face, used for the big line.
- **Inter** for supporting sentences.
- **JetBrains Mono** uppercase with wide letter spacing for small labels, the kicker and the name rail.

Contrast note: accent `#b4552b` on paper is 4.58:1, which passes AA for large text only. Never use it for small text. On paper dim it drops to 4.09:1 and fails, so use accent deep there.

## Canvas

1200 x 630 px. Keep everything meaningful inside an 80px margin on all sides. Some clients crop to roughly 1200 x 600, and LinkedIn renders it as small as 400px wide in feed, so the big line has to survive being a third of its size. Test your design by shrinking it and checking the headline is still readable.

## The three variants

### Variant A, site default

Used for the homepage and as the fallback for any page without its own card.

- Kicker, mono: `FRANCISCO GOST`
- Big line, Anton: `I TURN OVERLOOKED PEOPLE INTO HIRES`
- Supporting line, Inter: `Chief of staff at RallyUp. I write The Draft, a weekly email on careers, marketing and building an income online.`
- Foot rail, mono: `FRANCISCOGOST.COM`

### Variant B, resource card

Used for the gated lead magnet pages. The text is passed in from a content file, so design this as a **template** with two swappable strings. Two examples that must both work without the layout breaking:

| | Example 1 | Example 2 |
| --- | --- | --- |
| Kicker, mono | `100K IMPRESSIONS · 2 WEEKS` | `THE $100K ROLE · AGE 23` |
| Big line, Anton | `THE FIRST 30 DAYS` | `THE CHIEF OF STAFF DM` |
| Supporting line, Inter | `The system I used to reach 100,000 impressions on LinkedIn in my first two weeks.` | `The cold DM that landed me a $100k+ chief of staff role and equity at 23.` |
| Badge, mono | `FREE PDF` | `FREE PDF` |

The big line ranges from roughly 14 to 25 characters. Show me how the template handles both ends. If it needs two type sizes with a threshold, say where the threshold is.

### Variant C, standard page

Used for About, Portfolio and Work with me.

- Kicker, mono: `FRANCISCO GOST`
- Big line, Anton: the page name, for example `WORK WITH ME`, `ABOUT`, `PORTFOLIO`
- Supporting line, Inter: one sentence, for example `A one hour LinkedIn and career workshop. Leave with a positioning line, a rewritten profile and a 90-day plan.`

## What I need back

1. **A rendered 1200 x 630 PNG for each variant**, four images in total: A, B example 1, B example 2, C. These are for review, not for shipping.
2. **A written spec precise enough to rebuild from**, because I implement these as code. For every element: font family, font size in px, line height, letter spacing, colour hex, and its x and y position or its flex rules. Include the exact padding and gap values. If a rule or band is used, give its thickness and position.
3. **The rule for long versus short headlines** in variant B: at what character count does the type size step down, and to what.

Do not hand back HTML or CSS unless it is Satori safe as described above. A clear spec plus the PNGs is more useful than code I have to unpick.

## House rules, these are absolute

- **No em dashes.** Anywhere. Use a comma, a full stop or a colon.
- **Sentence case** in supporting sentences. The Anton display lines are uppercase by design, which is fine. Never all lowercase.
- **Banned words:** unlock, empower, elevate, solutions, leverage. Do not use them, including in your own notes.
- Light background only. There is no dark mode anywhere in this brand.
- Keep the accent colour to one element per card. Restraint is the whole look.
