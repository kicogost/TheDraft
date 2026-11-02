# ManyChat to beehiiv: one-time setup

For: Francisco (or Claude in Chrome acting for him). Do this once. The Instagram agency never touches anything in this file.

What it builds: someone comments a keyword on a post, gets a DM, gives their email inside the DM, is added to The Draft in beehiiv, and only then gets the freebie link. Nobody gets a freebie without landing in beehiiv.

How it is built: one master flow that nobody edits, plus one small launcher flow per post. The launcher sets two user fields (`lm_url`, `lm_name`) and starts the master. The master asks for the email, subscribes it to beehiiv and sends the link.

## Before you start

- Instagram account `thefranproject` is a professional account, type Creator (confirmed 2 Nov 2026). ManyChat supports Creator and Business, no switch needed.
- Instagram mobile app > Settings > **Messages and story replies** > **Message controls** > **Connected tools** > **Allow access to messages**: On. Without it ManyChat cannot send DMs and the connection fails without an error.
- ManyChat Pro on the Instagram account. The beehiiv app and integrations are not on the free plan.
- Logged into beehiiv and ManyChat in the same browser.
- The beehiiv API key lives in the password manager. Never paste it into a doc, the repo or Slack.
- DM copy is in `DM_COPY.md`. Keep it open, you paste from it in step 4.

## Facts about The Draft this setup relies on

| Thing | Value |
| --- | --- |
| Newsletter | The Draft, weekly, every Tuesday |
| Double opt-in | **Off** (checked 2 Nov 2026). ManyChat subscribers go straight to active, no confirmation email |
| What a new subscriber receives | One email, "Hey, it's Francisco 👋", from the beehiiv automation "Welcome, Instagram and other signups". It includes the two-question form for role and company, the launch playbook and the story interview bonus |
| Why that automation fires | ManyChat subscribers do not carry the `signup_channel = website` field the site sets, so they take the Instagram branch. This is intended, do not add that field in ManyChat |

## Step 1. Get the beehiiv API key and publication ID

1. beehiiv > **Settings** > **Workspace Settings** > **API**.
2. **Create New API Key**. Name it `ManyChat`. Copy it into the password manager entry "beehiiv API key (ManyChat)".
3. On the same page, copy the **API V2 Publication ID** (starts `pub_`). Store it next to the key.

Use a dedicated key so it can be revoked without breaking the website, which uses its own key.

## Step 2. Install the beehiiv app in ManyChat

1. With both tabs logged in, open `manychat.com/apps/3791/install`.
2. **Sign In** > pick the Instagram workspace for The Draft.
3. **Go to App Settings**.
4. Paste the API key from the password manager and the publication ID. **Save**.

A wrong key fails silently. The end-to-end test in step 6 is the only proof it works.

## Step 3. Create the two user fields

ManyChat > **Settings** > **Fields** > **New User Field**. Create both, type **Text**:

| Name | Holds | Example |
| --- | --- | --- |
| `lm_url` | The freebie link | `https://franciscogost.com/api/download/story-interview?k=...` |
| `lm_name` | The freebie name in plain words. It appears inside the DM | `the story interview` |

Write `lm_name` lowercase with "the" in front, because it sits mid-sentence: "Happy to send you the story interview."

## Step 4. Build the master flow

**Automation** > **New Automation** > **Build from scratch**. Name it `Lead magnet gate (master)`.

**No trigger.** If the canvas starts with a default trigger, delete it.

Connect four nodes in a line.

### Node 1. Instagram > Send Message (the email ask)

1. Text block 1: paste "Master, message 1" from `DM_COPY.md`. Where it says `{{lm_name}}`, delete that text, type `{{` and pick **lm_name** from the variables picker. Check no literal braces remain either side of the chip.
2. Text block 2: paste "Master, message 2" (the email ask).
3. **+ Add** > **User Input**:
   - Reply type: **Email**
   - Save response to: the system field **Email**
   - Retry on invalid input: **On**. Retry message: "Master, retry" from `DM_COPY.md`
   - Skip button: **None**
4. The red connector **If contact has not responded**: set it to **2 hours** and connect it to a new Instagram > Send Message with "Master, reminder" from `DM_COPY.md`. Give that reminder its own **User Input** block, set exactly like the one above (Email, saved to Email, retry on, no skip), and connect it to node 2. The first input stops listening once it times out, so the reminder needs its own.

### Node 2. Actions (subscribe and tag)

1. **+ Action** > **beehiiv** > **Add Subscribe**:
   - Email: map to **Email**
   - UTM Source: `manychat`
   - UTM Medium: `instagram_comment`
   - UTM Campaign: the **lm_name** chip (via the picker)
2. **+ Action** > **Contact data** > **Add Tag** > `lead-magnet` (create it if it does not exist).

### Node 3. Instagram > Send Message (the delivery)

1. Text: paste "Master, delivery" from `DM_COPY.md`, inserting the `lm_name` chip the same way.
2. **+ Add Button**. Title `Open it`. Type **Open website**. URL: the **lm_url** chip only.
3. Open the URL field once more and delete any stray `{` or `}` around the chip. Stray braces caused a 404 on the colleague's first test.

### Set it live

Top right > **Set Live**. The badge may read STOPPED, because a flow with no trigger never starts on its own. That is fine, launchers still start it.

## Step 5. Build the launcher template

**Automation** > **New Automation** > **Build from scratch**. Name it `Launcher TEMPLATE do not edit`.

