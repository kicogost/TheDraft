# Section brief

Francisco asked for Jay's exact section structure across five areas, with his
own facts and sentences in them. This file records the structure block by
block, and the questions that have to be answered to fill each block.

Structure and measurements are replicated. Every sentence is written fresh.
Jay's lines appear here only as a description of the shape, never as copy to
paste, per the hard rule in CLAUDE.md.

Answer inline under each question, or in a message. Question numbers are
stable so they can be referenced.

## Information architecture

Jay's five items resolve like this. Three of them are not what they look like.

| Nav item | What it actually is |
|----------|--------------------|
| Portfolio | A real page at `/portfolio` |
| Resources | A hover dropdown only. There is no index page. Each resource is its own route |
| About | A real page at `/about` |
| Newsletter | An anchor to the homepage section, `/#newsletter` |
| Work with me | An external link to a separate site on a separate brand |

Two consequences for what is already built: the `/resources` index page comes
out, and the Resources dropdown goes back into the nav, reversing the flat nav
decision recorded in `docs/reference/summary.md`.

## Homepage

Jay's order: hero, my books, my portfolio, the newsletter, closing call to
action, footer.

Francisco has no book, so that slot is open.

- **Q1.** What fills the books slot? A resources teaser with the two lead magnets, a selected clients or logo strip, or nothing at all and the page runs hero into portfolio.
- **Q2.** The h1 is a first person present tense claim, about five words, no full stop, broken over two lines. Jay's asserts what he does and who for. What is the equivalent claim for you?
- **Q3.** One supporting sentence pair under the h1. What do you want it to say?
- **Q4.** The hero has one primary button and one text link. Where should each go? Jay sends the button to his service offer and has no text link.
- **Q5.** The closing call to action is a question addressed to the reader with a single button, on a full ink band. What is the question, and where does the button go?

## 1. Portfolio

Jay's blocks, in order:

1. h1, a first person belief statement over two lines, closed with a full stop
2. Lead paragraph, two sentences
3. A three column card grid, 16px gutter, cards with a 2px ink border
4. A disclosure paragraph in muted text
5. A closing band on the dim background, centred, with a mark and one button

Each card holds: a 40px bordered logo tile, the relationship in accent micro
caps plus the year, the company name in the display face, the category in
muted micro caps, a two line description, an optional dashed rule with a promo
code, and a "Visit" action link.

- **Q6.** Jay's portfolio is angel investments and advisory roles. What is yours? Companies you have worked with, clients, projects you have built, or something else? This decides everything about the page and it is the single biggest unknown.
- **Q7.** List the entries. For each: name, your relationship to it in one word, the year, the category in one or two words, a one or two sentence description of what it does for its customer, and the link.
- **Q8.** Any promo or referral codes to include, as Jay does for three of his? If so, the code and what it gets.
- **Q9.** Do you need a disclosure paragraph? Jay's states his financial interest and says his opinions are not unbiased. Only relevant if you hold a stake in anything listed.
- **Q10.** Logo files for every entry. SVG preferred, transparent PNG at 256px or more otherwise. Marks rather than wordmarks, because they render in a 40px tile.

## 2. Resources

No index page. Each resource is its own route under `/resources/<slug>`, and
the nav dropdown lists them.

Jay runs three templates. Yours will use one each, probably A and B.

**Template A, story led.** Used for the pitch decks. Two columns: the story on
the left, a form card floated top right so it is above the fold. Blocks: h1 as
the bare artefact name, a one sentence description, then the story as lead,
turn, correction, a two item numbered list, proof, and the ask. Then a
hairline and a two card "more resources" row.

**Template B, contents led.** Used for the workbook. Single column. Blocks: h1
closed with a full stop, a one sentence description, the form inline and above
the fold, a disclosure line about the newsletter signup, then a "what's
inside" numbered list of six items, then a cross sell block to another
resource.

**The form card**, in both: an ink header block carrying a claim in the
display face, an eyebrow instruction in muted caps, one email input with a 2px
border, and a full width ink submit button with a trailing arrow.

Your two resources, as given:

### 2a. LinkedIn, first 30 days

- **Q11.** Template A or B? A step by step system suggests B, where the "what's inside" list does the selling.
- **Q12.** Confirm or replace the proposed h1 "The first 30 days" and description "The step by step system I used to reach 100,000 impressions on LinkedIn inside my first 30 days."
- **Q13.** If template B: the six things inside, one line each.
- **Q14.** If template A: the story. What was the situation, what did you actually do, what was the number at the end, and what is the one transferable lesson?
- **Q15.** The ink header claim on the form card. Jay uses a stat line or a claim about the outcome, three short fragments. What are yours?
- **Q16.** The submit button label. Jay uses "Get the deck" and "Send me the workbook".
- **Q17.** The file itself, and where it should be hosted.

### 2b. Chief of staff cold DM

- **Q18.** Template A or B? A single DM with a story behind it suggests A.
- **Q19.** Confirm or replace the proposed h1 "The chief of staff DM" and description "The cold DM that landed me a chief of staff role at 23, on six figures plus equity."
- **Q20.** The story, in the six beats Jay uses: the outcome as a bare fact, the obvious question a reader has, the honest answer, the real mechanism, two numbered reasons it works, and a proof point.
- **Q21.** The ink header claim on the form card.
- **Q22.** The file itself. Is it the DM alone, or the DM plus context and the reply?
- **Q23.** Is the company named, and is the salary figure stated as precisely as the title suggests? Both are yours to decide and both change how the page reads.

