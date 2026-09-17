# Resource deliverables

These are the gated files. They are **not** in `/public`, because anything in
`/public` is served to anyone who guesses the path, which would defeat the form.

When the signup route is wired they move to private Vercel Blob storage and
`resourceUrl` in each resource JSON points at the blob URL. The API route hands
the reader a short-lived signed link after it has their email.

| File | Resource | Status |
|------|----------|--------|
| `the-chief-of-staff-dm.pdf` | `chief-of-staff-dm` | Draft, two gaps marked inside the document |
| (none yet) | `first-30-days` | Needs Francisco's real hooks, numbers and calendar |

`the-chief-of-staff-dm.source.html` is the source the PDF is rendered from.
Edit the HTML and re-render rather than editing the PDF.
