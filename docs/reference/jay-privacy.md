# Jay Yang, privacy policy

Source: https://jayyanginspires.com/privacy
Captured: 2026-09-17, 1440x900 and 390x844.
Screenshots: `screenshots/privacy-1440.png`, `screenshots/privacy-390.png`.

Captured as the legal page template. It is the pattern for our `/privacy` and `/terms` MDX pages. Shared chrome is in `jay-home.md`.

## Layout

A single `<article>`, page height 3884px, almost all of it body text.

- Container: `max-w-3xl px-5 pb-24 sm:px-8 pb-32`. So 768px, the narrow prose container, with 128px of bottom padding.
- Content starts at y=148, directly under the fixed nav, with no hero section and no graph paper background.
- h1, then a last updated line, then the numbered body inside a single `.reveal` wrapper.
- Thirteen numbered h2 sections in one continuous column. No table of contents, no anchor links, no back to top.
- The footer follows immediately.
- At 390px the container simply narrows. Nothing else changes.

## Typography

- h1 at 72px Anton uppercase. Legal pages get a full size display heading, they are not visually demoted.
- h2 at 24.8px Anton uppercase, each prefixed with its number and a full stop, for example "1. Information we collect".
- Body at 16px ink soft on the 1.625 line height, on a 704px measure.
- Lists use plain bullets at body size.
- Inline links in accent with an underline.
- A last updated line at 14px ash under the h1.

## Components

None. This page uses no cards, no forms, no buttons, no rules between sections. Section separation is done entirely with vertical space and the display face at h2.

That is the useful lesson: the legal pages need only the prose container, the display heading styles and the body styles. They should be MDX with no bespoke components.

## Colour

Paper background with no graph paper grid, which is what marks it as a utility page. Ink for headings, ink soft for body, ash for the last updated line, accent for inline links.

## Motion

Shared, and almost none is used. One `.reveal` wrapper around the whole body.

## Copy patterns

- h1 is the document name, nothing more.
- Sections are numbered and titled with a noun phrase, never a question.
- Each section opens with a plain sentence saying what it covers before any detail.
- Third party services are named explicitly rather than described generically.
- The contact section closes the document and gives a real address.
- The register is plain and readable, not legalese. Short sentences, second person, active voice.

## Metadata

- Title: `Privacy Policy · Jay Yang`.
- Description is a full sentence describing what the policy covers and names the specific areas.
- No dedicated OG image. The page falls back to the site wide `/opengraph-image`, which is the right call for legal pages.
