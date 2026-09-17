# Jay Yang, homepage

Source: https://jayyanginspires.com/
Captured: 2026-09-17, Chromium, 1440x900 and 390x844.
Screenshots: `screenshots/home-1440.png`, `screenshots/home-390.png`.

Jay's site is Next.js with Tailwind v4 and named design tokens, so the computed values below map almost one to one onto the stack in our brief. Tailwind class names are quoted where they were readable in the markup, with the computed pixel value beside them.

## Layout

Page height 3020px at 1440px wide. Every section is full bleed; a centred container holds the content. There is no page level gutter, sections touch edge to edge and are separated by a 2px ink rule.

Section order:

| # | Section | Container | Vertical padding | Background |
|---|---------|-----------|------------------|------------|
| 1 | Hero | `max-w-5xl` (1024px), `px-5 sm:px-8` | `pt-24 sm:pt-28 lg:pt-32` (128px), `pb-16 lg:pb-28` (112px) | paper plus graph paper grid |
| 2 | My books. | `max-w-7xl` (1280px) | `py-16 sm:py-20` (80px) | paper, 2px ink rule top and bottom, graph paper grid |
| 3 | My portfolio. | `max-w-7xl` (1280px) | `py-20 sm:py-28` (112px) | paper, no rules, no grid |
| 4 | The Spark. (newsletter, `id="newsletter"`) | `max-w-7xl` (1280px) | `py-20 sm:py-28` (112px) | paper dim, 2px ink rule top and bottom, graph paper grid |
| 5 | Closing CTA | `max-w-7xl` (1280px) | `py-24 sm:py-32` (128px) | ink |
| 6 | Footer | `max-w-7xl` (1280px) | `py-10` (40px) | ink |

Notes on the grid:

- Side padding is 20px below the `sm` breakpoint and 32px above it, on every container.
- The hero is the only section on a 1024px container. Everything else sits on 1280px. This makes the hero feel inset and gives the h1 a shorter measure.
- The hero is left aligned, not centred. Content starts at x=240 at 1440px wide.
- Books is a two column card grid. Portfolio is a six item logo row. Newsletter is two columns, copy left and form right, roughly 1fr and 512px.
- Closing CTA is left aligned with a decorative 480x480 sunburst bleeding off the right edge at very low contrast.
- At 390px everything collapses to one column in source order. The portfolio logo row becomes a two column grid. Footer link columns become two columns with the third wrapping below.

## Typography

Two families only. `--font-display` is Anton, `--font-sans` is Inter. There is no serif and no mono on this page, the mono token exists but is unused here.

| Role | Family | Size | Line height | Tracking | Case | Colour |
|------|--------|------|-------------|----------|------|--------|
| h1 | Anton | 88px | 86.24px (0.98) | 0.44px (0.005em) | uppercase | ink |
| h2 section | Anton | 80px | 78.4px (0.98) | 0.4px | uppercase | ink |
| h2 newsletter | Anton | 64px | 62.72px (0.98) | 0.32px | uppercase | ink |
| h3 card title | Anton | 30px | 30px (1.0) | 0.6px | uppercase | ink |
| Logo wordmark | Anton | 20px nav, 30px footer | 1.0 | 0.4px | uppercase | ink or paper |
| Hero lead | Inter 400 | 20px (`sm:text-xl`, 18px below) | 32.5px (1.625) | normal | sentence | ink soft |
| Body | Inter 400 | 16px | 26px (1.625) | normal | sentence | ink soft |
| Nav link | Inter 500 | 14px | 20px | normal | sentence | ink soft, ink on hover |
| Button large | Inter 600 | 18px | 28px | normal | sentence | paper |
| Button medium | Inter 600 | 16px | 24px | normal | sentence | paper |
| Inline action link | Inter 600 | 14px | 20px | normal | sentence | ink |
| Eyebrow label | Inter 600 | 12px | 16px | 2.4px (0.2em) | uppercase | ash |
| Micro label | Inter 600 | 10.4px | 15.6px | 1.872px (0.18em) | uppercase | ash |
| Badge | Inter 700 | 9.6px | 9.6px | 0.24px | uppercase | paper on accent |
| Footer tagline | Inter 400 italic | 18px | 1.625 | normal | sentence | paper at 60% |

