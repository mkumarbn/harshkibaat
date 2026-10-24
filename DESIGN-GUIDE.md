# Harsh ki Baat — Design Guide

How the website looks and why. Read this before changing the layout, colours
or video components, and update it when the client asks for design changes.
Project setup, deployment and email details are in `CLAUDE-HANDOFF.md` and
`README.md`.

## Client feedback history

### October 2026 redesign

The client's references are kept in `Extra/`:

| File | What it shows |
| --- | --- |
| `Extra/theme1.jpeg` | Hand sketch of the mobile homepage: Harsh's photo with the name and social icons beside it, then a large "Video 1" and a list of videos 2, 3 and 4 with small thumbnails. |
| `Extra/theme2.jpeg` | Hindustan Times mobile site: bold headlines, coloured category label, date, thumbnail on the side. |
| `Extra/theme3.jpeg` | National Press theme: navy masthead, uppercase tab navigation, large lead image. |
| `Extra/theme4.jpeg` | A Harsh ki Baat YouTube thumbnail. The three channel labels at the bottom set the channel colours. |

What the client asked for, and what was done:

1. **The "Make sense of what matters" headline looked bad.** It was removed
   from the homepage and the About page. Don't bring it back.
2. **The site didn't look like a media website.** It now has a navy masthead,
   news-style tab navigation, bold news headlines and a navy footer.
3. **Use a large photo of Harsh at the beginning.** The homepage opens with
   a large portrait beside the brand name and social buttons.
4. **Show the 3 channels with the latest video on the left and the rest in a
   vertical list on the right.** Each channel has its own section built that
   way. On mobile they stack, as in the sketch.
5. **Use the channel colours from the thumbnail.** LIVE is red, Global Harsh
   is blue, Harsh Kumar is purple.
6. **Distinguish channels and videos by colour.** Every section, thumbnail,
   tag, play button, filter button and the video popup use the channel's
   colour.

## Design system

All values live in `app/globals.css` under `:root`.

### Colours

| Token | Value | Used for |
| --- | --- | --- |
| `--navy` | `#0e1a30` | Masthead, hero, footer, video popup, dark buttons |
| `--navy-2` | `#16243f` | Navigation bar |
| `--red` | `#e10600` | Harsh ki Baat LIVE, site accent, Subscribe |
| `--blue` | `#1a6ddb` | Global Harsh |
| `--purple` | `#8e2fd0` | Harsh Kumar |
| `--ink` / `--body` / `--muted` | `#111827` / `#343a40` / `#5f6368` | Headings / body text / secondary text |
| `--line` / `--wash` | `#e5e7eb` / `#f5f6f8` | Borders / light grey backgrounds |

Brand colours for social icons (Facebook `#1877f2`, Instagram `#c13584`,
YouTube `#ff0000`, WhatsApp green) are only used on those icons.

### Fonts

Loaded from Google Fonts at the top of `app/globals.css`.

- **Mukta** (`--display`, `--sans`): all headlines and body text. It includes
  Devanagari, so Hindi video titles render properly. Don't replace it with a
  font that lacks Hindi support.
- **Oswald** (`--condensed`): the "HARSH KI BAAT" brand, channel badges,
  channel tags and stats. It matches the condensed lettering on the
  thumbnails. Use it for short English labels only.

### Photo

Use `public/harsh-kumar-portrait.jpg` for Harsh. It matches the person on
his YouTube thumbnails. `public/harsh-kumar.png` shows a different-looking
person, so don't use it unless the client confirms. The portrait has a thin
white strip at the top edge, which `.profile-photo img` crops out with a small
scale.

## How channel colours work

Each channel has an `accent` in `lib/channels.ts` (`"red" | "blue" | "purple"`).
Components add a class built from it, and that class sets the CSS variable
`--channel`:

```css
.channel-red, .channel-card-red, .channel-badge-red { --channel: var(--red); }
.channel-blue, ...                                   { --channel: var(--blue); }
.channel-purple, ...                                 { --channel: var(--purple); }
```

Everything inside uses `var(--channel)`, so one class colours the whole block.

