# Positioning review

A standing, evidence-based answer to two questions Francisco cannot yet answer from instinct: **who is the audience**, and **what should be sold to them**.

Re-run this monthly. The method is in section 5. Update the baseline below rather than starting a new file, so the trend is visible.

---

## 1. Baseline, 22 September 2026

37 posts, March to September 2026. 133,397 impressions, 246 saves, 198 followers gained from content.

Posts sort into three themes. The split is stark.

| Theme | Impressions | Saves | Followers | **Saves per 1,000 impressions** |
| --- | --- | --- | --- | --- |
| Career, hiring, getting noticed | 88,541 (66%) | **227 (92%)** | **189 (95%)** | **2.56** |
| AI and build in public | 30,448 (23%) | 11 (4%) | 6 (3%) | 0.36 |
| Agency and RallyUp business | 14,408 (11%) | 8 (3%) | 3 (2%) | 0.55 |

**Career content is seven times more save-dense than AI content.** Saves are the metric that matters here: a like is politeness, a save is "I want to do this myself later", which is the closest free signal to purchase intent LinkedIn gives.

### The posts that carry everything

| Post | Date | Impressions | Saves | Followers |
| --- | --- | --- | --- | --- |
| Video DM to Will McTighe | 10 May | 39,427 | 72 | 55 |
| Hiring writers at RallyUp | 4 Sep | 23,163 | 132 | 115 |
| "235 connection requests" | 8 Sep | 13,191 | 10 | 12 |
| How I got my job at RallyUp | 16 Sep | 6,717 | 6 | 6 |

Two posts are 60% of reach, 87% of saves and 88% of follower growth.

### Follower growth is spiky, not compounding

2,293 on 12 August. 2,816 on 22 September. Plus 523 in 41 days.

But 4 September closed at 2,427 and 5 September opened at 2,612. The hiring post added 185 in a day and 324 across five days. Since 11 September growth has run at about 4.5 a day. **Roughly 62% of six weeks of growth came from one week driven by a job advert**, which is not a repeatable content strategy.

---

## 2. What the data says

**The audience is people trying to get hired who cannot get noticed.** Every independent signal agrees:

- The two highest-save posts are both about the mechanics of getting a decision maker's attention
- The job advert pulled 235 connection requests and 128 DMs in a week
- The only genuine stranger to sign up for a lead magnet took the cold DM one
- The strongest inbound message received is an out of work ex-operator asking how to convert replies into offers

**The audience is not founders shopping for ghostwriting.** That is RallyUp's market, and on this profile it is the worst performing theme in the feed.

**Two businesses are being run in one feed.** The 22 September post pitches the agency to founders, then offers a free cold DM guide to career changers in a P.S. The data says the P.S. is the business and the pitch is a tax on reach.

**Reach is not value.** The "guy named Claude" joke did 14,716 impressions and produced 2 saves and 1 follower. The hiring post did fewer impressions and produced 132 saves. Optimising for impressions would have chosen the joke.

**Do not over-fit to single posts.** The Lara Acosta and Will McTighe posts are near identical copy five days apart: 3,609 impressions versus 39,427. An 11x swing on the same content. Individual posts are a lottery. Only aggregate theme patterns are trustworthy.

---

## 3. Open questions the data cannot answer

These need Francisco, or data that does not exist yet.

1. **What is in the 128 DMs.** The highest resolution evidence he owns about what this audience wants, in their own words, and it is unread as a dataset.
2. **What he actually wants to sell.** Data reveals demand. It does not choose an ambition or a price.
3. **Whether the audience will pay.** Zero sales so far, so willingness to pay is entirely unproven. Saves are intent, not money.
4. **What happens between the free resource and the $100 hour.** There is currently nothing in between.

---

## 4. Current hypotheses to test

Written as falsifiable statements so the next review can mark each one.

- **H1.** Dropping agency pitches from the personal profile raises average saves per 1,000 impressions. *Status: untested.*
- **H2.** The audience will pay for something between a free PDF and a $100 call. *Status: untested, no product exists.*
- **H3.** Career and hiring content outperforms AI content on saves at any audience size. *Status: supported, 2.56 versus 0.36 per 1,000.*
- **H4.** Newsletter signups per post are higher for career content than for any other theme. *Status: untestable until traffic exists.*

---

## 5. How to re-run this

1. `ordinal_get_workspace_context` with `workspaceSlug: rallyup`, `profileSearch: Francisco` to get the profile id.
2. `ordinal_get_analytics` with `type: posts`, paginating with `nextCursor` until the period is covered.
3. `ordinal_get_analytics` with `type: followers` for the growth curve, and check for single day jumps against post dates.
4. Tag every post with one theme. Keep the three above unless a genuinely new one appears, in which case add it rather than reclassifying history.
5. Compute impressions, saves and followers per theme, and **saves per 1,000 impressions**, which is the ranking metric.
6. Pull beehiiv numbers once there are more than about 200 subscribers. Below that, the percentages are noise.
7. Update section 1, mark the hypotheses in section 4, and write the new decision.

**Rules for this analysis.** Never rank by impressions alone. Never draw a conclusion from one post. Say plainly when the sample is too small, rather than reporting a percentage of a handful. Percentages of fewer than about 30 events are not findings.
