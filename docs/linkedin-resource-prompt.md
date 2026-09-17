# Prompt: extract the LinkedIn resource from Francisco's knowledge base

Paste everything below the line into the agent that has Francisco's LinkedIn
material. It returns one JSON file. Hand that JSON straight back to Claude Code
and the resource page and the PDF get built from it.

Written to be pasted into an agent, not read by Francisco.

---

You have access to Francisco Gost's LinkedIn knowledge base: his own posts and
their analytics, client work, frameworks, playbooks, workshop decks, notes and
anything else on the subject.

Your job is to extract the material for a lead magnet called **The first 30
days**, a step by step system for reaching 100,000 impressions on LinkedIn in
the first weeks of posting. Francisco did this on his own profile in two weeks
from a standing start.

## The single most important instruction

**Extract, do not invent.** Every number, hook, date and claim must come from
something in the knowledge base. If you cannot find a real source for a field,
put `null` and add an entry to `gaps` saying exactly what is missing and where
you looked. A `null` costs five minutes of Francisco's time. An invented
statistic on a public lead magnet costs him his credibility, because the whole
resource rests on the claim that this actually happened.

Do not smooth over a gap with a plausible-sounding number. Do not average, round
up, or reconstruct a figure from memory of similar cases. If the knowledge base
has "roughly 20k" then the value is "roughly 20k", not 20000.

## What to return

A single JSON object, nothing else. No prose before or after.

```json
{
  "proof": {
    "impressions": null,
    "window": null,
    "startingPoint": null,
    "startDate": null,
    "endDate": null,
    "profileUrl": null,
    "evidence": null
  },
  "inside": [
    { "title": null, "detail": null, "source": null }
  ],
  "hooks": [
    { "text": null, "impressions": null, "date": null, "whyItWorked": null, "postUrl": null }
  ],
  "flops": [
    { "text": null, "impressions": null, "whyItFailed": null }
  ],
  "calendar": {
    "postTypes": [ { "name": null, "purpose": null, "cadence": null } ],
    "weeklyShape": null,
    "engagementRoutine": null
  },
  "positioning": {
    "method": null,
    "example": null
  },
  "profile": {
    "headlineRule": null,
    "aboutRule": null,
    "featuredRule": null,
    "beforeAfter": null
  },
  "inboundProof": [
    { "person": null, "whoTheyAre": null, "what": null, "wasItUnprompted": null }
  ],
  "clientResults": [
    { "client": null, "result": null, "nameable": null }
  ],
  "gaps": [],
  "confidence": {}
}
```

## Field by field

**proof** The headline claim. `impressions` is the exact number, not a rounded
one. `window` is the real elapsed time, in Francisco's words. `startingPoint` is
what he was starting from: follower count, whether he had posted before, whether
he had an existing audience. `evidence` is where the number comes from, for
example "LinkedIn analytics screenshot dated 12 May 2026". If there is no
screenshot or export anywhere, say so in `gaps`, because this is the most
checkable claim on his site.

**inside** Exactly six items, the contents list for the resource. Each needs a
`title` of five words or fewer and a `detail` of one sentence saying what the
reader actually gets. `source` names the file or note it came from. These must
describe what is genuinely in his material. If the knowledge base only supports
four real items, return four and put the shortfall in `gaps`.

**hooks** Up to twelve opening lines from his own posts that performed, each
with its real impression count and date. `whyItWorked` is one sentence, in
analytical terms, not praise. Prefer his own posts. If some are client posts,
say so in `source` terms inside `whyItWorked` and set `postUrl` to null if it
cannot be shared publicly.

**flops** Two posts that underperformed, with the numbers. These matter more
than the wins for credibility. If he has never recorded a flop, return an empty
array and note it.

**calendar** The actual 30-day shape. `postTypes` are the categories he rotates
and what each is for. `weeklyShape` describes which types run on which days.
`engagementRoutine` is the daily commenting and DM routine, with the real time
commitment.

**positioning** The method for deciding what someone stands for before they
write anything, plus one worked example from a real client or from Francisco
himself.

**profile** The rules for headline, about section and featured links. If there
is a real before and after for any profile, put it in `beforeAfter`.

**inboundProof** People who reached out after seeing his posts. For each, set
`wasItUnprompted` to true only if they contacted him first. If he commented and
they replied, that is `false`, and it will not be used as inbound proof. Known
so far: Lara Acosta reached out unprompted, Will McTighe replied to a comment
Francisco left.

**clientResults** RallyUp client outcomes with numbers, and whether the client
can be named publicly. These support the method but are not the headline claim,
because the resource promises a personal result, not an agency one.

**gaps** One entry per missing field. Format: `{ "field": "...", "missing":
"...", "whereILooked": "..." }`. Be specific. "No analytics screenshot for the
100k claim, searched the LinkedIn exports folder and the 2026 notes" is useful.
"Not found" is not.

**confidence** A map of field path to one of `high`, `medium`, `low`. Mark
`low` on anything you inferred rather than read directly, and explain the
inference in `gaps`.

## Tone for any prose you write

Francisco's site runs strict copy rules that the extracted text has to survive:

- No em dashes anywhere. Use a comma, a full stop or a colon.
- Sentence case. Never all-lowercase headings, never title case.
- Never use these words: unlock, empower, elevate, solutions, leverage.
- First person singular, present or past tense.
- Short sentences. Specific numbers, never rounded for effect.
- No hype. The material is persuasive because the numbers are real.

## Before you answer

Check three things and fix them silently:

1. Every number appears somewhere in the knowledge base. Search for each one
   before you include it.
2. Every `null` has a matching entry in `gaps`.
3. The JSON parses.

Return only the JSON.
