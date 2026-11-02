# What Claude could not do: the clicks, in order

ManyChat has no API for building flows, so everything below is done in the browser by Francisco or Claude in Chrome. Do it in one sitting, in this order. Full detail for each step is in `SETUP.md`.

Time: about 60 to 90 minutes, including the test.

1. Confirm ManyChat Pro is active on the Instagram account.
2. beehiiv: create an API key named `ManyChat`, save it and the publication ID in the password manager. (`SETUP.md` step 1)
3. ManyChat: install the beehiiv app at `manychat.com/apps/3791/install` and paste the key and publication ID. (step 2)
4. ManyChat: create user fields `lm_url` and `lm_name`, both Text. (step 3)
5. ManyChat: create tag `lead-magnet`.
6. Build `Lead magnet gate (master)`: no trigger, email ask with User Input, 2 hour reminder with its own User Input, beehiiv Add Subscribe plus tag, delivery with the `Open it` button. Set Live. (step 4, copy from `DM_COPY.md`)
7. Build `Launcher TEMPLATE do not edit` with keyword `STORY` and the story interview fields from `LAUNCHERS.md`. Set Live. (step 5)
8. Test end to end from a second Instagram account with `francisco+ig@rallyup.team`. (step 6)
9. Tell Claude the test is done, so it can check the beehiiv record: active, UTM campaign set, Instagram welcome sent, form answers saving.
10. Switch the template to Draft. (step 7)
11. Skip for now: the bio keyword flow (step 8). The bio links to the launch playbook instead.
12. Send the agency `AGENCY_GUIDE.md` and `LAUNCHERS.md`, and confirm they can see the template in ManyChat.

## Prompt for Claude in Chrome

> Open `docs/manychat/SETUP.md` and `docs/manychat/DM_COPY.md` from my TheDraft repo. Work through `CLICK_ORDER.md` steps 3 to 7 in ManyChat and beehiiv. I will paste the API key myself when you reach step 3; never type, read or screenshot it. Stop and ask me before Set Live on each flow, and stop at step 8 so I can run the test from my second account.
