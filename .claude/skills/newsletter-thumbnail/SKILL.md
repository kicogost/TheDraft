---
name: newsletter-thumbnail
description: Build the 1200x630 social card for a newsletter issue using the site's own OG renderer. Use when Francisco says "build thumbnail for this newsletter", "make the thumbnail", "og card for the issue", or asks for a web post thumbnail or share image for a beehiiv post. Proposes three copy options first, then renders the chosen one.
---

# Newsletter thumbnail

Renders the card with `lib/og.tsx`, the same system that makes the site's own
social cards. Never generate this image with an AI image tool. They invent
garbled letterforms, and a share card is mostly words.

## Order of work

Propose copy, ask, then render. Do not render three images and ask him to
choose: each render costs a dev server boot, and the decision is about the
words, not the picture.

### 1. Get the issue

If he named a post, use it. Otherwise `list_posts` with `status: "draft"`,
newest first, and take the top one. Read it with `get_post_content`
(`format: "text"`) so the copy options come from what the issue actually says,
not from its title alone.

### 2. Offer three options

Read `docs/copy-system.md` first. Then give three **title and subtitle** pairs,
each a different angle, with one line on what each is doing. Suggested spread:

- the issue's own subject line, which keeps card, subject and title aligned
- the sharpest claim in the piece, stated flat
- the reader's problem rather than the issue's promise

House rules apply: no em dashes, no banned words, sentence case. **Write
sentence case even though the card renders the headline in capitals**, the
component applies that itself.

Sizing, from `resourceHeadlineType` and `pageCard` in `lib/og.tsx`:

| Headline length | Rendered size |
| --- | --- |
| 13 characters or fewer | 132px, one line |
| 14 to 18 | 112px |
| 19 or more | 92px, wraps |

**25 to 45 characters is the strongest shape.** It wraps to two lines of 92px
and fills the card. Under 18 gives one enormous line that often looks thin.
A trailing full stop is stripped, so do not rely on one.

Subtitle is one sentence, the payoff. Kicker is `The Draft`, or
`The Draft · 6 October` when the date earns its place.

Then ask which one with AskUserQuestion. Recommend one and say why.

### 3. Render

`defaultCard` is the variant for an issue. `resourceCard` stamps a "Free PDF"
badge on it and `pageCard` is sized for one or two words, so both are wrong here.

Write a temporary route, because the permanent ones all carry fixed content:

```tsx
// app/og-tmp/route.tsx
import type { NextRequest } from "next/server";
import { defaultCard } from "@/lib/og";

export function GET(request: NextRequest) {
  const p = request.nextUrl.searchParams;
  return defaultCard(
    p.get("k") ?? "The Draft",
    p.get("h") ?? "Headline",
    p.get("s") ?? "",
  );
}
```

Then:

```bash
lsof -ti:3000 | xargs kill -9 2>/dev/null; sleep 1
BEEHIIV_ENABLED=false pnpm dev >/tmp/next-dev.log 2>&1 &
for i in $(seq 1 45); do curl -sf -o /dev/null "http://localhost:3000/og-tmp?h=test" && break; sleep 1; done
enc() { python3 -c "import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1]))" "$1"; }
curl -s -o ~/Downloads/the-draft-thumbnail.png \
  "http://localhost:3000/og-tmp?k=$(enc 'The Draft')&h=$(enc 'HEADLINE')&s=$(enc 'SUBTITLE')"
```

`pnpm dev` rather than `pnpm build`, it compiles the one route on demand.

### 4. Look at it, then clean up

Read the PNG back and actually look at it before handing it over. Check the
headline has not wrapped to three lines, and that it still reads at the size of
a LinkedIn preview.

Then, every time, without being asked:

```bash
lsof -ti:3000 | xargs kill -9 2>/dev/null
rm -rf app/og-tmp
git status --short   # must be empty
```

Leaving that route in the repo ships a public endpoint that renders arbitrary
text onto his brand card. Confirm the working tree is clean in the handover.

## Handover

Tell him the filename in `~/Downloads`, what the card says, and that it came
from the site's own renderer so it matches every other card in the feed.
