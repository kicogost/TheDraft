# DM copy

Every message the Instagram flows send. Paste exactly. Where you see `{{lm_name}}`, delete it and insert the **lm_name** chip from the variables picker instead.

Rules this copy follows: sentence case, no em dashes, no emoji, at most one exclamation mark per flow (there are none), and it never promises anything the freebie does not deliver.

## Launcher (one per post)

### Public replies

Turn on public reply and add all three so ManyChat rotates them:

1. `Sent it to your DMs`
2. `Check your DMs, it's there`
3. `Just sent it over`

### Launcher opener (Private Reply, button "Send it")

> Hey, thanks for the comment.
>
> Tap below and I'll send it straight over.

Button: `Send it`

This message cannot use `{{lm_name}}`, because the launcher sets that field after the tap. Keep it generic so the agency never edits it.

## Master: Lead magnet gate

### Master, message 1

> Happy to send you {{lm_name}}. It's Francisco, by the way.

### Master, message 2 (the email ask, followed by the User Input block)

> It comes with The Draft, my weekly email on how top 1% startups crush organic marketing. One email every Tuesday, unsubscribe anytime.
>
> What's the best email to send it to?

### Master, retry (invalid email)

> That doesn't look like an email address. Mind trying again?

### Master, reminder (after 2 hours with no reply)

> Still want {{lm_name}}?
>
> Reply with your email and I'll send it over.

### Master, delivery (button "Open it")

> Done. Here's {{lm_name}}.
>
> You're on The Draft now, so look out for a welcome email from me. Reply to it with anything, it keeps me out of your spam folder.

Button: `Open it` (Open website, URL = `lm_url` chip)

## Bio keyword flow (DRAFT), not in use

Only needed if the bio switches from the playbook link to a DM keyword.

### Bio line

`DM me DRAFT for the story interview`

### Bio keyword opener (button "Send it")

> Hey, thanks for the message.
>
> Tap below and I'll send you the story interview: the prompt we use to interview every founder we write for.

Button: `Send it`

After the tap the master takes over with the messages above.

## How it reads end to end

For someone who comments STORY on a post:

> **Public reply:** Sent it to your DMs
>
> **DM:** Hey, thanks for the comment. Tap below and I'll send it straight over. [Send it]
>
> **DM:** Happy to send you the story interview. It's Francisco, by the way.
>
> **DM:** It comes with The Draft, my weekly email on how top 1% startups crush organic marketing. One email every Tuesday, unsubscribe anytime. What's the best email to send it to?
>
> **Them:** name@company.com
>
> **DM:** Done. Here's the story interview. You're on The Draft now, so look out for a welcome email from me. Reply to it with anything, it keeps me out of your spam folder. [Open it]
