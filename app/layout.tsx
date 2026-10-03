import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://harshkibaat.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Harsh ki Baat | Hindi news and analysis",
    template: "%s | Harsh ki Baat",
  },
  description:
    "Watch the latest Hindi news, live discussions and thoughtful analysis from Harsh ki Baat Live, Global Harsh and Harsh Kumar.",
  applicationName: "Harsh ki Baat",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Harsh ki Baat",
    title: "Harsh ki Baat | Hindi news and analysis",
    description:
      "The latest conversations, current affairs and analysis from all three Harsh ki Baat YouTube channels.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh ki Baat | Hindi news and analysis",
    description: "Latest videos and conversations from all three Harsh ki Baat channels.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <header className="site-header">
          <div className="header-inner">
            <Link className="brand" href="/home" aria-label="Harsh ki Baat home">
              <span className="brand-photo">
                <Image src="/harsh-kumar-portrait.jpg" alt="" fill sizes="44px" priority />
              </span>
              <span className="brand-name">harsh ki <b>baat</b></span>
            </Link>
            <nav className="main-nav" aria-label="Main navigation">
              <Link href="/home">Home</Link>
              <Link href="/videos">Videos</Link>
              <Link href="/about-us">About</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/terms-and-conditions">Terms</Link>
            </nav>
            <nav className="header-connect" aria-label="Social media and contact">
              <a className="header-icon-link header-icon-youtube" href="https://www.youtube.com/@harshkibaatLIVE" target="_blank" rel="noreferrer" aria-label="YouTube" title="YouTube">
                <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" /></svg>
              </a>
              <a className="header-icon-link header-icon-facebook" href="https://www.facebook.com/harshkibaatLIVE/" target="_blank" rel="noreferrer" aria-label="Facebook" title="Facebook">
                <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.03 1.79-4.71 4.54-4.71 1.32 0 2.7.24 2.7.24v2.98h-1.52c-1.5 0-1.97.94-1.97 1.9v2.25h3.35l-.54 3.49h-2.81V24C19.61 23.07 24 18.09 24 12.07Z" /></svg>
              </a>
              <a className="header-icon-link header-icon-instagram" href="https://www.instagram.com/harshkibaatlive/?hl=en" target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram">
                <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-3.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" /></svg>
              </a>
              <a className="header-icon-link header-icon-x" href="https://x.com/harshktweets" target="_blank" rel="noreferrer" aria-label="X" title="X">
                <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-7.08L5.86 22H2.73l7.25-8.29L1.8 2h6.4l4.43 6.58L18.9 2Zm-1.1 18h1.73L7.27 3.89H5.41L17.8 20Z" /></svg>
              </a>
              <a className="header-icon-link header-icon-email" href="mailto:harsh-kumar@outlook.com" aria-label="Email Harsh ki Baat" title="Email">
                <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M2.5 4h19A2.5 2.5 0 0 1 24 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-19A2.5 2.5 0 0 1 0 17.5v-11A2.5 2.5 0 0 1 2.5 4ZM2 7v.5l10 6.25L22 7.5V7l-10 6.25L2 7Z" /></svg>
              </a>
              <a className="header-icon-link header-icon-whatsapp" href="https://wa.me/919897735444?text=Hello%20Harsh%20ki%20Baat" target="_blank" rel="noreferrer" aria-label="Contact Harsh ki Baat on WhatsApp" title="WhatsApp">
                <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20.52 3.48A11.85 11.85 0 0 0 12.08 0C5.5 0 .15 5.34.15 11.92c0 2.1.55 4.15 1.6 5.96L.05 24l6.28-1.65a11.9 11.9 0 0 0 5.74 1.46h.01c6.57 0 11.92-5.35 11.92-11.93 0-3.19-1.24-6.19-3.48-8.4ZM12.08 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.73.98.99-3.63-.24-.37a9.87 9.87 0 0 1-1.52-5.27c0-5.47 4.45-9.92 9.92-9.92 2.65 0 5.14 1.03 7.01 2.91a9.87 9.87 0 0 1 2.9 7.02c0 5.47-4.45 9.92-9.92 9.92Zm5.44-7.43c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.47-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.18-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.48.71.31 1.27.5 1.7.64.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" /></svg>
              </a>
            </nav>
            <a className="header-subscribe" href="https://www.youtube.com/@harshkibaatLIVE" target="_blank" rel="noreferrer">
              <span aria-hidden="true">▶</span> Subscribe
            </a>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="footer-inner">
            <div className="footer-main">
              <div className="footer-about">
                <Link className="footer-brand" href="/home" aria-label="Harsh ki Baat home">
                  <span className="brand-photo">
                    <Image src="/harsh-kumar-portrait.jpg" alt="" fill sizes="40px" />
                  </span>
                  <span>harsh ki <b>baat</b></span>
                </Link>
                <p>Unfiltered opinions, political reality, and straight-to-the-point breakdowns every day.</p>
              </div>
              <div className="footer-contact">
                <span>GET IN TOUCH</span>
                <a href="mailto:harsh-kumar@outlook.com">harsh-kumar@outlook.com</a>
                <a href="https://wa.me/919897735444?text=Hello%20Harsh%20ki%20Baat" target="_blank" rel="noreferrer">WhatsApp us <span aria-hidden="true">↗</span></a>
              </div>
              <nav aria-label="Quick links">
                <Link href="/home">Home</Link>
                <Link href="/videos">Videos</Link>
                <Link href="/about-us">About</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
              </nav>
              <div className="footer-social" aria-label="Stay connected">
                <a href="https://www.youtube.com/@harshkibaatLIVE" target="_blank" rel="noreferrer">YouTube</a>
                <a href="https://www.instagram.com/harshkibaatlive/?hl=en" target="_blank" rel="noreferrer">Instagram</a>
                <a href="https://www.facebook.com/harshkibaatLIVE/" target="_blank" rel="noreferrer">Facebook</a>
                <a href="https://x.com/harshktweets" target="_blank" rel="noreferrer">X</a>
                <a href="https://whatsapp.com/channel/0029Va8no0142DcmHeE13N1u" target="_blank" rel="noreferrer">WhatsApp channel</a>
                <a href="https://paypal.me/harshkibaat" target="_blank" rel="noreferrer">Support</a>
              </div>
            </div>
            <small>© {new Date().getFullYear()} Harsh ki Baat. All rights reserved.</small>
          </div>
        </footer>
      </body>
    </html>
  );
}
