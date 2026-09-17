# Deploying

The repo is a stock Next.js app. Vercel detects everything except the
environment variables, which have to be set by hand.

## Environment variables

Set all four in the Vercel project, for Production and Preview. Never commit
them. `.env.example` lists the same keys with empty values.

| Key | Value |
|-----|-------|
| `BEEHIIV_PUBLICATION_ID` | The Draft's publication, `pub_...` |
| `BEEHIIV_API_KEY` | Server only. Rotate the one pasted in chat before launch |
| `BEEHIIV_ENABLED` | `true` in production. `false` runs the forms without calling beehiiv |
| `RESOURCE_SIGNING_SECRET` | Any long random string. `openssl rand -hex 32` |

The values for local development are in `.env.local`, which is gitignored.

## Domain

`content/site.json` holds `url`, currently `https://franciscogost.com`. It
drives canonical links and the OG image base, so it has to match the live
domain. Update it in the same commit that points the domain at Vercel.

## Build

```
pnpm install
pnpm build      # must pass with zero warnings
pnpm lint
```

Everything is static except the two API routes and `/thank-you`, which reads
its query string.

## Note

A Vercel project called `the-draft` was created under "Fran's projects" during
an earlier session and has one deployment on it. Delete it if you are starting
fresh, otherwise the CLI may reuse it.
