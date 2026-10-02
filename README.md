# Harsh ki Baat — Next.js

The SEO-friendly replacement website for the Angular app in `../harsh-ki-baat`.
This app is self-contained and runs from this folder.

## Run locally

```powershell
npm install
npm run dev
```

Open <http://localhost:3000>. For a production build, run `npm run build` and
then `npm start`.

## Video feeds and older videos

Recent videos for Harsh ki Baat Live, Harsh Kumar and Global Harsh are rendered
on the server from YouTube’s public channel feeds. This works without a YouTube
API key and does not expose credentials in the browser.

The public feed provides the latest 15 uploads per channel. To enable the
“Load older videos” button and paginate the full channel archive, copy
`.env.example` to `.env.local`, add a YouTube Data API v3 key as
`YOUTUBE_API_KEY`, then restart the server. Keep that key private; do not use a
`NEXT_PUBLIC_` prefix. For production, set the key before running
`npm run build` and rebuild after changing it. The key is only read by the
Next.js server.

Set `NEXT_PUBLIC_SITE_URL` to the canonical production URL when deploying so
canonical links, Open Graph metadata, `robots.txt` and `sitemap.xml` use the
correct host.

## Contact form email

The contact form sends each message to both `harsh-kumar@outlook.com` and
`grade.mohit@gmail.com` by default, and sends a designed HTML acknowledgement
(with a plain-text alternative) to the sender. Copy `.env.example` to
`.env.local` and add a newly generated App Password:

- `MAIL_USERNAME` (or `GMAIL_USER`) to the Gmail account used to send messages.
- `GMAIL_APP_PASSWORD` to an App Password created for that Google account
  (not the account's normal password). Standard `MAIL_USERNAME` and
  `MAIL_PASSWORD` variables are also supported.
- `MAIL_HOST`, `MAIL_PORT` and `MAIL_ENCRYPTION` to configure Gmail SMTP. The
  defaults are `smtp.gmail.com`, port `587`, and `tls`.
- `MAIL_FROM_ADDRESS` to the Gmail sender address. It should normally match
  the authenticated Gmail account.

Contact-form messages are sent to `harsh-kumar@outlook.com` and
`grade.mohit@gmail.com`. Both the team notification and sender confirmation
use branded HTML email with a plain-text alternative.

Google App Passwords require 2-Step Verification. Create one in the Google
Account security settings, keep it secret, and configure these values in your
hosting provider's environment settings in production. The SMTP credentials
are used only on the server. If Gmail SMTP is not configured, the form displays
an error and provides the direct email address instead.
Gmail SMTP uses STARTTLS on port 587. `MAIL_FROM_NAME` optionally controls the
sender display name.

The contact API validates field lengths and email format, includes a hidden
honeypot field, and applies a basic per-process rate limit. For a public
production deployment, also consider rate limiting the endpoint at the hosting
provider or a shared store if the app runs across multiple instances.

## Deployment

Deploy this folder as a Next.js application on a Node.js hosting platform. Set
the environment variables in the hosting dashboard. The existing Angular
project remains separate and unchanged.
