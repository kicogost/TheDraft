# Onboarding answers: what the list says about itself

The question on `/thank-you` writes two custom fields on the beehiiv subscriber record: `stage`, a six-option list, and `tried`, free text. This file tracks what comes back and when it becomes worth acting on.

## How to read them

Seven segments exist purely for browsing. None has a send attached and none should get one.

| Segment | Filter |
| --- | --- |
| Stage: answered (any) | `custom_field('0477251a-539e-4f27-abe2-a2a69af13218') EXISTS` |
| Stage: No direction | `= 'No direction'` |
| Stage: Applying only | `= 'Applying only'` |
| Stage: Not started | `= 'Not started'` |
| Stage: No replies | `= 'No replies'` |
| Stage: No offers | `= 'No offers'` |
| Stage: Not job hunting | `= 'Not job hunting'` |

**Do not filter subscribers by `status: active` when counting answers.** One of the first six answered and then unsubscribed two days later, and an active-only query hides her. The segment catches her; a hand-rolled query did not.

## State, 9 October 2026

Six answers, one of which is a test record on Francisco's own address that should be cleared. Five real.

| Stage | Count |
| --- | --- |
| Not started | 2 |
| Applying only | 2 |
| No direction | 1 |

Nothing can be concluded from five. Recorded so the shape is visible later.

## The hypothesis worth watching

Two of the five volunteered, unprompted, that they reach late stages and do not convert. One reported more than 500 applications, five to seven interviews and no offers. Another reported reaching final stage repeatedly with no offer.

If that holds as the numbers grow, it matters, because **everything currently published is about getting noticed**: cold messages, building something unasked, earning the reply. A reader who already gets interviews has a different problem, and the $100 hour is aimed at the first one.

Watch whether "No offers" and late-stage free-text answers keep appearing. Do not rewrite the offer on five answers.

## Trigger: 50 answers

Pre-registered 9 October 2026, at six answers, before the breakdown could be known.

At **50 answers**, the breakdown becomes a real signal rather than noise, and these questions get asked in this order:

1. **What is the actual distribution?** The reason the question exists. Which stage dominates.
2. **Does the late-stage hypothesis above survive?** If "No offers" plus late-stage free text is a quarter or more of answers, the offer is pointed at the wrong half of the funnel.
3. **What is the answer rate?** Six answers against how many people reached `/thank-you`. Below about 20%, the question or its placement is the problem, not the audience.
4. **Do any two stages want different things badly enough to justify branching the sequence?** Only then is a branch worth the complexity. Not before.

**Checking it is one call**, the member count on `Stage: answered (any)`. A cloud routine cannot do this: beehiiv is a local Claude Code MCP server, not a claude.ai connector, so scheduled agents cannot reach it. Connecting beehiiv at claude.ai/customize/connectors would make an automated check possible.

Verbatim answers, which are other people's words, live in `private/`.
