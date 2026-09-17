# Content inputs

What Francisco has supplied, what it was used for, and what is still outstanding.
Updated at the end of phase 1.

## Supplied

### Brand assets

| File | In repo as | Notes |
|------|-----------|-------|
| `the-draft-logo-800.png` | `public/images/logo.png` | 800x800, transparent. Source of the accent and paper tokens. Traced into `components/Logo.tsx` as inline SVG so it can be recoloured and used at favicon sizes |
| `francisco.png` | `public/images/headshot.png` | 800x800, flat blue background at `#477ce6`. Good silhouette for the ASCII hero in phase 3 |
| `the-draft-thumbnail-1200x630.png` | `public/images/the-draft-card.png` | 1200x630. Source of the ink and body colours, and of the newsletter pitch |

Generated from the logo: `app/icon.png` (512px) and `app/apple-icon.png` (180px, composited on the brand orange so iOS does not paint it on black).

### Colour, sampled from the assets rather than invented

| Token | Value | Sampled from |
|-------|-------|--------------|
| `--color-accent` | `#b4552b` | logo tile |
| `--color-paper` | `#fdf6ec` | logo mark and thumbnail background |
| `--color-ink` | `#241c16` | thumbnail wordmark |
| `--color-ink-soft` | `#4a4239` | thumbnail body text |

Derived, not sampled: `--color-paper-dim: #f4e9d9`, `--color-ash: #6f6559`, `--color-line: #241c1617`, `--color-accent-deep: #9e441d`.

### Newsletter pitch

Taken verbatim from the thumbnail, which is Francisco's own copy:

> A weekly letter where I share my real-time learnings on career, marketing, and building an internet income.

Lives in `content/site.json` under `newsletter.pitch`.

### Resources, for phase 4

Two, as given. Proposed titles and slugs follow the reference formula: the h1 is the plain name of the artefact with no adjectives, and the description is one sentence carrying the artefact and the outcome with a concrete number in it.

**1. LinkedIn growth playbook**

- Slug: `linkedin-first-30-days`
- As given: "How to get 100k impressions in your first 30 days on LinkedIn (step by step)"
- Proposed h1: The first 30 days
- Proposed description: The step by step system I used to reach 100,000 impressions on LinkedIn inside my first 30 days.
- Proposed related card kicker: 100k impressions · 30 days

**2. Chief of staff cold DM**

- Slug: `chief-of-staff-cold-dm`
- As given: "The $100k+ Chief of Staff LinkedIn cold DM, the cold DM that got me a $100k+ and equity Chief of Staff role at 23 years old"
- Proposed h1: The chief of staff DM
- Proposed description: The cold DM that landed me a chief of staff role at 23, on six figures plus equity.
- Proposed related card kicker: The $100k role · age 23

Both titles are proposals. Francisco has the final say, and the full story body for each is still outstanding.

## Outstanding

Blocking the phase it is named against, not blocking phase 2 unless stated.

| Input | Needed for | Notes |
|-------|-----------|-------|
| Domain name | Phase 1, already placeheld | `content/site.json` currently says `https://franciscogost.com`. It drives canonical URLs and OG image resolution |
| Social links | Phase 1, already placeheld | LinkedIn, X, YouTube, Instagram. The footer hides the Follow column until at least one is filled, so nothing is broken meanwhile |
| Contact email | Phase 1, already placeheld | Left empty on purpose. Publishing an address is Francisco's call |
| Hero headline and supporting line | Phase 3 | Placeholder in `site.json` now |
| Tagline and one liner | Phase 3 | Placeholder in `site.json` now. The tagline shows in the footer, the one liner is the site description |
| CV entries: company, role, dates, one to three results each | Phase 2 | Populates `content/work.json` |
| Company logos as SVG or transparent PNG | Phase 2 | For the work page and the homepage logo strip |
| Project list with repo and live links | Phase 2 | Populates `content/projects.json` |
| Newsletter issues worth featuring | Phase 2 | Populates `content/writing.json` |
| Manifesto body | Phase 2 | Drafted separately |
| The two resource files themselves | Phase 4 | The deliverable each form sends |
| Resource story bodies | Phase 4 | One per resource, following the eight beat formula in `docs/reference/jay-resource-beehiiv-pitch-deck.md` |
| beehiiv API key and publication ID | Phase 5 | Set in Vercel project settings, never in the repo |
| Vercel account access | Phase 1 deploy | The build is ready, the deploy needs an authenticated Vercel session |

## Open question

The newsletter thumbnail sets "The Draft" in a geometric sans. The site sets headings in Instrument Serif, per the brief. The two will sit side by side wherever the thumbnail is used, so at some point either the thumbnail gets regenerated in the site face or the site adopts the thumbnail face. Not blocking, worth deciding before phase 3 builds the OG images.