Anton is a single weight face at 400. All of its size steps run at a 0.98 line height and a hair of positive tracking, which is what gives the headings their solid block look.

## Components

**Nav.** `position: fixed`, full width, `z-50`, transparent with a transparent bottom border that transitions on scroll over 300ms. Inner `max-w-7xl`, `px-5 py-3.5 sm:px-8`, so the bar is 65px tall. Left is a 36x36 ink tile holding a 12 spoke sunburst mark in paper, plus the wordmark in Anton. Right is a 24px gap row of items, hidden below `lg`. Two of the items are dropdowns.

**Nav dropdown.** Pure CSS, no JavaScript: a `group relative` wrapper, the panel is `invisible opacity-0` and becomes `visible opacity-100` on `group-hover` and `group-focus-within`, transitioning over 150ms. Panel is `w-80` for Books and `w-72` for Resources, centred under the trigger with `left-1/2 -translate-x-1/2`, offset by a 12px `pt-3` so the mouse can cross the gap. The panel itself is `border-2 border-ink bg-paper p-2` with a hard offset shadow `6px 6px 0 0 ink`. Items are `px-3 py-2.5`, and on hover the whole row inverts to an ink background with paper text. The chevron rotates 180 degrees on hover. See `screenshots/nav-dropdown-books.png` and `screenshots/nav-dropdown-resources.png`.

**Buttons.** Square, zero radius, no shadow at rest.

| Variant | Padding | Height | Fill | Text | Border |
|---------|---------|--------|------|------|--------|
| Nav CTA | 8px 16px | 36px | accent | paper 14px 600 | none |
| Primary large | 16px 32px | 60px | accent | paper 18px 600 | none |
| Form submit inline | 12px 24px | 52px | accent | paper 16px 600 | 2px accent |
| Form submit block | 16px 24px | 56px | ink | paper 16px 600 | none |
| Secondary | 10px 20px | 44px | transparent | ink 14px 600 | 2px ink |

Primary actions carry a trailing arrow as a separate `<span aria-hidden="true">` so it can animate on its own. On hover the button lifts 2px (`hover:-translate-y-0.5`) and the arrow slides 4px right (`group-hover:translate-x-1`).

**Cards.** `border-2 border-ink bg-paper p-6`, zero radius, no shadow at rest. The featured card carries a hard offset shadow in ink. Internal order is badge, then Anton title, then a 16px description, then a "Read more" action link with an arrow. Height 209px on the homepage.

**Logo strip.** Six items in a row. Each is a 48x48 tile with a 2px ink border holding the company mark, then the company name in Anton 18px uppercase, then the relationship in the 10.4px micro label. Centred under the tile. The strip closes with a "See the portfolio" action link.

**Newsletter form.** `max-w-lg` (512px). `flex flex-col gap-3 sm:flex-row`, so it stacks on mobile and sits inline on desktop. The input is `w-full border-2 border-ink bg-paper px-4 py-3`, 52px tall, zero radius, placeholder in ash, focus is `focus:ring-2 focus:ring-ember` with `outline-none`. The label is present but `sr-only`. The submit is the inline accent variant. A 14px ash reassurance line sits 12px under the form.

**Footer.** Ink background, paper text. `max-w-7xl px-5 py-10 sm:px-8`. A `flex-col md:flex-row md:justify-between` split: left is the 44x44 inverted logo tile, the wordmark in Anton 30px, and an italic tagline at `max-w-xs`, 18px, paper at 60%. Right is three link columns, `grid-cols-2` on mobile and a `flex gap-10` row from `sm`. Each column is a 12px uppercase label at 0.2em tracking in paper at 55%, then links at 16px paper at 80% with a 10px gap. Below, a `mt-12 border-t border-paper/15 pt-6` bar holds the copyright at 14px paper at 55%.

## Colour

Tokens read straight off `:root`:

| Token | Value | Use |
|-------|-------|-----|
| `--color-paper` | `#f4efe5` | page background, text on ink |
| `--color-paper-dim` | `#e9e1d2` | alternating section background |
| `--color-ink` | `#100e0c` | text, borders, dark sections, footer |
| `--color-ink-soft` | `#2a2622` | body copy, nav links at rest |
| `--color-ash` | `#6b645a` | labels, captions, reassurance lines |
| `--color-line` | `#100e0c17` | graph paper grid, 9% ink |
| `--color-ember` | `#0f63c4` | accent, despite the name it is blue |
| `--color-amber` | `#ffb02e` | rarely used, appears in small marks |

