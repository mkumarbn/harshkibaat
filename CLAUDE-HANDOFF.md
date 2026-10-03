# Harsh ki Baat — Claude Project Handoff

Use this file as background when continuing work on this website. Keep it
updated when significant project decisions or deployment status changes.

## Project and workspace

- Next.js website location: `D:\xampp\htdocs\harshkibaat\harshkibaat`
- Original Angular website: `D:\xampp\htdocs\harsh-ki-baat` (kept separate;
  do not modify it unless explicitly requested).
- Canonical website: <https://harshkibaat.com>
- Local development URL: <http://localhost:3000>
- Stack: Next.js 16, React 19, TypeScript, Node.js, CSS, Nodemailer.
- Use PowerShell and Windows paths for local commands.

## Product requirements and decisions

- Build an SEO-friendly Next.js replacement for the existing Angular site.
- Present videos from all three YouTube channels:
  - Harsh ki Baat Live: <https://www.youtube.com/@harshkibaatLIVE>
  - Global Harsh: <https://www.youtube.com/@GlobalHarsh>
  - Harsh Kumar: <https://www.youtube.com/@HarshKumarSingh>
- Include homepage, video library, About page, and Contact page.
- Video library supports channel filtering, search, and newest/oldest sorting.
- Use YouTube public feeds for recent videos; older-video pagination can be
  enabled with a private YouTube Data API key.
- Use the portrait already included at `public/harsh-kumar.png`.
- WhatsApp chat link uses the provided number in its destination URL, but never
  display the number in visible page text.
- Current visual preference: white page background, readable/brighter text,
  pill-style navigation, and YouTube-inspired red accents. Keep WhatsApp brand
  styling green where appropriate.
- Social links are in the shared site footer.

## Current pages and key files

- `app/page.tsx` — homepage and latest videos.
- `app/videos/page.tsx`, `components/video-library.tsx` — video library and
  channel/search/sort controls.
- `app/about/page.tsx` — About content and portrait.
- `app/contact/page.tsx`, `components/contact-form.tsx` — contact form UI.
- `app/api/contact/route.ts` — validation and SMTP delivery.
- `app/api/videos/route.ts`, `lib/youtube.ts`, `lib/channels.ts` — video feeds
  and channel metadata.
- `app/layout.tsx` — metadata, shared header/navigation/footer.
- `app/globals.css` — site design, responsive layout, typography, and colors.
- `app/robots.ts`, `app/sitemap.ts` — SEO routes.
- `.env.example` — safe environment-variable template; secret values must stay
  blank.
- `.env.local` — local secrets/configuration; do not read out, copy, log,
  commit, or include any secret values in generated documentation.

## Contact email behavior

- Each website contact submission is sent to both:
  - `harsh-kumar@outlook.com`
  - `grade.mohit@gmail.com`
- The sender also receives an acknowledgement.
- Both the team notification and acknowledgement use branded red-and-white
  HTML email with a plain-text alternative.
- Sender address is configured by `MAIL_FROM_ADDRESS`; the expected Gmail
  configuration uses SMTP at `smtp.gmail.com`, port `587`, with TLS.
- Supported secret variable aliases include `MAIL_USERNAME` / `GMAIL_USER` and
  `MAIL_PASSWORD` / `GMAIL_APP_PASSWORD`. Keep credentials in `.env.local` or
  the hosting provider's private environment-variable settings only.
- The contact endpoint has input validation, HTML escaping, a honeypot, and a
  basic per-process rate limit.
- A Gmail App Password was exposed in previous conversation context. Do not
  reuse or repeat it. Revoke it and use a newly generated App Password.
- SMTP acceptance indicates the provider accepted the message, not guaranteed
  inbox delivery. Do not send a live test unless requested.

## Deployment status and next steps

- Vercel was chosen as the preferred host; deployment has **not** been
  completed.
- Vercel CLI was available through `npx vercel`, but it reported that the CLI
  was logged out. A Vercel dashboard session in Mozilla did not authenticate
  the local CLI.
- To deploy from PowerShell:

  ```powershell
  Set-Location D:\xampp\htdocs\harshkibaat\harshkibaat
  npx vercel login
  npx vercel
  ```

- After linking/creating the Vercel project, set production environment
  variables in Vercel project settings: `MAIL_HOST`, `MAIL_PORT`,
  `MAIL_USERNAME`, `MAIL_PASSWORD`, `MAIL_ENCRYPTION`, `MAIL_FROM_ADDRESS`,
  `MAIL_FROM_NAME`, and `NEXT_PUBLIC_SITE_URL`. Add `YOUTUBE_API_KEY` only if
  archive pagination is required. Never enter secrets in chat or commit them.
- Deploy production with `npx vercel --prod`. Add the custom domain in Vercel
  and configure DNS there if the site should use `harshkibaat.com`.
- `.gitignore` excludes `.env*` and generated build output. Do not weaken it
  to make deployment work.

## Validation and local development notes

- Most recent contact email changes passed `npm run lint` and `npm run build`.
- The visual theme update also passed lint/build; mobile header layout was
  checked for horizontal overflow.
- Run `npm run lint` and `npm run build` after relevant code changes.
- Only one Next.js dev server should run against this project at a time.
  “Another next dev server is already running” means a server/lock already
  exists; reuse it or stop it cleanly before starting another.
- Do not kill a process without confirming its exact PID and command.
