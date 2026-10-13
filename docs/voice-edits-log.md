# Voice edits log

Every time Francisco edits a draft, the change goes here. Claude reads this
before writing the next one, so his corrections compound instead of being
rediscovered each week.

`docs/copy-system.md` holds the rules he decided. This file holds the rules his
edits reveal, which is not always the same thing.

## How to use it

Before drafting: read the rules section below.
After he edits: diff what shipped against what was handed over, add anything new,
and promote a pattern into `copy-system.md` once it shows up three times.

Log the change and the inferred rule. Do not log typo fixes.

---

## Rules his edits reveal

**He splits paragraphs harder than Claude does.** Repeatedly takes a two or
three sentence paragraph and breaks it into one sentence per line. Seen four
times in one issue. When in doubt, break it.

**He adds the explicit noun.** "Posting" became "job posting". "If the only move
you have left" became "if the only move you have left to find a job". Claude
writes for someone already in context. He writes for someone skimming on a
phone who arrived mid-thought.

**He softens staccato runs with an ellipsis.** Claude wrote "New template.
Different format. A fourth font." He shipped "New template, different format,
another font…". The copy system says one idea per sentence, and he still prefers
a trailing ellipsis when the list is a drumbeat rather than three separate points.

**He adds the word carrying the feeling.** "We interviewed four" became "We only
interviewed four". "Not a rejection" became "Not even an automated rejection".
Small intensifiers, never adjectives.

**He signposts the turn.** "The way out is not working harder inside the loop"
gained "Do this instead:". "This week: one company" gained "choose".

**He prefers a bullet list for a set of options**, where Claude runs them inline
in a sentence.

**He cuts the writerly aside.** "The message is annotated here, typos included"
lost "typos included". Keep the detail when it is evidence, cut it when it is
flavour.

**Second person about their work, not their goals.** In the beehiiv ad intro he
changed "write publicly about the role you want" to "write about the work you
do". His version assumes the reader already does work worth writing about. The
original asked them to pick a new identity first.

**Sign-off, decided 13 October 2026:** "Stay awesome," then "Francisco". Use it
on every issue and automation email.

---

## Log

### 13 October 2026, "You are not losing to better people"

| Claude wrote | He shipped | Rule |
| --- | --- | --- |
| no name for the five steps | "I call it the application loop" | Name the mechanism, make it quotable |
| "You find the posting." | "You find the job posting." | Add the explicit noun |
| "a hundred people have already sent something" | "...have already applied" | Use the reader's own verb |
| "Not a rejection. Nothing." | "Not even an automated rejection. Nothing." | Add the word carrying the feeling |
| "New template. Different format. A fourth font." | "New template, different format, another font…" | Ellipsis for a drumbeat |
| "Five to seven interviews. No offers." | "He got five interviews and no offers." | Merge into one plain sentence |
| "We interviewed four." | "We only interviewed four." | Intensifier |
| one paragraph of three sentences | three one line paragraphs | Split harder |
| "The way out is not working harder inside the loop." | "...Do this instead:" | Signpost the turn |
| "send them the work instead of your CV" | "send them that piece of work instead" | Point back at the specific thing |
| "The message is annotated here, typos included." | "You can find my message annotated here." | Cut the aside |
| onboarding / pricing / job ad inline | bulleted, under "A few ideas:" | Bullets for option sets |
| ad intro: "the role you want" | "the work you do" | Assume competence, not reinvention |
| (none) | "Stay awesome," | Standing sign-off |

Numbers he corrected: "37 wrote something to go with it" became "over 100 wrote
me a Cold DM", after counting directly in the LinkedIn interface and keeping a
screenshot. See section 1b of `docs/positioning-review.md`.