| Where | Class added by | What gets coloured |
| --- | --- | --- |
| Homepage channel section | `components/channel-section.tsx` | Top stripe, tinted background, heading underline, thumbnail bars, play buttons, "Latest" pill and channel name below the lead video |
| Video card (Videos page) | `components/video-card.tsx` | Channel name pill below the thumbnail, bar under thumbnail, play button |
| Filter buttons | `components/video-library.tsx` | Dot, border, filled background when selected |
| Video popup | `components/video-player.tsx` | Top border and channel label |
| Channel badge | `components/channel-badge.tsx` | Pill border and glow (styled like the thumbnail labels) |
| About page cards | `app/about/page.tsx` | Top border, channel name, "Watch on YouTube" button |

To change a channel's colour, edit the token in `:root`. To add a channel, add
it to `channels` in `lib/channels.ts` with a new accent, add the accent to the
`Channel` type, then add a token and a `--channel` rule in `globals.css`.

The order of the `channels` array sets the order everywhere. It matches the
thumbnail labels: LIVE, Global Harsh, Harsh Kumar.

## Page structure

### Header (`app/layout.tsx`, `components/main-nav.tsx`)

- Navy masthead with the photo, "HARSH KI BAAT" and the "Hindi news &
  analysis" tagline, the social icons and a red Subscribe button.
- Tab navigation below it. The current page gets a red underline through
  `aria-current="page"`. On mobile the tabs scroll sideways.
- Header social icons are hidden below 1000px wide. On the homepage the
  hero shows them large, and the footer always has them.

### Homepage (`app/page.tsx`)

1. **Profile hero**: large portrait, kicker "Editor-in-chief · Harsh Kumar",
   the "HARSH KI BAAT" title, Facebook / X / Instagram / YouTube buttons, a
   short description, live subscriber and video counts, and three channel
   badges linking to YouTube. On mobile the photo sits on the left with the
   title and a 2×2 grid of icons on the right, as in the sketch.
2. **One section per channel** (`components/channel-section.tsx`): channel
   badge and "View channel" link, then the latest video large on the left and
   the next 5 (`LIST_LENGTH`) in a vertical list on the right.

The hero description is based on the facts on the About page. Get the
client's approval before changing it.

### Other pages

- `/videos`: all videos in a 3-column grid of colour-coded cards, with channel
  filters, search and sort.
- `/about-us`: biography, channel cards in channel colours, contact prompt.
- `/contact` and `/terms-and-conditions`: same header, headings and footer
  styles.

## Rules to keep

- Keep the news look: navy masthead, bold headlines, no decorative serif
  taglines.
- Every video should show which channel it's from, by colour and by name.
- Don't display the WhatsApp number as visible text; only use it in the link.
- The four hero social icons (YouTube, Facebook, Instagram, X) sit on one
  line under "Harsh ki Baat" on every device. On phones they shrink to fit
  instead of wrapping (client request, Oct 2026).
- Never put text over a thumbnail. The thumbnails already carry big Hindi
  headlines, and the client said a "LATEST" tag on top was blocking the title.
  Labels go below the image (`.video-label`): a "● LATEST" pill plus the
  channel name on the homepage lead video, and a channel-coloured name pill
  on Videos page cards. Only the small round play button sits on the image.
- Draw play icons with `components/play-icon.tsx`, not the ▶ character, which
  iPhones show as a grey emoji box.
- Homepage thumbnails keep their `<img>` in normal flow, with `aspect-ratio`
  set on the image itself. Don't switch them to `next/image` `fill` inside the
  play buttons: buttons don't reliably apply `aspect-ratio` in every browser,
  and the videos disappeared when that was tried.
- Check layouts at phone widths (320–414px). There must be no horizontal
  scrolling apart from the tab bar.

## Checking design changes

1. Run `npm run lint` and `npm run build`.
2. Start the built site with `npx next start -p 3005`. Use a different port if
   the dev server is already running on 3000.
3. Take screenshots with headless Edge. Edge won't make a window narrower than
   about 500px, so check phone widths by loading the site in an iframe of the
   right width inside a small local HTML file, then screenshotting that file:

   ```powershell
   & "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless=new `
     --disable-gpu --hide-scrollbars --user-data-dir="$env:TEMP\edge-shot" `
     --virtual-time-budget=10000 --window-size=850,2320 `
     --screenshot="$env:TEMP\phones.png" "file:///C:/path/to/phone.html"
   ```

## Open items

- The client hasn't yet approved the hero description wording.
- The terms page still has sample text (see `README.md`).
