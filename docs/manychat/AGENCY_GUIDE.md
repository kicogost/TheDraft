# Agency guide: adding a freebie to a post

For the agency running Francisco Gost's Instagram. Follow it for every post that offers a freebie. It takes about ten minutes, including the test.

What happens for the person who comments: they comment a keyword, get a DM, give their email, are added to Francisco's newsletter The Draft, and then get the link. Your part is one small "launcher" flow per post. Everything after the launcher already exists and must not be touched.

**Hard rule: never edit the flow called `Lead magnet gate (master)`. Not the copy, not the order, not a setting. If anything outside your launcher looks wrong, take a screenshot and send it to Francisco.**

## Before you start

- [ ] **The link works.** Open the freebie's `lm_url` from `LAUNCHERS.md` in an incognito window. It must open the PDF. If it doesn't, stop and tell Francisco.
- [ ] **The keyword is agreed and in the caption.** It comes from `LAUNCHERS.md`. The caption must contain it exactly, e.g. "Comment STORY and I'll send it to you".
- [ ] **You have the name in plain words.** `lm_name` from `LAUNCHERS.md`, lowercase with "the" in front, e.g. `the story interview`. It appears mid-sentence in the DM, so no capital letter and no full stop.

## The steps

1. ManyChat > **Automation**. Find `Launcher TEMPLATE do not edit`. Three dots > **Duplicate**.
2. Rename the copy `Launcher YYYY-MM-DD freebie name`, e.g. `Launcher 2026-11-18 story interview`. Use the post date.
3. Open the copy. Click the **When** trigger:
   - Post: pick the exact post, or **Next post** if it is not published yet.
   - Keywords: replace the template's keyword with this post's keyword and its variants (`STORY`, `Story`, `story`).
   - Leave public reply on, with the replies already there.
4. **Leave the Private Reply node exactly as it is.** Do not change its text, its button or its dropdown. It has to stay a Private Reply with a `Send it` button, or Instagram blocks every message after it.
5. Click the **Actions** node. There are two **Set User Field** rows. Change both:
   - `lm_url` = the link from `LAUNCHERS.md`
   - `lm_name` = the plain name from `LAUNCHERS.md`
   Both rows, every time. If you skip `lm_name` the DM says "Happy to send you ." to everyone.
6. **Leave the Start Automation node exactly as it is.** It must point at `Lead magnet gate (master)`.
7. Top right > **Set Live**.

## Test it

Do this for every new launcher, before or right after the post goes up.

1. From a **second Instagram account** (not Francisco's), comment the keyword on the post.
2. Check that the public reply appears under the comment.
3. Open that account's DMs. Tap **Send it**.
4. The next message must say "Happy to send you" followed by the freebie name. Not a blank.
5. Reply with an email you can check.
6. You get the delivery message. Tap **Open it**. The PDF must open, not a 404 or an error.
7. In beehiiv: **Subscribers** > filter by **UTM campaign** = the `lm_name` you used. The test email must be there with status **Active**.
8. Delete the test comment from the post.

## Checklist

- [ ] Link opens in incognito
- [ ] Keyword in the caption, spelled exactly
- [ ] Template duplicated and renamed `Launcher YYYY-MM-DD freebie name`
- [ ] Trigger points at the right post, keyword and variants set
- [ ] Private Reply node untouched
- [ ] `lm_url` set
- [ ] `lm_name` set
- [ ] Start Automation still points at `Lead magnet gate (master)`
- [ ] Set Live
- [ ] Tested from a second account: name shows, link opens, subscriber is in beehiiv
- [ ] Test comment deleted

## If something looks wrong

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Nobody gets a DM after commenting | Launcher not live, wrong post selected, or keyword not matching | Check **Set Live**, the post in the trigger, and that the comment contains the keyword |
| Public reply shows but no DM | The first DM node is not set to **Private Reply** | Set the dropdown at the top of that node back to Private Reply |
| DM arrives, tapping **Send it** does nothing | The connector runs from the node, not the button | Drag the connector from the `Send it` button to the Actions node |
| DM says "Happy to send you ." | `lm_name` not set | Add the second Set User Field row |
| **Open it** gives a 404 | Stray `{` or `}` around the link, or wrong link pasted | Re-paste the link from `LAUNCHERS.md` into `lm_url`. If it still fails, screenshot it for Francisco (the button lives in the master) |
| Wrong freebie arrives | `lm_url` copied from another row | Fix `lm_url` in the launcher |
| Person not in beehiiv after giving an email | beehiiv connection problem in the master | Do not touch the master. Screenshot and send to Francisco |
| Person says they never got asked for their email | They gave it on an earlier freebie. ManyChat only asks once | Nothing to fix, they still get the link and are already subscribed |
| Comment fires on unrelated comments | Keyword too short or too common | Use exact match, or ask Francisco for a longer keyword |

Anything not in this table: screenshot it and send it to Francisco. Do not experiment in the master.
