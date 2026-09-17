# Personal site build brief

Owner: Francisco Gost Scagliarini. This file is the source of truth for Claude Code. Read it fully before touching code. Work through the phases in order and stop at the end of each phase for review.

## 1. What we are building

A personal website in the spirit of jayyanginspires.com: a warm, editorial, text-first site that positions Francisco for people who might hire him as an operator, mentor or coach, grows his newsletter, and gives away email-gated resources.

Primary reference: https://jayyanginspires.com/. The goal is a site that feels like a sibling of Jay's: same page structure, same layout rhythm, same component behaviour, same copy patterns, but with Francisco's palette, fonts, name, story, photos and logos. Someone who knows Jay's site should recognise the family resemblance; nobody should be able to say a single sentence, image or asset was lifted.

Secondary reference: jeremyro.com for the manifesto / work / projects / writing information architecture.

### Step zero, before any code: study Jay's site

Fetch and screenshot these pages at 1440px and 390px widths (use Playwright or the browser tool):
- `/` `/about` `/portfolio` `/resources/beehiiv-pitch-deck` `/resources/noah-kagan-pitch-deck` `/book` `/privacy`

For each page write a short spec into `/docs/reference/jay-<page>.md` covering:
- Layout: section order, grid, max widths, vertical spacing between sections, alignment
- Typography: exact font families (inspect computed styles), sizes, weights, line heights, letter spacing for h1, h2, body, labels, buttons, nav
- Components: nav (including the dropdowns for Books and Resources), buttons (shape, padding, arrow suffix), inputs, cards, logo strip, footer columns
- Colour: background, text, muted text, rules, accent, hover states (his palette is warm paper #f4efe5 with dark ink; we replace it with our own tokens in section 4 but keep the same contrast relationships)
- Motion: hover transitions, scroll behaviour, anything animated
- Copy patterns: how headings are phrased (short claim + full stop, e.g. "My books."), sentence length, where he uses lowercase labels, the newsletter pitch structure, the resource page formula (hook, story, numbered reasons, "drop your email below" line, "more resources" list), footer reassurance lines
- Metadata: title pattern, OG image layout, meta descriptions

Then produce `/docs/reference/summary.md`: a one-page map of what we replicate exactly (structure, spacing, component behaviour, copy formulas) versus what we swap (tokens, fonts, all copy, all imagery, all names). Every later phase should cite this summary when making layout decisions. When in doubt, match Jay's measurement and change the styling.

Hard rule: never paste his sentences. Rewrite every line from the pattern, with Francisco's facts.

Non-negotiables:
- Francisco must be able to edit every word and add resources without touching React. All content lives in `/content` as MDX or JSON.
- No em dashes anywhere: copy, code comments, commit messages, documentation. Use a comma, a full stop or a colon instead.
- Sentence case everywhere. Never all-lowercase headings.
- Banned words: unlock, empower, elevate, solutions, leverage.
- Light background only. No dark mode.
- Fast, accessible, no layout shift. Lighthouse 95+ on every page.

## 2. Stack

- Next.js 15, App Router, TypeScript, React Server Components by default
- Tailwind CSS v4 with design tokens in `globals.css`
- MDX via `@next/mdx` for long-form pages (manifesto, resource stories, writing)
- `next/image` for all images, `next/font` for fonts
- Deploy on Vercel. Environment variables in Vercel project settings, never in the repo.
- Email backend: beehiiv API v2, called only from a server route
- No CMS, no database, no auth. Keep it boring.

## 3. Repo layout

```
/app
  layout.tsx            root layout, nav, footer, fonts
  page.tsx              homepage
  /manifesto/page.mdx
  /work/page.tsx        CV, reads content/work.json
  /projects/page.tsx    reads content/projects.json
  /writing/page.tsx     links out to newsletter posts, reads content/writing.json
  /resources/page.tsx   index of all gated resources
  /resources/[slug]/page.tsx   gated resource page, reads content/resources/*.mdx
  /thank-you/page.tsx   post-signup confirmation
  /privacy/page.mdx  /terms/page.mdx
  /api/subscribe/route.ts      newsletter signup (POST)
  /api/resource/route.ts       gated resource signup (POST)
  opengraph-image.tsx          dynamic OG image
/components
  Nav.tsx  Footer.tsx  AsciiHero.tsx  NewsletterForm.tsx  ResourceForm.tsx
  Section.tsx  Prose.tsx  Button.tsx  Card.tsx
/content
  site.json             name, tagline, one-liner, social links, newsletter name ("The Draft") and URL
  work.json             CV entries
  projects.json         projects with repo links
  writing.json          newsletter issues worth featuring
  /resources/*.mdx      one file per gated resource (frontmatter + story)
/lib
  beehiiv.ts            typed client for the two API calls we make
  content.ts            loaders for /content
/public
  /images/headshot.jpg  /images/logos/*  favicon, apple-touch-icon
```

## 4. Design system

Direction: warm paper, dark ink, one accent. Editorial, calm, stoic. Lots of whitespace, generous line height, short measure for prose (max 65ch). Nothing that looks like a SaaS landing page.

Tokens (put in `globals.css` as CSS variables and expose to Tailwind):
- `--bg`: #f5f1e8 (warm off-white, not pure white)
- `--bg-elevated`: #fbf9f4
- `--ink`: #16130f
- `--ink-muted`: #6b655c
- `--rule`: #e3dccd (hairline borders)
- `--accent`: #b8461f (burnt orange, used sparingly: links on hover, one arrow, form focus ring)

Typography:
- Headings: a serif with character. First choice `Instrument Serif`, fallback `Georgia`. Large h1 (clamp 2.6rem to 4.5rem), tight letter spacing, normal weight, italic allowed for one word per heading at most.
- Body and UI: `Inter`, 17px base on desktop, 16px mobile, line height 1.65.
- Mono: `JetBrains Mono` for the ASCII hero and small labels (dates, "Free weekly email").

Components:
- Buttons: pill (border radius 999px), ink background with paper text, arrow suffix "→" on primary actions only.
- Inputs: paper background, 1px `--rule` border, pill radius, accent focus ring.
- Cards: no shadow, 1px hairline border, hover lifts border colour to ink.
- Section spacing: 96px desktop, 64px mobile.
- Max content width 720px for prose, 1040px for grids.

## 5. Pages

### Homepage `/`
1. Hero: `AsciiHero` on the left or above on mobile (see section 6), headline on the right. Headline pattern: one short claim about what Francisco does, one supporting sentence, one primary button ("Work with me →" links to `/work` or a mailto) and one text link ("Read the manifesto").
2. "Selected work" strip: 4 to 6 logos from `content/work.json` with role labels, links to `/work`.
3. "Projects" preview: 3 cards from `content/projects.json`.
4. Newsletter block (anchor `#newsletter`): label "Free weekly email", h2 "The Draft.", one-paragraph pitch (real-time learnings on career, marketing and building an internet income), `NewsletterForm`, small reassurance line under the form. Copy comes from `content/site.json`. Mirror the structure and measurements of Jay's "The Spark." block exactly.
5. Resources teaser: 2 or 3 resource cards, link to `/resources`.
6. Closing CTA: one line, two buttons (work with me / read the newsletter).

### Manifesto `/manifesto`
MDX. Short. Placeholder body for now, Francisco and Claude will draft the copy separately. Single column, serif pull quote component available for the Marcus Aurelius line.

### Work `/work`
The CV. Reverse chronological list: company, role, dates, 1 to 3 bullet results, logo. Add a "Download CV" button pointing at `/public/cv.pdf` if the file exists.

### Projects `/projects`
Grid of cards: name, one-liner, tags, GitHub link, live link. Read from JSON.

### Writing `/writing`
List of newsletter issues (title, date, one-liner, external link to the beehiiv post). Read from JSON. Top of page has a compact `NewsletterForm`.

### Resources `/resources` and `/resources/[slug]`
Index lists every resource card. Each resource page has:
- h1, one-line description, `ResourceForm` above the fold with label "Get it free, in your inbox 👇"
- The MDX story (why this resource exists, what it did for Francisco)
- "More resources" list of the other resources
- Frontmatter schema: `title`, `description`, `slug`, `resourceUrl` (the deliverable, hosted on Vercel blob or Google Drive), `automationId` (beehiiv, may be empty until phase 5), `ogImageText`.

### Thank you `/thank-you`
"Check your inbox." One line about confirming if double opt-in is on. Links back to the newsletter and resources.

## 6. ASCII hero

`AsciiHero.tsx`, client component. Takes `/public/images/headshot.jpg`, downsamples to a character grid on a canvas, renders it in the mono font in ink on paper. Animate a slow "flow": either a gentle wave that shifts character density over time, or a mouse-following ripple, at 30fps max, respecting `prefers-reduced-motion` (static render when set). Provide a build-time fallback PNG so the page never shows an empty box. Keep the component under 200 lines and dependency-free.

## 7. Newsletter and gated resources (beehiiv)

Both forms post to our own API routes. The beehiiv API key is server-only.

Environment variables:
```
BEEHIIV_API_KEY=
BEEHIIV_PUBLICATION_ID=        pub_xxx for the Between Lines publication
```

`/api/subscribe` (POST `{ email, source }`):
1. Validate email server-side.
2. `POST https://api.beehiiv.com/v2/publications/{pub}/subscriptions` with `email`, `reactivate_existing: true`, `send_welcome_email: true`, `utm_source: "website"`, `utm_medium: source` (e.g. "homepage", "writing").
3. Return `{ ok: true }` or a friendly error. Never expose beehiiv error bodies to the client.

`/api/resource` (POST `{ email, slug }`):
1. Look up the resource by slug in `/content/resources`. Reject unknown slugs.
2. Create or reactivate the subscription as above, but with `utm_campaign: slug` and `send_welcome_email` set from a config flag (default false, so the resource automation handles the welcome).
3. If the resource has an `automationId`, `POST .../automations/{automationId}/journeys` with the subscriber's email so the resource-specific campaign starts. This works for existing subscribers too.
4. If `automationId` is empty, log a warning and still return ok. The site should never break because beehiiv is not configured yet.
5. Redirect the client to `/thank-you?resource=slug`.

Rate limit both routes (simple in-memory token bucket per IP is enough) and add a honeypot field to both forms.

`lib/beehiiv.ts` wraps these two calls with types and a 8s timeout.

## 8. SEO and misc

- `metadata` export on every page. Titles as "Page · Francisco Gost". Descriptions from content files.
- Dynamic OG image at `/opengraph-image.tsx` and per-resource OG images using the frontmatter text. Paper background, serif title, small name in mono.
- `sitemap.ts`, `robots.ts`.
- Plausible or Vercel Analytics, one script, no cookie banner needed.
- Footer: name, one-liner, three columns (Explore, Follow, Legal), copyright line with current year.

## 9. Phases

Stop after each phase and wait for review.

Phase 0, reference study: complete step zero from section 1. Deliverable is `/docs/reference/`. No code yet.

Phase 1, scaffold: create Next app, Tailwind, fonts, tokens, `Nav`, `Footer`, `Section`, `Button`, empty pages with headings, `content/site.json` with placeholder copy. Deploy to Vercel so there is a live URL from day one.

Phase 2, content pages: work, projects, writing, manifesto (placeholder body), all reading from `/content`. Add sample entries so layout can be judged.

Phase 3, homepage and hero: assemble the homepage, build `AsciiHero`, OG images, sitemap.

Phase 4, resources: content schema, index, `[slug]` pages, `ResourceForm`, `/thank-you`, API routes wired but with beehiiv calls behind a `BEEHIIV_ENABLED` flag so forms can be tested without a key.

Phase 5, beehiiv: add env vars, turn the flag on, test one real signup and one real resource request, confirm the subscriber lands in the right automation.

Phase 6, polish: Lighthouse, mobile pass, copy review for banned words and em dashes (add a lint script that greps `/content` and `/app` for "—" and the banned words and fails CI).

## 10. Assets Francisco will provide

- Headshot, high resolution, plain background if possible (for the ASCII hero and about section)
- Company and project logos as SVG or transparent PNG
- CV copy and dates
- Project list with links
- Newsletter: "The Draft" (name is final). Francisco supplies the one-paragraph pitch, beehiiv publication ID and API key at phase 5
- The first resource: file plus a short story about it

## 11. Commands

```
pnpm dev          local
pnpm build        production build, must pass with zero warnings
pnpm lint         eslint + the copy lint script
```

Commit after each phase with a plain message in sentence case.