### Both

- **Q24.** The related card kickers. Jay labels by stake and age, not by topic, which turns a list of downloads into a chronology. Proposed: "100k impressions · 30 days" and "The $100k role · age 23".
- **Q25.** Are more resources coming? The dropdown is worth building for two, but the ordering rule matters if it grows.

## 3. About

Jay's blocks: h1, then a two column grid at 768px and 384px with a 64px
gutter. Prose left, a portrait card and one button right. No headings inside
the body, no cards, no form. The page ends and the footer starts.

The body is a chronological ladder. Each paragraph opens with an age or a
year, states one concrete thing, and names a real number or a real person.
Every claim that can be linked is linked, and the link text is the artefact
rather than the verb.

- **Q26.** Your ladder. Four to six paragraphs, each opening with an age or a year, each carrying one concrete fact. Rough notes are fine, the writing is mine.
- **Q27.** The lead paragraph states the role in one sentence and names the newsletter in the same breath. What is your role, in your own words?
- **Q28.** The closing paragraph is present tense and forward looking, one sentence on what you are doing now.
- **Q29.** Which claims have something to link to, and what is the URL for each?
- **Q30.** The portrait. The headshot supplied has a flat blue background at `#477ce6`, which fights the burnt orange. Options: recolour the background to paper or accent, crop tighter, or supply a different photo. Which?
- **Q31.** The caption bar under the portrait carries your name and a role in italics, two or three words. Jay uses "author · operator". What are yours?
- **Q32.** The button under the portrait. Jay sends it to his newsletter. Where does yours go?

## 4. Newsletter

A homepage section on the dim background with 2px rules top and bottom and the
graph paper texture, at `#newsletter`. Two columns: copy left, form right.

Blocks: an eyebrow label in muted caps, the newsletter name in the display
face closed with a full stop, a pitch paragraph, the form, and a reassurance
line under the form.

The pitch is one sentence on what arrives and how often, then a social proof
fragment with the number set in bold inside the same paragraph.

Your pitch already exists on the thumbnail and is in `content/site.json`.

- **Q33.** The subscriber count, for the bold proof fragment. If the number is not flattering yet, the fragment can be dropped or replaced with something else true.
- **Q34.** The reassurance line under the form. Jay's is warm and names the unsubscribe. Current placeholder: "One email a week. Leave whenever you like, no hard feelings."
- **Q35.** The eyebrow label. Currently "Free weekly email".
- **Q36.** beehiiv publication ID, in the form `pub_xxx`.
- **Q37.** beehiiv API key. Do not paste it in chat. Put it in the Vercel project as `BEEHIIV_API_KEY`, or tell me and I will add it to `.env.local` locally only.
- **Q38.** Is double opt in on? It changes the thank you page copy.
- **Q39.** Should the newsletter signup send beehiiv's welcome email, and should the resource signups suppress it so the resource automation handles delivery?
- **Q40.** The beehiiv automation ID for each resource, if the automations exist yet. They can be empty and filled in later, the routes are built to tolerate it.

## 5. Work with me

Jay's is a separate site on a separate brand. Its blocks: a hero with an
eyebrow badge, an h1 with one word in a contrasting face, a boxed sub
paragraph and one button; a social proof strip of four headshots with name and
company; an inline application form; a four phase process on a numbered
vertical timeline; a case studies grid of four; a two column "who this is for"
and "who this is not for"; a six question FAQ accordion; a closing band; and a
legal disclaimer.

Note it is an application, not a booking. There is no calendar anywhere on it.

- **Q41.** Own page on this site in your brand, or an external link? Own page is the recommendation. You do not have a second brand to send people to, and the whole point of the site is to be the thing that converts.
- **Q42.** What is the offer? What does someone actually buy, and what do they get.
- **Q43.** Application form or calendar booking? You mentioned calendar links. Jay filters with an application because his offer is high ticket. A calendar is lower friction and fills faster with worse leads. Which fits your offer?
- **Q44.** If calendar: the Cal.com or Calendly link, and whether it embeds inline or opens out.
- **Q45.** If application: the questions to ask. Jay asks for name, business email, phone, a free text description, revenue band, and current bottleneck. Where should submissions land, an email address or a form service?
- **Q46.** The process. Jay shows four named phases with a one sentence description each. What are your steps, and is there a timeframe?
- **Q47.** Case studies or results. For each: the client, the project, the outcome in one line with a number, and whether you can name them.
- **Q48.** Who this is for, and who it is not for. Four to six bullets each. The second list is what makes the first one credible.
- **Q49.** Common questions. Five or six, with your answers. Price, time commitment, what happens if it does not work.
- **Q50.** Social proof. Jay uses four headshots with name and company. Do you have testimonials, and do you have permission plus photos?
- **Q51.** Is there a price, and does it go on the page?

## Global

- **Q52.** Domain. Currently placeheld as `franciscogost.com`.
- **Q53.** Social links, full URLs. LinkedIn, X, YouTube, Instagram, any others. The footer hides the Follow column until at least one exists.
- **Q54.** Contact email, and whether it is published on the site.
- **Q55.** Footer tagline, about five words. Currently "Operator, writer, and coach."
- **Q56.** Site one liner, used as the meta description. Currently "I help founders and operators build a career that compounds."
- **Q57.** Any visual beyond the three assets already supplied. Jay uses a sunburst mark throughout as a decorative device. The envelope from the logo can do that job, or something else can be drawn.
- **Q58.** Analytics. Plausible or Vercel Analytics, and the account if Plausible.
