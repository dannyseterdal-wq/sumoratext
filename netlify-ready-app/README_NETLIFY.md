# Deploy til Netlify (med funksjon)

## Forutsetninger
- Netlify-konto
- OpenAI API-key (lagres som `OPENAI_API_KEY` i Netlify)
- Repo (GitHub/GitLab/Bitbucket) eller Netlify CLI

## Deploy fra Git (anbefalt)
1. Push denne mappen til et tomt repo.
2. På Netlify: **Add new site → Import an existing project** og velg repoet.
3. Build command: `pnpm run build`
4. Publish directory: `dist`
5. Functions directory: `netlify/functions`
6. Under **Site settings → Environment variables**: legg til `OPENAI_API_KEY`.
7. Deploy → besøk URL → test opplasting og oppsummering.

## Lokal kjøring
- `pnpm install`
- `pnpm run dev` (funksjonen kjører ikke lokalt uten Netlify dev; bruk `npm i -g netlify-cli` og `netlify dev` for full stack).