1. **When** > **Instagram** > **Post or Reel Comments**:
   - Post: **Next post** for the template (the agency picks a specific post in each copy)
   - Keyword: `STORY`, plus variants `Story`, `story`
   - Public reply: **On**. Paste the three public replies from `DM_COPY.md`
2. Instagram > **Send Message**:
   - Dropdown at the top of the node: **Private Reply**. The default is "Within messaging window", change it.
   - Text: "Launcher opener" from `DM_COPY.md`.
   - **+ Add Button** > title `Send it` > type **Perform actions** / go to next step.
   - Drag from **the button's** connector, not the node's, to the next node. Meta requires the first message after a comment to be a Private Reply, and nothing else can send until the person taps.
3. **Actions**:
   - **Contact data** > **Set User Field** > `lm_url` = the story interview link from `LAUNCHERS.md`
   - **+ Action** > **Contact data** > **Set User Field** > `lm_name` = `the story interview`
4. **Start Automation** > **Lead magnet gate (master)**.
5. **Set Live**.

## Step 6. Test end to end

1. Publish any post whose caption contains `STORY`, or use an existing post with the template pointed at it.
2. From a **second Instagram account**, comment `STORY`.
3. Check: public reply appears under the comment. A DM arrives with a **Send it** button.
4. Tap **Send it**. The email ask arrives, and reads "the story interview", not a blank.
5. Reply with a `+test` address, e.g. `francisco+ig@rallyup.team`.
6. The delivery message arrives. **Open it** opens the PDF. Not a 404.
7. beehiiv > **Subscribers** > search the test address. Check: status **Active**, acquisition source shows ManyChat / `manychat`, UTM campaign `the story interview`.
8. Within a few minutes the test inbox gets one email: "Hey, it's Francisco 👋" with a **Answer the two questions** button. Only one welcome email. If a second, generic beehiiv welcome also arrives, the beehiiv app is sending the default welcome: turn it off in the app settings or tell Claude.
9. Ask Claude to check the record: it should show the Instagram welcome journey completed with the email sent.

If step 7 shows nothing, the API key or publication ID in step 2 is wrong.

## Step 7. Park the template

Open `Launcher TEMPLATE do not edit` > switch it to **Draft** so its keyword stops firing. The agency duplicates it from now on.

## Step 8 (optional, skip for now). Bio keyword flow

The bio currently sends people to the launch playbook via the link (decided 2 Nov 2026), so this flow is not in use. Build it only if the bio switches to a DM keyword. ManyChat's new-follower trigger is beta and unreliable in 2026, so a keyword is the reliable version.

1. Instagram bio: add `DM me DRAFT for the story interview`.
2. **New Automation** > name `Bio keyword DRAFT`.
3. **When** > **Instagram** > **Keyword** in DMs: `DRAFT`, `Draft`, `draft` (message contains).
4. Instagram > **Send Message**: "Bio keyword opener" from `DM_COPY.md`, with a `Send it` button wired to the next node (keeps it identical to the launchers).
5. **Actions**: Set User Field `lm_url` = story interview link, `lm_name` = `the story interview`.
6. **Start Automation** > **Lead magnet gate (master)**. **Set Live**.
7. Test by sending `DRAFT` from the second account.

## Known gotchas

- "Set custom field" is called **Set User Field** in ManyChat, under **Contact data**.
- Forget the second Set User Field row and `lm_name` is blank: the DM reads "Happy to send you ." Always set both.
- Keywords match on the comment text, so the caption must contain the exact keyword.
- ManyChat asks each contact for their email once. Repeat requesters skip the ask, still get subscribed and still get the link.
- beehiiv ignores emails already on The Draft and never reactivates someone who unsubscribed. They still get the link.
- Double opt-in is off, so no pending subscribers. If it is ever turned on, ManyChat subscribers sit as pending until they confirm, and they would not get the welcome until then.
- ManyChat bills by contact count. A post that goes viral will push the plan up a tier. Check the contact count the day after any big post.
- The new-follower trigger is beta and unreliable. If the bio ever needs an automated DM, use the bio keyword (step 8).

## Can this be automated with the ManyChat API?

Mostly no. The building has to be done by hand.

- **No flow building.** The ManyChat public API has no endpoint to create, edit, duplicate or publish flows, and none for comment or keyword triggers. A September 2026 developer guide states this directly. ManyChat's own reference lives at `api.manychat.com/swagger`; it would not load from here, so check it once you have a token. Every launcher is clicks.
- **What it can do**, with a ManyChat API token (Settings > API, Pro only, about 10 requests per second):
  - List flows (`/fb/page/getFlows`) and start one for a known contact (`/fb/sending/sendFlow`).
  - Create user fields and tags, and read or set a contact's field values and tags. Confirm the exact field-setting endpoint in ManyChat's reference before relying on it.
  - Look up contacts.
- **What that buys us in practice:** a weekly check script (who got tagged `lead-magnet`, whether each has a matching beehiiv subscriber) and creating the two fields. Not worth it for two fields. Worth it only if the agency starts making mistakes the test does not catch.
- **The one thing that would remove the beehiiv app:** replace node 2's beehiiv action with ManyChat's **External Request** pointing at a small endpoint on franciscogost.com that subscribes to beehiiv. It would carry our own UTM and custom fields and fail loudly instead of silently. Not needed now. Revisit if the app's silent failures bite.