Contrast relationships that matter more than the hues: body copy is ink soft on paper, not full ink. Labels drop a further step to ash. Borders are full ink at 2px for components and 9% ink at 1px for the decorative grid. On ink sections the same ladder runs in reverse as paper, paper at 80%, paper at 55%.

The accent is used far more freely than our brief allows: primary button fills, badges, inline links, focus rings, and list numerals.

**Graph paper.** A custom utility, worth copying verbatim in spirit:

```css
.grid-paper, .grid-paper-lg {
  background-image:
    linear-gradient(to right, var(--color-line) 1px, transparent 1px),
    linear-gradient(to bottom, var(--color-line) 1px, transparent 1px);
}
.grid-paper { background-size: 64px 64px; }
.grid-paper-lg { background-size: 80px 80px; }
```

It is applied per section, not to the body, which is what creates the sense of separate sheets stacked down the page.

## Motion

Tailwind default transition is 150ms `cubic-bezier(.4,0,.2,1)`. Everything else is deliberate and small.

- Nav header background and border: 300ms colour transition on scroll.
- Nav dropdown: 150ms opacity and visibility. Chevron rotates 180 degrees.
- Logo mark: rotates 90 degrees over 500ms on hover of the logo group.
- Buttons: 2px upward translate on hover, arrow slides 4px right.
- Cards: the hard offset shadow appears on hover, reading as a lift.
- Links: a `link-sweep` underline that grows from the right edge on the way in.

```css
.link-sweep { position: relative; }
.link-sweep:after {
  content: ""; position: absolute; bottom: -2px; left: 0;
  width: 100%; height: 2px; background: currentColor;
  transform: scaleX(0); transform-origin: 100%;
  transition: transform .35s cubic-bezier(.16,1,.3,1);
}
.link-sweep:hover:after { transform: scaleX(1); transform-origin: 0; }
```

- Scroll reveal: a `.reveal` class transitions opacity and transform over 700ms on `cubic-bezier(.16,1,.3,1)`.
- Reduced motion is respected properly. Under `prefers-reduced-motion: reduce` the reveal is forced to `opacity: 1; transform: none; transition: none`, the slow spin and marquee animations are cancelled, and `scroll-behavior` drops to `auto`. This is the pattern our `AsciiHero` should follow.

## Copy patterns

- Section headings are a possessive claim closed with a full stop: "My books.", "My portfolio.", "The Spark." Two or three words. The full stop is doing the work, it makes the heading a statement rather than a label.
- The h1 is a first person claim in the present tense, about five words, no full stop, broken over two lines.
- Under every h1 sits exactly one supporting sentence pair at 20px, never more.
- Eyebrow labels above a heading are uppercase, three words at most, and state the offer plainly rather than teasing it.
- The newsletter pitch is one sentence describing what arrives and how often, then a social proof sentence fragment with the reader count set in bold inside the same paragraph.
- The reassurance line under the form is one short sentence, first person, a little warm, and it names the unsubscribe explicitly.
- Action links are two or three words plus an arrow: "Read more", "See the portfolio".
- Company and person names are set in the display face, uppercase, with the relationship as a tiny label underneath.
- The closing CTA is a question addressed to the reader, one line, with a single button.
- Everything is first person singular throughout. There is no "we" outside the cookie notice.

Jay's actual sentences are recorded here only so the shape is legible. None of them may be reused. Every line on our site gets written from the pattern with Francisco's facts.

## Metadata

- Title: `Jay Yang · I scale brands with written media`. Pattern is name, then a middle dot, then the positioning line. Interior pages invert it to `Page · Jay Yang`.
- Description is third person, names the person, and closes with a concrete number.
- `og:title` and `og:description` duplicate the page title and description exactly.
- `og:image` points at a dynamic Next.js route, `/opengraph-image?<hash>`, and interior pages have their own at `<route>/opengraph-image`.
- `twitter:card` is `summary_large_image`.
- Canonical is set on every page. `lang="en"`.
